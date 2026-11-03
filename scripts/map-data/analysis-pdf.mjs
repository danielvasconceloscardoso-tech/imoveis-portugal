// The map's paid analysis as a PDF (D83 part 2): prints one analysis page to A4 with the browser's own print engine.
// The pages exist only when config.mapAnalysis.live is true, or in a preview build (PUBLIC_MAP_ANALYSIS_PREVIEW=1).
// Usage (repo root, with the site served, e.g. from site/dist):
//   node scripts/map-data/analysis-pdf.mjs <base-url> <region|portugal> <out.pdf> [lang] [edition]
//   regions: norte, centro, lisboa, alentejo, algarve, madeira, acores, portugal
// Example: node scripts/map-data/analysis-pdf.mjs http://localhost:4400 norte /tmp/analise-norte.pdf pt lu
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const [base, region, out, lang = "pt", ed = "lu"] = process.argv.slice(2);
if (!base || !region || !out) { console.error("usage: analysis-pdf.mjs <base-url> <region|portugal> <out.pdf> [lang] [edition]"); process.exit(1); }
const site = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "site", "package.json");
const { chromium } = createRequire(site)("playwright");
const map = { pt: "mapa", en: "map", fr: "carte" }[lang];
const url = `${base.replace(/\/$/, "")}/${lang}/${ed}/${map}/analise-${region}/`;
const b = await chromium.launch();
const p = await b.newPage();
const r = await p.goto(url, { waitUntil: "networkidle" });
if (!r || r.status() !== 200) { console.error(`no analysis page at ${url} (is config.mapAnalysis.live on, or the preview flag set?)`); await b.close(); process.exit(2); }
await p.emulateMedia({ media: "print" });
await p.pdf({ path: out, format: "A4", printBackground: true, margin: { top: "16mm", bottom: "16mm", left: "14mm", right: "14mm" } });
console.log(`${out} ← ${url}`);
await b.close();
