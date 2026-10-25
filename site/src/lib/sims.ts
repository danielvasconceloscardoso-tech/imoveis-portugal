// Simulator maths (prompts 12 and 13). Pure functions, run in the browser; nothing is stored or sent.
// Every rate comes from content/facts/facts.csv (ids next to each constant); update them there first.

// IMT brackets (Código do IMT, art. 17.º, n.º 1, Lei 73-A/2025): [top of bracket, marginal %, average % at the top]
// Facts: pt-imt-hpp-2026 (own permanent home), pt-imt-second-home-2026 (other homes, resident buyer).
type Bracket = [number, number, number | null];
const IMT_HPP: Bracket[] = [[106346, 0, 0], [145470, 2, 0.5379], [198347, 5, 1.7274], [330539, 7, 3.8361], [660982, 8, null]];
const IMT_OTHER: Bracket[] = [[106346, 1, 1], [145470, 2, 1.2689], [198347, 5, 2.2636], [330539, 7, 4.1578], [633931, 8, null]];
const IMT_FLAT_TOP = 1150853; // 6% flat up to this value, 7.5% above
export const IMT_NONRES = 7.5; // pt-imt-nonresident-flat (art. 17.º, n.º 10)
export const IS_PURCHASE = 0.8; // pt-is-purchase
export const IS_LOAN = 0.6; // pt-is-loan-5y
export const CASA_PRONTA = { one: 375, two: 700 }; // pt-casa-pronta-fees
export const LTV = { own: 90, other: 80 }; // pt-ltv-limits
export const DSTI = 45; // pt-dsti-45
export const RATE_DEFAULT = 3.0; // bdp-mortgage-rate-2026-08
export const RENT_TAX_NONRES = 25; // pt-rent-tax-nonresident
export const IMI_RANGE = [0.3, 0.45]; // pt-imi-rates
export const CG_SHARE = 50; // pt-cg-50pct
// IRS general rates 2026 (pt-irs-68-2026): [top of bracket, marginal %, average % at the top]
const IRS: Bracket[] = [[8342, 12.5, 12.5], [12587, 15.7, 13.579], [17838, 21.2, 15.823], [23089, 24.1, 17.705], [29397, 31.1, 20.579],
  [43090, 34.9, 25.13], [46566, 43.1, 26.472], [86634, 44.6, 34.856], [Infinity, 48, null]];

const r2 = (n: number) => Math.round(n * 100) / 100;

// Progressive table, rule of art. 17.º n.º 3 (IMT) and art. 68.º n.º 2 (IRS): the part up to the top of the
// previous bracket at that bracket's average rate, the excess at the bracket's marginal rate.
function progressive(v: number, table: Bracket[]) {
  let prevTop = 0, prevAvg = 0;
  for (const [top, marg, avg] of table) {
    if (v <= top) return prevTop * prevAvg / 100 + (v - prevTop) * marg / 100;
    prevTop = top; prevAvg = avg ?? 0; // a null average only occurs in the last progressive bracket
  }
  return 0;
}

export function imt(price: number, own: boolean, resident: boolean) {
  if (price <= 0) return 0;
  if (!resident) return r2(price * IMT_NONRES / 100);
  const table = own ? IMT_HPP : IMT_OTHER;
  const lastTop = table[table.length - 1][0];
  if (price > IMT_FLAT_TOP) return r2(price * 0.075);
  if (price > lastTop) return r2(price * 0.06);
  return r2(progressive(price, table));
}

export function purchase(price: number, own: boolean, resident: boolean, mortgage: boolean) {
  const t = imt(price, own, resident);
  const is = r2(price * IS_PURCHASE / 100);
  const deed = mortgage ? CASA_PRONTA.two : CASA_PRONTA.one;
  return { imt: t, is, deed, extra: r2(t + is + deed), total: r2(price + t + is + deed) };
}

export function payment(loan: number, ratePct: number, years: number) {
  const n = Math.round(years * 12), i = ratePct / 100 / 12;
  if (loan <= 0 || n <= 0) return 0;
  return r2(i === 0 ? loan / n : loan * i / (1 - Math.pow(1 + i, -n)));
}

export function mortgage(price: number, deposit: number, years: number, ratePct: number, own: boolean) {
  const loan = Math.max(0, price - deposit);
  const ltv = price > 0 ? (loan / price) * 100 : 0;
  const cap = own ? LTV.own : LTV.other;
  const monthly = payment(loan, ratePct, years);
  return { loan, ltv: r2(ltv), cap, overCap: ltv > cap, monthly, total: r2(monthly * years * 12), interest: r2(monthly * years * 12 - loan), stamp: r2(loan * IS_LOAN / 100) };
}

export function rental(price: number, rent: number, imiYear: number, condoMonth: number, insuranceYear: number, mgmtPct: number) {
  const gross = rent * 12;
  const costs = imiYear + condoMonth * 12 + insuranceYear + gross * mgmtPct / 100;
  const net = gross - costs;
  const tax = Math.max(0, net) * RENT_TAX_NONRES / 100; // art. 72.º n.º 2: 25% on the net (deductible costs per art. 41.º)
  return { gross: r2(gross), costs: r2(costs), net: r2(net), tax: r2(tax), after: r2(net - tax),
    grossYield: price > 0 ? r2(gross / price * 100) : 0, netYield: price > 0 ? r2(net / price * 100) : 0, afterYield: price > 0 ? r2((net - tax) / price * 100) : 0 };
}

export const imi = (vpt: number, ratePct: number) => r2(vpt * ratePct / 100);

export function dsti(income: number, instalments: number) {
  const ratio = income > 0 ? r2(instalments / income * 100) : 0;
  return { ratio, limit: DSTI, over: ratio > DSTI, room: r2(Math.max(0, income * DSTI / 100 - instalments)) };
}

// "What can I buy": the largest instalment allowed by the DSTI limit, the loan it pays at the rate and term,
// then the price capped by the LTV limit and by the deposit available.
export function afford(incomeEur: number, otherDebts: number, deposit: number, years: number, ratePct: number, own: boolean) {
  const maxInst = Math.max(0, incomeEur * DSTI / 100 - otherDebts);
  const n = years * 12, i = ratePct / 100 / 12;
  const maxLoan = maxInst <= 0 ? 0 : i === 0 ? maxInst * n : maxInst * (1 - Math.pow(1 + i, -n)) / i;
  const cap = (own ? LTV.own : LTV.other) / 100;
  // price limited by the loan + deposit, and by the deposit having to cover (1 - cap) of the price
  const byLoan = maxLoan + deposit;
  const byDeposit = cap < 1 ? deposit / (1 - cap) : Infinity;
  const price = Math.max(0, Math.min(byLoan, byDeposit));
  return { maxInst: r2(maxInst), maxLoan: Math.floor(maxLoan), price: Math.floor(price / 1000) * 1000, limitedBy: byDeposit < byLoan ? "deposit" : "income" };
}

export function irsTax(taxable: number) { return r2(progressive(Math.max(0, taxable), IRS)); }

export function gains(sale: number, buy: number, buyCosts: number, works: number, saleCosts: number) {
  const gain = sale - saleCosts - (buy + buyCosts + works);
  const taxable = Math.max(0, gain) * CG_SHARE / 100;
  return { gain: r2(gain), taxable: r2(taxable), taxIfOnly: irsTax(taxable) };
}
