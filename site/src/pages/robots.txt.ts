import { config } from "../config";
import { ED_ORDER, EDITIONS } from "../i18n";

// Sitemaps (task 15): on the primary domain every edition's sitemap lives on that one host; with own-domain each
// edition domain serves its own. Crawling stays blocked until config.launchReady.
export function GET({ request }: { request: Request }) {
  const host = new URL(request.url).hostname.replace(/^www\./, "");
  const own = ED_ORDER.find((e) => EDITIONS[e].domain === host);
  const maps = config.domainMode === "primary" && host === config.primaryDomain ? ED_ORDER : own ? [own] : [];
  const body = config.launchReady
    ? `User-agent: *\nAllow: /\n${maps.length ? "\n" + maps.map((e) => `Sitemap: https://${host}/sitemap-${e}.xml`).join("\n") + "\n" : ""}`
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
