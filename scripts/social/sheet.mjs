// Prompt 30 §5.2: the week's contact sheet, one post per page in posting order: the card, the captions in PT, EN and
// FR, the hashtags, the alt text, the link and the source. Usage (repo root):
//   node scripts/social/sheet.mjs social/instagram/posts/week-04 social/exports/week-04-contact-sheet.pdf [card language]
import { createRequire } from "node:module";
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, unlinkSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
const { chromium } = createRequire(join(process.cwd(), "site", "package.json"))("playwright");
const [WEEK, OUT, LANG = "en"] = process.argv.slice(2); mkdirSync(dirname(OUT), { recursive: true });
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const items = readdirSync(WEEK).filter((d) => existsSync(join(WEEK, d, "post.md"))).sort().map((d) => {
  const md = readFileSync(join(WEEK, d, "post.md"), "utf8"), [, fm, body] = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const get = (k) => (fm.match(new RegExp(`^${k}: (.*)$`, "m")) ?? [])[1] ?? "";
  return { d, date: get("date"), order: get("order"), format: get("format"), link: get("link"), body: body.replace(/^Images:.*\n\n/m, ""), img: "file://" + resolve(WEEK, d, `card-${LANG}.png`) };
});
const fonts = "file://" + resolve("design/social/fonts");
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:P;src:url("${fonts}/playfair-display-latin-wght-normal.woff2")} @font-face{font-family:M;src:url("${fonts}/manrope-latin-wght-normal.woff2")}
@page{size:A4;margin:14mm} body{font:10pt/1.45 M,sans-serif;color:#111214;margin:0}
.p{display:grid;grid-template-columns:78mm 1fr;gap:9mm;page-break-after:always;height:265mm}
.p img{width:78mm;border:.3mm solid #e2e2df} h2{font:400 15pt/1.2 P,serif;margin:0 0 2mm} .m{color:#6a6d72;font-size:8.5pt;margin:0 0 4mm}
pre{white-space:pre-wrap;font:9.5pt/1.45 M,sans-serif;margin:0}
.cover{page-break-after:always} .cover h1{font:400 26pt/1.1 P,serif;margin:30mm 0 6mm} .cover p{max-width:150mm}
</style></head><body>
<div class="cover"><h1>Week 4 · samples</h1><p>Eight Instagram cards, one per format 1–8 of prompt 30, in posting order, with the captions in PT, EN and FR, hashtags, alt text, link and source. Status: draft. Nothing is posted or scheduled. Cards shown in ${LANG.toUpperCase()}; PT and FR cards are in each post's folder.</p></div>
${items.map((x) => `<div class="p"><div><img src="${x.img}"></div><div><h2>${x.date} · ${x.order} · ${x.format}</h2><p class="m">${esc(x.link)}</p><pre>${esc(x.body.trim())}</pre></div></div>`).join("")}
</body></html>`;
const b = await chromium.launch(); const p = await b.newPage();
// Opened from a file so the cards and fonts (file:// URLs) load.
const tmp = resolve(dirname(OUT), ".sheet.html"); writeFileSync(tmp, html);
await p.goto("file://" + tmp, { waitUntil: "load" }); await p.evaluate(() => document.fonts.ready); unlinkSync(tmp);
await p.pdf({ path: OUT, format: "A4", printBackground: true }); await b.close(); console.log(OUT, items.length);
