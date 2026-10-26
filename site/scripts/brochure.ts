// Sponsor brochure, private to partners (prompt 21 §4, D38, D40; D52: the top product is "Wealth Partner"): the only place with prices. PDF, never linked from the site.
// One per partner type (developers; tax, legal and wealth; banks and money transfer) in FR, EN and PT, in the report
// design, with screenshots of the map, the prices section and the country path (sponsors/brochure/img, refreshed with
// the screenshot step in ops/BROCHURE.md). Prices: D40, flat annual fees excl. VAT (D6); no exclusivity before launch (D32).
// Run from site/: npm run brochure · Output: ../sponsors/brochure/ImoveisPortugal_Brochure_{type}_{LANG}.pdf
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { eur, type Lang } from "../src/i18n";
import { config } from "../src/config";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const b64 = (p: string) => readFileSync(p).toString("base64");
const font = (p: string) => b64(require.resolve(p));
const serif = font("@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2");
const sans4 = font("@fontsource/public-sans/files/public-sans-latin-400-normal.woff2");
const sans6 = font("@fontsource/public-sans/files/public-sans-latin-600-normal.woff2");
const dir = join(process.cwd(), "..", "sponsors", "brochure");
const img = (n: string) => `data:image/jpeg;base64,${b64(join(dir, "img", `${n}.jpg`))}`;
const cover = (n: string) => `data:image/jpeg;base64,${b64(join(process.cwd(), "ebooks", "img", n))}`;

// D40 price list (CEO, delegated by Daniel, 25 Oct 2026).
const P = { area: { prime: 24000, strong: 12000, standard: 6000 }, launch: { std: 7500, prime: 15000 }, step: { ch: 12000, lu: 12000, us: 12000, fr: 8000, il: 8000, br: 5000 }, structuring: 1.5, private: 48000, founding: 0.4 };
type T = "developers" | "advisers" | "banks";
const TYPES: T[] = ["developers", "advisers", "banks"];

const TX: Record<Lang, Record<string, string>> = {
  pt: {
    label: "Brochura para parceiros · confidencial", "developers.h": "Para promotores imobiliários", "advisers.h": "Para consultores fiscais, advogados e gestores de património", "banks.h": "Para bancos e empresas de transferência de dinheiro",
    cover: "Os seus próximos clientes estão a preparar uma casa em Portugal, a partir de seis países.",
    aud: "Quem nos lê", "aud.p": "Pessoas que vivem no Luxemburgo, em França, na Suíça, no Brasil, nos Estados Unidos e em Israel e preparam uma compra em Portugal, de 300 mil a mais de 10 milhões de euros. Seis edições, três línguas (português, inglês, francês), uma newsletter às quintas-feiras.",
    now: "Porquê agora", "now.p": "Lançamento a 1 de dezembro de 2026. Os primeiros parceiros aparecem desde o primeiro número e fixam o preço por dois anos.",
    pos: "O tom da casa", "pos.p": "Calmo, discreto, rigoroso: cada número com a fonte oficial, cada parceiro com a sua licença, o conteúdo patrocinado sempre identificado. O leitor sente que está bem acompanhado, tenha 300 mil ou 10 milhões de euros.",
    map: "O mapa", "map.p": "Qualquer orçamento, em metros quadrados, em cada um dos 308 concelhos, em 3D, com o preço mediano do INE.",
    prices: "Dez anos de preços", "prices.p": "Preços, rendas e rendimento bruto por concelho, desde 2016, na moeda do leitor.",
    path: "O percurso por país", "path.p": "Nove passos, da ideia às chaves e depois: em cada um, a resposta oficial e o parceiro que o resolve.",
    buy: "O que compra", "buy.dev": "Lugares por zona: no mapa, na página de preços da zona e no cartão de cada concelho, o seu logótipo, um empreendimento (nome, preço desde, tipologia, ligação) e a indicação «Patrocinado». No máximo três promotores por zona, em português, inglês e francês. Um lançamento põe um novo empreendimento em destaque no mapa, na página da zona e numa newsletter.",
    "buy.adv": "Passos do percurso: em cada país, o passo que corresponde ao seu trabalho (documentos, impostos ao comprar, arrendar, vender, residência e estrutura) termina com o seu perfil, a sua licença e o botão para o contactar. No máximo três parceiros por passo e por país. O Wealth Partner está nos passos de residência, herança e estrutura em todos os países, e no percurso dos leitores com orçamentos mais altos, que o site adapta sem o anunciar.",
    "buy.bank": "Passos do percurso: o financiamento e a transferência do dinheiro, país a país, com o seu nome no simulador de crédito e na linha de câmbio. No máximo três parceiros por passo e por país. O Wealth Partner (banca privada e gestão de património) está nos passos de residência, herança e estrutura em todos os países, e no percurso dos leitores com orçamentos mais altos, que o site adapta sem o anunciar.",
    price: "Preços por ano", "col.what": "Lugar", "col.price": "Preço por ano",
    "a.prime": "Zona prime (ex.: Comporta, Quinta do Lago e Loulé, Cascais, Lisboa centro, Foz do Porto), por lugar", "a.strong": "Zona forte (ex.: Porto, Braga, resto do Algarve, Madeira), por lugar", "a.std": "Zona padrão, por lugar",
    "l.std": "Lançamento de um empreendimento", "l.prime": "Lançamento em zona prime",
    "s.high": "Passo do percurso · Suíça, Luxemburgo, EUA", "s.mid": "Passo do percurso · França, Israel", "s.low": "Passo do percurso · Brasil", "s.struct": "Passo de residência e estrutura: ×1,5 (Suíça, Luxemburgo, EUA {a} · França, Israel {b} · Brasil {c})",
    priv: "Wealth Partner (passos de residência, herança e estrutura em todos os países, e o percurso dos leitores com orçamentos mais altos)",
    founding: "Parceiro fundador: os dez primeiros parceiros têm 40% de desconto no primeiro ano e o preço fixo no segundo, até 1 de dezembro de 2026.",
    logic: "Um cliente no seu passo paga o ano.",
    rules: "As regras", "r.1": "Patrocínio sempre identificado, licença de cada parceiro visível.", "r.2": "Valor anual fixo, nunca uma comissão por contacto ou por venda.", "r.3": "Sem exclusividade vendida antes do lançamento; no máximo três parceiros por zona ou por passo.", "r.4": "Os pedidos de compra seguem só para a agência parceira licenciada (AMI {ami}).",
    vat: "Valores anuais, sem IVA.", contact: "Falemos 15 minutos",
  },
  en: {
    label: "Partner brochure · confidential", "developers.h": "For property developers", "advisers.h": "For tax advisers, lawyers and wealth managers", "banks.h": "For banks and money-transfer firms",
    cover: "Your next clients are preparing a home in Portugal, from six countries.",
    aud: "Who reads us", "aud.p": "People living in Luxembourg, France, Switzerland, Brazil, the United States and Israel who are preparing a purchase in Portugal, from €300,000 to over €10 million. Six editions, three languages (Portuguese, English, French), a newsletter every Thursday.",
    now: "Why now", "now.p": "Launch on 1 December 2026. The first partners appear from the first issue and fix their price for two years.",
    pos: "The house style", "pos.p": "Calm, discreet, exact: every figure with its official source, every partner with its licence, sponsored content always labelled. Readers feel looked after, whether they have €300,000 or €10 million.",
    map: "The map", "map.p": "Any budget, in square metres, in each of the 308 municipalities, in 3D, at INE's median price.",
    prices: "Ten years of prices", "prices.p": "Prices, rents and gross yield by municipality since 2016, in the reader's currency.",
    path: "The path by country", "path.p": "Nine steps, from the idea to the keys and beyond: at each one, the official answer and the partner who handles it.",
    buy: "What you buy", "buy.dev": "Area placements: on the map, on the area's price page and on each municipality card, your logo, one project (name, price from, typology, link) and the \"Sponsored\" label. Three developers per area at most, in Portuguese, English and French. A launch features a new project on the map, on the area page and in one newsletter.",
    "buy.adv": "Path steps: in each country, the step that matches your work (documents, taxes when buying, renting, selling, residence and structuring) ends with your profile, your licence and the button to contact you. Three partners per step and country at most. The Wealth Partner sits in the residence, inheritance and structuring steps in every country, and in the path of readers with larger budgets, which the site adapts without announcing it.",
    "buy.bank": "Path steps: financing and moving the money, country by country, with your name on the mortgage calculator and the exchange line. Three partners per step and country at most. The Wealth Partner (private banking and wealth management) sits in the residence, inheritance and structuring steps in every country, and in the path of readers with larger budgets, which the site adapts without announcing it.",
    price: "Prices per year", "col.what": "Placement", "col.price": "Price per year",
    "a.prime": "Prime area (e.g. Comporta, Quinta do Lago and Loulé, Cascais, central Lisbon, Porto Foz), per slot", "a.strong": "Strong area (e.g. Porto, Braga, the rest of the Algarve, Madeira), per slot", "a.std": "Standard area, per slot",
    "l.std": "Project launch", "l.prime": "Project launch in a prime area",
    "s.high": "Path step · Switzerland, Luxembourg, USA", "s.mid": "Path step · France, Israel", "s.low": "Path step · Brazil", "s.struct": "Residence and structuring step: ×1.5 (Switzerland, Luxembourg, USA {a} · France, Israel {b} · Brazil {c})",
    priv: "Wealth Partner (the residence, inheritance and structuring steps in every country, and the path of readers with larger budgets)",
    founding: "Founding Partner: the first ten partners get 40% off year one and the price locked for year two, until 1 December 2026.",
    logic: "One client at your step pays for the year.",
    rules: "The rules", "r.1": "Sponsorship always labelled, every partner's licence shown.", "r.2": "A flat yearly fee, never a fee per lead or per sale.", "r.3": "No exclusivity sold before launch; three partners per area or step at most.", "r.4": "Purchase requests go only to the licensed partner agency (AMI {ami}).",
    vat: "Yearly prices, excluding VAT.", contact: "Let's talk for 15 minutes",
  },
  fr: {
    label: "Brochure partenaires · confidentiel", "developers.h": "Pour les promoteurs immobiliers", "advisers.h": "Pour les conseillers fiscaux, avocats et gestionnaires de patrimoine", "banks.h": "Pour les banques et les sociétés de transfert d'argent",
    cover: "Vos prochains clients préparent une maison au Portugal, depuis six pays.",
    aud: "Qui nous lit", "aud.p": "Des personnes vivant au Luxembourg, en France, en Suisse, au Brésil, aux États-Unis et en Israël qui préparent un achat au Portugal, de 300 000 € à plus de 10 millions d'euros. Six éditions, trois langues (portugais, anglais, français), une newsletter chaque jeudi.",
    now: "Pourquoi maintenant", "now.p": "Lancement le 1er décembre 2026. Les premiers partenaires figurent dès le premier numéro et fixent leur prix pour deux ans.",
    pos: "Le ton de la maison", "pos.p": "Calme, discret, exact : chaque chiffre avec sa source officielle, chaque partenaire avec sa licence, le contenu sponsorisé toujours signalé. Le lecteur se sent bien accompagné, qu'il dispose de 300 000 € ou de 10 millions.",
    map: "La carte", "map.p": "N'importe quel budget, en mètres carrés, dans chacune des 308 communes, en 3D, au prix médian de l'INE.",
    prices: "Dix ans de prix", "prices.p": "Prix, loyers et rendement brut par commune depuis 2016, dans la devise du lecteur.",
    path: "Le parcours par pays", "path.p": "Neuf étapes, de l'idée aux clés et au-delà : à chacune, la réponse officielle et le partenaire qui s'en charge.",
    buy: "Ce que vous achetez", "buy.dev": "Places par secteur : sur la carte, sur la page des prix du secteur et sur la fiche de chaque commune, votre logo, un programme (nom, prix à partir de, typologie, lien) et la mention « Sponsorisé ». Trois promoteurs par secteur au plus, en portugais, anglais et français. Un lancement met un nouveau programme en avant sur la carte, sur la page du secteur et dans une newsletter.",
    "buy.adv": "Étapes du parcours : dans chaque pays, l'étape qui correspond à votre métier (documents, impôts à l'achat, location, vente, résidence et structuration) se termine par votre profil, votre licence et le bouton pour vous contacter. Trois partenaires par étape et par pays au plus. Le Wealth Partner figure dans les étapes résidence, succession et structuration de tous les pays, et dans le parcours des lecteurs aux budgets plus élevés, que le site adapte sans l'annoncer.",
    "buy.bank": "Étapes du parcours : le financement et le transfert de l'argent, pays par pays, avec votre nom sur le simulateur de crédit et la ligne de change. Trois partenaires par étape et par pays au plus. Le Wealth Partner (banque privée et gestion de patrimoine) figure dans les étapes résidence, succession et structuration de tous les pays, et dans le parcours des lecteurs aux budgets plus élevés, que le site adapte sans l'annoncer.",
    price: "Prix par an", "col.what": "Place", "col.price": "Prix par an",
    "a.prime": "Secteur prime (ex. : Comporta, Quinta do Lago et Loulé, Cascais, centre de Lisbonne, Foz à Porto), par place", "a.strong": "Secteur fort (ex. : Porto, Braga, le reste de l'Algarve, Madère), par place", "a.std": "Secteur standard, par place",
    "l.std": "Lancement d'un programme", "l.prime": "Lancement en secteur prime",
    "s.high": "Étape du parcours · Suisse, Luxembourg, États-Unis", "s.mid": "Étape du parcours · France, Israël", "s.low": "Étape du parcours · Brésil", "s.struct": "Étape résidence et structuration : ×1,5 (Suisse, Luxembourg, États-Unis {a} · France, Israël {b} · Brésil {c})",
    priv: "Wealth Partner (étapes résidence, succession et structuration dans tous les pays, et le parcours des lecteurs aux budgets plus élevés)",
    founding: "Partenaire fondateur : les dix premiers partenaires bénéficient de 40 % de remise la première année et du prix bloqué la deuxième, jusqu'au 1er décembre 2026.",
    logic: "Un client à votre étape paie l'année.",
    rules: "Les règles", "r.1": "Sponsoring toujours signalé, licence de chaque partenaire affichée.", "r.2": "Un forfait annuel, jamais une commission par contact ou par vente.", "r.3": "Aucune exclusivité vendue avant le lancement ; trois partenaires par secteur ou par étape au plus.", "r.4": "Les demandes d'achat vont uniquement à l'agence partenaire agréée (AMI {ami}).",
    vat: "Prix annuels, hors TVA.", contact: "Parlons 15 minutes",
  },
};

function html(t: T, lang: Lang) {
  const x = (k: string, v: Record<string, string> = {}) => TX[lang][k].replace(/\{(\w+)\}/g, (_, n) => v[n] ?? config.agency.ami);
  const e = (n: number) => eur(n, lang);
  const st = (n: number) => e(Math.round(n * P.structuring));
  const row = (k: string, v: string) => `<tr><th>${k}</th><td>${v}</td></tr>`;
  const devRows = row(x("a.prime"), e(P.area.prime)) + row(x("a.strong"), e(P.area.strong)) + row(x("a.std"), e(P.area.standard)) + row(x("l.std"), e(P.launch.std)) + row(x("l.prime"), e(P.launch.prime));
  const stepRows = row(x("s.high"), e(P.step.ch)) + row(x("s.mid"), e(P.step.fr)) + row(x("s.low"), e(P.step.br)) + `<tr><th colspan="2">${x("s.struct", { a: st(P.step.ch), b: st(P.step.fr), c: st(P.step.br) })}</th></tr>` + row(x("priv"), e(P.private));
  const rows = t === "developers" ? devRows + row(x("priv"), e(P.private)) : stepRows;
  const buy = t === "developers" ? x("buy.dev") : t === "advisers" ? x("buy.adv") : x("buy.bank");
  const photo = cover(t === "developers" ? "porto-douro-entardecer.jpg" : "porto-ponte-luis-i-noite.jpg");
  const foot = (n: number) => `<div class="foot"><span>Imóveis Portugal · ${x("label")}</span><span>${n}</span></div>`;
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
@font-face{font-family:N;src:url(data:font/woff2;base64,${serif})}@font-face{font-family:P;font-weight:400;src:url(data:font/woff2;base64,${sans4})}@font-face{font-family:P;font-weight:600;src:url(data:font/woff2;base64,${sans6})}
@page{size:A4;margin:0}*{box-sizing:border-box}body{margin:0;font:400 10.5pt/1.55 P;color:#16181c;background:#f7f3eb}
.pg{width:210mm;height:297mm;padding:20mm;position:relative;page-break-after:always;overflow:hidden}
.cover{padding:0}.cover>img{width:100%;height:55%;object-fit:cover;display:block}.cover .t{padding:14mm 20mm}
.brand{font:500 15pt/1 N}.lab{font:600 8pt/1 P;letter-spacing:.14em;text-transform:uppercase;color:#7a5e28;margin-top:6px}
h1{font:400 28pt/1.12 N;margin:9mm 0 4mm}h2{font:400 16pt/1.2 N;margin:6mm 0 2.5mm;padding-top:3mm;border-top:.5pt solid #16181c}h2:first-child{margin-top:0}
.lede{font:400 14pt/1.4 N}.small{font-size:8.5pt;color:#5d6066}
.shots{display:grid;grid-template-columns:1fr 1fr;gap:6mm;margin-top:4mm}.shots figure{margin:0}.shots img{width:100%;display:block;border:.4pt solid #dcd4c4}.shots figcaption{font-size:8.5pt;color:#5d6066;margin-top:1.5mm}.shots b{display:block;font:400 11pt N;color:#16181c}
table{width:100%;border-collapse:collapse}th,td{text-align:left;vertical-align:top;padding:3mm 0;border-bottom:.4pt solid #dcd4c4;font-weight:400}td{text-align:right;font:400 12.5pt N;white-space:nowrap;padding-left:6mm}
.logic{font:400 18pt/1.3 N;margin:8mm 0 4mm;color:#1f4a3d}ul{padding-left:4.5mm}li{margin:0 0 1.8mm}
.foot{position:absolute;left:20mm;right:20mm;bottom:11mm;font-size:7.5pt;color:#5d6066;display:flex;justify-content:space-between;border-top:.4pt solid #dcd4c4;padding-top:2mm}
</style></head><body>
<section class="pg cover"><img src="${photo}"><div class="t"><div class="brand">Imóveis Portugal</div><div class="lab">${x("label")}</div><h1>${x(`${t}.h`)}</h1><p class="lede">${x("cover")}</p></div></section>
<section class="pg"><h2>${x("aud")}</h2><p>${x("aud.p")}</p><h2>${x("now")}</h2><p>${x("now.p")}</p><h2>${x("pos")}</h2><p>${x("pos.p")}</p>
<div class="shots"><figure><img src="${img("map")}"><figcaption><b>${x("map")}</b>${x("map.p")}</figcaption></figure><figure><img src="${img("prices")}"><figcaption><b>${x("prices")}</b>${x("prices.p")}</figcaption></figure></div>${foot(2)}</section>
<section class="pg"><h2>${x("buy")}</h2><p>${buy}</p>
<div class="shots"><figure><img src="${img(t === "developers" ? "area" : "journey")}"><figcaption><b>${t === "developers" ? x("map") : x("path")}</b>${t === "developers" ? x("map.p") : x("path.p")}</figcaption></figure><figure><img src="${img(t === "developers" ? "map" : "prices")}"><figcaption><b>${t === "developers" ? x("prices") : x("prices")}</b>${x("prices.p")}</figcaption></figure></div>
<h2>${x("rules")}</h2><ul><li>${x("r.1")}</li><li>${x("r.2")}</li><li>${x("r.3")}</li><li>${x("r.4")}</li></ul>${foot(3)}</section>
<section class="pg"><h2>${x("price")}</h2><table>${rows}</table><p class="small">${x("vat")}</p><p>${x("founding")}</p><p class="logic">${x("logic")}</p>
<h2>${x("contact")}</h2><p>${config.contactEmail}</p>${foot(4)}</section>
</body></html>`;
}

mkdirSync(dir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
for (const t of TYPES) for (const lang of ["fr", "en", "pt"] as Lang[]) {
  await page.setContent(html(t, lang), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: join(dir, `ImoveisPortugal_Brochure_${t}_${lang.toUpperCase()}.pdf`), format: "A4", printBackground: true, preferCSSPageSize: true });
}
await browser.close();
console.log(`brochures written to ${dir}`);
