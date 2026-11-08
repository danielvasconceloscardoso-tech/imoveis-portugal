// The flow engine (prompt 35 §3, D61): one question per screen, large choices that advance by themselves, our own
// controls (no browser selects, checkboxes or outlined boxes), every step a link (?step=3 on a page, ?concierge=3 in the
// sheet), answers kept only in this tab (sessionStorage) and sent once to /api/request, which e-mails Imóveis Portugal and
// the partner agency (no consent box: GDPR art. 6(1)(b), operator 3 Nov 2026; the last screen names both recipients).
// If the endpoint is not configured or fails, the request opens as a ready-written email to the brand mailbox (and, when
// the build sets PUBLIC_AGENCY_EMAIL, the partner agency in copy).
import type { FlowConfig, Step } from "../lib/flows";
import type { LawyerCard } from "../lib/lawyers";
import { slotPicker, slotLabel, slotOwn, ownZone, slotDays, setClock, type Slot } from "./slots";
import { imt as imtOf } from "../lib/sims";
import { track, edOf, ev, lastPlace, simBudget } from "../lib/track";
import { heartHTML } from "./hearts";
import { build as cvBuild, setCtx as cvSetCtx, payload as cvPayload, line as cvLine, type Ctx as CvCtx } from "../lib/cv";
import { cvCard } from "./cvcard";

const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (t: string) => t.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
const CHECK = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7"/></svg>`;
const ARROW = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>`;

export function initFlow(root: HTMLElement, opts: { param: string; onClose?: () => void; sheet?: boolean } = { param: "step" }) {
  const F: FlowConfig = JSON.parse(root.querySelector("[data-flow-cfg]")!.textContent || "{}");
  const L = F.labels, steps = F.steps, N = steps.length;
  // Prompt 69: after the confirmation, the optional preparation runs on the same engine, one question per screen.
  const P = (F.p69 ?? {}) as Record<string, string>, PREP = (F.prep ?? []) as Step[];
  let S: Step[] = steps, prepMode = false, prepSent = false, lastRoute = "";
  const key = `ip.flow.${F.id}`;
  const stage = root.querySelector<HTMLElement>("[data-flow-stage]")!;
  // The partner lawyer card (prompt 37 §4, D64), concierge only; absent when no lawyer may show on this build.
  const LW = (() => { try { return JSON.parse(root.querySelector("[data-flow-lawyer]")?.textContent || "null") as LawyerCard | null; } catch { return null; } })();
  // Listed buildings (prompt 39 §3): from projects.json, passed by Flow.astro; absent outside the concierge.
  type Bld = { id: string; name: string; developer?: string; tag?: string; muni: string; place: string; region: string; near: string[]; typologies: string[]; from: number | null; avail: number | null; photo: string; map: string; visit: string };
  const BL = (() => { try { return JSON.parse(root.querySelector("[data-flow-blds]")?.textContent || "null") as { labels: Record<string, string>; items: Bld[] } | null; } catch { return null; } })();
  // Prompt 70 (A-03, S-19): the answers live in this tab (sessionStorage); the ones that say nothing about who the reader
  // is (help, budget, place, the chosen times, the preparation) are also kept on this device for 24 hours, so a closed
  // tab does not lose them. Name, e-mail, phone and free text are never written to localStorage (GDPR, data minimisation).
  // Round 2 (MI2-02): once a request is sent (in any tab), its answers and times are never restored: the send writes
  // `${key}.sent`, and a copy kept before that moment is dropped. After the send this flow writes nothing to the device.
  const KEEP = `${key}.keep`, SENT = `${key}.sent`, PERSONAL = ["name", "email", "phone", "lwq", "question"];
  let A: Record<string, string> = {}, fromSession = false, fromKeep = false, isSent = false;
  const sentAt = () => { try { return Number(localStorage.getItem(SENT)) || 0; } catch { return 0; } };
  try { const raw = sessionStorage.getItem(key); if (raw) { A = JSON.parse(raw); fromSession = true; } } catch { /* private mode */ }
  if (fromSession && Number(A._t || 0) < sentAt()) { A = {}; fromSession = false; }
  if (!fromSession) try {
    const kept = JSON.parse(localStorage.getItem(KEEP) || "null") as { t: number; A: Record<string, string> } | null;
    if (kept && Date.now() - kept.t < 864e5 && kept.t > sentAt()) { A = kept.A || {}; fromKeep = true; } else localStorage.removeItem(KEEP);
  } catch { /* private mode */ }
  const save = () => {
    if (isSent) return;
    A._t = String(Date.now());
    try { sessionStorage.setItem(key, JSON.stringify(A)); } catch { /* private mode */ }
    try { localStorage.setItem(KEEP, JSON.stringify({ t: Date.now(), A: Object.fromEntries(Object.entries(A).filter(([k]) => !PERSONAL.includes(k))) })); } catch { /* private mode */ }
  };
  // Times kept from an earlier day: only those still ahead stay chosen.
  { let sl: Slot[] = []; try { sl = JSON.parse(A._slots || "[]"); } catch { sl = []; }
    const first = slotDays()[0] || "", ok = sl.filter((x) => x.d >= first), sid = steps.find((x) => x.type === "slots")?.id;
    if (ok.length !== sl.length) { if (ok.length) A._slots = JSON.stringify(ok); else delete A._slots;
      if (sid) { if (ok.length) A[sid] = ok.map((x) => slotLabel(x, document.documentElement.lang || "pt", (F.hidden.language || "pt") as "pt").both).join(" · "); else delete A[sid]; } } }
  let keptTimes = (fromSession || fromKeep) && !!A._slots && A._slots !== "[]";
  // Prompt 70 (J-07): a 12-hour clock where the reader reads English the American way: the US edition in English, or an
  // en-US browser on an English page.
  setClock(F.hidden.language === "en" && (F.hidden.edition === "us" || navigator.language === "en-US"));
  let i = 0, dir = 1;
  // A click on a listed building's card (prompt 51 §3): counted for that developer's report, nothing else is kept.
  stage.addEventListener("click", (e) => { const b = (e.target as HTMLElement).closest?.("a")?.closest<HTMLElement>("[data-bld]")?.dataset.bld; if (b) ev({ event: `p/${b}/card`, place: b, origin: F.id }); });

  // The reader's edition (prompt 37 §1.1): the one in the URL (/{lang}/{ed}/...), else the page's own, else the saved one.
  // sessionStorage is shared by every edition on one domain, so answers kept from another edition (or language) in this
  // tab used to carry their country over: the concierge opened on Luxembourg everywhere after a first visit to /lu.
  const edOpts = steps.flatMap((s) => (s.type === "choice" && s.prefill === "edition" ? s.opts.map((o) => o.v) : []));
  const savedEd = (() => { try { return localStorage.getItem("ip-ed") || ""; } catch { return ""; } })();
  // From the home bar (prompt 42, ?cg=home): the country the reader chose there comes first.
  const q0 = new URLSearchParams(location.search), fromHome = q0.get("cg") === "home";
  const edNow = [fromHome ? q0.get("ed") || "" : "", location.pathname.split("/")[2] || "", F.hidden.edition, savedEd].find((x) => edOpts.includes(x)) || F.hidden.edition;
  const reset = (kind: "edition" | "lang") => { for (const s of steps) if ("prefill" in s && s.prefill === kind) delete A[s.id]; };
  if (A._ed !== edNow) { reset("edition"); A._ed = edNow; }
  if (A._lang !== F.hidden.language) { reset("lang"); A._lang = F.hidden.language; }

  // Prefills: the edition, the reader's language, the budget and place from the map or the path, a partner category.
  // Never ask twice (part 5): after the link, the simulator's budget in this tab (lib/track.ts simBudget) and the last
  // place opened on the map in this tab (lastPlace) come before the older answers kept on the device.
  const q = new URLSearchParams(location.search);
  // Prompt 70 (MI-14): a budget only when the reader gave one: the home bar's (cg=home), else the one they set in a
  // simulator in this tab or on the map or path (ip.budget). A ?budget= left in the URL by a page's default is not one.
  const storedBudget = (() => { try { return Number(localStorage.getItem("ip.budget")) || 0; } catch { return 0; } })();
  const budgetEur = (fromHome && Number(q.get("budget"))) || simBudget() || storedBudget;
  const places = (() => { try { return JSON.parse(localStorage.getItem("ip.places") || "[]") as string[]; } catch { return []; } })();
  const pre: Record<string, string> = {
    edition: edNow, lang: F.hidden.language, cat: q.get("cat") || "",
    budget: budgetEur ? (budgetEur <= 300000 ? "1" : budgetEur <= 1e6 ? "2" : budgetEur <= 5e6 ? "3" : "4") : "",
    place: q.get("place") || lastPlace() || places[0] || "",
  };
  const known = new Set<string>();  // the steps answered from what the site knew (counted as origin "known")
  for (const s of steps) if ("prefill" in s && s.prefill && !A[s.id] && pre[s.prefill]) { A[s.id] = pre[s.prefill]; known.add(s.id); }
  // Prompt 43 §3b: a partner link (Passo a passo, Perguntas) names the topic. Lawyer opens the lawyer card (D64, its own
  // consent box); advisor is the normal concierge; bank and tax have no signed partner yet, so the first screen says we
  // introduce the right person and the request follows the usual routing to the qualified advisor (D66). The topic is
  // shown in the review list and sent with the request. No partner is named here.
  const X = F.extra as Record<string, string>;
  const topic = F.id === "concierge" ? (["lawyer", "advisor", "bank", "tax"].find((t) => t === q.get("topic")) ?? "") : "";
  const topicLabel = topic ? X[`topic${topic[0].toUpperCase()}${topic.slice(1)}`] : "";
  const introLine = topic === "bank" || topic === "tax" || (topic === "lawyer" && !LW);
  // The home bar's answers win over older ones, and those steps are skipped: the flow starts at the next question, the
  // progress counts only what is left, and Back still reaches them, editable. ed, door and cg then leave the URL.
  let offset = 0;
  if (fromHome) {
    const given = new Set<string>();
    for (const s of steps) if ("prefill" in s && (s.prefill === "edition" || (s.prefill === "budget" && pre.budget))) { A[s.id] = pre[s.prefill]; given.add(s.id); }
    const door = q0.get("door"); if (door === "buy" || door === "sell" || door === "inherit") A.door = door;
    // The one-screen simulator (components/Sim1.astro) also names the place it was showing: it wins over an older answer.
    const pl = q0.get("place"); if (pl) A.place = pl;
    while (offset < N - 1 && given.has(steps[offset].id)) offset++;
    for (const k of ["cg", "ed", "door"]) q0.delete(k);
    history.replaceState(history.state, "", `${location.pathname}${q0.size ? `?${q0}` : ""}${location.hash}`);
  }
  // Prompt 69, the arrival: the first step opens on what the reader came from, already chosen. A project (?project=, the
  // map's project card), else a place (?place=, the map card, the simulator's region), with the budget when the link or
  // the simulator gave one, else the budget alone. One tap on another option changes it.
  const locale = document.documentElement.lang || F.hidden.language || "pt";
  const eur = (v: number) => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
  // Prompt 70 (MI-08): the project of the page the reader is on (a development's page) when no link named one.
  const pageProject = BL?.items.find((b) => b.visit && location.pathname.startsWith(b.visit.replace(/#.*$/, ""))) ?? null;
  // Round 2 (J2-05, A-03): opened with nothing to go on (the bottom bar, the header, a link with no project or place), the
  // Concierge comes back to the context of the request the reader left unsent (this tab, or the 24-hour copy).
  const restore = F.id === "concierge" && !fromHome && !pageProject && !["project", "place", "budget", "from", "visit", "topic"].some((k) => q.has(k)) && !!(A._cp || A._cpl || A._csim);
  const ctxProject = F.id === "concierge" ? BL?.items.find((b) => b.id === q.get("project")) ?? pageProject ?? (restore ? BL?.items.find((b) => b.id === A._cp) ?? null : null) : null;
  const projectId = ctxProject?.id || q.get("project") || "";
  // The map keeps its own ?place= as a slug (gondomar): shown as the place's name.
  const qPlace = q.get("place") || "", slugPlace = /^[a-z0-9-]+$/.test(qPlace);
  const ctxPlace = ctxProject ? ctxProject.place : (slugPlace ? BL?.items.find((b) => b.muni === qPlace)?.place || lastPlace() : qPlace) || (restore ? A._cpl || "" : "") || lastPlace() || "";
  // Prompt 70 (J-08): a budget typed in the edition's own currency on the home bar is shown as typed, euros second, both
  // rounded to three figures ($400,000 (≈ €357,000), never €357,366).
  const nice = (v: number) => { const p = 10 ** Math.max(0, Math.floor(Math.log10(Math.max(1, v))) - 2); return Math.round(v / p) * p; };
  const FX = (F as { fx?: { cur: string; rate: number } | null }).fx ?? null, typedLocal = !!(fromHome && FX && Number(q.get("budget")) && q.get("from") !== "sim");  // the simulator's budget is in euros
  const ctxBudget = F.id === "concierge" ? (typedLocal ? nice(budgetEur) : budgetEur) : 0;
  const money = (v: number) => typedLocal ? `${new Intl.NumberFormat(locale, { style: "currency", currency: FX!.cur, maximumFractionDigits: 0 }).format(nice(v * FX!.rate))} (≈ ${eur(nice(v))})` : eur(v);
  // Prompt 73 §1: from the simulator ("from=sim", components/Sim1.astro and the calculators), the context is the costs.
  const fromSim = F.id === "concierge" && (q.get("from") === "sim" || (restore && A._csim === "1"));
  // J72-03: "Book a private visit" on a development (?visit=1): the same request to the same advisor (hard rule 6), said
  // as what it is: the title, the time question and the confirmation speak of arranging the visit to that development.
  const visit = F.id === "concierge" && !!ctxProject && (q.get("visit") === "1" || (restore && A._cvis === "1"));
  const ctxKind = fromSim ? "sim" : ctxProject ? "project" : ctxPlace ? "place" : ctxBudget ? "budget" : "none";
  const fillP = (t: string, v: Record<string, string>) => t.replace(/\{(\w+)\}/g, (m, k) => (k in v ? v[k] : m));
  // Prompt 70 (MI-15): the place with its preposition and article ("no Porto", "na Nazaré", "em Gondomar"; "à Porto",
  // "en Algarve"; "in the Algarve").
  const fold = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const PT_ART: Record<string, string> = Object.fromEntries([
    ...["porto", "algarve", "alentejo", "minho", "douro", "norte", "centro", "oeste", "ribatejo", "funchal", "barreiro", "seixal", "montijo", "cartaxo", "entroncamento", "fundao", "sabugal", "crato", "redondo", "cadaval", "bombarral", "estoril", "geres", "porto santo", "alandroal", "marco de canaveses", "oeste e vale do tejo"].map((x) => [x, "no"]),
    ...["nazare", "amadora", "figueira da foz", "guarda", "covilha", "lourinha", "golega", "batalha", "madeira", "povoa de varzim", "lousa", "mealhada", "moita", "trofa", "maia", "chamusca", "serta", "ericeira", "comporta", "costa da caparica", "grande lisboa", "peninsula de setubal", "praia da vitoria", "ribeira grande", "horta", "marinha grande", "murtosa", "vidigueira", "regiao autonoma da madeira", "regiao autonoma dos acores", "area metropolitana de lisboa", "area metropolitana do porto"].map((x) => [x, "na"]),
    ["acores", "nos"]]);
  const FR_ART: Record<string, string> = { algarve: "en", alentejo: "dans l'", douro: "dans le ", minho: "dans le ", acores: "aux ", madeira: "à " };
  const EN_ART: Record<string, string> = { algarve: "in the ", alentejo: "in the ", douro: "in the ", minho: "in the " };
  const inPlace = (pl: string) => { const k = fold(pl), l = (F.hidden.language || "pt").slice(0, 2);
    if (l === "pt") return `${PT_ART[k] || "em"} ${pl}`;
    if (l === "fr") { const a = FR_ART[k]; return a ? (a.endsWith("'") || a.endsWith(" ") ? `${a}${pl}` : `${a} ${pl}`) : `à ${pl}`; }
    return `${EN_ART[k] || "in "}${pl}`; };
  const ctxLabel = !P["help.place"] ? "" : ctxProject ? fillP(P["help.project"], { name: ctxProject.name, place: ctxProject.place, inplace: inPlace(ctxProject.place) })
    : ctxPlace && ctxBudget ? fillP(P["help.placebudget"], { place: ctxPlace, inplace: inPlace(ctxPlace), price: money(ctxBudget) })
    : ctxPlace ? fillP(P["help.place"], { place: ctxPlace, inplace: inPlace(ctxPlace) }) : ctxBudget ? fillP(P["help.budget"], { price: money(ctxBudget) }) : "";
  // The context in words the language does not change (MI-13: a language switch keeps the reader's own choice).
  const ctxKey = `${ctxKind}|${ctxProject?.id ?? ""}|${fold(ctxPlace)}|${ctxBudget}`, sameCtx = A._ctxk === ctxKey;
  // Prompt 73 §1: the context pre-selects one of the three doors and is never an option itself. From the simulator:
  // "Custos e impostos"; from a place or a development: "Comprar casa", with "Sobre: <name>" under the doors. Its words
  // (ctxLabel) still travel with the request, so the advisor sees what the reader was looking at.
  const about = ctxKind === "project" ? ctxProject!.name : ctxKind === "place" ? ctxPlace : "";
  // J72-19: from a development with a published price, its budget band, when the reader gave no budget of their own.
  const bandOf = (v: number) => (v <= 300000 ? "1" : v <= 1e6 ? "2" : v <= 5e6 ? "3" : "4");
  if (steps.some((s) => s.type === "help")) {
    if (ctxKind !== "none" && !sameCtx) { A.help = fromSim ? "costs" : "home"; known.add("help"); }
    if (A.help === "ctx") A.help = "home";  // an answer kept from before prompt 73
    A._ctx = ctxLabel; A._ctxk = ctxKey; A._cp = ctxProject?.id ?? ""; A._cpl = ctxPlace; A._csim = fromSim ? "1" : ""; A._cvis = visit ? "1" : "";
    if (fromHome && (A.door === "sell" || A.door === "inherit") && !ctxProject) A.help = "sell";
    if ((topic === "tax" || topic === "bank") && ctxKind === "none") A.help = "costs";
    if (pre.budget && A._bud !== String(budgetEur)) { A.budget = pre.budget; A._bud = String(budgetEur); known.add("help"); }
    else if (!pre.budget && ctxProject?.from && A._bud !== `p${ctxProject.from}`) { A.budget = bandOf(ctxProject.from); A._bud = `p${ctxProject.from}`; known.add("help"); }
    if (A._lang2 !== F.hidden.language) { A.lang = F.hidden.language; A._lang2 = F.hidden.language; }
    A.lang ||= F.hidden.language;
  }
  // The price the IMT line on the confirmation speaks of: the project's starting price, else the budget the reader gave.
  const ctxPrice = ctxProject?.from || ctxBudget || 0;
  // Prompt 74: the buyer profile (lib/cv.ts) reads what the Concierge knows now; its words are COPY_DECK "cv.*".
  const CV = (F as { cv?: Record<string, string> | null }).cv ?? null;
  const cvCtx = (): CvCtx => ({ edition: edNow, budget: A.budget, help: A.help, place: ctxPlace,
    project: ctxProject ? { id: ctxProject.id, name: ctxProject.name, developer: ctxProject.developer, place: ctxProject.place, from: ctxProject.from } : undefined });
  save();
  // J72-03: the sheet's (or the page's) title says "Book a private visit" when that is what the reader asked for.
  { const t = root.closest("aside.sh")?.querySelector<HTMLElement>(".sh-title") ?? (!opts.sheet ? document.querySelector<HTMLElement>("[data-cg-title]") : null);
    if (t && P["visit.title"]) { t.textContent = visit ? P["visit.title"] : F.title; root.closest("aside.sh")?.setAttribute("aria-label", t.textContent); } }

  // ------------------------------------------------------------ history (prompt 70: J-03, A-02, MI-01, S-02)
  // Every screen is a history entry: a step forward pushes one (?concierge=2, ?step=2; the preparation ?concierge=p1…),
  // so the browser's Back (Android Back, the swipe) goes back one screen. In the sheet, opening pushes the first entry and
  // Back from it closes the sheet onto the page it was opened from (scripts/chrome.ts); ✕ goes back over those entries.
  // depth counts the entries this flow pushed above the page's own (kept in history.state, so a reload keeps it).
  const sheet = !!opts.sheet;
  const foot = sheet ? root.closest("aside.sh")?.querySelector<HTMLElement>("[data-sh-foot]") ?? null : null;
  /** An element of the screen on show, or of its action bar in the sheet's footer. */
  const pick = <T extends HTMLElement>(scr: HTMLElement, sel: string) => (scr.querySelector<T>(sel) ?? foot?.querySelector<T>(sel) ?? null);
  /** A note under the action: after the bar on a page, at the end of the step (in view) in the sheet. */
  const noteAfterGo = (scr: HTMLElement, box: HTMLElement) => {
    const go = pick(scr, ".fl-go");
    if (go && go.parentElement !== foot) go.after(box); else { scr.querySelector(".fl-step, .fl-done")?.append(box); box.scrollIntoView({ block: "nearest" }); }
  };
  let depth = Number(history.state?.ipK) || 0, clearing = false, view: "step" | "done" | "prep" | "side" = "step", sent = false;
  const href = (v: string | null) => { const p = new URLSearchParams(location.search); v == null ? p.delete(opts.param) : p.set(opts.param, v); return `${location.pathname}${p.size ? `?${p}` : ""}${location.hash}`; };
  const val = (n: number) => (prepMode ? `p${n + 1}` : String(n + 1));
  function url(n: number | null) { history.replaceState({ ...(history.state || {}), ipK: depth }, "", href(n == null ? null : val(n))); }
  function push(v: string) { depth++; history.pushState({ ipK: depth, ipFlow: F.id }, "", href(v)); }
  const minDepth = () => (sheet ? 1 : 0);
  const back = () => { if (depth > minDepth()) history.back(); else if (i > 0 || prepMode) go(i - 1, false); else leave(); };
  // The page's ‹ on the first step: back where the reader came from on this site, else the edition's home (MI-18: one back).
  function leave() {
    if (sheet) { opts.onClose?.(); return; }
    let same = false; try { same = !!document.referrer && new URL(document.referrer).origin === location.origin; } catch { same = false; }
    if (same && history.length > 1) history.go(-(depth + 1)); else location.href = (F.links as Record<string, string>).home || "/";
  }
  /** The browser moved through history: show the screen its URL names. "close": the sheet closes (the browser is already
   *  on the page's entry); "leave": the request was sent, so the sheet closes and goes back over its remaining entries. */
  function pop(): "close" | "leave" | "open" | "none" {
    depth = Number(history.state?.ipK) || 0;
    const v = new URLSearchParams(location.search).get(opts.param);
    if (clearing) { clearing = false; if (v != null) url(null); return "none"; }
    if (v == null) {
      if (sheet) return "close";
      if (sent) { history.go(-1); return "none"; }  // the request is sent: Back leaves the page rather than reopening it
      if (view === "step" && i === offset && !prepMode) return "none";
      prepMode = false; S = steps; dir = -1; i = offset; render(true, false); top(); return "none";
    }
    if (v === "done") { if (view !== "done") { dir = -1; done(lastRoute || route(), false); top(); } return "open"; }
    const pm = /^p(\d+)$/.exec(v);
    if (pm) {
      if (prepSent) { history.back(); return "open"; }  // the preparation is sent: Back passes its questions on the way down
      if (!sent) { if (view !== "done") done(lastRoute || route(), false); return "open"; }
      const n = Math.max(0, Math.min(Number(pm[1]) - 1, PREP.length - 1));
      if (prepMode && view === "step" && n === i) return "open";
      dir = n < i || !prepMode ? (prepMode ? -1 : 1) : 1; prepMode = true; S = PREP; i = n; render(true, false); top(); return "open";
    }
    if (sent) { if (sheet) return "leave"; history.go(-(depth + 1)); return "none"; }
    const n = Math.max(0, Math.min(Number(v) - 1, N - 1));
    if (!Number.isFinite(n)) return "open";
    if (view === "step" && !prepMode && n === i) return "open";
    dir = n < i ? -1 : 1; prepMode = false; S = steps; i = n; render(true, false); top(); return "open";
  }
  /** ✕ on the sheet: back over the entries the flow pushed, so the page is where the reader left it. */
  function unwind() {
    if (depth > 0) { clearing = true; const d = depth; depth = 0; history.go(-d); }
    else url(null);
  }
  if (!sheet) addEventListener("popstate", () => { if (root.isConnected) pop(); });

  const head = () => {
    if (i < offset) offset = 0;  // back among the answers given on the home page: count every step again
    const len = S.length, k = Math.min(i + 1, len) - (prepMode ? 0 : offset), n = len - (prepMode ? 0 : offset);
    return `<div class="fl-head"><button type="button" class="fl-back" data-back ${i === 0 && !prepMode && sheet ? "hidden" : ""} aria-label="${esc(L.back)}">${ARROW}</button>
    <div class="fl-prog" role="progressbar" aria-label="${esc(F.title)}" aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="${k}"><span style="width:${(k / n) * 100}%"></span></div>
    <span class="fl-of">${esc(L.of.replace("{i}", String(k)).replace("{n}", String(n)))}</span></div>`;
  };

  function body(s: Step): string {
    if (s.type === "choice") return `<div class="fl-opts${s.row || s.opts.length <= 3 ? " fl-row" : ""}" role="radiogroup" aria-labelledby="fl-q">${s.opts.map((o) =>
      `<button type="button" class="fl-opt" role="radio" aria-checked="${A[s.id] === o.v}" data-v="${esc(o.v)}"><span>${esc(o.l)}</span><i>${CHECK}</i></button>`).join("")}</div>${s.optional ? `<div class="fl-go"><button type="button" class="fl-link" data-skip>${esc(L.skip)}</button></div>` : ""}`;
    if (s.type === "help") {
      // Prompt 73 §1, step 1: three doors, one of them chosen from where the reader came from, "Sobre: <name>" under them;
      // the budget as one row of pills (a typed dollar budget shown as typed, J-08); Continue full width.
      return `<div class="fl-opts" role="radiogroup" aria-labelledby="fl-q">${s.opts.map((o) =>
        `<button type="button" class="fl-opt" role="radio" aria-checked="${A.help === o.v}" data-v="${esc(o.v)}"><span>${esc(o.l)}</span><i>${CHECK}</i></button>`).join("")}</div>
        ${about && P["help.about"] ? `<p class="fl-about">${esc(fillP(P["help.about"], { name: about }))}</p>` : ""}
        <p class="fl-k" id="fl-bud">${esc(s.budget.q)}${typedLocal && ctxBudget ? ` <small class="fl-typed">${esc(money(ctxBudget))}</small>` : ""}</p><div class="fl-pills" data-budget-row role="radiogroup" aria-labelledby="fl-bud">${s.budget.opts.map((o) =>
        `<button type="button" class="fl-pill" role="radio" aria-checked="${A.budget === o.v}" data-b="${esc(o.v)}">${esc(o.l)}</button>`).join("")}</div>
        <p class="fl-err" data-err hidden></p>
        <div class="fl-go fl-go-w"><button type="button" class="fl-btn" data-next>${esc(L.next)}</button></div>`;
    }
    if (s.type === "text") {
      const chips = s.prefill === "place" ? [...new Set([ctxPlace, ...places])].filter((x) => x && !(A[s.id] || "").split(",").map((y) => y.trim()).includes(x)).slice(0, 4) : [];
      return `${s.multi ? `<textarea class="fl-in fl-area" data-in rows="4" placeholder="${esc(s.ph)}" aria-labelledby="fl-q">${esc(A[s.id] || "")}</textarea>`
        : `<input class="fl-in" data-in type="text" autocomplete="off" placeholder="${esc(s.ph)}" value="${esc(A[s.id] || "")}" aria-labelledby="fl-q" />`}
        ${chips.length ? `<div class="fl-chips">${chips.map((c) => `<button type="button" class="fl-chip" data-chip="${esc(c)}">${esc(c)}</button>`).join("")}</div>` : ""}
        ${BL && s.id === "place" ? matchBox() : ""}
        <div class="fl-go"><button type="button" class="fl-btn" data-next>${esc(prepMode && i === S.length - 1 ? P["prep.send"] : L.next)}</button>${s.optional ? `<button type="button" class="fl-link" data-skip>${esc(L.skip)}</button>` : ""}</div>`;
    }
    // Round 2 (MI2-02, A-03): times kept from earlier are said to be kept, so a tap that removes one is no surprise.
    if (s.type === "slots") return `${keptTimes && hasSlots() && P["slot.kept"] ? `<p class="fl-kept">${esc(P["slot.kept"])}</p>` : ""}<div data-slots></div>
        <div class="fl-go"><button type="button" class="fl-btn" data-next>${esc(L.next)}</button>${s.optional ? `<button type="button" class="fl-link" data-skip>${esc(s.skip || L.skip)}</button>` : ""}</div>`;
    if (s.type === "contact") {
      // Prompt 70 (A-10, A-27, S-20): for a call, the name and the phone are needed and say why; each field has its own
      // message under it, cleared as the reader types. Agreeing the time by e-mail (no time chosen) makes the phone optional.
      // Round 2 (J2-04, M72-15): what a call needs is marked "required" before the reader taps send, and the phone carries
      // the edition's country code as a prefix the reader can change; a number typed without "+" or "00" is sent with it.
      const call = !!s.call && hasSlots();
      const req = (on: boolean) => (on && P.req ? ` <em class="fl-req">${esc(P.req)}</em>` : "");
      const fld = (k: string, label: string, attrs: string, need = false, pre = "") => `<div class="fl-fw"><label class="fl-f"><span>${esc(label)}${req(need)}</span>${pre ? `<span class="fl-tel">${pre}` : ""}<input class="fl-in" data-c="${k}" ${attrs}${need ? ` aria-required="true"` : ""} value="${esc(A[k] || "")}" />${pre ? "</span>" : ""}</label><p class="fl-err" data-err-for="${k}" role="alert" hidden></p></div>`;
      const cc = `<input class="fl-in fl-cc" data-cc type="tel" inputmode="tel" autocomplete="tel-country-code" aria-label="${esc(P.cc || "+")}" value="${esc(ccNow())}" size="5" />`;
      return `<div class="fl-fields">
        ${fld("name", L.name, `autocomplete="name"`, call)}
        ${fld("email", s.call && P.email ? P.email : L.email, `type="email" inputmode="email" autocomplete="email"`, !!s.call)}
        ${s.phone ? fld("phone", call && P.phone ? P.phone : L.phone, `type="tel" inputmode="tel" autocomplete="tel-national"`, call, cc) : ""}</div>
        ${s.lang ? `<p class="fl-k" id="fl-lang">${esc(s.lang.q)}</p><div class="fl-pills" role="radiogroup" aria-labelledby="fl-lang">${s.lang.opts.map((o) =>
          `<button type="button" class="fl-pill" role="radio" aria-checked="${A.lang === o.v}" data-lang="${esc(o.v)}">${esc(o.l)}</button>`).join("")}</div>` : ""}
        ${s.send && CV ? cvGoes() : ""}
        ${s.send ? `<p class="fl-notice">${esc(s.call && !call && P["notice.later"] ? P["notice.later"] : s.notice || "")} <a href="${F.links.privacy}" target="_blank" rel="noopener">${esc(X.policy)}</a></p>
          <div class="fl-go"><button type="button" class="fl-btn fl-send" data-send>${esc(sendLabel())}</button></div>
          <input class="fl-hp" data-hp tabindex="-1" autocomplete="off" aria-hidden="true" />`
        : `<div class="fl-go"><button type="button" class="fl-btn" data-next>${esc(L.next)}</button></div>`}`;
    }
    // review: the answers in one calm list (each one a link back to its step), the send button, one line naming both recipients.
    const rows = steps.filter((x) => x.type === "choice" || x.type === "text" || x.type === "slots").map((x) => {
      const k = steps.indexOf(x), v = x.type === "choice" ? x.opts.find((o) => o.v === A[x.id])?.l : A[x.id];
      return v ? `<li><button type="button" class="fl-edit" data-goto="${k}"><span>${esc(x.q)}</span><b>${esc(v)}</b></button></li>` : "";
    }).join("");
    const topicRow = topic ? `<li><div class="fl-edit fl-fixed"><span>${esc(X.topic)}</span><b>${esc(topicLabel)}</b></div></li>` : "";
    return `<p class="fl-k">${esc(L.review)}</p><ul class="fl-review">${topicRow}${rows}${A.email ? `<li><button type="button" class="fl-edit" data-goto="${steps.findIndex((x) => x.type === "contact")}"><span>${esc(L.email)}</span><b>${esc(A.name ? `${A.name} · ${A.email}` : A.email)}</b></button></li>` : ""}</ul>
      <p class="fl-notice">${esc(s.type === "review" ? s.text : "")} <a href="${F.links.privacy}" target="_blank" rel="noopener">${esc(X.policy)}</a></p>
      <div class="fl-go"><button type="button" class="fl-btn fl-send" data-send>${esc(L.send)}</button></div>
      <input class="fl-hp" data-hp tabindex="-1" autocomplete="off" aria-hidden="true" />`;
  }

  // Match on the place the reader typed (municipality, its NUTS II region, a nearby big city; accents and case ignored),
  // and on the budget band where the developer publishes a starting price (none published = never excluded).
  const plain = (t: string) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const MAX: Record<string, number> = { "1": 300000, "2": 1e6, "3": 5e6, "4": Infinity };
  // Prompt 41 §1: as the reader types; "here" when the place itself matches, "near" when a nearby name or the region does.
  function matches(): { b: Bld; here: boolean }[] {
    if (!BL) return [];
    const q = plain(A.place || ""), cap = MAX[A.budget || ""] ?? Infinity;
    const inBudget = (b: Bld) => b.from == null || b.from <= cap;
    if (q.length < 3) return [];
    const words = ` ${q} `, hit = (f: string) => !!f && (words.includes(` ${f} `) || f.includes(q));
    return BL.items.filter(inBudget).map((b) => ({ b, here: [b.place, b.muni].map(plain).some(hit), near: [b.region, ...b.near].map(plain).some(hit) }))
      .filter((x) => x.here || x.near).map(({ b, here }) => ({ b, here }));
  }
  function cards(list: Bld[]) {
    const T = BL!.labels;
    return `<ul class="fl-blds">${list.map((b) => `<li class="fl-bld" data-bld="${esc(b.id)}">
      ${b.photo ? `<img src="${esc(b.photo)}" alt="" width="800" height="533" loading="lazy" />` : ""}
      <div class="fl-bld-b"><div class="ht-row"><div><p class="fl-bld-tag">${esc(b.tag || T.sponsored)}</p><p class="fl-bld-n">${esc(b.name)}</p></div>${heartHTML("home", b.id, `${b.name}, ${b.place}`, b.visit ? b.visit.replace(/#.*$/, "") : b.map)}</div>
        <p class="fl-bld-m">${esc(b.place)}${b.typologies.length ? ` · ${esc(b.typologies.join(" · "))}` : ""}</p>
        ${b.avail ? `<p class="fl-bld-m fl-bld-av">${esc(T.avail.replace("{n}", String(b.avail)))}</p>` : ""}
        <p class="fl-bld-p">${b.from != null ? `${esc(T.from)} ${esc(new Intl.NumberFormat(F.hidden.language || "pt", { maximumFractionDigits: 0 }).format(b.from))} €` : esc(T.price)}</p>
        <div class="fl-bld-a"><a class="fl-link" href="${esc(b.map)}">${esc(T.map)}</a>${b.visit ? `<a class="fl-btn" href="${esc(b.visit)}">${esc(T.visit)}</a>` : ""}</div></div></li>`).join("")}</ul>`;
  }
  const matchBox = () => {
    const m = matches(); if (!m.length) return `<div data-blds-box></div>`;
    const first = m.find((x) => x.here) ?? m[0], line = (first.here ? BL!.labels.here : BL!.labels.near).replace("{p}", first.b.place);
    return `<div class="fl-bldbox" data-blds-box aria-live="polite"><p class="fl-k">${esc(line)}</p>${cards(m.map((x) => x.b))}</div>`;
  };
  function buildingsScreen() {
    const T = BL!.labels, list = ctxProject ? [ctxProject] : BL!.items; engaged = true; reached("buildings");
    side(`${lwHead()}<div class="fl-step"><h2 class="fl-q" tabindex="-1">${esc(ctxProject ? ctxProject.name : T.h)}</h2>${ctxProject ? "" : `<p class="fl-lede">${esc(T.lede)}</p>`}${list.length ? cards(list) : `<p class="fl-lede">${esc(T.none)}</p>`}</div>`, () => go(i));
  }

  // ------------------------------------------------------------ signals (part 5, lib/track.ts ev): each step reached, and
  // where the reader stops (the sheet closed, or the page left, without sending). Answers are never sent, only step ids.
  const BANDS: Record<string, string> = { "1": "0-300k", "2": "300k-1m", "3": "1-5m", "4": "5m-plus" };
  const band = () => (A.budget ? BANDS[A.budget] : undefined);
  let screen = "", stopped = "", engaged = false, finished = false, begun = false;
  const reached = (id: string) => {
    if (id === screen) return; screen = id; stopped = "";
    ev({ event: `flow/${F.id}/step/${id}`, step: id, band: band(), origin: known.has(id) ? "known" : undefined });
  };
  function stop() {
    if (!engaged || finished || !screen || stopped === screen) return;
    stopped = screen; ev({ event: `flow/${F.id}/stop/${screen}`, step: screen, band: band() });
  }
  addEventListener("pagehide", () => { if (root.getClientRects().length) stop(); });

  let ctxSent = false;
  function render(focus = true, writeUrl = true) {
    const s = S[i];
    reached(s.id); view = "step"; root.dataset.step = s.id;
    if (!prepMode && A._i !== String(i)) { A._i = String(i); save(); }  // MI-13: the step, so a language switch reopens it
    if (s.type === "help" && !ctxSent) { ctxSent = true; ev({ event: `flow/${F.id}/ctx/${ctxKind}`, band: band(), origin: ctxKind === "none" ? undefined : "known" }); }
    // "I have a question" on the first screen, and a one-line way to the lawyer on the legal step (the tax number).
    const ask = LW && !prepMode && (i === 0 || s.id === "nif" || s.id === "prep-nif") ? `<p class="fl-ask"><button type="button" class="fl-link" data-lawyer>${esc(i === 0 ? LW.labels.ask : LW.labels.legal)}</button></p>` : "";
    // "Ver novos empreendimentos" on the first screen (one tap to the list); matching buildings under the place question.
    // Round 2 (Sophie J2-07): the button names what it opens: the development the reader came from, else how many.
    const nbL = ctxProject && BL?.labels.one ? BL.labels.one.replace("{name}", ctxProject.name) : `${BL?.labels.open ?? ""} (${BL?.items.length ?? 0})`;
    const nb = BL && BL.items.length && i === 0 && !prepMode ? `<button type="button" class="fl-xopt" data-blds><span>${esc(nbL)}</span><i>${ARROW}</i></button>` : "";
    const intro = introLine && i === first && !prepMode ? `<p class="fl-topic">${esc(X.topicIntro)}</p>` : "";
    // Prompt 69: the first step's one line ("A qualified advisor calls you at the time you choose") replaces the old lede.
    const lede = s.type === "help" ? s.lede : i === 0 && !prepMode && F.lede ? F.lede : prepMode && i === 0 ? P["prep.p"] : "";
    const qText = visit && s.type === "slots" && P["visit.when"] ? P["visit.when"] : s.q;
    const html = `${head()}<div class="fl-step">${intro}<h2 id="fl-q" class="fl-q" tabindex="-1">${esc(qText)}</h2>${lede ? `<p class="fl-lede">${esc(lede)}</p>` : ""}${body(s)}${nb}${ask}</div>`;
    swap(html, focus, true);
    if (writeUrl) url(i);
  }
  // Prompt 69, the Back bug: one screen on show, in both directions. The leaving screen used to be the stage's first
  // child, so a second tap within the 260 ms slide (Back, Back) faded the wrong one and left the previous step drawn
  // under the new one for good. Now every screen but the one on show is removed at once, and that one leaves inert.
  function swap(html: string, focus: boolean, bar = false) {
    const kids = [...stage.children] as HTMLElement[], old = kids.pop() ?? null;
    for (const k of kids) k.remove();
    const el = document.createElement("div"); el.className = "fl-screen"; el.innerHTML = html;
    // The slide is a CSS animation whose resting state is the screen itself (flow.css .is-entering, .is-leaving): a busy
    // or throttled frame can delay it, never leave a screen invisible (the old rAF-driven transition could).
    if (old && !reduce()) {
      old.inert = true; old.setAttribute("aria-hidden", "true");
      old.style.setProperty("--fl-dx", `${-dir * 28}px`); old.classList.remove("is-entering"); old.classList.add("is-leaving");
      el.style.setProperty("--fl-dx", `${dir * 28}px`); el.classList.add("is-entering");
      stage.append(el);
      // On a starved frame clock (a busy map underneath) the animation can stall at its first frame: the timer ends it.
      setTimeout(() => { old.remove(); el.classList.remove("is-entering"); }, 280);
    } else { stage.replaceChildren(el); }
    wire(el);
    // Round 2 (A-25, J-22, J72-18): in the sheet, a step's action bar lives in the sheet's footer, outside the scrolling
    // area, so the scroll area ends above it and nothing (chips, times, "Mudar") is ever under the bar.
    if (foot) { const go = bar ? el.querySelector<HTMLElement>(":scope > .fl-step > .fl-go") : null; foot.replaceChildren(...(go ? [go] : [])); foot.hidden = !go; }
    if (focus) el.querySelector<HTMLElement>(".fl-q")?.focus({ preventScroll: true });
  }
  // Each new screen starts at its top (the sheet keeps its scroll otherwise, and the back arrow and question were above the fold).
  // Prompt 70 (J-05): on the page too: a shorter step after a long one left the reader below the flow, so the page scrolls
  // back to the flow's top (under the sticky header) whenever that top is out of view.
  const top = () => {
    const sc = root.closest<HTMLElement>(".sh-in"); if (sc) { sc.scrollTop = 0; return; }
    const hd = [...document.querySelectorAll<HTMLElement>("header, .v2-head, .hdr")].find((h) => /fixed|sticky/.test(getComputedStyle(h).position));
    const off = (hd ? Math.max(0, hd.getBoundingClientRect().bottom) : 0) + 12, r = root.getBoundingClientRect();
    if (r.top < off || r.top > innerHeight * 0.6) scrollTo({ top: Math.max(0, scrollY + r.top - off), behavior: "auto" });
  };
  const go = (n: number, record = true) => {
    engaged = true; dir = n >= i ? 1 : -1;
    if (prepMode && n < 0) { prepMode = false; S = steps; i = N - 1; dir = -1; done(lastRoute || route()); top(); return; }  // Back from the first preparation question
    if (prepMode && n >= S.length) { sendPrep(); return; }
    const to = Math.max(0, Math.min(n, S.length - 1));
    if (record && to !== i) push(val(to));
    i = to;
    if (i > 0 && !begun && !prepMode) { begun = true; ev({ event: `flow/${F.id}/start`, band: band() }); }
    render(); top();
  };

  function wire(el: HTMLElement) {
    const s = S[i];
    el.querySelector("[data-back]")?.addEventListener("click", back);
    el.querySelector("[data-lawyer]")?.addEventListener("click", lawyerScreen);
    el.querySelector("[data-blds]")?.addEventListener("click", buildingsScreen);
    el.querySelectorAll<HTMLButtonElement>(".fl-opt").forEach((b, k, all) => {
      b.tabIndex = (A[s.id] ? b.getAttribute("aria-checked") === "true" : k === 0) ? 0 : -1;
      b.addEventListener("click", () => {
        A[s.id] = b.dataset.v!; save();
        all.forEach((x) => x.setAttribute("aria-checked", String(x === b)));
        if (s.type === "help") { const e = el.querySelector<HTMLElement>("[data-err]"); if (e) e.hidden = true; return; }  // step 1 also holds the budget: Continue moves on
        // A beat to see the choice, then on; only if the reader is still on this step (a quick Back cancels it).
        const at = i, list = S; setTimeout(() => { if (i === at && S === list) go(i + 1); }, reduce() ? 0 : 220);
      });
      b.addEventListener("keydown", (e) => {
        const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
        if (d) { e.preventDefault(); const nb = all[(k + d + all.length) % all.length]; nb.focus(); }
      });
    });
    // Prompt 69: the budget on step 1 and the language of the call on step 3, as pills (a second tap clears the budget).
    el.querySelectorAll<HTMLButtonElement>("[data-b]").forEach((b, _, all) => b.addEventListener("click", () => {
      A.budget = A.budget === b.dataset.b ? "" : b.dataset.b!; if (!A.budget) delete A.budget; save();
      all.forEach((x) => x.setAttribute("aria-checked", String(A.budget === x.dataset.b)));
    }));
    el.querySelectorAll<HTMLButtonElement>("[data-lang]").forEach((b, _, all) => b.addEventListener("click", () => {
      A.lang = b.dataset.lang!; save(); all.forEach((x) => x.setAttribute("aria-checked", String(x === b)));
    }));
    const inp = el.querySelector<HTMLInputElement | HTMLTextAreaElement>("[data-in]");
    inp?.addEventListener("input", () => {
      A[s.id] = inp.value; save();
      const box = el.querySelector("[data-blds-box]"); if (box) box.outerHTML = matchBox();
    });
    inp?.addEventListener("keydown", (e) => { if (e.key === "Enter" && !(inp instanceof HTMLTextAreaElement)) { e.preventDefault(); next(); } });
    el.querySelectorAll<HTMLButtonElement>("[data-chip]").forEach((b) => b.addEventListener("click", () => {
      if (!inp) return;
      // Prompt 70 (A-29): in the preparation a place joins the list (up to three) instead of replacing it.
      if (s.id === "prep-place") {
        const list = inp.value.split(",").map((x) => x.trim()).filter(Boolean); if (!list.includes(b.dataset.chip!)) list.push(b.dataset.chip!);
        inp.value = list.slice(0, 3).join(", "); A[s.id] = inp.value; save(); b.remove(); inp.focus(); return;
      }
      inp.value = b.dataset.chip!; A[s.id] = inp.value; save(); next();
    }));
    el.querySelectorAll<HTMLInputElement>("[data-c]").forEach((x) => x.addEventListener("input", () => {
      A[x.dataset.c!] = x.value.trim(); save();
      const e = el.querySelector<HTMLElement>(`[data-err-for="${x.dataset.c}"]`); if (e && !e.hidden) { e.hidden = true; x.removeAttribute("aria-invalid"); }
    }));
    el.querySelectorAll<HTMLInputElement>("[data-c]").forEach((x) => x.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); next(); } }));
    el.querySelector<HTMLInputElement>("[data-cc]")?.addEventListener("input", (e) => { A.cc = (e.target as HTMLInputElement).value.trim(); save(); });
    // The advisor's slots (prompt 41 §2): the same picker as the request flow; the readable times are the answer.
    const sp = el.querySelector<HTMLElement>("[data-slots]");
    if (sp) {
      const lang = F.hidden.language || "pt", locale = document.documentElement.lang || lang;
      const get = (): Slot[] => { try { return JSON.parse(A._slots || "[]"); } catch { return []; } };
      // Prompt 69: the Concierge shows the reader's own time zone first, Lisbon underneath; the advisor still reads Lisbon first.
      const own = F.id === "concierge" && P.tz ? { ed: F.hidden.edition, onZone: (how: string) => ev({ event: `flow/${F.id}/tz/${how}`, origin: how }),
        labels: { day: P["slot.day"], time: P["slot.time"], picked: P["slot.picked"], none: P["slot.none"], remove: P["slot.remove"], tz: P.tz, same: P["tz.same"], change: P["tz.change"], zone: P["tz.zone"], lisbon: P["tz.lisbon"], next: P["tz.next"], prev: P["tz.prev"] } } : undefined;
      slotPicker(sp, { lang, locale, own, get, set: (v) => { keptTimes = false; A._slots = JSON.stringify(v); A[s.id] = v.map((x) => slotLabel(x, locale, lang as "pt").both).join(" · "); if (!v.length) delete A[s.id]; save(); } });
    }
    el.querySelector("[data-next]")?.addEventListener("click", next);
    el.querySelector("[data-skip]")?.addEventListener("click", () => { delete A[s.id]; if (s.type === "slots") delete A._slots; save(); go(i + 1); });
    el.querySelectorAll<HTMLButtonElement>("[data-goto]").forEach((b) => b.addEventListener("click", () => go(Number(b.dataset.goto))));
    el.querySelector<HTMLButtonElement>("[data-send]")?.addEventListener("click", () => { if (validContact()) submit(); });
  }
  const hasSlots = () => !!A._slots && A._slots !== "[]";
  // Round 2 (MI2-04) and prompt 74: on the last step, one plain line says what goes with the request, only what the
  // reader did or chose (never "viu os preços de 10 anos"), and nothing when there is nothing to say.
  const cvGoes = () => {
    const b = cvBuild(cvCtx()), list = b.fields.filter((f) => ["country", "budget", "use", "fin", "interest"].includes(f.k)).map((f) => cvLine(f, CV!, eur));
    return list.length ? `<p class="fl-cvline">${esc(CV!.goes.replace("{list}", list.join(" · ")))}</p>` : "";
  };
  // M72-15: the edition's calling code (the reader can change it), and the number in international form when sent.
  const CC: Record<string, string> = { lu: "+352", fr: "+33", ch: "+41", br: "+55", us: "+1", il: "+972", uk: "+44" };
  const ccNow = () => { const v = (A.cc ?? CC[F.hidden.edition] ?? "+351").replace(/[^\d+]/g, ""); return v ? (v.startsWith("+") ? v : `+${v.replace(/^00/, "")}`) : ""; };
  const intl = (ph: string) => { const t = (ph || "").trim(); if (!t) return ""; if (t.startsWith("+")) return t; if (/^00\d/.test(t)) return `+${t.slice(2)}`;
    const c = ccNow(); return c ? `${c} ${t.replace(/^0(?=\d)/, "")}` : t; };
  // MI-20: "Book the call" only when a time was chosen; agreeing the time by e-mail sends the request.
  const sendLabel = () => (F.id === "concierge" && P.send ? (hasSlots() || !P["send.later"] ? P.send : P["send.later"]) : L.send);
  // The e-mail is what the advisor replies to (worker/index.js requires it); for a call, the name and the phone too.
  // Each missing or incomplete field gets its own message under it (prompt 70, A-27, S-20); the first one takes the focus.
  function validContact() {
    const s = S[i], scr = stage.lastElementChild as HTMLElement | null;
    if (s.type !== "contact" || !scr) return true;
    const call = !!s.call, errs: [string, string][] = [];
    if (call && !(A.name || "").trim()) errs.push(["name", L["err.name"]]);
    const em = (A.email || "").trim();
    if (!em) errs.push(["email", L["err.email"]]); else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) errs.push(["email", L["invalid.email"]]);
    const ph = (A.phone || "").replace(/\D/g, "");  // the national part: the country code is checked apart
    if (s.phone) { if (call && hasSlots() && !ph) errs.push(["phone", L["err.phone"]]); else if (ph && ph.length < 6) errs.push(["phone", L["err.phone.bad"]]); }
    scr.querySelectorAll<HTMLElement>("[data-err-for]").forEach((e) => {
      const m = errs.find((x) => x[0] === e.dataset.errFor); e.hidden = !m; e.textContent = m ? m[1] : "";
      const inp = scr.querySelector<HTMLInputElement>(`[data-c="${e.dataset.errFor}"]`); m ? inp?.setAttribute("aria-invalid", "true") : inp?.removeAttribute("aria-invalid");
    });
    if (errs.length) scr.querySelector<HTMLInputElement>(`[data-c="${errs[0][0]}"]`)?.focus();
    return !errs.length;
  }
  function next() {
    const s = S[i];
    if (s.type === "contact" && !validContact()) return;
    if (s.type === "help" && !A.help) { stage.lastElementChild?.querySelector<HTMLElement>(".fl-opt")?.focus(); return; }
    if (s.type === "text" && !s.optional && !(A[s.id] || "").trim()) { stage.querySelector<HTMLElement>("[data-in]")?.focus(); return; }
    go(i + 1);
  }

  // ------------------------------------------------------------ the partner lawyer (prompt 37 §4, D64)
  // A side screen, outside the step count: the card, then the booking with one unticked consent naming the lawyer.
  // A sample lawyer (preview builds only) sends nothing. Wording informative only (EOA art. 94).
  const lwHead = () => `<div class="fl-head"><button type="button" class="fl-back" data-lw-back aria-label="${esc(L.back)}">${ARROW}</button><span class="fl-prog lw-prog"></span></div>`;
  const fill = (t: string) => { const x = LW!.lawyers[0]; return t.replace("{name}", x.name).replace("{firm}", x.firm); };
  function side(html: string, back: () => void) {
    dir = 1; swap(html, true); top(); view = "side";
    const el = stage.lastElementChild as HTMLElement; el.querySelector("[data-lw-back]")?.addEventListener("click", () => { dir = -1; back(); });
    return el;
  }
  function lawyerScreen() {
    const x = LW!.lawyers[0], T = LW!.labels; reached("lawyer");
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
    const x = LW!.lawyers[0], T = LW!.labels; engaged = true; reached("book");
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
      const note = (html: string) => { const p = document.createElement("p"); p.className = "fl-fallback"; p.setAttribute("role", "status"); p.innerHTML = html; el.querySelector(".fl-go")!.after(p); p.scrollIntoView({ block: "nearest", behavior: reduce() ? "auto" : "smooth" }); };
      if (x.sample) { note(`<span class="lw-tag lw-tag-s">${esc(T.sample)}</span> ${esc(T.previewSent)}`); return; }  // the preview never sends
      const payload = { flow: "lawyer", lawyer: x.id, lawyerName: `${x.name} (${x.firm})`, ...F.hidden, name: val("name"), email: val("email"), question: val("question"), consent: true, consentText: fill(T.consent), page: location.pathname, hp: "" };
      send.disabled = true; send.textContent = L.sending; let sent = false;
      try { sent = (await fetch("/api/request", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })).ok; } catch { sent = false; }
      if (sent) { finished = true; ev({ event: "flow/lawyer/sent", band: band() }); side(`<div class="fl-done"><span class="fl-tick">${CHECK}</span><h2 class="fl-q" tabindex="-1">${esc(T.doneH)}</h2><p class="fl-lede">${esc(fill(T.doneP))}</p></div>`, () => go(i)); return; }
      send.disabled = false; send.textContent = T.book;
      const body = [`${x.name} (${x.firm})`, `${L.name}: ${payload.name}`, `${L.email}: ${payload.email}`, payload.question, "", `✓ ${payload.consentText}`].filter((v) => v !== undefined).join("\n");
      note(`${esc(L.fallback)} <a class="fl-btn" href="mailto:${F.mailto}?subject=${encodeURIComponent(`${T.book}: ${x.name} (${F.hidden.edition} · ${F.hidden.language})`)}&body=${encodeURIComponent(body)}">${esc(L["fallback.btn"])}</a>`);
    });
  }

  // ------------------------------------------------------------ sending
  const route = () => F.id !== "concierge" ? "ok" : A.budget === "3" || A.budget === "4" ? "private" : A._slots && A._slots !== "[]" ? "ok" : "later";
  // Prompt 69: step 1 (what for, the context and the budget) and step 3 (the language of the call) are read out too.
  const helpText = (s: Extract<Step, { type: "help" }>) => [
    A.help ? `${s.q} ${s.opts.find((o) => o.v === A.help)?.l ?? ""}` : "",
    ctxLabel && P["help.ctx"] ? `${P["help.ctx"]}: ${ctxLabel}` : "",
    A.budget ? `${s.budget.q}: ${s.budget.opts.find((o) => o.v === A.budget)?.l ?? ""}` : "",
  ];
  const answerText = () => steps.flatMap((s) => {
    if (s.type === "help") return helpText(s);
    if (s.type === "contact" && s.lang) return [A.lang ? `${s.lang.q}: ${s.lang.opts.find((o) => o.v === A.lang)?.l ?? A.lang}` : ""];
    if (s.type !== "choice" && s.type !== "text" && s.type !== "slots") return [];
    const v = s.type === "choice" ? s.opts.find((o) => o.v === A[s.id])?.l : A[s.id]; return [v ? `${s.q} ${v}` : ""];
  }).filter(Boolean);
  const answerIds = () => Object.fromEntries(steps.flatMap((s): [string, string][] => s.type === "help" ? [["help", A.help ?? ""], ["ctx", ctxLabel], ["budget", A.budget ?? ""], ["place", ctxPlace]]
    : s.type === "contact" && s.lang ? [["lang", A.lang ?? ""]] : s.type === "choice" || s.type === "text" || s.type === "slots" ? [[s.id, A[s.id] ?? ""]] : []));
  // Prompt 74 §4.3: a qualified buyer (4 of the 5 key fields) counted once per request, for that development's report.
  let cvqDone = false;
  function cvQualified() { if (cvqDone) return; cvqDone = true; ev({ event: `flow/${F.id}/cv/qualified`, band: band() }); if (projectId && /^[a-z0-9-]+$/.test(projectId)) ev({ event: `p/${projectId}/cvq`, place: projectId, origin: F.id }); }
  async function submit() {
    const scr = stage.lastElementChild as HTMLElement, btn = pick<HTMLButtonElement>(scr, "[data-send]")!; const hp = scr.querySelector<HTMLInputElement>("[data-hp]")?.value || "";
    btn.disabled = true; btn.textContent = L.sending;
    // Prompt 74: the Concierge carries the buyer profile (lib/cv.ts) instead of the older ticked summary ("ip.brief"),
    // which the partner flows keep.
    let brief = ""; if (F.id !== "concierge") try { brief = sessionStorage.getItem("ip.brief") || ""; } catch { /* none */ }
    const cvB = CV ? cvBuild(cvCtx()) : null, cv = cvB ? cvPayload(cvB, CV!, eur) : undefined;
    const payload = { flow: F.id, project: projectId, unit: q.get("unit") || "", ...F.hidden, answers: answerIds(), intent: visit && P["visit.intent"] ? fillP(P["visit.intent"], { name: ctxProject!.name }) : "",
      slots: (() => { try { return JSON.parse(A._slots || "[]"); } catch { return []; } })(),
      labels: [...(topic ? [`${X.topic}: ${topicLabel}`] : []), ...answerText()], topic, door: A.door || "", name: A.name || "", email: A.email || "", phone: intl(A.phone || ""), budget: budgetEur || "", brief, cv, profile: CV ? (F.links as Record<string, string>).profile : "", page: location.pathname, hp };
    let ok = false;
    try { const r = await fetch("/api/request", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) }); ok = r.ok; } catch { ok = false; }
    if (ok) { finished = true; sent = true; ev({ event: `flow/${F.id}/sent`, band: band() }); const pj = projectId; if (pj && /^[a-z0-9-]+$/.test(pj)) ev({ event: `p/${pj}/req`, place: pj, origin: F.id }); const r = route();
      if (CV) { cvSetCtx(cvCtx()); if (cvB?.qualified) cvQualified(); }
      // The confirmation's "Pronto" sends the profile again, so who sent it stays in this tab (never on the device).
      try { sessionStorage.setItem(`${key}.who`, JSON.stringify({ name: A.name || "", email: A.email || "", phone: intl(A.phone || ""), project: projectId })); } catch { /* none */ }
      // The answers leave this tab's storage once sent (and the device's 24-hour copy); the times stay (as slots, no name)
      // so the confirmation can show them again.
      isSent = true;
      try { sessionStorage.removeItem(key); localStorage.removeItem(KEEP); localStorage.setItem(SENT, String(Date.now())); sessionStorage.setItem(`${key}.done`, r); sessionStorage.setItem(`${key}.slots`, A._slots || "[]"); } catch { /* none */ } done(r); }
    else { ev({ event: `flow/${F.id}/fallback`, band: band() }); fallback(payload); }
  }
  // The confirmation, then one quiet closing line with two text links (prompt 42). The confirmation stays in the URL
  // (?concierge=done) and in this tab, so Back from those pages returns to it.
  function done(r = route(), writeUrl = true) {
    finished = true; prepMode = false; S = steps; lastRoute = r; view = "done"; root.dataset.step = "done";
    const d0 = (F.done as Record<string, { h: string; p: string }>)[r] ?? F.done.ok, X = F.extra as Record<string, string>, Lk = F.links as Record<string, string>;
    const vp = visit ? P[r === "later" ? "visit.done.later" : "visit.done"] : "";
    const d = vp ? { h: d0.h, p: fillP(vp, { name: ctxProject!.name }) } : d0;
    // Prompt 69: the times the reader chose (their zone first, Lisbon underneath), the optional preparation, and the IMT
    // line at the price they came with (one tap to the IMT screen).
    let times = "";
    if (F.id === "concierge" && P["done.times"]) {
      let sl: Slot[] = []; try { sl = JSON.parse(A._slots || sessionStorage.getItem(`${key}.slots`) || "[]"); } catch { sl = []; }
      const z = ownZone(F.hidden.edition).zone, sh = { next: P["tz.next"], prev: P["tz.prev"] };
      if (sl.length) times = `<p class="fl-k">${esc(P["done.times"])}</p><ul class="rq-picked fl-times">${sl.map((x) => { const l = slotOwn(x, locale, z, P["tz.lisbon"], sh); return `<li><div><b>${esc(l.main)}${l.shift ? ` (${esc(l.shift)})` : ""}</b>${l.lis ? `<small>${esc(l.lis)}</small>` : ""}</div></li>`; }).join("")}</ul>`;
    }
    // Prompt 74: the buyer profile card replaces the five-question preparation (kept, unused, in lib/flows.ts).
    const prep = CV ? `<div data-cv></div>` : F.id !== "concierge" || !PREP.length ? "" : prepSent ? `<p class="fl-prepd" data-prep-done>${CHECK}<span>${esc(P["prep.done.h"])}</span></p>`
      : A.email ? `<button type="button" class="fl-xopt fl-prep" data-prep><span>${esc(P.prep)}<small>${esc(P["prep.p"])}</small></span><i>${ARROW}</i></button>` : "";
    const imtL = F.id === "concierge" && ctxPrice && P["imt.line"] ? `<p class="fl-imt">${esc(fillP(P["imt.line"], { price: eur(ctxPrice), imt: eur(Math.round(imtOf(ctxPrice, false, false))) }))} <a class="fl-link" href="${esc(`${Lk.imt}?price=${ctxPrice}&own=0&resident=0`)}" data-imt="${ctxPrice}" data-imt-from="concierge">${esc(P["imt.how"])} →</a></p>` : "";
    dir = 1; swap(`<div class="fl-done"><span class="fl-tick">${CHECK}</span><h2 class="fl-q" tabindex="-1">${esc(d.h)}</h2><p class="fl-lede">${esc(d.p)}</p>${times}${prep}${imtL}
      <div class="fl-go"><a class="fl-btn" href="${F.links.path}">${esc(F.extra.path)}</a><a class="fl-link" href="${F.links.map}">${esc(F.extra.map)}</a></div>
      <p class="fl-more">${esc(X.more)} <a href="${Lk.path}">${esc(X.morePath)}</a> · <a href="${Lk.articles}">${esc(X.moreArticles)}</a></p></div>`, true);
    const mare = root.querySelector<HTMLTemplateElement>("template[data-flow-mare]"); if (mare) stage.lastElementChild?.querySelector(".fl-done")?.append(mare.content.cloneNode(true));  // D83: the quiet Maré line
    stage.lastElementChild?.querySelector("[data-prep]")?.addEventListener("click", prepOpen);
    const cvHost = stage.lastElementChild?.querySelector<HTMLElement>("[data-cv]");
    if (cvHost && CV) {
      let who: { name: string; email: string; phone: string; project: string } | null = null;
      try { who = JSON.parse(sessionStorage.getItem(`${key}.who`) || "null"); } catch { who = null; }
      const dev = ctxProject?.developer ? { name: ctxProject.developer, project: ctxProject.name } : undefined;
      cvCard(cvHost, { L: CV, ctx: cvCtx, locale, eds: edOpts.filter((x) => x !== "other").length ? edOpts.filter((x) => x !== "other") : ["lu", "fr", "ch", "br", "us", "il", "uk"],
        profile: (F.links as Record<string, string>).profile, dev,
        onEvent: (k) => { if (k === "summary" || k === "ready" || k === "share") ev({ event: `flow/${F.id}/cv/${k}`, band: band() }); if (k === "share" && projectId) ev({ event: `p/${projectId}/cvshare`, place: projectId, origin: F.id }); },
        send: who?.email ? async (cv, labels) => {
          const body = { flow: F.id, intent: CV.intent, project: who!.project || projectId, ...F.hidden, labels, cv, profile: (F.links as Record<string, string>).profile,
            name: who!.name, email: who!.email, phone: who!.phone, page: location.pathname, hp: "" };
          let ok = false; try { ok = (await fetch("/api/request", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })).ok; } catch { ok = false; }
          if (ok && cv.qualified) cvQualified();
          return ok;
        } : undefined });
    }
    if (writeUrl) history.replaceState({ ...(history.state || {}), ipK: depth }, "", href("done"));
  }
  // ------------------------------------------------------------ the preparation (prompt 69): after the confirmation,
  // optional, one question per screen (purpose, when they plan to buy, NIF, financing, where), then sent to the same
  // address as the request (/api/request, flow "concierge", with "Request: Preparation for the call"): no new routing.
  function prepOpen() {
    prepMode = true; S = PREP; i = 0; dir = 1; push(val(0));
    const pl = PREP.find((x) => x.type === "text" && x.prefill === "place"); if (pl && !A[pl.id] && ctxPlace) A[pl.id] = ctxPlace;
    ev({ event: `flow/${F.id}/prep/open`, band: band() }); render(); top();
  }
  async function sendPrep() {
    const labels = PREP.map((s) => { const v = s.type === "choice" ? s.opts.find((o) => o.v === A[s.id])?.l : A[s.id]; return v ? `${s.q} ${v}` : ""; }).filter(Boolean);
    if (!labels.length) { go(-1); return; }  // nothing answered: back to the confirmation
    const scr = stage.lastElementChild as HTMLElement, btn = pick<HTMLButtonElement>(scr, "[data-next]");
    if (btn) { btn.disabled = true; btn.textContent = L.sending; }
    const payload = { flow: F.id, intent: P["prep.intent"], project: projectId, ...F.hidden, answers: Object.fromEntries(PREP.map((s) => [s.id, A[s.id] ?? ""])), labels,
      name: A.name || "", email: A.email || "", phone: intl(A.phone || ""), page: location.pathname, hp: "" };
    let ok = false;
    try { ok = (await fetch("/api/request", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) })).ok; } catch { ok = false; }
    if (ok) { prepSent = true; ev({ event: `flow/${F.id}/prep/sent`, band: band() }); prepMode = false; S = steps; i = N - 1; done(lastRoute || route()); top(); return; }  // this entry now shows the confirmation
    ev({ event: `flow/${F.id}/prep/fallback`, band: band() });
    if (btn) { btn.disabled = false; btn.textContent = P["prep.send"]; }
    const href = `mailto:${F.mailto}?${F.mailcc ? `cc=${encodeURIComponent(F.mailcc)}&` : ""}subject=${encodeURIComponent(`${P["prep.intent"]} (${F.hidden.edition} · ${F.hidden.language})`)}&body=${encodeURIComponent([...labels, `${L.name}: ${payload.name}`, `${L.email}: ${payload.email}`].join("\n"))}`;
    const box = document.createElement("p"); box.className = "fl-fallback"; box.innerHTML = `${esc(L.fallback)} <a class="fl-btn" href="${href}">${esc(L["fallback.btn"])}</a>`;
    scr.querySelector(".fl-fallback")?.remove(); noteAfterGo(scr, box);
  }
  function fallback(p: Record<string, unknown>) {
    const subject = `${F.title} (${F.hidden.edition} · ${F.hidden.language})`;
    const text = [...(p.labels as string[]), `${L.name}: ${p.name}`, `${L.email}: ${p.email}`, p.phone ? `${L.phone}: ${p.phone}` : "", p.brief ? `\n${p.brief}` : "", "", steps[N - 1].type === "review" ? (steps[N - 1] as Extract<Step, { type: "review" }>).text : (steps[N - 1] as { notice?: string }).notice || ""].filter((x) => x !== "").join("\n");
    const href = `mailto:${F.mailto}?${F.mailcc ? `cc=${encodeURIComponent(F.mailcc)}&` : ""}subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    const scr = stage.lastElementChild as HTMLElement, btn = pick<HTMLButtonElement>(scr, "[data-send]")!; btn.textContent = sendLabel(); btn.disabled = false;
    const box = document.createElement("p"); box.className = "fl-fallback"; box.innerHTML = `${esc(L.fallback)} <a class="fl-btn" href="${href}">${esc(L["fallback.btn"])}</a>`;
    scr.querySelector(".fl-fallback")?.remove(); noteAfterGo(scr, box);
  }

  // ------------------------------------------------------------ start
  const pv = q.get(opts.param), start = Number(pv);
  // MI-13: back in this tab on the same context (a language switch, another page), the reader's step comes back too.
  const resume = (fromSession || fromKeep) && sameCtx && !fromHome && !pv && Number(A._i) > 0 && Number(A._i) < N ? Number(A._i) : 0;
  // Prompt 78b (UX-20, M-12): "Book a private visit" on a development opens on step 2 ("When can we call you to arrange the
  // visit?"): step 1 is already answered by the context (Comprar casa, Sobre: <development>). Back still reaches it.
  const visitStart = visit && !pv && !resume && N > 1 && steps[0]?.type === "help" && A.help === "home" ? 1 : 0;
  i = start >= 1 && start <= N ? start - 1 : resume || offset || visitStart;
  const first = i;  // the first screen the reader sees (the bank and tax line sits on it)
  const wasDone = pv === "done" || /^p\d+$/.test(pv || "") ? (() => { try { return sessionStorage.getItem(`${key}.done`); } catch { return null; } })() : null;
  const lawyerFirst = topic === "lawyer" && !!LW && !start;
  // In the sheet, nothing is written to the URL until it opens (show() pushes that entry).
  if (wasDone) { sent = true; isSent = true; done(wasDone); } else if (lawyerFirst) lawyerScreen(); else render(false, !sheet || pv != null);
  // show(): what the sheet displays each time it opens (the lawyer card for a lawyer link, else the current step).
  const show = () => {
    engaged = true;
    // Reopened on a later step (MI-13: the reader's step came back), each step up to it gets its entry, so Back walks them.
    if (sheet && !new URLSearchParams(location.search).has(opts.param)) { if (view === "done") push("done"); else for (let n = Math.min(offset, i); n <= i; n++) push(val(n)); }
    if (view === "done") return; return lawyerFirst ? lawyerScreen() : go(i, false);
  };
  return { go, show, stop, pop, unwind, mute: () => { finished = true; }, reset: () => { finished = false; prepMode = false; S = steps; i = 0; render(false); }, focus: () => stage.querySelector<HTMLElement>(".fl-q")?.focus({ preventScroll: true }), clearUrl: () => url(null), at: () => i };
}
