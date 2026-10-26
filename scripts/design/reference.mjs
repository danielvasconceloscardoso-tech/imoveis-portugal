// Prompt 32 §1: capture a reference page and measure what makes it feel the way it does. Screenshots (full page and
// each section) at desktop 1440 and mobile 390, a scroll recording, and measurements as JSON: section heights and
// padding, the type scale, line length in characters, image ratios, words per block, buttons and links, header and
// footer. Principles only: nothing captured here is reused on our site.
// Usage (from site/): node ../scripts/design/reference.mjs <url> <out dir>
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync, renameSync, readdirSync } from "node:fs";
import { join } from "node:path";
const { chromium } = createRequire(join(process.cwd(), "package.json"))("playwright");
const [URL, OUT] = process.argv.slice(2); mkdirSync(OUT, { recursive: true });

const MEASURE = () => {
  const px = (v) => Math.round(parseFloat(v) || 0), vis = (e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const style = (e) => { const s = getComputedStyle(e); return { font: s.fontFamily.split(",")[0].replace(/"/g, ""), size: px(s.fontSize), weight: s.fontWeight, lh: s.lineHeight, ls: s.letterSpacing, tt: s.textTransform, color: s.color }; };
  const chPerLine = (e) => { const s = getComputedStyle(e), w = e.getBoundingClientRect().width, c = document.createElement("canvas").getContext("2d"); c.font = `${s.fontWeight} ${s.fontSize} ${s.fontFamily}`; const avg = c.measureText("abcdefghijklmnopqrstuvwxyz ").width / 27; return Math.round(w / avg); };
  // Sections: the largest blocks stacked down the page.
  let root = document.querySelector("main") ?? document.body;
  while (root.children.length === 1) root = root.children[0];
  const sections = [...root.children].filter(vis).map((s, i) => {
    const r = s.getBoundingClientRect(), cs = getComputedStyle(s);
    const blocks = [...s.querySelectorAll("p, li")].filter(vis).map((p) => p.innerText.trim()).filter((t) => t.length > 20);
    const words = blocks.map((t) => t.split(/\s+/).length);
    const imgs = [...s.querySelectorAll("img, video, picture")].filter(vis).map((m) => { const b = m.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), ratio: +(b.width / b.height).toFixed(2), full: b.width >= innerWidth - 2 }; });
    const acts = [...s.querySelectorAll("a, button")].filter(vis).filter((a) => a.innerText.trim()).map((a) => a.innerText.trim().replace(/\s+/g, " ").slice(0, 40));
    const heads = [...s.querySelectorAll("h1, h2, h3")].filter(vis).map((h) => ({ tag: h.tagName, text: h.innerText.trim().slice(0, 80), words: h.innerText.trim().split(/\s+/).length, ...style(h) }));
    return { i, tag: s.tagName, cls: String(s.className).slice(0, 60), top: Math.round(r.top + scrollY), height: Math.round(r.height), padTop: px(cs.paddingTop), padBottom: px(cs.paddingBottom), marginTop: px(cs.marginTop), bg: cs.backgroundColor,
      heads, wordsPerBlock: words, imgs, actions: acts.length, actionText: acts.slice(0, 6) };
  });
  const type = {};
  document.querySelectorAll("h1, h2, h3, h4, p, a, button, li, span, label").forEach((e) => { if (!vis(e) || !e.innerText?.trim()) return; const s = style(e), k = `${e.tagName} ${s.size}px ${s.font} ${s.weight}`; type[k] = (type[k] ?? 0) + 1; });
  const paras = [...document.querySelectorAll("p")].filter(vis).filter((p) => p.innerText.trim().length > 60).slice(0, 12).map((p) => ({ chars: chPerLine(p), ...style(p), width: Math.round(p.getBoundingClientRect().width) }));
  const btn = [...document.querySelectorAll("a, button")].filter(vis).filter((b) => { const s = getComputedStyle(b); return s.borderStyle !== "none" && px(s.borderWidth) > 0 || (s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== "transparent"); }).slice(0, 8)
    .map((b) => { const s = getComputedStyle(b), r = b.getBoundingClientRect(); return { text: b.innerText.trim().slice(0, 30), h: Math.round(r.height), w: Math.round(r.width), pad: s.padding, border: s.border, radius: s.borderRadius, bg: s.backgroundColor, ...style(b) }; });
  const header = document.querySelector("header"), footer = document.querySelector("footer");
  const box = (e) => e && { height: Math.round(e.getBoundingClientRect().height), position: getComputedStyle(e).position, bg: getComputedStyle(e).backgroundColor, links: e.querySelectorAll("a").length };
  return { url: location.href, width: innerWidth, pageHeight: document.documentElement.scrollHeight, sections, type: Object.entries(type).sort((a, b) => b[1] - a[1]).slice(0, 25), paras, buttons: btn, header: box(header), footer: box(footer),
    transitions: [...new Set([...document.querySelectorAll("*")].slice(0, 3000).map((e) => getComputedStyle(e).transition).filter((t) => t && !/^all 0s/.test(t) && t !== "none"))].slice(0, 12) };
};

const b = await chromium.launch();
for (const [name, vp, mobile] of [["desktop", { width: 1440, height: 900 }, false], ["mobile", { width: 390, height: 844 }, true]]) {
  const vdir = join(OUT, `video-${name}`); mkdirSync(vdir, { recursive: true });
  const ctx = await b.newContext({ viewport: vp, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: mobile ? 2 : 1, recordVideo: { dir: vdir, size: vp }, locale: "en-GB" });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
  await p.waitForTimeout(2500);
  // Dismiss a cookie banner if there is one (we accept nothing: "reject" or "necessary only" first).
  for (const t of [/reject/i, /necessary/i, /decline/i, /accept/i, /agree/i]) { const btn = p.getByRole("button", { name: t }).first(); if (await btn.isVisible().catch(() => false)) { await btn.click().catch(() => {}); break; } }
  await p.waitForTimeout(800);
  // The scroll, slowly, for the recording; it also wakes lazy images.
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += Math.round(vp.height / 9)) { await p.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y); await p.waitForTimeout(220); }
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(800);
  await p.screenshot({ path: join(OUT, `${name}-full.jpg`), fullPage: true, quality: 70, type: "jpeg" });
  const m = await p.evaluate(MEASURE);
  writeFileSync(join(OUT, `${name}.json`), JSON.stringify(m, null, 1));
  for (const s of m.sections.slice(0, 16)) {
    await p.evaluate((y) => scrollTo(0, y), s.top); await p.waitForTimeout(400);
    await p.screenshot({ path: join(OUT, `${name}-s${String(s.i).padStart(2, "0")}.jpg`), quality: 70, type: "jpeg" });
  }
  await ctx.close();
  const v = readdirSync(vdir).find((f) => f.endsWith(".webm")); if (v) renameSync(join(vdir, v), join(OUT, `${name}-scroll.webm`));
  console.log(name, m.sections.length, "sections", m.pageHeight, "px");
}
await b.close();
