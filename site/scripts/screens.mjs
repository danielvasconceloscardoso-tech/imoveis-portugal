// Screenshot built pages at 1440 px and 390 px (full page), and warn on horizontal overflow.
// Usage (after npm run build):  node scripts/screens.mjs OUT_DIR /lu/perguntas-frequentes/ ...
// Serves site/dist itself on a local port; nothing is deployed.
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";
const { chromium } = createRequire(import.meta.url)("playwright"); // pre-installed

const [out, ...paths] = process.argv.slice(2);
const dist = new URL("../dist/", import.meta.url).pathname;
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".png": "image/png", ".txt": "text/plain" };
const server = createServer((req, res) => {
  let p = join(dist, decodeURIComponent(req.url.split("?")[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": types[extname(p)] || "application/octet-stream" });
  res.end(readFileSync(p));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
for (const path of paths) {
  for (const [label, viewport] of [["1440", { width: 1440, height: 900 }], ["390", { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport });
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const name = path.replace(/^\/|\/$/g, "").replace(/\//g, "_") || "root";
    await page.screenshot({ path: join(out, `${name}-${label}.jpg`), fullPage: true, type: "jpeg", quality: 80 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) console.log(`WARN ${path} at ${label}px: horizontal overflow ${overflow}px`);
    await page.close();
  }
}
await browser.close();
server.close();
console.log(`screens written to ${out}`);
