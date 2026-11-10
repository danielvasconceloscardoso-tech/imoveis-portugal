// Prompt 81: the map's finder ("what matters to you"). Loaded when the panel first opens (map-v3.ts openFinder), with the
// 308-place table (lib/match-data.ts, one fetch of /data/match.json). It ranks nothing itself: the order, the reasons,
// the trade-off and the method lines are the one matching engine's (lib/match.ts, lib/match-copy.ts; docs/MATCHING.md).
// What this file adds is the panel: the budget, the tastes with their two weights on screen, and the list.
//
// The budget is the map's own (a purchase price). The engine's limit is a monthly cost, so the purchase budget is turned
// into the monthly payment of the engine's standard purchase (HOUSING_DEFAULTS: 80 m², 20% down, 30 years at 3%) and the
// panel says so in one line. A place is then within the budget exactly when 80 m² at its INE median cost no more than
// the budget (the payment grows with the price, so the two limits are the same limit).
//
// Nothing commercial enters here: no development, no partner, no label. The list is the engine's list, in its order.
// Signals (lib/events.ts, the same as /regressar, origin "map"): match/taste/{t}/{on|off}, match/weight/{t}/{level},
// match/show, match/place (the municipality in "place"), match/none. Never the budget or the list.
import { matchPlaces, availableTastes, TASTES, TOP_N, WEIGHTS, type Taste, type Importance, type MatchOutcome } from "../lib/match";
import { housingPayment } from "../lib/housing";
import { loadMatchData } from "../lib/match-data";
import type { MatchData } from "../lib/match-table";
import { TASTE_LABELS, IMPORTANCE_LABELS, matchWords, formatReasons, formatTradeoff, formatTie, formatPoints, formatCoverage, methodLines, type MatchLang } from "../lib/match-copy";

type Hooks = {
  el: HTMLElement; cfg: any; loc: string; mode: string; esc: (t: string) => string;
  ev: (e: { event: string; place?: string; origin?: string }) => void;
  budget: () => number; setBudget: (b: number) => void; moneyCur: (v: number) => string;
  snap: (b: number) => number; toT: (b: number) => number; fromT: (t: number) => number;
  close: () => void; go: (slug: string) => void;
  /** The places of the list shown, for the map's numerals (empty: none). */
  marks: (list: { id: string; rank: number; name: string }[]) => void;
};

export function createFinder(H: Hooks) {
  const { el, cfg, esc, ev } = H, lang = cfg.lang as MatchLang, M5: Record<string, string> = cfg.m5, W = matchWords(lang), A = cfg.area;
  const eur = new Intl.NumberFormat(H.loc, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const chosen = new Map<Taste, Importance>();
  let data: MatchData | null = null, failed = false, shown = TOP_N, lastShow = "";
  const x = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>`;

  el.innerHTML = `<div class="m3-fd">
    <header class="m3-fd-h"><h2 tabindex="-1">${esc(M5["find.h"])}</h2><button type="button" class="m3-panel-x" data-fd-x aria-label="${esc(M5["find.close"])}">${x}</button></header>
    <div class="m3-fd-sc" data-fd-sc>
      <section class="m3-fd-s">
        <div class="m3-fd-chips" data-fd-chips role="group" aria-label="${esc(M5["find.tastes"])}"></div>
        <div class="m3-fd-ws" data-fd-ws></div>
      </section>
      <section class="m3-fd-s">
        <div class="m3-fd-bh"><span class="m3-pk">${esc(M5["find.budget"])}</span><b data-fd-amount></b></div>
        <div class="m3-slider" data-fd-slider role="slider" tabindex="0" aria-label="${esc(M5["find.budget"])}" aria-valuemin="100000" aria-valuemax="20000000"><span class="m3-track"><span class="m3-fill" data-fd-fill></span></span><span class="m3-thumb" data-fd-thumb></span></div>
        <p class="m3-fd-scen" data-fd-scen></p>
      </section>
      <section class="m3-fd-s m3-fd-res" data-fd-res aria-live="polite"></section>
    </div></div>`;
  const q = <T extends HTMLElement = HTMLElement>(sel: string) => el.querySelector<T>(sel)!;
  const chips = q("[data-fd-chips]"), ws = q("[data-fd-ws]"), res = q("[data-fd-res]"), slider = q("[data-fd-slider]");

  // ---- the budget: the map's own, on the same log scale
  function budgetUI() {
    const b = H.budget(), t = H.toT(b);
    q("[data-fd-thumb]").style.left = `${t * 100}%`; q("[data-fd-fill]").style.width = `${t * 100}%`;
    q("[data-fd-amount]").textContent = H.moneyCur(b);
    slider.setAttribute("aria-valuenow", String(Math.round(b))); slider.setAttribute("aria-valuetext", H.moneyCur(b));
    q("[data-fd-scen]").textContent = M5["find.scen"].replace("{area}", String(A.areaM2)).replace("{dep}", String(A.depositPercent)).replace("{years}", String(A.termYears)).replace("{rate}", String(A.annualRate)).replace("{m}", eur.format(Math.floor(monthly())));
  }
  const monthly = () => housingPayment(H.budget() * (1 - A.depositPercent / 100), A.annualRate, A.termYears);
  let dragging = false;
  const fromPointer = (e: PointerEvent) => { const r = slider.getBoundingClientRect(); H.setBudget(H.snap(H.fromT((e.clientX - r.left) / r.width))); };
  slider.addEventListener("pointerdown", (e) => { dragging = true; slider.setPointerCapture(e.pointerId); slider.classList.add("is-drag"); fromPointer(e); });
  slider.addEventListener("pointermove", (e) => { if (dragging) fromPointer(e); });
  const endDrag = () => { dragging = false; slider.classList.remove("is-drag"); };
  slider.addEventListener("pointerup", endDrag); slider.addEventListener("pointercancel", endDrag);
  slider.addEventListener("keydown", (e) => {
    const step = e.key === "PageUp" || e.key === "PageDown" ? 0.1 : 0.02, t = H.toT(H.budget());
    const nt = e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "PageUp" ? t + step : e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "PageDown" ? t - step : e.key === "Home" ? 0 : e.key === "End" ? 1 : null;
    if (nt == null) return; e.preventDefault(); H.setBudget(H.snap(H.fromT(nt)));
  });

  // ---- the tastes: a chip each; a chosen taste shows its two weights, with the numbers they count
  function tastesUI() {
    const open = data ? availableTastes(data.places) : [...TASTES];
    chips.innerHTML = TASTES.filter((t) => open.includes(t)).map((t) => `<button type="button" class="m3-chip" data-taste="${t}" aria-pressed="${chosen.has(t)}">${esc(TASTE_LABELS[lang][t])}</button>`).join("");
    ws.innerHTML = [...chosen].map(([t, level]) => `<div class="m3-fd-w" role="group" aria-label="${esc(TASTE_LABELS[lang][t])}"><span>${esc(TASTE_LABELS[lang][t])}</span><span class="m3-seg">${(["nice", "essential"] as Importance[]).map((w) => `<button type="button" data-w="${t}:${w}" aria-pressed="${level === w}">${esc(IMPORTANCE_LABELS[lang][w])}<i>${WEIGHTS[w]}</i></button>`).join("")}</span></div>`).join("");
  }
  chips.addEventListener("click", (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-taste]"); if (!b) return;
    const t = b.dataset.taste as Taste, on = !chosen.has(t);
    on ? chosen.set(t, "nice") : chosen.delete(t);
    ev({ event: `match/taste/${t}/${on ? "on" : "off"}`, origin: "map" });
    shown = TOP_N; tastesUI(); rank();
  });
  ws.addEventListener("click", (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>("[data-w]"); if (!b) return;
    const [t, w] = b.dataset.w!.split(":") as [Taste, Importance];
    if (chosen.get(t) === w) return;
    chosen.set(t, w); ev({ event: `match/weight/${t}/${w}`, origin: "map" });
    shown = TOP_N; tastesUI(); rank();
  });

  // ---- the list: the engine's order, its reasons in numbers, its trade-off against the next place
  function rank() {
    if (failed) { res.innerHTML = `<p class="m3-fd-note">${esc(M5["find.fail"])}</p><button type="button" class="m3-btn" data-fd-retry>${esc(M5["find.retry"])}</button>`; return; }
    if (!data) { res.innerHTML = `<p class="m3-fd-note">${esc(M5["find.wait"])}</p>`; return; }
    if (!chosen.size) { res.innerHTML = `<p class="m3-fd-note">${esc(M5["find.pick"])}</p>`; lastShow = ""; H.marks([]); return; }
    const found: MatchOutcome = matchPlaces({ netMonthly: monthly(), budgetShare: 1, housingMode: "buy", places: data.places, tastes: [...chosen].map(([taste, importance]) => ({ taste, importance })) });
    const list = found.matches.slice(0, shown), key = [...chosen].map(([t, w]) => `${t}${w[0]}`).join("");
    if (!found.matches.length) {
      res.innerHTML = `<p class="m3-pk">${esc(M5["find.places"])}</p><p class="m3-fd-note">${esc(found.reason === "no-essential-match" ? W.noEssential : W.none)}</p><p class="m3-fd-cov">${esc(formatCoverage(found, lang))}</p>`;
      if (lastShow !== `none:${key}`) { lastShow = `none:${key}`; ev({ event: "match/none", origin: "map" }); }
      H.marks([]);
      return;
    }
    const tie = formatTie(list, lang);
    res.innerHTML = `<p class="m3-pk">${esc(M5["find.places"])}</p><ol class="m3-fd-list">${list.map((m) => {
      const trade = formatTradeoff(m.tradeoff, lang), pts = formatPoints(m, lang);
      return `<li><button type="button" class="m3-fd-r" data-go="${esc(m.id)}" aria-label="${esc(M5["find.goto"].replace("{name}", m.name))}"><span class="m3-fd-top"><i>${m.rank}</i><span class="m3-fd-n">${esc(m.name)}</span>${pts ? `<span class="m3-fd-pts">${esc(pts)}</span>` : ""}</span><span class="m3-fd-n3">${esc(m.n3)}</span><span class="m3-fd-why">${esc(formatReasons(m, lang))}</span>${m.rank !== m.scoreRank ? `<span class="m3-fd-next">${esc(W.spread)}</span>` : ""}${trade ? `<span class="m3-fd-next">${esc(trade)}</span>` : ""}</button></li>`; }).join("")}</ol>
      ${tie ? `<p class="m3-fd-cov">${esc(tie)}</p>` : ""}
      ${found.matches.length > shown ? `<button type="button" class="m3-link m3-fd-more" data-fd-more>${esc(M5["find.more"])}</button>` : ""}
      <p class="m3-fd-cov">${esc(formatCoverage(found, lang))}</p>
      <details class="m3-fd-how"><summary>${esc(W.how)}</summary><p>${esc(W.weights)} ${esc(W.rule)} ${esc(W.hard)} ${esc(W.missing)} ${esc(W.ties)}</p><ul>${methodLines(lang, [...chosen.keys()]).map((l) => `<li>${esc(l)}</li>`).join("")}</ul><p>${esc(W.paid)}</p></details>`;
    if (lastShow !== key) { lastShow = key; ev({ event: "match/show", origin: "map" }); }
    H.marks(list.map((m) => ({ id: m.id, rank: m.rank, name: m.name })));
  }
  res.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t.closest("[data-fd-retry]")) { failed = false; rank(); fetchTable(); return; }
    if (t.closest("[data-fd-more]")) { shown += TOP_N; ev({ event: "map/finder/more", origin: H.mode }); rank(); return; }
    const b = t.closest<HTMLButtonElement>("[data-go]"); if (!b) return;
    ev({ event: "match/place", place: b.dataset.go, origin: "map" });
    res.querySelectorAll("[data-go]").forEach((o) => o.classList.toggle("is-on", o === b));
    H.go(b.dataset.go!);
  });
  q("[data-fd-x]").addEventListener("click", () => H.close());

  function fetchTable() { loadMatchData().then((d) => { data = d; tastesUI(); rank(); }, () => { failed = true; rank(); }); }
  tastesUI(); budgetUI(); rank(); fetchTable();
  return {
    open() { budgetUI(); if (el.contains(document.activeElement) || document.activeElement === document.body || (document.activeElement as HTMLElement)?.closest?.("[data-finder-open], [data-map-arrival]")) q("h2").focus({ preventScroll: true }); },
    close() { /* the panel keeps its choices for the next opening */ },
    budget() { budgetUI(); rank(); },
  };
}
