// Maré, the newsletter (D83, operator 3 Nov 2026): Tuesday and Friday at 08:00, a 3-minute read, one letter for every
// reader (D74). One file per issue in content/mare/issues/{YYYY-MM-DD}.md (front matter + the headline story in
// Markdown); the archive grows by adding files. This module reads them at build time and renders:
//  1. renderIssue(): the e-mail itself, as it looks in the inbox (600 px column, tables, inline styles, system fonts
//     with Georgia for the serif), used in the framed preview on the Maré page and for the beehiiv draft (/mare/{id}.html);
//  2. latestIssue() / issues(): the page, the archive cards and the quiet block (components/MareBlock.astro).
// Nothing is sent from here: beehiiv gets a draft, the operator approves it (hard rule 2).
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { marked } from "marked";
import { DISCLAIMER } from "./content";
import { PROJECTS } from "./projects";
import type { EdCode, Lang } from "../i18n";

const dir = join(process.cwd(), "..", "content", "mare", "issues");

type Link = { text: string; href: string };
export type MareSource = { n: number; title: string; url: string; checked: string };
export type MareIssue = {
  id: string; date: string; lang: string; status: string; subject: string; preheader: string; headline: string;
  photo: { src: string; alt: string; caption?: string };
  intro?: string; story: string; story_s?: number[];
  see?: { label: string; text: string; link?: Link };
  numbers: { n: string; t: string; s?: number[] }[];
  weekend: { when?: string; items: { k: string; h: string; p: string; s?: number[] }[] };
  challenge: { q: string; options: string[]; note?: string; s?: number[] };
  home?: { project: string; label: string; h: string; p: string; photo?: string; alt?: string; link?: Link; s?: number[] } | null;
  partner?: { name: string; label?: string; h: string; p: string; link?: Link } | null;
  practical: { label: string; p: string; link?: Link; s?: number[] };
  sources: MareSource[];
  /** Weekday of the send: "tue" or "fri" (from the date). */
  day: "tue" | "fri";
  words: number; minutes: number;
};

const iso = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d));
const FM = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

function load(): MareIssue[] {
  if (!existsSync(dir)) return [];
  const out: MareIssue[] = [];
  for (const f of readdirSync(dir).filter((x) => /^\d{4}-\d{2}-\d{2}\.md$/.test(x)).sort()) {
    const m = readFileSync(join(dir, f), "utf8").match(FM);
    if (!m) throw new Error(`mare ${f}: front matter missing`);
    const fm = yaml.load(m[1]) as Record<string, any>;
    for (const k of ["id", "date", "subject", "headline", "photo", "numbers", "weekend", "challenge", "practical", "sources"]) if (!fm[k]) throw new Error(`mare ${f}: "${k}" missing`);
    const date = iso(fm.date), id = iso(fm.id);
    if (`${id}.md` !== f) throw new Error(`mare ${f}: id ${id} does not match the file name`);
    const wd = new Date(`${date}T12:00:00Z`).getUTCDay();
    if (wd !== 2 && wd !== 5) throw new Error(`mare ${f}: ${date} is not a Tuesday or a Friday`);
    const sources = (fm.sources as any[]).map((s) => ({ ...s, checked: iso(s.checked) })) as MareSource[];
    const ns = new Set(sources.map((s) => s.n));
    const cited = [fm.story_s, ...fm.numbers.map((x: any) => x.s), ...fm.weekend.items.map((x: any) => x.s), fm.challenge.s, fm.home?.s, fm.practical.s].flat().filter((x) => x != null);
    for (const n of cited) if (!ns.has(n)) throw new Error(`mare ${f}: source ${n} is cited but not listed`);
    const issue = { ...fm, id, date, story: m[2].trim(), sources, day: wd === 2 ? "tue" : "fri" } as MareIssue;
    // Prompt 66 §2: a home whose project is not shown on this build (pending on the live site) leaves the letter, with the
    // sources only it cited; the others keep their numbers (the list item carries its own number).
    if (issue.home?.project && !PROJECTS.some((p) => p.id === issue.home!.project)) {
      const only = new Set(issue.home.s ?? []), rest = new Set(cited.filter((n) => !(fm.home?.s ?? []).includes(n) || cited.filter((x) => x === n).length > 1));
      issue.home = null; issue.sources = issue.sources.filter((x) => !only.has(x.n) || rest.has(x.n));
    }
    const text = [issue.intro, issue.headline, issue.story, issue.see?.text, ...issue.numbers.map((x) => `${x.n} ${x.t}`), ...issue.weekend.items.map((x) => `${x.h} ${x.p}`), issue.challenge.q, ...issue.challenge.options, issue.home?.p, issue.practical.p].filter(Boolean).join(" ");
    issue.words = text.split(/\s+/).filter(Boolean).length;
    issue.minutes = Math.max(1, Math.ceil(issue.words / 200));  // 450 to 600 words: "3 min"
    out.push(issue);
  }
  return out.sort((a, b) => (a.date < b.date ? 1 : -1));
}
const ALL = load();

/** Every issue, newest first. */
export const issues = (): MareIssue[] => ALL;
/** The latest issue (the one the page, the block and the signup tracking show), or null before the first. */
export const latestIssue = (): MareIssue | null => ALL[0] ?? null;
export const issueById = (id: string) => ALL.find((x) => x.id === id) ?? null;
/** The recent issue ids counted on /e/ per surface (lib/events.ts): the block only ever shows the latest. */
export const recentIssueIds = (n = 12) => ALL.slice(0, n).map((x) => x.id);

/** "terça" / "sexta" etc. (copy deck mare.day.tue / mare.day.fri are the display words; this is the key). */
export const dayKey = (i: MareIssue) => `mare.day.${i.day}`;

/** The headline as it reads after "Esta terça:" (a leading article in lower case: "o 1.º de Dezembro…"). */
export const inline = (h: string) => h.replace(/^(O|A|Os|As|Um|Uma|Uns|Umas) /, (w) => w.toLowerCase());

/** The archive card's photo (the site's web copies: {base}-640.webp or {base}-800.webp). */
export function photoUrl(base: string, w: 640 | 800 | 1024 | 1600 = 1024): string {
  if (/\.(webp|jpe?g|png|avif)$/.test(base)) return base;
  // Developer photos come in 800 and 1600; the photo library in 640, 1024 and 1600.
  if (base.startsWith("/img/developers/")) return `${base}-${w <= 800 ? 800 : 1600}.webp`;
  return `${base}-${w === 800 ? 1024 : w}.webp`;
}

// ------------------------------------------------------------ the e-mail
const esc = (t: string) => String(t).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);
const C = { page: "#EFEBE3", paper: "#FBF9F5", ink: "#111214", muted: "#5d6066", rule: "#E4DFD5", green: "#2F5D50" };
const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Manrope, Helvetica, Arial, sans-serif";
const PT_DAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const PT_MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
/** "Terça, 1 de dezembro de 2026" (the e-mail is in Portuguese; the page uses Intl for EN and FR). */
export function ptDate(date: string): string {
  const d = new Date(`${date}T12:00:00Z`);
  return `${PT_DAYS[d.getUTCDay()]}, ${d.getUTCDate()} de ${PT_MONTHS[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
}

export type RenderOpts = {
  ed: EdCode;
  /** "" on the site (relative links and images); "https://imoveisportugal.pt" for the beehiiv draft. */
  origin?: string;
  /** Add utm_source=mare&utm_medium=email&utm_campaign={id} to every site link (the beehiiv draft only). */
  utm?: boolean;
  /** Links open in the page around the preview frame (<base target="_top">). */
  framed?: boolean;
};

/** The whole e-mail as one HTML document (tables and inline styles, under Gmail's 102 KB clip). */
export function renderIssue(i: MareIssue, o: RenderOpts): string {
  const origin = o.origin ?? "";
  const href = (h: string) => {
    let u = h.replace(/\{ed\}/g, o.ed);
    if (u.startsWith("/")) u = origin + u;
    if (o.utm && (u.startsWith("/") || u.startsWith(origin))) u += `${u.includes("?") ? "&" : "?"}utm_source=mare&utm_medium=email&utm_campaign=${i.id}`;
    return esc(u);
  };
  const img = (src: string, w: 640 | 800 | 1024 = 1024) => esc(origin + photoUrl(src, w));
  const sup = (s?: number[]) => (s && s.length ? `<sup style="font:600 10px/1 ${SANS};color:${C.muted}">${s.join(",")}</sup>` : "");
  const label = (t: string) => `<p style="margin:0 0 10px;font:700 11px/1.2 ${SANS};letter-spacing:.14em;text-transform:uppercase;color:${C.green}">${esc(t)}</p>`;
  const arrow = (l?: Link) => (l ? `<p style="margin:14px 0 0;font:600 15px/1.4 ${SANS}"><a href="${href(l.href)}" style="color:${C.ink};text-decoration:none;border-bottom:1px solid ${C.ink}">${esc(l.text)} &rarr;</a></p>` : "");
  const p = (t: string, extra = "") => `<p style="margin:0 0 14px;font:400 16px/1.6 ${SANS};color:${C.ink}${extra}">${t}</p>`;
  const row = (inner: string, pad = "28px 32px") => `<tr><td class="px" style="padding:${pad};border-top:1px solid ${C.rule}">${inner}</td></tr>`;
  // The story's Markdown: paragraphs only; the sources go after the last paragraph.
  const story = (marked.parse(i.story, { async: false }) as string).trim()
    .replace(/<p>/g, `<p style="margin:0 0 14px;font:400 16px/1.6 ${SANS};color:${C.ink}">`)
    .replace(/<\/p>\s*$/, `${sup(i.story_s)}</p>`);
  const letters = "ABCDEFGH";
  const nums = i.numbers.map((x) => `<tr><td valign="top" style="padding:10px 16px 10px 0;width:104px;font:400 30px/1.1 ${SERIF};color:${C.ink};white-space:nowrap">${esc(x.n)}</td><td valign="top" style="padding:14px 0 10px;font:400 15px/1.5 ${SANS};color:${C.ink}">${esc(x.t)}${sup(x.s)}</td></tr>`).join("");
  const wk = i.weekend.items.map((x) => `<p style="margin:0 0 16px;font:400 16px/1.6 ${SANS};color:${C.ink}"><strong style="font-weight:700">${esc(x.k)}.</strong> <span style="font:400 18px/1.4 ${SERIF}">${esc(x.h)}.</span> ${esc(x.p)}${sup(x.s)}</p>`).join("");
  const opts = i.challenge.options.map((t, n) => `<tr><td style="padding:6px 0;font:400 16px/1.5 ${SANS};color:${C.ink}"><span style="display:inline-block;width:26px;font-weight:700;color:${C.green}">${letters[n]}</span>${esc(t)}</td></tr>`).join("");
  const home = i.home ? row(`${label(i.home.label)}${i.home.photo ? `<img src="${img(i.home.photo, 800)}" width="536" alt="${esc(i.home.alt ?? i.home.h)}" style="display:block;width:100%;max-width:536px;height:auto;border:0;margin:0 0 16px">` : ""}<p style="margin:0 0 8px;font:400 22px/1.3 ${SERIF};color:${C.ink}">${esc(i.home.h)}</p>${p(`${esc(i.home.p)}${sup(i.home.s)}`, ";margin-bottom:0")}${arrow(i.home.link)}`) : "";
  // The partner block (EDITORIAL_POLICY: labelled, one per issue). No partner signed: an empty, labelled space.
  const partner = row(i.partner
    ? `${label(i.partner.label ?? "Parceiro · Patrocinado")}<p style="margin:0 0 8px;font:400 20px/1.3 ${SERIF};color:${C.ink}">${esc(i.partner.h)}</p>${p(esc(i.partner.p), ";margin-bottom:0")}${arrow(i.partner.link)}`
    : `${label("Parceiro · Patrocinado")}<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px dashed ${C.rule}"><tr><td align="center" style="padding:26px 16px;font:400 15px/1.4 ${SANS};color:${C.muted}">Espaço de parceiro</td></tr></table>`);
  const srcs = i.sources.map((s) => `<li value="${s.n}" style="margin:0 0 4px"><a href="${esc(s.url)}" style="color:${C.muted}">${esc(s.title)}</a></li>`).join("");
  return `<!doctype html>
<html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<title>${esc(i.subject)}</title>${o.framed ? '<base target="_top">' : ""}
<style>body{margin:0;padding:0;background:${C.page}}a{color:${C.ink}}img{-ms-interpolation-mode:bicubic}@media (max-width:620px){.mw{width:100%!important}.px{padding-left:20px!important;padding-right:20px!important}}</style></head>
<body style="margin:0;padding:0;background:${C.page}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(i.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page}"><tr><td align="center" style="padding:24px 8px">
<table role="presentation" class="mw" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:${C.paper}">
<tr><td class="px" style="padding:32px 32px 20px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="font:400 34px/1 ${SERIF};color:${C.ink}">Maré</td>
<td align="right" style="font:500 12px/1.4 ${SANS};color:${C.muted}">${esc(ptDate(i.date))}<br>${i.minutes} min de leitura</td></tr></table></td></tr>
${i.intro ? `<tr><td class="px" style="padding:0 32px 22px;font:400 16px/1.6 ${SANS};color:${C.ink}">${esc(i.intro)}</td></tr>` : ""}
<tr><td style="padding:0"><img src="${img(i.photo.src)}" width="600" alt="${esc(i.photo.alt)}" style="display:block;width:100%;max-width:600px;height:auto;border:0"></td></tr>
${i.photo.caption ? `<tr><td class="px" style="padding:8px 32px 0;font:400 12px/1.4 ${SANS};color:${C.muted}">${esc(i.photo.caption)}</td></tr>` : ""}
<tr><td class="px" style="padding:24px 32px 28px">
<h1 style="margin:0 0 16px;font:400 30px/1.2 ${SERIF};color:${C.ink}">${esc(i.headline)}</h1>
${story}
${i.see ? p(`<strong style="font-weight:700">${esc(i.see.label)}:</strong> ${esc(i.see.text)}`, ";margin-bottom:0") + arrow(i.see.link) : ""}
</td></tr>
${row(`${label("Em números")}<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${nums}</table>`, "28px 32px 18px")}
${row(`${label(`O fim de semana${i.weekend.when ? ` · ${i.weekend.when}` : ""}`)}${wk}`, "28px 32px 12px")}
${row(`${label("O desafio")}${p(`${esc(i.challenge.q)}${sup(i.challenge.s)}`)}<table role="presentation" cellpadding="0" cellspacing="0">${opts}</table>${i.challenge.note ? `<p style="margin:12px 0 0;font:400 14px/1.5 ${SANS};color:${C.muted}">${esc(i.challenge.note)}</p>` : ""}`)}
${home}
${partner}
${row(`${label(i.practical.label)}${p(`${esc(i.practical.p)}${sup(i.practical.s)}`, ";margin-bottom:0")}${arrow(i.practical.link)}`)}
<tr><td class="px" style="padding:24px 32px 32px;border-top:1px solid ${C.rule};font:400 12px/1.6 ${SANS};color:${C.muted}">
<p style="margin:0 0 10px">Responda a este email: uma pessoa lê.</p>
<p style="margin:0 0 6px;font-weight:700">Fontes</p><ol style="margin:0 0 12px;padding-left:18px">${srcs}</ol>
<p style="margin:0 0 10px">${esc(DISCLAIMER["pt" as Lang])}</p>
<p style="margin:0">Imóveis Portugal · Recebe a Maré porque a pediu e confirmou o seu email. O link para cancelar é acrescentado pela plataforma de envio.</p>
</td></tr>
</table></td></tr></table>
</body></html>`;
}
