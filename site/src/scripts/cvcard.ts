// "O seu perfil de comprador" (prompt 74 §2): the card under the Concierge's confirmation. Each known line pre-filled
// from the reader's path (lib/cv.ts) and editable with one tap; then at most three one-tap questions, only for what is
// missing (when, NIF, residency with the reader's own IMT refund); "Pronto" sends it to the same address as the request
// (/api/request, flow "concierge": routing unchanged, D14). Skipping is fine: the request already carried the profile.
// A developer is offered the profile only through the unticked box that names it (D54, D79); nothing else reaches one.
import { build, line, setAnswer, addPlace, dropPlace, refund, payload, BUDGETS, TIMELINES, YESNO, RESIDENT, type Ctx, type Key, type CvL, type Field } from "../lib/cv";

const esc = (t: string) => t.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
const CHECK = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7"/></svg>`;

export type CvSend = (cv: ReturnType<typeof payload>, labels: string[]) => Promise<boolean>;
export function cvCard(host: HTMLElement, o: { L: CvL; ctx: () => Ctx; locale: string; eds: string[]; profile: string; send?: CvSend; dev?: { name: string; project: string }; onEvent?: (k: string) => void }) {
  const L = o.L, eur = (v: number) => new Intl.NumberFormat(o.locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0, useGrouping: "always" } as unknown as Intl.NumberFormatOptions).format(v);
  let editing: Key | "" = "", ticked = false, state: "" | "sending" | "sent" | "failed" = "";
  const OPTS: Partial<Record<Key, string[]>> = { country: [...o.eds, "other"], budget: BUDGETS, use: ["live", "away"], fin: ["cash", "loan"], timeline: TIMELINES, nif: YESNO, resident: RESIDENT };
  const optLabel = (k: Key, v: string) => k === "country" ? L[`country.${v}`] : k === "budget" ? L[`budget.${v}`] : k === "use" ? L[`use.${v}`] : k === "fin" ? L[v === "cash" ? "fin.cash" : "fin.loan"] : L[`${k}.${v}`];
  const pills = (k: Key, cur: string) => `<div class="fl-pills cv-pills" role="radiogroup">${OPTS[k]!.map((v) =>
    `<button type="button" class="fl-pill" role="radio" aria-checked="${cur === v || (k === "fin" && cur.startsWith(v))}" data-set="${k}" data-v="${esc(v)}">${esc(optLabel(k, v))}</button>`).join("")}</div>`;

  function render() {
    const b = build(o.ctx()), got = (k: Key) => b.fields.find((x) => x.k === k);
    const row = (f: Field | undefined, k: Key) => {
      if (k === "interest") {
        const items = b.interest.map((x) => `<li class="cv-chip"><span>${esc(x.name)}</span><button type="button" data-drop="${esc(x.name)}" aria-label="${esc(`${L.remove}: ${x.name}`)}">×</button></li>`).join("");
        return `<li class="cv-row cv-int"><p class="cv-k">${esc(L["k.interest"])}</p><ul class="cv-chips">${items}</ul>
          <form class="cv-add" data-add><input class="fl-in" name="p" autocomplete="off" placeholder="${esc(L["place.ph"])}" aria-label="${esc(L["place.ph"])}" /><button type="submit" class="fl-link">${esc(L["place.add"])}</button></form></li>`;
      }
      if (editing === k) return `<li class="cv-row cv-editing"><p class="cv-k">${esc(L[`k.${k}`])}</p>${pills(k, f?.v ?? "")}</li>`;
      if (!f) return OPTS[k] ? `<li class="cv-row"><button type="button" class="cv-line cv-miss" data-edit="${k}"><span>${esc(L[`k.${k}`])}</span><b>+</b></button></li>` : "";
      if (k === "total") return `<li class="cv-row"><p class="cv-line cv-fixed"><span>${esc(line(f, L, eur))}</span><small>${esc(L[`src.${f.src}`])}</small></p></li>`;
      return `<li class="cv-row"><button type="button" class="cv-line" data-edit="${k}" aria-label="${esc(`${L.edit}: ${line(f, L, eur)}`)}"><span>${esc(line(f, L, eur))}</span><small>${esc(L[`src.${f.src}`])}</small></button></li>`;
    };
    // The lines the reader already gave (or the site knew), then the questions for what is missing (three at most).
    const ask = (["timeline", "nif", "resident"] as Key[]).filter((k) => !got(k) && editing !== k);
    const lines = (["country", "budget", "use", "fin", "total", "interest", "timeline", "nif", "resident"] as Key[])
      .filter((k) => !ask.includes(k)).map((k) => row(got(k), k)).join("");
    const back = refund(b.price);
    const qs = ask.map((k) => `<div class="cv-q"><p class="cv-qq" id="cvq-${k}">${esc(L[`q.${k}`])}</p>${pills(k, "").replace('role="radiogroup"', `role="radiogroup" aria-labelledby="cvq-${k}"`)}${k === "resident" && back ? `<p class="cv-refund">${esc(L.refund.replace("{v}", eur(back)))}</p>` : ""}</div>`).join("");
    const consent = o.dev && o.send && state !== "sent" ? `<button type="button" class="fl-consent cv-consent" role="checkbox" aria-checked="${ticked}" data-consent><i>${CHECK}</i><span>${esc(L.consent.replace("{dev}", o.dev.name).replace("{name}", o.dev.project))}</span></button>` : "";
    const status = state === "sent" ? `<p class="fl-prepd" role="status">${CHECK}<span>${esc(L.sent)}</span></p>` : state === "failed" ? `<p class="cv-status" role="status">${esc(L.failed)}</p>` : "";
    host.innerHTML = `<section class="cv" aria-labelledby="cv-h"><div class="cv-top"><h3 id="cv-h" class="cv-h">${esc(L.h)}</h3><span class="cv-pct">${esc(L.pct.replace("{n}", String(b.pct)))}</span></div>
      <ul class="cv-list">${lines}</ul>${qs}${consent}
      <div class="fl-go cv-go">${o.send && state !== "sent" ? `<button type="button" class="fl-btn" data-ready ${state === "sending" ? "disabled" : ""}>${esc(state === "sending" ? L.sending : L.ready)}</button>` : ""}<a class="fl-link" href="${esc(o.profile)}" target="_blank" rel="noopener" data-summary>${esc(L.summary)}</a></div>${status}</section>`;
    wire(b);
  }
  function wire(b: ReturnType<typeof build>) {
    host.querySelectorAll<HTMLButtonElement>("[data-edit]").forEach((x) => x.addEventListener("click", () => { editing = x.dataset.edit as Key; render(); host.querySelector<HTMLElement>(".cv-editing .fl-pill")?.focus(); }));
    host.querySelectorAll<HTMLButtonElement>("[data-set]").forEach((x) => x.addEventListener("click", () => {
      const k = x.dataset.set as Key; let v = x.dataset.v!;
      // Keeping the down payment the simulator gave when "Com crédito" is tapped again.
      if (k === "fin" && v === "loan") { const cur = b.fields.find((f) => f.k === "fin")?.v || ""; if (cur.startsWith("loan")) v = cur; }
      setAnswer(k, v); editing = ""; o.onEvent?.(`answer`); render();
    }));
    host.querySelectorAll<HTMLButtonElement>("[data-drop]").forEach((x) => x.addEventListener("click", () => { dropPlace(x.dataset.drop!); render(); host.querySelector<HTMLInputElement>("[data-add] input")?.focus(); }));
    const form = host.querySelector<HTMLFormElement>("[data-add]");
    form?.addEventListener("submit", (e) => { e.preventDefault(); const inp = form.querySelector("input")!; for (const p of inp.value.split(/[,;]/)) addPlace(p); render(); host.querySelector<HTMLInputElement>("[data-add] input")?.focus(); });
    const cb = host.querySelector<HTMLButtonElement>("[data-consent]");
    cb?.addEventListener("click", () => { ticked = !ticked; cb.setAttribute("aria-checked", String(ticked)); });
    host.querySelector("[data-summary]")?.addEventListener("click", () => o.onEvent?.("summary"));
    host.querySelector("[data-ready]")?.addEventListener("click", async () => {
      const typed = host.querySelector<HTMLInputElement>("[data-add] input")?.value || ""; for (const p of typed.split(/[,;]/)) addPlace(p);
      state = "sending"; render();
      const nb = build(o.ctx()), share = o.dev ? { developer: o.dev.name, project: o.dev.project, text: L.consent.replace("{dev}", o.dev.name).replace("{name}", o.dev.project), ticked } : undefined;
      const ok = await o.send!(payload(nb, L, eur, share), nb.fields.map((f) => line(f, L, eur)));
      state = ok ? "sent" : "failed"; render();
      if (ok) o.onEvent?.(ticked ? "share" : "ready");
    });
  }
  render();
}
