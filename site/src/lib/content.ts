// Reader-facing content that lives outside the site code: FAQ (content/faq/*.yaml), the facts base
// (content/facts/facts.csv) and the disclaimers (content/EDITORIAL_POLICY.md). Read at build time.
// D18: every page exists in pt, en and fr; editions only change country-specific content.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import { config } from "../config";
import { pathFor, HTML_LANG, type EdCode, type Lang } from "../i18n";

// Builds run from site/ (npm run build, Cloudflare root directory "site"); content/ sits next to it.
const contentDir = join(process.cwd(), "..", "content");

type Cat = "lawyer" | "bank" | "tax" | "fx" | "developer";
export type CtaKey = "talk-lawyer" | "talk-bank" | "talk-tax" | "talk-fx" | "talk-developer" | "agency" | "guide";

// ---------- facts ----------
export type Fact = { id: string; claim: string; value: string; source_title: string; source_url: string; checked_on: string };
function parseCsv(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = []; let cell = ""; let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (c !== "\r") cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}
const factRows = parseCsv(readFileSync(join(contentDir, "facts/facts.csv"), "utf8"));
const head = factRows[0];
export const FACTS: Record<string, Fact> = Object.fromEntries(
  factRows.slice(1).filter((r) => r[0]).map((r) => [r[0], Object.fromEntries(head.map((h, i) => [h, r[i]])) as Fact]),
);

// ---------- FAQ: common-{lang}.yaml plus the edition's own {ed}-{lang}.yaml ----------
export type FaqItem = { id: string; q: string; a: string; cta: CtaKey; facts: string[] };
const loadYaml = (name: string) => {
  const f = join(contentDir, "faq", `${name}.yaml`);
  return existsSync(f) ? ((yaml.load(readFileSync(f, "utf8")) || []) as FaqItem[]) : [];
};
// Order: common 1–9, then the edition's own questions, then common 10–12 (market, agency, advice).
export function faqFor(ed: EdCode, lang: Lang): FaqItem[] {
  const common = loadYaml(`common-${lang}`), own = loadYaml(`${ed}-${lang}`);
  for (const it of [...common, ...own]) for (const f of it.facts || []) if (!FACTS[f]) throw new Error(`FAQ ${it.id}: unknown fact ${f}`);
  return [...common.slice(0, 9), ...own, ...common.slice(9)];
}

// ---------- disclaimers (single source: the editorial policy) ----------
const policy = readFileSync(join(contentDir, "EDITORIAL_POLICY.md"), "utf8");
const disclaimerFor = (label: string) => {
  const m = policy.match(new RegExp(`\\*\\*${label.replace(/[()]/g, "\\$&")}:\\*\\*\\s*(.+)`));
  if (!m) throw new Error(`disclaimer ${label} not found in EDITORIAL_POLICY.md`);
  return m[1].trim();
};
export const DISCLAIMER: Record<Lang, string> = { pt: disclaimerFor("PT (LU, CH)"), fr: disclaimerFor("FR"), en: disclaimerFor("EN (future US and Israel editions)") };

// ---------- UI strings ----------
const CATS: Cat[] = ["lawyer", "bank", "tax", "fx", "developer"];
const S = {
  pt: {
    beta: "Beta", skip: "Saltar para o conteúdo", langSwitch: "Língua", nav: { faq: "Perguntas", talk: "Falar com um parceiro", guide: "Guia gratuito" },
    faq: { title: "Perguntas frequentes", lede: "Respostas curtas sobre comprar casa em Portugal a partir do estrangeiro, com a fonte oficial de cada número.", sources: "Fontes", checked: "Verificado a" },
    cta: { lawyer: "Falar com um advogado parceiro", bank: "Falar com um banco parceiro", tax: "Falar com um consultor fiscal parceiro", fx: "Falar com um parceiro de transferências", developer: "Falar com um promotor parceiro", agency: "Pedir contacto da agência parceira", guide: "Descarregar o guia gratuito" },
    talk: {
      title: "Falar com um parceiro",
      lede: "Para a sua situação concreta, deixe-nos a pergunta e a categoria. Encaminhamos o pedido para um parceiro dessa categoria.",
      launch: "Os primeiros parceiros são anunciados no lançamento, a 1 de dezembro de 2026. Até lá, recebemos o seu pedido por email e respondemos quando houver um parceiro na categoria.",
      catsH: "Categorias",
      cats: { lawyer: ["Advogado", "Compra à distância, procuração, contrato-promessa, heranças."], bank: ["Banco", "Crédito à habitação para quem vive fora."], tax: ["Consultor fiscal", "Impostos em Portugal e no país onde vive."], fx: ["Transferências de dinheiro", "Câmbio e envio de valores elevados."], developer: ["Promotor imobiliário", "Empreendimentos novos e em construção."] },
      formH: "O seu pedido", formIntro: "Categoria, país onde vive, a sua pergunta e o seu consentimento. Usamos estes dados apenas para responder e, se o autorizar, para os passar a um parceiro da categoria.",
      buyH: "Comprar ou vender casa?", buyP: "Esses pedidos seguem apenas para a agência imobiliária licenciada parceira.", buyA: "Pedir contacto da agência parceira",
    },
    footer: { faq: "Perguntas frequentes", talk: "Falar com um parceiro", guide: "Guia gratuito" },
  },
  en: {
    beta: "Beta", skip: "Skip to content", langSwitch: "Language", nav: { faq: "FAQ", talk: "Talk to a partner", guide: "Free guide" },
    faq: { title: "Frequently asked questions", lede: "Short answers on buying a home in Portugal from abroad, with the official source for every number.", sources: "Sources", checked: "Checked on" },
    cta: { lawyer: "Talk to a partner lawyer", bank: "Talk to a partner bank", tax: "Talk to a partner tax adviser", fx: "Talk to a money transfer partner", developer: "Talk to a partner developer", agency: "Request a contact from the partner agency", guide: "Download the free guide" },
    talk: {
      title: "Talk to a partner",
      lede: "For your own situation, leave us your question and the category. We pass the request to a partner in that category.",
      launch: "The first partners are announced at launch, on 1 December 2026. Until then, we receive your request by email and reply once there is a partner in the category.",
      catsH: "Categories",
      cats: { lawyer: ["Lawyer", "Buying from abroad, power of attorney, promissory contract, inheritance."], bank: ["Bank", "Mortgages for people living abroad."], tax: ["Tax adviser", "Tax in Portugal and in your country."], fx: ["Money transfer", "Currency exchange and large transfers."], developer: ["Developer", "New and off-plan developments."] },
      formH: "Your request", formIntro: "Category, country where you live, your question and your consent. We use these details only to reply and, if you agree, to pass them to a partner in the category.",
      buyH: "Buying or selling a home?", buyP: "Those requests go only to the licensed partner real-estate agency.", buyA: "Request a contact from the partner agency",
    },
    footer: { faq: "FAQ", talk: "Talk to a partner", guide: "Free guide" },
  },
  fr: {
    beta: "Bêta", skip: "Aller au contenu", langSwitch: "Langue", nav: { faq: "Questions", talk: "Parler à un partenaire", guide: "Guide gratuit" },
    faq: { title: "Questions fréquentes", lede: "Des réponses courtes sur l'achat d'un bien au Portugal depuis l'étranger, avec la source officielle de chaque chiffre.", sources: "Sources", checked: "Vérifié le" },
    cta: { lawyer: "Parler à un avocat partenaire", bank: "Parler à une banque partenaire", tax: "Parler à un conseiller fiscal partenaire", fx: "Parler à un partenaire de transfert", developer: "Parler à un promoteur partenaire", agency: "Demander un contact de l'agence partenaire", guide: "Télécharger le guide gratuit" },
    talk: {
      title: "Parler à un partenaire",
      lede: "Pour votre situation, laissez-nous votre question et la catégorie. Nous transmettons la demande à un partenaire de cette catégorie.",
      launch: "Les premiers partenaires seront annoncés au lancement, le 1er décembre 2026. D'ici là, nous recevons votre demande par email et répondons dès qu'un partenaire est présent dans la catégorie.",
      catsH: "Catégories",
      cats: { lawyer: ["Avocat", "Achat à distance, procuration, compromis, succession."], bank: ["Banque", "Crédit immobilier pour non-résidents."], tax: ["Conseiller fiscal", "Impôts au Portugal et dans votre pays."], fx: ["Transfert d'argent", "Change et transfert de montants élevés."], developer: ["Promoteur", "Programmes neufs et en construction."] },
      formH: "Votre demande", formIntro: "Catégorie, pays de résidence, votre question et votre consentement. Nous utilisons ces données uniquement pour répondre et, si vous l'acceptez, pour les transmettre à un partenaire de la catégorie.",
      buyH: "Acheter ou vendre un bien ?", buyP: "Ces demandes vont uniquement à l'agence immobilière agréée partenaire.", buyA: "Demander un contact de l'agence partenaire",
    },
    footer: { faq: "Questions fréquentes", talk: "Parler à un partenaire", guide: "Guide gratuit" },
  },
};
export const strings = (lang: Lang) => ({ ...S[lang], disclaimer: DISCLAIMER[lang] });
export const categories = (lang: Lang) => CATS.map((c) => ({ id: c, name: S[lang].talk.cats[c][0], desc: S[lang].talk.cats[c][1] }));

// ---------- links for the FAQ next steps ----------
export function cta(lang: Lang, ed: EdCode, key: CtaKey): { href: string; label: string } {
  const s = S[lang].cta;
  if (key.startsWith("talk-")) { const c = key.slice(5) as Cat; return { href: `${pathFor(lang, ed, "talk")}#${c}`, label: s[c] }; }
  if (key === "agency") return { href: pathFor(lang, ed, "buy"), label: s.agency };
  return { href: pathFor(lang, ed, "guide"), label: s.guide };
}

export const fmtDate = (lang: Lang, iso: string) =>
  new Intl.DateTimeFormat(HTML_LANG[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

// ---------- free e-book, one per edition (site/ebooks, built by `npm run ebooks`) ----------
export const EBOOK = {
  file: (lang: Lang, ed: EdCode) => `/ebooks/imoveis-portugal-guia-custos-${ed}-${lang}.pdf`,
  title: { pt: "Quanto custa mesmo comprar casa em Portugal", en: "What it really costs to buy in Portugal", fr: "Ce que coûte vraiment un achat au Portugal" } as Record<Lang, string>,
};
export const ebookLive = config.ebooksLive;
