// Screenshots of the direction mocks at 1440 px and 390 px (full page).
// Run from the repo root:  node design/directions/shoot.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright"); // pre-installed globally
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const sizes = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const browser = await chromium.launch();
for (const dir of ["a", "b", "c"]) {
  for (const name of ["home", "partners"]) {
    for (const [label, viewport] of Object.entries(sizes)) {
      const page = await browser.newPage({ viewport, deviceScaleFactor: label === "mobile" ? 2 : 1 });
      await page.goto(`file://${join(here, dir, name + ".html")}`);
      await page.evaluate(() => document.fonts.ready);
      // Full-page shots do not scroll, so load lazy images first.
      await page.evaluate(() => Promise.all([...document.images].map((i) => { i.loading = "eager"; return i.decode().catch(() => {}); })));
      await page.waitForLoadState("networkidle");
      await page.screenshot({ path: join(here, "screens", `${dir}-${name}-${label}.jpg`), fullPage: true, type: "jpeg", quality: 82 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) console.log(`WARN ${dir}/${name} ${label}: horizontal overflow ${overflow}px`);
      await page.close();
    }
  }
}
await browser.close();
console.log("screens written");
