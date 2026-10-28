// The buyer's request, "visit or buy" (prompt 38 §1b, D66): one question per screen in a sheet over the showcase. Opened by any
// [data-req] (data-block / data-typ pre-fill the home) or #pedir. On the preview nothing is sent: no fetch at all; the request
// is kept in this tab (sessionStorage) so [data-req-advisor] can show it as the partner agency's qualified advisor receives it.

type Cfg = {
  lang: string; ed: string; locale: string; project: { id: string; name: string; developer: string };
  blocks: { id: string; units: { t: string; n: number }[] }[]; privacy: string; country: string; dial: string; sampleCountry: string; from: string;
  t: Record<string, any>;
};
type Slot = { d: string; t: string };
type Ans = {
  intent?: "online" | "inperson" | "buy"; block?: string; typ?: string; mode?: "video" | "phone"; slots: Slot[];
  name?: string; email?: string; cc?: string; phone?: string; country?: string; budget?: number; pay?: "own" | "mortgage"; horizon?: number;
  consent?: boolean; ts?: string; tz?: string; page?: string; sample?: boolean;
};

const LIS = "Europe/Lisbon";
const TIMES = ["10:00", "12:00", "15:00", "17:30"];
const STEPS = ["intent", "home", "when", "you", "more", "consent"] as const;
const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
const CHECK = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7"/></svg>`;
const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`;
const X = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
const KEY = "ip.rq.draft", LAST = "ip.rq.last";
const ss = { get: (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } }, set: (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* private mode */ } } };

// ------------------------------------------------------------ time: a Lisbon wall time as an instant, shown in both zones
function lisbonInstant(d: string, t: string): Date {
  const [y, m, day] = d.split("-").map(Number), [h, mi] = t.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, day, h, mi);
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: LIS, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
    .formatToParts(new Date(guess)).map((x) => [x.type, x.value]));
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
  return new Date(guess - (asUtc - guess));
}
const readerTz = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; } catch { return "UTC"; } };
const city = (tz: string) => tz.split("/").pop()!.replace(/_/g, " ");
const ymd = (dt: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: LIS, year: "numeric", month: "2-digit", day: "2-digit" }).format(dt);

export function initRequest() {
  const cfgEl = document.querySelector<HTMLElement>("[data-rq-cfg]"); if (!cfgEl) return;
  const C: Cfg = JSON.parse(cfgEl.textContent || "{}"), T = C.t;
  const sheet = document.querySelector<HTMLElement>("[data-rq-sheet]")!, back = document.querySelector<HTMLElement>("[data-rq-back]")!;
  const stage = sheet.querySelector<HTMLElement>("[data-rq-stage]")!, sampleBtn = sheet.querySelector<HTMLButtonElement>("[data-rq-sample]")!;
  const ad = document.querySelector<HTMLElement>("[data-rq-ad]")!, adBody = ad.querySelector<HTMLElement>("[data-rq-ad-body]")!;
  const tz = readerTz();
  const fmtDay = (dt: Date, zone: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(C.locale, { timeZone: zone, ...o }).format(dt);
  const fmtHM = (dt: Date, zone: string) => new Intl.DateTimeFormat(C.locale, { timeZone: zone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(dt);
  const slotLabel = (s: Slot, zone = tz) => {
    const at = lisbonInstant(s.d, s.t);
    const day = fmtDay(at, LIS, { weekday: "short", day: "numeric", month: "short" });
    const own = zone === LIS ? "" : `${fmtDay(at, zone, { weekday: "short", day: "numeric", month: "short" })}, ${fmtHM(at, zone)} ${city(zone)}`;
    return { main: `${day}, ${s.t} ${T.pt}`, own };
  };

  // The next two weeks in Portugal, Sundays left out.
  const days: string[] = [];
  for (let k = 1; days.length < 12 && k <= 15; k++) { const dt = new Date(Date.now() + k * 864e5); const s = ymd(dt); if (lisbonInstant(s, "12:00").getUTCDay() !== 0) days.push(s); }

  const fresh = (): Ans => ({ slots: [], cc: C.dial, country: C.country });
  let A: Ans = fresh();
  try { A = { ...fresh(), ...JSON.parse(ss.get(KEY) || "{}") }; } catch { /* none */ }
  const save = () => ss.set(KEY, JSON.stringify(A));
  let i = 0, dir = 1, day = days[0], doneView = false, opener: HTMLElement | null = null;

  const intentL = (v?: string) => (v ? T.intent[v] : "");
  const unitL = (a: Ans) => (a.block && a.typ ? `${T.block} ${a.block} · ${a.typ}` : T.undecided);

  // ------------------------------------------------------------ screens
  const head = () => `<div class="fl-head"><button type="button" class="fl-back" data-back ${i === 0 ? "hidden" : ""} aria-label="${esc(T.back)}">${ARROW}</button>
    <div class="fl-prog" role="progressbar" aria-label="${esc(T.title)}" aria-valuemin="1" aria-valuemax="${STEPS.length}" aria-valuenow="${i + 1}"><span style="width:${((i + 1) / STEPS.length) * 100}%"></span></div>
    <span class="fl-of">${esc(T.of.replace("{i}", String(i + 1)).replace("{n}", String(STEPS.length)))}</span></div>`;
  const opt = (v: string, l: string, on: boolean, sub = "", attr = "data-v") => `<button type="button" class="fl-opt" role="radio" aria-checked="${on}" ${attr}="${esc(v)}"><span>${esc(l)}${sub ? `<small>${esc(sub)}</small>` : ""}</span><i>${CHECK}</i></button>`;
  const pills = (name: string, list: string[], cur?: number | string) => `<div class="rq-pills" role="group">${list.map((l, k) => `<button type="button" class="rq-pill" data-pill="${name}" data-v="${k}" aria-pressed="${String(cur) === String(k)}">${esc(l)}</button>`).join("")}</div>`;

  function screen(): string {
    const s = STEPS[i];
    if (s === "intent") return `<h2 id="rq-q" class="fl-q" tabindex="-1">${esc(T.q1)}</h2><p class="fl-lede">${esc(T.l1.replace("{name}", C.project.name).replace("{dev}", C.project.developer))}</p>
      <div class="fl-opts" role="radiogroup" aria-labelledby="rq-q">${(["online", "inperson", "buy"] as const).map((v) => opt(v, T.intent[v], A.intent === v, T.intent[`${v}S`])).join("")}</div>`;
    if (s === "home") return `<h2 id="rq-q" class="fl-q" tabindex="-1">${esc(T.q2)}</h2><p class="fl-lede">${esc(T.l2)}</p>
      ${C.blocks.map((b) => `<p class="rq-bk">${esc(T.block)} ${esc(b.id)}</p><div class="fl-opts fl-row rq-units" role="radiogroup" aria-label="${esc(T.block)} ${esc(b.id)}">${b.units.map((u) =>
        opt(`${b.id}|${u.t}`, u.t, A.block === b.id && A.typ === u.t, T.forSale.replace("{n}", String(u.n)))).join("")}</div>`).join("")}
      <div class="fl-opts rq-und">${opt("|", T.undecided, A.block === "" && !A.typ)}</div>
      ${A.block !== undefined ? `<div class="fl-go"><button type="button" class="fl-btn" data-next>${esc(T.next)}</button></div>` : ""}`;
    if (s === "when") {
      const taken = (t: string) => A.slots.some((x) => x.d === day && x.t === t);
      return `<h2 id="rq-q" class="fl-q" tabindex="-1">${esc(T.q3)}</h2><p class="fl-lede">${esc(T.l3)}</p>
      ${A.intent === "online" ? `<div class="rq-seg" role="group">${(["video", "phone"] as const).map((m) => `<button type="button" data-mode="${m}" aria-pressed="${(A.mode || "video") === m}">${esc(T.mode[m])}</button>`).join("")}</div>` : ""}
      <p class="rq-bk">${esc(T.pickDay)}</p><div class="rq-days">${days.map((d) => { const at = lisbonInstant(d, "12:00");
        return `<button type="button" class="rq-day" data-day="${d}" aria-pressed="${d === day}"><span>${esc(fmtDay(at, LIS, { weekday: "short" }))}</span><b>${esc(fmtDay(at, LIS, { day: "numeric" }))}</b><span>${esc(fmtDay(at, LIS, { month: "short" }))}</span></button>`; }).join("")}</div>
      <p class="rq-bk">${esc(T.pickTime)} · ${esc(T.pt)}</p><div class="rq-times">${TIMES.map((t) => { const at = lisbonInstant(day, t);
        return `<button type="button" class="rq-time" data-time="${t}" aria-pressed="${taken(t)}" ${!taken(t) && A.slots.length >= 3 ? "disabled" : ""}><b>${t}</b>${tz !== LIS ? `<span>${esc(fmtHM(at, tz))} ${esc(city(tz))}</span>` : ""}</button>`; }).join("")}</div>
      <p class="rq-bk">${esc(T.picked)} (${A.slots.length}/3)</p>
      ${A.slots.length ? `<ul class="rq-picked">${A.slots.map((x, k) => { const l = slotLabel(x); return `<li><div><b>${esc(l.main)}</b>${l.own ? `<small>${esc(l.own)} · ${esc(T.yours)}</small>` : ""}</div><button type="button" class="rq-rm" data-rm="${k}" aria-label="${esc(T.close)}">${X}</button></li>`; }).join("")}</ul>` : `<p class="rq-hint">${esc(T.none)}</p>`}
      <div class="fl-go"><button type="button" class="fl-btn" data-next ${A.slots.length ? "" : "disabled"}>${esc(T.next)}</button></div>`;
    }
    if (s === "you") return `<h2 id="rq-q" class="fl-q" tabindex="-1">${esc(T.q4)}</h2><div class="fl-fields">
      <label class="fl-f"><span>${esc(T.name)}</span><input class="fl-in" data-c="name" autocomplete="name" value="${esc(A.name)}" /></label>
      <label class="fl-f"><span>${esc(T.email)}</span><input class="fl-in" data-c="email" type="email" inputmode="email" autocomplete="email" value="${esc(A.email)}" /></label>
      <div class="fl-f"><span id="rq-tel">${esc(T.phone)}</span><div class="rq-tel"><input class="fl-in" data-c="cc" inputmode="tel" autocomplete="tel-country-code" aria-labelledby="rq-tel" value="${esc(A.cc)}" /><input class="fl-in" data-c="phone" type="tel" inputmode="tel" autocomplete="tel-national" aria-labelledby="rq-tel" value="${esc(A.phone)}" /></div></div>
      <label class="fl-f"><span>${esc(T.country)}</span><input class="fl-in" data-c="country" autocomplete="country-name" value="${esc(A.country)}" /></label>
      <p class="fl-err" data-err hidden></p></div><div class="fl-go"><button type="button" class="fl-btn" data-next>${esc(T.next)}</button></div>`;
    if (s === "more") return `<button type="button" class="fl-link rq-top-skip" data-skip>${esc(T.skip)}</button><h2 id="rq-q" class="fl-q" tabindex="-1">${esc(T.q5)}</h2><p class="fl-lede">${esc(T.l5)}</p>
      <p class="rq-bk">${esc(T.budget)}</p>${pills("budget", T.budgets, A.budget)}
      <p class="rq-bk">${esc(T.pay)}</p>${pills("pay", [T.pays.own, T.pays.mortgage], A.pay === "own" ? 0 : A.pay === "mortgage" ? 1 : undefined)}
      <p class="rq-bk">${esc(T.horizon)}</p>${pills("horizon", T.horizons, A.horizon)}
      <div class="fl-go"><button type="button" class="fl-btn" data-next>${esc(T.next)}</button><button type="button" class="fl-link" data-skip>${esc(T.skip)}</button></div>`;
    // consent: the answers as one calm list (each a link back), one unticked box naming the advisor, Send disabled until ticked.
    const row = (k: number, l: string, v: string) => (v ? `<li><button type="button" class="fl-edit" data-goto="${k}"><span>${esc(l)}</span><b>${esc(v)}</b></button></li>` : "");
    const extra = [A.budget != null ? T.budgets[A.budget] : "", A.pay ? T.pays[A.pay] : "", A.horizon != null ? T.horizons[A.horizon] : ""].filter(Boolean).join(" · ");
    return `<h2 id="rq-q" class="fl-q" tabindex="-1">${esc(T.q6)}</h2><p class="fl-k">${esc(T.review)}</p><ul class="fl-review">
      ${row(0, T.q1, intentL(A.intent) + (A.intent === "online" ? ` (${T.mode[A.mode || "video"]})` : ""))}${row(1, T.q2, unitL(A))}
      ${row(2, T.picked, A.slots.map((x) => slotLabel(x).main).join(" · "))}${row(3, T.q4, [A.name, A.email, `${A.cc || ""} ${A.phone || ""}`.trim(), A.country].filter(Boolean).join(" · "))}${row(4, T.q5, extra)}</ul>
      <button type="button" class="fl-consent" role="checkbox" aria-checked="${!!A.consent}" data-consent><i>${CHECK}</i><span>${esc(T.consent)} <a href="${esc(C.privacy)}" target="_blank" rel="noopener">${esc(T.privacy)}</a></span></button>
      <div class="fl-go"><button type="button" class="fl-btn fl-send" data-send ${A.consent ? "" : "disabled"}>${esc(T.send)}</button></div>`;
  }

  function swap(html: string, focus = true) {
    const old = stage.firstElementChild as HTMLElement | null;
    const el = document.createElement("div"); el.className = "fl-screen"; el.innerHTML = html;
    if (old && !reduce()) {
      el.style.transform = `translateX(${dir * 28}px)`; el.style.opacity = "0";
      stage.append(el); old.style.position = "absolute"; old.style.inset = "0 0 auto 0";
      requestAnimationFrame(() => { el.style.transform = ""; el.style.opacity = ""; old.style.transform = `translateX(${-dir * 28}px)`; old.style.opacity = "0"; });
      setTimeout(() => old.remove(), 260);
    } else stage.replaceChildren(el);
    wire(el);
    sheet.querySelector<HTMLElement>(".sh-in")!.scrollTop = 0;
    if (focus) el.querySelector<HTMLElement>(".fl-q")?.focus({ preventScroll: true });
  }
  const render = (focus = true) => { doneView = false; sampleBtn.hidden = false; swap(`${head()}<div class="fl-step">${screen()}</div>`, focus); };
  const go = (n: number) => { dir = n >= i ? 1 : -1; i = Math.max(0, Math.min(n, STEPS.length - 1)); render(); };
  const rerender = () => { const s = stage.firstElementChild as HTMLElement; s.innerHTML = `${head()}<div class="fl-step">${screen()}</div>`; wire(s); };

  function wire(el: HTMLElement) {
    const s = STEPS[i];
    el.querySelector("[data-back]")?.addEventListener("click", () => go(i - 1));
    el.querySelectorAll<HTMLButtonElement>(".fl-opt").forEach((b) => b.addEventListener("click", () => {
      if (s === "intent") A.intent = b.dataset.v as Ans["intent"];
      else { const [bk, ty] = b.dataset.v!.split("|"); A.block = bk; A.typ = ty || undefined; }
      save(); el.querySelectorAll(".fl-opt").forEach((x) => x.setAttribute("aria-checked", String(x === b)));
      setTimeout(() => go(i + 1), reduce() ? 0 : 220);
    }));
    el.querySelectorAll<HTMLButtonElement>("[data-mode]").forEach((b) => b.addEventListener("click", () => { A.mode = b.dataset.mode as Ans["mode"]; save(); rerender(); }));
    el.querySelectorAll<HTMLButtonElement>("[data-day]").forEach((b) => b.addEventListener("click", () => { day = b.dataset.day!; const x = el.querySelector(".rq-days")!.scrollLeft; rerender(); el.querySelector(".rq-days")!.scrollLeft = x; }));
    el.querySelectorAll<HTMLButtonElement>("[data-time]").forEach((b) => b.addEventListener("click", () => {
      const t = b.dataset.time!, k = A.slots.findIndex((x) => x.d === day && x.t === t);
      if (k >= 0) A.slots.splice(k, 1); else if (A.slots.length < 3) A.slots.push({ d: day, t });
      A.slots.sort((p, q) => (p.d + p.t).localeCompare(q.d + q.t)); save();
      const x = el.querySelector(".rq-days")!.scrollLeft; rerender(); el.querySelector(".rq-days")!.scrollLeft = x;
    }));
    el.querySelectorAll<HTMLButtonElement>("[data-rm]").forEach((b) => b.addEventListener("click", () => { A.slots.splice(Number(b.dataset.rm), 1); save(); rerender(); }));
    el.querySelectorAll<HTMLInputElement>("[data-c]").forEach((x) => {
      x.addEventListener("input", () => { (A as any)[x.dataset.c!] = x.value.trim(); save(); });
      x.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); next(); } });
    });
    el.querySelectorAll<HTMLButtonElement>("[data-pill]").forEach((b) => b.addEventListener("click", () => {
      const n = b.dataset.pill!, v = Number(b.dataset.v), on = b.getAttribute("aria-pressed") !== "true";
      if (n === "pay") A.pay = on ? (v ? "mortgage" : "own") : undefined; else (A as any)[n] = on ? v : undefined;
      save(); el.querySelectorAll(`[data-pill="${n}"]`).forEach((x) => x.setAttribute("aria-pressed", String(x === b && on)));
    }));
    el.querySelectorAll("[data-next]").forEach((b) => b.addEventListener("click", next));
    el.querySelectorAll("[data-skip]").forEach((b) => b.addEventListener("click", () => { delete A.budget; delete A.pay; delete A.horizon; save(); go(i + 1); }));
    el.querySelectorAll<HTMLButtonElement>("[data-goto]").forEach((b) => b.addEventListener("click", () => go(Number(b.dataset.goto))));
    const cb = el.querySelector<HTMLButtonElement>("[data-consent]"), send = el.querySelector<HTMLButtonElement>("[data-send]");
    cb?.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest("a")) return;
      A.consent = cb.getAttribute("aria-checked") !== "true"; cb.setAttribute("aria-checked", String(A.consent)); save(); send!.disabled = !A.consent;
    });
    cb?.addEventListener("keydown", (e) => { if (e.key === " ") { e.preventDefault(); cb.click(); } });
    send?.addEventListener("click", submit);
  }
  function next() {
    if (STEPS[i] === "you") {
      const err = stage.querySelector<HTMLElement>("[data-err]")!;
      const bad = !(A.name || "").trim() ? ["name", T.errName] : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(A.email || "") ? ["email", T.errEmail]
        : (A.phone || "").replace(/\D/g, "").length < 6 || !/^\+?\d{1,4}$/.test((A.cc || "").replace(/\s/g, "")) ? ["phone", T.errPhone] : null;
      err.hidden = !bad; if (bad) { err.textContent = bad[1]; stage.querySelector<HTMLInputElement>(`[data-c="${bad[0]}"]`)?.focus(); return; }
    }
    if (STEPS[i] === "when" && !A.slots.length) return;
    go(i + 1);
  }

  // ------------------------------------------------------------ the preview sends nothing: keep it for the advisor view
  function submit() {
    A.ts = new Date().toISOString(); A.tz = tz; A.page = location.origin + location.pathname;
    ss.set(LAST, JSON.stringify(A));
    const last = A; A = fresh(); ss.set(KEY, "{}");
    doneView = true; sampleBtn.hidden = true; dir = 1;
    swap(`<div class="fl-done"><span class="fl-tick">${CHECK}</span><h2 class="fl-q" tabindex="-1">${esc(T.doneH)}</h2>
      <p class="rq-demo-note">${esc(T.demo)}</p><p class="rq-next">${esc(T.steps)}</p>
      <div class="fl-go"><button type="button" class="fl-btn" data-ics>${esc(T.ics)}</button><button type="button" class="fl-link" data-rq-adv>${esc(T.advisor)}</button></div></div>`);
    stage.querySelector("[data-ics]")?.addEventListener("click", () => ics(last));
    stage.querySelector("[data-rq-adv]")?.addEventListener("click", () => openAdvisor());
  }
  function ics(a: Ans) {
    const s = a.slots[0]; if (!s) return;
    const st = s.d.replace(/-/g, "") + "T" + s.t.replace(":", "") + "00";
    const end = new Date(lisbonInstant(s.d, s.t).getTime() + 45 * 6e4);
    const endL = new Intl.DateTimeFormat("en-CA", { timeZone: LIS, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(end);
    const g = (k: string) => endL.find((x) => x.type === k)!.value;
    const en = `${g("year")}${g("month")}${g("day")}T${g("hour")}${g("minute")}${g("second")}`;
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    const icsEsc = (t: string) => t.replace(/[\\;,]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
    const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Imoveis Portugal//Request//PT", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
      "BEGIN:VTIMEZONE", "TZID:Europe/Lisbon",
      "BEGIN:STANDARD", "DTSTART:19701025T020000", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0000", "TZNAME:WET", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD",
      "BEGIN:DAYLIGHT", "DTSTART:19700329T010000", "TZOFFSETFROM:+0000", "TZOFFSETTO:+0100", "TZNAME:WEST", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT", "END:VTIMEZONE",
      "BEGIN:VEVENT", `UID:${stamp}-${C.project.id}@imoveisportugal`, `DTSTAMP:${stamp}`, `DTSTART;TZID=Europe/Lisbon:${st}`, `DTEND;TZID=Europe/Lisbon:${en}`,
      `SUMMARY:${icsEsc(`${T.calTitle.replace("{project}", C.project.name)} (${intentL(a.intent)})`)}`, `DESCRIPTION:${icsEsc(`${T.calDesc}\n${unitL(a)}`)}`,
      "STATUS:TENTATIVE", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([body], { type: "text/calendar;charset=utf-8" }));
    const l = document.createElement("a"); l.href = url; l.download = `${C.project.id}-${s.d}.ics`; document.body.append(l); l.click(); l.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  // ------------------------------------------------------------ the sample buyer (fictional), one tap
  function sample(): Ans {
    const b = C.blocks.find((x) => x.id === "B" && x.units.some((u) => u.t === "T2")) ? "B" : C.blocks[0]?.id;
    const typ = b === "B" ? "T2" : C.blocks[0]?.units[0]?.t;
    const pick = [days[1], days[3], days[6]].filter(Boolean);
    return { intent: "online", mode: "video", block: b, typ, slots: [{ d: pick[0], t: "17:30" }, { d: pick[1], t: "12:00" }, { d: pick[2], t: "10:00" }].filter((x) => x.d),
      name: T.sampleName, email: "exemplo@example.com", cc: "+352", phone: "600 000 000", country: C.sampleCountry, budget: 2, pay: "mortgage", horizon: 1, sample: true };
  }
  sampleBtn.addEventListener("click", () => { A = { ...sample(), consent: false }; save(); day = A.slots[0]?.d || days[0]; dir = 1; i = STEPS.length - 1; render(); });

  // ------------------------------------------------------------ open / close, Esc, focus trap
  const focusables = (root: HTMLElement) => [...root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])')].filter((x) => x.offsetParent !== null && !x.closest("[hidden]"));
  function trap(e: KeyboardEvent, root: HTMLElement) {
    if (e.key !== "Tab") return; const f = focusables(root); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (document.activeElement === last || !root.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
  }
  const lock = (on: boolean) => { document.documentElement.style.overflow = on ? "hidden" : ""; };
  function open(pre?: { block?: string; typ?: string }) {
    opener = document.activeElement as HTMLElement;
    i = 0;  // always from the first question; earlier answers stay selected, so it is a few taps
    if (pre?.block && C.blocks.some((b) => b.id === pre.block && b.units.some((u) => u.t === pre.typ))) { A.block = pre.block; A.typ = pre.typ; save(); }
    if (!sheet.hidden && sheet.classList.contains("is-open")) { render(); return; }
    sheet.hidden = false; back.hidden = false; lock(true);
    dir = 1; render(false);
    requestAnimationFrame(() => requestAnimationFrame(() => { sheet.classList.add("is-open"); back.classList.add("is-open"); stage.querySelector<HTMLElement>(".fl-q")?.focus({ preventScroll: true }); }));
  }
  function close() {
    sheet.classList.remove("is-open"); back.classList.remove("is-open"); lock(false);
    setTimeout(() => { sheet.hidden = true; back.hidden = true; }, reduce() ? 0 : 280);
    if (location.hash === "#pedir") history.replaceState(null, "", location.pathname + location.search);
    opener?.focus?.({ preventScroll: true });
  }
  sheet.querySelector("[data-rq-close]")!.addEventListener("click", close);
  back.addEventListener("click", close);
  sheet.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.preventDefault(); close(); } else trap(e, sheet); });

  document.addEventListener("click", (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>("[data-req]");
    if (t) { e.preventDefault(); open({ block: t.dataset.block, typ: t.dataset.typ }); return; }
    const a = (e.target as HTMLElement).closest<HTMLElement>("[data-req-advisor]");
    if (a) { e.preventDefault(); openAdvisor(); }
  });
  const fromHash = () => { if (location.hash === "#pedir") open(); };
  addEventListener("hashchange", fromHash); fromHash();

  // ------------------------------------------------------------ what the advisor receives (demo only)
  let adOpener: HTMLElement | null = null;
  function openAdvisor() {
    let a: Ans | null = null; try { a = JSON.parse(ss.get(LAST) || "null"); } catch { a = null; }
    const isSample = !a; if (!a) a = { ...sample(), consent: true, ts: new Date().toISOString(), tz: "Europe/Luxembourg", page: location.origin + location.pathname };
    adBody.innerHTML = mail(a, isSample);
    adOpener = document.activeElement as HTMLElement;
    ad.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => ad.classList.add("is-open")));
    ad.querySelector<HTMLElement>("[data-rq-ad-close]")!.focus({ preventScroll: true });
  }
  function closeAdvisor() { ad.classList.remove("is-open"); setTimeout(() => { ad.hidden = true; }, reduce() ? 0 : 260); adOpener?.focus?.({ preventScroll: true }); }
  ad.querySelector("[data-rq-ad-close]")!.addEventListener("click", closeAdvisor);
  ad.addEventListener("click", (e) => { if (e.target === ad) closeAdvisor(); });
  ad.addEventListener("keydown", (e) => { if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); closeAdvisor(); } else trap(e, ad); });

  function mail(a: Ans, isSample: boolean) {
    const zone = a.tz || tz, none = `<span style="color:#9b9a94;font-weight:500">${esc(T.adNone)}</span>`;
    const intent = intentL(a.intent) + (a.intent === "online" ? ` (${T.mode[a.mode || "video"]})` : "");
    const subj = T.adSubj.replace("{intent}", intentL(a.intent)).replace("{project}", C.project.name).replace("{unit}", unitL(a));
    const kv = (rows: [string, string][]) => `<table class="rq-kv">${rows.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${v}</td></tr>`).join("")}</table>`;
    const when = new Intl.DateTimeFormat(C.locale, { dateStyle: "long", timeStyle: "medium", timeZone: LIS }).format(new Date(a.ts || Date.now()));
    const unitN = C.blocks.find((b) => b.id === a.block)?.units.find((u) => u.t === a.typ)?.n;
    return `<div class="rq-mh"><div><span>${esc(T.adFrom)}</span><b>Imóveis Portugal &lt;${esc(C.from)}&gt;</b></div><div><span>${esc(T.adTo)}</span><b>${esc(T.adTo2)}</b></div><div><span>${esc(T.adSubject)}</span><b>${esc(subj)}</b></div></div>
      <div class="rq-mail"><p class="rq-brand">Imóveis Portugal</p><div class="rq-rule"></div>
      <h3>${esc(intent)} · ${esc(C.project.name)}</h3><p class="rq-note">${esc(isSample ? T.adSampleNote : T.adLastNote)} ${esc(T.demo)}</p>
      <h4>${esc(T.adSummary)}</h4><div class="rq-sum">${kv([
        [T.adIntent, esc(intent)], [T.budget, a.budget != null ? esc(T.budgets[a.budget]) : none], [T.pay, a.pay ? esc(T.pays[a.pay]) : none],
        [T.horizon, a.horizon != null ? esc(T.horizons[a.horizon]) : none], [T.adResidence, a.country ? esc(a.country) : none]])}</div>
      <h4>${esc(T.adUnit)}</h4>${kv([[C.project.name, `${esc(unitL(a))}${unitN ? `<small>${esc(T.forSale.replace("{n}", String(unitN)))}</small>` : ""}`], [T.adEdition, esc(`${C.ed.toUpperCase()} · ${C.lang.toUpperCase()}`)]])}
      <h4>${esc(T.adSlots)}</h4>${kv(a.slots.map((x, k) => { const l = slotLabel(x, zone); return [`${k + 1}`, `${esc(l.main)}${l.own ? `<small>${esc(l.own)} (${esc(zone)})</small>` : ""}`] as [string, string]; }))}
      <h4>${esc(T.adContact)}</h4>${kv([[T.name, esc(a.name)], [T.email, esc(a.email)], [T.phone, esc(`${a.cc || ""} ${a.phone || ""}`.trim())], [T.country, esc(a.country)]])}
      <h4>${esc(T.adConsent)}</h4>${kv([[T.adWhen, `${esc(when)}<small>${esc(a.ts)} · Europe/Lisbon</small>`], [T.adText, `<p class="rq-quote">${esc(T.consent)}</p>`], [T.adPage, esc(a.page)]])}
      <p class="rq-foot">${esc(T.adFooter)}</p></div>`;
  }
}
