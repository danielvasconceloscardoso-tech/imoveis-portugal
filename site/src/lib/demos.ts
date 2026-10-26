// Private developer demos (prompt 26 §2, D51: English only). Unlisted URLs (/d/{token}/), noindex, not in the sitemap or
// any menu. Facts about each project come only from what the developer published (name, location, typologies, dates,
// one render with its credit); every market figure is INE's (prices.json, layers.json) with its period.
export type Reader = { city: string; country: string; cur: "USD" | "CHF" | "EUR" | "ILS"; ed: "us" | "ch" | "lu" | "fr" | "il" };
export type Pin = { id: string; name: string; developer: string; muni: string; lon: number; lat: number; from: number | null; typologies: string[]; delivery?: string; url?: string; render?: string; credit?: string };
export type Demo = {
  token: string; developer: string; project: string; where: string; muni: string; center: [number, number, number];
  readers: Reader[]; budgets: number[]; pins: Pin[]; facts: string[]; sources: { t: string; u: string }[];
  render?: string; credit?: string; accent: string; extra?: "northam" | "prelaunch"; nearby?: string[];
};

export const DEMOS: Demo[] = [
  {
    token: "f658bd1eef", developer: "Shalu Investments", project: "O'rizon Living", where: "Valbom, Gondomar, on the Douro, a few minutes from central Porto",
    muni: "gondomar", center: [-8.556, 41.128, 10.4],
    readers: [{ city: "Tel Aviv", country: "Israel", cur: "ILS", ed: "il" }, { city: "New York", country: "USA", cur: "USD", ed: "us" }],
    budgets: [450000, 750000],
    pins: [{ id: "orizon", name: "O'rizon Living", developer: "Shalu Investments", muni: "gondomar", lon: -8.556, lat: 41.128, from: null, typologies: ["Apartments"],
      render: "/d/f658bd1eef/render.jpg", credit: "O'rizon Living, Shalu Investments, via Essential Business" }],
    facts: ["About 200 apartments in five buildings on 35,000 m² by the Douro", "Resort-style condominium with amenities", "Architect: Paulo Merlini; launched with Dils and Réplica", "Investment of about €100 million"],
    sources: [{ t: "Essential Business, 'Shalu invests €100 million in luxury Porto project', 3 Oct 2025 (source: Vida Imobiliária)", u: "https://www.essential-business.pt/2025/10/03/shalu-invests-e100-million-in-luxury-porto-project/" }],
    render: "/d/f658bd1eef/render.jpg", credit: "O'rizon Living, Shalu Investments, via Essential Business", accent: "#0b3c5d",
  },
  {
    token: "34c86306cf", developer: "Vanguard Properties", project: "Muda, Comporta", where: "Comporta, on the Alentejo coast south of Lisbon",
    muni: "alcacer-do-sal", center: [-8.786, 38.381, 9.6],
    readers: [{ city: "New York or Miami", country: "USA", cur: "USD", ed: "us" }, { city: "Geneva", country: "Switzerland", cur: "CHF", ed: "ch" }, { city: "Luxembourg", country: "Luxembourg", cur: "EUR", ed: "lu" }],
    budgets: [1000000, 5000000, 10000000],
    pins: [{ id: "muda", name: "Muda", developer: "Vanguard Properties", muni: "alcacer-do-sal", lon: -8.786, lat: 38.381, from: null, typologies: ["T2", "T2+1", "T3", "T3+1"], delivery: "2029-H1",
      url: "https://www.vangproperties.com/en/comporta-portugal-real-estate/muda/", render: "/d/34c86306cf/render.jpg", credit: "Muda, Vanguard Properties; 3D image: 1825" }],
    facts: ["A residential village of private homes with gardens and pools, for living year-round or part of the year", "Founders Collection: 8 homes, 2 to 3 bedrooms; 32 villas, 2 to 3+1 bedrooms; 15 plots of 834 to 2,388 m²", "Architecture: Fragmentos; landscape: OhLAND; four public artworks from Vhils Studios", "Sales launch 14 October 2026; expected completion first half of 2029"],
    sources: [{ t: "Vanguard Properties, Muda", u: "https://www.vangproperties.com/en/comporta-portugal-real-estate/muda/" }],
    render: "/d/34c86306cf/render.jpg", credit: "Muda, Vanguard Properties; 3D image: 1825", accent: "#3b4a3f",
  },
  {
    token: "65bf930b11", developer: "Vale do Lobo", project: "The Residences", where: "Vale do Lobo resort, Loulé, next to Quinta do Lago",
    muni: "loule", center: [-8.068, 37.051, 10.2],
    readers: [{ city: "New York or California", country: "USA", cur: "USD", ed: "us" }, { city: "Paris", country: "France", cur: "EUR", ed: "fr" }, { city: "Zurich", country: "Switzerland", cur: "CHF", ed: "ch" }],
    budgets: [5000000, 10000000],
    pins: [{ id: "residences", name: "The Residences", developer: "Vale do Lobo", muni: "loule", lon: -8.068, lat: 37.051, from: null, typologies: ["Apartments", "Linked villas", "Townhouses"],
      url: "https://www.valedolobo.com/en/the-residences-vale-do-lobo/", render: "/d/65bf930b11/render.jpg", credit: "The Residences, Vale do Lobo" }],
    facts: ["The first new residential development at Vale do Lobo in over two decades: 44 units", "25 apartments, 10 linked villas and 9 townhouses (townhouses sold out)", "Designed by Broadway Malyan, by the 10th hole of the Royal Golf Course", "A 450-hectare resort founded in 1962 with 2 km of ocean frontage"],
    sources: [{ t: "Vale do Lobo, The Residences", u: "https://www.valedolobo.com/en/the-residences-vale-do-lobo/" }, { t: "idealista, 'North Americans drive up property prices in the Algarve', September 2024 (citing Savills)", u: "https://www.idealista.pt/en/news/node/65720" }],
    render: "/d/65bf930b11/render.jpg", credit: "The Residences, Vale do Lobo", accent: "#1b3a4b", extra: "northam",
  },
  {
    token: "259206fcf0", developer: "OneMark Properties", project: "Pre-launch", where: "Greater Lisbon, Grândola and Sines; Porto and possibly the Algarve later",
    muni: "lisboa", center: [-8.95, 38.45, 7.6], nearby: ["grandola", "sines"],
    readers: [{ city: "Dubai", country: "UAE", cur: "USD", ed: "us" }, { city: "Geneva", country: "Switzerland", cur: "CHF", ed: "ch" }, { city: "New York", country: "USA", cur: "USD", ed: "us" }],
    budgets: [5000000, 10000000],
    pins: [
      { id: "om-lisbon", name: "Signature Living · your project here", developer: "OneMark Properties", muni: "lisboa", lon: -9.15, lat: 38.72, from: null, typologies: [] },
      { id: "om-grandola", name: "Curated Living · your project here", developer: "OneMark Properties", muni: "grandola", lon: -8.57, lat: 38.17, from: null, typologies: [] },
      { id: "om-sines", name: "Signature Living · your project here", developer: "OneMark Properties", muni: "sines", lon: -8.86, lat: 37.96, from: null, typologies: [] },
    ],
    facts: ["Portuguese development and asset-management platform founded in 2026", "Four residential lines: Signature Living, Curated Living, Smart Living and OPUS · Buildings Reborn", "Works with institutional investors, family offices and private owners", "Announced locations: Greater Lisbon, Grândola and Sines"],
    sources: [{ t: "OneMark Properties", u: "https://www.onemark.pt/en" }, { t: "idealista news", u: "https://www.idealista.pt/news/node/75369" }, { t: "idealista news", u: "https://www.idealista.pt/news/node/73589" }],
    accent: "#2b2b2b", extra: "prelaunch",
  },
];
