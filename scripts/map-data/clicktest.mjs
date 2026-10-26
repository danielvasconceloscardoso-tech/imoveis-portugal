// Prompt 25 §2.5: click every concelho on the built map and list any that do not open their own card.
// Usage (from the repo root, after `npm run build` in site/): node scripts/map-data/clicktest.mjs [width] [height]
// Runs the map flat and in 3D at the default view; for each concelho it resets the camera, clicks its label point (in 3D
// the visible top of its block) and checks that the card opened for that concelho. Writes content/facts/map/CLICKTEST.md.
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, writeFileSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const { chromium } = createRequire(join(ROOT, "site", "package.json"))("playwright");
const dist = join(ROOT, "site", "dist");
const T = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".webp": "image/webp", ".woff2": "font/woff2" };
const srv = createServer((q, r) => {
  let p = join(dist, decodeURIComponent(q.url.split("?")[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  if (!existsSync(p)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { "Content-Type": T[extname(p)] || "application/octet-stream" }); r.end(readFileSync(p));
}).listen(0);
const base = `http://127.0.0.1:${srv.address().port}`;
const [w, h] = [Number(process.argv[2]) || 1280, Number(process.argv[3]) || 900];
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const results = {};
for (const mode of ["flat", "3d"]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`${base}/pt/lu/mapa/?budget=300000${mode === "flat" ? "&flat=1" : ""}`, { waitUntil: "load" });
  await page.$eval(".mapx-stage", (el) => el.scrollIntoView({ block: "center" }));
  await page.evaluate(() => document.querySelector("[data-mapx]").__mapx.load());
  await page.waitForSelector(".mapx.is-live", { timeout: 60000 });
  await page.waitForTimeout(1500);
  const cam = await page.evaluate(() => { const m = document.querySelector("[data-mapx]").__mapx.map(); return { center: m.getCenter(), zoom: m.getZoom(), pitch: m.getPitch(), bearing: m.getBearing() }; });
  const slugs = await page.evaluate(() => document.querySelector("[data-mapx]").__mapx.slugs());
  const box = await page.$eval("[data-canvas]", (el) => { const r = el.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
  const fail = [];
  for (const s of slugs) {
    await page.evaluate((c) => {
      const mx = document.querySelector("[data-mapx]"); const m = mx.__mapx.map();
      mx.querySelector("[data-card]").hidden = true; m.stop(); m.jumpTo(c);
    }, cam);
    await page.waitForTimeout(60);
    const pt = await page.evaluate((s) => { const p = document.querySelector("[data-mapx]").__mapx.project(s); return p && { x: p.x, y: p.y }; }, s);
    if (!pt || pt.x < 0 || pt.y < 0 || pt.x > box.w || pt.y > box.h) { fail.push(`${s} (off screen)`); continue; }
    // In 3D the block's top face is drawn above its ground label point and taller blocks in front can cover the point:
    // look for the nearest spot above it where the map would pick this concelho, as a reader would aim at the visible top.
    const aim = mode === "flat" ? pt : await page.evaluate(({ s, pt }) => {
      const api = document.querySelector("[data-mapx]").__mapx;
      for (let dy = 0; dy <= 240; dy += 4) for (const dx of [0, -6, 6, -12, 12]) { const h = api.pick(pt.x + dx, pt.y - dy); if (h && h.kind === "muni" && h.key === s) return { x: pt.x + dx, y: pt.y - dy }; }
      return pt;
    }, { s, pt });
    await page.mouse.click(box.x + aim.x, box.y + aim.y);
    await page.waitForTimeout(80);
    const got = await page.evaluate(() => { const mx = document.querySelector("[data-mapx]"); return { sel: mx.__mapx.selected(), open: !mx.querySelector("[data-card]").hidden }; });
    if (got.sel !== s || !got.open) fail.push(`${s} → ${got.sel ?? "nothing"}`);
  }
  results[mode] = { n: slugs.length, fail };
  console.log(mode, slugs.length, "concelhos,", fail.length, "failed", fail.slice(0, 20));
  await page.close();
}
await browser.close(); srv.close();
const md = ["# Click check: every concelho on the map (prompt 25 §2.5)", "",
  `Run ${new Date().toISOString().slice(0, 10)} with scripts/map-data/clicktest.mjs at ${w}×${h}, default view, label point of each concelho.`, "",
  ...Object.entries(results).flatMap(([m, r]) => [`## ${m === "flat" ? "Flat (2D)" : "3D"}: ${r.n - r.fail.length} of ${r.n} open their own card`, "", ...(r.fail.length ? r.fail.map((f) => `- ${f}`) : ["None failed."]), ""])];
writeFileSync(join(ROOT, "content", "facts", "map", "CLICKTEST.md"), md.join("\n"));
