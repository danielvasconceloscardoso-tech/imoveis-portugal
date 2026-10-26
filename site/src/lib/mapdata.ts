// Server-side view of the map data (public/data/map/munis.topo.json and public/data/prices.json, built by
// scripts/map-data/build.py): the searchable list under the map and the names, without the geometry.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PRICES, LAST } from "./prices";

export type MapMuni = { id: number; n: string; s: string; c: string; v: number | null; r: string; coast: boolean; city: boolean; air: boolean; x: number; y: number; plain: string };
const topo = JSON.parse(readFileSync(join(process.cwd(), "public", "data", "map", "munis.topo.json"), "utf8"));
const plain = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
export const MAP_QUARTER: string = PRICES.quarters[LAST];
export const MAP_MUNIS: MapMuni[] = topo.objects.m.geometries
  .map((g: { properties: Omit<MapMuni, "v" | "plain"> }) => ({ ...g.properties, v: PRICES.munis[g.properties.s]?.m2[LAST] ?? null, plain: plain(g.properties.n) }))
  .sort((a: MapMuni, b: MapMuni) => a.n.localeCompare(b.n, "pt"));
export const REGIONS = ["north", "centre", "lisbon", "alentejo", "algarve", "madeira", "azores"] as const;
// Verified photos by region (site/public/photos/CREDITS.md). Regions without one show a typographic card (task 16a).
export const REGION_PHOTO: Partial<Record<string, string>> = { north: "porto-ribeira-rabelo", lisbon: "lisboa-alfama-telhados" };

// Area briefs (prompt 25 §2.4): generated each quarter from the data by scripts/map-data/briefs.py into
// content/map/briefs/{quarter}.json, and shown only once a person has reviewed them ("reviewed": true per concelho).
const briefFile = join(process.cwd(), "..", "content", "map", "briefs", `${MAP_QUARTER}.json`);
type Brief = { reviewed: boolean; pt: string; en: string; fr: string };
const raw: Record<string, Brief> = existsSync(briefFile) ? JSON.parse(readFileSync(briefFile, "utf8")).briefs : {};
export const BRIEFS: Record<string, Record<string, string>> = Object.fromEntries((["pt", "en", "fr"] as const).map((l) =>
  [l, Object.fromEntries(Object.entries(raw).filter(([, b]) => b.reviewed).map(([s, b]) => [s, b[l]]))]));
