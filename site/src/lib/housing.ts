/** The housing scenario every place finder shares (Issue 10, prompt 81): rent or buy, the budget as a share of net
 * income, and the repayment formula. No DOM, no data. Re-exported unchanged by ./regressar-places. */
export type HousingMode = "rent" | "buy";
export const HOUSING_DEFAULTS = Object.freeze({ areaM2: 80, budgetShare: 0.35, depositPercent: 20, annualRate: 3, termYears: 30 });
export type HousingAssumptions = typeof HOUSING_DEFAULTS;
export type HousingInput = {
  netMonthly: number; housingMode?: HousingMode;
  areaM2?: number; budgetShare?: number; depositPercent?: number; annualRate?: number; termYears?: number;
};
export type ResolvedHousing = { areaM2: number; budgetShare: number; depositPercent: number; annualRate: number; termYears: number; housingMode: HousingMode };

/** Nominal fixed-rate repayment; excludes insurance, bank fees and purchase taxes.
 * Rate is a scenario assumption, not a financing offer or approval. */
export function housingPayment(principal: number, annualRate: number, termYears: number): number {
  if (![principal, annualRate, termYears].every(Number.isFinite) || principal < 0 || annualRate < 0 || termYears <= 0) return NaN;
  const n = termYears * 12;
  if (annualRate === 0) return principal / n;
  const r = annualRate / 1200;
  return principal * r / (1 - Math.pow(1 + r, -n));
}

/** The assumptions with their defaults, and whether the whole input is usable (the same limits as before prompt 81). */
export function resolveHousing(input: HousingInput): { assumptions: ResolvedHousing; valid: boolean } {
  const assumptions: ResolvedHousing = {
    areaM2: input.areaM2 ?? HOUSING_DEFAULTS.areaM2,
    budgetShare: input.budgetShare ?? HOUSING_DEFAULTS.budgetShare,
    depositPercent: input.depositPercent ?? HOUSING_DEFAULTS.depositPercent,
    annualRate: input.annualRate ?? HOUSING_DEFAULTS.annualRate,
    termYears: input.termYears ?? HOUSING_DEFAULTS.termYears,
    housingMode: input.housingMode ?? "rent",
  };
  const valid = Number.isFinite(input.netMonthly) && input.netMonthly > 0 &&
    Object.values(assumptions).filter(v => typeof v === "number").every(Number.isFinite) &&
    assumptions.areaM2 > 0 && assumptions.areaM2 <= 500 && assumptions.budgetShare > 0 && assumptions.budgetShare <= 1 &&
    assumptions.depositPercent >= 0 && assumptions.depositPercent <= 100 && assumptions.annualRate >= 0 && assumptions.annualRate <= 30 &&
    assumptions.termYears >= 1 && assumptions.termYears <= 50 && ["rent", "buy"].includes(assumptions.housingMode);
  return { assumptions, valid };
}

export type HousingCost = { monthlyHousing: number; purchasePrice: number | null; deposit: number | null; loan: number | null };
/** One place's monthly cost in the scenario, unrounded; null when the median this mode needs is not published. */
export function housingCost(priceM2: number | null, rentM2: number | null, a: ResolvedHousing): HousingCost | null {
  const hasPrice = typeof priceM2 === "number" && Number.isFinite(priceM2) && priceM2 > 0;
  const purchasePrice = hasPrice ? priceM2 * a.areaM2 : null;
  const deposit = purchasePrice === null ? null : purchasePrice * a.depositPercent / 100;
  const loan = purchasePrice === null ? null : purchasePrice - deposit!;
  let monthlyHousing: number;
  if (a.housingMode === "rent") {
    if (typeof rentM2 !== "number" || !Number.isFinite(rentM2) || rentM2 <= 0) return null;
    monthlyHousing = rentM2 * a.areaM2;
  } else {
    if (loan === null) return null;
    monthlyHousing = housingPayment(loan, a.annualRate, a.termYears);
  }
  if (!Number.isFinite(monthlyHousing) || monthlyHousing < 0) return null;
  return { monthlyHousing, purchasePrice, deposit, loan };
}
