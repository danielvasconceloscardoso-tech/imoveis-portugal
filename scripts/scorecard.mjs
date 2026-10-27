// Quality scorecard (prompt 15 §5): scores key pages in PT, EN and FR from site/dist and fails below thresholds.
//   1 Grammar and style: LanguageTool public API (pt-PT, en-US, fr). Zero errors on headings and buttons.
//   2 Readability: Flesch (EN, 60+), Fernandes (PT, 60+), Kandel-Moles (FR, 60+); average sentence under 20 words.
//   3 Voice: banned and AI words (content/VOICE.md, D35, prompt 19), em-dashes, question headings, repeated openings.
//   4 Accessibility: axe-core in Chromium, zero serious or critical issues.
//   5 Performance and SEO: Lighthouse mobile, 95+ in all four categories (crawlability ignored while noindex).
//   6 Parity: the same blocks in all three languages, no English left in PT or FR pages.
// Run from the repo root after `npm run build` in site/:  node scripts/scorecard.mjs [--no-lt] [--no-lh]
// Writes design/SCORECARD.md. Exit 1 if any threshold fails.
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { gzipSync } from "node:zlib";
import { readFileSync, existsSync, statSync, writeFileSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileP = promisify(execFile);

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const req = createRequire(join(root, "site", "package.json"));
const { chromium } = createRequire(join(root, "design", "v2") + "/")("playwright");
const axeSrc = readFileSync(req.resolve("axe-core/axe.min.js"), "utf8");
const args = new Set(process.argv.slice(2));
const dist = join(root, "site", "dist");

// Pages scored, per language (Luxembourg edition for PT, US for EN, France for FR: the canonical editions, D24).
const ED = { pt: "lu", en: "us", fr: "fr" };
const SLUG = {
  pt: { faq: "perguntas-frequentes", sims: "simuladores", cost: "simuladores/custo-total", map: "mapa", place: "mapa/porto", partners: "parceiros", buy: "comprar", blog: "blog", how: "como-trabalhamos", private: "residencia-impostos-heranca", step: "comprar-a-partir-de-fora", path: "o-seu-percurso" },
  en: { faq: "faq", sims: "calculators", cost: "calculators/total-cost", map: "map", place: "map/porto", partners: "partners", buy: "buy", blog: "blog", how: "how-we-work", private: "residence-tax-inheritance", step: "buying-from-abroad", path: "your-path" },
  fr: { faq: "questions-frequentes", sims: "simulateurs", cost: "simulateurs/cout-total", map: "carte", place: "carte/porto", partners: "partenaires", buy: "acheter", blog: "blog", how: "notre-methode", private: "residence-fiscalite-succession", step: "acheter-depuis-l-etranger", path: "votre-parcours" },
};
const PAGES = ["home", "faq", "sims", "cost", "map", "place", "partners", "buy", "blog", "how", "private", "step", "path"];
const LH_PAGES = ["home", "faq", "cost", "map", "path"];
const url = (lang, p) => `/${lang}/${ED[lang]}/${p === "home" ? "" : SLUG[lang][p] + "/"}`;

// Voice rules (content/VOICE.md): banned phrases in the three languages.
const BANNED = [
  /\bdescubr[ae]\b/i, /\bexplor[ae]\b/i, /\bjornada\b/i, /sem complica[çc][õo]es/i, /tudo o que precisa/i, /parceiro de confian[çc]a/i, /\bsimplificamos\b/i,
  /\bseamless/i, /\bunlock\b/i, /partenaire de confiance/i, /\bdécouvrez\b/i, /\bexplorez\b/i, /\bdiscover\b/i, /\bjourney\b/i, /hassle[- ]free/i, /sans tracas/i,
  /todos os agostos/i, /every august/i, /tous les mois d'ao[uû]t/i, /tratada de fora/i, /handled from abroad/i, /g[ée]r[ée]e depuis l'[ée]tranger/i,
  /o pre[çc]o [ée] o in[ií]cio/i, /the price is (just )?the start/i, /le prix n'est qu'un d[ée]but/i,
  /\bpor cima\b/i, /\bon top of the price\b/i, /\bon top, /i, /\ben plus du prix\b/i, /\bquem compra\b/i, /\bde quem compra\b/i, /\bceux qui ach[eè]tent\b/i, /\ba buyer who\b/i,
  /maison depuis l'[ée]tranger/i, /ce que vous achetez/i, /home from abroad/i,
  // D52: no tier or section words for high budgets ("Private consultation", D39's product name, is pending a CEO call).
  // Prompt 23 §1.4: words that read as AI, in the three languages.
  /\belev(ar|ate|ates|ating)\b/i, /\b[ée]lever\b/i, /experi[êe]ncia [úu]nica/i, /unique experience/i, /exp[ée]rience unique/i, /\bdesbloque(ar|ie)\b/i, /\bd[ée]bloque[rz]\b/i,
  /no mundo de hoje/i, /in today's world/i, /dans le monde d'aujourd'hui/i, /n[ãa]o [ée] s[óo] .{1,40}, [ée] /i, /it's not just .{1,40}, it's/i, /ce n'est pas (seulement|juste) .{1,40}, c'est/i, /!/,
  /\bPrivate\b(?! consultation)/, /\bluxo\b/i, /\bluxury\b/i, /\bluxe\b/i, /\bpremium\b/i, /\b1 milh[ãa]o\b/i, /\b(€|one )?1 million\b/i, /\bun million\b/i,
];
const AI = [/—/];
const EN_WORDS = /\b(the|and|with|your|you|for|this|that|from|what|which|home|buy|price)\b/gi;

// Readability: syllables by vowel groups (rough, enough for a trend), formulas per language.
const VOW = { en: /[aeiouy]+/gi, pt: /[aeiouáàâãéêíóôõú]+/gi, fr: /[aeiouyàâéèêëîïôûùü]+/gi };
function readability(text, lang) {
  const sentences = text.split(/[.!?]+\s/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length >= 3);
  const words = sentences.flatMap((s) => s.split(/\s+/)).filter((w) => /^\p{L}/u.test(w.replace(/^[«"(“]/, "")));
  if (!sentences.length || !words.length) return { score: 100, asl: 0 };
  const syl = words.reduce((n, w0) => {
    let w = w0.toLowerCase().replace(/[^\p{L}]/gu, "");
    if (lang === "en") w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
    if (lang === "fr") w = w.replace(/(es|e|ent)$/, "");
    return n + Math.max(1, (w.match(VOW[lang]) || []).length);
  }, 0);
  const asl = words.length / sentences.length, asw = syl / words.length;
  const score = lang === "en" ? 206.835 - 1.015 * asl - 84.6 * asw : lang === "pt" ? 248.835 - 1.015 * asl - 84.6 * asw : 207 - 1.015 * asl - 73.6 * asw;
  return { score: Math.round(score), asl: Math.round(asl * 10) / 10 };
}

async function languageTool(text, lang) {
  if (!text.trim()) return [];
  const body = new URLSearchParams({ text: text.slice(0, 18000), language: { pt: "pt-PT", en: "en-US", fr: "fr" }[lang], disabledRules: "WHITESPACE_RULE,UPPERCASE_SENTENCE_START,PUNCTUATION_PARAGRAPH_END,DASH_RULE,EN_QUOTES,FRENCH_WHITESPACE,FR_SPELLING_RULE,MORFOLOGIK_RULE_EN_US,HUNSPELL_RULE,PT_MULTITOKEN_SPELLING_HYPHEN,UNPAIRED_BRACKETS" });
  // curl, not fetch: the build environment reaches the internet through a proxy that Node's fetch ignores.
  for (let i = 0; i < 3; i++) {
    try {
      const out = execFileSync("curl", ["-sS", "-m", "60", "-X", "POST", "https://api.languagetool.org/v2/check", "--data-binary", "@-", "-H", "Content-Type: application/x-www-form-urlencoded"], { input: body.toString(), maxBuffer: 16 * 1024 * 1024 }).toString();
      return JSON.parse(out).matches.filter((m) => !["TYPOS", "CASING"].includes(m.rule.category.id) || m.rule.id.includes("CONFUSION"));
    } catch { await new Promise((s) => setTimeout(s, 5000)); }
  }
  return [{ message: "LanguageTool unavailable", rule: { id: "LT_DOWN" }, context: { text: "" } }];
}

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".json": "application/json", ".pbf": "application/x-protobuf" };
const server = createServer((q, res) => {
  let p = join(dist, decodeURIComponent(q.url.split("?")[0]));
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  if (!existsSync(p)) { res.writeHead(404); return res.end(); }
  // Text is compressed as Cloudflare serves it in production (gzip here, brotli there); images and fonts as they are.
  const type = types[extname(p)] || "application/octet-stream", body = readFileSync(p);
  if (/text|javascript|json|svg/.test(type) && /gzip/.test(q.headers["accept-encoding"] || "")) { res.writeHead(200, { "Content-Type": type, "Content-Encoding": "gzip" }); return res.end(gzipSync(body)); }
  res.writeHead(200, { "Content-Type": type }); res.end(body);
}).listen(4325);
const base = "http://127.0.0.1:4325";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const results = { pt: [], en: [], fr: [] };
const fails = [];
for (const lang of ["pt", "en", "fr"]) for (const key of PAGES) {
  const u = url(lang, key);
  await page.goto(base + u, { waitUntil: "load" });
  await page.waitForTimeout(900); // let the half-second fades finish (prompt 19) before measuring contrast
  const data = await page.evaluate(() => {
    const main = document.querySelector("main") || document.body;
    const heads = [...main.querySelectorAll("h1,h2,h3")].map((h) => h.textContent.trim()).filter(Boolean);
    const top = [...main.querySelectorAll("h1,h2")].map((h) => h.textContent.trim()).filter(Boolean);
    // Place-name buttons in the map list (prompt 25) are proper names, not copy: left out.
    const buttons = [...document.querySelectorAll("a.btn,button:not([data-pick]),.nav a,a.more")].map((b) => b.textContent.trim()).filter(Boolean);
    // Prose only for readability: paragraphs and list items outside navigation, source lists and data rows.
    const prose = [...main.querySelectorAll("p,li,summary")].filter((p) => !p.closest("nav,.sources-list,.bill,table,.others,.ft")).map((p) => p.textContent.replace(/\s+/g, " ").trim()).filter((t) => t.length > 2);
    const paras = [...main.querySelectorAll("p,li,dd,dt,summary")].filter((p) => !p.closest(".sources-list")).map((p) => p.textContent.replace(/\s+/g, " ").trim()).filter((t) => t.length > 2);
    return { heads, top, buttons, paras, prose };
  });
  await page.addScriptTag({ content: axeSrc });
  const axe = await page.evaluate(async () => (await window.axe.run(document, { resultTypes: ["violations"] })).violations.filter((v) => ["serious", "critical"].includes(v.impact)).map((v) => `${v.id} (${v.nodes.length})`));
  const body = data.paras.join("\n");
  const prose = data.prose.map((t) => (/[.!?:]$/.test(t) ? t : `${t}.`)).join(" ");
  const all = [...data.heads, ...data.buttons, ...data.paras].join("\n");
  const voice = [...BANNED, ...AI].filter((re) => re.test(all)).map((re) => re.source);
  // Question headings: H1 and H2 only (FAQ questions and the reader's own questions in H3 are allowed, VOICE.md).
  const qHeads = data.top.filter((h) => /\?\s*$/.test(h) && key !== "faq");
  const openings = data.paras.map((p) => p.split(/\s+/).slice(0, 2).join(" ").toLowerCase());
  const repeats = openings.filter((o, i) => i > 0 && o === openings[i - 1] && o.length > 3).length;
  const englishLeft = lang === "en" ? 0 : (body.match(EN_WORDS) || []).length;
  const read = readability(prose, lang);
  let ltHeads = [], ltBody = [];
  if (!args.has("--no-lt")) {
    ltHeads = await languageTool([...new Set([...data.heads, ...data.buttons])].join("\n\n"), lang); await new Promise((s) => setTimeout(s, 3200));
    ltBody = await languageTool(body, lang); await new Promise((s) => setTimeout(s, 3200));
  }
  // Brand choices, not errors (prompt 19): the "Newsletter" button by name, and M€ for millions on the map presets.
  const IGNORE = new Set(["PT_BARBARISMS_REPLACE_NEWSLETTER", "CURRENCY_PLACEMENT_PT_FOREIGN"]);
  ltHeads = ltHeads.filter((m) => !IGNORE.has(m.rule.id)); ltBody = ltBody.filter((m) => !IGNORE.has(m.rule.id));
  const row = { key, u, read, voice, qHeads, repeats, englishLeft, axe, ltHeads: ltHeads.map((m) => `${m.rule.id}: "${m.context.text.slice(m.context.offset, m.context.offset + m.context.length)}"`), ltBody: ltBody.length, ltBodyEx: ltBody.slice(0, 3).map((m) => `${m.rule.id}: "${m.context.text.slice(m.context.offset, m.context.offset + m.context.length)}"`) };
  results[lang].push(row);
  const f = [];
  if (row.ltHeads.length) f.push(`grammar in headings/buttons: ${row.ltHeads.join("; ")}`);
  if (read.score < 60) f.push(`readability ${read.score}`);
  if (read.asl >= 20) f.push(`sentence length ${read.asl}`);
  if (voice.length) f.push(`voice: ${voice.join(", ")}`);
  if (qHeads.length) f.push(`question headings: ${qHeads.join(" | ")}`);
  if (repeats > 2) f.push(`repeated openings ${repeats}`);
  if (englishLeft > 8) f.push(`English words in ${lang.toUpperCase()}: ${englishLeft}`);
  if (axe.length) f.push(`axe: ${axe.join(", ")}`);
  if (f.length) fails.push(`${lang} ${u}: ${f.join(" · ")}`);
  console.log(`${lang} ${u} read ${read.score}/${read.asl} lt ${row.ltHeads.length}/${row.ltBody} axe ${axe.length} voice ${voice.length}`);
}

// Lighthouse mobile on four pages per language.
const lh = {};
if (!args.has("--no-lh")) {
  const chrome = "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome";
  for (const lang of ["pt", "en", "fr"]) for (const key of LH_PAGES) {
    const u = url(lang, key);
    try {
      // Async: this same process serves the pages, so a synchronous call would block the server.
      const { stdout: out } = await execFileP("npx", ["--yes", "lighthouse@12.3.0", base + u, "--quiet", "--output=json", "--only-categories=performance,accessibility,best-practices,seo", "--skip-audits=is-crawlable", "--chrome-flags=--headless=new --no-sandbox"], { env: { ...process.env, CHROME_PATH: chrome }, maxBuffer: 64 * 1024 * 1024, timeout: 180000 });
      const j = JSON.parse(out); const s = Object.fromEntries(Object.entries(j.categories).map(([k, v]) => [k, Math.round(v.score * 100)]));
      lh[`${lang} ${u}`] = s;
      const low = Object.entries(s).filter(([, v]) => v < 95);
      if (low.length) fails.push(`${lang} ${u}: Lighthouse ${low.map(([k, v]) => `${k} ${v}`).join(", ")}`);
      console.log(`LH ${lang} ${u}`, s);
    } catch (e) { lh[`${lang} ${u}`] = { error: String(e.message).slice(0, 80) }; fails.push(`${lang} ${u}: Lighthouse did not run`); }
  }
}

// Parity: every copy-deck block has PT, EN and FR (copy.ts throws otherwise); FAQ parity is scripts/check-parity.mjs.
// Prompt 23 §3.2: the identity gate (warm colours, banned fonts, rounded-shadow cards), scripts/design/identity-check.mjs.
let identity = "ok";
try { execFileSync("node", [join(root, "scripts", "design", "identity-check.mjs")], { stdio: "pipe" }); } catch (e) { identity = String(e.stdout).trim(); fails.push(`identity: ${identity.split("\n").pop()}`); }
let parity = "ok";
try { execFileSync("node", [join(root, "scripts", "check-parity.mjs")], { stdio: "pipe" }); } catch (e) { parity = "failed"; fails.push(`parity: ${String(e.stdout).slice(0, 200)}`); }

await browser.close(); server.close();
const L = { pt: "PT", en: "EN", fr: "FR" };
let md = `# Quality scorecard\n\nGenerated ${new Date().toISOString().slice(0, 10)} by \`node scripts/scorecard.mjs\` (prompt 15 §5) on the built site. Pages: ${PAGES.join(", ")} in each language (PT on the .lu edition, EN on .us, FR on .fr).\n\nThresholds: zero LanguageTool errors on headings and buttons; readability 60+ (Flesch EN, Fernandes PT, Kandel-Moles FR) and sentences under 20 words on average; no banned words, em-dashes or question headings; zero serious axe issues; Lighthouse mobile 95+ in all four categories; parity across languages.\n\n`;
for (const lang of ["pt", "en", "fr"]) {
  md += `## ${L[lang]}\n\n| Page | Readability | Avg. sentence | Grammar (headings/buttons) | Grammar (body, flagged) | Voice | axe serious | English words |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n`;
  for (const r of results[lang]) md += `| ${r.u} | ${r.read.score} | ${r.read.asl} | ${r.ltHeads.length || "0"} | ${r.ltBody}${r.ltBodyEx.length ? ` (${r.ltBodyEx.join("; ").replace(/\|/g, "/")})` : ""} | ${r.voice.length + r.qHeads.length || "0"} | ${r.axe.length || "0"} | ${lang === "en" ? "n/a" : r.englishLeft} |\n`;
  md += "\n";
}
if (Object.keys(lh).length) {
  md += `## Lighthouse (mobile)\n\n| Page | Performance | Accessibility | Best practices | SEO |\n| --- | --- | --- | --- | --- |\n`;
  for (const [k, s] of Object.entries(lh)) md += `| ${k} | ${s.performance ?? "-"} | ${s.accessibility ?? "-"} | ${s["best-practices"] ?? "-"} | ${s.seo ?? "-"} |\n`;
  md += "\n";
}
md += `## Identity (D50)\n\n${identity}\n\n## Parity\n\n${parity}\n\n## Result\n\n${fails.length ? fails.map((f) => `- ${f}`).join("\n") : "All thresholds met."}\n`;
writeFileSync(join(root, "design", "SCORECARD.md"), md);
console.log(fails.length ? `\n${fails.length} below threshold:\n${fails.join("\n")}` : "\nAll thresholds met.");
process.exit(fails.length ? 1 : 0);
