// The one-screen simulator at the top of the calculators page (night of 3 Nov 2026, part 3): budget, region, use and
// how the reader pays, results live. Maths: ./sims.ts only (purchase, mortgage); prices per m²: public/data/prices.json.
// Shared by the component (build time), its script (browser) and the event pages (pages/e/[...p].astro).
import * as S from "./sims";

/** The regions the site already features, as INE municipalities (prices.json keys, the map's ?place=). `sub` = the
 *  area people know the municipality by; Comporta is a parish of Alcácer do Sal, Melides and Carvalhal are in Grândola. */
export const SIM1_REGIONS: { id: string; sub?: string }[] = [
  { id: "lisboa" }, { id: "porto" }, { id: "cascais" }, { id: "alcacer-do-sal", sub: "Comporta" }, { id: "grandola", sub: "Melides" },
  { id: "loule", sub: "Algarve" }, { id: "funchal", sub: "Madeira" }, { id: "peso-da-regua", sub: "Douro" }, { id: "sintra" }, { id: "braga", sub: "Minho" },
];
export const SIM1_YEARS = 30;
export const SIM1_ENTRY = { min: 10, max: 90, step: 5, def: 20 };

// Bands, never raw amounts, in the events (DESIGN_AND_DATA.md: one event schema, budget band).
export const BUDGET_BANDS: [number, string][] = [[200000, "0-200k"], [300000, "200-300k"], [500000, "300-500k"], [1e6, "500k-1m"], [2e6, "1-2m"], [5e6, "2-5m"], [Infinity, "5m-plus"]];
export const budgetBand = (eur: number) => BUDGET_BANDS.find(([top]) => eur <= top)![1];
export const entryBand = (pct: number) => String(Math.max(SIM1_ENTRY.min, Math.min(SIM1_ENTRY.max, Math.floor(pct / 10) * 10)));

/** Every event the tool can send, after "{ed}/sim1/" (each one is a static page under /e/, lib/track.ts). */
export function sim1Events(): string[] {
  const out: string[] = [];
  for (const [, b] of BUDGET_BANDS) out.push(`budget/${b}`);
  for (let e = SIM1_ENTRY.min; e <= SIM1_ENTRY.max; e += 10) out.push(`entry/${e}`);
  for (const r of SIM1_REGIONS) out.push(`region/${r.id}`);
  for (const t of ["apartment", "house"]) out.push(`type/${t}`);
  for (const u of ["live", "away"]) out.push(`use/${u}`);
  for (const p of ["cash", "loan"]) out.push(`pay/${p}`);
  for (const r of ["costs", "loan", "buys"]) out.push(`row/${r}`);
  for (const n of ["homes", "save", "unsave", "concierge", "cost-detail", "payment-detail"]) out.push(`next/${n}`);
  return out;
}

// Budget slider: the same log scale as the calculators (Sim.astro), 100 k€ to 10 M€.
export const toVal = (p: number) => { const x = 1e5 * Math.pow(100, p / 1000); const st = x < 1e6 ? 5000 : x < 5e6 ? 25000 : 50000; return Math.round(x / st) * st; };
export const toPos = (x: number) => Math.round((1000 * Math.log(Math.min(Math.max(x, 1e5), 1e7) / 1e5)) / Math.log(100));

export type Sim1State = { price: number; region: string; type: "apartment" | "house"; use: "live" | "away"; pay: "cash" | "loan"; entry: number };
export const SIM1_DEFAULT: Sim1State = { price: 400000, region: "lisboa", type: "apartment", use: "away", pay: "loan", entry: SIM1_ENTRY.def };

/** The whole result, from the calculators' own functions: "Para viver" = own permanent home of a tax resident
 *  (Código do IMT art. 17.º n.º 1 al. a), LTV 90%); "Férias ou investimento" = non-resident buyer (n.º 10, LTV 80%). */
export function sim1(st: Sim1State, m2: Record<string, number>) {
  const own = st.use === "live", resident = own, loan = st.pay === "loan";
  const buy = S.purchase(st.price, own, resident, loan);
  const deposit = Math.round(st.price * st.entry / 100);
  const credit = loan ? S.mortgage(st.price, deposit, SIM1_YEARS, S.RATE_DEFAULT, own) : null;
  const area = Object.fromEntries(Object.entries(m2).map(([id, v]) => [id, v > 0 ? Math.round(st.price / v) : 0]));
  return { own, resident, loan, buy, deposit, credit, area, rate: S.RATE_DEFAULT, years: SIM1_YEARS };
}
