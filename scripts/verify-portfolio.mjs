import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawn, execFileSync } from "node:child_process";
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
const out = ".codex/qa";
fs.mkdirSync(out, { recursive: true });
const profile = path.join(os.tmpdir(), "portfolio-qa-" + Date.now());
fs.mkdirSync(profile);
const child = spawn(
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  [
    "--headless=new",
    "--user-data-dir=" + profile,
    "--remote-debugging-port=0",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--hide-scrollbars",
    "--disable-gpu",
    "about:blank",
  ],
  { stdio: "ignore", windowsHide: true },
);
let ws;
try {
  let port;
  for (let i = 0; i < 150 && !port; i++) {
    await pause(100);
    try {
      port = parseInt(
        fs.readFileSync(path.join(profile, "DevToolsActivePort"), "utf8"),
      );
    } catch {}
  }
  if (!port) throw Error("Chrome unavailable");
  const ver = await (
    await fetch("http://127.0.0.1:" + port + "/json/version")
  ).json();
  ws = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let seq = 0;
  const pending = new Map();
  const errors = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id) {
      pending.get(m.id)?.(m);
      pending.delete(m.id);
    } else if (m.method === "Runtime.exceptionThrown")
      errors.push(m.params.exceptionDetails.text);
  });
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve) => {
      const id = ++seq;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  const {
    result: { targetId },
  } = await send("Target.createTarget", { url: "about:blank" });
  const {
    result: { sessionId },
  } = await send("Target.attachToTarget", { targetId, flatten: true });
  const S = async (method, params = {}) => {
    const r = await send(method, params, sessionId);
    if (r.error) throw Error(r.error.message);
    return r.result;
  };
  const ev = async (expression) => {
    const r = await S("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (r.exceptionDetails) throw Error(r.exceptionDetails.text);
    return r.result.value;
  };
  await S("Page.enable");
  await S("Runtime.enable");
  await S("Page.addScriptToEvaluateOnNewDocument", {
    source: `window.__cls=0;new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__cls+=e.value}).observe({type:'layout-shift',buffered:true})`,
  });
  const viewport = async (w, h = 900) =>
    S("Emulation.setDeviceMetricsOverride", {
      width: w,
      height: h,
      deviceScaleFactor: 1,
      mobile: w < 600,
    });
  const load = async (route) => {
    await S("Page.navigate", { url: "http://localhost:3000" + route });
    await pause(700);
    await ev("document.fonts.ready");
    await ev(
      `Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))`,
    );
    await pause(150);
  };
  const shot = async (name) => {
    const r = await S("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    fs.writeFileSync(out + "/" + name, Buffer.from(r.data, "base64"));
  };
  const click = async (selector) => {
    const p = await ev(
      `(()=>{const e=document.querySelector(${JSON.stringify(selector)});e.scrollIntoView({block:'center',behavior:'instant'});const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`,
    );
    await S("Input.dispatchMouseEvent", {
      type: "mousePressed",
      ...p,
      button: "left",
      clickCount: 1,
    });
    await S("Input.dispatchMouseEvent", {
      type: "mouseReleased",
      ...p,
      button: "left",
      clickCount: 1,
    });
    await pause(260);
  };
  const results = [];
  const expected =
    "Developer working across data, AI and software. Personal portfolio; no services offered.";
  for (const w of [375, 390, 768, 820, 1024, 1440]) {
    await viewport(w, w < 600 ? 844 : 900);
    for (const route of ["/", "/projects", "/about", "/contact"]) {
      await load(route);
      const r = await ev(
        `(()=>{const header=document.querySelector('.site-header').getBoundingClientRect();const main=document.querySelector('main');const h=main.querySelector('h1').getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth,headerHeight:header.height,titleBelowHeader:h.top>=header.bottom,descriptions:[...document.querySelectorAll('meta[name="description"],meta[property="og:description"],meta[name="twitter:description"]')].map(m=>m.content),brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),cls:window.__cls,emDash:main.textContent.includes(String.fromCharCode(8212))}})()`,
      );
      results.push({ width: w, route, ...r });
      if (
        r.overflow ||
        !r.titleBelowHeader ||
        r.headerHeight !== 62 ||
        r.brokenImages.length ||
        r.emDash ||
        r.descriptions.length !== 3 ||
        r.descriptions.some((d) => d !== expected)
      )
        throw Error("Layout check failed " + JSON.stringify(results.at(-1)));
      if ([390, 1440].includes(w))
        await shot(
          route === "/"
            ? "home-" + w + ".png"
            : route.slice(1) + "-" + w + ".png",
        );
    }
  }
  await viewport(390, 844);
  await load("/");
  await click(".build-trigger");
  const accordion = await ev(
    `({open:document.querySelector('.build-trigger').getAttribute('aria-expanded'),width:document.querySelector('.build-screenshot').getBoundingClientRect().width,overflow:document.documentElement.scrollWidth>innerWidth,liveDots:document.querySelectorAll('.live-status').length})`,
  );
  if (
    accordion.open !== "true" ||
    accordion.overflow ||
    accordion.liveDots !== 4
  )
    throw Error("Accordion failed");
  await shot("build-expanded-390.png");
  await S("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "ArrowDown",
    code: "ArrowDown",
    windowsVirtualKeyCode: 40,
  });
  await S("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "ArrowDown",
    code: "ArrowDown",
    windowsVirtualKeyCode: 40,
  });
  const keyboard = await ev(
    `document.activeElement===document.querySelectorAll('.build-trigger')[1]`,
  );
  if (!keyboard) throw Error("Accordion keyboard navigation failed");
  await ev(`scrollTo({top:0,behavior:'instant'})`);
  await click(".menu-toggle");
  const menu = await ev(
    `(()=>{const d=document.querySelector('dialog');const r=d.getBoundingClientRect();return {open:d.open,width:r.width,height:r.height,focusInside:d.contains(document.activeElement),bodyLocked:document.body.style.overflow==='hidden'}})()`,
  );
  if (
    !menu.open ||
    !menu.focusInside ||
    !menu.bodyLocked ||
    menu.width !== 390 ||
    menu.height !== 844
  )
    throw Error("Menu failed " + JSON.stringify(menu));
  await shot("menu-390.png");
  await S("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await S("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Escape",
    code: "Escape",
    windowsVirtualKeyCode: 27,
  });
  await pause(100);
  const escape = await ev(
    `!document.querySelector('dialog').open&&document.activeElement===document.querySelector('.menu-toggle')`,
  );
  if (!escape) throw Error("Menu escape/focus failed");
  await S("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await click(".build-trigger");
  const reduced = await ev(
    `getComputedStyle(document.querySelector('.accordion-content')).animationName`,
  );
  if (reduced !== "none") throw Error("Reduced motion failed");
  await load("/contact");
  const tapTargets = await ev(
    `([...document.querySelectorAll('.contact-socials a,footer a')].map(a=>{const r=a.getBoundingClientRect();return {text:a.textContent,width:r.width,height:r.height}}))`,
  );
  if (tapTargets.some((t) => t.width < 44 || t.height < 44))
    throw Error("Tap area failed");
  await viewport(1200, 630);
  await load("/");
  await ev(
    `(()=>{const s=document.createElement('style');s.textContent='html,body{overflow:hidden!important} .portfolio-hero{min-height:568px;height:568px;padding-block:40px;grid-template-columns:1.2fr .8fr} .hero-portrait{max-width:336px} .hero-copy h1{font-size:84px}';document.head.append(s);scrollTo(0,0)})()`,
  );
  const social = await S("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  fs.writeFileSync(
    "public/social-preview-v2.png",
    Buffer.from(social.data, "base64"),
  );
  fs.writeFileSync(
    out + "/verification.json",
    JSON.stringify(
      {
        results,
        accordion,
        keyboard,
        menu,
        escape,
        reduced,
        tapTargets,
        errors,
      },
      null,
      2,
    ),
  );
  if (errors.length) throw Error("Browser errors: " + errors.join(", "));
  console.log(
    "PASS: 24 route/viewport combinations, accordion and keyboard, full-screen menu and focus, reduced motion, tap targets, metadata, images, social preview.",
  );
  await send("Browser.close");
} finally {
  ws?.close();
  try {
    execFileSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
    });
  } catch {}
}
