Pakka Rate — Piper voices + Grok coach

FILES
- frontend/index.html: page structure and frontend entry point.
- frontend/assets/styles.css: game styling.
- frontend/assets/app.js: game UI, interactions, and API calls.
- frontend/assets/images.js and frontend/assets/artwork/: artwork map and image files.
- server.py: backend web server, Piper TTS endpoint, and optional xAI Grok API for Omana coaching plus dynamic shopkeeper dialogue in one model call. It also serves the frontend files.
- requirements.txt: Piper Python dependency.
- setup_piper.bat: installs Piper and downloads four voice models.
- start_pakka_rate.bat: starts the local game server.

SETUP (Windows)
1. Install Python 3.10+ and make sure the Python launcher `py` works in PowerShell/CMD.
2. Double-click setup_piper.bat. It installs Piper and downloads:
   - English male: en_US-hfc_male-medium (shopkeeper)
   - English female: en_US-hfc_female-medium (Omana)
   - Hindi male: hi_IN-pratham-medium (shopkeeper)
   - Hindi female: hi_IN-priyamvada-medium (Omana)
3. Add your xAI API key and model to the `.env` file:
   XAI_API_KEY=your_xai_api_key
   XAI_MODEL=grok-4.1-fast
   The server loads these settings on startup. You need an xAI API account and available API credits.
4. Double-click start_pakka_rate.bat.
5. Open the URL printed in the terminal. If port 8000 is already occupied, the server automatically tries the next ports and prints the one it is using.

VOICE BEHAVIOUR
- The shopkeeper uses a male Piper voice; Omana uses a female Piper voice.
- The correct English/Hindi voice is selected based on the bargaining language.
- Piper runs locally after its models are downloaded, so speech synthesis itself does not require a paid API.
- Role/emotion presets vary pace, speech variation, and pauses for greetings, surprise, anger, thinking, roasting, and coaching. Punctuation adds natural prosodic cues.
- Important limitation: standard Piper voices are not fully emotion-conditioned actors. The modulation is an approximation from prosody settings and punctuation, not guaranteed cinematic emotion. If Piper is unavailable, the browser speech engine is used as a fallback.
- One xAI Grok API call per learner turn generates Omana’s roast/tip/improved sentence AND the shopkeeper’s context-aware dialogue, reducing duplicate requests. It is optional and may incur API charges; without a key, the game uses local fallback dialogue/coaching.

TROUBLESHOOTING
- If a voice model fails to download, rerun setup_piper.bat while connected to the internet.
- The first utterance for each voice may take longer while the local model loads.
- Check the `/health` route on the server URL printed when the server starts for Piper model status.
- Voice input uses the browser's speech-recognition service, which may require internet access and may not work in the VS Code embedded browser. If it reports a network error, open the game in Chrome or Edge, allow microphone access, and try again. You can also type your reply.
