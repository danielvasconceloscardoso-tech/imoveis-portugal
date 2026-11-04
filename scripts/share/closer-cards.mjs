// Prompt 71 §1.6: the "Closer than you think" cards (1080 x 1350, for Instagram and Maré), one per US city with a reported
// flight time to Portugal. Opens the built page with ?shot=<city> (the page draws only that card) and saves
// site/public/share/closer-<city>.png. Run after a build, with the built site served:
//   NODE_PATH=$(npm root -g) node scripts/share/closer-cards.mjs http://127.0.0.1:4321
// Then build again so the page links the pictures.
import { createRequire } from "node:module";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
// Playwright from the site's packages, else a global install (NODE_PATH=$(npm root -g)).
const { chromium } = (() => { try { return createRequire(join(root, "site", "package.json"))("playwright"); } catch { return createRequire(import.meta.url)("playwright"); } })();
const base = process.argv[2] || "http://127.0.0.1:4321";
const cities = ["new-york", "boston", "philadelphia", "washington"];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
for (const id of cities) {
  await page.goto(`${base}/en/us/closer-than-you-think/?shot=${id}`, { waitUntil: "networkidle" });
  const el = page.locator(`.cl-shotbox [data-shot="${id}"]`);
  if (!(await el.count())) { console.log(`no card for ${id}`); continue; }
  await page.evaluate(() => document.fonts.ready);
  await el.screenshot({ path: join(root, "site", "public", "share", `closer-${id}.png`) });
  console.log(`site/public/share/closer-${id}.png`);
}
await browser.close();
