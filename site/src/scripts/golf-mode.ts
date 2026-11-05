// Golf mode (prompt 78, 4 Nov 2026; review 78b, 5 Nov): the map in Algarve summer, in 3D, with Details' courses lit and
// their flags standing. One tap on "Golf" and the camera glides (about 1.2 s) to Vilamoura seen from the sea, or, when a
// card is open, frames that card's place; reduced motion jumps. Everything here is added on top of map v3 and taken away
// on the way out: the paint of the base layers is recorded before it changes and put back exactly, every layer, source,
// image and marker this file adds is removed. map-v3.ts only calls createGolf() and a few hooks (attach, detach, click,
// door, fill). Data: /data/map/golf-mode.json (scripts/map-data/golf_mode.py: Details' verified courses with their first
// tee and OpenStreetMap outline, the OSRM drive times to every development, the sourced captions). Wording: COPY_DECK.md
// "p78.*". The look is "Noon", the operator's pick (D106).

type Dev = { id: string; name: string; min: number };
type Course = { id: string; n: string; short: string; resort: string; grp: string; holes: number | null; arch: string; x: number; y: number; tee: string; url: string;
  photo: string; credit: string; note: string; src: { t: string; u: string }[]; near: Dev | null; devs: Dev[]; outline: any };
type Door = { k: "course" | "beach" | "marina"; n: string; id: string; min: number; tee: boolean };
type Data = { checked: string; glints?: number[][]; courses: Course[]; door: Record<string, Door[]>; towns: [string, number, number][]; caps: { id: string; n: string; x: number; y: number; cap: Record<string, string>; src: { t: string; u: string } }[]; gids: number[] };
type Mark = { m: any; el: HTMLElement; kind: string; c?: Course; grp?: string; cs?: Course[]; w: number; h: number; s?: number; p?: { x: number; y: number }; side?: string };
export type GolfHost = {
  root: HTMLElement; cfg: any; q: URLSearchParams; reduce: () => boolean; isFlat: () => boolean; quality: () => number;
  load: () => Promise<void>; map: () => any; ml: () => any; sheetIn: HTMLElement; projects: any[];
  openSheet: (h: string, focus: boolean, arr?: boolean) => void; showProject: (p: any) => void; ev: (e: any) => void; esc: (s: string) => string;
  isWide: () => boolean; padL: () => number; padTop: (b: number) => number; governor: () => void; sky: () => any;
  pins: () => { p: any; el: HTMLElement; m: any }[]; golfOverlay: () => boolean; setGolfOverlay: (on: boolean) => Promise<void>; stopAll: () => void;
  subject: () => { kind: string; lon?: number; lat?: number; zoom?: number } | null; closeCard: () => void; forget: () => void;
};

// The light: one sun for the whole scene, from the south-west as on the hillshade (225°), so every shadow falls to the
// north-east. The sea, from coast distance in: one ramp from the shore outwards (#8FE3DC, #3FB7CF, #1F93C4) over the
// Atlantic blue (#1670A8); further out the depth tiles draw it (they alone know the sea from Spain's land).
const LK = { sky: { "sky-color": "#4fa9dc", "horizon-color": "#e6f3f7", "fog-color": "#f3ead9", "sky-horizon-blend": 0.6, "horizon-fog-blend": 0.35, "fog-ground-blend": 0.85, "atmosphere-blend": 0 },
  land: "#f4ead4", hill: ["rgba(255,248,234,0.55)", "rgba(217,195,160,0.6)", 0.3, 225] as [string, string, number, number], sea: ["#8fe3dc", "#3fb7cf", "#1f93c4", "#1670a8"],
  sand: "#f7e7c0", ochre: "#e2a95a", turf: ["#4fb265", "#5cbf72"], side: "#2f8f4a", glow: "#fff4d0", other: "#a9d98f", sun: 225, shadow: 1 };
// The flag: a 2 px white pole with a shade on the right, a 26 × 15 #FFCB47 cloth with a fold, a dark cup (viewBox units).
const FLAG = (s: number) => `<svg class="gm-f-svg" viewBox="0 0 64 80" width="64" height="80" aria-hidden="true">
  <ellipse cx="32" cy="76.5" rx="6" ry="2.4" fill="#1d2a24"/><ellipse cx="32" cy="76.1" rx="3.9" ry="1.3" fill="#0d1612"/>
  <path d="M32 76.2V7" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M33.1 75V8" stroke="rgba(0,0,0,.18)" stroke-width="1"/>
  <circle cx="32" cy="6.2" r="2" fill="#fff"/>
  <g class="gm-wave" style="animation-delay:${-s * 1.7}s"><path d="M33 7.6c6-1.3 12.2 2 18.8 3.4 2.9.6 5.8.7 8.4.2-2 2.5-2.1 5.8-.3 8.8-7.3 1.4-13.8-2-20.1-3.4-2.4-.5-4.8-.5-6.8 0z" fill="#ffcb47"/>
  <path d="M46 9.9c-.4 2.4-.3 5 .4 7.6" stroke="#e9ae22" stroke-width="1" fill="none"/></g></svg>`;
const ICON = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 20.5V3.6"/><path d="M8.6 4c2.6-.5 5.4 1.3 9.4 1.2-1.2 1.4-1.2 3 0 4.4-4 .2-6.8-1.6-9.4-1.1z" fill="currentColor" stroke="none"/><ellipse cx="8" cy="20.6" rx="3.6" ry="1"/></svg>`;
const RESET = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4 4.5v3.7h3.7"/></svg>`;

export function createGolf(h: GolfHost) {
  const { root, cfg, esc } = h, G = cfg.p78 ?? {}, lang = cfg.lang;
  const btn = root.querySelector<HTMLButtonElement>("[data-golf]");
  if (btn && !btn.querySelector("svg")) btn.insertAdjacentHTML("afterbegin", ICON);
  let want = h.q.get("mode") === "golf", active = false, busy: Promise<void> | null = null;
  let dataP: Promise<Data | null> | null = null;
  const data = () => (dataP ??= fetch("/data/map/golf-mode.json").then((r) => (r.ok ? r.json() : null)).catch(() => null));
  const nf = new Intl.NumberFormat(root.dataset.locale || "en");
  const T = (k: string, v: Record<string, string | number> = {}) => String(G[k] ?? "").replace(/\{(\w+)\}/g, (m, x) => (x in v ? String(v[x]) : m));
  // The home whose card is open (its door's minutes show on every flag), and the course whose card is open.
  let home: string | null = null, course: string | null = h.q.get("course");

  // ------------------------------------------------------------ what golf mode changes, and how it is put back
  let saved: { cam: any; terrain: any; sky: any; overlay: boolean; paint: [string, string, any][]; filt: [string, any][]; maxZoom: number } | null = null;
  const ids = { layers: [] as string[], sources: [] as string[], images: [] as string[] };
  let marks: Mark[] = [];
  let haze: HTMLElement | null = null, year: HTMLElement | null = null, reset: HTMLElement | null = null, resetT = 0, glintT = 0, raf = 0, raf2 = 0, mo: MutationObserver | null = null;
  function paint(map: any, id: string, prop: string, v: any) {
    if (!map.getLayer(id)) return;
    if (!saved!.paint.some(([a, b]) => a === id && b === prop)) saved!.paint.push([id, prop, map.getPaintProperty(id, prop)]);
    map.setPaintProperty(id, prop, v);
  }
  function filt(map: any, id: string, f: any) { if (!map.getLayer(id)) return; if (!saved!.filt.some(([a]) => a === id)) saved!.filt.push([id, map.getFilter(id)]); map.setFilter(id, f); }
  const addLayer = (map: any, l: any, before?: string) => { map.addLayer(l, before && map.getLayer(before) ? before : undefined); ids.layers.push(l.id); };
  const addSource = (map: any, id: string, s: any) => { map.addSource(id, s); ids.sources.push(id); };
  // The interface golf mode quiets: the region postcards (out of the tab order too), the Layers golf chip and tour.
  const quiet = () => root.querySelectorAll<HTMLElement>("[data-postcards], [data-overlay='golf'], [data-tour='golf']");

  // The mown bands: 12 px wide, two greens 4% apart, at 45° (world-aligned, so they never swim).
  function stripes(map: any) {
    const id = "gm-stripe"; if (map.hasImage(id)) return id;
    const n = 48, c = document.createElement("canvas"); c.width = c.height = n; const g = c.getContext("2d")!;
    g.fillStyle = LK.turf[0]; g.fillRect(0, 0, n, n); g.fillStyle = LK.turf[1];
    for (let k = -n; k < n * 2; k += 24) { g.beginPath(); g.moveTo(k, 0); g.lineTo(k + 12, 0); g.lineTo(k + 12 - n, n); g.lineTo(k - n, n); g.closePath(); g.fill(); }
    map.addImage(id, g.getImageData(0, 0, n, n), { pixelRatio: 1 }); ids.images.push(id); return id;
  }

  // ------------------------------------------------------------ on
  async function enter() {
    await h.load(); const map = h.map(), ml = h.ml(); if (!map) return;
    const D = await data(); if (!D || !want || active) return;
    h.stopAll();
    const subj = h.subject();
    // A region or parish card describes somewhere golf mode does not frame: it closes (never a card about elsewhere).
    if (subj?.kind === "other" && !h.sheetIn.querySelector(".gm-card")) h.closeCard();
    const c = map.getCenter();
    saved = { cam: { center: [c.lng, c.lat], zoom: map.getZoom(), pitch: map.getPitch(), bearing: map.getBearing(), padding: map.getPadding() }, terrain: map.getTerrain?.() ?? null, sky: h.sky(), overlay: h.golfOverlay(), paint: [], filt: [], maxZoom: map.getMaxZoom() };
    active = true; root.classList.add("is-golf"); btn?.setAttribute("aria-pressed", "true");
    quiet().forEach((el) => (el.inert = true));
    if (!saved.overlay) await h.setGolfOverlay(true);
    if (!active) return;
    // The land, the relief, the coast: Algarve summer (golf mode only).
    paint(map, "land", "fill-color", LK.land);
    // The sea: our depth tiles (the only data that tells the sea from Spain's land, so the land never ends in a ruled
    // edge) turned Atlantic blue with their depth steps flattened; the shore ramp is drawn over them.
    paint(map, "bg", "background-color", LK.land);
    for (const id of ["sea", "seafar"]) { paint(map, id, "raster-hue-rotate", 12); paint(map, id, "raster-saturation", 0.97); paint(map, id, "raster-contrast", -0.8); paint(map, id, "raster-brightness-min", 0.03); paint(map, id, "raster-brightness-max", 0.64); }
    paint(map, "hill", "hillshade-highlight-color", LK.hill[0]); paint(map, "hill", "hillshade-shadow-color", LK.hill[1]); paint(map, "hill", "hillshade-exaggeration", LK.hill[2]); paint(map, "hill", "hillshade-illumination-direction", LK.hill[3]);
    paint(map, "hill", "hillshade-accent-color", "rgba(0,0,0,0)");
    paint(map, "muni-line", "line-opacity", 0); paint(map, "region-line", "line-opacity", 0); paint(map, "reach", "line-opacity", 0); paint(map, "rivers", "line-color", "#7fd3d6");
    paint(map, "sel", "line-color", "rgba(29,106,69,.45)"); paint(map, "sel", "line-width", 1.4);
    // The beach, a band of sand, and a fine ochre line where land meets sea.
    paint(map, "coast-glow", "line-color", LK.sand); paint(map, "coast-glow", "line-opacity", 1); paint(map, "coast-glow", "line-blur", 1);
    paint(map, "coast-glow", "line-width", ["interpolate", ["exponential", 1.6], ["zoom"], 7, 1.5, 10, 3, 12.5, 6]);
    paint(map, "coast", "line-color", LK.ochre); paint(map, "coast", "line-width", ["interpolate", ["linear"], ["zoom"], 7, 0.4, 12, 1]); paint(map, "coast", "line-opacity", 0.7);
    // The shore ramp: round joins and caps and a wide blur, so no facet or wedge shows.
    if (map.getSource("coast")) [[2, 420, 380], [1, 170, 140], [0, 56, 40]].forEach(([c, w, b]) => {
      const zw = (v: number) => ["interpolate", ["exponential", 1.5], ["zoom"], 7, v / 24, 10, v / 2.6, 13, v];
      addLayer(map, { id: `gm-sea${c}`, type: "line", source: "coast", layout: { "line-join": "round", "line-cap": "round" }, paint: { "line-color": LK.sea[c], "line-opacity": 1, "line-width": zw(w), "line-blur": zw(b) } }, "land");
    });
    // Every other course: a lighter green, so the golf map is complete; Details' courses are drawn raised and lit.
    const gids = D.gids ?? [];
    paint(map, "golf", "fill-color", LK.other); paint(map, "golf", "fill-opacity", ["interpolate", ["linear"], ["zoom"], 8.5, 0, 9.4, 0.8]);
    filt(map, "golf", ["!", ["in", ["get", "c"], ["literal", gids]]]);
    filt(map, "golfpt-o", ["all", ["get", "o"], ["!", ["in", ["get", "c"], ["literal", gids]]]]);
    filt(map, "golfpt", ["all", ["!", ["get", "o"]], ["!", ["in", ["get", "c"], ["literal", gids]]]]);
    for (const id of ["golfpt", "golfpt-o"]) { paint(map, id, "circle-color", ["case", ["get", "soon"], "#ffffff", "#79ad6c"]); paint(map, id, "circle-stroke-color", "#ffffff"); paint(map, id, "circle-pitch-scale", "viewport");
      paint(map, id, "circle-radius", ["interpolate", ["linear"], ["zoom"], 6, 2, 9, 3.2, 12, 5]); paint(map, id, "circle-stroke-width", 1.2); }
    addSource(map, "gm-c", { type: "geojson", data: { type: "FeatureCollection", features: D.courses.filter((x) => x.outline).map((x) => ({ type: "Feature", properties: { id: x.id }, geometry: x.outline })) } });
    addLayer(map, { id: "gm-glow", type: "line", source: "gm-c", minzoom: 8.4, paint: { "line-color": LK.glow, "line-opacity": ["interpolate", ["linear"], ["zoom"], 8.4, 0, 9.4, 0.45], "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 9, 2, 12, 6, 14, 10], "line-blur": 4 } });
    // The open course's outline, lit a little brighter.
    addLayer(map, { id: "gm-selected", type: "line", source: "gm-c", minzoom: 8.4, filter: ["==", ["get", "id"], course ?? ""], paint: { "line-color": "#ffffff", "line-width": ["interpolate", ["linear"], ["zoom"], 9, 2, 13, 4], "line-blur": 1.5, "line-opacity": 0.95 } });
    // The turf: 7 m, its sides a deeper green, its top mown in bands (a side slab and a thin banded top, so the sides keep
    // their own colour; MapLibre would band the walls too).
    const hgt = (k: number) => ["interpolate", ["linear"], ["zoom"], 9, 40 * k, 11, 16 * k, 13, 7 * k];
    addLayer(map, { id: "gm-side", type: "fill-extrusion", source: "gm-c", minzoom: 8.4, paint: { "fill-extrusion-color": LK.side, "fill-extrusion-height": hgt(0.96), "fill-extrusion-base": 0, "fill-extrusion-vertical-gradient": false, "fill-extrusion-opacity": 1 } as any });
    addLayer(map, { id: "gm-top", type: "fill-extrusion", source: "gm-c", minzoom: 8.4, paint: { "fill-extrusion-pattern": stripes(map), "fill-extrusion-height": hgt(1), "fill-extrusion-base": hgt(0.96), "fill-extrusion-vertical-gradient": false, "fill-extrusion-opacity": 1 } as any });
    // Fine glints on the water (small crisp specks, not blurs). Decoration: they hold still under reduced motion and on phones.
    if (D.glints?.length) {
      for (const k of [0, 1]) {
        addSource(map, `gm-g${k}`, { type: "geojson", data: { type: "FeatureCollection", features: D.glints.filter((_: any, i: number) => i % 2 === k).map(([x, y, r]: number[]) => ({ type: "Feature", properties: { r }, geometry: { type: "Point", coordinates: [x, y] } })) } });
        addLayer(map, { id: `gm-g${k}`, type: "circle", source: `gm-g${k}`, minzoom: 10, paint: { "circle-color": "#ffffff", "circle-blur": 0.15, "circle-pitch-alignment": "map",
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 10, ["*", 0.5, ["get", "r"]], 13, ["*", 1.3, ["get", "r"]]], "circle-opacity": k ? 0.15 : 0.5, "circle-opacity-transition": { duration: 2600, delay: 0 } } as any }, "land");
      }
      if (!h.reduce() && matchMedia("(pointer: fine)").matches) { let on = 0; glintT = window.setInterval(() => { if (document.hidden || !active || h.quality() > 0) return; on ^= 1; map.setPaintProperty("gm-g0", "circle-opacity", on ? 0.15 : 0.5); map.setPaintProperty("gm-g1", "circle-opacity", on ? 0.5 : 0.15); }, 2800); }
    }
    // Closer than the normal map goes (12.5): a course reads as turf from about 13.
    map.setMaxZoom(16); (saved as any).maxPitch = map.getMaxPitch(); map.setMaxPitch(77);
    if (map.transform) { (saved as any).fov = map.transform.fov; map.transform.fov = golfFov(); map.triggerRepaint(); }
    if (!saved.terrain && h.quality() === 0) map.setTerrain({ source: "dem", exaggeration: 1.5 });
    try { map.setSky(LK.sky); } catch { /* no sky in this style */ }
    for (const m of h.pins()) m.m.setOpacity?.("1", "1");
    haze = document.createElement("div"); haze.className = "gm-haze"; haze.setAttribute("aria-hidden", "true"); map.getCanvas().after(haze);
    drawMarks(map, ml, D);
    drawYear(); drawReset();
    map.on("move", layoutSoon); map.on("moveend", placeSoon); map.on("resize", placeSoon); map.on("styledata", layoutSoon); map.on("zoom", tilt);
    mo = new MutationObserver((ms) => { if (ms.some((m) => m.type === "attributes")) { sheetChanged(); placeSoon(); } else hideClashing(); });
    const lab = root.querySelector("[data-labels]"); if (lab) mo.observe(lab, { childList: true });
    const sh = root.querySelector("[data-sheet]"); if (sh) mo.observe(sh, { attributes: true, attributeFilter: ["class", "hidden", "data-detent"] });
    setUrl(true); h.ev({ event: "map/golf/on", origin: root.dataset.mode });
    // The open card owns the place: golf mode frames it (UX-02, UX-03); a ?course= link opens its course.
    const subj2 = h.subject(), cc = course ? D.courses.find((x) => x.id === course) : null;
    if (cc) { hole(cc, false); root.classList.add("gm-ready"); }
    else if (subj2?.lon != null) frame(map, { center: [subj2.lon, subj2.lat!], zoom: subj2.zoom ?? 12.5, pitch: pitchFor(subj2.zoom ?? 12.5), bearing: -10 });
    else glide(map);
    window.setTimeout(() => { if (active) { root.classList.add("gm-ready"); layoutSoon(); } }, 2600);  // whatever cut the glide short
    layout(true); h.governor();
    fill(h.sheetIn);
  }
  // The arrival: Vilamoura from the sea, looking north, the horizon about 20% down the map with the summer sky above it.
  // A natural lens (45°, not a wide angle) and the camera a little lower (pitch 76: maxPitch is raised in golf mode only).
  const HERO = { desk: { center: [-8.1255, 37.0965], zoom: 13.6, pitch: 76, bearing: -10 }, phone: { center: [-8.1255, 37.0985], zoom: 12.85, pitch: 76, bearing: -10 } };
  // /arrow: the coast from Palmares to Vilamoura, the three developments and every Algarve flag in view, with some sky.
  const COAST = { desk: { center: [-8.43, 37.06], zoom: 10.15, pitch: 72, bearing: 72 }, phone: { center: [-8.4, 37.1], zoom: 9.0, pitch: 66, bearing: 68 } };
  function heroCam(map: any) {
    const wide = h.isWide(), base = h.q.has("pins") ? (wide ? COAST.desk : COAST.phone) : wide ? HERO.desk : HERO.phone;
    return { ...base, padding: { top: 0, bottom: 0, left: 0, right: 0 } };
  }
  // The summer sky: the horizon sits at y = H/2 − (H/2)·cot(pitch)/tan(fov/2); at 45° and pitch 76 that is 20% down.
  // (Padding cannot lower it: MapLibre draws the sky from the unpadded centre, which leaves a blank band.)
  const golfFov = () => 45;
  function frame(map: any, to: any) {
    if (h.reduce()) { map.jumpTo(to); root.classList.add("gm-ready"); return; }
    // The reader may take over at any moment; anything else that cuts the glide short (the fps governor dropping the
    // terrain mid-flight) is finished with a short ease, so golf mode always arrives.
    let took = false; const cv = map.getCanvasContainer(), mine = () => { took = true; };
    ["pointerdown", "wheel", "touchstart"].forEach((e) => cv.addEventListener(e, mine, { once: true, passive: true }));
    map.flyTo({ ...to, duration: Math.abs(map.getZoom() - to.zoom) > 3 ? 1600 : 1200, curve: 1.2, easing: (t: number) => 1 - Math.pow(1 - t, 3), essential: true });
    map.once("moveend", () => {
      root.classList.add("gm-ready"); layoutSoon();
      ["pointerdown", "wheel", "touchstart"].forEach((e) => cv.removeEventListener(e, mine));
      if (!took && active && (Math.abs(map.getZoom() - to.zoom) > 0.05 || Math.abs(map.getPitch() - to.pitch) > 1)) map.easeTo({ ...to, duration: 500, essential: true });
    });
  }
  const glide = (map: any) => frame(map, heroCam(map));
  // The tilt follows the zoom: 76° at the arrival (the sky in view), easing to 55° from z15 so near turf never stretches,
  // and to about 68° pulled back to the whole Algarve (still a horizon, never the edge of the data).
  const pitchFor = (z: number) => (z >= 15 ? 55 : z >= 13.8 ? 76 - ((z - 13.8) / 1.2) * 21 : z >= 10 ? 68 + ((z - 10) / 3.8) * 8 : 68);
  let lastZ = 0;
  function tilt(e: any) {
    const map = h.map(); if (!active || !map) return; const z = map.getZoom(), dz = z - lastZ; lastZ = z;
    if (map.isEasing?.()) return;  // only the reader's own zoom tilts; the glides set their own pitch
    const t = pitchFor(z), p = map.getPitch();
    if ((p > t + 0.5 && dz > 0 && z >= 13.8) || (p > t + 0.5 && dz < 0)) map.setPitch(t); else if (p < t - 0.5 && dz !== 0) map.setPitch(Math.min(t, p + Math.max(1, Math.abs(dz) * 18)));
  }

  // ------------------------------------------------------------ off: back exactly to the normal map
  async function leave() {
    const map = h.map(); if (!active || !saved) return;
    const subj = h.subject(), onCourse = !!h.sheetIn.querySelector(".gm-card");
    if (onCourse) h.closeCard();  // a course card belongs to golf mode
    active = false; clearInterval(glintT); cancelAnimationFrame(raf); raf = 0; cancelAnimationFrame(raf2); raf2 = 0; mo?.disconnect(); mo = null;
    marks.forEach((x) => x.m.remove()); marks = []; year?.remove(); year = null; haze?.remove(); haze = null; reset?.remove(); reset = null;
    root.querySelectorAll(".m3-pin.gm-named, .m3-pin.gm-far").forEach((e) => e.classList.remove("gm-named", "gm-far", "gm-unnamed"));
    for (const m of h.pins()) { const full = (m as any).full, tn = m.el.querySelector(":scope > span")?.firstChild; if (full && tn) tn.textContent = full; }
    for (const m of h.pins()) m.m.setOpacity?.();
    root.querySelectorAll<HTMLElement>("[data-labels] span").forEach((s) => (s.style.visibility = ""));
    quiet().forEach((el) => (el.inert = false));
    if (map) {
      map.off("move", layoutSoon); map.off("moveend", placeSoon); map.off("resize", placeSoon); map.off("styledata", layoutSoon); map.off("zoom", tilt);
      for (const id of [...ids.layers].reverse()) if (map.getLayer(id)) map.removeLayer(id);
      for (const id of ids.sources) if (map.getSource(id)) map.removeSource(id);
      for (const id of ids.images) if (map.hasImage(id)) map.removeImage(id);
      for (const [id, prop, v] of [...saved.paint].reverse()) if (map.getLayer(id)) map.setPaintProperty(id, prop, v);
      for (const [id, f] of saved.filt) if (map.getLayer(id)) map.setFilter(id, f);
      map.setTerrain(h.quality() > 0 ? null : saved.terrain);  // the fps governor's call stands
      if (map.transform && (saved as any).fov) { map.transform.fov = (saved as any).fov; map.triggerRepaint(); }
      try { map.setSky(saved.sky); } catch { /* no sky */ }
      const mz = saved.maxZoom;
      // A card still open (a development, a place) keeps its place: only the tilt returns. Otherwise the camera goes back.
      const to = subj?.lon != null && !onCourse ? { center: map.getCenter(), zoom: Math.min(map.getZoom(), mz), pitch: Math.min(saved.cam.pitch, (saved as any).maxPitch ?? 72), bearing: saved.cam.bearing, padding: saved.cam.padding } : saved.cam;
      map.easeTo({ ...to, duration: h.reduce() ? 0 : 1000, essential: true });
      const mp = (saved as any).maxPitch ?? 72;
      if (h.reduce()) { map.setMaxZoom(mz); map.setMaxPitch(mp); } else map.once("moveend", () => { if (!active) { map.setMaxZoom(mz); map.setMaxPitch(mp); } });
    }
    ids.layers = []; ids.sources = []; ids.images = [];
    if (!saved.overlay) {
      await h.setGolfOverlay(false);
      // The golf layer golf mode switched on goes too (map-v3 draws it again the next time the reader asks for it).
      const m2 = h.map(); if (m2) { for (const id of ["golfpt-o", "golfpt", "golf"]) if (m2.getLayer(id)) m2.removeLayer(id); for (const id of ["golfpt", "golf"]) if (m2.getSource(id)) m2.removeSource(id); }
    }
    saved = null; home = null; clearTimeout(resetT); resetT = 0; root.classList.remove("is-golf", "gm-near", "gm-ready", "gm-clustered"); btn?.setAttribute("aria-pressed", "false");
    setUrl(false); h.ev({ event: "map/golf/off", origin: root.dataset.mode });
    fill(h.sheetIn);
  }
  function setUrl(on: boolean) { const u = new URL(location.href); on ? u.searchParams.set("mode", "golf") : (u.searchParams.delete("mode"), u.searchParams.delete("course")); if (on) u.searchParams.delete("golf"); history.replaceState(history.state, "", `${u.pathname}${u.search}${u.hash}`); }
  async function set(on: boolean) {
    want = on; btn?.setAttribute("aria-pressed", String(on));  // the switch answers at once (UI-19); the map follows
    await busy; busy = (on ? enter() : leave()).catch((e) => console.error("golf mode", e)); await busy; busy = null;
  }
  btn?.addEventListener("click", () => set(!want));

  // ------------------------------------------------------------ flags, photo pins, names
  function drawMarks(map: any, ml: any, D: Data) {
    const mk = (el: HTMLElement, x: number, y: number, kind: string, extra: Partial<Mark> = {}) => {
      // Upright and always whole: MapLibre would dim a marker it thinks the relief hides (opacityWhenCovered).
      const sea = kind === "cap" && !h.isWide(), m = new ml.Marker({ element: el, anchor: kind === "cap" ? (sea ? "top-left" : "bottom-left") : "bottom", offset: kind === "cap" ? [-6, sea ? -6 : 6] : [0, 0], opacityWhenCovered: "1" }).setLngLat([x, y]).addTo(map);
      // MapLibre names every marker "Map marker"; a flag is not itself a control (its hit area and name are), the rest is decoration.
      el.setAttribute("aria-hidden", kind === "flag" ? "false" : "true"); el.removeAttribute("aria-label"); if (kind === "flag") el.removeAttribute("role");
      marks.push({ m, el, kind, w: 0, h: 0, ...extra });
    };
    D.courses.forEach((c, i) => {
      const el = document.createElement("div"); el.className = "gm-flag";
      const label = [c.n, c.holes ? T("holes", { n: c.holes }) : "", c.arch].filter(Boolean).join(", ");
      // The tap area is the pole and the cloth only (its size set each frame, never over another flag); the name is a
      // second way in. Both open this course and nothing else.
      el.innerHTML = `<span class="gm-f"><i class="gm-sh" aria-hidden="true"></i>${FLAG(i)}<b class="gm-n" aria-hidden="true"></b><b class="gm-min" aria-hidden="true"></b></span>
        <button type="button" class="gm-hit" aria-label="${esc(label)}"></button>
        <button type="button" class="gm-lab" tabindex="-1" aria-hidden="true"><em>${esc(c.short)}</em><small>${esc([c.holes ? T("holes", { n: c.holes }) : "", c.arch.split(",")[0]].filter(Boolean).join(" · "))}</small></button>`;
      el.querySelectorAll("button").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); const m = marks.find((x) => x.el === el)!; if (m.cs && m.cs.length > 1) zoomTo(m.cs); else hole(c); }));
      mk(el, c.x, c.y, "flag", { c, grp: c.grp });
    });
    // A group (Vilamoura's five) is named once from afar, and its name zooms in to it.
    const groups = new Map<string, Course[]>(); for (const c of D.courses) if (c.grp) groups.set(c.grp, [...(groups.get(c.grp) ?? []), c]);
    for (const [g, cs] of groups) {
      if (cs.length < 2) continue;
      const town = D.towns.find((t) => t[0].toLowerCase() === g.toLowerCase());
      const el = document.createElement("button"); el.type = "button"; el.className = "gm-grp";
      // Vilamoura's name also says, quietly, how many Details courses the Algarve holds (Details' own releases, facts.csv).
      const alg = D.courses.filter((x) => x.y < 37.45 && x.x > -9.05).length, extra = g === "vilamoura" && alg > cs.length ? ` · ${T("algarve", { n: alg })}` : "";
      el.innerHTML = `<em>${esc(town?.[0] ?? cs[0].resort ?? g)}</em><small>${esc(T("courses", { n: cs.length }))}${esc(extra)}</small>`;
      el.addEventListener("click", (e) => { e.stopPropagation(); zoomTo(cs); });
      const x = cs.reduce((a, c) => a + c.x, 0) / cs.length, y = Math.max(...cs.map((c) => c.y));
      mk(el, x, y, "grp", { grp: g, cs });
      el.setAttribute("aria-hidden", "false"); el.setAttribute("aria-label", `${town?.[0] ?? g}, ${T("courses", { n: cs.length })}`);
    }
    for (const cp of D.caps) {
      const el = document.createElement("div"); el.className = "gm-cap";
      el.innerHTML = `<i></i><span><b>${esc(cp.n)}</b><small>${esc(cp.cap[lang] ?? cp.cap.en)}</small></span>`;
      mk(el, cp.x, cp.y, "cap");
    }
    requestAnimationFrame(() => { for (const x of marks) measure(x); layout(true); });
  }
  const measure = (x: Mark) => { const l = x.el.querySelector<HTMLElement>(".gm-lab") ?? x.el; x.w = l.offsetWidth; x.h = l.offsetHeight; };
  // A group's flag or name: in to the group, framed as the arrival frames Vilamoura.
  function zoomTo(cs: Course[]) {
    const map = h.map(), ml = h.ml(); if (!map || !ml) return;
    h.ev({ event: "map/golf/cluster", place: cs[0].grp, origin: root.dataset.mode });
    if (cs[0].grp === "vilamoura") { glide(map); return; }
    const b = new ml.LngLatBounds(); cs.forEach((c) => b.extend([c.x, c.y]));
    const cam = map.cameraForBounds(b, { padding: 120, maxZoom: 13 }); if (cam) frame(map, { ...cam, zoom: Math.min(13, cam.zoom), pitch: 62, bearing: -10 });
  }
  function drawYear() {
    const items: [string, string][] = G.year ?? []; if (!items.length) return;
    year = document.createElement("p"); year.className = "gm-year";
    // Each event links to its own primary source (the PGA TOUR's 2027 schedule, Formula 1's race page).
    year.innerHTML = `<b>${esc(T("year.k"))}</b><span>${items.map(([t, u]) => (u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>` : esc(t))).join(" · ")}</span>`;
    root.querySelector(".m3-stage")?.append(year);
  }
  // Back to the arrival after a turn, a tilt or a wander (UX-09, M-03): a quiet chip, shown only when away from it.
  function drawReset() {
    reset = document.createElement("button"); (reset as HTMLButtonElement).type = "button"; reset.className = "gm-reset"; reset.hidden = true;
    reset.innerHTML = `${RESET}<span>${esc(T("reset"))}</span>`;
    reset.addEventListener("click", () => { const map = h.map(); if (map) { h.ev({ event: "map/golf/reset", origin: root.dataset.mode }); glide(map); } });
    root.querySelector(".m3-stage")?.append(reset);
  }

  // ------------------------------------------------------------ the layout: one pass, in priority order
  // Every frame while the map moves: sizes, shadows, clusters, the pins' stems and the flags' tap areas (cheap). The
  // names are placed when the camera rests (and when a card opens): each beside its own flag or hidden, never floating.
  const layoutSoon = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; layout(false); }); };
  const placeSoon = () => { if (!raf2) raf2 = requestAnimationFrame(() => { raf2 = 0; layout(true); }); };
  type Box = { x: number; y: number; w: number; h: number };
  const hit = (a: Box, list: Box[]) => list.some((b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y);
  let mine: Box[] = [];
  // The flag: a 56 px pole at the arrival (scale 0.81 of the drawing), 0.75 to 1.15 of that with the zoom.
  const flagScale = (z: number) => 0.81 * Math.min(1.15, Math.max(0.75, 0.75 + (z - 11) * (0.4 / 3)));
  function layout(place: boolean) {
    const map = h.map(); if (!map || !active) return;
    // A phone held sideways is wide but short: it takes the phone's sizes.
    const z = map.getZoom(), cv = map.getCanvas().getBoundingClientRect(), W = cv.width, H = cv.height, wide = h.isWide() && H > 480;
    if (map.getLayer("par-line") && !saved!.paint.some(([a]) => a === "par-line")) paint(map, "par-line", "line-opacity", 0);
    // The sun's shadow on the ground, seen from where the camera is: one direction for everything.
    const az = ((LK.sun + 180 - map.getBearing()) * Math.PI) / 180, k = Math.cos((map.getPitch() * Math.PI) / 180);
    const shx = Math.sin(az), shy = -Math.cos(az) * Math.max(0.25, k);
    root.style.setProperty("--gm-sha", `${Math.atan2(shy, shx)}rad`); root.style.setProperty("--gm-shl", `${Math.round(18 * Math.hypot(shx, shy) + 6)}px`);
    root.style.setProperty("--gm-shx", `${(shx * 6).toFixed(1)}px`); root.style.setProperty("--gm-shy", `${(shy * 6 + 2).toFixed(1)}px`);
    // Far-away marks (Porto's pins seen from the Algarve) would stand in the sky: only what is within reach stands.
    const ctr = map.getCenter(), reach = map.getPitch() > 45 ? 14 * 2 ** (13 - z) + 10 : 1e9;
    const farOf = (x: number, y: number) => Math.hypot((x - ctr.lng) * 89, (y - ctr.lat) * 111) > reach;
    for (const m of h.pins()) m.el.classList.toggle("gm-far", farOf(m.p.lon, m.p.lat));
    for (const x of marks) x.el.classList.toggle("gm-far", farOf(x.m.getLngLat().lng, x.m.getLngLat().lat));
    // The horizon: cream haze into the sky over the far edge, on the line where the view ray is level.
    if (haze) { const fov = ((map.transform?.fov ?? 36.87) * Math.PI) / 180, pad = map.getPadding(), cy = (pad.top + H - pad.bottom) / 2;
      const y = cy - (H / 2 / Math.tan(fov / 2)) * Math.tan(Math.PI / 2 - (map.getPitch() * Math.PI) / 180);
      haze.style.top = `${Math.round(y - 24)}px`; haze.hidden = !(y > -40 && y < H * 0.7); }
    // The 2027 line only over the Algarve; "Back to Vilamoura" only once the camera has rested away from the arrival (never
    // during a flight).
    const algarve = ctr.lat < 37.45 && ctr.lng > -9.05 && ctr.lng < -7.3;
    root.classList.toggle("gm-near", algarve && z >= 9.4);
    if (year) year.hidden = !algarve;
    if (reset) { const hc = heroCam(map), away = Math.abs(((map.getBearing() - hc.bearing + 540) % 360) - 180) > 8 || Math.hypot((ctr.lng - hc.center[0]) * 89, (ctr.lat - hc.center[1]) * 111) > 3 || Math.abs(z - hc.zoom) > 0.8;
      if (!away || map.isMoving()) { clearTimeout(resetT); resetT = 0; reset.hidden = true; } else if (reset.hidden && !resetT) resetT = window.setTimeout(() => { resetT = 0; const m2 = h.map(); if (active && reset && m2 && !m2.isMoving()) { reset.hidden = false; placeSoon(); } }, 1000); }
    for (const x of marks) if (!x.w && x.el.style.display !== "none") measure(x);
    // 1. The flags stand, all of them; below zoom 11 a group becomes one flag with its count and its name.
    const flags = marks.filter((x) => x.kind === "flag" && !x.el.classList.contains("gm-far")), clustered = z < 11;
    root.classList.toggle("gm-clustered", clustered);
    const s0 = flagScale(z), lead = new Map<string, Mark[]>();
    for (const f of flags) { const g = clustered && f.grp ? f.grp : f.c!.id; lead.set(g, [...(lead.get(g) ?? []), f]); }
    const vis: Mark[] = [];
    for (const [, fs] of lead) fs.forEach((f, i) => {
      const p = map.project([f.c!.x, f.c!.y]), sel = course === f.c!.id, s = +(s0 * (sel ? 1.2 : 1)).toFixed(3);
      f.el.style.display = i === 0 ? "" : "none"; f.s = s; f.p = { x: p.x, y: p.y }; f.cs = fs.length > 1 ? fs.map((x) => x.c!) : undefined;
      f.el.style.setProperty("--s", String(s)); f.el.classList.toggle("is-sel", sel);
      const n = f.el.querySelector<HTMLElement>(".gm-n")!; n.textContent = fs.length > 1 ? nf.format(fs.length) : ""; f.el.classList.toggle("is-n", fs.length > 1);
      if (i === 0) vis.push(f);
    });
    // Flags closer than a finger (44 px) on screen fan out a little at this zoom, so each keeps its own tap area (UX-01).
    const row = [...vis].sort((a, b) => a.p!.x - b.p!.x), shift = new Map<Mark, number>();
    for (let i = 1; i < row.length; i++) { const a = row[i - 1], b = row[i], ax = a.p!.x + (shift.get(a) ?? 0);
      if (Math.abs(a.p!.y - b.p!.y) < 70 && b.p!.x - ax < 44) shift.set(b, ax + 44 - b.p!.x); }
    for (const f of vis) { const dx = Math.round(shift.get(f) ?? 0), prev = (f as any).dx ?? 0;
      if (dx !== prev) { (f as any).dx = dx; f.m.setOffset([dx, 0]); } f.p!.x += dx; }
    const fbox: Box[] = vis.map((f) => { const fb = { x: f.p!.x - 6 * f.s!, y: f.p!.y - 76 * f.s!, w: 36 * f.s!, h: 78 * f.s! }; (f as any).fb = fb; return fb; });
    // 2. The developments' photo pins: a short upright stem (72 px, 56 on a phone; shorter as you pull back), the
    //    photograph 56–80 px with the zoom, its base kept clear of the flags' cups. They switch to their golf form once
    //    the camera has arrived (gm-ready), never before it moves.
    const pins = h.pins().filter((m) => m.el.style.display !== "none" && !m.el.classList.contains("gm-far"));
    const tb = root.querySelector(".m3-top")?.getBoundingClientRect(), topBar = tb ? Math.max(58, tb.bottom - cv.top) + 6 : 64;
    const zt = Math.min(1, Math.max(0, (z - 10.5) / 2)), stem0 = Math.round((wide ? 24 : 18) + zt * (wide ? 48 : 38)), img = Math.round((wide ? 56 : 44) + zt * (wide ? 24 : 16));
    root.style.setProperty("--gm-img", `${img}px`);
    const pbox: Box[] = [], nbox: Box[] = [], photos: Box[] = [];
    for (const m of [...pins].sort((a, b) => a.p.lon - b.p.lon)) {
      const p = map.project([m.p.lon, m.p.lat]);
      const cup = fbox.map((b) => ({ x: b.x + 6 * (b.w / 36), y: b.y + b.h })).sort((a, b) => Math.hypot(a.x - p.x, a.y - p.y) - Math.hypot(b.x - p.x, b.y - p.y))[0];
      const lean = cup && Math.hypot(cup.x - p.x, cup.y - p.y) < 30 ? (p.x >= cup.x ? 1 : -1) * 16 : 0;
      let stem = stem0, top = p.y - stem - img;
      if (top < topBar) stem = Math.max(12, stem - (topBar - top)), top = p.y - stem - img;
      const ph: Box = { x: p.x + lean - img / 2, y: top, w: img, h: img };
      photos.push(ph); pbox.push(ph, { x: Math.min(p.x, p.x + lean) - 3, y: top + img, w: Math.abs(lean) + 6, h: stem });
      m.el.style.setProperty("--gm-stem", `${stem}px`); m.el.style.setProperty("--gm-lean", `${lean}px`);
      m.el.style.setProperty("--gm-slen", `${Math.round(Math.hypot(stem, lean))}px`); m.el.style.setProperty("--gm-srot", `${Math.atan2(lean, stem)}rad`);
      (m as any).gm = { p, ph, lean };
    }
    // A group's name when its flags are one (far out) comes before the developments' names: "Vilamoura · 5 courses" leads.
    const gbox = new Map<Mark, Box>();
    if (clustered) for (const g of marks.filter((x) => x.kind === "grp")) {
      const lf = vis.find((f) => f.grp === g.grp && f.cs); if (!lf || !g.w) continue;
      const p = lf.p!, s = lf.s!, top = p.y - 76 * s;
      const b = [{ x: p.x - g.w - 14, y: p.y - g.h / 2 + 6, w: g.w, h: g.h }, { x: p.x - g.w - 14, y: top - 4, w: g.w, h: g.h }, { x: p.x - g.w / 2, y: p.y + 10, w: g.w, h: g.h }, { x: p.x + 28 * s + 14, y: top - 4, w: g.w, h: g.h }, { x: p.x - g.w / 2, y: top - g.h - 10, w: g.w, h: g.h }]
        .find((o) => o.x > 4 && o.x + o.w < W - 4 && o.y > topBar && o.y + o.h < H - 4 && !hit(o, [...fbox, ...photos]));
      if (b) gbox.set(g, b);
    }
    // The pins' names: above the photograph, else beside it, else hidden. On a phone close in, the course names have the
    // room and a development's name shows on its card (a tap); pulled back (/arrow) every development is named.
    const pinNames = wide || clustered;
    for (const m of [...pins].sort((a, b) => a.p.lon - b.p.lon)) {
      const g = (m as any).gm, sp = m.el.querySelector<HTMLElement>(":scope > span"); if (!g || !sp) continue;
      // On a phone a development goes by its short name ("Springs", "The Uncommon", "Palmares"); its card has the full one.
      const tn = sp.firstChild; if (tn && tn.nodeType === 3) { const full = ((m as any).full ??= tn.textContent ?? ""), short = full.split(/ (?:at|Beach|Ocean|Residences|Living)\b/)[0];
        const want = wide ? full : short; if (tn.textContent !== want) tn.textContent = want; }
      m.el.classList.add("gm-named"); m.el.classList.remove("gm-unnamed"); const sw = sp.offsetWidth, sh = sp.offsetHeight;
      const opts: Box[] = [{ x: g.ph.x + g.ph.w / 2 - sw / 2, y: g.ph.y - sh - 2, w: sw, h: sh }, { x: g.ph.x + g.ph.w + 8, y: g.ph.y + g.ph.h / 2 - sh / 2, w: sw, h: sh }, { x: g.ph.x - sw - 8, y: g.ph.y + g.ph.h / 2 - sh / 2, w: sw, h: sh }, { x: g.p.x - sw / 2, y: g.p.y + 8, w: sw, h: sh }];
      const inside = (b: Box) => b.x >= 6 && b.x + b.w <= W - 6 && b.y >= topBar && b.y + b.h <= H - 4;
      const gb = [...gbox.values()];
      let best = pinNames ? opts.find((b) => inside(b) && !hit(b, nbox) && !hit(b, fbox) && !hit(b, gb) && !hit(b, pbox.filter((x) => x !== g.ph))) : undefined;
      // Pulled back, two developments side by side (Springs and The Uncommon): the second stands taller, its name above.
      for (let k = 1; !best && pinNames && k <= 2; k++) {
        const up = k * (sh + 10), ph2 = { ...g.ph, y: g.ph.y - up }, b = { x: ph2.x + ph2.w / 2 - sw / 2, y: ph2.y - sh - 2, w: sw, h: sh };
        if (inside(b) && !hit(b, nbox) && !hit(b, fbox) && !hit(b, gb) && !hit(b, pbox.filter((x) => x !== g.ph))) {
          const st = parseFloat(m.el.style.getPropertyValue("--gm-stem")) + up; m.el.style.setProperty("--gm-stem", `${st}px`); m.el.style.setProperty("--gm-slen", `${Math.round(Math.hypot(st, g.lean))}px`);
          m.el.style.setProperty("--gm-srot", `${Math.atan2(g.lean, st)}rad`); photos.splice(photos.indexOf(g.ph), 1, ph2); pbox.push(ph2); g.ph = ph2; best = b;
          sp.style.setProperty("--gm-nx", "0px"); sp.style.setProperty("--gm-ny", "0px"); }
      }
      m.el.classList.toggle("gm-unnamed", !best);
      if (best) { nbox.push(best); if (best.y === g.ph.y - sh - 2 && Math.abs(best.x - (g.ph.x + g.ph.w / 2 - sw / 2)) < 0.5) { sp.style.setProperty("--gm-nx", "0px"); sp.style.setProperty("--gm-ny", "0px"); } else { sp.style.setProperty("--gm-nx", `${Math.round(best.x - opts[0].x)}px`); sp.style.setProperty("--gm-ny", `${Math.round(best.y - opts[0].y)}px`); } }
    }
    pbox.push(...nbox);
    // Tap areas: the pole and the cloth, at least 44 px, trimmed at the midpoint where two would overlap. The flags stand
    // above the pins, so where a photograph or a name covers a flag, only its pole strip (below the photograph) stays.
    const hits = vis.map((f) => ({ f, b: { x: f.p!.x - 10, y: f.p!.y - 76 * f.s! - 6, w: Math.max(44, 30 * f.s! + 14), h: Math.max(44, 76 * f.s! + 8) } as Box }));
    for (const a of hits) for (const o of hits) if (a !== o && hit(a.b, [o.b])) {
      if (Math.abs(a.f.p!.x - o.f.p!.x) >= Math.abs(a.f.p!.y - o.f.p!.y)) { const mid = (a.f.p!.x + o.f.p!.x) / 2 + 5; if (a.f.p!.x < o.f.p!.x) a.b.w = Math.max(14, Math.min(a.b.w, mid - a.b.x)); else { const r = a.b.x + a.b.w; a.b.x = Math.max(a.b.x, mid); a.b.w = Math.max(14, r - a.b.x); } }
      else { const mid = (a.f.p!.y + o.f.p!.y) / 2; if (a.f.p!.y < o.f.p!.y) a.b.h = Math.max(14, Math.min(a.b.h, mid - a.b.y)); else { const bt = a.b.y + a.b.h; a.b.y = Math.max(a.b.y, mid); a.b.h = Math.max(14, bt - a.b.y); } }
    }
    const pinTaps = [...photos, ...nbox];
    for (const a of hits) if (hit(a.b, pinTaps)) {
      const p = a.f.p!, s = a.f.s!; let y0 = p.y - 76 * s, y1 = p.y + 4;
      for (const q of pinTaps) if (q.x < p.x + 12 && q.x + q.w > p.x - 12 && q.y < y1 && q.y + q.h > y0) { if (q.y + q.h / 2 < (y0 + y1) / 2) y0 = Math.max(y0, q.y + q.h + 2); else y1 = Math.min(y1, q.y - 2); }
      a.b = { x: p.x - 12, y: y0, w: 24, h: Math.max(10, y1 - y0) };
    }
    for (const { f, b } of hits) { const hb = f.el.querySelector<HTMLElement>(".gm-hit")!; hb.style.left = `${Math.round(32 + b.x - f.p!.x + ((f as any).dx ?? 0))}px`; hb.style.top = `${Math.round(80 + b.y - f.p!.y)}px`; hb.style.width = `${Math.round(b.w)}px`; hb.style.height = `${Math.round(b.h)}px`; }
    // The minutes from the open home's door (Mike's wow): beside the cups of the three nearest courses, never touching.
    const sheetBox = (() => { const sh = root.querySelector<HTMLElement>(".m3-sheet.is-open")?.getBoundingClientRect(); return sh ? { x: sh.left - cv.left, y: sh.top - cv.top, w: sh.width, h: sh.height } : null; })();
    const mins = vis.map((f) => ({ f, d: home && !f.cs ? f.c!.devs?.find((d) => d.id === home) : undefined })).filter((x) => x.d && x.d.min <= 40).sort((a, b) => a.d!.min - b.d!.min);
    const chips: Box[] = [];
    for (const f of vis) f.el.classList.remove("is-min");
    for (const { f, d } of mins) {
      if (chips.length >= 3) break;
      const beside = d!.name.toLowerCase().includes(f.c!.short.toLowerCase()), txt = beside ? T("door.next") : `${nf.format(d!.min)} min`, w = txt.length * 7 + 14;
      const b = { x: f.p!.x + 10, y: f.p!.y - 10, w, h: 20 };
      if (hit({ x: b.x - 6, y: b.y - 6, w: b.w + 12, h: b.h + 12 }, chips) || (sheetBox && hit(b, [sheetBox])) || b.y < topBar || b.x + b.w > W) continue;
      chips.push(b); const mm = f.el.querySelector<HTMLElement>(".gm-min")!; mm.textContent = txt; f.el.classList.add("is-min");
    }
    if (!place) { hideClashing(); return; }
    // 0. The interface: the top bar, the 2027 line, the reset chip and an open card are never written under.
    const ui: Box[] = [];
    for (const el of root.querySelectorAll<HTMLElement>(".m3-top > *:not([hidden]), .gm-year:not([hidden]), .gm-reset:not([hidden]), .m3-sheet.is-open, .m3-attr")) { const r = el.getBoundingClientRect(); if (r.width) ui.push({ x: r.left - cv.left - 6, y: r.top - cv.top - 6, w: r.width + 12, h: r.height + 12 }); }
    const placed: Box[] = [...ui, ...fbox, ...pbox, ...chips];
    const air = (b: Box): Box => ({ x: b.x - 6, y: b.y - 6, w: b.w + 12, h: b.h + 12 });
    const inFrame = (b: Box) => b.x > 4 && b.x + b.w < W - 4 && b.y > 4 && b.y + b.h < H - 4;
    const free = (b: Box) => inFrame(b) && !hit(air(b), placed);
    const turf = ["gm-top", "gm-side", "golf"].filter((id) => map.getLayer(id));
    const offTurf = (b: Box) => !turf.length || !map.queryRenderedFeatures([[b.x, b.y], [b.x + b.w, b.y + b.h]], { layers: turf }).length;
    // 3. A group's name first when its flags are one (far out): "Vilamoura · 5 courses", above the developments' names.
    //    On a phone close in, it also names the five standing together (placed after their own names, where there is room).
    const groupName = (g: Mark) => {
      const fs = vis.filter((f) => f.grp === g.grp && !f.cs); if (fs.length < 2 || !g.w) return false;
      const a = map.project(g.m.getLngLat()), cx = fs.reduce((t, f) => t + f.p!.x, 0) / fs.length, top = Math.min(...fs.map((f) => f.p!.y - 76 * f.s!)), bot = Math.max(...fs.map((f) => f.p!.y));
      for (const b of [{ x: cx - g.w / 2, y: top - g.h - 12, w: g.w, h: g.h }, { x: cx - g.w / 2, y: bot + 12, w: g.w, h: g.h }])
        if (free(b)) { placed.push(b); g.el.style.setProperty("--gx", `${Math.round(b.x + g.w / 2 - a.x)}px`); g.el.style.setProperty("--gy", `${Math.round(b.y + g.h - a.y)}px`); return true; }
      return false;
    };
    for (const g of marks.filter((x) => x.kind === "grp")) {
      const b = gbox.get(g), a = map.project(g.m.getLngLat());
      if (b && !hit(b, ui)) { placed.push(b); g.el.style.setProperty("--gx", `${Math.round(b.x + g.w / 2 - a.x)}px`); g.el.style.setProperty("--gy", `${Math.round(b.y + g.h - a.y)}px`); }
      g.el.classList.toggle("is-on", !!b && !hit(b, ui));
    }
    // 4. Course names, The Els Club first, then the other Details courses: beside its own flag (right of the cloth, level
    //    with the top of the pole; or left of the pole; else just above it), off the turf where it can be, else hidden.
    //    Pulled back, single courses stay smaller than a group's name (gm-clustered).
    const order = [...vis].sort((a, b) => (a.c!.id === "els-club" ? -1 : b.c!.id === "els-club" ? 1 : 0));
    for (const f of order) {
      const lab = f.el.querySelector<HTMLElement>(".gm-lab")!, s = f.s!, p = f.p!;
      let ok = false;
      if (!f.cs && f.w) {
        const top = p.y - 76 * s - 4, mid = p.y - 44 * s - f.h / 2, R = (x: number, y: number): Box => ({ x, y, w: f.w, h: f.h });
        const up = top - f.h - 12, opts = [R(p.x + 30 * s + 12, top), R(p.x - f.w - 12, top), R(p.x + 30 * s + 12, mid), R(p.x - f.w - 12, mid), R(p.x - f.w - 30, top), R(p.x + 6, up), R(p.x - f.w / 2, up), R(p.x - f.w + 4, up), R(p.x - f.w / 2, p.y + 10)];
        const tight = (b: Box) => inFrame(b) && !hit(b, placed);
        // The Els Club, the hero course, may stand closer to its neighbours (touching nothing); the others yield.
        const best = opts.find((b) => free(b) && offTurf(b)) ?? opts.find(free) ?? (f.c!.id === "els-club" ? opts.find(tight) : undefined);
        if (best) { placed.push(best); ok = true; lab.style.translate = `${Math.round(best.x - p.x)}px ${Math.round(best.y - p.y)}px`; }
      }
      lab.classList.toggle("is-on", ok); lab.tabIndex = -1;
    }
    if (!wide && !clustered) for (const g of marks.filter((x) => x.kind === "grp")) g.el.classList.toggle("is-on", groupName(g));
    // 5. The sourced captions (Falésia, the marina): above their point on land (desktop), below it on a chip (phones).
    for (const x of marks.filter((m) => m.kind === "cap" && !m.el.classList.contains("gm-far"))) {
      const p = map.project(x.m.getLngLat()), b = { x: p.x - 6, y: wide ? p.y - x.h + 6 : p.y - 6, w: x.w, h: x.h };
      const ok = z >= 10.4 && x.w > 0 && free(b); x.el.classList.toggle("is-on", ok); if (ok) placed.push(b);
    }
    mine = placed; hideClashing();
  }
  // 6. Places last: the map's own names stay where they touch nothing above.
  function hideClashing() {
    if (!active) return; const cv = h.map()?.getCanvas().getBoundingClientRect(); if (!cv) return;
    // Near the horizon the map's names pile up: they stand down there, as the far marks do.
    const hz = haze && !haze.hidden ? parseFloat(haze.style.top) + 100 : -1e9;
    root.querySelectorAll<HTMLElement>("[data-labels] span").forEach((s) => { const r = s.getBoundingClientRect(), y = r.top - cv.top; s.style.visibility = y < hz || hit({ x: r.left - cv.left - 4, y: y - 4, w: r.width + 8, h: r.height + 8 }, mine) ? "hidden" : ""; });
  }

  // ------------------------------------------------------------ the hole card (one tap on a flag, or its name)
  async function hole(c: Course, push = true) {
    const D = await data(); if (!D) return;
    h.ev({ event: "map/golf/flag", place: c.id, origin: root.dataset.mode });
    // A link of its own (?course=), so Back closes it as every card on the map does (D98).
    h.forget();  // the map's own card state (a development, a place) gives way to the course
    const u = new URL(location.href); u.searchParams.set("course", c.id);
    if (push && new URLSearchParams(location.search).get("course") !== c.id) history.pushState({ m3: "", gm: c.id }, "", `${u.pathname}${u.search}${u.hash}`);
    else history.replaceState(history.state, "", `${u.pathname}${u.search}${u.hash}`);
    course = c.id; home = null;
    const ph = c.photo ? `<figure class="m3-ph gm-ph"><img class="m3-photo m3-hero-top" src="${esc(c.photo)}-800.webp" data-srcset="${esc(c.photo)}-800.webp 800w, ${esc(c.photo)}-1600.webp 1600w" sizes="(max-width: 819px) 100vw, 400px" alt="" width="800" height="450">${c.credit && cfg.p68 ? `<figcaption class="m3-cr">${esc(cfg.p68.credit.replace("{c}", c.credit))}</figcaption>` : ""}</figure>` : "";
    let x = `${ph}<div class="m3-sb m3-arr gm-card${ph ? "" : " gm-card-np"}"><p class="m3-kick gm-kick">${esc([c.resort && c.resort !== c.n ? c.resort : "", T("mark")].filter(Boolean).join(" · "))}</p>`;
    x += `<h2 class="m3-h gm-name" tabindex="-1">${esc(c.n)}</h2><p class="gm-one">${esc([c.holes ? T("holes", { n: c.holes }) : "", c.arch].filter(Boolean).join(" · "))}</p>`;
    if (c.note === "private") x += `<p class="gm-note">${esc(T("private"))}</p>`;
    // The homes by car from this course, nearest first (M-01): each names its home and opens its card. A home named
    // after the course (Springs at The Els Club) stands beside it: its pin is approximate, so "Next to", not minutes.
    const near30 = (c.devs ?? []).filter((d) => d.min <= 30), devs = (near30.length ? near30 : (c.devs ?? []).slice(0, 1)).slice(0, 3);
    if (devs.length) x += `<div class="gm-homes"><p class="m3-tt">${esc(T("homes"))}<small>${esc(T("door.car"))}</small></p><ul class="m3-ml">${devs.map((d) => {
      const beside = d.name.toLowerCase().includes(c.short.toLowerCase());
      return `<li><button type="button" class="gm-row" data-gm-dev="${esc(d.id)}"><span class="m3-mn">${esc(d.name)}</span>${beside ? `<span class="m3-mm gm-next-t">${esc(T("door.next"))}</span>` : `<span class="m3-mm"><b>${nf.format(d.min)}</b> min</span>`}</button></li>`; }).join("")}</ul></div>`;
    x += `<p class="gm-links">${c.url ? `<a class="m3-link" href="${esc(c.url)}" target="_blank" rel="noopener" data-gm-site>${esc(T("site"))} ↗</a>` : ""}</p>`;
    const dt = (() => { try { return new Intl.DateTimeFormat(root.dataset.locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${D.checked}T12:00:00`)); } catch { return D.checked; } })();
    const st = (t: string) => (/^Details press release/.test(t) && G["src.details"] ? T("src.details") : t);
    x += `<p class="m3-src gm-src">${c.src.map((s) => `<a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(st(s.t))}</a>`).join(" · ")}${devs.length ? ` · ${esc(T("src.drive", { d: dt }))}` : ""} · ${esc(T("src.outline"))}</p></div>`;
    h.openSheet(x, true, true);
    selectOutline();
    h.sheetIn.querySelector("[data-gm-site]")?.addEventListener("click", () => h.ev({ event: "map/golf/site", place: c.id, origin: root.dataset.mode }));
    h.sheetIn.querySelectorAll<HTMLElement>("[data-gm-dev]").forEach((b) => b.addEventListener("click", () => {
      const p = h.projects.find((y) => y.id === b.dataset.gmDev); if (!p) return;
      h.ev({ event: "map/golf/homes", place: c.id, step: p.id, origin: root.dataset.mode });
      const map = h.map(); if (map) map.easeTo({ center: [p.lon, p.lat], zoom: Math.max(map.getZoom(), 12.8), padding: pad(), duration: h.reduce() ? 0 : 900, essential: true });
      h.showProject(p);
    }));
    const map = h.map(); if (map) { const zz = Math.max(Math.min(map.getZoom(), 14), 13.3); map.easeTo({ center: [c.x, c.y], zoom: zz, pitch: pitchFor(zz), padding: pad(), duration: h.reduce() ? 0 : 1100, essential: true }); }
  }
  function selectOutline() { const map = h.map(); if (map?.getLayer("gm-selected")) map.setFilter("gm-selected", ["==", ["get", "id"], course ?? ""]); placeSoon(); }
  // Desktop: the card on the right, the course at 40% of the free width. Phone: the course in the strip above the card,
  // with room over it for a pin below the controls.
  const pad = () => (h.isWide() ? { right: 460, left: h.padL(), top: h.padTop(120), bottom: 80 } : phonePad());
  const phonePad = () => { const cv = h.map()?.getCanvas().getBoundingClientRect(), t = root.querySelector(".m3-top")?.getBoundingClientRect(), H = cv?.height ?? root.clientHeight;
    return { bottom: Math.round(H * 0.56), top: Math.round((t && cv ? t.bottom - cv.top : 56) + 110), left: 0, right: 0 }; };
  // The sheet changed: a course card closed (its ?course= goes, by Back when it was its own step), a home card opened or
  // closed (the flags' minutes follow).
  function sheetChanged() {
    const sh = root.querySelector<HTMLElement>("[data-sheet]"), open = !!sh && !sh.hidden;
    const isCourse = open && !!h.sheetIn.querySelector(".gm-card"), isHome = open && !!h.sheetIn.querySelector("[data-gm-door]");
    if (!isCourse && course) {
      course = null; selectOutline();
      if (new URLSearchParams(location.search).has("course")) { if (history.state?.gm) history.back(); else { const u = new URL(location.href); u.searchParams.delete("course"); history.replaceState(history.state, "", `${u.pathname}${u.search}${u.hash}`); } }
    }
    if (!isHome && home) { home = null; layoutSoon(); }
  }
  addEventListener("popstate", () => {
    if (!active) return; const id = new URLSearchParams(location.search).get("course");
    if (!id && course && h.sheetIn.querySelector(".gm-card")) { course = null; h.closeCard(); selectOutline(); }
    else if (id && id !== course) data().then((D) => { const c = D?.courses.find((x) => x.id === id); if (c) hole(c, false); });
  });

  // ------------------------------------------------------------ "From your door" on every development card
  // Every course within half an hour by car from this door (minutes from OSRM, offline), the nearest beach and marina;
  // in golf mode the courses come first. The home's minutes also show on each flag while its card is open.
  function doorHTML(id: string, D: Data | null) {
    if (!D) return "";
    const courses = D.courses.map((c) => ({ c, d: c.devs?.find((x) => x.id === id) })).filter((x) => x.d && x.d.min <= 30).sort((a, b) => a.d!.min - b.d!.min);
    const cRows = courses.map(({ c, d }) => { const beside = d!.name.toLowerCase().includes(c.short.toLowerCase());
      return `<li><span class="m3-mn">${esc(c.tee === "tee" ? T("door.tee", { name: c.short }) : c.short)}</span>${beside ? `<span class="m3-mm gm-next-t">${esc(T("door.next"))}</span>` : `<span class="m3-mm"><b>${nf.format(d!.min)}</b> min</span>`}</li>`; });
    const other = (D.door?.[id] ?? []).filter((r) => r.k !== "course" || !courses.length).map((r) => `<li><span class="m3-mn">${esc(r.n)}</span><span class="m3-mm"><b>${nf.format(r.min)}</b> min</span></li>`);
    const li = active ? [...cRows, ...other] : [...other, ...cRows]; if (!li.length) return "";
    return `<p class="m3-tt gm-door-h">${esc(T("door.h"))}<small>${esc(T("door.car"))}</small></p><ul class="m3-ml">${li.join("")}</ul>`;
  }
  const door = (p: any) => { if (active) { home = p.id; course = null; selectOutline(); layoutSoon(); } return G.door ? `<div class="gm-door" data-gm-door="${esc(p.id)}"></div>` : ""; };
  // The development card's booking button sits in the card's footer, outside its scroll: it never covers the name, and the
  // scroll ends above it (UI2-01, J2-02, UX2-02). The footer goes when the sheet shows anything else.
  const sheetEl = root.querySelector<HTMLElement>("[data-sheet]");
  function footer() {
    const v = h.sheetIn.querySelector<HTMLElement>(".m3-proj [data-visit]"), old = sheetEl?.querySelector(".gm-foot");
    if (!v) { if (old && !h.sheetIn.querySelector(".m3-proj")) old.remove(); return; }
    const f = old ?? Object.assign(document.createElement("div"), { className: "gm-foot" }); f.replaceChildren(v); if (!old) sheetEl?.append(f);
  }
  if (sheetEl) new MutationObserver(() => footer()).observe(h.sheetIn, { childList: true });
  function fill(el: HTMLElement) {
    footer();
    const slots = el.querySelectorAll<HTMLElement>("[data-gm-door]"); if (!slots.length) return;
    data().then((D) => slots.forEach((s) => { const x = doorHTML(s.dataset.gmDoor!, D); s.innerHTML = x; s.hidden = !x; }));
  }

  // ------------------------------------------------------------ hooks for map-v3.ts
  return {
    on: () => active,
    set,
    // The tilt the map's own flights use in golf mode (a nearby course, a place): the sky stays in view.
    pitch: (z: number) => pitchFor(z),
    door, fill,
    // A tap on a lit course (its raised outline) opens its hole card, before the map's own click.
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
      marks.forEach((x) => x.m.remove()); marks = []; year?.remove(); year = null; haze?.remove(); haze = null; reset?.remove(); reset = null; root.classList.remove("gm-ready");
      ids.layers = []; ids.sources = []; ids.images = []; saved = null;
    },
  };
}
