// Partnerships v6 decks: one per category, PT and EN, 16:9 PDFs in sponsors/decks/v6/pdf/.
// Content: categories.mjs. Map points: public data only (sponsors/decks/v6/data/*.csv, site/public/data/map/golf.json,
// the airports). Prototype brands are fictional ("Exemplo"); every sponsored element is labelled. Nothing is sent.
//   node sponsors/decks/v6/build.mjs [key ...]
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CATS, PITCH } from "./categories.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, "..", "..", "..");
const req = createRequire(join(repo, "site", "package.json"));
const { chromium } = req("playwright");
const { feature } = req("topojson-client");
const font = (f) => "data:font/woff2;base64," + readFileSync(req.resolve(f)).toString("base64");
const FONTS = [font("@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2"), font("@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2")];
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- the map (static SVG): mainland plus Madeira and Azores insets ----------
const topo = JSON.parse(readFileSync(join(repo, "site", "public", "data", "map", "munis.topo.json"), "utf8"));
const MUNIS = feature(topo, topo.objects.m).features;
// The site's own geometry: Madeira and the Azores are already drawn as insets west of the mainland
// (scripts/map-data/build.py INSET); real island coordinates are moved the same way.
const INSET = { madeira: { c: [-16.95, 32.75], to: [-10.75, 37.55], s: 0.5 }, azores: { c: [-28.0, 38.6], to: [-11.35, 39.95], s: 0.28 } };
const INSET_BOX = JSON.parse(readFileSync(join(repo, "site", "public", "data", "map", "insets.json"), "utf8"));
const toInset = ([lon, lat]) => { const k = lon < -20 ? "azores" : lon < -14 ? "madeira" : null; if (!k) return [lon, lat]; const t = INSET[k]; return [t.to[0] + (lon - t.c[0]) * t.s, t.to[1] + (lat - t.c[1]) * t.s]; };
const BOX = [-12.45, 36.85, -6.1, 42.2], W = 420, KY = 1.25, K = W / (BOX[2] - BOX[0]), H = (BOX[3] - BOX[1]) * K * KY;
const proj = ([lon, lat]) => [(lon - BOX[0]) * K, H - (lat - BOX[1]) * K * KY];
function mapSvg(points) {
  let s = "";
  for (const f of MUNIS) {
    const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) s += `<path d="${poly[0].map((c, i) => `${i ? "L" : "M"}${proj(c).map((v) => v.toFixed(1)).join(",")}`).join("")}Z"/>`;
  }
  let fr = "";
  for (const [k, ring] of Object.entries(INSET_BOX)) { const [x0, y0] = proj(ring[3]), [x1, y1] = proj(ring[1]); fr += `<rect x="${x0.toFixed(1)}" y="${y1.toFixed(1)}" width="${(x1 - x0).toFixed(1)}" height="${(y0 - y1).toFixed(1)}"/><text x="${x0.toFixed(1)}" y="${(y1 - 4).toFixed(1)}" class="lb">${k === "madeira" ? "Madeira" : "Açores"}</text>`; }
  let dots = "";
  for (const pt of points) { const [x, y] = proj(toInset([pt.lon, pt.lat])); if (x < 0 || y < 0 || x > W || y > H) continue; dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.6"/>`; }
  return `<svg viewBox="0 0 ${W} ${H.toFixed(0)}" class="pt"><g class="mu">${s}</g><g class="fr">${fr}</g><g class="dt">${dots}</g></svg>`;
}
const csv = (f) => { if (!existsSync(f)) return []; const [h, ...r] = readFileSync(f, "utf8").trim().split("\n"); const k = h.split(","); return r.map((l) => { const v = l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map((x) => x.replace(/,$/, "").replace(/^"|"$/g, "").replace(/""/g, '"')); return Object.fromEntries(k.map((kk, i) => [kk, v[i]])); }); };
const AIRPORTS = [["Lisboa", 38.7742, -9.1342], ["Porto", 41.2481, -8.6814], ["Faro", 37.0144, -7.9659], ["Funchal", 32.6979, -16.7745], ["Ponta Delgada", 37.7412, -25.6979], ["Lajes (Terceira)", 38.7618, -27.0908], ["Porto Santo", 33.0734, -16.35]];
function pointsFor(kind) {
  const d = join(here, "data");
  if (kind === "golf") return { pts: JSON.parse(readFileSync(join(repo, "site", "public", "data", "map", "golf.json"), "utf8")).courses.filter((c) => c.status !== "closed").map((c) => ({ lon: c.x, lat: c.y })), src: { pt: "Campos de golfe: a nossa lista (content/facts/golf), cada campo com fonte", en: "Golf courses: our list (content/facts/golf), each with its source" } };
  if (kind === "airports") return { pts: AIRPORTS.map(([, lat, lon]) => ({ lat, lon })), src: { pt: "Aeroportos com voos comerciais regulares (ANA, VINCI Airports)", en: "Airports with scheduled flights (ANA, VINCI Airports)" } };
  const f = { hospitals: "hospitals.csv", schools: "schools.csv", universities: "universities.csv" }[kind];
  if (!f) return { pts: [], src: null };
  const rows = csv(join(d, f)).filter((r) => r.lat && r.lon).map((r) => ({ lat: +r.lat, lon: +r.lon }));
  const srcs = { hospitals: { pt: "Hospitais do SNS com urgência e hospitais dos grupos privados; localização a partir das moradas (OpenStreetMap). Lista a confirmar com o SNS antes do envio.", en: "SNS hospitals with emergency services and the private groups' hospitals; located from their addresses (OpenStreetMap). List to be checked against the SNS before sending." },
    schools: { pt: "Escolas internacionais: sites das escolas e diretórios públicos; localização OpenStreetMap.", en: "International schools: the schools' sites and public directories; located with OpenStreetMap." },
    universities: { pt: "Ensino superior: estabelecimentos da DGEEC (dados.gov.pt), coordenadas oficiais.", en: "Higher education: DGEEC establishments (dados.gov.pt), official coordinates." } };
  return { pts: rows, src: srcs[kind] };
}

// ---------- copy shared by every deck ----------
const T = {
  pt: {
    prop: "Proposta de parceria · 2027", moment: "O momento que é seu", channels: "O que recebe, canal a canal", letter: "A carta, com a sua categoria", map: "O mapa", report: "O relatório mensal", levels: "Três níveis, um parceiro oficial", close: "Como trabalhamos",
    ch: [["Mapa", (u) => `O seu logótipo e um cartão em destaque nos seus ${u}, etiquetados "Parceiro". Os dados públicos e o índice não mudam (D69, D75).`],
      ["Concierge", () => "O seu cartão no passo da categoria; o pedido segue para si com o consentimento do leitor, que o nomeia. Nunca cobramos por pedido."],
      ["Carta", () => "\"Apresentado por\" em meses à escolha, o bloco nas cartas da categoria e uma história patrocinada por trimestre. Terça e sexta, em PT, EN e FR."],
      ["Redes sociais", () => "Publicações e reels etiquetados, em colaboração, nas nossas contas."],
      ["Eventos", () => "Anfitrião de um evento por ano (jantar no Douro, dia de golfe, passeio de arte em Lisboa) e presença nos restantes."],
      ["Portugal 100", () => "Parceiro da categoria na revelação anual. A classificação nunca se vende."],
      ["Relatório anual de dados", () => "O capítulo da sua categoria, com o seu nome."]],
    special: "Só nesta categoria", ex: "Exemplo fictício", sponsored: "Patrocinado", by: "Apresentado por",
    letterHead: "Terça-feira, 2 de março", d1: "Destaque", d1t: "Uma casa com vista para o rio, a meia hora do aeroporto. Onde fica, quanto custa o metro quadrado e quem lá vive.", d2: "O número", d2t: "O valor mediano por m² no concelho, com a fonte do INE e o trimestre.", d3: "Como lá chegar", d3t: "Três linhas práticas sobre o passo seguinte.",
    mapNone: (u) => `Os seus ${u} entram no mapa a partir da sua lista pública: a listagem é gratuita para todos (D75); o parceiro tem o logótipo e o cartão em destaque.`,
    mapPts: (n, u) => `${n} ${u} já no mapa, a partir de dados públicos. O parceiro ganha o logótipo e o cartão em destaque; os restantes continuam visíveis.`,
    mapList: (n, u) => `${n} ${u} em Portugal, a partir de dados públicos. Com a listagem gratuita (D75) aparecem todos; o parceiro tem o logótipo e o cartão em destaque.`,
    rep: ["Leitores alcançados", "Viram a sua página ou cartão", "Clicaram", "Pedidos com consentimento", "Visitas ou reuniões marcadas"], repNote: "Exemplo ilustrativo. Todos os meses: alcance por edição, países dos leitores, pedidos com o resumo qualificado, tempo de resposta. Também num painel privado, sem login.",
    lv: [["Parceiro oficial", "Exclusivo na categoria, todos os canais, 12 meses, o título \"Parceiro oficial\"."], ["Parceiro", "Sem exclusividade: mapa e Concierge em destaque e um quarto das cartas."], ["Destaque", "Mapa e Concierge."]],
    natl: "Nacional: serve o leitor onde quer que chegue em Portugal.", regl: "Por região (Lisboa e Cascais · Porto e Norte · Centro · Algarve · Madeira e Açores).",
    founding: "Parceiro fundador: o primeiro de cada categoria tem −40% no 1.º ano, preço fixo no 2.º e o nome no lançamento.",
    pilot: (v) => `Piloto de 90 dias por 25% do preço anual (${v}), creditado se converter.`,
    rules: ["Tudo o que é pago leva a etiqueta \"Patrocinado\" ou \"Apresentado por\" (Código da Publicidade, art. 8.º).", "Nunca cobramos por pedido nem por clique (D6).", "O índice e a Portugal 100 nunca se vendem (D69)."],
    contact: "ops@imoveisportugal.lu", pitchTitle: "Uma empresa por categoria",
  },
  en: {
    prop: "Partnership proposal · 2027", moment: "The moment you own", channels: "What you get, channel by channel", letter: "The letter, with your category", map: "The map", report: "The monthly report", levels: "Three levels, one official partner", close: "How we work",
    ch: [["Map", (u) => `Your logo and a featured card on your ${u}, labelled "Partner". The public data and the index never change (D69, D75).`],
      ["Concierge", () => "Your card at the category step; the request reaches you with the reader's consent naming you. We never charge per request."],
      ["Letter", () => "\"Presented by\" in the months you choose, the block in the category's letters and one sponsored story a quarter. Tuesday and Friday, in PT, EN and FR."],
      ["Social", () => "Labelled posts and reels, as collaborations, on our accounts."],
      ["Events", () => "Host of one event a year (a Douro dinner, a golf day, a Lisbon art walk) and present at the others."],
      ["Portugal 100", () => "Category partner of the annual reveal. The ranking is never for sale."],
      ["Annual data report", () => "Your category's chapter, with your name."]],
    special: "Only in this category", ex: "Fictional example", sponsored: "Sponsored", by: "Presented by",
    letterHead: "Tuesday, 2 March", d1: "Lead story", d1t: "A house with a river view, half an hour from the airport. Where it is, the price per square metre and who lives there.", d2: "The number", d2t: "The median price per m² in the municipality, with INE as source and the quarter.", d3: "Getting there", d3t: "Three practical lines on the next step.",
    mapNone: (u) => `Your ${u} join the map from your public list: listing is free for everyone (D75); the partner gets the logo and the featured card.`,
    mapPts: (n, u) => `${n} ${u} already on the map, from public data. The partner gets the logo and the featured card; the others stay visible.`,
    mapList: (n, u) => `${n} ${u} in Portugal, from public data. With the free listing (D75) all of them appear; the partner gets the logo and the featured card.`,
    rep: ["Readers reached", "Saw your page or card", "Clicked", "Requests with consent", "Visits or meetings booked"], repNote: "Illustrative example. Every month: reach by edition, readers' countries, requests with the qualified summary, response time. Also on a private dashboard, no login.",
    lv: [["Official Partner", "Exclusive in the category, every channel, 12 months, the \"Official Partner\" title."], ["Partner", "Non-exclusive: featured on the map and in the Concierge, and a quarter of the letters."], ["Featured", "Map and Concierge."]],
    natl: "National: serves the reader wherever they land in Portugal.", regl: "By region (Lisboa e Cascais · Porto e Norte · Centro · Algarve · Madeira e Açores).",
    founding: "Founding partner: the first in each category gets −40% in year 1, the price locked in year 2 and its name on the launch.",
    pilot: (v) => `A 90-day pilot at 25% of the annual price (${v}), credited if you convert.`,
    rules: ["Everything paid carries the \"Sponsored\" or \"Presented by\" label (Código da Publicidade, art. 8).", "We never charge per request or per click (D6).", "The index and the Portugal 100 are never for sale (D69)."],
    contact: "ops@imoveisportugal.lu", pitchTitle: "One company per category",
  },
};
const money = (lang, v) => (v == null ? "—" : Array.isArray(v) && typeof v[1] === "number" ? `${fmt(lang, v[0])}–${fmt(lang, v[1])}` : Array.isArray(v) ? `${fmt(lang, v[0])} ${lang === "pt" ? v[1] : v[2]}` : fmt(lang, v));
const fmt = (lang, n) => new Intl.NumberFormat(lang === "pt" ? "pt-PT" : "en-GB", { maximumFractionDigits: 0 }).format(n) + " €";

function deck(c, lang) {
  const L = T[lang], C = c[lang];
  const mp = pointsFor(c.map);
  const off = c.price[0], pilot = Array.isArray(off) ? `${fmt(lang, off[0] / 4)}–${fmt(lang, off[1] / 4)}` : fmt(lang, off / 4);
  const funnel = [12000, 1800, 420, 38, 11];
  const slides = [
    `<section class="cover"><p class="kick">Imóveis Portugal · ${esc(L.prop)}</p><h1>${esc(C.title)}</h1><p class="lede">${esc(PITCH[lang])}</p><p class="foot">${esc(C.name)}</p></section>`,
    `<section><p class="kick">${esc(C.name)}</p><h2>${esc(L.moment)}</h2><p class="big">${esc(C.moment)}</p><div class="note"><b>${esc(L.special)}.</b> ${esc(C.special)}</div></section>`,
    `<section><p class="kick">${esc(C.title)}</p><h2>${esc(L.channels)}</h2><table class="ch">${L.ch.map(([k, f]) => `<tr><th>${esc(k)}</th><td>${esc(f(C.unit))}</td></tr>`).join("")}</table></section>`,
    `<section><p class="kick">${esc(L.ex)}</p><h2>${esc(L.letter)}</h2><div class="letter"><p class="lh">Imóveis Portugal · ${esc(L.letterHead)}</p><p class="pres">${esc(L.by)} <b>${esc(C.ex)}</b></p>
      <p class="lt">${esc(L.d1)}</p><p>${esc(L.d1t)}</p><div class="spon"><span>${esc(L.sponsored)} · ${esc(C.ex)}</span><p>${esc(C.block)}</p></div><p class="lt">${esc(L.d2)}</p><p>${esc(L.d2t)}</p><p class="lt">${esc(L.d3)}</p><p>${esc(L.d3t)}</p></div></section>`,
    `<section class="two"><div><p class="kick">${esc(C.name)}</p><h2>${esc(L.map)}</h2><p class="big">${esc(mp.pts.length ? (c.map === "golf" ? L.mapPts : L.mapList)(mp.pts.length, C.unit) : L.mapNone(C.unit))}</p>${mp.src ? `<p class="src">${esc(mp.src[lang])}</p>` : ""}</div><div class="mapbox">${mapSvg(mp.pts)}</div></section>`,
    `<section><p class="kick">${esc(L.ex)}</p><h2>${esc(L.report)}</h2><ol class="fun">${funnel.map((v, i) => `<li><span>${esc(L.rep[i])}</span><b>${new Intl.NumberFormat(lang === "pt" ? "pt-PT" : "en-GB").format(v)}</b><i style="width:${Math.max(2, (100 * v) / funnel[0])}%"></i></li>`).join("")}</ol><p class="src">${esc(L.repNote)}</p></section>`,
    `<section><p class="kick">${esc(C.name)} · ${esc(c.geo === "national" ? L.natl : L.regl)}</p><h2>${esc(L.levels)}</h2><table class="lv">${L.lv.map(([k, d], i) => `<tr><th>${esc(k)}</th><td>${esc(d)}</td><td class="pr">${esc(c.price[i] == null ? "—" : money(lang, c.price[i]))}</td></tr>`).join("")}</table>
      <ul class="terms"><li>${esc(L.founding)}</li><li>${esc(L.pilot(pilot))}</li></ul></section>`,
    `<section class="end"><p class="kick">${esc(L.close)}</p><h2>${esc(L.pitchTitle)}</h2><ul class="terms">${[...L.rules, c.rules ? c.rules[lang] : ""].filter(Boolean).map((r) => `<li>${esc(r)}</li>`).join("")}</ul><p class="contact">${esc(L.contact)}</p></section>`,
  ];
  return `<!doctype html><html lang="${lang}"><meta charset="utf-8"><style>
@font-face{font-family:P;src:url(${FONTS[0]})}@font-face{font-family:M;src:url(${FONTS[1]})}
@page{size:1280px 720px;margin:0} *{box-sizing:border-box} body{margin:0;font:400 20px/1.5 M,sans-serif;color:#111214}
section{width:1280px;height:720px;padding:72px 96px;page-break-after:always;position:relative;background:#fbfaf7;overflow:hidden}
.kick{font:600 14px/1.3 M;letter-spacing:.14em;text-transform:uppercase;color:#5d6066;margin:0 0 16px} h1{font:400 64px/1.05 P,serif;margin:0 0 32px;max-width:960px} h2{font:400 40px/1.15 P,serif;margin:0 0 32px}
.cover{background:#14261f;color:#fbfaf7}.cover .kick{color:#c9d3cc}.cover .lede{font:400 26px/1.45 M;max-width:900px}.cover .foot{position:absolute;bottom:56px;left:96px;font:600 14px/1 M;letter-spacing:.14em;text-transform:uppercase;color:#c9d3cc}
.big{font:400 26px/1.45 M;max-width:980px;margin:0 0 32px}.note{border-left:3px solid #2f5d50;padding:8px 0 8px 24px;max-width:1000px;font-size:20px}
table{border-collapse:collapse;width:100%}th,td{text-align:left;vertical-align:top;padding:12px 16px 12px 0;border-bottom:1px solid #e4e1da}th{font:600 18px/1.4 M;width:240px}td{font-size:18px}
.letter{width:640px;background:#fff;border:1px solid #e4e1da;padding:32px 40px;font-size:16px;line-height:1.5}.letter p{margin:0 0 8px}.lh{font:600 12px/1 M;letter-spacing:.12em;text-transform:uppercase;color:#5d6066}.pres{font-size:13px;color:#5d6066;margin-bottom:16px!important}.lt{font:400 22px/1.2 P,serif;margin-top:12px!important}
.spon{background:#f2efe8;padding:16px 20px;margin:12px 0}.spon span{font:600 11px/1 M;letter-spacing:.12em;text-transform:uppercase;color:#6b4e00}.spon p{margin:8px 0 0}
section:nth-of-type(4) .letter{position:absolute;right:96px;top:72px;height:576px;overflow:hidden}section:nth-of-type(4) h2{max-width:400px}
.two{display:grid;grid-template-columns:1fr 440px;gap:40px}.mapbox{height:576px;display:flex;justify-content:flex-end}.pt{height:576px;width:auto}.fr rect{fill:none;stroke:#c9c5bc;stroke-width:.6;stroke-dasharray:2 2}.mu path{fill:#e8e4da;stroke:#fbfaf7;stroke-width:.4}.dt circle{fill:#2f5d50;stroke:#fff;stroke-width:.8}.lb{font:600 9px M;fill:#5d6066}
.src{font-size:14px;color:#5d6066;max-width:900px}
.fun{list-style:none;padding:0;margin:0 0 24px;display:grid;gap:12px;max-width:1000px}.fun li{display:grid;grid-template-columns:1fr auto;gap:4px 24px}.fun i{grid-column:1/-1;height:10px;background:#2f5d50;border-radius:5px;display:block}.fun b{font:500 22px/1 P,serif}
.lv th{width:240px}.lv .pr{font:500 24px/1.2 P,serif;white-space:nowrap;text-align:right}.terms{margin:32px 0 0;padding-left:24px;font-size:19px}.terms li{margin:0 0 10px}
.end .contact{position:absolute;bottom:56px;left:96px;font:600 16px/1 M;color:#2f5d50}
</style>${slides.join("")}</html>`;
}

const only = process.argv.slice(2);
const out = join(here, "pdf"); mkdirSync(out, { recursive: true });
const b = await chromium.launch(); const page = await b.newPage();
for (const c of CATS.filter((x) => !only.length || only.includes(x.key))) for (const lang of ["pt", "en"]) {
  await page.setContent(deck(c, lang), { waitUntil: "load" });
  const f = join(out, `${c.key}_${lang}.pdf`);
  await page.pdf({ path: f, width: "1280px", height: "720px", printBackground: true });
  console.log(f);
}
await b.close();
