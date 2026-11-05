// Golf mode (prompt 78, 4 Nov 2026): the map in Algarve summer, in 3D, with Details' courses lit and their flags standing.
// One tap on "Golf" and the camera glides (about 1.2 s) to a pitched view of the coast from the sea; reduced motion jumps.
// Everything here is added on top of map v3 and taken away again on the way out: the paint of the base layers is recorded
// before it changes and put back exactly, every layer, source, image and marker this file adds is removed, and the camera
// returns to where the reader was. map-v3.ts only calls createGolf() and a few hooks (attach, detach, click, door, fill).
// Data: /data/map/golf-mode.json (scripts/map-data/golf_mode.py: Details' verified courses with their first tee and
// OpenStreetMap outline, the OSRM drive times, the towns and the sourced captions). Wording: COPY_DECK.md "p78.*".
// The look is "Noon", the operator's pick of three refinements of the approved v3 (4 Nov 2026).

type Course = { id: string; n: string; short: string; resort: string; grp: string; holes: number | null; arch: string; x: number; y: number; tee: string; url: string;
  photo: string; credit: string; src: { t: string; u: string }[]; near: { id: string; name: string; min: number } | null; outline: any; gids?: number[] };
type Door = { k: "course" | "beach" | "marina"; n: string; id: string; min: number; tee: boolean };
type Data = { checked: string; glints?: number[][]; courses: Course[]; door: Record<string, Door[]>; towns: [string, number, number][]; caps: { id: string; n: string; x: number; y: number; cap: Record<string, string>; src: { t: string; u: string } }[]; gids: number[] };
type Look = {
  sky: Record<string, any>; land: string; hill: [string, string, number, number]; sea: [string, string, string, string];
  sand: string; ochre: string; turf: [string, string]; side: string; glow: string; other: string; sun: number; shadow: number;
};
export type GolfHost = {
  root: HTMLElement; cfg: any; q: URLSearchParams; reduce: () => boolean; isFlat: () => boolean; quality: () => number;
  load: () => Promise<void>; map: () => any; ml: () => any; sheetIn: HTMLElement; projects: any[];
  openSheet: (h: string, focus: boolean, arr?: boolean) => void; showProject: (p: any) => void; ev: (e: any) => void; esc: (s: string) => string;
  isWide: () => boolean; padL: () => number; padTop: (b: number) => number; governor: () => void; sky: () => any;
  pins: () => { p: any; el: HTMLElement; m: any }[]; golfOverlay: () => boolean; setGolfOverlay: (on: boolean) => Promise<void>; stopAll: () => void;
};

// The light: one sun for the whole scene, from the south-west as on the hillshade (225°), so every shadow falls to the
// north-east. The sea is a smooth ramp drawn from the coastline outwards (shore turquoise to Atlantic blue) over our own
// depth tiles, recoloured and flattened (they are coarse at coast distance, and the only data that tells sea from Spain).
// Noon: Slim Aarons' pool light. Clear blue sky to a warm horizon, turquoise on the sand, cream land, bright turf.
const LK: Look = { sky: { "sky-color": "#7cc4ec", "horizon-color": "#f7ebd9", "fog-color": "#f4ead9", "sky-horizon-blend": 0.6, "horizon-fog-blend": 0.7, "fog-ground-blend": 0.35, "atmosphere-blend": 0 },
  land: "#f6ebd6", hill: ["rgba(255,252,240,0.5)", "#e9dac0", 0.12, 225], sea: ["#5fd6d2", "#2bb3c6", "#1d8fc4", "#0f5fa8"],
  sand: "#f2dfb2", ochre: "#c98d4c", turf: ["#6fd173", "#4db352"], side: "#2f8a3e", glow: "#fff6d8", other: "#a9d98f", sun: 225, shadow: 1 };
const FLAG = (s: number) => `<svg class="gm-f-svg" viewBox="0 0 64 80" width="64" height="80" aria-hidden="true">
  <ellipse cx="32" cy="76.5" rx="6.4" ry="2.3" fill="#1b2a22"/><ellipse cx="32" cy="76" rx="4.2" ry="1.3" fill="#0d1612"/>
  <path d="M32 76.2V7" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M32.8 75V8" stroke="rgba(30,40,40,.2)" stroke-width=".8"/>
  <circle cx="32" cy="6.2" r="2" fill="#fff"/>
  <g class="gm-wave" style="animation-delay:${-s * 1.7}s"><path d="M33 8c5.6-1.3 11.4 1.8 17.6 3.2 2.7.6 5.4.7 7.9.2-1.9 2.3-2 5.4-.3 8.2-6.8 1.3-12.9-1.9-18.8-3.2-2.3-.5-4.5-.5-6.4 0z" fill="#f5c431"/>
  <path d="M33 8c5.6-1.3 11.4 1.8 17.6 3.2 2.7.6 5.4.7 7.9.2-1.3 1.4-1.8 3.1-1.7 4.8-6.6 1-12.2-2.4-17.7-3.6-2.2-.5-4.3-.5-6.1-.1z" fill="rgba(255,255,255,.3)"/></g></svg>`;
const ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 20.5V3.6"/><path d="M8.6 4c2.6-.5 5.4 1.3 9.4 1.2-1.2 1.4-1.2 3 0 4.4-4 .2-6.8-1.6-9.4-1.1z" fill="currentColor" stroke="none"/><ellipse cx="8" cy="20.6" rx="3.6" ry="1"/></svg>`;

export function createGolf(h: GolfHost) {
  const { root, cfg, esc } = h, G = cfg.p78 ?? {}, lang = cfg.lang;
  const btn = root.querySelector<HTMLButtonElement>("[data-golf]");
  if (btn && !btn.querySelector("svg")) btn.insertAdjacentHTML("afterbegin", ICON);
  let want = h.q.get("mode") === "golf", active = false, busy: Promise<void> | null = null;
  let dataP: Promise<Data | null> | null = null;
  const data = () => (dataP ??= fetch("/data/map/golf-mode.json").then((r) => (r.ok ? r.json() : null)).catch(() => null));
  const nf = new Intl.NumberFormat(root.dataset.locale || "en");
  const T = (k: string, v: Record<string, string | number> = {}) => String(G[k] ?? "").replace(/\{(\w+)\}/g, (m, x) => (x in v ? String(v[x]) : m));

  // ------------------------------------------------------------ what golf mode changes, and how it is put back
  let saved: { cam: any; terrain: any; sky: any; overlay: boolean; paint: [string, string, any][]; filt: [string, any][]; flat: boolean } | null = null;
  const ids = { layers: [] as string[], sources: [] as string[], images: [] as string[] };
  let marks: { m: any; el: HTMLElement; kind: string; c?: Course; grp?: string; w: number; h: number }[] = [];
  let haze: HTMLElement | null = null, year: HTMLElement | null = null, glintT = 0, raf = 0, mo: MutationObserver | null = null;
  function paint(map: any, id: string, prop: string, v: any) {
    if (!map.getLayer(id)) return;
    if (!saved!.paint.some(([a, b]) => a === id && b === prop)) saved!.paint.push([id, prop, map.getPaintProperty(id, prop)]);
    map.setPaintProperty(id, prop, v);
  }
  function filt(map: any, id: string, f: any) { if (!map.getLayer(id)) return; if (!saved!.filt.some(([a]) => a === id)) saved!.filt.push([id, map.getFilter(id)]); map.setFilter(id, f); }
  const addLayer = (map: any, l: any, before?: string) => { map.addLayer(l, before && map.getLayer(before) ? before : undefined); ids.layers.push(l.id); };
  const addSource = (map: any, id: string, s: any) => { map.addSource(id, s); ids.sources.push(id); };

  // The mown stripes: a small tile of two greens in 45° bands, as a mower leaves them (world-aligned, so it never swims).
  function stripes(map: any) {
    const id = "gm-stripe"; if (map.hasImage(id)) return id;
    const n = 32, c = document.createElement("canvas"); c.width = c.height = n; const g = c.getContext("2d")!;
    g.fillStyle = LK.turf[0]; g.fillRect(0, 0, n, n); g.fillStyle = LK.turf[1];
    for (let k = -n; k < n * 2; k += 16) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k + 8, 0); g.lineTo(k + 8 - n, n); g.lineTo(k - n, n); g.closePath(); g.fill(); }
    map.addImage(id, g.getImageData(0, 0, n, n), { pixelRatio: 2 }); ids.images.push(id); return id;
  }

  // ------------------------------------------------------------ on
  async function enter() {
    await h.load(); const map = h.map(), ml = h.ml(); if (!map) return;
    const D = await data(); if (!D || !want || active) return;
    h.stopAll();
    const c = map.getCenter();
    saved = { cam: { center: [c.lng, c.lat], zoom: map.getZoom(), pitch: map.getPitch(), bearing: map.getBearing(), padding: map.getPadding() }, terrain: map.getTerrain?.() ?? null, sky: h.sky(), overlay: h.golfOverlay(), paint: [], filt: [], flat: h.isFlat() };
    active = true; root.classList.add("is-golf"); btn?.setAttribute("aria-pressed", "true");
    if (!saved.overlay) await h.setGolfOverlay(true);
    if (!active) return;
    // The land, the sea, the relief: Algarve summer (golf mode only).
    // The sea: our depth tiles (the only source that knows sea from Spain's land) turned Atlantic blue with their depth
    // steps flattened (negative contrast), so they never band; the ramp to the shore is drawn over them (below).
    paint(map, "bg", "background-color", LK.land); paint(map, "land", "fill-color", LK.land);
    for (const id of ["sea", "seafar"]) { paint(map, id, "raster-hue-rotate", 12); paint(map, id, "raster-saturation", 0.97); paint(map, id, "raster-contrast", -0.8); paint(map, id, "raster-brightness-min", 0.02); paint(map, id, "raster-brightness-max", 0.6); }
    paint(map, "hill", "hillshade-highlight-color", LK.hill[0]); paint(map, "hill", "hillshade-shadow-color", LK.hill[1]); paint(map, "hill", "hillshade-exaggeration", LK.hill[2]); paint(map, "hill", "hillshade-illumination-direction", LK.hill[3]);
    paint(map, "hill", "hillshade-accent-color", "rgba(0,0,0,0)");
    paint(map, "muni-line", "line-opacity", 0); paint(map, "region-line", "line-opacity", 0); paint(map, "reach", "line-opacity", 0); paint(map, "rivers", "line-color", "#86c6cc");
    // The sand and the thin ochre line where the land meets the sea.
    paint(map, "coast-glow", "line-color", LK.sand); paint(map, "coast-glow", "line-opacity", 1); paint(map, "coast-glow", "line-blur", ["interpolate", ["linear"], ["zoom"], 7, 0.5, 12, 2]);
    paint(map, "coast-glow", "line-width", ["interpolate", ["exponential", 1.6], ["zoom"], 7, 1.5, 10, 4, 12.5, 11]);
    paint(map, "coast", "line-color", LK.ochre); paint(map, "coast", "line-width", ["interpolate", ["linear"], ["zoom"], 7, 0.5, 12, 1.3]); paint(map, "coast", "line-opacity", 0.85);
    // The sea ramp, outwards from the shore: turquoise, lagoon, Atlantic, over the deep blue ground (bevel joins: no spikes).
    if (map.getSource("coast")) [[2, 360, 300, 0.95], [1, 150, 110, 0.95], [0, 48, 30, 0.95]].forEach(([c, w, b, o]) => {
      const zw = (v: number) => ["interpolate", ["exponential", 1.5], ["zoom"], 7, v / 24, 10, v / 2.6, 13, v];
      addLayer(map, { id: `gm-sea${c}`, type: "line", source: "coast", layout: { "line-join": "bevel", "line-cap": "butt" }, paint: { "line-color": LK.sea[c], "line-opacity": o, "line-width": zw(w), "line-blur": zw(b) } }, "land");
    });
    // Every other course: a lighter green, so the golf map is complete; Details' courses are drawn below, raised and lit.
    const gids = D.gids ?? [];
    paint(map, "golf", "fill-color", LK.other); paint(map, "golf", "fill-opacity", ["interpolate", ["linear"], ["zoom"], 8.5, 0, 9.4, 0.8]);
    filt(map, "golf", ["!", ["in", ["get", "c"], ["literal", gids]]]);
    filt(map, "golfpt-o", ["all", ["get", "o"], ["!", ["in", ["get", "c"], ["literal", gids]]]]);
    filt(map, "golfpt", ["all", ["!", ["get", "o"]], ["!", ["in", ["get", "c"], ["literal", gids]]]]);
    // Their pins (courses not lit) stay, smaller and in the pale green, so the flags lead.
    for (const id of ["golfpt", "golfpt-o"]) { paint(map, id, "circle-color", ["case", ["get", "soon"], "#ffffff", "#79ad6c"]); paint(map, id, "circle-stroke-color", "#ffffff"); paint(map, id, "circle-pitch-scale", "viewport");
      paint(map, id, "circle-radius", ["interpolate", ["linear"], ["zoom"], 6, 2, 9, 3.2, 12, 5]); paint(map, id, "circle-stroke-width", 1.2); }
    addSource(map, "gm-c", { type: "geojson", data: { type: "FeatureCollection", features: D.courses.filter((x) => x.outline).map((x) => ({ type: "Feature", properties: { id: x.id }, geometry: x.outline })) } });
    addLayer(map, { id: "gm-glow", type: "line", source: "gm-c", minzoom: 8.4, paint: { "line-color": LK.glow, "line-opacity": ["interpolate", ["linear"], ["zoom"], 8.4, 0, 9.4, 0.55], "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 9, 3, 12, 10, 14, 20], "line-blur": 8 } });
    // The turf: 7 m, its sides a deeper green, its top mown in stripes (a side slab and a thin striped top, so the sides
    // keep their own colour; MapLibre would stripe the walls too).
    const hgt = (k: number) => ["interpolate", ["linear"], ["zoom"], 9, 40 * k, 11, 16 * k, 13, 7 * k];
    addLayer(map, { id: "gm-side", type: "fill-extrusion", source: "gm-c", minzoom: 8.4, paint: { "fill-extrusion-color": LK.side, "fill-extrusion-height": hgt(0.96), "fill-extrusion-base": 0, "fill-extrusion-vertical-gradient": false, "fill-extrusion-opacity": 1 } as any });
    addLayer(map, { id: "gm-top", type: "fill-extrusion", source: "gm-c", minzoom: 8.4, paint: { "fill-extrusion-pattern": stripes(map), "fill-extrusion-height": hgt(1), "fill-extrusion-base": hgt(0.96), "fill-extrusion-vertical-gradient": false, "fill-extrusion-opacity": 1 } as any });
    // Slow glints on the water. Decoration only: they hold still under reduced motion and on phones (fps first).
    if (D.glints?.length) {
      for (const k of [0, 1]) {
        addSource(map, `gm-g${k}`, { type: "geojson", data: { type: "FeatureCollection", features: D.glints.filter((_: any, i: number) => i % 4 === k).map(([x, y, r]: number[]) => ({ type: "Feature", properties: { r }, geometry: { type: "Point", coordinates: [x, y] } })) } });
        addLayer(map, { id: `gm-g${k}`, type: "circle", source: `gm-g${k}`, minzoom: 9, paint: { "circle-color": "#ffffff", "circle-blur": 0.7, "circle-pitch-alignment": "map",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 9, ["*", 0.6, ["get", "r"]], 13, ["*", 2, ["get", "r"]]], "circle-opacity": k ? 0.1 : 0.5, "circle-opacity-transition": { duration: 2600, delay: 0 } } as any }, "land");
      }
      const moving = !h.reduce() && matchMedia("(pointer: fine)").matches;
      if (moving) { let on = 0; glintT = window.setInterval(() => { if (document.hidden || !active || h.quality() > 0) return; on ^= 1; map.setPaintProperty("gm-g0", "circle-opacity", on ? 0.1 : 0.5); map.setPaintProperty("gm-g1", "circle-opacity", on ? 0.5 : 0.1); }, 2800); }
    }
    // Closer than the normal map goes (12.5): a course reads as turf from about 13.
    (saved as any).maxZoom = map.getMaxZoom(); map.setMaxZoom(14.5);
    if (!saved.terrain && h.quality() === 0) map.setTerrain({ source: "dem", exaggeration: 1.5 });
    try { map.setSky(LK.sky); } catch { /* no sky in this style */ }
    for (const m of h.pins()) m.m.setOpacity?.("1", "1");
    haze = document.createElement("div"); haze.className = "gm-haze"; haze.setAttribute("aria-hidden", "true"); map.getCanvas().after(haze);
    drawMarks(map, ml, D);
    drawYear();
    map.on("move", layoutSoon); map.on("moveend", placeSoon); map.on("resize", placeSoon); map.on("styledata", layoutSoon);
    mo = new MutationObserver((ms) => { if (ms.some((m) => m.type === "attributes")) placeSoon(); else hideClashing(); });
    const lab = root.querySelector("[data-labels]"); if (lab) mo.observe(lab, { childList: true });
    const sh = root.querySelector("[data-sheet]"); if (sh) mo.observe(sh, { attributes: true, attributeFilter: ["class", "hidden", "data-detent"] });  // a card opens: names step out of its way
    setUrl(true); h.ev({ event: "map/golf/on", origin: root.dataset.mode });
    glide(map);
    layout(true); h.governor();
    fill(h.sheetIn);
  }
  // The glide in: about 1.2 s to Vilamoura seen from the sea, pitched along the coast (inside maxPitch 72).
  const HERO = { desk: { center: [-8.1265, 37.0905], zoom: 13.2, pitch: 72, bearing: -10 }, phone: { center: [-8.1285, 37.0905], zoom: 12.3, pitch: 70, bearing: -10 } };
  function glide(map: any) {
    // The camera stands over the sea looking north, the sea along the bottom of the screen; padding the top lowers the
    // vanishing point (MapLibre's field of view is fixed), so the summer sky shows below the header.
    // /arrow (?pins=): the coast from Palmares to Vilamoura, so the three developments and every Algarve flag are in view.
    const coast = h.q.has("pins") ? (h.isWide() ? { center: [-8.4, 37.035], zoom: 10.25, pitch: 67, bearing: 72 } : { center: [-8.33, 37.02], zoom: 9.55, pitch: 62, bearing: 72 }) : null;
    const H = map.getCanvas().clientHeight, to = { ...(coast ?? (h.isWide() ? HERO.desk : HERO.phone)), padding: { top: coast ? 0 : Math.round(H * (h.isWide() ? 0.2 : 0.16)), bottom: 0, left: 0, right: 0 } }, far = Math.abs(map.getZoom() - to.zoom) > 3;
    if (h.reduce()) { map.jumpTo(to); return; }
    // The reader may take over at any moment; anything else that cuts the glide short (the fps governor dropping the
    // terrain mid-flight) is finished with a short ease, so golf mode always arrives.
    let took = false; const cv = map.getCanvasContainer(), mine = () => { took = true; };
    ["pointerdown", "wheel", "touchstart"].forEach((e) => cv.addEventListener(e, mine, { once: true, passive: true }));
    map.flyTo({ ...to, duration: far ? 1600 : 1200, curve: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 3), essential: true });
    map.once("moveend", () => {
      ["pointerdown", "wheel", "touchstart"].forEach((e) => cv.removeEventListener(e, mine));
      if (!took && active && (Math.abs(map.getZoom() - to.zoom) > 0.05 || Math.abs(map.getPitch() - to.pitch) > 1)) map.easeTo({ ...to, duration: 500, essential: true });
    });
  }

  // ------------------------------------------------------------ off: back exactly to the normal map
  async function leave() {
    const map = h.map(); if (!active || !saved) return;
    active = false; clearInterval(glintT); cancelAnimationFrame(raf); raf = 0; cancelAnimationFrame(raf2); raf2 = 0; mo?.disconnect(); mo = null;
    marks.forEach((x) => x.m.remove()); marks = []; year?.remove(); year = null; haze?.remove(); haze = null;
    root.querySelectorAll(".m3-pin.gm-named, .m3-pin.gm-far").forEach((e) => e.classList.remove("gm-named", "gm-far"));
    for (const m of h.pins()) m.m.setOpacity?.();
    root.querySelectorAll<HTMLElement>("[data-labels] span").forEach((s) => (s.style.visibility = ""));
    root.style.removeProperty("--gm-shx"); root.style.removeProperty("--gm-shy");
    if (map) {
      map.off("move", layoutSoon); map.off("moveend", placeSoon); map.off("resize", placeSoon); map.off("styledata", layoutSoon);
      for (const id of [...ids.layers].reverse()) if (map.getLayer(id)) map.removeLayer(id);
      for (const id of ids.sources) if (map.getSource(id)) map.removeSource(id);
      for (const id of ids.images) if (map.hasImage(id)) map.removeImage(id);
      for (const [id, prop, v] of [...saved.paint].reverse()) if (map.getLayer(id)) map.setPaintProperty(id, prop, v);
      for (const [id, f] of saved.filt) if (map.getLayer(id)) map.setFilter(id, f);
      map.setTerrain(h.quality() > 0 ? null : saved.terrain);  // the fps governor's call stands
      try { map.setSky(saved.sky); } catch { /* no sky */ }
      const mz = (saved as any).maxZoom;
      map.easeTo({ ...saved.cam, duration: h.reduce() ? 0 : 1000, essential: true });
      if (h.reduce()) map.setMaxZoom(mz); else map.once("moveend", () => { if (!active) map.setMaxZoom(mz); });
    }
    ids.layers = []; ids.sources = []; ids.images = [];
    if (!saved.overlay) {
      await h.setGolfOverlay(false);
      // The golf layer golf mode switched on goes too (map-v3 draws it again the next time the reader asks for it).
      const m2 = h.map(); if (m2) { for (const id of ["golfpt-o", "golfpt", "golf"]) if (m2.getLayer(id)) m2.removeLayer(id); for (const id of ["golfpt", "golf"]) if (m2.getSource(id)) m2.removeSource(id); }
    }
    saved = null; root.classList.remove("is-golf", "gm-near"); btn?.setAttribute("aria-pressed", "false");
    setUrl(false); h.ev({ event: "map/golf/off", origin: root.dataset.mode });
    fill(h.sheetIn);
  }
  function setUrl(on: boolean) { const u = new URL(location.href); on ? u.searchParams.set("mode", "golf") : u.searchParams.delete("mode"); history.replaceState(history.state, "", `${u.pathname}${u.search}${u.hash}`); }
  async function set(on: boolean) {
    want = on; await busy; busy = (on ? enter() : leave()).catch((e) => console.error("golf mode", e)); await busy; busy = null;
  }
  btn?.addEventListener("click", () => set(!want));

  // ------------------------------------------------------------ flags, photo pins, names: upright HTML, laid out every frame
  function drawMarks(map: any, ml: any, D: Data) {
    const tag = T("tag"), mk = (el: HTMLElement, x: number, y: number, kind: string, extra: Partial<typeof marks[0]> = {}) => {
      // Upright and always whole: MapLibre would dim a marker it thinks the relief hides (opacityWhenCovered).
      const sea = kind === "cap" && !h.isWide(), m = new ml.Marker({ element: el, anchor: kind === "cap" ? (sea ? "top-left" : "bottom-left") : "bottom", offset: kind === "cap" ? [-6, sea ? -6 : 6] : [0, 0], opacityWhenCovered: "1" }).setLngLat([x, y]).addTo(map);
      // MapLibre names every marker "Map marker": the flag keeps its own name (course, holes, architect, "Our pick").
      if (el.dataset.label) el.setAttribute("aria-label", el.dataset.label); else el.setAttribute("aria-hidden", "true");
      marks.push({ m, el, kind, w: 0, h: 0, ...extra });
    };
    D.courses.forEach((c, i) => {
      const el = document.createElement("button"); el.type = "button"; el.className = "gm-flag";
      el.dataset.label = [c.n, c.holes ? T("holes", { n: c.holes }) : "", c.arch, tag].filter(Boolean).join(", ");
      el.innerHTML = `<span class="gm-f"><i class="gm-sh" aria-hidden="true"></i>${FLAG(i)}<b class="gm-n" aria-hidden="true"></b></span>
        <span class="gm-lab" aria-hidden="true"><em>${esc(c.short)}</em><small>${esc([c.holes ? T("holes", { n: c.holes }) : "", c.arch.split(",")[0]].filter(Boolean).join(" · "))}</small></span>`;
      el.addEventListener("click", (e) => { e.stopPropagation(); hole(c); });
      mk(el, c.x, c.y, "flag", { c, grp: c.grp });
    });
    // A group of flags (Vilamoura's five) is named once from afar; a lone course keeps its own name.
    const groups = new Map<string, Course[]>(); for (const c of D.courses) if (c.grp) groups.set(c.grp, [...(groups.get(c.grp) ?? []), c]);
    for (const [g, cs] of groups) {
      if (cs.length < 2) continue;
      const town = D.towns.find((t) => t[0].toLowerCase() === g.toLowerCase());
      const el = document.createElement("div"); el.className = "gm-grp"; el.setAttribute("aria-hidden", "true");
      el.innerHTML = `<em>${esc(town?.[0] ?? cs[0].resort ?? g)}</em><small>${esc(T("courses", { n: cs.length }))}</small>`;
      const x = cs.reduce((a, c) => a + c.x, 0) / cs.length, y = Math.max(...cs.map((c) => c.y));
      mk(el, x, y, "grp", { grp: g });
    }
    for (const cp of D.caps) {
      const el = document.createElement("div"); el.className = "gm-cap"; el.setAttribute("aria-hidden", "true");
      el.innerHTML = `<i></i><span><b>${esc(cp.n)}</b><small>${esc(cp.cap[lang] ?? cp.cap.en)}</small></span>`;
      mk(el, cp.x, cp.y, "cap");
    }
    for (const [n, x, y] of D.towns) {
      if (groups.has(n.toLowerCase())) continue;
      const el = document.createElement("div"); el.className = "gm-town"; el.setAttribute("aria-hidden", "true"); el.textContent = n;
      mk(el, x, y, "town");
    }
    requestAnimationFrame(() => { for (const x of marks) { const l = x.el.querySelector<HTMLElement>(".gm-lab") ?? x.el; x.w = l.offsetWidth; x.h = l.offsetHeight; } layout(true); });
  }
  function drawYear() {
    const items: string[] = G.year ?? []; if (!items.length) return;
    year = document.createElement("p"); year.className = "gm-year";
    year.innerHTML = `<b>${esc(T("year.k"))}</b><span>${items.map(esc).join(" · ")}</span>`;
    root.querySelector(".m3-stage")?.append(year);
  }
  // Every frame while the map moves: sizes, shadows, clusters and the photo pins (cheap). The names are placed when the
  // camera rests (and when a card opens): they keep their side while the map moves, so nothing jumps between frames.
  const layoutSoon = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; layout(false); }); };
  let raf2 = 0; const placeSoon = () => { if (!raf2) raf2 = requestAnimationFrame(() => { raf2 = 0; layout(true); }); };
  type Box = { x: number; y: number; w: number; h: number };
  const hit = (a: Box, list: Box[]) => list.some((b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y);
  let mine: Box[] = [];
  // The flag's size: about 56 px of pole from zoom 13, never under 30 px at zoom 10 (pole = 69 of the flag's 80 units).
  const flagScale = (z: number) => Math.min(0.84, Math.max(0.44, 0.44 + (z - 10) * (0.37 / 3)));
  function layout(place: boolean) {
    const map = h.map(); if (!map || !active) return;
    const z = map.getZoom(), cv = map.getCanvas().getBoundingClientRect(), W = cv.width, H = cv.height, wide = h.isWide();
    // The parish borders arrive later (from z 7.8): quiet them as soon as they exist.
    if (map.getLayer("par-line") && !saved!.paint.some(([a]) => a === "par-line")) paint(map, "par-line", "line-opacity", 0);
    root.classList.toggle("gm-near", z >= 9.4);
    // The sun's shadow on the ground, seen from where the camera is (bearing and pitch): one direction for everything.
    const az = ((LK.sun + 180 - map.getBearing()) * Math.PI) / 180, k = Math.cos((map.getPitch() * Math.PI) / 180);
    const shx = Math.sin(az), shy = -Math.cos(az) * Math.max(0.25, k);
    root.style.setProperty("--gm-sha", `${Math.atan2(shy, shx)}rad`); root.style.setProperty("--gm-shl", `${Math.round(18 * LK.shadow * Math.hypot(shx, shy) + 6)}px`);
    root.style.setProperty("--gm-shx", `${(shx * 6 * LK.shadow).toFixed(1)}px`); root.style.setProperty("--gm-shy", `${(shy * 6 * LK.shadow + 2).toFixed(1)}px`);
    // Near the horizon, far-away marks (Porto's pins seen from the Algarve) would stand in the sky: only what is within
    // reach of the view stands.
    const ctr = map.getCenter(), reach = map.getPitch() > 45 ? 12 * 2 ** (13 - z) + 8 : 1e9;
    const farOf = (x: number, y: number) => Math.hypot((x - ctr.lng) * 89, (y - ctr.lat) * 111) > reach;
    for (const m of h.pins()) m.el.classList.toggle("gm-far", farOf(m.p.lon, m.p.lat));
    // The horizon is cream into sky: a band of haze over the far edge, where the far sea and pins would show through the fog.
    // Its line: where the view ray is level (the vertical field of view and the pitch, from the padded centre).
    if (haze) { const fov = ((map.transform?.fov ?? 36.87) * Math.PI) / 180, pad = map.getPadding(), cy = (pad.top + H - pad.bottom) / 2;
      const y = cy - (H / 2 / Math.tan(fov / 2)) * Math.tan(Math.PI / 2 - (map.getPitch() * Math.PI) / 180);
      haze.style.top = `${Math.round(y - 14)}px`; haze.hidden = !(y > -40 && y < H * 0.6); }
    for (const x of marks) x.el.classList.toggle("gm-far", farOf(x.m.getLngLat().lng, x.m.getLngLat().lat));
    for (const x of marks) if (!x.w && x.el.style.display !== "none") { const l = x.el.querySelector<HTMLElement>(".gm-lab") ?? x.el; x.w = l.offsetWidth; x.h = l.offsetHeight; }
    // 1. The flags stand, all of them: clustered with a count only far out (under zoom 9), never hidden by a name.
    const flags = marks.filter((x) => x.kind === "flag" && !x.el.classList.contains("gm-far")), far = z < 9;
    const s0 = flagScale(z), lead = new Map<string, typeof flags>();
    for (const f of flags) { const g = far && f.grp ? f.grp : f.c!.id; lead.set(g, [...(lead.get(g) ?? []), f]); }
    const fbox: Box[] = [];
    for (const [, fs] of lead) fs.forEach((f, i) => {
      const p = map.project([f.c!.x, f.c!.y]), depth = map.getPitch() > 20 ? 0.86 + 0.14 * Math.min(1, Math.max(0, p.y / H)) : 1, s = +(s0 * depth).toFixed(3);
      f.el.style.display = i === 0 ? "" : "none"; (f as any).s = s; (f as any).p = p; f.el.style.setProperty("--s", String(s));
      const n = f.el.querySelector<HTMLElement>(".gm-n")!; n.textContent = fs.length > 1 ? nf.format(fs.length) : ""; f.el.classList.toggle("is-n", fs.length > 1);
      if (i === 0) fbox.push({ x: p.x - 6 * s, y: p.y - 76 * s, w: 36 * s, h: 78 * s });
    });
    // 2. The photo pins float on a long white stem that leans away from the nearest flag; a pin that would touch another
    //    stands taller. Their name and "Our pick" show at every zoom, kept inside the screen.
    const pins = h.pins().filter((m) => m.el.style.display !== "none" && !m.el.classList.contains("gm-far"));
    const tb = root.querySelector(".m3-top")?.getBoundingClientRect(), topBar = tb ? Math.max(58, tb.bottom - cv.top) : 58;
    const stem0 = wide ? 140 : 90, img = wide ? 76 : 64, pbox: Box[] = [];
    for (const m of [...pins].sort((a, b) => a.p.lon - b.p.lon)) {
      const p = map.project([m.p.lon, m.p.lat]); m.el.classList.add("gm-named");
      const nfl = flags.map((f) => (f as any).p).filter(Boolean).sort((a: any, b: any) => Math.hypot(a.x - p.x, a.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y))[0];
      let lean = nfl && Math.hypot(nfl.x - p.x, nfl.y - p.y) < 220 ? (p.x >= nfl.x ? 1 : -1) * (wide ? 34 : 22) : 0;
      const sp = m.el.querySelector<HTMLElement>(":scope > span"), sw = Math.max(sp?.offsetWidth ?? 120, 80) + 8, sh = (sp?.offsetHeight ?? 44) + 6, topMin = topBar + 6;
      // Taller or further aside until it touches no other pin or flag, and never under the top bar.
      const box = (st: number, ln: number): Box => ({ x: p.x + ln - Math.max(img, sw) / 2, y: p.y - st - img - sh, w: Math.max(img, sw), h: img + sh });
      const dir = lean >= 0 ? 1 : -1, tries: [number, number][] = [];
      for (const st of [stem0, stem0 + 52, stem0 - 30]) for (const ln of [lean, lean + dir * 90, lean - dir * 90, lean + dir * 180]) tries.push([st, ln]);
      let [stem, ln] = tries.find(([st, l]) => { const b = box(st, l); return b.y >= topMin && !hit(b, pbox) && !hit(b, fbox); }) ?? tries.reduce((a, t) => (box(t[0], t[1]).y > box(a[0], a[1]).y ? t : a));
      if (box(stem, ln).y < topMin) stem = Math.max(wide ? 40 : 26, stem - (topMin - box(stem, ln).y));
      lean = ln; const b = box(stem, lean);
      // The name is kept inside the screen (shifted, never cut); the box follows it. The stem is in the way of names too.
      const left = p.x + lean - sw / 2, nx = left < 8 ? 8 - left : left + sw > W - 8 ? W - 8 - (left + sw) : 0;
      pbox.push({ x: p.x + lean - img / 2 - 3, y: b.y + sh, w: img + 6, h: img }, { x: left + nx, y: b.y, w: sw, h: sh }, { x: Math.min(p.x, p.x + lean) - 4, y: p.y - stem, w: Math.abs(lean) + 8, h: stem });
      m.el.style.setProperty("--gm-stem", `${stem}px`); m.el.style.setProperty("--gm-lean", `${lean}px`); m.el.style.setProperty("--gm-nx", `${Math.round(nx)}px`);
      m.el.style.setProperty("--gm-slen", `${Math.round(Math.hypot(stem, lean))}px`); m.el.style.setProperty("--gm-srot", `${Math.atan2(lean, stem)}rad`);
    }
    if (!place) { hideClashing(); return; }
    // 0. The interface: the top bar, the 2027 line and an open card are never written under.
    const ui: Box[] = [];
    for (const el of root.querySelectorAll<HTMLElement>(".m3-top > *:not([hidden]), .gm-year, .m3-sheet.is-open, .m3-attr")) { const r = el.getBoundingClientRect(); if (r.width) ui.push({ x: r.left - cv.left - 6, y: r.top - cv.top - 6, w: r.width + 12, h: r.height + 12 }); }
    const placed: Box[] = [...ui, ...fbox, ...pbox];
    // Names keep a little air between them (8 px), not just no overlap.
    const air = (b: Box): Box => ({ x: b.x - 8, y: b.y - 8, w: b.w + 16, h: b.h + 16 });
    const free = (b: Box) => b.x > 4 && b.x + b.w < W - 4 && b.y > 4 && b.y + b.h < H - 4 && !hit(air(b), placed);
    // On land when it can be: a name over the deep sea reads less well.
    const onLand = (b: Box) => !map.getLayer("land") || [[b.x + 2, b.y + 2], [b.x + b.w - 2, b.y + 2], [b.x + 2, b.y + b.h - 2], [b.x + b.w - 2, b.y + b.h - 2], [b.x + b.w / 2, b.y + b.h / 2]]
      .every((pt) => map.queryRenderedFeatures(pt as [number, number], { layers: ["land"] }).length > 0);
    // Off the turf: a name never sits on a course (lit or not).
    const turf = ["gm-top", "gm-side", "golf"].filter((id) => map.getLayer(id));
    const offTurf = (b: Box) => !turf.length || !map.queryRenderedFeatures([[b.x, b.y], [b.x + b.w, b.y + b.h]], { layers: turf }).length;
    // 3. Details' courses first: every one named, beside its flag (top right, top left, right), stepping up a line if
    //    taken; close up each course, from afar a group's name for the group.
    const near = z >= 11.3, single = (f: typeof flags[0]) => !f.grp || flags.filter((g) => g.grp === f.grp).length < 2;
    for (const f of flags) {
      const lab = f.el.querySelector<HTMLElement>(".gm-lab")!, s = (f as any).s as number, p = (f as any).p;
      let ok = false;
      if ((near || single(f)) && f.el.style.display !== "none" && f.w) {
        const top = p.y - 76 * s, R = (x: number, y: number): Box => ({ x, y, w: f.w, h: f.h });
        const opts: Box[] = [];
        for (let k = 0; k < (wide ? 5 : 3); k++) opts.push(R(p.x + 4, top - f.h - 2 - k * (f.h + 4)), R(p.x - f.w - 4, top - f.h - 2 - k * (f.h + 4)), ...(k ? [] : [R(p.x + 30 * s, top + 2)]));
        // Zero collisions first: a name with no free place waits (its flag still stands, its card still opens).
        // With air first. The Els Club, the hero course (first in the data), is placed first and may stand closer (touching
        // nothing); every other name yields rather than crowd.
        const tight = (b: Box) => b.x > 4 && b.x + b.w < W - 4 && b.y > 4 && b.y + b.h < H - 4 && !hit(b, placed);
        const best = opts.find((b) => free(b) && offTurf(b) && onLand(b)) ?? opts.find((b) => free(b) && offTurf(b)) ?? opts.find(free) ?? (f === flags[0] ? opts.find((b) => tight(b) && offTurf(b)) ?? opts.find(tight) : undefined);
        if (best) { placed.push(best); ok = true; lab.style.translate = `${Math.round(best.x - p.x)}px ${Math.round(best.y - p.y)}px`; }
      }
      lab.classList.toggle("is-on", ok);
    }
    for (const g of marks.filter((x) => x.kind === "grp")) {
      const fs = flags.filter((f) => f.grp === g.grp && f.el.style.display !== "none"), ps = fs.map((f) => (f as any).p), s = Math.max(...fs.map((f) => (f as any).s), 0.44);
      let ok = false;
      if (!near && z >= 9 && ps.length && g.w) {
        const cx = ps.reduce((a, p) => a + p.x, 0) / ps.length, top = Math.min(...ps.map((p) => p.y)) - 80 * s, bot = Math.max(...ps.map((p) => p.y));
        const x0 = Math.min(...ps.map((p) => p.x)), x1 = Math.max(...ps.map((p) => p.x)), a = map.project(g.m.getLngLat());
        const opts = [{ x: cx - g.w / 2, y: top - g.h - 4 }, { x: x1 + 30 * s, y: top - g.h / 2 }, { x: x0 - g.w - 16 * s, y: top - g.h / 2 }, { x: cx - g.w / 2, y: bot + 10 }];
        for (const o of opts) { const b = { ...o, w: g.w, h: g.h }; if (free(b)) { ok = true; placed.push(b);
          g.el.style.setProperty("--gx", `${Math.round(b.x + g.w / 2 - a.x)}px`); g.el.style.setProperty("--gy", `${Math.round(b.y + g.h + 4 - a.y)}px`); break; } }
      }
      g.el.classList.toggle("is-on", ok);
    }
    // 4. The sourced captions (Falésia, the marina) above their point, on the land side; 5. the towns where free.
    for (const kind of ["cap", "town"]) for (const x of marks.filter((m) => m.kind === kind && !m.el.classList.contains("gm-far"))) {
      // A caption stands above its point on land (desktop), or below it on the sea side on a chip (phones, where the coast runs close).
      const p = map.project(x.m.getLngLat()), b = kind === "cap" ? { x: p.x - 6, y: wide ? p.y - x.h + 6 : p.y - 6, w: x.w, h: x.h } : { x: p.x - x.w / 2, y: p.y - x.h, w: x.w, h: x.h };
      const ok = z >= (kind === "cap" ? 10.4 : 9.2) && x.w > 0 && free(b) && (kind === "cap" && !wide ? true : offTurf(b));
      x.el.classList.toggle("is-on", ok); if (ok) placed.push(b);
    }
    mine = placed; hideClashing();
  }
  // Far out, the map's own place names stay; any that would touch a flag or a name above steps aside.
  function hideClashing() {
    if (!active) return; const cv = h.map()?.getCanvas().getBoundingClientRect(); if (!cv) return;
    root.querySelectorAll<HTMLElement>("[data-labels] span").forEach((s) => { const r = s.getBoundingClientRect(); s.style.visibility = hit({ x: r.left - cv.left, y: r.top - cv.top, w: r.width, h: r.height }, mine) ? "hidden" : ""; });
  }

  // ------------------------------------------------------------ the hole card (one tap on a flag)
  async function hole(c: Course) {
    const D = await data(); if (!D) return;
    h.ev({ event: "map/golf/flag", place: c.id, origin: root.dataset.mode });
    const nearDevs = h.projects.filter((p) => Math.hypot((p.lon - c.x) * 0.8, p.lat - c.y) < 0.12).sort((a, b) => Math.hypot(a.lon - c.x, a.lat - c.y) - Math.hypot(b.lon - c.x, b.lat - c.y));
    const ph = c.photo ? `<figure class="m3-ph gm-ph"><img class="m3-photo m3-hero-top" src="${esc(c.photo)}-800.webp" data-srcset="${esc(c.photo)}-800.webp 800w, ${esc(c.photo)}-1600.webp 1600w" sizes="(max-width: 819px) 100vw, 400px" alt="" width="800" height="450">${c.credit && cfg.p68 ? `<figcaption class="m3-cr">${esc(cfg.p68.credit.replace("{c}", c.credit))}</figcaption>` : ""}</figure>` : "";
    let x = `${ph}<div class="m3-sb m3-arr gm-card${ph ? "" : " gm-card-np"}"><p class="m3-kick">${esc(c.resort && c.resort !== c.n ? c.resort : "")}${c.resort && c.resort !== c.n ? " · " : ""}<span class="m3-tag">${esc(T("tag"))}</span></p>`;
    x += `<h2 class="m3-h gm-name" tabindex="-1">${esc(c.n)}</h2><p class="gm-one">${esc([c.holes ? T("holes", { n: c.holes }) : "", c.arch].filter(Boolean).join(" · "))}</p>`;
    // A development named after the course (Springs at The Els Club) stands beside it: its pin is only approximate, so no
    // minutes from it, just where it is.
    const beside = c.near && c.near.name.toLowerCase().includes(c.short.toLowerCase());
    if (c.near && beside) x += `<p class="gm-num gm-next"><small>${esc(T("next", { name: c.near.name }))}</small></p>`;
    else if (c.near) x += `<p class="gm-num"><b>${nf.format(c.near.min)}</b><span>min</span><small>${esc(T("near", { name: c.near.name }))}</small></p>`;
    x += `<p class="m3-quiet gm-links">${c.url ? `<a class="m3-link" href="${esc(c.url)}" target="_blank" rel="noopener" data-gm-site>${esc(T("site"))} ↗</a>` : ""}${nearDevs.length ? `<button type="button" class="m3-link" data-gm-homes>${esc(T("homes"))} · ${nf.format(nearDevs.length)}</button>` : ""}</p>`;
    const dt = (() => { try { return new Intl.DateTimeFormat(root.dataset.locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${D.checked}T12:00:00`)); } catch { return D.checked; } })();
    x += `<p class="m3-src">${c.src.map((s) => `<a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(s.t)}</a>`).join(" · ")}${c.near && !beside ? ` · ${esc(T("src.drive", { d: dt }))}` : ""} · ${esc(T("src.outline"))}</p></div>`;
    h.openSheet(x, true, true);
    h.sheetIn.querySelector("[data-gm-site]")?.addEventListener("click", () => h.ev({ event: "map/golf/site", place: c.id, origin: root.dataset.mode }));
    h.sheetIn.querySelector("[data-gm-homes]")?.addEventListener("click", () => {
      h.ev({ event: "map/golf/homes", place: c.id, origin: root.dataset.mode });
      const map = h.map(), ml = h.ml(); if (map && ml && nearDevs.length > 1) { const b = new ml.LngLatBounds(); b.extend([c.x, c.y]); nearDevs.forEach((p) => b.extend([p.lon, p.lat])); map.fitBounds(b, { padding: pad(), maxZoom: 13.4, pitch: map.getPitch(), bearing: map.getBearing(), duration: h.reduce() ? 0 : 900 }); }
      h.showProject(nearDevs[0]);
    });
    const map = h.map(); if (map) map.easeTo({ center: [c.x, c.y], zoom: Math.max(map.getZoom(), 13.1), pitch: Math.max(map.getPitch(), 58), padding: pad(), duration: h.reduce() ? 0 : 1100, essential: true });
  }
  // Phone: the course sits in the top 40% of the screen, clear of the card.
  const pad = () => (h.isWide() ? { right: 440, left: h.padL(), top: h.padTop(120), bottom: 80 } : phonePad());
  // Phone: the course just above the card, with room over it for a pin (stem, photo, name) below the controls.
  const phonePad = () => { const cv = h.map()?.getCanvas().getBoundingClientRect(), t = root.querySelector(".m3-top")?.getBoundingClientRect(), H = cv?.height ?? root.clientHeight;
    return { bottom: Math.round(H * 0.6), top: Math.round((t && cv ? t.bottom - cv.top : 56) + 200), left: 0, right: 0 }; };

  // ------------------------------------------------------------ "From your door" on every development card
  // The nearest course, beach and marina by car (OSRM, offline); in golf mode the first tee comes first.
  function doorHTML(rows: Door[] | undefined) {
    if (!rows?.length) return "";
    const order = active ? ["course", "beach", "marina"] : ["beach", "marina", "course"];
    const li = [...rows].sort((a, b) => order.indexOf(a.k) - order.indexOf(b.k)).map((r) => `<li><span class="m3-mn">${esc(r.k === "course" && r.tee ? T("door.tee", { name: r.n }) : r.n)}</span><span class="m3-mm"><b>${nf.format(r.min)}</b> min</span></li>`).join("");
    return `<p class="m3-tt gm-door-h">${esc(T("door.h"))}<small>${esc(T("door.car"))}</small></p><ul class="m3-ml">${li}</ul>`;
  }
  const door = (p: any) => (G.door ? `<div class="gm-door" data-gm-door="${esc(p.id)}"></div>` : "");
  function fill(el: HTMLElement) {
    const slots = el.querySelectorAll<HTMLElement>("[data-gm-door]"); if (!slots.length) return;
    data().then((D) => slots.forEach((s) => { const x = doorHTML(D?.door?.[s.dataset.gmDoor!]); s.innerHTML = x; s.hidden = !x; }));
  }

  // ------------------------------------------------------------ hooks for map-v3.ts
  return {
    on: () => active,
    set,
    door, fill,
    // A tap on a lit course (its raised outline) opens its hole card, before the map's own click (the place card).
    click(pt: { x: number; y: number }) {
      const map = h.map(); if (!active || !map?.getLayer("gm-top")) return false;
      const f = map.queryRenderedFeatures([[pt.x - 3, pt.y - 3], [pt.x + 3, pt.y + 3]], { layers: ["gm-top", "gm-side"] })[0]; if (!f) return false;
      data().then((D) => { const c = D?.courses.find((x) => x.id === f.properties.id); if (c) hole(c); }); return true;
    },
    // The map was built (again): golf mode comes back if the reader had it on.
    attach() { if (want && !active) set(true); },
    // The map is being removed (leaving the page, a lost context): what golf mode added goes with it; the wish stays.
    detach() {
      if (!active) return; active = false; clearInterval(glintT); cancelAnimationFrame(raf); raf = 0; mo?.disconnect(); mo = null;
      marks.forEach((x) => x.m.remove()); marks = []; year?.remove(); year = null; haze?.remove(); haze = null; ids.layers = []; ids.sources = []; ids.images = []; saved = null;
    },
  };
}
