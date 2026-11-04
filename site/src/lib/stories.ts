// The ten lifestyle articles of D83 (operator, 3 Nov 2026): two-minute reads in Portuguese (pt-PT), American English and
// French of France (fix step 4, 3 Nov: same voice, facts and sources in each language), one photograph each,
// every fact a marker [[fact-id]] from content/facts/facts.csv (EDITORIAL_POLICY.md), every place a link to its card on
// the map ([Matosinhos](place:matosinhos)), then "Para ir" (components/ParaIr.astro), a small map tile and the Concierge
// handover in the article's own voice. One Markdown file per article and language: content/stories/{id}.{pt,en,fr}.md,
// each with its own slug. URL: /pt/{ed}/artigos/{slug}/, /en/{ed}/articles/{slug}/, /fr/{ed}/articles/{slug}/ (the
// Artigos hub, next to the four reference articles of lib/articles.ts); hreflang links the three versions of one id.
// Checked by scripts/check-content.mjs (front matter, 350 to 450 words, sources, banned wording).
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { marked } from "marked";
import { pathFor, type EdCode, type Lang } from "../i18n";
import { FACTS, Sources } from "./content";
import { MAP_MUNIS, REGIONS } from "./mapdata";

const dir = join(process.cwd(), "..", "content", "stories");
const pub = join(process.cwd(), "public");

export type Airport = "OPO" | "LIS" | "FAO";
export type Story = {
  id: string; lang: Lang; slug: string; title: string; description: string; published: string; updated: string; order: number;
  /** the municipality the article lives in (map slug): the tile, the Concierge prefill */
  place: string;
  photo: { src: string; alt: string; caption: string };
  airport: Airport;
  go: { where: string; when: string };
  /** the last line, in the article's voice; the words in [brackets] become the link to the Concierge */
  concierge: string;
  sources: string[];
  /** a sponsor's name when the piece is paid for: the sponsored label shows (EDITORIAL_POLICY.md) */
  sponsored?: string;
  body: string; words: number;
};

const iso = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d));
const FM = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
const MUNI = new Map(MAP_MUNIS.map((m) => [m.s, m]));

/** The words a reader reads: the body without fact markers, link targets and Markdown signs. */
export const readingWords = (body: string) => body
  .replace(/\[\[[a-z0-9-]+\]\]/g, "").replace(/\]\([^)]*\)/g, "]").replace(/^#+\s*/gm, "").replace(/[*_[\]]/g, "")
  .split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

function load(): Story[] {
  if (!existsSync(dir)) return [];
  const out: Story[] = [];
  for (const f of readdirSync(dir).filter((x) => /\.(pt|en|fr)\.md$/.test(x)).sort()) {
    const m = readFileSync(join(dir, f), "utf8").match(FM);
    if (!m) throw new Error(`stories ${f}: front matter missing`);
    const fm = yaml.load(m[1]) as Record<string, any>;
    if (f !== `${fm.id}.${fm.lang}.md`) throw new Error(`stories ${f}: file name must be {id}.{lang}.md`);
    for (const k of ["id", "lang", "slug", "title", "description", "published", "updated", "order", "place", "photo", "airport", "go", "concierge", "sources"])
      if (fm[k] === undefined) throw new Error(`stories ${f}: front matter "${k}" missing`);
    if (!MUNI.has(fm.place)) throw new Error(`stories ${f}: unknown place ${fm.place}`);
    if (!existsSync(join(pub, `${fm.photo.src}-640.webp`))) throw new Error(`stories ${f}: photo ${fm.photo.src}-640.webp missing`);
    for (const id of fm.sources) if (!FACTS[id]) throw new Error(`stories ${f}: unknown fact ${id}`);
    for (const [, id] of m[2].matchAll(/\[\[([a-z0-9-]+)\]\]/g)) if (!FACTS[id]) throw new Error(`stories ${f}: unknown fact ${id}`);
    for (const [, id] of m[2].matchAll(/\]\(fact:([a-z0-9-]+)\)/g)) if (!FACTS[id]) throw new Error(`stories ${f}: unknown fact ${id}`);
    for (const [, s] of m[2].matchAll(/\]\(place:([a-z0-9-]+)\)/g)) if (!MUNI.has(s)) throw new Error(`stories ${f}: unknown place ${s}`);
    for (const [, r] of m[2].matchAll(/\]\(region:([a-z]+)\)/g)) if (!(REGIONS as readonly string[]).includes(r)) throw new Error(`stories ${f}: unknown region ${r}`);
    out.push({ ...fm, published: iso(fm.published), updated: iso(fm.updated), body: m[2], words: readingWords(m[2]) } as Story);
  }
  return out.sort((a, b) => a.order - b.order);
}
const ALL = load();

/** The lifestyle articles in one language, in their reading order. */
export const storiesFor = (lang: Lang): Story[] => ALL.filter((s) => s.lang === lang);
/** One id per article, shared by its three languages (events: lib/events.ts, art/{id}/...). */
export const STORY_IDS = [...new Set(ALL.map((s) => s.id))];
/** The same article in another language (hreflang, the language switch), or undefined when that version is missing. */
export const storyIn = (id: string, lang: Lang): Story | undefined => ALL.find((s) => s.id === id && s.lang === lang);
export const muniName = (slug: string) => MUNI.get(slug)?.n ?? slug;

/** Responsive photograph: the widths that exist on disk (640, 1024 and 1600 where the original allows). */
export function photoSet(src: string) {
  const widths = [640, 1024, 1600].filter((w) => existsSync(join(pub, `${src}-${w}.webp`)));
  const set = (ext: string) => widths.map((w) => `/${src}-${w}.${ext} ${w}w`).join(", ");
  return { webp: set("webp"), avif: widths.every((w) => existsSync(join(pub, `${src}-${w}.avif`))) ? set("avif") : "", fallback: `/${src}-${widths[widths.length - 1]}.webp`, widths };
}

/** Body as HTML: [[fact-id]] a numbered source; [words](fact:id) the words themselves linked to the source (it joins
 * the numbered list too); [Name](place:slug) a quiet link to the place on the map. */
export function renderStory(s: Story, ed: EdCode): { html: string; sources: Sources; places: string[] } {
  const src = new Sources();
  const map = pathFor(s.lang, ed, "map");
  const places: string[] = [];
  const text = s.body
    .replace(/\[([^\]]+)\]\(fact:([a-z0-9-]+)\)/g, (_, words, id) => {
      const f = FACTS[id]; src.n(id);
      return `<a class="st-src-l" href="${f.source_url}" rel="noopener" title="${f.source_title.replace(/"/g, "&quot;")}">${words}</a>`;
    })
    .replace(/\[\[([a-z0-9-]+)\]\]/g, (_, id) => `<a class="sup" href="#fonte-${src.n(id)}">${src.n(id)}</a>`)
    .replace(/\[([^\]]+)\]\(place:([a-z0-9-]+)\)/g, (_, name, slug) => {
      places.push(slug);
      return `<a class="st-pl" href="${map}?place=${slug}" data-place="${slug}">${name}</a>`;
    })
    // Prompt 72: [words](region:algarve) opens the edition's map on a region card (?region=, scripts/map-v3.ts showRegion).
    .replace(/\[([^\]]+)\]\(region:([a-z]+)\)/g, (_, words, key) => `<a class="st-pl" href="${map}?region=${key}">${words}</a>`);
  for (const id of s.sources) src.n(id);
  const dedup = text.replace(/(<a class="sup" href="#fonte-(\d+)">\2<\/a>)(?:<a class="sup" href="#fonte-\2">\2<\/a>)+/g, "$1");
  return { html: marked.parse(dedup, { gfm: true, async: false }) as string, sources: src, places: [...new Set(places)] };
}

// ------------------------------------------------------------ "Para ir": the flight from the reader's edition
// Published schedules, one sourced flight per route (facts.csv "flight-*", PlaneMapper, checked 3 Nov 2026). The origin
// follows the edition: LU Luxembourg, FR Paris, CH Geneva (Zurich for Faro), BR São Paulo, US New York, IL Tel Aviv.
// Where no direct route is in the file, the line gives the edition's direct flight to Lisbon instead.
export type Route = { city: string; fact: string; flight: string; to: Airport };
const R = (city: string, fact: string, flight: string, to: Airport): Route => ({ city, fact, flight, to });
export const ROUTES: Record<EdCode, Partial<Record<Airport, Route>>> = {
  lu: { OPO: R("lux", "flight-lux-opo", "Luxair LG3761", "OPO"), LIS: R("lux", "flight-lux-lis", "TAP TP693", "LIS"), FAO: R("lux", "flight-lux-fao", "Luxair LG785", "FAO") },
  fr: { OPO: R("par", "flight-par-opo", "TAP TP455", "OPO"), LIS: R("par", "flight-par-lis", "TAP TP433", "LIS"), FAO: R("par", "flight-par-fao", "Transavia TO7678", "FAO") },
  ch: { OPO: R("gva", "flight-gva-opo", "TAP TP939", "OPO"), LIS: R("gva", "flight-gva-lis", "TAP TP941", "LIS"), FAO: R("zrh", "flight-zrh-fao", "Edelweiss WK268", "FAO") },
  br: { OPO: R("sao", "flight-sao-opo", "TAP TP94", "OPO"), LIS: R("sao", "flight-sao-lis", "TAP TP82", "LIS") },
  us: { OPO: R("nyc", "flight-nyc-opo", "TAP TP212", "OPO"), LIS: R("nyc", "flight-nyc-lis", "TAP TP210", "LIS") },
  il: { LIS: R("tlv", "flight-tlv-lis", "El Al LY375", "LIS") },
};
/** The route for this edition and airport, or the edition's Lisbon flight when there is no direct one in the file. */
export function routeFor(ed: EdCode, to: Airport): { route: Route; direct: boolean } {
  const r = ROUTES[ed][to];
  if (r) return { route: r, direct: true };
  return { route: ROUTES[ed].LIS!, direct: false };
}
export const flightTime = (fact: string) => FACTS[fact].value;
