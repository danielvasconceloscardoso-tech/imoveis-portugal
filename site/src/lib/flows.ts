// The requests as one question at a time (prompt 35 §3.9, D61): the concierge (the free first call with the partner
// agency), a partner request and a private viewing. Same fields, data, consent and routing as the Tally forms they replace
// (ops/TALLY_CONSULTA.md, ops/SETUP.md §4); submission through /api/request (worker/index.js, ops/ARCHITECTURE.md).
// Built here at build time into a small JSON the browser engine (scripts/flow.ts) renders. Wording: COPY_DECK.md "flow.*".
import { ED_ORDER, pathFor, type Lang, type EdCode } from "../i18n";
import { CATS } from "./content";
import { config } from "../config";
import { c } from "./copy";

export type FlowId = "concierge" | "partner" | "viewing";
type Opt = { v: string; l: string };
export type Step =
  | { id: string; type: "choice"; q: string; opts: Opt[]; prefill?: "edition" | "budget" | "lang" | "cat"; row?: boolean; optional?: boolean }
  | { id: string; type: "text"; q: string; ph: string; multi?: boolean; prefill?: "place"; optional?: boolean }
  | { id: string; type: "contact"; q: string; phone: boolean }
  | { id: string; type: "slots"; q: string; optional?: boolean }
  | { id: string; type: "consent"; q: string; text: string };

const n = (prefix: string, count: number, lang: Lang): Opt[] => Array.from({ length: count }, (_, i) => ({ v: String(i + 1), l: c(`${prefix}.${i + 1}`, lang) }));

export function flowConfig(id: FlowId, lang: Lang, ed: EdCode, hidden: Record<string, string> = {}) {
  const country: Step = { id: "country", type: "choice", q: c("flow.c.country", lang), prefill: "edition",
    opts: [...ED_ORDER.map((x) => ({ v: x, l: c(`common.country.${x}`, lang) })), { v: "other", l: c("flow.other", lang) }] };
  const contact = (phone: boolean): Step => ({ id: "contact", type: "contact", q: c("flow.contact", lang), phone });
  const window: Step = { id: "window", type: "choice", q: c("flow.c.window", lang), opts: n("flow.c.window", 3, lang) };
  const steps: Step[] = id === "concierge" ? [
    country,
    { id: "budget", type: "choice", q: c("flow.c.budget", lang), opts: n("flow.c.budget", 4, lang), prefill: "budget" },
    { id: "purpose", type: "choice", q: c("flow.c.purpose", lang), opts: n("flow.c.purpose", 5, lang) },
    { id: "when", type: "slots", q: c("flow.c.when", lang), optional: true },  // prompt 41 §2: real slots (scripts/slots.ts)
    { id: "fin", type: "choice", q: c("flow.c.fin", lang), opts: n("flow.c.fin", 3, lang) },
    { id: "nif", type: "choice", q: c("flow.c.nif", lang), opts: [{ v: "yes", l: c("flow.yes", lang) }, { v: "no", l: c("flow.no", lang) }], row: true },
    { id: "place", type: "text", q: c("flow.c.place", lang), ph: c("flow.c.place.ph", lang), prefill: "place", optional: true },
    { id: "lang", type: "choice", q: c("flow.c.lang", lang), opts: [{ v: "pt", l: "Português" }, { v: "en", l: "English" }, { v: "fr", l: "Français" }], prefill: "lang", row: true },
    window, contact(true),
    { id: "consent", type: "consent", q: c("flow.consent.h", lang), text: c("flow.c.consent", lang) },
  ] : id === "partner" ? [
    { id: "cat", type: "choice", q: c("flow.p.cat", lang), opts: CATS.map((k) => ({ v: k, l: c(`talk.cat.${k}.h`, lang) })), prefill: "cat" },
    country,
    { id: "question", type: "text", q: c("flow.p.question", lang), ph: c("flow.p.question.ph", lang), multi: true },
    contact(false),
    { id: "consent", type: "consent", q: c("flow.consent.h", lang), text: c("flow.p.consent", lang) },
  ] : [
    { id: "how", type: "choice", q: c("flow.v.how", lang), opts: n("flow.v.how", 2, lang), row: true },
    window, country, contact(true),
    { id: "consent", type: "consent", q: c("flow.consent.h", lang), text: c("flow.c.consent", lang) },
  ];
  const done = id === "concierge"
    ? { ok: { h: c("consult.ok.h1", lang), p: c("consult.ok.p", lang) }, private: { h: c("consult.private.h1", lang), p: c("consult.private.p", lang) }, later: { h: c("consult.later.h1", lang), p: c("consult.later.p", lang) } }
    : id === "partner" ? { ok: { h: c("flow.p.done.h", lang), p: c("flow.p.done.p", lang) } } : { ok: { h: c("flow.v.done.h", lang), p: c("flow.v.done.p", lang) } };
  return {
    id, steps, done,
    title: c(id === "concierge" ? "flow.c.title" : id === "partner" ? "flow.p.title" : "flow.v.title", lang),
    lede: id === "concierge" ? c("flow.c.lede", lang) : "",
    hidden: { edition: ed, language: lang, ...hidden },
    mailto: config.contactEmail,
    links: { path: pathFor(lang, ed, "journey"), map: pathFor(lang, ed, "map"), privacy: pathFor(lang, ed, "privacy"), articles: pathFor(lang, ed, "articles") },
    labels: Object.fromEntries(["back", "next", "skip", "of", "close", "send", "sending", "review", "fallback", "fallback.btn", "invalid.email", "name", "email", "phone"]
      .map((k) => [k, c(`flow.${k}`, lang, k === "of" ? { i: "{i}", n: "{n}" } : {})])) as Record<string, string>,
    extra: { path: c("consult.later.path", lang), map: c("map.open", lang), privacy: c("common.privacy", lang),
      // Prompt 42: the closing line under the next steps, with two text links.
      more: c("flow.more", lang), morePath: c("flow.more.path", lang), moreArticles: c("flow.more.articles", lang) },
  };
}
export type FlowConfig = ReturnType<typeof flowConfig>;
