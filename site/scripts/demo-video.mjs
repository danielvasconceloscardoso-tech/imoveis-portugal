// Prompt 26 §2: a 60–90 s screen recording per private demo (MP4, English subtitles burned in) and its .srt.
// Usage (from site/, with the built site served on http://127.0.0.1:4326): node scripts/demo-video.mjs <token> <city> <budget> <cur> <outdir>
// Steps: budget in the reader's currency → search the municipality → place card → the project pin and card → the path →
// the developer's site with the map → the monthly report. Needs ffmpeg with libass.
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, readdirSync, renameSync } from "node:fs";
import { join } from "node:path";
const { chromium } = createRequire(join(process.cwd(), "package.json"))("playwright");
const [token, place, budget, cur, outdir] = process.argv.slice(2);
const base = "http://127.0.0.1:4326";
mkdirSync(outdir, { recursive: true });
const tmp = join(outdir, `tmp-${token}`); mkdirSync(tmp, { recursive: true });
const b = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 810 }, recordVideo: { dir: tmp, size: { width: 1280, height: 720 } } });
const p = await ctx.newPage();
const t0 = Date.now(), subs = [];
const say = (text, secs) => { const s = (Date.now() - t0) / 1000; subs.push([s, s + secs, text]); };
const wait = (ms) => p.waitForTimeout(ms);

await p.goto(`${base}/embed/map/en/?cur=${cur}&demoproj=${token}`, { waitUntil: "load" });
await p.waitForSelector(".mapx.is-live", { timeout: 60000 });
say("A reader abroad opens the map of Portugal: all 308 municipalities, from INE's official prices.", 7); await wait(5000);
const input = p.locator("[data-budget]");
await input.click(); await input.fill(""); say(`They type their budget in their own currency: ${Number(budget).toLocaleString("en-US")} ${cur}.`, 6);
await input.type(Number(budget).toLocaleString("en-US"), { delay: 90 }); await input.press("Enter"); await wait(4500);
say(`They look for ${place}. The camera flies there.`, 6);
const find = p.locator("[data-find]"); await find.click(); await find.type(place, { delay: 110 }); await wait(600); await find.press("Enter"); await wait(5500);
say("The place card: square metres for the budget, ten years of prices and rents, yield and momentum. All INE, with the period.", 9);
for (let i = 0; i < 6; i++) { await p.evaluate(() => document.querySelector("[data-card]")?.scrollBy({ top: 140, behavior: "smooth" })); await wait(1300); }
await wait(1200);
say("Then the partner layer: your project as a pin, labelled “Sponsored”, with its own card.", 8);
await p.evaluate(() => { const c = document.querySelector("[data-card]"); if (c) c.hidden = true; });
const pin = p.locator(".mapx-proj").first();
if (await pin.count()) { await pin.click(); } await wait(7000);
say("Next, the path a buyer from their country follows, step by step, and where questions become enquiries.", 9);
await p.goto(`${base}/d/${token}/`, { waitUntil: "load" });
await p.evaluate(() => document.querySelector("section.n:nth-of-type(5)")?.scrollIntoView({ behavior: "smooth" })); await wait(4500);
for (let i = 0; i < 4; i++) { await p.mouse.wheel(0, 260); await wait(1100); }
say("On your own site, the same map in your colour, “Powered by Imóveis Portugal”.", 9);
await p.evaluate(() => document.querySelector("section.n:nth-of-type(6)")?.scrollIntoView({ behavior: "smooth" })); await wait(9000);
say("And each month, a report: placements seen, clicks and enquiries by country and budget. Illustrative example, not real data.", 9);
await p.evaluate(() => document.querySelector("section.n:nth-of-type(7)")?.scrollIntoView({ behavior: "smooth" })); await wait(9500);
say("Private demo prepared for you · not published.", 5); await wait(5000);
const dur = (Date.now() - t0) / 1000;
await ctx.close(); await b.close();

const fmt = (s) => { const ms = Math.round(s * 1000), h = Math.floor(ms / 3600000), m = Math.floor(ms / 60000) % 60, sec = Math.floor(ms / 1000) % 60; return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`; };
const srt = subs.map(([a, z, t], i) => `${i + 1}\n${fmt(a)} --> ${fmt(Math.min(z, subs[i + 1]?.[0] ?? z))}\n${t}\n`).join("\n");
const srtPath = join(outdir, `demo-${token}.srt`); writeFileSync(srtPath, srt);
const webm = join(tmp, readdirSync(tmp).find((f) => f.endsWith(".webm")));
const mp4 = join(outdir, `demo-${token}.mp4`);
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", webm, "-vf", `subtitles=${srtPath}:force_style='FontName=DejaVu Sans,FontSize=20,PrimaryColour=&H00FFFFFF,BackColour=&H99000000,BorderStyle=4,Outline=0,Shadow=0,MarginV=28'`,
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "26", "-preset", "veryfast", "-movflags", "+faststart", "-an", mp4]);
console.log(mp4, `${dur.toFixed(1)} s`);
