// Prompt 31 (D58): render built shots of scene.html frame by frame (1920×1080, PNG) for the stills and the films.
// Usage: node scripts/demos/v4/render.mjs <scene url> <out dir> <jobs json>
//   jobs: [{ "shot": "pour", "from": 0, "to": 8, "fps": 24, "name": "s02" }]  (to omitted = one still at `from`)
// The scene page must be served over http (e.g. a static server on the folder with scene.html, three.module.js and
// the textures). Runs from site/ for Playwright.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
const { chromium } = createRequire(join(process.cwd(), "package.json"))("playwright");
const [URL, OUT, JOBS] = process.argv.slice(2); mkdirSync(OUT, { recursive: true });
// Rendered at the 2.39:1 picture size, so the framing is exactly what the letterbox shows.
const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const p = await b.newPage({ viewport: { width: 1920, height: 803 } });
p.on("pageerror", (e) => console.error("scene:", e.message));
await p.goto(URL + (URL.includes("?") ? "&" : "?") + "w=1920&h=803"); await p.waitForFunction(() => window.ready, null, { timeout: 180000 });
const canvas = await p.$("canvas");
for (const j of JSON.parse(JOBS)) {
  const n = j.to == null ? 1 : Math.round((j.to - j.from) * j.fps);
  for (let i = 0; i < n; i++) {
    const t = j.from + (j.to == null ? 0 : i / j.fps);
    await p.evaluate(([s, t]) => window.shot(s, t), [j.shot, t]);
    await canvas.screenshot({ path: join(OUT, j.to == null ? `${j.name}.png` : `${j.name}-${String(i).padStart(4, "0")}.png`) });
  }
  console.log(j.name, n);
}
await b.close();
