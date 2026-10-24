// Reader-facing content that lives outside the site code: FAQ (content/faq/*.yaml), the facts base
// (content/facts/facts.csv) and the disclaimers (content/EDITORIAL_POLICY.md). Read at build time.
// Also the "variants": an edition in one language. Switzerland has two (ch = PT, ch-fr = FR).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import yaml from "js-yaml";
import { config } from "../config";
import { EDITIONS, t, type EdCode } from "../i18n";

const contentDir = join(dirname(fileURLToPath(import.meta.url)), "../../../content");

export type Variant = "lu" | "fr" | "ch" | "ch-fr" | "br";
export const VARIANTS: Variant[] = ["lu", "fr", "ch", "ch-fr", "br"];
type Dict = "pt" | "fr" | "br";
type Cat = "lawyer" | "bank" | "tax" | "fx" | "developer";
export type CtaKey = "talk-lawyer" | "talk-bank" | "talk-tax" | "talk-fx" | "talk-developer" | "agency" | "guide";

const V: Record<Variant, { ed: EdCode; lang: string; hreflang: string; dict: Dict; prefix: string; faq: [string, string]; slugs: { faq: string; talk: string } }> = {
  lu: { ed: "lu", lang: "pt-PT", hreflang: "pt-LU", dict: "pt", prefix: "/lu", faq: ["common-pt", "lu"], slugs: { faq: "perguntas-frequentes", talk: "falar-com-um-parceiro" } },
  fr: { ed: "fr", lang: "fr-FR", hreflang: "fr-FR", dict: "fr", prefix: "/fr", faq: ["common-fr", "fr"], slugs: { faq: "questions-frequentes", talk: "parler-a-un-partenaire" } },
  ch: { ed: "ch", lang: "pt-PT", hreflang: "pt-CH", dict: "pt", prefix: "/ch", faq: ["common-pt", "ch-pt"], slugs: { faq: "perguntas-frequentes", talk: "falar-com-um-parceiro" } },
  "ch-fr": { ed: "ch", lang: "fr-CH", hreflang: "fr-CH", dict: "fr", prefix: "/ch/fr", faq: ["common-fr", "ch-fr"], slugs: { faq: "questions-frequentes", talk: "parler-a-un-partenaire" } },
  br: { ed: "br", lang: "pt-BR", hreflang: "pt-BR", dict: "br", prefix: "/br", faq: ["common-br", "br"], slugs: { faq: "perguntas-frequentes", talk: "falar-com-um-parceiro" } },
};
export const variant = (v: Variant) => V[v];
// Shared UI strings from i18n.ts in the variant's language (Swiss French uses the French ones).
export const tFor = (v: Variant) => t(v === "ch-fr" ? "fr" : V[v].ed);

export type PageC = "faq" | "talk";
export const pathC = (v: Variant, page: PageC) => `${V[v].prefix}/${V[v].slugs[page]}/`;
const edHome = (v: Variant) => `/${V[v].ed}/`;
const edPath = (v: Variant, key: "partners" | "buy" | "privacy" | "legal") => `/${V[v].ed}/${EDITIONS[V[v].ed].slugs[key]}/`;

// ---------- facts ----------
export type Fact = { id: string; claim: string; source_title: string; source_url: string; checked_on: string };
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

// ---------- FAQ ----------
export type FaqItem = { id: string; q: string; a: string; cta: CtaKey; facts: string[] };
const loadYaml = (name: string) => (yaml.load(readFileSync(join(contentDir, "faq", `${name}.yaml`), "utf8")) || []) as FaqItem[];
// Order: common 1–9, then the edition's own questions, then common 10–12 (market, agency, advice).
export function faqFor(v: Variant): FaqItem[] {
  const [common, own] = V[v].faq.map(loadYaml);
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
const DISCLAIMER: Record<Dict, string> = { pt: disclaimerFor("PT (LU, CH)"), fr: disclaimerFor("FR"), br: disclaimerFor("PT-BR") };

// ---------- UI strings ----------
const CATS: Cat[] = ["lawyer", "bank", "tax", "fx", "developer"];
const S = {
  pt: {
    beta: "Beta", nav: { faq: "Perguntas", talk: "Falar com um parceiro" }, langSwitch: "Língua",
    faq: {
      title: "Perguntas frequentes",
      lede: "Respostas curtas sobre comprar casa em Portugal a partir do estrangeiro, com a fonte oficial de cada número.",
      sources: "Fontes", checked: "Verificado a",
    },
    cta: { lawyer: "Falar com um advogado parceiro", bank: "Falar com um banco parceiro", tax: "Falar com um consultor fiscal parceiro", fx: "Falar com um parceiro de transferências", developer: "Falar com um promotor parceiro", agency: "Pedir contacto da agência parceira", guide: "Receber o guia gratuito", newsletter: "Receber a newsletter" },
    talk: {
      title: "Falar com um parceiro",
      lede: "Para a sua situação concreta, deixe-nos a pergunta e a categoria. Encaminhamos o pedido para um parceiro dessa categoria.",
      launch: "Os primeiros parceiros são anunciados no lançamento, a 1 de dezembro de 2026. Até lá, recebemos o seu pedido por email e respondemos quando houver um parceiro na categoria.",
      catsH: "Categorias",
      cats: { lawyer: ["Advogado", "Compra à distância, procuração, contrato-promessa, heranças."], bank: ["Banco", "Crédito à habitação para quem vive fora."], tax: ["Consultor fiscal", "Impostos em Portugal e no país onde vive."], fx: ["Transferências de dinheiro", "Câmbio e envio de valores elevados."], developer: ["Promotor imobiliário", "Empreendimentos novos e em construção."] },
      formH: "O seu pedido", formIntro: "Categoria, país onde vive, a sua pergunta e o seu consentimento. Usamos estes dados apenas para responder e, se o autorizar, para os passar a um parceiro da categoria.",
      buyH: "Comprar ou vender casa?", buyP: "Esses pedidos seguem apenas para a agência imobiliária licenciada parceira.", buyA: "Pedir contacto da agência parceira",
    },
    footer: { faq: "Perguntas frequentes", talk: "Falar com um parceiro" },
  },
  br: {
    beta: "Beta", nav: { faq: "Perguntas", talk: "Falar com um parceiro" }, langSwitch: "Idioma",
    faq: {
      title: "Perguntas frequentes",
      lede: "Respostas curtas sobre comprar imóvel em Portugal morando fora, com a fonte oficial de cada número.",
      sources: "Fontes", checked: "Verificado em",
    },
    cta: { lawyer: "Falar com um advogado parceiro", bank: "Falar com um banco parceiro", tax: "Falar com um consultor tributário parceiro", fx: "Falar com um parceiro de câmbio", developer: "Falar com uma incorporadora parceira", agency: "Pedir contato da imobiliária parceira", guide: "Receber o guia gratuito", newsletter: "Receber a newsletter" },
    talk: {
      title: "Falar com um parceiro",
      lede: "Para o seu caso concreto, deixe a pergunta e a categoria. Encaminhamos o pedido para um parceiro dessa categoria.",
      launch: "Os primeiros parceiros serão anunciados no lançamento, em 1º de dezembro de 2026. Até lá, recebemos seu pedido por email e respondemos quando houver um parceiro na categoria.",
      catsH: "Categorias",
      cats: { lawyer: ["Advogado", "Compra à distância, procuração, contrato-promessa, herança."], bank: ["Banco", "Financiamento para quem mora fora."], tax: ["Consultor tributário", "Impostos em Portugal e no Brasil."], fx: ["Câmbio e remessas", "Envio de valores altos do Brasil para Portugal."], developer: ["Incorporadora", "Empreendimentos novos e na planta."] },
      formH: "Seu pedido", formIntro: "Categoria, país onde você mora, sua pergunta e seu consentimento. Usamos esses dados só para responder e, se você autorizar, para passá-los a um parceiro da categoria.",
      buyH: "Comprar ou vender imóvel?", buyP: "Esses pedidos vão apenas para a imobiliária licenciada parceira.", buyA: "Pedir contato da imobiliária parceira",
    },
    footer: { faq: "Perguntas frequentes", talk: "Falar com um parceiro" },
  },
  fr: {
    beta: "Bêta", nav: { faq: "Questions", talk: "Parler à un partenaire" }, langSwitch: "Langue",
    faq: {
      title: "Questions fréquentes",
      lede: "Des réponses courtes sur l'achat d'un bien au Portugal depuis l'étranger, avec la source officielle de chaque chiffre.",
      sources: "Sources", checked: "Vérifié le",
    },
    cta: { lawyer: "Parler à un avocat partenaire", bank: "Parler à une banque partenaire", tax: "Parler à un conseiller fiscal partenaire", fx: "Parler à un partenaire de transfert", developer: "Parler à un promoteur partenaire", agency: "Demander un contact de l'agence partenaire", guide: "Recevoir le guide gratuit", newsletter: "Recevoir la newsletter" },
    talk: {
      title: "Parler à un partenaire",
      lede: "Pour votre situation, laissez-nous votre question et la catégorie. Nous transmettons la demande à un partenaire de cette catégorie.",
      launch: "Les premiers partenaires seront annoncés au lancement, le 1er décembre 2026. D'ici là, nous recevons votre demande par email et répondons dès qu'un partenaire est présent dans la catégorie.",
      catsH: "Catégories",
      cats: { lawyer: ["Avocat", "Achat à distance, procuration, compromis, succession."], bank: ["Banque", "Crédit immobilier pour non-résidents."], tax: ["Conseiller fiscal", "Impôts au Portugal et dans votre pays."], fx: ["Transfert d'argent", "Change et transfert de montants élevés."], developer: ["Promoteur", "Programmes neufs et en construction."] },
      formH: "Votre demande", formIntro: "Catégorie, pays de résidence, votre question et votre consentement. Nous utilisons ces données uniquement pour répondre et, si vous l'acceptez, pour les transmettre à un partenaire de la catégorie.",
      buyH: "Acheter ou vendre un bien ?", buyP: "Ces demandes vont uniquement à l'agence immobilière agréée partenaire.", buyA: "Demander un contact de l'agence partenaire",
    },
    footer: { faq: "Questions fréquentes", talk: "Parler à un partenaire" },
  },
};
export const strings = (v: Variant) => ({ ...S[V[v].dict], disclaimer: DISCLAIMER[V[v].dict] });
export const categories = (v: Variant) => CATS.map((c) => ({ id: c, name: S[V[v].dict].talk.cats[c][0], desc: S[V[v].dict].talk.cats[c][1] }));

// ---------- links for the FAQ next steps ----------
export function cta(v: Variant, key: CtaKey): { href: string; label: string } {
  const s = S[V[v].dict].cta;
  if (key.startsWith("talk-")) { const c = key.slice(5) as Cat; return { href: `${pathC(v, "talk")}#${c}`, label: s[c] }; }
  if (key === "agency") return { href: edPath(v, "buy"), label: s.agency };
  // The e-book pages come with prompt 04; until then the guide link goes to the newsletter signup.
  return config.ebooksLive ? { href: `${edHome(v)}#guide`, label: s.guide } : { href: `${edHome(v)}#signup`, label: s.newsletter };
}
export const links = (v: Variant) => ({
  home: edHome(v), partners: edPath(v, "partners"), buy: edPath(v, "buy"), privacy: edPath(v, "privacy"), legal: edPath(v, "legal"),
  faq: pathC(v, "faq"), talk: pathC(v, "talk"),
});

export const fmtDate = (v: Variant, iso: string) =>
  new Intl.DateTimeFormat(V[v].lang, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
