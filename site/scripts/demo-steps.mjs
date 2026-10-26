// Prompt 29 §2b: one real screen per step of "How a buyer reaches you" for each private demo, for the demo page and
// the one-pager strip. Zoomed in on what the step is about (CEO review, 26 Oct: readable on a phone): each still is a
// 16:10 crop around the element that matters, at twice the pixel density.
// Usage (from site/, built site served on http://127.0.0.1:4326): node scripts/demo-steps.mjs
import { createRequire } from "node:module";
import { join } from "node:path";
import { mkdirSync } from "node:fs";
const { chromium } = createRequire(join(process.cwd(), "package.json"))("playwright");
const B = "http://127.0.0.1:4326", TOKENS = (process.env.ONLY ?? "34c86306cf,65bf930b11,f658bd1eef,7c1e5a90d4").split(",");
// The element each step frames, how wide the crop is in CSS pixels (narrower = closer) and where it sits.
const FRAME = {
  1: { sel: ".sr-field", w: 760, at: "top", dy: -60, al: "left" },
  2: { sel: ".mapx-stage", w: 980, at: "center", al: "right" },
  3: { sel: ".sim-out", w: 680, at: "top", dy: -20 },
  4: { sel: ".sc-card", w: 760, at: "top", dy: -20 },
  5: { sel: ".dc-sum", w: 680, at: "center" },
  6: { sel: "[data-em]", w: 760, at: "top", dy: -20, al: "left" },
  7: { sel: ".dc-team", w: 760, at: "top", dy: -110 },
};
const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars"] });
const p = await b.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
for (const t of TOKENS) {
  const w = await (await fetch(`${B}/d/${t}/walk.json`)).json();
  const dir = join(process.cwd(), "public", "d", t, "steps"); mkdirSync(dir, { recursive: true });
  for (const s of w.steps) {
    const url = s.url.replace(/[?&]demo=[0-9a-f]+/, "").replace("?&", "?").replace(/\?#/, "#").replace(/\?$/, "");
    await p.goto(B + url, { waitUntil: "load" }); await p.evaluate(() => { try { sessionStorage.clear(); } catch {} });
    if (s.n === 2) {
      await p.waitForFunction(() => document.querySelector(".mapx")?.__mapx, null, { timeout: 60000 });
      await p.evaluate(() => document.querySelector(".mapx").__mapx.load()); await p.waitForSelector(".mapx.is-live", { timeout: 90000 }); await p.waitForTimeout(3500);
    }
    if (s.n === 5) await p.evaluate(() => { const el = document.querySelector("[data-dc]"); el.dataset.dcStep = "sum"; });
    if (s.n === 7) await p.evaluate(() => { const el = document.querySelector("[data-dc]"); el.dataset.dcStep = "sent"; });
    await p.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
    const f = FRAME[s.n], h = Math.round(f.w / 1.6);
    await p.evaluate(({ sel, at }) => document.querySelector(sel).scrollIntoView({ block: at === "top" ? "start" : "center" }), f);
    await p.waitForTimeout(s.n === 2 ? 2500 : 700);
    const r = await p.evaluate((sel) => { const x = document.querySelector(sel).getBoundingClientRect(); return { x: x.x, y: x.y, w: x.width, h: x.height }; }, f.sel);
    const want = f.al === "left" ? r.x - 24 : f.al === "right" ? r.x + r.w - f.w : r.x + r.w / 2 - f.w / 2, x = Math.max(0, Math.min(1280 - f.w, Math.round(want)));
    const y = Math.max(0, Math.min(900 - h, Math.round(f.at === "top" ? r.y + (f.dy ?? 0) : r.y + r.h / 2 - h / 2)));
    await p.screenshot({ path: join(dir, `step-${s.n}.png`), clip: { x, y, width: f.w, height: h } });
    console.log(t, s.n, x, y);
  }
}
await b.close();
