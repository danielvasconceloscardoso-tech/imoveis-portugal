// Prompt 10, section 4: phone screenshots of every page type, iPhone (375 x 812) and Android (412 x 915).
// First screen and full page. Serves site/dist locally; nothing is deployed.
// Run from the repo root after `npm run build` in site/:  node design/v2/shoot-mobile.mjs
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, mkdirSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const { chromium } = createRequire(import.meta.url)("playwright"); // pre-installed

const here = dirname(fileURLToPath(import.meta.url));
const dist = join(here, "..", "..", "site", "dist");
const out = join(here, "screens", "mobile");
mkdirSync(out, { recursive: true });
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png" };
const server = createServer((req, res) => {
  let p = join(dist, decodeURIComponent(req.url.split("?")[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": types[extname(p)] || "application/octet-stream" });
  res.end(readFileSync(p));
}).listen(0);
const base = `http://127.0.0.1:${server.address().port}`;

const PAGES = {
  home: "/pt/lu/", faq: "/pt/lu/perguntas-frequentes/", guide: "/en/us/free-guide/", buy: "/fr/fr/acheter/",
  talk: "/pt/ch/falar-com-um-parceiro/", partners: "/pt/br/parceiros/", how: "/en/il/how-we-work/", privacy: "/fr/ch/confidentialite/",
};
const DEVICES = {
  iphone: { viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" },
  android: { viewport: { width: 412, height: 915 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36" },
};
const browser = await chromium.launch();
for (const [dev, opts] of Object.entries(DEVICES)) {
  const ctx = await browser.newContext(opts);
  for (const [name, path] of Object.entries(PAGES)) {
    const page = await ctx.newPage();
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(out, `${name}-${dev}.jpg`), type: "jpeg", quality: 70 });
    if (dev === "iphone") await page.screenshot({ path: join(out, `${name}-${dev}-full.jpg`), type: "jpeg", quality: 55, fullPage: true });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) console.log(`WARN ${name} ${dev}: horizontal overflow ${overflow}px`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
server.close();
console.log(`screens written to ${out}`);
