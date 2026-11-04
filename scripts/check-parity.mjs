// Parity gate for the three languages (PT, EN, FR): same questions, same order, same stage, rank, partner action
// and facts in every FAQ file; every copy-deck block present in all three languages; e-book chapters and lists of
// equal length. Run from the repo root:  node scripts/check-parity.mjs
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const yaml = createRequire(join(root, "site", "package.json"))("js-yaml");
const errors = [];

// FAQ: per edition (and common), the pt, en and fr files must line up question by question.
const dir = join(root, "content/faq");
const groups = new Map();
for (const f of readdirSync(dir).filter((x) => x.endsWith(".yaml"))) {
  const m = f.match(/^(.+)-(pt|en|fr)\.yaml$/); if (!m) continue;
  (groups.get(m[1]) ?? groups.set(m[1], {}).get(m[1]))[m[2]] = yaml.load(readFileSync(join(dir, f), "utf8"));
}
for (const [g, byLang] of groups) {
  const langs = Object.keys(byLang);
  if (langs.length !== 3) { errors.push(`faq ${g}: missing language (has ${langs.join(", ")})`); continue; }
  const n = byLang.pt.length;
  for (const l of ["en", "fr"]) if (byLang[l].length !== n) errors.push(`faq ${g}: ${l} has ${byLang[l].length} questions, pt has ${n}`);
  for (let i = 0; i < n; i++) {
    const a = byLang.pt[i];
    for (const l of ["en", "fr"]) {
      const b = byLang[l][i]; if (!b) continue;
      for (const k of ["rank", "stage", "cta"]) if (a[k] !== b[k]) errors.push(`faq ${g} #${i + 1}: ${k} differs (pt ${a[k]}, ${l} ${b[k]})`);
      if (JSON.stringify(a.facts) !== JSON.stringify(b.facts)) errors.push(`faq ${g} #${i + 1}: facts differ between pt and ${l}`);
    }
  }
}

// Copy deck: every block has PT, EN and FR lines.
const deck = readFileSync(join(root, "content/copy/COPY_DECK.md"), "utf8").split("\n");
let block = "", seen = {};
const flush = () => { if (block) for (const l of ["PT", "EN", "FR"]) if (!seen[l]) errors.push(`copy deck ${block}: no ${l} line`); };
for (const line of deck) {
  if (line.startsWith("### ")) { flush(); block = line.slice(4).trim(); seen = {}; }
  else if (line.startsWith("## ")) { flush(); block = ""; }
  else { const m = line.match(/^- (PT|EN|FR):/); if (m) seen[m[1]] = true; }
}
flush();


// Blog: every article exists in pt, en and fr with the same partner action, sources and related articles.
const blogDir = join(root, "content/blog");
const posts = new Map();
for (const f of readdirSync(blogDir).filter((x) => /\.(pt|en|fr)\.md$/.test(x))) {
  const m = readFileSync(join(blogDir, f), "utf8").match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const fm = yaml.load(m[1]), body = m[2];
  (posts.get(fm.id) ?? posts.set(fm.id, {}).get(fm.id))[fm.lang] = { fm, h2: (body.match(/^## /gm) || []).length, cites: new Set([...body.matchAll(/\[\[([a-z0-9-]+)\]\]/g)].map((x) => x[1])), tables: (body.match(/^\| ---/gm) || []).length };
}
for (const [id, by] of posts) {
  if (Object.keys(by).length !== 3) { errors.push(`blog ${id}: missing language (has ${Object.keys(by).join(", ")})`); continue; }
  for (const l of ["en", "fr"]) {
    const a = by.pt, b = by[l];
    if (a.fm.cta !== b.fm.cta) errors.push(`blog ${id}: cta differs (pt ${a.fm.cta}, ${l} ${b.fm.cta})`);
    if (JSON.stringify(a.fm.sources) !== JSON.stringify(b.fm.sources)) errors.push(`blog ${id}: sources differ between pt and ${l}`);
    if (JSON.stringify(a.fm.related) !== JSON.stringify(b.fm.related)) errors.push(`blog ${id}: related differs between pt and ${l}`);
    if (String(a.fm.published) !== String(b.fm.published)) errors.push(`blog ${id}: published date differs between pt and ${l}`);
    if (a.h2 !== b.h2) errors.push(`blog ${id}: ${l} has ${b.h2} sections, pt has ${a.h2}`);
    if (a.tables !== b.tables) errors.push(`blog ${id}: tables differ between pt and ${l}`);
    if ([...a.cites].sort().join() !== [...b.cites].sort().join()) errors.push(`blog ${id}: cited facts differ between pt and ${l}`);
  }
}
// D83 lifestyle articles (content/stories/, fix step 4): every article in pt, en and fr with the same order, place,
// airport, photograph, sources, cited facts and number of sections, a slug of its own per language.
const storyDir = join(root, "content/stories");
const stories = new Map();
for (const f of readdirSync(storyDir).filter((x) => /\.(pt|en|fr)\.md$/.test(x))) {
  const m = readFileSync(join(storyDir, f), "utf8").match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const fm = yaml.load(m[1]), body = m[2];
  const cites = [...`${body} ${JSON.stringify(fm.go || {})}`.matchAll(/\[\[([a-z0-9-]+)\]\]|\]\(fact:([a-z0-9-]+)\)/g)].map((x) => x[1] || x[2]);
  const places = [...body.matchAll(/\]\(place:([a-z0-9-]+)\)/g)].map((x) => x[1]);
  (stories.get(fm.id) ?? stories.set(fm.id, {}).get(fm.id))[fm.lang] = { fm, h2: (body.match(/^## /gm) || []).length, cites: [...new Set(cites)].sort().join(), places: [...new Set(places)].sort().join() };
}
// Prompt 72: an article written for one edition in one language only says so in its front matter ("only: en"); it is
// then the single version of its id and has nothing to be compared with. Every other article still needs all three.
let single = 0;
for (const [id, by] of stories) {
  const langs = Object.keys(by);
  if (langs.length === 1 && by[langs[0]].fm.only === langs[0]) { single++; continue; }
  if (langs.some((l) => by[l].fm.only)) { errors.push(`story ${id}: "only: ${langs.map((l) => by[l].fm.only).find(Boolean)}" but it exists in ${langs.join(", ")}`); continue; }
  if (langs.length !== 3) { errors.push(`story ${id}: missing language (has ${langs.join(", ")})`); continue; }
  for (const l of ["en", "fr"]) {
    const a = by.pt, b = by[l];
    for (const k of ["order", "place", "airport"]) if (a.fm[k] !== b.fm[k]) errors.push(`story ${id}: ${k} differs (pt ${a.fm[k]}, ${l} ${b.fm[k]})`);
    if (JSON.stringify(a.fm.editions ?? null) !== JSON.stringify(b.fm.editions ?? null)) errors.push(`story ${id}: editions differ between pt and ${l}`);
    if (a.fm.photo?.src !== b.fm.photo?.src) errors.push(`story ${id}: photo differs between pt and ${l}`);
    if (JSON.stringify(a.fm.sources) !== JSON.stringify(b.fm.sources)) errors.push(`story ${id}: sources differ between pt and ${l}`);
    if (String(a.fm.published) !== String(b.fm.published)) errors.push(`story ${id}: published date differs between pt and ${l}`);
    if (a.h2 !== b.h2) errors.push(`story ${id}: ${l} has ${b.h2} sections, pt has ${a.h2}`);
    if (a.cites !== b.cites) errors.push(`story ${id}: cited facts differ between pt and ${l}`);
    if (a.places !== b.places) errors.push(`story ${id}: places linked to the map differ between pt and ${l}`);
    if (a.fm.slug === b.fm.slug) errors.push(`story ${id}: ${l} needs its own slug`);
  }
}
// Prompt 69, the meaning check: every Concierge block (copy deck sections flow, consult, send, p69) side by side in PT,
// EN and FR, written to ops/reports/concierge-meaning.md for the CEO to read before each release. Presence is checked
// above; meaning needs a reader, so this report never fails the check. It flags what a machine can see: different
// placeholders, different numbers, a question in one language and not another, one language far longer than PT.
const MEANING_SECTIONS = ["flow", "consult", "send", "p69"];
// The blocks whose meaning was corrected on 4 Nov 2026 (prompt 69): kept here so the report says what changed.
const MEANING_FIXED = {
  "flow.c.when": "PT asked when the video call suits; EN and FR asked when the reader plans to buy. PT now asks when they plan to buy (the preparation question); the call time is p69.when.",
  "flow.c.lede": "EN and FR added \"first\" and \"one question at a time\"; now all three: fifteen minutes by video, at no cost, asking takes a minute.",
  "flow.c.budget": "PT lacked \"roughly\".",
  "flow.more": "EN and FR were a different, longer sentence; now all three introduce the two links (Step by step, Articles).",
  "flow.c.purpose": "EN \"What is it for?\" and FR \"Pour quoi faire ?\" did not say \"the home\".",
  "flow.c.purpose.1": "FR \"Résidence principale\" is a tax status; PT and EN say a home to live in.",
  "flow.c.purpose.2": "FR \"Résidence secondaire\" is broader than a holiday home.",
  "flow.c.purpose.3": "EN and FR said rental income; PT says to rent out.",
  "flow.c.place.ph": "EN and FR added \"or not sure yet\".",
  "flow.c.lang": "PT did not say \"for the call\"; FR said \"échanger\".",
  "flow.send": "PT said \"Receive the answer\"; EN and FR say send the request.",
  "flow.fallback": "PT did not say \"send it by email\".",
  "flow.invalid.email": "PT said \"check the email\"; EN and FR say the address looks incomplete.",
  "flow.p.done.h": "EN and FR said \"Received, we reply by email\"; PT says we have your question.",
  "flow.p.done.p": "EN and FR pointed to the guide and the map; PT says we reply by email within two working days.",
  "consult.card.p": "PT asked what they look for; EN and FR ask where they are in their plan.",
  "consult.later.p": "PT lacked \"from what you tell us, you have time\".",
  "consult.later.path": "PT said \"see the step by step\"; EN and FR say your country's path.",
  "consult.later.dossier": "PT lacked \"with the figures for your case\".",
  "consult.later.book": "PT said \"request the consultation\"; EN and FR say when the purchase is closer.",
};
{
  const rows = [];
  let sec = "", blk = "", cur = null;
  for (const line of deck) {
    const h2 = line.match(/^## (\S+)\s*$/), h3 = line.match(/^### (\S+)\s*$/), tx = line.match(/^- (PT|EN|FR): (.*)$/);
    if (h2) { sec = h2[1]; blk = ""; cur = null; }
    else if (h3) { blk = h3[1]; cur = MEANING_SECTIONS.includes(sec) ? { key: `${sec}.${blk}`, PT: "", EN: "", FR: "" } : null; if (cur) rows.push(cur); }
    else if (tx && cur) cur[tx[1]] = tx[2].trim();
  }
  const ph = (t) => [...t.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
  const nums = (t) => [...t.replace(/\{\w+\}/g, "").matchAll(/\d+(?:[.,]\d+)?/g)].map((m) => m[0].replace(",", ".")).sort().join(",");
  const flags = (r) => {
    const f = [];
    for (const l of ["EN", "FR"]) {
      if (ph(r.PT) !== ph(r[l])) f.push(`placeholders differ (${l})`);
      if (nums(r.PT) !== nums(r[l])) f.push(`numbers differ (${l})`);
      if (r.PT.includes("?") !== r[l].includes("?")) f.push(`question in one language only (${l})`);
      if (r.PT.length > 12 && (r[l].length / r.PT.length > 1.9 || r.PT.length / r[l].length > 1.9)) f.push(`length far from PT (${l})`);
    }
    return f;
  };
  const cell = (t) => t.replace(/\|/g, "\\|");
  const flagged = rows.map((r) => [r, flags(r)]).filter(([, f]) => f.length);
  const out = [
    "# Concierge: meaning, side by side",
    "",
    "Written by `node scripts/check-parity.mjs` on every run (prompt 69). Read it before each release: every Concierge block of `content/copy/COPY_DECK.md` (sections " + MEANING_SECTIONS.map((x) => "`" + x + "`").join(", ") + ") in PT, EN and FR, one row each. The check never fails on wording; the flags are what a machine can see and a reader decides.",
    "",
    `${rows.length} blocks, ${flagged.length} flagged.`,
    "",
    "## Corrected on 4 Nov 2026 (prompt 69)",
    "",
    ...Object.entries(MEANING_FIXED).map(([k, v]) => `- \`${k}\`: ${v}`),
    "",
    "## Flagged",
    "",
    ...(flagged.length ? flagged.map(([r, f]) => `- \`${r.key}\`: ${f.join("; ")}`) : ["None."]),
    "",
    "## Every block",
    "",
    "| Block | PT | EN | FR |",
    "| --- | --- | --- | --- |",
    ...rows.map((r) => `| \`${r.key}\`${MEANING_FIXED[r.key] ? " (corrected)" : ""} | ${cell(r.PT)} | ${cell(r.EN)} | ${cell(r.FR)} |`),
    "",
  ].join("\n");
  const dir = join(root, "ops/reports"), file = join(dir, "concierge-meaning.md");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  if (!existsSync(file) || readFileSync(file, "utf8") !== out) writeFileSync(file, out);
  console.log(`concierge meaning: ${rows.length} blocks side by side, ${flagged.length} flagged for a reader (ops/reports/concierge-meaning.md)`);
}

if (errors.length) { console.log(errors.join("\n")); process.exit(1); }
console.log(`parity ok: ${groups.size} FAQ groups, ${posts.size} blog articles, ${stories.size} lifestyle articles (${single} in one language only), copy deck blocks in PT, EN and FR`);
