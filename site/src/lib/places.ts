// Municipality pages (prompt 15 §3.2): "Comprar casa em [concelho]" for the 30 municipalities our readers buy in most,
// North and Centre first, then Lisbon and the Algarve. Only where INE publishes a median (no thin pages).
// Data: src/data/ine-m2.json (fact ine-m2-2026q2). Wording: COPY_DECK.md "place.*".
import ine from "../data/ine-m2.json";
import type { Lang } from "../i18n";

type Muni = { name: string; q: Record<string, number | null> };
const DATA = ine as { quarters: string[]; municipalities: Record<string, Muni>; released: string };
export const QUARTERS = DATA.quarters;
export const LAST_Q = QUARTERS[QUARTERS.length - 1];
export const MUNIS = DATA.municipalities;

// NUTS III region from the first characters of the INE code (NUTS 2024).
const REGION: [string, string][] = [
  ["11A", "Área Metropolitana do Porto"], ["111", "Alto Minho"], ["112", "Cávado"], ["119", "Ave"], ["11B", "Alto Tâmega e Barroso"],
  ["11C", "Tâmega e Sousa"], ["11D", "Douro"], ["11E", "Terras de Trás-os-Montes"], ["191", "Região de Aveiro"], ["192", "Região de Coimbra"],
  ["193", "Região de Leiria"], ["194", "Viseu Dão Lafões"], ["195", "Beira Baixa"], ["196", "Beiras e Serra da Estrela"], ["1A0", "Grande Lisboa"],
  ["1B0", "Península de Setúbal"], ["1C", "Alentejo"], ["1D", "Oeste e Vale do Tejo"], ["150", "Algarve"], ["200", "Açores"], ["300", "Madeira"],
];
export const regionOf = (code: string) => REGION.find(([p]) => code.startsWith(p))?.[1] ?? "";

// Preposition before the name, per language ("no Porto", "na Maia", "em Braga"; "à Porto"; "in Porto").
const PT_ART: Record<string, string> = { Porto: "no", Maia: "na", "Póvoa de Varzim": "na", "Figueira da Foz": "na" };
const FR_NAME: Record<string, string> = { Lisboa: "Lisbonne" };
const EN_NAME: Record<string, string> = { Lisboa: "Lisbon" };
export const placeName = (name: string, lang: Lang) => (lang === "fr" ? FR_NAME[name] : lang === "en" ? EN_NAME[name] : undefined) ?? name;
export const inPlace = (name: string, lang: Lang) =>
  lang === "pt" ? `${PT_ART[name] ?? "em"} ${name}` : lang === "fr" ? `à ${placeName(name, lang)}` : `in ${placeName(name, lang)}`;

const slugify = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const NAMES = [
  "Porto", "Vila Nova de Gaia", "Matosinhos", "Maia", "Gondomar", "Valongo", "Póvoa de Varzim", "Vila do Conde", "Santo Tirso", "Paredes",
  "Penafiel", "Amarante", "Braga", "Guimarães", "Barcelos", "Viana do Castelo", "Ponte de Lima", "Esposende", "Vila Real", "Chaves",
  "Bragança", "Viseu", "Coimbra", "Aveiro", "Leiria", "Figueira da Foz", "Lisboa", "Cascais", "Faro", "Loulé",
];
export type Place = { code: string; name: string; slug: string; region: string; m2: number; series: (number | null)[]; change: number | null };
export const PLACES: Place[] = NAMES.map((name) => {
  const [code, m] = Object.entries(MUNIS).find(([, v]) => v.name === name)!;
  const series = QUARTERS.map((q) => m.q[q]);
  const first = series[0], last = series[series.length - 1];
  return { code, name, slug: slugify(name), region: regionOf(code), m2: last!, series, change: first && last ? (last / first - 1) * 100 : null };
}).filter((p) => p.m2);
export const NATIONAL = MUNIS["PT"].q[LAST_Q]!;
