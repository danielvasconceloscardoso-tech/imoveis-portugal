// Prompt 29 §2b: one real screen per step of "How a buyer reaches you" for each private demo, for the demo page and
// the one-pager strip. Usage (from site/, built site served on http://127.0.0.1:4326): node scripts/demo-steps.mjs
import { createRequire } from "node:module";
import { join } from "node:path";
import { mkdirSync } from "node:fs";
const { chromium } = createRequire(join(process.cwd(), "package.json"))("playwright");
const B = "http://127.0.0.1:4326", TOKENS = ["34c86306cf", "65bf930b11", "f658bd1eef", "7c1e5a90d4"];
const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const t of TOKENS) {
  const w = await (await fetch(`${B}/d/${t}/walk.json`)).json();
  const dir = join(process.cwd(), "public", "d", t, "steps"); mkdirSync(dir, { recursive: true });
  for (const s of w.steps) {
    const url = s.url.replace(/[?&]demo=[0-9a-f]+/, "").replace("?&", "?").replace(/\?#/, "#").replace(/\?$/, "");
    await p.goto(B + url, { waitUntil: "load" }); await p.evaluate(() => { try { sessionStorage.clear(); } catch {} });
    if (s.n === 2) {
      await p.waitForFunction(() => document.querySelector(".mapx")?.__mapx, null, { timeout: 60000 });
      await p.evaluate(() => document.querySelector(".mapx").__mapx.load()); await p.waitForSelector(".mapx.is-live", { timeout: 90000 }); await p.waitForTimeout(3500);
      await p.evaluate(() => document.querySelector(".mapx-stage").scrollIntoView({ block: "end" }));
    }
    if (s.n === 3) await p.evaluate(() => document.querySelector("#sim")?.scrollIntoView({ block: "start" }));
    if (s.n === 5) await p.evaluate(() => { const el = document.querySelector("[data-dc]"); el.dataset.dcStep = "sum"; document.getAnimations().forEach((a) => a.finish()); el.querySelector(".dc-form").scrollIntoView({ block: "start" }); });
    if (s.n === 7) await p.evaluate(() => { const el = document.querySelector("[data-dc]"); el.dataset.dcStep = "sent"; document.getAnimations().forEach((a) => a.finish()); el.querySelector(".dc-team").scrollIntoView({ block: "center" }); });
    await p.waitForTimeout(700);
    await p.screenshot({ path: join(dir, `step-${s.n}.png`) });
    console.log(t, s.n);
  }
}
await b.close();
