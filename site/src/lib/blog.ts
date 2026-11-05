// Blog: knowledge articles for search and for AI answers (task 15). One Markdown file per article and language in
// content/blog/{id}.{lang}.md, with front matter. Every fact is a marker [[fact-id]] that becomes a numbered source
// (content/facts/facts.csv, same rule as the FAQ). Articles show on every edition; the canonical URL sits on one
// edition per language (D24) so the six editions do not compete with each other in search.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { marked } from "marked";
import { LANGS, EDITIONS, pathFor, type EdCode, type Lang, type PageKey } from "../i18n";
import { FACTS, Sources, type Cat } from "./content";
import { hostFor } from "./host";

const dir = join(process.cwd(), "..", "content", "blog");

export type Post = {
  id: string; lang: Lang; slug: string; title: string; description: string; tldr: string;
  published: string; updated: string; cta: Cat | "agency"; related: string[]; sources: string[];
  body: string; minutes: number;
  // Prompt 43 §3: the three most-asked follow-ups (FAQ structured data and a short list under the article).
  faq?: { q: string; a: string }[]; keyword?: string; aliases?: string[];
};

// YAML reads 2026-10-25 as a Date; keep the ISO text.
const iso = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d));
const FM = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
function load(): Post[] {
  const out: Post[] = [];
  for (const f of readdirSync(dir).filter((x) => /\.(pt|en|fr)\.md$/.test(x)).sort()) {
    const m = readFileSync(join(dir, f), "utf8").match(FM);
    if (!m) throw new Error(`blog ${f}: front matter missing`);
    const fm = yaml.load(m[1]) as Record<string, any>;
    for (const k of ["id", "lang", "slug", "title", "description", "tldr", "published", "updated", "cta"]) if (!fm[k]) throw new Error(`blog ${f}: front matter "${k}" missing`);
    const words = m[2].split(/\s+/).length;
    out.push({ ...fm, related: fm.related ?? [], sources: fm.sources ?? [], published: iso(fm.published), updated: iso(fm.updated), body: m[2], minutes: Math.max(1, Math.round(words / 200)) } as Post);
  }
  for (const p of out) for (const id of p.sources) if (!FACTS[id]) throw new Error(`blog ${p.id}.${p.lang}: unknown fact ${id}`);
  return out;
}
const ALL = load();

export const postsFor = (lang: Lang): Post[] => ALL.filter((p) => p.lang === lang).sort((a, b) => b.published.localeCompare(a.published));
export const postById = (id: string, lang: Lang) => ALL.find((p) => p.id === id && p.lang === lang);
export const postSlugs = (id: string): Record<Lang, string> => Object.fromEntries(LANGS.map((l) => [l, postById(id, l)?.slug ?? ""])) as Record<Lang, string>;
export const BLOG_IDS = [...new Set(ALL.map((p) => p.id))];

/** Body as HTML: [[fact-id]] becomes a numbered source, {{faq}} (or sims, guide, buy, talk, map) the page's path
 *  in this edition, and {{post:id}} another article's path. */
export function render(p: Post, ed: EdCode): { html: string; sources: Sources } {
  const src = new Sources();
  const text = p.body
    .replace(/\[\[([a-z0-9-]+)\]\]/g, (_, id) => `<a class="sup" href="#fonte-${src.n(id)}">${src.n(id)}</a>`)
    .replace(/\{\{post:([a-z0-9-]+)\}\}/g, (_, id) => {
      const t = postById(id, p.lang);
      if (!t) throw new Error(`blog ${p.id}.${p.lang}: unknown article ${id}`);
      return `${pathFor(p.lang, ed, "blog")}${t.slug}/`;
    })
    .replace(/\{\{(faq|sims|guide|buy|talk|map|journey|articles)\}\}/g, (_, k) => pathFor(p.lang, ed, k as PageKey));
  for (const id of p.sources) src.n(id); // listed even if not cited in the text
  // Two facts from the same source in a row would show "1,1": keep one.
  const dedup = text.replace(/(<a class="sup" href="#fonte-(\d+)">\2<\/a>)(?:<a class="sup" href="#fonte-\2">\2<\/a>)+/g, "$1");
  return { html: marked.parse(dedup, { gfm: true, async: false }) as string, sources: src };
}

// Canonical edition per language (D24): the edition whose domain and default language match best.
export const CANONICAL_ED: Record<Lang, EdCode> = { pt: "lu", fr: "fr", en: "us" };
export const hostOf = (ed: EdCode) => hostFor(ed);
