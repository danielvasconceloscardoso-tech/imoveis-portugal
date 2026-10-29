// Prompt 43 §1: measure what makes a page feel effortless, on a phone (390×844) and a desktop (1440×900).
// Per page: sections, words in the first screen and in total, distinct text sizes, body and H1 size, white space,
// navigation pattern, actions in the first screen, transfer weight, script weight, LCP.
//   node bench.mjs <out.json> <label|url> ...   (labels and URLs alternate)
import { createRequire } from "node:module"; import { writeFileSync } from "node:fs";
const { chromium, devices } = createRequire("/home/user/imoveis-portugal/site/package.json")("playwright");
const [out, ...args] = process.argv.slice(2);
const pairs = []; for (let i = 0; i < args.length; i += 2) pairs.push([args[i], args[i + 1]]);
const b = await chromium.launch({ proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: "localhost,127.0.0.1" } : undefined });
const res = [];
for (const [vp, opts] of [["phone", { ...devices["iPhone 13"], defaultBrowserType: "chromium" }], ["desktop", { viewport: { width: 1440, height: 900 } }]]) {
  for (const [label, url] of pairs) {
    const ctx = await b.newContext({ ...opts, locale: "pt-PT" }); const p = await ctx.newPage();
    let bytes = 0, js = 0;
    p.on("response", async (r) => { try { const h = await r.allHeaders(); const n = Number(h["content-length"] || 0) || (await r.body().catch(() => Buffer.alloc(0))).length; bytes += n; if ((h["content-type"] || "").includes("javascript")) js += n; } catch {} });
    try {
      await p.goto(url, { waitUntil: "load", timeout: 45000 }); await p.waitForTimeout(2500);
      // close cookie banners that cover the first screen
      for (const t of ["Aceitar", "Aceitar todos", "Accept", "Accept all", "Accepter", "OK", "Concordo"]) { const btn = p.getByRole("button", { name: t, exact: true }).first(); if (await btn.isVisible().catch(() => false)) { await btn.click().catch(() => {}); break; } }
      const m = await p.evaluate(() => {
        const H = innerHeight, W = innerWidth, vis = (e) => { const s = getComputedStyle(e); return s.display !== "none" && s.visibility !== "hidden" && +s.opacity > 0.05; };
        const texts = []; const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) { const n = walker.currentNode, t = n.textContent.trim(); if (!t) continue; const el = n.parentElement; if (!el || !vis(el) || el.closest("script,style,noscript")) continue; const r = el.getBoundingClientRect(); if (!r.width) continue; texts.push({ t, size: Math.round(parseFloat(getComputedStyle(el).fontSize)), top: r.top + scrollY, h: r.height }); }
        const words = (arr) => arr.reduce((n, x) => n + x.t.split(/\s+/).filter(Boolean).length, 0);
        const sizes = [...new Set(texts.map((x) => x.size))].sort((a, b) => a - b);
        const main = document.querySelector("main") || document.body;
        let secs = [...main.children].filter((e) => vis(e) && e.getBoundingClientRect().height > 120);
        if (secs.length <= 2) secs = [...main.querySelectorAll(":scope > * > section, :scope > section, :scope > div > div")].filter((e) => vis(e) && e.getBoundingClientRect().height > 120);
        const h1 = document.querySelector("h1"); const body = parseFloat(getComputedStyle(document.body).fontSize);
        const navLinks = [...document.querySelectorAll("header a, nav a")].filter((a) => vis(a) && a.getBoundingClientRect().top < 140 && a.getBoundingClientRect().width > 0).length;
        const burger = [...document.querySelectorAll("header button, header [aria-label], nav button")].some((e) => vis(e) && /menu|burger|nav|toggle/i.test((e.getAttribute("aria-label") || "") + e.className + e.textContent));
        const acts = [...document.querySelectorAll("a, button")].filter((a) => { if (!vis(a)) return false; const r = a.getBoundingClientRect(); return r.top >= 0 && r.top < H && r.width > 60 && r.height > 32 && (getComputedStyle(a).backgroundColor !== "rgba(0, 0, 0, 0)" || parseFloat(getComputedStyle(a).borderTopWidth) > 0); }).length;
        // white space: share of the first screen not covered by text boxes
        const first = texts.filter((x) => x.top < H); const inked = first.reduce((n, x) => n + x.h * Math.min(W, 600), 0) / (W * H);
        const lcp = performance.getEntriesByType("largest-contentful-paint").pop()?.startTime ?? null;
        const firstAnswer = (document.querySelector("article p, main p")?.textContent || "").trim().slice(0, 160);
        return { sections: secs.length, wordsFirst: words(first), wordsTotal: words(texts), sizes: sizes.length, sizeList: sizes.join(","), body, h1: h1 ? Math.round(parseFloat(getComputedStyle(h1).fontSize)) : null, h1Text: (h1?.textContent || "").trim().slice(0, 80), navLinks, burger, actionsFirst: acts, whitespace: Math.round(100 - Math.min(100, inked * 100)), height: Math.round(document.documentElement.scrollHeight / H * 10) / 10, firstAnswer };
      });
      const lcp = await p.evaluate(() => new Promise((r) => { new PerformanceObserver((l) => r(Math.round(l.getEntries().pop().startTime))).observe({ type: "largest-contentful-paint", buffered: true }); setTimeout(() => r(null), 1500); }));
      res.push({ vp, label, url: p.url(), ...m, kb: Math.round(bytes / 1024), jsKb: Math.round(js / 1024), lcp });
      console.log(vp, label, JSON.stringify({ sec: m.sections, wFirst: m.wordsFirst, wTotal: m.wordsTotal, sizes: m.sizes, body: m.body, h1: m.h1, nav: m.navLinks, burger: m.burger, acts: m.actionsFirst, ws: m.whitespace, screens: m.height, kb: Math.round(bytes / 1024), js: Math.round(js / 1024), lcp }));
    } catch (e) { res.push({ vp, label, url, error: e.message.slice(0, 120) }); console.log(vp, label, "ERROR", e.message.slice(0, 120)); }
    await ctx.close();
  }
}
writeFileSync(out, JSON.stringify(res, null, 1)); await b.close();
