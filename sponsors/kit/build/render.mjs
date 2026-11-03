// Renders the two sales-kit PDFs (prompt 62 §3b) in the site's look: ivory page, Playfair Display headings,
// Manrope text, green #2f5d50 used sparingly. Text mirrors sponsors/kit/SHALU.md and PATROCINADORES_banca_digital.md.
// Usage: node sponsors/kit/build/render.mjs [path to a site/package.json that has playwright and the fonts]
// Writes sponsors/kit/pdf/*.pdf (the inlined HTML goes to $KIT_HTML_DIR or the system temp folder); fails if any page overflows.
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const kit = resolve(here, "..");
const repo = resolve(kit, "../..");
const pkg = process.argv[2] || "/home/user/design-v2/site/package.json";
const req = createRequire(pkg);
const fontDir = join(dirname(pkg), "node_modules/@fontsource-variable");
const b64 = (p) => readFileSync(p).toString("base64");
const font = (f) => `data:font/woff2;base64,${b64(join(fontDir, f))}`;
const img = (n) => `data:image/webp;base64,${b64(join(repo, "site/public/img/v2", n))}`;

const CSS = `
@font-face{font-family:P;src:url(${font("playfair-display/files/playfair-display-latin-wght-normal.woff2")});font-weight:400 900}
@font-face{font-family:P;font-style:italic;src:url(${font("playfair-display/files/playfair-display-latin-wght-italic.woff2")});font-weight:400 900}
@font-face{font-family:M;src:url(${font("manrope/files/manrope-latin-wght-normal.woff2")});font-weight:200 800}
@page{size:A4;margin:0}
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;background:#fbfaf7;font:400 9.4pt/1.6 M,sans-serif;color:#24262a}
.page{width:210mm;height:297mm;position:relative;overflow:hidden;background:#fbfaf7;page-break-after:always;padding:0 20mm}
.page:last-child{page-break-after:auto}
.bar{display:flex;justify-content:space-between;align-items:baseline;padding:11mm 0 0;font-size:6.6pt;letter-spacing:.3em;text-transform:uppercase;color:#6b6e72;font-weight:600}
.bar b{font:400 10.5pt/1 P,serif;letter-spacing:0;text-transform:none;color:#111214}
.hero{margin:8mm -20mm 0;height:112mm;background-size:cover;background-position:center}
.cap{font-size:6.8pt;color:#8a8c8f;margin-top:2.2mm;text-align:right}
.eyebrow{font-size:6.8pt;letter-spacing:.28em;text-transform:uppercase;color:#2f5d50;font-weight:700;margin:9mm 0 3mm}
h1{font:400 30pt/1.08 P,serif;color:#111214;margin:0 0 4mm;letter-spacing:-.005em}
.lead{font:italic 400 13pt/1.45 P,serif;color:#3a3d42;margin:0 0 2mm;max-width:150mm}
h2{font:400 15pt/1.2 P,serif;color:#111214;margin:0 0 2.5mm}
.sec{margin-top:8mm}
.sec p{margin:0 0 2.4mm;max-width:160mm}
.muted{color:#6b6e72}
.small{font-size:7.6pt}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:10mm}
.card{background:#fff;border:.5pt solid #e4e0d6;border-radius:2.5mm;padding:6mm 7mm;box-shadow:0 1.2mm 4mm rgba(30,30,20,.06)}
.card .t{display:flex;align-items:center;gap:3mm;margin-bottom:1mm}
.pin{width:3.2mm;height:3.2mm;border-radius:50%;background:#2f5d50;box-shadow:0 0 0 1.4mm rgba(47,93,80,.15);flex:none}
.card .n{font:400 15pt/1.15 P,serif;color:#111214}
.card .s{font-size:7.8pt;color:#6b6e72;margin:0 0 4mm 6.2mm}
dl{display:grid;grid-template-columns:26mm 1fr;margin:0;row-gap:0}
dt,dd{margin:0;padding:1.5mm 0;border-top:.5pt solid #eeebe3;font-size:8.4pt;line-height:1.5}
dt{color:#6b6e72}
dd{color:#24262a}
sup{font-size:5.6pt;color:#2f5d50;font-weight:700;margin-left:.4mm}
.letter{background:#f3f1ea;border-radius:2.5mm;padding:6mm 8mm}
.letter .lab{font-size:6.6pt;letter-spacing:.2em;text-transform:uppercase;color:#2f5d50;font-weight:700;margin-bottom:3mm}
.letter h3{font:400 15pt/1.25 P,serif;color:#111214;margin:0 0 3mm}
.letter p{margin:0 0 2.4mm;font-size:9pt}
.foot{position:absolute;left:20mm;right:20mm;bottom:11mm}
.contact{display:flex;justify-content:space-between;align-items:baseline;border-top:.5pt solid #2f5d50;padding-top:3mm;font-size:7.8pt;color:#3a3d42}
.contact b{font:400 10.5pt/1 P,serif;color:#111214}
.src{font-size:6.4pt;line-height:1.5;color:#7a7c80;margin:0 0 4mm;padding-left:4mm}
.src li{margin-bottom:.8mm;word-break:break-all}
.src li span{word-break:normal}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:5mm 10mm}
.item h4{font:650 8.6pt/1.3 M,sans-serif;color:#111214;margin:0 0 1mm;letter-spacing:.01em}
.item p{margin:0;font-size:8.8pt}
table{border-collapse:collapse;width:100%;font-size:8.4pt}
th,td{text-align:left;vertical-align:top;padding:2.4mm 3mm 2.4mm 0;border-top:.5pt solid #e4e0d6}
th{font-size:6.6pt;letter-spacing:.18em;text-transform:uppercase;color:#6b6e72;font-weight:700;border-top:none}
td:first-child{font:400 10.5pt/1.3 P,serif;color:#111214;width:44mm}
td:last-child{width:32mm;color:#2f5d50;font-weight:600}
ol.plain{margin:0;padding-left:5mm}ol.plain li{margin-bottom:1.6mm}
`;

const doc = (title, pages) => `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><title>${title}</title><style>${CSS}</style></head><body>${pages.join("")}</body></html>`;
const bar = (right) => `<div class="bar"><b>Imóveis Portugal</b><span>${right}</span></div>`;
const contact = (extra = "") => `<div class="contact"><b>Imóveis Portugal</b><span>${extra}parcerias@imoveisportugal.lu · imoveisportugal.pt</span></div>`;

// ---------- Shalu ----------
const shaluSrc = [
  `Essential Business, <span>"Shalu invests €100 million in luxury Porto project", 3 de outubro de 2025 (fonte indicada: Vida Imobiliária).</span> https://www.essential-business.pt/2025/10/03/shalu-invests-e100-million-in-luxury-porto-project/ · <span>verificado a 2 nov 2026.</span>`,
  `Imovirtual, <span>anúncio "Apartamento T1 com Terraço e Jardim no O'rizon Living" (descrição, localização e preço de 360 000 €).</span> https://www.imovirtual.com/pt/anuncio/apartamento-t1-com-terraco-e-jardim-no-orizon-living-ID1iRrR · <span>verificado a 2 nov 2026.</span>`,
  `<span>Imovirtual, doze anúncios do O'rizon Living, T1 a T4, de 360 000 € a 1 350 000 € (preços pedidos, tal como publicados) · verificados a 26 out 2026.</span>`,
  `<span>INE, Estatísticas de preços da habitação ao nível local, indicador 0012234, 2.º trimestre de 2026, publicado a 23 out 2026.</span> https://www.ine.pt/xurl/indx/0012234 · <span>verificado a 25 out 2026.</span>`,
  `<span>Câmara Municipal de Gondomar, "Gondomar assinala 10 anos da Rota da Filigrana e celebra património cultural imaterial", 17 out 2026.</span> https://www.cm-gondomar.pt/gondomar-assinala-10-anos-da-rota-da-filigrana-e-celebra-patrimonio-cultural-imaterial/ · <span>verificado a 2 nov 2026.</span>`,
];
const s = (n) => `<sup>${n}</sup>`;
const shalu = doc("O'rizon Living, no nosso mapa", [
  `<section class="page">
    ${bar("Para a Shalu Investments")}
    <div class="hero" style="height:84mm;background-image:url(${img("porto-douro-entardecer-1600.webp")});background-position:50% 50%"></div>
    <div class="cap">O Douro e a ponte Luís I, no Porto. O O'rizon Living fica rio acima, junto à Marina do Freixo.</div>
    <h1 style="margin-top:9mm">O'rizon Living, no nosso mapa</h1>
    <p class="lead">Fizemos isto sobre o vosso projeto, gostávamos que vissem.</p>
    <div class="sec cols" style="grid-template-columns:48mm 1fr;gap:8mm;margin-top:7mm">
      <div>
        <h2>No mapa</h2>
        <p>Um ponto em Valbom, Gondomar, na margem do Douro, e este cartão.</p>
        <p class="muted small" style="margin-top:5mm">Também preparámos uma página privada com o projeto, em inglês:<br><span style="color:#2f5d50;font-weight:600">imoveisportugal.pt/d/f658bd1eef/</span></p>
      </div>
      <div class="card">
        <div class="t"><span class="pin"></span><span class="n">O'rizon Living</span></div>
        <div class="s">Shalu Investments · Valbom, Gondomar</div>
        <dl>
          <dt>Empreendimento</dt><dd>Condomínio privado na margem do Douro${s(1)}</dd>
          <dt>Promotor</dt><dd>Shalu Investments, em Portugal há uma década${s(1)}</dd>
          <dt>Arquitetura</dt><dd>gabinete de arquitetura PMA${s("1 2")}</dd>
          <dt>Terreno</dt><dd>35 000 m², cinco edifícios, cerca de 200 apartamentos${s(1)}</dd>
          <dt>Casas</dt><dd>T1 a T4, a partir de 360 000 € (preço pedido publicado)${s("2 3")}</dd>
          <dt>No condomínio</dt><dd>Piscina exterior virada para o Douro, piscina interior aquecida com spa, ginásio, sala para coworking, parque infantil${s(2)}</dd>
          <dt>Onde</dt><dd>Junto à Marina do Freixo; aeroporto Francisco Sá Carneiro a 18 km${s(2)}</dd>
          <dt>Gondomar</dt><dd>Mediana de 2 348 € por m² nas casas vendidas nos 12 meses até ao 2.º trimestre de 2026, mais 23,4% num ano${s(4)}</dd>
        </dl>
      </div>
    </div>
  </section>`,
  `<section class="page">
    ${bar("O'rizon Living")}
    <div class="sec cols" style="grid-template-columns:1fr 72mm;margin-top:12mm">
      <div>
        <h2>No Concierge</h2>
        <p class="muted small" style="margin-bottom:3mm">Exemplo ilustrativo</p>
        <p>Um casal em Telavive procura uma casa junto ao rio, perto do Porto, para daqui a um ano. O Concierge mostra-lhe o O'rizon Living e a equipa para essa compra. O casal pede uma visita por vídeo a um T3 com varanda.</p>
        <p>O pedido segue, com o consentimento do casal, para o consultor qualificado da agência parceira licenciada, Habinedita Gondomar (AMI 13250), que fala com a vossa equipa comercial. Leva o resumo ao lado, que o casal leu e aprovou antes de enviar.</p>
      </div>
      <div class="card" style="padding:5mm 6mm">
        <div class="t"><span class="pin"></span><span class="n" style="font-size:12pt">Pedido de visita</span></div>
        <div class="s" style="margin-bottom:3mm">Como chega ao consultor</div>
        <dl style="grid-template-columns:24mm 1fr">
          <dt>Projeto</dt><dd>O'rizon Living, T3 com varanda</dd>
          <dt>A partir de</dt><dd>Israel</dd>
          <dt>Pagamento</dt><dd>Fundos próprios</dd>
          <dt>Prazo</dt><dd>12 meses</dd>
          <dt>Visita</dt><dd>Por vídeo</dd>
          <dt>Consentimento</dt><dd>Para este destinatário, com data e hora</dd>
        </dl>
      </div>
    </div>
    <div class="sec">
      <h2>Na carta</h2>
      <p class="muted small" style="margin-bottom:3.5mm">Exemplo. Numa carta enviada, leva a menção "Conteúdo patrocinado por Shalu Investments".</p>
      <div class="letter">
        <div class="lab">A carta · terça-feira</div>
        <h3>Gondomar abriu uma estação náutica no Douro</h3>
        <p>Em outubro, Gondomar inaugurou a Estação Náutica e festejou os dez anos da Rota da Filigrana. A filigrana está no Inventário Nacional do Património Cultural Imaterial, e Gondomar tem um Museu Municipal da Filigrana. O concelho tem cerca de 37 quilómetros de margem do rio.${s(5)}</p>
        <p>Num desses quilómetros, junto à Marina do Freixo, a Shalu Investments está a construir o O'rizon Living: cerca de 200 apartamentos em cinco edifícios, num terreno de 35 000 m², com projeto do gabinete PMA.${s(1)} Do T1 ao T4, com uma piscina exterior virada para o Douro.${s(2)}</p>
        <p style="margin:0"><b style="font-weight:650">Para ver:</b> as cinco oficinas da Rota da Filigrana.${s(5)}</p>
      </div>
    </div>
    <div class="sec">
      <h2>Se quiserem continuar</h2>
      <p>Mostramos como o O'rizon Living fica no site a partir de 1 de dezembro de 2026. As condições cabem numa página.</p>
    </div>
    <div class="foot">
      <ol class="src">${shaluSrc.map((x) => `<li>${x}</li>`).join("")}</ol>
      <p class="src" style="padding:0;margin-top:-2mm">Fotografia: Unsplash photo-1513735492246-483525079686, Unsplash License.</p>
      ${contact()}
    </div>
  </section>`,
]);

// ---------- Banca digital ----------
const bankSrc = [
  `<span>Lei Geral Tributária, art. 19.º, n.os 6, 8 e 15, Portal das Finanças.</span> https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/lgt/Pages/lgt19.aspx · <span>verificado a 24 out 2026.</span>`,
  `<span>Banco de Portugal, notificação ao ESRB das medidas macroprudenciais sobre mutuários, 2 jul 2026 (90% habitação própria permanente; 80% outros fins).</span> https://www.esrb.europa.eu/pub/pdf/other/Esrb.notification260702_Othermacroprudentialmeasures_PT~155a9efa59.en.pdf · <span>verificado a 24 out 2026.</span>`,
];
const bank = doc("Banca digital e corretoras", [
  `<section class="page">
    ${bar("Banca digital e corretoras")}
    <div class="hero" style="height:122mm;background-image:url(${img("lisboa-tejo-cais-1600.webp")});background-position:50% 60%"></div>
    <div class="cap">O Tejo no Cais das Colunas, Lisboa.</div>
    <div class="eyebrow">Um convite</div>
    <h1>Para a banca digital e as corretoras</h1>
    <p class="lead">Para estar com quem prepara uma casa em Portugal, no momento em que trata do dinheiro.</p>
    <div class="sec cols" style="margin-top:8mm">
      <div>
        <h2>O que somos</h2>
        <p>Um site e uma carta, a partir de 1 de dezembro de 2026, em português, inglês e francês. O mapa mostra o que cada região tem de bom e termina nas casas à venda. O Passo a passo explica a compra com as regras oficiais e as fontes. O Concierge apresenta a equipa certa para cada compra.</p>
      </div>
      <div>
        <h2>Quem nos lê</h2>
        <p>Portugueses que vivem no Luxemburgo, em França e na Suíça, brasileiros, americanos e israelitas que preparam a compra de uma casa em Portugal.</p>
        <p>Antes da escritura há um NIF a pedir e dinheiro a mover entre dois países. Quem vive fora da União Europeia e do Espaço Económico Europeu nomeia um representante fiscal ou adere às notificações eletrónicas.${s(1)} Numa casa que não seja habitação própria permanente, o crédito vai até 80% do valor; o resto vem de fundos próprios.${s(2)}</p>
      </div>
    </div>
    <div class="foot">${contact()}</div>
  </section>`,
  `<section class="page">
    ${bar("Banca digital e corretoras")}
    <div class="sec" style="margin-top:12mm">
      <h2 style="margin-bottom:5mm">Como a vossa marca aparece</h2>
      <div class="grid2">
        <div class="item"><h4>No Passo a passo</h4><p>No passo da conta e do dinheiro, o vosso cartão, identificado como parceiro.</p></div>
        <div class="item"><h4>No Concierge</h4><p>Na equipa que o Concierge apresenta para cada compra. O leitor escolhe falar convosco e dá o consentimento para esse contacto, com o vosso nome escrito.</p></div>
        <div class="item"><h4>Na carta</h4><p>Presença identificada como patrocinada, na carta de terça e de sexta.</p></div>
        <div class="item"><h4>Nas redes sociais</h4><p>Instagram, Facebook e LinkedIn, com publicações identificadas como patrocinadas.</p></div>
      </div>
    </div>
    <div class="sec">
      <h2>O que recebem</h2>
      <ol class="plain">
        <li>Um relatório mensal com números agregados, em grupos de dez pessoas ou mais.</li>
        <li>Os pedidos que os leitores decidiram enviar-vos, com o resumo que leram antes de enviar.</li>
        <li>Cada texto e cada imagem passam pela vossa aprovação escrita antes de serem publicados.</li>
      </ol>
    </div>
    <div class="sec">
      <h2>Os níveis</h2>
      <table>
        <tr><th>Nível</th><th>O que inclui</th><th>Valor</th></tr>
        <tr><td>Parceiro oficial da categoria</td><td>Um por categoria (a confirmar). Todos os canais: mapa, Concierge, Passo a passo, carta e redes sociais. O título "Parceiro oficial de banca digital".</td><td>Valor a confirmar</td></tr>
        <tr><td>Parceiro</td><td>Destaque no mapa e no Concierge, um quarto das presenças na carta.</td><td>Valor a confirmar</td></tr>
        <tr><td>Em destaque</td><td>Mapa e Concierge.</td><td>Valor a confirmar</td></tr>
      </table>
    </div>
    <div class="sec">
      <h2>As condições</h2>
      <ol class="plain">
        <li>Acordo de 12 ou de 6 meses, pago no início.</li>
        <li>Condição de fundador: os dez primeiros parceiros têm −40% no primeiro ano e mantêm o mesmo preço no segundo, com pagamento adiantado de 12 ou 6 meses.</li>
        <li>Valor fixo. Sem valor por conta aberta, por pedido ou por cliente.</li>
        <li>As regras, os números oficiais e as fontes que publicamos não mudam por causa de um patrocínio.</li>
      </ol>
      <p class="muted small" style="margin-top:2mm">Aos valores acresce IVA.</p>
    </div>
    <div class="foot">
      <ol class="src">${bankSrc.map((x) => `<li>${x}</li>`).join("")}</ol>
      <p class="src" style="padding:0;margin-top:-2mm">Fotografia: Pixabay 3844136, Louise36, Pixabay Content License.</p>
      ${contact()}
    </div>
  </section>`,
]);

const { chromium } = req("playwright");
mkdirSync(join(kit, "pdf"), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
let bad = 0;
for (const [name, html] of [["Shalu_OrizonLiving", shalu], ["Patrocinio_banca_digital", bank]]) {
  const hp = join(process.env.KIT_HTML_DIR || tmpdir(), `${name}.html`);  // generated, fonts and photos inlined; not kept in the repo
  writeFileSync(hp, html);
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const over = await page.evaluate(() => [...document.querySelectorAll(".page")].map((p, i) => {
    const r = p.getBoundingClientRect(); const foot = p.querySelector(".foot");
    let maxBottom = 0;
    for (const el of p.querySelectorAll(":scope > *:not(.foot)")) maxBottom = Math.max(maxBottom, el.getBoundingClientRect().bottom - r.top);
    const limit = foot ? foot.getBoundingClientRect().top - r.top - 8 : r.height - 30;
    return maxBottom > limit ? `page ${i + 1}: content ends at ${Math.round(maxBottom)}px, limit ${Math.round(limit)}px` : null;
  }).filter(Boolean));
  if (over.length) { bad++; console.error(name, "OVERFLOW", over.join("; ")); }
  const out = join(kit, "pdf", `${name}.pdf`);
  await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
  console.log("wrote", out);
}
await browser.close();
process.exit(bad ? 1 : 0);
