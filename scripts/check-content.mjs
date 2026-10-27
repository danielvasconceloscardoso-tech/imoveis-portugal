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
  /\bdécouvrez\b/i, /\bexplorez\b/i, /\bdiscover\b/i, /\bjourney\b/i, /hassle[- ]free/i, /sans tracas/i, /—/,
  // Voice v3 (prompt 17, D35): phrases that talk down to the reader or dramatise costs.
  /todos os agostos/i, /every august/i, /(tous les|chaque) mois d'ao[uû]t/i, /tratad[ao] de fora/i, /handled from abroad/i, /home from abroad/i,
  /g[ée]r[ée]e depuis l'[ée]tranger/i, /maison depuis l'[ée]tranger/i, /o pre[çc]o [ée] o in[ií]cio/i, /the price is (just )?the start/i, /le prix n'est qu'un d[ée]but/i,
  /\bpor cima\b/i, /\bon top of the price\b/i, /\bon top, /i, /\ben plus du prix\b/i, /\bpar-dessus\b/i, /\bquem compra\b/i, /\bceux qui ach[eè]tent\b/i, /\bwhoever buys\b/i, /\ba buyer who\b/i];

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
  else if (f.endsWith(".md") && f.includes("content/inbox") && !/\/[A-Z][A-Z_0-9-]*\.md$/.test(f) && !f.includes("/pillar/")) { checkPiece(f); pieces++; }
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
// Prompt 30 §2: each week's pillar page waits in content/inbox/week-NN/pillar/ in the blog format, then moves to content/blog/.
const pillars = walk(join(root, "content/inbox")).filter((f) => /\/pillar\/[^/]+\.(pt|en|fr)\.md$/.test(f));
const blogFiles = [...(existsSync(blogDir) ? readdirSync(blogDir).filter((x) => /\.(pt|en|fr)\.md$/.test(x)).map((x) => join(blogDir, x)) : []), ...pillars];
for (const file of blogFiles) {
  const f = file.split("/").pop(), m = readFileSync(file, "utf8").match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
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
// Design v2 copy (prompt 32, D59): the "home2" blocks of the copy deck, in PT, EN and FR. Banned words and shapes,
// sentences of at most 25 words, blocks of at most 45, headlines of at most 8 words that are statements without a
// colon. "Percurso" and "parcours" stay allowed: they are the navigation's names for the path (D52).
const V2_WORDS = [/\bdiscover/i, /\bexplor/i, /\bunlock/i, /\bembark/i, /\bjourney/i, /\belevat/i, /\bcurated\b/i, /\btailored\b/i, /\bbespoke\b/i, /\bseamless/i,
  /\beffortless/i, /\bunparalleled\b/i, /world-class/i, /\bnestled\b/i, /\bboasts?\b/i, /dream home/i, /hidden gem/i, /\bluxur/i, /\bpremium\b/i, /\bexclusiv/i,
  /\bprivate\b/i, /\bparadise\b/i, /\bpassionate\b/i,
  /\bdescobr/i, /\bdescubr/i, /\bexplor/i, /\bdesbloque/i, /\bembarc/i, /\bjornada/i, /\belev(ar|e|ado)\b/i, /\bà medida\b/i, /\bpersonalizad/i, /sem esforço/i, /sem complica/i,
  /\bincompar[áa]vel/i, /\binigual[áa]vel/i, /classe mundial/i, /\baninhad/i, /casa d[eo]s? sonho/i, /joia escondida/i, /\bluxo\b/i, /\bluxuos/i, /\bexclusiv/i, /\bprivad[ao]/i, /\bpara[íi]so/i, /\bapaixonad/i,
  /\bd[ée]couvr/i, /\bexplor/i, /\bd[ée]bloqu/i, /\bembarqu/i, /\b[ée]lev(er|ez|é)\b/i, /sur[- ]mesure/i, /sans effort/i, /\bin[ée]gal[ée]/i, /classe mondiale/i, /\bnich[ée]/i,
  /maison de r[êe]ve/i, /joyau cach[ée]/i, /\bluxe\b/i, /\bluxueu/i, /\bexclusi[fv]/i, /\bpriv[ée]e?s?\b/i, /\bparadis\b/i, /\bpassionn[ée]/i];
const V2_SHAPES = [/whether you'?re/i, /^from .+ to /i, /\bimagine\b/i, /\bimaginez\b/i, /not just .+ but/i, /more than an? /i, /in today'?s/i,
  /\bquer seja\b/i, /^de .+ a /i, /n[ãa]o apenas/i, /mais do que um/i, /nos dias de hoje/i, /que vous soyez/i, /^de .+ à /i, /pas seulement/i, /plus qu'une? /i, /de nos jours/i,
  /!/, /—/, /\p{Extended_Pictographic}/u];
{
  const deck = readFileSync(join(root, "content/copy/COPY_DECK.md"), "utf8"), file = join(root, "content/copy/COPY_DECK.md");
  const sec = deck.split(/^## home2\s*$/m)[1]?.split(/^## /m)[0] ?? "";
  let block = "";
  for (const line of sec.split("\n")) {
    const h = line.match(/^### (\S+)/), t = line.match(/^- (PT|EN|FR): (.*)$/);
    if (h) { block = h[1]; continue; }
    if (!t || !block) continue;
    const [, L, text] = t, where = `home2.${block} ${L}`;
    for (const re of V2_WORDS) if (re.test(text)) err(file, `${where}: banned word ${re} in "${text}"`);
    for (const sent of text.split(/(?<=[.!?])\s+/)) {
      for (const re of V2_SHAPES) if (re.test(sent.trim())) err(file, `${where}: banned shape ${re} in "${sent}"`);
      if (words(sent) > 25) err(file, `${where}: sentence of ${words(sent)} words (max 25)`);
    }
    if (words(text) > 45) err(file, `${where}: block of ${words(text)} words (max 45)`);
    if (/(^|\.)h(1\.\w+)?$/.test(block)) {
      if (words(text) > 8) err(file, `${where}: headline of ${words(text)} words (max 8)`);
      if (/\?/.test(text) || /:/.test(text)) err(file, `${where}: a headline is a statement without a colon`);
    }
    if (/\?/.test(text) && !/^qa\./.test(block)) err(file, `${where}: rhetorical question`);
  }
  // One action per block on the built home: each section of the design v2 home, its cards counted as their own blocks.
  const built = join(root, "site/dist/pt/lu/index.html");
  if (existsSync(built) && readFileSync(built, "utf8").includes('class="h2-hero"')) {
    const html = readFileSync(built, "utf8");
    for (const m of html.matchAll(/<section class="h2-sec[^"]*"[^>]*>([\s\S]*?)<\/section>/g)) {
      const outside = m[1].replace(/<(article|a) class="h2-(card|door)"[\s\S]*?<\/\1>/g, "");
      const acts = (outside.match(/class="h2-(btn|link)[^"]*"/g) || []).length;
      if (acts > 1) err(built, `a home section has ${acts} actions (one per block): ${m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 60)}`);
      for (const c of m[1].matchAll(/<(article|a) class="h2-(card|door)"[\s\S]*?<\/\1>/g)) if ((c[0].match(/class="h2-(btn|link)/g) || []).length > 1) err(built, "a card has more than one action");
    }
  }
}
console.log(`checked ${faqs} FAQ files, ${pieces} inbox pieces and ${posts} blog articles and pillar pages against ${factIds.size} facts`);
if (errors.length) {
  console.log(errors.map((e) => `ERROR ${e}`).join("\n"));
  process.exit(1);
}
