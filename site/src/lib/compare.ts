// "O que compra" (prompt 12, section 1): what a budget buys in m², in Portugal and where the reader lives.
// m² = budget ÷ price per m² of sales. Every figure is a fact in content/facts/facts.csv; places without a
// primary source are left out (listed in ops/TASKS.md for the operator).
import ine from "../data/ine-m2.json";
import type { EdCode } from "../i18n";
import { FACTS } from "./content";

export type Place = { key: string; name: string; m2: number; cur: "EUR" | "CHF"; fact: string; note?: "mean" | "canton" };
const INE = (ine as { municipalities: Record<string, { name: string; q: Record<string, number | null> }> }).municipalities;
const LAST = (ine as { quarters: string[] }).quarters.at(-1)!;
const pt = (code: string, key: string): Place => ({ key, name: INE[code].name, m2: INE[code].q[LAST]!, cur: "EUR", fact: "ine-m2-2026q2" });

// Portugal: Lisbon, Porto, Gondomar, Braga, Faro (Algarve) and one inland town (Viseu).
export const PT_PLACES: Place[] = [
  pt("1A01106", "lisboa"), pt("11A1312", "porto"), pt("11A1304", "gondomar"), pt("1120303", "braga"), pt("1500805", "faro"), pt("1941823", "viseu"),
];
export const GONDOMAR = PT_PLACES[2];

// Abroad: only figures with a primary source. CHF converted with the ECB reference rate (ecb-eur-chf).
const chf = Number(FACTS["ecb-eur-chf"].value);
export const ABROAD: Partial<Record<EdCode, Place[]>> = {
  lu: [
    { key: "lux", name: "Luxembourg-Ville", m2: 10269, cur: "EUR", fact: "lu-m2-2026q2", note: "mean" },
    { key: "esch", name: "Esch-sur-Alzette", m2: 6427, cur: "EUR", fact: "lu-m2-2026q2", note: "mean" },
  ],
  fr: [
    { key: "paris", name: "Paris", m2: 9692, cur: "EUR", fact: "fr-m2-2026q3" },
    { key: "lyon", name: "Lyon", m2: 4400, cur: "EUR", fact: "fr-m2-2026q3" },
  ],
  ch: [{ key: "geneve", name: "Genève", m2: Math.round(10853 / chf), cur: "CHF", fact: "ch-ge-m2-2024", note: "canton" }],
};
export const GENEVA_CHF = 10853;

export const BUDGETS = [250000, 500000, 1000000];
export const m2For = (budget: number, p: Place) => Math.round(budget / p.m2);
export const INE_QUARTER = LAST;
export { INE };
