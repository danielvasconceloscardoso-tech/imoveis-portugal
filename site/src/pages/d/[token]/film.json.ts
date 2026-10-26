// What the film renderer (scripts/demo-film.mjs) needs for one private demo: the buyer line, the budget in their
// currency, the municipality's three INE numbers with the period, and the pages to film. Unlisted, like the demo.
import { DEMOS, rateOf } from "../../../lib/demos";
import { PRICES, LAST } from "../../../lib/prices";
export function getStaticPaths() { return DEMOS.map((d) => ({ params: { token: d.token } })); }
export function GET({ params }: { params: { token: string } }) {
  const d = DEMOS.find((x) => x.token === params.token)!;
  const s = PRICES.munis[d.muni] as any, m2 = s.m2[LAST] as number, q = PRICES.quarters[LAST];
  const p = d.pins.find((x) => x.muni === d.muni)!;
  const money = (v: number, k: string) => new Intl.NumberFormat("en-US", { style: "currency", currency: k, maximumFractionDigits: 0 }).format(v);
  return new Response(JSON.stringify({
    developer: d.developer, project: d.project, accent: d.accent, line: d.buyer.line, words: d.buyer.words,
    typed: money(d.buyer.amount, d.buyer.cur), budgetEur: d.budgets[0], cur: d.buyer.cur, rate: rateOf(d.buyer.cur),
    muni: d.muni, muniName: s.n, center: d.center, pin: [p.lon, p.lat],
    nums: [
      { v: `${new Intl.NumberFormat("en-US").format(Math.round(d.budgets[0] / m2))} m²`, k: `for ${money(d.buyer.amount, d.buyer.cur)} in ${s.n}` },
      { v: `${s.g10 > 0 ? "+" : ""}${Math.round(s.g10)}%`, k: "price per m², ten years" },
      { v: `${s.yield.toFixed(1)}%`, k: "gross rental yield" },
    ],
    period: `INE, Q${q.slice(-1)} ${q.slice(0, 4)} · median of homes sold, last 12 months`,
    homes: `/d/${d.token}/homes/`, home: `/d/${d.token}/home/${d.home}/`, demo: `/d/${d.token}/`,
  }), { headers: { "Content-Type": "application/json" } });
}
