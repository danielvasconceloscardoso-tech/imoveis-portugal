// Prompts 26 §2 and 28 §4: print each private demo's one-page leave-behind to PDF (A4 landscape) in sponsors/demos/.
// Usage (from site/, built site served on http://127.0.0.1:4326): node scripts/demo-pdf.mjs
import { createRequire } from "node:module";
import { join } from "node:path";
const { chromium } = createRequire(join(process.cwd(), "package.json"))("playwright");
export const NAMES = { f658bd1eef: "Shalu_ORizon-Living", "34c86306cf": "Vanguard_Tomas-Ribeiro-79", "65bf930b11": "ValeDoLobo_The-Residences", "7c1e5a90d4": "VIC_Prata-Riverside-Village" };
const DEMOS = NAMES;
const b = await chromium.launch(); const p = await b.newPage();
for (const [t, name] of Object.entries(DEMOS)) {
  await p.goto(`http://127.0.0.1:4326/d/${t}/onepager/`, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  const out = join(process.cwd(), "..", "sponsors", "demos", `ImoveisPortugal_Demo_${name}.pdf`);
  await p.pdf({ path: out, format: "A4", landscape: true, printBackground: true, preferCSSPageSize: true });
  console.log(out);
}
await b.close();
