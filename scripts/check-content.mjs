// Content gate for the editorial policy (D12, content/EDITORIAL_POLICY.md) and prompt 06.
// Run from the repo root:  node scripts/check-content.mjs [path ...]
// With no path it checks content/faq/ and content/inbox/. /publish-week must run it and stop on errors.
//
// FAQ entries (content/faq/*.yaml, prompts 09 and 10): a stage (before, buying, after), a rank, an answer of
// 40 to 69 words, one partner action (cta), fact ids that exist in content/facts/facts.csv, no open [check],
// no banned or advice wording; 15 to 23 questions per edition and language (common file plus the edition's own).
// Inbox pieces (content/inbox/**/*.md): front matter with edition, lang, type, week, title and sources
// (fact ids from facts.csv); the edition's disclaimer; the sponsored label when sponsored; no open
// [check]; no banned or advice wording.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const yaml = createRequire(join(root, "site", "package.json"))("js-yaml");

const CTA_KEYS = ["lawyer", "bank", "tax", "fx", "developer", "agency"];
const STAGES = ["before", "buying", "after"];
const TYPES = ["article", "newsletter", "video", "carousel", "post", "faq"];
const LANGS = { "pt-PT": "PT", fr: "FR", "pt-BR": "PT-BR", en: "EN" };
const EDITIONS = ["lu", "fr", "ch", "br", "us", "il"];
// Banned: "paradise", "unique opportunity" and any promise of guaranteed returns or gains
// ("garantia" as collateral is fine).
const BANNED = [/paraíso/i, /paradis\b/i, /oportunidade única/i, /opportunité unique/i, /once[- ]in[- ]a[- ]lifetime/i,
  /(retorno|rendimento|rentabilidade|valorização|lucro)s? garantid[oa]s?/i, /garantid[oa]s? (retorno|rendimento|rentabilidade|valorização|lucro)/i,
  /(rendement|rentabilité|plus-value|bénéfice)s? garanti(e|s|es)?\b/i, /guaranteed (return|yield|income|profit|gain|appreciation|investment)s?/i,
  /investimentos? garantidos?/i, /investissements? garantis?/i];
const ADVICE = [/\bvocê deveria\b/i, /\bdeve(?:rá)? comprar\b/i, /\brecomendamos\b/i, /\baconselhamos\b/i,
  /\bvous devriez\b/i, /\bnous (?:vous )?(?:recommandons|conseillons)\b/i, /\byou should\b/i, /\bwe recommend\b/i,
  /\bwe advise\b/i];
// Prompt 11 (content/VOICE.md, "Words and shapes that read as AI"): banned words in all three languages, and no em-dash.
const SLOP = [/\bdescubr[ae]\b/i, /\bexplor[ae]\b/i, /\bjornada\b/i, /sem complica[çc][õo]es/i, /tudo o que precisa/i,
  /parceiro de confian[çc]a/i, /\bsimplificamos\b/i, /\bseamless(ly)?\b/i, /\bunlock\b/i, /partenaire de confiance/i,
  /\bdécouvrez\b/i, /\bexplorez\b/i, /\bdiscover\b/i, /\bjourney\b/i, /hassle[- ]free/i, /sans tracas/i, /—/];

// Facts base
const factIds = new Set(
  readFileSync(join(root, "content/facts/facts.csv"), "utf8").split("\n").slice(1).map((l) => l.split(",")[0]).filter(Boolean),
);

// Disclaimers and sponsored labels, read from the policy so there is one source of truth.
const policy = readFileSync(join(root, "content/EDITORIAL_POLICY.md"), "utf8");
const block = (title) => policy.split(`## ${title}`)[1].split("\n## ")[0];
const pick = (text, label) => {
  const m = text.match(new RegExp(`\\*\\*${label.replace(/[()]/g, "\\$&")}[^*]*:?\\s*\\*\\*:?\\s*(.+)`));
  return m ? m[1].trim() : null;
};
const DISCLAIMER = {
  PT: pick(block("Disclaimers"), "PT (LU, CH)"),
  FR: pick(block("Disclaimers"), "FR"),
  "PT-BR": pick(block("Disclaimers"), "PT-BR"),
  EN: pick(block("Disclaimers"), "EN (future US and Israel editions)"),
};
const SPONSOR_PREFIX = { PT: "Conteúdo patrocinado por", FR: "Contenu sponsorisé par", "PT-BR": "Conteúdo patrocinado por", EN: "Sponsored by" };
for (const [k, v] of Object.entries(DISCLAIMER)) if (!v) throw new Error(`disclaimer ${k} not found in EDITORIAL_POLICY.md`);

const errors = [];
const err = (file, msg) => errors.push(`${relative(root, file)}: ${msg}`);
const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;

function checkText(file, label, text) {
  if (/\[check/i.test(text)) err(file, `${label}: open [check]`);
  for (const re of BANNED) if (re.test(text)) err(file, `${label}: banned wording ${re}`);
  for (const re of ADVICE) if (re.test(text)) err(file, `${label}: advice wording ${re} (describe, do not advise)`);
  for (const re of SLOP) if (re.test(text)) err(file, `${label}: AI wording ${re} (VOICE.md)`);
}

const faqCount = {};
function checkFaq(file) {
  const items = yaml.load(readFileSync(file, "utf8")) || [];
  faqCount[file.split("/").pop().replace(".yaml", "")] = items.length;
  const seen = new Set();
  for (const it of items) {
    const id = it.id || "(no id)";
    if (!it.id || !it.q || !it.a) err(file, `${id}: needs id, q and a`);
    if (seen.has(id)) err(file, `${id}: duplicate id`);
    seen.add(id);
    if (!CTA_KEYS.includes(it.cta)) err(file, `${id}: unknown cta "${it.cta}"`);
    if (!STAGES.includes(it.stage)) err(file, `${id}: stage must be one of ${STAGES.join(", ")}`);
    if (typeof it.rank !== "number") err(file, `${id}: rank must be a number`);
    const n = words(it.a || "");
    if (n >= 70 || n < 40) err(file, `${id}: answer has ${n} words (must be 40 to 69)`);
    for (const f of it.facts || []) if (!factIds.has(f)) err(file, `${id}: fact "${f}" not in facts.csv`);
    if (/\d/.test(it.a || "") && !(it.facts || []).length) err(file, `${id}: answer has a number but no fact id`);
    checkText(file, id, `${it.q} ${it.a}`);
  }
}

function frontMatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return m ? [yaml.load(m[1]) || {}, m[2]] : [null, text];
}

function checkPiece(file) {
  const [fm, body] = frontMatter(readFileSync(file, "utf8"));
  if (!fm) return err(file, "missing front matter");
  for (const k of ["edition", "lang", "type", "week", "title", "sources"]) if (fm[k] === undefined) err(file, `front matter: missing ${k}`);
  if (fm.edition && !EDITIONS.includes(fm.edition)) err(file, `unknown edition "${fm.edition}"`);
  if (fm.type && !TYPES.includes(fm.type)) err(file, `unknown type "${fm.type}"`);
  const L = LANGS[fm.lang];
  if (!L) err(file, `unknown lang "${fm.lang}" (use ${Object.keys(LANGS).join(", ")})`);
  const sources = Array.isArray(fm.sources) ? fm.sources : [];
  if (!sources.length) err(file, "no sources");
  for (const s of sources) if (!factIds.has(s)) err(file, `source "${s}" not in facts.csv`);
  if (L && !body.replace(/\s+/g, " ").includes(DISCLAIMER[L])) err(file, `missing the ${L} disclaimer (copy it exactly from EDITORIAL_POLICY.md)`);
  if (fm.sponsored && L && !body.includes(SPONSOR_PREFIX[L])) err(file, "sponsored piece without the sponsored label");
  checkText(file, "body", `${fm.title} ${body}`);
}

function walk(p, out = []) {
  if (!existsSync(p)) return out;
  if (statSync(p).isDirectory()) for (const f of readdirSync(p)) walk(join(p, f), out);
  else out.push(p);
  return out;
}

const targets = process.argv.slice(2).length ? process.argv.slice(2).map((p) => join(process.cwd(), p)) : [join(root, "content/faq"), join(root, "content/inbox")];
let faqs = 0, pieces = 0;
for (const f of targets.flatMap((t) => walk(t))) {
  if (f.endsWith(".yaml") && f.includes(`${"content"}/faq`)) { checkFaq(f); faqs++; }
  else if (f.endsWith(".md") && f.includes("content/inbox") && !f.endsWith("README.md")) { checkPiece(f); pieces++; }
}
for (const ed of EDITIONS) for (const l of ["pt", "en", "fr"]) {
  if (!(`common-${l}` in faqCount)) continue;
  const n = faqCount[`common-${l}`] + (faqCount[`${ed}-${l}`] || 0);
  if (n < 15 || n > 23) errors.push(`content/faq: ${ed}-${l} has ${n} questions (must be 15 to 23)`);
}
// The copy deck (content/copy/COPY_DECK.md, prompt 10): every site text, same wording rules.
const deck = join(root, "content/copy/COPY_DECK.md");
// Headings (blocks named h, h1, title or ending in .h): no rhetorical question, no tagline built on a colon.
let deckBlock = "";
if (existsSync(deck)) readFileSync(deck, "utf8").split("\n").forEach((line, i) => {
  if (line.startsWith("### ")) deckBlock = line.slice(4).trim();
  const m = line.match(/^- (PT|EN|FR): (.*)$/);
  if (!m) return;
  checkText(deck, `line ${i + 1}`, m[2]);
  if (/(^|\.)(h|h1|title)$/.test(deckBlock)) {
    if (/\?\s*$/.test(m[2])) err(deck, `line ${i + 1} (${deckBlock}): heading is a question (VOICE.md)`);
    if (/\S:\s/.test(m[2])) err(deck, `line ${i + 1} (${deckBlock}): tagline built on a colon (VOICE.md)`);
  }
});
// Blog articles (content/blog/{id}.{lang}.md, task 15): front matter, a short answer first, sources, no banned wording.
const blogDir = join(root, "content/blog");
let posts = 0;
if (existsSync(blogDir)) for (const f of readdirSync(blogDir).filter((x) => /\.(pt|en|fr)\.md$/.test(x))) {
  const file = join(blogDir, f), m = readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  posts++;
  if (!m) { err(file, "front matter missing"); continue; }
  const fm = yaml.load(m[1]) || {}, lang = f.match(/\.(pt|en|fr)\.md$/)[1];
  for (const k of ["id", "lang", "slug", "title", "description", "tldr", "published", "updated", "cta"]) if (!fm[k]) err(file, `front matter "${k}" missing`);
  if (fm.lang !== lang) err(file, `lang is "${fm.lang}" but the file name says ${lang}`);
  if (fm.cta && ![...CTA_KEYS, "agency"].includes(fm.cta)) err(file, `unknown cta "${fm.cta}"`);
  if (fm.title && fm.title.length > 70) err(file, `title has ${fm.title.length} characters (max 70, for search results)`);
  if (fm.description && (fm.description.length < 80 || fm.description.length > 160)) err(file, `description has ${fm.description.length} characters (80 to 160)`);
  if (fm.tldr && (words(fm.tldr) < 25 || words(fm.tldr) > 60)) err(file, `short answer has ${words(fm.tldr)} words (25 to 60)`);
  if (words(m[2]) < 500) err(file, `body has ${words(m[2])} words (at least 500)`);
  if (!/^## /m.test(m[2]) || /^# /m.test(m[2])) err(file, "use ## headings in the body; the page supplies the H1");
  const cited = [...m[2].matchAll(/\[\[([a-z0-9-]+)\]\]/g)].map((x) => x[1]);
  if (cited.length < 5) err(file, `only ${cited.length} cited facts (at least 5)`);
  for (const id of [...cited, ...(fm.sources || [])]) if (!factIds.has(id)) err(file, `unknown fact id ${id}`);
  for (const [label, text] of [["title", fm.title || ""], ["description", fm.description || ""], ["short answer", fm.tldr || ""], ["body", m[2]]]) checkText(file, label, text);
  for (const h of m[2].matchAll(/^## (.+)$/gm)) if (/\?\s*$/.test(h[1])) err(file, `heading "${h[1]}" is a question (VOICE.md)`);
}
console.log(`checked ${faqs} FAQ files, ${pieces} inbox pieces and ${posts} blog articles against ${factIds.size} facts`);
if (errors.length) {
  console.log(errors.map((e) => `ERROR ${e}`).join("\n"));
  process.exit(1);
}
