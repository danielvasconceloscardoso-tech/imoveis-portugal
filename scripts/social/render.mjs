// Prompt 30 §4: draw every post card from its spec.json with design/social/templates/post.html, 1080×1350 PNG,
// one per language (card-pt.png, card-en.png, card-fr.png). Serves the repo root on a local port for the fonts and
// photographs. Usage (repo root): node scripts/social/render.mjs <week folder, e.g. social/instagram/posts/week-04>
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
const { chromium } = createRequire(join(process.cwd(), "site", "package.json"))("playwright");
const WEEK = process.argv[2], ROOT = process.cwd();
const T = { ".html": "text/html", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const srv = createServer((q, r) => { const p = join(ROOT, decodeURIComponent(q.url.split("?")[0])); if (!p.startsWith(ROOT) || !existsSync(p) || statSync(p).isDirectory()) { r.writeHead(404); return r.end(); } r.writeHead(200, { "Content-Type": T[extname(p)] ?? "application/octet-stream" }); r.end(readFileSync(p)); }).listen(4340);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
await p.goto("http://127.0.0.1:4340/design/social/templates/post.html");
for (const d of readdirSync(WEEK).filter((x) => existsSync(join(WEEK, x, "spec.json"))).sort()) {
  const spec = JSON.parse(readFileSync(join(WEEK, d, "spec.json"), "utf8"));
  for (const [lang, s] of Object.entries(spec)) {
    await p.evaluate((s) => window.render(s), s);
    await p.locator(".card").screenshot({ path: join(WEEK, d, `card-${lang}.png`) });
  }
  console.log(d);
}
await b.close(); srv.close();
