// The demo's project pins for the embedded map (?demoproj={token}): unlisted, used only by the private demo page.
import { DEMOS } from "../../../lib/demos";
export function getStaticPaths() { return DEMOS.map((d) => ({ params: { token: d.token } })); }
export function GET({ params }: { params: { token: string } }) {
  const d = DEMOS.find((x) => x.token === params.token)!;
  return new Response(JSON.stringify(d.pins), { headers: { "Content-Type": "application/json" } });
}
