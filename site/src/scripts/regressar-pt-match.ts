/** Prompt 81: the Portuguese /regressar page is the approved prototype (public/previews/regressar-clear), a single
 * file with its own inline place list: 13 places, each taste a yes/no filter, the dearest first, three shown. This
 * module leaves that file untouched and replaces only its `places()` step with the shared engine (lib/match.ts):
 * all 308 places, tastes as scores with visible weights, reasons and the trade-off on every card, in the page's own
 * card style. If the place table cannot be loaded, the prototype's own list stays as it was. */
import { matchPlaces, toTaste, availableTastes, TOP_N, WEIGHTS, type Importance, type Taste, type MatchOutcome } from "../lib/match";
import { loadMatchData } from "../lib/match-data";
import type { MatchData } from "../lib/match-table";
import { TASTE_LABELS, IMPORTANCE_LABELS, matchWords, formatReasons, formatTradeoff, formatPoints, formatCoverage, formatTie, methodLines } from "../lib/match-copy";
import { regressarMapHref } from "../lib/regressar-places";
import { ev, edOf } from "../lib/track";
import type { EdCode } from "../i18n";

// The prototype's own top-level names (a classic inline script: shared with every script on the page).
declare const S: { pref: Set<string>; mode: "rent" | "buy" };
declare const IMG: Record<string, string>;
declare const PLACES: { id: string; line: string }[];
declare function run(): void;
declare function fmt(value: number): string;

/** The prototype's six chips, in its order, as engine tastes ("Escola internacional" is its `schools`). */
const CHIPS: [string, Taste][] = [["beach", "beach"], ["schools", "isch"], ["airport", "airport"], ["golf", "golf"], ["art", "culture"], ["food", "food"]];
const lang = "pt", mw = matchWords(lang), el = (id: string) => document.getElementById(id);
const esc = (text: string) => text.replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]!);
const importance = new Map<string, Importance>();
let data: MatchData | undefined, photos: Record<string, { f: string; alt?: Record<string, string> }> = {}, before = new Set<string>();

function weights(open: Set<Taste>) {
  const chips = el("pref"); if (!chips) return;
  // A taste the table cannot score is not offered.
  chips.querySelectorAll<HTMLButtonElement>("button").forEach((button, i) => { const [key, taste] = CHIPS[i] ?? []; button.hidden = !taste || !open.has(taste); if (button.hidden && key) S.pref.delete(key); });
  let box = el("pref-w");
  if (!box) { box = document.createElement("div"); box.id = "pref-w"; box.setAttribute("role", "group"); box.setAttribute("aria-label", "Quanto conta cada escolha"); chips.after(box); }
  for (const key of [...importance.keys()]) if (!S.pref.has(key)) importance.delete(key);
  box.innerHTML = [...S.pref].map(key => {
    const taste = CHIPS.find(c => c[0] === key)![1], now = importance.get(key) ?? "nice";
    return `<div class="row" style="align-items:center;padding:6px 0;margin-top:6px"><span>${esc(TASTE_LABELS[lang][taste])}</span><span class="seg" style="margin:0">${(["nice", "essential"] as const).map(level => `<button type="button" data-w="${key}:${level}" aria-pressed="${now === level}"${now === level ? ' class="on"' : ""}>${IMPORTANCE_LABELS[lang][level]} · ${WEIGHTS[level]}</button>`).join("")}</span></div>`;
  }).join("") + (S.pref.size ? `<p class="note">${esc(mw.weights)}</p>` : "");
}

function places(netM: number) {
  if (!data) return;
  const open = new Set(availableTastes(data.places));
  weights(open);
  for (const [key, taste] of CHIPS) if (S.pref.has(key) !== before.has(key)) ev({ event: `match/taste/${taste}/${S.pref.has(key) ? "on" : "off"}`, origin: "regressar" });
  before = new Set(S.pref);
  const tastes = [...S.pref].map(key => ({ taste: CHIPS.find(c => c[0] === key)![1], importance: importance.get(key) ?? "nice" }));
  const found: MatchOutcome = matchPlaces({ netMonthly: netM, housingMode: S.mode, places: data.places, tastes });
  const sub = el("psub"), list = el("places"); if (!list) return;
  if (sub) sub.textContent = S.mode === "rent" ? `Renda de um T2 de 80 m² até 35% do seu líquido mensal em Portugal (${fmt(netM)}). Medianas do INE, ${data.period.replace("-Q", "-T")}.` : `Prestação de um T2 de 80 m² (20% de entrada, 3%, 30 anos) até 35% do seu líquido (${fmt(netM)}). Medianas do INE, ${data.period.replace("-Q", "-T")}.`;
  const lines = new Map(PLACES.map(p => [p.id, p.line])), ed = edOf() as EdCode;
  const cards = found.matches.slice(0, TOP_N).map(place => {
    // The prototype's own photograph, else the map's photograph of the place, else a card of type alone.
    const photo = IMG[place.id] ?? (photos[place.id] ? `/img/v2/${photos[place.id].f}-640.webp` : ""), points = formatPoints(place, lang), next = formatTradeoff(place.tradeoff, lang);
    return `<div class="pl" data-place="${place.id}">${photo ? `<div class="ph" style="background-image:url(${photo})"${photos[place.id]?.alt?.pt && !IMG[place.id] ? ` role="img" aria-label="${esc(photos[place.id].alt!.pt)}"` : ""}></div>` : ""}<div class="b"><h4>${place.rank}. ${esc(place.name)}</h4><p class="ln">${esc(lines.get(place.id) ?? place.n3)}</p>
 <div class="row"><span>${S.mode === "rent" ? "Renda típica" : "Prestação estimada"}</span><b>${fmt(place.monthlyHousing)}/mês</b></div><div class="row" style="border:0;padding-top:4px"><span>do seu líquido</span><span>${Math.round(place.housingShare * 100)}%</span></div>
 <p class="ln" style="color:inherit;min-height:0;margin:10px 0 0" data-why>${esc(formatReasons(place, lang))}</p>${next ? `<p class="note" data-next>${esc(next)}</p>` : ""}${place.rank > place.scoreRank ? `<p class="note">${esc(mw.spread)}</p>` : ""}
 <div class="tags">${points ? `<span>${esc(points)}</span>` : ""}<a href="${regressarMapHref(place.id, lang, ed)}" style="font-size:11px;font-weight:700;color:inherit;padding:3px 0">${mw.map} →</a></div></div></div>`;
  }).join("");
  const how = `<details class="note" style="grid-column:1/-1"><summary>${mw.how}</summary><p>${esc(formatCoverage(found, lang))}</p><p>${esc(`${mw.hard} ${mw.rule} ${mw.ties} ${mw.missing} ${mw.paid}`)}</p>${methodLines(lang, CHIPS.map(c => c[1]).filter(t => open.has(t))).map(line => `<p>${esc(line)}</p>`).join("")}</details>`;
  const tie = formatTie(found.matches.slice(0, TOP_N), lang);
  list.innerHTML = (tie ? `<p class="note" style="grid-column:1/-1;margin:0" data-tie>${esc(tie)}</p>` : "") + (cards || `<p class="note">${esc(found.reason === "no-essential-match" ? mw.noEssential : mw.none)}</p>`) + how;
  if (found.matches.length) ev({ event: "match/show", origin: "regressar" }); else ev({ event: "match/none", origin: "regressar" });
}

document.addEventListener("click", event => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>("#pref-w [data-w]"); if (!button) return;
  const [key, level] = button.dataset.w!.split(":") as [string, Importance];
  if ((importance.get(key) ?? "nice") === level) return;
  importance.set(key, level); ev({ event: `match/weight/${toTaste(CHIPS.find(c => c[0] === key)![1])}/${level}`, origin: "regressar" }); run();
  document.querySelector<HTMLButtonElement>(`#pref-w [data-w="${key}:${level}"]`)?.focus();
});
void Promise.all([loadMatchData(), fetch("/data/match-photos.json").then(r => (r.ok ? r.json() : {})).catch(() => ({}))]).then(([table, found]) => {
  data = table; photos = found;
  (window as unknown as { places: typeof places }).places = places;
  run();
}).catch(() => { /* the prototype's own list stays */ });
