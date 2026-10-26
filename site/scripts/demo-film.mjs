// Prompt 28 §3 (D53, D54): the private demo film, 45–60 s, 1080p, 30 fps, one per developer, plus a 6-second silent
// loop for email previews. Rendered frame by frame (each frame sets the camera, scroll and animation time exactly, then
// is captured), so the camera and scrolls are smooth whatever the machine; no pointer, menus or scrollbars; words only
// as typographic cards, never over the map or the homes. Scenes follow the storyboard, with the "Your team" scene
// after the private viewing and a short embed scene to stay under 60 s. Silence (no music track).
// Usage (from site/, built site served on http://127.0.0.1:4326): node scripts/demo-film.mjs <token> <name> <outdir>
import { createRequire } from "node:module";
import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
const { chromium } = createRequire(join(process.cwd(), "package.json"))("playwright");
const [token, name, outdir] = process.argv.slice(2);
const BASE = "http://127.0.0.1:4326", FPS = 30, W = 1920, H = 1080, X = 0.6;
const tmp = join(outdir, `tmp-${token}`); mkdirSync(tmp, { recursive: true });
const F = await fetch(`${BASE}/d/${token}/film.json`).then((r) => r.json());

const ease = (t) => (t < 0 ? 0 : t > 1 ? 1 : t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const span = (t, a, b) => ease((t - a) / (b - a));
const lerp = (a, b, k) => a + (b - a) * k;

const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--hide-scrollbars"] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const CLEAN = `html{scrollbar-width:none}::-webkit-scrollbar{display:none}*{caret-color:transparent!important;cursor:none!important}`;
async function go(url) {
  await page.goto(BASE + url, { waitUntil: "load" });
  await page.addStyleTag({ content: CLEAN });
  await page.evaluate(async () => {
    document.querySelectorAll("img").forEach((i) => { i.loading = "eager"; });
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
  });
}

const files = [];
async function scene(key, dur, frame) {
  const out = join(tmp, `${String(files.length).padStart(2, "0")}-${key}.mp4`);
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-preset", "medium", "-r", String(FPS), out]);
  const done = new Promise((r, j) => ff.on("close", (c) => (c ? j(new Error(`ffmpeg ${key} ${c}`)) : r())));
  const n = Math.round(dur * FPS), t0 = Date.now();
  for (let i = 0; i < n; i++) {
    await frame(i / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  }
  ff.stdin.end(); await done;
  files.push({ out, dur });
  console.log(key, `${dur}s`, `${((Date.now() - t0) / 1000).toFixed(0)}s render`);
}

// ---------------------------------------------------------------- typographic cards (D50: display serif, generous size)
async function card(html, dark) {
  await go(F.demo);
  await page.evaluate(([html, dark]) => {
    document.body.innerHTML = `<div class="fc ${dark ? "dk" : ""}">${html}</div>`;
    const st = document.createElement("style");
    st.textContent = `body{margin:0}.fc{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;background:#fff;color:#111214;text-align:center}
      .fc.dk{background:#0d0e10;color:#f4f2ee}.fc [data-a]{opacity:0}.big{font:400 92px/1.08 "Playfair Display Variable",serif;letter-spacing:-.01em;max-width:1500px}
      .big span{display:inline-block}.mid{font:400 64px/1.15 "Playfair Display Variable",serif}.word{font:500 54px/1 "Playfair Display Variable",serif;letter-spacing:.01em}.word i{display:inline-block;width:14px;height:14px;background:#1f4a3d;margin-right:22px;vertical-align:middle}
      .dk .word i{background:#7fa38f}.sm{font:500 20px/1 "Jost Variable",sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#8a8d91}
      .field{font:400 72px/1.2 "Playfair Display Variable",serif;min-width:760px;border-bottom:2px solid #111214;padding:6px 8px 14px;text-align:left}
      .lab{font:500 18px/1 "Jost Variable",sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#5f6368;text-align:left;width:776px}`;
    document.head.append(st);
  }, [html, dark]);
}
const fade = (t, spec) => page.evaluate(([t, spec]) => {
  for (const [sel, a, b] of spec) { const el = document.querySelector(sel); if (!el) continue; const k = Math.max(0, Math.min(1, (t - a) / (b - a))); el.style.opacity = String(k); el.style.transform = `translateY(${(1 - k) * 14}px)`; }
}, [t, spec]);

// ---------------------------------------------------------------- the map, without interface
async function mapPage(split) {
  await go(`/embed/map/en/?budget=${F.budgetEur}&cur=${F.cur}&place=${F.muni}`);
  await page.waitForSelector(".mapx.is-live", { timeout: 90000 });
  await page.addStyleTag({ content: `html,body{overflow:hidden;background:#fff}.mapx>*:not(.mapx-stage){display:none!important}.mapx-stage>*:not(.mapx-canvas){display:none!important}
    .mapx-stage,.mapx-canvas{position:fixed!important;top:0!important;bottom:0!important;right:0!important;left:${split ? "38vw" : "0"}!important;width:auto!important;height:100vh!important}
    .maplibregl-ctrl,.maplibregl-control-container,.mapx-proj{display:none!important}
    .fp{position:fixed;left:0;top:0;bottom:0;width:38vw;background:#fff;padding:150px 90px 0 110px;box-sizing:border-box;font-family:"Jost Variable",sans-serif;color:#111214}
    .fp h1{font:400 84px/1 "Playfair Display Variable",serif;margin:0 0 56px}.fp .n{opacity:0;margin:0 0 34px}.fp .n b{display:block;font:400 76px/1 "Playfair Display Variable",serif}
    .fp .n span{font-size:21px;color:#5f6368}.fp .per{opacity:0;font-size:15px;color:#8a8d91;margin-top:10px}.fp .dev{opacity:0;position:absolute;left:110px;right:90px;bottom:110px;border-top:1px solid #111214;padding-top:22px}
    .fp .dev small{display:block;font:500 15px/1 "Jost Variable";letter-spacing:.2em;text-transform:uppercase;color:#5f6368;margin-bottom:12px}.fp .dev span{font:400 40px/1.1 "Playfair Display Variable",serif}` });
  await page.evaluate(([split, F]) => {
    const m = document.querySelector(".mapx").__mapx.map(); m.resize();
    for (const id of ["muni-3d", "muni-3d-p"]) if (m.getLayer(id)) m.setPaintProperty(id, "fill-extrusion-height-transition", { duration: 0, delay: 0 });
    const orig = {}; for (const id of ["muni-3d", "muni-3d-p"]) if (m.getLayer(id)) orig[id] = m.getPaintProperty(id, "fill-extrusion-height");
    window.__orig = orig;
    if (split) {
      const d = document.createElement("div"); d.className = "fp";
      d.innerHTML = `<h1>${F.muniName}</h1>${F.nums.map((n) => `<p class="n"><b>${n.v}</b><span>${n.k}</span></p>`).join("")}<p class="per">${F.period}</p><p class="dev"><small>Partner developers here</small><span>${F.developer} →</span></p>`;
      document.body.append(d);
    }
  }, [split, F]);
}
// One map frame: camera, and how far the chosen municipality has risen (k from 0 to 1; the others stay as they are).
const mapFrame = (cam, k = 1) => page.evaluate(async ([cam, k, muni]) => {
  const m = document.querySelector(".mapx").__mapx.map();
  const scale = (e) => (Array.isArray(e) && e[0] === "interpolate" && JSON.stringify(e[2]) === '["zoom"]')
    ? e.map((x, i) => (i > 3 && i % 2 === 1 ? scale(x) : x))
    : ["case", ["==", ["get", "s"], muni], ["*", k, e], e];
  // Repainting the heights re-evaluates every feature: only while the block is rising, rounded to 2 %.
  const kk = Math.round(Math.min(1, k) * 50) / 50;
  if (window.__k !== kk) { window.__k = kk; for (const [id, e] of Object.entries(window.__orig)) m.setPaintProperty(id, "fill-extrusion-height", kk >= 1 ? e : scale(e)); }
  m.jumpTo({ ...cam, padding: { top: 0, bottom: 0, left: 0, right: 0 } });
  await new Promise((r) => { const to = setTimeout(r, 4000); m.once("idle", () => { clearTimeout(to); r(); }); m.triggerRepaint(); });
}, [cam, k, F.muni]);
const PT = { center: [-8.1, 39.6], zoom: 6.45, pitch: 52, bearing: -24 };

// ---------------------------------------------------------------- scenes
// 1 · 0–4 s: black, the wordmark, "Prepared for … · private preview"
await card(`<div class="word" data-a="w"><i></i>Imóveis Portugal</div><div class="sm" data-a="l">Prepared for ${F.developer} · private preview</div>`, true);
await scene("title", 4, (t) => fade(t, [['[data-a="w"]', 0.4, 1.6], ['[data-a="l"]', 1.7, 2.5]]));

// 2 · 4–10 s: Portugal in 3D, a slow orbit, no interface
await mapPage(false);
await scene("orbit", 6, (t) => { const k = t / 6; return mapFrame({ center: PT.center, zoom: lerp(6.3, 6.6, k), pitch: lerp(46, 54, k), bearing: lerp(-34, 6, k) }); });

// 3 · 10–16 s: the concierge line, then the budget writes itself
await card(`<div class="big"><span data-a="a">${F.line}</span><br><span data-a="b">${F.words}</span></div><div data-a="f"><div class="lab">Budget</div><div class="field" data-type></div></div>`, false);
await scene("buyer", 6, async (t) => {
  await fade(t, [['[data-a="a"]', 0.3, 1.0], ['[data-a="b"]', 1.0, 1.7], ['[data-a="f"]', 2.3, 2.8]]);
  const n = Math.round(F.typed.length * Math.max(0, Math.min(1, (t - 2.9) / 1.8)));
  await page.evaluate((s) => { document.querySelector("[data-type]").textContent = s || " "; }, F.typed.slice(0, n));
});

// 4 · 16–24 s: the camera glides to the municipality, its block rises, three numbers one by one, then the developers here
await mapPage(true);
const to = { center: [F.center[0], F.center[1]], zoom: 8.0, pitch: 50, bearing: 14 };
await scene("place", 8, async (t) => {
  const k = span(t, 0, 3.4);
  await page.evaluate(([t]) => {
    const op = (a, b) => String(Math.max(0, Math.min(1, (t - a) / (b - a))));
    document.querySelectorAll(".fp .n").forEach((el, i) => { el.style.opacity = op(2.2 + i * 1.1, 2.8 + i * 1.1); });
    document.querySelector(".fp .per").style.opacity = op(4.6, 5.1); document.querySelector(".fp .dev").style.opacity = op(6.0, 6.6);
  }, [t]);
  await mapFrame({ center: [lerp(PT.center[0], to.center[0], k), lerp(PT.center[1], to.center[1], k)], zoom: lerp(PT.zoom, to.zoom, k) + 0.12 * (t / 8),
    pitch: lerp(PT.pitch, to.pitch, k), bearing: lerp(PT.bearing, to.bearing, k) + 4 * (t / 8) }, span(t, 2.0, 4.2));
});

// 5 · 24–36 s: their showcase: the image, then the homes with prices, scrolling slowly
await go(F.homes);
const grid = await page.evaluate(() => { const g = document.querySelector(".sc-grid").getBoundingClientRect(); return g.top + scrollY; });
await scene("showcase", 12, (t) => page.evaluate((y) => scrollTo(0, y), t < 2.6 ? 0 : lerp(0, grid - 150 + 420, span(t, 2.6, 11.4))));

// 6 · 36–42 s: one home: gallery, price, the cost of buying it, then "Arrange a private viewing" already filled in
await go(F.home);
const ys = await page.evaluate(() => ({ cost: document.querySelector(".sh-price").getBoundingClientRect().top + scrollY - 140, view: document.querySelector("#viewing").getBoundingClientRect().top + scrollY - 80 }));
await scene("home", 6, (t) => page.evaluate((y) => scrollTo(0, y), t < 1.4 ? 0 : t < 3.4 ? lerp(0, ys.cost, span(t, 1.4, 3.2)) : lerp(ys.cost, ys.view, span(t, 3.6, 5.6))));

// 7 · 42–49 s (§2b): the request goes, the buyer's team assembles itself, then the developer's view of the same enquiry
await page.evaluate(() => { const el = document.querySelector("[data-dc]"); el.classList.add("is-open"); document.getAnimations().forEach((a) => { a.pause(); a.currentTime = 0; }); });
const yt = await page.evaluate(() => document.querySelector("[data-dc-after]").getBoundingClientRect().top + scrollY - 120);
await scene("team", 7, (t) => page.evaluate(([t, a, b]) => {
  scrollTo(0, a + (b - a) * Math.min(1, t / 0.9) ** 0.5);
  document.getAnimations().forEach((x) => { x.pause(); x.currentTime = Math.max(0, (t - 0.5) * 1000); });
}, [t, ys.view, yt]));

// 8 · 49–53 s: on their own website, the same map in their colours (short, to stay under 60 s)
await go(`${F.demo}#site`);
const frameEl = await page.$("#site iframe"); const fr = await frameEl.contentFrame();
await fr.waitForSelector(".mapx.is-live", { timeout: 90000 }); await page.waitForTimeout(2500);
const ysite = await page.evaluate(() => document.querySelector("#site .mock").getBoundingClientRect().top + scrollY + 120);
await scene("site", 4.5, (t) => page.evaluate((y) => scrollTo(0, y), ysite + 40 * (t / 4.5)));

// 9 · 53–58 s: the final card
await card(`<div class="big" data-a="a">Your buyers, wherever they live.</div><div class="word" data-a="w"><i></i>Imóveis Portugal</div>`, false);
await scene("end", 5, (t) => fade(t, [['[data-a="a"]', 0.3, 1.1], ['[data-a="w"]', 2.0, 2.8]]));
await browser.close();

// ---------------------------------------------------------------- crossfades, the film and the loop
let fc = "", last = "0:v", off = 0;
for (let i = 1; i < files.length; i++) {
  off += files[i - 1].dur - X;
  fc += `[${last}][${i}:v]xfade=transition=fade:duration=${X}:offset=${off.toFixed(3)}[v${i}];`; last = `v${i}`;
}
const film = join(outdir, `ImoveisPortugal_Demo_${name}.mp4`);
execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...files.flatMap((f) => ["-i", f.out]), "-filter_complex", fc.replace(/;$/, ""), "-map", `[${last}]`,
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-preset", "slow", "-r", String(FPS), "-movflags", "+faststart", "-an", film]);
const loop = join(outdir, `ImoveisPortugal_Demo_${name}_loop.mp4`);
const sc = files.find((f) => f.out.includes("showcase")).out;
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", "3.2", "-t", "3", "-i", sc, "-filter_complex", "[0:v]scale=1280:720,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[o]", "-map", "[o]",
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-r", String(FPS), "-movflags", "+faststart", "-an", loop]);
rmSync(tmp, { recursive: true, force: true });
const total = files.reduce((a, f) => a + f.dur, 0) - X * (files.length - 1);
console.log(film, `${total.toFixed(1)} s`); console.log(loop);
