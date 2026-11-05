/// <reference types="astro/client" />
/** Isolated Issue 10 map. No shared main-map/Golf modules, remote tiles or API tokens. */
import type { RegressarPlace } from "../lib/regressar-places";
import mapCss from "maplibre-gl/dist/maplibre-gl.css?url";

export type RegressarMapHandle = {
  select: (id: string) => void;
  update: (places: readonly RegressarPlace[], selectedId?: string) => void;
  destroy: () => void;
};

export async function showRegressarMap(
  container: HTMLElement,
  places: readonly RegressarPlace[],
  selectedId: string,
  onSelect: (id: string) => void,
): Promise<RegressarMapHandle> {
  if (!document.querySelector('link[data-regressar-map-css]')) {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = mapCss;
    css.dataset.regressarMapCss = "";
    document.head.append(css);
  }
  const [{ default: maplibregl }, { feature }] = await Promise.all([
    import("maplibre-gl"), import("topojson-client"),
  ]);
  const response = await fetch("/data/map/munis.topo.json");
  if (!response.ok) throw new Error("Local municipality geography unavailable");
  const topology = await response.json();
  const geometry = feature(topology, topology.objects.m) as unknown as GeoJSON.FeatureCollection;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const map = new maplibregl.Map({
    container,
    attributionControl: false,
    style: {
      version: 8,
      sources: { municipalities: { type: "geojson", data: geometry } },
      layers: [
        { id: "water", type: "background", paint: { "background-color": "#dce7e2" } },
        { id: "land", type: "fill", source: "municipalities", paint: { "fill-color": "#e8e8d7", "fill-opacity": 1 } },
        { id: "borders", type: "line", source: "municipalities", paint: { "line-color": "#8b9c88", "line-opacity": 0.25, "line-width": 0.6 } },
      ],
    },
    center: [-8.0, 39.5], zoom: 5.2, minZoom: 4, maxZoom: 12,
    maxBounds: [[-11, 35.5], [-5, 43.5]],
    dragRotate: false, pitchWithRotate: false, touchPitch: false,
    scrollZoom: false, cooperativeGestures: true,
  });
  map.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>' }), "bottom-right");
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
  const canvas = map.getCanvas();
  canvas.setAttribute("aria-label", container.getAttribute("aria-label") || "Portugal");
  let current = [...places];
  let selected = selectedId;
  let destroyed = false;
  const markers: { id: string; element: HTMLButtonElement; marker: InstanceType<typeof maplibregl.Marker> }[] = [];
  const select = (id: string) => {
    if (destroyed) return;
    const place = current.find(p => p.id === id);
    if (!place) return;
    selected = id;
    for (const item of markers) {
      const active = item.id === id;
      item.element.setAttribute("aria-pressed", String(active));
      item.element.style.background = active ? "#244b3c" : "#fffdf5";
      item.element.style.color = active ? "#fffdf5" : "#244b3c";
      item.element.style.zIndex = active ? "2" : "1";
    }
    map.easeTo({ center: [place.lon, place.lat], zoom: 7.3, duration: reduced ? 0 : 650 });
  };
  const update = (next: readonly RegressarPlace[], nextId = next[0]?.id || "") => {
    if (destroyed) return;
    for (const item of markers.splice(0)) item.marker.remove();
    current = [...next];
    for (const place of current) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = place.name;
      button.setAttribute("aria-label", place.name);
      button.setAttribute("aria-pressed", "false");
      button.style.cssText = "font:500 12px Manrope,sans-serif;border:1px solid #789580;border-radius:24px;padding:10px 14px;min-height:44px;min-width:44px;background:#fffdf5;color:#244b3c;cursor:pointer;box-shadow:0 2px 8px #193c2820";
      button.addEventListener("click", () => { select(place.id); onSelect(place.id); });
      const marker = new maplibregl.Marker({ element: button }).setLngLat([place.lon, place.lat]).addTo(map);
      // MapLibre supplies a generic label during construction; restore the city name afterwards.
      button.setAttribute("aria-label", place.name);
      markers.push({ id: place.id, element: button, marker });
    }
    if (nextId) select(nextId);
    else map.easeTo({ center: [-8, 39.5], zoom: 5.2, duration: 0 });
  };
  // MapLibre queues camera work until its first real render; no fake readiness flag.
  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Map render timed out")), 20000);
    map.once("load", () => { window.clearTimeout(timeout); resolve(); });
    map.once("error", e => { window.clearTimeout(timeout); reject(e.error); });
  }).catch(error => { map.remove(); throw error; });
  update(current, selected);
  const observer = new ResizeObserver(() => { if (!destroyed) map.resize(); });
  observer.observe(container);
  container.dataset.regressarMapReady = "true";
  return {
    select, update,
    destroy: () => {
      if (destroyed) return;
      destroyed = true;
      observer.disconnect();
      for (const item of markers.splice(0)) item.marker.remove();
      map.remove();
      delete container.dataset.regressarMapReady;
    },
  };
}
