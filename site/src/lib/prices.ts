// Ten years of INE prices and rents (prompts 20 §3 and 25 §1): public/data/prices.json, built by scripts/map-data/build.py.
import data from "../../public/data/prices.json";
export type PSeries = { n: string; r?: string; m2: (number | null)[]; rq: (number | null)[]; rent: Record<string, number>; yield: number | null;
  g10?: number | null; cagrP?: number | null; cagrP20?: number | null; cagrR?: number | null; mo?: { c4: number; c8: number | null; w: "up" | "steady" | "down" } | null; cmp?: string[] };
export const PRICES = data as unknown as { quarters: string[]; break: string; rentFrom: string; rentYears: number[]; mortgage: { rate: number; month: string; fact: string };
  parishMunis: string[]; regions: Record<string, PSeries>; munis: Record<string, PSeries> };
export const LAST = PRICES.quarters.length - 1;
