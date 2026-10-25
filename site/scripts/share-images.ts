// Shareable "O que compra" images, one per edition and language (prompt 12, 1.4): 1080 x 1350 PNG for
// Instagram, Facebook and WhatsApp, with the source on the image. Run from site/: npm run share
// Output: public/share/compare-{ed}-{lang}.png (linked from the comparison page).
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ED_ORDER, LANGS, eur, type Lang } from "../src/i18n";
import { ABROAD, PT_PLACES, GONDOMAR, m2For, type Place } from "../src/lib/compare";
import { c, edName } from "../src/lib/copy";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright"); // pre-installed in the build environment
const font = (p: string) => readFileSync(require.resolve(p)).toString("base64");
const serif = font("@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2");
const sans4 = font("@fontsource/public-sans/files/public-sans-latin-400-normal.woff2");
const sans6 = font("@fontsource/public-sans/files/public-sans-latin-600-normal.woff2");
const out = join(process.cwd(), "public", "share");
mkdirSync(out, { recursive: true });
const SRC: Record<string, string> = { "ine-m2-2026q2": "INE", "lu-m2-2026q2": "Observatoire de l'Habitat (LU)", "fr-m2-2026q3": "Notaires de France", "ch-ge-m2-2024": "OCSTAT Genève, BCE/ECB" };
const BUDGET = 500000;

function html(ed: (typeof ED_ORDER)[number], lang: Lang) {
  const abroad = ABROAD[ed] ?? [];
  const lead = abroad[0] ?? PT_PLACES[0];
  const places: Place[] = [...abroad, ...PT_PLACES.filter((p) => ["lisboa", "porto", "gondomar"].includes(p.key))].filter((p, i, a) => a.indexOf(p) === i);
  const max = Math.max(...places.map((p) => m2For(BUDGET, p)));
  const line = c("compare.line", lang, { budget: eur(BUDGET, lang), a: m2For(BUDGET, lead), placeA: c(`compare.in.${lead.key}`, lang), b: m2For(BUDGET, GONDOMAR), placeB: c(`compare.in.${GONDOMAR.key}`, lang) });
  const sources = [...new Set(places.map((p) => SRC[p.fact]))].join(" · ");
  const rows = places.map((p) => `<div class="row${p.key === "gondomar" ? " hl" : ""}"><span class="name">${c(`compare.place.${p.key}`, lang)}</span><span class="bar" style="width:${Math.max(3, m2For(BUDGET, p) / max * 100)}%"></span><span class="v">${m2For(BUDGET, p)} m²</span></div>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:N;src:url(data:font/woff2;base64,${serif})}
@font-face{font-family:P;font-weight:400;src:url(data:font/woff2;base64,${sans4})}
@font-face{font-family:P;font-weight:600;src:url(data:font/woff2;base64,${sans6})}
*{box-sizing:border-box}body{margin:0;width:1080px;height:1350px;background:#f6f3ee;color:#15181d;font-family:P;padding:96px 88px;display:flex;flex-direction:column}
.brand{font:500 34px/1 N}.ed{font:600 20px/1 P;color:#5c6066;letter-spacing:.08em;text-transform:uppercase;margin-top:14px}
h1{font:450 66px/1.12 N;letter-spacing:-.01em;margin:72px 0 64px}
.rows{display:grid;gap:30px}.row{display:grid;grid-template-columns:300px 1fr 150px;align-items:center;gap:20px;font-size:30px}
.name{font-weight:600}.bar{height:26px;border-radius:13px;background:#d5dde7}.row.hl .bar{background:#1e3a5f}.v{text-align:right;font-variant-numeric:tabular-nums}
.foot{margin-top:auto;font-size:21px;line-height:1.45;color:#5c6066}
</style></head><body><div class="brand">Imóveis Portugal</div><div class="ed">${edName(ed, lang)}</div>
<h1>${line}</h1><div class="rows">${rows}</div>
<div class="foot">${c("compare.note", lang)}<br>${c("sims.source", lang)}: ${sources}. 2026.</div></body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
for (const ed of ED_ORDER) for (const lang of LANGS) {
  await page.setContent(html(ed, lang), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(out, `compare-${ed}-${lang}.png`) });
}
await browser.close();
console.log(`share images written to ${out}`);
