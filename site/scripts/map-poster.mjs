// Still image of the 3D map (prompt 19): shown instantly while the live map loads, and used for sharing.
// Run from site/ after `npm run build`:  node scripts/map-poster.mjs  → public/img/map-poster-{1200,640}.webp
// and public/share/map-{budget}.png for the four budget scenarios (prompt 18).
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, mkdirSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const dist = join(process.cwd(), "dist");
const T = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".geojson": "application/json", ".webp": "image/webp", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
const srv = createServer((q, r) => { let p = join(dist, decodeURIComponent(q.url.split("?")[0])); if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html"); if (!existsSync(p)) { r.writeHead(404); return r.end(); } r.writeHead(200, { "Content-Type": T[extname(p)] || "application/octet-stream" }); r.end(readFileSync(p)); }).listen(0);
const base = `http://127.0.0.1:${srv.address().port}`;
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1400, height: 1100 }, deviceScaleFactor: 1 });
page.on("pageerror", (e) => console.log("pageerror", e.message));
async function shot(budget, path, w) {
  await page.goto(`${base}/pt/lu/mapa/?budget=${budget}`, { waitUntil: "load" });
  await page.waitForSelector(".mapx.is-live", { timeout: 60000 });
  await page.waitForTimeout(2500);
  await page.addStyleTag({ content: ".mapx-card,.maplibregl-ctrl,.mapx-inset{display:none!important}" });
  const el = await page.$(".mapx-stage");
  return el.screenshot({ path, type: "png" });
}
mkdirSync(join(process.cwd(), "public", "share"), { recursive: true });
// Poster: the 300 k€ view as WebP (encoded by the browser itself, no image library needed).
const png = await shot(300000, join(process.cwd(), "public", "share", "map-300000.png"));
const conv = await browser.newPage();
for (const w of [1200, 640]) {
  const data = await conv.evaluate(async ({ b64, w }) => {
    const img = new Image(); img.src = `data:image/png;base64,${b64}`; await img.decode();
    const h = Math.round((img.height * w) / img.width), c = document.createElement("canvas"); c.width = w; c.height = h;
    c.getContext("2d").drawImage(img, 0, 0, w, h); return c.toDataURL("image/webp", 0.82);
  }, { b64: png.toString("base64"), w });
  writeFileSync(join(process.cwd(), "public", "img", `map-poster-${w}.webp`), Buffer.from(data.split(",")[1], "base64"));
}
for (const b of [500000, 1000000, 5000000, 10000000]) await shot(b, join(process.cwd(), "public", "share", `map-${b}.png`));
await browser.close(); srv.close();
console.log("ok");
