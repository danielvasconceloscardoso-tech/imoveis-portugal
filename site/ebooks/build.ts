// Free report "What it really costs to buy in Portugal", redesign v2 (prompt 09; Knight Frank's Wealth Report
// as the model): one per edition (countries.ts) in pt, en and fr, PAGES pages each.
// Every number is quoted from content/facts/facts.csv or computed from it (IMT brackets below).
// Run from site/:  npm run ebooks
//   → public/ebooks/imoveis-portugal-guia-custos-{ed}-{lang}.pdf, public/ebooks/covers/{ed}-{lang}.webp,
//     and a PNG of every page in ebooks/out/ for review.
import { readFileSync, writeFileSync, mkdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { FACTS, DISCLAIMER } from "../src/lib/content";
import { config } from "../src/config";
import type { Lang } from "../src/i18n";
import { PHOTO } from "../src/lib/ui";
import { COUNTRIES, EDS, type Ed } from "./countries";
import { PAGES } from "./pages";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright"); // pre-installed in the build environment
const site = process.cwd();
const outHtml = join(site, "ebooks", "out");
const outPdf = join(site, "public", "ebooks");
const outCover = join(outPdf, "covers");
for (const d of [outHtml, outPdf, outCover]) mkdirSync(d, { recursive: true });

// ---------- IMT 2026 (CIMT art. 17.º; facts pt-imt-hpp-2026, pt-imt-second-home-2026) ----------
type Bracket = [upper: number, marginal: number, avgAtUpper: number | null];
const HPP: Bracket[] = [[106346, 0, 0], [145470, 0.02, 0.005379], [198347, 0.05, 0.017274], [330539, 0.07, 0.038361], [660982, 0.08, null]];
const SEC: Bracket[] = [[106346, 0.01, 0.01], [145470, 0.02, 0.012689], [198347, 0.05, 0.022636], [330539, 0.07, 0.041578], [633931, 0.08, null]];
// Guard: the brackets above must match the text of the facts base.
for (const [id, tab] of [["pt-imt-hpp-2026", HPP], ["pt-imt-second-home-2026", SEC]] as const) {
  const v = FACTS[id].value.replace(/\s/g, "");
  for (const [u, , a] of tab) {
    if (!v.includes(String(u))) throw new Error(`${id}: bracket ${u} not in facts.csv`);
    if (a !== null && !v.includes(`${(a * 100).toFixed(4).replace(/\.?0+$/, "") || "0"}%`)) throw new Error(`${id}: average ${a} not in facts.csv`);
  }
}
// CIMT art. 17.º n.º 3: the part up to the previous bracket limit at that bracket's average rate, the rest at the marginal rate.
const imt = (v: number, tab: Bracket[]) => {
  for (let i = 0; i < tab.length; i++) if (v <= tab[i][0]) return i === 0 ? v * tab[0][1] : tab[i - 1][0] * (tab[i - 1][2] as number) + (v - tab[i - 1][0]) * tab[i][1];
  throw new Error("value above table");
};
const NONRES = 0.075, IS_BUY = 0.008, IS_LOAN = 0.006, LTV_OTHER = 0.8; // pt-imt-nonresident-flat, pt-is-purchase, pt-is-loan-5y, pt-ltv-limits
for (const [id, s] of [["pt-imt-nonresident-flat", "7.5%"], ["pt-is-purchase", "0.8%"], ["pt-is-loan-5y", "0.6%"], ["pt-ltv-limits", "80%"]]) {
  if (!FACTS[id].value.includes(s)) throw new Error(`${id}: ${s} not in facts.csv`);
}

// ---------- formatting ----------
const num = (n: number, l: Lang) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, l === "en" ? "," : "\u00A0");
const eur = (n: number, l: Lang) => `${num(n, l)} €`;
const pct = (n: number, l: Lang, d = 1) => { const s = (n * 100).toFixed(d).replace(/\.0+$/, ""); return l === "en" ? `${s}%` : l === "fr" ? `${s.replace(".", ",")} %` : `${s.replace(".", ",")}%`; };
const pct4 = (n: number, l: Lang) => pct(n, l, 4).replace(/([.,]\d*?)0+(\D)/, "$1$2");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// ---------- worked numbers ----------
const examples = [250000, 400000].map((v) => ({ v, hpp: imt(v, HPP), sec: imt(v, SEC), non: v * NONRES, is: v * IS_BUY }));
const CASH = (() => { const price = 300000, loan = price * LTV_OTHER; return { price, loan, deposit: price - loan, imt: price * NONRES, isBuy: price * IS_BUY, isLoan: loan * IS_LOAN }; })();
const OWN = (() => { // same 300 000 € home, three profiles (pages: main home or other home)
  const price = 300000, mk = (ltv: number, tax: number) => { const loan = price * ltv; return [price - loan, tax, price * IS_BUY, loan * IS_LOAN]; };
  const cols = [mk(0.9, imt(price, HPP)), mk(LTV_OTHER, imt(price, SEC)), mk(LTV_OTHER, price * NONRES)];
  return cols.map((c) => [...c, c.reduce((a, b) => a + b, 0)]);
})();
const APPR = (() => { const price = 300000, appraisal = 280000, ltv = 0.9; return [price * ltv, appraisal * ltv, Math.min(price, appraisal) * ltv, price * ltv - Math.min(price, appraisal) * ltv]; })();
const cashTotal = CASH.deposit + CASH.imt + CASH.isBuy + CASH.isLoan;
if (Math.round(cashTotal) !== 86340) throw new Error(`cash example changed: ${cashTotal}`);
if (Math.round(OWN[2][4]) !== 86340) throw new Error(`non-resident column differs from the cash example: ${OWN[2][4]}`);
if (Math.round(APPR[3]) !== 18000) throw new Error(`appraisal example changed: ${APPR[3]}`);

// ---------- text ----------
const T = {
  pt: {
    title: "Quanto custa mesmo comprar casa em Portugal", sub: "Impostos, crédito e contas feitas para quem vive fora, com a fonte oficial de cada número.", edition: "Edição", year: "Relatório 2026", checked: "Factos verificados a 24 e 25 de outubro de 2026",
    contentsH: "Neste relatório", summaryH: "Em resumo",
    summary: [["7,5%", "de IMT para quem compra sem ser residente fiscal, desde maio de 2026, salvo exceções."], ["0,8%", "de imposto do selo sobre o preço, para todos os compradores."], ["80%", "do valor é o máximo de crédito para uma casa que não seja habitação própria e permanente."]],
    howH: "Como ler este relatório", how: "Cada número tem uma fonte oficial, listada no fim, com a data em que a verificámos. Descrevemos as regras; não damos aconselhamento. As páginas de parceiros estão identificadas como conteúdo patrocinado.",
    partnersH: "Parceiros deste relatório", partnersLabel: "Conteúdo patrocinado", sponsoredBy: "Conteúdo patrocinado por", partnersNote: "As opiniões e recomendações são da responsabilidade do parceiro.",
    agencyP: "A Habinedita Gondomar acompanha compradores que vivem fora de Portugal, com experiência com clientes do Luxemburgo, de França, da Suíça, do Brasil, dos Estados Unidos e de Israel. Trata da procura, das visitas e da negociação, e coordena com advogados e bancos para quem compra à distância.",
    slotsH: "Espaços para parceiros", slotsP: "Um parceiro por categoria: advogado, banco, consultor fiscal, transferências de dinheiro e promotor imobiliário. Sempre identificados como patrocinadores.",
    ch: ["Os impostos da compra", "Não residentes e imposto do selo", "Contas feitas", "O crédito", "Casa própria ou outra casa", "Crédito: da proposta à escritura", "Os passos e os impostos de todos os anos", "Lista de verificação e glossário", "Fontes"],
    hppP: "A lei do IMT chama «habitação própria e permanente» à casa destinada exclusivamente a ser a residência própria e permanente de quem a compra. No IRS, a prova é o domicílio fiscal. A diferença pesa em três pontos: a tabela de IMT, a parte do valor que o banco pode financiar e o dinheiro que precisa de ter.",
    hppExH: "A mesma casa de 300 000 €, três perfis", hppCols: ["", "Residente, habitação própria", "Residente, outra habitação", "Não residente"], hppRows: ["Entrada", "IMT", "Imposto do selo na compra (0,8%)", "Imposto do selo no crédito (0,6%)", "Dinheiro próprio necessário"],
    hppL: [["IMT", "a habitação própria e permanente tem a tabela mais baixa (0% até 106 346 €); outra habitação começa em 1%."], ["Crédito", "até 90% do valor para habitação própria e permanente e até 80% para as outras (Banco de Portugal)."], ["Prova", "no IRS, o domicílio fiscal prova que a casa é a residência permanente."]],
    hppEl: "E se vive no estrangeiro? Sem ser residente fiscal, não está nesta tabela: paga IMT à taxa única de 7,5%. Se se tornar residente fiscal em Portugal nos dois anos seguintes à compra, paga os 7,5% e pede a devolução da diferença em seis meses. Saber se a casa conta como habitação própria e permanente nesse caso é uma pergunta para um advogado ou consultor fiscal.", hppNote: "Valores arredondados ao euro, com as tabelas de 2026. Não incluem escritura, registo, honorários, avaliação nem câmbio.",
    cr2H: "O que o banco tem de lhe dar",
    cr2L: ["Proposta personalizada: o banco entrega a ficha de informação normalizada europeia (FINE), com a simulação feita a partir dos seus dados.", "Aprovação: recebe a FINE com as condições aprovadas e a minuta do contrato.", "Prazo: o banco fica vinculado à proposta pelo menos 30 dias, mas só a pode aceitar depois dos primeiros sete, o período de reflexão.", "Seguros: o banco pode exigir um seguro adequado ligado ao crédito, mas tem de aceitar o de outra seguradora se a proteção for equivalente.", "Outros produtos: o banco só pode exigir uma conta à ordem e esse seguro. Se oferecer um spread mais baixo em troca de outros produtos, a TAEG apresentada tem de refletir a redução e dizer que depende de os contratar."],
    apH: "A avaliação conta", apP: "O banco financia a percentagem do valor mais baixo entre o preço e a avaliação. Exemplo: casa de 300 000 € avaliada em 280 000 €, com crédito de 90%.", apRows: ["90% do preço (270 000 €)", "90% da avaliação (280 000 €)", "Crédito máximo", "A sair do seu bolso a mais"],
    deedH: "No dia da escritura", deedP: "No balcão Casa Pronta, a escritura e o registo fazem-se no mesmo sítio. Custa 375 € com um ato de registo e 700 € se houver crédito com hipoteca, mais 50 € por imóvel adicional. Leve:", deedL: ["os documentos de identificação civil e fiscal de vendedores e compradores;", "a ficha técnica do prédio, se existir;", "a menção à licença de utilização, ou à sua dispensa, na escritura (conforme a data de construção);", "o certificado energético."],
    imtP: "O IMT (imposto municipal sobre as transmissões onerosas de imóveis) paga-se no dia da liquidação ou nos 30 dias seguintes. Para residentes, as taxas de 2026 dependem do uso da casa. O valor divide-se em duas partes: até ao limite do escalão anterior aplica-se a taxa média desse escalão; ao excedente, a taxa marginal.",
    tHpp: "Habitação própria e permanente", tSec: "Outra habitação, por exemplo casa de férias", cols: ["Valor até", "Taxa marginal", "Taxa média no limite"], above: ["Até 660 982 €", "Até 633 931 €"], flat: "Acima destes valores: 6% (taxa única) até 1 150 853 € e 7,5% acima.",
    nrBig: "7,5%", nrP: "Desde maio de 2026 (Decreto-Lei 97/2026), quem compra casa sem ser residente fiscal em Portugal paga IMT à taxa única de 7,5%, sem isenções nem reduções. A taxa não se aplica quando o comprador:", nrL: ["tenha sido considerado residente para efeitos fiscais em Portugal;", "se torne residente fiscal em Portugal nos dois anos seguintes à compra;", "arrende a casa para habitação, no prazo de seis meses, com renda dentro dos limites do decreto, durante pelo menos 36 meses nos primeiros cinco anos."], nrNote: "Nos dois últimos casos paga primeiro os 7,5% e pede a devolução da diferença no prazo de seis meses. Como a primeira exceção se aplica a quem já foi residente e emigrou é uma pergunta para um advogado ou consultor fiscal.",
    isH: "Imposto do selo", isL: [["0,8%", "do valor, na compra"], ["0,6%", "do montante emprestado, com crédito de cinco anos ou mais"], ["4%", "sobre os juros cobrados pelo banco"]],
    exP: "Impostos na compra, arredondados ao euro, com as tabelas de 2026. Não incluem escritura, registo, honorários, câmbio nem custos do crédito.", exCols: ["", "Residente, habitação própria", "Residente, outra habitação", "Não residente"], exRows: ["IMT", "Imposto do selo (0,8%)", "Total"], exHouse: "Casa de", chartH: "Impostos na compra, por perfil", lineH: "Taxa efetiva de IMT conforme o preço", lineNote: "IMT dividido pelo preço, calculado com as tabelas de 2026.", profiles: ["Residente, habitação própria", "Residente, outra habitação", "Não residente"],
    crL: [["90%", "do valor, no máximo, para habitação própria e permanente; 80% para outros fins. Conta o valor mais baixo entre o preço e a avaliação."], ["45%", "do rendimento líquido é o limite para a soma das prestações de todos os créditos (cada banco pode exceder em até 10% do crédito que concede por ano)."], ["40 anos", "de prazo máximo para quem tem até 35 anos de idade; 35 anos a partir dessa idade."]], crNote: "Regras do Banco de Portugal aplicáveis desde 1 de agosto de 2026.",
    cashH: "Quanto dinheiro precisa de ter", cashP: "Exemplo: não residente compra uma casa de férias de 300 000 € com o crédito máximo de 80%.", cashRows: ["Entrada (20%)", "IMT (7,5%)", "Imposto do selo na compra (0,8%)", "Imposto do selo no crédito (0,6% de 240 000 €)", "Total a pagar com fundos próprios"], cashNote: "Não inclui escritura, registo, honorários, avaliação, câmbio nem o imposto do selo de 4% sobre os juros, que se paga ao longo do crédito.",
    stL: ["NIF: o número de contribuinte pede-se online, através de um representante legal, ou presencialmente. Não é obrigatório um representante fiscal para o pedir.", "Procuração: pode assinar num consulado de Portugal ou perante um notário do país onde vive; neste caso precisa da Apostila de Haia.", "Contrato-promessa (CPCV): fixa preço, data e sinal. Se o comprador falhar por culpa sua, perde o sinal; se for o vendedor, o comprador pode exigir o dobro (Código Civil, art. 442.º).", "Origem do dinheiro: bancos, notários e advogados têm de conhecer a origem dos fundos quando a operação o justifica (Lei 83/2017).", "IMT e imposto do selo: pagos antes da escritura, no prazo da liquidação.", "Depois da compra: quem vive fora da UE tem 15 dias para nomear um representante fiscal ou aderir às notificações eletrónicas das Finanças."],
    yrH: "Todos os anos", yrL: [["IMI", "entre 0,3% e 0,45% do valor patrimonial tributário, com a taxa fixada pela câmara."], ["AIMI", "só sobre a soma dos valores patrimoniais acima de 600 000 € por pessoa."], ["Rendas", "as rendas de habitação de não residentes pagam 25% em Portugal, com reduções para contratos longos."], ["Venda", "para o IRS, a mais-valia conta em 50% do seu valor."]],
    ckL: ["Pedi o NIF", "Sei se vou ser residente fiscal nos dois anos seguintes", "Pedi orçamento de escritura, registo e honorários", "Pedi ao banco uma simulação com a avaliação", "Recebi a FINE e deixei passar os sete dias de reflexão", "Sei se o banco aceita um seguro de outra seguradora", "Reuni comprovativos da origem do dinheiro", "Mandei rever o contrato-promessa", "Tenho procuração com Apostila ou marcação no consulado", "Pedi o certificado energético e a licença de utilização (ou a sua dispensa)", "Nomeei representante fiscal ou aderi às notificações eletrónicas (15 dias)"],
    glH: "Glossário", gl: [["IMT", "Imposto pago na compra de um imóvel."], ["IMI", "Imposto municipal anual sobre o imóvel."], ["AIMI", "Adicional ao IMI para patrimónios elevados."], ["NIF", "Número de identificação fiscal português."], ["CPCV", "Contrato-promessa de compra e venda."], ["Sinal", "Valor pago no contrato-promessa."], ["Escritura", "Ato que transmite a propriedade."], ["VPT", "Valor patrimonial tributário, a base do IMI."], ["HPP", "Habitação própria e permanente."], ["FINE", "Ficha de informação normalizada europeia: a proposta do banco."], ["TAEG", "Taxa anual de encargos efetiva global: o custo total do crédito, em % ao ano."]],
    srcP: "Fontes oficiais, com a data em que cada uma foi verificada.", backH: "Precisa de ajuda para o seu caso?", backP: "Pomos o seu pedido nas mãos de um advogado, banco, consultor fiscal ou serviço de transferências parceiro. Para comprar ou vender casa, a nossa agência parceira licenciada.", backA: "imoveisportugal · Falar com um parceiro",
  },
  en: {
    title: "What it really costs to buy in Portugal", sub: "Taxes, mortgages and worked examples for buyers who live abroad, with the official source for every number.", edition: "Edition", year: "2026 report", checked: "Facts checked on October 24 and 25, 2026",
    contentsH: "In this report", summaryH: "At a glance",
    summary: [["7.5%", "transfer tax (IMT) for buyers who aren't Portuguese tax residents, since May 2026, with some exceptions."], ["0.8%", "stamp duty on the price, for every buyer."], ["80%", "of the value is the most a bank can lend for a home that isn't your main residence."]],
    howH: "How to read this report", how: "Every number has an official source, listed at the end with the date we checked it. We describe the rules; we don't give advice. Partner pages are labeled as sponsored content.",
    partnersH: "Partners of this report", partnersLabel: "Sponsored content", sponsoredBy: "Sponsored by", partnersNote: "Views and recommendations are the partner's own.",
    agencyP: "Habinedita Gondomar works with buyers who live outside Portugal, with experience serving clients from Luxembourg, France, Switzerland, Brazil, the United States and Israel. The agency handles the search, viewings and negotiation, and works with lawyers and banks for buyers purchasing from abroad.",
    slotsH: "Partner spaces", slotsP: "One partner per category: lawyer, bank, tax advisor, money transfer and developer. Always labeled as sponsors.",
    ch: ["Purchase taxes", "Non-residents and stamp duty", "Worked examples", "Mortgages", "Main home or other home", "Mortgage: from offer to deed", "The steps and the yearly taxes", "Checklist and glossary", "Sources"],
    hppP: "The IMT code speaks of a «habitação própria e permanente» (HPP): a home bought exclusively to be the buyer's own permanent residence. For income tax, the proof is the tax domicile. The difference counts in three places: the IMT table, the share of the value a bank may lend, and the cash you need.",
    hppExH: "The same 300,000 € home, three profiles", hppCols: ["", "Resident, main home", "Resident, other home", "Non-resident"], hppRows: ["Down payment", "IMT", "Stamp duty on the purchase (0.8%)", "Stamp duty on the loan (0.6%)", "Own funds needed"],
    hppL: [["IMT", "an HPP gets the lowest table (0% up to 106,346 €); another home starts at 1%."], ["Mortgage", "up to 90% of the value for an HPP and up to 80% for others (Banco de Portugal)."], ["Proof", "for income tax, the tax domicile proves the home is the permanent residence."]],
    hppEl: "What if you live abroad? If you aren't a tax resident, you are not in this table: you pay IMT at the flat 7.5%. If you become a Portuguese tax resident within two years of the purchase, you pay the 7.5% and claim the difference back within six months. Whether the home counts as an HPP in that case is a question for a lawyer or tax advisor.", hppNote: "Rounded to the euro, using the 2026 tables. Excludes the deed, registration, legal fees, appraisal and currency exchange.",
    cr2H: "What the bank has to give you",
    cr2L: ["Personalized offer: the bank hands over the European Standardised Information Sheet (FINE), with the simulation based on your data.", "Approval: you receive the FINE with the approved terms and the draft contract.", "Time: the bank stays bound to its offer for at least 30 days, but you can only accept after the first seven, the reflection period.", "Insurance: the bank may require suitable insurance linked to the loan, but must accept another provider's policy if the cover is equivalent.", "Other products: the bank may require only a current account and that insurance. If it offers a lower spread in exchange for other products, the APRC (TAEG) shown must reflect the reduction and say it depends on taking them."],
    apH: "The appraisal counts", apP: "The bank lends its percentage of the lower of the price and the appraisal. Example: a 300,000 € home appraised at 280,000 €, with a 90% loan.", apRows: ["90% of the price (270,000 €)", "90% of the appraisal (280,000 €)", "Maximum loan", "Extra paid from your pocket"],
    deedH: "On deed day", deedP: "At a Casa Pronta office, the deed and the registration happen in one place. It costs 375 € with one registration act and 700 € with a mortgage, plus 50 € per extra property. Bring:", deedL: ["the civil and tax identification of the sellers and buyers;", "the building's technical file (ficha técnica), if one exists;", "the deed's reference to the usage licence, or to its waiver (depending on the construction date);", "the energy certificate."],
    imtP: "The property transfer tax (IMT) is due on the day it's assessed or within the following 30 days. For residents, the 2026 rates depend on how the home is used. The value is split in two: up to the previous bracket limit at that bracket's average rate, and the rest at the marginal rate.",
    tHpp: "Main home (owner-occupied)", tSec: "Other home, such as a vacation home", cols: ["Value up to", "Marginal rate", "Average rate at the limit"], above: ["Up to 660,982 €", "Up to 633,931 €"], flat: "Above these values: 6% (flat) up to 1,150,853 € and 7.5% above.",
    nrBig: "7.5%", nrP: "Since May 2026 (Decree-Law 97/2026), buyers who aren't Portuguese tax residents pay IMT at a flat 7.5% on homes, with no exemption or reduction. The rate doesn't apply when the buyer:", nrL: ["has been considered a Portuguese tax resident;", "becomes a Portuguese tax resident within two years of the purchase;", "rents the home out as a residence within six months, at a rent within the decree's caps, for at least 36 months in the first five years."], nrNote: "In the last two cases you pay 7.5% first and claim back the difference within six months. How the first exception applies to people who once lived in Portugal is a question for a lawyer or tax advisor.",
    isH: "Stamp duty", isL: [["0.8%", "of the value, at purchase"], ["0.6%", "of the amount borrowed, with a loan of five years or more"], ["4%", "on the interest charged by the bank"]],
    exP: "Purchase taxes, rounded to the euro, using the 2026 tables. Excludes the deed, registration, legal fees, currency exchange and mortgage costs.", exCols: ["", "Resident, main home", "Resident, other home", "Non-resident"], exRows: ["IMT", "Stamp duty (0.8%)", "Total"], exHouse: "Home at", chartH: "Purchase taxes by buyer profile", lineH: "Effective transfer tax rate by price", lineNote: "IMT divided by the price, using the 2026 tables.", profiles: ["Resident, main home", "Resident, other home", "Non-resident"],
    crL: [["90%", "of the value at most for your main home; 80% for other uses. The lower of the price and the appraisal counts."], ["45%", "of net income is the cap on the payments of all your loans together (each bank may exceed it for up to 10% of the credit it grants per year)."], ["40 years", "maximum term if you're 35 or younger; 35 years from that age."]], crNote: "Banco de Portugal rules applying since August 1, 2026.",
    cashH: "How much cash you need", cashP: "Example: a non-resident buys a 300,000 € vacation home with the maximum 80% loan.", cashRows: ["Down payment (20%)", "IMT (7.5%)", "Stamp duty on the purchase (0.8%)", "Stamp duty on the loan (0.6% of 240,000 €)", "Total paid from your own funds"], cashNote: "Excludes the deed, registration, legal fees, appraisal, currency exchange and the 4% stamp duty on interest, which is paid over the life of the loan.",
    stL: ["NIF: the Portuguese tax number can be requested online through a legal representative, or in person. No tax representative is needed to get it.", "Power of attorney: sign it at a Portuguese consulate or before a notary where you live; in that case it needs a Hague Apostille.", "Promissory contract (CPCV): it sets the price, date and deposit. If the buyer backs out through their own fault, they lose the deposit; if the seller does, the buyer can claim double (Civil Code, art. 442).", "Origin of funds: banks, notaries and lawyers must ask where the money comes from when the transaction calls for it (Law 83/2017).", "IMT and stamp duty: paid before closing, within the assessment deadline.", "After the purchase: if you live outside the EU, you have 15 days to appoint a tax representative or sign up for the tax authority's electronic notices."],
    yrH: "Every year", yrL: [["IMI", "0.3% to 0.45% of the property's tax value, at the rate set by the municipality."], ["AIMI", "only on total tax values above 600,000 € per person."], ["Rent", "residential rent earned by non-residents is taxed at 25% in Portugal, with reductions for long leases."], ["Sale", "for Portuguese income tax, 50% of the gain counts."]],
    ckL: ["I have a NIF", "I know whether I'll become a tax resident within two years", "I have quotes for the deed, registration and fees", "I asked the bank for a simulation with the appraisal", "I received the FINE and let the seven reflection days pass", "I know whether the bank accepts another provider's insurance", "I have proof of where the money comes from", "I had the promissory contract reviewed", "I have a power of attorney with an Apostille, or a consulate appointment", "I have the energy certificate and the usage licence (or its waiver)", "I appointed a tax representative or signed up for electronic notices (15 days)"],
    glH: "Glossary", gl: [["IMT", "Transfer tax paid when buying property."], ["IMI", "Yearly municipal property tax."], ["AIMI", "Additional IMI on high property values."], ["NIF", "Portuguese tax number."], ["CPCV", "Promissory purchase contract."], ["Sinal", "Deposit paid on the promissory contract."], ["Escritura", "The deed that transfers ownership (closing)."], ["VPT", "The property's tax value, the basis for IMI."], ["HPP", "Habitação própria e permanente: a main home."], ["FINE", "European Standardised Information Sheet: the bank's offer."], ["TAEG", "Annual percentage rate of charge (APRC): the total cost of the loan, per year."]],
    srcP: "Official sources, with the date we checked each one.", backH: "Need help with your own case?", backP: "We pass your request to a partner lawyer, bank, tax advisor or money transfer service. For buying or selling a home, our licensed partner agency.", backA: "imoveisportugal · Talk to a partner",
  },
  fr: {
    title: "Ce que coûte vraiment un achat au Portugal", sub: "Impôts, crédit et exemples chiffrés pour ceux qui vivent à l'étranger, avec la source officielle de chaque chiffre.", edition: "Édition", year: "Rapport 2026", checked: "Faits vérifiés les 24 et 25 octobre 2026",
    contentsH: "Dans ce rapport", summaryH: "L'essentiel",
    summary: [["7,5 %", "d'IMT pour les acheteurs non-résidents fiscaux, depuis mai 2026, sauf exceptions."], ["0,8 %", "de droit de timbre sur le prix, pour tous les acheteurs."], ["80 %", "de la valeur, c'est le crédit maximum pour un bien qui n'est pas la résidence principale."]],
    howH: "Comment lire ce rapport", how: "Chaque chiffre a une source officielle, listée à la fin avec sa date de vérification. Nous décrivons les règles ; nous ne donnons pas de conseil. Les pages partenaires sont signalées comme contenu sponsorisé.",
    partnersH: "Partenaires de ce rapport", partnersLabel: "Contenu sponsorisé", sponsoredBy: "Contenu sponsorisé par", partnersNote: "Les avis et recommandations relèvent de la responsabilité du partenaire.",
    agencyP: "Habinedita Gondomar accompagne les acheteurs qui vivent hors du Portugal, avec une expérience auprès de clients du Luxembourg, de France, de Suisse, du Brésil, des États-Unis et d'Israël. L'agence s'occupe de la recherche, des visites et de la négociation, et coordonne avec avocats et banques pour ceux qui achètent à distance.",
    slotsH: "Espaces partenaires", slotsP: "Un partenaire par catégorie : avocat, banque, conseiller fiscal, transfert d'argent et promoteur. Toujours signalés comme sponsors.",
    ch: ["Les impôts de l'achat", "Non-résidents et droit de timbre", "Exemples chiffrés", "Le crédit", "Résidence principale ou autre logement", "Le crédit, de l'offre à l'acte", "Les étapes et les impôts annuels", "Liste de contrôle et glossaire", "Sources"],
    hppP: "Le code de l'IMT parle d'une « habitação própria e permanente » (HPP) : un logement acheté exclusivement pour être la résidence propre et permanente de l'acheteur, ce que l'on appelle en France la résidence principale. Pour l'impôt sur le revenu, la preuve est le domicile fiscal. La différence joue à trois endroits : le barème de l'IMT, la part de la valeur que la banque peut financer et l'apport nécessaire.",
    hppExH: "Le même bien de 300 000 €, trois profils", hppCols: ["", "Résident, résidence principale", "Résident, autre logement", "Non-résident"], hppRows: ["Apport", "IMT", "Droit de timbre à l'achat (0,8 %)", "Droit de timbre sur le prêt (0,6 %)", "Fonds propres nécessaires"],
    hppL: [["IMT", "une HPP bénéficie du barème le plus bas (0 % jusqu'à 106 346 €) ; un autre logement commence à 1 %."], ["Crédit", "jusqu'à 90 % de la valeur pour une HPP et jusqu'à 80 % pour les autres (Banque du Portugal)."], ["Preuve", "pour l'impôt sur le revenu, le domicile fiscal prouve que le logement est la résidence permanente."]],
    hppEl: "Et si vous vivez à l'étranger ? Sans être résident fiscal, vous ne relevez pas de ce barème : vous payez l'IMT au taux unique de 7,5 %. Si vous devenez résident fiscal au Portugal dans les deux ans suivant l'achat, vous payez les 7,5 % puis demandez le remboursement de la différence dans les six mois. Savoir si le logement compte alors comme HPP est une question pour un avocat ou un conseiller fiscal.", hppNote: "Arrondis à l'euro, barèmes 2026. Hors acte, enregistrement, honoraires, expertise et change.",
    cr2H: "Ce que la banque doit vous remettre",
    cr2L: ["Offre personnalisée : la banque remet la fiche d'information normalisée européenne (FINE), avec la simulation établie à partir de vos données.", "Accord : vous recevez la FINE avec les conditions approuvées et le projet de contrat.", "Délai : la banque reste liée à son offre au moins 30 jours, mais vous ne pouvez l'accepter qu'après les sept premiers, le délai de réflexion.", "Assurance : la banque peut exiger une assurance adaptée liée au crédit, mais doit accepter celle d'un autre assureur si la garantie est équivalente.", "Autres produits : la banque ne peut exiger qu'un compte courant et cette assurance. Si elle propose un spread plus bas contre d'autres produits, le TAEG affiché doit refléter la baisse et préciser qu'elle dépend de leur souscription."],
    apH: "L'expertise compte", apP: "La banque finance son pourcentage de la valeur la plus basse entre le prix et l'expertise. Exemple : un bien de 300 000 € expertisé à 280 000 €, avec un crédit à 90 %.", apRows: ["90 % du prix (270 000 €)", "90 % de l'expertise (280 000 €)", "Crédit maximal", "À sortir en plus de votre poche"],
    deedH: "Le jour de l'acte", deedP: "Au guichet Casa Pronta, l'acte et l'enregistrement se font au même endroit. Compter 375 € pour un acte d'enregistrement et 700 € avec un crédit hypothécaire, plus 50 € par bien supplémentaire. Apportez :", deedL: ["les pièces d'identité civile et fiscale des vendeurs et des acheteurs ;", "la fiche technique de l'immeuble, s'il en existe une ;", "la mention de la licence d'utilisation, ou de sa dispense, dans l'acte (selon la date de construction) ;", "le certificat énergétique."],
    imtP: "L'IMT (impôt sur les transmissions onéreuses d'immeubles) se paie le jour de sa liquidation ou dans les 30 jours. Pour les résidents, les taux 2026 dépendent de l'usage du bien. La valeur se divise en deux : jusqu'à la limite de la tranche précédente, le taux moyen de cette tranche ; au-delà, le taux marginal.",
    tHpp: "Résidence principale", tSec: "Autre logement, par exemple résidence secondaire", cols: ["Valeur jusqu'à", "Taux marginal", "Taux moyen à la limite"], above: ["Jusqu'à 660 982 €", "Jusqu'à 633 931 €"], flat: "Au-delà : 6 % (taux unique) jusqu'à 1 150 853 € et 7,5 % au-dessus.",
    nrBig: "7,5 %", nrP: "Depuis mai 2026 (décret-loi 97/2026), un acheteur non-résident fiscal au Portugal paie l'IMT au taux unique de 7,5 % sur un logement, sans exonération ni réduction. Ce taux ne s'applique pas lorsque l'acheteur :", nrL: ["a été considéré comme résident fiscal au Portugal ;", "devient résident fiscal au Portugal dans les deux ans suivant l'achat ;", "loue le logement à usage d'habitation dans les six mois, avec un loyer plafonné par le décret, pendant au moins 36 mois sur les cinq premières années."], nrNote: "Dans les deux derniers cas, on paie d'abord 7,5 % puis on demande le remboursement de la différence dans les six mois. La façon dont la première exception s'applique aux anciens résidents partis à l'étranger est une question pour un avocat ou un conseiller fiscal.",
    isH: "Droit de timbre", isL: [["0,8 %", "de la valeur, à l'achat"], ["0,6 %", "du montant emprunté, pour un crédit de cinq ans ou plus"], ["4 %", "sur les intérêts facturés par la banque"]],
    exP: "Impôts à l'achat, arrondis à l'euro, barèmes 2026. Hors acte, enregistrement, honoraires, change et frais de crédit.", exCols: ["", "Résident, résidence principale", "Résident, autre logement", "Non-résident"], exRows: ["IMT", "Droit de timbre (0,8 %)", "Total"], exHouse: "Bien de", chartH: "Impôts à l'achat selon le profil", lineH: "Taux effectif d'IMT selon le prix", lineNote: "IMT divisé par le prix, barèmes 2026.", profiles: ["Résident, résidence principale", "Résident, autre logement", "Non-résident"],
    crL: [["90 %", "de la valeur au maximum pour une résidence principale ; 80 % pour les autres usages. La valeur la plus basse entre prix et expertise compte."], ["45 %", "des revenus nets, c'est le plafond de l'ensemble des mensualités (chaque banque peut le dépasser pour 10 % au plus de ses crédits annuels)."], ["40 ans", "de durée maximale jusqu'à 35 ans d'âge ; 35 ans au-delà."]], crNote: "Règles de la Banque du Portugal applicables depuis le 1er août 2026.",
    cashH: "L'apport nécessaire", cashP: "Exemple : un non-résident achète une résidence secondaire de 300 000 € avec le crédit maximum de 80 %.", cashRows: ["Apport (20 %)", "IMT (7,5 %)", "Droit de timbre à l'achat (0,8 %)", "Droit de timbre sur le prêt (0,6 % de 240 000 €)", "Total à payer sur fonds propres"], cashNote: "Hors acte, enregistrement, honoraires, expertise, change et droit de timbre de 4 % sur les intérêts, payé tout au long du crédit.",
    stL: ["NIF : le numéro fiscal se demande en ligne par un représentant légal, ou sur place. Un représentant fiscal n'est pas nécessaire pour l'obtenir.", "Procuration : signée dans un consulat du Portugal ou devant un notaire de votre pays ; dans ce cas, elle doit porter l'apostille de La Haye.", "Compromis (CPCV) : il fixe le prix, la date et les arrhes. Si l'acheteur se désiste par sa faute, il perd les arrhes ; si c'est le vendeur, l'acheteur peut exiger le double (Code civil, art. 442).", "Origine des fonds : banques, notaires et avocats doivent s'informer de l'origine des fonds quand l'opération le justifie (loi 83/2017).", "IMT et droit de timbre : payés avant l'acte, dans le délai de liquidation.", "Après l'achat : hors UE, 15 jours pour désigner un représentant fiscal ou adhérer aux notifications électroniques des Finances."],
    yrH: "Chaque année", yrL: [["IMI", "entre 0,3 % et 0,45 % de la valeur fiscale, au taux fixé par la commune."], ["AIMI", "seulement sur la somme des valeurs fiscales au-delà de 600 000 € par personne."], ["Loyers", "les loyers d'habitation des non-résidents sont imposés à 25 % au Portugal, avec des réductions pour les baux longs."], ["Revente", "pour l'impôt sur le revenu portugais, la plus-value compte pour 50 %."]],
    ckL: ["J'ai un NIF", "Je sais si je serai résident fiscal dans les deux ans", "J'ai des devis pour l'acte, l'enregistrement et les honoraires", "J'ai demandé à la banque une simulation avec l'expertise", "J'ai reçu la FINE et laissé passer les sept jours de réflexion", "Je sais si la banque accepte l'assurance d'un autre assureur", "J'ai les justificatifs de l'origine des fonds", "J'ai fait relire le compromis", "J'ai une procuration avec apostille ou un rendez-vous au consulat", "J'ai le certificat énergétique et la licence d'utilisation (ou sa dispense)", "J'ai désigné un représentant fiscal ou adhéré aux notifications (15 jours)"],
    glH: "Glossaire", gl: [["IMT", "Impôt payé à l'achat d'un bien."], ["IMI", "Impôt municipal annuel sur le bien."], ["AIMI", "Supplément d'IMI pour les patrimoines élevés."], ["NIF", "Numéro fiscal portugais."], ["CPCV", "Compromis de vente."], ["Sinal", "Arrhes versées au compromis."], ["Escritura", "Acte authentique qui transfère la propriété."], ["VPT", "Valeur fiscale du bien, base de l'IMI."], ["HPP", "Habitação própria e permanente : la résidence principale."], ["FINE", "Fiche d'information normalisée européenne : l'offre de la banque."], ["TAEG", "Taux annuel effectif global : le coût total du crédit, par an."]],
    srcP: "Sources officielles, avec la date de vérification de chacune.", backH: "Besoin d'aide pour votre cas ?", backP: "Nous transmettons votre demande à un avocat, une banque, un conseiller fiscal ou un service de transfert partenaire. Pour acheter ou vendre un bien, notre agence partenaire agréée.", backA: "imoveisportugal · Parler à un partenaire",
  },
} as const;

const USED = ["pt-imt-hpp-2026", "pt-imt-second-home-2026", "pt-imt-payment", "pt-imt-nonresident-flat", "pt-imt-nonresident-exceptions", "pt-is-purchase", "pt-is-loan-5y", "pt-is-interest", "pt-ltv-limits", "pt-dsti-45", "pt-maturity-limits", "pt-nif-nonresident", "pt-tax-rep", "pt-poa-apostille", "pt-sinal-442", "pt-aml-funds", "pt-imi-rates", "pt-aimi-deduction", "pt-rent-tax-nonresident", "pt-al-registration", "pt-cg-50pct", "pt-hpp-tax-domicile", "pt-mortgage-fine-30-7", "pt-mortgage-insurance", "pt-mortgage-tied-sales", "pt-casa-pronta-fees", "pt-casa-pronta-docs-all"];
for (const id of [...USED, ...EDS.flatMap((e) => COUNTRIES[e].items.flatMap((i) => i.facts))]) if (!FACTS[id]) throw new Error(`unknown fact ${id}`);

// ---------- assets and style (brief: design/v2/BRIEF.md) ----------
const b64 = (p: string) => readFileSync(join(site, p)).toString("base64");
const serif = b64("node_modules/@fontsource-variable/newsreader/files/newsreader-latin-opsz-normal.woff2");
const sans4 = b64("node_modules/@fontsource/public-sans/files/public-sans-latin-400-normal.woff2");
const sans6 = b64("node_modules/@fontsource/public-sans/files/public-sans-latin-600-normal.woff2");
const C = { ink: "#15181d", muted: "#5c6066", rule: "#e2ddd4", paper: "#f6f3ee", accent: "#1e3a5f", gold: "#8a6623", s1: "#9db4cf", s2: "#4f74a0", s3: "#1e3a5f" };
const css = `
@font-face{font-family:S;src:url(data:font/woff2;base64,${serif}) format("woff2");font-weight:200 800}
@font-face{font-family:P;src:url(data:font/woff2;base64,${sans4}) format("woff2");font-weight:400}
@font-face{font-family:P;src:url(data:font/woff2;base64,${sans6}) format("woff2");font-weight:600}
@page{size:A4;margin:0}
*{box-sizing:border-box}body{margin:0;font:400 10pt/1.55 P,sans-serif;color:${C.ink}}
.pg{width:210mm;height:297mm;padding:24mm 20mm 22mm;position:relative;page-break-after:always;overflow:hidden;background:#fff}
.pg:last-child{page-break-after:auto}
.paper{background:${C.paper}}
h1{font:400 34pt/1.04 S,serif;letter-spacing:-.01em;margin:0}
h2{font:400 22pt/1.1 S,serif;margin:0 0 6mm;letter-spacing:-.01em}
h3{font:600 10.5pt/1.3 P,sans-serif;margin:6mm 0 2mm}
p{margin:0 0 3mm}ul,ol{margin:0 0 3mm;padding-left:5mm}li{margin:0 0 2mm}
.kicker{font:600 7.5pt/1 P;letter-spacing:.14em;text-transform:uppercase;color:${C.muted};margin:0 0 4mm}
.big{font:400 40pt/1 S,serif;letter-spacing:-.02em;color:${C.accent}}
.mid{font:400 22pt/1 S,serif;color:${C.accent}}
.note{font-size:8.5pt;color:${C.muted}}
.rule{border-top:.6pt solid ${C.rule};margin:6mm 0}
table{width:100%;border-collapse:collapse;margin:2mm 0 4mm;font-size:9pt}
th{text-align:left;font-weight:600;border-bottom:1pt solid ${C.ink};padding:2mm 2mm 2mm 0}
td{border-bottom:.5pt solid ${C.rule};padding:2mm 2mm 2mm 0;vertical-align:top}
td.n,th.n{text-align:right;font-variant-numeric:tabular-nums}
tr.tot td{font-weight:600;border-bottom:1pt solid ${C.ink}}
.cols2{display:grid;grid-template-columns:1fr 1fr;gap:10mm}
.stat{display:grid;grid-template-columns:34mm 1fr;gap:4mm;align-items:baseline;border-top:.6pt solid ${C.rule};padding:4mm 0}
.foot{position:absolute;left:20mm;right:20mm;bottom:9mm;font-size:7.5pt;color:${C.muted};display:flex;justify-content:space-between;border-top:.5pt solid ${C.rule};padding-top:2.5mm}
.disc{position:absolute;left:20mm;right:20mm;bottom:18mm;font-size:7.5pt;color:${C.muted}}
.cover{padding:0;background:${C.ink};color:#fff}
.cover .ph{height:178mm;background-size:cover;background-position:center}
.cover .blk{position:absolute;left:20mm;top:118mm;width:122mm;background:${C.ink};padding:10mm 10mm 9mm}
.cover .blk h1{color:#fff;font-size:30pt}
.cover .blk p{color:#c9ccd1;font-size:10.5pt;margin:5mm 0 0}
.cover .meta{position:absolute;left:20mm;right:20mm;bottom:16mm;display:flex;justify-content:space-between;align-items:flex-end;font-size:8.5pt;color:#c9ccd1}
.cover .word{font:500 16pt/1 S,serif;color:#fff}
.chap{display:flex;gap:5mm;align-items:baseline;margin-bottom:2mm}.chap .no{font:400 12pt S;color:${C.gold}}
.toc li{display:flex;justify-content:space-between;border-bottom:.5pt solid ${C.rule};padding:2.4mm 0;margin:0;list-style:none}
.toc{padding:0}.toc .t{font:400 12.5pt S,serif}.toc .p{color:${C.muted};font-variant-numeric:tabular-nums}
.tag{display:inline-block;font:600 7pt/1 P;letter-spacing:.12em;text-transform:uppercase;color:${C.gold};border:.7pt solid ${C.gold};border-radius:2pt;padding:1.5mm 2mm}
.card{border:.6pt solid ${C.rule};padding:7mm;margin-top:5mm;background:#fff}
.card .nm{font:400 18pt/1.1 S,serif;margin:3mm 0}
.ck li{list-style:none;padding-left:7mm;position:relative}.ck li::before{content:"";position:absolute;left:0;top:.8mm;width:3.4mm;height:3.4mm;border:.8pt solid ${C.ink}}
dl{display:grid;grid-template-columns:24mm 1fr;gap:2mm 4mm;margin:0}dt{font-weight:600}dd{margin:0}
.src li{font-size:7.8pt;margin-bottom:1.6mm;word-break:break-word}
.steps{counter-reset:s;padding:0}.steps li{counter-increment:s;list-style:none;padding-left:10mm;position:relative;margin-bottom:3.5mm}
.steps li::before{content:counter(s);position:absolute;left:0;top:-.3mm;width:6mm;height:6mm;border-radius:50%;background:${C.paper};color:${C.accent};font:600 8pt/6mm P;text-align:center}
.legend{display:flex;gap:6mm;font-size:8pt;color:${C.muted};margin:1mm 0 3mm}.legend i{display:inline-block;width:3mm;height:3mm;margin-right:1.5mm;vertical-align:-.3mm}
`;

// ---------- charts (inline SVG) ----------
const SER = [C.s1, C.s2, C.s3];
function bars(l: Lang): string {
  const W = 500, H = 230, padL = 70, padB = 26, top = 10, max = 32000;
  const gw = (W - padL - 10) / examples.length, bw = 30;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" font-family="P" font-size="9">`;
  for (let g = 0; g <= max; g += 8000) {
    const y = top + (H - padB - top) * (1 - g / max);
    s += `<line x1="${padL}" x2="${W - 10}" y1="${y}" y2="${y}" stroke="${C.rule}" stroke-width=".7"/><text x="${padL - 6}" y="${y + 3}" text-anchor="end" fill="${C.muted}">${esc(eur(g, l))}</text>`;
  }
  examples.forEach((e, i) => {
    const vals = [e.hpp + e.is, e.sec + e.is, e.non + e.is];
    const cx = padL + gw * i + gw / 2;
    vals.forEach((v, j) => {
      const h = (H - padB - top) * (v / max), x = cx + (j - 1.5) * (bw + 6) + 3, y = H - padB - h;
      s += `<rect x="${x}" y="${y}" width="${bw}" height="${h}" fill="${SER[j]}"/><text x="${x + bw / 2}" y="${y - 4}" text-anchor="middle" fill="${C.ink}" font-size="8">${esc(num(v / 1000, l))}k</text>`;
    });
    s += `<text x="${cx}" y="${H - 8}" text-anchor="middle" fill="${C.ink}">${esc(T[l].exHouse)} ${esc(eur(e.v, l))}</text>`;
  });
  return s + `</svg>`;
}
function line(l: Lang): string {
  const W = 500, H = 210, padL = 40, padB = 26, top = 10, xmin = 100000, xmax = 600000, ymax = 0.08;
  const X = (v: number) => padL + (W - padL - 14) * ((v - xmin) / (xmax - xmin)), Y = (r: number) => top + (H - padB - top) * (1 - r / ymax);
  let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" font-family="P" font-size="9">`;
  for (let r = 0; r <= ymax + 1e-9; r += 0.02) s += `<line x1="${padL}" x2="${W - 14}" y1="${Y(r)}" y2="${Y(r)}" stroke="${C.rule}" stroke-width=".7"/><text x="${padL - 6}" y="${Y(r) + 3}" text-anchor="end" fill="${C.muted}">${esc(pct(r, l, 0))}</text>`;
  for (let v = xmin; v <= xmax; v += 100000) s += `<text x="${X(v)}" y="${H - 8}" text-anchor="middle" fill="${C.muted}">${esc(num(v / 1000, l))}k €</text>`;
  const fns = [(v: number) => imt(v, HPP) / v, (v: number) => imt(v, SEC) / v, () => NONRES];
  fns.forEach((f, j) => {
    const pts: string[] = [];
    for (let v = xmin; v <= xmax; v += 5000) pts.push(`${X(v).toFixed(1)},${Y(f(v)).toFixed(1)}`);
    s += `<polyline points="${pts.join(" ")}" fill="none" stroke="${SER[j]}" stroke-width="2.2"/>`;
  });
  return s + `</svg>`;
}
const legend = (l: Lang) => `<div class="legend">${T[l].profiles.map((p, j) => `<span><i style="background:${SER[j]}"></i>${esc(p)}</span>`).join("")}</div>`;

// ---------- pages ----------
function html(ed: Ed, l: Lang): string {
  const t = T[l], c = COUNTRIES[ed];
  const photo = `data:image/jpeg;base64,${b64(`ebooks/img/${PHOTO[ed]}.jpg`)}`; // JPEG stays compressed in the PDF
  const disc = `<div class="disc">${esc(DISCLAIMER[l])}</div>`;
  const foot = () => `<div class="foot"><span>Imóveis Portugal · ${esc(t.title)} · ${esc(c.name[l])}</span><span>{{n}}</span></div>`;
  const chap = (i: number) => `<div class="chap"><span class="no">${String(i + 1).padStart(2, "0")}</span><span class="kicker" style="margin:0">${esc(t.ch[i])}</span></div>`;
  const rows = (tab: Bracket[]) => tab.slice(0, 4).map(([u, m, a]) => `<tr><td>${eur(u, l)}</td><td class="n">${pct(m, l, 0)}</td><td class="n">${pct4(a as number, l)}</td></tr>`).join("");
  const head = `<tr>${t.cols.map((x, i) => `<th class="${i ? "n" : ""}">${esc(x)}</th>`).join("")}</tr>`;
  const ex = examples.map((e) => `<h3>${t.exHouse} ${eur(e.v, l)}</h3><table><tr>${t.exCols.map((x, i) => `<th class="${i ? "n" : ""}">${esc(x)}</th>`).join("")}</tr>
    <tr><td>${t.exRows[0]}</td><td class="n">${eur(e.hpp, l)}</td><td class="n">${eur(e.sec, l)}</td><td class="n">${eur(e.non, l)}</td></tr>
    <tr><td>${esc(t.exRows[1])}</td><td class="n">${eur(e.is, l)}</td><td class="n">${eur(e.is, l)}</td><td class="n">${eur(e.is, l)}</td></tr>
    <tr class="tot"><td>${t.exRows[2]}</td><td class="n">${eur(e.hpp + e.is, l)}</td><td class="n">${eur(e.sec + e.is, l)}</td><td class="n">${eur(e.non + e.is, l)}</td></tr></table>`).join("");
  const cashVals = [CASH.deposit, CASH.imt, CASH.isBuy, CASH.isLoan, cashTotal];
  const src = [...new Set([...USED, ...c.items.flatMap((i) => i.facts)])].map((id) => FACTS[id]).filter((f, i, a) => a.findIndex((x) => x.source_url === f.source_url) === i)
    .map((f) => `<li>${esc(f.source_title)} (${f.checked_on}): ${esc(f.source_url)}</li>`).join("");

  // Pages in order; the contents page numbers come from this list.
  const P: { ch?: number; body: string }[] = [
    { body: `<section class="pg cover"><div class="ph" style="background-image:url(${photo})"></div><div class="blk"><p class="kicker" style="color:#c9ccd1">${esc(t.edition)} ${esc(c.name[l])} · ${esc(t.year)}</p><h1>${esc(t.title)}</h1><p>${esc(t.sub)}</p></div><div class="meta"><span class="word">Imóveis Portugal</span><span>${esc(t.checked)}</span></div></section>` },
    { body: `<section class="pg paper"><p class="kicker">${esc(t.contentsH)}</p><ul class="toc">{{toc}}</ul><p class="kicker" style="margin-top:12mm">${esc(t.summaryH)}</p>${t.summary.map(([b, x]) => `<div class="stat"><span class="mid">${esc(b)}</span><span>${esc(x)}</span></div>`).join("")}<p class="kicker" style="margin-top:8mm">${esc(t.howH)}</p><p class="note" style="max-width:150mm">${esc(t.how)}</p>${foot()}</section>` },
    { body: `<section class="pg"><span class="tag">${esc(t.partnersLabel)}</span><h2 style="margin-top:5mm">${esc(t.partnersH)}</h2><div class="card"><p class="note" style="margin:0">${esc(t.sponsoredBy)} ${esc(config.agency.name)}</p><p class="nm">${esc(config.agency.name)}</p><p>${esc(t.agencyP)}</p><p class="note">AMI ${config.agency.ami} · ${esc(config.agency.website.replace(/^https:\/\/|\/$/g, ""))} · ${esc(config.agency.phone)}</p></div><div class="card" style="background:${C.paper}"><h3 style="margin-top:0">${esc(t.slotsH)}</h3><p class="note" style="margin:0">${esc(t.slotsP)}</p></div><p class="note" style="margin-top:6mm">${esc(t.partnersNote)}</p>${foot()}</section>` },
    { ch: 0, body: `<section class="pg">${chap(0)}<h2>${esc(t.ch[0])}</h2><p>${esc(t.imtP)}</p><h3>${esc(t.tHpp)}</h3><table>${head}${rows(HPP)}<tr><td>${t.above[0]}</td><td class="n">${pct(0.08, l, 0)}</td><td class="n">–</td></tr></table><h3>${esc(t.tSec)}</h3><table>${head}${rows(SEC)}<tr><td>${t.above[1]}</td><td class="n">${pct(0.08, l, 0)}</td><td class="n">–</td></tr></table><p class="note">${esc(t.flat)}</p>${foot()}</section>` },
    { ch: 1, body: `<section class="pg">${chap(1)}<div style="display:grid;grid-template-columns:52mm 1fr;gap:8mm;align-items:start"><span class="big" style="font-size:54pt">${esc(t.nrBig)}</span><div><p>${esc(t.nrP)}</p><ol type="a">${t.nrL.map((x) => `<li>${esc(x)}</li>`).join("")}</ol><p class="note">${esc(t.nrNote)}</p></div></div><div class="rule"></div><h2>${esc(t.isH)}</h2>${t.isL.map(([b, x]) => `<div class="stat"><span class="mid">${esc(b)}</span><span>${esc(x)}</span></div>`).join("")}${disc}${foot()}</section>` },
    { ch: 2, body: `<section class="pg">${chap(2)}<h2>${esc(t.ch[2])}</h2><p class="note">${esc(t.exP)}</p>${ex}${foot()}</section>` },
    { body: `<section class="pg"><h3 style="margin-top:0">${esc(t.chartH)}</h3>${legend(l)}${bars(l)}<h3 style="margin-top:10mm">${esc(t.lineH)}</h3>${legend(l)}${line(l)}<p class="note">${esc(t.lineNote)}</p>${foot()}</section>` },
    { ch: 3, body: `<section class="pg">${chap(3)}<h2>${esc(t.ch[3])}</h2>${t.crL.map(([b, x]) => `<div class="stat"><span class="mid">${esc(b)}</span><span>${esc(x)}</span></div>`).join("")}<p class="note">${esc(t.crNote)}</p><h3 style="margin-top:8mm">${esc(t.cashH)}</h3><p>${esc(t.cashP)}</p><table>${t.cashRows.map((r, i) => `<tr class="${i === 4 ? "tot" : ""}"><td>${esc(r)}</td><td class="n">${eur(cashVals[i], l)}</td></tr>`).join("")}</table><p class="note">${esc(t.cashNote)}</p>${disc}${foot()}</section>` },
    { ch: 4, body: `<section class="pg">${chap(4)}<h2>${esc(t.ch[4])}</h2><p>${esc(t.hppP)}</p>${t.hppL.map(([b, x]) => `<div class="stat" style="grid-template-columns:24mm 1fr;padding:2.6mm 0"><strong>${esc(b)}</strong><span>${esc(x)}</span></div>`).join("")}<h3>${esc(t.hppExH)}</h3><table><tr>${t.hppCols.map((x, i) => `<th class="${i ? "n" : ""}">${esc(x)}</th>`).join("")}</tr>${t.hppRows.map((r, i) => `<tr class="${i === 4 ? "tot" : ""}"><td>${esc(r)}</td>${OWN.map((c) => `<td class="n">${eur(c[i], l)}</td>`).join("")}</tr>`).join("")}</table><p class="note">${esc(t.hppNote)}</p><p>${esc(t.hppEl)}</p>${disc}${foot()}</section>` },
    { ch: 5, body: `<section class="pg">${chap(5)}<h2>${esc(t.ch[5])}</h2><h3 style="margin-top:0">${esc(t.cr2H)}</h3><ol class="steps">${t.cr2L.map((x) => `<li>${esc(x)}</li>`).join("")}</ol><h3>${esc(t.apH)}</h3><p>${esc(t.apP)}</p><table>${t.apRows.map((r, i) => `<tr class="${i === 2 ? "tot" : ""}"><td>${esc(r)}</td><td class="n">${eur(i === 3 ? APPR[3] : APPR[i === 2 ? 2 : i], l)}</td></tr>`).join("")}</table><h3>${esc(t.deedH)}</h3><p>${esc(t.deedP)}</p><ul>${t.deedL.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>${disc}${foot()}</section>` },
    { body: `<section class="pg paper"><p class="kicker">${esc(t.edition)} ${esc(c.name[l])}</p><h2>${esc(c.h[l])}</h2><ul>${c.items.map((i) => `<li>${esc(i.text[l])}</li>`).join("")}</ul><p class="note">${esc(c.note[l])}</p>${disc}${foot()}</section>` },
    { ch: 6, body: `<section class="pg">${chap(6)}<h2>${esc(t.ch[6])}</h2><ol class="steps">${t.stL.map((x) => `<li>${esc(x)}</li>`).join("")}</ol><h3 style="margin-top:6mm">${esc(t.yrH)}</h3>${t.yrL.map(([b, x]) => `<div class="stat" style="grid-template-columns:24mm 1fr;padding:2.6mm 0"><strong>${esc(b)}</strong><span>${esc(x)}</span></div>`).join("")}${foot()}</section>` },
    { ch: 7, body: `<section class="pg">${chap(7)}<h2>${esc(t.ch[7])}</h2><ul class="ck">${t.ckL.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><h3 style="margin-top:8mm">${esc(t.glH)}</h3><dl>${t.gl.map(([a, b]) => `<dt>${a}</dt><dd>${esc(b)}</dd>`).join("")}</dl>${foot()}</section>` },
    { ch: 8, body: `<section class="pg">${chap(8)}<h2>${esc(t.ch[8])}</h2><p class="note">${esc(t.srcP)}</p><ul class="src">${src}</ul><div class="rule"></div><p class="note">${esc(DISCLAIMER[l])}</p>${foot()}</section>` },
    { body: `<section class="pg cover" style="padding:24mm 20mm"><p class="word" style="font:500 20pt S;color:#fff">Imóveis Portugal</p><div style="position:absolute;left:20mm;right:20mm;bottom:40mm"><h2 style="color:#fff">${esc(t.backH)}</h2><p style="color:#c9ccd1;max-width:130mm">${esc(t.backP)}</p><p style="color:#fff;margin-top:6mm">${esc(t.backA)}</p><p style="color:#9aa0a6;font-size:8pt;margin-top:10mm">${esc(config.agency.name)} · AMI ${config.agency.ami}</p></div></section>` },
  ];
  if (P.length !== PAGES) throw new Error(`report has ${P.length} pages, ebooks/pages.ts says ${PAGES}`);
  // Contents: the numbered chapters and the country chapter, in page order.
  const countryPage = P.findIndex((p) => p.body.includes(`<h2>${esc(c.h[l])}</h2>`));
  const toc = P.map((p, i) => (p.ch !== undefined ? `<li><span class="t">${String(p.ch + 1).padStart(2, "0")}  ${esc(t.ch[p.ch])}</span><span class="p">${i + 1}</span></li>`
    : i === countryPage ? `<li><span class="t">${esc(c.h[l])}</span><span class="p">${i + 1}</span></li>` : "")).join("");
  const body = P.map((p, i) => p.body.replace("{{n}}", String(i + 1)).replace("{{toc}}", toc)).join("");
  return `<!doctype html><html lang="${l === "pt" ? "pt-PT" : l}"><head><meta charset="utf-8"><title>${esc(t.title)} · ${esc(c.name[l])}</title><style>${css}</style></head><body>${body}</body></html>`;
}

const only = process.argv.slice(2); // e.g. `npm run ebooks -- lu-pt` to build one report
const browser = await chromium.launch();
for (const ed of EDS) for (const l of ["pt", "en", "fr"] as Lang[]) {
  if (only.length && !only.includes(`${ed}-${l}`)) continue;
  const file = join(outHtml, `${ed}-${l}.html`);
  writeFileSync(file, html(ed, l));
  const page = await browser.newPage();
  await page.goto(`file://${file}`);
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: join(outPdf, `imoveis-portugal-guia-custos-${ed}-${l}.pdf`), format: "A4", printBackground: true });
  await page.setViewportSize({ width: 794, height: 1123 });
  const n = await page.locator("section.pg").count();
  for (let i = 0; i < n; i++) await page.locator("section.pg").nth(i).screenshot({ path: join(outHtml, `${ed}-${l}-${i + 1}.png`) });
  // Cover image for the download page, 600 px wide.
  const cover = join(outHtml, `${ed}-${l}-cover.png`);
  await page.locator("section.pg").first().screenshot({ path: cover, scale: "css" });
  await page.close();
  const shot = await browser.newPage();
  const webp: string = await shot.evaluate(async (src: string) => {
    const img = new Image(); img.src = src; await img.decode();
    const cv = document.createElement("canvas"); cv.width = 600; cv.height = 849;
    cv.getContext("2d")!.drawImage(img, 0, 0, 600, 849);
    return cv.toDataURL("image/webp", 0.82);
  }, `data:image/png;base64,${readFileSync(cover).toString("base64")}`);
  writeFileSync(join(outCover, `${ed}-${l}.webp`), Buffer.from(webp.split(",")[1], "base64"));
  unlinkSync(cover);
  await shot.close();
  console.log(`${ed}-${l}: ${n} pages`);
}
await browser.close();
