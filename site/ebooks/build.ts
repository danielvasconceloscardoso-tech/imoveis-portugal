// Free e-book "What it really costs to buy in Portugal", one per edition, each in pt, en and fr (prompt 04, D18).
// The edition adds a country chapter (countries.ts) after the summary.
// Every number is quoted from content/facts/facts.csv or computed from it (IMT brackets below).
// Run from site/:  npm run ebooks   → public/ebooks/imoveis-portugal-guia-custos-{ed}-{lang}.pdf
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { FACTS, DISCLAIMER } from "../src/lib/content";
import type { Lang } from "../src/i18n";
import { COUNTRIES, EDS, type Ed } from "./countries";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright"); // pre-installed in the build environment
const site = process.cwd();
const outHtml = join(site, "ebooks", "out");
const outPdf = join(site, "public", "ebooks");
mkdirSync(outHtml, { recursive: true });
mkdirSync(outPdf, { recursive: true });

// ---------- IMT 2026 (CIMT art. 17.º; facts pt-imt-hpp-2026, pt-imt-second-home-2026) ----------
type Bracket = [upper: number, marginal: number, avgAtUpper: number | null];
const HPP: Bracket[] = [[106346, 0, 0], [145470, 0.02, 0.005379], [198347, 0.05, 0.017274], [330539, 0.07, 0.038361], [660982, 0.08, null]];
const SEC: Bracket[] = [[106346, 0.01, 0.01], [145470, 0.02, 0.012689], [198347, 0.05, 0.022636], [330539, 0.07, 0.041578], [633931, 0.08, null]];
// Guard: the brackets above must match the text of the facts base.
for (const [id, tab] of [["pt-imt-hpp-2026", HPP], ["pt-imt-second-home-2026", SEC]] as const) {
  const v = FACTS[id].value.replace(/\s/g, "");
  for (const [u, , a] of tab) {
    if (!v.includes(String(u).replace(/\B(?=(\d{3})+(?!\d))/g, ""))) throw new Error(`${id}: bracket ${u} not in facts.csv`);
    if (a !== null && !v.includes(`${(a * 100).toFixed(4).replace(/\.?0+$/, "") || "0"}%`)) throw new Error(`${id}: average ${a} not in facts.csv`);
  }
}
// CIMT art. 17.º n.º 3: the part up to the previous bracket limit at that bracket's average rate, the rest at the marginal rate.
const imt = (v: number, tab: Bracket[]) => {
  for (let i = 0; i < tab.length; i++) if (v <= tab[i][0]) return i === 0 ? v * tab[0][1] : tab[i - 1][0] * (tab[i - 1][2] as number) + (v - tab[i - 1][0]) * tab[i][1];
  throw new Error("value above table");
};
const NONRES = 0.075, IS_BUY = 0.008, IS_LOAN = 0.006; // pt-imt-nonresident-flat, pt-is-purchase, pt-is-loan-5y

// ---------- formatting ----------
const num = (n: number, l: Lang) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, l === "en" ? "," : " ");
const eur = (n: number, l: Lang) => `${num(n, l)} €`;
const pct = (n: number, l: Lang, d = 1) => { const s = (n * 100).toFixed(d).replace(/\.0+$/, ""); return l === "en" ? `${s}%` : l === "fr" ? `${s.replace(".", ",")} %` : `${s.replace(".", ",")}%`; };
const pct4 = (n: number, l: Lang) => pct(n, l, 4).replace(/([.,]\d*?)0+(\D)/, "$1$2");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const examples = [250000, 400000].map((v) => ({ v, hpp: imt(v, HPP), sec: imt(v, SEC), non: v * NONRES, is: v * IS_BUY }));

// ---------- text ----------
const T = {
  pt: {
    title: "Quanto custa mesmo comprar casa em Portugal", sub: "Impostos, crédito e passos, com a fonte oficial de cada número", ed: "Edição {c} · 2026 · factos verificados a 24 de outubro de 2026", s1c: "o que muda para si.",
    s1h: "O que vai saber no fim", s1: ["Que impostos se pagam na compra em 2026 e como se calcula o IMT.", "Porque é que quem não é residente fiscal em Portugal paga agora 7,5% de IMT, e as exceções.", "Quanto custa, em impostos, uma casa de 250 000 € e uma de 400 000 €.", "O que o Banco de Portugal permite aos bancos emprestar.", "Os passos da compra à distância e os impostos de todos os anos."],
    s1note: "Este guia descreve as regras; não é aconselhamento. Para o seu caso, fale com um profissional.",
    imtH: "1. O IMT: o imposto da compra", imtP: "O Imposto Municipal sobre as Transmissões Onerosas de Imóveis (IMT) paga-se antes da escritura e deve ser pago no próprio dia da liquidação ou nos 30 dias seguintes. As taxas de 2026 dependem do uso da casa. O valor divide-se em duas partes: até ao limite do escalão anterior aplica-se a taxa média desse escalão; ao excedente, a taxa marginal.",
    tHpp: "Habitação própria e permanente (residentes)", tSec: "Outra habitação, por exemplo casa de férias (residentes)", cols: ["Valor até", "Taxa marginal", "Taxa média no limite"], above: ["Até 660 982 €", "Até 633 931 €"], flat: "Acima: 6% (taxa única) até 1 150 853 €, 7,5% acima",
    nrH: "2. Não residentes: taxa única de 7,5%", nrP: "Desde maio de 2026 (Decreto-Lei 97/2026), quem compra casa sem ser residente fiscal em Portugal paga IMT à taxa única de 7,5%, sem isenções nem reduções. A taxa não se aplica quando o comprador:", nrL: ["tenha sido considerado residente para efeitos fiscais em Portugal;", "se torne residente fiscal em Portugal nos dois anos seguintes à compra;", "arrende a casa para habitação, no prazo de seis meses, com renda dentro dos limites do decreto, durante pelo menos 36 meses nos primeiros cinco anos."], nrNote: "Nos dois últimos casos paga-se primeiro os 7,5% e pede-se a devolução da diferença no prazo de seis meses. Como a primeira exceção se aplica a quem já foi residente e emigrou é uma pergunta para um advogado ou consultor fiscal.",
    isH: "3. Imposto do selo", isL: ["Na compra: 0,8% do valor.", "Com crédito de cinco anos ou mais: 0,6% do montante emprestado.", "Sobre os juros cobrados pelo banco: 4%."],
    exH: "4. Contas feitas", exP: "Impostos na compra, arredondados ao euro, com as tabelas de 2026. Não incluem escritura, registo, honorários, câmbio nem custos do crédito.", exCols: ["", "Residente, habitação própria", "Residente, outra habitação", "Não residente"], exRows: ["IMT", "Imposto do selo (0,8%)", "Total"], exHouse: "Casa de",
    crH: "5. O crédito: as regras do Banco de Portugal", crL: ["Montante: até 90% do valor para habitação própria e permanente; até 80% para outras finalidades. Conta o valor mais baixo entre o preço e a avaliação.", "Prestação: a soma das prestações de todos os créditos não deve passar de 45% do rendimento líquido (cada banco pode exceder em até 10% do crédito que concede por ano).", "Prazo: até 40 anos para quem tem até 35 anos de idade; até 35 anos a partir dessa idade."], crEx: "Exemplo: um empréstimo de 200 000 € paga 1 200 € de imposto do selo no início.", crNote: "Regras aplicáveis desde 1 de agosto de 2026.",
    stH: "6. Os passos, à distância", stL: ["NIF: o número de contribuinte pede-se online, através de um representante legal, ou presencialmente. Para o pedir não é obrigatório um representante fiscal.", "Procuração: pode assinar num consulado de Portugal ou perante um notário do país onde vive; neste caso precisa da Apostila de Haia.", "Contrato-promessa (CPCV): fixa preço, data e sinal. Se o comprador não cumprir por culpa sua, perde o sinal; se for o vendedor, o comprador pode exigir o dobro (Código Civil, art. 442.º).", "Origem do dinheiro: bancos, notários e advogados têm de obter informação sobre a origem dos fundos quando a operação o justifica (Lei 83/2017).", "Escritura e registo: os custos dependem do serviço escolhido.", "Depois da compra: quem vive fora da UE tem 15 dias para nomear um representante fiscal ou aderir às notificações eletrónicas das Finanças; dentro da UE é opcional."],
    yrH: "7. Todos os anos", yrL: ["IMI: entre 0,3% e 0,45% do valor patrimonial tributário, com a taxa fixada pela câmara.", "AIMI: só sobre a soma dos valores patrimoniais acima de 600 000 € por pessoa.", "Arrendamento: as rendas de habitação de não residentes pagam 25% em Portugal, com reduções para contratos longos.", "Alojamento local: exige registo; a câmara pode opor-se em 60 dias, ou 90 nas áreas de contenção."],
    ckH: "8. Lista de verificação", ckL: ["Pedi o NIF", "Sei se vou ser residente fiscal nos dois anos seguintes", "Pedi orçamento de escritura, registo e honorários", "Pedi ao banco a simulação com a avaliação", "Reuni comprovativos da origem do dinheiro", "Mandei rever o contrato-promessa", "Tenho procuração com Apostila ou marcação no consulado", "Nomeei representante fiscal ou aderi às notificações eletrónicas (15 dias)"],
    glH: "9. Glossário", gl: [["IMT", "Imposto pago na compra de um imóvel."], ["IMI", "Imposto municipal anual sobre o imóvel."], ["AIMI", "Adicional ao IMI para patrimónios elevados."], ["NIF", "Número de identificação fiscal português."], ["CPCV", "Contrato-promessa de compra e venda."], ["Sinal", "Valor pago no contrato-promessa."], ["Escritura", "Ato que transmite a propriedade."], ["VPT", "Valor patrimonial tributário, a base do IMI."]],
    paH: "Parceiro deste guia", paP: "Espaço reservado a um parceiro, sempre identificado como conteúdo patrocinado.", adH: "Precisa de aconselhamento para o seu caso?", adP: "Pomos o seu pedido nas mãos de um advogado, banco, consultor fiscal ou serviço de transferências parceiro: imoveisportugal → Falar com um parceiro.",
    srcH: "Fontes", srcChecked: "verificado a",
  },
  en: {
    title: "What it really costs to buy in Portugal", sub: "Taxes, mortgages and steps, with the official source for every number", ed: "{c} edition · 2026 · facts checked on 24 October 2026", s1c: "what changes for you.",
    s1h: "What you will know by the end", s1: ["Which taxes you pay on purchase in 2026 and how the transfer tax (IMT) is calculated.", "Why buyers who are not Portuguese tax residents now pay 7.5% IMT, and the exceptions.", "What a 250,000 € and a 400,000 € home cost in taxes.", "How much Banco de Portugal lets banks lend.", "The steps for buying from abroad and the yearly taxes."],
    s1note: "This guide describes the rules; it is not advice. For your own case, talk to a professional.",
    imtH: "1. IMT: the purchase tax", imtP: "The property transfer tax (IMT) is paid before the deed, on the day it is assessed or within the following 30 days. The 2026 rates depend on how the home is used. The value is split in two: up to the previous bracket limit at that bracket's average rate; the rest at the marginal rate.",
    tHpp: "Owner-occupied main home (residents)", tSec: "Other home, such as a holiday home (residents)", cols: ["Value up to", "Marginal rate", "Average rate at the limit"], above: ["Up to 660,982 €", "Up to 633,931 €"], flat: "Above: 6% (flat) up to 1,150,853 €, 7.5% above",
    nrH: "2. Non-residents: a flat 7.5%", nrP: "Since May 2026 (Decree-Law 97/2026), buyers who are not Portuguese tax residents pay IMT at a flat 7.5% on homes, with no exemption or reduction. The rate does not apply when the buyer:", nrL: ["has been considered a Portuguese tax resident;", "becomes a Portuguese tax resident within two years of the purchase;", "rents the home out as a residence within six months, at a rent within the decree's caps, for at least 36 months in the first five years."], nrNote: "In the last two cases you pay 7.5% first and claim back the difference within six months. How the first exception applies to people who were once residents and emigrated is a question for a lawyer or tax adviser.",
    isH: "3. Stamp duty", isL: ["On purchase: 0.8% of the value.", "With a loan of five years or more: 0.6% of the amount borrowed.", "On the interest charged by the bank: 4%."],
    exH: "4. Worked examples", exP: "Purchase taxes, rounded to the euro, using the 2026 tables. Excludes the deed, registration, legal fees, currency exchange and mortgage costs.", exCols: ["", "Resident, main home", "Resident, other home", "Non-resident"], exRows: ["IMT", "Stamp duty (0.8%)", "Total"], exHouse: "Home at",
    crH: "5. Mortgages: Banco de Portugal's rules", crL: ["Amount: up to 90% of the value for an owner-occupied main home; up to 80% for other purposes. The lower of price and appraisal counts.", "Payments: all loan payments together should not exceed 45% of net income (each bank may exceed this for up to 10% of its lending per year).", "Term: up to 40 years for borrowers aged up to 35; up to 35 years from that age."], crEx: "Example: a 200,000 € loan pays 1,200 € in stamp duty at signing.", crNote: "Rules applying since 1 August 2026.",
    stH: "6. The steps, from abroad", stL: ["NIF: the tax number can be requested online through a legal representative, or in person. No tax representative is needed to get it.", "Power of attorney: sign it at a Portuguese consulate or before a notary where you live; in that case it needs a Hague Apostille.", "Promissory contract (CPCV): it fixes the price, date and deposit. If the buyer defaults through their own fault, they lose the deposit; if the seller does, the buyer can claim double (Civil Code, art. 442).", "Origin of funds: banks, notaries and lawyers must obtain information on the origin of funds when the transaction calls for it (Law 83/2017).", "Deed and registration: costs depend on the service chosen.", "After the purchase: residents outside the EU have 15 days to appoint a tax representative or sign up for the tax authority's electronic notifications; inside the EU it is optional."],
    yrH: "7. Every year", yrL: ["IMI: 0.3% to 0.45% of the property's tax value, at the rate set by the municipality.", "AIMI: only on total tax values above 600,000 € per person.", "Renting: residential rent earned by non-residents is taxed at 25% in Portugal, with reductions for long leases.", "Short-term rental (alojamento local): needs registration; the municipality can object within 60 days, or 90 in containment areas."],
    ckH: "8. Checklist", ckL: ["I have a NIF", "I know whether I will become a tax resident within two years", "I have quotes for the deed, registration and fees", "I asked the bank for a simulation with the appraisal", "I have proof of where the money comes from", "I had the promissory contract reviewed", "I have a power of attorney with Apostille or a consulate appointment", "I appointed a tax representative or joined electronic notifications (15 days)"],
    glH: "9. Glossary", gl: [["IMT", "Tax paid when buying property."], ["IMI", "Yearly municipal property tax."], ["AIMI", "Additional IMI on high property values."], ["NIF", "Portuguese tax number."], ["CPCV", "Promissory purchase contract."], ["Sinal", "Deposit paid on the promissory contract."], ["Escritura", "The deed that transfers ownership."], ["VPT", "Property tax value, the basis for IMI."]],
    paH: "Partner of this guide", paP: "Space reserved for a partner, always labelled as sponsored content.", adH: "Need advice for your case?", adP: "We pass your request to a partner lawyer, bank, tax adviser or money transfer service: imoveisportugal → Talk to a partner.",
    srcH: "Sources", srcChecked: "checked on",
  },
  fr: {
    title: "Ce que coûte vraiment un achat au Portugal", sub: "Impôts, crédit et étapes, avec la source officielle de chaque chiffre", ed: "Édition {c} · 2026 · faits vérifiés le 24 octobre 2026", s1c: "ce qui change pour vous.",
    s1h: "Ce que vous saurez à la fin", s1: ["Quels impôts se paient à l'achat en 2026 et comment se calcule l'IMT.", "Pourquoi un non-résident fiscal au Portugal paie désormais 7,5 % d'IMT, et les exceptions.", "Ce que coûtent, en impôts, un bien de 250 000 € et un bien de 400 000 €.", "Ce que la Banque du Portugal autorise les banques à prêter.", "Les étapes d'un achat à distance et les impôts de chaque année."],
    s1note: "Ce guide décrit les règles ; ce n'est pas un conseil. Pour votre cas, adressez-vous à un professionnel.",
    imtH: "1. L'IMT : l'impôt de l'achat", imtP: "L'impôt sur les transmissions onéreuses (IMT) se paie avant l'acte, le jour de sa liquidation ou dans les 30 jours. Les taux 2026 dépendent de l'usage du bien. La valeur se divise en deux : jusqu'à la limite de la tranche précédente, le taux moyen de cette tranche ; au-delà, le taux marginal.",
    tHpp: "Résidence principale (résidents)", tSec: "Autre logement, par exemple résidence secondaire (résidents)", cols: ["Valeur jusqu'à", "Taux marginal", "Taux moyen à la limite"], above: ["Jusqu'à 660 982 €", "Jusqu'à 633 931 €"], flat: "Au-delà : 6 % (taux unique) jusqu'à 1 150 853 €, 7,5 % au-delà",
    nrH: "2. Non-résidents : taux unique de 7,5 %", nrP: "Depuis mai 2026 (décret-loi 97/2026), un acheteur non-résident fiscal au Portugal paie l'IMT au taux unique de 7,5 % sur un logement, sans exonération ni réduction. Ce taux ne s'applique pas lorsque l'acheteur :", nrL: ["a été considéré comme résident fiscal au Portugal ;", "devient résident fiscal au Portugal dans les deux ans suivant l'achat ;", "loue le logement à usage d'habitation dans les six mois, avec un loyer plafonné par le décret, pendant au moins 36 mois sur les cinq premières années."], nrNote: "Dans les deux derniers cas, on paie d'abord les 7,5 % puis on demande le remboursement de la différence dans les six mois. La façon dont la première exception s'applique aux anciens résidents ayant émigré est une question pour un avocat ou un conseiller fiscal.",
    isH: "3. Droit de timbre", isL: ["À l'achat : 0,8 % de la valeur.", "Avec un crédit de cinq ans ou plus : 0,6 % du montant emprunté.", "Sur les intérêts facturés par la banque : 4 %."],
    exH: "4. Calculs faits", exP: "Impôts à l'achat, arrondis à l'euro, barèmes 2026. Hors acte, enregistrement, honoraires, change et frais de crédit.", exCols: ["", "Résident, résidence principale", "Résident, autre logement", "Non-résident"], exRows: ["IMT", "Droit de timbre (0,8 %)", "Total"], exHouse: "Bien de",
    crH: "5. Le crédit : les règles de la Banque du Portugal", crL: ["Montant : jusqu'à 90 % de la valeur pour une résidence principale ; jusqu'à 80 % pour d'autres usages. La valeur la plus basse entre prix et expertise compte.", "Mensualités : l'ensemble des mensualités ne doit pas dépasser 45 % des revenus nets (chaque banque peut dépasser pour 10 % au plus de ses crédits annuels).", "Durée : jusqu'à 40 ans pour un emprunteur de 35 ans au plus ; 35 ans au-delà."], crEx: "Exemple : un prêt de 200 000 € paie 1 200 € de droit de timbre au départ.", crNote: "Règles applicables depuis le 1er août 2026.",
    stH: "6. Les étapes, à distance", stL: ["NIF : le numéro fiscal se demande en ligne par un représentant légal, ou sur place. Un représentant fiscal n'est pas nécessaire pour l'obtenir.", "Procuration : signée dans un consulat du Portugal ou devant un notaire de votre pays ; dans ce cas, elle doit porter l'apostille de La Haye.", "Compromis (CPCV) : il fixe le prix, la date et les arrhes. Si l'acheteur se désiste par sa faute, il perd les arrhes ; si c'est le vendeur, l'acheteur peut exiger le double (Code civil, art. 442).", "Origine des fonds : banques, notaires et avocats doivent s'informer sur l'origine des fonds quand l'opération le justifie (loi 83/2017).", "Acte et enregistrement : les frais dépendent du service choisi.", "Après l'achat : hors UE, 15 jours pour désigner un représentant fiscal ou adhérer aux notifications électroniques ; dans l'UE, c'est facultatif."],
    yrH: "7. Chaque année", yrL: ["IMI : entre 0,3 % et 0,45 % de la valeur fiscale, au taux fixé par la commune.", "AIMI : seulement sur la somme des valeurs fiscales au-delà de 600 000 € par personne.", "Location : les loyers d'habitation des non-résidents sont imposés à 25 % au Portugal, avec des réductions pour les baux longs.", "Location touristique (alojamento local) : enregistrement obligatoire ; la commune peut s'opposer sous 60 jours, ou 90 en zone de limitation."],
    ckH: "8. Liste de contrôle", ckL: ["J'ai un NIF", "Je sais si je serai résident fiscal dans les deux ans", "J'ai des devis pour l'acte, l'enregistrement et les honoraires", "J'ai demandé à la banque une simulation avec l'expertise", "J'ai les justificatifs de l'origine des fonds", "J'ai fait relire le compromis", "J'ai une procuration avec apostille ou un rendez-vous au consulat", "J'ai désigné un représentant fiscal ou adhéré aux notifications (15 jours)"],
    glH: "9. Glossaire", gl: [["IMT", "Impôt payé à l'achat d'un bien."], ["IMI", "Impôt municipal annuel sur le bien."], ["AIMI", "Supplément d'IMI pour les patrimoines élevés."], ["NIF", "Numéro fiscal portugais."], ["CPCV", "Compromis de vente."], ["Sinal", "Arrhes versées au compromis."], ["Escritura", "Acte qui transfère la propriété."], ["VPT", "Valeur fiscale du bien, base de l'IMI."]],
    paH: "Partenaire de ce guide", paP: "Espace réservé à un partenaire, toujours signalé comme contenu sponsorisé.", adH: "Besoin d'un conseil pour votre cas ?", adP: "Nous transmettons votre demande à un avocat, une banque, un conseiller fiscal ou un service de transfert partenaire : imoveisportugal → Parler à un partenaire.",
    srcH: "Sources", srcChecked: "vérifié le",
  },
} as const;

const USED = ["pt-imt-hpp-2026", "pt-imt-second-home-2026", "pt-imt-payment", "pt-imt-nonresident-flat", "pt-imt-nonresident-exceptions", "pt-is-purchase", "pt-is-loan-5y", "pt-is-interest", "pt-ltv-limits", "pt-dsti-45", "pt-maturity-limits", "pt-nif-nonresident", "pt-tax-rep", "pt-poa-apostille", "pt-sinal-442", "pt-aml-funds", "pt-imi-rates", "pt-aimi-deduction", "pt-rent-tax-nonresident", "pt-al-registration"];
for (const id of [...USED, ...EDS.flatMap((e) => COUNTRIES[e].items.flatMap((i) => i.facts))]) if (!FACTS[id]) throw new Error(`unknown fact ${id}`);

const font = readFileSync(join(site, "node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2")).toString("base64");
const css = `
@font-face{font-family:A;src:url(data:font/woff2;base64,${font}) format("woff2");font-weight:100 900;font-stretch:62% 125%}
@page{size:A4;margin:0}
*{box-sizing:border-box}body{margin:0;font:400 10.5pt/1.5 A,sans-serif;color:#121212}
.pg{width:210mm;height:297mm;padding:22mm 20mm 18mm;position:relative;page-break-after:always;overflow:hidden}
.pg:last-child{page-break-after:auto}
h1{font-weight:700;font-stretch:118%;font-size:30pt;line-height:1.05;letter-spacing:-.02em;margin:0}
h2{font-weight:700;font-stretch:115%;font-size:16pt;line-height:1.15;margin:0 0 5mm}
h3{font-weight:700;font-stretch:110%;font-size:11pt;margin:6mm 0 2mm}
p{margin:0 0 3mm}ul,ol{margin:0 0 3mm;padding-left:5mm}li{margin:0 0 2mm}
.cover{background:#e6e6e3;display:flex;flex-direction:column;justify-content:space-between}
.mark{display:flex;gap:3mm;align-items:flex-start}.mark i{width:6mm;height:6mm;background:#121212;margin-top:1mm}
.mark b{font-weight:800;font-stretch:125%;font-size:13pt;line-height:.98}
.sub{font-size:14pt;color:#4b4b48;margin-top:8mm;max-width:140mm}.ed{font-size:9.5pt;color:#4b4b48}
table{width:100%;border-collapse:collapse;margin:2mm 0 5mm;font-size:9.5pt}
th{text-align:left;font-weight:600;border-bottom:1.5pt solid #121212;padding:2mm 2mm 2mm 0}
td{border-bottom:.5pt solid #c9c9c5;padding:2mm 2mm 2mm 0;vertical-align:top}
td.n,th.n{text-align:right;font-variant-numeric:tabular-nums}
tr.tot td{font-weight:700;border-bottom:1.5pt solid #121212}
.note{font-size:9pt;color:#4b4b48}
.box{border:1pt solid #121212;padding:5mm;margin-top:6mm}
.ck li{list-style:none;padding-left:7mm;position:relative}.ck li::before{content:"";position:absolute;left:0;top:1mm;width:3.5mm;height:3.5mm;border:1pt solid #121212}
dl{display:grid;grid-template-columns:28mm 1fr;gap:2mm 4mm;margin:0}dt{font-weight:700}dd{margin:0}
.src li{font-size:8.5pt;margin-bottom:1.5mm;word-break:break-word}
.disc{position:absolute;left:20mm;right:20mm;bottom:16mm;font-size:8.5pt;color:#4b4b48;border-top:.5pt solid #c9c9c5;padding-top:3mm}
.foot{position:absolute;left:20mm;right:20mm;bottom:8mm;font-size:8pt;color:#4b4b48;display:flex;justify-content:space-between}
`;

function html(ed: Ed, l: Lang): string {
  const t = T[l], c = COUNTRIES[ed];
  const rows = (tab: Bracket[]) => tab.slice(0, 4).map(([u, m, a]) => `<tr><td>${eur(u, l)}</td><td class="n">${pct(m, l, 0)}</td><td class="n">${pct4(a as number, l)}</td></tr>`).join("");
  // Page numbers are filled in once the pages are assembled.
  const foot = () => `<div class="foot"><span>Imóveis Portugal · ${esc(t.title)}</span><span>{{n}}</span></div>`;
  const disc = `<div class="disc">${esc(DISCLAIMER[l])}</div>`;
  const ex = examples.map((e) => `<h3>${t.exHouse} ${eur(e.v, l)}</h3><table><tr>${t.exCols.map((c, i) => `<th class="${i ? "n" : ""}">${esc(c)}</th>`).join("")}</tr>
    <tr><td>${t.exRows[0]}</td><td class="n">${eur(e.hpp, l)}</td><td class="n">${eur(e.sec, l)}</td><td class="n">${eur(e.non, l)}</td></tr>
    <tr><td>${t.exRows[1]}</td><td class="n">${eur(e.is, l)}</td><td class="n">${eur(e.is, l)}</td><td class="n">${eur(e.is, l)}</td></tr>
    <tr class="tot"><td>${t.exRows[2]}</td><td class="n">${eur(e.hpp + e.is, l)}</td><td class="n">${eur(e.sec + e.is, l)}</td><td class="n">${eur(e.non + e.is, l)}</td></tr></table>`).join("");
  const src = [...new Set([...USED, ...c.items.flatMap((i) => i.facts)])].map((id) => FACTS[id]).filter((f, i, a) => a.findIndex((x) => x.source_url === f.source_url) === i)
    .map((f) => `<li>${esc(f.source_title)} (${t.srcChecked} ${f.checked_on}): ${esc(f.source_url)}</li>`).join("");
  const loanTax = 200000 * IS_LOAN;
  if (Math.round(loanTax) !== 1200) throw new Error("loan example");
  const pages = [
    `<section class="pg cover"><div class="mark"><i></i><b>Imóveis<br>Portugal</b></div><div><h1>${esc(t.title)}</h1><p class="sub">${esc(t.sub)}</p></div><p class="ed">${esc(t.ed.replace("{c}", c.name[l]))}</p></section>`,
    `<section class="pg"><h2>${esc(t.s1h)}</h2><ul>${[...t.s1, `${c.h[l]}: ${t.s1c}`].map((x) => `<li>${esc(x)}</li>`).join("")}</ul><p class="note">${esc(t.s1note)}</p><div class="box"><h3 style="margin-top:0">${esc(t.paH)}</h3><p class="note">${esc(t.paP)}</p></div>${disc}${foot()}</section>`,
    `<section class="pg"><h2>${esc(c.h[l])}</h2><ul>${c.items.map((i) => `<li>${esc(i.text[l])}</li>`).join("")}</ul><p class="note">${esc(c.note[l])}</p>${disc}${foot()}</section>`,
    `<section class="pg"><h2>${esc(t.imtH)}</h2><p>${esc(t.imtP)}</p><h3>${esc(t.tHpp)}</h3><table><tr>${t.cols.map((c, i) => `<th class="${i ? "n" : ""}">${esc(c)}</th>`).join("")}</tr>${rows(HPP)}<tr><td>${t.above[0]}</td><td class="n">${pct(0.08, l, 0)}</td><td class="n">–</td></tr></table><h3>${esc(t.tSec)}</h3><table><tr>${t.cols.map((c, i) => `<th class="${i ? "n" : ""}">${esc(c)}</th>`).join("")}</tr>${rows(SEC)}<tr><td>${t.above[1]}</td><td class="n">${pct(0.08, l, 0)}</td><td class="n">–</td></tr></table><p class="note">${esc(t.flat)}</p>${foot()}</section>`,
    `<section class="pg"><h2>${esc(t.nrH)}</h2><p>${esc(t.nrP)}</p><ol type="a">${t.nrL.map((x) => `<li>${esc(x)}</li>`).join("")}</ol><p>${esc(t.nrNote)}</p><h2 style="margin-top:10mm">${esc(t.isH)}</h2><ul>${t.isL.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>${disc}${foot()}</section>`,
    `<section class="pg"><h2>${esc(t.exH)}</h2><p class="note">${esc(t.exP)}</p>${ex}${foot()}</section>`,
    `<section class="pg"><h2>${esc(t.crH)}</h2><ul>${t.crL.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><p>${esc(t.crEx)}</p><p class="note">${esc(t.crNote)}</p><h2 style="margin-top:10mm">${esc(t.yrH)}</h2><ul>${t.yrL.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>${disc}${foot()}</section>`,
    `<section class="pg"><h2>${esc(t.stH)}</h2><ol>${t.stL.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>${foot()}</section>`,
    `<section class="pg"><h2>${esc(t.ckH)}</h2><ul class="ck">${t.ckL.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><h2 style="margin-top:10mm">${esc(t.glH)}</h2><dl>${t.gl.map(([a, b]) => `<dt>${a}</dt><dd>${esc(b)}</dd>`).join("")}</dl>${foot()}</section>`,
    `<section class="pg"><h2>${esc(t.adH)}</h2><p>${esc(t.adP)}</p><h2 style="margin-top:10mm">${esc(t.srcH)}</h2><ul class="src">${src}</ul>${disc}${foot()}</section>`,
  ];
  return `<!doctype html><html lang="${l === "pt" ? "pt-PT" : l}"><head><meta charset="utf-8"><title>${esc(t.title)} · ${esc(c.name[l])}</title><style>${css}</style></head><body>${pages.map((p, i) => p.replace("{{n}}", String(i + 1))).join("")}</body></html>`;
}

const browser = await chromium.launch();
for (const ed of EDS) for (const l of ["pt", "en", "fr"] as Lang[]) {
  const file = join(outHtml, `${ed}-${l}.html`);
  writeFileSync(file, html(ed, l));
  const page = await browser.newPage();
  await page.goto(`file://${file}`);
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: join(outPdf, `imoveis-portugal-guia-custos-${ed}-${l}.pdf`), format: "A4", printBackground: true });
  // Screens of every page for review: render each section as an image.
  await page.setViewportSize({ width: 794, height: 1123 });
  const n = await page.locator("section.pg").count();
  for (let i = 0; i < n; i++) await page.locator("section.pg").nth(i).screenshot({ path: join(outHtml, `${ed}-${l}-${i + 1}.png`) });
  await page.close();
  console.log(`${ed}-${l}: ${n} pages`);
}
await browser.close();
