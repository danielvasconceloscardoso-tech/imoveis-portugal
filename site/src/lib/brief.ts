// The qualified summary that can go with a partner enquiry (prompt 28 §2b, D54). Built in the browser from what the
// reader already entered: the path (door, budget, timing, the NIF tick) and the calculators, plus the areas whose
// ten-year prices they opened on the map. Everything stays on the device (localStorage) until the reader ticks
// "Include this summary" and sends a request. A readable line, never a score: nothing is decided about the reader.
// Wording: COPY_DECK.md "brief.*"; the privacy notice explains it (legal.privacy.7).

export const BRIEF_KEYS = ["from", "cash", "loan", "own", "total", "budget", "value", "sell", "inherit", "dsti", "soon", "year", "later", "nif", "nonif", "data", "note"] as const;
export type BriefLabels = Record<(typeof BRIEF_KEYS)[number], string>;

type Sims = Partial<Record<string, { v: Record<string, number | boolean>; r: Record<string, number>; fx?: number }>>;
const read = <T>(k: string, d: T): T => { try { return JSON.parse(localStorage.getItem(k) || "") ?? d; } catch { return d; } };

/** Calculators call this after each result, so a later enquiry can carry it. */
export function saveSim(tool: string, v: Record<string, number | boolean>, r: Record<string, number>, fx = 1) {
  try { const s = read<Sims>("ip.sims", {}); s[tool] = { v, r, fx }; localStorage.setItem("ip.sims", JSON.stringify(s)); } catch { /* storage off */ }
}
/** The map calls this when a place card opens (the ten-year prices of that area). */
export function savePlace(name: string) {
  try { const p = read<string[]>("ip.places", []).filter((x) => x !== name); p.unshift(name); localStorage.setItem("ip.places", JSON.stringify(p.slice(0, 3))); } catch { /* storage off */ }
}

export type BriefFacts = { door: "buy" | "sell"; budget?: number; total?: number; own?: number; loan?: number; dsti?: number; when?: string; nif?: boolean; inh?: boolean; places: string[] };

/** What the reader entered, gathered from the device. */
export function gather(): BriefFacts | null {
  const path = read<{ door?: "buy" | "sell"; budget?: number; when?: string; inh?: boolean; ticks?: string[]; started?: boolean }>("ip.path", {});
  const sims = read<Sims>("ip.sims", {});
  const places = read<string[]>("ip.places", []);
  const budget = Number(path.budget) || Number(read<number>("ip.budget", 0)) || undefined;
  const f: BriefFacts = { door: path.door === "sell" ? "sell" : "buy", budget, places, when: path.started ? path.when : undefined, inh: path.inh };
  // Prompt 43: the stations no longer carry a checklist, so the NIF is only reported when a reader actually ticked it.
  if (path.ticks?.length) f.nif = path.ticks.includes("docs.1");
  if (f.door === "buy") {
    const cost = sims.cost, pay = sims.payment, aff = sims.afford;
    if (cost) f.total = Math.round(cost.r["r.total"]);
    const own = Number(pay?.v.deposit ?? aff?.v.deposit);
    if (!isNaN(own) && (pay || aff)) {
      f.own = own;
      const need = (f.total ?? (pay ? Number(pay.v.price) : budget) ?? 0) - own;
      f.loan = Math.max(0, Math.round(need));
    }
    if (sims.dsti) f.dsti = sims.dsti.r["r.ratio"];
    else if (pay && aff && Number(aff.v.income)) f.dsti = (100 * pay.r["r.monthly"]) / (Number(aff.v.income) / (aff.fx || 1));
  }
  const any = f.budget || f.total || f.own !== undefined || f.dsti !== undefined || f.when || f.places.length;
  return any ? f : null;
}

/** One readable line, e.g. "Cash buyer · Ready within 3 months · NIF in place · Total budget €2,100,000 incl. taxes". */
export function summary(f: BriefFacts, L: BriefLabels, money: (v: number) => string, pct: (v: number) => string, from: string): string {
  const fill = (s: string, k: string, v: string) => s.replace(`{${k}}`, v);
  // Readiness first (how they pay, when, NIF), then the figures, then where they live and what they looked at.
  const out: string[] = [];
  const when = f.when === "soon" || f.when === "year" || f.when === "later" ? L[f.when] : "";
  if (f.door === "sell") {
    out.push(L.sell);
    if (f.inh) out.push(L.inherit);
    if (when) out.push(when);
    if (f.budget) out.push(fill(L.value, "v", money(f.budget)));
  } else {
    if (f.loan === 0) out.push(L.cash);
    else if (f.loan) out.push(fill(L.loan, "v", money(f.loan)));
    if (when) out.push(when);
    if (f.nif !== undefined) out.push(f.nif ? L.nif : L.nonif);
    if (f.total) out.push(fill(L.total, "v", money(f.total)));
    else if (f.budget) out.push(fill(L.budget, "v", money(f.budget)));
    if (f.own) out.push(fill(L.own, "v", money(f.own)));
    if (f.dsti !== undefined && isFinite(f.dsti)) out.push(fill(L.dsti, "v", pct(f.dsti)));
  }
  out.push(fill(L.from, "from", from));
  if (f.places.length) out.push(fill(L.data, "places", f.places.join(", ")));
  return out.join(" · ");
}
