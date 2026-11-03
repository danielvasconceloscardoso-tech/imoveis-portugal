// D83 part 2: the map in three depths, the parts shared at build time by the map, the comparison page and the paid
// analysis. Data: site/public/data/map/tiles.json (scripts/map-data/tiles.py), prices.json, map/layers.json.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { config } from "../config";
import type { Lang } from "../i18n";

/** The comparison page under the map: /pt/lu/mapa/comparar/. */
export const COMPARE_SUB: Record<Lang, string> = { pt: "comparar", en: "compare", fr: "comparer" };
/** The map's seven regions (the postcards) and the paid analysis per region, plus Portugal as a whole. */
export const MAP_REGIONS = ["north", "centre", "lisbon", "alentejo", "algarve", "madeira", "azores"] as const;
export type AKey = (typeof MAP_REGIONS)[number] | "portugal";
export const ANALYSIS_SUB: Record<AKey, string> = { north: "analise-norte", centre: "analise-centro", lisbon: "analise-lisboa", alentejo: "analise-alentejo",
  algarve: "analise-algarve", madeira: "analise-madeira", azores: "analise-acores", portugal: "analise-portugal" };
/** The paid analysis pages exist only once payment is live, or in a preview build with PUBLIC_MAP_ANALYSIS_PREVIEW=1 (never on main). */
export const ANALYSIS_BUILT = config.mapAnalysis.live || (process.env.PUBLIC_MAP_ANALYSIS_PREVIEW === "1" && process.env.WORKERS_CI_BRANCH !== "main");

export type TileMuni = { n: string; r: string; c2: string; n3?: string; m2?: number; p1?: number; p5?: number; p10?: number; rng?: [number, number]; nb?: [number, number]; nbq?: number;
  sun?: number; sea?: number; bch?: number; fl?: Record<string, number>; sch?: { n: string; km: number }; hsp?: { n: string; km: number }; doc?: number; [k: string]: unknown };
export type Tiles = { q: string; of: Record<string, string>; r2: Record<string, Record<string, number>>; rg: Record<string, { c2: string; k: number; cities: string[]; lo?: number; hi?: number; m2?: number; p5?: number }>;
  m: Record<string, TileMuni>; p: Record<string, { n: string; m: string; m2: number; p1?: number; p5?: number }>; src: Record<string, { t: string; u: string; d: string }> };
export const TILES: Tiles = JSON.parse(readFileSync(join(process.cwd(), "public", "data", "map", "tiles.json"), "utf8"));
