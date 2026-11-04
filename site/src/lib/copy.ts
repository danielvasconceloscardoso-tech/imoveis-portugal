// Reads content/copy/COPY_DECK.md (prompt 10): every text on the site, by page and block, in pt, en and fr.
// `## page` and `### block` give the key "page.block"; lines "- PT: …", "- EN: …", "- FR: …" give the text.
// {placeholders} are filled from `vars`, with the agency, its licence and the contact email always available.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "../config";
import type { Lang, EdCode } from "../i18n";

const file = join(process.cwd(), "..", "content", "copy", "COPY_DECK.md");
const DECK = new Map<string, Record<Lang, string>>();
{
  let page = "", block = "";
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const h2 = line.match(/^## (\S+)\s*$/), h3 = line.match(/^### (\S+)\s*$/), tx = line.match(/^- (PT|EN|FR): (.*)$/);
    if (h2) { page = h2[1]; block = ""; }
    else if (h3) { block = h3[1]; DECK.set(`${page}.${block}`, {} as Record<Lang, string>); }
    else if (tx && page && block) DECK.get(`${page}.${block}`)![tx[1].toLowerCase() as Lang] = tx[2].trim();
  }
  for (const [k, v] of DECK) for (const l of ["pt", "en", "fr"] as Lang[]) if (!v[l]) throw new Error(`COPY_DECK.md: ${k} has no ${l.toUpperCase()} text`);
}

export type Vars = Record<string, string | number>;
// Prompt 66 §3: while config.agency.public is false the agency is not named. Each block that names it has its named
// wording under "## agencynamed" (same key), used only when the flag is true; with the flag off, {agency} and {ami}
// are not filled and a block that still holds them fails the build, so the name cannot slip back in unnoticed.
const NAMED = config.agency.public;
const BASE: Vars = NAMED ? { agency: config.agency.name, ami: config.agency.ami, email: config.contactEmail } : { email: config.contactEmail };

/** One text from the deck, e.g. c("home.lede", "pt"). Throws on a missing key so typos fail the build. */
export function c(key: string, lang: Lang, vars: Vars = {}): string {
  const v = (NAMED && DECK.get(`agencynamed.${key}`)) || DECK.get(key);
  if (!v) throw new Error(`COPY_DECK.md: no block "${key}"`);
  if (!NAMED && /\{(agency|ami)\}/.test(v[lang])) throw new Error(`COPY_DECK.md: ${key} (${lang}) names the agency while config.agency.public is false: move that wording to "## agencynamed"`);
  const all: Vars = { ...BASE, ...vars };
  const out = v[lang].replace(/\{(\w+)\}/g, (m, k) => (k in all ? String(all[k]) : m));
  return lang === "fr" ? frSpaces(out) : out;
}
/** French typography (prompt 70, S-27): a non-breaking space before ? ! ; : and inside « », so a sign never starts a line. */
function frSpaces(t: string) { return t.replace(/ ([?!;»])/g, "\u202f$1").replace(/ :(?=\s|$)/g, "\u00a0:").replace(/« /g, "«\u00a0"); }
/** True if the deck has this block (for optional wording). */
export const has = (key: string) => DECK.has(key);
/** Numbered blocks as a list: cl("home.weekly", "pt") → home.weekly.1, .2, … */
export function cl(prefix: string, lang: Lang, vars: Vars = {}): string[] {
  const out: string[] = [];
  for (let i = 1; DECK.has(`${prefix}.${i}`); i++) out.push(c(`${prefix}.${i}`, lang, vars));
  return out;
}
/** Edition name in a language. */
export const edName = (ed: EdCode, lang: Lang) => c(`editions.name.${ed}`, lang);
