// Country suggestion (operator, 3 Nov 2026). A visitor whose connection comes from one of our six countries and who
// opens another country's edition sees one quiet line at the top: "Vive no Brasil? Ver a edição Brasil". Cloudflare
// gives the country of the connection (request.cf.country); nothing is stored, no cookie, no redirect. The line is
// closed for the visit with x (sessionStorage). Only on an edition's home and its top-level pages, never on the map.
// The link carries ?de=geo-{from}-{to} so the arrival is counted by the site's own events.

export const GEO_ED = { LU: "lu", FR: "fr", CH: "ch", BR: "br", US: "us", IL: "il" };

const ASK = {
  pt: { lu: "Vive no Luxemburgo?", fr: "Vive em França?", ch: "Vive na Suíça?", br: "Vive no Brasil?", us: "Vive nos Estados Unidos?", il: "Vive em Israel?" },
  en: { lu: "Living in Luxembourg?", fr: "Living in France?", ch: "Living in Switzerland?", br: "Living in Brazil?", us: "Living in the United States?", il: "Living in Israel?" },
  fr: { lu: "Vous vivez au Luxembourg ?", fr: "Vous vivez en France ?", ch: "Vous vivez en Suisse ?", br: "Vous vivez au Brésil ?", us: "Vous vivez aux États-Unis ?", il: "Vous vivez en Israël ?" },
};
const GO = {
  pt: { lu: "Ver a edição Luxemburgo", fr: "Ver a edição França", ch: "Ver a edição Suíça", br: "Ver a edição Brasil", us: "Ver a edição EUA", il: "Ver a edição Israel" },
  en: { lu: "See the Luxembourg edition", fr: "See the France edition", ch: "See the Switzerland edition", br: "See the Brazil edition", us: "See the USA edition", il: "See the Israel edition" },
  fr: { lu: "Voir l'édition Luxembourg", fr: "Voir l'édition France", ch: "Voir l'édition Suisse", br: "Voir l'édition Brésil", us: "Voir l'édition États-Unis", il: "Voir l'édition Israël" },
};
const CLOSE = { pt: "Fechar", en: "Close", fr: "Fermer" };
const MAP = new Set(["mapa", "map", "carte"]);

/** The suggestion for this path and country, or null. Path shape: /{lang}/{ed}/ or /{lang}/{ed}/{slug}/. */
export function geoSuggest(pathname, country) {
  const m = pathname.match(/^\/(pt|en|fr)\/(lu|fr|ch|br|us|il)\/(?:([a-z0-9-]+)\/)?$/);
  const to = GEO_ED[String(country || "").toUpperCase()];
  if (!m || !to || to === m[2] || (m[3] && MAP.has(m[3]))) return null;
  const [, lang, from, slug] = m;
  return { lang, from, to, href: `/${lang}/${to}/${slug ? `${slug}/` : ""}?de=geo-${from}-${to}` };
}

/** The line's HTML: fixed at the top, the header moved down under it while it shows. */
export function geoBanner(s) {
  return `<div id="ip-geo" lang="${s.lang}" role="region" aria-label="${GO[s.lang][s.to]}" style="position:fixed;inset:0 0 auto 0;z-index:80;height:44px;display:flex;align-items:center;justify-content:center;gap:14px;padding:0 48px 0 16px;background:#F1EDE5;color:#1E1E1C;border-bottom:1px solid #E2DDD2;font:400 14px/1.2 Manrope,Helvetica,Arial,sans-serif;text-align:center"><span>${ASK[s.lang][s.to]}</span><a href="${s.href}" style="color:#2F5D50;font-weight:600;text-decoration:none;white-space:nowrap">${GO[s.lang][s.to]} &rsaquo;</a><button type="button" aria-label="${CLOSE[s.lang]}" style="position:absolute;right:8px;top:6px;width:32px;height:32px;border:0;background:none;color:#8A867C;font-size:20px;line-height:1;cursor:pointer">&times;</button></div>`
    + `<style id="ip-geo-s">body{padding-top:44px}.hd{top:44px!important}@media (max-width:420px){#ip-geo span{display:none}}</style>`
    + `<script>(function(){var b=document.getElementById("ip-geo");try{if(sessionStorage.getItem("ip-geo-x")){b.remove();document.getElementById("ip-geo-s").remove();return}}catch(e){}b.querySelector("button").addEventListener("click",function(){b.remove();var s=document.getElementById("ip-geo-s");if(s)s.remove();try{sessionStorage.setItem("ip-geo-x","1")}catch(e){}})})();</script>`;
}
