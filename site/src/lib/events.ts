// Every event the site can count on /e/ (night of 3 Nov 2026, part 5): build time only, for pages/e/[...p].astro.
// The browser side is lib/track.ts (ev): an event name is the /e/ path after the edition, except "map/place" (s/{place}),
// "map/time" (s/{place}/t/{band}) and "faq/open" (q/{id}), which keep their edition-free paths. An event whose page is
// not listed here still reaches the first-party store once it is on (ops/EVENTS_SETUP.md), but Cloudflare does not
// count it: add its page here first. The same list, in words: ops/METRICS_SETUP.md.
import { PROJECTS } from "./projects";
import { STATIONS } from "./path";
import { TOOLS } from "./tools";
import { flowConfig, type FlowId } from "./flows";
import { sim1Events } from "./sim1";
import { TIME_BANDS, UTM_MEDIA, MARE_WHERE } from "./track";
import { recentIssueIds } from "./mare";

/** The phone bottom bar's items (ev "bar/{item}"). The bar's own helper adds an item here when it adds one to the bar. */
export const BAR_ITEMS = ["home", "map", "sims", "concierge", "saved", "path", "faq", "search", "menu", "letter"];
export const LAYERS = ["price", "g10", "rent", "yield", "vac"];
export const OVERLAYS = ["golf", "beach", "devs"];
/** The developer page's share: the phone's share sheet, or the link copied. */
export const SHARE = ["native", "copy"];

/** The step ids of a flow, as the reader meets them (lib/flows.ts), plus the side screens of the Concierge. */
export function flowSteps(id: FlowId): string[] {
  const ids = flowConfig(id, "pt", "lu").steps.map((s) => s.id);
  return id === "concierge" ? [...ids, "lawyer", "book", "buildings"] : ids;
}

/** Paths per edition (after "/e/{ed}/"). */
export function editionEvents(): string[] {
  const out: string[] = [];
  for (const f of ["concierge", "partner", "viewing", "lawyer"]) for (const s of ["start", "sent"]) out.push(`flow/${f}/${s}`);
  // The endpoint did not take the request and the ready-written e-mail was offered instead (3 Nov 2026).
  for (const f of ["concierge", "partner", "viewing"]) out.push(`flow/${f}/fallback`);
  for (const f of ["concierge", "partner", "viewing"] as FlowId[]) for (const s of flowSteps(f)) for (const k of ["step", "stop"]) out.push(`flow/${f}/${k}/${s}`);
  for (const p of PROJECTS) for (const k of ["pin", "card", "req", "view", "share"]) out.push(`p/${p.id}/${k}`);
  for (const s of sim1Events()) out.push(`sim1/${s}`);
  for (const t of TOOLS) out.push(`sim/${t}/use`);
  for (const l of LAYERS) out.push(`map/layer/${l}`);
  for (const o of OVERLAYS) for (const s of ["on", "off"]) out.push(`map/overlay/${o}/${s}`);
  out.push("map/share");
  for (const s of [...new Set(STATIONS.map((x) => x.k))]) for (const k of ["open", "done"]) out.push(`path/${s}/${k}`);
  for (const k of ["home", "region"]) for (const s of ["on", "off"]) out.push(`heart/${k}/${s}`);
  for (const b of BAR_ITEMS) out.push(`bar/${b}`);
  for (const m of UTM_MEDIA) out.push(`letter/signup/${m}`);
  // Maré (D83): signups and block taps per surface and per headline (the last 12 issues; only the latest is ever shown).
  for (const w of MARE_WHERE) for (const id of recentIssueIds()) for (const k of ["signup", "block"]) out.push(`mare/${k}/${w}/${id}`);
  return out;
}

/** Time on a place, per municipality (after "/e/s/{place}/"). */
export const placeEvents = (): string[] => TIME_BANDS.map(([, b]) => `t/${b}`);
