// The site chrome (prompt 35 §3.3-3.4): one search for everything (⌘K or the magnifier) and the concierge sheet.
import { initFlow } from "./flow";

const plain = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const esc = (t: string) => t.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

export function initChrome() {
  // ------------------------------------------------------------ search
  const fd = document.querySelector<HTMLElement>("[data-find]");
  const mapSpot = () => document.querySelector<HTMLElement>('[data-m3][data-mode="page"] [data-spot-open]');
  if (fd) {
    const L = JSON.parse(fd.dataset.labels || "{}");
    const inp = fd.querySelector<HTMLInputElement>("[data-find-in]")!, res = fd.querySelector<HTMLUListElement>("[data-find-res]")!;
    let idx: [string, string, string, string?][] | null = null, hits: typeof idx = [], act = 0;
    const order = ["page", "place", "step", "sim", "faq"];
    const load = async () => { idx ??= await fetch(fd.dataset.index!).then((r) => r.json()).catch(() => []); };
    const find = () => {
      const t = plain(inp.value.trim()); act = 0;
      if (!t || !idx) { res.innerHTML = ""; return; }
      const sc = (n: string) => { const p = plain(n); return p.startsWith(t) ? 0 : p.includes(` ${t}`) ? 1 : p.includes(t) ? 2 : 9; };
      hits = idx.map((x) => [x, sc(x[1])] as const).filter(([, s]) => s < 9).sort((a, b) => a[1] - b[1] || order.indexOf(a[0][0]) - order.indexOf(b[0][0])).slice(0, 14).map(([x]) => x);
      hits.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
      let g = "", h = "";
      hits.forEach((x, i) => { if (x[0] !== g) { g = x[0]; h += `<li class="fd-g" role="presentation">${esc(L[g])}</li>`; } h += `<li role="option" id="fd-${i}" aria-selected="${i === 0}"><a href="${esc(x[2])}">${esc(x[1])}${x[3] ? `<span>${esc(x[3])}</span>` : ""}</a></li>`; });
      res.innerHTML = hits.length ? h : `<li class="fd-none">${esc(L.none)}</li>`;
      hits.length ? inp.setAttribute("aria-activedescendant", "fd-0") : inp.removeAttribute("aria-activedescendant");
    };
    const mark = () => { res.querySelectorAll("[role=option]").forEach((li, i) => li.setAttribute("aria-selected", String(i === act))); inp.setAttribute("aria-activedescendant", `fd-${act}`); res.querySelector(`#fd-${act}`)?.scrollIntoView({ block: "nearest" }); };
    const open = async () => {
      const ms = mapSpot(); if (ms) { ms.click(); return; }  // on the map page, the map's own search (it also finds golf, beaches, parishes)
      fd.hidden = false; requestAnimationFrame(() => fd.classList.add("is-open")); inp.value = ""; res.innerHTML = ""; inp.focus(); await load(); find();
    };
    const close = () => { fd.classList.remove("is-open"); setTimeout(() => (fd.hidden = true), 200); };
    document.querySelectorAll("[data-find-open]").forEach((b) => b.addEventListener("click", open));
    inp.addEventListener("input", async () => { await load(); find(); });
    inp.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { act = Math.min(act + 1, (hits?.length ?? 1) - 1); mark(); e.preventDefault(); }
      else if (e.key === "ArrowUp") { act = Math.max(act - 1, 0); mark(); e.preventDefault(); }
      else if (e.key === "Enter") { const a = res.querySelector<HTMLAnchorElement>(`#fd-${act} a`); if (a) location.href = a.href; e.preventDefault(); }
      else if (e.key === "Escape") close();
    });
    fd.addEventListener("click", (e) => { if (e.target === fd) close(); });
    addEventListener("keydown", (e) => {
      if (mapSpot()) return;  // the map page handles ⌘K itself
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !(e.target as HTMLElement).closest("input,textarea,[contenteditable]"))) { e.preventDefault(); fd.hidden ? open() : close(); }
    });
  }

  // ------------------------------------------------------------ the concierge sheet
  const sh = document.querySelector<HTMLElement>("[data-sheet]"), back = document.querySelector<HTMLElement>("[data-sheet-back]");
  if (!sh || !back) return;
  const flowEl = sh.querySelector<HTMLElement>("[data-flow]")!;
  let flow: ReturnType<typeof initFlow> | null = null, lastFocus: HTMLElement | null = null;
  const open = (e?: Event) => {
    e?.preventDefault(); lastFocus = document.activeElement as HTMLElement;
    flow ??= initFlow(flowEl, { param: "concierge" });
    if (!new URLSearchParams(location.search).has("concierge")) flow.go(flow.at());
    sh.hidden = false; back.hidden = false; document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => { sh.classList.add("is-open"); back.classList.add("is-open"); flow!.focus(); });
  };
  const close = () => {
    sh.classList.remove("is-open"); back.classList.remove("is-open"); document.documentElement.style.overflow = "";
    setTimeout(() => { sh.hidden = true; back.hidden = true; }, 280); flow?.clearUrl(); lastFocus?.focus({ preventScroll: true });
  };
  // Every link to the concierge page opens the sheet instead, over what the reader was looking at (the page stays as a link).
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-concierge], a[href]");
    if (!a || sh.contains(a) || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const cg = document.querySelector<HTMLAnchorElement>("a[data-concierge]");
    if (a.hasAttribute("data-concierge") || (cg && a.pathname === cg.pathname && a.origin === location.origin)) {
      // A place or budget carried by the link (the map card) becomes the flow's prefill.
      const u = new URL(a.href); const p = new URLSearchParams(location.search); let changed = false;
      for (const k of ["place", "budget"]) { const v = u.searchParams.get(k); if (v) { p.set(k, v); changed = true; } }
      if (changed) history.replaceState(null, "", `${location.pathname}?${p}${location.hash}`);
      if (changed && flow) { flowEl.querySelector("[data-flow-stage]")!.innerHTML = ""; (flowEl as any).__flow = null; flow = null; }
      open(e);
    }
  });
  sh.querySelector("[data-sheet-x]")!.addEventListener("click", close);
  back.addEventListener("click", close);
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !sh.hidden) close(); });
  { // mobile: drag the grabber down to close
    const grab = sh.querySelector<HTMLElement>(".sh-grab")!; let y0 = 0, on = false;
    sh.querySelector(".sh-top")!.addEventListener("pointerdown", (e) => { const pe = e as PointerEvent; if ((pe.target as HTMLElement).closest("button")) return; on = true; y0 = pe.clientY; sh.style.transition = "none"; });
    addEventListener("pointermove", (e) => { if (on) sh.style.transform = `translateY(${Math.max(0, e.clientY - y0)}px)`; });
    addEventListener("pointerup", (e) => { if (!on) return; on = false; sh.style.transition = ""; sh.style.transform = ""; if (e.clientY - y0 > 120) close(); });
    void grab;
  }
  if (new URLSearchParams(location.search).has("concierge")) open();
}
