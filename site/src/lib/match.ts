/** Prompt 81: the one place-matching engine. Pure: no DOM, no fetch, no dates, no randomness. Browser and Node.
 *
 * What it does, in order (the reader's version is docs/MATCHING.md):
 *  1. Budget is a hard limit: a place whose monthly housing cost (unrounded) is above the budget is left out.
 *  2. Each chosen taste gets a score from 0 to 1 per place, from drive times and counts (TASTE_RULES below), rounded
 *     to two decimals. A place with no data for a taste gets no score for it and says "no data"; it is never a zero.
 *  3. Points = sum of weight x score. Essential weighs 3, nice to have weighs 1 (WEIGHTS). Nothing else enters.
 *  4. An essential taste that scores 0, or has no data, leaves the place out, with the reason kept in `excluded`.
 *  5. Order: most points, then the lower monthly cost, then the slug. Then the regional spread: at most two places
 *     per NUTS III region in the first five (spreadByRegion).
 * Sponsors, partners and projects are not an input: nothing in this file can read them. */
import { resolveHousing, housingCost, type HousingInput, type HousingMode, type ResolvedHousing } from "./housing";

export type Taste = "beach" | "isch" | "schools" | "health" | "airport" | "train" | "food" | "golf" | "culture" | "quiet";
export const TASTES: readonly Taste[] = ["beach", "isch", "schools", "health", "airport", "train", "food", "golf", "culture", "quiet"];
/** Names used before prompt 81 (lib/regressar-places Preference) and plain words, mapped to a taste. */
export const TASTE_ALIASES: Readonly<Record<string, Taste>> = { art: "culture", hospital: "health", "international-school": "isch", rail: "train" };
export const toTaste = (name: unknown): Taste | null => {
  if (typeof name !== "string") return null;
  const t = (TASTE_ALIASES[name] ?? name) as Taste;
  return TASTES.includes(t) ? t : null;
};

export type Importance = "essential" | "nice";
/** The only weights there are. The page shows them next to each choice. */
export const WEIGHTS: Readonly<Record<Importance, number>> = Object.freeze({ essential: 3, nice: 1 });
export type TasteChoice = { taste: Taste; importance: Importance };
/** The regional spread: at most MAX_PER_REGION places from one NUTS III region in the first TOP_N results. */
export const TOP_N = 5;
export const MAX_PER_REGION = 2;

export type MeasureKey =
  | "beach_min" | "isch_min" | "isch_n30" | "sec_n20" | "er_min" | "air_min" | "rail_min"
  | "mich_n30" | "mkt_n20" | "golf_min" | "golf_n30" | "cult_n20" | "dens";
export const MEASURES: readonly MeasureKey[] = ["beach_min", "isch_min", "isch_n30", "sec_n20", "er_min", "air_min", "rail_min", "mich_n30", "mkt_n20", "golf_min", "golf_n30", "cult_n20", "dens"];
export type NameKey = "beach" | "isch" | "er" | "air" | "rail" | "golf";
export const NAMES: readonly NameKey[] = ["beach", "isch", "er", "air", "rail", "golf"];
/** Which facility name goes with a measure, when the table carries one. */
export const NAME_OF: Partial<Record<MeasureKey, NameKey>> = { beach_min: "beach", isch_min: "isch", er_min: "er", air_min: "air", rail_min: "rail", golf_min: "golf" };

export type MatchPlace = {
  id: string; name: string;
  /** NUTS III region (the spread rule) and the site's seven regions (north, centre, lisbon, alentejo, algarve, azores, madeira). */
  n3: string; region: string;
  lat: number; lon: number;
  /** INE medians, EUR per m2; null where INE publishes none. Never estimated. */
  priceM2: number | null; rentM2: number | null; period: string;
  /** Measures from content/facts/map/services/summary.json; null or absent = no data. */
  m: Partial<Record<MeasureKey, number | null>>;
  names?: Partial<Record<NameKey, string>>;
};

/** One part of a taste's score. `near`: drive minutes, 1 at `full` or less, 0 at `zero` or more, a straight line between.
 * `count`: 0 at none, 1 at `full` or more, a straight line between. `sparse`: residents per km2, 1 at `full` or fewer,
 * 0 at `zero` or more, a straight line on the log10 scale between. `share`: the part's share of the taste's score. */
export type Rule =
  | { key: MeasureKey; kind: "near"; full: number; zero: number; share: number }
  | { key: MeasureKey; kind: "count"; full: number; share: number }
  | { key: MeasureKey; kind: "sparse"; full: number; zero: number; share: number };
/** The curves, in numbers. docs/MATCHING.md prints this table; the tests recompute every score from it by hand.
 * Left out on purpose (the data engineer rates them weak, OpenStreetMap mapping being uneven): restaurants per 1,000
 * residents, private schools within 20 minutes and the pharmacy count. They never enter a score. */
export const TASTE_RULES: Readonly<Record<Taste, readonly Rule[]>> = Object.freeze({
  beach: [{ key: "beach_min", kind: "near", full: 10, zero: 45, share: 1 }],
  isch: [{ key: "isch_min", kind: "near", full: 10, zero: 45, share: 0.7 }, { key: "isch_n30", kind: "count", full: 4, share: 0.3 }],
  schools: [{ key: "sec_n20", kind: "count", full: 5, share: 1 }],
  health: [{ key: "er_min", kind: "near", full: 10, zero: 45, share: 1 }],
  airport: [{ key: "air_min", kind: "near", full: 20, zero: 90, share: 1 }],
  train: [{ key: "rail_min", kind: "near", full: 10, zero: 45, share: 1 }],
  food: [{ key: "mich_n30", kind: "count", full: 10, share: 0.7 }, { key: "mkt_n20", kind: "count", full: 5, share: 0.3 }],
  golf: [{ key: "golf_min", kind: "near", full: 10, zero: 45, share: 0.6 }, { key: "golf_n30", kind: "count", full: 10, share: 0.4 }],
  culture: [{ key: "cult_n20", kind: "count", full: 20, share: 1 }],
  quiet: [{ key: "dens", kind: "sparse", full: 30, zero: 3000, share: 1 }],
});

const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : null);
/** One part's score, 0 to 1, unrounded; null when the value is unknown. */
export function partScore(rule: Rule, value: unknown): number | null {
  const v = num(value);
  if (v === null) return null;
  if (rule.kind === "count") return Math.min(v, rule.full) / rule.full;
  if (v <= rule.full) return 1;
  if (v >= rule.zero) return 0;
  return rule.kind === "near" ? (rule.zero - v) / (rule.zero - rule.full)
    : (Math.log10(rule.zero) - Math.log10(v)) / (Math.log10(rule.zero) - Math.log10(rule.full));
}
export type PartScore = { key: MeasureKey; value: number; score: number; share: number };
/** A taste's score for a place in hundredths (0 to 100), with its parts; null when any measure it needs is unknown. */
export function tasteScore(taste: Taste, place: Pick<MatchPlace, "m">): { s100: number; parts: PartScore[] } | null {
  const parts: PartScore[] = [];
  let sum = 0;
  for (const rule of TASTE_RULES[taste]) {
    const score = partScore(rule, place.m?.[rule.key]);
    if (score === null) return null;
    parts.push({ key: rule.key, value: place.m[rule.key] as number, score, share: rule.share });
    sum += rule.share * score;
  }
  return { s100: Math.round((sum + 1e-9) * 100), parts };
}
/** The tastes this table can score for at least one place. A taste outside this list has no data layer yet. */
export function availableTastes(places: readonly MatchPlace[]): Taste[] {
  return TASTES.filter(t => places.some(p => tasteScore(t, p) !== null));
}

export type TasteResult = {
  taste: Taste; importance: Importance; weight: number;
  /** 0 to 1 in steps of 0.01; null = no data. */
  score: number | null;
  /** weight x score; 0 when there is no data (and the taste is listed in `unknown`). */
  points: number;
  parts: PartScore[];
};
export type Reason =
  | { kind: "taste"; taste: Taste; key: MeasureKey; value: number; name?: string; score: number; weight: number; points: number }
  | { kind: "budget"; under: number; monthly: number; mode: HousingMode }
  | { kind: "price"; mode: HousingMode; value: number; period: string };
export type TradeSide =
  | { kind: "taste"; taste: Taste; key: MeasureKey; next: number; here: number }
  | { kind: "cost"; diff: number };
/** Against the next result: where the next place does better, and where it does worse. */
export type Tradeoff = { nextId: string; nextName: string; better: TradeSide | null; worse: TradeSide | null };
export type MatchResult = MatchPlace & {
  monthlyHousing: number; housingShare: number; remainingMonthly: number;
  /** Budget minus the monthly cost, unrounded, never negative. */
  underBudget: number;
  purchasePrice: number | null; deposit: number | null; loan: number | null;
  /** points = sum of weight x score; maxPoints = sum of the weights chosen; total = points / maxPoints (0 with no taste). */
  points: number; maxPoints: number; total: number;
  tastes: TasteResult[];
  /** Chosen tastes this place has no data for. Shown as "no data"; they add no points. */
  unknown: Taste[];
  /** Position in the list shown (1 = first) and position by points alone; they differ only where the spread rule moved a place. */
  rank: number; scoreRank: number;
  reasons: Reason[];
  tradeoff: Tradeoff | null;
};
export type Excluded =
  | { id: string; why: "no-rent-median" | "no-sale-median" }
  | { id: string; why: "over-budget"; monthlyHousing: number }
  | { id: string; why: "essential-zero"; taste: Taste; key: MeasureKey; value: number }
  | { id: string; why: "essential-no-data"; taste: Taste };
export type MatchReason = "matched" | "invalid-input" | "unsupported-taste" | "no-places" | "no-affordable-match" | "no-essential-match";
export type MatchInput = HousingInput & {
  /** Each taste once, marked essential or nice to have. Old names (art) are accepted. */
  tastes?: readonly { taste: string; importance?: string }[];
  places: readonly MatchPlace[];
};
export type MatchOutcome = {
  matches: MatchResult[];
  reason: MatchReason;
  /** The tastes as scored, in the order given, each once. */
  tastes: TasteChoice[];
  /** Names that are not a taste. The search stops (reason "unsupported-taste"); nothing is ignored silently. */
  unsupported: string[];
  /** Every place left out, each with its reason. */
  excluded: Excluded[];
  budget: number;
  assumptions: ResolvedHousing;
  weights: typeof WEIGHTS;
  spread: { topN: number; maxPerRegion: number };
};

/** At most `maxPer` places per NUTS III region in the first `topN`; a place held back keeps its points order right
 * after them. When too few regions are left to fill the first `topN`, the held places fill the gap in points order. */
export function spreadByRegion<T extends { n3: string }>(sorted: readonly T[], topN = TOP_N, maxPer = MAX_PER_REGION): T[] {
  const top: T[] = [], held: T[] = [], rest: T[] = [], seen = new Map<string, number>();
  for (const p of sorted) {
    if (top.length >= topN) { rest.push(p); continue; }
    const n = seen.get(p.n3) ?? 0;
    if (n >= maxPer) held.push(p); else { seen.set(p.n3, n + 1); top.push(p); }
  }
  // Held places all rank above `rest` on points, so they come straight after the first topN (or fill it when short).
  return [...top, ...held, ...rest];
}

const cmpId = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

export function matchPlaces(input: MatchInput): MatchOutcome {
  const { assumptions, valid } = resolveHousing(input ?? ({} as MatchInput));
  const raw = Array.isArray(input?.tastes) ? input.tastes : [];
  const tastes: TasteChoice[] = [], unsupported: string[] = [];
  let badImportance = false;
  for (const c of raw) {
    const t = toTaste(c?.taste);
    if (!t) { unsupported.push(String(c?.taste)); continue; }
    const importance = (c.importance ?? "nice") as Importance;
    if (importance !== "essential" && importance !== "nice") { badImportance = true; continue; }
    const had = tastes.find(x => x.taste === t);
    // The same taste twice counts once; essential wins over nice to have.
    if (had) { if (importance === "essential") had.importance = "essential"; } else tastes.push({ taste: t, importance });
  }
  const budget = valid ? input.netMonthly * assumptions.budgetShare : NaN;
  const out = (reason: MatchReason, matches: MatchResult[] = [], excluded: Excluded[] = []): MatchOutcome =>
    ({ matches, reason, tastes, unsupported, excluded, budget, assumptions, weights: WEIGHTS, spread: { topN: TOP_N, maxPerRegion: MAX_PER_REGION } });
  if (!valid || badImportance || (input.tastes !== undefined && !Array.isArray(input.tastes))) return out("invalid-input");
  if (unsupported.length) return out("unsupported-taste");
  const places = Array.isArray(input.places) ? input.places.filter(p => p && typeof p.id === "string" && p.id) : [];
  if (!places.length) return out("no-places");

  const maxPoints = tastes.reduce((s, c) => s + WEIGHTS[c.importance], 0);
  const excluded: Excluded[] = [];
  type Row = MatchResult & { p100: number };
  const rows: Row[] = [];
  let affordable = 0;
  for (const place of [...places].sort((a, b) => cmpId(a.id, b.id))) {
    const cost = housingCost(place.priceM2, place.rentM2, assumptions);
    if (!cost) { excluded.push({ id: place.id, why: assumptions.housingMode === "rent" ? "no-rent-median" : "no-sale-median" }); continue; }
    // Unrounded: display rounding can never admit a place above the budget.
    if (cost.monthlyHousing > budget) { excluded.push({ id: place.id, why: "over-budget", monthlyHousing: cost.monthlyHousing }); continue; }
    affordable++;
    const results: TasteResult[] = [], unknown: Taste[] = [];
    let p100 = 0, out_: Excluded | null = null;
    for (const c of tastes) {
      const weight = WEIGHTS[c.importance], s = tasteScore(c.taste, place);
      if (!s) {
        unknown.push(c.taste);
        if (c.importance === "essential" && !out_) out_ = { id: place.id, why: "essential-no-data", taste: c.taste };
        results.push({ taste: c.taste, importance: c.importance, weight, score: null, points: 0, parts: [] });
        continue;
      }
      if (c.importance === "essential" && s.s100 === 0 && !out_) {
        const lead = s.parts[0];
        out_ = { id: place.id, why: "essential-zero", taste: c.taste, key: lead.key, value: lead.value };
      }
      p100 += weight * s.s100;
      results.push({ taste: c.taste, importance: c.importance, weight, score: s.s100 / 100, points: weight * s.s100 / 100, parts: s.parts });
    }
    if (out_) { excluded.push(out_); continue; }
    rows.push({
      ...place, ...cost,
      housingShare: cost.monthlyHousing / input.netMonthly, remainingMonthly: input.netMonthly - cost.monthlyHousing,
      underBudget: Math.max(0, budget - cost.monthlyHousing),
      points: p100 / 100, maxPoints, total: maxPoints ? p100 / 100 / maxPoints : 0,
      tastes: results, unknown, rank: 0, scoreRank: 0, reasons: [], tradeoff: null, p100,
    });
  }
  if (!rows.length) return out(affordable ? "no-essential-match" : "no-affordable-match", [], excluded);

  // Most points, then the lower monthly cost, then the slug. Integers (hundredths), so a tie is a real tie.
  rows.sort((a, b) => b.p100 - a.p100 || a.monthlyHousing - b.monthlyHousing || cmpId(a.id, b.id));
  rows.forEach((r, i) => { r.scoreRank = i + 1; });
  const list = spreadByRegion(rows);
  const matches: MatchResult[] = list.map((row, i) => {
    const { p100: _p, ...r } = row;
    r.rank = i + 1;
    r.reasons = reasonsFor(r, assumptions.housingMode);
    return r;
  });
  matches.forEach((r, i) => { r.tradeoff = i + 1 < matches.length ? tradeoffWith(r, matches[i + 1]) : null; });
  return out("matched", matches, excluded);
}

/** The part of a taste that carries most of its score for this place (the first on a tie). */
function leadPart(t: TasteResult): PartScore | null {
  let best: PartScore | null = null;
  for (const p of t.parts) if (!best || p.share * p.score > best.share * best.score) best = p;
  return best;
}
/** Two or three reasons, in numbers: the two tastes that bring most points, then the room left in the budget.
 * With fewer than two tastes scoring, the INE median fills the list. */
function reasonsFor(r: MatchResult, mode: HousingMode): Reason[] {
  const scored = r.tastes.map((t, i) => ({ t, i })).filter(x => x.t.score !== null && x.t.points > 0)
    .sort((a, b) => b.t.points - a.t.points || b.t.weight - a.t.weight || a.i - b.i).slice(0, 2);
  const reasons: Reason[] = [];
  for (const { t } of scored) {
    const lead = leadPart(t)!, nameKey = NAME_OF[lead.key], name = nameKey ? r.names?.[nameKey] : undefined;
    reasons.push({ kind: "taste", taste: t.taste, key: lead.key, value: lead.value, ...(name ? { name } : {}), score: t.score!, weight: t.weight, points: t.points });
  }
  reasons.push({ kind: "budget", under: r.underBudget, monthly: r.monthlyHousing, mode });
  if (reasons.length < 3) {
    const value = mode === "rent" ? r.rentM2 : r.priceM2;
    if (typeof value === "number") reasons.push({ kind: "price", mode, value, period: r.period });
  }
  return reasons;
}
/** One line against the next result: the taste where the next place gains most points, and the one where it loses
 * most. Where no taste differs in a direction, the monthly cost stands in (a whole euro or more). */
function tradeoffWith(here: MatchResult, next: MatchResult): Tradeoff {
  const sides: { d: number; side: TradeSide }[] = [];
  for (let i = 0; i < here.tastes.length; i++) {
    const a = here.tastes[i], b = next.tastes[i];
    if (a.score === null || b.score === null) continue;
    const d = Math.round((b.points - a.points) * 100);
    if (!d) continue;
    // The measure that moves the score most between the two places.
    let key = a.parts[0].key, gap = -1;
    a.parts.forEach((pa, j) => { const g = Math.abs(pa.share * (b.parts[j].score - pa.score)); if (g > gap) { gap = g; key = pa.key; } });
    sides.push({ d, side: { kind: "taste", taste: a.taste, key, next: next.m[key] as number, here: here.m[key] as number } });
  }
  // The largest gain and the largest loss; the first taste chosen wins a tie.
  let better: TradeSide | null = null, worse: TradeSide | null = null, up = 0, down = 0;
  for (const { d, side } of sides) {
    if (d > up) { up = d; better = side; }
    if (d < down) { down = d; worse = side; }
  }
  const diff = next.monthlyHousing - here.monthlyHousing;
  if (!better && diff <= -1) better = { kind: "cost", diff: -diff };
  if (!worse && diff >= 1) worse = { kind: "cost", diff };
  return { nextId: next.id, nextName: next.name, better, worse };
}
