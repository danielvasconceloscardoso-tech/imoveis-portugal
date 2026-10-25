// Phase 1 of prompt 09: screenshots of the reference sites (top of page, desktop 1440 and mobile 390).
// Run from the repo root:  node design/v2/shoot-refs.mjs
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const { chromium } = createRequire(import.meta.url)("playwright"); // pre-installed

const here = dirname(fileURLToPath(import.meta.url));
export const REFS = {
  ycombinator: "https://www.ycombinator.com/",
  stripe: "https://stripe.com/",
  linear: "https://linear.app/",
  serhant: "https://serhant.com/",
  mansionglobal: "https://www.mansionglobal.com/",
  sothebysrealty: "https://www.sothebysrealty.com/",
  garyvee: "https://garyvee.com/",
  vaynermedia: "https://vaynermedia.com/",
  fanatics: "https://fanaticsinc.com/",
  morningbrew: "https://www.morningbrew.com/",
  "morningbrew-advertise": "https://www.morningbrew.com/advertise",
  thehustle: "https://thehustle.co/",
  monocle: "https://monocle.com/",
  wise: "https://wise.com/",
  "wise-help": "https://wise.com/help/",
  "knightfrank-wealth": "https://www.knightfrank.com/wealthreport",
  "stripe-press": "https://press.stripe.com/",
};
const sizes = { d: { width: 1440, height: 900 }, m: { width: 390, height: 844 } };
const browser = await chromium.launch();
const only = process.argv.slice(2);
for (const [name, url] of Object.entries(REFS)) {
  if (only.length && !only.includes(name)) continue;
  for (const [k, viewport] of Object.entries(sizes)) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, locale: "en-US", userAgent: k === "m" ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" : undefined });
    const page = await ctx.newPage();
    try {
      const r = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(4000);
      for (const t of ["Accept all", "Accept All", "Accept", "I agree", "Allow all", "Got it", "OK"]) {
        const b = page.getByRole("button", { name: t, exact: true });
        if (await b.count().catch(() => 0)) { await b.first().click({ timeout: 2000 }).catch(() => {}); break; }
      }
      await page.waitForTimeout(800);
      await page.screenshot({ path: join(here, "refs", `${name}-${k}.jpg`), type: "jpeg", quality: 60 });
      const full = await page.evaluate(() => document.body.scrollHeight);
      if (k === "d") await page.screenshot({ path: join(here, "refs", `${name}-full.jpg`), type: "jpeg", quality: 45, fullPage: full < 9000, clip: full >= 9000 ? { x: 0, y: 0, width: 1440, height: 9000 } : undefined });
      console.log(`${name} ${k} ${r?.status()}`);
    } catch (e) { console.log(`${name} ${k} FAILED ${e.message.split("\n")[0]}`); }
    await ctx.close();
  }
}
await browser.close();
