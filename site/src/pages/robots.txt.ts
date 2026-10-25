import { config } from "../config";

// The sitemap line uses the request's host: each edition domain serves its own sitemap-{ed}.xml (task 15).
const ED_BY_HOST: Record<string, string> = { "imoveisportugal.lu": "lu", "imoveisportugal.fr": "fr", "imoveisportugal.ch": "ch", "imoveisportugal.com.br": "br", "imoveisportugal.us": "us", "imoveisportugal.co.il": "il" };

export function GET({ request }: { request: Request }) {
  const host = new URL(request.url).hostname.replace(/^www\./, "");
  const ed = ED_BY_HOST[host];
  const body = config.launchReady
    ? `User-agent: *\nAllow: /\n${ed ? `\nSitemap: https://${host}/sitemap-${ed}.xml\n` : ""}`
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
