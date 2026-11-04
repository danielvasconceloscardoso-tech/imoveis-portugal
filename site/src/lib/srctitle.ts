// Source titles in the reader's language (prompt 70, A-17). facts.csv keeps one title per source, written for the English
// pages; a Portuguese or French page shows the official Portuguese title of a Portuguese source and translates our own
// notes around a title ("updated", "listing page"), never a name that is official in its own language (Knight Frank,
// Global Peace Index, an IRS form). The overrides live in content/facts/source-titles.csv (source_title, pt, fr); a few
// repeated patterns (schedule pages, home pages) are translated here.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { Lang } from "../i18n";

const file = join(process.cwd(), "..", "content", "facts", "source-titles.csv");
const MAP = new Map<string, { pt: string; fr: string }>();
if (existsSync(file)) {
  const text = readFileSync(file, "utf8");
  // RFC 4180: quoted fields, "" inside quotes.
  const rows: string[][] = []; let row: string[] = [], f = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += ch; }
    else if (ch === '"') q = true; else if (ch === ",") { row.push(f); f = ""; }
    else if (ch === "\n") { row.push(f); rows.push(row); row = []; f = ""; } else if (ch !== "\r") f += ch;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  for (const [t, pt, fr] of rows.slice(1)) if (t) MAP.set(t, { pt: pt || t, fr: fr || pt || t });
}

const RULES: { re: RegExp; pt: string; fr: string }[] = [
  { re: /^PlaneMapper, flight (\S+) schedule page \(scheduled departure and arrival times, local\)$/, pt: "PlaneMapper, horário do voo $1 (partida e chegada previstas, hora local)", fr: "PlaneMapper, horaires du vol $1 (départ et arrivée prévus, heure locale)" },
  { re: /^(.*), home page$/, pt: "$1, página inicial", fr: "$1, page d'accueil" },
  { re: /^(.*) \(project page\)$/, pt: "$1 (página do projeto)", fr: "$1 (page du projet)" },
];

/** The title of a source as a page in `lang` shows it. */
export function srcTitle(title: string, lang: Lang): string {
  if (lang === "en") return title;
  const m = MAP.get(title);
  if (m) return m[lang];
  for (const r of RULES) if (r.re.test(title)) return title.replace(r.re, r[lang]);
  return title;
}
