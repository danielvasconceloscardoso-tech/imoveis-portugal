// The requests as one question at a time (prompt 35 §3.9, D61): the concierge (the free first call with the partner
// agency), a partner request and a private viewing. Same fields and routing as the Tally forms they replace
// (ops/TALLY_CONSULTA.md, ops/SETUP.md §4); submission through /api/request (worker/index.js, ops/ARCHITECTURE.md), which
// e-mails Imóveis Portugal and the partner agency together (operator, 3 Nov 2026: GDPR art. 6(1)(b), no consent box).
// The last screen is the review: the answers, the send button and one line naming both recipients (COPY_DECK "send.*").
// Built here at build time into a small JSON the browser engine (scripts/flow.ts) renders. Wording: COPY_DECK.md "flow.*".
import { ED_ORDER, pathFor, type Lang, type EdCode } from "../i18n";
import { SUB } from "./tools";
import { CATS, EDITION_CUR, RATE } from "./content";
import { config } from "../config";
import { c } from "./copy";

export type FlowId = "concierge" | "partner" | "viewing";
type Opt = { v: string; l: string };
export type Step =
  | { id: string; type: "choice"; q: string; opts: Opt[]; prefill?: "edition" | "budget" | "lang" | "cat"; row?: boolean; optional?: boolean }
  | { id: string; type: "text"; q: string; ph: string; multi?: boolean; prefill?: "place"; optional?: boolean }
  | { id: string; type: "contact"; q: string; phone: boolean; lang?: { q: string; opts: Opt[] }; send?: boolean; notice?: string; call?: boolean }
  | { id: string; type: "slots"; q: string; optional?: boolean; skip?: string }
  // Prompt 69: what the Concierge can help with, opened on what the reader came from (scripts/flow.ts adds that option).
  | { id: string; type: "help"; q: string; lede: string; opts: Opt[]; budget: { q: string; opts: Opt[] } }
  | { id: string; type: "review"; q: string; text: string };

const n = (prefix: string, count: number, lang: Lang): Opt[] => Array.from({ length: count }, (_, i) => ({ v: String(i + 1), l: c(`${prefix}.${i + 1}`, lang) }));

export function flowConfig(id: FlowId, lang: Lang, ed: EdCode, hidden: Record<string, string> = {}) {
  const country: Step = { id: "country", type: "choice", q: c("flow.c.country", lang), prefill: "edition",
    opts: [...ED_ORDER.map((x) => ({ v: x, l: c(`common.country.${x}`, lang) })), { v: "other", l: c("flow.other", lang) }] };
  const contact = (phone: boolean): Step => ({ id: "contact", type: "contact", q: c("flow.contact", lang), phone });
  // The last screen (id "consent" kept so the step counts keep their names): the review and the recipients line.
  const review: Step = { id: "consent", type: "review", q: c("flow.consent.h", lang), text: c("send.notice", lang) };
  const window: Step = { id: "window", type: "choice", q: c("flow.c.window", lang), opts: n("flow.c.window", 3, lang) };
  // The Concierge before prompt 69 (eleven questions): kept, unused, so its step names and copy stay on record (its /e/
  // step pages are still built, lib/events.ts, so older counts keep their pages).
  const conciergeV1: Step[] = [
    country,
    { id: "budget", type: "choice", q: c("flow.c.budget", lang), opts: n("flow.c.budget", 4, lang), prefill: "budget" },
    { id: "purpose", type: "choice", q: c("flow.c.purpose", lang), opts: n("flow.c.purpose", 5, lang) },
    { id: "when", type: "slots", q: c("flow.c.when", lang), optional: true },  // prompt 41 §2: real slots (scripts/slots.ts)
    { id: "fin", type: "choice", q: c("flow.c.fin", lang), opts: n("flow.c.fin", 3, lang) },
    { id: "nif", type: "choice", q: c("flow.c.nif", lang), opts: [{ v: "yes", l: c("flow.yes", lang) }, { v: "no", l: c("flow.no", lang) }], row: true },
    { id: "place", type: "text", q: c("flow.c.place", lang), ph: c("flow.c.place.ph", lang), prefill: "place", optional: true },
    { id: "lang", type: "choice", q: c("flow.c.lang", lang), opts: [{ v: "pt", l: "Português" }, { v: "en", l: "English" }, { v: "fr", l: "Français" }], prefill: "lang", row: true },
    window, contact(true),
    review,
  ];
  // Prompt 69 (content/METHOD.md): three steps. 1. What can we help with, opened on what the reader came from (the
  // project, the place, the budget: scripts/flow.ts adds that option, chosen). 2. When can we call you: one picker in
  // the reader's own time zone, Lisbon underneath (replaces c.when and c.window). 3. How do we reach you, the language of
  // the call, and send. What can wait (purpose, timeline, NIF, financing, where) is the optional preparation after the
  // confirmation (prep), and nothing already known is asked again.
  const lang3: Opt[] = [{ v: "pt", l: "Português" }, { v: "en", l: "English" }, { v: "fr", l: "Français" }];
  const concierge: Step[] = [
    { id: "help", type: "help", q: c("p69.help", lang), lede: c("p69.lede", lang),
      opts: ["home", "costs", "sell"].map((v) => ({ v, l: c(`p69.help.${v}`, lang) })), budget: { q: c("p69.budget", lang), opts: n("flow.c.budget", 4, lang) } },
    { id: "call", type: "slots", q: c("p69.when", lang), optional: true, skip: c("p69.when.skip", lang) },
    // Prompt 70 (A-10): a call, so the name and the phone are asked for (the advisor calls that number) and the e-mail
    // carries the confirmation; when the reader chose to agree a time by e-mail instead, the phone is optional again.
    { id: "reach", type: "contact", q: c("p69.reach", lang), phone: true, lang: { q: c("p69.lang", lang), opts: lang3 }, send: true, notice: c("p69.notice", lang), call: true },
  ];
  const prep: Step[] = id === "concierge" ? [
    // Prompt 70 (J-30): "Returning to Portugal" only where the edition's readers include emigrants (not the US or Israel).
    { id: "prep-purpose", type: "choice", q: c("flow.c.purpose", lang), opts: n("flow.c.purpose", 5, lang).filter((o) => o.v !== "4" || !["us", "il"].includes(ed)), optional: true },
    { id: "prep-horizon", type: "choice", q: c("flow.c.when", lang), opts: n("flow.c.when", 4, lang), optional: true },
    { id: "prep-nif", type: "choice", q: c("flow.c.nif", lang), opts: [{ v: "yes", l: c("flow.yes", lang) }, { v: "no", l: c("flow.no", lang) }], row: true, optional: true },
    { id: "prep-fin", type: "choice", q: c("flow.c.fin", lang), opts: n("flow.c.fin", 3, lang), optional: true },
    // Prompt 70 (A-29): one to three places, separated by commas; the places the reader looked at are one tap away.
    { id: "prep-place", type: "text", q: c("p69.place", lang), ph: c("p69.place.ph", lang), prefill: "place", optional: true },
  ] : [];
  void conciergeV1;
  const steps: Step[] = id === "concierge" ? concierge : id === "partner" ? [
    { id: "cat", type: "choice", q: c("flow.p.cat", lang), opts: CATS.map((k) => ({ v: k, l: c(`talk.cat.${k}.h`, lang) })), prefill: "cat" },
    country,
    { id: "question", type: "text", q: c("flow.p.question", lang), ph: c("flow.p.question.ph", lang), multi: true },
    contact(false),
    review,
  ] : [
    { id: "how", type: "choice", q: c("flow.v.how", lang), opts: n("flow.v.how", 2, lang), row: true },
    window, country, contact(true),
    review,
  ];
  const done = id === "concierge"
    ? { ok: { h: c("p69.done.h", lang), p: c("p69.done.p", lang) }, private: { h: c("p69.done.h", lang), p: c("p69.done.p", lang) }, later: { h: c("p69.done.h", lang), p: c("p69.done.p.later", lang) } }
    : id === "partner" ? { ok: { h: c("flow.p.done.h", lang), p: c("flow.p.done.p", lang) } } : { ok: { h: c("flow.v.done.h", lang), p: c("flow.v.done.p", lang) } };
  // Prompt 69: the words the three steps, the confirmation, the preparation and the IMT line need in the browser.
  const P69 = id === "concierge" ? Object.fromEntries(["help.ctx", "help.project", "help.place", "help.placebudget", "help.budget", "tz", "tz.same", "tz.change", "tz.zone",
    "tz.lisbon", "tz.next", "tz.prev", "slot.day", "slot.time", "slot.picked", "slot.none", "slot.remove", "done.times", "prep", "prep.p", "prep.send", "prep.done.h", "prep.intent",
    "imt.line", "imt.how", "send", "send.later", "notice.later", "phone", "email"].map((k) => [k, c(`p69.${k}`, lang, Object.fromEntries(["name", "place", "inplace", "price", "city", "ofcity", "imt"].map((x) => [x, `{${x}}`])))])) : {};
  // Prompt 70 (J-08): the edition's own currency, for a budget the reader typed in it on the home bar (ECB reference rate).
  const cur = EDITION_CUR[ed];
  return {
    id, steps, done, prep, p69: P69 as Record<string, string>, fx: id === "concierge" && cur ? { cur, rate: RATE(cur).rate } : null,
    title: c(id === "concierge" ? "flow.c.title" : id === "partner" ? "flow.p.title" : "flow.v.title", lang),
    lede: id === "concierge" ? c("flow.c.lede", lang) : "",
    hidden: { edition: ed, language: lang, ...hidden },
    mailto: config.contactEmail,
    // The ready-written e-mail's copy to the partner agency, when the build sets PUBLIC_AGENCY_EMAIL (never in the repo).
    mailcc: ((import.meta.env.PUBLIC_AGENCY_EMAIL as string | undefined) || "").trim(),
    links: { path: pathFor(lang, ed, "journey"), map: pathFor(lang, ed, "map"), privacy: pathFor(lang, ed, "privacy"), articles: pathFor(lang, ed, "articles"), imt: `${pathFor(lang, ed, "sims")}${SUB.imt[lang]}/`, home: pathFor(lang, ed, "home") },
    labels: { ...Object.fromEntries(["back", "next", "skip", "of", "close", "send", "sending", "review", "fallback", "fallback.btn", "invalid.email", "name", "email", "phone"]
      .map((k) => [k, c(`flow.${k}`, lang, k === "of" ? { i: "{i}", n: "{n}" } : {})])),
      // Prompt 70 (A-27, S-20): one message under each field that is missing or incomplete.
      ...Object.fromEntries(["err.name", "err.email", "err.phone", "err.phone.bad"].map((k) => [k, c(`p69.${k}`, lang)])) } as Record<string, string>,
    extra: { path: c("consult.later.path", lang), map: c("map.open", lang), privacy: c("common.privacy", lang), policy: c("send.privacy", lang),
      // Prompt 42: the closing line under the next steps, with two text links.
      more: c("flow.more", lang), morePath: c("flow.more.path", lang), moreArticles: c("flow.more.articles", lang),
      // Prompt 43 §3b: the partner links open the concierge with ?topic=; the topic is shown in the review and sent.
      topic: c("flow.topic", lang), topicIntro: c("flow.topic.intro", lang),
      topicLawyer: c("flow.topic.lawyer", lang), topicAdvisor: c("flow.topic.advisor", lang), topicBank: c("flow.topic.bank", lang), topicTax: c("flow.topic.tax", lang) },
  };
}
export type FlowConfig = ReturnType<typeof flowConfig>;
/** The Concierge's step ids before prompt 69 (eleven questions), still built as /e/ pages so older counts keep their pages. */
export const CONCIERGE_V1_STEPS = ["country", "budget", "purpose", "when", "fin", "nif", "place", "lang", "window", "contact", "consent"];
