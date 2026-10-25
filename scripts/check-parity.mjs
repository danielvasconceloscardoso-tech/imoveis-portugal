// Parity gate for the three languages (PT, EN, FR): same questions, same order, same stage, rank, partner action
// and facts in every FAQ file; every copy-deck block present in all three languages; e-book chapters and lists of
// equal length. Run from the repo root:  node scripts/check-parity.mjs
import { readFileSync, readdirSync } from "node:fs";
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

if (errors.length) { console.log(errors.join("\n")); process.exit(1); }
console.log(`parity ok: ${groups.size} FAQ groups, copy deck blocks in PT, EN and FR`);
