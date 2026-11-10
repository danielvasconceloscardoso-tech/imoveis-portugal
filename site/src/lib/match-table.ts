/** Prompt 81: the 308-place table the matching engine reads, as one small static file (site/public/data/match.json).
 * Built by site/scripts/build-match-table.mjs from content/facts/map/services/summary.json (the services, by the data
 * engineer), src/data/prices.json (INE medians) and the map's own geography. Never edited by hand. Pure: no DOM. */
import { MEASURES, NAMES, type MatchPlace, type MeasureKey, type NameKey } from "./match";

/** One place in summary.json, as the data contract writes it. Every value may be null (unknown), never 0 for unknown. */
type Near = { min?: number | null; km?: number | null; name?: string | null; iata?: string | null } | null | undefined;
export type ServicePlace = {
  er?: Near; cs?: Near; ph?: Near; ph_n20?: number | null; pharm_n?: number | null;
  isch?: Near; isch_n30?: number | null; psch_n20?: number | null; sec_n20?: number | null;
  beach?: Near; air?: Near; rail?: Near;
  food?: { mich_n30?: number | null; mkt_n20?: number | null; rest_n?: number | null; rest_per_1k?: number | null } | null;
  golf?: Near; golf_n30?: number | null; museum?: Near; cult_n20?: number | null;
  /** Optional, outside the first contract: INE resident population, for the "quiet" taste. */
  pop?: number | null;
};
export type ServiceSummary = {
  v: number; checked?: string; fixture?: boolean;
  routing?: Record<string, string>;
  layers?: Record<string, { source?: string; licence?: string; covered?: number; note?: string }>;
  places: Record<string, ServicePlace>;
};
export type Geo = { id: string; name: string; n3: string; region: string; lat: number; lon: number; areaKm2: number | null };
export type Prices = { period: string; munis: Record<string, { priceM2: number | null; rentM2: number | null }> };

export type MatchTable = {
  v: 1;
  /** The INE quarter of the medians. */
  period: string;
  /** Where the services came from; null while summary.json does not exist. `fixture` marks made-up test data. */
  services: { checked: string | null; fixture: boolean; routing: Record<string, string> | null; layers: Record<string, { covered: number | null; source: string | null; licence: string | null }> } | null;
  /** How many places carry each measure (a number, never null). */
  covered: Record<MeasureKey, number>;
  n3: string[];
  cols: string[];
  rows: (string | number | null)[][];
};

const n = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : null);
const t = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v.trim() : null);

/** The contract's place row, flattened to the engine's measures. Unknown stays null; nothing is filled in. */
export function measuresOf(s: ServicePlace | undefined, areaKm2: number | null): { m: Record<MeasureKey, number | null>; names: Record<NameKey, string | null> } {
  const psch = n(s?.psch_n20), sec = n(s?.sec_n20), pop = n(s?.pop);
  return {
    m: {
      beach_min: n(s?.beach?.min), isch_min: n(s?.isch?.min), isch_n30: n(s?.isch_n30),
      schools_n20: psch !== null && sec !== null ? psch + sec : null,
      er_min: n(s?.er?.min), air_min: n(s?.air?.min), rail_min: n(s?.rail?.min),
      mich_n30: n(s?.food?.mich_n30), rest_per_1k: n(s?.food?.rest_per_1k),
      golf_min: n(s?.golf?.min), golf_n30: n(s?.golf_n30), cult_n20: n(s?.cult_n20),
      dens: pop !== null && areaKm2 && areaKm2 > 0 ? Math.round(pop / areaKm2 * 10) / 10 : null,
    },
    names: { beach: t(s?.beach?.name), isch: t(s?.isch?.name), er: t(s?.er?.name), air: t(s?.air?.iata), rail: t(s?.rail?.name), golf: t(s?.golf?.name) },
  };
}

const BASE = ["id", "name", "n3", "region", "lat", "lon", "priceM2", "rentM2"] as const;
export function buildMatchTable(geo: readonly Geo[], prices: Prices, summary: ServiceSummary | null): MatchTable {
  const n3 = [...new Set(geo.map(g => g.n3))].sort();
  const covered = Object.fromEntries(MEASURES.map(k => [k, 0])) as Record<MeasureKey, number>;
  const rows = [...geo].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)).map(g => {
    const p = prices.munis[g.id], { m, names } = measuresOf(summary?.places?.[g.id], g.areaKm2);
    for (const k of MEASURES) if (m[k] !== null) covered[k]++;
    return [g.id, g.name, n3.indexOf(g.n3), g.region, g.lat, g.lon, n(p?.priceM2) || null, n(p?.rentM2) || null,
      ...MEASURES.map(k => m[k]), ...NAMES.map(k => names[k])];
  });
  const layers = summary?.layers ? Object.fromEntries(Object.entries(summary.layers).map(([k, l]) => [k, { covered: n(l?.covered), source: t(l?.source), licence: t(l?.licence) }])) : {};
  return {
    v: 1, period: prices.period,
    services: summary ? { checked: t(summary.checked), fixture: summary.fixture === true, routing: summary.routing ?? null, layers } : null,
    covered, n3, cols: [...BASE, ...MEASURES, ...NAMES.map(k => `${k}_name`)], rows,
  };
}

export type MatchData = { places: MatchPlace[]; period: string; services: MatchTable["services"]; covered: MatchTable["covered"] };
/** The table back into the engine's places. Throws on a table it does not understand (wrong version or columns). */
export function decodeMatchTable(table: MatchTable): MatchData {
  if (!table || table.v !== 1 || !Array.isArray(table.cols) || !Array.isArray(table.rows)) throw new Error("match table: unknown format");
  const at = (c: string) => { const i = table.cols.indexOf(c); if (i < 0) throw new Error(`match table: column ${c} missing`); return i; };
  const base = BASE.map(at), mi = MEASURES.map(k => table.cols.indexOf(k)), ni = NAMES.map(k => table.cols.indexOf(`${k}_name`));
  const places = table.rows.map(r => {
    const m: MatchPlace["m"] = {}, names: NonNullable<MatchPlace["names"]> = {};
    MEASURES.forEach((k, j) => { m[k] = mi[j] < 0 ? null : n(r[mi[j]]); });
    NAMES.forEach((k, j) => { const v = ni[j] < 0 ? null : t(r[ni[j]]); if (v) names[k] = v; });
    return {
      id: String(r[base[0]]), name: String(r[base[1]]), n3: table.n3[r[base[2]] as number] ?? "", region: String(r[base[3]]),
      lat: Number(r[base[4]]), lon: Number(r[base[5]]), priceM2: n(r[base[6]]) || null, rentM2: n(r[base[7]]) || null,
      period: table.period, m, names,
    } satisfies MatchPlace;
  });
  return { places, period: table.period, services: table.services ?? null, covered: table.covered };
}
