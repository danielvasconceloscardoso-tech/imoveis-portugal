// Static mocks of three visual directions (prompt 02, Part A.1).
// Copy comes from site/src/i18n.ts and site/src/config.ts, so the mocks show real text.
// Run from site/:  npx tsx ../design/directions/build.ts [lu|fr|ch|br]
// Output: design/directions/<a|b|c>/<home|partners>.html
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "../../site/src/config";
import { EDITIONS, ED_ORDER, t, sideFacts, type EdCode } from "../../site/src/i18n";

const here = dirname(fileURLToPath(import.meta.url));
const ed = (process.argv[2] || "lu") as EdCode;
const E = EDITIONS[ed];
const T = t(ed);
const P = T.partners;
const facts = sideFacts(ed);
const used = config.foundingSlotsTotal - config.foundingSlotsLeft;
const pending = T.formPending(config.contactEmail);

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(\d) (?=\d{3}\b)/g, "$1\u00a0").replace(/ €/g, "\u00a0€"); // keep numbers and € together
const edLabel = { lu: "Edição Luxemburgo", fr: "Édition France", ch: "Edição Suíça", br: "Edição Brasil" }[ed];
const firstIssue = { lu: "Primeiro número a 1 de dezembro de 2026", fr: "Premier numéro le 1er décembre 2026", ch: "Primeiro número a 1 de dezembro de 2026", br: "Primeira edição em 1º de dezembro de 2026" }[ed];
const photoBy = E.dict === "fr" ? "Photo" : "Fotografia";

type Photo = { file: string; place: string };
const PH: Record<string, Photo> = {
  alfama: { file: "lisboa-alfama-sao-vicente.jpg", place: "Alfama, Lisboa" },
  porto: { file: "porto-douro-entardecer.jpg", place: "Rio Douro, Porto" },
  castelo: { file: "lisboa-anoitecer-castelo.jpg", place: "Baixa e Castelo de São Jorge, Lisboa" },
  telhados: { file: "lisboa-alfama-telhados.jpg", place: "Telhados de Alfama, Lisboa" },
  comercio: { file: "lisboa-praca-do-comercio.jpg", place: "Praça do Comércio, Lisboa" },
  ribeira: { file: "porto-ribeira-rabelo.jpg", place: "Ribeira, Porto" },
  ponte: { file: "porto-ponte-luis-i-noite.jpg", place: "Ponte Luís I, Porto" },
  baixa: { file: "lisboa-baixa-telhados.jpg", place: "Baixa, Lisboa" },
  tram: { file: "lisboa-eletrico-28.jpg", place: "Elétrico 28, Lisboa" },
};
const credit = (p: Photo) => `${p.place}. ${photoBy}: Unsplash`;
const src = (p: Photo) => `../photos/${p.file}`;

const navHref = { home: "home.html", partners: "partners.html" };
const edLinks = (cls = "") => ED_ORDER.map((c) => `<a href="#" ${c === ed ? 'aria-current="true"' : ""} lang="${EDITIONS[c].lang}" title="${EDITIONS[c].name}" class="${cls}">${c.toUpperCase()}</a>`).join("");

const fontFace = (family: string, file: string, weight: string, style = "normal", extra = "") =>
  `@font-face{font-family:"${family}";src:url(../fonts/${file}) format("woff2");font-weight:${weight};font-style:${style};font-display:swap;${extra}}`;

const BASE_CSS = `
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{margin:0}
img{display:block;max-width:100%;height:auto}
a{color:inherit}
h1,h2,h3,p,ul,ol,figure{margin:0}
ul,ol{padding:0;list-style:none}
:focus-visible{outline:3px solid var(--focus);outline-offset:3px}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.skip{position:absolute;left:-9999px}.skip:focus{left:16px;top:16px;z-index:10;background:var(--focus);color:#fff;padding:8px 12px}
@media (prefers-reduced-motion: reduce){*{transition:none!important;animation:none!important;scroll-behavior:auto!important}}
`;

function page(dir: string, name: "home" | "partners", title: string, css: string, body: string, favicon: string) {
  const html = `<!doctype html>
<html lang="${E.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}</title>
<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(favicon)}">
<style>${BASE_CSS}${css}</style>
</head>
<body>
<a class="skip" href="#main">${E.dict === "fr" ? "Aller au contenu" : "Saltar para o conteúdo"}</a>
${body}
</body>
</html>`;
  mkdirSync(join(here, dir), { recursive: true });
  writeFileSync(join(here, dir, `${name}.html`), html);
  writeFileSync(join(here, dir, "favicon.svg"), favicon);
}

const slots = (filledCls: string) =>
  Array.from({ length: config.foundingSlotsTotal }, (_, i) => `<span class="${i < used ? filledCls : ""}"></span>`).join("");

/* ------------------------------------------------------------------ */
/* A. Folha: a financial broadsheet. White, black, one Atlantic blue. */
/* ------------------------------------------------------------------ */
function dirA() {
  const css = `
${fontFace("Schibsted Grotesk", "schibsted-grotesk-latin-400-normal.woff2", "400")}
${fontFace("Schibsted Grotesk", "schibsted-grotesk-latin-500-normal.woff2", "500")}
${fontFace("Schibsted Grotesk", "schibsted-grotesk-latin-700-normal.woff2", "700")}
${fontFace("Schibsted Grotesk", "schibsted-grotesk-latin-800-normal.woff2", "800")}
${fontFace("Source Serif 4", "source-serif-4-latin-400-normal.woff2", "400")}
${fontFace("Source Serif 4", "source-serif-4-latin-600-normal.woff2", "600")}
${fontFace("Source Serif 4", "source-serif-4-latin-400-italic.woff2", "400", "italic")}
:root{--paper:#fff;--ink:#111418;--muted:#545b64;--rule:#d3d6da;--blue:#0a3a66;--focus:#0a3a66;
  --sans:"Schibsted Grotesk",system-ui,sans-serif;--serif:"Source Serif 4",Georgia,serif}
body{background:var(--paper);color:var(--ink);font:400 18px/1.55 var(--serif);font-variant-numeric:lining-nums}
.w{max-width:1232px;margin:0 auto;padding:0 32px}
a{text-decoration-thickness:1px;text-underline-offset:3px}
a:hover{color:var(--blue)}
.top{font:500 13px/1.35 var(--sans);border-bottom:1px solid var(--rule)}
.top .w{display:flex;justify-content:space-between;align-items:center;height:40px;gap:16px}
.top .eds{display:flex;gap:4px}
.top .eds a{text-decoration:none;padding:6px 8px;color:var(--muted)}
.top .eds a[aria-current]{color:var(--ink);box-shadow:inset 0 -2px 0 var(--ink)}
.mast{text-align:center;padding:28px 0 0}
.mark{font:800 58px/1 var(--sans);letter-spacing:-.035em;text-decoration:none;display:inline-block}
.mark span{font-weight:400}
.mast .tag{font:italic 400 16px/1.4 var(--serif);color:var(--muted);margin-top:10px}
.mast nav{margin-top:22px;border-top:1px solid var(--ink);border-bottom:3px double var(--ink);font:500 15px/1 var(--sans);display:flex;justify-content:center;gap:40px;padding:14px 0}
.mast nav a{text-decoration:none}
.mast nav a[aria-current]{box-shadow:inset 0 -2px 0 var(--blue);color:var(--blue)}
main{padding-bottom:64px}
.lead{display:grid;grid-template-columns:7fr 5fr;gap:48px;padding:48px 0 40px;border-bottom:1px solid var(--rule)}
h1{font:700 54px/1.06 var(--sans);letter-spacing:-.025em;max-width:16ch}
.lede{font-size:21px;line-height:1.5;margin-top:22px;max-width:36em}
.sign{margin-top:32px;border-top:3px solid var(--ink);padding-top:16px;max-width:520px}
.sign h2{font:700 20px/1.2 var(--sans)}
.pending{font:400 15px/1.5 var(--sans);color:var(--muted);margin-top:8px}
.pending a{color:var(--ink)}
figure img{width:100%;aspect-ratio:4/5;object-fit:cover}
figcaption{font:400 13px/1.4 var(--sans);color:var(--muted);margin-top:8px}
.data{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--ink)}
.data div{padding:24px 24px 24px 0;border-right:1px solid var(--rule)}
.data div+div{padding-left:24px}
.data div:last-child{border-right:0}
.data .n{display:block;font:700 40px/1 var(--sans);letter-spacing:-.02em}
.data p{font-size:15px;line-height:1.45;margin-top:10px}
.data a{font:400 12px/1.4 var(--sans);color:var(--muted);display:inline-block;margin-top:8px}
.sec-h{font:700 22px/1.2 var(--sans);letter-spacing:-.01em;padding-bottom:12px;border-bottom:1px solid var(--ink)}
.two{display:grid;grid-template-columns:7fr 5fr;gap:48px;padding-top:40px}
.rows li{padding:14px 0;border-bottom:1px solid var(--rule)}
.cta{padding:0 0 28px}
.cta+.cta{border-top:1px solid var(--rule);padding-top:24px}
.cta h2{font:700 22px/1.2 var(--sans)}
.cta p{margin-top:8px;font-size:17px}
.btn{display:inline-block;margin-top:16px;background:var(--blue);color:#fff;text-decoration:none;font:500 15px/1 var(--sans);padding:14px 20px}
.btn:hover{background:var(--ink);color:#fff}
.tlink{display:inline-block;margin-top:12px;font:500 15px/1.3 var(--sans)}
footer{border-top:3px double var(--ink);font:400 13px/1.5 var(--sans);color:var(--muted)}
footer .w{display:flex;justify-content:space-between;gap:24px;padding-top:20px;padding-bottom:40px;flex-wrap:wrap}
footer .fm{font:800 17px/1 var(--sans);letter-spacing:-.03em;color:var(--ink)}
/* partners */
.ph{display:grid;grid-template-columns:8fr 4fr;gap:48px;padding:48px 0 40px;border-bottom:1px solid var(--rule)}
.founding{border:1px solid var(--ink);padding:24px;align-self:start}
.founding h2{font:700 20px/1.2 var(--sans)}
.founding p{font-size:16px;margin-top:8px}
.slots{display:grid;grid-template-columns:repeat(10,1fr);gap:4px;margin-top:18px}
.slots span{height:28px;border:1px solid var(--ink)}
.slots .x{background:var(--ink)}
.slots-l{font:500 14px/1 var(--sans);margin-top:10px}
.txt{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;padding:40px 0;border-bottom:1px solid var(--rule)}
.txt h2{font:700 19px/1.25 var(--sans);margin-bottom:8px}
.txt p{font-size:17px}
.txt figure img{aspect-ratio:3/2}
.pk{width:100%;border-collapse:collapse;margin-top:0;font:400 16px/1.45 var(--serif)}
.pk th{font:500 13px/1.3 var(--sans);color:var(--muted);text-align:left;padding:14px 16px 10px 0;border-bottom:1px solid var(--ink)}
.pk td{padding:18px 16px 18px 0;border-bottom:1px solid var(--rule);vertical-align:top}
.pk td:first-child{font:700 18px/1.3 var(--sans);width:18%}
.pk .num{text-align:right;white-space:nowrap;font-family:var(--sans);font-variant-numeric:tabular-nums}
.pk .num strong{font-size:20px}
.pk th.num{text-align:right}
.small{font:400 13px/1.5 var(--sans);color:var(--muted);margin-top:10px}
.pkg{padding-top:40px}
.three{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;padding-top:40px}
.three li{padding:10px 0;border-bottom:1px solid var(--rule);font-size:17px}
@media (max-width:900px){
  .w{padding:0 16px}
  .top .w{height:auto;padding-top:8px;padding-bottom:8px;flex-wrap:wrap}
  .top .issue{flex-basis:100%}
  .mark{font-size:34px}
  .mast{padding-top:20px}
  .mast .tag{font-size:15px}
  .mast nav{gap:28px;margin-top:16px}
  .lead,.two,.ph,.txt,.three{grid-template-columns:1fr;gap:28px}
  .lead,.ph{padding-top:28px}
  h1{font-size:34px}
  .lede{font-size:18px}
  figure img{aspect-ratio:3/2}
  .data{grid-template-columns:1fr 1fr}
  .data div{padding:18px 12px 18px 0;border-right:0;border-bottom:1px solid var(--rule)}
  .data div+div{padding-left:0}
  .data div:nth-child(even){padding-left:12px;border-left:1px solid var(--rule)}
  .data .n{font-size:30px}
  .pk thead{display:none}
  .pk,.pk tbody,.pk tr,.pk td{display:block;width:auto}
  .pk tr{border-bottom:1px solid var(--ink);padding:16px 0}
  .pk td{border:0;padding:4px 0}
  .pk td:first-child{width:auto}
  .pk .num{text-align:left}
  .pk td.num::before{font:400 14px/1 var(--sans);color:var(--muted);font-variant-numeric:normal}
  .pk td.num:nth-child(3)::before{content:"${P.cols[2]}: "}
  .pk td.num:nth-child(4)::before{content:"${P.cols[3]}: "}
}`;
  const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#111418"/><text x="16" y="22.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="17" letter-spacing="-1" fill="#fff">IP</text></svg>`;
  const header = (cur: "home" | "partners") => `
<div class="top"><div class="w"><span class="issue">${edLabel}. ${firstIssue}</span><nav class="eds" aria-label="${T.editionsLabel}">${edLinks()}</nav></div></div>
<header class="mast"><div class="w">
  <a class="mark" href="${navHref.home}">Imóveis <span>Portugal</span></a>
  <p class="tag">${esc(E.hero)}</p>
  <nav aria-label="Menu">
    <a href="${navHref.home}" ${cur === "home" ? 'aria-current="page"' : ""}>${T.nav.home}</a>
    <a href="${navHref.partners}" ${cur === "partners" ? 'aria-current="page"' : ""}>${T.nav.partners}</a>
    <a href="#">${T.nav.buy}</a>
  </nav>
</div></header>`;
  const footer = `<footer><div class="w"><span class="fm">Imóveis Portugal</span><span>${T.footer.sponsored}</span><span><a href="#">${T.footer.privacy}</a> &nbsp; <a href="#">${T.footer.legal}</a></span></div></footer>`;
  const dataStrip = (fs: typeof facts) => `<section class="data" aria-label="${T.factsTitle}">${fs.slice(0, 4).map((f) => `<div><span class="n">${esc(f.big)}</span><p>${esc(f.text)}</p><a href="${f.url}">${esc(f.source)}</a></div>`).join("")}</section>`;

  page("a", "home", `Imóveis Portugal ${E.name}`, css, `${header("home")}
<main id="main"><div class="w">
  <div class="lead">
    <div>
      <h1>${esc(E.hero)}</h1>
      <p class="lede">${esc(T.lede)}</p>
      <section class="sign" aria-labelledby="s"><h2 id="s">${T.signupTitle}</h2><p class="pending">${esc(pending)}</p></section>
    </div>
    <figure><img src="${src(PH.alfama)}" alt="${PH.alfama.place}" width="1800" height="1350"><figcaption>${credit(PH.alfama)}</figcaption></figure>
  </div>
  ${dataStrip(facts)}
  <div class="two">
    <section aria-labelledby="wk"><h2 class="sec-h" id="wk">${T.weeklyTitle}</h2><ul class="rows">${T.weekly.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></section>
    <div>
      <section class="cta"><h2>${esc(T.buyCta.h)}</h2><p>${esc(T.buyCta.p)}</p><a class="btn" href="#">${T.buyCta.a}</a></section>
      <section class="cta"><h2>${esc(T.partnersCta.h)}</h2><p>${esc(T.partnersCta.p)}</p><a class="tlink" href="${navHref.partners}">${T.partnersCta.a}</a></section>
    </div>
  </div>
</div></main>${footer}`, fav);

  page("a", "partners", `${P.title} | Imóveis Portugal ${E.name}`, css, `${header("partners")}
<main id="main"><div class="w">
  <div class="ph">
    <div><h1>${esc(P.h1)}</h1><p class="lede">${esc(P.lede)}</p></div>
    <section class="founding" aria-labelledby="f"><h2 id="f">${P.foundingH}</h2><p>${esc(P.foundingP)}</p><div class="slots" aria-hidden="true">${slots("x")}</div><p class="slots-l">${P.slots}</p></section>
  </div>
  <div class="txt">
    <section><h2>${P.readersH}</h2><p>${esc(P.readersP)}</p></section>
    <section><h2>${P.whyNowH}</h2><p>${esc(P.whyNowP)}</p></section>
    <figure><img src="${src(PH.comercio)}" alt="${PH.comercio.place}" width="1800" height="1200" loading="lazy"><figcaption>${credit(PH.comercio)}</figcaption></figure>
  </div>
  <section class="pkg" aria-labelledby="pk"><h2 class="sec-h" id="pk">${P.tableH}</h2>
    <table class="pk"><thead><tr><th scope="col">${P.cols[0]}</th><th scope="col">${P.cols[1]}</th><th scope="col" class="num">${P.cols[2]}</th><th scope="col" class="num">${P.cols[3]}</th></tr></thead>
    <tbody>${P.rows.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td class="num"><strong>${r[2]}</strong></td><td class="num">${r[3]}</td></tr>`).join("")}</tbody></table>
    <p class="small">${P.vat}</p>
  </section>
  <div class="three">
    <section><h2 class="sec-h">${P.rulesH}</h2><ul>${P.rules.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></section>
    <section><h2 class="sec-h">${P.reportH}</h2><p style="margin-top:12px">${esc(P.reportP)}</p></section>
    <section class="cta" style="border:0;padding:0"><h2 class="sec-h">${P.ctaH}</h2><a class="btn" href="#">${P.book}</a><p class="pending" style="margin-top:14px">${esc(P.formIntro)} ${esc(pending)}</p></section>
  </div>
</div></main>${footer}`, fav);
}

/* --------------------------------------------------------------- */
/* B. Atlântico: photo-led property magazine. Deep navy, Jost.     */
/* --------------------------------------------------------------- */
function dirB() {
  const css = `
${fontFace("Jost", "jost-latin-300-normal.woff2", "300")}
${fontFace("Jost", "jost-latin-400-normal.woff2", "400")}
${fontFace("Jost", "jost-latin-500-normal.woff2", "500")}
:root{--bg:#0c1a23;--bg2:#13252f;--text:#f2efe9;--muted:#aeb8be;--line:rgba(242,239,233,.2);--sand:#dcc39b;--focus:#dcc39b;--f:"Jost",system-ui,sans-serif}
body{background:var(--bg);color:var(--text);font:400 17px/1.65 var(--f)}
.w{max-width:1320px;margin:0 auto;padding:0 40px}
a{text-underline-offset:4px;text-decoration-thickness:1px}
header{border-bottom:1px solid var(--line)}
header .w{display:flex;align-items:center;justify-content:space-between;height:76px;gap:24px}
.mark{font:500 23px/1 var(--f);letter-spacing:.01em;text-decoration:none;text-transform:lowercase}
.mark span{font-weight:300}
header nav{display:flex;align-items:center;gap:32px;font-size:15px}
header nav a{text-decoration:none;color:var(--muted)}
header nav a:hover,header nav a[aria-current]{color:var(--text)}
.eds{display:flex;gap:2px;border-left:1px solid var(--line);padding-left:24px}
.eds a{padding:6px 7px;font-size:13px;letter-spacing:.04em}
.eds a[aria-current]{color:var(--sand)!important}
.hero{position:relative}
.hero img{width:100%;height:min(86vh,820px);object-fit:cover}
.hero .panel{position:absolute;left:max(40px,calc((100vw - 1320px) / 2 + 40px));bottom:0;max-width:640px;background:var(--bg);padding:40px 48px 36px 0}
.hero .panel::before{content:"";position:absolute;top:0;bottom:0;right:100%;width:100vw;background:var(--bg)}
h1{font:300 58px/1.08 var(--f);letter-spacing:-.015em}
.lede{color:var(--muted);font-size:18px;margin-top:20px;max-width:34em}
.credit{position:absolute;right:0;bottom:0;background:var(--bg);color:var(--muted);font-size:12px;padding:6px 12px}
.intro{display:grid;grid-template-columns:5fr 7fr;gap:80px;padding:72px 0}
.intro h2,.sec h2{font:300 34px/1.2 var(--f);letter-spacing:-.01em}
.pending{color:var(--muted);font-size:15px;margin-top:12px}
.pending a{color:var(--text)}
.field{margin-top:24px;border-bottom:1px solid var(--text);padding:12px 0;color:var(--muted);font-size:15px}
.wk li{padding:16px 0;border-top:1px solid var(--line)}
.wk li:last-child{border-bottom:1px solid var(--line)}
.facts{background:var(--bg2);padding:56px 0}
.facts .w{display:grid;grid-template-columns:repeat(4,1fr);gap:40px}
.facts .n{display:block;font:300 46px/1 var(--f);color:var(--sand);letter-spacing:-.01em;font-variant-numeric:tabular-nums}
.facts p{font-size:15px;margin-top:14px;line-height:1.55}
.facts a{display:inline-block;margin-top:10px;font-size:12px;color:var(--muted)}
.pair{display:grid;grid-template-columns:7fr 5fr;gap:24px;padding:96px 0 0;align-items:start}
.pair img{width:100%;object-fit:cover}
.pair figure:first-child img{aspect-ratio:4/3}
.pair figure:last-child img{aspect-ratio:4/5}
.pair figure:last-child{margin-top:120px}
figcaption{font-size:12px;color:var(--muted);margin-top:10px}
.ctas{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:96px;border-top:1px solid var(--line)}
.ctas section{padding:56px 56px 64px 0}
.ctas section+section{padding-left:56px;border-left:1px solid var(--line)}
.ctas h2{font:300 30px/1.2 var(--f)}
.ctas p{color:var(--muted);margin-top:14px;max-width:30em}
.btn{display:inline-block;margin-top:28px;background:var(--text);color:var(--bg);text-decoration:none;font:500 15px/1 var(--f);padding:16px 24px;letter-spacing:.02em}
.btn:hover{background:var(--sand)}
.tlink{display:inline-block;margin-top:28px;font-weight:500}
footer{border-top:1px solid var(--line);color:var(--muted);font-size:13px}
footer .w{display:flex;gap:32px;justify-content:space-between;padding-top:28px;padding-bottom:48px;flex-wrap:wrap}
footer .mark{font-size:17px;color:var(--text)}
/* partners */
.phero{position:relative}
.phero img{width:100%;height:min(62vh,560px);object-fit:cover}
.phero .panel{position:absolute;left:max(40px,calc((100vw - 1320px) / 2 + 40px));bottom:0;max-width:760px;background:var(--bg);padding:40px 56px 32px 0}
.phero .panel::before{content:"";position:absolute;top:0;bottom:0;right:100%;width:100vw;background:var(--bg)}
.phero h1{font-size:50px}
.plede{display:grid;grid-template-columns:7fr 5fr;gap:80px;padding:56px 0 72px;border-bottom:1px solid var(--line)}
.plede p{font-size:20px;line-height:1.6}
.found h2{font:400 15px/1.3 var(--f);color:var(--sand);letter-spacing:.02em}
.found .big{font:300 30px/1.3 var(--f);margin-top:10px}
.bars{display:grid;grid-template-columns:repeat(10,1fr);gap:6px;margin-top:24px}
.bars span{height:6px;background:var(--line)}
.bars .x{background:var(--sand)}
.bars-l{font-size:14px;color:var(--muted);margin-top:10px}
.sec{padding:72px 0;border-bottom:1px solid var(--line)}
.cols2{display:grid;grid-template-columns:1fr 1fr;gap:80px}
.cols2 p{color:var(--muted);margin-top:16px;font-size:18px}
.pk{width:100%;border-collapse:collapse;margin-top:32px}
.pk th{font:400 13px/1.3 var(--f);color:var(--muted);text-align:left;padding:0 24px 14px 0;border-bottom:1px solid var(--line);letter-spacing:.02em}
.pk td{padding:26px 24px 26px 0;border-bottom:1px solid var(--line);vertical-align:top;color:var(--muted);font-size:16px}
.pk td:first-child{font:300 28px/1.1 var(--f);color:var(--text);width:22%}
.pk .num{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.pk th.num{text-align:right}
.pk td.num strong{font:400 24px/1.1 var(--f);color:var(--sand)}
.small{font-size:13px;color:var(--muted);margin-top:14px}
.rules li{padding:14px 0;border-top:1px solid var(--line)}
@media (max-width:900px){
  .w{padding:0 16px}
  header .w{height:auto;flex-wrap:wrap;padding-top:16px;padding-bottom:12px;gap:12px}
  header nav{gap:18px;flex-wrap:wrap}
  .eds{padding-left:14px}
  .hero img{height:56vh}
  .hero .panel,.phero .panel{position:relative;left:0;max-width:none;padding:28px 16px 8px;margin-top:-64px;margin-right:32px}
  .hero .panel::before,.phero .panel::before{display:none}
  h1,.phero h1{font-size:36px}
  .credit{position:static;display:block;text-align:right;padding:6px 16px}
  .intro,.pair,.ctas,.plede,.cols2{grid-template-columns:1fr;gap:32px}
  .intro{padding:48px 0}
  .facts .w{grid-template-columns:1fr 1fr;gap:28px}
  .facts .n{font-size:32px}
  .pair{padding-top:56px}
  .pair figure:last-child img{aspect-ratio:4/3}
  .pair figure:last-child{margin-top:0}
  .ctas{margin-top:56px}
  .ctas section,.ctas section+section{padding:40px 0;border-left:0}
  .ctas section+section{border-top:1px solid var(--line)}
  .phero img{height:40vh}
  .plede p{font-size:18px}
  .sec{padding:48px 0}
  .pk thead{display:none}
  .pk,.pk tbody,.pk tr,.pk td{display:block;width:auto}
  .pk tr{border-bottom:1px solid var(--line);padding:20px 0}
  .pk td{border:0;padding:4px 0}
  .pk td:first-child{width:auto}
  .pk .num{text-align:left}
  .pk td.num:nth-child(4)::before{content:"${P.cols[3]}: "}
}`;
  const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#0c1a23"/><text x="16" y="21.5" text-anchor="middle" font-family="Futura,'Century Gothic',sans-serif" font-weight="400" font-size="17" fill="#f2efe9">ip</text></svg>`;
  const header = (cur: "home" | "partners") => `<header><div class="w">
  <a class="mark" href="${navHref.home}">imóveis <span>portugal</span></a>
  <nav aria-label="Menu">
    <a href="${navHref.partners}" ${cur === "partners" ? 'aria-current="page"' : ""}>${T.nav.partners}</a>
    <a href="#">${T.nav.buy}</a>
    <span class="eds" role="group" aria-label="${T.editionsLabel}">${edLinks()}</span>
  </nav></div></header>`;
  const footer = `<footer><div class="w"><span class="mark">imóveis <span>portugal</span></span><span>${T.footer.sponsored}</span><span><a href="#">${T.footer.privacy}</a> &nbsp; <a href="#">${T.footer.legal}</a></span></div></footer>`;

  page("b", "home", `Imóveis Portugal ${E.name}`, css, `${header("home")}
<main id="main">
  <div class="hero"><img src="${src(PH.porto)}" alt="${PH.porto.place}" width="1800" height="1013">
    <div class="panel"><h1>${esc(E.hero)}</h1><p class="lede">${esc(T.lede)}</p></div>
    <span class="credit">${credit(PH.porto)}</span></div>
  <div class="w">
    <div class="intro">
      <section aria-labelledby="s"><h2 id="s">${T.signupTitle}</h2><p class="pending">${esc(pending)}</p></section>
      <section aria-labelledby="wk"><h2 id="wk" class="sr-only">${T.weeklyTitle}</h2><ul class="wk">${T.weekly.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></section>
    </div>
  </div>
  <section class="facts" aria-label="${T.factsTitle}"><div class="w">${facts.slice(0, 4).map((f) => `<div><span class="n">${esc(f.big)}</span><p>${esc(f.text)}</p><a href="${f.url}">${esc(f.source)}</a></div>`).join("")}</div></section>
  <div class="w">
    <div class="pair">
      <figure><img src="${src(PH.tram)}" alt="${PH.tram.place}" width="1800" height="1197" loading="lazy"><figcaption>${credit(PH.tram)}</figcaption></figure>
      <figure><img src="${src(PH.telhados)}" alt="${PH.telhados.place}" width="1800" height="2250" loading="lazy"><figcaption>${credit(PH.telhados)}</figcaption></figure>
    </div>
    <div class="ctas">
      <section><h2>${esc(T.buyCta.h)}</h2><p>${esc(T.buyCta.p)}</p><a class="btn" href="#">${T.buyCta.a}</a></section>
      <section><h2>${esc(T.partnersCta.h)}</h2><p>${esc(T.partnersCta.p)}</p><a class="tlink" href="${navHref.partners}">${T.partnersCta.a}</a></section>
    </div>
  </div>
</main>${footer}`, fav);

  page("b", "partners", `${P.title} | Imóveis Portugal ${E.name}`, css, `${header("partners")}
<main id="main">
  <div class="phero"><img src="${src(PH.ribeira)}" alt="${PH.ribeira.place}" width="1800" height="1200">
    <div class="panel"><h1>${esc(P.h1)}</h1></div><span class="credit">${credit(PH.ribeira)}</span></div>
  <div class="w">
    <div class="plede"><p>${esc(P.lede)}</p>
      <section class="found" aria-labelledby="f"><h2 id="f">${P.foundingH}</h2><p class="big">${esc(P.foundingP)}</p><div class="bars" aria-hidden="true">${slots("x")}</div><p class="bars-l">${P.slots}</p></section></div>
    <div class="sec cols2">
      <section><h2>${P.readersH}</h2><p>${esc(P.readersP)}</p></section>
      <section><h2>${P.whyNowH}</h2><p>${esc(P.whyNowP)}</p></section>
    </div>
    <section class="sec" aria-labelledby="pk"><h2 id="pk">${P.tableH}</h2>
      <table class="pk"><thead><tr><th scope="col">${P.cols[0]}</th><th scope="col">${P.cols[1]}</th><th scope="col" class="num">${P.cols[2]}</th><th scope="col" class="num">${P.cols[3]}</th></tr></thead>
      <tbody>${P.rows.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td class="num"><strong>${r[2]}</strong></td><td class="num">${r[3]}</td></tr>`).join("")}</tbody></table>
      <p class="small">${P.vat}</p></section>
    <div class="sec cols2">
      <section><h2>${P.rulesH}</h2><ul class="rules" style="margin-top:20px">${P.rules.map((r) => `<li>${esc(r)}</li>`).join("")}</ul></section>
      <section><h2>${P.reportH}</h2><p>${esc(P.reportP)}</p></section>
    </div>
    <div class="ctas" style="margin-top:0;border-top:0">
      <section><h2>${P.ctaH}</h2><a class="btn" href="#">${P.book}</a></section>
      <section><p style="margin-top:0">${esc(P.formIntro)}</p><p class="pending">${esc(pending)}</p></section>
    </div>
  </div>
</main>${footer}`, fav);
}

/* ------------------------------------------------------------------------ */
/* C. Betão: Portuguese modernism. White, concrete, black-and-white photos, */
/* one colour block per edition. Archivo at several widths.                 */
/* ------------------------------------------------------------------------ */
const ED_COLOR: Record<EdCode, string> = { lu: "#2c6aa0", fr: "#24408e", ch: "#ad2a2f", br: "#1d6b45" };
function dirC() {
  const css = `
@font-face{font-family:"Archivo";src:url(../fonts/archivo-latin-wdth-normal.woff2) format("woff2");font-weight:100 900;font-stretch:62% 125%;font-display:swap}
:root{--white:#fff;--concrete:#e6e6e3;--ink:#121212;--muted:#4b4b48;--line:#c9c9c5;--ed:${ED_COLOR[ed]};--focus:${ED_COLOR[ed]};--f:"Archivo",system-ui,sans-serif}
body{background:var(--white);color:var(--ink);font:400 17px/1.6 var(--f);font-stretch:100%}
.w{max-width:1360px;margin:0 auto;padding:0 40px}
.g{display:grid;grid-template-columns:repeat(12,1fr);column-gap:24px}
a{text-underline-offset:3px;text-decoration-thickness:1px}
.wide{font-stretch:125%}
header .w{display:flex;justify-content:space-between;align-items:flex-start;padding-top:28px;padding-bottom:28px;gap:24px}
.mark{display:flex;gap:12px;align-items:flex-start;text-decoration:none}
.mark i{width:22px;height:22px;background:var(--ed);flex:none;margin-top:3px}
.mark b{font:800 21px/.98 var(--f);font-stretch:125%;letter-spacing:-.01em;display:block}
header nav{display:flex;gap:28px;font-size:15px;align-items:center;padding-top:2px}
header nav a{text-decoration:none}
header nav a[aria-current="page"]{box-shadow:inset 0 -2px 0 var(--ink)}
.eds{display:flex;gap:0;border:1px solid var(--ink)}
.eds a{padding:5px 9px;font-size:13px;font-stretch:115%;font-weight:600}
.eds a[aria-current]{background:var(--ink);color:#fff}
.bw{filter:grayscale(1) contrast(1.08)}
.hero{padding-top:40px}
.hero .txt{grid-column:1 / span 5;padding-top:24px;padding-right:16px}
h1{font:650 56px/1.04 var(--f);font-stretch:112%;letter-spacing:-.025em}
.lede{font-size:19px;color:var(--muted);margin-top:24px}
.hero .pic{grid-column:6 / span 7;position:relative;margin-right:-40px}
.hero .pic img{width:100%;height:640px;object-fit:cover}
.edblock{position:absolute;left:-1px;bottom:-1px;background:var(--ed);color:#fff;padding:22px 28px;max-width:340px}
.edblock b{display:block;font:700 22px/1.1 var(--f);font-stretch:125%}
.edblock span{display:block;font-size:14px;margin-top:6px}
.cap{font-size:12px;color:var(--muted);margin-top:8px;text-align:right}
.sign{margin-top:40px;padding-top:20px;border-top:2px solid var(--ink)}
.sign h2{font:700 20px/1.2 var(--f);font-stretch:112%}
.pending{font-size:15px;color:var(--muted);margin-top:8px}
.pending a{color:var(--ink)}
.facts{background:var(--concrete);margin-top:96px;padding:64px 0}
.facts .cell{grid-column:span 3}
.facts .n{display:block;font:300 52px/1 var(--f);font-stretch:125%;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.facts p{font-size:15px;margin-top:16px;color:var(--ink)}
.facts a{font-size:12px;color:var(--muted);display:inline-block;margin-top:8px}
.row{padding:72px 0;border-bottom:1px solid var(--line)}
.row > h2{grid-column:1 / span 4;font:700 26px/1.15 var(--f);font-stretch:118%;letter-spacing:-.01em;padding-right:24px}
.row > .body{grid-column:5 / span 8}
.list li{padding:16px 0;border-top:1px solid var(--line);font-size:18px}
.list li:last-child{border-bottom:1px solid var(--line)}
.ctas{display:grid;grid-template-columns:7fr 5fr;margin:72px 0 96px}
.ctas section{padding:56px 48px 64px}
.ctas .dark{background:var(--ink);color:#fff}
.ctas .grey{background:var(--concrete)}
.ctas h2{font:700 30px/1.12 var(--f);font-stretch:118%;letter-spacing:-.015em;max-width:18ch}
.ctas p{margin-top:16px;max-width:32em}
.ctas .dark p{color:#d6d6d3}
.btn{display:inline-block;margin-top:28px;background:#fff;color:var(--ink);text-decoration:none;font:600 15px/1 var(--f);font-stretch:112%;padding:16px 22px}
.btn.ink{background:var(--ink);color:#fff}
.btn:hover{background:var(--ed);color:#fff}
.tlink{display:inline-block;margin-top:24px;font-weight:600}
.pics{margin-top:72px}
.pics figure:first-child{grid-column:1 / span 4;align-self:end}
.pics figure:last-child{grid-column:6 / span 7}
.pics img{width:100%;object-fit:cover}
.pics figure:first-child img{aspect-ratio:3/4}
.pics figure:last-child img{aspect-ratio:3/2}
figcaption{font-size:12px;color:var(--muted);margin-top:8px}
footer{margin-top:0;border-top:2px solid var(--ink);font-size:13px;color:var(--muted)}
footer .w{display:flex;justify-content:space-between;gap:24px;padding-top:24px;padding-bottom:48px;flex-wrap:wrap}
footer b{font:800 15px/1 var(--f);font-stretch:125%;color:var(--ink)}
/* partners */
.phead{padding-top:48px;padding-bottom:72px;border-bottom:1px solid var(--line)}
.phead h1{grid-column:1 / span 9;font-size:60px}
.phead .lede{grid-column:1 / span 7}
.found{background:var(--ed);color:#fff;padding:56px 0}
.found h2{grid-column:1 / span 4;font:700 26px/1.15 var(--f);font-stretch:125%}
.found .body{grid-column:5 / span 8}
.found p{font-size:22px;line-height:1.45}
.sq{display:grid;grid-template-columns:repeat(10,1fr);gap:8px;margin-top:28px;max-width:560px}
.sq span{aspect-ratio:1;border:2px solid #fff}
.sq .x{background:#fff}
.sq-l{margin-top:12px;font-size:15px}
.duo{display:grid;grid-template-columns:1fr 1fr;gap:48px}
.duo h3{font:700 19px/1.2 var(--f);font-stretch:112%}
.duo p{margin-top:10px;color:var(--muted)}
.pk{width:100%;border-collapse:collapse}
.pk th{font:600 13px/1.3 var(--f);text-align:left;padding:0 16px 12px 0;border-bottom:2px solid var(--ink)}
.pk td{padding:22px 16px 22px 0;border-bottom:1px solid var(--line);vertical-align:top;font-size:16px;color:var(--muted)}
.pk td:first-child{font:700 20px/1.2 var(--f);font-stretch:118%;color:var(--ink);width:20%}
.pk .num{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}
.pk th.num{text-align:right}
.pk td.num strong{font:700 22px/1.1 var(--f);font-stretch:118%;color:var(--ink)}
.small{font-size:13px;color:var(--muted);margin-top:12px}
@media (max-width:900px){
  .w{padding:0 16px}
  .g{grid-template-columns:1fr;column-gap:0}
  .g > *{grid-column:1 / -1!important}
  header .w{flex-direction:column;gap:18px;padding-top:20px;padding-bottom:16px}
  header nav{gap:18px;flex-wrap:wrap}
  .hero{padding-top:8px}
  h1{font-size:36px}
  .hero .pic{margin:28px -16px 0}
  .hero .pic img{height:420px}
  .edblock{position:static;padding:16px 18px;max-width:none}
  .cap{text-align:left;padding:0 16px}
  .facts{margin-top:56px;padding:40px 0}
  .facts .g{grid-template-columns:1fr 1fr;row-gap:32px;column-gap:16px}
  .facts .cell{grid-column:span 1!important}
  .facts .n{font-size:30px}
  .row{padding:48px 0}
  .row > h2{margin-bottom:20px}
  .ctas{grid-template-columns:1fr;margin-top:48px}
  .ctas section{padding:40px 16px}
  .pics{margin-top:48px;row-gap:24px}
  .phead h1{font-size:38px}
  .found{padding:40px 0}
  .found h2{margin-bottom:16px}
  .found p{font-size:19px}
  .duo{grid-template-columns:1fr;gap:28px}
  .pk thead{display:none}
  .pk,.pk tbody,.pk tr,.pk td{display:block;width:auto}
  .pk tr{border-bottom:1px solid var(--line);padding:18px 0}
  .pk td{border:0;padding:4px 0}
  .pk td:first-child{width:auto}
  .pk .num{text-align:left}
  .pk td.num:nth-child(4)::before{content:"${P.cols[3]}: "}
}`;
  const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#121212"/><rect x="5" y="5" width="9" height="9" fill="${ED_COLOR[ed]}"/><text x="5" y="27" font-family="Arial,Helvetica,sans-serif" font-weight="800" font-size="13" fill="#fff">IP</text></svg>`;
  const header = (cur: "home" | "partners") => `<header><div class="w">
  <a class="mark" href="${navHref.home}"><i aria-hidden="true"></i><b>Imóveis<br>Portugal</b></a>
  <nav aria-label="Menu">
    <a href="${navHref.partners}" ${cur === "partners" ? 'aria-current="page"' : ""}>${T.nav.partners}</a>
    <a href="#">${T.nav.buy}</a>
    <span class="eds" role="group" aria-label="${T.editionsLabel}">${edLinks()}</span>
  </nav></div></header>`;
  const footer = `<footer><div class="w"><b>Imóveis Portugal</b><span>${T.footer.sponsored}</span><span><a href="#">${T.footer.privacy}</a> &nbsp; <a href="#">${T.footer.legal}</a></span></div></footer>`;

  page("c", "home", `Imóveis Portugal ${E.name}`, css, `${header("home")}
<main id="main">
  <div class="w hero g">
    <div class="txt">
      <h1>${esc(E.hero)}</h1>
      <p class="lede">${esc(T.lede)}</p>
      <section class="sign" aria-labelledby="s"><h2 id="s">${T.signupTitle}</h2><p class="pending">${esc(pending)}</p></section>
    </div>
    <figure class="pic"><img class="bw" src="${src(PH.comercio)}" alt="${PH.comercio.place}" width="1800" height="1200">
      <div class="edblock"><b>${E.name}</b><span>${firstIssue}</span></div>
      <figcaption class="cap">${credit(PH.comercio)}</figcaption></figure>
  </div>
  <section class="facts" aria-label="${T.factsTitle}"><div class="w g">${facts.slice(0, 4).map((f) => `<div class="cell"><span class="n">${esc(f.big)}</span><p>${esc(f.text)}</p><a href="${f.url}">${esc(f.source)}</a></div>`).join("")}</div></section>
  <div class="w">
    <section class="row g" aria-labelledby="wk"><h2 id="wk">${T.weeklyTitle}</h2><div class="body"><ul class="list">${T.weekly.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></div></section>
    <div class="pics g">
      <figure><img class="bw" src="${src(PH.tram)}" alt="${PH.tram.place}" width="1800" height="1197" loading="lazy" style="object-position:62% 50%"><figcaption>${credit(PH.tram)}</figcaption></figure>
      <figure><img class="bw" src="${src(PH.ribeira)}" alt="${PH.ribeira.place}" width="1800" height="1200" loading="lazy"><figcaption>${credit(PH.ribeira)}</figcaption></figure>
    </div>
    <div class="ctas">
      <section class="dark"><h2>${esc(T.buyCta.h)}</h2><p>${esc(T.buyCta.p)}</p><a class="btn" href="#">${T.buyCta.a}</a></section>
      <section class="grey"><h2>${esc(T.partnersCta.h)}</h2><p>${esc(T.partnersCta.p)}</p><a class="tlink" href="${navHref.partners}">${T.partnersCta.a}</a></section>
    </div>
  </div>
</main>${footer}`, fav);

  page("c", "partners", `${P.title} | Imóveis Portugal ${E.name}`, css, `${header("partners")}
<main id="main">
  <div class="w phead g"><h1>${esc(P.h1)}</h1><p class="lede">${esc(P.lede)}</p></div>
  <section class="found" aria-labelledby="f"><div class="w g"><h2 id="f">${P.foundingH}</h2><div class="body"><p>${esc(P.foundingP)}</p><div class="sq" aria-hidden="true">${slots("x")}</div><p class="sq-l">${P.slots}</p></div></div></section>
  <div class="w">
    <section class="row g"><h2>${P.readersH}</h2><div class="body duo">
      <div><p style="margin-top:0;color:var(--ink);font-size:19px">${esc(P.readersP)}</p></div>
      <div><h3>${P.whyNowH}</h3><p>${esc(P.whyNowP)}</p></div></div></section>
    <section class="row g" aria-labelledby="pk"><h2 id="pk">${P.tableH}</h2><div class="body">
      <table class="pk"><thead><tr><th scope="col">${P.cols[0]}</th><th scope="col">${P.cols[1]}</th><th scope="col" class="num">${P.cols[2]}</th><th scope="col" class="num">${P.cols[3]}</th></tr></thead>
      <tbody>${P.rows.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td class="num"><strong>${r[2]}</strong></td><td class="num">${r[3]}</td></tr>`).join("")}</tbody></table>
      <p class="small">${P.vat}</p></div></section>
    <section class="row g"><h2>${P.rulesH}</h2><div class="body duo">
      <ul class="list">${P.rules.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
      <div><h3>${P.reportH}</h3><p>${esc(P.reportP)}</p></div></div></section>
    <div class="ctas" style="margin-bottom:0">
      <section class="dark"><h2>${P.ctaH}</h2><a class="btn" href="#">${P.book}</a></section>
      <section class="grey"><p style="margin-top:0">${esc(P.formIntro)}</p><p class="pending">${esc(pending)}</p></section>
    </div>
    <div class="pics g" style="margin:72px 0 72px">
      <figure><img class="bw" src="${src(PH.telhados)}" alt="${PH.telhados.place}" width="1800" height="2250" loading="lazy"><figcaption>${credit(PH.telhados)}</figcaption></figure>
      <figure><img class="bw" src="${src(PH.ponte)}" alt="${PH.ponte.place}" width="1800" height="1209" loading="lazy"><figcaption>${credit(PH.ponte)}</figcaption></figure>
    </div>
  </div>
</main>${footer}`, fav);
}

dirA();
dirB();
dirC();
console.log(`mocks written for edition ${ed}`);
