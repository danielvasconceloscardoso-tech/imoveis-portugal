// Every event the site can count on /e/ (night of 3 Nov 2026, part 5): build time only, for pages/e/[...p].astro.
// The browser side is lib/track.ts (ev): an event name is the /e/ path after the edition, except "map/place" (s/{place}),
// "map/time" (s/{place}/t/{band}) and "faq/open" (q/{id}), which keep their edition-free paths. An event whose page is
// not listed here still reaches the first-party store once it is on (ops/EVENTS_SETUP.md), but Cloudflare does not
// count it: add its page here first. The same list, in words: ops/METRICS_SETUP.md.
import { PROJECTS } from "./projects";
import { STATIONS } from "./path";
import { TOOLS } from "./tools";
import { flowConfig, CONCIERGE_V1_STEPS, type FlowId } from "./flows";
import { sim1Events } from "./sim1";
import { TIME_BANDS, UTM_MEDIA, MARE_WHERE, MARE_OPEN } from "./track";
import { recentIssueIds } from "./mare";
import { STORY_IDS } from "./stories";

/** The phone bottom bar's items (ev "bar/{item}"). The bar's own helper adds an item here when it adds one to the bar. */
export const BAR_ITEMS = ["home", "map", "sims", "concierge", "saved", "path", "faq", "search", "menu", "letter"];
export const LAYERS = ["none", "price", "g10", "rent", "yield", "vac"];
/** D83 part 2, the map in three depths: what the search resolved to (the kind; the place slug travels in "place", never the
 * typed text), the cards opened, the tiles, the chart's range, the comparison and the paid previews. */
export const MAP_SEARCH = ["munis", "pars", "golf", "beach", "devs"];
export const MAP_CARDS = ["muni", "parish", "region", "project", "golf"];
export const MAP_TILES = ["price", "life", "care", "compare"];
export const MAP_PAID = ["rent", "g10y", "foreign", "supply", "compare", "card"];
/** Operator, step 1 (3 Nov 2026), the golden sample card: "Fontes", the two calls to action and the gallery views seen. */
export const MAP_CARD5 = ["card/sources", "cta/paid", "cta/consult", "gallery/2", "gallery/3"];
/** Prompt 68 (4 Nov 2026), the arrival card (a place whose partner project carries a hero line): the arrival shown, each
 * development tile shown and tapped, the private viewing asked, the showcase opened, each next question opened, the last line seen. */
export const MAP_P68 = ["arrive", "hero", "hero/tap", "hero/view", "visit", "qa/life", "qa/schools", "qa/price", "qa/health", "qa/near", "more"];
export const OVERLAYS = ["golf", "beach", "devs"];
/** Fix step 3 (3 Nov): "Ver a análise completa" on the free pages turned into previews of the paid analysis
 * (components/AnalysisPreview.astro): ev "paid/preview/{id}" when the unlock sheet opens. */
export const PREVIEWS = ["prices-page", "art-prices", "art-map", "art-golf"];
/** The developer page's share: the phone's share sheet, or the link copied. */
export const SHARE = ["native", "copy"];

/** The step ids of a flow, as the reader meets them (lib/flows.ts), plus the side screens of the Concierge. */
export function flowSteps(id: FlowId): string[] {
  const cfg = flowConfig(id, "pt", "lu"), ids = cfg.steps.map((s) => s.id);
  // Prompt 69: the three steps, the optional preparation after the confirmation, and the eleven steps before it (kept).
  return id === "concierge" ? [...new Set([...ids, ...cfg.prep.map((s) => s.id), ...CONCIERGE_V1_STEPS, "lawyer", "book", "buildings"])] : ids;
}

/** Prompt 69: what the Concierge's first step was opened on (ev "flow/concierge/ctx/{k}"), the optional preparation after
 * the confirmation (ev "flow/concierge/prep/{open,sent,fallback}"), the time zone the times were shown in (ev
 * "flow/concierge/tz/{own,edition,lisbon}") and the IMT screen: opened from each surface (ev "imt/open/{from}"), the price
 * changed on it, its last line seen, the full calculator followed. */
export const CG_CTX = ["project", "place", "budget", "sim", "none"];
export const CG_PREP = ["open", "sent", "fallback"];
/** Prompt 74: the buyer profile on the confirmation: "Pronto" sent, shared with the named developer, summary opened, and
 *  a qualified profile (4 of the 5 key fields) sent with a request (ev "flow/concierge/cv/{k}"; per development "p/{id}/cvq"). */
export const CG_CV = ["ready", "share", "summary", "qualified"];
export const CG_TZ = ["own", "edition", "lisbon"];
export const IMT_FROM = ["sim1", "concierge", "map", "project", "link"];
export const IMT_ACTS = ["price", "more", "calc"];

/** Paths per edition (after "/e/{ed}/"). */
export function editionEvents(): string[] {
  const out: string[] = [];
  for (const f of ["concierge", "partner", "viewing", "lawyer"]) for (const s of ["start", "sent"]) out.push(`flow/${f}/${s}`);
  // The endpoint did not take the request and the ready-written e-mail was offered instead (3 Nov 2026).
  for (const f of ["concierge", "partner", "viewing"]) out.push(`flow/${f}/fallback`);
  for (const f of ["concierge", "partner", "viewing"] as FlowId[]) for (const s of flowSteps(f)) for (const k of ["step", "stop"]) out.push(`flow/${f}/${k}/${s}`);
  for (const p of PROJECTS) for (const k of ["pin", "card", "req", "view", "share", "film", "tour3d", "cvq", "cvshare"]) out.push(`p/${p.id}/${k}`);
  for (const k of CG_CTX) out.push(`flow/concierge/ctx/${k}`);
  for (const k of CG_CV) out.push(`flow/concierge/cv/${k}`);
  for (const k of CG_PREP) out.push(`flow/concierge/prep/${k}`);
  for (const k of CG_TZ) out.push(`flow/concierge/tz/${k}`);
  for (const f of IMT_FROM) out.push(`imt/open/${f}`);
  for (const k of IMT_ACTS) out.push(`imt/${k}`);
  for (const s of sim1Events()) out.push(`sim1/${s}`);
  for (const t of TOOLS) out.push(`sim/${t}/use`);
  for (const l of LAYERS) out.push(`map/layer/${l}`);
  for (const o of OVERLAYS) for (const s of ["on", "off"]) out.push(`map/overlay/${o}/${s}`);
  out.push("map/share");
  for (const g of MAP_SEARCH) out.push(`map/search/${g}`);
  for (const k of MAP_CARDS) out.push(`map/card/${k}`);
  for (const t of MAP_TILES) out.push(`map/tile/${t}`);
  for (const r of ["1a", "5a", "10a"]) out.push(`map/chart/${r}`);
  for (const t of MAP_PAID) out.push(`map/paid/preview/${t}`);
  for (const t of MAP_CARD5) out.push(`map/${t}`);
  for (const t of MAP_P68) out.push(`map/${t}`);
  out.push("map/compare/open", "map/compare/pair", "map/panel/open");
  // Prompt 71 §2: the south coast on the US map (Mike, M72-22: its events had no /e/ page).
  out.push("map/south", "map/south/golf");
  for (const p of PREVIEWS) out.push(`paid/preview/${p}`);
  for (const s of [...new Set(STATIONS.map((x) => x.k))]) for (const k of ["open", "done"]) out.push(`path/${s}/${k}`);
  for (const k of ["home", "region"]) for (const s of ["on", "off"]) out.push(`heart/${k}/${s}`);
  for (const b of BAR_ITEMS) out.push(`bar/${b}`);
  for (const m of UTM_MEDIA) out.push(`letter/signup/${m}`);
  // Maré (D83): signups and block taps per surface and per headline (the last 12 issues; only the latest is ever shown).
  for (const w of MARE_WHERE) for (const id of recentIssueIds()) for (const k of ["signup", "block"]) out.push(`mare/${k}/${w}/${id}`);
  for (const w of MARE_OPEN) out.push(`mare/open/${w}`);
  // D83 lifestyle articles (components/StoryPage.astro): opened, a place followed to the map (the municipality goes to
  // the first-party store only), the map tile under "Para ir", the Concierge handover.
  for (const id of STORY_IDS) for (const k of ["open", "place", "tile", "concierge"]) out.push(`art/${id}/${k}`);
  return out;
}

/** Time on a place, per municipality (after "/e/s/{place}/"). */
export const placeEvents = (): string[] => TIME_BANDS.map(([, b]) => `t/${b}`);
