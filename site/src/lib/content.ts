// Reader-facing content that lives outside the site code: FAQ (content/faq/*.yaml), the facts base
// (content/facts/facts.csv) and the disclaimers (content/EDITORIAL_POLICY.md). Read at build time.
// D18: every page exists in pt, en and fr; editions only change country-specific content.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { HTML_LANG, EDITIONS, type EdCode, type Lang } from "../i18n";
import { c } from "./copy";

// Builds run from site/ (npm run build, Cloudflare root directory "site"); content/ sits next to it.
const contentDir = join(process.cwd(), "..", "content");

export type Cat = "lawyer" | "bank" | "tax" | "fx" | "developer";

// ---------- facts ----------
export type Fact = { id: string; claim: string; value: string; source_title: string; source_url: string; checked_on: string };
function parseCsv(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = []; let cell = ""; let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (c !== "\r") cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}
const factRows = parseCsv(readFileSync(join(contentDir, "facts/facts.csv"), "utf8"));
const head = factRows[0];
export const FACTS: Record<string, Fact> = Object.fromEntries(
  factRows.slice(1).filter((r) => r[0]).map((r) => [r[0], Object.fromEntries(head.map((h, i) => [h, r[i]])) as Fact]),
);

// ---------- FAQ: common-{lang}.yaml plus the edition's own {ed}-{lang}.yaml (prompt 09) ----------
export type Stage = "before" | "buying" | "after";
export type FaqItem = { id: string; rank: number; stage: Stage; q: string; a: string; cta: Cat | "agency"; facts: string[] };
const loadYaml = (name: string) => {
  const f = join(contentDir, "faq", `${name}.yaml`);
  return existsSync(f) ? ((yaml.load(readFileSync(f, "utf8")) || []) as FaqItem[]) : [];
};
// Common and edition questions merged and ordered by search interest (rank).
export function faqFor(ed: EdCode, lang: Lang): FaqItem[] {
  const items = [...loadYaml(`common-${lang}`), ...loadYaml(`${ed}-${lang}`)];
  for (const it of items) for (const f of it.facts || []) if (!FACTS[f]) throw new Error(`FAQ ${it.id}: unknown fact ${f}`);
  return items.sort((x, y) => x.rank - y.rank);
}

// ---------- disclaimers (single source: the editorial policy) ----------
const policy = readFileSync(join(contentDir, "EDITORIAL_POLICY.md"), "utf8");
const disclaimerFor = (label: string) => {
  const m = policy.match(new RegExp(`\\*\\*${label.replace(/[()]/g, "\\$&")}:\\*\\*\\s*(.+)`));
  if (!m) throw new Error(`disclaimer ${label} not found in EDITORIAL_POLICY.md`);
  return m[1].trim();
};
export const DISCLAIMER: Record<Lang, string> = { pt: disclaimerFor("PT (LU, CH)"), fr: disclaimerFor("FR"), en: disclaimerFor("EN (future US and Israel editions)") };

export const CATS: Cat[] = ["lawyer", "bank", "tax", "fx", "developer"];

export const fmtDate = (lang: Lang, iso: string) =>
  new Intl.DateTimeFormat(HTML_LANG[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

// ---------- free e-book, one per edition (site/ebooks, built by `npm run ebooks`) ----------
export const EBOOK = { file: (lang: Lang, ed: EdCode) => `/ebooks/imoveis-portugal-guia-custos-${ed}-${lang}.pdf` };

// ---------- facts used on the edition home (prompt 11), listed with their sources on "How we work" ----------
export function homeFacts(ed: EdCode): Fact[] {
  const emigrant = ed === "lu" || ed === "fr" || ed === "ch";
  const ids = ["pt-imt-nonresident-flat", "pt-is-purchase", "pt-casa-pronta-fees", "pt-poa-apostille", "pt-ltv-limits",
    ...(emigrant ? ["pt-is-inheritance-exempt"] : ["pt-ari-realestate-ended", "pt-visa-own-income"])];
  const cur = EDITION_CUR[ed];
  if (cur) ids.push(`ecb-eur-${cur.toLowerCase()}`);
  return ids.map((id) => FACTS[id]);
}

// ---------- sources as superscripts (prompt 11): one numbered list at the bottom of the page ----------
export class Sources {
  list: { url: string; title: string; checked?: string }[] = [];
  /** Number for a fact id (or a raw source), adding it to the page list once. */
  n(id: string): number {
    const f = FACTS[id];
    if (!f) throw new Error(`unknown fact ${id}`);
    return this.raw(f.source_url, f.source_title, f.checked_on);
  }
  raw(url: string, title: string, checked?: string): number {
    const i = this.list.findIndex((s) => s.url === url);
    if (i >= 0) return i + 1;
    this.list.push({ url, title, checked });
    return this.list.length;
  }
}

// ---------- the home example: a 245 000 € home bought by a non-resident (prompt 11) ----------
export const RATE = (cur: "CHF" | "USD" | "BRL" | "ILS") => ({ rate: Number(FACTS[`ecb-eur-${cur.toLowerCase()}`].value), id: `ecb-eur-${cur.toLowerCase()}` });
export const EDITION_CUR: Partial<Record<EdCode, "CHF" | "USD" | "BRL" | "ILS">> = { ch: "CHF", us: "USD", br: "BRL", il: "ILS" };
export function homeExample(price = 245000) {
  const imt = price * 0.075, is = price * 0.008, deed = 375; // pt-imt-nonresident-flat, pt-is-purchase, pt-casa-pronta-fees
  for (const [id, s] of [["pt-imt-nonresident-flat", "7.5%"], ["pt-is-purchase", "0.8%"], ["pt-casa-pronta-fees", "375"]]) if (!FACTS[id].value.includes(s)) throw new Error(`${id} changed`);
  return { price, imt, is, deed, extra: imt + is + deed, total: price + imt + is + deed };
}
