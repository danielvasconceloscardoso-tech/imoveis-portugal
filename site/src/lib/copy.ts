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

const BASE = { agency: config.agency.name, ami: config.agency.ami, email: config.contactEmail };
export type Vars = Record<string, string | number>;

/** One text from the deck, e.g. c("home.lede", "pt"). Throws on a missing key so typos fail the build. */
export function c(key: string, lang: Lang, vars: Vars = {}): string {
  const v = DECK.get(key);
  if (!v) throw new Error(`COPY_DECK.md: no block "${key}"`);
  const all: Vars = { ...BASE, ...vars };
  return v[lang].replace(/\{(\w+)\}/g, (m, k) => (k in all ? String(all[k]) : m));
}
/** Numbered blocks as a list: cl("home.weekly", "pt") → home.weekly.1, .2, … */
export function cl(prefix: string, lang: Lang, vars: Vars = {}): string[] {
  const out: string[] = [];
  for (let i = 1; DECK.has(`${prefix}.${i}`); i++) out.push(c(`${prefix}.${i}`, lang, vars));
  return out;
}
/** Edition name in a language. */
export const edName = (ed: EdCode, lang: Lang) => c(`editions.name.${ed}`, lang);
