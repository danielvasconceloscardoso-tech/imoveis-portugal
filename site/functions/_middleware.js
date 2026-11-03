// Cloudflare Pages middleware: each country domain opens its own edition.
// DOMAIN_MODE (env var) = "own-domain" (default) or "primary".
// PRIMARY_DOMAIN (env var) = e.g. "imoveisportugal.pt" (used in "primary" mode).
// D18: URLs are /{lang}/{edition}/; a country domain opens its edition in its default language.
// 3 Nov 2026: on the serving host, a page of another country's edition gets one line suggesting the visitor's own
// edition (functions-lib/geo.js); the page itself is unchanged and nothing is stored.
import { geoSuggest, geoBanner } from "../functions-lib/geo.js";
const DEFAULT_LANG = { lu: "pt", fr: "fr", ch: "pt", br: "pt", us: "en", il: "en" };
const EDITION_BY_HOST = {
  "imoveisportugal.lu": "lu",
  "imoveisportugal.fr": "fr",
  "imoveisportugal.ch": "ch",
  "imoveisportugal.com.br": "br",
  // USA and Israel domains not chosen yet (ops/DOMAINS_US_IL.md): placeholders.
  "imoveisportugal.us": "us",
  "imoveisportugal.co.il": "il",
};

export async function onRequest(ctx) {
  const url = new URL(ctx.request.url);
  const host = url.hostname.replace(/^www\./, "");
  const ed = EDITION_BY_HOST[host];
  if (!ed) return withGeo(ctx, url); // the primary domain, pages.dev previews and unknown hosts pass through

  const mode = ctx.env.DOMAIN_MODE || "own-domain";
  const primary = ctx.env.PRIMARY_DOMAIN || "imoveisportugal.pt";

  if (mode === "primary" && host !== primary) {
    const path = url.pathname === "/" ? `/${DEFAULT_LANG[ed]}/${ed}/` : url.pathname;
    return Response.redirect(`https://${primary}${path}${url.search}`, 301);
  }
  if (url.pathname === "/" || (url.hostname.startsWith("www.") && mode === "own-domain")) {
    const path = url.pathname === "/" ? `/${DEFAULT_LANG[ed]}/${ed}/` : url.pathname;
    return Response.redirect(`https://${host}${path}${url.search}`, 301);
  }
  return withGeo(ctx, url);
}

async function withGeo(ctx, url) {
  const res = await ctx.next();
  try {
    if (ctx.request.method !== "GET" || !(res.headers.get("content-type") || "").includes("text/html")) return res;
    const s = geoSuggest(url.pathname, ctx.request.cf && ctx.request.cf.country);
    if (!s) return res;
    const out = new HTMLRewriter().on("body", { element(el) { el.prepend(geoBanner(s), { html: true }); } }).transform(res);
    const h = new Headers(out.headers); h.append("Vary", "CF-IPCountry");
    return new Response(out.body, { status: out.status, statusText: out.statusText, headers: h });
  } catch (_) { return res; }
}
