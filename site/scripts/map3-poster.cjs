// Run from site/ with the built site served on :4502 (python3 -m http.server 4502 in dist/): node scripts/map3-poster.cjs public/img
// p70: the map page's still picture without place names (the live map adds them in the reader's language), at the
// live map's own first framing. Captures the built site served on :4502.
const { chromium } = require("playwright");
const fs = require("fs");
const OUT = process.argv[2];
(async () => {
  const br = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const shots = {};
  for (const [name, w, h, mob, dpr] of [["d", 1200, 761, false, 1.5], ["m", 320, 767, true, 2]]) {
    const c = await br.newContext({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob, deviceScaleFactor: dpr });
    const p = await c.newPage(); await p.goto("http://127.0.0.1:4502/en/us/map/");
    await p.mouse.move(10, 300);
    await p.waitForSelector(".m3.is-live", { timeout: 90000 });
    await p.waitForTimeout(5000);
    await p.evaluate(() => new Promise((r) => { const m = document.querySelector("[data-m3]").__mapx.map(); const t0 = Date.now(); const chk = () => ((!m.isMoving() && m.areTilesLoaded()) || Date.now() - t0 > 60000 ? r() : setTimeout(chk, 300)); chk(); }));
    await p.waitForTimeout(2500);
    await p.addStyleTag({ content: ".m3-top,.m3-cards,.m3-dock,.maplibregl-marker,.m3-labels,.m3-attr,.m3-legend,.m3-sheet,.m3-caption,.m3-toast,#ip-geo{display:none!important}" });
    await p.waitForTimeout(500);
    shots[name] = (await p.locator(".m3-stage").screenshot({ type: "png" })).toString("base64");
    await c.close();
  }
  const conv = await (await br.newContext()).newPage();
  const enc = (b64, w) => conv.evaluate(async ({ b64, w }) => { const img = new Image(); img.src = `data:image/png;base64,${b64}`; await img.decode(); const h = Math.round((img.height * w) / img.width), cv = document.createElement("canvas"); cv.width = w; cv.height = h; cv.getContext("2d").drawImage(img, 0, 0, w, h); return cv.toDataURL("image/webp", 0.82); }, { b64, w });
  for (const [file, key, w] of [["map3-poster-1800.webp", "d", 1800], ["map3-poster-1200.webp", "d", 1200], ["map3-poster-m.webp", "m", 640]]) {
    const d = await enc(shots[key], w); fs.writeFileSync(`${OUT}/${file}`, Buffer.from(d.split(",")[1], "base64")); console.log(file);
  }
  await br.close();
})();
