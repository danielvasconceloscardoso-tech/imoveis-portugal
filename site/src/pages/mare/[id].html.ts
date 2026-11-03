// The beehiiv draft of one Maré issue (D83): /mare/{YYYY-MM-DD}.html, the same e-mail as the preview on the Maré page,
// with absolute links and images on the primary domain and utm_source=mare&utm_medium=email&utm_campaign={id}.
// One letter for every reader (D74): its site links point at the Luxembourg edition. The operator pastes it into a
// beehiiv draft; nothing is sent from the site.
import type { APIRoute } from "astro";
import { config } from "../../config";
import { issues, issueById, renderIssue } from "../../lib/mare";

export function getStaticPaths() { return issues().map((i) => ({ params: { id: i.id } })); }
export const GET: APIRoute = ({ params }) => {
  const i = issueById(String(params.id))!;
  const html = renderIssue(i, { ed: "lu", origin: `https://${config.primaryDomain}`, utm: true });
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" } });
};
