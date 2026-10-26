// The illustrative buyer of a private demo (prompts 28 §2b and 29 §2a): the home they pick, its total cost and the
// qualified summary as the developer would receive it, shared by the viewing form, the sample enquiry email, the demo
// page, the one-pager and the film. Always labelled illustrative; no real person or data.
import { DEMOS, type Demo } from "./demos";
import { demoProjects } from "./projects";
import { PRICES } from "./prices";
import { purchase } from "./sims";
import { summary, BRIEF_KEYS, type BriefLabels } from "./brief";
import { c } from "./copy";

export const money = (v: number, k = "EUR") => new Intl.NumberFormat("en-US", { style: "currency", currency: k, maximumFractionDigits: 0 }).format(v);
export function demoBuyer(d: Demo) {
  const ps = demoProjects(d.token).filter((p) => p.units?.length);
  const pick = ps.flatMap((p) => p.units!.map((u) => ({ p, u }))).find((x) => x.u.id === d.home)!;
  const total = Math.round(pick.u.price ? purchase(pick.u.price, false, false, false).total : d.budgets[0]);
  // One set of numbers everywhere (CEO review, 26 Oct): the buyer's budget in their own currency with its exact euro
  // value at the ECB rate; the home's price and its all-in total, exact, never converted or rounded; any financing
  // rounded to the thousand and labelled "about", with own funds as the exact remainder so the two add up.
  const loan = d.buyer.own >= 1 ? 0 : Math.round((total * (1 - d.buyer.own)) / 1000) * 1000;
  const budget = d.buyer.cur === "EUR" ? money(d.buyer.amount) : `${money(d.buyer.amount, d.buyer.cur)} (${money(Math.round(d.budgets[0]))})`;
  const L = Object.fromEntries(BRIEF_KEYS.map((k) => [k, c(`brief.${k}`, "en")])) as BriefLabels;
  const reader = d.readers.find((r) => r.ed === d.buyer.ed) ?? d.readers[0];
  const line = summary({ door: "buy", total: Math.round(d.budgets[0]), own: loan ? total - loan : undefined, loan, when: d.buyer.when, nif: false, places: [PRICES.munis[pick.p.muni].n] },
    L, (v) => (v === Math.round(d.budgets[0]) ? budget : money(v)), (v) => `${Math.round(v)}%`, c(`journey.from.${d.buyer.ed}`, "en"));
  return { pick, total, budget, line, lines: [...line.split(" · "), "Viewing by video first, in person when they visit"], reader };
}
export const demoByToken = (t: string) => DEMOS.find((d) => d.token === t)!;
// "Your team for this purchase" in the demos: roles only until a partner signs (prompt 29 §2a step 7).
export const TEAM = [
  { role: "Lawyer", line: "NIF, power of attorney, checks on the home and the deed." },
  { role: "Bank", line: "A credit intermediary registered with Banco de Portugal (DL 81-C/2017), if they finance." },
  { role: "Tax adviser", line: "The purchase seen from home: reporting, the treaty, later the sale." },
  { role: "Notary", line: "The deed, at a notary or a Casa Pronta desk, in person or by power of attorney." },
];
