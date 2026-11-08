/** Declared foreign NET income only; never estimates foreign income tax.
 * Rates are the repository's dated ECB snapshot, NOT a live November quote.
 * See content/facts/facts.csv, ecb-eur-{chf,usd,brl,ils}, checked 2026-10-25.
 */
export const FX_SNAPSHOT = Object.freeze({
  rateDate: "2026-10-23",
  checkedAt: "2026-10-25",
  source: "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml",
  archiveSource: "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml",
  provenance: "content/facts/facts.csv",
  live: false,
});

export type CountryId = "lu" | "fr" | "ch" | "br" | "us" | "il" | "pt" | "de" | "be" | "es" | "ie" | "nl" | "at" | "it";
export type SalaryCurrency = "EUR" | "CHF" | "BRL" | "USD" | "ILS";
export interface SalaryCountry {
  readonly id: CountryId;
  readonly currency: SalaryCurrency;
  /** Local-currency units per EUR. Convert local income by DIVIDING. */
  readonly perEuro: number;
  /** Null for EUR: identity conversion requires no exchange-rate observation. */
  readonly rateDate: string | null;
  readonly source: string | null;
}

const country = (id: CountryId, currency: SalaryCurrency, perEuro: number): SalaryCountry =>
  Object.freeze({ id, currency, perEuro, rateDate: currency === "EUR" ? null : FX_SNAPSHOT.rateDate,
    source: currency === "EUR" ? null : FX_SNAPSHOT.archiveSource });

export const COUNTRIES: readonly SalaryCountry[] = Object.freeze([
  country("lu", "EUR", 1),
  country("ch", "CHF", 0.9227),
  country("fr", "EUR", 1),
  country("us", "USD", 1.1193),
  country("br", "BRL", 5.6485),
  country("il", "ILS", 3.4939),
  country("pt", "EUR", 1),
  ...(["de", "be", "es", "ie", "nl", "at", "it"] as const).map(id => country(id, "EUR", 1)),
]);

export function getCountry(id: string): SalaryCountry {
  const found = COUNTRIES.find((entry) => entry.id === id);
  if (!found) throw new RangeError("Unsupported source country");
  return found;
}

/** Keep precision through annualization and inversion; round display values only. */
export function convertNetToEuro(amount: number, countryId: string): number {
  if (!Number.isFinite(amount) || amount < 0) throw new RangeError("Net income must be finite and non-negative");
  return amount / getCountry(countryId).perEuro;
}

export const SALARY_CURRENCIES = Object.freeze([...new Set(COUNTRIES.map(c => c.currency))]);
/** Currency is explicitly selectable: residence does not determine pay currency. */
export function getSalaryCurrency(code:string):SalaryCountry {
 const quote=COUNTRIES.find(c=>c.currency===code);
 if(!quote)throw new RangeError('Unsupported salary currency');
 return quote;
}
export function convertCurrencyNetToEuro(amount:number,code:string):number {
 if(!Number.isFinite(amount)||amount<0)throw new RangeError('Net income must be finite and non-negative');
 return amount/getSalaryCurrency(code).perEuro;
}
