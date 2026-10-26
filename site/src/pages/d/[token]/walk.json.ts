// "Walk the path as this buyer" (prompt 29 §2b): the seven steps on the real site in demo mode (?demo=<token>), read by
// DemoBar.astro. Unlisted, like the demo.
import { DEMOS } from "../../../lib/demos";
import { walkSteps } from "../../../lib/demowalk";
export function getStaticPaths() { return DEMOS.map((d) => ({ params: { token: d.token } })); }
export function GET({ params }: { params: { token: string } }) {
  const d = DEMOS.find((x) => x.token === params.token)!;
  return new Response(JSON.stringify({ who: `${d.buyer.line} ${d.buyer.words}`, developer: d.developer, steps: walkSteps(d),
    end: [{ t: "Your showcase", url: `/d/${d.token}/homes/` }, { t: "The sample enquiry", url: `/d/${d.token}/enquiry/` }] }), { headers: { "Content-Type": "application/json" } });
}
