// One journey per country (prompt 20 §2): nine checkpoints from the idea to the keys, then renting, selling and
// passing it on. Each question is answered from content/facts/facts.csv (primary sources) or, where no primary
// source could be opened, marked `ask` and sent to a partner (listed in content/journeys/UNVERIFIED.md).
// Wording: COPY_DECK.md "journey.*". Every checkpoint ends with an empty partner slot for that step and country.
import type { EdCode } from "../i18n";

export type Role = "agency" | "developer" | "bank" | "fx" | "lawyer" | "tax" | "insurance" | "wealth" | "architect" | "rental";
export type JQ = { id: string; a?: string; ck?: string; facts: string[]; cat: string; only?: EdCode[]; ask?: boolean; link?: "map" | "sims" | "private" | "prices" };
// high: a station the path adds by itself when the reader's budget is high (D52); never labelled as such.
export type Checkpoint = { k: string; roles: Role[]; qs: JQ[]; high?: boolean };
const EU: EdCode[] = ["lu", "fr"];
const NON_EU: EdCode[] = ["ch", "br", "us", "il"];
const per = (id: string, cat: string, facts: Partial<Record<EdCode, string[]>>, ask: EdCode[] = []): JQ[] =>
  (["lu", "fr", "ch", "br", "us", "il"] as EdCode[]).map((ed) => ({ id, a: `${id}.${ed}`, facts: facts[ed] ?? [], cat, only: [ed], ask: ask.includes(ed) }));

export const JOURNEY: Checkpoint[] = [
  { k: "budget", roles: ["agency", "developer"], qs: [
    { id: "space", facts: ["ine-m2-2026q2"], cat: "agency", link: "map" },
    { id: "trend", facts: ["ine-m2-2026q2"], cat: "agency", link: "prices" },
  ] },
  { k: "finance", roles: ["bank", "fx"], qs: [
    { id: "lend", facts: ["pt-ltv-limits"], cat: "bank" },
    { id: "howmuch", facts: ["pt-dsti-45", "pt-maturity-limits"], cat: "bank", link: "sims" },
    { id: "homeloan", facts: [], cat: "bank", only: ["lu", "il"], ask: true },
    { id: "ch.pillar", facts: ["ch-2nd-pillar-abroad", "ch-3a-home"], cat: "bank", only: ["ch"] },
    { id: "move", facts: ["pt-aml-funds"], cat: "fx" },
    { id: "fr.3916", facts: ["fr-3916"], cat: "tax", only: ["fr"] },
    { id: "us.fbar", facts: ["us-fbar", "us-8938-abroad"], cat: "tax", only: ["us"] },
    { id: "br.cbe", facts: ["br-bens-exterior", "br-cbe"], cat: "tax", only: ["br"] },
  ] },
  { k: "docs", roles: ["lawyer"], qs: [
    { id: "nif", facts: ["pt-nif-nonresident"], cat: "lawyer" },
    { id: "rep.eu", facts: ["pt-tax-rep"], cat: "lawyer", only: EU },
    { id: "rep.non", facts: ["pt-tax-rep", "pt-nif-nonresident"], cat: "lawyer", only: NON_EU },
    { id: "account", facts: ["pt-mortgage-tied-sales"], cat: "bank", ask: true },
    { id: "poa", facts: ["pt-poa-apostille"], cat: "lawyer" },
  ] },
  { k: "buy", roles: ["lawyer", "agency"], qs: [
    { id: "cpcv", facts: ["pt-sinal-442"], cat: "lawyer" },
    { id: "deed", facts: ["pt-casa-pronta-fees"], cat: "lawyer" },
    { id: "docs", facts: ["pt-casa-pronta-docs-all"], cat: "lawyer" },
  ] },
  { k: "taxbuy", roles: ["tax"], qs: [
    { id: "imt", facts: ["pt-imt-nonresident-flat", "pt-imt-nonresident-exceptions"], cat: "tax", link: "sims" },
    { id: "is", facts: ["pt-is-purchase", "pt-is-loan-5y"], cat: "tax" },
  ] },
  { k: "own", roles: ["insurance", "tax"], qs: [
    { id: "imi", facts: ["pt-imi-rates", "pt-aimi-deduction"], cat: "tax" },
    { id: "ins", facts: ["pt-mortgage-insurance"], cat: "bank" },
  ] },
  { k: "rent", roles: ["tax"], qs: [
    { id: "renttax", facts: ["pt-rent-tax-nonresident", "pt-al-registration"], cat: "tax" },
    ...per("home.rent", "tax", { lu: ["lu-pt-treaty-property"], ch: ["ch-pt-treaty-property"], br: ["br-pt-treaty-property"], il: ["il-pt-treaty-property"], us: ["us-pt-treaty-gains"], fr: ["fr-pt-treaty-source"] }, ["fr"]),
  ] },
  { k: "sell", roles: ["tax"], qs: [
    { id: "cg", facts: ["pt-cg-50pct", "pt-irs-68-2026", "pt-cg-nonres-28-revoked"], cat: "tax" },
    ...per("home.sell", "tax", { lu: ["lu-pt-treaty-property"], ch: ["ch-pt-treaty-property"], br: ["br-pt-treaty-property"], us: ["us-pt-treaty-gains"], fr: ["fr-pt-treaty-source"] }, ["fr", "il"]),
  ] },
  { k: "struct", roles: ["lawyer", "wealth"], qs: [
    { id: "live", facts: ["pt-visa-own-income", "pt-ari-realestate-ended"], cat: "lawyer" },
    { id: "br.cplp", facts: ["pt-cplp-residence"], cat: "lawyer", only: ["br"] },
    { id: "ifici", facts: ["pt-ifici-20pct"], cat: "tax" },
    { id: "inherit", facts: ["pt-is-inheritance-exempt"], cat: "lawyer", link: "private" },
  ] },
  // D52: for high budgets, holdings, the wealth tax on property and how to hold the home, with wealth managers,
  // banks and cross-border tax and legal firms in the partner slot. Copy shared with the residence page (private.*).
  { k: "estate", high: true, roles: ["wealth", "tax", "lawyer"], qs: [
    { id: "aimi", ck: "private.aimi", facts: ["pt-aimi-deduction", "pt-aimi-rates"], cat: "tax" },
    { id: "holding", ck: "private.holding", facts: ["pt-aimi-rates", "pt-imt-offshore-10", "pt-imi-offshore-75"], cat: "tax", link: "private" },
    { id: "bank", ck: "private.bank", facts: ["pt-ltv-limits"], cat: "bank" },
  ] },
];

/** The questions shown for one country, in order. */
export const journeyFor = (ed: EdCode) => JOURNEY.map((cp) => ({ ...cp, qs: cp.qs.filter((q) => !q.only || q.only.includes(ed)) }));
