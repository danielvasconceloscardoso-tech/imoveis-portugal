// Renders the sales papers (prompt 47 §3) from Markdown to A4 PDF in the brand identity: white page, near-black
// text, Playfair Display headings, Manrope body, green #2F5D50 accents. Playwright Chromium and the fonts come from
// site/node_modules. Usage: node sponsors/papers/render.mjs input.md output.pdf [--one-page]
// --one-page tightens the type for the booking form and fails if the result is longer than one page.
// Also imported by scripts/sponsor-report.mjs (renderMarkdown).
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const req = createRequire(join(root, "site", "package.json"));

const font = (f) => "data:font/woff2;base64," + readFileSync(req.resolve("@fontsource-variable/" + f)).toString("base64");

function css(onePage) {
  const P = font("playfair-display/files/playfair-display-latin-wght-normal.woff2");
  const PX = font("playfair-display/files/playfair-display-latin-ext-wght-normal.woff2");
  const M = font("manrope/files/manrope-latin-wght-normal.woff2");
  const MX = font("manrope/files/manrope-latin-ext-wght-normal.woff2");
  const base = onePage ? "8.2pt/1.45" : "8.9pt/1.5";
  return `
@font-face{font-family:P;src:url(${P});font-weight:400 900}
@font-face{font-family:P;src:url(${PX});font-weight:400 900;unicode-range:U+0100-024F,U+1E00-1EFF}
@font-face{font-family:M;src:url(${M});font-weight:200 800}
@font-face{font-family:M;src:url(${MX});font-weight:200 800;unicode-range:U+0100-024F,U+1E00-1EFF}
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;background:#fff;font:400 ${base} M,sans-serif;color:#111214}
.brand{display:flex;justify-content:space-between;align-items:baseline;border-bottom:.6pt solid #2f5d50;padding-bottom:${onePage ? "3pt" : "5pt"};margin-bottom:${onePage ? "6pt" : "12pt"}}
.brand b{font:400 ${onePage ? "11pt" : "13pt"}/1 P,serif;color:#111214}
.brand span{font-size:6.6pt;letter-spacing:.24em;text-transform:uppercase;color:#2f5d50;font-weight:600}
h1{font:400 ${onePage ? "18pt/1.1" : "21pt/1.12"} P,serif;margin:0 0 ${onePage ? "3pt" : "6pt"};color:#111214}
h2{font:400 ${onePage ? "11.2pt/1.2" : "12.6pt/1.22"} P,serif;margin:${onePage ? "9pt 0 3pt" : "14pt 0 4pt"};color:#2f5d50;break-after:avoid}
h3{font:650 ${onePage ? "7.6pt" : "9pt"}/1.25 M,sans-serif;margin:${onePage ? "4pt 0 1.5pt" : "9pt 0 3pt"};letter-spacing:.02em;break-after:avoid}
p{margin:0 0 ${onePage ? "3.5pt" : "5pt"}} ol,ul{margin:0 0 ${onePage ? "2pt" : "5pt"};padding-left:${onePage ? "11pt" : "14pt"}}
li{margin:0 0 ${onePage ? "1.2pt" : "3pt"}} li::marker{color:#2f5d50}
li:has(> .box:first-child){list-style:none;margin-left:-13pt}
table{border-collapse:collapse;width:100%;margin:${onePage ? "1pt 0 3pt" : "2pt 0 6pt"};font-size:${onePage ? "7.8pt" : "8pt"};break-inside:avoid}
th,td{border-bottom:.5pt solid #d8d5cd;padding:${onePage ? "2.6pt 3pt" : "3pt 4pt"};text-align:left;vertical-align:top}
th{font-weight:650;color:#2f5d50;border-bottom-color:#2f5d50}
strong{font-weight:650} em{font-style:italic} code{font:inherit;background:#f3f2ee;padding:0 2pt}
a{color:#2f5d50;text-decoration:none}
hr{border:0;border-top:.5pt solid #d8d5cd;margin:${onePage ? "4pt 0" : "10pt 0"}}
blockquote{margin:0 0 ${onePage ? "5pt" : "10pt"};padding:${onePage ? "3pt 6pt" : "6pt 9pt"};border-left:2.4pt solid #2f5d50;background:#eef3f1;color:#111214}
blockquote p{margin:0}
.box{display:inline-block;width:7pt;height:7pt;border:.7pt solid #111214;vertical-align:-1pt;margin-right:3pt}
.line{display:inline-block;min-width:38mm;border-bottom:.5pt solid #8a8a8a;height:9pt;vertical-align:bottom}
.sig{display:grid;grid-template-columns:1fr 1fr;gap:10mm;margin-top:${onePage ? "5pt" : "10pt"};break-inside:avoid}
.sig div{border-top:.6pt solid #111214;padding-top:3pt;font-size:${onePage ? "7.8pt" : "8pt"};line-height:1.6;min-height:${onePage ? "24mm" : "30mm"}}
.sig b{font-weight:650;color:#2f5d50}
.small{font-size:${onePage ? "6.6pt" : "7.6pt"};color:#5d6066}
.nodata{color:#8a8a8a;font-style:italic}
`;
}

export async function renderMarkdown(md, out, { onePage = false, title = "", footer = "Imóveis Portugal" } = {}) {
  const { chromium } = req("playwright");
  const { marked } = req("marked");
  const body = marked.parse(md);
  const kind = title ? `<span>${title}</span>` : "";
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css(onePage)}</style></head><body><div class="brand"><b>Imóveis Portugal</b>${kind}</div>${body}</body></html>`;
  const margin = onePage ? { top: "10mm", bottom: "10mm", left: "13mm", right: "13mm" } : { top: "15mm", bottom: "16mm", left: "17mm", right: "17mm" };
  const b = await chromium.launch();
  try {
    const p = await b.newPage();
    await p.setContent(html, { waitUntil: "load" });
    await p.evaluate(() => document.fonts.ready);
    mkdirSync(dirname(resolve(out)), { recursive: true });
    const buf = await p.pdf({
      format: "A4", printBackground: true, margin,
      displayHeaderFooter: !onePage,
      headerTemplate: "<span></span>",
      footerTemplate: `<div style="width:100%;font:6.5pt sans-serif;color:#8a8a8a;padding:0 17mm;display:flex;justify-content:space-between"><span>${footer}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    });
    writeFileSync(out, buf);
    const pages = (buf.toString("latin1").match(/\/Type\s*\/Page(?![s\w])/g) || []).length;
    return pages;
  } finally {
    await b.close();
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const onePage = args.includes("--one-page");
  const [input, output] = args.filter((a) => !a.startsWith("--"));
  if (!input || !output) { console.error("usage: node sponsors/papers/render.mjs input.md output.pdf [--one-page]"); process.exit(2); }
  let md = readFileSync(input, "utf8");
  // An optional first-line HTML comment sets the label in the top band and the footer: <!-- title: ... -->
  const m = md.match(/^<!--\s*title:\s*(.+?)\s*-->\s*\n/);
  const title = m ? m[1] : "";
  if (m) md = md.slice(m[0].length);
  const pages = await renderMarkdown(md, output, { onePage, title, footer: "Imóveis Portugal" + (title ? " · " + title : "") });
  console.log(`${output}: ${pages} page${pages === 1 ? "" : "s"}`);
  if (onePage && pages !== 1) { console.error("expected one page"); process.exit(1); }
}
