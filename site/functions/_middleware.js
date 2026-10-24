// Cloudflare Pages middleware: each country domain opens its own edition.
// DOMAIN_MODE (env var) = "own-domain" (default) or "primary".
// PRIMARY_DOMAIN (env var) = e.g. "imoveisportugal.lu" (used in "primary" mode).
const EDITION_BY_HOST = {
  "imoveisportugal.lu": "lu",
  "imoveisportugal.fr": "fr",
  "imoveisportugal.ch": "ch",
  "imoveisportugal.com.br": "br",
};

export async function onRequest(ctx) {
  const url = new URL(ctx.request.url);
  const host = url.hostname.replace(/^www\./, "");
  const ed = EDITION_BY_HOST[host];
  if (!ed) return ctx.next(); // pages.dev previews and unknown hosts pass through

  const mode = ctx.env.DOMAIN_MODE || "own-domain";
  const primary = ctx.env.PRIMARY_DOMAIN || "imoveisportugal.lu";

  if (mode === "primary" && host !== primary) {
    const path = url.pathname === "/" ? `/${ed}/` : url.pathname;
    return Response.redirect(`https://${primary}${path}${url.search}`, 301);
  }
  if (url.pathname === "/" || (url.hostname.startsWith("www.") && mode === "own-domain")) {
    const path = url.pathname === "/" ? `/${ed}/` : url.pathname;
    return Response.redirect(`https://${host}${path}${url.search}`, 301);
  }
  return ctx.next();
}
