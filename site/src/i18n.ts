import { config } from "./config";

// D18: the whole site is in three languages; editions keep only country content and sponsors.
export type Lang = "pt" | "en" | "fr";
export const LANGS: Lang[] = ["pt", "en", "fr"];
export const HTML_LANG: Record<Lang, string> = { pt: "pt-PT", en: "en", fr: "fr" };
export const LANG_NAME: Record<Lang, string> = { pt: "Português", en: "English", fr: "Français" };

export type EdCode = "lu" | "fr" | "ch" | "br" | "us" | "il";
export type PageKey = "partners" | "buy" | "privacy" | "legal" | "faq" | "talk" | "guide" | "how";

// URL slugs follow the language, not the edition: /{lang}/{edition}/{slug}/
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  pt: { partners: "parceiros", buy: "comprar", privacy: "privacidade", legal: "aviso-legal", faq: "perguntas-frequentes", talk: "falar-com-um-parceiro", guide: "guia-gratuito", how: "como-trabalhamos" },
  en: { partners: "partners", buy: "buy", privacy: "privacy", legal: "legal-notice", faq: "faq", talk: "talk-to-a-partner", guide: "free-guide", how: "how-we-work" },
  fr: { partners: "partenaires", buy: "acheter", privacy: "confidentialite", legal: "mentions-legales", faq: "questions-frequentes", talk: "parler-a-un-partenaire", guide: "guide-gratuit", how: "notre-methode" },
};
export const pathFor = (lang: Lang, ed: EdCode, page: PageKey | "home") =>
  page === "home" ? `/${lang}/${ed}/` : `/${lang}/${ed}/${SLUGS[lang][page]}/`;

type Fact = { big: string; text: string; source: string; url: string };
type L3<T> = Record<Lang, T>;

const SRC = {
  lu: "https://www.theportugalnews.com/br/noticias/2024-11-14/onde-estao-as-maiores-comunidades-portuguesas-fora-de-portugal/93543",
  emig: "https://www.rtp.pt/noticias/economia/cerca-de-60000-portugueses-emigraram-em-2022-suica-volta-a-ser-principal-destino_n1546782",
  ine_nat: "https://www.idealista.pt/news/node/74594",
  ine_dom: "https://www.idealista.pt/news/node/74603",
  ine_price: "https://www.noticiasaominuto.com/economia/2960456/precos-da-habitacao-com-aumento-recorde-de-17-6-em-2025",
  // From content/facts/facts.csv (us-fbar, pt-imt-nonresident-flat).
  irs_fbar: "https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements",
  cimt17: "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cimt/Pages/cimt17.aspx",
};

export const EDITIONS: Record<EdCode, {
  code: EdCode; domain: string; defaultLang: Lang;
  name: L3<string>; hero: L3<string>; from: L3<string>; topics: L3<string[]>; fact: L3<Fact>;
}> = {
  lu: {
    code: "lu", domain: "imoveisportugal.lu", defaultLang: "pt",
    name: { pt: "Luxemburgo", en: "Luxembourg", fr: "Luxembourg" },
    hero: { pt: "Comprar casa em Portugal a partir do Luxemburgo, com os custos reais.", en: "Buying a home in Portugal from Luxembourg, with the real costs.", fr: "Acheter au Portugal depuis le Luxembourg, avec les vrais chiffres." },
    from: { pt: "a partir do Luxemburgo", en: "from Luxembourg", fr: "depuis le Luxembourg" },
    topics: {
      pt: ["Crédito no Luxemburgo ou em Portugal, impostos dos dois lados e o que muda no regresso."],
      en: ["Mortgages in Luxembourg or in Portugal, tax on both sides and what changes when you move back."],
      fr: ["Crédit au Luxembourg ou au Portugal, fiscalité des deux côtés et ce qui change au retour."],
    },
    fact: {
      pt: { big: "92 000", text: "pessoas com nacionalidade portuguesa vivem no Luxemburgo.", source: "OCDE, via The Portugal News, 2024", url: SRC.lu },
      en: { big: "92,000", text: "people with Portuguese nationality live in Luxembourg.", source: "OECD, via The Portugal News, 2024", url: SRC.lu },
      fr: { big: "92 000", text: "personnes de nationalité portugaise vivent au Luxembourg.", source: "OCDE, via The Portugal News, 2024", url: SRC.lu },
    },
  },
  fr: {
    code: "fr", domain: "imoveisportugal.fr", defaultLang: "fr",
    name: { pt: "França", en: "France", fr: "France" },
    hero: { pt: "Comprar casa em Portugal a partir de França, com os custos reais.", en: "Buying a home in Portugal from France, with the real costs.", fr: "Acheter au Portugal depuis la France, avec les vrais chiffres." },
    from: { pt: "a partir de França", en: "from France", fr: "depuis la France" },
    topics: {
      pt: ["Crédito em França ou em Portugal, impostos dos dois lados, heranças e casas de família."],
      en: ["Mortgages in France or in Portugal, tax on both sides, inheritance and family homes."],
      fr: ["Crédit en France ou au Portugal, fiscalité des deux côtés, successions et maisons de famille."],
    },
    fact: {
      pt: { big: "573 000", text: "pessoas nascidas em Portugal vivem em França, a maior comunidade portuguesa do mundo.", source: "Observatório da Emigração, relatório 2022, via RTP", url: SRC.emig },
      en: { big: "573,000", text: "people born in Portugal live in France, the largest Portuguese community in the world.", source: "Observatório da Emigração, 2022 report, via RTP", url: SRC.emig },
      fr: { big: "573 000", text: "personnes nées au Portugal vivent en France, la plus grande communauté portugaise au monde.", source: "Observatório da Emigração, rapport 2022, via RTP", url: SRC.emig },
    },
  },
  ch: {
    code: "ch", domain: "imoveisportugal.ch", defaultLang: "pt",
    name: { pt: "Suíça", en: "Switzerland", fr: "Suisse" },
    hero: { pt: "Comprar casa em Portugal a partir da Suíça, com os custos reais.", en: "Buying a home in Portugal from Switzerland, with the real costs.", fr: "Acheter au Portugal depuis la Suisse, avec les vrais chiffres." },
    from: { pt: "a partir da Suíça", en: "from Switzerland", fr: "depuis la Suisse" },
    topics: {
      pt: ["Usar o 2.º pilar para comprar casa, câmbio do franco, impostos e o que muda na reforma em Portugal."],
      en: ["Using your 2nd pillar to buy a home, francs to euros, tax and what changes when you retire in Portugal."],
      fr: ["Utiliser son 2e pilier pour acheter, change du franc, fiscalité et ce qui change à la retraite au Portugal."],
    },
    fact: {
      pt: { big: "204 000", text: "pessoas nascidas em Portugal vivem na Suíça.", source: "Observatório da Emigração, relatório 2022, via RTP", url: SRC.emig },
      en: { big: "204,000", text: "people born in Portugal live in Switzerland.", source: "Observatório da Emigração, 2022 report, via RTP", url: SRC.emig },
      fr: { big: "204 000", text: "personnes nées au Portugal vivent en Suisse.", source: "Observatório da Emigração, rapport 2022, via RTP", url: SRC.emig },
    },
  },
  br: {
    code: "br", domain: "imoveisportugal.com.br", defaultLang: "pt",
    name: { pt: "Brasil", en: "Brazil", fr: "Brésil" },
    hero: { pt: "Comprar casa em Portugal a partir do Brasil, com os custos reais.", en: "Buying a home in Portugal from Brazil, with the real costs.", fr: "Acheter au Portugal depuis le Brésil, avec les vrais chiffres." },
    from: { pt: "a partir do Brasil", en: "from Brazil", fr: "depuis le Brésil" },
    topics: {
      pt: ["Vistos e residência, câmbio do real, crédito em Portugal e impostos para quem vem do Brasil."],
      en: ["Visas and residence, reais to euros, Portuguese mortgages and tax for buyers from Brazil."],
      fr: ["Visas et résidence, change du real, crédit au Portugal et fiscalité pour les acheteurs venant du Brésil."],
    },
    fact: {
      pt: { big: "9 808", text: "casas foram compradas em Portugal em 2025 por pessoas nascidas no Brasil, mais do que qualquer outra nacionalidade estrangeira.", source: "INE, via idealista/news, 2026", url: SRC.ine_nat },
      en: { big: "9,808", text: "homes were bought in Portugal in 2025 by people born in Brazil, more than any other foreign nationality.", source: "INE, via idealista/news, 2026", url: SRC.ine_nat },
      fr: { big: "9 808", text: "logements ont été achetés au Portugal en 2025 par des personnes nées au Brésil, plus que toute autre nationalité étrangère.", source: "INE, via idealista/news, 2026", url: SRC.ine_nat },
    },
  },
  // USA and Israel (prompt 05, D13): Imóveis Portugal brand on country domains; domains not chosen yet
  // (ops/DOMAINS_US_IL.md), so the two below are placeholders.
  us: {
    code: "us", domain: "imoveisportugal.us", defaultLang: "en",
    name: { pt: "Estados Unidos", en: "United States", fr: "États-Unis" },
    hero: { pt: "Comprar casa em Portugal a partir dos Estados Unidos, com os custos reais.", en: "Buying a home in Portugal from the United States, with the real costs.", fr: "Acheter au Portugal depuis les États-Unis, avec les vrais chiffres." },
    from: { pt: "a partir dos Estados Unidos", en: "from the United States", fr: "depuis les États-Unis" },
    topics: {
      pt: ["Crédito em Portugal para não residentes, dólares para euros, vistos de residência e o que os Estados Unidos pedem a quem tem bens fora (FBAR, formulário 8938)."],
      en: ["Portuguese mortgages for non-residents, dollars to euros, residence visas and US reporting on assets abroad (FBAR, Form 8938)."],
      fr: ["Crédit au Portugal pour non-résidents, change du dollar, visas de résidence et déclarations américaines sur les avoirs à l'étranger (FBAR, formulaire 8938)."],
    },
    fact: {
      pt: { big: "10 000 USD", text: "em contas no estrangeiro, em algum momento do ano: acima deste valor, os US persons entregam o FBAR.", source: "IRS, Comparison of Form 8938 and FBAR requirements", url: SRC.irs_fbar },
      en: { big: "$10,000", text: "in foreign accounts at any time in the year: above this, US persons file an FBAR.", source: "IRS, Comparison of Form 8938 and FBAR requirements", url: SRC.irs_fbar },
      fr: { big: "10 000 USD", text: "sur des comptes à l'étranger, à un moment de l'année : au-delà, les US persons déposent un FBAR.", source: "IRS, Comparison of Form 8938 and FBAR requirements", url: SRC.irs_fbar },
    },
  },
  il: {
    code: "il", domain: "imoveisportugal.co.il", defaultLang: "en",
    name: { pt: "Israel", en: "Israel", fr: "Israël" },
    hero: { pt: "Comprar casa em Portugal a partir de Israel, com os custos reais.", en: "Buying a home in Portugal from Israel, with the real costs.", fr: "Acheter au Portugal depuis Israël, avec les vrais chiffres." },
    from: { pt: "a partir de Israel", en: "from Israel", fr: "depuis Israël" },
    topics: {
      pt: ["Crédito em Portugal para não residentes, shekels para euros, a convenção fiscal entre Portugal e Israel e empreendimentos novos."],
      en: ["Portuguese mortgages for non-residents, shekels to euros, the Portugal–Israel tax treaty and new developments."],
      fr: ["Crédit au Portugal pour non-résidents, change du shekel, la convention fiscale entre le Portugal et Israël et les programmes neufs."],
    },
    fact: {
      pt: { big: "7,5%", text: "taxa única de IMT, desde maio de 2026, para quem compra casa sem ser residente fiscal em Portugal, salvo exceções.", source: "Código do IMT, art. 17.º, n.º 10 (Decreto-Lei 97/2026)", url: SRC.cimt17 },
      en: { big: "7.5%", text: "flat transfer tax (IMT) since May 2026 for buyers who are not Portuguese tax residents, with exceptions.", source: "IMT Code, art. 17(10) (Decree-Law 97/2026)", url: SRC.cimt17 },
      fr: { big: "7,5 %", text: "taux unique d'IMT depuis mai 2026 pour les acheteurs non-résidents fiscaux au Portugal, sauf exceptions.", source: "Code de l'IMT, art. 17, n° 10 (décret-loi 97/2026)", url: SRC.cimt17 },
    },
  },
};

export const ED_ORDER: EdCode[] = ["lu", "fr", "ch", "br", "us", "il"];

// Thousands: space in PT and FR, comma in EN.
const eur = (n: number, lang: Lang) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "en" ? "," : " ") + " €";

// Page text per edition and language (prompt 09): written natively in European Portuguese, French for a
// Luxembourg or Paris reader, and American English. Terms follow content/GLOSSARY.md.
export function t(ed: EdCode, lang: Lang) {
  const ED = EDITIONS[ed];
  const p = config.prices, a = config.agency;
  const left = config.foundingSlotsLeft, total = config.foundingSlotsTotal;
  // USA and Israel readers move to Portugal rather than back.
  const away = ed === "us" || ed === "il";
  const e = (n: number) => eur(n, lang);

  if (lang === "en") return {
    lede: `One free newsletter a week: selected homes, what buying really costs, mortgages, taxes and ${away ? "moving to Portugal" : "moving back"}. First issue on December 1, 2026.`,
    weeklyTitle: "Every week",
    weekly: ["Homes for sale, selected by region and budget.", "The full cost of each purchase: transfer tax (IMT), stamp duty, deed and registration.", ...ED.topics.en, "Answers from partner lawyers, banks and our partner agency, always labeled as such."],
    formPending: (email: string) => (email ? `This form is being set up. Write to us at ${email}.` : "This form will be available soon."),
    agencyNote: "Our partner agency, and the only real-estate agency on the platform. Every request to buy or sell a home goes to it. It pays a flat annual sponsorship, never a fee per lead.",
    partners: {
      title: "For partners",
      h1: "Reach people who live abroad and are getting ready to buy in Portugal.",
      lede: "Imóveis Portugal is a weekly guide with editions for Luxembourg, France, Switzerland, Brazil, the United States and Israel, in Portuguese, English and French. It launches on December 1, 2026.",
      readersH: "Who reads us",
      readersP: "Portuguese families in Luxembourg, France and Switzerland planning a vacation home, a move back or retirement, and Brazilians, Americans and Israelis preparing a purchase to live, retire or invest. They read because they have a plan.",
      foundingH: "Founding partner",
      foundingP: "40% off the first year, and the same price locked in for the second. Ten places, one partner per category.",
      slots: `Places available: ${left} of ${total}`,
      whyNowP: "Founding partners appear from the first issue on December 1, just before the holidays, when many families abroad are in Portugal and visiting homes.",
      tableH: "Packages",
      cols: ["Package", "What's included", "Founding price (year 1)", "Standard price"],
      rows: [
        ["Gold", "Category exclusivity across all editions. In every newsletter, one sponsored article per month per edition, a Q&A column and a monthly report.", e(p.gold.founding), `${e(p.gold.list)} / year`],
        ["Silver", "One edition of your choice. In the newsletter every two weeks, one sponsored article per quarter, a partner directory listing and a monthly report.", e(p.silver.founding), `${e(p.silver.list)} / year`],
        ["Bronze", "One edition. A directory listing with your logo and one mention a month in the newsletter.", e(p.bronze.founding), `${e(p.bronze.list)} / year`],
        ["Development campaign", "For developers: one project featured in the editions you choose, with newsletter, article and social media.", `from ${e(p.campaignFrom)}`, "—"],
      ],
      vat: "Prices exclude VAT.",
      rulesH: "Our rules",
      rules: ["All sponsored content is labeled as such.", "We publish no promises of returns.", "Every partner pays a flat fee, never a fee per lead.", "Buying requests go only to our licensed partner agency."],
      reportH: "What you get every month",
      reportP: "One report per edition: subscribers, opens, clicks and contact requests linked to your presence.",
      ctaH: "Let's talk for 15 minutes",
      book: "Book a call",
      formIntro: "Leave your details and we'll reply within one business day.",
    },
    buy: {
      title: "Find a home",
      h1: "Tell us what home you're looking for in Portugal.",
      lede: `Your request goes to our partner agency, ${a.name} (AMI license ${a.ami}), a licensed real-estate broker, which contacts you with options. It's free for you.`,
      stepsH: "What happens next",
      steps: ["You fill in the form, in two minutes.", "The partner agency contacts you within two business days.", "If you'd like, it sets up viewings for when you're in Portugal."],
      small: "Your details are used only for this request and shared only with the partner agency, with your consent.",
    },
    privacy: privacyEN(),
    legal: legalEN(),
  };

  if (lang === "fr") return {
    lede: `Une newsletter gratuite chaque semaine : des biens choisis, le vrai coût d'un achat, le crédit, la fiscalité et ${away ? "l'installation au Portugal" : "le retour"}. Premier numéro le 1er décembre 2026.`,
    weeklyTitle: "Chaque semaine",
    weekly: ["Des biens à vendre, choisis par région et par budget.", "Le coût complet de chaque achat : IMT, droit de timbre, acte et enregistrement.", ...ED.topics.fr, "Les réponses d'avocats et de banques partenaires et de notre agence partenaire, toujours signalées comme telles."],
    formPending: (email: string) => (email ? `Formulaire en cours d'installation. Écrivez-nous à ${email}.` : "Formulaire disponible très bientôt."),
    agencyNote: "Notre agence partenaire, la seule agence immobilière de la plateforme. Toute demande d'achat ou de vente lui est transmise. Elle verse un parrainage annuel forfaitaire, jamais une commission par contact.",
    partners: {
      title: "Partenaires",
      h1: "Touchez ceux qui vivent à l'étranger et préparent un achat au Portugal.",
      lede: "Imóveis Portugal est un guide hebdomadaire en six éditions (Luxembourg, France, Suisse, Brésil, États-Unis, Israël), en portugais, anglais et français. Lancement le 1er décembre 2026.",
      readersH: "Nos lecteurs",
      readersP: "Des familles portugaises installées au Luxembourg, en France et en Suisse qui préparent une résidence secondaire, un retour ou leur retraite, et des Brésiliens, Américains et Israéliens qui préparent un achat pour s'installer ou investir. Ils lisent parce qu'ils ont un projet.",
      foundingH: "Partenaire fondateur",
      foundingP: "40 % de remise la première année, et le même prix garanti la deuxième. Dix places, un seul partenaire par catégorie.",
      slots: `Places disponibles : ${left} sur ${total}`,
      whyNowP: "Les partenaires fondateurs figurent dès le premier numéro, le 1er décembre, juste avant les fêtes, quand beaucoup de familles de l'étranger sont au Portugal et visitent des biens.",
      tableH: "Formules",
      cols: ["Formule", "Ce qui est inclus", "Prix fondateur (année 1)", "Prix normal"],
      rows: [
        ["Gold", "Exclusivité de catégorie sur toutes les éditions. Présence dans chaque newsletter, un article sponsorisé par mois et par édition, une rubrique questions-réponses et un rapport mensuel.", e(p.gold.founding), `${e(p.gold.list)} / an`],
        ["Silver", "Une édition au choix. Présence dans la newsletter tous les quinze jours, un article sponsorisé par trimestre, une fiche dans l'annuaire des partenaires et un rapport mensuel.", e(p.silver.founding), `${e(p.silver.list)} / an`],
        ["Bronze", "Une édition. Une fiche avec logo dans l'annuaire et une mention par mois dans la newsletter.", e(p.bronze.founding), `${e(p.bronze.list)} / an`],
        ["Campagne promoteur", "Pour les promoteurs : un programme mis en avant dans les éditions choisies, avec newsletter, article et réseaux sociaux.", `à partir de ${e(p.campaignFrom)}`, "—"],
      ],
      vat: "Prix hors TVA.",
      rulesH: "Nos règles",
      rules: ["Tout contenu sponsorisé est signalé comme tel.", "Nous ne publions aucune promesse de rendement.", "Chaque partenaire paie un forfait, jamais une commission par contact.", "Les demandes d'achat vont uniquement à notre agence partenaire agréée."],
      reportH: "Ce que vous recevez chaque mois",
      reportP: "Un rapport par édition : abonnés, ouvertures, clics et demandes de contact liés à votre présence.",
      ctaH: "Parlons 15 minutes",
      book: "Réserver un appel",
      formIntro: "Laissez vos coordonnées : nous répondons sous un jour ouvré.",
    },
    buy: {
      title: "Trouver un bien",
      h1: "Dites-nous quel bien vous cherchez au Portugal.",
      lede: `Votre demande part chez notre agence partenaire, ${a.name} (licence AMI ${a.ami}), intermédiaire immobilier agréé, qui vous contacte avec des propositions. C'est gratuit pour vous.`,
      stepsH: "Ensuite",
      steps: ["Vous remplissez le formulaire, en deux minutes.", "L'agence partenaire vous contacte sous deux jours ouvrés.", "Si vous le souhaitez, elle organise des visites pendant votre séjour au Portugal."],
      small: "Vos données servent uniquement à cette demande et ne sont transmises qu'à l'agence partenaire, avec votre accord.",
    },
    privacy: privacyFR(),
    legal: legalFR(),
  };

  return {
    lede: `Uma newsletter gratuita por semana: casas escolhidas, quanto custa mesmo comprar, crédito, impostos e o que muda ${away ? "quando se muda para Portugal" : "no regresso"}. Primeiro número a 1 de dezembro de 2026.`,
    weeklyTitle: "Todas as semanas",
    weekly: ["Casas à venda, escolhidas por região e orçamento.", "O custo completo de cada compra: IMT, imposto do selo, escritura e registo.", ...ED.topics.pt, "Respostas de advogados e bancos parceiros e da nossa agência parceira, sempre identificadas."],
    formPending: (email: string) => (email ? `Formulário em configuração. Escreva-nos para ${email}.` : "Formulário disponível muito em breve."),
    agencyNote: "A nossa agência parceira e a única agência imobiliária da plataforma. Todos os pedidos de compra ou venda de casa seguem para ela. Paga um patrocínio anual fixo, nunca uma comissão por contacto.",
    partners: {
      title: "Para parceiros",
      h1: "Chegue a quem vive fora e está a preparar a compra de casa em Portugal.",
      lede: "O Imóveis Portugal é um guia semanal com seis edições (Luxemburgo, França, Suíça, Brasil, Estados Unidos e Israel), em português, inglês e francês. Lançamos a 1 de dezembro de 2026.",
      readersH: "Quem nos lê",
      readersP: "Famílias portuguesas no Luxemburgo, em França e na Suíça que preparam uma casa de férias, o regresso ou a reforma, e brasileiros, americanos e israelitas que preparam uma compra para viver, reformar-se ou investir. Leem porque têm um projeto.",
      foundingH: "Parceiro fundador",
      foundingP: "40% de desconto no primeiro ano e o mesmo preço garantido no segundo. Dez lugares, um só parceiro por categoria.",
      slots: `Lugares disponíveis: ${left} de ${total}`,
      whyNowP: "Os parceiros fundadores aparecem desde o primeiro número, a 1 de dezembro, antes do Natal, quando muitas famílias emigradas estão em Portugal e visitam casas.",
      tableH: "Pacotes",
      cols: ["Pacote", "O que inclui", "Preço fundador (ano 1)", "Preço normal"],
      rows: [
        ["Gold", "Exclusivo na sua categoria em todas as edições. Presença em todas as newsletters, um artigo patrocinado por mês em cada edição, uma coluna de perguntas e respostas e um relatório mensal.", e(p.gold.founding), `${e(p.gold.list)} / ano`],
        ["Silver", "Uma edição à escolha. Presença na newsletter de 15 em 15 dias, um artigo patrocinado por trimestre, entrada no diretório de parceiros e relatório mensal.", e(p.silver.founding), `${e(p.silver.list)} / ano`],
        ["Bronze", "Uma edição. Entrada com logótipo no diretório de parceiros e uma menção por mês na newsletter.", e(p.bronze.founding), `${e(p.bronze.list)} / ano`],
        ["Campanha de empreendimento", "Para promotores: um empreendimento em destaque nas edições escolhidas, com newsletter, artigo e redes sociais.", `a partir de ${e(p.campaignFrom)}`, "—"],
      ],
      vat: "Valores sem IVA.",
      rulesH: "As nossas regras",
      rules: ["Todo o conteúdo patrocinado é identificado como tal.", "Não publicamos promessas de rendimento.", "Cada parceiro paga um valor fixo, nunca uma comissão por contacto.", "Os pedidos de compra seguem apenas para a nossa agência parceira licenciada."],
      reportH: "O que recebe todos os meses",
      reportP: "Um relatório por edição: subscritores, aberturas, cliques e pedidos de contacto ligados à sua presença.",
      ctaH: "Falemos 15 minutos",
      book: "Marcar chamada",
      formIntro: "Deixe os seus dados: respondemos num dia útil.",
    },
    buy: {
      title: "Encontrar casa",
      h1: "Diga-nos que casa procura em Portugal.",
      lede: `O seu pedido segue para a nossa agência parceira, a ${a.name} (AMI ${a.ami}), mediadora imobiliária licenciada, que o contacta com opções. Não paga nada por isso.`,
      stepsH: "A seguir",
      steps: ["Preenche o formulário, em dois minutos.", "A agência parceira contacta-o em até dois dias úteis.", "Se quiser, marca visitas para quando estiver em Portugal."],
      small: "Os seus dados são usados apenas para este pedido e partilhados só com a agência parceira, com o seu consentimento.",
    },
    privacy: privacyPT(),
    legal: legalPT(),
  };
}

// ---------- Legal drafts (to be reviewed; placeholders filled from config) ----------
const ph = (v: string, label: string) => v || `[${label}]`;
const processors = {
  pt: "beehiiv (envio da newsletter, EUA, com garantias adequadas para a transferência), Tally (formulários, UE), Cloudflare (alojamento e estatísticas sem cookies) e Cal.com (marcação de chamadas)",
  en: "beehiiv (newsletter, USA, with appropriate safeguards for the transfer), Tally (forms, EU), Cloudflare (hosting and cookie-free statistics) and Cal.com (call booking)",
  fr: "beehiiv (envoi de la newsletter, États-Unis, avec garanties appropriées pour le transfert), Tally (formulaires, UE), Cloudflare (hébergement et statistiques sans cookies) et Cal.com (prise de rendez-vous)",
};

function privacyPT() {
  const e = config.entity, a = config.agency;
  return {
    title: "Privacidade", h1: "Política de privacidade",
    draft: "Rascunho. Os campos entre parênteses retos são preenchidos quando a entidade estiver definida.",
    sections: [
      ["Responsável", `${ph(e.name, "Entidade")}, ${ph(e.address, "Morada")}. Contacto: ${ph(config.contactEmail, "email")}.`],
      ["Que dados tratamos e porquê", `Newsletter: nome próprio e email, com o seu consentimento (RGPD, art. 6.º, n.º 1, al. a)), com dupla confirmação. Pedidos de compra: nome, contactos e o que procura, com o seu consentimento, para os enviarmos à agência parceira ${a.name} (AMI ${a.ami}). Pedidos de parceria: dados profissionais, para responder ao seu pedido (art. 6.º, n.º 1, al. b)). Pedidos a parceiros: categoria, país, pergunta e contacto, com o seu consentimento, para responder e, se o autorizar, para os passar a um parceiro da categoria escolhida.`],
      ["Quem recebe os dados", `A agência parceira, só para pedidos de compra. O parceiro da categoria escolhida, só para pedidos a parceiros e com o seu consentimento. Prestadores que tratam dados por nossa conta: ${processors.pt}.`],
      ["Durante quanto tempo", "Newsletter: até cancelar a subscrição. Pedidos de compra e pedidos a parceiros: 12 meses. Pedidos de parceria: durante a relação comercial e o prazo legal aplicável."],
      ["Os seus direitos", "Acesso, retificação, apagamento, oposição, limitação, portabilidade e retirada do consentimento a qualquer momento, escrevendo para o contacto acima. Pode também apresentar queixa à autoridade de proteção de dados do seu país (por exemplo, a CNPD em Portugal ou no Luxemburgo)."],
      ["Cookies", "Não usamos cookies de publicidade nem de estatística. A língua e a edição que escolhe ficam guardadas apenas no seu navegador (armazenamento local), sem cookies. Os formulários incorporados podem usar cookies técnicos do respetivo serviço."],
    ],
  };
}
function legalPT() {
  const e = config.entity;
  return {
    title: "Aviso legal", h1: "Aviso legal",
    draft: "Rascunho. Os campos entre parênteses retos são preenchidos quando a entidade estiver definida.",
    sections: [
      ["Editor", `${ph(e.name, "Entidade")}, ${ph(e.address, "Morada")}. Registo: ${ph(e.register, "n.º de registo")}. IVA: ${ph(e.vat, "n.º de IVA")}. Contacto: ${ph(config.contactEmail, "email")}.`],
      ["Alojamento", "Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, EUA."],
      ["Conteúdo", "Os artigos são informativos e não substituem aconselhamento jurídico, fiscal ou financeiro. O conteúdo patrocinado é sempre identificado."],
      ["Agência parceira", `${config.agency.name}, AMI ${config.agency.ami}, mediadora imobiliária licenciada. O Imóveis Portugal não faz mediação imobiliária.`],
    ],
  };
}
function privacyFR() {
  const e = config.entity, a = config.agency;
  return {
    title: "Confidentialité", h1: "Politique de confidentialité",
    draft: "Brouillon. Les champs entre crochets seront complétés une fois l'entité définie.",
    sections: [
      ["Responsable du traitement", `${ph(e.name, "Entité")}, ${ph(e.address, "Adresse")}. Contact : ${ph(config.contactEmail, "e-mail")}.`],
      ["Données traitées et finalités", `Newsletter : prénom et e-mail, avec votre consentement (RGPD, art. 6, par. 1, a)) et double confirmation. Demandes d'achat : nom, coordonnées et critères de recherche, avec votre consentement, transmis à l'agence partenaire ${a.name} (AMI ${a.ami}). Demandes de partenariat : données professionnelles, pour répondre à votre demande (art. 6, par. 1, b)). Demandes à un partenaire : catégorie, pays, question et coordonnées, avec votre consentement, pour répondre et, si vous l'acceptez, pour les transmettre à un partenaire de la catégorie choisie.`],
      ["Destinataires", `L'agence partenaire, uniquement pour les demandes d'achat. Le partenaire de la catégorie choisie, uniquement pour les demandes à un partenaire et avec votre accord. Sous-traitants : ${processors.fr}.`],
      ["Durée de conservation", "Newsletter : jusqu'à votre désinscription. Demandes d'achat et demandes à un partenaire : 12 mois. Demandes de partenariat : pendant la relation commerciale et la durée légale applicable."],
      ["Vos droits", "Accès, rectification, effacement, opposition, limitation, portabilité et retrait du consentement à tout moment, en écrivant au contact ci-dessus. Vous pouvez aussi saisir l'autorité de protection des données de votre pays (CNIL en France, CNPD au Luxembourg, PFPDT en Suisse)."],
      ["Cookies", "Aucun cookie publicitaire ni de mesure d'audience. La langue et l'édition choisies sont enregistrées uniquement dans votre navigateur (stockage local), sans cookie. Les formulaires intégrés peuvent utiliser des cookies techniques de leur service."],
    ],
  };
}
function legalFR() {
  const e = config.entity;
  return {
    title: "Mentions légales", h1: "Mentions légales",
    draft: "Brouillon. Les champs entre crochets seront complétés une fois l'entité définie.",
    sections: [
      ["Éditeur", `${ph(e.name, "Entité")}, ${ph(e.address, "Adresse")}. Immatriculation : ${ph(e.register, "n° d'immatriculation")}. TVA : ${ph(e.vat, "n° de TVA")}. Contact : ${ph(config.contactEmail, "e-mail")}.`],
      ["Hébergeur", "Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, États-Unis."],
      ["Contenu", "Les articles sont informatifs et ne remplacent pas un conseil juridique, fiscal ou financier. Le contenu sponsorisé est toujours signalé."],
      ["Agence partenaire", `${config.agency.name}, licence AMI ${config.agency.ami}, intermédiaire immobilier agréé. Imóveis Portugal n'exerce pas d'activité d'intermédiation immobilière.`],
    ],
  };
}
function privacyEN() {
  const e = config.entity, a = config.agency;
  return {
    title: "Privacy", h1: "Privacy policy",
    draft: "Draft. Fields in square brackets will be filled in once the entity is set up.",
    sections: [
      ["Controller", `${ph(e.name, "Entity")}, ${ph(e.address, "Address")}. Contact: ${ph(config.contactEmail, "email")}.`],
      ["What data we process and why", `Newsletter: first name and email, with your consent (GDPR, art. 6(1)(a)) and double opt-in. Buying requests: name, contact details and what you're looking for, with your consent, to pass them to our partner agency ${a.name} (AMI ${a.ami}). Partner inquiries: business details, to reply to your request (art. 6(1)(b)). Requests to a partner: category, country, question and contact details, with your consent, to reply and, if you agree, to pass them to a partner in the chosen category.`],
      ["Who receives the data", `The partner agency, only for buying requests. The partner in the chosen category, only for requests to a partner and with your consent. Processors acting for us: ${processors.en}.`],
      ["How long we keep it", "Newsletter: until you unsubscribe. Buying requests and requests to a partner: 12 months. Partner inquiries: for the business relationship and the applicable legal period."],
      ["Your rights", "Access, correction, deletion, objection, restriction, portability and withdrawal of consent at any time, by writing to the contact above. You can also file a complaint with the data protection authority of your country, or with Portugal's CNPD."],
      ["Cookies", "We use no advertising or analytics cookies. The language and edition you choose are stored only in your browser (local storage), without cookies. Embedded forms may use technical cookies from their service."],
    ],
  };
}
function legalEN() {
  const e = config.entity;
  return {
    title: "Legal notice", h1: "Legal notice",
    draft: "Draft. Fields in square brackets will be filled in once the entity is set up.",
    sections: [
      ["Publisher", `${ph(e.name, "Entity")}, ${ph(e.address, "Address")}. Registration: ${ph(e.register, "registration no.")}. VAT: ${ph(e.vat, "VAT no.")}. Contact: ${ph(config.contactEmail, "email")}.`],
      ["Hosting", "Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA."],
      ["Content", "Articles are for information only and don't replace legal, tax or financial advice. Sponsored content is always labeled."],
      ["Partner agency", `${config.agency.name}, AMI license ${config.agency.ami}, a licensed real-estate broker. Imóveis Portugal does not act as a real-estate intermediary.`],
    ],
  };
}
