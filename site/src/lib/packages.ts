// Partner types (prompts 18 and 21): one page and one media kit each, in the languages that type reads.
// No prices or package names on the site (D38): they live only in the private brochure (sponsors/brochure/).
import type { Lang } from "../i18n";

export type PType = { key: "wealth" | "taxlegal" | "transfer" | "developers"; slug: Record<Lang, string>; kit: Lang[] };
export const PTYPES: PType[] = [
  { key: "wealth", slug: { pt: "banca-privada", en: "private-banks", fr: "banques-privees" }, kit: ["fr", "en"] },
  { key: "taxlegal", slug: { pt: "fiscal-e-juridico", en: "tax-and-legal", fr: "fiscal-et-juridique" }, kit: ["pt", "fr", "en"] },
  { key: "transfer", slug: { pt: "transferencias", en: "money-transfer", fr: "transferts" }, kit: ["en", "fr", "pt"] },
  { key: "developers", slug: { pt: "promotores", en: "developers", fr: "promoteurs" }, kit: ["pt", "en"] },
];
export const kitFile = (type: string, lang: Lang) => `/mediakit/ImoveisPortugal_MediaKit_${type}_${lang.toUpperCase()}.pdf`;
