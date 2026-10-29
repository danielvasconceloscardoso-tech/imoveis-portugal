// The Artigos hub (prompt 37 §2): long explanations, tables, method and statistics moved off the map and the home page,
// one article each. URL: /{lang}/{ed}/{artigos|articles}/{slug}/. Wording: COPY_DECK.md "art.*" (prompt 43 §3: search title,
// answer first, question headings, three follow-ups as FAQPage data). The slugs below stay fixed: links and the sitemap use them.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Lang } from "../i18n";

export type ArtKey = "map" | "prices" | "golf" | "method";
export const ARTS: ArtKey[] = ["map", "prices", "golf", "method"];
export const ART_SUB: Record<ArtKey, Record<Lang, string>> = {
  map: { pt: "como-ler-os-precos-no-mapa", en: "how-to-read-prices-on-the-map", fr: "lire-les-prix-sur-la-carte" },
  prices: { pt: "dez-anos-de-precos", en: "ten-years-of-prices", fr: "dix-ans-de-prix" },
  golf: { pt: "o-premio-do-golfe", en: "the-golf-premium", fr: "la-prime-du-golf" },
  method: { pt: "como-calculamos", en: "how-we-calculate", fr: "notre-methode-de-calcul" },
};

// The golf premium (content/data/GOLF_PREMIUM.md): parish median vs municipality median, never a cause.
export type GolfRow = { parish: string; municipality: string; municipality_slug: string; parish_median_eur_m2: number | null; municipality_median_eur_m2: number | null; ratio: number | null; full_course: boolean };
export const GOLF = JSON.parse(readFileSync(join(process.cwd(), "..", "content", "data", "golf-premium.json"), "utf8")) as { quarter: string; parishes: GolfRow[] };
