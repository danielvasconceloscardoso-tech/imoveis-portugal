// Prompt 71 §1 (US edition, EN only): "Closer than you think". Every nonstop from the US to Portugal and the domestic trip
// Americans already make, from the US Department of Transportation's own data (content/facts/flights/, SOURCES.md there):
// T-100 International Segment for the routes, their seasons and, for US carriers, the time flown gate to gate; the
// On-Time Reporting files for the domestic trips (same measure, same months: Jan-Jul 2026). Azores Airlines' own timetable
// for "leave after dinner, land for breakfast". Every row carries its facts.csv id; a row whose fact is missing is dropped.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { FACTS } from "./content";

const dir = join(process.cwd(), "..", "content", "facts", "flights");
const rows = (f: string) => {
  const [h, ...r] = readFileSync(join(dir, f), "utf8").trim().split(/\r?\n/).map((l) => l.split(","));
  return r.map((x) => Object.fromEntries(h.map((k, i) => [k, x[i] ?? ""])) as Record<string, string>);
};
export type Route = { o: string; d: string; car: string; airline: string; season: string; min: number | null; mi: number; fact: string };
export type Domestic = { o: string; d: string; min: number; mi: number; fact: string };
export const ROUTES: Route[] = rows("us_nonstops.csv").filter((r) => r.shown === "1" && FACTS[r.fact])
  .map((r) => ({ o: r.origin, d: r.dest, car: r.carrier, airline: r.carrier_name, season: r.season, min: r.gate_min_2026 ? Number(r.gate_min_2026) : null, mi: Number(r.distance_mi), fact: r.fact }));
export const DOMESTIC: Domestic[] = rows("us_domestic.csv").filter((r) => FACTS[r.fact])
  .map((r) => ({ o: r.origin, d: r.dest, min: Number(r.gate_min), mi: Number(r.distance_mi), fact: r.fact }));

export const AIRPORT: Record<string, string> = { JFK: "JFK", EWR: "Newark", BOS: "Boston", IAD: "Dulles", PHL: "Philadelphia", MIA: "Miami", ORD: "O'Hare", SFO: "San Francisco", LAX: "Los Angeles",
  LIS: "Lisbon", OPO: "Porto", FAO: "Faro", FNC: "Madeira", PDL: "Ponta Delgada", TER: "Terceira", HNL: "Honolulu" };
// The time zone of each place, for the live clock (Intl does the daylight-saving changes).
export const TZ: Record<string, string> = { JFK: "America/New_York", EWR: "America/New_York", BOS: "America/New_York", IAD: "America/New_York", PHL: "America/New_York", MIA: "America/New_York",
  ORD: "America/Chicago", SFO: "America/Los_Angeles", LAX: "America/Los_Angeles", LIS: "Europe/Lisbon", PDL: "Atlantic/Azores" };

// The cities (the picker): each one's airports, the domestic trip shown beside the flight to Portugal, and the flight
// to Portugal with a reported time (a US carrier's, to Lisbon) where there is one.
type CityDef = { id: string; name: string; apts: string[]; dom: [string, string]; far?: [string, string]; pt?: [string, string, string] };
const DEFS: CityDef[] = [
  { id: "new-york", name: "New York", apts: ["JFK", "EWR"], dom: ["JFK", "LAX"], far: ["JFK", "HNL"], pt: ["JFK", "LIS", "DL"] },
  { id: "boston", name: "Boston", apts: ["BOS"], dom: ["BOS", "LAX"], pt: ["BOS", "LIS", "DL"] },
  { id: "philadelphia", name: "Philadelphia", apts: ["PHL"], dom: ["PHL", "LAX"], pt: ["PHL", "LIS", "AA"] },
  { id: "washington", name: "Washington", apts: ["IAD"], dom: ["IAD", "LAX"], pt: ["IAD", "LIS", "UA"] },
  { id: "miami", name: "Miami", apts: ["MIA"], dom: ["MIA", "LAX"] },
  { id: "chicago", name: "Chicago", apts: ["ORD"], dom: ["ORD", "LAX"], far: ["ORD", "HNL"] },
  { id: "san-francisco", name: "San Francisco", apts: ["SFO"], dom: ["SFO", "JFK"] },
  { id: "los-angeles", name: "Los Angeles", apts: ["LAX"], dom: ["LAX", "JFK"] },
];
const dom = (o: string, d: string) => DOMESTIC.find((x) => x.o === o && x.d === d) ?? null;
export type City = { id: string; name: string; apts: string[]; tz: string; dom: Domestic | null; far: Domestic | null; pt: Route | null; routes: Route[] };
export const CITIES: City[] = DEFS.map((c) => ({
  id: c.id, name: c.name, apts: c.apts, tz: TZ[c.apts[0]], dom: dom(...c.dom), far: c.far ? dom(...c.far) : null,
  pt: c.pt ? ROUTES.find((r) => r.o === c.pt![0] && r.d === c.pt![1] && r.car === c.pt![2] && r.min) ?? null : null,
  routes: ROUTES.filter((r) => c.apts.includes(r.o)),
})).filter((c) => c.routes.length);

// Leave after dinner, land for breakfast: Azores Airlines' own timetable (winter 2026-27), New York and Boston to the Azores.
export const NIGHT = [
  { city: "new-york", from: "JFK", to: "PDL", dep: "9:20 pm", arr: "6:55 am", airline: "Azores Airlines", fact: "flight-jfk-pdl-azores-airlines" },
  { city: "boston", from: "BOS", to: "PDL", dep: "9:25 pm", arr: "6:20 am", airline: "Azores Airlines", fact: "flight-bos-pdl-azores-airlines" },
].filter((n) => FACTS[n.fact]);

/** "6 h 45" */
export const hm = (m: number) => `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`;
/** The facts behind the page, for "Sources" (each once, in the order used). */
export const closerFacts = () => [...new Set([...DOMESTIC.map((d) => d.fact), ...ROUTES.map((r) => r.fact), ...NIGHT.map((n) => n.fact)])].map((id) => FACTS[id]).filter(Boolean);
