// The flow engine (prompt 35 §3, D61): one question per screen, large choices that advance by themselves, our own
// controls (no browser selects, checkboxes or outlined boxes), every step a link (?step=3 on a page, ?concierge=3 in the
// sheet), answers kept only in this tab (sessionStorage) and sent once, with the consent, to /api/request.
// If the endpoint is not configured or fails, the request opens as a ready-written email to the brand mailbox.
import type { FlowConfig, Step } from "../lib/flows";

const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (t: string) => t.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
const CHECK = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7"/></svg>`;
const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`;

export function initFlow(root: HTMLElement, opts: { param: string; onClose?: () => void } = { param: "step" }) {
  const F: FlowConfig = JSON.parse(root.querySelector("[data-flow-cfg]")!.textContent || "{}");
  const L = F.labels, steps = F.steps, N = steps.length;
  const key = `ip.flow.${F.id}`;
  const stage = root.querySelector<HTMLElement>("[data-flow-stage]")!;
  let A: Record<string, string> = {};
  try { A = JSON.parse(sessionStorage.getItem(key) || "{}"); } catch { /* private mode */ }
  const save = () => { try { sessionStorage.setItem(key, JSON.stringify(A)); } catch { /* private mode */ } };
  let i = 0, dir = 1;

  // Prefills: the edition, the reader's language, the budget and place from the map or the path, a partner category.
  const q = new URLSearchParams(location.search);
  const budgetEur = Number(q.get("budget")) || (() => { try { return Number(localStorage.getItem("ip.budget")) || 0; } catch { return 0; } })();
  const places = (() => { try { return JSON.parse(localStorage.getItem("ip.places") || "[]") as string[]; } catch { return []; } })();
  const pre: Record<string, string> = {
    edition: F.hidden.edition, lang: F.hidden.language, cat: q.get("cat") || "",
    budget: budgetEur ? (budgetEur <= 300000 ? "1" : budgetEur <= 1e6 ? "2" : budgetEur <= 5e6 ? "3" : "4") : "",
    place: q.get("place") || places[0] || "",
  };
  for (const s of steps) if ("prefill" in s && s.prefill && !A[s.id] && pre[s.prefill]) A[s.id] = pre[s.prefill];

  function url(n: number | null) {
    const p = new URLSearchParams(location.search);
    n == null ? p.delete(opts.param) : p.set(opts.param, String(n + 1));
    history.replaceState(null, "", `${location.pathname}${p.size ? `?${p}` : ""}${location.hash}`);
  }
  const head = () => `<div class="fl-head"><button type="button" class="fl-back" data-back ${i === 0 ? "hidden" : ""} aria-label="${esc(L.back)}">${ARROW}</button>
    <div class="fl-prog" role="progressbar" aria-label="${esc(F.title)}" aria-valuemin="1" aria-valuemax="${N}" aria-valuenow="${Math.min(i + 1, N)}"><span style="width:${(Math.min(i + 1, N) / N) * 100}%"></span></div>
    <span class="fl-of">${esc(L.of.replace("{i}", String(Math.min(i + 1, N))).replace("{n}", String(N)))}</span></div>`;

  function body(s: Step): string {
    if (s.type === "choice") return `<div class="fl-opts${s.row || s.opts.length <= 3 ? " fl-row" : ""}" role="radiogroup" aria-labelledby="fl-q">${s.opts.map((o) =>
      `<button type="button" class="fl-opt" role="radio" aria-checked="${A[s.id] === o.v}" data-v="${esc(o.v)}"><span>${esc(o.l)}</span><i>${CHECK}</i></button>`).join("")}</div>`;
    if (s.type === "text") {
      const chips = s.prefill === "place" ? places.slice(0, 4).filter(Boolean) : [];
      return `${s.multi ? `<textarea class="fl-in fl-area" data-in rows="4" placeholder="${esc(s.ph)}" aria-labelledby="fl-q">${esc(A[s.id] || "")}</textarea>`
        : `<input class="fl-in" data-in type="text" autocomplete="off" placeholder="${esc(s.ph)}" value="${esc(A[s.id] || "")}" aria-labelledby="fl-q" />`}
        ${chips.length ? `<div class="fl-chips">${chips.map((c) => `<button type="button" class="fl-chip" data-chip="${esc(c)}">${esc(c)}</button>`).join("")}</div>` : ""}
        <div class="fl-go"><button type="button" class="fl-btn" data-next>${esc(L.next)}</button>${s.optional ? `<button type="button" class="fl-link" data-skip>${esc(L.skip)}</button>` : ""}</div>`;
    }
    if (s.type === "contact") return `<div class="fl-fields">
        <label class="fl-f"><span>${esc(L.name)}</span><input class="fl-in" data-c="name" autocomplete="name" value="${esc(A.name || "")}" /></label>
        <label class="fl-f"><span>${esc(L.email)}</span><input class="fl-in" data-c="email" type="email" inputmode="email" autocomplete="email" value="${esc(A.email || "")}" /></label>
        ${s.phone ? `<label class="fl-f"><span>${esc(L.phone)}</span><input class="fl-in" data-c="phone" type="tel" inputmode="tel" autocomplete="tel" value="${esc(A.phone || "")}" /></label>` : ""}
        <p class="fl-err" data-err hidden>${esc(L["invalid.email"])}</p></div>
        <div class="fl-go"><button type="button" class="fl-btn" data-next>${esc(L.next)}</button></div>`;
    // consent: the answers in one calm list (each one a link back to its step), the consent naming the recipient, unticked.
    const rows = steps.filter((x) => x.type === "choice" || x.type === "text").map((x) => {
      const k = steps.indexOf(x), v = x.type === "choice" ? x.opts.find((o) => o.v === A[x.id])?.l : A[x.id];
      return v ? `<li><button type="button" class="fl-edit" data-goto="${k}"><span>${esc(x.q)}</span><b>${esc(v)}</b></button></li>` : "";
    }).join("");
    return `<p class="fl-k">${esc(L.review)}</p><ul class="fl-review">${rows}${A.email ? `<li><button type="button" class="fl-edit" data-goto="${steps.findIndex((x) => x.type === "contact")}"><span>${esc(L.email)}</span><b>${esc(A.name ? `${A.name} · ${A.email}` : A.email)}</b></button></li>` : ""}</ul>
      <button type="button" class="fl-consent" role="checkbox" aria-checked="${A.consent === "1"}" data-consent><i>${CHECK}</i><span>${esc(s.text)} <a href="${F.links.privacy}" target="_blank" rel="noopener">${esc(F.extra.privacy)}</a></span></button>
      <div class="fl-go"><button type="button" class="fl-btn fl-send" data-send ${A.consent === "1" ? "" : "disabled"}>${esc(L.send)}</button></div>
      <input class="fl-hp" data-hp tabindex="-1" autocomplete="off" aria-hidden="true" />`;
  }

  function render(focus = true) {
    const s = steps[i];
    const html = `${head()}<div class="fl-step"><h2 id="fl-q" class="fl-q" tabindex="-1">${esc(s.q)}</h2>${i === 0 && F.lede ? `<p class="fl-lede">${esc(F.lede)}</p>` : ""}${body(s)}</div>`;
    swap(html, focus);
    url(i);
  }
  function swap(html: string, focus: boolean) {
    const old = stage.firstElementChild as HTMLElement | null;
    const el = document.createElement("div"); el.className = "fl-screen"; el.innerHTML = html;
    if (old && !reduce()) {
      el.style.transform = `translateX(${dir * 28}px)`; el.style.opacity = "0";
      stage.append(el); old.style.position = "absolute"; old.style.inset = "0 0 auto 0";
      requestAnimationFrame(() => { el.style.transform = ""; el.style.opacity = ""; old.style.transform = `translateX(${-dir * 28}px)`; old.style.opacity = "0"; });
      setTimeout(() => old.remove(), 260);
    } else { stage.replaceChildren(el); }
    wire(el);
    if (focus) el.querySelector<HTMLElement>(".fl-q")?.focus({ preventScroll: true });
  }
  const go = (n: number) => { dir = n >= i ? 1 : -1; i = Math.max(0, Math.min(n, N - 1)); render(); };

  function wire(el: HTMLElement) {
    const s = steps[i];
    el.querySelector("[data-back]")?.addEventListener("click", () => go(i - 1));
    el.querySelectorAll<HTMLButtonElement>(".fl-opt").forEach((b, k, all) => {
      b.tabIndex = (A[s.id] ? b.getAttribute("aria-checked") === "true" : k === 0) ? 0 : -1;
      b.addEventListener("click", () => {
        A[s.id] = b.dataset.v!; save();
        all.forEach((x) => x.setAttribute("aria-checked", String(x === b)));
        setTimeout(() => go(i + 1), reduce() ? 0 : 220);  // a beat to see the choice, then on
      });
      b.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
        if (d) { e.preventDefault(); const nb = all[(k + d + all.length) % all.length]; nb.focus(); }
      });
    });
    const inp = el.querySelector<HTMLInputElement | HTMLTextAreaElement>("[data-in]");
    inp?.addEventListener("input", () => { A[s.id] = inp.value; save(); });
    inp?.addEventListener("keydown", (e) => { if (e.key === "Enter" && !(inp instanceof HTMLTextAreaElement)) { e.preventDefault(); next(); } });
    el.querySelectorAll<HTMLButtonElement>("[data-chip]").forEach((b) => b.addEventListener("click", () => { if (inp) { inp.value = b.dataset.chip!; A[s.id] = inp.value; save(); } next(); }));
    el.querySelectorAll<HTMLInputElement>("[data-c]").forEach((x) => x.addEventListener("input", () => { A[x.dataset.c!] = x.value.trim(); save(); }));
    el.querySelectorAll<HTMLInputElement>("[data-c]").forEach((x) => x.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); next(); } }));
    el.querySelector("[data-next]")?.addEventListener("click", next);
    el.querySelector("[data-skip]")?.addEventListener("click", () => { delete A[s.id]; save(); go(i + 1); });
    el.querySelectorAll<HTMLButtonElement>("[data-goto]").forEach((b) => b.addEventListener("click", () => go(Number(b.dataset.goto))));
    const cb = el.querySelector<HTMLButtonElement>("[data-consent]"), send = el.querySelector<HTMLButtonElement>("[data-send]");
    cb?.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest("a")) return;
      const on = cb.getAttribute("aria-checked") !== "true"; cb.setAttribute("aria-checked", String(on)); A.consent = on ? "1" : ""; save(); send!.disabled = !on;
    });
    cb?.addEventListener("keydown", (e) => { if (e.key === " ") { e.preventDefault(); cb.click(); } });
    send?.addEventListener("click", submit);
  }
  function next() {
    const s = steps[i];
    if (s.type === "contact") {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(A.email || "");
      const err = stage.querySelector<HTMLElement>("[data-err]"); if (err) err.hidden = ok;
      if (!ok) { stage.querySelector<HTMLInputElement>('[data-c="email"]')?.focus(); return; }
    }
    if (s.type === "text" && !s.optional && !(A[s.id] || "").trim()) { stage.querySelector<HTMLElement>("[data-in]")?.focus(); return; }
    go(i + 1);
  }

  // ------------------------------------------------------------ sending
  const route = () => F.id !== "concierge" ? "ok" : A.budget === "3" || A.budget === "4" ? "private" : A.when === "1" || A.when === "2" ? "ok" : "later";
  const answerText = () => steps.filter((s) => s.type === "choice" || s.type === "text").map((s) => {
    const v = s.type === "choice" ? s.opts.find((o) => o.v === A[s.id])?.l : A[s.id]; return v ? `${s.q} ${v}` : "";
  }).filter(Boolean);
  async function submit() {
    const btn = stage.querySelector<HTMLButtonElement>("[data-send]")!; const hp = stage.querySelector<HTMLInputElement>("[data-hp]")?.value || "";
    btn.disabled = true; btn.textContent = L.sending;
    let brief = ""; try { brief = sessionStorage.getItem("ip.brief") || ""; } catch { /* none */ }
    const payload = { flow: F.id, project: q.get("project") || "", unit: q.get("unit") || "", ...F.hidden, answers: Object.fromEntries(steps.filter((s) => s.type === "choice" || s.type === "text").map((s) => [s.id, A[s.id] ?? ""])),
      labels: answerText(), name: A.name || "", email: A.email || "", phone: A.phone || "", consent: A.consent === "1", budget: budgetEur || "", brief, page: location.pathname, hp };
    let ok = false;
    try { const r = await fetch("/api/request", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) }); ok = r.ok; } catch { ok = false; }
    if (ok) { try { sessionStorage.removeItem(key); } catch { /* none */ } done(); }
    else fallback(payload);
  }
  function done() {
    const d = (F.done as Record<string, { h: string; p: string }>)[route()] ?? F.done.ok;
    dir = 1; swap(`<div class="fl-done"><span class="fl-tick">${CHECK}</span><h2 class="fl-q" tabindex="-1">${esc(d.h)}</h2><p class="fl-lede">${esc(d.p)}</p>
      <div class="fl-go"><a class="fl-btn" href="${F.links.path}">${esc(F.extra.path)}</a><a class="fl-link" href="${F.links.map}">${esc(F.extra.map)}</a></div></div>`, true);
    url(null);
  }
  function fallback(p: Record<string, unknown>) {
    const subject = `${F.title} (${F.hidden.edition} · ${F.hidden.language})`;
    const text = [...(p.labels as string[]), `${L.name}: ${p.name}`, `${L.email}: ${p.email}`, p.phone ? `${L.phone}: ${p.phone}` : "", p.brief ? `\n${p.brief}` : "", "", steps[N - 1].type === "consent" ? `✓ ${(steps[N - 1] as Extract<Step, { type: "consent" }>).text}` : ""].filter((x) => x !== "").join("\n");
    const href = `mailto:${F.mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    const btn = stage.querySelector<HTMLButtonElement>("[data-send]")!; btn.textContent = L.send; btn.disabled = false;
    const box = document.createElement("p"); box.className = "fl-fallback"; box.innerHTML = `${esc(L.fallback)} <a class="fl-btn" href="${href}">${esc(L["fallback.btn"])}</a>`;
    stage.querySelector(".fl-fallback")?.remove(); stage.querySelector(".fl-go")?.after(box);
  }

  // ------------------------------------------------------------ start
  const start = Number(q.get(opts.param));
  i = start >= 1 && start <= N ? start - 1 : 0;
  render(false);
  return { go, reset: () => { i = 0; render(false); }, focus: () => stage.querySelector<HTMLElement>(".fl-q")?.focus({ preventScroll: true }), clearUrl: () => url(null), at: () => i };
}
