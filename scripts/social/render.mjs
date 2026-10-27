// Prompt 30 §4: draw every image of a week from its spec.json, with design/social/templates/post.html (feed cards and
// carousel slides, 1080×1350; LinkedIn at 1200×1500) and story.html (stories, 1080×1920). Serves the repo root on a
// local port for the fonts and photographs. Usage (repo root):
//   node scripts/social/render.mjs <folder> [...]   e.g. social/instagram/posts/week-04 social/linkedin/week-04
// In each item folder, spec.json is { pt: spec, en: spec, fr: spec } (one or more languages) and writes:
//   card-{lang}.png for one card; slide-NN-{lang}.png for { slides: [spec, …] } (LinkedIn: also document-{lang}.pdf
//   when "document": true); stories: { frames: [{ pt, en, fr }, …] } writes frame-NN-{lang}.png.
// An image newer than its spec.json is kept; pass --force to redraw everything.
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";
const { chromium } = createRequire(join(process.cwd(), "site", "package.json"))("playwright");
const args = process.argv.slice(2), FORCE = args.includes("--force"), ROOT = process.cwd();
const T = { ".html": "text/html", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const srv = createServer((q, r) => { const p = join(ROOT, decodeURIComponent(q.url.split("?")[0])); if (!p.startsWith(ROOT) || !existsSync(p) || statSync(p).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { "Content-Type": T[extname(p)] ?? "application/octet-stream" }); r.end(readFileSync(p)); }).listen(0);
const PORT = await new Promise((r) => srv.on("listening", () => r(srv.address().port)));   // any free port: several renders may run at once
const items = (d, out = []) => { if (existsSync(join(d, "spec.json"))) out.push(d); for (const f of readdirSync(d)) if (statSync(join(d, f)).isDirectory()) items(join(d, f), out); return out; };
const b = await chromium.launch();
const pages = {};
const page = async (kind) => {
  if (pages[kind]) return pages[kind];
  const [tpl, w, h, scale] = { post: ["post", 1080, 1350, 1], li: ["post", 1080, 1350, 1200 / 1080], story: ["story", 1080, 1920, 1] }[kind];
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  await p.goto(`http://127.0.0.1:${PORT}/design/social/templates/${tpl}.html`);
  return (pages[kind] = p);
};
const fresh = (png, spec) => !FORCE && existsSync(png) && statSync(png).mtimeMs > statSync(spec).mtimeMs;
const draw = async (p, s, png) => { await p.evaluate((s) => window.render(s), s); await p.locator(".card").screenshot({ path: png }); };
let n = 0;
for (const d of args.filter((a) => !a.startsWith("--")).flatMap((a) => items(a)).sort()) {
  const specFile = join(d, "spec.json"), spec = JSON.parse(readFileSync(specFile, "utf8"));
  const kind = d.includes("/stories/") ? "story" : d.includes("/linkedin/") ? "li" : "post", p = await page(kind);
  if (spec.frames) {
    for (const [i, fr] of spec.frames.entries()) for (const [lang, s] of Object.entries(fr)) {
      if (!s || typeof s !== "object" || !s.format) continue;
      const png = join(d, `frame-${String(i + 1).padStart(2, "0")}-${lang}.png`);
      if (!fresh(png, specFile)) { await draw(p, s, png); n++; }
    }
    continue;
  }
  for (const [lang, s] of Object.entries(spec)) {
    if (!s || typeof s !== "object") continue;
    if (s.slides) {
      for (const [i, sl] of s.slides.entries()) {
        const png = join(d, `slide-${String(i + 1).padStart(2, "0")}-${lang}.png`);
        if (!fresh(png, specFile)) { await draw(p, { source: s.source, ...sl, num: undefined, n: `${i + 1}/${s.slides.length}` }, png); n++; }
      }
      if (kind === "li" && spec.document) {
        // LinkedIn document: the slides as one PDF, 1080×1350 pages.
        const pdf = join(d, `document-${lang}.pdf`);
        if (!fresh(pdf, specFile)) {
          const imgs = s.slides.map((_, i) => readFileSync(join(d, `slide-${String(i + 1).padStart(2, "0")}-${lang}.png`)).toString("base64"));
          const q = await b.newPage();
          await q.setContent(`<style>@page{size:1080px 1350px;margin:0}body{margin:0}img{width:1080px;height:1350px;display:block;page-break-after:always}</style>${imgs.map((x) => `<img src="data:image/png;base64,${x}">`).join("")}`);
          writeFileSync(pdf, await q.pdf({ width: "1080px", height: "1350px", printBackground: true })); await q.close(); n++;
        }
      }
    } else if (s.format) {
      const png = join(d, `card-${lang}.png`);
      if (!fresh(png, specFile)) { await draw(p, s, png); n++; }
    }
  }
}
console.log("images", n);
await b.close(); srv.close();
