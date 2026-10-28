// Prompt 35 §4 (D61), film v5: the interface, rendered full-frame and animated, never as screen snippets.
// Every frame is drawn on a virtual clock (24 fps) and captured whole, so motion is smooth even without a GPU.
//   node ui.mjs stage <search|call|team> <seconds> <outdir>        the film's own scenes (stage.html)
//   node ui.mjs site <path|map|concierge> <seconds> <outdir> <base> the site itself (design-v2 build, English, US edition)
import { createRequire } from "node:module"; import { mkdirSync, writeFileSync } from "node:fs"; import { fileURLToPath } from "node:url";
const { chromium } = createRequire("/home/user/imoveis-portugal/site/package.json")("playwright");
const [kind, name, secs, out, base = "http://localhost:4353"] = process.argv.slice(2); mkdirSync(out, { recursive: true });
const FPS = 24, N = Math.round(Number(secs) * FPS), W = 1920, H = 803;
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--allow-file-access-from-files"] });
const p = await b.newPage({ viewport: { width: W, height: H } });
p.on("pageerror", (e) => console.log("pageerror", e.message));
const cdp = await p.context().newCDPSession(p);
const shot = async (f) => { const r = await cdp.send("Page.captureScreenshot", { format: "png" }); writeFileSync(`${out}/f${String(f).padStart(5, "0")}.png`, Buffer.from(r.data, "base64")); };

if (kind === "stage") {
  await p.goto(new URL("./stage.html", import.meta.url).href);
  if (name === "call") await cdp.send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } }); await p.evaluate((n) => window.scene(n), name); await p.waitForTimeout(400);
  for (let f = 0; f < N; f++) { await p.evaluate((t) => window.render(t), f / FPS); await shot(f); }
  await b.close(); process.exit(0);
}

await p.clock.install({ time: new Date("2026-12-20T22:00:00") }); await p.clock.pauseAt(new Date("2026-12-20T22:00:01"));
await cdp.send("Animation.enable"); await cdp.send("Animation.setPlaybackRate", { playbackRate: 0.12 });
const at = {}; const on = (t, fn) => { (at[Math.round(t * FPS)] ??= []).push(fn); };
const box = async (sel) => { for (const h of await p.$$(sel)) { const bb = await h.boundingBox(); if (bb && bb.width && bb.y >= 0 && bb.y < H) return { x: bb.x + bb.width / 2, y: bb.y + bb.height / 2 }; } return null; };
const click = async (sel) => { const c = await box(sel); if (!c) return console.log("not visible", sel); await p.mouse.move(c.x, c.y, { steps: 8 }); await p.mouse.down(); await p.mouse.up(); };
const proj = (s) => p.evaluate((s) => { const r = document.querySelector("[data-m3]"), c = r.__mapx.project(s), cv = r.querySelector("[data-canvas]").getBoundingClientRect(); return c && { x: cv.left + c.x, y: cv.top + c.y }; }, s);
let url, warm = 0;
if (name === "path") {
  url = "/en/us/step-by-step/";
  on(1.6, () => click(".pdoor"));  // the doors, then her country; it stops before any amount
} else if (name === "map") {
  url = "/en/us/map/"; warm = 8;
  // No figure on screen: the dock and the card stay out; her budget is a range, chosen with one gesture.
  await p.addInitScript(() => addEventListener("DOMContentLoaded", () => {
    const st = document.createElement("style"); st.textContent = `.m3-dock, .m3-sheet, .m3-attr { display: none !important; }
      .rg { position: absolute; z-index: 9; left: 40px; bottom: 40px; width: 460px; padding: 26px 30px 30px; border-radius: 22px; background: rgba(255,255,255,.78); -webkit-backdrop-filter: blur(20px) saturate(1.5); backdrop-filter: blur(20px) saturate(1.5); box-shadow: 0 10px 34px rgba(24,30,36,.12); font-family: "Manrope Variable", sans-serif; }
      .rg p { margin: 0 0 22px; font: 700 12px/1 "Manrope Variable", sans-serif; letter-spacing: .14em; text-transform: uppercase; color: #5d6066; }
      .rg .tr { position: relative; height: 4px; border-radius: 4px; background: rgba(120,120,110,.25); }
      .rg .fi { position: absolute; top: 0; bottom: 0; border-radius: 4px; background: linear-gradient(90deg, #d9c9a0, #2f5d50); }
      .rg .th { position: absolute; top: 50%; width: 30px; height: 30px; margin: -15px 0 0 -15px; border-radius: 50%; background: #fff; box-shadow: 0 2px 10px rgba(0,0,0,.25); }
      .rg .lb { display: flex; justify-content: space-between; margin-top: 18px; font: 400 20px/1 "Playfair Display Variable", serif; color: #111214; }`;
    document.head.append(st);
    const rg = document.createElement("div"); rg.className = "rg"; rg.innerHTML = '<p>Roughly what we can spend</p><div class="tr"><span class="fi"></span><span class="th"></span><span class="th"></span></div><div class="lb"><span>A little</span><span>A lot</span></div>';
    document.querySelector(".m3-stage")?.append(rg);
    window.__rg = (a, z) => { const [t1, t2] = rg.querySelectorAll(".th"); t1.style.left = `${a * 100}%`; t2.style.left = `${z * 100}%`; const f = rg.querySelector(".fi"); f.style.left = `${a * 100}%`; f.style.width = `${(z - a) * 100}%`; };
    window.__rg(.5, .5);
  }));
  on(0.2, async () => { await p.waitForFunction(() => document.querySelector("[data-m3]")?.__mapx, null, { polling: 100, timeout: 30000 }); await p.mouse.move(1100, 420, { steps: 3 }); });
  on(4.6, async () => { const c = await proj("lisboa"); if (c) { await p.mouse.move(c.x, c.y, { steps: 8 }); await p.mouse.down(); await p.mouse.up(); } });
  on(5.0, () => p.mouse.move(960, 6, { steps: 6 }));  // the pointer leaves the map: no label, no figure
} else {
  url = "/en/us/map/?place=lisboa&concierge=9"; warm = 6;
  await p.addInitScript(() => { try { sessionStorage.setItem("ip.flow.concierge", JSON.stringify({ country: "us", budget: "3", purpose: "1", when: "2", place: "Lisboa", name: "Emma", email: "emma@example.com" })); } catch {} });
  await p.addInitScript(() => addEventListener("DOMContentLoaded", () => { const st = document.createElement("style"); st.textContent = ".m3-dock, .m3-attr { display: none !important; } .fl .fl-q:focus-visible { outline: none; }"; document.head.append(st); }));
  await p.route("**/api/request", (r) => r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }));
  on(1.4, () => click(".sh .fl-opt")); on(3.0, () => click(".sh [data-next]")); on(4.4, () => click(".sh [data-consent]"));
  on(5.0, () => p.evaluate(() => document.querySelector(".sh-in").scrollTo({ top: 1e4, behavior: "instant" }))); on(5.8, () => click(".sh [data-send]"));
}
await p.goto(base + url, { waitUntil: "load" });
const ease = (x) => (x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
for (let f = 0; f < N; f++) {
  const t = f / FPS;
  for (const fn of at[f] ?? []) { try { await fn(); } catch (e) { console.log("action", f, e.message.slice(0, 120)); } }
  if (name === "map" && t >= 7.0 && t <= 9.6) {  // the range opens with one gesture; the places it reaches glow
    const k = ease((t - 7.0) / 2.6); await p.evaluate(([a, z, bud]) => { window.__rg?.(a, z); document.querySelector("[data-m3]").__mapx.setBudget(bud); }, [0.5 - 0.16 * k, 0.5 + 0.2 * k, 300000 + 1700000 * k]);
  }
  await p.clock.runFor(1000 / FPS);
  if (f === 6 && warm) await p.waitForTimeout(warm * 1000);  // data and first tiles, in real time
  await p.waitForTimeout(40);
  await shot(f);
}
console.log(kind, name, N, "frames"); await b.close();
