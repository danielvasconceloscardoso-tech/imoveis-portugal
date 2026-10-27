// Prompt 31 (D58), shots 4 and 5: the real map of the site in demo mode, frame by frame at 24 fps and the 2.39:1
// picture size (1280×535 CSS at 1.5×). "glide": slowly along the coast from the north, settling on the place.
// "rise": the budget's square metres growing out of the map. No card, no figure on screen (D58).
// Usage (from site/, built site served on http://127.0.0.1:4326):
//   node ../scripts/demos/v4/mapframes.mjs <token> <place lon,lat> <out dir>
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
const { chromium } = createRequire(join(process.cwd(), "package.json"))("playwright");
const [T, PLACE, OUT] = process.argv.slice(2); mkdirSync(OUT, { recursive: true });
const [lon, lat] = PLACE.split(",").map(Number), B = "http://127.0.0.1:4326";
const w = await (await fetch(`${B}/d/${T}/walk.json`)).json();
const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const p = await b.newPage({ viewport: { width: 1280, height: 535 }, deviceScaleFactor: 1.5 });
const ev = (f, a) => p.evaluate(f, a);
await p.goto(B + w.steps[1].url, { waitUntil: "load" });
await p.waitForFunction(() => document.querySelector(".mapx")?.__mapx, null, { timeout: 60000 });
await ev(() => document.querySelector(".mapx").__mapx.load()); await p.waitForSelector(".mapx.is-live", { timeout: 120000 });
await p.addStyleTag({ content: `html,body{overflow:hidden}.hd,footer,.dmb,.mapx-controls,.mapx-bar,.mapx-devbar,.mapx-legend,.mapx-powered,.cbar,.maplibregl-control-container,.mapx-tip,.mapx-card{display:none!important}
  .mapx-stage{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;max-height:none!important;min-height:0!important;aspect-ratio:auto!important;z-index:5}.mapx-canvas{position:absolute!important;inset:0!important;width:100%!important;height:100%!important}` });
await ev(() => { const m = document.querySelector(".mapx").__mapx.map(); m.resize(); window.__orig = {}; for (const id of ["muni-3d", "muni-3d-p"]) if (m.getLayer(id)) { m.setPaintProperty(id, "fill-extrusion-height-transition", { duration: 0, delay: 0 }); window.__orig[id] = m.getPaintProperty(id, "fill-extrusion-height"); } });
await p.waitForTimeout(1500);
const frame = (cam, k = 1) => ev(async ([cam, k]) => {
  const m = document.querySelector(".mapx").__mapx.map();
  const scale = (e) => (Array.isArray(e) && e[0] === "interpolate" && JSON.stringify(e[2]) === '["zoom"]') ? e.map((x, i) => (i > 3 && i % 2 === 1 ? scale(x) : x)) : ["*", k, e];
  const kk = Math.round(Math.min(1, k) * 48) / 48;
  if (window.__k !== kk) { window.__k = kk; for (const [id, e] of Object.entries(window.__orig)) m.setPaintProperty(id, "fill-extrusion-height", kk >= 1 ? e : scale(e)); }
  m.jumpTo(cam);
  await new Promise((r) => { const to = setTimeout(r, 5000); m.once("idle", () => { clearTimeout(to); r(); }); m.triggerRepaint(); });
}, [cam, k]);
const ease = (x) => x * x * (3 - 2 * x), lerp = (a, b, k) => a + (b - a) * k;
// The coast from the north down to the place: a few waypoints, eased, the camera low and turning slowly.
const WP = [[-8.6, 41.55, 6.4, 46, -22], [-8.75, 40.65, 6.7, 44, -14], [-9.0, 39.75, 7.05, 42, -6], [lon + 0.05, lat + 0.3, 7.6, 40, 2], [lon + 0.08, lat - 0.02, 8.1, 38, 8]];
const cam = (k) => { const s = ease(k) * (WP.length - 1), i = Math.min(WP.length - 2, Math.floor(s)), f = s - i, a = WP[i], c = WP[i + 1];
  return { center: [lerp(a[0], c[0], f), lerp(a[1], c[1], f)], zoom: lerp(a[2], c[2], f), pitch: lerp(a[3], c[3], f), bearing: lerp(a[4], c[4], f) }; };
const N1 = 8 * 24; mkdirSync(join(OUT, "glide"), { recursive: true });
// Lower extrusions read calmer in motion.
for (let i = 0; i < N1; i++) { await frame(cam(i / (N1 - 1)), .55); await p.screenshot({ path: join(OUT, "glide", `f${String(i).padStart(4, "0")}.png`) }); }
console.log("glide", N1);
const N2 = 4 * 24, end = cam(1); mkdirSync(join(OUT, "rise"), { recursive: true });
for (let i = 0; i < N2; i++) { const k = i / (N2 - 1); await frame({ ...end, bearing: end.bearing + 6 * k, zoom: end.zoom - 0.2 * k }, 0.05 + 0.6 * ease(Math.min(1, k * 1.4))); await p.screenshot({ path: join(OUT, "rise", `f${String(i).padStart(4, "0")}.png`) }); }
console.log("rise", N2);
await b.close();
