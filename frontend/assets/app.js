const CT = [
  {
    id: "blr",
    n: "Bangalore",
    h: "बेंगलुरु",
    em: "🏙️",
    mk: "Commercial Street",
    item: "Cotton kurta",
    open: 1200,
    fair: 600,
    min: 450,
    g: "Namaskara",
    c: ["#C8321E", "#E8731A"],
  },
  {
    id: "koc",
    n: "Kochi",
    h: "കൊച്ചി",
    em: "⛵",
    mk: "Mattancherry Spice Market",
    item: "Cardamom, 100g",
    open: 600,
    fair: 350,
    min: 300,
    g: "Namaskaram",
    c: ["#1F7A5C", "#35A07A"],
  },
  {
    id: "del",
    n: "Delhi",
    h: "दिल्ली",
    em: "🕌",
    mk: "Janpath Market",
    item: "Embroidered scarf",
    open: 1500,
    fair: 700,
    min: 500,
    g: "Namaste",
    c: ["#7B3FA0", "#B45FC0"],
  },
  {
    id: "mum",
    n: "Mumbai",
    h: "मुंबई",
    em: "🌊",
    mk: "Colaba Causeway",
    item: "Leather bag",
    open: 2400,
    fair: 1100,
    min: 850,
    g: "Namaste boss",
    c: ["#1F5FA8", "#3C8FD4"],
  },
  {
    id: "chn",
    n: "Chennai",
    h: "चेन्नई",
    em: "🛕",
    mk: "T. Nagar Market",
    item: "Cotton saree",
    open: 1800,
    fair: 900,
    min: 700,
    g: "Vanakkam",
    c: ["#8A3B12", "#C25E1E"],
  },
  {
    id: "hyd",
    n: "Hyderabad",
    h: "హైదరాబాద్",
    em: "💍",
    mk: "Laad Bazaar",
    item: "Lac bangles, dozen",
    open: 900,
    fair: 400,
    min: 300,
    g: "Adaab",
    c: ["#A8560F", "#D98A2B"],
  },
];
const HI = {
  blr: ["कॉटन कुर्ता", "नमस्कार"],
  koc: ["इलायची, 100 ग्राम", "नमस्कारम"],
  del: ["कढ़ाई वाला स्कार्फ़", "नमस्ते"],
  mum: ["चमड़े का बैग", "नमस्ते बॉस"],
  chn: ["सूती साड़ी", "वणक्कम"],
  hyd: ["लाख की चूड़ियाँ, दर्जन", "आदाब"],
};
const HN = {
  ek: 1,
  एक: 1,
  do: 2,
  दो: 2,
  teen: 3,
  तीन: 3,
  char: 4,
  chaar: 4,
  चार: 4,
  paanch: 5,
  panch: 5,
  पांच: 5,
  पाँच: 5,
  chhe: 6,
  chah: 6,
  छह: 6,
  saat: 7,
  सात: 7,
  aath: 8,
  आठ: 8,
  nau: 9,
  नौ: 9,
  das: 10,
  दस: 10,
  bees: 20,
  बीस: 20,
  pachees: 25,
  पच्चीस: 25,
  tees: 30,
  तीस: 30,
  chalis: 40,
  chaalis: 40,
  चालीस: 40,
  pachas: 50,
  pachaas: 50,
  पचास: 50,
  saath: 60,
  साठ: 60,
  sattar: 70,
  सत्तर: 70,
  pachhattar: 75,
  पचहत्तर: 75,
  assi: 80,
  अस्सी: 80,
  nabbe: 90,
  नब्बे: 90,
};
function numHi(t) {
  let c = 0,
    tot = 0,
    f = 0;
  const w = t.split(/[\s-]+/),
    SAU = /^(sau|सौ)$/,
    HZ = /^(hazaar|hazar|हज़ार|हजार)$/;
  for (let i = 0; i < w.length; i++) {
    const x = w[i];
    if ((x == "dhai" || x == "ढाई") && SAU.test(w[i + 1] || "")) {
      c = 250;
      f = 1;
      i++;
    } else if (
      (x == "derh" || x == "dedh" || x == "डेढ़") &&
      SAU.test(w[i + 1] || "")
    ) {
      c = 150;
      f = 1;
      i++;
    } else if (Object.prototype.hasOwnProperty.call(HN, x)) {
      c += HN[x];
      f = 1;
    } else if (SAU.test(x)) {
      c = (c || 1) * 100;
      f = 1;
    } else if (HZ.test(x)) {
      tot += (c || 1) * 1000;
      c = 0;
      f = 1;
    }
  }
  return f ? tot + c : null;
}
const U = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  fifteen: 15,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};
const $ = (id) => document.getElementById(id),
  r10 = (x) => Math.round(x / 10) * 10,
  pick = (a) => a[Math.floor(Math.random() * a.length)];
function num(t) {
  t = t.toLowerCase().replace(/[०-९]/g, (d) => "०१२३४५६७८९".indexOf(d));
  const m = t.match(/\d[\d,]*/);
  if (m) return +m[0].replace(/,/g, "");
  if (lang == "hi") {
    const hv = numHi(t);
    if (hv != null) return hv;
  }
  let c = 0,
    tot = 0,
    f = 0,
    pv = 0;
  for (const x of t.split(/[\s-]+/)) {
    if (x in U) {
      const v = U[x];
      if (pv && c >= 1 && c < 10 && v >= 10) c = c * 100 + v;
      else c += v;
      f = 1;
      pv = v < 10;
    } else if (x == "hundred") {
      c = (c || 1) * 100;
      f = 1;
      pv = 0;
    } else if (x == "thousand") {
      tot += (c || 1) * 1000;
      c = 0;
      f = 1;
      pv = 0;
    } else pv = 0;
  }
  return f ? tot + c : null;
}
let S = {},
  rec = null,
  voice = true,
  lang = "en",
  uiLang = "en",
  selCity = null,
  turnToken = 0,
  lastShopkeeperReply = "";
const shopHistory = [];
const learningHistory = [];
/* splash */
function skip() {
  $("splash").classList.add("out");
  cities();
}
$("splash").onclick = skip;
setTimeout(() => {
  if (!$("splash").classList.contains("out")) skip();
}, 2500);
/* cities */
function cities() {
  turnToken++;
  S = {};
  shopHistory.length = 0;
  learningHistory.length = 0;
  lastShopkeeperReply = "";
  window.speechSynthesis && speechSynthesis.cancel();
  $("app").innerHTML =
    `<div class="fade"><div class="top"><h1>Pakka Rate <small>पक्का रेट</small></h1><p>${uiLang === "hi" ? "मोल-भाव का अभ्यास करें, मार्गदर्शन पाएँ" : "Practice Bargaining, Get Coached"}</p><div class="lang" aria-label="Interface language"><span>${uiLang === "hi" ? "ऐप की भाषा:" : "Interface:"}</span><button class="lg ${uiLang === "en" ? "on" : ""}" data-ui="en">English</button><button class="lg ${uiLang === "hi" ? "on" : ""}" data-ui="hi">हिन्दी</button></div></div>
<section class="pcard"><h2>${uiLang === "hi" ? "मोल-भाव की भाषा चुनें" : "Choose your bargaining language"}</h2><p class="note">${uiLang === "hi" ? "आपकी ऐप भाषा अलग से चुनी जाती है" : "Your interface language is selected separately"}</p><div class="opts" role="radiogroup" aria-label="Bargaining language">${[
      [
        "en",
        "English",
        uiLang === "hi" ? "आप अंग्रेज़ी में बोलेंगे" : "You speak English",
      ],
      [
        "hi",
        "हिन्दी",
        uiLang === "hi" ? "आप हिंदी में बोलेंगे" : "You speak Hindi",
      ],
    ]
      .map(
        ([k, n, d]) =>
          `<button class="opt ${lang == k ? "on" : ""}" role="radio" aria-checked="${lang == k}" data-l="${k}"><b>${n}</b><small>${d}</small></button>`,
      )
      .join("")}</div></section>
<section class="pcard"><h2>${uiLang === "hi" ? "शहर चुनें" : "Choose your city"}</h2><p class="note">${uiLang === "hi" ? "अपना बाज़ार चुनें" : "Choose your market"}</p><div class="grid" role="radiogroup" aria-label="City">${CT.map((c) => `<button class="city ${selCity == c.id ? "on" : ""}" role="radio" aria-checked="${selCity == c.id}" data-c="${c.id}" style="background:linear-gradient(145deg,${c.c[0]},${c.c[1]})"><span class="em">${c.em}</span><b>${c.n}</b><small>${c.h}</small></button>`).join("")}</div></section>
<button class="startb" id="startb" ${selCity ? "" : "disabled"}>${uiLang === "hi" ? "मोल-भाव शुरू करें" : "Start Bargaining"}</button>
<p class="note">${selCity ? "" : "Select a city to continue. "}Prices are demo placeholders.</p></div>`;
}
/* market */
function badge(w, pre) {
  return `<div class="badge" id="b-${w}">${["normal", "happy", "laughing", "surprised", "thinking", "angry", "scolding", "tired"].map((x) => `<img data-x="${x}" alt="" src="${IM[pre + x]}">`).join("")}</div>`;
}
function face(w, x) {
  const b = $("b-" + w);
  if (!b) return;
  document
    .querySelectorAll("#b-" + w + " img")
    .forEach((i) => i.classList.toggle("on", i.dataset.x == x));
  b.classList.remove("pop");
  void b.offsetWidth;
  b.classList.add("pop");
}
function talk(w) {
  const f = $("f-s");
  f && f.classList.toggle("talk", w == "s");
}
function start(id) {
  const c = CT.find((x) => x.id == id);
  learningHistory.length = 0;
  S = {
    c,
    ask: c.open,
    pat: 100,
    rd: 1,
    ins: 0,
    words: 0,
    secs: 0,
    st: "on",
    busy: false,
    used: 0,
  };
  $("app").innerHTML =
    `<div class="fade"><div class="bar"><button class="btn" id="back" aria-label="Back to cities">←</button><h2>${c.em} ${c.n} <small style="font:600 12px Hind;background:var(--mg);color:#3A1E1A;border-radius:8px;padding:0 6px">${lang == "hi" ? "हिन्दी" : "English"}</small></h2><div class="pat"><small>${uiLang === "hi" ? "धैर्य" : "Patience"}</small><div><i id="pat" style="width:100%"></i></div></div><button class="btn" id="vo" aria-pressed="true" title="Toggle shopkeeper voice">🔊</button></div>
<div class="mk" style="background:linear-gradient(#FFF1CF,${c.c[1]}55)"><div class="sign">${c.mk}</div><div class="bgem">${c.em}</div><div class="floor"></div>
<img class="stall" alt="" src="${IM.stall}">
<div class="fig s" id="f-s"><img class="body" alt="Shopkeeper" src="${IM.sb}"><span class="nm">${uiLang === "hi" ? "दुकानदार" : "Shopkeeper"}</span></div></div>
<div class="log" id="log" aria-live="polite"></div>
<div class="coach" id="coach" role="region" aria-label="Teacher feedback"><img class="cf" id="cf" alt="" src="${IM.te_normal}"><div class="cc"><div class="ch"><span><b>Omana Teacher</b> <small>${uiLang == "hi" ? "हिंदी में मार्गदर्शन" : "English explanations"}</small></span><button class="btn" id="cx" aria-label="Dismiss teacher feedback">✕</button></div><div id="cb"></div></div></div>
<div class="inp"><button class="mic" id="mic" aria-label="Speak">🎤</button><input id="ti" placeholder="${lang == "hi" ? "बोलिए या हिंदी में लिखिए..." : "Speak or type in English..."}" aria-label="Your message" autocomplete="off"><button class="go" id="send">${uiLang === "hi" ? "भेजें" : "Send"}</button></div>
<p class="note" id="live">${lang == "hi" ? `आज़माइए: "भैया, ${HI[c.id][0]} का दाम क्या है?"` : `Try: "Hello! How much is the ${c.item.toLowerCase()}?"`}</p></div>`;
  face("s", "normal");
  sys(
    lang == "hi"
      ? `आप <b>${c.mk}</b> में हैं। आज का सामान: <b>${HI[c.id][0]}</b>। हिंदी में मोल-भाव करो!`
      : `You are at <b>${c.mk}</b>. Today's item: <b>${c.item}</b>. Bargain in English!`,
  );
  setTimeout(() => shop("happy", T("open")), 700);
}
function T(k, p) {
  const c = S.c,
    h = HI[c.id],
    hi = lang == "hi",
    a = S.ask,
    it = c.item.toLowerCase();
  return {
    open: hi
      ? `${h[1]}! आइए आइए जी! ${h[0]} देखिए, एकदम असली! आप बाहर से आए हैं ना? टूरिस्ट रेट सिर्फ़ ₹${a}।`
      : `${c.g}! Welcome, welcome! Take a look at this ${it}, genuine quality! You are visiting from outside, right? Tourist price is just ₹${a}.`,
    greet: hi
      ? `${h[1]} जी! ${h[0]} लीजिए, बिल्कुल बढ़िया क्वालिटी!`
      : `${c.g}! Please take a look at the ${it}. Best quality!`,
    real: hi
      ? "एकदम असली, जी! हाथ लगाकर देखिए, क्वालिटी देखिए।"
      : "Absolutely genuine! Touch it and see the quality.",
    num: hi
      ? "क्या? कितना दोगे, बोलो ना? नंबर बताओ!"
      : "What? How much will you pay? Tell me a number!",
    deal: hi
      ? `चलिए, पक्का! ₹${p} में डील! आप तो असली बार्गेन बॉस हो!`
      : `Done, deal! ₹${p} it is. You are a real Bargain Boss!`,
    ins: hi
      ? "अरे! यह तो बेइज़्ज़ती है! बिल्कुल नहीं!"
      : "Hey! That is an insult! Not possible at all!",
    low: hi
      ? `हा हा! इतने में तो सिर्फ़ ख़ुशबू मिलेगी, जी! ₹${a} से कम नहीं।`
      : `Ha ha! For that price you only get the smell! Not below ₹${a}.`,
    ok: hi
      ? `हम्म... आप तो तेज़ निकले। चलो, ₹${a} कर देता हूँ।`
      : `Hmm... you are sharp. All right, I will make it ₹${a}.`,
    bye: hi
      ? "बस! दुकान बंद करने का टाइम हो गया। जा जा!"
      : "That is it! Time to close the shop. Off you go!",
  }[k];
}
function log() {
  return $("log");
}
function add(cls, html) {
  const d = document.createElement("div");
  d.className = "m " + cls;
  d.innerHTML = html;
  log().appendChild(d);
  log().scrollTop = log().scrollHeight;
  return d;
}
function sys(h) {
  add("sys", h);
}
let piperAudio = null,
  piperRequest = 0;
async function speak(t, voiceLang = lang, role = "omana", emotion = "neutral") {
  if (!voice) return false;
  const request = ++piperRequest;
  try {
    if (piperAudio) {
      piperAudio.pause();
      piperAudio.src = "";
      piperAudio = null;
    }
    if (window.speechSynthesis) speechSynthesis.cancel();
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: String(t || ""),
        language: voiceLang === "hi" ? "hi" : "en",
        role,
        emotion,
      }),
    });
    if (!response.ok) throw new Error("Piper TTS unavailable");
    const blob = await response.blob();
    if (request !== piperRequest) return false;
    const url = URL.createObjectURL(blob),
      audio = new Audio(url);
    piperAudio = audio;
    return await new Promise((resolve) => {
      let done = false;
      const finish = (ok) => {
        if (done) return;
        done = true;
        URL.revokeObjectURL(url);
        if (piperAudio === audio) piperAudio = null;
        resolve(ok);
      };
      audio.onended = () => finish(true);
      audio.onerror = () => finish(false);
      audio.play().catch(() => finish(false));
      setTimeout(() => finish(false), Math.max(7000, String(t).length * 220));
    });
  } catch (err) {
    if (request !== piperRequest) return false;
    // Browser speech is a graceful fallback until Piper's models are installed.
    if (!voice || !window.speechSynthesis || !window.SpeechSynthesisUtterance)
      return false;
    return await new Promise((resolve) => {
      try {
        const u = new SpeechSynthesisUtterance(String(t || "")),
          v = speechSynthesis.getVoices();
        u.voice =
          role === "shopkeeper"
            ? voiceLang === "hi"
              ? v.find((x) => /^hi-IN/i.test(x.lang)) || null
              : v.find((x) => /^en-IN/i.test(x.lang)) ||
                v.find((x) => /^en/i.test(x.lang)) ||
                null
            : voiceLang === "hi"
              ? v.find((x) => /^hi-IN/i.test(x.lang)) || null
              : v.find((x) => /^en-IN/i.test(x.lang)) ||
                v.find((x) => /^en/i.test(x.lang)) ||
                null;
        u.lang = u.voice
          ? u.voice.lang
          : voiceLang === "hi"
            ? "hi-IN"
            : "en-IN";
        u.pitch =
          role === "shopkeeper"
            ? emotion === "angry"
              ? 0.82
              : emotion === "happy"
                ? 1.02
                : 0.91
            : emotion === "roast"
              ? 1.2
              : 1.12;
        u.rate =
          emotion === "thinking" ? 0.88 : emotion === "roast" ? 1.04 : 0.96;
        let done = false;
        const finish = (ok) => {
          if (done) return;
          done = true;
          resolve(ok);
        };
        u.onend = () => finish(true);
        u.onerror = () => finish(false);
        speechSynthesis.speak(u);
        setTimeout(() => finish(false), Math.max(5000, String(t).length * 150));
      } catch (e) {
        resolve(false);
      }
    });
  }
}
async function shop(x, t) {
  face("s", x);
  const d = add(
    "s",
    `<small>${uiLang === "hi" ? "दुकानदार" : "Shopkeeper"} <button class="say" aria-label="Replay voice">🔊</button></small><span></span>`,
  );
  d.querySelector(".say").onclick = () => {
    if (!S.busy) {
      talk("s");
      speak(t, lang, "shopkeeper", x);
    }
  };
  d.querySelector("span").textContent = t;
  talk("s");
  await speak(t, lang, "shopkeeper", x);
  talk("");
  return true;
}
const roastHistory = [];
function teacherCopy(t, A, o) {
  const hasFillers = A.fx.some((x) => /filler|भराव|तकिया/i.test(x));
  const hasShortReply = A.fx.some((x) => /short|छोटा|कम शब्द/i.test(x));
  const options = A.fx.length
    ? hasFillers
      ? [
          "Those fillers asked for more airtime than your bargaining point.",
          "Your pause is fine; the extra 'um' tried to negotiate too.",
        ]
      : hasShortReply
        ? [
            "That was concise; add one polite phrase and your offer will shine.",
            "We got the headline. Now give the shopkeeper one complete sentence.",
          ]
        : [
            "A tiny language detour—your next sentence can land the deal.",
            "One small wording tweak and that bargain will sound much smoother.",
          ]
    : [
        "That was clear and confident; even Omana has no grammar roast today.",
        "A polished line! The shopkeeper may need the coaching this round.",
      ];
  const unused = options.filter(
    (x) => !roastHistory.some((y) => y.toLowerCase() === x.toLowerCase()),
  );
  let roast = unused.length
    ? unused[Math.floor(Math.random() * unused.length)]
    : "Nice effort—let’s make the next bargaining line even stronger.";
  const tip = A.fx.length
    ? A.fx[0].replace(/<[^>]*>/g, "")
    : uiLang === "hi"
      ? "आपका वाक्य स्पष्ट था। अगली बार एक विनम्र, ठोस प्रस्ताव देकर दुकानदार को जवाब देने का मौका दें।"
      : "Your sentence was clear. Next, make a polite, specific offer and leave room for a counteroffer.";
  return { roast, tip, better: lang === "hi" ? fixHi(t, o) : fixEn(t, o) };
}
// Grok is optional. If no working API key is configured, skip the network call
// and use the built-in local coach and scripted shopkeeper instead.
let grokUsable = null;
async function checkGrok() {
  if (grokUsable !== null) return grokUsable;
  try {
    const h = await (await fetch("/health")).json();
    grokUsable = !!h.grok_configured;
  } catch (e) {
    grokUsable = false;
  }
  return grokUsable;
}
async function getGrokCoach(t, A, o, baseReply) {
  if (!(await checkGrok())) return null;
  try {
    const c = S.c || {};
    const r = await fetch("/api/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reply: t,
        language: lang,
        uiLanguage: uiLang,
        offer: o,
        analysis: A.fx,
        score: A.sc,
        recentRoasts: roastHistory.slice(-12),
        recentCoachTips: learningHistory.slice(-4),
        suggestedBetter: lang === "hi" ? fixHi(t, o) : fixEn(t, o),
        shopkeeperContext: {
          item: c.item || "market item",
          city: c.n || "",
          displayedPrice: c.open,
          currentAsk: S.ask,
          fairPrice: c.fair,
          emotion: A.x,
          suggestedReply: baseReply,
          dialogueHistory: shopHistory.slice(-6),
        },
      }),
    });
    if (!r.ok) throw new Error("Coach endpoint unavailable");
    const j = await r.json();
    if (!j.roast || !j.tip || !j.better)
      throw new Error("Incomplete coach response");
    return {
      roast: String(j.roast),
      tip: String(j.tip),
      better: String(j.better),
      shopkeeperReply:
        typeof j.shopkeeperReply === "string" ? j.shopkeeperReply : "",
    };
  } catch (e) {
    grokUsable = false;
    return null;
  }
}
async function showTeacher(t, A, o, token, baseReply) {
  let C = await getGrokCoach(t, A, o, baseReply);
  if (token !== turnToken) return;
  if (!C) C = teacherCopy(t, A, o);
  lastShopkeeperReply = (C.shopkeeperReply || "").trim();
  if (
    roastHistory.some(
      (x) => x.trim().toLowerCase() === C.roast.trim().toLowerCase(),
    )
  ) {
    const fallback = teacherCopy(t, A, o);
    C.roast = fallback.roast;
  }
  roastHistory.push(C.roast);
  if (roastHistory.length > 30) roastHistory.shift();
  learningHistory.push({ learnerReply: t, tip: C.tip });
  if (learningHistory.length > 12) learningHistory.shift();
  const safe = (x) =>
    String(x)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  coachShow(
    A.x,
    `<p><b>${safe(C.roast)}</b></p><p>${safe(C.tip)}</p><div class="bt"><b>Try this:</b> ${safe(C.better)}</div>`,
  );
  const roastSpoken = await speak(C.roast, "en", "omana", "roast");
  if (token !== turnToken) return;
  const tipSpoken = await speak(C.tip, uiLang, "omana", "coach");
  if (token !== turnToken) return;
  const betterSpoken = await speak(C.better, lang, "omana", "coach");
  if (token !== turnToken) return;
  if (roastSpoken || tipSpoken || betterSpoken) closeCoach();
  else
    setTimeout(() => {
      if (token === turnToken) closeCoach();
    }, 6500);
}
function tea(x, L) {
  coachShow(x, L.join(""));
}
function coachShow(x, h) {
  $("cf").src = IM["te_" + x];
  $("cb").innerHTML = h;
  $("coach").classList.add("show");
  $("log").classList.add("sm");
}
function closeCoach() {
  const c = $("coach");
  if (c) {
    c.classList.remove("show");
    $("log").classList.remove("sm");
  }
}
function setBusy(b) {
  S.busy = b;
  ["send", "mic", "ti"].forEach((k) => {
    const e = $(k);
    if (e) e.disabled = b;
  });
}
function petals() {
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.textContent = "🌼";
    p.style.left = Math.random() * 95 + "%";
    p.style.animationDelay = Math.random() * 0.8 + "s";
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 3600);
  }
}
/* teacher analysis: rule-based, generated from the user's actual sentence */
const cap = (x) => (x ? x[0].toUpperCase() + x.slice(1) : x),
  nz = (x) =>
    x
      .toLowerCase()
      .replace(/[^a-z0-9\u0900-\u097F ]/g, "")
      .replace(/\s+/g, " ")
      .trim();
function fb(sc, fx, better, label) {
  return `<span class="sc">${sc}/100</span><ul>${fx.map((m) => `<li class="fx">${m}</li>`).join("")}</ul><div class="bt"><b>${label}</b> ${better}</div>`;
}
function lesson(en, hi) {
  return uiLang === "hi" ? hi : en;
}
const PAT = [
  [
    /\bi want buy\b/,
    'After "want", use "to" before an action: "I want to buy."',
    '"want" के बाद काम बताने वाली क्रिया से पहले "to" लगाएँ: "I want to buy."',
  ],
  [
    /\bhow much price\b/,
    '"How much price" is not natural English. Say "How much is it?" or "What is the price?"',
    '"How much price" स्वाभाविक अंग्रेज़ी नहीं है। कहें: "How much is it?" या "What is the price?"',
  ],
  [
    /\b(very less|less price|cheap price)\b/,
    'For a price, say "too high" or "a lower price" rather than "very less" or "cheap price."',
    'दाम के लिए "very less" या "cheap price" की जगह "too high" या "a lower price" कहें।',
  ],
  [
    /\bme (want|need|take|pay)\b/,
    'Use "I" as the subject: "I want" or "I will pay," not "me want/pay."',
    'वाक्य के कर्ता के रूप में "I" बोलें: "I want" या "I will pay", "me want/pay" नहीं।',
  ],
  [
    /\bi am wanting\b/,
    'For a preference, use "I want" rather than "I am wanting."',
    'अपनी इच्छा बताने के लिए "I am wanting" की जगह "I want" कहें।',
  ],
  [
    /\bwhat price\b/,
    'Make a complete question: "What is the price?"',
    'पूरा सवाल पूछें: "What is the price?"',
  ],
];
function fixEn(t, o) {
  let s = t.trim().replace(/\s+/g, " ");
  for (const [r, v] of [
    [/\bi want buy\b/i, "I want to buy"],
    [/\bhow much price\b/i, "How much is it"],
    [/\bvery less\b/i, "too low"],
    [/\b(less|cheap) price\b/i, "a lower price"],
    [/\bme (want|need|take|pay)\b/i, "I $1"],
    [/\bi am wanting\b/i, "I want"],
    [/\bwhat price\b/i, "What is the price"],
  ])
    s = s.replace(r, v);
  const m = s.match(/^(?:you\s+)?(give|show|tell)\s+(me\s+)?(.*)$/i);
  if (m) s = `Could you ${m[1].toLowerCase()} ${m[2] ? "me " : ""}${m[3]}`;
  s = s.replace(/\bi\b/g, "I").replace(/[.?!]+$/, "");
  s = cap(s);
  s += /^(could|can|would)\b/i.test(s) || /^(how|what)\b/i.test(s) ? "?" : ".";
  if (nz(s) == nz(t))
    s =
      o != null
        ? `Could you do it for ₹${o}, please?`
        : "Could you tell me the price, please?";
  return s;
}
function analyze(t, o) {
  const lw = t
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
    n = lw.split(" ").length,
    fx = [];
  let x = "happy";
  const f = (lw.match(/\b(um+|uh+|er+|like|you know|basically)\b/g) || [])
    .length;
  if (f >= 2) {
    fx.push(
      lesson(
        'Try to reduce repeated fillers such as "um" or "like." A short pause is perfectly fine.',
        '"um", "मतलब" या "हम्म" जैसे filler शब्द कम बोलिए। रुकना हो तो थोड़ी देर रुकें।',
      ),
    );
    x = "angry";
  }
  const greeting =
    /^(hi|hello|hey|good morning|good afternoon|good evening|namaste|namaskara|namaskaram|नमस्ते|नमस्कार|नमस्कारम)$/i.test(
      lw,
    );
  if (n <= 2 && o == null && !greeting) {
    fx.push(
      lesson(
        "Add a polite phrase and a clear request so the shopkeeper knows what you want.",
        "एक विनम्र शब्द और साफ़ अनुरोध जोड़ें, ताकि दुकानदार समझे कि आप क्या चाहते हैं।",
      ),
    );
    x = "thinking";
  }
  for (const [r, en, hi] of PAT)
    if (r.test(lw)) {
      fx.push(lesson(en, hi));
      if (x == "happy") x = "laughing";
    }
  if (/^(you )?(give|show|tell) /.test(lw)) {
    fx.push(
      lesson(
        'A direct command can sound abrupt. Try "Could you ...?" to make the request polite.',
        'सीधा आदेश थोड़ा रूखा लग सकता है। अनुरोध को विनम्र बनाने के लिए "Could you ...?" कहें।',
      ),
    );
    if (x == "happy") x = "thinking";
  }
  const sc = Math.max(10, 100 - fx.length * 18);
  return {
    x,
    sc,
    fx,
    html: fx.length ? fb(sc, fx, fixEn(t, o), "बेहतर वाक्य:") : "",
  };
}
const HIMP = {
  करो: "कीजिए",
  बताओ: "बताइए",
  दिखाओ: "दिखाइए",
  सुनो: "सुनिए",
  karo: "kijiye",
  batao: "bataiye",
  dikhao: "dikhaiye",
  suno: "suniye",
  तू: "आप",
  तुम: "आप",
  तेरा: "आपका",
  तेरी: "आपकी",
  tu: "aap",
  tum: "aap",
  tera: "aapka",
};
function fixHi(t, o) {
  const w = t
    .trim()
    .replace(/[।.?!]+$/, "")
    .split(/\s+/);
  const r = w
    .map((x, i) => {
      const p = w[i - 1];
      if ((x == "दो" && p == "दे") || (x == "do" && p == "de"))
        return x == "दो" ? "दीजिए" : "dijiye";
      if (x == "dedo") return "de dijiye";
      if (x == "देदो") return "दे दीजिए";
      return HIMP[x] || x;
    })
    .join(" ");
  if (nz(r) == nz(t))
    return o != null
      ? `भैया, क्या आप ₹${o} में दे सकते हैं?`
      : "भैया, इसका दाम क्या है?";
  return r + (/[a-z]/i.test(r) ? "." : "।");
}
function analyzeHi(t, o) {
  const lw = t
      .toLowerCase()
      .replace(/[.,?!।]/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
    W = lw.split(" "),
    n = W.length,
    fx = [];
  let x = "happy";
  const f = (
    lw.match(/\b(matlab|woh|umm+|hmm+|yani)\b|मतलब|वो|हम्म|यानी/g) || []
  ).length;
  if (f >= 2) {
    fx.push(
      lesson(
        'Repeated fillers like "मतलब" or "हम्म" can make the offer harder to follow. Pause briefly instead.',
        '"मतलब" या "हम्म" बार-बार कहने से प्रस्ताव समझना मुश्किल हो सकता है। इसकी जगह थोड़ी देर रुकें।',
      ),
    );
    x = "thinking";
  }
  const greeting =
    /^(namaste|namaskaram|vanakkam|adaab|hi|hello|नमस्ते|नमस्कार|नमस्कारम|वणक्कम|आदाब)$/i.test(
      lw,
    );
  if (n <= 2 && o == null && !greeting) {
    fx.push(
      lesson(
        "Add a polite phrase and a clear request so the shopkeeper knows what you want.",
        "एक विनम्र शब्द और साफ़ अनुरोध जोड़ें, ताकि दुकानदार समझे कि आप क्या चाहते हैं।",
      ),
    );
    x = "thinking";
  }
  if (W.some((w) => /^(tu|tum|tera|तू|तुम|तेरा|तेरी)$/.test(w))) {
    fx.push(
      lesson(
        'Use the respectful "आप" when speaking to a shopkeeper, rather than "तू" or "तुम."',
        'दुकानदार से आदर से बात करने के लिए "तू" या "तुम" की जगह "आप" कहें।',
      ),
    );
    if (x == "happy") x = "laughing";
  }
  if (
    W.some((w, i) => HIMP[w] && !/^(tu|tum|tera|तू|तुम|तेरा|तेरी)$/.test(w)) ||
    /(^| )(de do|दे दो|dedo|देदो)( |$)/.test(lw)
  ) {
    fx.push(
      lesson(
        'These are casual commands. Use the polite forms "दे दीजिए", "कीजिए", or "बताइए."',
        'ये अनौपचारिक आदेश हैं। विनम्र रूप "दे दीजिए", "कीजिए" या "बताइए" इस्तेमाल करें।',
      ),
    );
    if (x == "happy") x = "thinking";
  } else if (
    n >= 3 &&
    !/(kya aap|क्या आप|kripya|कृपया|please|दीजिए|dijiye|सकते हैं|sakte hain|सकती हैं|भैया|bhaiya|(^| )(ji|जी)( |$))/.test(
      lw,
    )
  ) {
    fx.push(
      lesson(
        'A polite phrase such as "कृपया" or "क्या आप ...?" makes this bargaining request sound more respectful.',
        'इस अनुरोध को और आदरपूर्ण बनाने के लिए "कृपया" या "क्या आप ...?" जोड़ें।',
      ),
    );
    if (x == "happy") x = "thinking";
  }
  const sc = Math.max(10, 100 - fx.length * 18);
  return {
    x,
    sc,
    fx,
    html: fx.length ? fb(sc, fx, fixHi(t, o), "Better sentence:") : "",
  };
}
/* turn */
async function say(t, secs) {
  try {
    await sayTurn(t, secs);
  } catch (err) {
    console.error("Turn failed:", err);
    if (S && S.st === "on") setBusy(false);
    const lv = $("live");
    if (lv) lv.textContent = "Something went wrong. Please try again.";
  }
}
async function sayTurn(t, secs) {
  t = t.trim();
  if (!t || S.busy || S.st !== "on") return;
  setBusy(true);
  closeCoach();
  const token = ++turnToken,
    c = S.c;
  S.words += t.split(/\s+/).length;
  S.secs += secs || Math.max(1.5, t.split(/\s+/).length * 0.45);
  add("u me", `<small>You</small>${t.replace(/</g, "&lt;")}`);
  const lw = t.toLowerCase(),
    o = num(t),
    A = (lang === "hi" ? analyzeHi : analyze)(t, o, secs);
  let shopX = "surprised",
    reply = "",
    end = 0;
  if (o == null) {
    if (
      /hello|hi\b|namaste|namaskaram|नमस्ते|नमस्कार|हेलो|राम राम|good (morning|evening|afternoon)/.test(
        lw,
      )
    ) {
      shopX = "happy";
      reply = T("greet");
    } else if (
      /quality|real|original|asli|genuine|असली|क्वालिटी|बढ़िया/.test(lw)
    ) {
      shopX = "happy";
      reply = T("real");
    } else reply = T("num");
  } else if (o >= S.ask || o >= c.fair) {
    shopX = "happy";
    reply = T("deal", Math.min(o, S.ask));
    end = 1;
    S.final = Math.min(o, S.ask);
  } else {
    S.rd++;
    if (o < c.min * 0.6) {
      S.pat -= 30;
      S.ins++;
      shopX = "scolding";
      reply = T("ins");
      S.ask = r10(S.ask * 0.98);
    } else if (o < c.min) {
      S.pat -= 15;
      shopX = "laughing";
      reply = T("low");
      S.ask = r10(S.ask * 0.96);
    } else {
      S.pat -= 5;
      S.ask = Math.max(c.fair, r10(S.ask - (S.ask - o) * 0.5));
      shopX = "thinking";
      reply = T("ok");
    }
    if (S.pat <= 0) {
      shopX = "angry";
      reply = T("bye");
      end = 2;
    }
  }
  $("pat").style.width = Math.max(0, S.pat) + "%";
  $("pat").style.background =
    S.pat > 60 ? "var(--gr)" : S.pat > 30 ? "var(--mg)" : "var(--kk)";
  lastShopkeeperReply = "";
  await showTeacher(t, A, o, token, reply);
  if (token !== turnToken) return;
  const actualShopReply = lastShopkeeperReply || reply;
  await shop(shopX, actualShopReply);
  if (token !== turnToken) return;
  shopHistory.push({ customer: t, shopkeeper: actualShopReply });
  if (shopHistory.length > 20) shopHistory.shift();
  if (o != null && S.used < 99) S.used++;
  S.sc = S.sc || [];
  S.sc.push(A.sc);
  if (end) setTimeout(() => finish(end), 700);
  setBusy(false);
}
function finish(e) {
  S.st = "done";
  const avg = Math.round(S.sc.reduce((a, b) => a + b, 0) / S.sc.length),
    c = S.c;
  if (e == 1) {
    petals();
    const sv = c.open - S.final;
    sys(
      `${lang == "hi" ? `🎉 <b>डील पक्की!</b> ₹${S.final} में सौदा। आपने ₹${sv} बचाए। हिंदी स्कोर: <b>${avg}/100</b>।` : `🎉 <b>Deal!</b> ₹${S.final} for ${c.item}. You saved ₹${sv}. English score: <b>${avg}/100</b>.`}<br><button class="btn" id="again">Phir se khelo</button> <button class="btn" id="home">Dusra shehar</button>`,
    );
    tea(avg >= 70 ? "happy" : "thinking", [
      `<i>${lang == "hi" ? (avg >= 70 ? "Well done! Distinction. I will tell your mother." : 'Pass marks. Say "क्या आप थोड़ा कम कर सकते हैं?" fifty times.') : avg >= 70 ? "शाबाश! डिस्टिंक्शन। मैं तुम्हारी मम्मी को बताऊँगी।" : 'पास हो गए। "Could you do better?" पचास बार बोलो।'}</i>`,
    ]);
  } else {
    sys(
      `${lang == "hi" ? `दुकानदार ने दुकान बंद कर दी। हिंदी स्कोर: <b>${avg}/100</b>।` : `The shopkeeper closed the shop. English score: <b>${avg}/100</b>.`}<br><button class="btn" id="again">Phir se khelo</button> <button class="btn" id="home">Dusra shehar</button>`,
    );
    tea("scolding", [
      lang == "hi"
        ? "<i>Never give up on grammar OR on price!</i>"
        : "<i>व्याकरण और दाम, दोनों पर हार मत मानो!</i>",
    ]);
  }
}
function stopAllSpeech() {
  // Piper audio is a separate <audio> element, so speechSynthesis.cancel()
  // alone leaves it playing (and the mic then hears the shopkeeper).
  piperRequest++;
  if (piperAudio) {
    piperAudio.pause();
    piperAudio.src = "";
    piperAudio = null;
  }
  if (window.speechSynthesis) speechSynthesis.cancel();
}
function resetMicUi() {
  rec = null;
  const m = $("mic");
  if (m) m.classList.remove("rec");
}
function mic() {
  const R = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!R) {
    $("live").textContent = "Voice input is not supported here. Use Chrome or Edge, or type.";
    return;
  }
  if (rec) {
    try {
      rec.stop();
    } catch (e) {
      resetMicUi();
    }
    return;
  }
  const r = new R();
  r.lang = lang == "hi" ? "hi-IN" : "en-IN";
  r.interimResults = true;
  r.continuous = false;
  r.maxAlternatives = 1;
  const t0 = Date.now();
  let tx = "",
    failed = false,
    heard = false;
  rec = r;
  r.onstart = () => {
    $("live").textContent = "Listening... speak now";
  };
  r.onspeechstart = () => {
    heard = true;
  };
  r.onresult = (e) => {
    tx = "";
    for (let i = 0; i < e.results.length; i++) tx += e.results[i][0].transcript;
    $("ti").value = tx;
    $("live").textContent = "Listening... " + tx;
  };
  r.onerror = (e) => {
    failed = true;
    const messages = {
      network:
        "Browser speech recognition could not connect. Open this game in Chrome or Edge with internet access, or type your reply.",
      "not-allowed":
        "Microphone access is blocked. Allow microphone access for this site in your browser settings, or type your reply.",
      "service-not-allowed":
        "Browser speech recognition is disabled. Try Chrome or Edge, or type your reply.",
      "audio-capture":
        "No microphone was detected. Check your microphone connection, or type your reply.",
      "no-speech": "No speech was detected. Try again or type your reply.",
      aborted: "",
    };
    console.warn("SpeechRecognition error:", e.error);
    $("live").textContent =
      e.error in messages
        ? messages[e.error]
        : `Speech input failed (${e.error}). Try again or type your reply.`;
    // Some browsers never fire onend after a fatal error; don't leave the mic stuck.
    if (e.error !== "no-speech") resetMicUi();
  };
  r.onend = () => {
    resetMicUi();
    if (tx.trim()) {
      $("ti").value = "";
      $("live").textContent = "";
      say(tx, (Date.now() - t0) / 1000);
    } else if (!failed) {
      $("live").textContent = heard
        ? "Couldn't catch that. Try again or type your reply."
        : "No speech was detected. Check your mic, then try again.";
    }
  };
  stopAllSpeech();
  // Small delay so the speaker output fully stops before the mic opens.
  setTimeout(() => {
    if (rec !== r) return;
    try {
      r.start();
      $("mic").classList.add("rec");
    } catch (e) {
      resetMicUi();
      $("live").textContent =
        "Could not start speech recognition. Check microphone access, or type your reply.";
    }
  }, 150);
}
document.addEventListener("click", (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  if (t.dataset.ui) {
    uiLang = t.dataset.ui;
    cities();
  } else if (t.dataset.l) {
    lang = t.dataset.l;
    cities();
    document.querySelector('[data-l="' + lang + '"]').focus();
  } else if (t.dataset.c) {
    selCity = t.dataset.c;
    cities();
    document.querySelector('[data-c="' + selCity + '"]').focus();
  } else if (t.id == "startb") {
    if (selCity) start(selCity);
  } else if (t.id == "cx") closeCoach();
  else if (t.id == "back" || t.id == "home") cities();
  else if (t.id == "again") start(S.c.id);
  else if (t.id == "mic") mic();
  else if (t.id == "send") {
    const i = $("ti");
    say(i.value);
    i.value = "";
  } else if (t.id == "vo") {
    voice = !voice;
    t.textContent = voice ? "🔊" : "🔇";
    t.setAttribute("aria-pressed", voice);
    if (!voice) speechSynthesis.cancel();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") closeCoach();
  if (e.key == "Enter" && e.target.id == "ti") {
    e.preventDefault();
    const v = e.target.value;
    e.target.value = "";
    say(v);
  }
});