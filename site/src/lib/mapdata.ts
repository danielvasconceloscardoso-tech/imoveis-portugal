// Server-side view of the map data (public/data/pt-map.geojson, built by scripts/map_data.py): the searchable
// list under the map and the municipality names, without the geometry.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type MapMuni = { n: string; s: string; c: string; v: number | null; r: string; coast: boolean; city: boolean; air: boolean; x: number; y: number };
const raw = JSON.parse(readFileSync(join(process.cwd(), "public", "data", "pt-map.geojson"), "utf8"));
export const MAP_QUARTER: string = raw.quarter;
export const MAP_MUNIS: MapMuni[] = raw.features.map((f: { properties: MapMuni }) => f.properties).sort((a: MapMuni, b: MapMuni) => a.n.localeCompare(b.n, "pt"));
export const REGIONS = ["north", "centre", "lisbon", "alentejo", "algarve", "madeira", "azores"] as const;
// Verified photos by region (site/public/photos/CREDITS.md). Regions without one show a typographic card (task 16a).
export const REGION_PHOTO: Partial<Record<string, string>> = { north: "porto-ribeira-rabelo", lisbon: "lisboa-alfama-telhados" };
