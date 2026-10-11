"""Local Grok coach backend for Pakka Rate. Uses only Python's standard library."""
import errno
import io
import json
import mimetypes
import os
import threading
import wave
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urlsplit
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent

# Windows can map .js/.mjs to text/plain via the registry, which stops the browser
# from running the frontend scripts (so mic/speech code never starts).
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("text/css", ".css")


def load_dotenv():
    """Load local .env values without overriding variables set by the shell."""
    env_file = ROOT / ".env"
    if not env_file.exists():
        return
    for line in env_file.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        name, value = line.split("=", 1)
        name, value = name.strip(), value.strip()
        if value[:1] in ("'", '"') and value[-1:] == value[:1]:
            value = value[1:-1]
        if name:
            os.environ.setdefault(name, value)


load_dotenv()

FRONTEND_DIR = ROOT / "frontend"
ASSETS_DIR = FRONTEND_DIR / "assets"
HTML_FILE = FRONTEND_DIR / "index.html"
HOST = "127.0.0.1"
PORT = int(os.environ.get("PORT", "8000"))
MODEL = os.environ.get("XAI_MODEL", "grok-4.1-fast")
VOICE_DIR = ROOT / "voices"
_piper_voices = {}
_piper_lock = threading.Lock()


def piper_voice_id(role, language):
    """Choose distinct local voices: male market seller, female Omana coach."""
    if role == "shopkeeper":
        return "hi_IN-pratham-medium" if language == "hi" else "en_US-hfc_male-medium"
    return "hi_IN-priyamvada-medium" if language == "hi" else "en_US-hfc_female-medium"


def synthesize_piper(data):
    text = str(data.get("text", "")).strip()[:1800]
    if not text:
        raise ValueError("No text provided for speech")
    language = "hi" if data.get("language") == "hi" else "en"
    role = "shopkeeper" if data.get("role") == "shopkeeper" else "omana"
    emotion = str(data.get("emotion", "neutral")).lower()
    voice_id = piper_voice_id(role, language)
    model_path = VOICE_DIR / f"{voice_id}.onnx"
    if not model_path.exists():
        raise RuntimeError(f"Piper voice model missing: {voice_id}. Run setup_piper.bat first.")
    try:
        from piper import PiperVoice, SynthesisConfig
    except ImportError as exc:
        raise RuntimeError("Piper is not installed. Run setup_piper.bat first.") from exc

    # Piper is a local neural TTS engine, not a full emotion-conditioned model.
    # These delivery presets vary pace, prosodic noise and pauses; punctuation in
    # the generated dialogue gives the voice model further natural cues.
    presets = {
        "roast":   {"length_scale": 0.91, "noise_scale": 0.78, "noise_w_scale": 0.88, "sentence_silence": 0.28},
        "coach":   {"length_scale": 1.04, "noise_scale": 0.68, "noise_w_scale": 0.78, "sentence_silence": 0.24},
        "happy":   {"length_scale": 0.91, "noise_scale": 0.76, "noise_w_scale": 0.86, "sentence_silence": 0.18},
        "surprised":{"length_scale": 0.88, "noise_scale": 0.80, "noise_w_scale": 0.90, "sentence_silence": 0.20},
        "scolding":{"length_scale": 0.94, "noise_scale": 0.78, "noise_w_scale": 0.88, "sentence_silence": 0.26},
        "laughing": {"length_scale": 0.97, "noise_scale": 0.80, "noise_w_scale": 0.90, "sentence_silence": 0.23},
        "thinking": {"length_scale": 1.13, "noise_scale": 0.64, "noise_w_scale": 0.74, "sentence_silence": 0.34},
        "angry":    {"length_scale": 0.90, "noise_scale": 0.79, "noise_w_scale": 0.88, "sentence_silence": 0.20},
        "neutral":  {"length_scale": 1.00, "noise_scale": 0.70, "noise_w_scale": 0.80, "sentence_silence": 0.22},
    }
    preset = presets.get(emotion, presets["neutral"])
    sentence_silence = preset["sentence_silence"]
    config = SynthesisConfig(**{
        key: value for key, value in preset.items() if key != "sentence_silence"
    })
    with _piper_lock:
        voice = _piper_voices.get(voice_id)
        if voice is None:
            voice = PiperVoice.load(str(model_path))
            _piper_voices[voice_id] = voice
    audio_buffer = io.BytesIO()
    with wave.open(audio_buffer, "wb") as wav_file:
        first_chunk = True
        for audio_chunk in voice.synthesize(text, syn_config=config):
            if first_chunk:
                wav_file.setframerate(audio_chunk.sample_rate)
                wav_file.setsampwidth(audio_chunk.sample_width)
                wav_file.setnchannels(audio_chunk.sample_channels)
                first_chunk = False
            else:
                silence_frames = int(audio_chunk.sample_rate * sentence_silence)
                wav_file.writeframes(
                    b"\0" * silence_frames * audio_chunk.sample_width * audio_chunk.sample_channels
                )
            wav_file.writeframes(audio_chunk.audio_int16_bytes)
    return audio_buffer.getvalue()


def call_grok(data):
    api_key = os.environ.get("XAI_API_KEY")
    if not api_key:
        raise RuntimeError("XAI_API_KEY is not set")

    language = "Hindi" if data.get("language") == "hi" else "English"
    explanation_language = "Hindi" if data.get("uiLanguage") == "hi" else "English"
    system_prompt = f"""
You are powering two distinct characters in a playful Indian market bargaining game. Return a single valid JSON object with exactly four string fields: roast, tip, better, shopkeeperReply.

CHARACTER 1 — OMANA, THE FEMALE LANGUAGE COACH:
Omana is witty, warm, patient, and encouraging, like a funny friend helping the learner at a lively Indian market. Respond to the learner's latest spoken/transcribed reply. Give one brief, gentle, specific joke about the wording (never the learner's identity or ability), one practical teaching tip, and one natural improved sentence. Keep praise sincere and corrections kind; never shame, insult, or call the learner unintelligent. Avoid stock jokes and avoid repeating recent roasts.

Teaching rules:
- Treat the learner's actual words and the supplied analysis notes as evidence. Never invent a grammar error. If the sentence is correct, say so and teach one useful refinement (for example, a more natural phrase or a courteous bargaining strategy).
- Pick the single most useful next step; do not list every possible improvement. Explain briefly why the change helps and show the relevant replacement wording.
- The learner is practicing {language}. Write the improved sentence in natural, conversational {language}, preserving their intended meaning and offer. Do not silently change the amount.
- Write the tip/explanation in {explanation_language}, not the practice language unless they are the same. Keep it to one or two short, concrete sentences.
- Keep the joke in English, one kind sentence tied to this turn. Avoid repeating or closely paraphrasing recent roasts.
- Keep better to one ready-to-say sentence. Do not put grammar explanations in it.
- Use recent coaching tips and dialogue history to build on prior learning. Do not repeat a tip unless the learner repeats the same mistake; when they do, explain it differently and reinforce the rule.
- Filler words or a short greeting are not automatically errors. Do not criticize speaking speed; recognition timing is unreliable.

CHARACTER 2 — THE MALE INDIAN MARKET SHOPKEEPER:
Generate the shopkeeper's next spoken line as a lively, expressive male vendor in an Indian street market. He is confident, charming, street-smart, persuasive, slightly dramatic about prices, and quick with a witty comeback. He can sound amused, mock-surprised, playfully stubborn, thoughtful, or genuinely impressed, but must never become abusive or hostile. Speak naturally in {language}: conversational Hindi rather than textbook Hindi when Hindi is selected; conversational English with an Indian market flavour when English is selected. Use fillers and interjections only when they fit, such as “Arrey, boss!”, “Achha, achha...”, “Arey wah!”, “Come on, yaar!”, “Listen, my friend...”, “Oho!”, “One minute, one minute!”, or “Now you're talking!” Vary phrases and avoid repeated catchphrases. A light “Haha!” is okay occasionally, not every turn.

The shopkeeper must respond directly to the learner's latest message and the negotiation history. Keep prices and bargaining position consistent with the supplied context. If the offer is far too low, react with playful disbelief and defend the price or make a counteroffer. If the offer is reasonable, show that you are considering it. If it is a good offer, sound impressed or accept it if the game context indicates a deal. Do not invent product details or arbitrary price changes. Make the conversation move forward, not just repeat the same price. Keep shopkeeperReply to one to three short spoken sentences. Return only dialogue, with no stage directions, emotion labels, translation, or explanation. The suggested reply in context is a guide for the intended game outcome; preserve that outcome and price logic while making the dialogue more natural and characterful.

OUTPUT RULES:
- Return only valid JSON with exactly these keys: roast, tip, better, shopkeeperReply.
- Every value must be a non-empty string.
- roast: one English sentence, specific and fresh.
- tip: one or two concise sentences in {explanation_language}.
- better: one natural sentence in {language}.
- shopkeeperReply: one to three short spoken sentences in {language}.
- No Markdown fences or text outside JSON. Escape quotation marks correctly.
"""
    context = {
        "learner_reply": str(data.get("reply", ""))[:1500],
        "bargaining_language": language,
        "offer_amount": data.get("offer"),
        "analysis_notes": data.get("analysis", [])[:8],
        "score": data.get("score"),
        "recent_roasts_to_avoid": data.get("recentRoasts", [])[-12:],
        "recent_coaching_tips": data.get("recentCoachTips", [])[-4:],
        "suggested_improved_sentence": str(data.get("suggestedBetter", ""))[:500],
        "shopkeeper_context": data.get("shopkeeperContext", {}),
    }
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": json.dumps(context, ensure_ascii=False)},
        ],
        "max_tokens": 420,
        "response_format": {"type": "json_object"},
    }
    req = Request(
        "https://api.x.ai/v1/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    with urlopen(req, timeout=25) as response:
        result = json.loads(response.read().decode("utf-8"))

    choices = result.get("choices", [])
    output_text = choices[0].get("message", {}).get("content") if choices else None
    if not output_text:
        raise RuntimeError("No text returned by Grok")
    # Accept a JSON object even if the model wraps it in a markdown fence.
    output_text = output_text.strip()
    if output_text.startswith("```"):
        output_text = output_text.split("\n", 1)[-1].rsplit("```", 1)[0].strip()
    result_obj = json.loads(output_text)
    for key in ("roast", "tip", "better", "shopkeeperReply"):
        if not isinstance(result_obj.get(key), str) or not result_obj[key].strip():
            raise RuntimeError(f"Invalid coach field: {key}")
    return {key: result_obj[key].strip()[:900] for key in ("roast", "tip", "better", "shopkeeperReply")}


class Handler(BaseHTTPRequestHandler):
    def _send(self, status, body, content_type="application/json; charset=utf-8"):
        encoded = body if isinstance(body, bytes) else body.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Cache-Control", "no-store")
        # Explicitly allow the page to use the microphone.
        self.send_header("Permissions-Policy", "microphone=(self)")
        self.end_headers()
        self.wfile.write(encoded)

    def do_GET(self):
        request_path = urlsplit(self.path).path
        if request_path in ("/", "/index.html", "/Pakka_Rate_updated.html"):
            if not HTML_FILE.exists():
                self._send(404, "Frontend index.html not found", "text/plain; charset=utf-8")
                return
            self._send(200, HTML_FILE.read_bytes(), "text/html; charset=utf-8")
        elif request_path == "/health":
            models = [p.name for p in VOICE_DIR.glob("*.onnx")] if VOICE_DIR.exists() else []
            self._send(200, json.dumps({"ok": True, "grok_configured": bool(os.environ.get("XAI_API_KEY")), "grok_model": MODEL, "piper_ready": len(models) >= 4, "piper_models": models}))
        elif request_path.startswith("/assets/"):
            relative_path = unquote(request_path[len("/assets/"):])
            asset_path = (ASSETS_DIR / relative_path).resolve()
            try:
                asset_path.relative_to(ASSETS_DIR.resolve())
            except ValueError:
                self._send(404, json.dumps({"error": "Not found"}))
                return
            if not asset_path.is_file():
                self._send(404, json.dumps({"error": "Not found"}))
                return
            content_type = mimetypes.guess_type(asset_path.name)[0] or "application/octet-stream"
            if content_type.startswith(("text/", "application/javascript")):
                content_type += "; charset=utf-8"
            self._send(200, asset_path.read_bytes(), content_type)
        else:
            self._send(404, json.dumps({"error": "Not found"}))

    def do_POST(self):
        if self.path not in ("/api/coach", "/api/tts"):
            self._send(404, json.dumps({"error": "Not found"}))
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length < 1 or length > 100000:
                self._send(400, json.dumps({"error": "Invalid request size"}))
                return
            data = json.loads(self.rfile.read(length).decode("utf-8"))
            if self.path == "/api/tts":
                audio = synthesize_piper(data)
                self._send(200, audio, "audio/wav")
                return
            result = call_grok(data)
            self._send(200, json.dumps(result, ensure_ascii=False))
        except HTTPError as exc:
            details = exc.read().decode("utf-8", errors="replace")[:1000]
            print(f"Grok HTTP error {exc.code}: {details}")
            self._send(502, json.dumps({"error": "Grok API request failed"}))
        except (URLError, TimeoutError) as exc:
            print(f"Grok connection error: {exc}")
            self._send(502, json.dumps({"error": "Could not reach Grok API"}))
        except (ValueError, json.JSONDecodeError) as exc:
            print(f"Invalid request/response: {exc}")
            self._send(400, json.dumps({"error": "Invalid JSON or coach response"}))
        except Exception as exc:
            print(f"Coach backend error: {exc}")
            self._send(503, json.dumps({"error": str(exc) if "XAI_API_KEY" in str(exc) else "Grok coach unavailable"}))

    def log_message(self, fmt, *args):
        print("%s - %s" % (self.address_string(), fmt % args))


class PakkaRateHTTPServer(ThreadingHTTPServer):
    allow_reuse_address = False


if __name__ == "__main__":
    server = None
    for port in range(PORT, PORT + 10):
        try:
            server = PakkaRateHTTPServer((HOST, port), Handler)
            break
        except OSError as exc:
            if exc.errno != errno.EADDRINUSE:
                raise
    if server is None:
        raise RuntimeError(f"No available port found between {PORT} and {PORT + 9}")
    actual_port = server.server_address[1]
    print(f"Pakka Rate running at http://{HOST}:{actual_port}")
    print(f"Grok model: {MODEL}")
    if not os.environ.get("XAI_API_KEY"):
        print("No XAI_API_KEY set: running with the built-in local coach (no API needed).")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
    finally:
        server.server_close()