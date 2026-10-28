// The flow engine (prompt 35 §3, D61): one question per screen, large choices that advance by themselves, our own
// controls (no browser selects, checkboxes or outlined boxes), every step a link (?step=3 on a page, ?concierge=3 in the
// sheet), answers kept only in this tab (sessionStorage) and sent once, with the consent, to /api/request.
// If the endpoint is not configured or fails, the request opens as a ready-written email to the brand mailbox.
import type { FlowConfig, Step } from "../lib/flows";
import type { LawyerCard } from "../lib/lawyers";

const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (t: string) => t.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
const CHECK = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7"/></svg>`;
const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`;

export function initFlow(root: HTMLElement, opts: { param: string; onClose?: () => void } = { param: "step" }) {
  const F: FlowConfig = JSON.parse(root.querySelector("[data-flow-cfg]")!.textContent || "{}");
  const L = F.labels, steps = F.steps, N = steps.length;
  const key = `ip.flow.${F.id}`;
  const stage = root.querySelector<HTMLElement>("[data-flow-stage]")!;
  // The partner lawyer card (prompt 37 §4, D64), concierge only; absent when no lawyer may show on this build.
  const LW = (() => { try { return JSON.parse(root.querySelector("[data-flow-lawyer]")?.textContent || "null") as LawyerCard | null; } catch { return null; } })();
  let A: Record<string, string> = {};
  try { A = JSON.parse(sessionStorage.getItem(key) || "{}"); } catch { /* private mode */ }
  const save = () => { try { sessionStorage.setItem(key, JSON.stringify(A)); } catch { /* private mode */ } };
  let i = 0, dir = 1;

  // The reader's edition (prompt 37 §1.1): the one in the URL (/{lang}/{ed}/...), else the page's own, else the saved one.
  // sessionStorage is shared by every edition on one domain, so answers kept from another edition (or language) in this
  // tab used to carry their country over: the concierge opened on Luxembourg everywhere after a first visit to /lu.
  const edOpts = steps.flatMap((s) => (s.type === "choice" && s.prefill === "edition" ? s.opts.map((o) => o.v) : []));
  const savedEd = (() => { try { return localStorage.getItem("ip-ed") || ""; } catch { return ""; } })();
  const edNow = [location.pathname.split("/")[2] || "", F.hidden.edition, savedEd].find((x) => edOpts.includes(x)) || F.hidden.edition;
  const reset = (kind: "edition" | "lang") => { for (const s of steps) if ("prefill" in s && s.prefill === kind) delete A[s.id]; };
  if (A._ed !== edNow) { reset("edition"); A._ed = edNow; }
  if (A._lang !== F.hidden.language) { reset("lang"); A._lang = F.hidden.language; }

  // Prefills: the edition, the reader's language, the budget and place from the map or the path, a partner category.
  const q = new URLSearchParams(location.search);
  const budgetEur = Number(q.get("budget")) || (() => { try { return Number(localStorage.getItem("ip.budget")) || 0; } catch { return 0; } })();
  const places = (() => { try { return JSON.parse(localStorage.getItem("ip.places") || "[]") as string[]; } catch { return []; } })();
  const pre: Record<string, string> = {
    edition: edNow, lang: F.hidden.language, cat: q.get("cat") || "",
    budget: budgetEur ? (budgetEur <= 300000 ? "1" : budgetEur <= 1e6 ? "2" : budgetEur <= 5e6 ? "3" : "4") : "",
    place: q.get("place") || places[0] || "",
  };
  for (const s of steps) if ("prefill" in s && s.prefill && !A[s.id] && pre[s.prefill]) A[s.id] = pre[s.prefill];
  save();

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
    // "I have a question" on the first screen, and a one-line way to the lawyer on the legal step (the tax number).
    const ask = LW && (i === 0 || s.id === "nif") ? `<p class="fl-ask"><button type="button" class="fl-link" data-lawyer>${esc(i === 0 ? LW.labels.ask : LW.labels.legal)}</button></p>` : "";
    const html = `${head()}<div class="fl-step"><h2 id="fl-q" class="fl-q" tabindex="-1">${esc(s.q)}</h2>${i === 0 && F.lede ? `<p class="fl-lede">${esc(F.lede)}</p>` : ""}${body(s)}${ask}</div>`;
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
    el.querySelector("[data-lawyer]")?.addEventListener("click", lawyerScreen);
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

  // ------------------------------------------------------------ the partner lawyer (prompt 37 §4, D64)
  // A side screen, outside the step count: the card, then the booking with one unticked consent naming the lawyer.
  // A sample lawyer (preview builds only) sends nothing. Wording informative only (EOA art. 94).
  const lwHead = () => `<div class="fl-head"><button type="button" class="fl-back" data-lw-back aria-label="${esc(L.back)}">${ARROW}</button><span class="fl-prog lw-prog"></span></div>`;
  const fill = (t: string) => { const x = LW!.lawyers[0]; return t.replace("{name}", x.name).replace("{firm}", x.firm); };
  function side(html: string, back: () => void) {
    dir = 1; swap(html, true);
    const el = stage.lastElementChild as HTMLElement; el.querySelector("[data-lw-back]")?.addEventListener("click", () => { dir = -1; back(); });
    return el;
  }
  function lawyerScreen() {
    const x = LW!.lawyers[0], T = LW!.labels;
    const face = x.photo ? `<img src="${esc(x.photo)}" alt="" width="72" height="72" loading="lazy" />` : `<span aria-hidden="true">${esc(x.initials)}</span>`;
    const row = (k: string, v: string, note = "") => v ? `<div><dt>${esc(T[k])}</dt><dd>${esc(v)}${note ? `<small>${esc(note)}</small>` : ""}</dd></div>` : "";
    const el = side(`${lwHead()}<div class="fl-step"><h2 class="fl-q" tabindex="-1">${esc(T.h)}</h2><p class="fl-lede">${esc(T.lede)}</p>
      <article class="lw${x.sample ? " is-sample" : ""}" aria-label="${esc(`${x.name}, ${x.firm}`)}">
        <p class="lw-tags"><span class="lw-tag">${esc(T.partner)}</span>${x.sample ? `<span class="lw-tag lw-tag-s">${esc(T.sample)}</span>` : ""}</p>
        <div class="lw-id"><div class="lw-face">${face}</div><div><p class="lw-name">${esc(x.name)}</p><p class="lw-firm">${esc(x.firm)}</p>
          <p class="lw-ced">${esc(T.cedula)} <b>${esc(x.cedula)}</b><br /><a href="${esc(LW!.oa)}" target="_blank" rel="noopener">${esc(T.verify)}</a></p></div></div>
        <dl class="lw-dl">${row("areas", x.areas.join(" · "))}${row("langs", x.langs.join(" · "))}${row("where", x.where)}${row("response", x.response)}${row("fees", x.fees, T.feesNote)}</dl>
        ${x.linkedin ? `<p class="lw-li"><a href="${esc(x.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></p>` : ""}
        <div class="fl-go"><button type="button" class="fl-btn" data-lw-book>${esc(T.book)}</button></div>
        <p class="lw-disc">${esc(T.disclosure)}</p>${x.sample ? `<p class="lw-note">${esc(T.sampleNote)}</p>` : ""}
      </article></div>`, () => go(i));
    el.querySelector("[data-lw-book]")!.addEventListener("click", bookScreen);
  }
  function bookScreen() {
    const x = LW!.lawyers[0], T = LW!.labels;
    const el = side(`${lwHead()}<div class="fl-step"><h2 class="fl-q" tabindex="-1">${esc(fill(T.bookH))}</h2>
      <div class="fl-fields">
        <label class="fl-f"><span>${esc(L.name)}</span><input class="fl-in" data-lw="name" autocomplete="name" value="${esc(A.name || "")}" /></label>
        <label class="fl-f"><span>${esc(L.email)}</span><input class="fl-in" data-lw="email" type="email" inputmode="email" autocomplete="email" value="${esc(A.email || "")}" /></label>
        <label class="fl-f"><span>${esc(T.question)}</span><textarea class="fl-in fl-area" data-lw="question" rows="3">${esc(A.lwq || "")}</textarea></label>
        <p class="fl-err" data-lw-err hidden>${esc(L["invalid.email"])}</p></div>
      <button type="button" class="fl-consent" role="checkbox" aria-checked="false" data-lw-consent><i>${CHECK}</i><span>${esc(fill(T.consent))} <a href="${F.links.privacy}" target="_blank" rel="noopener">${esc(F.extra.privacy)}</a></span></button>
      <div class="fl-go"><button type="button" class="fl-btn" data-lw-send disabled>${esc(T.book)}</button></div></div>`, lawyerScreen);
    const val = (k: string) => el.querySelector<HTMLInputElement>(`[data-lw="${k}"]`)!.value.trim();
    el.querySelectorAll<HTMLInputElement>("[data-lw]").forEach((f) => f.addEventListener("input", () => { const k = f.dataset.lw!; A[k === "question" ? "lwq" : k] = f.value.trim(); save(); }));
    const cb = el.querySelector<HTMLButtonElement>("[data-lw-consent]")!, send = el.querySelector<HTMLButtonElement>("[data-lw-send]")!;
    cb.addEventListener("click", (e) => { if ((e.target as HTMLElement).closest("a")) return; const on = cb.getAttribute("aria-checked") !== "true"; cb.setAttribute("aria-checked", String(on)); send.disabled = !on; });
    cb.addEventListener("keydown", (e) => { if (e.key === " ") { e.preventDefault(); cb.click(); } });
    send.addEventListener("click", async () => {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val("email")); el.querySelector<HTMLElement>("[data-lw-err]")!.hidden = ok;
      if (!ok) { el.querySelector<HTMLInputElement>('[data-lw="email"]')!.focus(); return; }
      el.querySelector(".fl-fallback")?.remove();
      const note = (html: string) => { const p = document.createElement("p"); p.className = "fl-fallback"; p.setAttribute("role", "status"); p.innerHTML = html; el.querySelector(".fl-go")!.after(p); };
      if (x.sample) { note(`<span class="lw-tag lw-tag-s">${esc(T.sample)}</span> ${esc(T.previewSent)}`); return; }  // the preview never sends
      const payload = { flow: "lawyer", lawyer: x.id, lawyerName: `${x.name} (${x.firm})`, ...F.hidden, name: val("name"), email: val("email"), question: val("question"), consent: true, consentText: fill(T.consent), page: location.pathname, hp: "" };
      send.disabled = true; send.textContent = L.sending; let sent = false;
      try { sent = (await fetch("/api/request", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })).ok; } catch { sent = false; }
      if (sent) { side(`<div class="fl-done"><span class="fl-tick">${CHECK}</span><h2 class="fl-q" tabindex="-1">${esc(T.doneH)}</h2><p class="fl-lede">${esc(fill(T.doneP))}</p></div>`, () => go(i)); return; }
      send.disabled = false; send.textContent = T.book;
      const body = [`${x.name} (${x.firm})`, `${L.name}: ${payload.name}`, `${L.email}: ${payload.email}`, payload.question, "", `✓ ${payload.consentText}`].filter((v) => v !== undefined).join("\n");
      note(`${esc(L.fallback)} <a class="fl-btn" href="mailto:${F.mailto}?subject=${encodeURIComponent(`${T.book}: ${x.name} (${F.hidden.edition} · ${F.hidden.language})`)}&body=${encodeURIComponent(body)}">${esc(L["fallback.btn"])}</a>`);
    });
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
