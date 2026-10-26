// Browser side of MapExplorer.astro (prompts 16, 19 and 25). MapLibre is imported only when the map is needed: the first
// interaction on the map page, a search, or when the map scrolls into view on the home page.
// Prompt 25: the reader chooses what height means (m² for the budget, median €/m², 10-year growth, gross yield); every
// concelho is clickable (small ones through a hit radius around their label point), a search box flies to any of them,
// and the parishes INE publishes appear from zoom 8.5. Data: /data/map/*.topo.json and /data/prices.json (scripts/map-data/).
import mapCss from "maplibre-gl/dist/maplibre-gl.css?url";
import { feature } from "topojson-client";
import { savePlace } from "../lib/brief";

type Props = { id: number; n: string; s: string; c: string; r: string; coast: boolean; city: boolean; air: boolean; x: number; y: number; a: number };
type Series = { n: string; m2: (number | null)[]; rq: (number | null)[]; yield: number | null; g10?: number | null; cagrP?: number | null; cagrP20: number | null; cagrR: number | null;
  mo: { c4: number; c8: number | null; w: "up" | "steady" | "down" } | null; cmp?: string[]; m?: string };
// Prompt 25 §4: four INE layers join the four price metrics (sea, vac, new, fr: layers.json).
// Prompt 26 §1: partner projects (content/developers/projects.json); demos add theirs from an unlisted file (?demoproj=).
type Project = { id: string; name: string; developer: string; muni: string; lon: number; lat: number; render?: string; credit?: string;
  from: number | null; typologies: string[]; delivery?: string | null; url?: string; showcase?: string };
type Metric = "m2" | "price" | "growth" | "yield" | "sea" | "vac" | "new" | "fr";
const KEY: Record<Metric, string> = { m2: "pv", price: "pv", growth: "pg", yield: "py", sea: "l_sea", vac: "l_vac", new: "l_new", fr: "l_fr" };
type Cfg = {
  labels: Record<string, any>; quarter: string; mortgage: { rate: number; month: string };
  links: { buy: string; talk: string; sim: string; map: string; journey: string; devHref: string; pages: string[] };
  photos: Record<string, string>; briefs: Record<string, string>; privateHref: string;
  embed?: { cta?: string; ctaLabel?: string; pin?: [number, number, string] | null; accent?: string };
  projects?: Project[]; routing?: "agency" | "developer" | "choice"; consult?: string;
};

const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const lowPower = () => (navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency <= 2;
// D44: a quiet sequential green from eau-de-nil to bottle green; the selection in brass.
const GREENS = ["#eef4ef", "#c9dccf", "#8fb39e", "#4f7d66", "#1f4a3d"];
const NODATA = "#e6e8e6", BRASS = "#7a5e28", INK = "#16181c";
const plain = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function initMapExplorer(root: HTMLElement) {
  const cfg: Cfg = JSON.parse(root.querySelector("[data-mapx-labels]")!.textContent || "{}");
  const L = cfg.labels;
  const esc = (t: string) => t.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
  // Embed (prompt 25 §3): the host page passes its options in the query string; only http(s) links and #rrggbb colours.
  if (root.dataset.mode === "embed") {
    const e = new URLSearchParams(location.search), cta = e.get("cta") || "", pin = (e.get("pin") || "").split(","), accent = e.get("accent") || "";
    cfg.embed = { cta: /^https?:\/\//i.test(cta) ? cta : undefined, ctaLabel: e.get("ctalabel") ? esc(e.get("ctalabel")!) : undefined,
      pin: pin.length >= 3 && !isNaN(+pin[0]) && !isNaN(+pin[1]) ? [+pin[0], +pin[1], esc(pin.slice(2).join(",").slice(0, 60))] : null };
    if (/^#[0-9a-f]{6}$/i.test(accent)) root.style.setProperty("--mapx-accent", accent);
    if (e.get("center")) root.dataset.center = e.get("center")!;
  }
  const loc = root.dataset.locale || "pt-PT";
  const nf = new Intl.NumberFormat(loc), nf1 = new Intl.NumberFormat(loc, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const pc = (v: number) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${nf1.format(Math.abs(v))}%`;
  const eur = new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const eur2 = new Intl.NumberFormat(loc, { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  let fx = Number(root.dataset.fx) || 0, cur = root.dataset.cur || "";
  // Embed (prompt 26 demos): the host may set the reader's currency (?cur=USD|CHF|ILS|BRL) from the ECB rates in the page.
  if (root.dataset.mode === "embed") {
    const want = (new URLSearchParams(location.search).get("cur") || "").toUpperCase(), rates = JSON.parse(root.dataset.rates || "{}");
    if (rates[want]) {
      cur = want; fx = rates[want];
      root.querySelector(".mapx-controls")?.insertAdjacentHTML("beforeend", `<div class="mapx-cur" role="group"><button type="button" data-cur-pick="${cur}" aria-pressed="true">${cur}</button><button type="button" data-cur-pick="EUR" aria-pressed="false">EUR</button></div>`);
    }
  }
  const local = cur ? new Intl.NumberFormat(loc, { style: "currency", currency: cur, maximumFractionDigits: 0 }) : null;
  const input = root.querySelector<HTMLInputElement>("[data-budget]")!;
  const card = root.querySelector<HTMLElement>("[data-card]")!;
  const canvas = root.querySelector<HTMLElement>("[data-canvas]")!;
  const tip = root.querySelector<HTMLElement>("[data-tip]");
  const q = new URLSearchParams(location.search);
  // The reader's budget carries across pages (path, FAQ, consultation) so the site can adapt quietly (D52).
  const stored = (() => { try { return Number(localStorage.getItem("ip.budget")) || 0; } catch { return 0; } })();
  let budget = Math.max(1000, Number(q.get("budget")) || stored || Number(root.dataset.budget) || 300000);
  let inLocal = false;  // the field shows the reader's currency instead of euros
  let metric: Metric = ((q.get("metric") || "") in KEY ? q.get("metric") : "m2") as Metric;
  let LY: { periods: Record<string, string>; munis: Record<string, any> } | null = null;
  let selected: string | null = q.get("place"), selPar: string | null = q.get("parish");
  let filter = "all", region = "", flat = reduce() || lowPower() || q.get("flat") === "1";
  let map: any = null, ml: any = null, features: any[] = [], loading: Promise<void> | null = null, rotating = false;
  let P: { quarters: string[]; munis: Record<string, Series>; regions: Record<string, Series> } | null = null;
  let parishes: { feats: any[]; data: Record<string, Series> } | null = null, parLoading = false;
  let hoverId: number | string | null = null, hoverSrc = "";
  const byS = new Map<string, Props>();
  // Searchable names: from the list under the map when the page has it, otherwise from the map data once it loads.
  let names: { n: string; s: string; r: string }[] = [...root.querySelectorAll<HTMLButtonElement>("[data-pick]")].map((b) => ({ n: b.textContent!, s: b.dataset.pick!, r: "" }));

  const parse = (s: string) => Number(s.replace(/[^\d]/g, "")) || 0;
  const qLabel = (k: string) => { const [y, qq] = k.split("-Q"); return L.qfmt.replace("{q}", qq).replace("{y}", y); };
  const last = () => (P ? P.quarters.length - 1 : 0);

  // ---------------------------------------------------------------- expressions
  // Each metric gets its own value property on the features (set at load), its own height and a quantile colour scale.
  const val = (s: Series | undefined, m: Metric): number | null => {
    if (!s) return null; const v = s.m2[last()];
    if (m === "m2" || m === "price") return v ?? null;
    if (m === "growth") return s.g10 ?? null;
    return s.yield ?? null;
  };
  let breaks = {} as Record<Metric, number[]>;
  function quantiles(list: number[]) { const a = [...list].sort((x, y) => x - y); return [0.05, 0.25, 0.5, 0.75, 0.95].map((p) => a[Math.floor(p * (a.length - 1))]); }
  function heightExpr(): any {
    const k = KEY[metric], b = breaks[metric] || [];
    const h: any = metric === "m2" ? ["*", 2700, ["^", ["/", budget, ["get", "pv"]], 1 / 3]]  // cube root keeps 300 k€ and 10 M€ readable
      : metric === "price" ? ["*", 7, ["get", "pv"]] : metric === "growth" ? ["*", 190, ["max", ["get", "pg"], 0]] : metric === "yield" ? ["*", 4200, ["max", ["-", ["get", "py"], 1.5], 0.2]]
      : b.length && b[4] > b[0] ? ["interpolate", ["linear"], ["get", k], b[0], 1500, b[4], 38000] : 8000;
    return ["case", ["==", ["get", k], null], 0, h];
  }
  // Concelhos with parish data hand their height over to their parishes between zoom 8.2 and 8.7. (A layer maxzoom does not
  // work here: in a tilted view the near tiles load at a higher zoom and the concelhos would vanish early.)
  const HAND = [8.2, 8.7];
  function hfor(id: string): any {
    if (flat) return 0;
    if (id === "muni-3d-p") return ["interpolate", ["linear"], ["zoom"], HAND[0], heightExpr(), HAND[1], 0];
    if (id === "par-3d") return ["interpolate", ["linear"], ["zoom"], HAND[0], 0, HAND[1], heightExpr()];
    return heightExpr();
  }
  function colorExpr(): any {
    const k = KEY[metric];
    const b = breaks[metric] || []; const cols = metric === "m2" ? [...GREENS].reverse() : GREENS;  // more space = deeper green
    const stops: any[] = []; b.forEach((v, i) => { if (i === 0 || v > b[i - 1]) stops.push(v, cols[i]); });
    const scale = stops.length >= 4 ? ["interpolate", ["linear"], ["get", k], ...stops] : cols[2];
    return ["case", ["boolean", ["feature-state", "sel"], false], BRASS, ["boolean", ["feature-state", "hover"], false], "#b59a5e", ["==", ["get", k], null], NODATA, scale];
  }
  function paint() {
    if (!map || !map.getLayer("muni-3d")) return;
    for (const id of ["muni-3d", "muni-3d-p", "par-3d"]) {
      if (!map.getLayer(id)) continue;
      map.setPaintProperty(id, "fill-extrusion-height", hfor(id));
      map.setPaintProperty(id, "fill-extrusion-color", colorExpr());
    }
    root.querySelector<HTMLElement>("[data-legend]")!.textContent = L.legend[metric];
  }

  // ---------------------------------------------------------------- state ↔ URL
  function syncUrl() {
    const p = new URLSearchParams(location.search);
    p.set("budget", String(budget)); metric === "m2" ? p.delete("metric") : p.set("metric", metric);
    selected ? p.set("place", selected) : p.delete("place"); selPar ? p.set("parish", selPar) : p.delete("parish");
    history.replaceState(null, "", `${location.pathname}?${p}${location.hash}`);
  }
  const HIGH = 1e6;  // internal only (D52): from here the list brings the dearer places forward; never shown to the reader
  let lastHigh: boolean | null = null;
  function setBudget(b: number, fromInput = false, remember = false) {
    budget = Math.min(Math.max(b, 1000), 1e10);
    if (!fromInput) input.value = nf.format(Math.round(inLocal && fx ? budget * fx : budget));
    const lt = root.querySelector<HTMLElement>("[data-local-tpl]");
    if (lt && local && fx) lt.textContent = lt.dataset.localTpl!.replace("{local}", inLocal ? eur.format(budget) : local.format(budget * fx));
    root.querySelectorAll<HTMLElement>("tr[data-v]").forEach((tr) => { const td = tr.lastElementChild; if (td && tr.dataset.v) td.textContent = `${nf.format(Math.round(budget / Number(tr.dataset.v)))} m²`; });
    const high = budget >= HIGH;
    if (high !== lastHigh) {  // order only, nothing hidden: dearer places first for high budgets, A to Z otherwise
      lastHigh = high; const tb = root.querySelector("tbody");
      if (tb) [...tb.querySelectorAll<HTMLElement>("tr")].map((tr, i) => { tr.dataset.i ??= String(i); return tr; })
        .sort((a, b) => high ? Number(b.dataset.v || 0) - Number(a.dataset.v || 0) : Number(a.dataset.i) - Number(b.dataset.i)).forEach((tr) => tb.append(tr));
    }
    if (remember) try { localStorage.setItem("ip.budget", String(Math.round(budget))); } catch { /* private mode */ }
    paint(); refreshCard(); syncUrl();
  }
  function setCurrency(toLocal: boolean) {
    inLocal = toLocal && !!fx;
    root.querySelectorAll<HTMLButtonElement>("[data-cur-pick]").forEach((b) => b.setAttribute("aria-pressed", String((b.dataset.curPick !== "EUR") === inLocal)));
    const sign = root.querySelector<HTMLElement>("[data-cur-sign]"); if (sign) sign.textContent = inLocal ? cur : "€";
    setBudget(budget);
  }
  const readInput = () => { const v = parse(input.value); return inLocal && fx ? v / fx : v; };
  function setMetric(m: Metric) {
    metric = m;
    root.querySelectorAll<HTMLButtonElement>("[data-metric]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.metric === m)));
    const ls = root.querySelector<HTMLSelectElement>("[data-layer]"); if (ls) ls.value = ["sea", "vac", "new", "fr"].includes(m) ? m : "";
    paint(); syncUrl();
  }
  function setFlat(on: boolean) {
    flat = on; root.querySelector("[data-flat]")?.setAttribute("aria-pressed", String(on));
    if (map) { map.easeTo({ pitch: on ? 0 : 50, bearing: on ? 0 : map.getBearing(), duration: reduce() ? 0 : 700 }); map.dragRotate[on ? "disable" : "enable"](); }
    if (on) rotating = false;
    paint();
  }

  // ---------------------------------------------------------------- card
  function chart(s: Series): string {
    // Price per m² (left scale, ink) and rent per m² a month (right scale, green) on one hairline chart.
    const qs = P!.quarters, w = 520, h = 210, pl = 4, pr = 78, pt = 14, pb = 26;
    const x = (i: number) => pl + (i / (qs.length - 1)) * (w - pl - pr);
    const line = (vals: (number | null)[], hi: number, col: string, fmt: (v: number) => string, wd: number) => {
      let d = "", pen = false, end: [number, number] | null = null;
      vals.forEach((v, i) => { if (v == null) { pen = false; return; } const px = x(i), py = pt + (1 - v / hi) * (h - pt - pb); d += `${pen ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`; pen = true; end = [px, v]; });
      if (!end) return "";
      const [ex, ev] = end as [number, number];
      return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${wd}" stroke-linejoin="round"/><circle cx="${ex}" cy="${pt + (1 - ev / hi) * (h - pt - pb)}" r="3.5" fill="${col}"/><text x="${ex + 8}" y="${pt + (1 - ev / hi) * (h - pt - pb) + 4}" font-size="13" fill="${col}" font-family="Georgia, serif">${fmt(ev)}</text>`;
    };
    const pv = s.m2.filter((v): v is number => v != null), rv = s.rq.filter((v): v is number => v != null);
    let svg = `<svg viewBox="0 0 ${w} ${h}" class="lchart" role="img" aria-label="${L.chart}">`;
    svg += `<line x1="${pl}" x2="${w - pr}" y1="${h - pb}" y2="${h - pb}" stroke="#d4dbd5"/>`;
    qs.forEach((qq, i) => { if (qq.endsWith("Q1") && Number(qq.slice(0, 4)) % 2 === 0) svg += `<text x="${x(i)}" y="${h - 7}" font-size="12.5" fill="#5d6066" text-anchor="${i === 0 ? "start" : "middle"}">${qq.slice(0, 4)}</text>`; });
    const bi = qs.indexOf("2019-Q4");
    if (bi > 0 && s.m2[0] != null) svg += `<line x1="${x(bi)}" x2="${x(bi)}" y1="${pt}" y2="${h - pb}" stroke="#d4dbd5" stroke-dasharray="3 4"/>`;
    if (pv.length) svg += line(s.m2, Math.max(...pv) * 1.1, INK, (v) => eur.format(v), 2);
    if (rv.length) svg += line(s.rq, Math.max(...rv) * 1.9, "#1f4a3d", (v) => eur2.format(v), 1.6);
    return svg + "</svg>";
  }
  function showCard(slug: string) {
    const p = byS.get(slug); if (!p || !P) return;
    const s = P.munis[slug]; const i = last();
    const v = s?.m2[i] ?? null, m2 = v ? Math.round(budget / v) : null;
    const photo = cfg.photos[p.r] ? `<img src="/img/${cfg.photos[p.r]}-640.webp" alt="" width="640" height="427" loading="lazy">` : "";
    const sim = `${cfg.links.sim}?price=${budget}&own=0&resident=0&mortgage=0`;
    const qq = qLabel(P.quarters[i]);
    let h = `${photo}<div class="mapx-card-b"><p class="h-small">${L.regions[p.r] || ""}</p><h3 tabindex="-1">${p.n}</h3>`;
    h += m2 ? `<p class="mapx-big">${nf.format(m2)}<span> ${L.m2}</span></p><p class="small">${L.median.replace("{v}", eur.format(v!)).replace("{quarter}", qq)}</p>` : `<p class="small">${L.nodata}</p>`;
    // D52: for a high budget, the developer projects of this area come straight after the figures (nothing is hidden for others).
    if (!projLoaded && !projLoading) loadProjects().then(() => { if (selected === slug && projects.length) refreshCard(); });  // the card lists partners even with the layer off
    const here = projects.filter((x) => x.muni === slug);  // prompt 26 §1.4: the partner developers active in this area
    // Prompt 28 §2: "Partner developers here", each with its showcase page (the developer's homes, prices as published).
    if (here.length) {
      const devs = [...new Map(here.filter((x) => x.showcase).map((x) => [x.developer, x.showcase!])).entries()];
      const tgt = cfg.embed ? ` target="_top"` : "";
      h += `<div class="mapx-devs small"><p class="h-small">${L.partnersHere}</p>${devs.map(([d, u]) => `<p><a class="mapx-dev" href="${esc(u)}"${tgt}>${esc(d)} · ${L.openHomes}</a> <span class="tag">${L.sponsored}</span></p>`).join("")}`
        + `<p>${here.map((x) => `<button type="button" class="linkish" data-proj="${x.id}">${x.name}</button>`).join(" · ")}</p></div>`;
    }
    else if (budget >= HIGH && !cfg.embed) h += `<p class="mapx-devs small"><a href="${cfg.links.devHref}">${L.devs}</a></p>`;
    if (s && (s.m2.some((x) => x != null) || s.rq.some((x) => x != null))) {
      h += `<figure class="mapx-chart">${chart(s)}<figcaption class="small"><span class="k-ink">${L.price}</span> · <span class="k-green">${L.rent}</span></figcaption></figure><ul class="mapx-facts small">`;
      if (s.cagrP != null) h += `<li>${L.cagrP.replace("{v}", pc(s.cagrP))}</li>`;
      if (s.cagrP20 != null && s.cagrR != null) h += `<li>${L.gap.replace("{p}", pc(s.cagrP20)).replace("{r}", pc(s.cagrR)).replace("{d}", nf1.format(Math.abs(s.cagrP20 - s.cagrR)))}</li>`;
      if (s.yield != null) h += `<li>${L.yield.replace("{y}", nf1.format(s.yield) + "%").replace("{r}", nf1.format(cfg.mortgage.rate) + "%").replace("{month}", cfg.mortgage.month)}</li>`;
      if (s.mo) h += `<li>${L.mo.replace("{c4}", pc(s.mo.c4)).replace("{c8}", s.mo.c8 == null ? "—" : pc(s.mo.c8))} <strong>${L.mow[s.mo.w]}</strong></li>`;
      h += `</ul>`;
    }
    if (cfg.briefs[slug]) h += `<p class="mapx-brief">${cfg.briefs[slug]}</p>`;
    const ly = LY?.munis[slug];  // prompt 25 §4: INE facts on homes and residents, each with its period
    if (ly && Object.keys(ly).length) {
      h += `<p class="h-small mapx-fh">${L.fh}</p><ul class="mapx-facts small">`;
      if (ly.dom?.abroad && ly.dom?.pt) h += `<li>${L.fdom.replace("{a}", eur.format(ly.dom.abroad)).replace("{p}", eur.format(ly.dom.pt)).replace("{q}", qLabel(LY!.periods.dom))}</li>`;
      if (ly.sea != null) h += `<li>${L.fsea.replace("{v}", nf1.format(ly.sea))}</li>`;
      if (ly.vac != null) h += `<li>${L.fvac.replace("{v}", nf1.format(ly.vac))}</li>`;
      if (ly.area != null) h += `<li>${L.farea.replace("{v}", nf.format(Math.round(ly.area)))}</li>`;
      if (ly.new != null) h += `<li>${L.fnew.replace("{v}", nf.format(ly.new)).replace("{l}", nf.format(ly.lic ?? 0))}</li>`;
      if (ly.fr != null) h += `<li>${L.ffr.replace("{v}", nf.format(ly.fr)).replace("{b}", nf.format(ly.br ?? 0))}</li>`;
      h += `</ul>`;
    }
    if (s?.cmp?.length) h += `<p class="h-small">${L.cmp}</p><ul class="mapx-cmp">` + s.cmp.map((c) => { const o = P!.munis[c]; const ov = o?.m2[i]; return `<li><button type="button" data-goto="${c}">${o?.n ?? c}</button><span class="small">${ov ? `${nf.format(Math.round(budget / ov))} m²` : ""}</span></li>`; }).join("") + `</ul>`;
    h += actions(p.n, sim) + `<p class="mapx-more small">` + (cfg.links.pages.includes(slug) ? `<a href="${cfg.links.map}${slug}/">${L.page}</a>` : "")
      + (budget >= HIGH && cfg.privateHref ? `<a href="${cfg.privateHref}">${L.private}</a>` : "") + `<button type="button" class="linkish" data-share>${L.share}</button><button type="button" class="linkish" data-shareimg>${L.shareImg}</button></p>`
      + `<p class="small mapx-src">${L.source.replace("{quarter}", qq)} ${L.disclaimer}</p></div><button type="button" class="mapx-close" aria-label="${L.close}">×</button>`;
    openCard(h);
  }
  function actions(place: string, sim: string) {
    if (cfg.embed?.cta) return `<p class="mapx-actions"><a class="btn sm" href="${esc(cfg.embed.cta)}" target="_top">${cfg.embed.ctaLabel || L.homes}</a></p>`;
    if (root.dataset.mode === "embed") return `<p class="mapx-actions"><a class="btn sm" href="https://imoveisportugal.lu${cfg.links.buy}?place=${encodeURIComponent(place)}&budget=${budget}" target="_blank" rel="noopener">${L.homes}</a></p>`;
    return `<p class="mapx-actions"><a class="btn sm" href="${cfg.links.buy}?place=${encodeURIComponent(place)}&budget=${budget}">${L.homes}</a>`
      + (budget >= HIGH ? "" : `<a href="${cfg.links.devHref}">${L.devs}</a>`) + `<a href="${sim}">${L.sim}</a><a href="${cfg.links.journey}?budget=${Math.round(budget)}">${L.journey}</a></p>`;
  }
  function showParish(code: string) {
    const f = parishes?.feats.find((x) => x.properties.id === code); const s = parishes?.data[code]; if (!f || !s || !P) return;
    const i = last(), v = s.m2[i] ?? null, m2 = v ? Math.round(budget / v) : null, muni = byS.get(f.properties.m);
    const qq = qLabel(P.quarters[i]);
    let h = `<div class="mapx-card-b"><p class="h-small">${L.parishOf.replace("{m}", muni?.n ?? "")}</p><h3 tabindex="-1">${f.properties.n}</h3>`;
    h += m2 ? `<p class="mapx-big">${nf.format(m2)}<span> ${L.m2}</span></p><p class="small">${L.median.replace("{v}", eur.format(v!)).replace("{quarter}", qq)}</p>` : `<p class="small">${L.nodataPar}</p>`;
    h += `<figure class="mapx-chart">${chart(s)}<figcaption class="small"><span class="k-ink">${L.price}</span> · <span class="k-green">${L.rent}</span></figcaption></figure><ul class="mapx-facts small">`;
    if (s.yield != null) h += `<li>${L.yield.replace("{y}", nf1.format(s.yield) + "%").replace("{r}", nf1.format(cfg.mortgage.rate) + "%").replace("{month}", cfg.mortgage.month)}</li>`;
    if (s.mo) h += `<li>${L.mo.replace("{c4}", pc(s.mo.c4)).replace("{c8}", s.mo.c8 == null ? "—" : pc(s.mo.c8))} <strong>${L.mow[s.mo.w]}</strong></li>`;
    h += `</ul>` + actions(f.properties.n, `${cfg.links.sim}?price=${budget}&own=0&resident=0&mortgage=0`)
      + `<p class="mapx-more small"><button type="button" class="linkish" data-goto="${f.properties.m}">${L.openMuni}</button><button type="button" class="linkish" data-share>${L.share}</button></p>`
      + `<p class="small mapx-src">${L.source.replace("{quarter}", qq)} ${L.disclaimer}</p></div><button type="button" class="mapx-close" aria-label="${L.close}">×</button>`;
    openCard(h);
  }
  function openCard(h: string) {
    const wasHidden = card.hidden;
    card.innerHTML = h; card.hidden = false;
    card.querySelector(".mapx-close")!.addEventListener("click", () => { card.hidden = true; select(null); });
    card.querySelectorAll<HTMLButtonElement>("[data-goto]").forEach((b) => b.addEventListener("click", () => select(b.dataset.goto!)));
    card.querySelector("[data-share]")?.addEventListener("click", share);
    card.querySelectorAll<HTMLButtonElement>("[data-proj]").forEach((b) => b.addEventListener("click", () => { const p = projects.find((x) => x.id === b.dataset.proj); if (p) showProject(p); }));
    card.querySelector("[data-shareimg]")?.addEventListener("click", shareImage);
    if (wasHidden && root.contains(document.activeElement) && document.activeElement !== input) card.querySelector<HTMLElement>("h3")?.focus({ preventScroll: true });
  }
  const refreshCard = () => { if (selPar) showParish(selPar); else if (selected) showCard(selected); };

  async function share() {
    syncUrl();
    try { if (navigator.share) await navigator.share({ url: location.href }); else { await navigator.clipboard.writeText(location.href); flash(L.copied); } } catch { /* the reader closed the share sheet */ }
  }
  function flash(t: string) { const el = root.querySelector<HTMLElement>("[data-flash]"); if (!el) return; el.textContent = t; el.hidden = false; setTimeout(() => (el.hidden = true), 2200); }
  // A 1080 × 1350 image per place for social media: name, the m² for the budget, the median, the 10-year line and the source.
  async function shareImage() {
    if (!selected || !P) return; const s = P.munis[selected], p = byS.get(selected)!; const i = last();
    const c = document.createElement("canvas"); c.width = 1080; c.height = 1350; const g = c.getContext("2d")!;
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, 1080, 1350); g.fillStyle = "#1f4a3d"; g.fillRect(0, 0, 1080, 14);
    g.fillStyle = INK; g.font = "500 30px 'Public Sans', sans-serif"; g.fillText((L.regions[p.r] || "").toUpperCase(), 80, 130);
    g.font = "400 104px 'Newsreader Variable', Georgia, serif"; g.fillText(p.n, 80, 250, 920);
    const v = s?.m2[i];
    if (v) {
      g.font = "400 150px 'Newsreader Variable', Georgia, serif"; g.fillStyle = "#1f4a3d"; g.fillText(nf.format(Math.round(budget / v)) + " m²", 80, 440, 920);
      g.fillStyle = INK; g.font = "400 36px 'Public Sans', sans-serif"; g.fillText(L.imgFor.replace("{b}", eur.format(budget)), 80, 510, 920);
      g.fillText(L.median.replace("{v}", eur.format(v)).replace("{quarter}", qLabel(P.quarters[i])), 80, 565, 920);
    }
    const vals = (s?.m2 ?? []).map((x, k) => [k, x] as const).filter(([, x]) => x != null) as [number, number][];
    if (vals.length > 1) {
      const hi = Math.max(...vals.map(([, x]) => x)) * 1.1, X = (k: number) => 80 + (k / (P!.quarters.length - 1)) * 920, Y = (x: number) => 1120 - (x / hi) * 420;
      g.strokeStyle = "#d4dbd5"; g.lineWidth = 2; g.beginPath(); g.moveTo(80, 1120); g.lineTo(1000, 1120); g.stroke();
      g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); vals.forEach(([k, x], j) => (j ? g.lineTo(X(k), Y(x)) : g.moveTo(X(k), Y(x)))); g.stroke();
      g.fillStyle = "#5d6066"; g.font = "400 28px 'Public Sans', sans-serif"; g.fillText(P.quarters[vals[0][0]].slice(0, 4), 80, 1165); g.textAlign = "right"; g.fillText(P.quarters[i].slice(0, 4), 1000, 1165); g.textAlign = "left";
    }
    g.fillStyle = "#5d6066"; g.font = "400 26px 'Public Sans', sans-serif"; g.fillText(L.imgSrc, 80, 1250, 920);
    g.fillStyle = INK; g.font = "400 34px 'Newsreader Variable', Georgia, serif"; g.fillText("Imóveis Portugal", 80, 1300);
    const blob: Blob | null = await new Promise((r) => c.toBlob(r, "image/png"));
    if (!blob) return;
    const file = new File([blob], `imoveis-portugal-${selected}.png`, { type: "image/png" });
    try { if ((navigator as any).canShare?.({ files: [file] })) { await navigator.share({ files: [file] } as any); return; } } catch { return; }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = file.name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  // ---------------------------------------------------------------- selection
  function setState(src: string, id: number | string | null, key: string, on: boolean) { if (map && id != null && map.getSource(src)) map.setFeatureState({ source: src, id }, { [key]: on }); }
  function select(slug: string | null, opts: { fly?: boolean } = {}) {
    const prev = selected ? byS.get(selected) : null;
    if (prev) setState("munis", prev.id, "sel", false);
    if (selPar) setState("pars", selPar, "sel", false);
    selected = slug; selPar = null;
    const p = slug ? byS.get(slug) : null;
    if (p && map) {
      setState("munis", p.id, "sel", true);
      if (opts.fly !== false) { rotating = false; const wide = root.clientWidth >= 760; map.flyTo({ center: [p.x, p.y], zoom: Math.max(map.getZoom(), p.a < 40 ? 8.2 : 7.2), pitch: flat ? 0 : 32, duration: reduce() ? 0 : 1500, essential: true, padding: wide ? { right: 400, left: 0, top: 0, bottom: 0 } : { bottom: canvas.clientHeight * 0.45, top: 0, left: 0, right: 0 } }); }
    }
    syncUrl();
    if (slug) { showCard(slug); if (p) savePlace(p.n); } else card.hidden = true;
  }
  function selectParish(code: string) {
    if (selected) { const p = byS.get(selected); if (p) setState("munis", p.id, "sel", false); }
    if (selPar) setState("pars", selPar, "sel", false);
    const f = parishes?.feats.find((x) => x.properties.id === code); if (!f) return;
    selPar = code; selected = f.properties.m; setState("pars", code, "sel", true); syncUrl(); showParish(code);
  }

  // Picking: a click near the label point of a concelho too small to hit at this zoom selects it, even over a neighbour;
  // otherwise the polygon under the pointer (parish first); otherwise the nearest label point within 28 px.
  function pick(pt: { x: number; y: number }): { kind: "muni" | "par"; key: string } | null {
    const z = map.getZoom(), ppd = (512 * 2 ** z) / 360;
    const layers = [...(z >= 8.45 ? ["par-3d"] : []), "muni-3d", "muni-3d-p", "muni-base"].filter((l) => map.getLayer(l));
    const hit = map.queryRenderedFeatures([pt.x, pt.y], { layers })[0];
    const hp: Props | undefined = hit && !hit.layer.id.startsWith("par") ? byS.get(hit.properties.s) : undefined;
    const dh = hp ? (() => { const c = map.project([hp.x, hp.y]); return Math.hypot(c.x - pt.x, c.y - pt.y); })() : 1e9;
    // A concelho too small to hit at this zoom wins within 16 px of its label point, unless the pointer is closer to the
    // label point of the concelho under it (so a click on Covilhã stays on Covilhã next to Manteigas).
    let best: Props | null = null, bd = 1e9;
    for (const f of features) {
      const p: Props = f.properties; if (!visible(p) || p === hp) continue;
      const side = Math.sqrt(p.a * 1e-4) * ppd; if (side >= 26) continue;
      const c = map.project([p.x, p.y]); const d = Math.hypot(c.x - pt.x, c.y - pt.y);
      if (d < 16 && d < bd && d < dh * 0.6) { best = p; bd = d; }
    }
    if (best) return { kind: "muni", key: best.s };
    if (hit) return hit.layer.id.startsWith("par") ? { kind: "par", key: String(hit.properties.id) } : { kind: "muni", key: hit.properties.s };
    for (const f of features) { const p: Props = f.properties; if (!visible(p)) continue; const c = map.project([p.x, p.y]); const d = Math.hypot(c.x - pt.x, c.y - pt.y); if (d < 28 && d < bd) { best = p; bd = d; } }
    return best ? { kind: "muni", key: best.s } : null;
  }
  function visible(p: Props) {
    if (region && p.r !== region) return false;
    return filter === "all" || (filter === "coast" && p.coast) || (filter === "inland" && !p.coast) || (filter === "city" && p.city) || (filter === "country" && !p.city) || (filter === "air" && p.air);
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
    const f = conds.length > 1 ? conds : null;
    const hp = ["==", ["get", "hp"], true], nohp = ["==", ["get", "hp"], false];
    map.setFilter("muni-3d", f ? ["all", nohp, f] : nohp);
    map.setFilter("muni-3d-p", f ? ["all", hp, f] : hp);
    if (projOn) drawProjects();
  }

  // ---------------------------------------------------------------- loading
  function load(): Promise<void> {
    if (loading) return loading;
    loading = (async () => {
      if (!document.querySelector("link[data-maplibre]")) { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = mapCss; l.dataset.maplibre = ""; document.head.append(l); }
      const [mod, topo, prices, layers] = await Promise.all([import("maplibre-gl"), fetch("/data/map/munis.topo.json").then((r) => r.json()), fetch("/data/prices.json").then((r) => r.json()), fetch("/data/map/layers.json").then((r) => r.json()).catch(() => null)]);
      ml = mod.default; P = prices; LY = layers;
      const geo: any = feature(topo, topo.objects.m);
      const hasPar = new Set<string>(prices.parishMunis ?? []);
      geo.features.forEach((f: any) => {
        const s: Series | undefined = prices.munis[f.properties.s];
        f.id = f.properties.id; f.properties.pv = val(s, "price"); f.properties.pg = val(s, "growth"); f.properties.py = val(s, "yield"); f.properties.hp = hasPar.has(f.properties.s);
        const l = LY?.munis[f.properties.s] || {}; for (const k of ["sea", "vac", "new", "fr"]) f.properties[`l_${k}`] = l[k] ?? null;
        byS.set(f.properties.s, f.properties);
      });
      features = geo.features;
      names = features.map((f) => ({ n: f.properties.n, s: f.properties.s, r: f.properties.r })).sort((a, b) => a.n.localeCompare(b.n, "pt"));
      const vals = (k: string) => features.map((f) => f.properties[k]).filter((v: any) => v != null) as number[];
      breaks = Object.fromEntries((Object.keys(KEY) as Metric[]).map((m) => [m, quantiles(vals(KEY[m]))])) as Record<Metric, number[]>;
      const narrow = root.clientWidth < 600;
      const center = (root.dataset.center || "").split(",").map(Number);
      map = new ml.Map({
        container: canvas, attributionControl: false, dragRotate: !flat, pitchWithRotate: !flat, maxPitch: 70, minZoom: 4.5, maxZoom: 12.5,
        center: center.length === 3 ? [center[0], center[1]] : narrow ? [-8.55, 39.55] : [-8.55, 39.45], zoom: center.length === 3 ? center[2] : narrow ? 5.55 : 6.25,
        pitch: flat ? 0 : 50, bearing: flat ? 0 : -14,
        style: { version: 8, sources: {}, layers: [{ id: "bg", type: "background", paint: { "background-color": "#ffffff" } }] },
      });
      if (root.dataset.mode !== "embed") map.addControl(new ml.AttributionControl({ compact: true, customAttribution: L.credits }));  // the embed footer carries the credits
      map.addControl(new ml.NavigationControl({ showCompass: !flat, visualizePitch: true }), "bottom-right");
      await new Promise<void>((res) => map.on("load", () => res()));
      map.addSource("munis", { type: "geojson", data: geo });
      map.addLayer({ id: "muni-base", type: "fill", source: "munis", paint: { "fill-color": "#f1f4f1", "fill-outline-color": "#c9d3cb" } });
      const ext = (id: string) => map.addLayer({ id, type: "fill-extrusion", source: "munis", paint: {
        "fill-extrusion-color": colorExpr(), "fill-extrusion-height": hfor(id), "fill-extrusion-opacity": 0.93,
        "fill-extrusion-height-transition": { duration: reduce() ? 0 : 900, delay: 0 }, "fill-extrusion-color-transition": { duration: reduce() ? 0 : 600, delay: 0 },
      } as any });
      ext("muni-3d"); ext("muni-3d-p");
      map.addLayer({ id: "muni-line", type: "line", source: "munis", paint: { "line-color": ["case", ["boolean", ["feature-state", "sel"], false], BRASS, ["boolean", ["feature-state", "hover"], false], BRASS, "rgba(22,24,28,0.18)"],
        "line-width": ["case", ["boolean", ["feature-state", "sel"], false], 2.2, ["boolean", ["feature-state", "hover"], false], 1.6, 0.4] } });
      if (cfg.embed?.pin) {
        const [lon, lat, label] = cfg.embed.pin; const el = document.createElement("div"); el.className = "mapx-pin"; el.title = label; el.innerHTML = `<span>${label}</span>`;
        new ml.Marker({ element: el, anchor: "bottom" }).setLngLat([lon, lat]).addTo(map);
      }
      // The whole country, islands included: fit flat, then tilt; the tilt shortens the north, so a little zoom back in fills the frame.
      if (center.length !== 3) { const cam = map.cameraForBounds([[-12.45, 36.85], [-6.15, 42.2]], { padding: narrow ? 6 : 16, bearing: 0 }); if (cam) map.jumpTo({ center: flat ? cam.center : [cam.center.lng + (narrow ? 0.4 : 0.35), cam.center.lat - (narrow ? 0.3 : 0.45)], zoom: cam.zoom + (flat ? 0 : narrow ? -0.18 : 0.1), pitch: flat ? 0 : 50, bearing: flat ? 0 : -14 }); }
      root.classList.add("is-live");
      placeInsets(); applyFilter(); paint();
      if (projOn) drawProjects();
      const sel = selected, par = selPar;
      if (par) { await loadParishes(); selectParish(par); } else if (sel) select(sel);
      if (root.dataset.mode === "home" && !flat && !sel) { rotating = true; spin(); }
      map.on("move", placeInsets);
      map.on("zoomend", () => { if (map.getZoom() > 7.6) loadParishes(); });
      map.on("click", (e: any) => { const h = pick(e.point); if (!h) return; if (h.kind === "par") selectParish(h.key); else select(h.key, { fly: map.getZoom() < 7 }); });
      map.on("mousemove", (e: any) => hover(e.point));
      map.on("mouseout", () => hover(null));
      ["mousedown", "touchstart", "wheel"].forEach((ev) => canvas.addEventListener(ev, () => (rotating = false), { passive: true }));
    })();
    return loading;
  }
  function hover(pt: { x: number; y: number } | null) {
    const h = pt ? pick(pt) : null;
    const id = h ? (h.kind === "par" ? h.key : byS.get(h.key)?.id ?? null) : null, src = h?.kind === "par" ? "pars" : "munis";
    if (id === hoverId && src === hoverSrc) return;
    if (hoverId != null) setState(hoverSrc, hoverId, "hover", false);
    hoverId = id; hoverSrc = src; if (id != null) setState(src, id, "hover", true);
    map.getCanvas().style.cursor = h ? "pointer" : "";
    if (tip) {
      if (!h || !pt) { tip.hidden = true; return; }
      tip.textContent = h.kind === "par" ? parishes?.feats.find((f) => f.properties.id === h.key)?.properties.n ?? "" : byS.get(h.key)?.n ?? "";
      tip.style.transform = `translate(${pt.x + 12}px, ${pt.y - 28}px)`; tip.hidden = false;
    }
  }
  async function loadParishes() {
    if (parishes || parLoading || !map) return; parLoading = true;
    const [topo, data] = await Promise.all([fetch("/data/map/parishes.topo.json").then((r) => r.json()), fetch("/data/map/parishes.json").then((r) => r.json())]);
    const geo: any = feature(topo, topo.objects.p);
    geo.features.forEach((f: any) => { const s: Series = data.parishes[f.properties.id]; f.properties.pv = val(s, "price"); f.properties.pg = null; f.properties.py = val(s, "yield"); });
    parishes = { feats: geo.features, data: data.parishes };
    map.addSource("pars", { type: "geojson", data: geo, promoteId: "id" });
    map.addLayer({ id: "par-3d", type: "fill-extrusion", source: "pars", paint: { "fill-extrusion-color": colorExpr(), "fill-extrusion-height": hfor("par-3d"), "fill-extrusion-opacity": ["interpolate", ["linear"], ["zoom"], HAND[0], 0, HAND[1], 0.93],
      "fill-extrusion-height-transition": { duration: reduce() ? 0 : 900, delay: 0 } } as any }, "muni-line");
    map.addLayer({ id: "par-line", type: "line", source: "pars", paint: { "line-opacity": ["interpolate", ["linear"], ["zoom"], HAND[0], 0, HAND[1], 1], "line-color": ["case", ["boolean", ["feature-state", "sel"], false], BRASS, ["boolean", ["feature-state", "hover"], false], BRASS, "rgba(22,24,28,0.22)"], "line-width": ["case", ["boolean", ["feature-state", "sel"], false], 2, 0.5] } });
    paint();
  }
  function spin() { if (!rotating || !map) return; map.easeTo({ bearing: map.getBearing() + 6, duration: 4000, easing: (t: number) => t }); map.once("moveend", spin); }
  function placeInsets() {
    if (!map) return;
    for (const f of [["madeira", -11.0, 37.05], ["azores", -12.6, 40.75]] as [string, number, number][]) {
      const el = root.querySelector<HTMLElement>(`[data-inset="${f[0]}"]`); if (!el) continue;
      const p = map.project([f[1], f[2]]); el.style.transform = `translate(${p.x}px, ${p.y}px)`; el.hidden = false;
    }
  }


  // ---------------------------------------------------------------- developer layer (prompt 26 §1): partner projects only, labelled
  let projects: Project[] = [], projOn = false, markers: any[] = [], projLoaded = false;
  const devBtn = root.querySelector<HTMLButtonElement>("[data-devs]"), devBar = root.querySelector<HTMLElement>("[data-devbar]");
  // One load shared by the place card and the developer layer, so neither draws before the projects arrive.
  let projLoading: Promise<void> | null = null;
  function loadProjects() {
    return projLoading ??= (async () => {
      const list = [...(cfg.projects || [])];
      const demo = (q.get("demoproj") || "").replace(/[^a-z0-9-]/gi, "");
      if (demo) try { list.push(...(await fetch(`/d/${demo}/project.json`).then((r) => r.json()))); } catch { /* no demo project */ }
      projects = list; projLoaded = true;
    })();
  }
  const projOk = (p: Project) => {
    const t = devBar?.querySelector<HTMLSelectElement>("[data-ptyp]")?.value || "", mx = parse(devBar?.querySelector<HTMLInputElement>("[data-pmax]")?.value || "");
    const by = devBar?.querySelector<HTMLSelectElement>("[data-pdel]")?.value || "";
    return (!t || p.typologies.some((x) => x.startsWith(t))) && (!mx || (p.from ?? 0) <= mx) && (!by || (p.delivery || "9999") <= by) && (!region || byS.get(p.muni)?.r === region);
  };
  function drawProjects() {
    markers.forEach((m) => m.remove()); markers = [];
    const list = root.querySelector<HTMLElement>("[data-pnone]");
    if (!projOn || !map) { if (list) list.hidden = true; return; }
    const shown = projects.filter(projOk);
    if (list) list.hidden = shown.length > 0;
    for (const p of shown) {
      const el = document.createElement("button"); el.type = "button"; el.className = "mapx-proj";
      el.innerHTML = `<span>${p.name}<em>${L.sponsored}</em></span>`; el.setAttribute("aria-label", `${p.name} · ${p.developer} · ${L.sponsored}`);
      el.addEventListener("click", (e) => { e.stopPropagation(); showProject(p); });
      markers.push(new ml.Marker({ element: el, anchor: "bottom" }).setLngLat([p.lon, p.lat]).addTo(map));
    }
  }
  async function setProj(on: boolean) {
    projOn = on; devBtn?.setAttribute("aria-pressed", String(on)); if (devBar) devBar.hidden = !on;
    await load(); await loadProjects(); drawProjects();
  }
  function showProject(p: Project) {
    const s = P?.munis[p.muni], m = byS.get(p.muni), i = last();
    const price = p.from ? L.pfrom.replace("{v}", eur.format(p.from)) : L.ponreq;
    const sim = `${cfg.links.sim}?price=${p.from ?? budget}&own=0&resident=0&mortgage=0`;
    const ask = (to: "agency" | "developer") => to === "developer" && p.url ? `<a class="btn sm" href="${esc(p.url)}" target="_blank" rel="sponsored noopener">${L.paskdev}</a>`
      : `<a class="btn sm" href="${cfg.consult}?project=${encodeURIComponent(p.name)}&place=${encodeURIComponent(m?.n || "")}">${cfg.routing === "choice" ? L.paskag : L.pask}</a>`;
    const routing = cfg.routing || "agency";
    let h = p.render ? `<img src="${esc(p.render)}" alt="" width="640" height="400" loading="lazy">` : "";
    h += `<div class="mapx-card-b"><p class="h-small">${m?.n || ""} · <span class="tag">${L.sponsored}</span></p><h3 tabindex="-1">${p.name}</h3><p class="small">${p.developer}</p>`;
    h += `<p class="mapx-big mapx-big-s">${price}</p><ul class="mapx-facts small">`;
    if (p.typologies.length) h += `<li>${L.ptyp.replace("{v}", p.typologies.join(", "))}</li>`;
    if (p.delivery) h += `<li>${L.pdel.replace("{v}", p.delivery)}</li>`;
    h += `</ul>`;
    if (s) h += `<p class="h-small mapx-fh">${m?.n || ""}</p><figure class="mapx-chart">${chart(s)}<figcaption class="small"><span class="k-ink">${L.price}</span> · <span class="k-green">${L.rent}</span></figcaption></figure>`
      + (s.m2[i] ? `<p class="small">${L.median.replace("{v}", eur.format(s.m2[i]!)).replace("{quarter}", qLabel(P!.quarters[i]))}${s.yield != null ? ` · ${L.yield.split(".")[0].replace("{y}", nf1.format(s.yield) + "%")}.` : ""}</p>` : "");
    h += `<p class="mapx-actions">${routing === "choice" ? ask("agency") + ask("developer") : ask(routing)}<a href="${sim}">${L.psim}</a></p>`;
    if (p.credit) h += `<p class="small mapx-src">${L.pcredit.replace("{c}", esc(p.credit))}</p>`;
    h += `</div><button type="button" class="mapx-close" aria-label="${L.close}">×</button>`;
    openCard(h);
    if (map) map.flyTo({ center: [p.lon, p.lat], zoom: Math.max(map.getZoom(), 9.6), pitch: flat ? 0 : 45, duration: reduce() ? 0 : 1400, essential: true });
  }
  devBtn?.addEventListener("click", () => setProj(!projOn));
  devBar?.querySelectorAll("select,input").forEach((el) => el.addEventListener("change", drawProjects));
  if (q.get("devs") === "1" || q.get("demoproj")) setProj(true);
  // ---------------------------------------------------------------- search ("Procurar concelho"): a combobox over the 308 names
  const sIn = root.querySelector<HTMLInputElement>("[data-find]"), sList = root.querySelector<HTMLUListElement>("[data-find-list]");
  if (sIn && sList) {
    let hits: typeof names = [], active = -1;
    const render = () => {
      sList.innerHTML = hits.map((m, k) => `<li role="option" id="${sList.id}-${k}" data-s="${m.s}" aria-selected="${k === active}">${m.n}${m.r ? `<span class="small"> · ${L.regions[m.r]}</span>` : ""}</li>`).join("")
        + (sIn.value.trim() && !hits.length ? `<li class="none" aria-disabled="true">${L.nomatch}</li>` : "");
      sList.hidden = !sIn.value.trim(); sIn.setAttribute("aria-expanded", String(!sList.hidden));
      active >= 0 ? sIn.setAttribute("aria-activedescendant", `${sList.id}-${active}`) : sIn.removeAttribute("aria-activedescendant");
    };
    const go = (s: string) => {
      if (s.startsWith("p:")) { const p = projects.find((x) => x.id === s.slice(2)); if (p) { sIn.value = p.name; sList.hidden = true; showProject(p); } return; }
      const m = names.find((x) => x.s === s) ?? (byS.get(s) as any); if (!m) return; sIn.value = m.n; sList.hidden = true; sIn.setAttribute("aria-expanded", "false"); load().then(() => select(s)); };
    const find = () => {
      const t = plain(sIn.value.trim()); active = -1;
      const pool = projOn ? [...projects.map((p) => ({ n: `${p.name} · ${p.developer}`, s: `p:${p.id}`, r: "" })), ...names] : names;
      hits = t ? pool.filter((m) => plain(m.n).includes(t)).sort((a, b) => Number(!plain(a.n).startsWith(t)) - Number(!plain(b.n).startsWith(t))).slice(0, 8) : [];
      if (hits.length) active = 0; render();
    };
    sIn.addEventListener("input", () => { find(); if (!features.length) load().then(find); });
    sIn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" && hits.length) { active = (active + 1) % hits.length; render(); e.preventDefault(); }
      else if (e.key === "ArrowUp" && hits.length) { active = (active - 1 + hits.length) % hits.length; render(); e.preventDefault(); }
      else if (e.key === "Enter" && hits[active]) { go(hits[active].s); e.preventDefault(); }
      else if (e.key === "Escape") { sList.hidden = true; sIn.setAttribute("aria-expanded", "false"); }
    });
    sList.addEventListener("mousedown", (e) => { const li = (e.target as HTMLElement).closest<HTMLElement>("li[data-s]"); if (li) { e.preventDefault(); go(li.dataset.s!); } });
    sIn.addEventListener("blur", () => setTimeout(() => { sList.hidden = true; sIn.setAttribute("aria-expanded", "false"); }, 150));
  }
  root.addEventListener("keydown", (e) => { if (e.key === "Escape" && !card.hidden) { card.hidden = true; select(null); } });

  // ---------------------------------------------------------------- controls
  input.addEventListener("change", () => { setBudget(readInput(), false, true); load(); });
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") { setBudget(readInput(), false, true); load(); } });
  root.querySelectorAll<HTMLButtonElement>("[data-cur-pick]").forEach((b) => b.addEventListener("click", () => setCurrency(b.dataset.curPick !== "EUR")));
  root.querySelectorAll<HTMLButtonElement>("[data-metric]").forEach((b) => b.addEventListener("click", () => { setMetric(b.dataset.metric as Metric); load(); }));
  const layerSel = root.querySelector<HTMLSelectElement>("[data-layer]");
  layerSel?.addEventListener("change", () => { setMetric((layerSel.value || "m2") as Metric); load(); });
  root.querySelector<HTMLButtonElement>("[data-flat]")?.addEventListener("click", () => { setFlat(!flat); load(); });
  root.querySelectorAll<HTMLButtonElement>("[data-filter]").forEach((b) => b.addEventListener("click", () => {
    filter = b.dataset.filter!; root.querySelectorAll("[data-filter]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); load().then(applyFilter);
  }));
  root.querySelector<HTMLSelectElement>("[data-region]")?.addEventListener("change", (e) => { region = (e.target as HTMLSelectElement).value; load().then(applyFilter); });
  root.querySelector<HTMLInputElement>("[data-search]")?.addEventListener("input", (e) => {
    const t = plain((e.target as HTMLInputElement).value.trim());
    root.querySelectorAll<HTMLElement>("tr[data-v]").forEach((tr) => (tr.hidden = !!t && !plain(tr.querySelector("[data-pick]")!.textContent!).includes(t)));
  });
  root.querySelectorAll<HTMLButtonElement>("[data-pick]").forEach((b) => b.addEventListener("click", () => { load().then(() => select(b.dataset.pick!)); root.scrollIntoView({ behavior: reduce() ? "auto" : "smooth" }); }));

  // When to load the live map: first interaction with it (map page), or in view (home page).
  const go = () => load();
  if (root.dataset.mode === "home") {
    // Home: only once the reader has scrolled and the map is well in view, so the first screen stays light;
    // the idle rotation pauses whenever the map leaves the screen.
    let scrolled = false, inView = false;
    const tryGo = () => { if (scrolled && inView) go(); };
    addEventListener("scroll", () => { scrolled = true; tryGo(); }, { once: true, passive: true });
    root.addEventListener("pointerdown", go, { once: true, passive: true });
    new IntersectionObserver((es) => {
      inView = es.some((e) => e.isIntersecting);
      if (map && !inView) rotating = false;
      else if (map && inView && !rotating && !flat && !selected) { rotating = true; spin(); }
      tryGo();
    }, { threshold: 0.35 }).observe(root);
  } else {
    ["pointerdown", "touchstart", "focusin", "wheel"].forEach((ev) => root.addEventListener(ev, go, { once: true, passive: true }));
    addEventListener("scroll", go, { once: true, passive: true });
    if (q.has("place") || q.has("budget") || q.has("parish") || root.dataset.mode === "embed") go();
  }
  root.querySelectorAll<HTMLButtonElement>("[data-metric]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.metric === metric)));
  root.querySelector("[data-flat]")?.setAttribute("aria-pressed", String(flat));
  // D52: the field starts in the reader's own currency where the edition has one (CHF, USD, BRL, ILS).
  if (cur && fx) setCurrency(true); else setBudget(budget);
  // For the automated click check (scripts/map-data/clicktest.mjs): project a concelho's label point to the screen.
  (root as any).__mapx = { load, pick: (x: number, y: number) => pick({ x, y }), project: (s: string) => { const p = byS.get(s); return p && map ? map.project([p.x, p.y]) : null; }, map: () => map, selected: () => selected, slugs: () => features.map((f) => f.properties.s) };
}
