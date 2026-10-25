// Price list v3 (prompt 15, proposal until tasks 8s and 8t): list price per year and the founding price
// (40% off year 1 for the first 10 partners). Shared by the partners page and the partner-type pages (prompt 18).
import { config } from "../config";
import { eur, type Lang } from "../i18n";
import { c } from "./copy";

export type PkgKey = "verified" | "featured" | "bank" | "private" | "developer";
export type Pkg = { key: PkgKey; name: string; desc: string; list: string; founding: string };

export function packages(lang: Lang): Pkg[] {
  const p = config.prices, e = (n: number) => eur(n, lang);
  const f = (n: number) => Math.round(n * (1 - config.foundingDiscount));
  const pe = c("partners.per.edition", lang), ae = c("partners.all.editions", lang), fr = c("partners.from", lang);
  const row = (key: PkgKey, list: string, founding: string): Pkg => ({ key, name: c(`partners.${key}.h`, lang), desc: c(`partners.${key}.p`, lang), list, founding });
  return [
    row("verified", `${e(p.verified.edition)} ${pe} · ${e(p.verified.all)} ${ae}`, `${e(f(p.verified.edition))} · ${e(f(p.verified.all))}`),
    row("featured", `${e(p.featured.edition)} ${pe} · ${e(p.featured.all)} ${ae}`, `${e(f(p.featured.edition))} · ${e(f(p.featured.all))}`),
    row("bank", `${e(p.bank.from)} – ${e(p.bank.to)}`, `${fr} ${e(f(p.bank.from))}`),
    row("private", `${e(p.private.from)} – ${e(p.private.to)}`, `${fr} ${e(f(p.private.from))}`),
    row("developer", `${fr} ${e(p.developerFrom)}`, ""),
  ];
}

// Partner types (prompt 18): one page and one media kit each, the kit in the languages that type reads.
export type PType = { key: "wealth" | "taxlegal" | "transfer" | "developers"; slug: Record<Lang, string>; pkgs: PkgKey[]; kit: Lang[] };
export const PTYPES: PType[] = [
  { key: "wealth", slug: { pt: "banca-privada", en: "private-banks", fr: "banques-privees" }, pkgs: ["private", "bank"], kit: ["fr", "en"] },
  { key: "taxlegal", slug: { pt: "fiscal-e-juridico", en: "tax-and-legal", fr: "fiscal-et-juridique" }, pkgs: ["verified", "featured", "private"], kit: ["pt", "fr", "en"] },
  { key: "transfer", slug: { pt: "transferencias", en: "money-transfer", fr: "transferts" }, pkgs: ["verified", "featured"], kit: ["en", "fr", "pt"] },
  { key: "developers", slug: { pt: "promotores", en: "developers", fr: "promoteurs" }, pkgs: ["developer", "private"], kit: ["pt", "en"] },
];
export const kitFile = (type: string, lang: Lang) => `/mediakit/ImoveisPortugal_MediaKit_${type}_${lang.toUpperCase()}.pdf`;
