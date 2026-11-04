// The buyer CV (prompt 74; D54 qualified summary, D79 "O meu Portugal"): built in the reader's browser from what they
// already did, never asked twice. Sources: the edition (the country they live in), the simulator (price, use, credit,
// down payment, total cost, IMT), the map (places opened, with the time spent; favorites), the Concierge (budget, the
// development or place they came from), the Maré game (the concelho chosen for the prize, when the game writes it) and
// the reader's own answers on the confirmation (timeline, NIF, residency) or edits of any line.
// Everything stays on the device (localStorage "ip.cv" plus the stores it reads) until the reader sends a request: the
// CV then travels with it to Imóveis Portugal and the partner agency only, as the request does (D14, D84). A developer
// gets it only if the reader ticks the unticked box naming that developer (D54, D79). Never a name, e-mail or phone here.
// A readable list, never a score: "qualified" (4 of the 5 key fields filled) is only counted for the sponsor report.
import * as saved from "./saved";
import { purchase, imt } from "./sims";

export type Src = "edition" | "simulator" | "map" | "concierge" | "answers" | "favorites" | "mare";
export type Key = "country" | "budget" | "use" | "fin" | "total" | "timeline" | "nif" | "resident" | "interest" | "time";
/** The fields that count for the completeness figure, and the five key fields of a qualified buyer (prompt 74 §4.3). */
export const SCORED: Key[] = ["country", "budget", "use", "fin", "timeline", "nif", "resident", "interest"];
export const KEY5: Key[] = ["country", "budget", "use", "timeline", "fin"];
export const BUDGETS = ["1", "2", "3", "4"], TIMELINES = ["6", "12", "later"], YESNO = ["yes", "no"], RESIDENT = ["yes", "no", "maybe"];

type Store = { a: Partial<Record<Key, string>>; add: string[]; drop: string[]; ctx?: Ctx; t?: number };
/** What the Concierge knew when the request left (kept so the confirmation and the summary can show it). */
export type Ctx = { edition?: string; budget?: string; help?: string; project?: { id: string; name: string; developer?: string; place?: string; from?: number | null }; place?: string };
export type Sim = { price: number; region?: string; regionName?: string; use: "live" | "away"; pay: "cash" | "loan"; entry: number };

const read = <T>(k: string, d: T): T => { try { const v = JSON.parse(localStorage.getItem(k) || "null"); return v ?? d; } catch { return d; } };
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode: nothing kept */ } };
const STORE = "ip.cv";
export const store = (): Store => { const s = read<Store>(STORE, { a: {}, add: [], drop: [] }); return { a: s.a || {}, add: s.add || [], drop: s.drop || [], ctx: s.ctx, t: s.t }; };
const put = (s: Store) => write(STORE, { ...s, t: Date.now() });

/** The reader's own answer or edit of one line ("" clears it). */
export function setAnswer(k: Key, v: string) { const s = store(); if (v) s.a[k] = v; else delete s.a[k]; put(s); }
/** A place typed or tapped by the reader (J2-02: separate places, up to three). */
export function addPlace(name: string) { const s = store(), n = name.trim(); if (!n) return; s.drop = s.drop.filter((x) => x !== n); if (!s.add.includes(n)) s.add = [...s.add, n].slice(-3); put(s); }
export function dropPlace(name: string) { const s = store(); s.add = s.add.filter((x) => x !== name); if (!s.drop.includes(name)) s.drop.push(name); put(s); }
/** The Concierge's context, written when a request is sent. */
export function setCtx(ctx: Ctx) { const s = store(); s.ctx = ctx; put(s); }

/** The simulator writes its state here on every result (components/Sim1.astro); the calculators write "ip.sims". */
export function saveSim1(st: Sim) { write("ip.sim1", st); }
function sim(): Sim | null {
  const s = read<Sim | null>("ip.sim1", null);
  if (s && s.price > 0) return s;
  const c = read<Record<string, { v: Record<string, number | boolean> }>>("ip.sims", {}).cost;
  const p = Number(c?.v.price);
  return p > 0 ? { price: p, use: c!.v.own ? "live" : "away", pay: c!.v.mortgage ? "loan" : "cash", entry: 0 } : null;
}

export type Field = { k: Key; v: string; src: Src };
export type Built = { fields: Field[]; pct: number; qualified: boolean; price: number; sim: Sim | null; ctx: Ctx; interest: { name: string; src: Src; ms?: number }[] };
export const band = (eur: number) => (eur <= 300000 ? "1" : eur <= 1e6 ? "2" : eur <= 5e6 ? "3" : "4");

/** Everything known, newest source first: the reader's own answers win, then the Concierge, the simulator, the map. */
export function build(live: Ctx = {}): Built {
  const s = store(), a = s.a, ctx: Ctx = { ...(s.ctx || {}), ...Object.fromEntries(Object.entries(live).filter(([, v]) => v)) };
  const sm = sim(), out: Field[] = [];
  const f = (k: Key, v: string | undefined, src: Src) => { if (v) out.push({ k, v, src }); };
  f("country", a.country || ctx.edition, a.country ? "answers" : "edition");
  const price = ctx.project?.from || sm?.price || 0;  // the development the request is about, else the simulator's price
  f("budget", a.budget || ctx.budget || (sm ? band(sm.price) : ctx.project?.from ? band(ctx.project.from) : ""), a.budget ? "answers" : ctx.budget ? "concierge" : sm ? "simulator" : "concierge");
  f("use", a.use || sm?.use, a.use ? "answers" : "simulator");
  f("fin", a.fin || (sm ? (sm.pay === "loan" ? `loan:${sm.entry || ""}` : "cash") : ""), a.fin ? "answers" : "simulator");
  if (sm) f("total", String(Math.round(purchase(sm.price, sm.use === "live", sm.use === "live", sm.pay === "loan").total)), "simulator");
  for (const k of ["timeline", "nif", "resident"] as Key[]) f(k, a[k], "answers");
  // Interest: the development and place of the request, the favorites, the places opened on the map, the Maré concelho,
  // the places the reader added; anything the reader removed stays out.
  const dwell = read<Record<string, number>>("ip.dwell", {});
  const list: { name: string; src: Src; ms?: number }[] = [];
  const add = (name: string | undefined, src: Src) => { const n = (name || "").trim(); if (n && !s.drop.includes(n) && !list.some((x) => x.name === n)) list.push({ name: n, src, ms: dwell[n] }); };
  add(ctx.project?.name, "concierge"); add(ctx.place, "concierge");
  for (const it of saved.get()) add(it.label.split(",")[0], "favorites");
  for (const p of read<string[]>("ip.places", [])) add(p, "map");
  add(read<string>("ip.mare.place", ""), "mare");
  for (const p of s.add) add(p, "answers");
  // D54: everything sent is shown to the buyer first. The time spent on each place only orders the interest (the place the
  // reader came from stays first, then the longest looked at); the minutes themselves are never sent.
  const [head, ...rest] = list;
  const interest = (head ? [head, ...rest.sort((a, b) => (b.ms ?? 0) - (a.ms ?? 0))] : []).slice(0, 6);
  f("interest", interest.map((x) => x.name).join(", "), interest[0]?.src ?? "map");
  const has = (k: Key) => out.some((x) => x.k === k);
  const pct = Math.round((100 * SCORED.filter(has).length) / SCORED.length);
  return { fields: out, pct, qualified: KEY5.filter(has).length >= 4, price, sim: sm, ctx, interest };
}

/** The IMT a non-resident pays at this price, and what comes back if the home becomes a resident's own permanent home. */
export const refund = (price: number) => (price > 0 ? Math.max(0, Math.round(imt(price, false, false) - imt(price, true, true))) : 0);
export const costs = (sm: Sim) => purchase(sm.price, sm.use === "live", sm.use === "live", sm.pay === "loan");

/** The labels a page passes in (COPY_DECK "cv.*", built by lib/flows.ts cvLabels). */
export type CvL = Record<string, string>;
/** One readable value for a field, in the reader's language. */
export function show(fl: Field, L: CvL, eur: (v: number) => string): string {
  const v = fl.v;
  switch (fl.k) {
    case "country": return L[`country.${v}`] || v;
    case "budget": return L[`budget.${v}`] || v;
    case "use": return L[`use.${v}`] || v;
    case "fin": { if (v === "cash") return L["fin.cash"]; const p = v.split(":")[1]; return p ? L["fin.loan.p"].replace("{p}", p) : L["fin.loan"]; }
    case "total": return `≈ ${eur(Number(v))}`;
    case "timeline": return L[`timeline.${v}`] || v;
    case "nif": return L[`nif.${v}`] || v;
    case "resident": return L[`resident.${v}`] || v;
    default: return v;
  }
}
/** "Vive em: Luxemburgo", "Para viver", "Com crédito, entrada 20%": a label only where the value needs one. */
export function line(fl: Field, L: CvL, eur: (v: number) => string): string {
  const v = show(fl, L, eur);
  return fl.k === "use" || fl.k === "fin" ? v : fl.k === "total" ? `${L["k.total"]} ${v}` : `${L[`k.${fl.k}`]}${L.sep || ": "}${v}`;
}
/** What goes to /api/request: every field with its label, value and source, the completeness and the consent. */
export function payload(b: Built, L: CvL, eur: (v: number) => string, share?: { developer: string; project: string; text: string; ticked: boolean }) {
  return {
    pct: b.pct, qualified: b.qualified,
    fields: b.fields.map((x) => ({ k: x.k, l: L[`k.${x.k}`] || x.k, v: show(x, L, eur), src: L[`src.${x.src}`] || x.src })),
    ...(share ? { share } : {}),
  };
}
