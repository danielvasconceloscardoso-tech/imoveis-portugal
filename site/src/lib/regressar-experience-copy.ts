import type { Lang } from "../i18n";

/** The programme is the subject of this independent tool, not a claimed partner. */
export interface RegressarExperienceCopy {
  programmeTitle: string;
  introduction: string;
  programmeNote: string;
  eligibility: string;
  qualified: string;
  notQualified: string;
  incomplete: string;
  conditions: string;
  source: string;
  revealQuestion: string;
  power: string;
  schools: string;
  hospitals: string;
  noData: string;
  rentArea: string;
  buyArea: string;
  deposit: string;
  medicalNote: string;
  distanceNote: string;
  coverageNote: string;
  estimatedRent: string;
  estimatedRepayment: string;
  method: string;
  officialProgramme: string;
  compare: string;
  annualSaving: string;
  sameGross: string;
  backToChoices: string;
}

export const REGRESSAR_EXPERIENCE_COPY: Record<Lang, RegressarExperienceCopy> = {
  pt: {
    programmeTitle: "Programa Regressar",
    introduction: "O seu regresso começa a ganhar forma.",
    programmeNote: "Simulador independente sobre o Programa Regressar. Sem parceria ou validação governamental.",
    eligibility: "O benefício aplica-se?",
    qualified: "As suas respostas permitem explorar o cenário com benefício. A elegibilidade exige confirmação fiscal.",
    notQualified: "Estas respostas não correspondem às condições deste cenário. Pode continuar sem o benefício.",
    incomplete: "Responda às condições para explorar o cenário com benefício.",
    conditions: "Condições do programa",
    source: "Fonte e data",
    revealQuestion: "Como imagina os seus dias?",
    power: "O que este rendimento permite",
    schools: "Escolas por perto",
    hospitals: "Hospitais por perto",
    noData: "Sem dados verificados nesta seleção.",
    rentArea: "Área de referência para arrendar",
    buyArea: "Área de referência para comprar",
    deposit: "Entrada necessária",
    medicalNote: "Proximidade não confirma vagas, acesso, convenções ou tempos de espera.",
    distanceNote: "Consulte a unidade e a origem de cada distância. Não são tempos garantidos de viagem.",
    coverageNote: "Seleção de estabelecimentos com dados disponíveis; não é uma lista completa do concelho.",
    estimatedRent: "Renda estimada",
    estimatedRepayment: "Prestação estimada",
    method: "Ver as hipóteses",
    officialProgramme: "Consultar o programa oficial",
    compare: "Com e sem benefício",
    annualSaving: "Diferença anual estimada",
    sameGross: "Para o mesmo bruto anual",
    backToChoices: "Alterar escolhas",
  },
  en: {
    programmeTitle: "Programa Regressar",
    introduction: "Your return begins to take shape.",
    programmeNote: "Independent calculator about Programa Regressar. No government partnership or validation.",
    eligibility: "Does the relief apply?",
    qualified: "Your answers allow you to explore the relief scenario. Eligibility still requires tax confirmation.",
    notQualified: "These answers do not meet this scenario’s conditions. You can continue without relief.",
    incomplete: "Answer the conditions to explore the relief scenario.",
    conditions: "Programme conditions",
    source: "Source and date",
    revealQuestion: "How do you picture your days?",
    power: "What this income allows",
    schools: "Schools nearby",
    hospitals: "Hospitals nearby",
    noData: "No verified data in this selection.",
    rentArea: "Indicative floor area to rent",
    buyArea: "Indicative floor area to buy",
    deposit: "Deposit required",
    medicalNote: "Proximity does not confirm availability, access, insurance agreements or waiting times.",
    distanceNote: "Check each distance’s unit and origin. These are not guaranteed travel times.",
    coverageNote: "A selection of establishments with available data, not a complete municipal directory.",
    estimatedRent: "Estimated rent",
    estimatedRepayment: "Estimated repayment",
    method: "View assumptions",
    officialProgramme: "Visit the official programme",
    compare: "With and without relief",
    annualSaving: "Estimated annual difference",
    sameGross: "At the same annual gross",
    backToChoices: "Change choices",
  },
  fr: {
    programmeTitle: "Programa Regressar",
    introduction: "Votre retour commence à prendre forme.",
    programmeNote: "Simulateur indépendant sur le Programa Regressar. Sans partenariat ni validation du gouvernement.",
    eligibility: "L’avantage s’applique-t-il ?",
    qualified: "Vos réponses permettent d’explorer le scénario avec avantage. L’éligibilité exige une confirmation fiscale.",
    notQualified: "Ces réponses ne correspondent pas aux conditions de ce scénario. Vous pouvez continuer sans avantage.",
    incomplete: "Répondez aux conditions pour explorer le scénario avec avantage.",
    conditions: "Conditions du programme",
    source: "Source et date",
    revealQuestion: "Comment imaginez-vous vos journées ?",
    power: "Ce que permet ce revenu",
    schools: "Écoles à proximité",
    hospitals: "Hôpitaux à proximité",
    noData: "Aucune donnée vérifiée dans cette sélection.",
    rentArea: "Surface indicative à louer",
    buyArea: "Surface indicative à acheter",
    deposit: "Apport nécessaire",
    medicalNote: "La proximité ne confirme ni les places, ni l’accès, ni les conventions, ni les délais d’attente.",
    distanceNote: "Consultez l’unité et l’origine de chaque distance. Les temps de trajet ne sont pas garantis.",
    coverageNote: "Sélection d’établissements disposant de données ; ce n’est pas un annuaire complet de la commune.",
    estimatedRent: "Loyer estimé",
    estimatedRepayment: "Mensualité estimée",
    method: "Voir les hypothèses",
    officialProgramme: "Consulter le programme officiel",
    compare: "Avec et sans avantage",
    annualSaving: "Différence annuelle estimée",
    sameGross: "Pour le même brut annuel",
    backToChoices: "Modifier les choix",
  },
};

export const experienceCopy = (lang: Lang): RegressarExperienceCopy => REGRESSAR_EXPERIENCE_COPY[lang];

export const imageQuestions: readonly {
  id: "beach" | "golf" | "art" | "food" | "schools" | "airport";
  question: Record<Lang, string>;
  answer: Record<Lang, string>;
}[] = [
  { id: "beach", question: { pt: "Quer o mar por perto?", en: "Would you like the sea nearby?", fr: "La mer à proximité ?" }, answer: { pt: "Praia", en: "Beach", fr: "Plage" } },
  { id: "golf", question: { pt: "Reserva tempo para o golfe?", en: "Do you make time for golf?", fr: "Du temps pour le golf ?" }, answer: { pt: "Golfe", en: "Golf", fr: "Golf" } },
  { id: "art", question: { pt: "A arte faz parte dos seus dias?", en: "Is art part of your everyday life?", fr: "L’art fait-il partie de votre quotidien ?" }, answer: { pt: "Arte", en: "Art", fr: "Art" } },
  { id: "food", question: { pt: "Gosta de escolher a próxima mesa?", en: "Do you enjoy choosing your next table?", fr: "Vous aimez choisir votre prochaine table ?" }, answer: { pt: "Gastronomia", en: "Food", fr: "Gastronomie" } },
  { id: "schools", question: { pt: "As escolas contam na escolha?", en: "Do schools shape your choice?", fr: "Les écoles comptent dans votre choix ?" }, answer: { pt: "Escolas", en: "Schools", fr: "Écoles" } },
  { id: "airport", question: { pt: "Quer manter o aeroporto por perto?", en: "Would you like an airport nearby?", fr: "Un aéroport à proximité ?" }, answer: { pt: "Aeroporto", en: "Airport", fr: "Aéroport" } },
];
