// The illustrative buyer of a private demo (prompts 28 §2b and 29 §2a): the home they pick, its total cost and the
// qualified summary as the developer would receive it, shared by the viewing form, the sample enquiry email, the demo
// page, the one-pager and the film. Always labelled illustrative; no real person or data.
import { DEMOS, rateOf, type Demo } from "./demos";
import { demoProjects } from "./projects";
import { PRICES } from "./prices";
import { purchase } from "./sims";
import { summary, BRIEF_KEYS, type BriefLabels } from "./brief";
import { c } from "./copy";

export const money = (v: number, k = "EUR") => new Intl.NumberFormat("en-US", { style: "currency", currency: k, maximumFractionDigits: 0 }).format(v);
export function demoBuyer(d: Demo) {
  const ps = demoProjects(d.token).filter((p) => p.units?.length);
  const pick = ps.flatMap((p) => p.units!.map((u) => ({ p, u }))).find((x) => x.u.id === d.home)!;
  const total = pick.u.price ? purchase(pick.u.price, false, false, false).total : d.budgets[0];
  const own = Math.round((total * d.buyer.own) / 1000) * 1000;
  const L = Object.fromEntries(BRIEF_KEYS.map((k) => [k, c(`brief.${k}`, "en")])) as BriefLabels;
  const reader = d.readers.find((r) => r.ed === d.buyer.ed) ?? d.readers[0];
  const line = summary({ door: "buy", total: Math.round(total), own: d.buyer.own < 1 ? own : undefined, loan: d.buyer.own >= 1 ? 0 : Math.round(total - own), when: d.buyer.when, nif: false, places: [PRICES.munis[pick.p.muni].n] },
    L, (v) => money(Math.round(v / 1000) * 1000), (v) => `${Math.round(v)}%`, c(`journey.from.${d.buyer.ed}`, "en"));
  const local = (v: number) => (d.buyer.cur === "EUR" ? "" : money(Math.round((v * rateOf(d.buyer.cur)) / 1000) * 1000, d.buyer.cur));
  return { pick, total, line, lines: [...line.split(" · "), "Viewing by video first, in person when they visit"], reader, local };
}
export const demoByToken = (t: string) => DEMOS.find((d) => d.token === t)!;
// "Your team for this purchase" in the demos: roles only until a partner signs (prompt 29 §2a step 7).
export const TEAM = [
  { role: "Lawyer", line: "NIF, power of attorney, checks on the home and the deed." },
  { role: "Bank", line: "A credit intermediary registered with Banco de Portugal (DL 81-C/2017), if they finance." },
  { role: "Tax adviser", line: "The purchase seen from home: reporting, the treaty, later the sale." },
  { role: "Notary", line: "The deed, at a notary or a Casa Pronta desk, in person or by power of attorney." },
];
