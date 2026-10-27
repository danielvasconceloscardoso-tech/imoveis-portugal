// Prompt 31 (D58): the real site in demo mode for the v4 films, one 1920×1080 still per screen shot, read at a phone's
// distance: the page at 1280 px CSS width (1.5× pixel density), cropped to what the shot is about. Every figure is
// out of focus (labels stay sharp: the budget is never readable, D58); the demo caption bar is hidden.
// Usage (from site/, built site served on http://127.0.0.1:4326):
//   node ../scripts/demos/v4/screens.mjs <token> <out dir> [name ...]
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
const { chromium } = createRequire(join(process.cwd(), "package.json"))("playwright");
const [T, OUT, ...ONLY] = process.argv.slice(2), B = "http://127.0.0.1:4326"; mkdirSync(OUT, { recursive: true });
const w = await (await fetch(`${B}/d/${T}/walk.json`)).json(), st = Object.fromEntries(w.steps.map((s) => [s.n, s.url]));
const ed = st[2].split("/")[2];

// Figures go soft: currency amounts, grouped numbers, percentages, areas. Words stay sharp.
const SOFT = () => {
  const re = /((?:[€$₪]|CHF|ILS|USD|EUR)\s?\d[\d,.\s]*\d|\d{1,3}(?:,\d{3})+(?:\.\d+)?|[+-]?\d+(?:\.\d+)?\s?%|\d+(?:\.\d+)?\s?m²|^\s*\d[\d,.]*\s*$)/g;
  const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), nodes = [];
  const has = new RegExp(re.source);  // no /g here: a global test() would carry lastIndex from node to node
  const keep = (v) => /^\s*(19|20)\d\d\s*$/.test(v);  // years on the chart axes stay sharp
  while (walk.nextNode()) { const n = walk.currentNode; if (has.test(n.nodeValue) && !keep(n.nodeValue) && !n.parentElement.closest("script,style,sup,.sup")) nodes.push(n); }
  nodes.forEach((n) => { const f = document.createDocumentFragment(); n.nodeValue.split(re).forEach((part, i) => { if (i % 2) { const s = document.createElement("span"); s.textContent = part; s.style.cssText = `filter:blur(${Math.max(4, parseFloat(getComputedStyle(n.parentElement).fontSize) * .3)}px);display:inline-block`; f.append(s); } else f.append(part); }); n.replaceWith(f); });
  document.querySelectorAll("input").forEach((i) => { if (/\d/.test(i.value)) i.style.filter = `blur(${Math.max(5, parseFloat(getComputedStyle(i).fontSize) * .32)}px)`; });
};
const SHOTS = {
  // 4: the map settles on the place.
  map: { url: st[2].replace(/&?budget=\d+/, "").replace(/&?cur=\w+/, ""), map: true, sel: ".mapx-stage", at: "center" },
  // 5: the budget, typed; the places that fit light up. The figure itself is never readable.
  budget: { url: st[2], map: true, sel: ".mapx-budget", at: "budget" },
  // 6: the real cost: labels sharp, figures soft.
  cost: { url: st[3], sel: ".sim-out", at: "top", dy: -30 },
  // 7: the answer for buyers who live abroad: viewings by video, a power of attorney for the deed.
  faq: { url: `/en/${ed}/faq/?demo=${T}#en-sign`, sel: "#en-sign", at: "top", dy: -150, open: "#en-sign, #en-buy-abroad" },
  // 9: the private viewing request and the summary that goes with it.
  viewing: { url: st[5], sel: ".dc-sum", at: "center", step: "sum" },
  // 9b: sent, and the team lighting up.
  sent: { url: st[7], sel: ".dc-btn", at: "top", dy: -260, step: "sent" },
  // 10: the developer's inbox the next morning.
  inbox: { url: st[6], sel: "[data-em]", at: "top", dy: -30 },
};
const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars"] });
const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1.5 });
for (const [name, s] of Object.entries(SHOTS)) {
  if (ONLY.length && !ONLY.includes(name)) continue;
  await p.goto(B + s.url, { waitUntil: "load" });
  await p.addStyleTag({ content: ".dmb{display:none!important} .mapx-tip{display:none!important}" });
  if (s.map) {
    await p.waitForFunction(() => document.querySelector(".mapx")?.__mapx, null, { timeout: 60000 });
    await p.evaluate(() => document.querySelector(".mapx").__mapx.load()); await p.waitForSelector(".mapx.is-live", { timeout: 90000 }); await p.waitForTimeout(4000);
  }
  if (s.open) await p.evaluate((q) => document.querySelectorAll(q).forEach((d) => (d.open = true)), s.open);
  if (s.step) await p.evaluate((k) => { document.querySelector("[data-dc]").dataset.dcStep = k; }, s.step);
  await p.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
  await p.evaluate(SOFT);
  await p.evaluate(({ sel, at }) => document.querySelector(sel).scrollIntoView({ block: at === "top" ? "start" : "center" }), s);
  if (s.dy) await p.evaluate((dy) => window.scrollBy(0, dy), s.dy);
  await p.waitForTimeout(s.map ? 2500 : 600);
  await p.screenshot({ path: join(OUT, `screen-${name}.png`) });
  console.log(name);
}
await b.close();
