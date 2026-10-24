// Content gate for the editorial policy (D12, content/EDITORIAL_POLICY.md) and prompt 06.
// Run from the repo root:  node scripts/check-content.mjs [path ...]
// With no path it checks content/faq/ and content/inbox/. /publish-week must run it and stop on errors.
//
// FAQ entries (content/faq/*.yaml): answer under 70 words, a known next-step key, fact ids that exist
// in content/facts/facts.csv, no open [check], no banned or advice wording.
// Inbox pieces (content/inbox/**/*.md): front matter with edition, lang, type, week, title and sources
// (fact ids from facts.csv); the edition's disclaimer; the sponsored label when sponsored; no open
// [check]; no banned or advice wording.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const yaml = createRequire(join(root, "site", "package.json"))("js-yaml");

const CTA_KEYS = ["talk-lawyer", "talk-bank", "talk-tax", "talk-fx", "talk-developer", "agency", "guide"];
const TYPES = ["article", "newsletter", "video", "carousel", "post", "faq"];
const LANGS = { "pt-PT": "PT", fr: "FR", "pt-BR": "PT-BR", en: "EN" };
const EDITIONS = ["lu", "fr", "ch", "br", "us", "il"];
const BANNED = [/paraíso/i, /paradis\b/i, /oportunidade única/i, /opportunité unique/i, /once[- ]in[- ]a[- ]lifetime/i,
  /garantid[oa]s?\b/i, /\bgaranti(e|s)?\b/i, /guaranteed/i, /retorno garantido/i, /rendement garanti/i];
const ADVICE = [/\bvocê deveria\b/i, /\bdeve(?:rá)? comprar\b/i, /\brecomendamos\b/i, /\baconselhamos\b/i,
  /\bvous devriez\b/i, /\bnous (?:vous )?(?:recommandons|conseillons)\b/i, /\byou should\b/i, /\bwe recommend\b/i,
  /\bwe advise\b/i];

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
}

function checkFaq(file) {
  const items = yaml.load(readFileSync(file, "utf8")) || [];
  const seen = new Set();
  for (const it of items) {
    const id = it.id || "(no id)";
    if (!it.id || !it.q || !it.a) err(file, `${id}: needs id, q and a`);
    if (seen.has(id)) err(file, `${id}: duplicate id`);
    seen.add(id);
    if (!CTA_KEYS.includes(it.cta)) err(file, `${id}: unknown cta "${it.cta}"`);
    const n = words(it.a || "");
    if (n >= 70) err(file, `${id}: answer has ${n} words (must be under 70)`);
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
console.log(`checked ${faqs} FAQ files and ${pieces} inbox pieces against ${factIds.size} facts`);
if (errors.length) {
  console.log(errors.map((e) => `ERROR ${e}`).join("\n"));
  process.exit(1);
}
