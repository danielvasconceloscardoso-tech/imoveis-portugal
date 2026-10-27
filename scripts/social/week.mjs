// Prompt 30 §5.2: the exports of one week, from the drafts in social/ and content/inbox/week-NN/newsletter/.
//   social/exports/week-NN-contact-sheet.pdf   every post in posting order, with its images, caption, link and source
//   social/exports/week-NN-buffer-{instagram,facebook,linkedin}[-draft].csv   Buffer bulk upload (one file per channel)
//   social/exports/week-NN-meta-planner[-draft].csv   the same Facebook and Instagram posts for Meta Business Suite
//   social/exports/week-NN-linkedin-schedule[-draft].csv   date, time, language, text, image, first comment
//   content/inbox/week-NN/newsletter/beehiiv/{edition}-{lang}.html   paste-ready newsletter bodies, plus index.html
// Buffer's columns (Text, Image URL, Tags, Posting Time as YYYY-MM-DD HH:mm) were checked on 27 Oct 2026 against its
// help article "How to upload posts in bulk to Buffer"; bulk upload takes single images only, so carousels are
// listed as "schedule by hand". Meta's own bulk format could not be checked from here: the planner file is a
// plain sheet for entering posts by hand. Without --approved, every draft is exported and the files end in -draft;
// with --approved, only posts marked status: approved (PLAYBOOK §6). Usage (repo root):
//   node scripts/social/week.mjs 4 [--approved] [--media-base https://imoveisportugal.lu/social-media]
import { createRequire } from "node:module";
import { readFileSync, readdirSync, existsSync, statSync, writeFileSync, mkdirSync, unlinkSync, rmSync } from "node:fs";
import { join, resolve, dirname, relative } from "node:path";
const req = createRequire(join(process.cwd(), "site", "package.json"));
const { chromium } = req("playwright"), yaml = req("js-yaml"), { marked } = req("marked"), sharp = req("sharp");
const args = process.argv.slice(2), N = String(args[0]).padStart(2, "0"), W = `week-${N}`, APPROVED = args.includes("--approved");
const BASE = (args[args.indexOf("--media-base") + 1] && args.includes("--media-base")) ? args[args.indexOf("--media-base") + 1] : "https://imoveisportugal.lu/social-media";
const SUF = APPROVED ? "" : "-draft", OUT = "social/exports"; mkdirSync(OUT, { recursive: true });
const dirs = (d) => (existsSync(d) ? readdirSync(d).filter((x) => statSync(join(d, x)).isDirectory()).sort().map((x) => join(d, x)) : []);
const read = (file) => {
  const m = readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  return m ? { fm: yaml.load(m[1]) || {}, body: m[2].trim(), file } : null;
};
const imgs = (d, lang) => {
  const f = readdirSync(d).filter((x) => x.endsWith(".png")).sort();
  const own = f.filter((x) => x.endsWith(`-${lang}.png`));
  return (own.length ? own : f).map((x) => join(d, x));
};
const WEEKEND = (date) => [0, 6].includes(new Date(`${date}T12:00:00Z`).getUTCDay());
const timeOf = (fm, plat) => String(fm.time ?? (plat === "linkedin" ? "09:00" : WEEKEND(String(fm.date)) ? "19:00" : Number(fm.order) === 1 ? "12:30" : "19:00"));
const caption = (body) => body.replace(/^Images?:.*\n*/gm, "").replace(/^Alt text:.*$/m, "").replace(/<!--[\s\S]*?-->/g, "").trim();
const tagsOf = (body) => (body.match(/(^|\s)#[A-Za-zÀ-ÿ0-9]+/g) || []).map((t) => t.trim());
const ok = (fm) => !APPROVED || fm.status === "approved";

// Collect the week.
const posts = [];
for (const d of dirs(`social/instagram/posts/${W}`)) { const p = read(join(d, "post.md")); if (p && ok(p.fm)) posts.push({ ...p, plat: "instagram", kind: "feed", dir: d, images: imgs(d, p.fm.image_lang || "pt") }); }
for (const d of dirs(`social/instagram/stories/${W}`)) { const p = read(join(d, "stories.md")); if (p && ok(p.fm)) posts.push({ ...p, plat: "instagram", kind: "stories", dir: d, images: readdirSync(d).filter((x) => /^frame-.*\.png$/.test(x)).sort().map((x) => join(d, x)) }); }
for (const d of dirs(`social/facebook/${W}`)) {
  const p = read(join(d, "post.md")); if (!p || !ok(p.fm)) continue;
  const ref = [].concat(p.fm.image ?? p.fm.images ?? []).map((x) => resolve(d, x)).filter((x) => existsSync(x));
  posts.push({ ...p, plat: "facebook", kind: p.fm.format === "community" ? "community" : "feed", dir: d, images: ref.length ? ref : imgs(d, "pt") });
}
for (const d of dirs(`social/linkedin/${W}`)) { const p = read(join(d, "post.md")); if (p && ok(p.fm)) posts.push({ ...p, plat: "linkedin", kind: "feed", dir: d, images: imgs(d, p.fm.lang || "en"), pdf: readdirSync(d).find((x) => x.endsWith(".pdf")) }); }
const answers = ["reddit", "quora"].flatMap((pl) => dirs(`social/${pl}/${W}`).map((d) => read(join(d, "post.md"))).filter((p) => p && ok(p.fm)).map((p) => ({ ...p, plat: pl })));
for (const p of posts) { p.date = p.fm.date instanceof Date ? p.fm.date.toISOString().slice(0, 10) : String(p.fm.date); p.time = timeOf(p.fm, p.plat); }
const ORDER = { instagram: 0, facebook: 1, linkedin: 2 };
posts.sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`) || ORDER[a.plat] - ORDER[b.plat]);

// Spreadsheet files (UTF-8 with BOM so Excel keeps the accents).
const csv = (rows) => "﻿" + rows.map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n") + "\r\n";
const url = (f) => `${BASE}/w${N}/${relative("social", f).replace(/\//g, "_").replace(/^instagram_posts_|^instagram_stories_|^facebook_|^linkedin_/, "")}`;
const feed = (plat) => posts.filter((p) => p.plat === plat && p.kind !== "stories");
const manual = [];
for (const plat of ["instagram", "facebook", "linkedin"]) {
  const rows = [["Text", "Image URL", "Tags", "Posting Time"]];
  for (const p of feed(plat)) {
    const multi = p.images.length > 1 || p.pdf;
    if (multi) { manual.push([p.date, p.time, plat, p.fm.format, p.images.length, relative(".", p.dir)]); continue; }
    const text = caption(p.body) + (plat === "linkedin" ? "" : "");
    rows.push([text, p.images[0] ? url(p.images[0]) : "", "", `${p.date} ${p.time}`]);
  }
  writeFileSync(join(OUT, `${W}-buffer-${plat}${SUF}.csv`), csv(rows));
}
writeFileSync(join(OUT, `${W}-schedule-by-hand${SUF}.csv`), csv([["Date", "Time (Paris)", "Platform", "Format", "Images", "Folder"], ...manual]));
const meta = [["Date", "Time (Paris)", "Platform", "Placement", "Text", "Media (repo paths, in order)", "Link", "Status"]];
for (const p of posts.filter((p) => p.plat !== "linkedin")) meta.push([p.date, p.time, p.plat === "instagram" ? "Instagram" : "Facebook", p.kind === "stories" ? "Story" : "Feed", p.kind === "stories" ? "(see stories.md: one frame per time, sticker added in the app)" : caption(p.body), p.images.map((f) => relative(".", f)).join(" | "), p.fm.link ?? "", p.fm.status]);
writeFileSync(join(OUT, `${W}-meta-planner${SUF}.csv`), csv(meta));
const li = [["Date", "Time (Paris)", "Language", "Post text", "Image or document", "First comment", "Hashtags", "Status"]];
for (const p of feed("linkedin")) li.push([p.date, p.time, p.fm.lang ?? "", caption(p.body).replace(/^Fonte.*$|^Source.*$/m, (s) => s), p.pdf ? relative(".", join(p.dir, p.pdf)) : p.images.map((f) => relative(".", f)).join(" | "), p.fm.first_comment ?? "", tagsOf(p.body).join(" "), p.fm.status]);
writeFileSync(join(OUT, `${W}-linkedin-schedule${SUF}.csv`), csv(li));

// Contact sheet: a cover with the week's schedule, then every post in posting order, then the Reddit and Quora drafts.
const esc = (s) => String(s ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
const fonts = "file://" + resolve("design/social/fonts");
const label = { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn" };
const row = (p) => `<tr><td>${p.date}</td><td>${p.time}</td><td>${label[p.plat]}${p.kind === "stories" ? " stories" : p.kind === "community" ? " community" : ""}</td><td>${esc(p.fm.format)}</td><td>${esc(caption(p.body).split("\n").find((l) => l.trim() && !/^(PT|EN|FR) ·\s*$/.test(l))?.replace(/^(PT|EN|FR) · /, "").slice(0, 90))}</td></tr>`;
// The sheet shows 640 px JPEG copies of the images so the PDF stays small; the PNGs are what gets posted.
const TH = resolve(OUT, `.${W}-thumbs`); mkdirSync(TH, { recursive: true });
const thumbs = new Map();
for (const p of posts) for (const f of p.images) {
  const t = join(TH, relative(".", f).replace(/[\/]/g, "_").replace(/\.png$/, ".jpg"));
  await sharp(f).resize({ width: 640, withoutEnlargement: true }).flatten({ background: "#ffffff" }).jpeg({ quality: 78 }).toFile(t); thumbs.set(f, t);
}
const card = (p) => {
  const story = p.kind === "stories", n = p.images.length;
  const w = story ? 30 : n > 1 ? 34 : 74;
  const pics = p.images.map((f) => `<img style="width:${w}mm" src="file://${thumbs.get(f)}">`).join("");
  return `<section class="p${story || n > 1 ? " wide" : ""}"><div class="pics">${pics}</div><div class="txt"><h2>${p.date} · ${p.time} · ${label[p.plat]}${story ? " stories" : ""} · ${esc(p.fm.format)}</h2><p class="m">${esc(p.fm.link ?? "")}${p.fm.first_comment ? `<br>First comment: ${esc(p.fm.first_comment)}` : ""}${p.fm.partner_status ? `<br><b>Partner: ${esc(p.fm.partner_status)}</b>` : ""}</p><pre>${esc(p.body.replace(/^Images?:.*\n*/gm, ""))}</pre></div></section>`;
};
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:P;src:url("${fonts}/playfair-display-latin-wght-normal.woff2")} @font-face{font-family:M;src:url("${fonts}/manrope-latin-wght-normal.woff2")}
@page{size:A4;margin:12mm} body{font:9pt/1.4 M,sans-serif;color:#111214;margin:0}
h1{font:400 24pt/1.1 P,serif;margin:20mm 0 5mm} h2{font:400 12pt/1.2 P,serif;margin:0 0 2mm} .m{color:#6a6d72;font-size:7.5pt;margin:0 0 3mm;word-break:break-all}
table{border-collapse:collapse;width:100%;font-size:7.5pt} td{border-bottom:.2mm solid #e2e2df;padding:1.2mm 2mm 1.2mm 0;vertical-align:top}
.cover{page-break-after:always} .p{display:grid;grid-template-columns:76mm 1fr;gap:7mm;page-break-inside:avoid;padding:5mm 0;border-bottom:.3mm solid #e2e2df}
.p.wide{grid-template-columns:1fr} .pics{display:flex;flex-wrap:wrap;gap:2mm} .pics img{border:.3mm solid #e2e2df}
pre{white-space:pre-wrap;font:8.5pt/1.42 M,sans-serif;margin:0} .ans{page-break-before:always}
</style></head><body>
<div class="cover"><h1>Week ${Number(N)} · contact sheet</h1><p>${posts.filter((p) => p.kind !== "stories").length} posts, ${posts.filter((p) => p.kind === "stories").reduce((t, p) => t + p.images.length, 0)} story images (each frame drawn in PT, EN and FR; stories.md says which one goes out), ${answers.length} Reddit and Quora drafts. Times are Paris time (PLAYBOOK §3). Status: ${APPROVED ? "approved posts only" : "draft. Nothing is posted or scheduled"}.</p>
<table>${posts.map(row).join("")}</table></div>
${posts.map(card).join("")}
${answers.map((a, i) => `<section class="${i ? "" : "ans"} p wide"><div class="txt"><h2>${esc(a.fm.date)} · ${a.plat === "reddit" ? "Reddit" : "Quora"} · ${esc(a.fm.community)}</h2><p class="m">Thread: ${esc(a.fm.thread ?? "")}<br>Rules: ${esc(a.fm.rules_checked ?? "")}</p><pre>${esc(a.body)}</pre></div></section>`).join("")}
</body></html>`;
const b = await chromium.launch(), pg = await b.newPage();
const tmp = resolve(OUT, `.${W}-sheet.html`); writeFileSync(tmp, html);
await pg.goto("file://" + tmp, { waitUntil: "load" }); await pg.evaluate(() => document.fonts.ready); unlinkSync(tmp);
await pg.pdf({ path: join(OUT, `${W}-contact-sheet${SUF}.pdf`), format: "A4", printBackground: true });
rmSync(TH, { recursive: true, force: true });

// Newsletters for beehiiv: one HTML body per edition and language, ready to paste into a new draft post.
const nlDir = `content/inbox/${W}/newsletter`, bh = join(nlDir, "beehiiv");
const letters = existsSync(nlDir) ? readdirSync(nlDir).filter((f) => f.endsWith(".md")).sort().map((f) => read(join(nlDir, f))).filter(Boolean) : [];
if (letters.length) {
  mkdirSync(bh, { recursive: true });
  const style = `body{font:16px/1.6 Georgia,serif;color:#111214;max-width:620px;margin:32px auto;padding:0 16px} h2{font:600 13px/1.2 Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#2f5d50;margin:32px 0 8px} a{color:#2f5d50} blockquote{border-left:3px solid #b42318;margin:16px 0;padding:4px 12px;color:#b42318;font:13px/1.4 Arial,sans-serif} .meta{font:12px/1.5 Arial,sans-serif;color:#6a6d72;border:1px solid #e2e2df;padding:10px 12px}`;
  const index = [];
  for (const l of letters) {
    const name = l.file.split("/").pop().replace(/\.md$/, "");
    const body = l.body.replace(/<!--[\s\S]*?-->/g, "").replace(/^Subject:.*\n+/m, "").trim();
    const subjects = [].concat(l.fm.subjects ?? l.fm.title ?? []);
    writeFileSync(join(bh, `${name}.html`), `<!doctype html><html lang="${l.fm.lang}"><head><meta charset="utf-8"><title>${esc(l.fm.title)}</title><style>${style}</style></head><body>
<div class="meta">Edition ${esc(l.fm.edition)} · ${esc(l.fm.lang)} · ${esc(l.fm.send ?? `Thursday ${l.fm.date}, 08:00 local time`)} · status ${esc(l.fm.status)}${l.fm.partner_status ? ` · partner ${esc(l.fm.partner_status)}` : ""}<br>Subject options: ${subjects.map(esc).join(" · ")}<br>Copy everything below this box into the beehiiv editor.</div>
${marked.parse(body)}</body></html>\n`);
    index.push(`<tr><td><a href="${name}.html">${name}</a></td><td>${esc(l.fm.send ?? l.fm.date)}</td><td>${subjects.map(esc).join("<br>")}</td><td>${esc(l.fm.status)}${l.fm.partner_status ? `, ${esc(l.fm.partner_status)}` : ""}</td></tr>`);
  }
  writeFileSync(join(bh, "index.html"), `<!doctype html><meta charset="utf-8"><title>Week ${Number(N)} newsletters</title><style>body{font:14px/1.5 Arial,sans-serif;margin:32px} td{border-bottom:1px solid #ddd;padding:6px 10px;vertical-align:top}</style><h1>Week ${Number(N)}: ${letters.length} newsletters</h1><table>${index.join("")}</table>\n`);
}
await b.close();
console.log(`${W}: ${posts.length} posts and story days, ${answers.length} answers, ${letters.length} newsletters, ${manual.length} to schedule by hand`);
