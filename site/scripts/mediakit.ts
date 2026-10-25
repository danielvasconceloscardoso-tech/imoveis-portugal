// Media kits (prompt 15 §1.5, prompt 18 §3.3): one PDF per edition (in its main language) and one per partner type,
// with price list v3 and the inventory, from COPY_DECK.md ("partners.*", "kit.*") and site/src/config.ts.
// Run from site/: npm run mediakit · Output: ../sponsors/mediakit/ImoveisPortugal_MediaKit_{ED|TYPE}_{LANG}.pdf
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { ED_ORDER, EDITIONS, eur, type EdCode, type Lang } from "../src/i18n";
import { config } from "../src/config";
import { c, cl, has, edName } from "../src/lib/copy";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright"); // pre-installed in the build environment
const b64 = (p: string) => readFileSync(p).toString("base64");
const font = (p: string) => b64(require.resolve(p));
const serif = font("@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2");
const sans4 = font("@fontsource/public-sans/files/public-sans-latin-400-normal.woff2");
const sans6 = font("@fontsource/public-sans/files/public-sans-latin-600-normal.woff2");
const out = join(process.cwd(), "..", "sponsors", "mediakit");
mkdirSync(out, { recursive: true });

// Partner types (prompt 18): each in the language that type reads.
export const KIT_TYPES: { key: string; langs: Lang[]; photo: string }[] = [
  { key: "wealth", langs: ["fr", "en"], photo: "porto-ponte-luis-i-noite.jpg" },
  { key: "taxlegal", langs: ["pt", "fr", "en"], photo: "porto-douro-entardecer.jpg" },
  { key: "transfer", langs: ["en", "fr", "pt"], photo: "porto-ribeira-rabelo.jpg" },
  { key: "developers", langs: ["pt", "en"], photo: "porto-douro-entardecer.jpg" },
];

function prices(lang: Lang) {
  const p = config.prices, e = (n: number) => eur(n, lang), f = (n: number) => e(Math.round(n * (1 - config.foundingDiscount)));
  const pe = c("partners.per.edition", lang), ae = c("partners.all.editions", lang), fr = c("partners.from", lang);
  return [
    ["verified", `${e(p.verified.edition)} ${pe} · ${e(p.verified.all)} ${ae}`, `${f(p.verified.edition)} · ${f(p.verified.all)}`],
    ["featured", `${e(p.featured.edition)} ${pe} · ${e(p.featured.all)} ${ae}`, `${f(p.featured.edition)} · ${f(p.featured.all)}`],
    ["bank", `${e(p.bank.from)} – ${e(p.bank.to)}`, `${fr} ${f(p.bank.from)}`],
    ["private", `${e(p.private.from)} – ${e(p.private.to)}`, `${fr} ${f(p.private.from)}`],
    ["developer", `${fr} ${e(p.developerFrom)}`, "—"],
  ].map(([k, list, founding]) => ({ h: c(`partners.${k}.h`, lang), p: c(`partners.${k}.p`, lang), list, founding }));
}

function html(lang: Lang, title: string, sub: string, photo: string, intro?: string) {
  const nf = new Intl.NumberFormat(lang === "en" ? "en" : lang === "fr" ? "fr" : "pt-PT");
  const rows = prices(lang).map((r) => `<tr><th>${r.h}<span>${r.p}</span></th><td>${r.list}</td><td><b>${r.founding}</b></td></tr>`).join("");
  const li = (k: string, v = {}) => cl(k, lang, v).map((x) => `<li>${x}</li>`).join("");
  const img = b64(join(process.cwd(), "ebooks", "img", photo));
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
@font-face{font-family:N;src:url(data:font/woff2;base64,${serif})}
@font-face{font-family:P;font-weight:400;src:url(data:font/woff2;base64,${sans4})}
@font-face{font-family:P;font-weight:600;src:url(data:font/woff2;base64,${sans6})}
@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font:400 10.5pt/1.55 P;color:#1b1d21;background:#fbf8f2}
.pg{width:210mm;height:297mm;padding:22mm 20mm;position:relative;page-break-after:always;overflow:hidden}
.cover{padding:0}.cover img{width:100%;height:58%;object-fit:cover;display:block}.cover .t{padding:16mm 20mm}
.brand{font:500 15pt/1 N;letter-spacing:.01em}.ed{font:600 8pt/1 P;letter-spacing:.14em;text-transform:uppercase;color:#7a6a4f;margin-top:6px}
h1{font:400 27pt/1.12 N;margin:10mm 0 5mm;letter-spacing:-.01em}h2{font:400 17pt/1.2 N;margin:0 0 5mm}
.lede{font-size:11.5pt;color:#43464b;max-width:150mm}hr{border:0;border-top:.4pt solid #cbbf9f;margin:6mm 0}
table{width:100%;border-collapse:collapse;font-size:9.5pt}th,td{text-align:left;vertical-align:top;padding:3mm 3mm 3mm 0;border-bottom:.4pt solid #d9d0bb}
th{width:52%;font-weight:600}th span{display:block;font-weight:400;color:#55585d;margin-top:1.5mm;font-size:9pt}thead th,thead td{font:600 7.5pt/1 P;letter-spacing:.1em;text-transform:uppercase;color:#7a6a4f}
ul{padding-left:4.5mm;margin:0}li{margin:0 0 2mm}.small{font-size:8.5pt;color:#6a6d72}.foot{position:absolute;left:20mm;right:20mm;bottom:14mm;font-size:8pt;color:#7a7d82;display:flex;justify-content:space-between}
.two{display:grid;grid-template-columns:1fr 1fr;gap:12mm}
</style></head><body>
<section class="pg cover"><img src="data:image/jpeg;base64,${img}"><div class="t"><div class="brand">Imóveis Portugal</div><div class="ed">${sub}</div><h1>${title}</h1><p class="lede">${intro ?? c("partners.lede", lang)}</p></div></section>
<section class="pg"><h2>${c("partners.readers.h", lang)}</h2><p class="lede">${c("partners.readers.p", lang)}</p><hr>
<div class="two"><div><h2>${c("partners.proof.h", lang)}</h2><ul>${li("partners.proof", { n: nf.format(93659) })}</ul></div>
<div><h2>${c("partners.inventory.h", lang)}</h2><ul>${li("partners.inventory")}</ul></div></div><hr>
<h2>${c("partners.why.h", lang)}</h2><p>${c("partners.why.p", lang)}</p><p>${c("partners.network.p", lang)}</p>
<div class="foot"><span>imoveisportugal.lu</span><span>2</span></div></section>
<section class="pg"><h2>${c("partners.packages.h", lang)}</h2>
<table><thead><tr><th></th><td>${c("partners.list.price", lang)} ${c("partners.per.year", lang)}</td><td>${c("partners.founding.price", lang)}</td></tr></thead><tbody>${rows}</tbody></table>
<p class="small" style="margin-top:6mm">${c("partners.vat", lang)} ${c("partners.proposal", lang)} ${c("partners.founding.p", lang)}</p><hr>
<h2>${c("partners.rules.h", lang)}</h2><ul>${li("partners.rules")}</ul><hr>
<p><b>${c("partners.cta", lang)}</b> · ${config.contactEmail}</p>
<div class="foot"><span>imoveisportugal.lu</span><span>3</span></div></section>
</body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage();
for (const f of readdirSync(out)) if (f.endsWith(".pdf")) unlinkSync(join(out, f));
const write = async (name: string, doc: string) => {
  await page.setContent(doc, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: join(out, name), format: "A4", printBackground: true, preferCSSPageSize: true });
};
for (const ed of ED_ORDER) {
  const lang = EDITIONS[ed as EdCode].defaultLang;
  await write(`ImoveisPortugal_MediaKit_${ed.toUpperCase()}_${lang.toUpperCase()}.pdf`, html(lang, c("partners.h1", lang), `${c("partners.title", lang)} · ${edName(ed as EdCode, lang)}`, "porto-ponte-luis-i-noite.jpg"));
}
for (const t of KIT_TYPES) for (const lang of t.langs) {
  if (!has(`kit.${t.key}.h`)) continue; // partner-type kits arrive with prompt 18
  await write(`ImoveisPortugal_MediaKit_${t.key}_${lang.toUpperCase()}.pdf`, html(lang, c(`kit.${t.key}.h`, lang), c(`kit.${t.key}.label`, lang), t.photo, c(`kit.${t.key}.p`, lang)));
}
await browser.close();
console.log(`media kits written to ${out}`);
