// Ten years of INE prices and rents (prompt 20 §3): public/data/prices.json, built by scripts/prices_data.py.
import data from "../../public/data/prices.json";
export type PSeries = { n: string; r?: string; m2: (number | null)[]; rent: Record<string, number>; yield: number | null };
export const PRICES = data as unknown as { quarters: string[]; break: string; rentYears: number[]; regions: Record<string, PSeries>; munis: Record<string, PSeries> };
export const LAST = PRICES.quarters.length - 1;
