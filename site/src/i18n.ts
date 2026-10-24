import { config } from "./config";

export type EdCode = "lu" | "fr" | "ch" | "br";
export type PageKey = "partners" | "buy" | "privacy" | "legal" | "faq" | "talk";

type Fact = { big: string; text: string; source: string; url: string };

const SRC = {
  lu: "https://www.theportugalnews.com/br/noticias/2024-11-14/onde-estao-as-maiores-comunidades-portuguesas-fora-de-portugal/93543",
  emig: "https://www.rtp.pt/noticias/economia/cerca-de-60000-portugueses-emigraram-em-2022-suica-volta-a-ser-principal-destino_n1546782",
  ine_nat: "https://www.idealista.pt/news/node/74594",
  ine_dom: "https://www.idealista.pt/news/node/74603",
  ine_price: "https://www.noticiasaominuto.com/economia/2960456/precos-da-habitacao-com-aumento-recorde-de-17-6-em-2025",
};

export const EDITIONS: Record<EdCode, {
  code: EdCode; lang: string; hreflang: string; dict: "pt" | "fr" | "br"; name: string; domain: string;
  slugs: Record<PageKey, string>; hero: string; from: string; topics: string[]; fact: Fact;
}> = {
  lu: {
    code: "lu", lang: "pt-PT", hreflang: "pt-LU", dict: "pt", name: "Luxemburgo", domain: "imoveisportugal.lu",
    slugs: { partners: "parceiros", buy: "comprar", privacy: "privacidade", legal: "aviso-legal", faq: "perguntas-frequentes", talk: "falar-com-um-parceiro" },
    hero: "Comprar casa em Portugal a partir do Luxemburgo, com os custos reais.",
    from: "a partir do Luxemburgo",
    topics: ["Crédito no Luxemburgo ou em Portugal, impostos dos dois lados e o que muda no regresso."],
    fact: { big: "92 000", text: "pessoas com nacionalidade portuguesa vivem no Luxemburgo.", source: "OCDE, via The Portugal News, 2024", url: SRC.lu },
  },
  fr: {
    code: "fr", lang: "fr-FR", hreflang: "fr-FR", dict: "fr", name: "France", domain: "imoveisportugal.fr",
    slugs: { partners: "partenaires", buy: "acheter", privacy: "confidentialite", legal: "mentions-legales", faq: "questions-frequentes", talk: "parler-a-un-partenaire" },
    hero: "Acheter au Portugal depuis la France, avec les vrais chiffres.",
    from: "depuis la France",
    topics: ["Crédit en France ou au Portugal, fiscalité des deux côtés, successions et maisons de famille."],
    fact: { big: "573 000", text: "personnes nées au Portugal vivent en France, la plus grande communauté portugaise au monde.", source: "Observatório da Emigração, rapport 2022, via RTP", url: SRC.emig },
  },
  ch: {
    code: "ch", lang: "pt-PT", hreflang: "pt-CH", dict: "pt", name: "Suíça", domain: "imoveisportugal.ch",
    slugs: { partners: "parceiros", buy: "comprar", privacy: "privacidade", legal: "aviso-legal", faq: "perguntas-frequentes", talk: "falar-com-um-parceiro" },
    hero: "Comprar casa em Portugal a partir da Suíça, com os custos reais.",
    from: "a partir da Suíça",
    topics: ["Usar o 2.º pilar para comprar casa, câmbio do franco, impostos e o que muda na reforma em Portugal."],
    fact: { big: "204 000", text: "pessoas nascidas em Portugal vivem na Suíça.", source: "Observatório da Emigração, relatório 2022, via RTP", url: SRC.emig },
  },
  br: {
    code: "br", lang: "pt-BR", hreflang: "pt-BR", dict: "br", name: "Brasil", domain: "imoveisportugal.com.br",
    slugs: { partners: "parceiros", buy: "comprar", privacy: "privacidade", legal: "aviso-legal", faq: "perguntas-frequentes", talk: "falar-com-um-parceiro" },
    hero: "Comprar imóvel em Portugal morando no Brasil, com os custos reais.",
    from: "morando no Brasil",
    topics: ["Vistos e residência, câmbio do real, financiamento em Portugal e impostos para quem vem do Brasil."],
    fact: { big: "9 808", text: "imóveis foram comprados em Portugal em 2025 por pessoas nascidas no Brasil, mais do que qualquer outra nacionalidade estrangeira.", source: "INE, via idealista/news, 2026", url: SRC.ine_nat },
  },
};

export const ED_ORDER: EdCode[] = ["lu", "fr", "ch", "br"];

// Always group thousands (pt-PT skips the separator for 4-digit numbers by default).
const eur = (n: number, _lang: string) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €";

export function t(ed: EdCode) {
  const E = EDITIONS[ed];
  const L = E.lang;
  const p = config.prices;
  const left = config.foundingSlotsLeft, total = config.foundingSlotsTotal;

  const pt = E.dict === "pt";
  if (E.dict === "fr") return {
    nav: { home: "Accueil", partners: "Partenaires", buy: "Acheter" },
    editionsLabel: "Éditions",
    lede: "Une newsletter gratuite chaque semaine : des biens choisis, le coût réel d'un achat, le crédit, la fiscalité et le retour. Premier numéro le 1er décembre 2026.",
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
    partnersCta: { h: "Vous travaillez avec ceux qui achètent au Portugal ?", p: "Avocats, banques, promoteurs et autres services peuvent toucher nos lecteurs dans les quatre éditions.", a: "Voir les conditions partenaires" },
    footer: { sponsored: "Le contenu sponsorisé est toujours signalé.", privacy: "Confidentialité", legal: "Mentions légales" },
    formPending: (email: string) => email ? `Formulaire en cours d'installation. Écrivez-nous à ${email}.` : "Formulaire disponible très bientôt.",
    partners: {
      title: "Partenaires",
      h1: "Touchez ceux qui vivent à l'étranger et pensent acheter au Portugal.",
      lede: `Imóveis Portugal est un guide hebdomadaire en quatre éditions (Luxembourg, France, Suisse, Brésil) pour ceux qui vivent hors du Portugal et veulent y acheter. Lancement le 1er décembre 2026.`,
      readersH: "Les lecteurs",
      readersP: "Des Portugais et lusodescendants installés en France, au Luxembourg et en Suisse, et des Brésiliens qui préparent un achat au Portugal : maison de vacances, retour, retraite ou investissement. Ils lisent parce qu'ils ont un projet.",
      foundingH: "Partenaire fondateur",
      foundingP: `40 % de remise la première année et le même prix la deuxième. Dix places, un seul partenaire par catégorie.`,
      slots: `Places disponibles : ${left} sur ${total}`,
      whyNowH: "Pourquoi maintenant",
      whyNowP: "Les partenaires fondateurs apparaissent dès le premier numéro, le 1er décembre, juste avant Noël, quand beaucoup d'émigrés sont au Portugal et visitent des maisons.",
      tableH: "Formules",
      cols: ["Formule", "Ce qui est inclus", "Prix fondateur (année 1)", "Prix normal"],
      rows: [
        ["Gold", "Exclusivité dans votre catégorie sur les quatre éditions. Présence dans chaque newsletter, un article sponsorisé par mois et par édition, une rubrique questions-réponses, rapport mensuel.", eur(p.gold.founding, L), eur(p.gold.list, L) + " / an"],
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

  // Portuguese (pt-PT for LU/CH, pt-BR for BR)
  const br = !pt;
  return {
    nav: { home: "Início", partners: "Parceiros", buy: "Comprar" },
    editionsLabel: "Edições",
    lede: br
      ? "Uma newsletter grátis por semana: imóveis selecionados, quanto custa de verdade comprar, financiamento, câmbio, vistos e impostos. Primeira edição em 1º de dezembro de 2026."
      : "Uma newsletter grátis por semana: imóveis escolhidos, quanto custa mesmo comprar, crédito, impostos e o que muda no regresso. Primeira edição a 1 de dezembro de 2026.",
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
      p: br ? "Advogados, bancos, incorporadoras e outros serviços podem chegar aos nossos leitores nas quatro edições." : "Advogados, bancos, promotores e outros serviços podem chegar aos nossos leitores nas quatro edições.",
      a: "Ver condições para parceiros",
    },
    footer: { sponsored: "O conteúdo patrocinado é sempre identificado.", privacy: "Privacidade", legal: "Aviso legal" },
    formPending: (email: string) => email ? `Formulário em configuração. Escreva-nos para ${email}.` : (br ? "Formulário disponível em breve." : "Formulário disponível muito em breve."),
    partners: {
      title: "Parceiros",
      h1: br ? "Chegue a quem mora fora e está pensando em comprar imóvel em Portugal." : "Chegue a quem vive fora e está a pensar comprar casa em Portugal.",
      lede: br
        ? "O Imóveis Portugal é um guia semanal com quatro edições (Luxemburgo, França, Suíça e Brasil) para quem mora fora de Portugal e quer comprar lá. Lançamento em 1º de dezembro de 2026."
        : "O Imóveis Portugal é um guia semanal com quatro edições (Luxemburgo, França, Suíça e Brasil) para quem vive fora de Portugal e quer comprar casa lá. Lançamos a 1 de dezembro de 2026.",
      readersH: "Quem nos lê",
      readersP: br
        ? "Brasileiros que preparam uma compra em Portugal para morar ou investir, e portugueses no Luxemburgo, na França e na Suíça que querem casa de férias, voltar ou se aposentar em Portugal. Leem porque têm um projeto."
        : "Portugueses no Luxemburgo, em França e na Suíça que querem casa de férias, regressar ou reformar-se em Portugal, e brasileiros que preparam uma compra para viver ou investir. Leem porque têm um projeto.",
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
          : "Exclusivo na sua categoria nas quatro edições. Presença em todas as newsletters, um artigo patrocinado por mês em cada edição, coluna de perguntas e respostas, relatório mensal.",
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

export function sideFacts(ed: EdCode): Fact[] {
  const fr = EDITIONS[ed].dict === "fr";
  const own = EDITIONS[ed].fact;
  const all: Fact[] = [
    fr
      ? { big: "335 640 €", text: "prix moyen payé en 2025 par les acheteurs domiciliés fiscalement dans un autre pays de l'UE, contre 234 120 € pour les résidents.", source: "INE, via idealista/news", url: SRC.ine_dom }
      : { big: "335 640 €", text: "preço médio pago em 2025 por compradores com domicílio fiscal noutro país da UE, contra 234 120 € dos residentes.".replace("noutro", EDITIONS[ed].dict === "br" ? "em outro" : "noutro"), source: "INE, via idealista/news", url: SRC.ine_dom },
    fr
      ? { big: "+17,6 %", text: "hausse des prix des logements au Portugal en 2025, la plus forte de la série.", source: "INE, via Notícias ao Minuto", url: SRC.ine_price }
      : { big: "+17,6%", text: "subida dos preços da habitação em Portugal em 2025, a maior da série.".replace("subida", EDITIONS[ed].dict === "br" ? "alta" : "subida"), source: "INE, via Notícias ao Minuto", url: SRC.ine_price },
  ];
  if (ed !== "br") all.push(fr
    ? { big: "9 808", text: "logements achetés au Portugal en 2025 par des personnes nées au Brésil, premier pays étranger.", source: "INE, via idealista/news", url: SRC.ine_nat }
    : { big: "9 808", text: "casas compradas em Portugal em 2025 por pessoas nascidas no Brasil, o primeiro país estrangeiro.", source: "INE, via idealista/news", url: SRC.ine_nat });
  if (ed === "fr") all.unshift({ big: "3 765", text: "logements achetés au Portugal en 2025 par des personnes nées en France.", source: "INE, via idealista/news", url: SRC.ine_nat });
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
      ["Cookies", "Não usamos cookies de publicidade nem de estatística. Os formulários incorporados podem usar cookies técnicos do respetivo serviço."],
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
      ["Cookies", "Aucun cookie publicitaire ni de mesure d'audience. Les formulaires intégrés peuvent utiliser des cookies techniques de leur service."],
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
