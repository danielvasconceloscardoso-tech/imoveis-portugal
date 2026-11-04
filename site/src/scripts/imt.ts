// The IMT screen (prompt 69, components/ImtSheet.astro): one sheet over whatever the reader was looking at, opened by any
// [data-imt] element (its value is the price; data-imt-from names the surface: sim1, concierge, map, project). The
// numbers are the reader's own, from lib/sims.ts; nothing is stored or sent but the event (a budget band, never the price).
// The state is a link: ?imt=<price> opens it on load.
import { imt, type Bracket } from "../lib/sims";
import { budgetBand } from "../lib/sim1";
import { ev } from "../lib/track";

const esc = (t: string) => t.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
export const IMT_FROM = ["sim1", "concierge", "map", "project", "link"];

type D = { loc: string; L: Record<string, string>; SRC: { nr: string; back: string; res: string; list: { t: string; u: string; d: string }[] }; checked: string[];
  calc: string; table: Bracket[]; flatFrom: number; nrRate: number };

export function initImt() {
  const sh = document.querySelector<HTMLElement>("[data-imt-sheet]"), back = document.querySelector<HTMLElement>("[data-imt-back]");
  if (!sh || !back || (sh as any).__imt) return;
  (sh as any).__imt = true;
  const D: D = JSON.parse(sh.querySelector("[data-imt-data]")!.textContent || "{}");
  const L = D.L, body = sh.querySelector<HTMLElement>("[data-imt-body]")!, box = sh.querySelector<HTMLElement>(".sh-in")!;
  const opt = { maximumFractionDigits: 0, useGrouping: "always" } as Intl.NumberFormatOptions;
  const eur = new Intl.NumberFormat(D.loc, { style: "currency", currency: "EUR", ...opt });
  const num = new Intl.NumberFormat(D.loc, opt);
  const pct = (v: number) => `${new Intl.NumberFormat(D.loc, { maximumFractionDigits: 4 }).format(v)}${D.loc.startsWith("fr") ? " %" : "%"}`;
  const fill = (t: string, v: Record<string, string>) => t.replace(/\{(\w+)\}/g, (m, k) => (k in v ? v[k] : m));
  const slow = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  let price = 300000, from = "link", lastFocus: HTMLElement | null = null, hideT = 0, io: IntersectionObserver | null = null;

  // The resident, primary-home figure, split as the code splits it (art. 17.º n.º 3): the part up to the previous
  // bracket's limit at that limit's average rate, the excess at the marginal rate. Above the table, a flat rate.
  function split(p: number) {
    let prevTop = 0, prevAvg = 0;
    for (let k = 0; k < D.table.length; k++) {
      const [top, marg, avg] = D.table[k];
      if (p <= top) return { k, prevTop, a: (prevTop * prevAvg) / 100, marg, b: ((p - prevTop) * marg) / 100 };
      prevTop = top; prevAvg = avg ?? 0;
    }
    return { k: p > D.flatFrom ? D.table.length + 1 : D.table.length, flat: p > D.flatFrom ? D.nrRate : 6 };
  }
  function html() {
    const nr = imt(price, false, false), res = imt(price, true, true), backAmt = Math.max(0, nr - res), s = split(price);
    const P = eur.format(price);
    const rows = D.table.map(([top, marg], k) => `<tr${s.k === k ? ' class="is-you"' : ""}><td>${esc(L["imt.col.to"])} ${esc(eur.format(top))}</td><td>${esc(pct(marg))}</td></tr>`).join("")
      + `<tr${s.k === D.table.length ? ' class="is-you"' : ""}><td>${esc(L["imt.col.to"])} ${esc(eur.format(D.flatFrom))}</td><td>${esc(fill(L["imt.col.flat"], { rate: pct(6) }))}</td></tr>`
      + `<tr${s.k === D.table.length + 1 ? ' class="is-you"' : ""}><td>${esc(fill(L["imt.col.above"], { v: eur.format(D.flatFrom) }))}</td><td>${esc(fill(L["imt.col.flat"], { rate: pct(D.nrRate) }))}</td></tr>`;
    const yours = "flat" in s
      ? fill(L["imt.res.flat"], { price: P, rate: pct(s.flat!) })
      : s.k === 0 ? fill(L["imt.res.flat"], { price: P, rate: pct(0) })
      : fill(L["imt.res.yours"], { price: P, a: eur.format(Math.round(s.a!)), top: eur.format(s.prevTop!), rate: pct(s.marg!), rest: eur.format(price - s.prevTop!), b: eur.format(Math.round(s.b!)) });
    const more = backAmt > 0
      ? fill(L["imt.more"], { price: P, back: eur.format(Math.round(backAmt)), nr: eur.format(Math.round(nr)), res: eur.format(Math.round(res)) })
      : fill(L["imt.more.none"], { top: eur.format(D.flatFrom) });
    const src = (t: string) => `<p class="imt-src">${esc(t)}</p>`;
    return `<section class="imt-blk" data-imt-row="nr"><h3>${esc(L["imt.nr.k"])}</h3><p class="imt-big" data-imt-o="nr">${esc(eur.format(Math.round(nr)))}</p><p>${esc(L["imt.nr.p"])}</p>${src(D.SRC.nr)}</section>
      <section class="imt-blk" data-imt-row="back"><h3>${esc(L["imt.back.k"])}</h3><ol class="imt-routes"><li>${esc(L["imt.back.1"])}</li><li>${esc(L["imt.back.2"])}</li></ol><p>${esc(L["imt.back.p"])}</p>${src(D.SRC.back)}</section>
      <section class="imt-blk" data-imt-row="res"><h3>${esc(L["imt.res.k"])}</h3><p class="imt-big" data-imt-o="res">${esc(eur.format(Math.round(res)))}</p><p>${esc(yours)}</p>
        <table class="imt-tab"><thead><tr><th scope="col">${esc(L["imt.col.to"])}</th><th scope="col">${esc(L["imt.col.rate"])}</th></tr></thead><tbody>${rows}</tbody></table>
        <p class="imt-note">${esc(L["imt.res.p"])}</p>${src(D.SRC.res)}</section>
      <section class="imt-blk imt-more" data-imt-more><h3>${esc(L["imt.more.k"])}</h3><p data-imt-o="more">${esc(more)}</p></section>
      <section class="imt-blk imt-srcs"><h3>${esc(L["imt.src.k"])}</h3><ul>${D.SRC.list.map((x, k) => `<li><a href="${esc(x.u)}" target="_blank" rel="noopener">${esc(x.t)}</a>, ${esc(D.checked[k] ?? "")}</li>`).join("")}</ul>
        <p class="imt-disc">${esc(L["imt.disc"])}</p><p><a class="imt-calc" data-imt-calc href="${esc(`${D.calc}?price=${price}&own=0&resident=0`)}">${esc(L["imt.calc"])} →</a></p></section>`;
  }
  // The heading and the price field are drawn once per opening; the figures under them follow the price as it is typed.
  function draw(focus: boolean) {
    body.innerHTML = `<h2 id="imt-h" class="imt-h" tabindex="-1"></h2><p class="imt-lede">${esc(L["imt.what"])}</p>
      <label class="imt-price"><span>${esc(L["imt.price"])} (€)</span><input type="text" inputmode="numeric" autocomplete="off" data-imt-in value="${esc(num.format(price))}" /></label><div data-imt-out></div>`;
    const inp = body.querySelector<HTMLInputElement>("[data-imt-in]")!;
    let t = 0;
    inp.addEventListener("input", () => {
      const v = Number(inp.value.replace(/\D/g, ""));
      clearTimeout(t);
      if (v >= 10000 && v <= 50e6) { price = v; t = window.setTimeout(() => { figures(); url(true); ev({ event: "imt/price", band: budgetBand(price), origin: from }); }, 300); }
    });
    inp.addEventListener("blur", () => { inp.value = num.format(price); });
    figures();
    if (focus) body.querySelector<HTMLElement>(".imt-h")?.focus({ preventScroll: true });
  }
  function figures() {
    body.querySelector(".imt-h")!.textContent = fill(L["imt.h"], { price: eur.format(price) });
    body.querySelector("[data-imt-out]")!.innerHTML = html();
    body.querySelector("[data-imt-calc]")?.addEventListener("click", () => ev({ event: "imt/calc", band: budgetBand(price), origin: from }));
    io?.disconnect();
    const more = body.querySelector("[data-imt-more]");
    if (more && "IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io?.disconnect(); ev({ event: "imt/more", band: budgetBand(price), origin: from }); } }, { root: box, threshold: 0.6 });
      io.observe(more);
    }
  }
  function url(on: boolean) {
    const p = new URLSearchParams(location.search);
    on ? p.set("imt", String(price)) : p.delete("imt");
    history.replaceState(history.state, "", `${location.pathname}${p.size ? `?${p}` : ""}${location.hash}`);
  }
  function open(p: number, f: string) {
    clearTimeout(hideT);
    price = p >= 10000 && p <= 50e6 ? Math.round(p) : 300000; from = IMT_FROM.includes(f) ? f : "link";
    lastFocus = document.activeElement as HTMLElement;
    box.scrollTop = 0; draw(false);
    sh!.hidden = false; back!.hidden = false; document.documentElement.classList.add("sh-lock");
    requestAnimationFrame(() => requestAnimationFrame(() => { sh!.classList.add("is-open"); back!.classList.add("is-open"); body.querySelector<HTMLElement>(".imt-h")?.focus({ preventScroll: true }); }));
    url(true);
    ev({ event: `imt/open/${from}`, band: budgetBand(price), origin: from });
  }
  function close() {
    if (sh!.hidden) return;
    sh!.classList.remove("is-open"); back!.classList.remove("is-open");
    // The Concierge sheet may still be open underneath: the page stays locked while it is.
    if (!document.querySelector("[data-cg-sheet].is-open")) document.documentElement.classList.remove("sh-lock");
    hideT = window.setTimeout(() => { sh!.hidden = true; back!.hidden = true; }, slow() ? 0 : 320);
    io?.disconnect(); url(false); lastFocus?.focus({ preventScroll: true });
  }
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest?.<HTMLElement>("[data-imt]");
    if (!a || sh.contains(a) || (e as MouseEvent).metaKey || (e as MouseEvent).ctrlKey) return;
    e.preventDefault(); e.stopPropagation();
    open(Number(a.dataset.imt), a.dataset.imtFrom || "link");
  }, true);
  sh.querySelector("[data-imt-x]")!.addEventListener("click", close);
  back.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !sh.hidden) { e.stopPropagation(); close(); } }, true);
  const q = Number(new URLSearchParams(location.search).get("imt"));
  if (q) open(q, "link");
}
