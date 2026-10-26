// Private developer demos v2 (prompt 28, D53; D51 English only). Unlisted URLs (/d/{token}/), noindex, not in the
// sitemap or any menu. The homes, prices and images are the developer's own, as published (content/developers/
// projects.json, with the URL and date of each); every market figure is INE's with its period. One buyer per demo,
// with a budget in their own currency, and the home the film opens.
import { demoProjects, img } from "./projects";

export type Reader = { city: string; country: string; cur: "USD" | "CHF" | "EUR" | "ILS"; ed: "us" | "ch" | "lu" | "fr" | "il" };
export type Pin = { id: string; name: string; developer: string; muni: string; lon: number; lat: number; from: number | null; typologies: string[]; delivery?: string | null;
  url?: string; render?: string; credit?: string; showcase?: string };
type Def = {
  token: string; developer: string; project: string; where: string; muni: string; center: [number, number, number];
  readers: Reader[];
  // The film's concierge line, and the budget it writes in the reader's currency.
  buyer: { line: string; words: string; amount: number; cur: Reader["cur"]; ed: Reader["ed"]; when: "soon" | "year"; own: number };
  home: string; accent: string; extra?: "northam"; facts: string[]; sources: { t: string; u: string }[];
};
export type Demo = Def & { budgets: number[]; pins: Pin[]; render?: string; credit?: string };

const RATES: Record<string, number> = { EUR: 1, USD: 1.1193, CHF: 0.9227, ILS: 3.4939 };  // ECB, 23 Oct 2026 (facts.csv ecb-eur-*)

const DEFS: Def[] = [
  {
    token: "f658bd1eef", developer: "Shalu Investments", project: "O'rizon Living", where: "Valbom, Gondomar, on the Douro, a few minutes from central Porto",
    muni: "gondomar", center: [-8.565, 41.141, 10.4],
    readers: [{ city: "Tel Aviv", country: "Israel", cur: "ILS", ed: "il" }, { city: "New York", country: "USA", cur: "USD", ed: "us" }],
    buyer: { line: "A couple in Tel Aviv.", words: "Three million shekels.", amount: 3000000, cur: "ILS", ed: "il", when: "year", own: 1 },
    home: "re2027-2agf02", accent: "#0b3c5d",
    facts: ["About 200 apartments in five buildings on 35,000 m² by the Douro", "Homes from one to four bedrooms, with river views", "Architect: Paulo Merlini", "Investment of about €100 million"],
    sources: [{ t: "Essential Business, 'Shalu invests €100 million in luxury Porto project', 3 Oct 2025 (source: Vida Imobiliária)", u: "https://www.essential-business.pt/2025/10/03/shalu-invests-e100-million-in-luxury-porto-project/" },
      { t: "Imovirtual, O'rizon Living listings (prices as published, 26 Oct 2026)", u: "https://www.imovirtual.com/" }],
  },
  {
    token: "34c86306cf", developer: "Vanguard Properties", project: "Tomás Ribeiro 79", where: "Avenidas Novas, Lisbon, between Saldanha and Marquês de Pombal",
    muni: "lisboa", center: [-9.149, 38.732, 11],
    readers: [{ city: "New York", country: "USA", cur: "USD", ed: "us" }, { city: "Geneva", country: "Switzerland", cur: "CHF", ed: "ch" }],
    buyer: { line: "A family in New York.", words: "Three and a half million dollars.", amount: 3500000, cur: "USD", ed: "us", when: "soon", own: 1 },
    home: "tom-3c", accent: "#3b4a3f",
    facts: ["21 apartments with two to four bedrooms over eight floors", "Indoor pool, sauna, concierge and private parking", "Muda, in Grândola: 15 building plots with published prices", "Prices as published by Vanguard Properties"],
    sources: [{ t: "Vanguard Properties, Tomás Ribeiro 79", u: "https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/" },
      { t: "Vanguard Properties, Muda", u: "https://www.vangproperties.com/en/comporta-portugal-real-estate/muda/" }],
  },
  {
    token: "65bf930b11", developer: "Vale do Lobo", project: "The Residences", where: "Vale do Lobo resort, Loulé, next to Quinta do Lago",
    muni: "loule", center: [-8.058, 37.058, 10.6],
    readers: [{ city: "California", country: "USA", cur: "USD", ed: "us" }, { city: "Zurich", country: "Switzerland", cur: "CHF", ed: "ch" }],
    buyer: { line: "A family in California.", words: "Four million dollars.", amount: 4000000, cur: "USD", ed: "us", when: "year", own: 1 },
    home: "sp47", accent: "#1b3a4b", extra: "northam",
    facts: ["44 homes: 25 apartments in two buildings, 10 linked villas and 9 townhouses (townhouses sold out)", "By the 10th hole of the Royal Golf Course; architecture by Broadway Malyan", "Sold off plan: 30% on reservation or contract, 70% on completion", "A 450-hectare resort founded in 1962"],
    sources: [{ t: "Vale do Lobo, The Residences", u: "https://www.valedolobo.com/en/the-residences-vale-do-lobo/" }, { t: "idealista, 'North Americans drive up property prices in the Algarve', September 2024 (citing Savills)", u: "https://www.idealista.pt/en/news/node/65720" }],
  },
  {
    token: "7c1e5a90d4", developer: "VIC Properties", project: "Prata Riverside Village", where: "Marvila, on the Tagus riverfront in eastern Lisbon",
    muni: "lisboa", center: [-9.099, 38.745, 11.2],
    readers: [{ city: "Geneva", country: "Switzerland", cur: "CHF", ed: "ch" }, { city: "Luxembourg", country: "Luxembourg", cur: "EUR", ed: "lu" }],
    buyer: { line: "A family in Geneva.", words: "Two million francs.", amount: 2000000, cur: "CHF", ed: "ch", when: "year", own: 0.7 },
    home: "south-c-4oa", accent: "#22343c",
    facts: ["A riverside neighbourhood in Marvila; the Factory building is designed by Renzo Piano", "Factory: 53 apartments, studios to four bedrooms, by the central square", "South: 72 apartments, studios to four bedrooms, by Parque Ribeirinho Oriente", "Prices as published by VIC's own sales team"],
    sources: [{ t: "VIC Properties, Prata Riverside Village", u: "https://www.vic-properties.com/" }, { t: "Imovirtual, VIC Mediação listings (prices as published, 26 Oct 2026)", u: "https://www.imovirtual.com/" }],
  },
];

export const DEMOS: Demo[] = DEFS.map((d) => {
  const ps = demoProjects(d.token);
  const main = ps.find((p) => p.muni === d.muni) ?? ps[0];
  return {
    ...d,
    budgets: [d.buyer.amount / RATES[d.buyer.cur]],  // exact, so the map shows the buyer's own figure in their currency
    render: img(main?.render), credit: main?.credit ?? undefined,
    pins: ps.map((p) => ({ id: p.id, name: p.name, developer: p.developer, muni: p.muni, lon: p.lon, lat: p.lat, from: p.from, typologies: p.typologies, delivery: p.delivery,
      url: p.url, render: img(p.render, 800), credit: p.credit, showcase: `/d/${d.token}/homes/${p.muni === d.muni ? "" : `${p.muni}/`}` })),
  };
});
export const rateOf = (cur: string) => RATES[cur] ?? 1;
