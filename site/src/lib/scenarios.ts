// Four budget scenarios (prompt 18, D36): where each budget makes sense, from INE municipality medians, and for
// 5 M€ and 10 M€ real published listings as examples, because a municipality median (Loulé) does not describe a
// prime enclave inside it (Quinta do Lago). Never an invented price or property: every listing is a fact in
// content/facts/facts.csv with its source and the date we checked it. Wording: COPY_DECK.md "scen.*".
import type { Lang } from "../i18n";
import { MAP_MUNIS } from "./mapdata";

export type Listing = { fact: string; price: string; m2?: number; text: Record<Lang, string> };
export type Scenario = { budget: number; key: string; photo: string; places: string[]; listings: Listing[] };

export const SCENARIOS: Scenario[] = [
  { budget: 300000, key: "300k", photo: "porto-ribeira-rabelo", places: ["Porto", "Braga", "Viseu"], listings: [] },
  { budget: 1000000, key: "1m", photo: "lisboa-alfama-telhados", places: ["Lisboa", "Cascais", "Porto"], listings: [] },
  { budget: 5000000, key: "5m", photo: "lisboa-anoitecer-castelo", places: ["Cascais", "Loulé"], listings: [
    { fact: "kf-cascais-5250k", price: "5250000", m2: 381, text: { pt: "Moradia nova, contemporânea, com quatro quartos, em Cascais", en: "A newly built contemporary four-bedroom villa in Cascais", fr: "Une villa contemporaine neuve de quatre chambres à Cascais" } },
    { fact: "kf-mirandela-5750k", price: "5750000", text: { pt: "Quinta com olival e lagar, cerca de 50 hectares, em Mirandela", en: "A farm with olive groves and its own olive-oil production, about 50 hectares, in Mirandela", fr: "Un domaine avec oliveraie et production d'huile, environ 50 hectares, à Mirandela" } },
  ] },
  { budget: 10000000, key: "10m", photo: "porto-douro-entardecer", places: ["Loulé", "Sintra"], listings: [
    { fact: "kf-beloura-8500k", price: "8500000", m2: 891.5, text: { pt: "Moradia com seis quartos, piscina e vista sobre o golfe, na Beloura (Sintra)", en: "A six-bedroom villa with a pool and golf views in Beloura (Sintra)", fr: "Une villa de six chambres avec piscine et vue sur le golf à Beloura (Sintra)" } },
    { fact: "kf-onegreenway", price: "4000000-9250000", text: { pt: "Casas novas com três a seis quartos na Quinta do Lago (Loulé), preços do empreendimento", en: "New homes with three to six bedrooms in Quinta do Lago (Loulé), the development's price range", fr: "Maisons neuves de trois à six chambres à Quinta do Lago (Loulé), fourchette de prix du programme" } },
    { fact: "kf-qdl-15750k", price: "15750000", text: { pt: "E acima de 10 milhões: moradia contemporânea com sete quartos na Quinta do Lago", en: "And above 10 million: a contemporary seven-bedroom villa in Quinta do Lago", fr: "Et au-delà de 10 millions : une villa contemporaine de sept chambres à Quinta do Lago" } },
  ] },
];

/** m² the budget buys at the INE median of a municipality (null if INE has no figure). */
export function m2At(budget: number, place: string): { v: number; m2: number } | null {
  const m = MAP_MUNIS.find((x) => x.n === place);
  return m && m.v ? { v: m.v, m2: Math.round(budget / m.v) } : null;
}
