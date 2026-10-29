// The slot picker (prompt 41 §2): one component for the Concierge and the request flow (prompt 38 §1b), so both look and
// behave the same. The next 14 days in Portugal as a row, the advisor's hours in 30-minute steps (config.advisorHours),
// up to three preferred slots, each shown in Lisbon time and in the reader's own time zone (detected, changed in one tap).
import { config } from "../config";

export type Slot = { d: string; t: string };
export const LIS = "Europe/Lisbon";
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
const X = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`;

// A Lisbon wall time as an instant (summer and winter time included).
export function lisbonInstant(d: string, t: string): Date {
  const [y, m, day] = d.split("-").map(Number), [h, mi] = t.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, day, h, mi);
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-GB", { timeZone: LIS, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
    .formatToParts(new Date(guess)).map((x) => [x.type, x.value]));
  return new Date(guess - (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - guess));
}
export const readerTz = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"; } catch { return "UTC"; } };
const ymd = (dt: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: LIS, year: "numeric", month: "2-digit", day: "2-digit" }).format(dt);
const mins = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const hm = (n: number) => `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;

/** The advisor's days in the next 14 (from tomorrow, Portugal time). */
export function slotDays(): string[] {
  const H = config.advisorHours, out: string[] = [];
  for (let k = 1; k <= 14; k++) { const s = ymd(new Date(Date.now() + k * 864e5)); if (H.days.includes(lisbonInstant(s, "12:00").getUTCDay())) out.push(s); }
  return out;
}
/** Every start time within the advisor's hours: 09:00, 09:30 … 18:30. */
export function slotTimes(): string[] {
  const H = config.advisorHours, out: string[] = [];
  for (let n = mins(H.from); n + H.step <= mins(H.to); n += H.step) out.push(hm(n));
  return out;
}

const L = {
  pt: { day: "Escolha um dia", time: "Escolha até três horários", pt: "Lisboa", picked: "Os seus horários", none: "Ainda nenhum horário escolhido.", zone: "Ver também na hora de", remove: "Retirar" },
  en: { day: "Choose a day", time: "Choose up to three times", pt: "Lisbon", picked: "Your times", none: "No time chosen yet.", zone: "Also show the time in", remove: "Remove" },
  fr: { day: "Choisissez un jour", time: "Choisissez jusqu'à trois horaires", pt: "Lisbonne", picked: "Vos horaires", none: "Aucun horaire choisi.", zone: "Afficher aussi l'heure de", remove: "Retirer" },
};
// The editions' own zones, after the reader's: a second zone in one tap.
const ZONES = ["Europe/Luxembourg", "Europe/Paris", "Europe/Zurich", "America/Sao_Paulo", "America/New_York", "Asia/Jerusalem"];
const zoneKey = "ip.tz";
export const zoneNow = () => { try { return localStorage.getItem(zoneKey) || readerTz(); } catch { return readerTz(); } };
export const city = (tz: string) => tz.split("/").pop()!.replace(/_/g, " ");

export function slotLabel(s: Slot, locale: string, lang: keyof typeof L, zone = zoneNow()) {
  const at = lisbonInstant(s.d, s.t), T = L[lang];
  const f = (z: string, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, { timeZone: z, ...o }).format(at);
  const main = `${f(LIS, { weekday: "short", day: "numeric", month: "short" })}, ${s.t} ${T.pt}`;
  const own = zone === LIS ? "" : `${f(zone, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" })} ${city(zone)}`;
  return { main, own, both: own ? `${main} · ${own}` : main };
}

/** Renders the picker into host and keeps it live; set() receives the sorted slots on every change. */
export function slotPicker(host: HTMLElement, o: { lang: string; locale: string; get: () => Slot[]; set: (s: Slot[]) => void; max?: number }) {
  const lang = (["pt", "en", "fr"].includes(o.lang) ? o.lang : "en") as keyof typeof L, T = L[lang], max = o.max ?? 3;
  const days = slotDays(), times = slotTimes();
  let day = o.get()[0]?.d && days.includes(o.get()[0].d) ? o.get()[0].d : days[0], zone = zoneNow();
  const zones = [...new Set([readerTz(), ...ZONES])].filter((z) => z !== LIS);
  const fd = (d: string, opt: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(o.locale, { timeZone: LIS, ...opt }).format(lisbonInstant(d, "12:00"));
  const fhm = (d: string, t: string, z: string) => new Intl.DateTimeFormat(o.locale, { timeZone: z, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(lisbonInstant(d, t));
  function draw() {
    const S = o.get(), taken = (t: string) => S.some((x) => x.d === day && x.t === t);
    const scroll = host.querySelector(".rq-days")?.scrollLeft ?? 0, zscroll = host.querySelector(".sp-zones")?.scrollLeft ?? 0;
    host.innerHTML = `<p class="rq-bk">${esc(T.day)}</p><div class="rq-days">${days.map((d) =>
      `<button type="button" class="rq-day" data-day="${d}" aria-pressed="${d === day}"><span>${esc(fd(d, { weekday: "short" }))}</span><b>${esc(fd(d, { day: "numeric" }))}</b><span>${esc(fd(d, { month: "short" }))}</span></button>`).join("")}</div>
      <p class="rq-bk">${esc(T.time)}</p>
      <div class="sp-zones" role="group" aria-label="${esc(T.zone)}"><span>${esc(T.zone)}</span>${zones.map((z) => `<button type="button" class="rq-pill" data-zone="${esc(z)}" aria-pressed="${z === zone}">${esc(city(z))}</button>`).join("")}</div>
      <div class="rq-times">${times.map((t) =>
        `<button type="button" class="rq-time" data-time="${t}" aria-pressed="${taken(t)}" ${!taken(t) && S.length >= max ? "disabled" : ""}><b>${t} <small>${esc(T.pt)}</small></b>${zone !== LIS ? `<span>${esc(fhm(day, t, zone))} ${esc(city(zone))}</span>` : ""}</button>`).join("")}</div>
      <p class="rq-bk">${esc(T.picked)} (${S.length}/${max})</p>
      ${S.length ? `<ul class="rq-picked">${S.map((x, k) => { const l = slotLabel(x, o.locale, lang, zone); return `<li><div><b>${esc(l.main)}</b>${l.own ? `<small>${esc(l.own)}</small>` : ""}</div><button type="button" class="rq-rm" data-rm="${k}" aria-label="${esc(T.remove)}">${X}</button></li>`; }).join("")}</ul>` : `<p class="rq-hint">${esc(T.none)}</p>`}`;
    host.querySelector(".rq-days")!.scrollLeft = scroll; host.querySelector(".sp-zones")!.scrollLeft = zscroll;
    host.querySelectorAll<HTMLButtonElement>("[data-day]").forEach((b) => b.addEventListener("click", () => { day = b.dataset.day!; draw(); }));
    host.querySelectorAll<HTMLButtonElement>("[data-zone]").forEach((b) => b.addEventListener("click", () => { zone = b.dataset.zone!; try { localStorage.setItem(zoneKey, zone); } catch { /* private mode */ } draw(); }));
    host.querySelectorAll<HTMLButtonElement>("[data-time]").forEach((b) => b.addEventListener("click", () => {
      const s = [...o.get()], t = b.dataset.time!, k = s.findIndex((x) => x.d === day && x.t === t);
      if (k >= 0) s.splice(k, 1); else if (s.length < max) s.push({ d: day, t });
      s.sort((p, q) => (p.d + p.t).localeCompare(q.d + q.t)); o.set(s); draw();
    }));
    host.querySelectorAll<HTMLButtonElement>("[data-rm]").forEach((b) => b.addEventListener("click", () => { const s = [...o.get()]; s.splice(Number(b.dataset.rm), 1); o.set(s); draw(); }));
  }
  draw();
}
