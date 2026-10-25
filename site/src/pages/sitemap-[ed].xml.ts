// One sitemap per edition domain (task 15): sitemaps must sit on the host they list. The home, every page and the blog,
// in pt, en and fr. Blog articles list only their canonical edition (D24). Linked from robots.txt once launchReady is on.
import { ED_ORDER, EDITIONS, LANGS, pathFor, type EdCode, type PageKey } from "../i18n";
import { postsFor, CANONICAL_ED } from "../lib/blog";
import { PLACES } from "../lib/places";
import { SUB, ENABLED } from "../lib/tools";

export function getStaticPaths() { return ED_ORDER.map((ed) => ({ params: { ed } })); }

const PAGES: PageKey[] = ["partners", "buy", "how", "privacy", "legal", "faq", "talk", "guide", "compare", "sims", "casa", "data", "map", "blog"];

export function GET({ params }: { params: { ed: EdCode } }) {
  const ed = params.ed, host = `https://${EDITIONS[ed].domain}`;
  const urls: string[] = [];
  for (const lang of LANGS) {
    urls.push(`${host}${pathFor(lang, ed, "home")}`);
    for (const k of PAGES) urls.push(`${host}${pathFor(lang, ed, k)}`);
    for (const t of ENABLED) urls.push(`${host}${pathFor(lang, ed, "sims")}${SUB[t][lang]}/`);
    for (const p of PLACES) urls.push(`${host}${pathFor(lang, ed, "map")}${p.slug}/`);
    if (CANONICAL_ED[lang] === ed) for (const p of postsFor(lang)) urls.push(`${host}${pathFor(lang, ed, "blog")}${p.slug}/`);
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
