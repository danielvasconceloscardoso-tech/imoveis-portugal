// Browser side of MapExplorer.astro (prompts 16 and 19). MapLibre is imported only when the map is needed:
// the first interaction on the map page, or when the map scrolls into view on the home page.
type Props = { n: string; s: string; c: string; v: number | null; r: string; coast: boolean; city: boolean; air: boolean; x: number; y: number };
type Cfg = { labels: Record<string, any>; links: { buy: string; talk: string; sim: string; map: string; pages: string[] }; quarter: string; privateHref: string; privateLabel: string };

const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const lowPower = () => (navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency <= 2;
// m² → extrusion height in metres: cube root keeps 300 k€ and 10 M€ on the same, readable scale.
const heightExpr = (budget: number): any => ["case", ["==", ["get", "v"], null], 0, ["*", 2700, ["^", ["/", budget, ["get", "v"]], 1 / 3]]];
// Colour by price per m² (cheaper = deeper green = more space): the same pattern at every budget, the height carries the budget.
const colorExpr = (_budget: number): any => ["case", ["==", ["get", "v"], null], "#d9d4c7", ["boolean", ["feature-state", "sel"], false], "#8c6d33",
  ["interpolate", ["linear"], ["ln", ["get", "v"]], Math.log(700), "#1f4a3d", Math.log(1100), "#3d6e5a", Math.log(1700), "#7d9f83", Math.log(2600), "#b8c6a4", Math.log(4200), "#e2dcc4"]];

export function initMapExplorer(root: HTMLElement) {
  const cfg: Cfg = JSON.parse(root.querySelector("[data-mapx-labels]")!.textContent || "{}");
  const L = cfg.labels;
  const loc = root.dataset.locale || "pt-PT";
  const nf = new Intl.NumberFormat(loc);
  const eur = new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const fx = Number(root.dataset.fx) || 0, cur = root.dataset.cur || "";
  const local = cur ? new Intl.NumberFormat(loc, { style: "currency", currency: cur, maximumFractionDigits: 0 }) : null;
  const input = root.querySelector<HTMLInputElement>("[data-budget]")!;
  const card = root.querySelector<HTMLElement>("[data-card]")!;
  const canvas = root.querySelector<HTMLElement>("[data-canvas]")!;
  const q = new URLSearchParams(location.search);
  let budget = Math.max(100000, Number(q.get("budget")) || 300000);
  let selected: string | null = q.get("place");
  let filter = "all", region = "";
  let map: any = null, features: any[] = [], loading = false, rotating = false;

  const parse = (s: string) => Number(s.replace(/[^\d]/g, "")) || 0;
  function setBudget(b: number, fromInput = false) {
    budget = Math.min(Math.max(b, 100000), 1e9);
    if (!fromInput) input.value = nf.format(budget);
    root.querySelectorAll<HTMLButtonElement>("[data-preset]").forEach((p) => p.setAttribute("aria-pressed", String(Number(p.dataset.preset) === budget)));
    const lt = root.querySelector<HTMLElement>("[data-local-tpl]");
    if (lt && local && fx) lt.textContent = lt.dataset.localTpl!.replace("{local}", local.format(budget * fx));
    root.querySelectorAll<HTMLElement>("tr[data-v]").forEach((tr) => { const td = tr.querySelector("[data-m2]"); if (td) td.textContent = `${nf.format(Math.round(budget / Number(tr.dataset.v)))} m²`; });
    if (map && map.getLayer("muni-3d")) {
      if (!(reduce() || lowPower())) map.setPaintProperty("muni-3d", "fill-extrusion-height", heightExpr(budget));
      map.setPaintProperty("muni-3d", "fill-extrusion-color", colorExpr(budget));
    }
    if (selected) showCard(selected);
    syncUrl();
  }
  function syncUrl() {
    const p = new URLSearchParams(location.search);
    p.set("budget", String(budget)); selected ? p.set("place", selected) : p.delete("place");
    history.replaceState(null, "", `${location.pathname}?${p}`);
  }
  function showCard(slug: string) {
    const f = features.find((x) => x.properties.s === slug); if (!f) return;
    const p: Props = f.properties;
    const m2 = p.v ? Math.round(budget / p.v) : null;
    const photo: Record<string, string> = { north: "porto-ribeira-rabelo", lisbon: "lisboa-alfama-telhados" };
    const img = photo[p.r] ? `<img src="/img/${photo[p.r]}-640.webp" alt="" width="640" height="427" loading="lazy">` : "";
    const sim = `${cfg.links.sim}?price=${budget}&own=0&resident=0&mortgage=0`;
    card.innerHTML = `${img}<div class="mapx-card-b"><p class="h-small">${L.regions[p.r] || ""}</p><h3>${p.n}</h3>`
      + (m2 ? `<p class="mapx-big">${nf.format(m2)}<span> ${L.m2}</span></p><p class="small">${L.median.replace("{v}", eur.format(p.v!))}</p>` : `<p class="small">${L.nodata}</p>`)
      + `<p class="mapx-actions"><a class="btn sm" href="${cfg.links.buy}?place=${encodeURIComponent(p.n)}&budget=${budget}">${L.homes}</a>`
      + `<a href="${cfg.links.talk}?cat=developer&place=${encodeURIComponent(p.n)}#form">${L.dev}</a><a href="${sim}">${L.sim}</a></p>`
      // Prompt 19: three actions; the municipality page and the Private section as quiet links below them.
      + `<p class="mapx-more small">` + (cfg.links.pages.includes(p.s) ? `<a href="${cfg.links.map}${p.s}/">${L.page}</a>` : "")
      + (budget >= 1e6 && cfg.privateHref ? `<a href="${cfg.privateHref}">${cfg.privateLabel}</a>` : "") + `</p></div>`
      + `<button type="button" class="mapx-close" aria-label="×">×</button>`;
    card.hidden = false;
    card.querySelector(".mapx-close")!.addEventListener("click", () => { card.hidden = true; select(null); });
  }
  function select(slug: string | null) {
    if (map) {
      features.forEach((f) => map.setFeatureState({ source: "munis", id: f.id }, { sel: f.properties.s === slug }));
      const f = slug && features.find((x) => x.properties.s === slug);
      if (f) { rotating = false; map.flyTo({ center: [f.properties.x, f.properties.y], zoom: Math.max(map.getZoom(), 7.2), pitch: reduce() ? 0 : 55, duration: reduce() ? 0 : 1600, essential: true }); }
    }
    selected = slug; syncUrl();
    if (slug) showCard(slug);
  }
  function applyFilter() {
    if (!map || !map.getLayer("muni-3d")) return;
    const conds: any[] = ["all"];
    if (filter === "coast") conds.push(["==", ["get", "coast"], true]);
    if (filter === "inland") conds.push(["==", ["get", "coast"], false]);
    if (filter === "city") conds.push(["==", ["get", "city"], true]);
    if (filter === "country") conds.push(["==", ["get", "city"], false]);
    if (filter === "air") conds.push(["==", ["get", "air"], true]);
    if (region) conds.push(["==", ["get", "r"], region]);
    map.setFilter("muni-3d", conds.length > 1 ? conds : null);
  }

  async function load() {
    if (map || loading) return; loading = true;
    const [{ default: maplibre }] = await Promise.all([import("maplibre-gl"), import("maplibre-gl/dist/maplibre-gl.css")]);
    const geo = await fetch("/data/pt-map.geojson").then((r) => r.json());
    features = geo.features;
    const flat = reduce() || lowPower();
    const narrow = root.clientWidth < 600;
    map = new maplibre.Map({
      container: canvas, attributionControl: false, dragRotate: !flat, pitchWithRotate: !flat, maxPitch: 70,
      center: narrow ? [-8.55, 39.55] : [-8.55, 39.45], zoom: narrow ? 5.55 : 6.25, pitch: flat ? 0 : 50, bearing: flat ? 0 : -14,
      style: { version: 8, sources: {}, layers: [{ id: "bg", type: "background", paint: { "background-color": "#f3efe6" } }] },
    });
    map.addControl(new maplibre.AttributionControl({ compact: true, customAttribution: "CAOP2025 © DGT · INE" }));
    map.on("load", () => {
      map.addSource("munis", { type: "geojson", data: geo });
      map.addLayer({ id: "muni-base", type: "fill", source: "munis", paint: { "fill-color": "#e4ddcd", "fill-outline-color": "#cfc6b3" } });
      map.addLayer({ id: "muni-3d", type: "fill-extrusion", source: "munis", paint: {
        "fill-extrusion-color": colorExpr(budget), "fill-extrusion-height": flat ? 0 : heightExpr(budget), "fill-extrusion-opacity": 0.92,
        "fill-extrusion-height-transition": { duration: reduce() ? 0 : 900, delay: 0 }, "fill-extrusion-color-transition": { duration: reduce() ? 0 : 600, delay: 0 },
      } as any });
      root.classList.add("is-live");
      placeInsets();
      applyFilter();
      if (selected) select(selected);
      if (root.dataset.mode === "home" && !flat) { rotating = true; spin(); }
    });
    map.on("move", placeInsets);
    const pick = (e: any) => { const f = e.features?.[0]; if (f) select(f.properties.s); };
    map.on("click", "muni-3d", pick);
    map.on("click", "muni-base", pick);
    map.on("mouseenter", "muni-3d", () => (map.getCanvas().style.cursor = "pointer"));
    map.on("mouseleave", "muni-3d", () => (map.getCanvas().style.cursor = ""));
    ["mousedown", "touchstart", "wheel"].forEach((ev) => canvas.addEventListener(ev, () => (rotating = false), { passive: true }));
    applyFilter();
  }
  function spin() { if (!rotating || !map) return; map.easeTo({ bearing: map.getBearing() + 6, duration: 4000, easing: (t: number) => t }); map.once("moveend", spin); }
  function placeInsets() {
    if (!map) return;
    for (const f of [["madeira", -11.2, 37.1], ["azores", -12.6, 40.45]] as [string, number, number][]) {
      const el = root.querySelector<HTMLElement>(`[data-inset="${f[0]}"]`); if (!el) continue;
      const p = map.project([f[1], f[2]]); el.style.transform = `translate(${p.x}px, ${p.y}px)`; el.hidden = false;
    }
  }

  // Controls
  input.addEventListener("change", () => setBudget(parse(input.value)));
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") setBudget(parse(input.value)); });
  root.querySelectorAll<HTMLButtonElement>("[data-preset]").forEach((b) => b.addEventListener("click", () => { setBudget(Number(b.dataset.preset)); load(); }));
  root.querySelectorAll<HTMLButtonElement>("[data-filter]").forEach((b) => b.addEventListener("click", () => {
    filter = b.dataset.filter!; root.querySelectorAll("[data-filter]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); load().then(applyFilter);
  }));
  root.querySelector<HTMLSelectElement>("[data-region]")?.addEventListener("change", (e) => { region = (e.target as HTMLSelectElement).value; load().then(applyFilter); });
  root.querySelector<HTMLInputElement>("[data-search]")?.addEventListener("input", (e) => {
    const t = (e.target as HTMLInputElement).value.trim().toLowerCase();
    root.querySelectorAll<HTMLElement>("tr[data-row]").forEach((tr) => (tr.hidden = !!t && !tr.dataset.row!.includes(t)));
  });

  // When to load the live map: first interaction with it (map page), or in view (home page).
  const go = () => load();
  if (root.dataset.mode === "home") new IntersectionObserver((es, o) => { if (es.some((e) => e.isIntersecting)) { o.disconnect(); go(); } }, { rootMargin: "200px" }).observe(root);
  else {
    ["pointerdown", "touchstart", "focusin", "wheel"].forEach((ev) => root.addEventListener(ev, go, { once: true, passive: true }));
    addEventListener("scroll", go, { once: true, passive: true });
    if (q.has("place") || q.has("budget")) go();
  }
  setBudget(budget);
}
