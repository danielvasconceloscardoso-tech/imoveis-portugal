#!/usr/bin/env node
// /sponsor-report <company> <month> (prompt 47 §3.4): the monthly sponsor report as a PDF.
// Cloudflare Web Analytics, the letter platform and the request log are not connected yet, so the figures come from a
// JSON file (--in); every empty section says "no data yet". The JSON shape is documented in
// sponsors/papers/monthly-report-template.en.md. The report never carries personal data: the script refuses
// request summaries with fields outside the allowed list and any value that looks like an email or a phone number.
//
// Usage: node scripts/sponsor-report.mjs "<company>" <YYYY-MM> [--in data.json] [--lang pt|en] [--out file.pdf] [--md]
// Default output: sponsors/reports/<company-slug>_<YYYY-MM>_<lang>.pdf (--md also writes the Markdown next to it).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderMarkdown } from "../sponsors/papers/render.mjs";
import { problems } from "./metrics/guard.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const opt = (name) => { const i = argv.indexOf(name); return i >= 0 ? argv[i + 1] : undefined; };
const pos = argv.filter((a, i) => !a.startsWith("--") && !["--in", "--lang", "--out"].includes(argv[i - 1]));
const [company, month] = pos;
if (!company || !/^\d{4}-(0[1-9]|1[0-2])$/.test(month || "")) {
  console.error('usage: node scripts/sponsor-report.mjs "<company>" <YYYY-MM> [--in data.json] [--lang pt|en] [--out file.pdf] [--md]');
  process.exit(2);
}
const data = opt("--in") ? JSON.parse(readFileSync(opt("--in"), "utf8")) : {};
const lang = (opt("--lang") || data.lang || "pt").toLowerCase();
if (!["pt", "en"].includes(lang)) { console.error("--lang must be pt or en"); process.exit(2); }
if (data.company && data.company !== company) console.warn(`warning: --in is for "${data.company}", report is for "${company}"`);
if (data.month && data.month !== month) console.warn(`warning: --in is for ${data.month}, report is for ${month}`);

// No personal data, ever (CLAUDE.md hard rule 3; agreement clause 6.4): scripts/metrics/guard.mjs.
const bad = problems(data, "in");
if (bad.length) { console.error("refused, personal data risk:\n  " + bad.join("\n  ")); process.exit(1); }

const T = {
  pt: {
    title: "Relatório mensal", label: "Relatório mensal do patrocinador", nodata: "Sem dados ainda.",
    months: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
    monthOf: (m, y) => `${m} de ${y}`,
    intro: (p, mu) => `Empreendimento: **${p || "[...]"}**${mu ? ` · Município: **${mu}**` : ""}. Números agregados, sem dados pessoais. Cada secção indica a fonte e o período.`,
    s0: "O mês num funil", s1: "1. Alcance por edição", s2: "2. A página do empreendimento", s3: "3. Pedidos e resumos qualificados", s4: "4. O cartão do índice do município", s5: "5. Disponibilidade", s6: "Notas",
    funnel: { reach: "Leitores alcançados (visitas ao site e aberturas da carta)", views: "Viram o empreendimento (página e pin no mapa)", clicks: "Clicaram no cartão do empreendimento", requests: "Pediram informação ou visita", visits: "Visitas marcadas pelo consultor" }, funCols: ["Etapa", "Número", "Da etapa anterior"],
    countries: "De onde vêm os leitores", ctyCols: ["País do leitor", "Visualizações", "Parte", "Pedidos", "Parte"],
    advisor: { h: "Resposta do consultor", median: "Tempo mediano até à primeira resposta", within: "Respondidos em 24 horas", answered: "Pedidos respondidos" }, hours: "h",
    reachCols: ["Edição", "Subscritores da carta", "Cartas enviadas", "Aberturas", "Visitas ao site"],
    showRows: { page_views: "Visualizações da página do empreendimento", pin_opens: "Aberturas do pin no mapa", card_views: "Visualizações do cartão no Concierge e na pesquisa", card_clicks: "Cliques no cartão" },
    byEdition: "Por edição", total: "Total",
    reqTotal: (n) => `Pedidos no mês: **${n}**. Todos encaminhados para o consultor qualificado da agência parceira, que trata do comprador e do contacto com o promotor.`,
    reqCols: ["Data", "Edição", "Tipologia", "Orçamento", "Pagamento", "Prazo", "Visita", "Estado"],
    idxScore: "Pontuação", idxRank: "Posição", idxPillars: "Pilares", idxAsOf: "Dados de",
    idxNote: "O índice e a sua pontuação nunca são influenciados pelo patrocínio (contrato, cláusula 5.ª).",
    avail: { listed: "Frações listadas", available: "Disponíveis", reserved: "Reservadas", sold: "Vendidas" },
    source: "Fonte", period: "Período", generated: "Gerado em",
    defaults: { reach: "Cloudflare Web Analytics e a plataforma da carta (ainda não ligados)", showcase: "Cloudflare Web Analytics (ainda não ligado)", requests: "Registo de pedidos (ainda não ligado)", index_card: "Índice Imóveis Portugal, content/data/INDEX_METHOD.md", availability: "Tabela de disponibilidade do promotor" },
  },
  en: {
    title: "Monthly report", label: "Monthly sponsor report", nodata: "No data yet.",
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthOf: (m, y) => `${m} ${y}`,
    intro: (p, mu) => `Project: **${p || "[...]"}**${mu ? ` · Municipality: **${mu}**` : ""}. Aggregate figures, no personal data. Each section states its source and period.`,
    s0: "The month as a funnel", s1: "1. Reach per edition", s2: "2. The project page", s3: "3. Requests and qualified summaries", s4: "4. The municipality's index card", s5: "5. Availability", s6: "Notes",
    funnel: { reach: "Readers reached (site visits and letter opens)", views: "Saw the project (page and map pin)", clicks: "Clicked the project card", requests: "Asked for information or a visit", visits: "Visits booked by the advisor" }, funCols: ["Step", "Number", "From the step before"],
    countries: "Where readers come from", ctyCols: ["Reader's country", "Views", "Share", "Requests", "Share"],
    advisor: { h: "The advisor's response", median: "Median time to first reply", within: "Answered within 24 hours", answered: "Requests answered" }, hours: "h",
    reachCols: ["Edition", "Letter subscribers", "Letters sent", "Opens", "Site visits"],
    showRows: { page_views: "Views of the project page", pin_opens: "Pin opens on the map", card_views: "Card views in the Concierge and search", card_clicks: "Card clicks" },
    byEdition: "By edition", total: "Total",
    reqTotal: (n) => `Requests this month: **${n}**. All passed to the qualified advisor of the partner agency, who handles the buyer and the contact with the developer.`,
    reqCols: ["Date", "Edition", "Typology", "Budget", "Payment", "Timeline", "Visit", "Status"],
    idxScore: "Score", idxRank: "Rank", idxPillars: "Pillars", idxAsOf: "Data as of",
    idxNote: "The index and its score are never affected by the sponsorship (agreement, clause 5).",
    avail: { listed: "Units listed", available: "Available", reserved: "Reserved", sold: "Sold" },
    source: "Source", period: "Period", generated: "Generated on",
    defaults: { reach: "Cloudflare Web Analytics and the letter platform (not connected yet)", showcase: "Cloudflare Web Analytics (not connected yet)", requests: "Request log (not connected yet)", index_card: "Imóveis Portugal index, content/data/INDEX_METHOD.md", availability: "The developer's availability table" },
  },
}[lang];

const EDITIONS = { lu: { pt: "Luxemburgo", en: "Luxembourg" }, fr: { pt: "França", en: "France" }, ch: { pt: "Suíça", en: "Switzerland" },
  br: { pt: "Brasil", en: "Brazil" }, us: { pt: "Estados Unidos", en: "United States" }, il: { pt: "Israel", en: "Israel" } };
const ed = (k) => EDITIONS[k]?.[lang] || k;
const [y, m] = month.split("-").map(Number);
const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
const period = `${month}-01 – ${month}-${String(last).padStart(2, "0")}`;
const fmt = (n) => (n === undefined || n === null || n === "" ? "–" : typeof n === "number" ? n.toLocaleString(lang === "pt" ? "pt-PT" : "en-GB") : String(n));
const esc = (s) => String(s ?? "").replace(/\|/g, "\\|");
const isEmpty = (v) => v === undefined || v === null || (Array.isArray(v) ? v.length === 0 : typeof v === "object" && Object.keys(v).length === 0);
const nodata = `<p class="nodata">${T.nodata}</p>`;
const meta = (sec) => `<p class="small">${T.source}: ${esc(data[sec]?.source || T.defaults[sec])} · ${T.period}: ${period}</p>`;
const table = (cols, rows) => [`| ${cols.join(" | ")} |`, `| ${cols.map(() => "---").join(" | ")} |`, ...rows.map((r) => `| ${r.map(esc).join(" | ")} |`)].join("\n");

const out = [];
out.push(`# ${T.title} · ${T.monthOf(T.months[m - 1], y)}`, "", `**${esc(company)}**`, "", T.intro(data.project, data.municipality), "");

// 0. The funnel (prompt 51 §2.4): reach → views → card clicks → requests → visits, each step with its share of the one
// before. Only steps with a figure are shown; nothing is estimated.
{
  const eds0 = data.reach?.editions || {}, sh0 = data.showcase || {}, rq0 = data.requests || {};
  const sumE = (k) => { const v = Object.values(eds0).map((e) => e?.[k]).filter((x) => typeof x === "number"); return v.length ? v.reduce((a, b) => a + b, 0) : undefined; };
  const reach = [sumE("site_visits"), sumE("opens")].filter((x) => x !== undefined);
  const visits = data.visits ?? (rq0.summaries?.length ? rq0.summaries.filter((s) => /visit|visita/i.test(s.status || "")).length : undefined);
  const steps = [["reach", reach.length ? reach.reduce((a, b) => a + b, 0) : undefined], ["views", sh0.page_views !== undefined || sh0.pin_opens !== undefined ? (sh0.page_views || 0) + (sh0.pin_opens || 0) : undefined],
    ["clicks", sh0.card_clicks], ["requests", rq0.total ?? (rq0.summaries?.length || undefined)], ["visits", visits]].filter(([, v]) => typeof v === "number");
  out.push(`## ${T.s0}`, "");
  if (!steps.length) out.push(nodata);
  else out.push(table(T.funCols, steps.map(([k, v], i) => [T.funnel[k], fmt(v), i && steps[i - 1][1] ? `${(100 * v / steps[i - 1][1]).toLocaleString(lang === "pt" ? "pt-PT" : "en-GB", { maximumFractionDigits: 1 })} %` : "–"])));
  out.push("");
}

// 1. Reach per edition
out.push(`## ${T.s1}`, "");
const eds = data.reach?.editions;
if (isEmpty(eds)) out.push(nodata);
else {
  const keys = Object.keys(EDITIONS).filter((k) => eds[k]).concat(Object.keys(eds).filter((k) => !EDITIONS[k]));
  const f = ["subscribers", "letters_sent", "opens", "site_visits"];
  const sum = f.map((x) => keys.reduce((a, k) => a + (Number(eds[k][x]) || 0), 0));
  out.push(table(T.reachCols, [...keys.map((k) => [ed(k), ...f.map((x) => fmt(eds[k][x]))]), [`**${T.total}**`, ...sum.map(fmt)]]));
}
out.push("", meta("reach"), "");

// 2. The project page
out.push(`## ${T.s2}`, "");
const sh = data.showcase || {};
const showKeys = Object.keys(T.showRows).filter((k) => sh[k] !== undefined && sh[k] !== null);
if (!showKeys.length && isEmpty(sh.by_edition)) out.push(nodata);
else {
  if (showKeys.length) out.push(table(["", ""], showKeys.map((k) => [T.showRows[k], fmt(sh[k])])), "");
  if (!isEmpty(sh.by_edition)) out.push(`**${T.byEdition}:** ` + Object.entries(sh.by_edition).map(([k, v]) => `${ed(k)} ${fmt(v)}`).join(" · "));
}
{
  const vc = sh.by_country || {}, rc = data.requests?.by_country || {};
  const keys = [...new Set([...Object.keys(vc), ...Object.keys(rc)])].sort((a, b) => (vc[b] || 0) - (vc[a] || 0));
  if (keys.length) {
    const dn = new Intl.DisplayNames([lang === "pt" ? "pt-PT" : "en-GB"], { type: "region" });
    const name = (k) => { try { return /^[A-Z]{2}$/.test(k) ? dn.of(k) : k; } catch { return k; } };
    const tv = Object.values(vc).reduce((a, b) => a + b, 0), tr = Object.values(rc).reduce((a, b) => a + b, 0);
    const pc = (v, t) => (t ? `${Math.round((100 * (v || 0)) / t)} %` : "–");
    out.push("", `**${T.countries}**`, "", table(T.ctyCols, keys.map((k) => [name(k), fmt(vc[k] || 0), pc(vc[k], tv), fmt(rc[k] || 0), pc(rc[k], tr)])));
  }
}
out.push("", meta("showcase"), "");

// 3. Requests
out.push(`## ${T.s3}`, "");
const rq = data.requests || {};
const sums = rq.summaries || [];
const total = rq.total ?? (sums.length || undefined);
if (total === undefined) out.push(nodata);
else {
  out.push(T.reqTotal(fmt(total)), "");
  if (!isEmpty(rq.by_edition)) out.push(`**${T.byEdition}:** ` + Object.entries(rq.by_edition).map(([k, v]) => `${ed(k)} ${fmt(v)}`).join(" · "), "");
  if (sums.length) out.push(table(T.reqCols, sums.map((s) => [s.date, ed(s.edition), s.typology, s.budget_band, s.payment, s.timeline, s.visit, s.status].map((x) => x ?? "–"))));
}
{
  const a = data.advisor || {};
  const rows = [["median", a.response_hours_median !== undefined ? `${fmt(a.response_hours_median)} ${T.hours}` : undefined], ["within", a.within_24h_pct !== undefined ? `${fmt(a.within_24h_pct)} %` : undefined], ["answered", a.answered]].filter(([, v]) => v !== undefined);
  if (rows.length) out.push("", `**${T.advisor.h}**`, "", table(["", ""], rows.map(([k, v]) => [T.advisor[k], typeof v === "number" ? fmt(v) : v])));
}
out.push("", meta("requests"), "");

// 4. Index card
out.push(`## ${T.s4}`, "");
const ix = data.index_card || {};
if (ix.score === undefined && isEmpty(ix.pillars)) out.push(nodata);
else {
  const head = [`**${esc(ix.municipality || data.municipality || "")}**`, ix.score !== undefined ? `${T.idxScore}: **${fmt(ix.score)}**/100` : "", ix.rank !== undefined ? `${T.idxRank}: ${fmt(ix.rank)}${ix.of ? ` / ${fmt(ix.of)}` : ""}` : "", ix.as_of ? `${T.idxAsOf}: ${esc(ix.as_of)}` : ""].filter(Boolean);
  out.push(head.join(" · "), "");
  if (!isEmpty(ix.pillars)) out.push(table([T.idxPillars, T.idxScore], ix.pillars.map((p) => [p.name, fmt(p.score)])), "");
  if (ix.url) out.push(`<p class="small">${esc(ix.url)}</p>`);
}
out.push("", `<p class="small">${T.idxNote}</p>`, meta("index_card"), "");

// 5. Availability (optional)
out.push(`## ${T.s5}`, "");
const av = data.availability || {};
const avKeys = Object.keys(T.avail).filter((k) => av[k] !== undefined);
out.push(avKeys.length ? table(avKeys.map((k) => T.avail[k]), [avKeys.map((k) => fmt(av[k]))]) : nodata, "", meta("availability"), "");

if (!isEmpty(data.notes)) out.push(`## ${T.s6}`, "", ...[].concat(data.notes).map((n) => `- ${n}`), "");
out.push(`<p class="small">${T.generated} ${new Date().toISOString().slice(0, 10)} · Imóveis Portugal · [Firma, Lda]</p>`);

const md = out.join("\n");
const slug = company.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const pdf = resolve(opt("--out") || join(root, "sponsors", "reports", `${slug}_${month}_${lang}.pdf`));
mkdirSync(dirname(pdf), { recursive: true });
if (argv.includes("--md")) writeFileSync(pdf.replace(/\.pdf$/, ".md"), md);
const pages = await renderMarkdown(md, pdf, { title: T.label, footer: `Imóveis Portugal · ${T.label} · ${company.replace(/[<>&"]/g, "")} · ${month}` });
console.log(`${pdf}: ${pages} page${pages === 1 ? "" : "s"}`);
