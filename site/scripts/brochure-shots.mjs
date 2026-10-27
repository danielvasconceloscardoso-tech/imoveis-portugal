// Screenshots for the sponsor brochure (ops/BROCHURE.md): the map, the prices section, the path and an area page,
// from the built site in English (US edition), 1280×820 at 2×. Run from site/ with the built site served on :4326:
//   node scripts/brochure-shots.mjs   →   ../sponsors/brochure/img/{map,prices,journey,area}.jpg
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import sharp from "sharp";
const B = "http://127.0.0.1:4326", OUT = "../sponsors/brochure/img";
const shots = [["map", "/en/us/map/"], ["prices", "/en/us/house-prices/"], ["journey", "/en/us/step-by-step/?door=buy"], ["area", "/en/us/map/porto/"]];
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1280, height: 820 }, deviceScaleFactor: 2 });
for (const [n, u] of shots) {
  await p.goto(B + u, { waitUntil: "load" }); await p.waitForTimeout(n === "map" ? 6000 : 1500);
  await sharp(await p.screenshot()).jpeg({ quality: 82 }).toFile(`${OUT}/${n}.jpg`);
}
await b.close();
