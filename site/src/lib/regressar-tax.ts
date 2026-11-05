/** Issue 10: annual mainland Portuguese employee-income MODEL, not payroll withholding.
 * The existing, sourced 2026 art.68 table is retained verbatim (fact pt-irs-68-2026).
 * Source URLs and the current retrieval limitation travel with this version.
 */
export const TAX_2026 = Object.freeze({
  version: "PT-mainland-2026.11-model-1",
  year: 2026,
  updated: "2026-11-05",
  bracketsVerified: "2026-10-25",
  minNetAnnual: 20_000,
  maxNetAnnual: 500_000,
  employeeSocialSecurity: 0.11,
  ias: 537.13,
  specificDeduction: 4587.09, // art.25: 8.54 × IAS, rounded to cents
  regressarGrossLimit: 250_000,
  regressarExcludedShare: 0.5,
  regressarYears: 5,
  // New law-source retrieval was denied by the environment proxy. Do not call this legal verification.
  verification: "2026 brackets from the existing source register; other statutory assumptions require fiscal review. Primary pages could not be re-fetched on 2026-11-05 (proxy 403).",
  assumptions: [
    "Full-year mainland Portuguese tax resident; one employee, single, no dependants, no disability.",
    "Employment income only; no IRS Jovem, IFICI, NHR, joint assessment, other income or tax credits.",
    "Annual final-tax model before personal/household expense tax credits; not monthly withholding or a payslip quote.",
    "Low-income/minimum-existence cases are outside the supported inverse range; no result below EUR20,000 annual net.",
    "Article 12-A is a conditional comparison, never a determination of eligibility.",
    "Article 12-A-specific deduction is allocated proportionally to income remaining taxable.",
  ],
  sources: [
    { name: "CIRS · art. 68 (2026 brackets; repository fact pt-irs-68-2026)", url: "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs68.aspx" },
    { name: "CIRS · art. 25 (specific deduction)", url: "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs25.aspx" },
    { name: "CIRS · art. 68-A (solidarity)", url: "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs68a.aspx" },
    { name: "CIRS · art. 12-A (former residents)", url: "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs12a.aspx" },
    { name: "Programa Regressar · fiscal support", url: "https://www.programaregressar.gov.pt/pt/medida-de-apoio-fiscal/" },
    { name: "Segurança Social · employee contributions", url: "https://www.seg-social.pt/taxas-contributivas" },
    { name: "Segurança Social · IAS", url: "https://www.seg-social.pt/indexante-dos-apoios-sociais-ias" },
  ],
});

/** [ceiling, marginal %, average % at ceiling]; art.68(2) statutory table method. */
export const IRS_2026: readonly (readonly [number, number, number | null])[] = [
  [8342, 12.5, 12.5], [12587, 15.7, 13.579], [17838, 21.2, 15.823],
  [23089, 24.1, 17.705], [29397, 31.1, 20.579], [43090, 34.9, 25.130],
  [46566, 43.1, 26.472], [86634, 44.6, 34.856], [Infinity, 48, null],
];

export type TaxOptions = { regressar?: boolean };
export type SalaryResult = {
  grossAnnual: number; socialSecurity: number; irs: number; solidarity: number;
  taxableIncome: number; excludedIncome: number; specificDeduction: number;
  netAnnual: number; netMonthlyAverage: number; regressar: boolean;
  version: string;
};
export type TaxErrorCode = "INVALID_AMOUNT" | "UNSUPPORTED_NET_RANGE" | "INVALID_PAYMENTS";
export class TaxInputError extends RangeError {
  constructor(public code: TaxErrorCode, message: string) { super(message); this.name = "TaxInputError"; }
}
const cents = (v: number) => Math.round((v + Number.EPSILON) * 100) / 100;
function amount(v: number) {
  if (!Number.isFinite(v) || v < 0 || v > 5_000_000) throw new TaxInputError("INVALID_AMOUNT", "Use a finite, non-negative amount up to EUR5,000,000.");
}

/** General IRS only. Public for independent fixture/boundary tests. */
export function generalIrs(taxable: number): number {
  amount(taxable);
  let previousCeiling = 0, previousAverage = 0;
  for (const [ceiling, marginal, average] of IRS_2026) {
    if (taxable <= ceiling) return cents(previousCeiling * previousAverage / 100 + (taxable - previousCeiling) * marginal / 100);
    previousCeiling = ceiling; previousAverage = average ?? 0;
  }
  throw new Error("Unreachable IRS bracket");
}
export function solidarityTax(taxable: number): number {
  amount(taxable);
  return cents(Math.max(0, Math.min(taxable, 250_000) - 80_000) * .025 + Math.max(0, taxable - 250_000) * .05);
}

/** A transparent annual model. Do not use directly to quote low-income actual IRS. */
export function annualSalary(grossAnnual: number, { regressar = false }: TaxOptions = {}): SalaryResult {
  amount(grossAnnual);
  const socialSecurity = cents(grossAnnual * TAX_2026.employeeSocialSecurity);
  // Cap is the qualifying GROSS income, not EUR250k of excluded income.
  const excludedIncome = regressar ? cents(Math.min(grossAnnual, TAX_2026.regressarGrossLimit) * .5) : 0;
  const taxableShare = grossAnnual > 0 ? (grossAnnual - excludedIncome) / grossAnnual : 0;
  const specificDeduction = cents(Math.min(grossAnnual, Math.max(TAX_2026.specificDeduction, socialSecurity)) * taxableShare);
  const taxableIncome = cents(Math.max(0, grossAnnual - excludedIncome - specificDeduction));
  const irs = generalIrs(taxableIncome), solidarity = solidarityTax(taxableIncome);
  const netAnnual = cents(grossAnnual - socialSecurity - irs - solidarity);
  return { grossAnnual: cents(grossAnnual), socialSecurity, irs, solidarity, taxableIncome, excludedIncome,
    specificDeduction, netAnnual, netMonthlyAverage: cents(netAnnual / 12), regressar, version: TAX_2026.version };
}

/** Annualise the DECLARED foreign net; no foreign gross or foreign tax calculation. */
export function annualizeNet(value: number, period: "month" | "year", payments = 12): number {
  amount(value);
  if (period !== "month" && period !== "year") throw new TaxInputError("INVALID_AMOUNT", "Choose month or year.");
  if (payments !== 12 && payments !== 13 && payments !== 14) throw new TaxInputError("INVALID_PAYMENTS", "Choose 12, 13 or 14 net payments per year.");
  const total = cents(period === "year" ? value : value * payments);
  amount(total);
  return total;
}

/** Integer-cent lower-bound search; returned annual net reaches target within EUR0.05.
 * The 2026 statutory average rates are published to three decimals, creating
 * sub-euro bracket edges. Search handles their cent-level non-monotonicity by
 * returning a verified local solution rather than claiming a universal minimum.
 */
export function grossForNet(netAnnual: number, options: TaxOptions = {}): SalaryResult {
  amount(netAnnual);
  if (netAnnual < TAX_2026.minNetAnnual || netAnnual > TAX_2026.maxNetAnnual) {
    throw new TaxInputError("UNSUPPORTED_NET_RANGE", `Supported annual net: EUR${TAX_2026.minNetAnnual}–${TAX_2026.maxNetAnnual}.`);
  }
  let low = Math.floor(netAnnual * 100), high = Math.ceil(netAnnual / .35 * 100);
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (annualSalary(middle / 100, options).netAnnual >= netAnnual) high = middle;
    else low = middle + 1;
  }
  const result = annualSalary(low / 100, options);
  if (result.netAnnual < netAnnual || result.netAnnual - netAnnual > .05) throw new RangeError("No cent-accurate solution in this model.");
  return result;
}
