// Visual check before every push (prompt 77 §2): builds the site, screenshots a fixed list of pages at desktop and phone
// size, and compares each shot with the approved baseline in ops/snapshots/baseline/<size>/<name>.png.
//
//   node scripts/visual-check.mjs                    build into a temp folder, shoot, compare (exit 1 if any page fails)
//   node scripts/visual-check.mjs --dist <dir>       skip the build, use an existing build output
//   node scripts/visual-check.mjs --only home-us,map limit the run to these page names
//   node scripts/visual-check.mjs --baseline <dir>   compare with (or --update into) another baseline folder
//   node scripts/visual-check.mjs --update           write the current shots as the new baseline (only after the operator's yes)
//
// Diff images of the pages that differ go to ops/snapshots/diff/ (gitignored). Thresholds: 0.5% of pixels, 3% on map pages
// (the map is WebGL rendered in software here, so it varies a little from run to run). See ops/snapshots/README.md.
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { spawnSync } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, mkdtempSync, rmSync, statSync, copyFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname, extname, resolve, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { chromium } = createRequire(join(root, "site", "package.json"))("playwright");

// ---- Options ----
const argv = process.argv.slice(2);
const opt = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
const UPDATE = argv.includes("--update");
const DIST = opt("--dist") ? resolve(opt("--dist")) : null;
const ONLY = opt("--only") ? new Set(opt("--only").split(",").map((s) => s.trim()).filter(Boolean)) : null;
const BASE = resolve(opt("--baseline") ?? join(root, "ops", "snapshots", "baseline"));
const DIFF = join(root, "ops", "snapshots", "diff");

// ---- The pages (names are the baseline file names) ----
const PAGES = [
  { name: "home-lu", path: "/pt/lu/" },
  { name: "home-fr", path: "/fr/fr/" },
  { name: "home-ch", path: "/fr/ch/" },
  { name: "home-br", path: "/pt/br/" },
  { name: "home-us", path: "/en/us/" },
  { name: "home-il", path: "/en/il/" },
  { name: "map", path: "/en/us/map/", map: true },
  { name: "gondomar", path: "/pt/lu/mapa/?place=gondomar", map: true },
  { name: "arrow", path: "/en/us/map/?pins=the-uncommon,springs-els-club,palmares", map: true },
  { name: "closer", path: "/en/us/closer-than-you-think/" },
  { name: "simulator", path: "/pt/lu/simuladores/" },
  { name: "concierge", path: "/en/us/private-consultation/" },
  { name: "mare", path: "/pt/lu/mare/" },
];
const SIZES = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  { name: "phone", viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
    userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36" },
];
const THRESHOLD = { page: 0.5, map: 3 };   // % of pixels allowed to differ
const MAP_WAIT = 6000;                       // ms after the map canvas appears (software WebGL, tiles, first flight)

const pages = PAGES.filter((p) => !ONLY || ONLY.has(p.name));
if (ONLY) for (const n of ONLY) if (!PAGES.some((p) => p.name === n)) { console.error(`Unknown page "${n}". Pages: ${PAGES.map((p) => p.name).join(", ")}`); process.exit(2); }

// Stabilisers: no motion, no hero film (chromium here cannot play H.264; the poster underneath shows), no caret.
const FREEZE_CSS = `
*, *::before, *::after { transition: none !important; animation-duration: 0s !important; animation-delay: 0s !important;
  animation-iteration-count: 1 !important; scroll-behavior: auto !important; caret-color: transparent !important; }
video[data-hero-film], video[data-film] { visibility: hidden !important; }`;
const MASK = "[data-now], [data-tz-line], [data-h], [data-clock]";   // live clocks and time differences

// ---- Temp folders, cleaned on exit ----
const temps = [];
let server = null;
const cleanup = () => { try { server?.close(); } catch {} for (const t of temps) rmSync(t, { recursive: true, force: true }); temps.length = 0; };
process.on("SIGINT", () => { cleanup(); process.exit(130); });
process.on("SIGTERM", () => { cleanup(); process.exit(143); });

// ---- 1. Build ----
function build() {
  const out = mkdtempSync(join(tmpdir(), "visual-check-dist-"));
  temps.push(out);
  console.log(`Building the site into ${out} (WORKERS_CI_BRANCH=main) ...`);
  const r = spawnSync("npx", ["astro", "build", "--outDir", out], { cwd: join(root, "site"), env: { ...process.env, WORKERS_CI_BRANCH: "main" }, stdio: ["ignore", "pipe", "pipe"], encoding: "utf8", maxBuffer: 1 << 28 });
  if (r.status !== 0) { console.error((r.stdout || "").slice(-4000), (r.stderr || "").slice(-4000)); throw new Error("astro build failed"); }
  return out;
}

// ---- 2. Static server: directories with a trailing slash serve index.html, the nearest 404.html answers misses ----
const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".gif": "image/gif",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".mp4": "video/mp4", ".webm": "video/webm", ".pbf": "application/x-protobuf",
  ".pmtiles": "application/octet-stream", ".bin": "application/octet-stream", ".wasm": "application/wasm", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".pdf": "application/pdf" };
function serve(dir) {
  const send = (res, file, status = 200) => { res.writeHead(status, { "content-type": MIME[extname(file).toLowerCase()] ?? "application/octet-stream", "content-length": statSync(file).size }); createReadStream(file).pipe(res); };
  const isFile = (f) => { try { return statSync(f).isFile(); } catch { return false; } };
  const isDir = (f) => { try { return statSync(f).isDirectory(); } catch { return false; } };
  return new Promise((ok) => {
    server = createServer((req, res) => {
      const url = new URL(req.url, "http://x");
      let p;
      try { p = decodeURIComponent(url.pathname); } catch { p = url.pathname; }
      const file = normalize(join(dir, p));
      if (file !== dir && !file.startsWith(dir + sep)) { res.writeHead(403); return res.end(); }
      if (isDir(file)) {
        if (!p.endsWith("/")) { res.writeHead(301, { location: p + "/" + url.search }); return res.end(); }
        if (isFile(join(file, "index.html"))) return send(res, join(file, "index.html"));
      } else if (isFile(file)) return send(res, file);
      else if (isFile(file + ".html")) return send(res, file + ".html");
      for (let d = dirname(join(dir, p.endsWith("/") ? p + "x" : p)); d.startsWith(dir); d = dirname(d)) {   // nearest 404.html
        if (isFile(join(d, "404.html"))) return send(res, join(d, "404.html"), 404);
        if (d === dir) break;
      }
      res.writeHead(404); res.end("Not found");
    });
    server.listen(0, "127.0.0.1", () => ok(server.address().port));
  });
}

// ---- 3. Screenshots ----
// The two sizes run side by side (one browser context each); pages within a size run one after another.
async function shoot(browser, origin, outDir) {
  const shots = [];
  await Promise.all(SIZES.map(async (size) => {
    const { name: sizeName, ...ctxOpts } = size;
    const ctx = await browser.newContext({ ...ctxOpts, locale: "en-US", timezoneId: "Europe/Lisbon", colorScheme: "light", reducedMotion: "reduce", serviceWorkers: "block" });
    // Only the local server answers: beehiiv, Tally, analytics, video embeds and every other host are blocked.
    await ctx.route("**/*", (r) => (new URL(r.request().url()).origin === origin ? r.continue() : r.abort()));
    mkdirSync(join(outDir, sizeName), { recursive: true });
    for (const pg of pages) {
      const t0 = Date.now();
      const page = await ctx.newPage();
      const file = join(outDir, sizeName, `${pg.name}.png`);
      try {
        const resp = await page.goto(origin + pg.path, { waitUntil: "load", timeout: 90000 });
        if (!resp || resp.status() >= 400) throw new Error(`HTTP ${resp?.status()}`);
        await page.addStyleTag({ content: FREEZE_CSS });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
        const vh = size.viewport.height;
        // First screen plus one scroll: scroll through it so reveal-on-scroll sections show, then back to the top.
        for (const y of [vh / 2, vh, vh * 1.5, vh * 2, 0]) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(150); }
        if (pg.map) {
          await page.waitForSelector("canvas", { state: "attached", timeout: 30000 });
          await page.waitForTimeout(MAP_WAIT);
          // A map view (?pins=, a card's camera) may still be settling: wait until two shots 1.5 s apart are identical (up to 20 s).
          let prev = await page.screenshot({ scale: "css", animations: "disabled" });
          for (let k = 0; k < 13; k++) {
            await page.waitForTimeout(1500);
            const cur = await page.screenshot({ scale: "css", animations: "disabled" });
            if (cur.equals(prev)) break;
            prev = cur;
          }
        } else await page.waitForTimeout(400);
        await page.evaluate(() => document.fonts.ready);
        const h = await page.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight ?? 0));
        await page.screenshot({ path: file, fullPage: true, clip: { x: 0, y: 0, width: size.viewport.width, height: Math.min(vh * 2, 1800, h) },
          scale: "css", animations: "disabled", caret: "hide", mask: [page.locator(MASK)], maskColor: "#ff00ff" });
        shots.push({ name: pg.name, size: sizeName, file, map: !!pg.map });
        console.log(`  ${sizeName.padEnd(7)} ${pg.name.padEnd(10)} ${((Date.now() - t0) / 1000).toFixed(1)} s`);
      } catch (e) {
        shots.push({ name: pg.name, size: sizeName, file: null, map: !!pg.map, error: String(e.message || e).split("\n")[0] });
        console.log(`  ${sizeName.padEnd(7)} ${pg.name.padEnd(10)} error: ${shots.at(-1).error}`);
      } finally { await page.close(); }
    }
    await ctx.close();
  }));
  const order = (s) => SIZES.findIndex((z) => z.name === s.size) * 100 + PAGES.findIndex((p) => p.name === s.name);
  return shots.sort((a, b) => order(a) - order(b));
}

// ---- 4. Compare (python3 with numpy and PIL; neither pngjs nor pixelmatch is installed here) ----
// A pixel differs when any channel moves by more than 24 of 255 (anti-aliasing noise stays under it). Different sizes
// count the area outside the overlap as different. The diff image is the baseline in faint grey with the changes in red.
const PY = `
import sys, json
import numpy as np
from PIL import Image
jobs = json.load(sys.stdin); out = []
for j in jobs:
    a = np.asarray(Image.open(j["base"]).convert("RGB"), dtype=np.int16)
    b = np.asarray(Image.open(j["cur"]).convert("RGB"), dtype=np.int16)
    H, W = max(a.shape[0], b.shape[0]), max(a.shape[1], b.shape[1])
    pa = np.full((H, W, 3), -999, np.int16); pa[:a.shape[0], :a.shape[1]] = a
    pb = np.full((H, W, 3), 999, np.int16); pb[:b.shape[0], :b.shape[1]] = b
    d = (np.abs(pa - pb).max(axis=2) > 24)
    n = int(d.sum()); pct = 100.0 * n / (H * W)
    if n and j.get("diff"):
        g = np.clip(np.where(pa < 0, 255, pa), 0, 255).astype(np.float32).mean(axis=2)
        img = np.repeat((255 - (255 - g) * 0.25)[:, :, None], 3, axis=2).astype(np.uint8)
        img[d] = [220, 0, 0]
        Image.fromarray(img).save(j["diff"], optimize=True)
    out.append({"pct": pct, "w": W, "h": H, "same_size": a.shape == b.shape})
print(json.dumps(out))
`;
function compare(jobs) {
  if (!jobs.length) return [];
  const r = spawnSync("python3", ["-I", "-c", PY], { input: JSON.stringify(jobs), encoding: "utf8", maxBuffer: 1 << 24 });
  if (r.status !== 0) throw new Error("compare failed: " + r.stderr);
  return JSON.parse(r.stdout);
}

// ---- Run ----
const started = Date.now();
let code = 0;
try {
  const dist = DIST ?? build();
  if (!existsSync(join(dist, "index.html"))) throw new Error(`No index.html in ${dist}`);
  const port = await serve(dist);
  const origin = `http://127.0.0.1:${port}`;
  console.log(`Serving ${dist} on ${origin}; shooting ${pages.length} page(s) x ${SIZES.length} sizes ...`);
  const shotsDir = mkdtempSync(join(tmpdir(), "visual-check-shots-"));
  temps.push(shotsDir);
  const browser = await chromium.launch({ args: ["--font-render-hinting=none", "--disable-lcd-text", "--hide-scrollbars"] });
  const shots = await shoot(browser, origin, shotsDir);
  await browser.close();
  server.close(); server = null;

  if (UPDATE) {
    let n = 0;
    for (const s of shots) {
      if (!s.file) { console.log(`  ${s.size}/${s.name}: NOT SAVED (${s.error})`); code = 1; continue; }
      mkdirSync(join(BASE, s.size), { recursive: true });
      copyFileSync(s.file, join(BASE, s.size, `${s.name}.png`)); n++;
    }
    console.log(`\nBaseline updated: ${n} shot(s) written to ${BASE}.`);
    console.log("Reminder: update the baseline only after the operator has seen the before-and-after screenshots and said yes (prompt 77 §2.3).");
  } else {
    rmSync(DIFF, { recursive: true, force: true });
    const jobs = [], rows = [];
    for (const s of shots) {
      const base = join(BASE, s.size, `${s.name}.png`);
      const row = { page: s.name, size: s.size, limit: s.map ? THRESHOLD.map : THRESHOLD.page };
      rows.push(row);
      if (!s.file) { row.note = `error: ${s.error}`; continue; }
      if (!existsSync(base)) { row.note = "no baseline"; continue; }
      mkdirSync(join(DIFF, s.size), { recursive: true });
      row.job = jobs.length;
      jobs.push({ base, cur: s.file, diff: join(DIFF, s.size, `${s.name}.png`) });
    }
    const res = compare(jobs);
    for (const row of rows) if (row.job !== undefined) { const r = res[row.job]; row.pct = r.pct; if (!r.same_size) row.note = "size changed"; }
    const pad = (s, n) => String(s).padEnd(n);
    console.log("\n" + [pad("page", 11), pad("size", 8), pad("% diff", 8), pad("limit", 6), "result"].join(" | "));
    console.log("-".repeat(52));
    for (const r of rows) {
      const pass = r.pct !== undefined && r.pct <= r.limit;
      if (!pass) code = 1;
      console.log([pad(r.page, 11), pad(r.size, 8), pad(r.pct !== undefined ? r.pct.toFixed(2) : "-", 8), pad(r.limit + "%", 6), (pass ? "pass" : "FAIL") + (r.note ? ` (${r.note})` : "")].join(" | "));
    }
    // Keep only the diff images of pages that differ.
    for (const sz of SIZES) { const d = join(DIFF, sz.name); if (existsSync(d) && !readdirSync(d).length) rmSync(d, { recursive: true }); }
    const failed = rows.filter((r) => !(r.pct !== undefined && r.pct <= r.limit));
    console.log(failed.length
      ? `\n${failed.length} of ${rows.length} shot(s) failed. Diff images: ops/snapshots/diff/. If the change was asked for, send the operator before-and-after screenshots; update the baseline with --update only after his yes.`
      : `\nAll ${rows.length} shot(s) match the baseline.`);
    if (rows.some((r) => r.note === "no baseline")) console.log(`No baseline for some shots in ${BASE}: create it with --update, only after the operator's yes.`);
  }
} catch (e) {
  console.error("visual-check:", e.message || e);
  code = 1;
} finally {
  cleanup();
  console.log(`Done in ${Math.round((Date.now() - started) / 1000)} s.`);
}
process.exit(code);
