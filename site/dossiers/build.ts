// Paid dossiers (prompt 21 §3, D39): personalised PDFs in the brand's report design, compiled only from
// content/facts/facts.csv, the INE series (public/data/prices.json) and the reader's inputs. Information, not advice.
//   Dossiê de compra (190 €) · Relatório de zona (90 €) · Dossiê Private (950 €)
// Run from site/:  npx tsx dossiers/build.ts --type compra --ed lu --lang pt --budget 450000 --area porto --purpose holiday
//                  npx tsx dossiers/build.ts --samples      (the three public samples, Luxembourg reader, in PT)
// Output: public/dossiers/{name}.pdf. Sales stay off until the billing entity exists (D4): config.dossiers.live.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { eur, HTML_LANG, type EdCode, type Lang } from "../src/i18n";
import { config } from "../src/config";
import { c, cl, edName } from "../src/lib/copy";
import { FACTS, RATE, EDITION_CUR, fmtDate } from "../src/lib/content";
import { journeyFor } from "../src/lib/journeys";
import { PRICES, LAST } from "../src/lib/prices";
import { lineChart, change } from "../src/lib/chart";
import { SCENARIOS } from "../src/lib/scenarios";
import * as S from "../src/lib/sims";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const b64 = (p: string) => readFileSync(p).toString("base64");
const font = (p: string) => b64(require.resolve(p));
const serif = font("@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2");
const sans4 = font("@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2");
const sans6 = font("@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2");
const topo = JSON.parse(readFileSync(join(process.cwd(), "public", "data", "map", "munis.topo.json"), "utf8"));
const geo = { features: topo.objects.m.geometries.map((g: any) => ({ properties: g.properties })) };

type Type = "compra" | "zona" | "private";
type In = { type: Type; ed: EdCode; lang: Lang; budget: number; area: string; purpose: "own" | "holiday" | "rental"; out: string };
export const DOSSIER_PRICE: Record<Type, number> = { compra: 190, zona: 90, private: 950 };

function html(p: In) {
  const { lang, ed } = p;
  const nf = new Intl.NumberFormat(HTML_LANG[lang], { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat(HTML_LANG[lang], { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat(HTML_LANG[lang], { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pctS = lang === "fr" ? " %" : "%";
  const pc = (v: number | null) => (v === null ? "—" : `${v >= 0 ? "+" : "−"}${nf.format(Math.abs(v))}${pctS}`);
  const e = (n: number) => eur(Math.round(n), lang);
  const eu2 = (n: number) => (lang === "en" ? `€${nf2.format(n)}` : `${nf2.format(n)} €`);
  const cur = EDITION_CUR[ed]; const fx = cur ? RATE(cur) : null;
  const local = (n: number) => (fx && cur ? new Intl.NumberFormat(HTML_LANG[lang], { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(n * fx.rate) : "");
  const where = c(`home.where.${ed}`, lang);
  // One number per source document: facts that share a URL share a number.
  const src: string[] = []; const sn = (id: string) => { if (!FACTS[id]) throw new Error(`unknown fact ${id}`); const i = src.findIndex((x) => FACTS[x].source_url === FACTS[id].source_url); if (i >= 0) return i + 1; src.push(id); return src.length; };
  const sup = (...ids: string[]) => `<sup>${[...new Set(ids.map(sn))].join(",")}</sup>`;
  const area = PRICES.munis[p.area]; if (!area) throw new Error(`unknown area ${p.area}`);
  const m2 = area.m2[LAST]!;
  const own = p.purpose === "own";
  const buy = S.purchase(p.budget, own, false, true);
  const ltv = own ? S.LTV.own : S.LTV.other, years = 30;
  const loan = p.budget * ltv / 100;
  const rows = [S.RATE_DEFAULT, S.RATE_DEFAULT + 0.5, S.RATE_DEFAULT + 1].map((r) => { const m = S.payment(loan, r, years); return { r, m, int: m * years * 12 - loan }; });
  const chart = lineChart(PRICES.quarters, [{ label: area.n, values: area.m2 }, { label: "Portugal", values: PRICES.regions.PT.m2 }], { breakAt: PRICES.break, breakLabel: c("prices.break", lang), fmt: (v) => nf.format(v), w: 560, h: 250 });
  const title = c(`dossier.${p.type}.h`, lang);
  const sub = p.type === "zona" ? area.n : p.type === "private" ? `${edName(ed, lang)} · ${e(p.budget)}` : `${edName(ed, lang)} · ${area.n} · ${e(p.budget)}`;
  const qa = (ids: string[]) => journeyFor(ed).flatMap((cp) => cp.qs).filter((q) => ids.includes(q.id)).map((q) =>
    `<div class="qa"><b>${c(`journey.q.${q.id}.q`, lang, { where, from: c(`journey.from.${ed}`, lang) })}</b><p>${c(`journey.q.${q.a ?? q.id}.a`, lang, { where, from: c(`journey.from.${ed}`, lang) })}${q.facts.length ? sup(...q.facts) : ""}${q.ask ? ` <i>${c("journey.unverified", lang)}</i>` : ""}</p></div>`).join("");
  const kv = (k: string, v: string) => `<tr><th>${k}</th><td>${v}</td></tr>`;
  const devs = (config.developers[p.area] ?? []).map((d) => `<p><b>${d.project.name}</b> · ${d.name} · ${d.project.typology} · ${c("dev.from", lang, { price: e(d.project.from) })} · <i>${c("dev.sponsored", lang)}</i></p>`).join("") || `<p class="small">${c("dossier.devs.none", lang)}</p>`;
  const roles = ["agency", "bank", "lawyer", "tax", "fx", "insurance"].map((r) => kv(c(`journey.role.${r}`, lang), r === "agency" ? `${config.agency.name} · AMI ${config.agency.ami} · ${c("common.sponsored", lang)}` : c("dossier.tba", lang))).join("");
  const page = (body: string, n: number) => `<section class="pg">${body}<div class="foot"><span>Imóveis Portugal · ${title}</span><span>${n}</span></div></section>`;
  const pages: string[] = [];
  const img = b64(join(process.cwd(), "ebooks", "img", p.type === "private" ? "porto-ponte-luis-i-noite.jpg" : "porto-douro-entardecer.jpg"));
  const cover = `<section class="pg cover"><img src="data:image/jpeg;base64,${img}"><div class="t"><div class="brand">Imóveis Portugal</div><div class="ed">${c("dossier.for", lang, { where })}</div><h1>${title}</h1><p class="lede">${sub}</p><p class="small">${c("dossier.prepared", lang, { date: fmtDate(lang, "2026-10-26") })} · ${c("dossier.info", lang)}</p></div></section>`;
  if (p.type === "compra") {
    pages.push(page(`<h2>${c("dossier.summary.h", lang)}</h2><table class="kv">
      ${kv(c("dossier.s.total", lang), `<b>${e(buy.total)}</b>${local(buy.total) ? ` · ${local(buy.total)}${sup(fx!.id)}` : ""}${sup("pt-imt-nonresident-flat", "pt-is-purchase", "pt-casa-pronta-fees")}`)}
      ${kv(c("dossier.s.m2", lang), `${nf.format(p.budget / m2)} m²`)}
      ${kv(c("dossier.s.median", lang), `${e(m2)}/m²${sup("ine-m2-history")}`)}
      ${kv(c("dossier.s.ten", lang), pc(change(area.m2)))}
      ${area.rent["2026"] ? kv(c("dossier.s.rent", lang), `${eu2(area.rent["2026"])}/m²${sup("ine-rent-2026q2")}`) : ""}
      ${area.yield ? kv(c("dossier.s.yield", lang), `${nf1.format(area.yield)}${pctS}`) : ""}
      ${kv(c("dossier.s.monthly", lang), `${e(rows[0].m)}${sup("bdp-mortgage-rate-2026-08", "pt-ltv-limits")}`)}</table>
      <h2>${c("dossier.costs.h", lang)}</h2><table class="kv">${kv(c("sims.r.imt", lang), e(buy.imt) + sup("pt-imt-nonresident-flat", "pt-imt-nonresident-exceptions"))}${kv(c("sims.r.is", lang), e(buy.is) + sup("pt-is-purchase"))}${kv(c("sims.r.deed", lang), e(buy.deed) + sup("pt-casa-pronta-fees"))}${kv(`<b>${c("sims.r.total", lang)}</b>`, `<b>${e(buy.total)}</b>`)}</table>
      <p class="small">${c("sims.cost.note", lang)}</p>`, 2));
    pages.push(page(`<h2>${c("dossier.finance.h", lang)}</h2><p>${c("dossier.finance.p", lang, { ltv: `${ltv}%`, years: String(years) })}${sup("pt-ltv-limits", "pt-dsti-45", "pt-maturity-limits")}</p>
      <table class="grid"><thead><tr><th>${c("dossier.col.rate", lang)}</th><th>${c("dossier.col.monthly", lang)}</th><th>${c("dossier.col.interest", lang)}</th><th>${c("dossier.col.stamp", lang)}</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${nf2.format(r.r)}${pctS}</td><td>${e(r.m)}</td><td>${e(r.int)}</td><td>${e(loan * S.IS_LOAN / 100)}</td></tr>`).join("")}</tbody></table>
      <p class="small">${sup("bdp-mortgage-rate-2026-08", "pt-is-loan-5y")} ${c("dossier.info", lang)}</p>
      <h2>${c("dossier.area.h", lang)}</h2><div class="chart">${chart}</div><p class="small">${c("journey.past", lang)} ${c("prices.method", lang)}${sup("ine-m2-history")}</p>
      <h3>${c("dev.h", lang)}</h3>${devs}`, 3));
    pages.push(page(`<h2>${c("dossier.steps.h", lang)}</h2>${qa(["nif", "rep.eu", "rep.non", "account", "poa", "cpcv", "deed", "docs", "imt", "is"])}`, 4));
    pages.push(page(`${qa(["imi", "ins", "renttax", "home.rent", "cg", "home.sell", "live", "inherit"])}
      <h2>${c("dossier.partners.h", lang)}</h2><table class="kv">${roles}</table>`, 5));
  } else if (p.type === "zona") {
    const me = geo.features.find((f: any) => f.properties.s === p.area).properties;
    const neigh = geo.features.map((f: any) => f.properties).filter((x: any) => x.s !== p.area && PRICES.munis[x.s]?.m2[LAST])
      .sort((a: any, b: any) => Math.hypot(a.x - me.x, a.y - me.y) - Math.hypot(b.x - me.x, b.y - me.y)).slice(0, 6);
    const line = (s: string) => { const m = PRICES.munis[s]; return `<tr><td>${m.n}</td><td>${e(m.m2[LAST]!)}</td><td>${pc(change(m.m2))}</td><td>${pc(change(m.m2, 4))}</td><td>${m.rent["2026"] ? eu2(m.rent["2026"]) : "—"}</td><td>${m.yield ? nf1.format(m.yield) + pctS : "—"}</td></tr>`; };
    pages.push(page(`<h2>${c("dossier.summary.h", lang)}</h2><table class="kv">
      ${kv(c("dossier.s.median", lang), `<b>${e(m2)}/m²</b>${sup("ine-m2-history")}`)}${kv(c("dossier.s.ten", lang), pc(change(area.m2)))}${kv(c("prices.col.1y", lang), pc(change(area.m2, 4)))}
      ${area.rent["2026"] ? kv(c("dossier.s.rent", lang), `${eu2(area.rent["2026"])}/m²${sup("ine-rent-2026q2")}`) : ""}${area.yield ? kv(c("dossier.s.yield", lang), `${nf1.format(area.yield)}${pctS}`) : ""}
      ${[300000, 1000000].map((b) => kv(e(b), `${nf.format(b / m2)} m²`)).join("")}</table>
      <h2>${c("dossier.area.h", lang)}</h2><div class="chart">${chart}</div><p class="small">${c("journey.past", lang)} ${c("prices.method", lang)}</p>`, 2));
    pages.push(page(`<h2>${c("dossier.rents.h", lang)}</h2><table class="grid"><thead><tr>${PRICES.rentYears.map((y) => `<th>${y}</th>`).join("")}</tr></thead><tbody><tr>${PRICES.rentYears.map((y) => `<td>${area.rent[String(y)] ? nf2.format(area.rent[String(y)]) : "—"}</td>`).join("")}</tr></tbody></table>
      <p class="small">${c("prices.col.rent", lang)} (€) ${sup("ine-rent-2026q2")} · ${c("prices.yield.note", lang)}</p>
      <h2>${c("dossier.neigh.h", lang)}</h2><table class="grid"><thead><tr><th>${c("prices.col.place", lang)}</th><th>${c("prices.col.m2", lang)}</th><th>${c("prices.col.10y", lang)}</th><th>${c("prices.col.1y", lang)}</th><th>${c("prices.col.rent", lang)}</th><th>${c("prices.col.yield", lang)}</th></tr></thead><tbody>${line(p.area)}${neigh.map((x: any) => line(x.s)).join("")}</tbody></table>
      <h3>${c("dev.h", lang)}</h3>${devs}`, 3));
    pages.push(page(`<h2>${c("dossier.buyhow.h", lang)}</h2>${qa(["nif", "poa", "cpcv", "imt", "is", "renttax", "home.rent"])}<h2>${c("dossier.partners.h", lang)}</h2><table class="kv">${roles}</table>`, 4));
  } else {
    const prime = ["lisboa", "cascais", "oeiras", "loule", "grandola", "funchal"].filter((s) => PRICES.munis[s]);
    const ex = SCENARIOS.filter((s) => s.budget >= 5e6).flatMap((s) => s.listings);
    pages.push(page(`<h2>${c("dossier.struct.h", lang)}</h2>
      ${["live", "ifici", "inherit", "aimi", "holding"].map((k) => `<div class="qa"><b>${c(`private.${k}.q`, lang)}</b><p>${c(`private.${k}.a`, lang)}${sup(...({ live: ["pt-visa-own-income", "pt-ari-realestate-ended"], ifici: ["pt-ifici-20pct"], inherit: ["pt-is-inheritance-exempt"], aimi: ["pt-aimi-deduction", "pt-aimi-rates"], holding: ["pt-aimi-rates", "pt-imt-offshore-10", "pt-imi-offshore-75"] } as Record<string, string[]>)[k])}</p></div>`).join("")}`, 2));
    pages.push(page(`<h2>${c("dossier.prime.h", lang)}</h2><table class="grid"><thead><tr><th>${c("prices.col.place", lang)}</th><th>${c("prices.col.m2", lang)}</th><th>${c("prices.col.10y", lang)}</th><th>${c("prices.col.yield", lang)}</th><th>${e(p.budget)}</th></tr></thead><tbody>${prime.map((s) => { const m = PRICES.munis[s]; return `<tr><td>${m.n}</td><td>${e(m.m2[LAST]!)}</td><td>${pc(change(m.m2))}</td><td>${m.yield ? nf1.format(m.yield) + pctS : "—"}</td><td>${nf.format(p.budget / m.m2[LAST]!)} m²</td></tr>`; }).join("")}</tbody></table><p class="small">${sup("ine-m2-history", "ine-rent-2026q2")} ${c("scen.note", lang)}</p>
      <h2>${c("dossier.examples.h", lang)}</h2>${ex.map((l) => `<p><b>${l.price.split("-").map((x) => e(Number(x))).join(" – ")}</b>${l.m2 ? ` · ${nf.format(l.m2)} m²` : ""} · ${l.text[lang]}${sup(l.fact)}</p>`).join("")}`, 3));
    pages.push(page(`<h2>${c("dossier.ask.h", lang)}</h2><ol>${cl("dossier.ask", lang).map((x) => `<li>${x}</li>`).join("")}</ol>
      <h2>${c("dossier.intro.h", lang)}</h2><p>${c("dossier.intro.p", lang)}</p><table class="kv">${["wealth", "tax", "lawyer"].map((r) => kv(c(`journey.role.${r}`, lang), c("dossier.tba", lang))).join("")}${kv(c("journey.role.agency", lang), `${config.agency.name} · AMI ${config.agency.ami}`)}</table>`, 4));
  }
  const srcPage = page(`<h2>${c("dossier.sources.h", lang)}</h2><ol class="src">${src.map((id) => `<li>${FACTS[id].source_title}, ${FACTS[id].source_url} (${fmtDate(lang, FACTS[id].checked_on)})</li>`).join("")}</ol><hr><p class="small">${c("dossier.info", lang)}</p>`, pages.length + 2);
  return `<!doctype html><html lang="${HTML_LANG[lang]}"><head><meta charset="utf-8"><style>
@font-face{font-family:N;font-weight:400 900;src:url(data:font/woff2;base64,${serif})}@font-face{font-family:P;font-weight:200 800;src:url(data:font/woff2;base64,${sans4})}@font-face{font-family:P;font-weight:600;src:url(data:font/woff2;base64,${sans6})}
@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font:400 10pt/1.55 P;color:#0a0a0a;background:#ffffff}
.pg{width:210mm;height:297mm;padding:20mm 20mm 24mm;position:relative;page-break-after:always;overflow:hidden}
.cover{padding:0}.cover img{width:100%;height:56%;object-fit:cover;display:block}.cover .t{padding:14mm 20mm}
.brand{font:500 15pt/1 N}.ed{font:600 8pt/1 P;letter-spacing:.14em;text-transform:uppercase;color:#5f6368;margin-top:6px}
h1{font:400 30pt/1.1 N;margin:9mm 0 4mm}h2{font:400 16pt/1.2 N;margin:7mm 0 3mm;padding-top:3mm;border-top:.5pt solid #0a0a0a}h2:first-child{margin-top:0}h3{font:400 12.5pt/1.3 N;margin:6mm 0 2mm}
.lede{font:400 14pt/1.35 N;color:#0a0a0a}.small{font-size:8.3pt;color:#5f6368}sup{font-size:6.5pt;color:#2f5d50;margin-left:1px}
table{width:100%;border-collapse:collapse}.kv th,.kv td{padding:2.4mm 0;border-bottom:.4pt solid #e3e3e3;text-align:left;vertical-align:top}.kv td{text-align:right;font:400 11pt N}
.grid th,.grid td{padding:2mm 2mm 2mm 0;border-bottom:.4pt solid #e3e3e3;text-align:left;font-size:9pt}.grid th{font:600 7.5pt/1.2 P;letter-spacing:.06em;text-transform:uppercase;color:#5f6368}
.qa{padding:2.2mm 0;border-bottom:.4pt solid #e3e3e3}.qa b{font:400 11pt/1.3 N}.qa p{margin:1mm 0 0}.qa i{color:#5f6368;font-style:normal}
.chart svg{width:100%;height:auto}hr{border:0;border-top:.4pt solid #e3e3e3;margin:5mm 0}ol.src{columns:2;column-gap:8mm;padding-left:5mm}ol.src li{font-size:7pt;line-height:1.4;margin-bottom:1.2mm;word-break:break-all;break-inside:avoid}
.foot{position:absolute;left:20mm;right:20mm;bottom:11mm;font-size:7.5pt;color:#5f6368;display:flex;justify-content:space-between;border-top:.4pt solid #e3e3e3;padding-top:2mm}
</style></head><body>${cover}${pages.join("")}${srcPage}</body></html>`;
}

const args = process.argv.slice(2);
const get = (k: string, d = "") => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const out = join(process.cwd(), "public", "dossiers");
mkdirSync(out, { recursive: true });
const jobs: In[] = args.includes("--samples")
  ? (["compra", "zona", "private"] as Type[]).map((type) => ({ type, ed: "lu" as EdCode, lang: "pt" as Lang, budget: type === "private" ? 3000000 : 450000, area: type === "private" ? "cascais" : "porto", purpose: "holiday" as const, out: `exemplo-${type === "private" ? "patrimonio" : type}-lu-pt` }))
  : [{ type: get("type", "compra") as Type, ed: get("ed", "lu") as EdCode, lang: get("lang", "pt") as Lang, budget: Number(get("budget", "450000")), area: get("area", "porto"), purpose: get("purpose", "holiday") as In["purpose"], out: get("out", "dossie") }];
const browser = await chromium.launch();
const pg = await browser.newPage();
for (const j of jobs) {
  await pg.setContent(html(j), { waitUntil: "load" });
  await pg.evaluate(() => document.fonts.ready);
  await pg.pdf({ path: join(out, `${j.out}.pdf`), format: "A4", printBackground: true, preferCSSPageSize: true });
  console.log("wrote", `public/dossiers/${j.out}.pdf`);
}
await browser.close();
