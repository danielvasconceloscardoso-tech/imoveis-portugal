// Cookie-free event counts (prompt 51 §3), with no server code and no cookie, consent banner or identifier.
// Cloudflare Web Analytics counts page loads only, so an event is the load of a tiny static page under /e/ (built by
// pages/e/[...p].astro, noindex), opened once in a hidden frame. The beacon on that page records its path and the
// visitor's country, nothing else; scripts/metrics/collect.mjs reads the counts back through Cloudflare's API.
// No beacon on the page (local builds, previews, the operator has not switched Web Analytics on): nothing happens.
const seen = new Set<string>();
export function track(path: string): void {
  try {
    if (seen.has(path) || !/^[a-z0-9/-]+$/.test(path)) return;
    seen.add(path);
    if (!document.querySelector('script[src*="cloudflareinsights.com/beacon"]')) return;
    const f = document.createElement("iframe");
    f.src = `/e/${path}/`; f.tabIndex = -1; f.title = ""; f.setAttribute("aria-hidden", "true");
    f.style.cssText = "position:absolute;width:1px;height:1px;border:0;opacity:0;pointer-events:none;left:-9px;top:0";
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 20000);  // removing the frame lets its beacon send on unload
  } catch { /* never in the reader's way */ }
}
/** The reader's edition from the URL (/{lang}/{ed}/...), or "xx" outside an edition. */
export const edOf = (): string => { const e = location.pathname.split("/")[2] || ""; return /^(lu|fr|ch|br|us|il)$/.test(e) ? e : "xx"; };

// ------------------------------------------------------------ the one event schema (night of 3 Nov 2026, part 5)
// DESIGN_AND_DATA.md "Data": one schema for the whole site: event, page, place, region, budget band, origin, step,
// timestamp, plus the edition and an anonymous per-tab session. One call, two outputs:
//  1. today: the /e/ counter above (the event name is the path after the edition, see pathOf), counted by Cloudflare;
//  2. only when the build sets PUBLIC_EVENTS_ENDPOINT (ops/EVENTS_SETUP.md): the same event as JSON, by sendBeacon,
//     to our own first-party store. Unset today, so nothing new leaves the page.
// Never a name, an e-mail, a phone number or a free-text answer: every field is a short slug or it is dropped.
// The full list of events and their /e/ pages: lib/events.ts and ops/METRICS_SETUP.md.
export type Ev = {
  /** a slug path, e.g. "map/layer/rent", "flow/concierge/stop/fin", "heart/home/on", "bar/map" */
  event: string;
  /** a municipality slug (map, simulator) or a project id (developer pages, hearts on homes) */
  place?: string;
  /** a region slug (simulator regions, hearts on regions) */
  region?: string;
  /** a band, never a raw amount: budget (lib/sim1.ts BUDGET_BANDS) or time on a place (TIME_BANDS) */
  band?: string;
  /** where it came from: a surface ("map", "sim1", "bar"), a share method, or the first-touch UTM "source/medium/campaign" */
  origin?: string;
  /** a step id: a flow step, a Passo a passo station, a question id */
  step?: string;
};

/** Time on a place, as a band (never raw milliseconds). */
export const TIME_BANDS: [number, string][] = [[10e3, "0-10s"], [30e3, "10-30s"], [60e3, "30-60s"], [180e3, "1-3m"], [Infinity, "3m-plus"]];
export const timeBand = (ms: number) => TIME_BANDS.find(([top]) => ms < top)![1];

const ENDPOINT = ((import.meta.env.PUBLIC_EVENTS_ENDPOINT as string | undefined) || "").trim();
const SLUG = /^[a-z0-9][a-z0-9-]{0,99}$/;
const EMAILISH = /@|%40/i;
const clean = (v: unknown, re = SLUG): string | undefined => {
  if (typeof v !== "string") return undefined;
  const s = v.trim().toLowerCase();
  return s && !EMAILISH.test(s) && re.test(s) ? s : undefined;
};

/** The anonymous session: random, this tab only (sessionStorage), never a cookie, never stored with anything personal. */
export function sid(): string {
  try {
    let s = sessionStorage.getItem("ip.sid");
    if (!s || !/^[a-f0-9]{16}$/.test(s)) {
      const b = new Uint8Array(8); crypto.getRandomValues(b);
      s = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
      sessionStorage.setItem("ip.sid", s);
    }
    return s;
  } catch { return ""; }
}

/** The /e/ page that counts an event (the two older families keep their short paths; lib/events.ts builds them all). */
export function pathOf(e: Ev, ed = edOf()): string {
  if (e.event === "map/place") return e.place ? `s/${e.place}` : "";
  if (e.event === "map/time") return e.place && e.band ? `s/${e.place}/t/${e.band}` : "";
  if (e.event === "faq/open") return e.step ? `q/${e.step}` : "";
  return `${ed}/${e.event}`;
}

/** One event: counted on /e/ today, and sent to the first-party store once the operator turns it on. */
export function ev(e: Ev): void {
  try {
    const event = clean(e.event, /^[a-z0-9][a-z0-9/-]{0,119}$/);
    if (!event) return;
    const x: Ev = { event };
    for (const k of ["place", "region", "band", "step"] as const) { const v = clean(e[k]); if (v) x[k] = v; }
    const o = clean(e.origin, /^[a-z0-9-][a-z0-9._/-]{0,119}$/); if (o) x.origin = o;
    const ed = edOf(), path = pathOf(x, ed);
    if (path) track(path);
    if (!ENDPOINT || !navigator.sendBeacon) return;
    const body = JSON.stringify({ v: 1, ...x, page: location.pathname.slice(0, 200), ed, sid: sid(), ts: new Date().toISOString().slice(0, 19) + "Z" });
    navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "text/plain;charset=UTF-8" }));
  } catch { /* never in the reader's way */ }
}

// ------------------------------------------------------------ helpers for the hearts and the phone bottom bar
/** A heart on a home (project or unit id) or a region (municipality slug): ev "heart/{kind}/{on|off}". */
export function evHeart(kind: "home" | "region", id: string, on: boolean, origin?: string): void {
  ev({ event: `heart/${kind}/${on ? "on" : "off"}`, ...(kind === "home" ? { place: id } : { region: id }), origin });
}
/** A tap on the phone bottom bar: ev "bar/{item}" (the item must be in lib/events.ts BAR_ITEMS to be counted on /e/). */
export function evBar(item: string): void { ev({ event: `bar/${item}`, origin: "bar" }); }

// ------------------------------------------------------------ first-touch UTM (letter signups)
const UTM_RE = /^[a-z0-9][a-z0-9._-]{0,59}$/;
/** On landing, keep the first utm_source / utm_medium / utm_campaign of this tab (sessionStorage, the values only). */
export function rememberUtm(): void {
  try {
    if (sessionStorage.getItem("ip.utm")) return;
    const q = new URLSearchParams(location.search), u: Record<string, string> = {};
    for (const k of ["source", "medium", "campaign"]) { const v = clean(q.get(`utm_${k}`) || "", UTM_RE); if (v) u[k] = v; }
    if (Object.keys(u).length) sessionStorage.setItem("ip.utm", JSON.stringify(u));
  } catch { /* storage off */ }
}
/** The first-touch UTM of this tab: { source, medium, campaign }, each a short slug or "-". */
export function utm(): { source: string; medium: string; campaign: string } {
  rememberUtm();
  let u: Record<string, string> = {};
  try { u = JSON.parse(sessionStorage.getItem("ip.utm") || "{}"); } catch { /* none */ }
  const g = (k: string) => clean(u[k] || "", UTM_RE) || "-";
  return { source: g("source"), medium: g("medium"), campaign: g("campaign") };
}
/** The media counted on /e/ for a letter signup; any other medium counts as "other" (the store keeps the exact one). */
export const UTM_MEDIA = ["none", "email", "newsletter", "social", "paid", "cpc", "referral", "partner", "qr", "other"];
/** Where a Maré signup or its quiet block lives (D83): the surface that brought the reader to the form. */
export const MARE_WHERE = ["home", "mare", "article", "concierge", "postcard", "path", "guide", "header", "hero"];
/** Fix step 5 (3 Nov): the header's Maré button and the line under "Começar" on the opening page, counted on arrival on
 *  the Maré page (?de=header, ?de=hero) as ev "mare/open/{where}". */
export const MARE_OPEN = ["header", "hero"];
/** A Maré signup (never the e-mail): ev "letter/signup/{medium}", origin "source/medium/campaign", step = where; and,
 *  with the issue whose headline was on screen (D83, "which headline converted"), ev "mare/signup/{where}/{issue}" with
 *  the same origin. Two counts on /e/ (by medium, by surface and headline); in the store, count either family, not both. */
export function evSignup(where: string, issue = ""): void {
  const u = utm(), m = u.medium === "-" ? "none" : UTM_MEDIA.includes(u.medium) ? u.medium : "other";
  const w = MARE_WHERE.includes(where) ? where : "mare", origin = `${u.source}/${u.medium}/${u.campaign}`;
  ev({ event: `letter/signup/${m}`, origin, step: w });
  if (/^\d{4}-\d{2}-\d{2}$/.test(issue)) ev({ event: `mare/signup/${w}/${issue}`, origin, step: w });
}
/** An arrival on the Maré page from the quiet block (components/MareBlock.astro, ?de={where}&h={issue}): ev "mare/block/{where}/{issue}". */
export function evMareBlock(where: string, issue: string): void {
  if (MARE_WHERE.includes(where) && /^\d{4}-\d{2}-\d{2}$/.test(issue)) ev({ event: `mare/block/${where}/${issue}`, origin: where });
}

// ------------------------------------------------------------ what the site already knows (never ask twice)
/** The last place the reader opened on the map in this tab (its display name), for the Concierge. */
export function rememberPlace(name: string): void { try { sessionStorage.setItem("ip.place", name); } catch { /* storage off */ } }
export function lastPlace(): string { try { return sessionStorage.getItem("ip.place") || ""; } catch { return ""; } }
/** The simulator's budget in this tab, once the reader has used it (components/Sim1.astro). */
export function rememberSimBudget(eur: number): void { try { sessionStorage.setItem("ip.sim1.budget", String(Math.round(eur))); } catch { /* storage off */ } }
export function simBudget(): number { try { return Number(sessionStorage.getItem("ip.sim1.budget")) || 0; } catch { return 0; } }
