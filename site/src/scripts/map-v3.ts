// Map v3 (prompt 36, D62): the browser side of MapV3.astro. MapLibre loads when the map is needed (in view on the home
// page; the first interaction, a link with a state, or idle time on the map page). Assets: /tiles/{dem,sea}/ and
// /data/map/ (scripts/map-data/v3_assets.py, v3_extras.py, build.py, golf.py); prices: /data/map/price5.json (free: five years of market medians).
// D83 part 2 (3 Nov 2026), the map in three depths: the first view is clean (layer "none": no price colours, no legend, no
// budget glow), the place opens as a card of tiles (/data/map/tiles.json, scripts/map-data/tiles.py), a tile opens its chart
// (1A · 5A · 10A), the paid tiles open the unlock sheet (switched off: "Disponível em breve"). Everything else moved behind
// "Camadas" (the panel), not removed: the layers and legend, the time slider, the budget, overlays, 2D / 3D and the tours.
import mapCss from "maplibre-gl/dist/maplibre-gl.css?url";
import { feature, mesh } from "topojson-client";
import { savePlace } from "../lib/brief";
import { track, edOf, ev, evHeart, timeBand, rememberPlace } from "../lib/track";
import { get as savedItems } from "../lib/saved";
import { imt as imtOf, purchase } from "../lib/sims";
import { heartHTML } from "./hearts";

// The free price layer (operator, step 1): the market median per quarter over the last five years (/data/map/price5.json).
type Series = { n: string; m2: (number | null)[] };
type Props = { id: number; n: string; s: string; r: string; x: number; y: number; a: number };
type Layer = "none" | "price";
type Proj = { id: string; name: string; tag?: string; developer: string; muni: string; lon: number; lat: number; render?: string; pin?: string; from: number | null; showcase: string; summary?: string; feats?: string[]; now?: number | null;
  near?: string[]; muniName?: string; hero?: string; heroImg?: string;
  // Prompt 71 §3: a development without a showcase page on the site ("Our pick", no unit list) asks for its private visit
  // through the Concierge ("visit"); "showcase" is then the developer's own site.
  visit?: string };

const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const SKY = { "sky-color": "#f3efe6", "horizon-color": "#f6efe1", "fog-color": "#efe8da", "sky-horizon-blend": 0.6, "horizon-fog-blend": 0.7, "fog-ground-blend": 0.35, "atmosphere-blend": 0.5 };
const weak = () => ((navigator as any).hardwareConcurrency || 8) <= 2 || (navigator as any).connection?.saveData === true;
const plain = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
// One tuned ramp, warm sand to deep green (lightness falls steadily, so it reads in every common colour-vision type).
const RAMP = ["#ecdfc2", "#d9d3a9", "#b8c49b", "#91ae8c", "#6b957d", "#47796a", "#285c51"];
const NODATA = "#e3ddd0";
// The places named at the national view, most important first: when two labels would overlap, the earlier one stays.
const BIG = ["lisboa", "porto", "faro", "funchal", "ponta-delgada", "coimbra", "braga", "evora", "aveiro", "setubal", "cascais", "leiria", "viseu", "beja", "braganca",
  "viana-do-castelo", "guimaraes", "sintra", "lagos", "albufeira", "portimao", "loule", "tavira", "grandola", "nazare"];
// Places people search for that are not concelhos (prompt 36 §2.3: type "Comp" and the map flies to Comporta).
const LOCALITIES: [string, number, number, string][] = [["Comporta", -8.786, 38.381, "alcacer-do-sal"], ["Carvalhal", -8.735, 38.302, "grandola"], ["Melides", -8.73, 38.152, "grandola"],
  ["Tróia", -8.885, 38.49, "grandola"], ["Vilamoura", -8.118, 37.077, "loule"], ["Quinta do Lago", -8.017, 37.05, "loule"], ["Vale do Lobo", -8.06, 37.051, "loule"],
  ["Estoril", -9.398, 38.705, "cascais"], ["Ericeira", -9.416, 38.963, "mafra"], ["Foz do Douro", -8.674, 41.153, "porto"], ["Sagres", -8.94, 37.008, "vila-do-bispo"],
  ["Carvoeiro", -8.47, 37.096, "lagoa"], ["Praia da Luz", -8.73, 37.087, "lagos"], ["Costa da Caparica", -9.237, 38.643, "almada"]];
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function initMapV3(root: HTMLElement) {
  // One map per element, however often the page script runs (prompt 39 §4: never two MapLibre instances).
  if ((root as any).__m3init) return; (root as any).__m3init = true;
  const cfg = JSON.parse(root.querySelector("[data-m3-cfg]")!.textContent || "{}");
  const L = cfg.labels, mode = root.dataset.mode as "page" | "home";
  const $ = <T extends HTMLElement = HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const loc = root.dataset.locale || "pt-PT";
  const nf = new Intl.NumberFormat(loc), nf1 = new Intl.NumberFormat(loc, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const eur = new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const fx = Number(root.dataset.fx) || 0, cur = root.dataset.cur || "";
  // p70 (J-09): one budget, one format: the reader's currency first with its symbol, the euros after it ("$336,000 (€300,000)").
  const curF = fx ? new Intl.NumberFormat(loc, { style: "currency", currency: cur, maximumFractionDigits: 0 }) : null;
  const moneyCur = (eurV: number) => curF ? curF.format(Math.round(eurV * fx / 1000) * 1000) : eur.format(Math.round(eurV / 1000) * 1000);
  const money = (eurV: number) => curF ? `${moneyCur(eurV)} (${eur.format(Math.round(eurV / 1000) * 1000)})` : moneyCur(eurV);
  const esc = (t: string) => t.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
  const q = new URLSearchParams(location.search);
  const canvas = $("[data-canvas]"), sheet = $("[data-sheet]"), sheetIn = $("[data-sheet-in]"), tip = $("[data-tip]"), labelsEl = $("[data-labels]");

  // ------------------------------------------------------------ state (every state is a link)
  const stored = (() => { try { return Number(localStorage.getItem("ip.budget")) || 0; } catch { return 0; } })();
  let budget = Math.min(Math.max(Number(q.get("budget")) || stored || 300000, 100000), 20e6);
  // p70 (MI-14): the budget goes into the link only once the reader has set one (a ?budget= link, or the slider or amount).
  let budgetSet = q.has("budget");
  // D83 part 2: the first view has no colour layer ("none"); ?layer=price and the others still open with their colours.
  // Operator, step 1: only the market price stays as a free colour layer; ten years, rents, yields and the other statistics
  // moved to the paid analysis (an old ?layer=rent link opens the map without colours).
  let layer: Layer = q.get("layer") === "price" ? "price" : "none";
  // 2D or 3D (prompt 37 §3): the link, else the reader's last choice, else 2D on phones and weak devices and 3D on desktop.
  // Reduced motion always gets the flat map.
  const dimSaved = (() => { try { return localStorage.getItem("ip.map.dim"); } catch { return null; } })();
  const dimAsked = q.get("dim") ?? (q.get("flat") === "1" ? "2d" : null) ?? dimSaved;
  let flat = reduce() || (dimAsked ? dimAsked === "2d" : weak() || matchMedia("(max-width: 760px), (pointer: coarse)").matches);
  // ?place= takes the slug (gondomar); a place name (Gondomar, from the Concierge link) is turned into its slug.
  const slugOf = (v: string | null) => (v ? plain(v).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : null);
  let selected: string | null = slugOf(q.get("place")), selPar: string | null = q.get("parish"), pinA: string | null = null;
  let selRegion: string | null = q.get("region"), panelOpen = false;
  // Prompt 68: ?project=<id> opens that project's card on the map (the /orizon short link).
  let selProj: string | null = q.get("project");
  let overlays = { golf: q.get("golf") === "1", beach: q.get("beach") === "1", devs: mode === "page" ? q.get("devs") !== "0" : q.get("devs") === "1" };
  let P: { quarters: string[]; munis: Record<string, Series> } | null = null;
  let qi = -1;  // quarter index; -1 = latest
  let map: any = null, ml: any = null, loading: Promise<void> | null = null;
  let features: any[] = []; const byS = new Map<string, Props>();
  let parishes: { feats: any[]; data: Record<string, Series> } | null = null;
  let golf: any = null, beaches: [number, number, string][] | null = null;
  let breaks: Record<Layer, number[]> = {} as any;
  let tourAbort: (() => void) | null = null;
  const projects: Proj[] = cfg.projects || [];
  const projMunis = new Set(projects.map((p) => p.muni));
  // Prompt 68 (4 Nov 2026), the golden sample of the method (content/METHOD.md): a place whose shown partner projects carry
  // a "hero" line (projects.json) and that has an arrival (content/facts/map/places/<slug>/place.json) opens as an arrival,
  // with its developments as photo tiles, in alphabetical order (no ranking). Every other place keeps its card (rule 17).
  const heroesOf = (slug: string | null) => (slug ? projects.filter((p) => p.muni === slug && p.hero && p.showcase).sort((a, b) => a.name.localeCompare(b.name)) : []);
  const heroOf = (slug: string | null) => heroesOf(slug)[0] ?? null;
  if (selProj && !projects.some((p) => p.id === selProj)) selProj = null;
  const last = () => (P ? P.quarters.length - 1 : 0);
  const at = () => (qi < 0 ? last() : qi);
  const qLabel = (k: string) => { const [y, qq] = k.split("-Q"); return L.qfmt.replace("{q}", qq).replace("{y}", y); };

  function syncUrl() {
    const p = new URLSearchParams(location.search);
    const set = (k: string, v: string | null) => (v ? p.set(k, v) : p.delete(k));
    set("budget", budgetSet ? String(Math.round(budget)) : null); set("layer", layer === "none" ? null : layer); set("place", selected); set("parish", selPar); set("region", selRegion); set("project", selProj);
    set("q", qi >= 0 && P ? P.quarters[qi] : null);
    for (const k of ["golf", "beach"] as const) set(k, overlays[k] ? "1" : null);
    set("devs", mode === "page" ? (overlays.devs ? null : "0") : overlays.devs ? "1" : null);  // prompt 39 §2.1: on by default on the map page
    history.replaceState(history.state, "", `${location.pathname}?${p}${location.hash}`);
  }
  // p70 (J-04): each card the reader opens on the map page is one step in the browser's history, so Back closes a place's
  // card back to the region (or the map) instead of leaving the page. The URL stays the state (?place=, ?region=, ...).
  let restoring = false;
  const keyOf = (par: string | null, pr: string | null, pl: string | null, rg: string | null) => (par ? `parish:${par}` : pr ? `project:${pr}` : pl ? `place:${pl}` : rg ? `region:${rg}` : "");
  const cardKey = () => keyOf(selPar, selProj, selected, selRegion);
  function step(next: string) {
    if (mode !== "page" || restoring || !next || next === cardKey()) return;
    history.pushState({ m3: cardKey() }, "", location.href);
  }

  // ------------------------------------------------------------ values and colour
  function value(s: Series | undefined, l: Layer, i = at()): number | null {
    if (!s || l === "none") return null;
    return s.m2[i] ?? null;
  }
  function quant(list: number[]) { const a = [...list].sort((x, y) => x - y); return [0.03, 0.18, 0.35, 0.5, 0.65, 0.82, 0.97].map((p) => a[Math.floor(p * (a.length - 1))]); }
  function computeBreaks() {
    const all = (l: Layer, everyQ: boolean) => { const v: number[] = []; for (const s of Object.values(P!.munis)) { if (everyQ) for (let i = 0; i <= last(); i++) { const x = value(s, l, i); if (x != null) v.push(x); } else { const x = value(s, l); if (x != null) v.push(x); } } return v; };
    breaks = { none: [], price: quant(all("price", true)) };
  }
  function colorExpr(): any {
    if (layer === "none") return "rgba(0,0,0,0)";
    const b = breaks[layer] || []; const stops: any[] = [];
    b.forEach((v, i) => { if (i === 0 || v > b[i - 1]) stops.push(v, RAMP[i]); });
    return ["case", ["<", ["coalesce", ["feature-state", "v"], -1e9], -1e8], NODATA, stops.length >= 4 ? ["interpolate", ["linear"], ["feature-state", "v"], ...stops] : RAMP[3]];
  }
  // With no colour layer, a hovered place lifts in ivory (the relief stays the picture).
  const liftColor = () => (layer === "none" ? "#fbf7ee" : colorExpr());
  const colorOf = (v: number | null) => { if (v == null) return NODATA; const b = breaks[layer]; let i = 0; while (i < b.length - 1 && v > b[i + 1]) i++; return RAMP[i]; };
  function applyValues() {
    if (!map || !P) return;
    for (const f of features) map.setFeatureState({ source: "munis", id: f.id }, { v: value(P.munis[f.properties.s], layer) ?? -1e9, reach: reaches(f.properties.s) });
    if (parishes && map.getSource("pars")) for (const f of parishes.feats) map.setFeatureState({ source: "pars", id: f.properties.id }, { v: value(parishes.data[f.properties.id], layer) ?? -1e9 });
  }
  function repaint() {
    if (!map?.getLayer("muni-fill")) return;
    map.setPaintProperty("muni-fill", "fill-color", colorExpr());
    if (map.getLayer("par-fill")) map.setPaintProperty("par-fill", "fill-color", colorExpr());
    map.setPaintProperty("lift", "fill-color", liftColor());
    applyValues(); legend();
  }
  function legend() {
    const lg = $("[data-legend]"); lg.hidden = layer === "none";
    const b = breaks[layer]; if (!b?.length) return;
    const f = (v: number) => eur.format(Math.round(v / 10) * 10);
    $("[data-lo]").textContent = f(b[0]); $("[data-hi]").textContent = f(b[b.length - 1]);
    $("[data-legend-t]").textContent = L.legend.price.replace("{q}", P ? qLabel(P.quarters[at()]) : "");
  }

  // ------------------------------------------------------------ the budget gesture (log scale, the reader's currency)
  const slider = $("[data-slider]"), thumb = $("[data-thumb]"), fill = $("[data-fill]"), amountBtn = $<HTMLButtonElement>("[data-amount]"), amountIn = $<HTMLInputElement>("[data-amount-in]");
  const LO = Math.log(100000), HI = Math.log(20e6);
  const toT = (b: number) => (Math.log(b) - LO) / (HI - LO), fromT = (t: number) => Math.exp(LO + Math.min(Math.max(t, 0), 1) * (HI - LO));
  const snap = (b: number) => { const m = b < 1e6 ? 10000 : b < 5e6 ? 50000 : 100000; return Math.round(b / m) * m; };
  const reaches = (s: string) => { const v = P?.munis[s]?.m2[last()]; return !!v && budget / v >= 100; };
  let reachT = 0;
  function setBudget(b: number, remember = false) {
    budget = Math.min(Math.max(b, 100000), 20e6);
    const t = toT(budget); thumb.style.left = `${t * 100}%`; fill.style.width = `${t * 100}%`;
    slider.setAttribute("aria-valuenow", String(Math.round(budget))); slider.setAttribute("aria-valuetext", money(budget));
    amountBtn.textContent = moneyCur(budget);
    sentence();
    if (map && P) { clearTimeout(reachT); reachT = window.setTimeout(() => { for (const f of features) map.setFeatureState({ source: "munis", id: f.id }, { reach: reaches(f.properties.s) }); }, 30); }
    if (remember) { budgetSet = true; try { localStorage.setItem("ip.budget", String(Math.round(budget))); } catch { /* private mode */ } }
    if (selected && !sheet.hidden && !pinA && view === "card" && !selPar) showPlace(selected, false);
    syncUrl();
  }
  function sentence() {
    const el = $("[data-sentence]"); if (!P) { el.textContent = ""; return; }
    const m2 = (s: string) => { const v = P!.munis[s]?.m2[last()]; return v ? Math.round(budget / v) : null; };
    const A = selected && byS.get(selected) ? selected : "grandola", C = A === "cascais" ? "lisboa" : "cascais";
    const a = m2(A), cc = m2(C);
    const t = a && cc ? L.sentence.replace("{b}", money(budget)).replace("{a}", nf.format(a)).replace("{pa}", byS.get(A)?.n ?? P.munis[A].n).replace("{c}", nf.format(cc)).replace("{pc}", byS.get(C)?.n ?? P.munis[C].n)
      : a ? L.sentenceOne.replace("{b}", money(budget)).replace("{a}", nf.format(a)).replace("{pa}", byS.get(A)?.n ?? "") : "";
    el.innerHTML = `${esc(t)} <span>${esc(L.medians)}</span>`;
  }
  let dragging = false;
  const fromPointer = (e: PointerEvent) => { const r = slider.getBoundingClientRect(); setBudget(snap(fromT((e.clientX - r.left) / r.width))); };
  slider.addEventListener("pointerdown", (e) => { dragging = true; slider.setPointerCapture(e.pointerId); slider.classList.add("is-drag"); fromPointer(e); load(); });
  slider.addEventListener("pointermove", (e) => { if (dragging) fromPointer(e); });
  const endDrag = () => { if (!dragging) return; dragging = false; slider.classList.remove("is-drag"); setBudget(budget, true); };
  slider.addEventListener("pointerup", endDrag); slider.addEventListener("pointercancel", endDrag);
  slider.addEventListener("keydown", (e) => {
    const step = e.key === "PageUp" || e.key === "PageDown" ? 0.1 : 0.02, t = toT(budget);
    const nt = e.key === "ArrowRight" || e.key === "ArrowUp" || e.key === "PageUp" ? t + step : e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "PageDown" ? t - step : e.key === "Home" ? 0 : e.key === "End" ? 1 : null;
    if (nt == null) return; e.preventDefault(); setBudget(snap(fromT(nt)), true); load();
  });
  amountBtn.addEventListener("click", () => { amountBtn.hidden = true; amountIn.hidden = false; amountIn.value = nf.format(Math.round(budget * (fx || 1))); amountIn.focus(); amountIn.select(); });
  const commit = () => { const v = Number(amountIn.value.replace(/[^\d]/g, "")); if (v) setBudget(v / (fx || 1), true); amountIn.hidden = true; amountBtn.hidden = false; load(); };
  amountIn.addEventListener("keydown", (e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") { amountIn.hidden = true; amountBtn.hidden = false; } });
  amountIn.addEventListener("blur", commit);

  // ------------------------------------------------------------ chips, 2D and 3D, overlays
  root.querySelectorAll<HTMLButtonElement>("[data-layer]").forEach((b) => b.addEventListener("click", () => { setLayer(b.dataset.layer as Layer); ev({ event: `map/layer/${b.dataset.layer}`, place: selected ?? undefined, origin: mode }); }));
  async function setLayer(l: Layer) {
    layer = l; root.querySelectorAll("[data-layer]").forEach((b) => b.setAttribute("aria-pressed", String((b as HTMLElement).dataset.layer === l)));
    const tm = root.querySelector<HTMLElement>("[data-time]"); if (tm) tm.classList.toggle("is-off", l !== "price");
    repaint(); syncUrl(); load();
  }
  root.querySelectorAll<HTMLButtonElement>("[data-dim]").forEach((b) => b.addEventListener("click", () => setDim(b.dataset.dim === "2d")));
  function dimButtons() { root.classList.toggle("is-2d", flat); root.querySelectorAll("[data-dim]").forEach((b) => b.setAttribute("aria-pressed", String(((b as HTMLElement).dataset.dim === "2d") === flat))); }
  // 2D: no terrain, no hillshade, no sky, north up and no tilt; the same layers, card, search and tours. 3D: today's relief.
  function setDim(two: boolean) {
    flat = two || reduce(); dimButtons(); try { localStorage.setItem("ip.map.dim", flat ? "2d" : "3d"); } catch {}
    if (!map) { load(); return; }
    rotating = false; stopTour();
    map.setTerrain(flat ? null : { source: "dem", exaggeration: 1.5 });
    map.setPaintProperty("hill", "hillshade-exaggeration", flat ? 0.55 : 0.7);
    try { map.setSky(flat ? { "sky-color": "#e7e2d7", "horizon-color": "#e7e2d7", "fog-color": "#e7e2d7", "sky-horizon-blend": 0, "horizon-fog-blend": 0, "fog-ground-blend": 1, "atmosphere-blend": 0 } : SKY); } catch { /* older styles have no sky */ }
    if (flat) { map.dragRotate.disable(); map.touchZoomRotate.disableRotation(); } else { map.dragRotate.enable(); map.touchZoomRotate.enableRotation(); }
    map.easeTo({ pitch: flat ? 0 : 50, bearing: flat ? 0 : -12, duration: reduce() ? 0 : 700 });
    if (!flat) governor();
  }
  root.querySelectorAll<HTMLButtonElement>("[data-overlay]").forEach((b) => b.addEventListener("click", () => {
    const k = b.dataset.overlay as "golf" | "beach" | "devs", on = !overlays[k];
    setOverlay(k, on); ev({ event: `map/overlay/${k}/${on ? "on" : "off"}`, place: selected ?? undefined, origin: mode });
  }));
  async function setOverlay(k: "golf" | "beach" | "devs", on: boolean) {
    overlays[k] = on; root.querySelector(`[data-overlay="${k}"]`)?.setAttribute("aria-pressed", String(on)); syncUrl();
    await load();
    if (k === "golf") await drawGolf(); if (k === "beach") await drawBeaches(); if (k === "devs") drawProjects();
  }

  // ------------------------------------------------------------ the map
  let lostT = 0;
  // Remove the map and its markers and free the GPU (leaving the page, or a lost context); load() builds it again.
  async function teardown() {
    if (loading) await loading.catch(() => {});  // never pull the map from under a load in progress
    clearTimeout(lostT); stopTour(); stopPlay(); rotating = false;
    markers.forEach((m) => m.m.remove()); markers = [];
    try { map?.remove(); } catch { /* already gone */ }
    map = null; loading = null; parLoading = null; clusterOn = false; root.classList.remove("is-live");
  }
  async function rebuild(toFlat: boolean) { await teardown(); if (toFlat) { flat = true; dimButtons(); } load(); }
  function load(): Promise<void> {
    if (loading) return loading;
    loading = (async () => {
      if (!document.querySelector("link[data-maplibre]")) { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = mapCss; l.dataset.maplibre = ""; document.head.append(l); }
      const [mod, topo, prices, insets, rivers] = await Promise.all([import("maplibre-gl"), fetch("/data/map/munis.topo.json").then((r) => r.json()), fetch("/data/map/price5.json").then((r) => r.json()),
        fetch("/data/map/insets.json").then((r) => r.json()).catch(() => ({})), fetch("/data/map/rivers.json").then((r) => r.json()).catch(() => null)]);
      ml = mod.default; P = prices; loadTiles();
      const geo: any = feature(topo, topo.objects.m);
      geo.features.forEach((f: any) => { f.id = f.properties.id; byS.set(f.properties.s, f.properties); });
      features = geo.features;
      // Where each region's name sits at the national view: the area-weighted middle of its concelhos.
      const acc: Record<string, [number, number, number]> = {};
      for (const f of features) { const p = f.properties as Props; const a = acc[p.r] ??= [0, 0, 0]; a[0] += p.x * p.a; a[1] += p.y * p.a; a[2] += p.a; }
      regionAt = Object.fromEntries(Object.entries(acc).map(([r, [x, y, a]]) => [r, [x / a, y / a]]));
      // The coastline: outer edges of the concelhos, minus the land border with Spain.
      const outer: any = mesh(topo, topo.objects.m, (a: any, b: any) => a === b);
      const coastPt = (c: number[]) => c[0] < -10 || (c[0] < -8.65 && c[1] < 41.87) || (c[1] < 37.25 && c[0] < -7.41);
      const coast = { type: "MultiLineString", coordinates: [] as number[][][] };
      for (const ln of outer.coordinates) { let seg: number[][] = []; for (const c of ln) { if (coastPt(c)) seg.push(c); else { if (seg.length > 1) coast.coordinates.push(seg); seg = []; } } if (seg.length > 1) coast.coordinates.push(seg); }
      computeBreaks();
      const narrow = root.clientWidth < 700;
      map = new ml.Map({
        container: canvas, attributionControl: false, pixelRatio: Math.min(devicePixelRatio || 1, 2), maxTileCacheSize: narrow ? 48 : 96, dragRotate: !flat, pitchWithRotate: !flat, maxPitch: 72, minZoom: 4.6, maxZoom: 12.5, fadeDuration: 150,
        center: [-8.6, 39.5], zoom: narrow ? 5.6 : 6.2, pitch: flat ? 0 : 52, bearing: flat ? 0 : -12,
        style: { version: 8, sources: {}, layers: [{ id: "bg", type: "background", paint: { "background-color": "#e7e2d7" } }],
          ...(flat ? {} : { sky: SKY }) } as any,
      });
      await new Promise<void>((res) => map.on("load", () => res()));
      // iPhone Safari can drop the WebGL context under memory pressure. MapLibre restores it when the browser gives it
      // back; if that hasn't happened within 3 s, the map is rebuilt flat (2D), so the reader never sees a blank map.
      map.on("webglcontextlost", () => { clearTimeout(lostT); lostT = window.setTimeout(() => rebuild(true), 3000); });
      map.on("webglcontextrestored", () => { clearTimeout(lostT); map?.triggerRepaint(); });
      // Far sea first (z5-z6, wide), then the near sea (z5-z8). Spain and Morocco stay the quiet background colour.
      map.addSource("seafar", { type: "raster", tiles: ["/tiles/seafar/{z}/{x}/{y}.webp"], tileSize: 256, minzoom: 5, maxzoom: 6, bounds: [-32, 27.5, 4, 47.5] });
      map.addLayer({ id: "seafar", type: "raster", source: "seafar", paint: { "raster-fade-duration": 0 } });
      map.addSource("sea", { type: "raster", tiles: ["/tiles/sea/{z}/{x}/{y}.webp"], tileSize: 256, minzoom: 5, maxzoom: 8, bounds: [-14.5, 35, -5, 43.8] });
      map.addLayer({ id: "sea", type: "raster", source: "sea", paint: { "raster-opacity": 1, "raster-fade-duration": 0 } });
      map.addSource("dem", { type: "raster-dem", tiles: ["/tiles/dem/{z}/{x}/{y}.webp"], tileSize: 256, minzoom: 5, maxzoom: 10, encoding: "terrarium", bounds: [-9.75, 36.75, -6.0, 42.25] });
      map.addSource("dem2", { type: "raster-dem", tiles: ["/tiles/dem/{z}/{x}/{y}.webp"], tileSize: 256, minzoom: 5, maxzoom: 10, encoding: "terrarium", bounds: [-9.75, 36.75, -6.0, 42.25] });
      map.addSource("munis", { type: "geojson", data: geo });
      map.addLayer({ id: "land", type: "fill", source: "munis", paint: { "fill-color": "#efe6d3" } });
      map.addLayer({ id: "muni-fill", type: "fill", source: "munis", paint: { "fill-color": colorExpr(), "fill-opacity": 0.78, "fill-color-transition": { duration: 300, delay: 0 } } as any });
      // D83 part 2: the relief is the picture of the first view, so the hillshade stays in 2D too (softer); 3D adds the terrain.
      map.addLayer({ id: "hill", type: "hillshade", source: "dem2", paint: { "hillshade-illumination-direction": 225, "hillshade-illumination-anchor": "map", "hillshade-exaggeration": flat ? 0.55 : 0.7,
        "hillshade-highlight-color": "rgba(255,244,214,0.55)", "hillshade-shadow-color": "rgba(52,64,70,0.42)", "hillshade-accent-color": "rgba(60,60,50,0.15)" } });
      // Madeira and the Azores are drawn moved next to the mainland: their relief is an image in the same place.
      for (const [name, c] of Object.entries(insets) as [string, number[][]][]) {
        map.addSource(`inset-${name}`, { type: "image", url: `/data/map/inset-${name}-relief.webp`, coordinates: c });
        map.addLayer({ id: `inset-${name}`, type: "raster", source: `inset-${name}`, paint: { "raster-fade-duration": 0 } });
      }
      map.addLayer({ id: "muni-line", type: "line", source: "munis", paint: { "line-color": "rgba(40,50,48,0.16)", "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.3, 9, 0.8] } });
      // D83 part 2: the map "by region": the seven regions' borders as soft white lines over the relief.
      const regionLines: any = mesh(topo, topo.objects.m, (a: any, b: any) => a !== b && a.properties.r !== b.properties.r);
      map.addSource("regions", { type: "geojson", data: { type: "Feature", properties: {}, geometry: regionLines } });
      map.addLayer({ id: "region-line", type: "line", source: "regions", paint: { "line-color": "rgba(255,253,246,0.95)", "line-width": ["interpolate", ["linear"], ["zoom"], 5, 1.2, 9, 2.4] } });
      // The budget's reach: the places it buys 100 m² or more in glow softly (only while "Camadas" is open: no glow at first glance).
      map.addLayer({ id: "reach", type: "line", source: "munis", paint: { "line-color": "#fff7df", "line-blur": 3, "line-width": 2.6, "line-opacity": reachPaint() } as any });
      map.addSource("coast", { type: "geojson", data: { type: "Feature", properties: {}, geometry: coast } });
      map.addLayer({ id: "coast-glow", type: "line", source: "coast", paint: { "line-color": "#ffffff", "line-width": ["interpolate", ["linear"], ["zoom"], 5, 2.5, 8, 7], "line-blur": ["interpolate", ["linear"], ["zoom"], 5, 2, 8, 6], "line-opacity": 0.55 } });
      map.addLayer({ id: "coast", type: "line", source: "coast", paint: { "line-color": "#fffdf6", "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0.6, 8, 1.2] } });
      if (rivers) { map.addSource("rivers", { type: "geojson", data: rivers }); map.addLayer({ id: "rivers", type: "line", source: "rivers", paint: { "line-color": "#9fbec6", "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.9, 10, 2.4], "line-opacity": 0.9 } }); }
      map.addLayer({ id: "lift-shadow", type: "line", source: "munis", filter: ["==", ["get", "s"], ""], paint: { "line-color": "rgba(20,30,28,0.35)", "line-width": 7, "line-blur": 7, "line-translate": [3, 5] } });
      map.addLayer({ id: "lift", type: "fill", source: "munis", filter: ["==", ["get", "s"], ""], paint: { "fill-color": liftColor(), "fill-translate": [0, -4], "fill-opacity": 0.95 } as any });
      map.addLayer({ id: "lift-line", type: "line", source: "munis", filter: ["==", ["get", "s"], ""], paint: { "line-color": "#ffffff", "line-width": 1.6, "line-translate": [0, -4] } });
      map.addLayer({ id: "sel", type: "line", source: "munis", filter: ["==", ["get", "s"], ""], paint: { "line-color": "#111214", "line-width": 2.2 } });
      if (!flat) map.setTerrain({ source: "dem", exaggeration: 1.5 });
      applyValues(); legend(); sentence();
      root.classList.add("is-live");
      // Frame the country in the space the glass leaves free: below the top bar, beside (desktop) or above (mobile) the
      // region postcards (the map page) or the small dock (the home page).
      const st = canvas.getBoundingClientRect(), tb = $(".m3-top").getBoundingClientRect();
      const pcEl = root.querySelector<HTMLElement>("[data-postcards]"), dk = (pcEl && pcEl.offsetParent ? pcEl : $(".m3-dock")).getBoundingClientRect();
      const pad = narrow ? { top: tb.bottom - st.top + 6, bottom: Math.max(6, st.bottom - dk.top + 6), left: 6, right: 6 }
        : { top: tb.bottom - st.top + 20, bottom: 40, left: pcEl ? Math.round(dk.right - st.left + 16) : Math.round((dk.right - st.left) * 0.55), right: 60 };
      let fit: any; try { fit = map.cameraForBounds([[-12.4, 36.9], [-6.15, 42.17]], { padding: pad }); } catch { fit = null; }
      fit ??= map.cameraForBounds([[-12.4, 36.9], [-6.15, 42.17]], { padding: 8 });
      // Pitched, the south comes closer to the eye: aim a little south so the Algarve stays in frame.
      // p70 (MI-12): on a desktop the country comes a little closer (+0.4, was +0.2), filling the space beside the postcards.
      const home = { center: flat ? fit.center : [fit.center.lng, fit.center.lat - (narrow ? 0.15 : 0.45)], zoom: fit.zoom + (flat ? 0 : narrow ? 0.28 : 0.4), pitch: flat ? 0 : 50, bearing: flat ? 0 : -12 };
      (root as any).__home = home;
      // p70 (S-09): the flight in plays only when the map is ready early; on a slow network the still picture has stood in its
      // place, so the live map takes its framing without a jump.
      const dl = selected ? byS.get(selected) : null, dp = selProj ? projects.find((x) => x.id === selProj) : null;
      if (mode === "page" && !selected && !selPar && !selRegion && !selProj && !q.has("q") && !reduce() && performance.now() < 4500) { map.jumpTo({ center: [-13.4, 38.6], zoom: home.zoom - 1.2, pitch: 22, bearing: home.bearing - 28 }); map.flyTo({ ...home, duration: 3400, curve: 1.15, easing: ease, essential: true }); }
      // p70 (MI-22, A-08): a ?place= or ?project= link starts the live map on that place, so the camera never waits on the
      // tiles of the whole country (the short flight to it follows).
      else if (mode === "page" && !selPar && (dl || dp)) map.jumpTo({ ...home, center: dp ? [dp.lon, dp.lat] : [dl!.x, dl!.y], zoom: Math.max(home.zoom, dp ? 10 : zoomFor(dl!) - 0.6) });
      else map.jumpTo(home);
      if (q.get("q") && P && P.quarters.includes(q.get("q")!)) setQuarter(P.quarters.indexOf(q.get("q")!));
      if (overlays.golf) await drawGolf(); if (overlays.beach) await drawBeaches(); if (overlays.devs) drawProjects();
      if (selPar) { await loadParishes(); selectParish(selPar); } else if (selRegion && !selected) { if (!(ctx?.kind === "region" && ctx.id === selRegion && !sheet.hidden)) showRegion(selRegion); } else if (selected) {
        // Operator, step 1: a ?place= link opens the place card (the golden sample); the partner project stays on the map as
        // its pin and as one sponsored line in the card (prompt 39 §2.6 opened the project card first). The card may already
        // be open (opened before the map, below): then the map only flies to the place.
        const p = byS.get(selected);
        if (p && ctx?.kind === "muni" && ctx.id === selected && !sheet.hidden) { map.setFilter("sel", ["==", ["get", "s"], selected]); heroOf(selected) ? arriveAt(selected) : flyTo(p.x, p.y, zoomFor(p)); }
        else select(selected);
      } else if (selProj) {
        // Prompt 68: the project's card is open (below); the camera comes down to it with its municipality outlined.
        const pr = projects.find((x) => x.id === selProj);
        if (pr) { map.setFilter("sel", ["==", ["get", "s"], pr.muni]); arriveAt(pr.muni, pr); }
      }
      // Prompt 71: ?pins=<id>,<id> frames those developments (the /arrow short link); ?tour=south starts the south coast.
      const pinIds = (q.get("pins") ?? "").split(",").filter((id) => projects.some((p) => p.id === id));
      if (mode === "page" && pinIds.length && !selected && !selProj) { const b = new ml.LngLatBounds(); projects.filter((p) => pinIds.includes(p.id)).forEach((p) => b.extend([p.lon, p.lat]));
        map.stop(); map.fitBounds(b, { padding: isWide() ? { left: 300, right: 140, top: 130, bottom: 90 } : { left: 110, right: 110, top: 150, bottom: canvas.clientHeight * 0.3 }, maxZoom: 11.4, pitch: flat ? 0 : 45, duration: reduce() ? 0 : 1800 }); }
      if (mode === "page" && q.get("tour") === "south" && cfg.south?.length) southStop(0);
      if (mode === "home" && !flat && !selected) startSpin();
      if (!flat) governor();
      map.on("click", (e: any) => { stopTour(); const gc = overlays.golf ? golfAt(e.point) : null; if (gc) { showGolf(gc); return; } const h = pick(e.point); if (!h) return; if (h.kind === "par") selectParish(h.key); else select(h.key); });
      map.on("mousemove", (e: any) => hover(e.point)); map.on("mouseout", () => hover(null));
      map.on("move", labelsSoon); map.on("zoomend", () => { if (map.getZoom() > 7.8) loadParishes(); });
      ["pointerdown", "wheel", "touchstart"].forEach((ev) => canvas.addEventListener(ev, () => { stopTour(); halt(); arrStop(); }, { passive: true }));
      if (mode === "home") ["pointerdown", "touchstart", "wheel", "keydown", "focusin", "input"].forEach((ev) => root.addEventListener(ev, halt, { passive: true }));
      placeLabels();
    })();
    return loading;
  }
  // ------------------------------------------------------------ 60 fps or a lighter map (prompt 36 §1.5)
  // While the camera moves in the first seconds, count frames. Below 40 fps the 3D terrain goes (the hillshade keeps the
  // relief), below 30 the resolution steps down to 1.5x. Reduced motion and weak devices never get here: they see the still.
  let quality = 0;
  function governor() {
    let t0 = 0, n = 0, budgetMs = 20000; const start = performance.now();
    const tick = (now: number) => {
      if (!map || now - start > budgetMs || quality >= 2) return;
      if (!map.isMoving()) { t0 = 0; n = 0; } else if (!t0) { t0 = now; n = 0; } else {
        n++;
        if (now - t0 > 1200) {
          const fps = (n * 1000) / (now - t0); t0 = 0; n = 0;
          if (fps >= 40) return;  // smooth: keep everything
          if (quality === 0) { map.setTerrain(null); quality = 1; } else { map.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5)); quality = 2; }
        }
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // ------------------------------------------------------------ labels: Playfair for the big places, Manrope as you zoom
  let labT = 0;
  const labelsSoon = () => { if (labT) return; labT = requestAnimationFrame(() => { labT = 0; placeLabels(); }); };
  function placeLabels() {
    if (!map) return; const z = map.getZoom(), W = canvas.clientWidth, H = canvas.clientHeight;
    const want = features.map((f) => f.properties as Props).filter((p) => p.s === selected || (BIG.includes(p.s) && z > (W < 700 ? 5.2 : 5.9)) || (z > 8.2 && p.a > 2) || z > 9.2);
    const placed: { x: number; y: number; w: number; h?: number }[] = []; let h = "";
    // Prompt 68: the visible photo pins (a 44 px photograph above its point, the short label to its right) are kept clear:
    // a name that would sit on one moves above or below it, or waits for a closer zoom.
    const cv = canvas.getBoundingClientRect();
    for (const mk of markers) {
      if (mk.el.style.display === "none") continue;
      for (const el of [mk.el, mk.el.querySelector<HTMLElement>(".m3-pin-t")]) {
        const r = el?.getBoundingClientRect(); if (!r || !r.width || r.right < cv.left || r.left > cv.right || r.bottom < cv.top || r.top > cv.bottom) continue;
        placed.push({ x: r.left - cv.left + r.width / 2, y: r.top - cv.top + r.height / 2, w: r.width + 6, h: r.height + 2 });
      }
    }
    const clash = (x: number, y: number, w: number) => placed.some((o) => Math.abs(o.x - x) < (o.w + w) / 2 && Math.abs(o.y - y) < ((o.h ?? 18) + 18) / 2);
    // D83 part 2: at the national view, the regions' names first (the map "by region"), quiet capitals.
    if (z < (W < 700 ? 6.4 : 7.0)) for (const [r, [x, y]] of Object.entries(regionAt)) {
      const c = map.project([x, y]); const name = L.regions[r] || ""; const w = name.length * 9 + 16;
      if (c.x < 0 || c.y < 0 || c.x > W || c.y > H || !name) continue;
      const [rx, ry] = ([[0, 0], [0, 22], [0, -22], [0, 44], [0, 66], [64, 0], [-64, 0], [64, 30], [-64, 30]] as const).map(([dx, dy]) => [c.x + dx, c.y + dy]).find(([xx, yy]) => !clash(xx, yy, w)) ?? [c.x, c.y];
      placed.push({ x: rx, y: ry, w }); h += `<span class="m3-l0" style="transform:translate(${Math.round(rx)}px,${Math.round(ry)}px)">${esc(name)}</span>`;
    }
    // p70 (A-08): the place whose card is open is named first, whatever else wants the room.
    const rank = (p: Props) => { if (p.s === selected) return -1; const i = BIG.indexOf(p.s); return i >= 0 ? i : projMunis.has(p.s) ? BIG.length : 1000 - p.a; };
    for (const p of want.sort((a, b) => rank(a) - rank(b))) {
      const c = map.project([p.x, p.y]); if (c.x < 0 || c.y < 0 || c.x > W || c.y > H) continue;
      const big = BIG.includes(p.s), w = p.n.length * (big ? 8.5 : 6.5) + 8;
      // Over the place if there is room, otherwise just above or just below it; dropped only when all three are taken.
      // A big name (Porto) next to a photo pin may also step a little further down or up rather than disappear.
      const y = [c.y, c.y - 17, c.y + 17, ...(big || p.s === selected ? [c.y + 32, c.y - 34, c.y + 48] : [])].find((yy) => !clash(c.x, yy, w)) ?? (p.s === selected ? c.y : undefined);
      if (y === undefined) continue;
      placed.push({ x: c.x, y, w }); h += `<span class="${big ? "m3-l1" : "m3-l2"}" style="transform:translate(${Math.round(c.x)}px,${Math.round(y)}px)">${esc(p.n)}</span>`;
      if (placed.length > 70) break;
    }
    labelsEl.innerHTML = h;
  }

  // ------------------------------------------------------------ hover, pick, select
  let hoverS: string | null = null;
  function hover(pt: { x: number; y: number } | null) {
    const h = pt ? pick(pt) : null; const s = h?.kind === "muni" ? h.key : null;
    const g = pt && overlays.golf ? golfAt(pt) : null;
    if (s !== hoverS) { hoverS = s; for (const id of ["lift", "lift-line", "lift-shadow"]) map.setFilter(id, ["==", ["get", "s"], s ?? ""]); }
    map.getCanvas().style.cursor = h || g ? "pointer" : "";
    if (!pt || (!h && !g)) { tip.hidden = true; return; }
    const v = s ? value(P!.munis[s], layer) : null;
    tip.innerHTML = g ? `${esc(g.n)}${g.holes ? `<b>${g.holes} ${L.golf.holes.toLowerCase()}</b>` : ""}` : `${esc(h!.kind === "par" ? parishes?.feats.find((f) => f.properties.id === h!.key)?.properties.n ?? "" : byS.get(s!)?.n ?? "")}${v != null ? `<b>${fmtV(v)}</b>` : ""}`;
    tip.style.transform = `translate(${pt.x + 14}px, ${pt.y - 34}px)`; tip.hidden = false;
  }
  const fmtV = (v: number) => `${eur.format(v)}/m²`;
  function pick(pt: { x: number; y: number }): { kind: "muni" | "par"; key: string } | null {
    const z = map.getZoom(), ppd = (512 * 2 ** z) / 360;
    const layers = [...(z >= 8.45 && map.getLayer("par-fill") ? ["par-fill"] : []), "muni-fill"];
    const hit = map.queryRenderedFeatures([pt.x, pt.y], { layers })[0];
    const hp: Props | undefined = hit && hit.layer.id === "muni-fill" ? byS.get(hit.properties.s) : undefined;
    const dh = hp ? (() => { const c = map.project([hp.x, hp.y]); return Math.hypot(c.x - pt.x, c.y - pt.y); })() : 1e9;
    let best: Props | null = null, bd = 1e9;
    for (const f of features) {
      const p: Props = f.properties; if (p === hp) continue;
      if (Math.sqrt(p.a * 1e-4) * ppd >= 26) continue;
      const c = map.project([p.x, p.y]); const d = Math.hypot(c.x - pt.x, c.y - pt.y);
      if (d < 16 && d < bd && d < dh * 0.6) { best = p; bd = d; }
    }
    if (best) return { kind: "muni", key: best.s };
    if (hit) return hit.layer.id === "par-fill" ? { kind: "par", key: String(hit.properties.id) } : { kind: "muni", key: hit.properties.s };
    for (const f of features) { const p: Props = f.properties; const c = map.project([p.x, p.y]); const d = Math.hypot(c.x - pt.x, c.y - pt.y); if (d < 28 && d < bd) { best = p; bd = d; } }
    return best ? { kind: "muni", key: best.s } : null;
  }
  const isWide = () => root.clientWidth >= 820;
  // p70 (A-08): a place's card zooms in by the place's size (Matosinhos, 67 km², fills the view instead of the whole Norte).
  const zoomFor = (p: Props) => Math.max(map?.getZoom() ?? 0, p.a < 40 ? 9.4 : p.a < 120 ? 9.0 : p.a < 400 ? 8.4 : 7.6);
  function flyTo(x: number, y: number, z: number, dur = 1200) {
    map.flyTo({ center: [x, y], zoom: z, pitch: flat ? 0 : 46, duration: reduce() ? 0 : dur, curve: 1.3, easing: ease, essential: true,
      padding: isWide() ? { right: 440, left: 0, top: 60, bottom: 120 } : { bottom: canvas.clientHeight * 0.42, top: 60, left: 0, right: 0 } });
  }
  // Prompt 68, the arrival (content/METHOD.md, question 3): the camera comes down the Douro to the place in about two
  // seconds, in 3D (pitched and turned along the river), and stops on the partner project. The flight is the place's own
  // ("camera" in content/facts/map/places/<slug>/place.json: [lon, lat, zoom, bearing, pitch] keyframes); without one,
  // a single flight to the project. Any touch, drag or wheel on the map takes over at once; reduced motion jumps there.
  let arrAbort: (() => void) | null = null;
  function arrStop() { const a = arrAbort; arrAbort = null; a?.(); }
  function arriveAt(slug: string, pr = heroOf(slug)) {
    if (!map || !pr) return;
    arrStop();
    const go = (cam?: number[][]) => {
      if (!map) return;
      // Phone: the arrival card stands a little taller (60%), so the project's render already shows; the place sits above it.
      const padding = isWide() ? { right: 440, left: 0, top: 60, bottom: 120 } : { bottom: canvas.clientHeight * 0.62, top: 70, left: 0, right: 0 };
      const kf = (k: number[]) => ({ center: [k[0], k[1]] as [number, number], zoom: k[2], bearing: k[3], pitch: k[4], padding });
      const end = cam?.length ? kf(cam[cam.length - 1]) : { center: [pr.lon, pr.lat] as [number, number], zoom: 11.8, bearing: -20, pitch: 55, padding };
      ev({ event: "map/arrive", place: slug, step: pr.id, origin: mode }); tip.hidden = true;
      if (reduce()) { map.jumpTo(end); return; }
      let stop = false; arrAbort = () => { stop = true; map?.stop(); };
      const done = () => { if (!stop) arrAbort = null; };
      if (cam && cam.length > 1) {
        // Down from where the reader is to the river upstream (ease in), then along the river to the project (ease out).
        map.flyTo({ ...kf(cam[0]), duration: 1000, curve: 1.2, easing: (t: number) => t * t, essential: true });
        map.once("moveend", () => { if (stop || !map) return; map.easeTo({ ...end, duration: 1150, easing: (t: number) => 1 - (1 - t) * (1 - t), essential: true }); map.once("moveend", done); });
      } else { map.flyTo({ ...end, duration: 2000, curve: 1.3, easing: ease, essential: true }); map.once("moveend", done); }
    };
    const c = placeCache.get(slug); c ? go(c.arr?.cam) : loadPlace(slug).then((d) => { if ((selected === slug || selProj === pr.id) && map) go(d?.arr?.cam); });
  }
  // Time on a place (part 5): from the card opening to its closing, another place, a partner card or the page hiding;
  // sent as a band (lib/track.ts TIME_BANDS), never raw milliseconds.
  let tPlace: string | null = null, t0 = 0;
  const timeEnd = () => { if (tPlace && t0) ev({ event: "map/time", place: tPlace, band: timeBand(performance.now() - t0), origin: mode }); tPlace = null; t0 = 0; };
  const timeStart = (slug: string) => { if (tPlace === slug) return; timeEnd(); tPlace = slug; t0 = performance.now(); };
  function select(slug: string | null, fly = true) {
    if (slug) { ev({ event: "map/place", place: slug, origin: mode }); ev({ event: "map/card/muni", place: slug, origin: mode }); }
    if (pinA && slug && slug !== pinA) { compare(pinA, slug); return; }
    // Closing a card that was opened from the bare map goes back one step, so Back never shows it again.
    if (!slug && !restoring && mode === "page" && history.state?.m3 === "" && cardKey()) { history.back(); return; }
    if (slug) step(`place:${slug}`);
    arrStop(); selected = slug; selPar = null; selRegion = null; selProj = null;
    if (map?.getLayer("sel")) map.setFilter("sel", ["==", ["get", "s"], slug ?? ""]);
    const p = slug ? byS.get(slug) : null;
    if (p && map && fly) heroOf(slug) ? arriveAt(slug!) : flyTo(p.x, p.y, zoomFor(p));
    syncUrl(); sentence();
    if (slug) {
      showPlace(slug); timeStart(slug);
      const remember = (n?: string) => { if (n) { savePlace(n); rememberPlace(n); } };
      p ? remember(p.n) : loadPlace(slug).then((d) => remember(d?.n));
    } else closeSheet();
  }

  // ------------------------------------------------------------ the place as tiles (D83 part 2: Apple Weather, then Apple Stocks)
  // Operator, step 1 (3 Nov 2026), the golden sample card: photo (a gallery where the place has its own views), name, one
  // line, a heart; Preço in words; Viver aqui (minutes by car, the flight); Escolas and Saúde (names and minutes); a small
  // "Fontes" link; two calls to action (the paid analysis, the advisor); the Maré block. Nothing from the paid list: no
  // chart, no ten years, no rents or yields, no strips or per-1000 ratios (they moved to the analysis, MapAnalysisPage).
  // Data: /data/map/place/<slug>.json (scripts/map-data/tiles.py and place_cards.py); parishes and regions: tiles.json.
  const T4 = L.t, C5 = L.c5;
  const pctF = new Intl.NumberFormat(loc, { style: "percent", maximumFractionDigits: 0 });
  const m2f = (v: number) => C5.m2.replace("{v}", nf.format(v));
  let T: any = null, tilesP: Promise<any> | null = null;
  function loadTiles() { return tilesP ??= fetch("/data/map/tiles.json").then((r) => r.json()).then((d) => (T = d)).catch(() => (T = { m: {}, p: {}, r2: {}, rg: {} })); }
  // One small file per municipality (scripts/map-data/tiles.py): the card opens before the whole map has loaded.
  const placeCache = new Map<string, any>(), placeReq = new Map<string, Promise<any>>();
  function loadPlace(slug: string): Promise<any> {
    if (placeCache.has(slug)) return Promise.resolve(placeCache.get(slug));
    const early = (window as any).__m3place;  // started by MapV3.astro's inline script for a ?place= link
    if (early && early.slug === slug) { (window as any).__m3place = null; placeReq.set(slug, early.p); }
    if (!placeReq.has(slug)) placeReq.set(slug, fetch(`/data/map/place/${slug}.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null));
    return placeReq.get(slug)!.then((d) => { if (d) placeCache.set(slug, d); return d; });
  }
  type Ctx = { kind: "muni" | "parish" | "region"; id: string; name: string; c2: string; region: string; muni?: string };
  let view: "card" | "tile" = "card", ctx: Ctx | null = null, rerender: (() => void) | null = null, srcFor: (() => string) | null = null;
  const evPlace = (x: Ctx) => (x.kind === "region" ? { region: x.id } : { place: x.kind === "parish" ? `p-${x.id}` : x.id });
  const qName = (k: string) => { const [y, qq] = k.split("-Q"); return L.qfmt.replace("{q}", qq).replace("{y}", y); };
  const q0Of = (k: string) => { const [y, qq] = k.split("-Q"); return `${Number(y) - 5}-Q${qq}`; };
  const dateF = (d: string) => { try { return new Intl.DateTimeFormat(loc, { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${d}T12:00:00`)); } catch { return d; } };

  // The photograph: the place's own gallery (hero first, swipe for the other views), else its own single photograph,
  // else a quiet typographic band. The region's photograph appears only on the region's own card (operator, 3 Nov: a
  // municipality or parish never shows a view of another place, e.g. Viseu with the Ria de Aveiro).
  function photoHTML(slug: string | null, r: string, c5?: any, isRegion = false): string {
    if (c5?.ph?.length) {
      const n = c5.ph.length;
      const imgs = c5.ph.map((p: any, i: number) => `<img class="m3-photo" src="/img/v2/${p.f}-640.webp" srcset="/img/v2/${p.f}-640.webp 640w, /img/v2/${p.f}-1024.webp 1024w${p.w >= 1600 ? `, /img/v2/${p.f}-1600.webp 1600w` : ""}" sizes="(max-width: 819px) 100vw, 420px" alt="${esc(p.alt?.[cfg.lang] ?? "")}" width="640" height="400"${i ? ` loading="lazy"` : ` fetchpriority="high"`} decoding="async" aria-label="${esc(C5.photoN.replace("{i}", String(i + 1)).replace("{n}", String(n)))}">`).join("");
      // Prompt 68: a photograph that asks for a credit (the developer's own views) carries it, small, on the image.
      const cr = c5.ph[0]?.credit && cfg.p68 ? `<figcaption class="m3-cr">${esc(cfg.p68.credit.replace("{c}", c5.ph[0].credit))}</figcaption>` : "";
      return `<figure class="m3-ph m3-gal" data-gal><div class="m3-gal-t" data-gal-t tabindex="0">${imgs}</div>${n > 1 ? `<p class="m3-gal-d" aria-hidden="true">${c5.ph.map((_: any, i: number) => `<i${i ? "" : ` class="is-on"`}></i>`).join("")}</p>` : ""}${cr}</figure>`;
    }
    const own = slug ? cfg.photos[slug] : "", reg = isRegion ? cfg.regionPhotos?.[r] ?? "" : "";
    // p70 (MI-25): without a photograph of the place itself, no picture box at all (the kicker already names the region).
    const f = own || reg; if (!f) return "";
    const cap = !own && T4.ph[f] ? `<figcaption>${esc(T4.ph[f])}</figcaption>` : "";
    return `<figure class="m3-ph"><img class="m3-photo" src="/img/v2/${f}-640.webp" srcset="/img/v2/${f}-640.webp 640w, /img/v2/${f}-1024.webp 1024w" sizes="420px" alt="${own ? esc(cfg.photoAlt?.[slug!] ?? "") : ""}" width="640" height="400">${cap}</figure>`;
  }
  const dirLine = (p5: number | undefined | null) => p5 == null ? "" : Math.abs(p5) < 2 ? T4.dirFlat : (p5 > 0 ? T4.dirUp : T4.dirDown).replace("{v}", pctF.format(Math.abs(p5) / 100));
  const soonHTML = () => `<span class="m3-soon"><b>${esc(T4.soon)}</b><small>${esc(T4.soonP)}</small></span>`;

  // Preço, in words (operator, step 1): the market median, the new build (a partner's published prices, or "preços sob
  // consulta (promotor)" where a partner project is), and the five-year direction in one sentence. No chart, no range, no
  // ten years: those are in the paid analysis.
  // p70 (J-02): on a place, parish or region card, one line answers "what does my budget buy here" in the reader's currency
  // (the same sum as the calculators: the budget over the market median), and opens the simulator at that budget.
  const buyLine = (d: any, slug = "") => {
    if (!d?.m2 || !cfg.p68 || !cfg.links.sims) return "";
    const href = `${cfg.links.sims}?sv=${Math.round(budget)}${cfg.links.simR?.includes(slug) ? `&sr=${slug}` : ""}`;
    return `<p class="m3-tl m3-buy"><a class="m3-link" href="${esc(href)}" data-buy-line>${esc(cfg.p68.q.price.replace("{b}", money(budget)).replace("{a}", nf.format(Math.round(budget / d.m2))))} →</a></p>`;
  };
  function priceTile(d: any, buy = ""): string {
    const nb = d?.nb ? `<span><small>${esc(C5.nb)}</small><b>${esc(`${C5.m2.split("{v}")[0]}${nf.format(d.nb[0])}–${m2f(d.nb[1])}`)}</b></span>` : d?.nbq ? `<span><small>${esc(C5.nb)}</small><b class="m3-dim-t">${esc(C5.nbOnreq)}</b></span>` : "";
    return `<section class="m3-tile m3-tile-w"><h3 class="m3-tt">${esc(T4.price)}</h3>
      <div class="m3-pp${nb ? "" : " m3-pp-1"}"><span><small>${esc(C5.mkt)}</small><b>${d?.m2 ? esc(m2f(d.m2)) : "—"}</b></span>${nb}</div>
      ${buy}${d?.p5 != null ? `<p class="m3-tl">${esc(dirLine(d.p5))}</p>` : ""}</section>`;
  }
  const flightTime = (f: number) => (f >= 60 ? `${Math.floor(f / 60)} h ${String(Math.round(f % 60)).padStart(2, "0")}` : C5.min.replace("{v}", nf.format(f)));
  // A list of names (Playfair) with small figures (minutes), Apple Weather style.
  const mins = (v: number) => `<span class="m3-mm"><b>${nf.format(v)}</b> min</span>`;
  const listHTML = (rows: [string, string][]) => `<ul class="m3-ml">${rows.map(([n, v]) => `<li><span class="m3-mn">${n}</span>${v}</li>`).join("")}</ul>`;
  const tile = (title: string, body: string, note = "") => `<section class="m3-tile m3-tile-w"><h3 class="m3-tt">${esc(title)}${note ? `<small>${esc(note)}</small>` : ""}</h3>${body}</section>`;
  const AP: Record<string, string> = { LIS: "Lisboa", OPO: "Porto", FAO: "Faro", FNC: "Funchal", PDL: "Ponta Delgada" };
  // p70 (J-21): without a published flight for this edition the row is left out (never "coming soon"); the data stays.
  function flightRow(fl: any): [string, string][] {
    const f = fl?.[cfg.ed]; if (!f?.min) return [];
    const v = f.via ? `<span class="m3-mm"><b>${esc(flightTime(f.min))}</b> ${esc(C5.via)}</span>` : `<span class="m3-mm"><b>${esc(flightTime(f.min))}</b></span>`;
    return [[esc(C5.flight), v]];
  }
  // The golden sample (content/facts/map/places/<slug>/): drive times, the flight, the main schools and health services.
  function c5Tiles(d: any): string {
    const c5 = d.c5;
    const life: [string, string][] = c5.life.map(([, n, m]: [string, any, number]) => [esc(typeof n === "string" ? n : n[cfg.lang] ?? n.pt), mins(m)]);
    life.push(...flightRow(c5.fl));
    let h = tile(C5.life, listHTML(life), C5.bycar);
    if (c5.sch?.length) h += tile(C5.schools, listHTML(c5.sch.map(([n, m]: [string, number]) => [esc(n), mins(m)])), C5.within);
    const note = (t?: string) => (t ? `<small>${esc(t === "@cs" ? C5.tagCs : t)}</small>` : "");
    if (c5.hsp?.length) h += tile(C5.health, listHTML(c5.hsp.map(([n, m, t]: [string, number, string?]) => [`${esc(n)}${note(t)}`, mins(m)])), C5.within);
    return h;
  }
  // Every other place until step 2 (the roll-out): only the verified figures it has, straight-line distances named as such,
  // nothing from the paid list (no doctors per 1000, no sea temperature, no strips).
  function kmTiles(d: any): string {
    const life: [string, string][] = [];
    if (d?.bch != null) life.push([esc(T4.beach), `<span class="m3-mm">${esc(T4.kmline.replace("{v}", nf1.format(d.bch)))}</span>`]);
    if (d?.ap) life.push([esc(T4.airport), `<span class="m3-mm">${esc(T4.ap.replace("{n}", AP[d.ap[0]] ?? d.ap[0]).replace("{v}", nf.format(d.ap[1])))}</span>`]);
    if (life.length) life.push(...flightRow(d.fl ? Object.fromEntries(Object.entries(d.fl).map(([e, m]) => [e, { min: m }])) : null));
    const care: [string, string][] = [];
    if (d?.sch) care.push([esc(T4.school), d.sch.none ? `<span class="m3-mm">${esc(T4.noschool)}</span>` : `<span class="m3-mm">${esc(T4.km.replace("{n}", d.sch.n).replace("{v}", nf1.format(d.sch.km)))}</span>`]);
    if (d?.hsp) care.push([esc(T4.hosp), `<span class="m3-mm">${esc(T4.km.replace("{n}", d.hsp.n).replace("{v}", nf1.format(d.hsp.km)))}</span>`]);
    return tile(C5.life, life.length ? listHTML(life) : soonHTML()) + tile(T4.care, care.length ? listHTML(care) : soonHTML());
  }
  // "Fontes": the sources of what the card shows, dated, one tap down (never a paragraph in the card).
  function sourcesHTML(d: any, x: Ctx): string {
    const q = T?.q ?? d?.q ?? (P ? P.quarters[last()] : "");
    const li: string[] = [];
    if (q) { li.push(C5.src.mkt.replace("{q}", qName(q))); if (d?.p5 != null) li.push(C5.src.dir.replace("{q0}", qName(q0Of(q))).replace("{q}", qName(q))); }
    if (d?.nbq || d?.nb) li.push(C5.src.nb);
    const c5 = d?.c5;
    if (c5) {
      li.push(C5.src.drive.replace("{o}", c5.o).replace("{d}", dateF(c5.d)));
      const f = c5.fl?.[cfg.ed]; if (f) li.push(`${C5.src.flight.replace("{from}", f.from).replace("{to}", f.to).replace("{d}", dateF(f.d))}`);
      if (c5.sch?.length) li.push(C5.src.sch.replace("{d}", dateF(c5.d)));
      if (c5.hsp?.length) li.push(C5.src.hsp.replace("{d}", dateF(c5.d)));
      li.push(`<a href="${esc(cfg.links.credits)}">${esc(C5.src.ph)}</a>`);
    } else if (x.kind !== "region" && (d?.bch != null || d?.sch || d?.hsp)) li.push(C5.src.km);
    // Prompt 68: the arrival line and the last line, each with its facts.csv source.
    if (x.kind === "muni" && cfg.p68) for (const z of d?.arr?.src ?? []) if (z.t?.[cfg.lang]) li.push(`<a href="${esc(z.u)}" rel="noopener" target="_blank">${esc(cfg.p68.moreSrc.replace("{t}", z.t[cfg.lang]).replace("{d}", dateF(z.d)))}</a>`);
    return `<div class="m3-sb m3-tv"><button type="button" class="m3-back" data-back>${chevBack}${esc(T4.back)}</button><p class="m3-kick">${esc(x.name)}</p><h3 tabindex="-1" class="m3-h-s">${esc(C5.srcH)}</h3>
      <ul class="m3-srcl">${li.map((t) => `<li>${t.startsWith("<a") ? t : esc(t)}</li>`).join("")}</ul><p class="m3-src">${esc(L.disclaimer)}</p></div>`;
  }
  // The two calls to action (operator, step 1): the paid analysis (the unlock sheet with its soft preview) and the advisor
  // (the Concierge, opened on this page with the place already filled in).
  const ctaHTML = (placeName: string) => `<p class="m3-fontes"><button type="button" class="m3-link" data-sources>${esc(C5.sources)}</button></p>
    <div class="m3-acts m3-acts-1"><button type="button" class="m3-btn m3-btn-p" data-unlock-open>${esc(C5.ctaPaid)}</button><a class="m3-btn" href="${esc(`${cfg.links.consult}?place=${encodeURIComponent(placeName)}`)}" data-concierge data-cta-consult>${esc(C5.ctaConsult)}</a></div>`;
  const mareHTML = () => `<div class="m3-mare" data-mare-slot>${root.querySelector<HTMLTemplateElement>("[data-mare-tpl]")?.innerHTML ?? ""}</div>`;

  function showPlace(slug: string, open = true) {
    const d = placeCache.get(slug);
    if (!d) { loadPlace(slug).then((x) => { if (x && selected === slug && !pinA) showPlace(slug, open); }); return; }
    const name = d.n ?? byS.get(slug)?.n ?? slug, r = d.r ?? byS.get(slug)?.r ?? "";
    const here = projects.filter((x) => x.muni === slug && x.showcase);
    if (here.length && !overlays.devs && map) setOverlay("devs", true);  // prompt 38: a place card shows its partner projects
    const x: Ctx = { kind: "muni", id: slug, name, c2: d.c2 ?? "", region: r };
    // Part 2 (3 Nov): the heart keeps the place in "A sua seleção" (its own page where it has one, else the map on it).
    const regionHref = cfg.links.pages.includes(slug) ? `${cfg.links.map}${slug}/` : `${cfg.links.map}?place=${slug}`;
    // p70 (MI-25): the region is named once, in the kicker above the name.
    const line = d.c5?.line?.[cfg.lang] ?? [d.n3].filter((z: string) => z && z !== L.regions[r]).join(", ");
    const hs = heroesOf(slug);
    if (hs.length && d.arr && cfg.p68) {
      ctx = x; rerender = () => showPlace(slug, false); srcFor = () => sourcesHTML(d, x);
      openSheet(arrivalHTML(slug, d, name, regionHref, hs), open, true); wireArrival(slug, hs, open);
      return;
    }
    let h = `${photoHTML(slug, r, d.c5)}<div class="m3-sb"><p class="m3-kick">${esc(L.regions[r] || "")}</p><div class="ht-row"><h2 class="m3-h" tabindex="-1">${esc(name)}</h2>${heartHTML("region", slug, name, regionHref)}</div>`;
    h += `${line ? `<p class="m3-line">${esc(line)}</p>` : ""}<div class="m3-tiles">${priceTile(d, buyLine(d, slug))}${d.c5 ? c5Tiles(d) : kmTiles(d)}</div>`;
    h += ctaHTML(name);
    // Developer components stay (CLAUDE.md, COMMON2 rule 3): the partner's homes here, or near, one quiet sponsored line.
    const nearBy = here.length ? here : projects.filter((y) => y.showcase && (y as Proj & { near?: string[] }).near?.some((n) => plain(n) === plain(name))).slice(0, 2);
    for (const y of nearBy) h += `<p class="m3-buys m3-near"><a href="${esc(y.showcase)}">${esc(here.length ? C5.homes.replace("{muni}", name).replace("{name}", y.name) : cfg.pl.near.replace("{name}", y.name).replace("{muni}", (y as Proj & { muniName?: string }).muniName ?? ""))} →</a> <span class="m3-tag">${esc(y.tag || L.sponsored)}</span></p>`;
    // Prompt 72: the card's last line ("one more thing", place_cards.py arr.more), its source behind "Fontes", as on the arrival card.
    h += `${mareHTML()}${d.arr?.more?.[cfg.lang] ? `<p class="m3-onemore" data-more>${esc(d.arr.more[cfg.lang])}</p>` : ""}</div>`;
    ctx = x; rerender = () => showPlace(slug, false); srcFor = () => sourcesHTML(d, x);
    openSheet(h, open);
  }
  // Prompt 68: the place as an arrival (content/METHOD.md). First screen: the photograph, the name, one line; then the
  // place's developments as photo tiles in one format (render, name, one line), alphabetical, no ranking: each opens its
  // card. Then the next questions, one line each, opening on tap (the same free lists and tiles as today's card: nothing
  // new is free, nothing free is lost); "Fontes" and the advisor as quiet links; the Maré block; and the card's last line,
  // set apart: one more thing.
  const chevDown = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
  // Prompt 69: wherever IMT shows on the map, one tap opens the IMT screen at that price (scripts/imt.ts, in the site
  // chrome); without it (the embedded map), the link is the full IMT calculator.
  const imtLine = (price: number, from: "map" | "project") => cfg.p69 ? `<p class="m3-line m3-imt"><a class="m3-link imt-tap" href="${esc(`${cfg.links.imt}?price=${price}&own=0&resident=0`)}" data-imt="${price}" data-imt-from="${from}">${esc(cfg.p69.imt.replace("{price}", eur.format(price)).replace("{imt}", eur.format(imtOf(price, false, false))))}</a></p>` : "";
  // p70 (MI-02): next to a development's published price, the whole purchase in one figure (price, IMT, stamp duty and the
  // deed, lib/sims.ts purchase(), a non-resident buying a second home, cash); one tap opens the total-cost calculator at
  // that price. Without a published price nothing is shown (never an invented price).
  const totalLine = (price: number) => C5.total && cfg.links.cost ? `<p class="m3-line m3-imt"><a class="m3-link" href="${esc(`${cfg.links.cost}?price=${price}&own=0&resident=0&mortgage=0`)}" data-total>${esc(C5.total.replace("{total}", eur.format(purchase(price, false, false, false).total)))} →</a>${cfg.p69?.nr ? `<small class="m3-nr" style="display:block;font-size:12.5px;opacity:.75">${esc(cfg.p69.nr)}</small>` : ""}</p>` : imtLine(price, "project");
  function arrivalHTML(slug: string, d: any, name: string, href: string, hs: Proj[]): string {
    const c5 = d.c5, P8 = cfg.p68, lang = cfg.lang;
    const arrive = d.arr?.line?.[lang] ?? c5?.line?.[lang] ?? "";
    const ph = photoHTML(slug, d.r ?? "", c5, false);
    let h = `${ph.replace('class="m3-ph m3-gal"', 'class="m3-ph m3-gal m3-gal-arr"').replace('class="m3-ph"', 'class="m3-ph m3-ph-arr"')}<div class="m3-sb m3-arr"><div class="ht-row"><h2 class="m3-h m3-h-xl" tabindex="-1">${esc(name)}</h2>${heartHTML("region", slug, name, href)}</div>`;
    if (arrive) h += `<p class="m3-arr-l">${esc(arrive)}</p>`;
    h += `</div>`;
    // The developments: the same tile for each (its label only where the data gives one, never "Sponsored" for a pick).
    h += `<div class="m3-devs${hs.length === 1 ? " m3-devs-1" : ""}">${hs.map((pr) => { const img = pr.heroImg || pr.render || "";
      return `<button type="button" class="m3-dev" data-dev="${esc(pr.id)}"><span class="m3-dev-f">${img ? `<img src="${esc(img)}-800.webp" alt="" width="800" height="450" decoding="async">` : ""}${pr.tag ? `<span class="m3-dev-t"><span class="m3-tag">${esc(pr.tag)}</span></span>` : ""}</span><span class="m3-dev-n">${esc(pr.name)}</span><span class="m3-dev-l">${esc(pr.hero ?? "")}</span></button>`; }).join("")}</div>`;
    // The next questions.
    const qs: [string, string, string][] = [];
    const city = c5?.life?.find((z: any[]) => z[0] === "city"), sea = c5?.life?.find((z: any[]) => z[0] === "beach");
    // The sea first where it is close (ten minutes or less by car, e.g. Vila do Conde): its own line, the beach behind it.
    const seaOwn = !!(sea && sea[2] <= 10 && P8.q.seaMin);
    if (seaOwn) qs.push(["near", P8.q.seaMin.replace("{v}", nf.format(sea[2])), `<p class="m3-tt">${esc(C5.life)}<small>${esc(C5.bycar)}</small></p>${listHTML([[esc(typeof sea[1] === "string" ? sea[1] : sea[1][lang] ?? sea[1].pt), mins(sea[2])]])}`]);
    if (city) {
      const cn = (typeof city[1] === "string" ? city[1] : city[1][lang] ?? city[1].pt).split(",")[0].trim();
      // p70 (A-09): a beach that already has its own question ("The sea? 3 min.") is not listed again under the city.
      const life: [string, string][] = c5.life.filter((z: any[]) => !(seaOwn && z === sea)).map(([, n, m]: [string, any, number]) => [esc(typeof n === "string" ? n : n[lang] ?? n.pt), mins(m)]);
      life.push(...flightRow(c5.fl));
      qs.push(["life", P8.q.life.replace("{city}", cn).replace("{v}", nf.format(city[2])), `<p class="m3-tt">${esc(C5.life)}<small>${esc(C5.bycar)}</small></p>${listHTML(life)}`]);
    }
    // Without the golden sample's drive times (e.g. Vila do Conde), today's straight-line tiles sit behind one line.
    if (!c5 && d.bch != null && P8.q.sea) qs.push(["near", P8.q.sea.replace("{v}", nf1.format(d.bch)), kmTiles(d)]);
    if (c5?.sch?.length) {
      // The count comes from the card's rows (schools.csv, card=1).
      const lim = 20;  // every school in schools.csv is within 20 minutes by car (place_cards.py MAX_MIN); the card counts its rows
      qs.push(["schools", P8.q.schools.replace("{n}", nf.format(c5.sch.length)).replace("{m}", nf.format(lim)), `<p class="m3-tt">${esc(C5.schools)}<small>${esc(C5.within)}</small></p>${listHTML(c5.sch.map(([n, m]: [string, number]) => [esc(n), mins(m)]))}`]);
    }
    if (d.m2) {
      const a = Math.round(budget / d.m2);
      qs.push(["price", P8.q.price.replace("{b}", money(budget)).replace("{a}", nf.format(a)), `${priceTile(d)}${imtLine(Math.round(budget), "map")}<div class="m3-acts m3-acts-1"><button type="button" class="m3-btn" data-unlock-open>${esc(C5.ctaPaid)}</button></div>`]);
    }
    if (c5?.hsp?.length) {
      const near = c5.hsp.reduce((a: any[], b: any[]) => (b[1] < a[1] ? b : a));
      const note = (t?: string) => (t ? `<small>${esc(t === "@cs" ? C5.tagCs : t)}</small>` : "");
      qs.push(["health", (near[2] === "@cs" ? P8.q.healthCs : P8.q.health).replace("{v}", nf.format(near[1])), `<p class="m3-tt">${esc(C5.health)}<small>${esc(C5.within)}</small></p>${listHTML(c5.hsp.map(([n, m, t]: [string, number, string?]) => [`${esc(n)}${note(t)}`, mins(m)]))}`]);
    }
    h += `<div class="m3-sb m3-qa">${qs.map(([id, q, body]) => `<div class="m3-q" data-q="${id}"><button type="button" class="m3-qb" aria-expanded="false" aria-controls="m3q-${mode}-${id}"><span>${esc(q)}</span>${chevDown}</button><div class="m3-qp" id="m3q-${mode}-${id}" role="region" inert><div class="m3-qi">${body}</div></div></div>`).join("")}`;
    // Prompt 69: the Concierge opens on this place and the budget the card speaks of (its first step already chosen).
    h += `<p class="m3-fontes m3-quiet"><button type="button" class="m3-link" data-sources>${esc(C5.sources)}</button><a class="m3-link" href="${esc(`${cfg.links.consult}?place=${encodeURIComponent(name)}&budget=${Math.round(budget)}`)}" data-concierge data-cta-consult>${esc(C5.ctaConsult)}</a></p>`;
    h += `${mareHTML()}`;
    // One more thing: the card's last line, with its fact (facts.csv) behind "Fontes".
    const more = d.arr?.more?.[lang];
    if (more) h += `<p class="m3-onemore" data-more>${esc(more)}</p>`;
    return h + `</div>`;
  }
  // The arrival card's signals (one schema, lib/track.ts): the project first seen, the visit asked, each question opened,
  // the last line seen.
  function wireArrival(slug: string, hs: Proj[], opened: boolean) {
    if (opened) for (const pr of hs) ev({ event: "map/hero", place: slug, step: pr.id, origin: mode });
    sheetIn.querySelectorAll<HTMLButtonElement>("[data-dev]").forEach((b) => b.addEventListener("click", () => {
      const pr = hs.find((y) => y.id === b.dataset.dev); if (!pr) return;
      ev({ event: "map/hero/tap", place: slug, step: pr.id, origin: mode });
      if (map) { arrStop(); map.easeTo({ center: [pr.lon, pr.lat], duration: reduce() ? 0 : 700, essential: true }); }
      showProject(pr);
    }));
    sheetIn.querySelectorAll<HTMLElement>("[data-q]").forEach((qq) => {
      const b = qq.querySelector<HTMLButtonElement>(".m3-qb")!, panel = qq.querySelector<HTMLElement>(".m3-qp")!;
      b.addEventListener("click", () => {
        const on = b.getAttribute("aria-expanded") !== "true";
        b.setAttribute("aria-expanded", String(on)); qq.classList.toggle("is-open", on); panel.inert = !on;
        if (on) { ev({ event: `map/qa/${qq.dataset.q}`, place: slug, origin: mode }); if (!isWide() && detent < 2) setDetent(2); }
      });
    });
    const more = sheetIn.querySelector<HTMLElement>("[data-more]");
    if (more && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); ev({ event: "map/more", place: slug, origin: mode }); } }, { root: sheetIn, threshold: 0.9 });
      io.observe(more);
    }
  }
  function selectParish(code: string) {
    const f = parishes?.feats.find((x) => x.properties.id === code); if (!f) return;
    step(`parish:${code}`); selPar = code; selected = f.properties.m; selRegion = null; syncUrl(); if (map?.getLayer("sel")) map.setFilter("sel", ["==", ["get", "s"], ""]);
    ev({ event: "map/card/parish", place: `p-${code}`, origin: mode });
    const muni = byS.get(f.properties.m), md = T?.m?.[f.properties.m], pd = T?.p?.[code];
    // The parish's own price (INE, the finest cut it publishes); beach, airport, school and hospital its own when we have them.
    const d = { ...(md ?? {}), m2: pd?.m2 ?? null, p5: pd?.p5 ?? null, nb: null, nbq: null, ...(pd?.bch != null ? { bch: pd.bch } : {}), ...(pd?.ap ? { ap: pd.ap } : {}), ...(pd?.sch ? { sch: pd.sch } : {}), ...(pd?.hsp ? { hsp: pd.hsp } : {}) };
    const x: Ctx = { kind: "parish", id: code, name: f.properties.n, c2: md?.c2 ?? "", muni: f.properties.m, region: muni?.r ?? "" };
    if (!T) loadTiles().then(() => { if (ctx?.kind === "parish" && ctx.id === code && view === "card" && !sheet.hidden) selectParish(code); });
    let h = `${photoHTML(null, muni?.r ?? "")}<div class="m3-sb"><p class="m3-kick">${esc(T4.cutParish.replace("{m}", muni?.n ?? ""))}</p><div class="ht-row"><h2 class="m3-h" tabindex="-1">${esc(f.properties.n)}</h2>${heartHTML("region", `p-${code}`, `${f.properties.n}, ${muni?.n ?? ""}`, `${cfg.links.map}?parish=${code}`)}</div>`;
    h += `<p class="m3-line">${esc([muni?.n, L.regions[muni?.r ?? ""]].filter(Boolean).join(", "))}</p><div class="m3-tiles">${priceTile(d, buyLine(d, f.properties.m))}${kmTiles(d)}</div>`;
    h += ctaHTML(f.properties.n);
    h += `<div class="m3-more"><button type="button" class="m3-link" data-goto="${f.properties.m}">${esc(muni?.n ?? "")}</button></div>${mareHTML()}</div>`;
    ctx = x; rerender = () => selectParish(code); srcFor = () => sourcesHTML(d, x);
    openSheet(h, true);
  }
  // A region postcard: the region's photograph and name, its NUTS II median and the five-year direction, in words.
  let regionAt: Record<string, [number, number]> = {};
  async function showRegion(key: string, fly = true) {
    step(`region:${key}`);
    // p70 (S-09): the region's card opens from its small file at once; the map, when it is ready, frames the region.
    load(); await loadTiles(); timeEnd();
    selRegion = key; selected = null; selPar = null; syncUrl(); if (map?.getLayer("sel")) map.setFilter("sel", ["==", ["get", "s"], ""]);
    ev({ event: "map/card/region", region: key, origin: mode });
    const rg = T?.rg?.[key] ?? {}, c2 = rg.c2 ?? "PT", name = L.regions[key] || key;
    const x: Ctx = { kind: "region", id: key, name, c2, region: key };
    const d = { m2: T?.r2?.[c2]?.m2 ?? rg.m2, p5: rg.p5 };
    let h = `${photoHTML(null, key, undefined, true)}<div class="m3-sb"><p class="m3-kick">${esc(T4.regionKick)}</p><div class="ht-row"><h2 class="m3-h" tabindex="-1">${esc(name)}</h2>${heartHTML("region", `r-${key}`, name, `${cfg.links.map}?region=${key}`)}</div>`;
    h += `<p class="m3-line">${esc(T4.regionLine.replace("{n}", nf.format(rg.k ?? 0)).replace("{cities}", (rg.cities ?? []).join(", ")))}</p><div class="m3-tiles">${priceTile(d, buyLine(d))}</div>`;
    h += `<p class="m3-buys m3-hint">${esc(T4.regionPick)}</p>${ctaHTML(name)}${mareHTML()}</div>`;
    ctx = x; rerender = () => showRegion(key, false); srcFor = () => sourcesHTML(d, x);
    openSheet(h, true);
    if (fly) await load();
    if (fly && map && selRegion === key) {
      const pts = features.filter((f) => (f.properties as Props).r === key).map((f) => f.properties as Props);
      if (pts.length) map.fitBounds([[Math.min(...pts.map((p) => p.x)) - 0.15, Math.min(...pts.map((p) => p.y)) - 0.15], [Math.max(...pts.map((p) => p.x)) + 0.15, Math.max(...pts.map((p) => p.y)) + 0.15]],
        { padding: isWide() ? { left: 280, right: 460, top: 90, bottom: 60 } : { left: 30, right: 30, top: 80, bottom: canvas.clientHeight * 0.5 }, maxZoom: 9, duration: reduce() ? 0 : 1200, pitch: flat ? 0 : 40 });
    }
  }
  // "Fontes" opens in the same sheet; "Voltar" returns to the card. (The tiles' charts and strips moved to the paid analysis.)
  function openSources() {
    if (!ctx || !srcFor) return;
    ev({ event: "map/card/sources", ...evPlace(ctx), origin: mode });
    showView(srcFor());
  }
  const chevBack = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>`;
  function showView(h: string) {
    view = "tile";
    sheetIn.innerHTML = h + `<button type="button" class="m3-x" aria-label="${L.close}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`;
    sheetIn.scrollTop = 0;
    sheetIn.querySelector(".m3-x")!.addEventListener("click", () => select(null));
    const was = detent;
    sheetIn.querySelector("[data-back]")?.addEventListener("click", () => { view = "card"; rerender?.(); if (!isWide()) setDetent(was); });
    if (!isWide()) setDetent(2);  // the chart and the strips want the full height on a phone; "Voltar" returns to the height before
    if (root.contains(document.activeElement)) sheetIn.querySelector<HTMLElement>("h2, h3")?.focus({ preventScroll: true });
  }

  // ------------------------------------------------------------ the unlock sheet (paid analysis: off until the company and invoicing exist)
  // "Ver a análise completa" opens it with a soft preview: what the analysis of this place holds, each item as an abstract
  // shape (never the figures themselves), and "Disponível em breve" while payment is off (config.mapAnalysis).
  const unlock = $("[data-unlock]");
  const ghost = (i: number) => `<svg class="m3-ghost" viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true">${i % 2
    ? `<rect x="4" y="22" width="14" height="14" rx="2"/><rect x="24" y="14" width="14" height="22" rx="2"/><rect x="44" y="18" width="14" height="18" rx="2"/><rect x="64" y="8" width="14" height="28" rx="2"/><rect x="84" y="12" width="14" height="24" rx="2"/><rect x="104" y="4" width="12" height="32" rx="2"/>`
    : `<path d="M2 34 C 20 30, 30 26, 44 24 S 70 14, 84 16 S 106 8, 118 4" fill="none" stroke-width="3"/>`}</svg>`;
  const lock = `<svg class="m3-lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`;
  function openUnlock(tile: string) {
    const x = ctx; ev({ event: `map/paid/preview/${tile}`, ...(x ? evPlace(x) : {}), origin: mode });
    const pEl = unlock.querySelector<HTMLElement>("[data-unlock-p]")!, rName = x ? L.regions[x.region] || "" : "";
    const where = x ? (x.kind === "region" ? x.name : `${x.name}${rName && rName !== x.name ? `, ${rName}` : ""}`) : "Portugal";
    pEl.textContent = (pEl.dataset.tpl || "").replace("{place}", where);
    const kick = unlock.querySelector<HTMLElement>("[data-unlock-kick]")!; kick.textContent = T4.paid;
    const pv = unlock.querySelector<HTMLElement>("[data-unlock-pv]");
    if (pv) pv.innerHTML = `<p class="m3-pk">${esc(C5.preview.replace("{place}", x?.name ?? "Portugal"))}</p><div class="m3-tiles m3-tiles-paid">${C5.paid.map((t: string, i: number) => `<div class="m3-tile m3-tile-p"><span class="m3-tt">${esc(t)}${lock}</span>${ghost(i)}</div>`).join("")}</div>`;
    const buy = unlock.querySelector<HTMLAnchorElement>("[data-unlock-region]"); if (buy) buy.textContent = (buy.dataset.tpl || "").replace("{region}", rName).replace("{v}", buy.dataset.v || "");
    unlock.hidden = false; requestAnimationFrame(() => unlock.classList.add("is-open"));
    unlock.querySelector<HTMLElement>("[data-unlock-x]")?.focus({ preventScroll: true });
  }
  function closeUnlock() { unlock.classList.remove("is-open"); setTimeout(() => (unlock.hidden = true), 220); }
  unlock.querySelector("[data-unlock-x]")!.addEventListener("click", closeUnlock);
  unlock.addEventListener("click", (e) => { if (e.target === unlock) closeUnlock(); });
  // Two places side by side (a shared link with two places): the market median, what the budget buys and the five-year
  // direction. The ten years, the rents and the yield moved to the paid analysis (operator, step 1).
  function compare(a: string, b: string) {
    ev({ event: "map/compare/pair", place: b, origin: mode }); view = "card"; ctx = null;
    pinA = null; selected = b; syncUrl(); if (map?.getLayer("sel")) map.setFilter("sel", ["in", ["get", "s"], ["literal", [a, b]]]);
    const col = (slug: string) => { const p = byS.get(slug)!, s = P!.munis[slug], v = s?.m2[last()], p5 = T?.m?.[slug]?.p5; return { n: p.n, s, v, p5 }; };
    const A = col(a), B = col(b);
    const row = (k: string, f: (x: typeof A) => string) => `<div class="m3-cr"><span>${f(A)}</span><em>${k}</em><span>${f(B)}</span></div>`;
    let h = `<div class="m3-sb m3-cmp"><div class="m3-cr m3-ch"><h3 tabindex="-1">${esc(A.n)}</h3><em></em><h3>${esc(B.n)}</h3></div>`;
    h += row(L.card.price, (x) => x.v ? eur.format(x.v) : "—") + row(L.card.m2b, (x) => x.v ? nf.format(Math.round(budget / x.v)) : "—") + row(T4.price, (x) => esc(dirLine(x.p5)) || "—");
    h += `<div class="m3-acts"><button type="button" class="m3-btn" data-goto="${a}">${esc(A.n)}</button><button type="button" class="m3-btn" data-goto="${b}">${esc(B.n)}</button></div><p class="m3-src">${L.source.replace("{quarter}", qLabel(P!.quarters[last()]))}</p></div>`;
    openSheet(h, true);
    const pa = byS.get(a)!, pb = byS.get(b)!;
    if (map) map.fitBounds([[Math.min(pa.x, pb.x), Math.min(pa.y, pb.y)], [Math.max(pa.x, pb.x), Math.max(pa.y, pb.y)]], { padding: isWide() ? { left: 80, right: 520, top: 120, bottom: 160 } : { left: 40, right: 40, top: 100, bottom: canvas.clientHeight * 0.5 }, maxZoom: 9, duration: reduce() ? 0 : 1200, pitch: flat ? 0 : 40 });
  }
  let detent = 1;  // mobile: 0 peek, 1 half, 2 full
  function openSheet(h: string, focus: boolean, arr = false) {
    view = "card"; sheet.classList.toggle("is-arr", arr);
    // p70 (A-24): the waiting card MapV3.astro drew for a ?place= link is replaced in place (it counts as the first opening).
    const skel = !!sheet.dataset.skel; if (skel) { delete sheet.dataset.skel; sheet.removeAttribute("aria-busy"); }
    sheetIn.innerHTML = h + `<button type="button" class="m3-x" aria-label="${L.close}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`;
    const wasHidden = sheet.hidden || skel; sheet.hidden = false; requestAnimationFrame(() => sheet.classList.add("is-open"));
    if (!isWide()) setDetent(wasHidden ? 1 : detent);
    sheetIn.querySelector(".m3-x")!.addEventListener("click", () => select(null));
    sheetIn.querySelector("[data-share]")?.addEventListener("click", share);
    sheetIn.querySelectorAll<HTMLButtonElement>("[data-goto]").forEach((b) => b.addEventListener("click", () => select(b.dataset.goto!)));
    // Operator, step 1: "Fontes" opens the dated sources; "Ver a análise completa" the unlock sheet (soft preview, "Disponível
    // em breve"); "O consultor ajuda" is a[data-concierge] (scripts/chrome.ts opens the Concierge with ?place= filled in).
    sheetIn.querySelector("[data-sources]")?.addEventListener("click", openSources);
    sheetIn.querySelector("[data-unlock-open]")?.addEventListener("click", () => { if (ctx) ev({ event: "map/cta/paid", ...evPlace(ctx), origin: mode }); openUnlock("card"); });
    sheetIn.querySelector("[data-cta-consult]")?.addEventListener("click", () => { if (ctx) ev({ event: "map/cta/consult", ...evPlace(ctx), origin: mode }); });
    // The gallery: swipe (or scroll) through the place's views; the dots follow; each new view seen is one event.
    const gt = sheetIn.querySelector<HTMLElement>("[data-gal-t]");
    if (gt) { const dots = [...sheetIn.querySelectorAll<HTMLElement>(".m3-gal-d i")]; let seen = 0;
      gt.addEventListener("scroll", () => { const i = Math.round(gt.scrollLeft / Math.max(1, gt.clientWidth)); dots.forEach((d, k) => d.classList.toggle("is-on", k === i)); if (i > seen && ctx) { seen = i; ev({ event: `map/gallery/${i + 1}`, ...evPlace(ctx), origin: mode }); } }, { passive: true }); }
    if (focus && wasHidden && root.contains(document.activeElement)) sheetIn.querySelector<HTMLElement>("h2, h3")?.focus({ preventScroll: true });
  }
  function closeSheet() { timeEnd(); arrStop(); if (selProj) { selProj = null; syncUrl(); }
    // The 2D map (phones) is tilted only for an arrival: closing the card sets it flat again.
    if (map && flat && (map.getPitch() > 0.5 || Math.abs(map.getBearing()) > 0.5)) map.easeTo({ pitch: 0, bearing: 0, duration: reduce() ? 0 : 600 });
    ctx = null; rerender = null; view = "card"; if (selRegion) { selRegion = null; syncUrl(); } sheet.classList.remove("is-open"); setTimeout(() => { if (!sheet.classList.contains("is-open")) sheet.hidden = true; }, 260); pinA = null; if (map?.getLayer("sel")) map.setFilter("sel", ["==", ["get", "s"], ""]); }
  function setDetent(d: number) { detent = d; sheet.dataset.detent = String(d); }
  { // drag the sheet between its three heights (mobile)
    const grab = $("[data-grab]"); let y0 = 0, h0 = 0, on = false;
    grab.addEventListener("pointerdown", (e) => { on = true; y0 = e.clientY; h0 = sheet.getBoundingClientRect().height; grab.setPointerCapture(e.pointerId); sheet.classList.add("is-drag"); });
    grab.addEventListener("pointermove", (e) => { if (on) sheet.style.height = `${Math.max(90, h0 - (e.clientY - y0))}px`; });
    const end = (e: PointerEvent) => { if (!on) return; on = false; sheet.classList.remove("is-drag"); const hh = sheet.getBoundingClientRect().height / root.clientHeight; sheet.style.height = ""; if (Math.abs(e.clientY - y0) < 6) { setDetent(detent === 2 ? 1 : 2); return; } hh < 0.25 ? (hh < 0.12 ? select(null) : setDetent(0)) : setDetent(hh < 0.66 ? 1 : 2); };
    grab.addEventListener("pointerup", end); grab.addEventListener("pointercancel", end);
  }
  async function share() { syncUrl(); ev({ event: "map/share", place: selected ?? undefined, origin: navigator.share ? "native" : "copy" }); try { if (navigator.share) await navigator.share({ url: location.href }); else { await navigator.clipboard.writeText(location.href); toast(L.copied); } } catch { /* closed */ } }
  function toast(t: string) { const el = $("[data-toast]"); el.textContent = t; el.hidden = false; el.classList.add("is-on"); clearTimeout((el as any).t); (el as any).t = setTimeout(() => { el.classList.remove("is-on"); setTimeout(() => (el.hidden = true), 250); }, 2600); }

  // ------------------------------------------------------------ parishes, golf, beaches, developments
  let parLoading: Promise<void> | null = null;
  function loadParishes() {
    return parLoading ??= (async () => {
      const [topo, data] = await Promise.all([fetch("/data/map/parishes.topo.json").then((r) => r.json()), fetch("/data/map/parishes5.json").then((r) => r.json())]);
      const geo: any = feature(topo, topo.objects.p); parishes = { feats: geo.features, data: data.parishes };
      map.addSource("pars", { type: "geojson", data: geo, promoteId: "id" });
      map.addLayer({ id: "par-fill", type: "fill", source: "pars", minzoom: 8.2, paint: { "fill-color": colorExpr(), "fill-opacity": ["interpolate", ["linear"], ["zoom"], 8.2, 0, 8.7, 0.8] } as any }, "hill");
      map.addLayer({ id: "par-line", type: "line", source: "pars", minzoom: 8.2, paint: { "line-color": "rgba(40,50,48,0.22)", "line-width": 0.5 } }, "hill");
      applyValues();
    })();
  }
  // Golf from our own list (prompt 36 §9: content/facts/golf/courses.csv → golf.json, scripts/map-data/golf_list.py):
  // OpenStreetMap outlines where they exist, an elegant pin everywhere else, courses being built marked as such.
  type Course = { id: number; n: string; resort: string; m: string; holes: number | null; designer: string; year: string; status: string; url: string; x: number; y: number; outline: boolean };
  async function loadGolf(): Promise<{ courses: Course[]; outlines: any }> {
    return golf ??= await fetch("/data/map/golf.json").then((r) => (r.ok ? r.json() : Promise.reject())).catch(async () => {
      const g = await fetch("/data/map/golf.geojson").then((r) => r.json()).catch(() => ({ features: [] }));
      return { courses: g.features.filter((f: any) => f.properties.n).map((f: any, i: number) => ({ id: i, n: f.properties.n, resort: "", m: f.properties.m, holes: null, designer: "", year: "", status: "open", url: "", x: f.properties.x, y: f.properties.y, outline: true })),
        outlines: { type: "FeatureCollection", features: g.features.filter((f: any) => f.properties.n).map((f: any, i: number) => ({ ...f, properties: { c: i } })) } };
    });
  }
  async function drawGolf() {
    const G = await loadGolf();
    if (!map.getSource("golf")) {
      map.addSource("golf", { type: "geojson", data: G.outlines });
      map.addSource("golfpt", { type: "geojson", data: { type: "FeatureCollection", features: G.courses.map((c) => ({ type: "Feature", properties: { c: c.id, o: c.outline, soon: c.status !== "open" }, geometry: { type: "Point", coordinates: [c.x, c.y] } })) } });
      map.addLayer({ id: "golf", type: "fill", source: "golf", minzoom: 9, paint: { "fill-color": "#5f8a4c", "fill-opacity": 0.85 } });
      const pin = (id: string, filter: any, extra: any = {}) => map.addLayer({ id, type: "circle", source: "golfpt", filter, ...extra, paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 6, 3, 9, 5.5, 12, 7], "circle-color": ["case", ["get", "soon"], "#ffffff", "#2f5d50"],
        "circle-stroke-color": ["case", ["get", "soon"], "#2f5d50", "#ffffff"], "circle-stroke-width": ["case", ["get", "soon"], 1.8, 1.4] } });
      pin("golfpt", ["!", ["get", "o"]]);                       // pins: courses OpenStreetMap has no outline for
      pin("golfpt-o", ["get", "o"], { maxzoom: 10 });            // until their outline is large enough to see
    }
    for (const id of ["golf", "golfpt", "golfpt-o"]) map.setLayoutProperty(id, "visibility", overlays.golf ? "visible" : "none");
  }
  function golfAt(pt: { x: number; y: number }): Course | null {
    if (!golf || !map.getLayer("golfpt")) return null;
    const f = map.queryRenderedFeatures([[pt.x - 6, pt.y - 6], [pt.x + 6, pt.y + 6]], { layers: ["golfpt", "golfpt-o", "golf"] })[0];
    return f ? golf.courses[f.properties.c] ?? null : null;
  }
  function showGolf(g: Course) {
    ev({ event: "map/card/golf", place: g.m || undefined, origin: mode }); ctx = null;
    timeEnd(); selected = null; selRegion = null; if (map?.getLayer("sel")) map.setFilter("sel", ["==", ["get", "s"], ""]);
    const muni = byS.get(g.m)?.n ?? "";
    const when = g.status !== "open" ? L.golf.opening.replace("{y}", g.year || "—") : g.year;
    let h = `<div class="m3-photo m3-photo-none m3-golfband"></div><div class="m3-sb"><p class="m3-kick">${esc([g.resort !== g.n ? g.resort : "", muni].filter(Boolean).join(" · "))}</p><h3 tabindex="-1">${esc(g.n)}</h3>`;
    h += `<dl class="m3-stats"><div><dt>${L.golf.holes}</dt><dd>${g.holes ?? "—"}</dd></div><div><dt>${L.golf.design}</dt><dd class="m3-dd-s">${esc(g.designer || "—")}</dd></div><div><dt>${g.status !== "open" ? L.golf.status : L.golf.opened}</dt><dd class="m3-dd-s">${esc(when || "—")}</dd></div></dl>`;
    h += `<div class="m3-acts"><a class="m3-btn m3-btn-p" href="${cfg.links.buy}?place=${encodeURIComponent(muni)}&budget=${Math.round(budget)}">${L.golf.homes}</a><a class="m3-btn" href="${cfg.links.consult}?place=${encodeURIComponent(muni)}">${L.card.concierge}</a></div>`;
    h += `<div class="m3-more">${g.m ? `<button type="button" class="m3-link" data-goto="${g.m}">${esc(muni)}</button>` : ""}${g.url ? `<a class="m3-link" href="${esc(g.url)}" rel="noopener" target="_blank">${L.golf.site}</a>` : ""}</div>`;
    h += `<p class="m3-src">${L.golf.src}</p></div>`;
    openSheet(h, true);
    if (map) flyTo(g.x, g.y, Math.max(map.getZoom(), 12));
  }
  async function drawBeaches() {
    beaches ??= await fetch("/data/map/beaches.json").then((r) => r.json()).catch(() => []);
    if (!map.getSource("beach")) {
      map.addSource("beach", { type: "geojson", data: { type: "FeatureCollection", features: beaches!.map(([x, y, n]) => ({ type: "Feature", properties: { n }, geometry: { type: "Point", coordinates: [x, y] } })) } });
      map.addLayer({ id: "beach", type: "circle", source: "beach", paint: { "circle-radius": ["interpolate", ["linear"], ["zoom"], 6, 1.6, 10, 4.5], "circle-color": "#f2d48a", "circle-stroke-color": "#8a6a1f", "circle-stroke-width": 0.6 } });
    }
    map.setLayoutProperty("beach", "visibility", overlays.beach ? "visible" : "none");
  }
  // Prompt 39 §2.2: one pin per listed project, visible from the opening view. Pins closer than 44 px on screen merge into
  // one with a count; a tap on it zooms in until they part. DOM markers, so the same code works flat and on the 3D terrain.
  let markers: { p: Proj; el: HTMLButtonElement; m: any; grp: Proj[] }[] = [], clusterOn = false, clT = 0;
  function drawProjects() {
    markers.forEach((x) => x.m.remove()); markers = []; if (!overlays.devs || !map) return;
    for (const p of projects) {
      // D83 part 2: a small photo pin (the developer's own render), the name and "Patrocinado" from city zoom.
      // Prompt 68: a development with a hero line is found freely: its pin never merges into a group (close pins stand side
      // by side instead, below), every pin the same size; a pick of ours keeps its short label ("Seleção", from its "tag")
      // under the pin at every zoom. No ranking: nothing else sets one pin apart.
      const el = document.createElement("button"); el.type = "button"; el.className = p.pin ? "m3-pin m3-pin-ph" : "m3-pin";
      el.innerHTML = `<b class="m3-pin-n"></b><span>${esc(p.name)}${p.tag || !p.hero ? `<em>${esc(p.tag || L.sponsored)}</em>` : ""}</span>${p.pin ? `<img class="m3-pin-img" src="${esc(p.pin)}" alt="" width="44" height="44" decoding="async"><i class="m3-pin-tip" aria-hidden="true"></i>` : `<i class="m3-pin-dot" aria-hidden="true"></i>`}${p.hero && p.tag ? `<small class="m3-pin-t" aria-hidden="true">${esc(p.tag)}</small>` : ""}`;
      const x = { p, el, m: null as any, grp: [p] };
      el.addEventListener("click", (e) => {
        e.stopPropagation(); stopTour();
        if (x.grp.length > 1) { const b = new ml.LngLatBounds(); x.grp.forEach((g) => b.extend([g.lon, g.lat])); map.fitBounds(b, { padding: 120, maxZoom: 14, duration: reduce() ? 0 : 900 }); return; }
        if (map.getZoom() < 10) flyTo(p.lon, p.lat, 12.6);
        showProject(p);
      });
      x.m = new ml.Marker({ element: el, anchor: "bottom" }).setLngLat([p.lon, p.lat]).addTo(map);
      markers.push(x);
    }
    if (!clusterOn) { clusterOn = true; map.on("move", () => { if (!clT) clT = requestAnimationFrame(() => { clT = 0; clusterPins(); }); }); }
    clusterPins();
  }
  function clusterPins() {
    if (!map || !markers.length) return; const z = map.getZoom(), done = new Set<typeof markers[0]>();
    const at = new Map(markers.map((x) => [x, map.project([x.p.lon, x.p.lat])]));
    for (const a of markers) {
      if (done.has(a)) continue; done.add(a); const ca = at.get(a)!; const grp = [a];
      if (z < 14 && !a.p.hero) for (const b of markers) if (!done.has(b) && !b.p.hero) { const cb = at.get(b)!; if (Math.hypot(ca.x - cb.x, ca.y - cb.y) < 44) { grp.push(b); done.add(b); } }
      a.grp = grp.map((g) => g.p); a.el.style.display = "";
      for (const b of grp.slice(1)) { b.grp = []; b.el.style.display = "none"; }
      const n = grp.length; a.el.classList.toggle("is-cluster", n > 1);
      a.el.querySelector(".m3-pin-n")!.textContent = n > 1 ? String(n) : "";
      a.el.setAttribute("aria-label", n > 1 ? `${n} · ${L.g.devs}` : a.p.tag ? `${a.p.name}, ${a.p.tag}` : a.p.name);
    }
    // Prompt 68: pins closer than a pin's width on screen (O'rizon and Marble Terrace are 2.5 km apart) stand side by side,
    // west to east, around their middle, each still pointing at its own spot once the zoom parts them. The name shows from
    // city zoom (§2.3) only where it has room.
    const vis = markers.filter((m) => m.el.style.display !== "none"), at0 = new Map(vis.map((m) => [m, map.project([m.p.lon, m.p.lat])]));
    const off = new Map<typeof markers[0], [number, number]>(), left = new Set(vis);
    for (const m of vis) {
      if (!left.has(m)) continue; left.delete(m); const g = [m];
      for (let i = 0; i < g.length; i++) for (const o of [...left]) { const a = at0.get(g[i])!, b = at0.get(o)!; if (Math.hypot(a.x - b.x, a.y - b.y) < 52) { g.push(o); left.delete(o); } }
      g.sort((a, b) => a.p.lon - b.p.lon);
      const cx = g.reduce((t, x) => t + at0.get(x)!.x, 0) / g.length, cy = g.reduce((t, x) => t + at0.get(x)!.y, 0) / g.length;
      // Prompt 71: two picks side by side (Vilamoura) stand wider apart, so their "Our pick" labels never overlap.
      const gap = g.filter((x) => x.p.hero && x.p.tag).length > 1 ? 84 : 54;
      g.forEach((x, i) => { const pt = at0.get(x)!; off.set(x, g.length > 1 ? [cx + (i - (g.length - 1) / 2) * gap - pt.x, cy - pt.y] : [0, 0]); });
      // p70 (J-19): pins standing side by side are closer than their short labels are wide, so the labels wait for a closer
      // zoom (the photographs alone at the overview); every pin keeps its label in its aria-label.
      g.forEach((x) => x.el.classList.toggle("is-crowd", g.length > 1));
    }
    for (const m of vis) {
      const o = off.get(m) ?? [0, 0], prev = (m as any).off as [number, number] | undefined;
      if (!prev || prev[0] !== Math.round(o[0]) || prev[1] !== Math.round(o[1])) { (m as any).off = [Math.round(o[0]), Math.round(o[1])]; m.m.setOffset((m as any).off); }
      const p0 = at0.get(m)!, x0 = p0.x + o[0], y0 = p0.y + o[1];
      const room = !vis.some((n) => n !== m && Math.abs(at0.get(n)!.x + (off.get(n)?.[0] ?? 0) - x0) < 170 && Math.abs(at0.get(n)!.y + (off.get(n)?.[1] ?? 0) - y0) < 90);
      m.el.classList.toggle("is-named", !m.el.classList.contains("is-cluster") && z >= 10 && room);
      // p70 (J-19, MI-22): two short labels that would touch (pins apart, labels wider than the gap) both wait too.
      const lw = (n: typeof m) => (n.p.hero && n.p.tag ? n.p.tag.length * 7 + 18 : 0), w0 = lw(m);
      if (w0 && !m.el.classList.contains("is-crowd")) m.el.classList.toggle("is-crowd", vis.some((n) => n !== m && lw(n) && Math.abs(at0.get(n)!.x + (off.get(n)?.[0] ?? 0) - x0) < (w0 + lw(n)) / 2 + 6 && Math.abs(at0.get(n)!.y + (off.get(n)?.[1] ?? 0) - y0) < 26));
    }
    labelsSoon();  // the place names make room for the pins
  }

  // Prompt 38: a partner project's card (photo, name, summary, three features, homes for sale now, price on request).
  function showProject(p: Proj, open = true) {
    step(`project:${p.id}`); timeEnd(); ev({ event: `p/${p.id}/pin`, place: p.id, origin: "map" }); ev({ event: "map/card/project", place: p.id, origin: mode }); ctx = null; selRegion = null;
    const pl = cfg.pl ?? {};
    selProj = p.id; selected = null; syncUrl();
    if (p.hero && cfg.p68) {
      // Prompt 68: a project with a hero line opens like the hero of its place's card: the render, the name, one line, one
      // action (the private viewing, on the showcase's own request sheet), the showcase as a quiet link, and its place.
      const img = p.heroImg || p.render || "", pm2 = byS.get(p.muni)?.n ?? p.muniName ?? "";
      let hh = `${img ? `<img class="m3-photo m3-hero-top" src="${esc(img)}-800.webp" srcset="${esc(img)}-800.webp 800w, ${esc(img)}-1600.webp 1600w" sizes="(max-width: 819px) 100vw, 400px" alt="" width="800" height="450" fetchpriority="high">` : ""}`;
      // Prompt 68: the label only where the data gives one (O'rizon's "tag"); a development not yet signed carries none.
      hh += `<div class="m3-sb m3-arr"><p class="m3-kick">${esc(pm2)}${p.tag ? ` · <span class="m3-tag">${esc(p.tag)}</span>` : ""}</p><div class="ht-row"><h2 class="m3-h" tabindex="-1">${esc(p.name)}</h2>${heartHTML("home", p.id, pm2 ? `${p.name}, ${pm2}` : p.name, p.showcase)}</div>`;
      hh += `<p class="m3-arr-l">${esc(p.hero)}</p>${p.from ? `<p class="m3-line">${esc(L.pfrom.replace("{v}", eur.format(p.from)))}</p>${totalLine(p.from)}` : ""}`;
      hh += `<a class="m3-btn m3-btn-p m3-btn-w" href="${esc(p.visit || `${p.showcase}#pedir`)}" data-visit>${esc(cfg.p68.visit)}</a>`;
      // Prompt 69: the Concierge from the project card opens on this project (its first step already chosen).
      const cg = cfg.p69 ? `<a class="m3-link" href="${esc(`${cfg.links.consult}?project=${encodeURIComponent(p.id)}&place=${encodeURIComponent(pm2)}`)}" data-concierge data-cta-consult>${esc(cfg.p69.cg)} →</a>` : "";
      hh += `<p class="m3-hero-v m3-quiet"><a class="m3-link" href="${esc(p.showcase)}" data-view>${esc(cfg.p68.view)} →</a>${byS.has(p.muni) || pm2 ? `<button type="button" class="m3-link" data-goto="${esc(p.muni)}">${esc(pm2)} →</button>` : ""}${cg}</p></div>`;
      openSheet(hh, open, true);
      sheetIn.querySelector("[data-visit]")?.addEventListener("click", () => ev({ event: "map/visit", place: p.muni, step: p.id, origin: mode }));
      sheetIn.querySelector("[data-view]")?.addEventListener("click", () => ev({ event: "map/hero/view", place: p.muni, step: p.id, origin: mode }));
      return;
    }
    const photo = p.render ? `<img class="m3-photo" src="${esc(p.render)}-800.webp" alt="" width="800" height="450">` : "";
    const pm = byS.get(p.muni)?.n ?? "";
    let h = `${photo}<div class="m3-sb"><p class="m3-kick">${esc(pm)} · <span class="m3-tag">${esc(p.tag || L.sponsored)}</span></p><div class="ht-row"><h3 tabindex="-1">${esc(p.name)}</h3>${heartHTML("home", p.id, pm ? `${p.name}, ${pm}` : p.name, p.showcase)}</div>`;
    h += `<p class="m3-buys">${esc(p.summary ?? p.developer)}</p>`;
    if (p.feats?.length) h += `<ul class="m3-det">${p.feats.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`;
    if (p.now != null && pl.now) h += `<p class="m3-buys"><b>${esc(pl.now.replace("{n}", String(p.now)))}</b></p>`;
    h += `<p class="m3-buys">${p.from ? L.pfrom.replace("{v}", eur.format(p.from)) : esc(pl.price ?? L.ponreq)}</p>${p.from ? totalLine(p.from) : ""}`;
    h += `<div class="m3-acts"><a class="m3-btn m3-btn-p" href="${esc(p.showcase)}">${esc(pl.view ?? p.name)}</a><a class="m3-btn" href="${esc(p.visit || `${p.showcase}#pedir`)}">${esc(pl.visit ?? "")}</a></div></div>`;
    openSheet(h, open);
  }

  // ------------------------------------------------------------ time: the last five years (21 quarters, /data/map/price5.json) in about twelve seconds
  const scrub = root.querySelector<HTMLElement>("[data-scrub]"), playBtn = root.querySelector<HTMLButtonElement>("[data-play]");
  let playing = 0;
  function setQuarter(i: number) {
    if (!P) return; qi = i >= last() ? -1 : Math.max(0, i);
    const t = at() / last(); const st = root.querySelector<HTMLElement>("[data-sthumb]"), sf = root.querySelector<HTMLElement>("[data-sfill]");
    if (st) st.style.left = `${t * 100}%`; if (sf) sf.style.width = `${t * 100}%`;
    const y = root.querySelector<HTMLElement>("[data-year]"); if (y) y.textContent = qLabel(P.quarters[at()]);
    scrub?.setAttribute("aria-valuenow", String(at())); scrub?.setAttribute("aria-valuetext", qLabel(P.quarters[at()]));
    applyValues(); legend(); syncUrl();
  }
  function play(totalMs = 12000) {
    return new Promise<void>((res) => {
      if (!P) { res(); return; } if (layer !== "price") setLayer("price");
      cancelAnimationFrame(playing); const t0 = performance.now(), n = last(); let lastI = -2;
      playBtn?.classList.add("is-on"); playBtn?.setAttribute("aria-label", L.pause);
      const step = (now: number) => { const k = Math.min((now - t0) / totalMs, 1), i = Math.round(k * n); if (i !== lastI) { lastI = i; setQuarter(i); } if (k < 1) playing = requestAnimationFrame(step); else { stopPlay(); res(); } };
      setQuarter(0); playing = requestAnimationFrame(step);
    });
  }
  function stopPlay() { cancelAnimationFrame(playing); playing = 0; playBtn?.classList.remove("is-on"); playBtn?.setAttribute("aria-label", L.play); }
  playBtn?.addEventListener("click", async () => { await load(); playing ? stopPlay() : play(); });
  if (scrub) {
    let on = false; const fromX = (e: PointerEvent) => { const r = scrub.getBoundingClientRect(); setQuarter(Math.round(((e.clientX - r.left) / r.width) * last())); };
    scrub.addEventListener("pointerdown", async (e) => { await load(); stopPlay(); on = true; scrub.setPointerCapture(e.pointerId); fromX(e); });
    scrub.addEventListener("pointermove", (e) => { if (on) fromX(e); }); scrub.addEventListener("pointerup", () => (on = false));
    scrub.addEventListener("keydown", (e) => { if (!P) return; const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (d) { e.preventDefault(); setQuarter(at() + d); } });
  }

  // ------------------------------------------------------------ tours: the reader can take over at any moment
  const cap = $("[data-caption]");
  function caption(t: string) { cap.textContent = t; cap.hidden = !t; cap.classList.toggle("is-on", !!t); }
  function stopTour() { if (tourAbort) { tourAbort(); tourAbort = null; } }
  const placeCap = (s: string) => { const p = byS.get(s), v = P?.munis[s]?.m2[last()]; return `${p?.n ?? s}${v ? ` · ${eur.format(v)}/m²` : ""}`; };
  async function tour(kind: string) {
    await load(); stopTour(); halt(); select(null);
    let stop = false; tourAbort = () => { stop = true; map.stop(); stopPlay(); caption(""); root.classList.remove("is-touring"); };
    root.classList.add("is-touring");
    const fly = (o: any, ms: number, text: string) => new Promise<void>((res) => { if (stop) return res(); caption(text); map.flyTo({ ...o, duration: reduce() ? 0 : ms, essential: true, curve: 1.2, easing: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 }); map.once("moveend", () => setTimeout(res, reduce() ? 0 : 450)); });
    const at2 = (s: string, z: number, b: number, p = 58) => { const x = byS.get(s) ?? byS.get("lisboa")!; return { center: [x.x, x.y], zoom: z, bearing: b, pitch: flat ? 0 : p }; };
    if (kind === "coast") {
      for (const [s, b] of [["porto", -20], ["aveiro", -12], ["figueira-da-foz", -8], ["nazare", -4], ["peniche", 0], ["cascais", 8], ["lisboa", 14], ["setubal", 20], ["grandola", 26]] as [string, number][]) { if (stop) break; await fly(at2(s, 9.2, b), 2000, placeCap(s)); }
    } else if (kind === "golf") {
      await setOverlay("golf", true); const n = golf?.courses.filter((f: any) => f.status === "open" && ["lagos", "portimao", "lagoa", "silves", "albufeira", "loule", "faro", "olhao", "tavira", "castro-marim", "vila-real-de-santo-antonio", "vila-do-bispo", "aljezur", "monchique", "sao-bras-de-alportel", "alcoutim"].includes(f.m)).length ?? 0;
      await fly(at2("albufeira", 8.2, -20, 50), 2600, L.golfcap.replace("{n}", n));
      for (const [s, b] of [["lagos", -12], ["portimao", -6], ["albufeira", 2], ["loule", 10], ["tavira", 18], ["vila-real-de-santo-antonio", 24]] as [string, number][]) { if (stop) break; await fly(at2(s, 10.4, b, 62), 2400, placeCap(s)); }
    } else if (kind === "madeira") {
      for (const [s, z, b] of [["funchal", 9.4, -10], ["camara-de-lobos", 10, -18], ["calheta-r-a-m", 9.8, -26], ["porto-moniz", 10, -36], ["santana", 9.8, -44], ["machico", 10, -52], ["porto-santo", 9.6, -60]] as [string, number, number][]) { if (stop) break; await fly(at2(s, z, b, 55), 2300, placeCap(s)); }
    } else if (kind.startsWith("project:")) {
      // Prompts 38 and 39 §2.5: from the Atlantic over the municipality seat to the listed project, whose card opens.
      const p = projects.find((x) => x.id === kind.slice(8)), m = p ? byS.get(p.muni) : undefined;
      if (p) {
        await setOverlay("devs", true);
        await fly({ center: [p.lon - 0.5, p.lat + 0.01], zoom: 9.4, bearing: 80, pitch: flat ? 0 : 50 }, 2400, "");
        if (m) await fly({ center: [m.x, m.y], zoom: 12.2, bearing: 70, pitch: flat ? 0 : 60 }, 3600, placeCap(p.muni));
        await fly({ center: [p.lon, p.lat], zoom: 15.6, bearing: 40, pitch: flat ? 0 : 64 }, 3800, `${p.name} · ${m?.n ?? ""}`);
        if (!stop) showProject(p, false);
      }
    } else if (kind === "time") {
      const h = (root as any).__home; await fly({ ...h, pitch: flat ? 0 : 30, bearing: 0 }, 1600, ""); if (!stop) { const tick = setInterval(() => { if (P && !stop) caption(L.timecap.replace("{q}", qLabel(P.quarters[at()]))); }, 200); await play(18000); clearInterval(tick); }
    }
    if (!stop) { caption(""); root.classList.remove("is-touring"); tourAbort = null; }
  }
  root.querySelectorAll<HTMLButtonElement>("[data-tour]").forEach((b) => b.addEventListener("click", () => tour(b.dataset.tour!)));

  // ------------------------------------------------------------ prompt 71 §2: the south coast (US edition only, cfg.south)
  // One arrival, three stops (Sines, Comporta, the Algarve golf coast): the camera flies to each, and the card shows one
  // photograph, the name, one line, one number and the drive from Lisbon; "Next" goes on, the last stop turns the golf
  // layer on. Any touch on the map takes over, as on the tours. Wording: COPY_DECK.md "p71.south.*".
  type Stop = { id: string; name: string; lon: number; lat: number; z: number; b: number; ph?: string; line: string; num: string; lab: string; dist: string; more?: string[]; src: { t: string; u: string }[] };
  async function southStop(i: number) {
    const S: Stop[] = cfg.south ?? [], st = S[i]; if (!st) return;
    await load(); stopTour(); halt(); arrStop(); selected = null; selRegion = null; selProj = null; ctx = null; syncUrl();
    if (map) { map.setFilter("sel", ["==", ["get", "s"], ""]); map.flyTo({ center: [st.lon, st.lat], zoom: st.z, bearing: flat ? 0 : st.b, pitch: flat ? 0 : 55, duration: reduce() ? 0 : 2200, curve: 1.3, easing: ease, essential: true,
      padding: isWide() ? { right: 440, left: 0, top: 60, bottom: 80 } : { bottom: canvas.clientHeight * 0.55, top: 70, left: 0, right: 0 } }); }
    ev({ event: "map/south", step: st.id, origin: mode });
    const nx = S[i + 1], P7 = cfg.p71;
    let h = st.ph ? `<img class="m3-photo m3-hero-top" src="${esc(st.ph)}-1024.webp" srcset="${esc(st.ph)}-640.webp 640w, ${esc(st.ph)}-1024.webp 1024w, ${esc(st.ph)}-1600.webp 1600w" sizes="(max-width: 819px) 100vw, 400px" alt="" width="1024" height="640">` : `<div class="m3-photo m3-photo-none"></div>`;
    h += `<div class="m3-sb m3-arr"><p class="m3-kick">${esc(P7.k.replace("{i}", String(i + 1)).replace("{n}", String(S.length)))}</p><h2 class="m3-h m3-h-xl" tabindex="-1">${esc(st.name)}</h2>`;
    h += `<p class="m3-arr-l">${esc(st.line)}</p><p class="m3-south-n"><b>${esc(st.num)}</b><span>${esc(st.lab)}</span></p><p class="m3-line">${esc(st.dist)}</p>`;
    for (const m of st.more ?? []) h += `<p class="m3-line">${esc(m)}</p>`;
    h += `<button type="button" class="m3-btn m3-btn-p m3-btn-w" data-south-next>${esc(nx ? P7.next.replace("{name}", nx.name) : P7.golf)} →</button>`;
    h += `<p class="m3-src">${st.src.map((z) => `<a href="${esc(z.u)}" rel="noopener" target="_blank">${esc(z.t)}</a>`).join(" · ")}</p></div>`;
    openSheet(h, true, true); sheetIn.scrollTop = 0;
    sheetIn.querySelector("[data-south-next]")?.addEventListener("click", async () => {
      if (nx) { southStop(i + 1); return; }
      ev({ event: "map/south/golf", origin: mode }); await setOverlay("golf", true); closeSheet();
    });
  }
  root.querySelectorAll<HTMLButtonElement>("[data-south]").forEach((b) => b.addEventListener("click", () => southStop(0)));

  // ------------------------------------------------------------ the home page's slow rotation (prompt 34 §2)
  let rotating = false, halted = false, haltTimer = 0;
  function spin() { if (!rotating || !map) return; map.easeTo({ bearing: map.getBearing() + 6, duration: 4000, easing: (t: number) => t }); map.once("moveend", spin); }
  function startSpin() { if (halted || rotating || !map) return; rotating = true; if (!haltTimer) haltTimer = window.setTimeout(halt, 15000); spin(); }
  function halt() { if (halted) return; halted = true; clearTimeout(haltTimer); if (rotating && map) map.stop(); rotating = false; }

  // ------------------------------------------------------------ search, like Spotlight (the magnifier, ⌘K, or "/")
  const spot = $("[data-spot]"), spotIn = $<HTMLInputElement>("[data-spot-in]"), spotRes = $<HTMLUListElement>("[data-spot-res]");
  type Hit = { g: keyof typeof L.g; n: string; sub?: string; id?: string; go: () => void };
  let pool: Hit[] = [], active = 0, hits: Hit[] = [], poolReady = false, enterWaiting = false;
  // p70 (MI-04, S-10): the places are searchable as soon as their small list (munis.topo.json) is here, before the map
  // itself; until then the list says "Searching…" (never "not found") and an Enter waits for it, then opens the first match.
  async function buildPool() {
    load();
    const topo = features.length ? null : await fetch("/data/map/munis.topo.json").then((r) => r.json()).catch(() => null);
    const props: Props[] = features.length ? features.map((f) => f.properties as Props) : topo ? (feature(topo, topo.objects.m) as any).features.map((f: any) => f.properties as Props) : [];
    const nameOf = (s: string) => byS.get(s)?.n ?? props.find((p) => p.s === s)?.n;
    const pl: Hit[] = props.map((p) => ({ g: "munis", n: p.n, sub: L.regions[p.r], id: p.s, go: () => select(p.s) }));
    for (const [n, x, y, m] of LOCALITIES) pl.push({ g: "munis", n, sub: nameOf(m), id: m, go: () => { select(m, false); if (map) flyTo(x, y, 10.2); else load().then(() => flyTo(x, y, 10.2)); } });
    for (const p of projects) pl.push({ g: "devs", n: p.name, sub: p.developer, id: p.id, go: () => { if (map) flyTo(p.lon, p.lat, 14); setOverlay("devs", true); showProject(p); } });
    pool = [...pl]; poolReady = true; find();
    if (enterWaiting) { enterWaiting = false; if (hits.length) choose(active); }
    await load();
    try { const pt = await fetch("/data/map/parishes.topo.json").then((r) => r.json()); for (const f of (feature(pt, pt.objects.p) as any).features) pl.push({ g: "pars", n: f.properties.n, sub: byS.get(f.properties.m)?.n, id: `p-${f.properties.id}`, go: async () => { await loadParishes(); const m = byS.get(f.properties.m)!; flyTo(m.x, m.y, 9.4); setTimeout(() => selectParish(f.properties.id), 900); } }); } catch { /* parishes optional */ }
    for (const c of (await loadGolf()).courses) pl.push({ g: "golf", n: c.n, sub: byS.get(c.m)?.n, id: c.m, go: async () => { await setOverlay("golf", true); showGolf(c); } });
    beaches ??= await fetch("/data/map/beaches.json").then((r) => r.json()).catch(() => []);
    for (const [x, y, n] of beaches!) pl.push({ g: "beach", n, go: async () => { await setOverlay("beach", true); flyTo(x, y, 11.6); toast(n); } });
    pool = pl; if (!spot.hidden && spotIn.value.trim()) find();
  }
  function find() {
    const t = plain(spotIn.value.trim()); active = 0;
    hits = !t ? [] : pool.filter((h) => plain(h.n).includes(t)).sort((a, b) => Number(!plain(a.n).startsWith(t)) - Number(!plain(b.n).startsWith(t)) || (a.g === "munis" ? -1 : 0) - (b.g === "munis" ? -1 : 0)).slice(0, 12);
    let g = "", h = "";
    hits.forEach((x, i) => { if (x.g !== g) { g = x.g; h += `<li class="m3-rg" role="presentation">${L.g[g]}</li>`; } h += `<li role="option" id="m3o-${i}" data-i="${i}" aria-selected="${i === active}">${esc(x.n)}${x.sub ? `<span>${esc(x.sub)}</span>` : ""}</li>`; });
    if (t && !hits.length) h = `<li class="m3-none">${poolReady ? L.nomatch : L.findWait}</li>`;
    spotRes.innerHTML = h; hits.length ? spotIn.setAttribute("aria-activedescendant", "m3o-0") : spotIn.removeAttribute("aria-activedescendant");
    // Type "Comp" and the map already glides there.
    if (hits[0] && hits[0].g === "munis" && plain(hits[0].n).startsWith(t) && t.length >= 3 && map) { const lo = LOCALITIES.find((l) => l[0] === hits[0].n); const p = lo ? { x: lo[1], y: lo[2] } : features.find((f) => f.properties.n === hits[0].n)?.properties; if (p) map.easeTo({ center: [p.x, p.y], zoom: Math.max(map.getZoom(), 7.4), duration: 700 }); }
  }
  const mark = () => spotRes.querySelectorAll("[role=option]").forEach((li) => li.setAttribute("aria-selected", String(Number((li as HTMLElement).dataset.i) === active)));
  function openSpot() { spot.hidden = false; requestAnimationFrame(() => spot.classList.add("is-open")); spotIn.value = ""; spotRes.innerHTML = ""; spotIn.focus(); if (!pool.length) buildPool().then(find); halt(); }
  function closeSpot() { spot.classList.remove("is-open"); setTimeout(() => (spot.hidden = true), 200); }
  // D83 part 2: the place the search resolved to (a slug or a parish code, never the typed text).
  const choose = (i: number) => { const h = hits[i]; if (!h) return; ev({ event: `map/search/${h.g}`, place: h.id, origin: mode }); closeSpot(); h.go(); };
  root.querySelector("[data-spot-open]")!.addEventListener("click", openSpot);
  spotIn.addEventListener("input", find);
  spotIn.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { active = Math.min(active + 1, hits.length - 1); mark(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { active = Math.max(active - 1, 0); mark(); e.preventDefault(); }
    else if (e.key === "Enter") { e.preventDefault(); if (!poolReady) enterWaiting = true; else { if (!hits.length) find(); choose(active); } } else if (e.key === "Escape") closeSpot();
    if (hits.length) spotIn.setAttribute("aria-activedescendant", `m3o-${active}`);
  });
  spotRes.addEventListener("click", (e) => { const li = (e.target as HTMLElement).closest<HTMLElement>("[data-i]"); if (li) choose(Number(li.dataset.i)); });
  spot.addEventListener("click", (e) => { if (e.target === spot) closeSpot(); });
  if (mode === "page") addEventListener("keydown", (e) => {
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !(e.target as HTMLElement).closest("input,textarea"))) { e.preventDefault(); openSpot(); }
    if (e.key === "Escape" && !unlock.hidden) { closeUnlock(); return; }
    if (e.key === "Escape" && panelOpen && spot.hidden) { closePanel(); return; }
    if (e.key === "Escape" && !sheet.hidden && spot.hidden) select(null);
  });

  // ------------------------------------------------------------ "Camadas": the panel with everything the first view leaves out
  function reachPaint(): any { return ["case", ["boolean", ["feature-state", "reach"], false], panelOpen ? 0.9 : 0, 0]; }
  const panel = $("[data-panel]"), panelBtn = root.querySelector<HTMLButtonElement>("[data-panel-open]");
  function openPanel() {
    if (mode !== "page") return;
    panelOpen = true; panel.hidden = false; requestAnimationFrame(() => panel.classList.add("is-open")); root.classList.add("is-panel");
    panelBtn?.setAttribute("aria-expanded", "true"); ev({ event: "map/panel/open", origin: mode });
    if (!isWide() && !sheet.hidden) select(null);
    load().then(() => { if (map?.getLayer("reach")) map.setPaintProperty("reach", "line-opacity", reachPaint()); sentence(); });
    panel.querySelector<HTMLElement>("[data-panel-close]")?.focus({ preventScroll: true });
  }
  function closePanel() {
    panelOpen = false; panel.classList.remove("is-open"); root.classList.remove("is-panel"); panelBtn?.setAttribute("aria-expanded", "false");
    setTimeout(() => { if (!panelOpen) panel.hidden = true; }, 260);
    if (map?.getLayer("reach")) map.setPaintProperty("reach", "line-opacity", reachPaint());
    panelBtn?.focus({ preventScroll: true });
  }
  panelBtn?.addEventListener("click", () => (panelOpen ? closePanel() : openPanel()));
  root.querySelector("[data-panel-close]")?.addEventListener("click", closePanel);
  // The region postcards.
  root.querySelectorAll<HTMLButtonElement>("[data-region]").forEach((b) => b.addEventListener("click", () => { stopTour(); halt(); showRegion(b.dataset.region!); }));
  // "Comparar": once two or more places carry a heart, a quiet link to the comparison page.
  const cmpPill = root.querySelector<HTMLAnchorElement>("[data-cmp-pill]");
  function syncPill() {
    if (!cmpPill) return; const n = savedItems().filter((x) => x.kind === "region").length;
    cmpPill.hidden = n < 2; cmpPill.textContent = L.t.pill.replace("{n}", String(Math.min(n, 3)));
  }
  addEventListener("ip:saved", syncPill); addEventListener("storage", (e) => { if (e.key === "ip.saved") syncPill(); }); syncPill();
  // A heart tapped on the map (cards, region postcards): the one-schema event, with the map as its origin (hearts.ts counts
  // the older /e/ save path for every heart on the site).
  let heartT = 0;
  root.addEventListener("pointerdown", (e) => { if ((e.target as HTMLElement).closest?.("[data-save]")) heartT = performance.now(); }, true);
  root.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && (e.target as HTMLElement).closest?.("[data-save]")) heartT = performance.now(); }, true);
  addEventListener("ip:saved", (e) => { const d = (e as CustomEvent).detail; if (d && performance.now() - heartT < 1500) { heartT = 0; evHeart(d.kind, d.id, d.on, "map"); } });

  // ------------------------------------------------------------ start
  // Nothing moves while the tab is hidden; leaving the page frees the map (and a page restored from the back-forward
  // cache builds it again).
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { timeEnd(); stopTour(); stopPlay(); if (rotating) halt(); map?.stop(); }
    else if (selected && !sheet.hidden && sheet.classList.contains("is-open")) timeStart(selected);  // back on the open card: the clock runs again
  });
  let wasLive = false;
  addEventListener("pagehide", () => { timeEnd(); wasLive = !!map; teardown(); });
  addEventListener("pageshow", (e) => { if ((e as PageTransitionEvent).persisted && wasLive) load(); });
  if (mode === "page") addEventListener("popstate", () => {
    const u = new URLSearchParams(location.search);
    const par = u.get("parish"), pr = u.get("project"), pl = slugOf(u.get("place")), rg = u.get("region");
    if (keyOf(par, pr, pl, rg) === cardKey()) return;  // another layer's own history step (the Concierge sheet), not the map's
    restoring = true;
    try {
      stopTour(); const pj = pr ? projects.find((x) => x.id === pr) : null;
      if (par && parishes) selectParish(par); else if (pj) showProject(pj); else if (pl) select(pl); else if (rg) showRegion(rg); else select(null);
    } finally { restoring = false; }
  });
  dimButtons();
  if (layer !== "none") setLayer(layer);
  for (const k of ["golf", "beach", "devs"] as const) if (overlays[k]) root.querySelector(`[data-overlay="${k}"]`)?.setAttribute("aria-pressed", "true");
  setBudget(budget);
  if (mode === "home") {
    let scrolled = false, inView = false; const tryGo = () => { if (scrolled && inView) load(); };
    addEventListener("scroll", () => { scrolled = true; tryGo(); }, { once: true, passive: true });
    root.addEventListener("pointerdown", () => load(), { once: true, passive: true });
    new IntersectionObserver((es) => { inView = es.some((e) => e.isIntersecting); if (map && !inView) { rotating = false; map.stop(); } else if (map && inView && !selected) startSpin(); tryGo(); }, { threshold: 0.35 }).observe(root);
  } else {
    // The map wakes at the first sign of a reader (a pointer moving over it, a touch, a key, a scroll), as map v2 did; until
    // then the poster is its exact first frame. A shared link with a state opens straight away.
    ["pointermove", "pointerdown", "touchstart", "focusin", "wheel", "keydown"].forEach((ev) => root.addEventListener(ev, () => load(), { once: true, passive: true }));
    addEventListener("scroll", () => load(), { once: true, passive: true });
    // A link with a state opens the map straight away; a plain ?place= link shows the card at once (below) and the map wakes
    // at the first sign of a reader, then flies to the place (operator, step 1: the card in under a second on a phone).
    if (q.has("parish") || q.has("region") || q.has("q") || q.has("layer") || q.has("pins") || q.has("tour")) ("requestIdleCallback" in window ? (window as any).requestIdleCallback : setTimeout)(() => load(), { timeout: 2500 });
    // Prompt 68: the pick's photo pin belongs to the opening view of Portugal, so with one on the map (and the
    // developments shown) the map wakes once the page is idle instead of waiting for the reader.
    else if (overlays.devs && projects.some((p) => p.hero)) ("requestIdleCallback" in window ? (window as any).requestIdleCallback : setTimeout)(() => load(), { timeout: 1500 });
  }
  // Operator, step 1 (under one second): a ?place= link shows the card at once from the place's small file, before
  // MapLibre and the map data arrive; the map then flies to it.
  if (selRegion && !selected && !selPar && !selProj && mode === "page") showRegion(selRegion);  // p70 (S-09): the card first
  else if (selProj && !selected && !selPar && mode === "page") {
    // Prompt 68: ?project=<id> (the /orizon short link): the project's card at once, then the map comes down to it.
    const pr = projects.find((x) => x.id === selProj); if (pr) { showProject(pr); load(); }
  } else if (selected && !selPar && mode === "page") {
    if (heroOf(selected)) load();  // the arrival is part of the card: the map wakes at once
    const slug = selected;
    loadPlace(slug).then((d) => {
      if (!d && sheet.dataset.skel) { delete sheet.dataset.skel; sheet.removeAttribute("aria-busy"); sheet.classList.remove("is-open"); sheet.hidden = true; }
      if (d && selected === slug && (sheet.hidden || sheet.dataset.skel)) { ev({ event: "map/place", place: slug, origin: mode }); ev({ event: "map/card/muni", place: slug, origin: mode }); showPlace(slug); timeStart(slug); savePlace(d.n); rememberPlace(d.n); } });
  }
  // For the automated click check (scripts/map-data/clicktest.mjs).
  (root as any).__mapx = { load, showRegion, openPanel, openSources: () => openSources(), view: () => view, pick: (x: number, y: number) => pick({ x, y }), project: (s: string) => { const p = byS.get(s); return p && map ? map.project([p.x, p.y]) : null; }, map: () => map, selected: () => selected, slugs: () => features.map((f) => f.properties.s), tour, setDim, setBudget, setQuarter, quality: () => quality };
}
