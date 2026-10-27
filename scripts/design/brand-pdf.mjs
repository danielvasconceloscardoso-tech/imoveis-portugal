// Prompt 23 review: design/BRAND.md as a PDF with the logo set and swatches. Usage (repo root):
//   node scripts/design/brand-pdf.mjs   →   design/brand/BRAND.pdf
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";
const req = createRequire(resolve("site/package.json"));
const { chromium } = req("playwright"), { marked } = req("marked");
const f = (p) => "file://" + resolve(p);
const md = readFileSync("design/BRAND.md", "utf8").replace(/\| (#[0-9A-F]{6}(?: · #[0-9A-F]{6})*) \|/g, (_, hx) => `| ${hx.split(" · ").map((h) => `<i style="background:${h}"></i>${h}`).join(" ")} |`);
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:P;src:url("${f("design/social/fonts/playfair-display-latin-wght-normal.woff2")}");font-weight:400 900}
@font-face{font-family:M;src:url("${f("design/social/fonts/manrope-latin-wght-normal.woff2")}");font-weight:200 800}
@page{size:A4;margin:11mm} body{font:8pt/1.38 M,sans-serif;color:#0a0a0a;margin:0}
h1{font:400 21pt/1.1 P,serif;margin:0 0 3mm} h2{font:600 7.5pt/1 M;letter-spacing:.16em;text-transform:uppercase;color:#2f5d50;margin:3.6mm 0 1.6mm}
p,li{margin:0 0 1.4mm} ul{padding-left:4mm;margin:0} table{border-collapse:collapse;width:100%} td,th{border-bottom:.3mm solid #e3e3e3;padding:.9mm 2mm .9mm 0;text-align:left;vertical-align:top} th{font-weight:600}
i{display:inline-block;width:3mm;height:3mm;border:.2mm solid #e3e3e3;vertical-align:-.5mm;margin:0 1mm 0 1.5mm}
code{font-size:7.5pt} .logos{display:flex;gap:4mm;align-items:center;margin:2mm 0 1mm} .logos img{height:9mm} .logos .k{background:#0a0a0a;padding:2mm} .logos .m{height:14mm}
</style>${marked.parse(md).replace("<h2>Layout</h2>", `<div class="logos"><img src="${f("design/brand/wordmark.svg")}"><span class="k"><img src="${f("design/brand/wordmark-white.svg")}"></span><img class="m" src="${f("design/brand/monogram.svg")}"></div><h2>Layout</h2>`)}`;
const tmp = resolve("design/brand/.brand.html"); writeFileSync(tmp, html);
const b = await chromium.launch(), p = await b.newPage(); await p.goto("file://" + tmp, { waitUntil: "load" }); await p.evaluate(() => document.fonts.ready);
await p.pdf({ path: "design/brand/BRAND.pdf", format: "A4", printBackground: true }); await b.close(); unlinkSync(tmp);
console.log("design/brand/BRAND.pdf");
