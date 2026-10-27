// The site search index per language and edition (prompt 35 §3.3, D61): places, questions, calculators, the path's
// steps and the main pages, each with its link. Fetched only when the reader opens search (components/Spotlight.astro).
import type { APIRoute } from "astro";
import { LANGS, ED_ORDER, pathFor, type Lang, type EdCode } from "../../i18n";
import { MAP_MUNIS } from "../../lib/mapdata";
import { faqFor } from "../../lib/content";
import { TOOLS, ENABLED, SUB } from "../../lib/tools";
import { stationsFor } from "../../lib/path";
import { c } from "../../lib/copy";

export function getStaticPaths() {
  return LANGS.flatMap((lang) => ED_ORDER.map((ed) => ({ params: { key: `${lang}-${ed}` }, props: { lang, ed } })));
}

export const GET: APIRoute = ({ props }) => {
  const { lang, ed } = props as { lang: Lang; ed: EdCode };
  const map = pathFor(lang, ed, "map"), faq = pathFor(lang, ed, "faq"), sims = pathFor(lang, ed, "sims"), path = pathFor(lang, ed, "journey");
  const items: [string, string, string, string?][] = [];  // [group, name, url, sub]
  for (const k of ["journey", "map", "sims", "faq", "partners", "consult", "data", "blog", "how"] as const)
    items.push(["page", c(`common.nav.${k === "journey" ? "journey" : k}`, lang), pathFor(lang, ed, k)]);
  for (const m of MAP_MUNIS) items.push(["place", m.n, `${map}?place=${m.s}`, c(`map.r.${m.r}`, lang)]);
  for (const t of TOOLS.filter((x) => ENABLED.includes(x))) items.push(["sim", c(`sims.${t}.name`, lang), `${sims}${SUB[t][lang]}/`]);
  const seen = new Set<string>();
  for (const door of ["buy", "sell"] as const) for (const s of stationsFor(door, ed)) {
    if (seen.has(s.k)) continue; seen.add(s.k);
    items.push(["step", c(`path.st.${s.k}.h`, lang), `${path}?door=${door}#s-${s.k}`]);
  }
  for (const it of faqFor(ed, lang)) items.push(["faq", it.q, `${faq}#${it.id}`]);
  return new Response(JSON.stringify(items), { headers: { "content-type": "application/json" } });
};
