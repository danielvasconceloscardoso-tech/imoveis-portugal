// Private dashboards (prompt 51 §3): one page per partner (/p/{token}/) and one for us (/i/{token}/). Unlisted, noindex,
// absent from the sitemap and every menu, like the developer demos (/d/{token}/, D53). They read the same aggregate files
// as the monthly PDF (scripts/sponsor-report.mjs) and ops/METRICS.md, written by scripts/metrics/collect.mjs, so a
// partner sees on the page exactly what the PDF says, and only their own numbers. No personal data exists in these files
// (scripts/metrics/guard.mjs refuses it); the build checks again.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
// @ts-ignore: plain ES module shared with the scripts
import { problems } from "../../../scripts/metrics/guard.mjs";

const repo = join(process.cwd(), "..");
const read = (f: string) => JSON.parse(readFileSync(f, "utf8"));
const guarded = (o: any, label: string) => { const p = problems(o, label); if (p.length) throw new Error(`dashboard data refused (personal data risk): ${p.join("; ")}`); return o; };

// The internal dashboard's link (ops/METRICS_SETUP.md). Like the demo tokens, it only keeps the page unlisted.
export const INTERNAL_TOKEN = "be18a942fba0cbdf030a";

export type Partner = { slug: string; company: string; projects: string[]; lang: "pt" | "en"; token: string; sample: boolean };
export const PARTNERS: Partner[] = readFileSync(join(repo, "content", "partners", "dashboards.csv"), "utf8").trim().split("\n").slice(1)
  .map((l) => l.split(",")).map(([slug, company, projects, lang, token, sample]) => ({ slug, company, projects: projects.split(";"), lang: lang === "en" ? "en" : "pt", token, sample: sample === "1" }));

/** A partner's months, newest first: their own files only (the sample partner shows the labelled sample). */
export function partnerMonths(p: Partner): any[] {
  if (p.sample) return [guarded(read(join(repo, "sponsors", "papers", "monthly-report.sample.json")), "sample")];
  const dir = join(repo, "sponsors", "reports", "data");
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.startsWith(`${p.slug}_`) && /_\d{4}-\d{2}\.json$/.test(f)).sort().reverse().map((f) => guarded(read(join(dir, f)), f));
}

/** The funnel (prompt 51 §2.4), the same steps and rules as the PDF: only steps with a figure, never an estimate. */
export function funnel(d: any): { k: string; v: number; pct: number | null }[] {
  const eds = Object.values(d?.reach?.editions || {}) as any[];
  const sumE = (k: string) => { const v = eds.map((e) => e?.[k]).filter((x) => typeof x === "number"); return v.length ? v.reduce((a, b) => a + b, 0) : undefined; };
  const reach = [sumE("site_visits"), sumE("opens")].filter((x) => x !== undefined) as number[];
  const sh = d?.showcase || {}, rq = d?.requests || {};
  const visits = d?.visits ?? (rq.summaries?.length ? rq.summaries.filter((s: any) => /visit|visita/i.test(s.status || "")).length : undefined);
  const steps = [["reach", reach.length ? reach.reduce((a, b) => a + b, 0) : undefined], ["views", sh.page_views !== undefined || sh.pin_opens !== undefined ? (sh.page_views || 0) + (sh.pin_opens || 0) : undefined],
    ["clicks", sh.card_clicks], ["requests", rq.total ?? (rq.summaries?.length || undefined)], ["visits", visits]].filter(([, v]) => typeof v === "number") as [string, number][];
  return steps.map(([k, v], i) => ({ k, v, pct: i && steps[i - 1][1] ? (100 * v) / steps[i - 1][1] : null }));
}

/** Weekly internal files, oldest first. */
export function weeks(): any[] {
  const dir = join(repo, "ops", "metrics", "weekly");
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => /^\d{4}-W\d{2}\.json$/.test(f)).sort().map((f) => guarded(read(join(dir, f)), f));
}
