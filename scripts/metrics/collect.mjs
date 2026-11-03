#!/usr/bin/env node
// Prompt 51 §3: the numbers, fed automatically. Reads Cloudflare Web Analytics (page loads and the cookie-free event
// pages under /e/, site/src/lib/track.ts), beehiiv (subscribers per edition) and sponsors/pipeline.csv (signed totals),
// and writes aggregates only: no person, no address, no request content ever enters these files (hard rule 3).
//
//   node scripts/metrics/collect.mjs --week [YYYY-Www]    ops/metrics/weekly/<week>.json and the block in ops/METRICS.md
//   node scripts/metrics/collect.mjs --month [YYYY-MM]    sponsors/reports/data/<partner>_<month>.json for each partner
//                                                          in content/partners/dashboards.csv (feeds /sponsor-report
//                                                          and the private partner dashboards)
// Default: the last complete ISO week, or the last complete month.
//
// Sources, each optional (ops/METRICS_SETUP.md): CF_API_TOKEN (Account Analytics: Read), CF_ACCOUNT_ID, CF_SITE_TAGS
// (Web Analytics site tags, comma-separated); BEEHIIV_API_KEY and BEEHIIV_PUBS ("lu:pub_…,fr:pub_…"). A missing source
// is written as null and the dashboards say "no data yet"; nothing is ever estimated. Figures the platforms cannot see
// (the advisor's response time, visits booked, request summaries) come from the operator's files in ops/metrics/manual/
// and sponsors/reports/manual/, merged as they are.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { checkAggregate } from "./guard.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const argv = process.argv.slice(2);
const EDS = ["lu", "fr", "ch", "br", "us", "il"];
const env = process.env;
const dry = argv.includes("--dry");

// ---------- periods ----------
const isoWeek = (d) => { const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())); const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = t.getUTCFullYear(); const w = Math.ceil(((t - Date.UTC(y, 0, 1)) / 864e5 + 1) / 7); return `${y}-W${String(w).padStart(2, "0")}`; };
const weekStart = (wk) => { const [y, w] = wk.split("-W").map(Number); const j4 = new Date(Date.UTC(y, 0, 4)); const mon = new Date(j4); mon.setUTCDate(j4.getUTCDate() - ((j4.getUTCDay() || 7) - 1) + (w - 1) * 7); return mon; };
const iso = (d) => d.toISOString().slice(0, 10);
function period() {
  const i = argv.indexOf("--month"), j = argv.indexOf("--week");
  if (i >= 0) {
    let m = argv[i + 1] && /^\d{4}-\d{2}$/.test(argv[i + 1]) ? argv[i + 1] : null;
    if (!m) { const n = new Date(); n.setUTCDate(1); n.setUTCMonth(n.getUTCMonth() - 1); m = n.toISOString().slice(0, 7); }
    const [y, mo] = m.split("-").map(Number);
    return { kind: "month", id: m, from: new Date(Date.UTC(y, mo - 1, 1)), to: new Date(Date.UTC(y, mo, 1)) };
  }
  let w = j >= 0 && argv[j + 1] && /^\d{4}-W\d{2}$/.test(argv[j + 1]) ? argv[j + 1] : null;
  if (!w) { const n = new Date(); n.setUTCDate(n.getUTCDate() - 7); w = isoWeek(n); }
  const from = weekStart(w), to = new Date(from); to.setUTCDate(from.getUTCDate() + 7);
  return { kind: "week", id: w, from, to };
}
const P = period();

// ---------- Cloudflare Web Analytics ----------
async function cloudflare() {
  if (!env.CF_API_TOKEN || !env.CF_ACCOUNT_ID || !env.CF_SITE_TAGS) return { ok: false, why: "CF_API_TOKEN, CF_ACCOUNT_ID or CF_SITE_TAGS not set" };
  const query = `query($acc: String!, $f: AccountRumPageloadEventsAdaptiveGroupsFilter_InputObject) { viewer { accounts(filter: { accountTag: $acc }) {
    rumPageloadEventsAdaptiveGroups(limit: 10000, filter: $f) { count sum { visits } dimensions { requestPath countryName } } } } }`;
  const variables = { acc: env.CF_ACCOUNT_ID, f: { AND: [{ datetime_geq: P.from.toISOString(), datetime_lt: P.to.toISOString() }, { siteTag_in: env.CF_SITE_TAGS.split(",").map((s) => s.trim()) }] } };
  const r = await fetch("https://api.cloudflare.com/client/v4/graphql", { method: "POST", headers: { authorization: `Bearer ${env.CF_API_TOKEN}`, "content-type": "application/json" }, body: JSON.stringify({ query, variables }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.errors?.length) return { ok: false, why: `Cloudflare: ${r.status} ${(j.errors || []).map((e) => e.message).join("; ")}`.slice(0, 300) };
  const rows = j.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups || [];
  return { ok: true, rows: rows.map((x) => ({ path: x.dimensions.requestPath || "/", country: x.dimensions.countryName || "??", n: x.count || 0, visits: x.sum?.visits || 0 })) };
}

// ---------- beehiiv ----------
async function beehiiv() {
  if (!env.BEEHIIV_API_KEY || !env.BEEHIIV_PUBS) return { ok: false, why: "BEEHIIV_API_KEY or BEEHIIV_PUBS not set" };
  const out = {};
  for (const pair of env.BEEHIIV_PUBS.split(",")) {
    const [ed, id] = pair.split(":").map((s) => s.trim()); if (!EDS.includes(ed) || !id) continue;
    const r = await fetch(`https://api.beehiiv.com/v2/publications/${id}?expand[]=stats`, { headers: { authorization: `Bearer ${env.BEEHIIV_API_KEY}` } });
    if (!r.ok) return { ok: false, why: `beehiiv ${ed}: HTTP ${r.status} (the free plan may not include the API: ops/METRICS_SETUP.md)` };
    const s = (await r.json()).data?.stats || {};
    out[ed] = { subscribers: s.active_subscriptions ?? null, open_rate: s.average_open_rate ?? null, click_rate: s.average_click_rate ?? null };
  }
  return { ok: true, eds: out };
}

// ---------- reading the paths ----------
const projects = JSON.parse(readFileSync(join(root, "content", "developers", "projects.json"), "utf8")).projects;
const showcaseOf = (parts) => projects.find((p) => p.devSlug && parts[3] === p.devSlug && parts[4] === p.muni && !p.demo);
const top = (m, n = 10) => [...m].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ key: k, n: v }));
const add = (m, k, v = 1) => m.set(k, (m.get(k) || 0) + v);
function digest(rows) {
  const ed = Object.fromEntries(EDS.map((e) => [e, { visits: 0, views: 0 }]));
  const pages = new Map(), countries = new Map(), places = new Map(), questions = new Map();
  const flows = {}, proj = {};
  // Part 5 (lib/track.ts ev, lib/events.ts): time on a place by band, flow steps and stops, and every other event by name.
  const placeTime = {}, events = new Map();
  let visits = 0, views = 0;
  for (const r of rows) {
    const parts = r.path.split("/").filter(Boolean);
    if (parts[0] === "e") {
      if (parts[1] === "s" && parts[2] && parts[3] === "t" && parts[4]) { const t = (placeTime[parts[2]] ??= {}); t[parts[4]] = (t[parts[4]] || 0) + r.n; }
      else if (parts[1] === "s" && parts[2]) add(places, parts[2], r.n);
      else if (parts[1] === "q" && parts[2]) add(questions, parts[2], r.n);
      else if (parts[2] === "flow") { const f = (flows[parts[3]] ??= { start: 0, sent: 0, by_edition: {}, steps: {}, stops: {} }); if (parts[4] === "start" || parts[4] === "sent") f[parts[4]] += r.n; if (parts[4] === "sent") f.by_edition[parts[1]] = (f.by_edition[parts[1]] || 0) + r.n;
        if ((parts[4] === "step" || parts[4] === "stop") && parts[5]) { const m = f[`${parts[4]}s`]; m[parts[5]] = (m[parts[5]] || 0) + r.n; } }
      else if (parts[2] === "p") { const p = (proj[parts[3]] ??= { pin: 0, card: 0, req: 0, req_by_edition: {}, req_by_country: {} }); if (["pin", "card", "req", "view", "share"].includes(parts[4])) p[parts[4]] = (p[parts[4]] || 0) + r.n;
        if (parts[4] === "req") { p.req_by_edition[parts[1]] = (p.req_by_edition[parts[1]] || 0) + r.n; p.req_by_country[r.country] = (p.req_by_country[r.country] || 0) + r.n; } }
      else if (parts.length > 2) add(events, parts.slice(2).join("/"), r.n);  // e.g. map/layer/rent, path/docs/done, letter/signup/email
      continue;
    }
    visits += r.visits; views += r.n; add(countries, r.country, r.visits);
    if (EDS.includes(parts[1])) { ed[parts[1]].visits += r.visits; ed[parts[1]].views += r.n; }
    add(pages, r.path.replace(/\/?$/, "/"), r.n);
    const sc = showcaseOf(parts);
    if (sc) { const p = (proj[sc.id] ??= { pin: 0, card: 0, req: 0, req_by_edition: {}, req_by_country: {} }); p.page_views = (p.page_views || 0) + r.n;
      p.views_by_edition = p.views_by_edition || {}; if (EDS.includes(parts[1])) p.views_by_edition[parts[1]] = (p.views_by_edition[parts[1]] || 0) + r.n;
      p.views_by_country = p.views_by_country || {}; p.views_by_country[r.country] = (p.views_by_country[r.country] || 0) + r.n; }
  }
  return { visits, views, editions: ed, top_pages: top(pages, 15), countries: top(countries, 12), top_places: top(places, 10), top_questions: top(questions, 10), flows, projects: proj,
    place_time: Object.fromEntries(top(places, 10).map(({ key }) => [key, placeTime[key] || {}])), events: top(events, 60) };
}

// ---------- the pipeline: totals only, never a company name ----------
function business() {
  const f = join(root, "sponsors", "pipeline.csv"); if (!existsSync(f)) return null;
  const [h, ...rows] = readFileSync(f, "utf8").trim().split("\n").map((l) => l.split(","));
  const col = (n) => h.indexOf(n);
  const st = col("status"), val = col("est_deal_value_eur"), t1 = col("touch1_date");
  const signed = rows.filter((r) => /signed|won/i.test(r[st] || ""));
  return { contacted: t1 >= 0 ? rows.filter((r) => r[t1]).length : null, signed: signed.length, revenue_signed_eur: val >= 0 ? signed.reduce((s, r) => s + (Number(r[val]) || 0), 0) : null };
}

const readJson = (f) => (existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : null);
const write = (f, o) => { checkAggregate(o, f); if (dry) { console.log(`(dry) ${f}`); return; } mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, JSON.stringify(o, null, 1) + "\n"); console.log(f); };

const cf = await cloudflare();
const bh = await beehiiv();
const d = cf.ok ? digest(cf.rows) : null;
const sources = { cloudflare: cf.ok ? "Cloudflare Web Analytics (GraphQL, rumPageloadEventsAdaptiveGroups)" : `not connected: ${cf.why}`, beehiiv: bh.ok ? "beehiiv API" : `not connected: ${bh.why}` };
const range = `${iso(P.from)} – ${iso(new Date(P.to - 864e5))}`;

if (P.kind === "week") {
  const manual = readJson(join(root, "ops", "metrics", "manual", `${P.id}.json`)) || {};
  const flows = d?.flows || {};
  const o = {
    week: P.id, period: range, generated: iso(new Date()), sources,
    editions: Object.fromEntries(EDS.map((e) => [e, { subscribers: bh.ok ? bh.eds[e]?.subscribers ?? null : null, visits: d ? d.editions[e].visits : null, page_views: d ? d.editions[e].views : null,
      requests: d ? Object.values(flows).reduce((s, f) => s + (f.by_edition?.[e] || 0), 0) : null }])),
    totals: { visits: d?.visits ?? null, page_views: d?.views ?? null },
    concierge: d ? { starts: flows.concierge?.start || 0, completions: flows.concierge?.sent || 0 } : null,
    requests: d ? { by_flow: Object.fromEntries(Object.entries(flows).map(([k, v]) => [k, v.sent])), by_project: Object.fromEntries(Object.entries(d.projects).map(([k, v]) => [k, v.req])) } : null,
    top_pages: d?.top_pages ?? null, countries: d?.countries ?? null, top_places: d?.top_places ?? null, top_questions: d?.top_questions ?? null,
    place_time: d?.place_time ?? null, flow_steps: d ? Object.fromEntries(Object.entries(flows).map(([k, v]) => [k, { steps: v.steps, stops: v.stops }])) : null, events: d?.events ?? null,
    business: business(), manual,
  };
  write(join(root, "ops", "metrics", "weekly", `${P.id}.json`), o);
  if (!dry) updateMetricsMd(o);
} else {
  const partners = readFileSync(join(root, "content", "partners", "dashboards.csv"), "utf8").trim().split("\n").slice(1).map((l) => l.split(","))
    .map(([slug, company, projs, lang, token, sample]) => ({ slug, company, projs: projs.split(";"), lang, sample: sample === "1" }));
  for (const pa of partners.filter((x) => !x.sample)) {
    const manual = readJson(join(root, "sponsors", "reports", "manual", `${pa.slug}_${P.id}.json`)) || {};
    const pj = pa.projs.map((id) => d?.projects[id]).filter(Boolean);
    const sum = (k) => (d ? pj.reduce((s, p) => s + (p[k] || 0), 0) : undefined);
    const merge = (k) => { const m = {}; for (const p of pj) for (const [a, b] of Object.entries(p[k] || {})) m[a] = (m[a] || 0) + b; return m; };
    const p0 = projects.find((p) => p.id === pa.projs[0]);
    const o = {
      company: pa.company, project: p0?.name, municipality: p0?.muni, month: P.id, lang: pa.lang, generated: iso(new Date()),
      reach: { source: `${sources.cloudflare} · ${sources.beehiiv}`, editions: d || bh.ok ? Object.fromEntries(EDS.map((e) => [e, { subscribers: bh.ok ? bh.eds[e]?.subscribers ?? null : null, site_visits: d ? d.editions[e].visits : null }])) : {} },
      showcase: d ? { source: sources.cloudflare, page_views: sum("page_views"), pin_opens: sum("pin"), card_clicks: sum("card"), shares: sum("share"), by_edition: merge("views_by_edition"), by_country: merge("views_by_country") } : { source: sources.cloudflare },
      requests: { source: d ? `${sources.cloudflare} (counts) · summaries and status from the advisor` : "request log not connected", ...(d ? { total: sum("req"), by_edition: merge("req_by_edition"), by_country: merge("req_by_country") } : {}), ...(manual.requests || {}) },
      advisor: manual.advisor || {}, visits: manual.visits ?? null, availability: manual.availability || {}, index_card: manual.index_card || {}, notes: manual.notes || [],
    };
    write(join(root, "sponsors", "reports", "data", `${pa.slug}_${P.id}.json`), o);
  }
}
if (!cf.ok) console.warn(`Cloudflare: ${cf.why}`);
if (!bh.ok) console.warn(`beehiiv: ${bh.why}`);

// ---------- ops/METRICS.md: the automatic block, one table per week, newest first ----------
function updateMetricsMd(o) {
  const f = join(root, "ops", "METRICS.md"); let t = readFileSync(f, "utf8");
  const A = "<!-- auto:weekly:start -->", B = "<!-- auto:weekly:end -->";
  const v = (x) => (x === null || x === undefined ? "–" : Number(x).toLocaleString("en-GB"));
  const rows = [["Newsletter subscribers", "subscribers"], ["Site visits", "visits"], ["Page views", "page_views"], ["Requests sent", "requests"]]
    .map(([l, k]) => `| ${l} | ${EDS.map((e) => v(o.editions[e][k])).join(" | ")} | ${v(EDS.reduce((s, e) => (o.editions[e][k] == null ? s : (s ?? 0) + o.editions[e][k]), null))} |`);
  const block = [`### ${o.week} (${o.period}), collected ${o.generated}`, "", `| Metric | LU | FR | CH | BR | US | IL | Total |`, `| --- | --- | --- | --- | --- | --- | --- | --- |`, ...rows, "",
    `Concierge: ${o.concierge ? `${v(o.concierge.starts)} starts, ${v(o.concierge.completions)} completions` : "no data yet"} · Sponsors signed: ${v(o.business?.signed)} · Revenue signed: ${v(o.business?.revenue_signed_eur)} €`,
    `Top places: ${o.top_places?.length ? o.top_places.slice(0, 5).map((x) => `${x.key} (${x.n})`).join(", ") : "no data yet"} · Top questions: ${o.top_questions?.length ? o.top_questions.slice(0, 5).map((x) => `${x.key} (${x.n})`).join(", ") : "no data yet"}`,
    `Sources: ${o.sources.cloudflare}; ${o.sources.beehiiv}. Full detail: ops/metrics/weekly/${o.week}.json and the private dashboard.`, ""].join("\n");
  if (!t.includes(A)) t = t.replace(/(# Metrics\n[\s\S]*?\n)(## )/, `$1## Weekly, automatic (prompt 51)\n\n${A}\n${B}\n\n$2`);
  const [pre, rest] = t.split(A); const [mid, post] = rest.split(B);
  const kept = mid.split(/(?=^### )/m).filter((s) => s.startsWith("### ") && !s.startsWith(`### ${o.week} `));
  writeFileSync(f, `${pre}${A}\n${[block, ...kept].slice(0, 12).join("\n").trim()}\n${B}${post}`);
  console.log(f);
}
