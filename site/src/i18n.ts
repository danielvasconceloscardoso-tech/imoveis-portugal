import { config } from "./config";

// D18: the whole site is in three languages; editions keep only country content and sponsors.
export type Lang = "pt" | "en" | "fr";
export const LANGS: Lang[] = ["pt", "en", "fr"];
export const HTML_LANG: Record<Lang, string> = { pt: "pt-PT", en: "en", fr: "fr" };
export const LANG_NAME: Record<Lang, string> = { pt: "Português", en: "English", fr: "Français" };

export type EdCode = "lu" | "fr" | "ch" | "br" | "us" | "il";
export type PageKey = "partners" | "buy" | "privacy" | "legal" | "faq" | "talk" | "guide";

// URL slugs follow the language, not the edition: /{lang}/{edition}/{slug}/
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  pt: { partners: "parceiros", buy: "comprar", privacy: "privacidade", legal: "aviso-legal", faq: "perguntas-frequentes", talk: "falar-com-um-parceiro", guide: "guia-gratuito" },
  en: { partners: "partners", buy: "buy", privacy: "privacy", legal: "legal-notice", faq: "faq", talk: "talk-to-a-partner", guide: "free-guide" },
  fr: { partners: "partenaires", buy: "acheter", privacy: "confidentialite", legal: "mentions-legales", faq: "questions-frequentes", talk: "parler-a-un-partenaire", guide: "guide-gratuit" },
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

export function t(ed: EdCode, lang: Lang) {
  const ED = EDITIONS[ed];
  const E = { name: ED.name[lang], hero: ED.hero[lang], from: ED.from[lang], topics: ED.topics[lang] };
  const L = lang;
  const p = config.prices;
  const left = config.foundingSlotsLeft, total = config.foundingSlotsTotal;
  // USA and Israel readers move to Portugal rather than back.
  const away = ed === "us" || ed === "il";

  if (lang === "en") return tEn(ed, E);
  if (lang === "fr") return {
    nav: { home: "Accueil", partners: "Partenaires", buy: "Acheter" },
    editionsLabel: "Éditions",
    lede: `Une newsletter gratuite chaque semaine : des biens choisis, le coût réel d'un achat, le crédit, la fiscalité et ${away ? "l'installation" : "le retour"}. Premier numéro le 1er décembre 2026.`,
    weeklyTitle: "Chaque semaine",
    weekly: [
      "Des biens à vendre choisis par région et par budget.",
      "Le coût total de chaque achat : IMT, droit de timbre, acte notarié et enregistrement.",
      ...E.topics,
      "Les réponses d'avocats, de banques et d'agences partenaires, toujours signalées comme telles.",
    ],
    signupTitle: "Recevoir la newsletter",
    factsTitle: "En chiffres",
    buyCta: { h: "Vous achetez dans les prochains mois ?", p: "Dites-nous ce que vous cherchez. Une agence immobilière agréée partenaire vous contacte, sans frais pour vous.", a: "Demander un contact" },
    partnersCta: { h: "Vous travaillez avec ceux qui achètent au Portugal ?", p: "Avocats, banques, promoteurs et autres services peuvent toucher nos lecteurs dans toutes les éditions.", a: "Voir les conditions partenaires" },
    footer: { sponsored: "Le contenu sponsorisé est toujours signalé.", privacy: "Confidentialité", legal: "Mentions légales" },
    formPending: (email: string) => email ? `Formulaire en cours d'installation. Écrivez-nous à ${email}.` : "Formulaire disponible très bientôt.",
    partners: {
      title: "Partenaires",
      h1: "Touchez ceux qui vivent à l'étranger et pensent acheter au Portugal.",
      lede: `Imóveis Portugal est un guide hebdomadaire en six éditions (Luxembourg, France, Suisse, Brésil, États-Unis, Israël), en portugais, anglais et français, pour ceux qui vivent hors du Portugal et veulent y acheter. Lancement le 1er décembre 2026.`,
      readersH: "Les lecteurs",
      readersP: "Des Portugais et lusodescendants installés en France, au Luxembourg et en Suisse, des Brésiliens, des Américains et des Israéliens qui préparent un achat au Portugal : maison de vacances, retour, retraite, installation ou investissement. Ils lisent parce qu'ils ont un projet.",
      foundingH: "Partenaire fondateur",
      foundingP: `40 % de remise la première année et le même prix la deuxième. Dix places, un seul partenaire par catégorie.`,
      slots: `Places disponibles : ${left} sur ${total}`,
      whyNowH: "Pourquoi maintenant",
      whyNowP: "Les partenaires fondateurs apparaissent dès le premier numéro, le 1er décembre, juste avant Noël, quand beaucoup d'émigrés sont au Portugal et visitent des maisons.",
      tableH: "Formules",
      cols: ["Formule", "Ce qui est inclus", "Prix fondateur (année 1)", "Prix normal"],
      rows: [
        ["Gold", "Exclusivité dans votre catégorie sur toutes les éditions. Présence dans chaque newsletter, un article sponsorisé par mois et par édition, une rubrique questions-réponses, rapport mensuel.", eur(p.gold.founding, L), eur(p.gold.list, L) + " / an"],
        ["Silver", "Une édition au choix. Présence dans la newsletter tous les quinze jours, un article sponsorisé par trimestre, fiche dans l'annuaire des partenaires, rapport mensuel.", eur(p.silver.founding, L), eur(p.silver.list, L) + " / an"],
        ["Bronze", "Une édition. Fiche avec logo dans l'annuaire des partenaires et une mention par mois dans la newsletter.", eur(p.bronze.founding, L), eur(p.bronze.list, L) + " / an"],
        ["Campagne promoteur", "Mise en avant d'un programme dans les éditions choisies : newsletter, article et réseaux sociaux.", "à partir de " + eur(p.campaignFrom, L), "—"],
      ],
      vat: "Prix hors TVA.",
      rulesH: "Nos règles",
      rules: [
        "Tout contenu sponsorisé est signalé comme tel.",
        "Nous ne publions aucune promesse de rendement.",
        "Les demandes d'achat des lecteurs ne vont qu'à l'agence immobilière agréée partenaire.",
      ],
      reportH: "Ce que vous recevez chaque mois",
      reportP: "Un rapport par édition : abonnés, ouvertures, clics et demandes de contact liés à votre présence.",
      ctaH: "Parlons 15 minutes",
      book: "Réserver un appel",
      formIntro: "Ou laissez vos coordonnées : nous répondons sous un jour ouvré.",
    },
    buy: {
      title: "Acheter",
      h1: "Dites-nous quelle maison vous cherchez au Portugal.",
      lede: "Nous transmettons votre demande à une agence immobilière agréée partenaire (licence AMI), qui vous contacte pour vous proposer des biens. Ce contact est gratuit pour vous.",
      stepsH: "Ensuite",
      steps: ["Vous remplissez le formulaire, en deux minutes.", "L'agence partenaire vous contacte sous deux jours ouvrés.", "Si vous le souhaitez, elle organise des visites pendant votre séjour au Portugal."],
      small: "Vos données servent uniquement à cette demande et ne sont transmises qu'à l'agence partenaire, avec votre accord.",
    },
    privacy: privacyFR(ed),
    legal: legalFR(),
  };

  // Portuguese (pt-PT). PT-BR was dropped in D18; the br branches below are kept off.
  const br = false;
  return {
    nav: { home: "Início", partners: "Parceiros", buy: "Comprar" },
    editionsLabel: "Edições",
    lede: br
      ? "Uma newsletter grátis por semana: imóveis selecionados, quanto custa de verdade comprar, financiamento, câmbio, vistos e impostos. Primeira edição em 1º de dezembro de 2026."
      : `Uma newsletter grátis por semana: imóveis escolhidos, quanto custa mesmo comprar, crédito, impostos e o que muda ${away ? "quando se muda para Portugal" : "no regresso"}. Primeira edição a 1 de dezembro de 2026.`,
    weeklyTitle: "Todas as semanas",
    weekly: [
      br ? "Imóveis à venda selecionados por região e orçamento." : "Imóveis à venda escolhidos por região e orçamento.",
      "O custo total de cada compra: IMT, imposto do selo, escritura e registo.".replace("registo", br ? "registro" : "registo"),
      ...E.topics,
      br ? "Respostas de advogados, bancos e imobiliárias parceiros, sempre identificados." : "Respostas de advogados, bancos e agências parceiros, sempre identificados.",
    ],
    signupTitle: "Receber a newsletter",
    factsTitle: "Em números",
    buyCta: {
      h: br ? "Vai comprar nos próximos meses?" : "Vai comprar nos próximos meses?",
      p: br ? "Conte o que você procura. Uma imobiliária licenciada parceira entra em contato, sem custo para você." : "Diga-nos o que procura. Uma agência imobiliária licenciada parceira contacta-o, sem custos para si.",
      a: br ? "Pedir contato" : "Pedir contacto",
    },
    partnersCta: {
      h: br ? "Sua empresa trabalha com quem compra imóvel em Portugal?" : "Trabalha com quem compra casa em Portugal?",
      p: br ? "Advogados, bancos, incorporadoras e outros serviços podem chegar aos nossos leitores em todas as edições." : "Advogados, bancos, promotores e outros serviços podem chegar aos nossos leitores em todas as edições.",
      a: "Ver condições para parceiros",
    },
    footer: { sponsored: "O conteúdo patrocinado é sempre identificado.", privacy: "Privacidade", legal: "Aviso legal" },
    formPending: (email: string) => email ? `Formulário em configuração. Escreva-nos para ${email}.` : (br ? "Formulário disponível em breve." : "Formulário disponível muito em breve."),
    partners: {
      title: "Parceiros",
      h1: br ? "Chegue a quem mora fora e está pensando em comprar imóvel em Portugal." : "Chegue a quem vive fora e está a pensar comprar casa em Portugal.",
      lede: br
        ? "O Imóveis Portugal é um guia semanal com quatro edições (Luxemburgo, França, Suíça e Brasil) para quem mora fora de Portugal e quer comprar lá. Lançamento em 1º de dezembro de 2026."
        : "O Imóveis Portugal é um guia semanal com seis edições (Luxemburgo, França, Suíça, Brasil, Estados Unidos e Israel), em português, inglês e francês, para quem vive fora de Portugal e quer comprar casa lá. Lançamos a 1 de dezembro de 2026.",
      readersH: "Quem nos lê",
      readersP: br
        ? "Brasileiros que preparam uma compra em Portugal para morar ou investir, e portugueses no Luxemburgo, na França e na Suíça que querem casa de férias, voltar ou se aposentar em Portugal. Leem porque têm um projeto."
        : "Portugueses no Luxemburgo, em França e na Suíça que querem casa de férias, regressar ou reformar-se em Portugal, e brasileiros, americanos e israelitas que preparam uma compra para viver, reformar-se ou investir. Leem porque têm um projeto.",
      foundingH: "Parceiro fundador",
      foundingP: br
        ? "40% de desconto no primeiro ano e o mesmo preço no segundo. São dez vagas e um único parceiro por categoria."
        : "40% de desconto no primeiro ano e o mesmo preço no segundo. Há dez lugares e um só parceiro por categoria.",
      slots: br ? `Vagas disponíveis: ${left} de ${total}` : `Lugares disponíveis: ${left} de ${total}`,
      whyNowH: "Porquê agora".replace("Porquê", br ? "Por que" : "Porquê"),
      whyNowP: br
        ? "Os parceiros fundadores aparecem desde a primeira edição, em 1º de dezembro, antes do Natal, quando muitos emigrantes estão em Portugal visitando imóveis."
        : "Os parceiros fundadores aparecem desde o primeiro número, a 1 de dezembro, antes do Natal, quando muitos emigrantes estão em Portugal e visitam casas.",
      tableH: "Pacotes",
      cols: ["Pacote", br ? "O que inclui" : "O que inclui", br ? "Preço fundador (ano 1)" : "Preço fundador (ano 1)", br ? "Preço normal" : "Preço normal"],
      rows: [
        ["Gold", br
          ? "Exclusividade na sua categoria nas quatro edições. Presença em todas as newsletters, um artigo patrocinado por mês em cada edição, coluna de perguntas e respostas, relatório mensal."
          : "Exclusivo na sua categoria em todas as edições. Presença em todas as newsletters, um artigo patrocinado por mês em cada edição, coluna de perguntas e respostas, relatório mensal.",
          eur(p.gold.founding, L), eur(p.gold.list, L) + " / ano"],
        ["Silver", br
          ? "Uma edição à sua escolha. Presença na newsletter a cada 15 dias, um artigo patrocinado por trimestre, página no diretório de parceiros, relatório mensal."
          : "Uma edição à escolha. Presença na newsletter de 15 em 15 dias, um artigo patrocinado por trimestre, entrada no diretório de parceiros, relatório mensal.",
          eur(p.silver.founding, L), eur(p.silver.list, L) + " / ano"],
        ["Bronze", br
          ? "Uma edição. Página com logotipo no diretório de parceiros e uma menção por mês na newsletter."
          : "Uma edição. Entrada com logótipo no diretório de parceiros e uma menção por mês na newsletter.",
          eur(p.bronze.founding, L), eur(p.bronze.list, L) + " / ano"],
        [br ? "Campanha de lançamento" : "Campanha de empreendimento", br
          ? "Para incorporadoras: destaque de um empreendimento nas edições escolhidas, com newsletter, artigo e redes sociais."
          : "Para promotores: destaque de um empreendimento nas edições escolhidas, com newsletter, artigo e redes sociais.",
          (br ? "a partir de " : "a partir de ") + eur(p.campaignFrom, L), "—"],
      ],
      vat: br ? "Valores sem IVA (imposto português)." : "Valores sem IVA.",
      rulesH: br ? "Nossas regras" : "As nossas regras",
      rules: [
        "Todo o conteúdo patrocinado é identificado como tal.".replace("Todo o", br ? "Todo" : "Todo o"),
        br ? "Não publicamos promessas de rentabilidade." : "Não publicamos promessas de rendimento.",
        br ? "Os pedidos de compra dos leitores vão apenas para a imobiliária licenciada parceira." : "Os pedidos de compra dos leitores seguem apenas para a agência imobiliária licenciada parceira.",
      ],
      reportH: br ? "O que você recebe todo mês" : "O que recebe todos os meses",
      reportP: br
        ? "Um relatório por edição: assinantes, aberturas, cliques e pedidos de contato ligados à sua presença."
        : "Um relatório por edição: subscritores, aberturas, cliques e pedidos de contacto ligados à sua presença.",
      ctaH: br ? "Vamos conversar 15 minutos" : "Falemos 15 minutos",
      book: br ? "Agendar conversa" : "Marcar chamada",
      formIntro: br ? "Ou deixe seus dados: respondemos em até um dia útil." : "Ou deixe os seus dados: respondemos num dia útil.",
    },
    buy: {
      title: "Comprar",
      h1: br ? "Conte que imóvel você procura em Portugal." : "Diga-nos que casa procura em Portugal.",
      lede: br
        ? "Passamos o seu pedido a uma imobiliária licenciada parceira (licença AMI), que entra em contato para mostrar opções. Você não paga nada por esse contato."
        : "Passamos o seu pedido a uma agência imobiliária licenciada parceira (licença AMI), que o contacta para lhe mostrar opções. Não paga nada por este contacto.",
      stepsH: br ? "Depois" : "A seguir",
      steps: br
        ? ["Você preenche o formulário em dois minutos.", "A imobiliária parceira entra em contato em até dois dias úteis.", "Se quiser, ela organiza visitas para quando você estiver em Portugal."]
        : ["Preenche o formulário, em dois minutos.", "A agência parceira contacta-o em até dois dias úteis.", "Se quiser, organiza visitas para quando estiver em Portugal."],
      small: br
        ? "Seus dados são usados apenas para este pedido e compartilhados só com a imobiliária parceira, com o seu consentimento."
        : "Os seus dados são usados apenas para este pedido e partilhados só com a agência parceira, com o seu consentimento.",
    },
    privacy: privacyPT(ed, br),
    legal: legalPT(br),
  };
}

export function sideFacts(ed: EdCode, lang: Lang): Fact[] {
  const own = EDITIONS[ed].fact[lang];
  const F = {
    dom: {
      pt: { big: "335 640 €", text: "preço médio pago em 2025 por compradores com domicílio fiscal noutro país da UE, contra 234 120 € dos residentes." },
      en: { big: "335,640 €", text: "average price paid in 2025 by buyers with a tax address in another EU country, against 234,120 € for residents." },
      fr: { big: "335 640 €", text: "prix moyen payé en 2025 par les acheteurs domiciliés fiscalement dans un autre pays de l'UE, contre 234 120 € pour les résidents." },
    },
    price: {
      pt: { big: "+17,6%", text: "subida dos preços da habitação em Portugal em 2025, a maior da série." },
      en: { big: "+17.6%", text: "rise in house prices in Portugal in 2025, the highest in the series." },
      fr: { big: "+17,6 %", text: "hausse des prix des logements au Portugal en 2025, la plus forte de la série." },
    },
    br: {
      pt: { big: "9 808", text: "casas compradas em Portugal em 2025 por pessoas nascidas no Brasil, o primeiro país estrangeiro." },
      en: { big: "9,808", text: "homes bought in Portugal in 2025 by people born in Brazil, the top foreign country." },
      fr: { big: "9 808", text: "logements achetés au Portugal en 2025 par des personnes nées au Brésil, premier pays étranger." },
    },
    fr: {
      pt: { big: "3 765", text: "casas compradas em Portugal em 2025 por pessoas nascidas em França." },
      en: { big: "3,765", text: "homes bought in Portugal in 2025 by people born in France." },
      fr: { big: "3 765", text: "logements achetés au Portugal en 2025 par des personnes nées en France." },
    },
  };
  const all: Fact[] = [
    { ...F.dom[lang], source: "INE, via idealista/news", url: SRC.ine_dom },
    { ...F.price[lang], source: "INE, via Notícias ao Minuto", url: SRC.ine_price },
  ];
  if (ed !== "br") all.push({ ...F.br[lang], source: "INE, via idealista/news", url: SRC.ine_nat });
  if (ed === "fr") all.unshift({ ...F.fr[lang], source: "INE, via idealista/news", url: SRC.ine_nat });
  return [own, ...all];
}

// ---------- Legal drafts (to be reviewed; placeholders filled from config) ----------
const ph = (v: string, label: string) => v || `[${label}]`;

function privacyPT(ed: EdCode, br: boolean) {
  const e = config.entity, a = config.agency;
  return {
    title: br ? "Privacidade" : "Privacidade",
    h1: "Política de privacidade",
    draft: "Rascunho. Os campos entre parênteses retos são preenchidos quando a entidade estiver definida.",
    sections: [
      ["Responsável", `${ph(e.name, "Entidade")}, ${ph(e.address, br ? "Endereço" : "Morada")}. ${br ? "Contato" : "Contacto"}: ${ph(config.contactEmail, "email")}.`],
      ["Que dados tratamos e porquê", `Newsletter: nome próprio e email, com o seu consentimento (RGPD, art. 6.º, n.º 1, al. a)). Pedidos de compra: nome, contactos e o que procura, com o seu consentimento, para os enviarmos à agência imobiliária parceira ${ph(a.name, "agência")} (AMI ${ph(a.ami, "n.º")}). Pedidos de parceria: dados profissionais, para responder ao seu pedido (art. 6.º, n.º 1, al. b)). Pedidos a parceiros ("Falar com um parceiro"): categoria, país, pergunta e ${br ? "contato" : "contacto"}, com o seu consentimento, para responder e, se o autorizar, para os passar a um parceiro da categoria escolhida (art. 6.º, n.º 1, al. a)).`],
      ["Quem recebe os dados", "A agência parceira, só para pedidos de compra. O parceiro da categoria escolhida, só para pedidos a parceiros e com o seu consentimento. Prestadores que tratam dados por nossa conta: beehiiv (envio da newsletter, EUA, com garantias adequadas para a transferência), Tally (formulários, UE), Cloudflare (alojamento e estatísticas sem cookies) e Cal.com (marcação de chamadas)."],
      ["Durante quanto tempo", "Newsletter: até cancelar a subscrição. Pedidos de compra e pedidos a parceiros: 12 meses. Pedidos de parceria: durante a relação comercial e o prazo legal aplicável."],
      [br ? "Seus direitos" : "Os seus direitos", `Acesso, retificação, apagamento, oposição, limitação, portabilidade e retirada do consentimento a qualquer momento, escrevendo para o ${br ? "contato" : "contacto"} acima. ${br ? "Você também pode" : "Pode também"} apresentar queixa à autoridade de proteção de dados do seu país (por exemplo, CNPD em Portugal ou no Luxemburgo).`],
      ["Cookies", "Não usamos cookies de publicidade nem de estatística. A língua que escolhe fica guardada apenas no seu navegador (armazenamento local), sem cookies. Os formulários incorporados podem usar cookies técnicos do respetivo serviço."],
    ],
  };
}

function legalPT(br: boolean) {
  const e = config.entity;
  return {
    title: "Aviso legal",
    h1: "Aviso legal",
    draft: "Rascunho. Os campos entre parênteses retos são preenchidos quando a entidade estiver definida.",
    sections: [
      ["Editor", `${ph(e.name, "Entidade")}, ${ph(e.address, br ? "Endereço" : "Morada")}. ${br ? "Registro" : "Registo"}: ${ph(e.register, "n.º de registo")}. IVA: ${ph(e.vat, "n.º de IVA")}. ${br ? "Contato" : "Contacto"}: ${ph(config.contactEmail, "email")}.`],
      ["Alojamento", "Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, EUA."],
      ["Conteúdo", "Os artigos são informativos e não substituem aconselhamento jurídico, fiscal ou financeiro. O conteúdo patrocinado é sempre identificado."],
    ],
  };
}

function privacyFR(ed: EdCode) {
  const e = config.entity, a = config.agency;
  return {
    title: "Confidentialité",
    h1: "Politique de confidentialité",
    draft: "Brouillon. Les champs entre crochets seront complétés une fois l'entité définie.",
    sections: [
      ["Responsable du traitement", `${ph(e.name, "Entité")}, ${ph(e.address, "Adresse")}. Contact : ${ph(config.contactEmail, "email")}.`],
      ["Données traitées et finalités", `Newsletter : prénom et email, sur la base de votre consentement (RGPD, art. 6, par. 1, a)). Demandes d'achat : nom, coordonnées et critères de recherche, avec votre consentement, transmis à l'agence immobilière partenaire ${ph(a.name, "agence")} (AMI ${ph(a.ami, "n°")}). Demandes de partenariat : données professionnelles, pour répondre à votre demande (art. 6, par. 1, b)). Demandes à un partenaire (« Parler à un partenaire ») : catégorie, pays, question et coordonnées, avec votre consentement, pour répondre et, si vous l'acceptez, pour les transmettre à un partenaire de la catégorie choisie (art. 6, par. 1, a)).`],
      ["Destinataires", "L'agence partenaire, uniquement pour les demandes d'achat. Le partenaire de la catégorie choisie, uniquement pour les demandes à un partenaire et avec votre consentement. Sous-traitants : beehiiv (envoi de la newsletter, États-Unis, avec garanties appropriées pour le transfert), Tally (formulaires, UE), Cloudflare (hébergement et statistiques sans cookies) et Cal.com (prise de rendez-vous)."],
      ["Durée de conservation", "Newsletter : jusqu'à votre désinscription. Demandes d'achat et demandes à un partenaire : 12 mois. Demandes de partenariat : pendant la relation commerciale et la durée légale applicable."],
      ["Vos droits", "Accès, rectification, effacement, opposition, limitation, portabilité et retrait du consentement à tout moment, en écrivant au contact ci-dessus. Vous pouvez aussi saisir la CNIL."],
      ["Cookies", "Aucun cookie publicitaire ni de mesure d'audience. La langue choisie est enregistrée uniquement dans votre navigateur (stockage local), sans cookie. Les formulaires intégrés peuvent utiliser des cookies techniques de leur service."],
    ],
  };
}

function legalFR() {
  const e = config.entity;
  return {
    title: "Mentions légales",
    h1: "Mentions légales",
    draft: "Brouillon. Les champs entre crochets seront complétés une fois l'entité définie.",
    sections: [
      ["Éditeur", `${ph(e.name, "Entité")}, ${ph(e.address, "Adresse")}. Immatriculation : ${ph(e.register, "n° d'immatriculation")}. TVA : ${ph(e.vat, "n° de TVA")}. Contact : ${ph(config.contactEmail, "email")}.`],
      ["Hébergeur", "Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, États-Unis."],
      ["Contenu", "Les articles sont informatifs et ne remplacent pas un conseil juridique, fiscal ou financier. Le contenu sponsorisé est toujours signalé."],
    ],
  };
}

// ---------- English (D18) ----------
function tEn(ed: EdCode, E: { name: string; hero: string; from: string; topics: string[] }) {
  const p = config.prices;
  const left = config.foundingSlotsLeft, total = config.foundingSlotsTotal;
  return {
    nav: { home: "Home", partners: "Partners", buy: "Buy" },
    editionsLabel: "Editions",
    lede: `One free newsletter a week: selected homes, what buying really costs, mortgages, tax and ${ed === "us" || ed === "il" ? "moving to Portugal" : "moving back"}. First issue on 1 December 2026.`,
    weeklyTitle: "Every week",
    weekly: [
      "Homes for sale selected by region and budget.",
      "The total cost of each purchase: transfer tax (IMT), stamp duty, deed and registration.",
      ...E.topics,
      "Answers from partner lawyers, banks and our partner agency, always labelled as such.",
    ],
    signupTitle: "Get the newsletter",
    factsTitle: "In numbers",
    buyCta: { h: "Buying in the coming months?", p: "Tell us what you are looking for. Our licensed partner real-estate agency will contact you, free of charge.", a: "Request a contact" },
    partnersCta: { h: "Do you work with people buying in Portugal?", p: "Lawyers, banks, developers and other services can reach our readers in every edition.", a: "See partner terms" },
    footer: { sponsored: "Sponsored content is always labelled.", privacy: "Privacy", legal: "Legal notice" },
    formPending: (email: string) => email ? `Form being set up. Write to us at ${email}.` : "Form available very soon.",
    partners: {
      title: "Partners",
      h1: "Reach people who live abroad and are thinking of buying in Portugal.",
      lede: "Imóveis Portugal is a weekly guide with editions for Luxembourg, France, Switzerland, Brazil, the United States and Israel, in Portuguese, English and French, for people who live outside Portugal and want to buy there. Launch on 1 December 2026.",
      readersH: "Who reads us",
      readersP: "Portuguese people in Luxembourg, France and Switzerland who want a holiday home, to move back or to retire in Portugal, and Brazilians, Americans and Israelis preparing a purchase to live, retire or invest. They read because they have a plan.",
      foundingH: "Founding partner",
      foundingP: "40% off the first year and the same price in the second. Ten places, one partner per category.",
      slots: `Places available: ${left} of ${total}`,
      whyNowH: "Why now",
      whyNowP: "Founding partners appear from the first issue on 1 December, just before Christmas, when many emigrants are in Portugal visiting homes.",
      tableH: "Packages",
      cols: ["Package", "What is included", "Founding price (year 1)", "Standard price"],
      rows: [
        ["Gold", "Category exclusivity across all editions. Presence in every newsletter, one sponsored article per month per edition, a Q&A column, monthly report.", eur(p.gold.founding, "en"), eur(p.gold.list, "en") + " / year"],
        ["Silver", "One edition of your choice. Presence in the newsletter every two weeks, one sponsored article per quarter, partner directory entry, monthly report.", eur(p.silver.founding, "en"), eur(p.silver.list, "en") + " / year"],
        ["Bronze", "One edition. Directory entry with logo and one mention per month in the newsletter.", eur(p.bronze.founding, "en"), eur(p.bronze.list, "en") + " / year"],
        ["Development campaign", "For developers: one project featured in the editions you choose, with newsletter, article and social media.", "from " + eur(p.campaignFrom, "en"), "—"],
      ],
      vat: "Prices exclude VAT.",
      rulesH: "Our rules",
      rules: [
        "All sponsored content is labelled as such.",
        "We publish no promises of returns.",
        "Readers' buying requests go only to the licensed partner real-estate agency.",
      ],
      reportH: "What you get every month",
      reportP: "One report per edition: subscribers, opens, clicks and contact requests linked to your presence.",
      ctaH: "Let's talk for 15 minutes",
      book: "Book a call",
      formIntro: "Or leave your details: we reply within one working day.",
    },
    buy: {
      title: "Buy",
      h1: "Tell us what home you are looking for in Portugal.",
      lede: "We pass your request to our licensed partner real-estate agency (AMI licence), which contacts you to show you options. This contact is free for you.",
      stepsH: "Next",
      steps: ["You fill in the form, in two minutes.", "The partner agency contacts you within two working days.", "If you wish, it arranges viewings for when you are in Portugal."],
      small: "Your details are used only for this request and shared only with the partner agency, with your consent.",
    },
    privacy: privacyEN(),
    legal: legalEN(),
  };
}

function privacyEN() {
  const e = config.entity, a = config.agency;
  return {
    title: "Privacy",
    h1: "Privacy policy",
    draft: "Draft. Fields in square brackets will be filled in once the entity is set.",
    sections: [
      ["Controller", `${ph(e.name, "Entity")}, ${ph(e.address, "Address")}. Contact: ${ph(config.contactEmail, "email")}.`],
      ["What data we process and why", `Newsletter: first name and email, with your consent (GDPR, art. 6(1)(a)). Buying requests: name, contact details and what you are looking for, with your consent, to send them to the partner real-estate agency ${ph(a.name, "agency")} (AMI ${ph(a.ami, "no.")}). Partner enquiries: business details, to reply to your request (art. 6(1)(b)). Requests to a partner ("Talk to a partner"): category, country, question and contact details, with your consent, to reply and, if you agree, to pass them to a partner in the chosen category (art. 6(1)(a)).`],
      ["Who receives the data", "The partner agency, only for buying requests. The partner in the chosen category, only for requests to a partner and with your consent. Processors acting for us: beehiiv (newsletter, USA, with appropriate safeguards for the transfer), Tally (forms, EU), Cloudflare (hosting and cookie-free statistics) and Cal.com (call booking)."],
      ["How long", "Newsletter: until you unsubscribe. Buying requests and requests to a partner: 12 months. Partner enquiries: for the business relationship and the applicable legal period."],
      ["Your rights", "Access, rectification, erasure, objection, restriction, portability and withdrawal of consent at any time, by writing to the contact above. You can also complain to the data protection authority of your country (for example the CNPD in Portugal or in Luxembourg)."],
      ["Cookies", "We use no advertising or statistics cookies. The language you choose is stored only in your browser (local storage), without cookies. Embedded forms may use technical cookies of their service."],
    ],
  };
}

function legalEN() {
  const e = config.entity;
  return {
    title: "Legal notice",
    h1: "Legal notice",
    draft: "Draft. Fields in square brackets will be filled in once the entity is set.",
    sections: [
      ["Publisher", `${ph(e.name, "Entity")}, ${ph(e.address, "Address")}. Registration: ${ph(e.register, "registration no.")}. VAT: ${ph(e.vat, "VAT no.")}. Contact: ${ph(config.contactEmail, "email")}.`],
      ["Hosting", "Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA."],
      ["Content", "Articles are for information only and do not replace legal, tax or financial advice. Sponsored content is always labelled."],
    ],
  };
}
