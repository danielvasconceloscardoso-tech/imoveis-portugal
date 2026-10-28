// Map v3 (prompt 36, D62): the browser side of MapV3.astro. MapLibre loads when the map is needed (in view on the home
// page; the first interaction, a link with a state, or idle time on the map page). Assets: /tiles/{dem,sea}/ and
// /data/map/ (scripts/map-data/v3_assets.py, v3_extras.py, build.py, golf.py); prices: /data/prices.json.
import mapCss from "maplibre-gl/dist/maplibre-gl.css?url";
import { feature, mesh } from "topojson-client";
import { savePlace } from "../lib/brief";

type Series = { n: string; m2: (number | null)[]; rq: (number | null)[]; yield: number | null; g10?: number | null; cagrP?: number | null;
  mo: { c4: number; c8: number | null; w: "up" | "steady" | "down" } | null };
type Props = { id: number; n: string; s: string; r: string; x: number; y: number; a: number };
type Layer = "price" | "g10" | "rent" | "yield";
type Proj = { id: string; name: string; developer: string; muni: string; lon: number; lat: number; render?: string; from: number | null; showcase: string; summary?: string; feats?: string[]; now?: number | null };

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
  const eur2 = new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fx = Number(root.dataset.fx) || 0, cur = root.dataset.cur || "";
  const money = (eurV: number) => fx ? `${nf.format(Math.round(eurV * fx / 1000) * 1000)} ${cur}` : eur.format(Math.round(eurV / 1000) * 1000);
  const pc = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${nf1.format(Math.abs(v))}%`;
  const esc = (t: string) => t.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
  const q = new URLSearchParams(location.search);
  const canvas = $("[data-canvas]"), sheet = $("[data-sheet]"), sheetIn = $("[data-sheet-in]"), tip = $("[data-tip]"), labelsEl = $("[data-labels]");

  // ------------------------------------------------------------ state (every state is a link)
  const stored = (() => { try { return Number(localStorage.getItem("ip.budget")) || 0; } catch { return 0; } })();
  let budget = Math.min(Math.max(Number(q.get("budget")) || stored || 300000, 100000), 20e6);
  let layer: Layer = (["price", "g10", "rent", "yield"].includes(q.get("layer") || "") ? q.get("layer") : "price") as Layer;
  // 2D or 3D (prompt 37 §3): the link, else the reader's last choice, else 2D on phones and weak devices and 3D on desktop.
  // Reduced motion always gets the flat map.
  const dimSaved = (() => { try { return localStorage.getItem("ip.map.dim"); } catch { return null; } })();
  const dimAsked = q.get("dim") ?? (q.get("flat") === "1" ? "2d" : null) ?? dimSaved;
  let flat = reduce() || (dimAsked ? dimAsked === "2d" : weak() || matchMedia("(max-width: 760px), (pointer: coarse)").matches);
  let selected: string | null = q.get("place"), selPar: string | null = q.get("parish"), pinA: string | null = null;
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
  const last = () => (P ? P.quarters.length - 1 : 0);
  const at = () => (qi < 0 ? last() : qi);
  const qLabel = (k: string) => { const [y, qq] = k.split("-Q"); return L.qfmt.replace("{q}", qq).replace("{y}", y); };

  function syncUrl() {
    const p = new URLSearchParams(location.search);
    const set = (k: string, v: string | null) => (v ? p.set(k, v) : p.delete(k));
    set("budget", String(Math.round(budget))); set("layer", layer === "price" ? null : layer); set("place", selected); set("parish", selPar);
    set("q", qi >= 0 && P ? P.quarters[qi] : null);
    for (const k of ["golf", "beach"] as const) set(k, overlays[k] ? "1" : null);
    set("devs", mode === "page" ? (overlays.devs ? null : "0") : overlays.devs ? "1" : null);  // prompt 39 §2.1: on by default on the map page
    history.replaceState(null, "", `${location.pathname}?${p}${location.hash}`);
  }

  // ------------------------------------------------------------ values and colour
  function value(s: Series | undefined, l: Layer, i = at()): number | null {
    if (!s) return null;
    if (l === "price") return s.m2[i] ?? null;
    if (l === "rent") return s.rq[i] ?? null;
    if (l === "g10") return s.g10 ?? null;
    return s.yield ?? null;
  }
  function quant(list: number[]) { const a = [...list].sort((x, y) => x - y); return [0.03, 0.18, 0.35, 0.5, 0.65, 0.82, 0.97].map((p) => a[Math.floor(p * (a.length - 1))]); }
  function computeBreaks() {
    const all = (l: Layer, everyQ: boolean) => { const v: number[] = []; for (const s of Object.values(P!.munis)) { if (everyQ) for (let i = 0; i <= last(); i++) { const x = value(s, l, i); if (x != null) v.push(x); } else { const x = value(s, l); if (x != null) v.push(x); } } return v; };
    breaks = { price: quant(all("price", true)), rent: quant(all("rent", true)), g10: quant(all("g10", false)), yield: quant(all("yield", false)) };
  }
  function colorExpr(): any {
    const b = breaks[layer] || []; const stops: any[] = [];
    b.forEach((v, i) => { if (i === 0 || v > b[i - 1]) stops.push(v, RAMP[i]); });
    return ["case", ["<", ["coalesce", ["feature-state", "v"], -1e9], -1e8], NODATA, stops.length >= 4 ? ["interpolate", ["linear"], ["feature-state", "v"], ...stops] : RAMP[3]];
  }
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
    applyValues(); legend();
  }
  function legend() {
    const b = breaks[layer]; if (!b?.length) return;
    const f = (v: number) => layer === "price" ? eur.format(Math.round(v / 10) * 10) : layer === "rent" ? eur2.format(v) : layer === "g10" ? pc(v) : `${nf1.format(v)}%`;
    $("[data-lo]").textContent = f(b[0]); $("[data-hi]").textContent = f(b[b.length - 1]);
    $("[data-legend-t]").textContent = L.legend[layer].replace("{q}", P ? qLabel(P.quarters[at()]) : "");
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
    amountBtn.textContent = money(budget);
    sentence();
    if (map && P) { clearTimeout(reachT); reachT = window.setTimeout(() => { for (const f of features) map.setFeatureState({ source: "munis", id: f.id }, { reach: reaches(f.properties.s) }); }, 30); }
    if (remember) try { localStorage.setItem("ip.budget", String(Math.round(budget))); } catch { /* private mode */ }
    if (selected && !sheet.hidden && !pinA) showPlace(selected, false);
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
  root.querySelectorAll<HTMLButtonElement>("[data-layer]").forEach((b) => b.addEventListener("click", () => setLayer(b.dataset.layer as Layer)));
  function setLayer(l: Layer) {
    layer = l; root.querySelectorAll("[data-layer]").forEach((b) => b.setAttribute("aria-pressed", String((b as HTMLElement).dataset.layer === l)));
    const tm = root.querySelector<HTMLElement>("[data-time]"); if (tm) tm.classList.toggle("is-off", l === "g10" || l === "yield");
    repaint(); if (selected && !sheet.hidden) showPlace(selected, false); syncUrl(); load();
  }
  root.querySelectorAll<HTMLButtonElement>("[data-dim]").forEach((b) => b.addEventListener("click", () => setDim(b.dataset.dim === "2d")));
  function dimButtons() { root.classList.toggle("is-2d", flat); root.querySelectorAll("[data-dim]").forEach((b) => b.setAttribute("aria-pressed", String(((b as HTMLElement).dataset.dim === "2d") === flat))); }
  // 2D: no terrain, no hillshade, no sky, north up and no tilt; the same layers, card, search and tours. 3D: today's relief.
  function setDim(two: boolean) {
    flat = two || reduce(); dimButtons(); try { localStorage.setItem("ip.map.dim", flat ? "2d" : "3d"); } catch {}
    if (!map) { load(); return; }
    rotating = false; stopTour();
    map.setTerrain(flat ? null : { source: "dem", exaggeration: 1.5 });
    map.setLayoutProperty("hill", "visibility", flat ? "none" : "visible");
    try { map.setSky(flat ? { "sky-color": "#e7e2d7", "horizon-color": "#e7e2d7", "fog-color": "#e7e2d7", "sky-horizon-blend": 0, "horizon-fog-blend": 0, "fog-ground-blend": 1, "atmosphere-blend": 0 } : SKY); } catch { /* older styles have no sky */ }
    if (flat) { map.dragRotate.disable(); map.touchZoomRotate.disableRotation(); } else { map.dragRotate.enable(); map.touchZoomRotate.enableRotation(); }
    map.easeTo({ pitch: flat ? 0 : 50, bearing: flat ? 0 : -12, duration: reduce() ? 0 : 700 });
    if (!flat) governor();
  }
  root.querySelectorAll<HTMLButtonElement>("[data-overlay]").forEach((b) => b.addEventListener("click", () => setOverlay(b.dataset.overlay as "golf" | "beach" | "devs", !overlays[b.dataset.overlay as "golf"])));
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
    map = null; loading = null; parLoading = null; root.classList.remove("is-live");
  }
  async function rebuild(toFlat: boolean) { await teardown(); if (toFlat) { flat = true; dimButtons(); } load(); }
  function load(): Promise<void> {
    if (loading) return loading;
    loading = (async () => {
      if (!document.querySelector("link[data-maplibre]")) { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = mapCss; l.dataset.maplibre = ""; document.head.append(l); }
      const [mod, topo, prices, insets, rivers] = await Promise.all([import("maplibre-gl"), fetch("/data/map/munis.topo.json").then((r) => r.json()), fetch("/data/prices.json").then((r) => r.json()),
        fetch("/data/map/insets.json").then((r) => r.json()).catch(() => ({})), fetch("/data/map/rivers.json").then((r) => r.json()).catch(() => null)]);
      ml = mod.default; P = prices;
      const geo: any = feature(topo, topo.objects.m);
      geo.features.forEach((f: any) => { f.id = f.properties.id; byS.set(f.properties.s, f.properties); });
      features = geo.features;
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
      map.addLayer({ id: "hill", type: "hillshade", source: "dem2", layout: { visibility: flat ? "none" : "visible" }, paint: { "hillshade-illumination-direction": 225, "hillshade-illumination-anchor": "map", "hillshade-exaggeration": 0.7,
        "hillshade-highlight-color": "rgba(255,244,214,0.55)", "hillshade-shadow-color": "rgba(52,64,70,0.42)", "hillshade-accent-color": "rgba(60,60,50,0.15)" } });
      // Madeira and the Azores are drawn moved next to the mainland: their relief is an image in the same place.
      for (const [name, c] of Object.entries(insets) as [string, number[][]][]) {
        map.addSource(`inset-${name}`, { type: "image", url: `/data/map/inset-${name}-relief.webp`, coordinates: c });
        map.addLayer({ id: `inset-${name}`, type: "raster", source: `inset-${name}`, paint: { "raster-fade-duration": 0 } });
      }
      map.addLayer({ id: "muni-line", type: "line", source: "munis", paint: { "line-color": "rgba(40,50,48,0.16)", "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.3, 9, 0.8] } });
      // The budget's reach: the places it buys 100 m² or more in glow softly.
      map.addLayer({ id: "reach", type: "line", source: "munis", paint: { "line-color": "#fff7df", "line-blur": 3, "line-width": 2.6, "line-opacity": ["case", ["boolean", ["feature-state", "reach"], false], 0.9, 0] } as any });
      map.addSource("coast", { type: "geojson", data: { type: "Feature", properties: {}, geometry: coast } });
      map.addLayer({ id: "coast-glow", type: "line", source: "coast", paint: { "line-color": "#ffffff", "line-width": ["interpolate", ["linear"], ["zoom"], 5, 2.5, 8, 7], "line-blur": ["interpolate", ["linear"], ["zoom"], 5, 2, 8, 6], "line-opacity": 0.55 } });
      map.addLayer({ id: "coast", type: "line", source: "coast", paint: { "line-color": "#fffdf6", "line-width": ["interpolate", ["linear"], ["zoom"], 5, 0.6, 8, 1.2] } });
      if (rivers) { map.addSource("rivers", { type: "geojson", data: rivers }); map.addLayer({ id: "rivers", type: "line", source: "rivers", paint: { "line-color": "#9fbec6", "line-width": ["interpolate", ["linear"], ["zoom"], 6, 0.9, 10, 2.4], "line-opacity": 0.9 } }); }
      map.addLayer({ id: "lift-shadow", type: "line", source: "munis", filter: ["==", ["get", "s"], ""], paint: { "line-color": "rgba(20,30,28,0.35)", "line-width": 7, "line-blur": 7, "line-translate": [3, 5] } });
      map.addLayer({ id: "lift", type: "fill", source: "munis", filter: ["==", ["get", "s"], ""], paint: { "fill-color": colorExpr(), "fill-translate": [0, -4], "fill-opacity": 0.95 } as any });
      map.addLayer({ id: "lift-line", type: "line", source: "munis", filter: ["==", ["get", "s"], ""], paint: { "line-color": "#ffffff", "line-width": 1.6, "line-translate": [0, -4] } });
      map.addLayer({ id: "sel", type: "line", source: "munis", filter: ["==", ["get", "s"], ""], paint: { "line-color": "#111214", "line-width": 2.2 } });
      if (!flat) map.setTerrain({ source: "dem", exaggeration: 1.5 });
      applyValues(); legend(); sentence();
      root.classList.add("is-live");
      // Frame the country in the space the glass leaves free: below the top bar, beside (desktop) or above (mobile) the dock.
      const st = canvas.getBoundingClientRect(), tb = $(".m3-top").getBoundingClientRect(), dk = $(".m3-dock").getBoundingClientRect();
      const pad = narrow ? { top: tb.bottom - st.top + 6, bottom: st.bottom - dk.top + 6, left: 6, right: 6 } : { top: tb.bottom - st.top + 20, bottom: 40, left: Math.round((dk.right - st.left) * 0.55), right: 60 };
      let fit: any; try { fit = map.cameraForBounds([[-12.4, 36.9], [-6.15, 42.17]], { padding: pad }); } catch { fit = null; }
      fit ??= map.cameraForBounds([[-12.4, 36.9], [-6.15, 42.17]], { padding: 8 });
      // Pitched, the south comes closer to the eye: aim a little south so the Algarve stays in frame.
      const home = { center: flat ? fit.center : [fit.center.lng, fit.center.lat - (narrow ? 0.15 : 0.45)], zoom: fit.zoom + (flat ? 0 : narrow ? 0.28 : 0.2), pitch: flat ? 0 : 50, bearing: flat ? 0 : -12 };
      (root as any).__home = home;
      if (mode === "page" && !selected && !selPar && !q.has("q") && !reduce()) { map.jumpTo({ center: [-13.4, 38.6], zoom: home.zoom - 1.2, pitch: 22, bearing: home.bearing - 28 }); map.flyTo({ ...home, duration: 3400, curve: 1.15, easing: ease, essential: true }); }
      else map.jumpTo(home);
      if (q.get("q") && P && P.quarters.includes(q.get("q")!)) setQuarter(P.quarters.indexOf(q.get("q")!));
      if (overlays.golf) await drawGolf(); if (overlays.beach) await drawBeaches(); if (overlays.devs) drawProjects();
      if (selPar) { await loadParishes(); selectParish(selPar); } else if (selected) {
        // Prompt 39 §2.6: a place with a listed project opens on the project card (the place card stays one tap back).
        const pr = projects.find((x) => x.muni === selected);
        if (pr) { select(selected, false); flyTo(pr.lon, pr.lat, 12.6); showProject(pr); } else select(selected);
      }
      if (mode === "home" && !flat && !selected) startSpin();
      if (!flat) governor();
      map.on("click", (e: any) => { stopTour(); const gc = overlays.golf ? golfAt(e.point) : null; if (gc) { showGolf(gc); return; } const h = pick(e.point); if (!h) return; if (h.kind === "par") selectParish(h.key); else select(h.key); });
      map.on("mousemove", (e: any) => hover(e.point)); map.on("mouseout", () => hover(null));
      map.on("move", labelsSoon); map.on("zoomend", () => { if (map.getZoom() > 7.8) loadParishes(); });
      ["pointerdown", "wheel", "touchstart"].forEach((ev) => canvas.addEventListener(ev, () => { stopTour(); halt(); }, { passive: true }));
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
    const want = features.map((f) => f.properties as Props).filter((p) => (BIG.includes(p.s) && z > (W < 700 ? 5.2 : 5.9)) || (z > 8.2 && p.a > 2) || z > 9.2);
    const placed: { x: number; y: number; w: number }[] = []; let h = "";
    const rank = (p: Props) => { const i = BIG.indexOf(p.s); return i >= 0 ? i : projMunis.has(p.s) ? BIG.length : 1000 - p.a; };
    for (const p of want.sort((a, b) => rank(a) - rank(b))) {
      const c = map.project([p.x, p.y]); if (c.x < 0 || c.y < 0 || c.x > W || c.y > H) continue;
      const big = BIG.includes(p.s), w = p.n.length * (big ? 8.5 : 6.5) + 8;
      // Over the place if there is room, otherwise just above or just below it; dropped only when all three are taken.
      const y = [c.y, c.y - 17, c.y + 17].find((yy) => !placed.some((o) => Math.abs(o.x - c.x) < (o.w + w) / 2 && Math.abs(o.y - yy) < 18));
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
  const fmtV = (v: number) => layer === "price" ? `${eur.format(v)}/m²` : layer === "rent" ? `${eur2.format(v)}/m²` : layer === "g10" ? pc(v) : `${nf1.format(v)}%`;
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
  function flyTo(x: number, y: number, z: number, dur = 1200) {
    map.flyTo({ center: [x, y], zoom: z, pitch: flat ? 0 : 46, duration: reduce() ? 0 : dur, curve: 1.3, easing: ease, essential: true,
      padding: isWide() ? { right: 440, left: 0, top: 60, bottom: 120 } : { bottom: canvas.clientHeight * 0.42, top: 60, left: 0, right: 0 } });
  }
  function select(slug: string | null, fly = true) {
    if (pinA && slug && slug !== pinA) { compare(pinA, slug); return; }
    selected = slug; selPar = null;
    if (map) map.setFilter("sel", ["==", ["get", "s"], slug ?? ""]);
    const p = slug ? byS.get(slug) : null;
    if (p && map && fly) flyTo(p.x, p.y, Math.max(map.getZoom(), p.a < 40 ? 8.6 : 7.6));
    syncUrl(); sentence();
    if (slug && p) { showPlace(slug); savePlace(p.n); } else closeSheet();
  }

  // ------------------------------------------------------------ the place sheet (side on desktop, bottom with three heights on mobile)
  function spark(s: Series): string {
    const w = 320, h = 70, vals = s.m2, n = vals.length, hi = Math.max(...vals.filter((v): v is number => v != null)) * 1.05, lo = Math.min(...vals.filter((v): v is number => v != null)) * 0.92;
    let d = "", pen = false;
    vals.forEach((v, i) => { if (v == null) { pen = false; return; } const x = (i / (n - 1)) * w, y = h - ((v - lo) / (hi - lo)) * h; d += `${pen ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`; pen = true; });
    return `<svg class="m3-spark" viewBox="0 0 ${w} ${h + 18}" preserveAspectRatio="none" aria-hidden="true"><path d="${d}" fill="none" stroke="currentColor" stroke-width="1.8" vector-effect="non-scaling-stroke"/><text x="0" y="${h + 16}">${P!.quarters[0].slice(0, 4)}</text><text x="${w}" y="${h + 16}" text-anchor="end">${P!.quarters[n - 1].slice(0, 4)}</text></svg>`;
  }
  function stats(s: Series | undefined) {
    const i = last(), v = s?.m2[i] ?? null, r = s?.rq[i] ?? null, g = s?.g10 ?? null;
    return `<dl class="m3-stats"><div><dt>${L.card.price}</dt><dd>${v ? eur.format(v) : "—"}</dd></div><div><dt>${L.card.g10}</dt><dd>${g != null ? pc(g) : "—"}</dd></div><div><dt>${L.card.rent}</dt><dd>${r ? eur2.format(r) : "—"}</dd></div></dl>`;
  }
  function showPlace(slug: string, open = true) {
    const p = byS.get(slug); if (!p || !P) return; const s = P.munis[slug], i = last(), v = s?.m2[i] ?? null;
    const here = projects.filter((x) => x.muni === slug && x.showcase);
    if (here.length && !overlays.devs) setOverlay("devs", true);  // prompt 38: a place card shows its partner projects
    const homes = here.length ? here[0].showcase : `${cfg.links.buy}?place=${encodeURIComponent(p.n)}&budget=${Math.round(budget)}`;
    const photo = cfg.photos[slug] ? `<img class="m3-photo" src="/img/v2/${cfg.photos[slug]}-640.webp" srcset="/img/v2/${cfg.photos[slug]}-640.webp 640w, /img/v2/${cfg.photos[slug]}-1024.webp 1024w" sizes="420px" alt="" width="640" height="400">` : `<div class="m3-photo m3-photo-none" style="--c:${colorOf(value(s, layer))}"></div>`;
    let h = `${photo}<div class="m3-sb"><p class="m3-kick">${esc(L.regions[p.r] || "")}</p><h3 tabindex="-1">${esc(p.n)}</h3>${stats(s)}`;
    if (v) h += `<p class="m3-buys">${L.card.buys.replace("{v}", `<b>${nf.format(Math.round(budget / v))}</b>`)}</p>`;
    if (s) h += spark(s);
    h += `<div class="m3-acts"><a class="m3-btn m3-btn-p" href="${esc(homes)}">${L.card.homes}</a><a class="m3-btn" href="${cfg.links.consult}?place=${encodeURIComponent(p.n)}&budget=${Math.round(budget)}">${L.card.concierge}</a></div>`;
    h += `<div class="m3-more"><button type="button" class="m3-link" data-compare>${L.card.compare}</button><button type="button" class="m3-link" data-details aria-expanded="false">${L.card.details}</button><button type="button" class="m3-link" data-share>${L.share}</button></div>`;
    let det = "";
    if (s?.cagrP != null) det += `<li>${L.cagrP.replace("{v}", pc(s.cagrP))}</li>`;
    if (s?.yield != null) det += `<li>${L.yieldLine.replace("{y}", nf1.format(s.yield) + "%").replace("{r}", nf1.format(cfg.mortgage.rate) + "%").replace("{month}", cfg.mortgage.month)}</li>`;
    if (s?.mo) det += `<li>${L.mo.replace("{c4}", pc(s.mo.c4)).replace("{c8}", s.mo.c8 == null ? "—" : pc(s.mo.c8))} <strong>${L.mow[s.mo.w]}</strong></li>`;
    if (cfg.briefs[slug]) det += `<li>${cfg.briefs[slug]}</li>`;
    if (cfg.links.pages.includes(slug)) det += `<li><a href="${cfg.links.map}${slug}/">${L.page}</a></li>`;
    if (here.length) det += here.map((x) => `<li><a href="${esc(x.showcase)}">${esc(x.name)} · ${esc(x.developer)}</a> <span class="m3-tag">${L.sponsored}</span></li>`).join("");
    h += `<ul class="m3-det" data-det hidden>${det}</ul><p class="m3-src">${L.source.replace("{quarter}", qLabel(P.quarters[i]))} ${L.disclaimer}</p></div>`;
    openSheet(h, open);
  }
  function selectParish(code: string) {
    const f = parishes?.feats.find((x) => x.properties.id === code); const s = parishes?.data[code]; if (!f || !P) return;
    selPar = code; selected = f.properties.m; syncUrl(); if (map) map.setFilter("sel", ["==", ["get", "s"], ""]);
    const muni = byS.get(f.properties.m), i = last(), v = s?.m2[i] ?? null;
    let h = `<div class="m3-photo m3-photo-none" style="--c:${colorOf(value(s, layer))}"></div><div class="m3-sb"><p class="m3-kick">${esc(L.parishOf.replace("{m}", muni?.n ?? ""))}</p><h3 tabindex="-1">${esc(f.properties.n)}</h3>${stats(s)}`;
    if (v) h += `<p class="m3-buys">${L.card.buys.replace("{v}", `<b>${nf.format(Math.round(budget / v))}</b>`)}</p>`;
    if (s) h += spark(s);
    h += `<div class="m3-acts"><a class="m3-btn m3-btn-p" href="${cfg.links.buy}?place=${encodeURIComponent(f.properties.n)}&budget=${Math.round(budget)}">${L.card.homes}</a><a class="m3-btn" href="${cfg.links.consult}?place=${encodeURIComponent(f.properties.n)}">${L.card.concierge}</a></div>`;
    h += `<div class="m3-more"><button type="button" class="m3-link" data-goto="${f.properties.m}">${esc(muni?.n ?? "")}</button><button type="button" class="m3-link" data-share>${L.share}</button></div><p class="m3-src">${L.source.replace("{quarter}", qLabel(P.quarters[i]))} ${L.disclaimer}</p></div>`;
    openSheet(h, true);
  }
  function compare(a: string, b: string) {
    pinA = null; selected = b; syncUrl(); if (map) map.setFilter("sel", ["in", ["get", "s"], ["literal", [a, b]]]);
    const col = (slug: string) => { const p = byS.get(slug)!, s = P!.munis[slug], v = s?.m2[last()]; return { n: p.n, s, v }; };
    const A = col(a), B = col(b);
    const row = (k: string, f: (x: typeof A) => string) => `<div class="m3-cr"><span>${f(A)}</span><em>${k}</em><span>${f(B)}</span></div>`;
    let h = `<div class="m3-sb m3-cmp"><div class="m3-cr m3-ch"><h3 tabindex="-1">${esc(A.n)}</h3><em></em><h3>${esc(B.n)}</h3></div>`;
    h += row(L.card.price, (x) => x.v ? eur.format(x.v) : "—") + row(L.card.g10, (x) => x.s?.g10 != null ? pc(x.s.g10) : "—") + row(L.card.rent, (x) => x.s?.rq[last()] ? eur2.format(x.s.rq[last()]!) : "—")
      + row(L.card.m2b, (x) => x.v ? nf.format(Math.round(budget / x.v)) : "—") + row(L.card.yield, (x) => x.s?.yield != null ? `${nf1.format(x.s.yield)}%` : "—");
    h += `<div class="m3-acts"><button type="button" class="m3-btn" data-goto="${a}">${esc(A.n)}</button><button type="button" class="m3-btn" data-goto="${b}">${esc(B.n)}</button></div><p class="m3-src">${L.source.replace("{quarter}", qLabel(P!.quarters[last()]))}</p></div>`;
    openSheet(h, true);
    const pa = byS.get(a)!, pb = byS.get(b)!;
    if (map) map.fitBounds([[Math.min(pa.x, pb.x), Math.min(pa.y, pb.y)], [Math.max(pa.x, pb.x), Math.max(pa.y, pb.y)]], { padding: isWide() ? { left: 80, right: 520, top: 120, bottom: 160 } : { left: 40, right: 40, top: 100, bottom: canvas.clientHeight * 0.5 }, maxZoom: 9, duration: reduce() ? 0 : 1200, pitch: flat ? 0 : 40 });
  }
  let detent = 1;  // mobile: 0 peek, 1 half, 2 full
  function openSheet(h: string, focus: boolean) {
    sheetIn.innerHTML = h + `<button type="button" class="m3-x" aria-label="${L.close}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`;
    const wasHidden = sheet.hidden; sheet.hidden = false; requestAnimationFrame(() => sheet.classList.add("is-open"));
    if (!isWide()) setDetent(wasHidden ? 1 : detent);
    sheetIn.querySelector(".m3-x")!.addEventListener("click", () => select(null));
    sheetIn.querySelector("[data-share]")?.addEventListener("click", share);
    sheetIn.querySelector("[data-compare]")?.addEventListener("click", () => { pinA = selected; toast(L.card.pickb.replace("{a}", byS.get(selected!)?.n ?? "")); });
    const det = sheetIn.querySelector<HTMLElement>("[data-det]"), db = sheetIn.querySelector<HTMLButtonElement>("[data-details]");
    db?.addEventListener("click", () => { det!.hidden = !det!.hidden; db.setAttribute("aria-expanded", String(!det!.hidden)); if (!isWide() && !det!.hidden) setDetent(2); });
    sheetIn.querySelectorAll<HTMLButtonElement>("[data-goto]").forEach((b) => b.addEventListener("click", () => select(b.dataset.goto!)));
    if (focus && wasHidden && root.contains(document.activeElement)) sheetIn.querySelector<HTMLElement>("h3")?.focus({ preventScroll: true });
  }
  function closeSheet() { sheet.classList.remove("is-open"); setTimeout(() => { if (!sheet.classList.contains("is-open")) sheet.hidden = true; }, 260); pinA = null; if (map) map.setFilter("sel", ["==", ["get", "s"], ""]); }
  function setDetent(d: number) { detent = d; sheet.dataset.detent = String(d); }
  { // drag the sheet between its three heights (mobile)
    const grab = $("[data-grab]"); let y0 = 0, h0 = 0, on = false;
    grab.addEventListener("pointerdown", (e) => { on = true; y0 = e.clientY; h0 = sheet.getBoundingClientRect().height; grab.setPointerCapture(e.pointerId); sheet.classList.add("is-drag"); });
    grab.addEventListener("pointermove", (e) => { if (on) sheet.style.height = `${Math.max(90, h0 - (e.clientY - y0))}px`; });
    const end = (e: PointerEvent) => { if (!on) return; on = false; sheet.classList.remove("is-drag"); const hh = sheet.getBoundingClientRect().height / root.clientHeight; sheet.style.height = ""; if (Math.abs(e.clientY - y0) < 6) { setDetent(detent === 2 ? 1 : 2); return; } hh < 0.25 ? (hh < 0.12 ? select(null) : setDetent(0)) : setDetent(hh < 0.66 ? 1 : 2); };
    grab.addEventListener("pointerup", end); grab.addEventListener("pointercancel", end);
  }
  async function share() { syncUrl(); try { if (navigator.share) await navigator.share({ url: location.href }); else { await navigator.clipboard.writeText(location.href); toast(L.copied); } } catch { /* closed */ } }
  function toast(t: string) { const el = $("[data-toast]"); el.textContent = t; el.hidden = false; el.classList.add("is-on"); clearTimeout((el as any).t); (el as any).t = setTimeout(() => { el.classList.remove("is-on"); setTimeout(() => (el.hidden = true), 250); }, 2600); }

  // ------------------------------------------------------------ parishes, golf, beaches, developments
  let parLoading: Promise<void> | null = null;
  function loadParishes() {
    return parLoading ??= (async () => {
      const [topo, data] = await Promise.all([fetch("/data/map/parishes.topo.json").then((r) => r.json()), fetch("/data/map/parishes.json").then((r) => r.json())]);
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
    selected = null; if (map) map.setFilter("sel", ["==", ["get", "s"], ""]);
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
      const el = document.createElement("button"); el.type = "button"; el.className = "m3-pin";
      el.innerHTML = `<b class="m3-pin-n"></b><span>${esc(p.name)}<em>${L.sponsored}</em></span><i class="m3-pin-dot" aria-hidden="true"></i>`;
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
      if (z < 14) for (const b of markers) if (!done.has(b)) { const cb = at.get(b)!; if (Math.hypot(ca.x - cb.x, ca.y - cb.y) < 44) { grp.push(b); done.add(b); } }
      a.grp = grp.map((g) => g.p); a.el.style.display = "";
      for (const b of grp.slice(1)) { b.grp = []; b.el.style.display = "none"; }
      const n = grp.length; a.el.classList.toggle("is-cluster", n > 1); a.el.classList.toggle("is-named", n === 1 && z >= 10);  // §2.3: the name at city zoom
      a.el.querySelector(".m3-pin-n")!.textContent = n > 1 ? String(n) : "";
      a.el.setAttribute("aria-label", n > 1 ? `${n} · ${L.g.devs}` : a.p.name);
    }
  }

  // Prompt 38: a partner project's card (photo, name, summary, three features, homes for sale now, price on request).
  function showProject(p: Proj, open = true) {
    const pl = cfg.pl ?? {};
    const photo = p.render ? `<img class="m3-photo" src="${esc(p.render)}-800.webp" alt="" width="800" height="450">` : "";
    let h = `${photo}<div class="m3-sb"><p class="m3-kick">${esc(byS.get(p.muni)?.n ?? "")} · <span class="m3-tag">${L.sponsored}</span></p><h3 tabindex="-1">${esc(p.name)}</h3>`;
    h += `<p class="m3-buys">${esc(p.summary ?? p.developer)}</p>`;
    if (p.feats?.length) h += `<ul class="m3-det">${p.feats.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`;
    if (p.now != null && pl.now) h += `<p class="m3-buys"><b>${esc(pl.now.replace("{n}", String(p.now)))}</b></p>`;
    h += `<p class="m3-buys">${p.from ? L.pfrom.replace("{v}", eur.format(p.from)) : esc(pl.price ?? L.ponreq)}</p>`;
    h += `<div class="m3-acts"><a class="m3-btn m3-btn-p" href="${esc(p.showcase)}">${esc(pl.view ?? p.name)}</a><a class="m3-btn" href="${esc(p.showcase)}#pedir">${esc(pl.visit ?? "")}</a></div></div>`;
    openSheet(h, open);
  }

  // ------------------------------------------------------------ time: 2016 to 2026, ten years in about twelve seconds
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
      if (!P) { res(); return; } if (layer !== "price" && layer !== "rent") setLayer("price");
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
    const at2 = (s: string, z: number, b: number, p = 58) => { const x = byS.get(s)!; return { center: [x.x, x.y], zoom: z, bearing: b, pitch: flat ? 0 : p }; };
    if (kind === "coast") {
      for (const [s, b] of [["porto", -20], ["aveiro", -12], ["figueira-da-foz", -8], ["nazare", -4], ["peniche", 0], ["cascais", 8], ["lisboa", 14], ["setubal", 20], ["grandola", 26]] as [string, number][]) { if (stop) break; await fly(at2(s, 9.2, b), 2000, placeCap(s)); }
    } else if (kind === "golf") {
      await setOverlay("golf", true); const n = golf?.courses.filter((f: any) => f.status === "open" && ["lagos", "portimao", "lagoa", "silves", "albufeira", "loule", "faro", "olhao", "tavira", "castro-marim", "vila-real-de-santo-antonio", "vila-do-bispo", "aljezur", "monchique", "sao-bras-de-alportel", "alcoutim"].includes(f.m)).length ?? 0;
      await fly(at2("albufeira", 8.2, -20, 50), 2600, L.golfcap.replace("{n}", n));
      for (const [s, b] of [["lagos", -12], ["portimao", -6], ["albufeira", 2], ["loule", 10], ["tavira", 18], ["vila-real-de-santo-antonio", 24]] as [string, number][]) { if (stop) break; await fly(at2(s, 10.4, b, 62), 2400, placeCap(s)); }
    } else if (kind === "madeira") {
      for (const [s, z, b] of [["funchal", 9.4, -10], ["camara-de-lobos", 10, -18], ["calheta", 9.8, -26], ["porto-moniz", 10, -36], ["santana", 9.8, -44], ["machico", 10, -52], ["porto-santo", 9.6, -60]] as [string, number, number][]) { if (stop) break; await fly(at2(s, z, b, 55), 2300, placeCap(s)); }
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

  // ------------------------------------------------------------ the home page's slow rotation (prompt 34 §2)
  let rotating = false, halted = false, haltTimer = 0;
  function spin() { if (!rotating || !map) return; map.easeTo({ bearing: map.getBearing() + 6, duration: 4000, easing: (t: number) => t }); map.once("moveend", spin); }
  function startSpin() { if (halted || rotating || !map) return; rotating = true; if (!haltTimer) haltTimer = window.setTimeout(halt, 15000); spin(); }
  function halt() { if (halted) return; halted = true; clearTimeout(haltTimer); if (rotating && map) map.stop(); rotating = false; }

  // ------------------------------------------------------------ search, like Spotlight (the magnifier, ⌘K, or "/")
  const spot = $("[data-spot]"), spotIn = $<HTMLInputElement>("[data-spot-in]"), spotRes = $<HTMLUListElement>("[data-spot-res]");
  type Hit = { g: keyof typeof L.g; n: string; sub?: string; go: () => void };
  let pool: Hit[] = [], active = 0, hits: Hit[] = [];
  async function buildPool() {
    await load();
    const pl: Hit[] = features.map((f) => { const p = f.properties as Props; return { g: "munis", n: p.n, sub: L.regions[p.r], go: () => select(p.s) }; });
    for (const [n, x, y, m] of LOCALITIES) pl.push({ g: "munis", n, sub: byS.get(m)?.n, go: () => { select(m, false); flyTo(x, y, 10.2); } });
    try { const pt = await fetch("/data/map/parishes.topo.json").then((r) => r.json()); for (const f of (feature(pt, pt.objects.p) as any).features) pl.push({ g: "pars", n: f.properties.n, sub: byS.get(f.properties.m)?.n, go: async () => { await loadParishes(); const m = byS.get(f.properties.m)!; flyTo(m.x, m.y, 9.4); setTimeout(() => selectParish(f.properties.id), 900); } }); } catch { /* parishes optional */ }
    for (const c of (await loadGolf()).courses) pl.push({ g: "golf", n: c.n, sub: byS.get(c.m)?.n, go: async () => { await setOverlay("golf", true); showGolf(c); } });
    beaches ??= await fetch("/data/map/beaches.json").then((r) => r.json()).catch(() => []);
    for (const [x, y, n] of beaches!) pl.push({ g: "beach", n, go: async () => { await setOverlay("beach", true); flyTo(x, y, 11.6); toast(n); } });
    for (const p of projects) pl.push({ g: "devs", n: p.name, sub: p.developer, go: () => { flyTo(p.lon, p.lat, 14); setOverlay("devs", true); showProject(p); } });
    pool = pl;
  }
  function find() {
    const t = plain(spotIn.value.trim()); active = 0;
    hits = !t ? [] : pool.filter((h) => plain(h.n).includes(t)).sort((a, b) => Number(!plain(a.n).startsWith(t)) - Number(!plain(b.n).startsWith(t)) || (a.g === "munis" ? -1 : 0) - (b.g === "munis" ? -1 : 0)).slice(0, 12);
    let g = "", h = "";
    hits.forEach((x, i) => { if (x.g !== g) { g = x.g; h += `<li class="m3-rg" role="presentation">${L.g[g]}</li>`; } h += `<li role="option" id="m3o-${i}" data-i="${i}" aria-selected="${i === active}">${esc(x.n)}${x.sub ? `<span>${esc(x.sub)}</span>` : ""}</li>`; });
    if (t && !hits.length) h = `<li class="m3-none">${L.nomatch}</li>`;
    spotRes.innerHTML = h; hits.length ? spotIn.setAttribute("aria-activedescendant", "m3o-0") : spotIn.removeAttribute("aria-activedescendant");
    // Type "Comp" and the map already glides there.
    if (hits[0] && hits[0].g === "munis" && plain(hits[0].n).startsWith(t) && t.length >= 3 && map) { const lo = LOCALITIES.find((l) => l[0] === hits[0].n); const p = lo ? { x: lo[1], y: lo[2] } : features.find((f) => f.properties.n === hits[0].n)?.properties; if (p) map.easeTo({ center: [p.x, p.y], zoom: Math.max(map.getZoom(), 7.4), duration: 700 }); }
  }
  const mark = () => spotRes.querySelectorAll("[role=option]").forEach((li) => li.setAttribute("aria-selected", String(Number((li as HTMLElement).dataset.i) === active)));
  function openSpot() { spot.hidden = false; requestAnimationFrame(() => spot.classList.add("is-open")); spotIn.value = ""; spotRes.innerHTML = ""; spotIn.focus(); if (!pool.length) buildPool().then(find); halt(); }
  function closeSpot() { spot.classList.remove("is-open"); setTimeout(() => (spot.hidden = true), 200); }
  const choose = (i: number) => { const h = hits[i]; if (!h) return; closeSpot(); h.go(); };
  root.querySelector("[data-spot-open]")!.addEventListener("click", openSpot);
  spotIn.addEventListener("input", find);
  spotIn.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { active = Math.min(active + 1, hits.length - 1); mark(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { active = Math.max(active - 1, 0); mark(); e.preventDefault(); }
    else if (e.key === "Enter") { choose(active); e.preventDefault(); } else if (e.key === "Escape") closeSpot();
    if (hits.length) spotIn.setAttribute("aria-activedescendant", `m3o-${active}`);
  });
  spotRes.addEventListener("click", (e) => { const li = (e.target as HTMLElement).closest<HTMLElement>("[data-i]"); if (li) choose(Number(li.dataset.i)); });
  spot.addEventListener("click", (e) => { if (e.target === spot) closeSpot(); });
  if (mode === "page") addEventListener("keydown", (e) => {
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !(e.target as HTMLElement).closest("input,textarea"))) { e.preventDefault(); openSpot(); }
    if (e.key === "Escape" && !sheet.hidden && spot.hidden) select(null);
  });

  // ------------------------------------------------------------ start
  // Nothing moves while the tab is hidden; leaving the page frees the map (and a page restored from the back-forward
  // cache builds it again).
  document.addEventListener("visibilitychange", () => { if (document.hidden) { stopTour(); stopPlay(); if (rotating) halt(); map?.stop(); } });
  let wasLive = false;
  addEventListener("pagehide", () => { wasLive = !!map; teardown(); });
  addEventListener("pageshow", (e) => { if ((e as PageTransitionEvent).persisted && wasLive) load(); });
  dimButtons();
  if (layer !== "price") setLayer(layer);
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
    if (q.has("place") || q.has("parish") || q.has("q") || q.has("layer")) ("requestIdleCallback" in window ? (window as any).requestIdleCallback : setTimeout)(() => load(), { timeout: 2500 });
  }
  // For the automated click check (scripts/map-data/clicktest.mjs).
  (root as any).__mapx = { load, pick: (x: number, y: number) => pick({ x, y }), project: (s: string) => { const p = byS.get(s); return p && map ? map.project([p.x, p.y]) : null; }, map: () => map, selected: () => selected, slugs: () => features.map((f) => f.properties.s), tour, setDim, setBudget, setQuarter, quality: () => quality };
}
