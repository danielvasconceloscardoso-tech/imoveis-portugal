// Prompt 29 §2d (D56, D57): the demo film v3, one voice (the buyer thinking out loud at night) while the picture shows
// the site solving each problem; 13 shots from content/demos/screenplay.json, 1080p, 60 fps, rendered frame by frame on
// real screens of the built site. Each shot holds until its line ends plus 0.6 s. Act 1 is cold and lit only by the
// screen; acts 2 and 3 are warm, in the site's own light. Writes the clean film, the captioned film, the .vtt, the
// voice .mp3, the 6-second silent loop and one frame per shot.
// Stock clips (night skylines, the laptop's glow, the morning cities) need pexels.com, which this build environment
// cannot reach: until then shots 1 and 11 use a designed night plate, and shot 12 uses our licensed photo of the city
// where we have one (Lisbon, Porto) or a plain morning plate (marked in sponsors/demos/README.md).
// Usage (from site/, built site on http://127.0.0.1:4326): node scripts/demo-film.mjs <token> <voice dir> <out dir>
import { createRequire } from "node:module";
import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, rmSync, readFileSync, writeFileSync, copyFileSync } from "node:fs";
import { join } from "node:path";
const { chromium } = createRequire(join(process.cwd(), "package.json"))("playwright");
const [token, VOICE, OUTDIR] = process.argv.slice(2);
const BASE = "http://127.0.0.1:4326", FPS = 60, W = 1920, H = 1080, X = 0.4;
const SP = JSON.parse(readFileSync(join(process.cwd(), "..", "content", "demos", "screenplay.json"), "utf8"));
const S = SP.demos[token], F = await fetch(`${BASE}/d/${token}/film.json`).then((r) => r.json());
const LD = JSON.parse(readFileSync(join(VOICE, token, "lines.json"), "utf8"));
const ed = S.ed, name = S.name, tmp = join(OUTDIR, `tmp-${token}`); mkdirSync(tmp, { recursive: true });

const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const span = (t, a, b) => ease((t - a) / (b - a));
const lerp = (a, b, k) => a + (b - a) * k;
// A shot holds at least `min` seconds, and until its line (starting `lead` s in) ends plus 0.6 s.
const hold = (shot, min, lead = 0.4) => Math.max(min, LD[shot] ? lead + LD[shot].dur + 0.6 : 0);

const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--hide-scrollbars"] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.emulateMedia({ reducedMotion: "reduce" });  // the site's own transitions off: every motion here is set per frame
const CLEAN = `html{scrollbar-width:none}::-webkit-scrollbar{display:none}*{caret-color:transparent!important;cursor:none!important}.dm-top,.dm-foot,.dmb{display:none!important}`;
async function go(url) {
  await page.goto(BASE + url, { waitUntil: "load" });
  await page.addStyleTag({ content: CLEAN });
  await page.evaluate(async () => {
    try { sessionStorage.clear(); localStorage.clear(); } catch {}
    document.querySelectorAll("img").forEach((i) => { i.loading = "eager"; });
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; }))));
  });
}
const ev = (fn, arg) => page.evaluate(fn, arg);
const night = () => page.addStyleTag({ content: `html{filter:brightness(.56) saturate(.6) contrast(1.06)}body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:99;background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(20,40,80,.05),rgba(2,4,12,.62))}` });

const shots = [], tl = { lines: [], keys: [], clicks: [] };
let clock = 0;  // start of the current shot on the final timeline
async function shot(n, dur, frame, { lead = 0.4, label = "" } = {}) {
  const out = join(tmp, `s${String(n).padStart(2, "0")}.mp4`);
  const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-preset", "medium", "-r", String(FPS), out]);
  const done = new Promise((r, j) => ff.on("close", (c) => (c ? j(new Error(`ffmpeg shot ${n}`)) : r())));
  const frames = Math.round(dur * FPS), t0 = Date.now();
  for (let i = 0; i < frames; i++) {
    await frame(i / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  }
  ff.stdin.end(); await done;
  if (S.lines[String(n)]) tl.lines.push({ shot: String(n), at: +(clock + lead).toFixed(3), text: S.lines[String(n)] });
  shots.push({ n, out, dur, start: clock, label });
  clock += dur - X;
  console.log(`shot ${n}`, `${dur.toFixed(2)}s`, `${((Date.now() - t0) / 1000).toFixed(0)}s render`);
}
const at = (t) => +(clock + t).toFixed(3);  // a moment inside the shot being rendered, on the final timeline

// ---------------------------------------------------------------- plates (designed in our own type; no other brand)
async function plate(html, css = "") {
  await go(`/d/${token}/`);
  await ev(([html, css]) => {
    document.body.innerHTML = `<div class="pl">${html}</div>`;
    const st = document.createElement("style");
    st.textContent = `body{margin:0;background:#000}.pl{position:fixed;inset:0;overflow:hidden;font-family:"Jost Variable",sans-serif}[data-a]{opacity:0}
      .nt{position:absolute;inset:0;background:radial-gradient(ellipse 80% 55% at 50% 0%,#0d1730 0%,#05070d 70%)}
      .glow{position:absolute;left:50%;bottom:-18%;width:1100px;height:620px;transform:translateX(-50%);background:radial-gradient(ellipse at 50% 60%,rgba(190,215,255,.34),rgba(140,170,230,.12) 45%,transparent 70%);filter:blur(8px)}
      .hand{position:absolute;left:50%;bottom:0;width:760px;height:150px;transform:translateX(-50%);background:radial-gradient(ellipse at 50% 100%,rgba(222,196,170,.30),transparent 70%)}
      .city{position:absolute;left:150px;bottom:150px;color:#f2f2f2;font:500 26px/1 "Jost Variable";letter-spacing:.08em}
      .ill{position:absolute;right:56px;bottom:46px;color:#8b8f95;font:400 15px/1 "Jost Variable";letter-spacing:.06em}
      .ph{position:absolute;inset:0;background-size:cover;background-position:center}.mo{position:absolute;inset:0;background:linear-gradient(#f3efe6,#e6eef2)}
      .tag{position:absolute;left:120px;bottom:120px;color:#fff;font:500 28px/1 "Jost Variable";letter-spacing:.08em;text-shadow:0 2px 16px rgba(0,0,0,.45)}
      .end{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;color:#f4f2ee;text-align:center}
      .wm{font:500 58px/1 "Playfair Display Variable",serif}.wm i{display:inline-block;width:14px;height:14px;background:#7fa38f;margin-right:22px;vertical-align:middle}
      .ln{font:400 44px/1.2 "Playfair Display Variable",serif}.sm{font:400 17px/1 "Jost Variable";letter-spacing:.14em;text-transform:uppercase;color:#9a9ea4}
      .tabs{position:absolute;inset:0;background:#0b0d12}.strip{position:absolute;left:0;right:0;top:0;height:64px;background:#15181e;display:flex;gap:6px;padding:14px 12px 0;overflow:hidden}
      .tb{flex:0 0 150px;height:50px;border-radius:10px 10px 0 0;background:#20242c;display:flex;align-items:center;gap:10px;padding:0 14px}.tb i{width:16px;height:16px;border-radius:4px;background:#3a3f4a}.tb b{height:8px;flex:1;border-radius:4px;background:#3a3f4a;filter:blur(1.5px)}
      .pg{position:absolute;left:12%;right:12%;top:120px;bottom:0;background:#1a1d24;filter:blur(6px);opacity:.9}.pg b{display:block;height:18px;margin:40px 60px 0;border-radius:6px;background:#2c313b}
      ${css}`;
    document.head.append(st);
  }, [html, css]);
}
const fade = (t, spec) => ev(([t, spec]) => {
  for (const [sel, a, b, out] of spec) document.querySelectorAll(sel).forEach((el) => {
    let k = Math.max(0, Math.min(1, (t - a) / (b - a))); if (out) k = 1 - k; el.style.opacity = String(k);
  });
}, [t, spec]);

// ---------------------------------------------------------------- the map, as on the site
async function mapPage(url, hideCard) {
  await go(url);
  await page.waitForFunction(() => document.querySelector(".mapx")?.__mapx, null, { timeout: 60000 });
  await ev(() => document.querySelector(".mapx").__mapx.load());
  await page.waitForSelector(".mapx.is-live", { timeout: 90000 });
  await page.addStyleTag({ content: `html,body{overflow:hidden;background:#f6f3ee}.hd,footer,.frame>h1,.lede,.mapx-controls,.mapx-bar,.mapx-devbar,.mapx-legend,.mapx-powered,.cbar,.maplibregl-ctrl,.maplibregl-control-container{display:none!important}
    .mapx-stage{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;z-index:5}.mapx-canvas{position:absolute!important;inset:0!important;width:100%!important;height:100%!important}
    ${hideCard ? ".mapx-card{visibility:hidden}" : ""}` });
  await ev(() => { const m = document.querySelector(".mapx").__mapx.map(); m.resize(); for (const id of ["muni-3d", "muni-3d-p"]) if (m.getLayer(id)) m.setPaintProperty(id, "fill-extrusion-height-transition", { duration: 0, delay: 0 }); window.__orig = {}; for (const id of ["muni-3d", "muni-3d-p"]) if (m.getLayer(id)) window.__orig[id] = m.getPaintProperty(id, "fill-extrusion-height"); });
  await page.waitForTimeout(1500);
}
const mapFrame = (cam, k = 1) => ev(async ([cam, k]) => {
  const m = document.querySelector(".mapx").__mapx.map();
  const scale = (e) => (Array.isArray(e) && e[0] === "interpolate" && JSON.stringify(e[2]) === '["zoom"]') ? e.map((x, i) => (i > 3 && i % 2 === 1 ? scale(x) : x)) : ["*", k, e];
  const kk = Math.round(Math.min(1, k) * 40) / 40;
  if (window.__k !== kk) { window.__k = kk; for (const [id, e] of Object.entries(window.__orig)) m.setPaintProperty(id, "fill-extrusion-height", kk >= 1 ? e : scale(e)); }
  if (cam) m.jumpTo(cam);
  await new Promise((r) => { const to = setTimeout(r, 4000); m.once("idle", () => { clearTimeout(to); r(); }); m.triggerRepaint(); });
}, [cam, k]);
const scrollY = (y) => ev((y) => scrollTo(0, y), y);
const topOf = (sel, off = 0) => ev(([s, o]) => { const e = document.querySelector(s); return e ? e.getBoundingClientRect().top + scrollY - o : 0; }, [sel, off]);

// ================================================================ ACT 1 · the dark
// 1 · Black, "City. 11:48 pm", "Illustrative buyer journey"; then the night and the laptop's glow on a hand.
await plate(`<div class="nt" data-a="n"></div><div class="glow" data-a="g"></div><div class="hand" data-a="h"></div><div class="city" data-a="c">${S.city}. 11:48 pm</div><div class="ill" data-a="i">Illustrative buyer journey</div>`);
await shot(1, hold("1", 7, 1.2), (t) => fade(t, [['[data-a="c"]', 0.3, 1.0], ['[data-a="i"]', 0.5, 1.2], ['[data-a="n"]', 2.0, 3.6], ['[data-a="g"]', 2.6, 4.2], ['[data-a="h"]', 3.2, 4.6], ['[data-a="c"]', 4.6, 5.4, true]])
  .then(() => ev((t) => { const g = document.querySelector(".glow"); g.style.transform = `translateX(-50%) scale(${1 + 0.015 * Math.sin(t * 1.3)})`; }, t)), { lead: 1.2 });

// 2 · Twenty unbranded tabs; then a plain search field in our own design, the question typed, our result, one click.
await plate(`<div class="tabs"><div class="strip">${Array.from({ length: 20 }, () => '<div class="tb"><i></i><b></b></div>').join("")}</div><div class="pg">${"<b></b>".repeat(9)}</div></div>`);
let searchReady = false; const q = S.search, d2 = hold("2", 7.6);
const kAt = (i) => 3.0 + (i * 2.2) / q.length;
await shot(2, d2, async (t) => {
  if (t < 2.6) return ev((t) => { document.querySelector(".tabs").style.transform = `scale(${1 + 0.02 * t / 2.6})`; }, t);
  if (!searchReady) {
    searchReady = true; await go(`/d/${token}/search/`); await night();
    await ev(() => { const c = document.createElement("i"); c.className = "dot"; c.style.cssText = "position:fixed;z-index:120;width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,.92);box-shadow:0 0 0 6px rgba(255,255,255,.18);left:1250px;top:760px;opacity:0"; document.body.append(c); });
    for (let i = 0; i < q.length; i++) tl.keys.push(at(kAt(i))); tl.clicks.push(at(6.8));
  }
  const n = Math.max(0, Math.min(q.length, Math.floor((t - 3.0) / (2.2 / q.length)) + 1));
  const link = await ev(() => { const r = document.querySelector("[data-sr-link]").getBoundingClientRect(); return [r.left + 160, r.top + r.height / 2]; });
  await ev(([s, t, link]) => {
    document.querySelector("[data-sr-q]").textContent = s;
    const res = document.querySelector("[data-sr-res]"); res.style.opacity = String(Math.max(0, Math.min(1, (t - 5.4) / 0.4)));
    const dot = document.querySelector(".dot"), k = Math.max(0, Math.min(1, (t - 5.9) / 0.8)), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    dot.style.opacity = t > 5.8 ? "1" : "0"; dot.style.left = `${1250 + (link[0] - 1250) * e}px`; dot.style.top = `${760 + (link[1] - 760) * e}px`;
    dot.style.transform = t > 6.8 && t < 7.05 ? "scale(.7)" : "scale(1)";
    document.querySelector("[data-sr-link]").style.textDecoration = t > 6.8 ? "underline" : "none";
  }, [t < 3.0 ? "" : q.slice(0, n), t, link]);
});
tl.act1 = [0, clock + X];

// ================================================================ ACT 2 · the light
// 3 · Half a second of black; the site fades up in warm light, like a sunrise: the coast, the wordmark.
await go(`/en/${ed}/`);
await ev(() => { const o = document.createElement("div"); o.id = "fx"; o.style.cssText = "position:fixed;inset:0;z-index:200;pointer-events:none;background:#000"; const w = document.createElement("div"); w.id = "warm"; w.style.cssText = "position:fixed;inset:0;z-index:199;pointer-events:none;background:linear-gradient(180deg,rgba(255,190,120,.35),rgba(255,160,90,.12))"; document.body.append(w, o); });
await shot(3, 3.2, (t) => ev((t) => { document.getElementById("fx").style.opacity = String(1 - Math.max(0, Math.min(1, (t - 0.5) / 1.5))); document.getElementById("warm").style.opacity = String(1 - Math.max(0, Math.min(1, (t - 0.8) / 2.2))); }, t));

// 4 · The 3D map rises, glides along the coast and settles on the place: the area card and its ten-year chart.
await mapPage(`/en/${ed}/map/?budget=${Math.round(F.budgetEur)}&cur=${F.cur}`, false);
const endCam = await ev(async (muni) => {
  const M = document.querySelector(".mapx").__mapx, m = M.map(), p = M.project(muni);
  M.pick(p.x, p.y); await new Promise((r) => setTimeout(r, 400));
  const c = m.getCenter(), pad = m.getPadding();
  const cam = { center: [c.lng, c.lat], zoom: m.getZoom(), pitch: m.getPitch(), bearing: m.getBearing(), padding: pad };
  document.querySelector(".mapx-close")?.click(); await new Promise((r) => setTimeout(r, 200));
  return cam;
}, F.muni);
const START = { center: [-8.75, 41.45], zoom: Math.max(6.6, endCam.zoom - 1.3), pitch: 50, bearing: -18, padding: { top: 0, bottom: 0, left: 0, right: 0 } };
let picked = false;
await shot(4, Math.min(6, hold("4", 5.6)), async (t) => {
  const k = span(t, 0.3, 4.3), z = span(t, 0.3, 4.3);
  const cam = picked ? null : { center: [lerp(START.center[0], endCam.center[0], k), lerp(START.center[1], endCam.center[1], k)], zoom: lerp(START.zoom, endCam.zoom, z), pitch: lerp(START.pitch, endCam.pitch, k), bearing: lerp(START.bearing, endCam.bearing, k),
    padding: { top: 0, bottom: lerp(0, endCam.padding.bottom || 0, k), left: 0, right: lerp(0, endCam.padding.right || 0, k) } };
  await mapFrame(cam, span(t, 0, 1.6));
  if (t >= 4.4 && !picked) { picked = true; await ev((muni) => { const M = document.querySelector(".mapx").__mapx, p = M.project(muni); M.pick(p.x, p.y); }, F.muni); await page.waitForTimeout(500); }
});

// 5 · Her budget in her currency: the cost calculator counts up the taxes, the fees, the exchange rate and the total.
await go(`/en/${ed}/calculators/total-cost/?own=0&resident=0&mortgage=0`);
const simTop = await topOf("#sim", 40); const price = String(Math.round(F.budgetEur));
const d5 = hold("5", 7);
for (let i = 0; i < price.length; i++) tl.keys.push(at(0.8 + (i * 1.8) / price.length));
await shot(5, d5, (t) => ev(([t, price, y0]) => {
  const n = Math.max(0, Math.min(price.length, Math.floor((t - 0.8) / (1.8 / price.length)) + 1));
  const el = document.querySelector('input[name="price"]'); const v = t < 0.8 ? "" : price.slice(0, n);
  if (el && el.dataset.v !== v) { el.dataset.v = v; el.value = v ? new Intl.NumberFormat("en-US").format(Number(v)) : ""; el.dispatchEvent(new Event("input", { bubbles: true })); }
  const k = Math.max(0, Math.min(1, (t - 3.0) / 2.2)), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
  scrollTo(0, y0 + 260 * e);
}, [t, price, simTop]));

// 6 · Can we do this from here? The guide for buyers in her country, then the answer: viewings by video, a power of attorney.
await go(`/en/${ed}/buying-from-abroad/`);
let faq = false; let yA = 0;
await shot(6, hold("6", 6.2, 0.3), async (t) => {
  if (t < 2.4) return scrollY(160 * span(t, 0.2, 2.4));
  if (!faq) { faq = true; await go(`/en/${ed}/faq/`); yA = await ev(() => { const d = document.getElementById("en-find"); d.open = true; document.getElementById("en-sign").open = true; return d.getBoundingClientRect().top + scrollY - 160; }); }
  return scrollY(yA + 120 * span(t, 2.6, 6.2));
}, { lead: 0.3 });

// 7 · Who's building there? "Partner developers here" lights up on the place card; their showcase opens.
await mapPage(`/embed/map/en/?place=${F.muni}&demoproj=${token}&devs=1&budget=${Math.round(F.budgetEur)}&cur=${F.cur}`, false);
await page.waitForSelector(".mapx-dev", { timeout: 30000 }).catch(() => {});
await ev(() => { const c = document.querySelector(".mapx-card"), d = document.querySelector(".mapx-devs"); if (c && d) c.scrollTop = d.offsetTop - 120; });
let show = false; let gridY = 0;
await shot(7, Math.max(9, hold("7", 9, 0.3)), async (t) => {
  if (t < 2.4) return ev((t) => { const a = document.querySelector(".mapx-dev"); if (!a) return; const k = Math.max(0, Math.min(1, (t - 0.5) / 0.7)); a.style.background = `rgba(31,74,61,${0.9 * k})`; a.style.color = k > 0.5 ? "#fff" : ""; a.style.padding = "4px 8px"; a.style.borderRadius = "4px"; }, t);
  if (!show) { show = true; await go(F.homes); gridY = await topOf(".sc-grid", 200); tl.clicks.push(at(2.4)); }
  await ev(([t, g]) => { const k = Math.max(0, Math.min(1, (t - 2.4) / 3.4)); const img = document.querySelector(".sc-hero img"); img.style.transform = `scale(${1 + 0.07 * k})`; img.style.transformOrigin = "50% 60%"; document.querySelector(".sc-hero").style.overflow = "hidden";
    const s = Math.max(0, Math.min(1, (t - 5.8) / 3.0)), e = s < .5 ? 4 * s * s * s : 1 - Math.pow(-2 * s + 2, 3) / 2; scrollTo(0, g * e); }, [t, gridY]);
}, { lead: 0.3 });

// 8 · "That one." Hold on one home.
await go(F.home);
await ev(() => { const g = document.querySelector(".sh-gal"); g.style.overflow = "hidden"; });
tl.clicks.push(at(0.2));
await shot(8, hold("8", 3.4, 0.6), (t) => ev((t) => { const i = document.querySelector(".sh-gal img"); i.style.transform = `scale(${1 + 0.05 * t / 3.4})`; i.style.transformOrigin = "40% 50%"; }, t), { lead: 0.6 });

// 9 · A private viewing, by video; the qualified summary assembles line by line; Send.
const formY = await topOf(".dc-form", 80), sumY = await topOf(".dc-form", 40) + 380;
let sumOn = false, sent = false;
await shot(9, hold("9", 6.6, 0.3), async (t) => {
  if (t >= 1.5 && !sumOn) { sumOn = true; await ev(() => { document.querySelector("[data-dc]").dataset.dcStep = "sum"; }); }
  if (t >= 5.9 && !sent) { sent = true; tl.clicks.push(at(5.8)); await ev(() => { document.querySelector("[data-dc]").dataset.dcStep = "sent"; }); }
  await ev(([t, a, b]) => {
    const e = (k) => (k <= 0 ? 0 : k >= 1 ? 1 : k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
    scrollTo(0, t < 1.4 ? a * e(t / 1.2) : a + (b - a) * e((t - 1.6) / 3.0));
    document.querySelectorAll(".dc-sum li").forEach((li) => li.getAnimations().forEach((x) => { x.pause(); x.currentTime = Math.max(0, (t - 1.5) * 1000); }));
    const btn = document.querySelector(".dc-btn"); btn.style.transform = t > 5.6 && t < 5.85 ? "scale(.96)" : "none";
  }, [t, formY, sumY]);
}, { lead: 0.3 });

// 10 · "And we'll need a lawyer. And a bank." Your team for this purchase: the roles light up one by one.
const teamY = await topOf(".dc-team", 260);
const yNow = await ev(() => scrollY);
await shot(10, hold("10", 4.8), (t) => ev(([t, a, b]) => {
  const k = Math.max(0, Math.min(1, t / 0.9)), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; scrollTo(0, a + (b - a) * e);
  document.querySelectorAll(".dc-team li").forEach((li) => li.getAnimations().forEach((x) => { x.pause(); x.currentTime = Math.max(0, (t - 0.4) * 1000); }));
}, [t, yNow, teamY]));

// ================================================================ ACT 3 · the developer
// 11 · "Okay. That's a start." She closes the laptop halfway; the glow stays on her hand.
await plate(`<div class="nt" style="opacity:1"></div><div class="glow" data-g></div><div class="hand" style="opacity:1"></div>`);
await shot(11, hold("11", 3.4, 0.6), (t) => ev((t) => { const k = Math.max(0, Math.min(1, (t - 0.9) / 1.6)); const g = document.querySelector("[data-g]"); g.style.opacity = String(1 - 0.55 * k); g.style.transform = `translateX(-50%) scaleY(${1 - 0.35 * k})`; g.style.transformOrigin = "50% 100%"; }, t), { lead: 0.6 });

// 12 · The next morning, on the developer's side: the city at nine, then their sales inbox: the enquiry opens, summary first.
const photo = { "34c86306cf": "/img/lisboa-alfama-telhados-1200.webp", "7c1e5a90d4": "/img/lisboa-alfama-telhados-1200.webp", f658bd1eef: "/img/porto-ribeira-rabelo-wide-1600.webp" }[token];
await plate(photo ? `<div class="ph" style="background-image:url(${photo})"></div><div class="tag" data-a="t">${S.morning}</div>` : `<div class="mo"></div><div class="tag" data-a="t" style="color:#2b2d31;text-shadow:none">${S.morning}</div>`);
let inbox = false; let msgH = 0;
await shot(12, 8.2, async (t) => {
  if (t < 3.4) return ev((t) => { const p = document.querySelector(".ph"); if (p) p.style.transform = `scale(${1.04 + 0.05 * t / 3.4})`; const g = document.querySelector('[data-a="t"]'); g.style.opacity = String(Math.max(0, Math.min(1, (t - 0.4) / 0.6))); }, t);
  if (!inbox) { inbox = true; await go(`/d/${token}/enquiry/`); msgH = await ev(() => { document.querySelector("[data-em-msg]").style.opacity = "0"; return Math.max(0, document.documentElement.scrollHeight - innerHeight); }); tl.clicks.push(at(3.9)); }
  await ev(([t, h]) => { const k = Math.max(0, Math.min(1, (t - 4.0) / 0.6)); document.querySelector("[data-em-msg]").style.opacity = String(k); document.querySelector("[data-em-row]").style.background = t > 3.9 ? "#eef3f0" : "#fff";
    const s = Math.max(0, Math.min(1, (t - 4.8) / 3.2)), e = s < .5 ? 4 * s * s * s : 1 - Math.pow(-2 * s + 2, 3) / 2; scrollTo(0, Math.min(h, 520) * e); }, [t, msgH]);
});

// 13 · Black. The wordmark, the line, the launch date.
await plate(`<div class="end"><div class="wm" data-a="w"><i></i>Imóveis Portugal</div><div class="ln" data-a="l">Your buyers, wherever they live.</div><div class="sm" data-a="s">Launching 1 December 2026</div></div>`);
await shot(13, 5.2, (t) => fade(t, [['[data-a="w"]', 0.4, 1.2], ['[data-a="l"]', 1.4, 2.2], ['[data-a="s"]', 2.6, 3.2]]));
await browser.close();

// ---------------------------------------------------------------- cut, sound, captions, loop, frames
const duration = clock + X;
tl.duration = +duration.toFixed(3); tl.shots = shots.map((s) => ({ n: s.n, start: +s.start.toFixed(3), dur: s.dur }));
writeFileSync(join(tmp, "timeline.json"), JSON.stringify(tl, null, 1));
let fc = "", last = "0:v", off = 0;
for (let i = 1; i < shots.length; i++) { off += shots[i - 1].dur - X; fc += `[${last}][${i}:v]xfade=transition=fade:duration=${X}:offset=${off.toFixed(3)}[v${i}];`; last = `v${i}`; }
const silent = join(tmp, "picture.mp4");
execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...shots.flatMap((s) => ["-i", s.out]), "-filter_complex", fc.replace(/;$/, ""), "-map", `[${last}]`, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "slow", "-r", String(FPS), silent]);
execFileSync("python3", [join(process.cwd(), "..", "scripts", "demos", "sound.py"), join(tmp, "timeline.json"), join(VOICE, token), tmp], { stdio: "inherit" });
const base = join(OUTDIR, `ImoveisPortugal_Demo_${name}`);
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", silent, "-i", join(tmp, "mix.wav"), "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", `${base}.mp4`]);
copyFileSync(join(tmp, "captions.vtt"), `${base}.vtt`); copyFileSync(join(tmp, "voice.mp3"), `${base}_voice.mp3`);
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", `${base}.mp4`, "-vf", `subtitles=${join(tmp, "captions.vtt")}:force_style='FontName=Manrope ExtraLight,Fontsize=17,PrimaryColour=&H00FFFFFF,OutlineColour=&H66000000,BorderStyle=1,Outline=0,Shadow=1.2,MarginV=46'`,
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "slow", "-c:a", "copy", "-movflags", "+faststart", `${base}_captions.mp4`]);
const s7 = shots.find((s) => s.n === 7);
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", "2.6", "-t", "3", "-i", s7.out, "-filter_complex", "[0:v]fps=30,scale=1280:720,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[o]", "-map", "[o]", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-movflags", "+faststart", "-an", `${base}_loop.mp4`]);
const fdir = join(OUTDIR, "frames", name); mkdirSync(fdir, { recursive: true });
for (const s of shots) execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", String((s.start + s.dur * 0.62).toFixed(2)), "-i", `${base}.mp4`, "-frames:v", "1", "-vf", "scale=960:-1", join(fdir, `shot-${String(s.n).padStart(2, "0")}.jpg`)]);
copyFileSync(join(tmp, "timeline.json"), join(fdir, "timeline.json"));
rmSync(tmp, { recursive: true, force: true });
console.log(`${base}.mp4`, `${duration.toFixed(1)} s`);
