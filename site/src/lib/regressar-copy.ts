import type { Lang } from "../i18n";

export type RegressarPreference = "beach" | "surf" | "golf" | "art" | "food" | "schools" | "airport" | "business" | "quiet";

/** Functional copy stays explicit; the place photograph and reveal carry the emotion. */
export interface RegressarCopy {
  title: string; lede: string; country: string; netSalary: string; month: string; year: string;
  period: string; payments: string; paymentsNote: string; calculate: string; edit: string;
  annualGross: string; annualNet: string; declaredNet: string; socialSecurity: string;
  incomeTax: string; solidarity: string; grossSentence: string; resultIntro: string;
  assumptions: string; standard: string; eligible: string; benefitNote: string;
  benefitTitle: string; benefitCondition: string; compare: string; tastes: string;
  tastesNote: string; reveal: string; revealing: string; another: string; openMap: string;
  housingBudget: string; rent: string; buy: string; monthly: string; annual: string;
  noMatch: string; noMatchAction: string; matchReason: string; housingAssumptions: string;
  afterHousing: string; availableBeforeLivingCosts: string; source: string; updated: string;
  method: string; disclaimer: string; error: string; fxNeeded: string; exchangeRate: string;
  exchangeDate: string; currency: string; loading: string; back: string;
  countries: Record<string, string>; preferences: Record<RegressarPreference, string>;
}

export const REGRESSAR_COPY: Record<Lang, RegressarCopy> = {
  pt: {
    title: "E se fosse em Portugal?", lede: "Do seu salário à sua próxima morada.",
    country: "País onde vive", netSalary: "Salário líquido", month: "Mês", year: "Ano", period: "Período",
    payments: "Pagamentos por ano", paymentsNote: "O valor mensal é multiplicado pelo número de pagamentos que recebe. O resultado português é anual.",
    calculate: "Ver em Portugal", edit: "Alterar rendimento", annualGross: "Bruto anual em Portugal", annualNet: "Líquido anual em Portugal",
    declaredNet: "O seu líquido declarado", socialSecurity: "Segurança Social", incomeTax: "IRS estimado", solidarity: "Adicional de solidariedade",
    grossSentence: "Para receber o mesmo líquido em Portugal, precisaria de ganhar aproximadamente", resultIntro: "O mesmo líquido, em Portugal.",
    assumptions: "Hipóteses do cálculo", standard: "Sem benefício", eligible: "Com artigo 12.º-A",
    benefitNote: "Cenário condicionado à elegibilidade. Não é uma confirmação de acesso ao benefício.",
    benefitTitle: "Se puder beneficiar do Regressar", benefitCondition: "Ver condições e duração", compare: "Comparar cenários",
    tastes: "O que quer por perto?", tastesNote: "Escolha o que conta para si.", reveal: "Mostrar o meu lugar", revealing: "A encontrar o seu lugar", another: "Ver outra opção", openMap: "Ver no mapa",
    housingBudget: "Orçamento para habitação", rent: "Arrendar", buy: "Comprar", monthly: "por mês", annual: "por ano",
    noMatch: "Não há uma opção compatível com estas escolhas e este orçamento nos dados disponíveis.", noMatchAction: "Ajustar escolhas", matchReason: "Porque este lugar",
    housingAssumptions: "Ver hipóteses de habitação", afterHousing: "Depois da habitação", availableBeforeLivingCosts: "Antes das restantes despesas de vida",
    source: "Fontes", updated: "Atualizado em", method: "Como calculamos",
    disclaimer: "Estimativa informativa para Portugal continental. Não substitui aconselhamento fiscal nem confirma elegibilidade ou aprovação de crédito.",
    error: "Introduza um salário líquido válido superior a zero.", fxNeeded: "É necessária uma taxa de câmbio com fonte e data para converter esta moeda. Não apresentamos uma taxa inventada.",
    exchangeRate: "Taxa de câmbio", exchangeDate: "Data da taxa", currency: "Moeda", loading: "A calcular", back: "Voltar",
    countries: { lu: "Luxemburgo", ch: "Suíça", fr: "França", pt: "Portugal", de: "Alemanha", be: "Bélgica", es: "Espanha", ie: "Irlanda", nl: "Países Baixos", at: "Áustria", it: "Itália", gb: "Reino Unido", us: "Estados Unidos", br: "Brasil", il: "Israel", other: "Outro país" },
    preferences: { beach: "Praia", surf: "Surf", golf: "Golfe", art: "Arte", food: "Gastronomia", schools: "Escolas", airport: "Aeroporto", business: "Negócios", quiet: "Tranquilidade" },
  },
  en: {
    title: "What if it were Portugal?", lede: "From your take-home pay to your next address.",
    country: "Where you live", netSalary: "Take-home salary", month: "Month", year: "Year", period: "Period",
    payments: "Payments per year", paymentsNote: "Your monthly amount is multiplied by the number of payments you receive. The Portuguese result is annual.",
    calculate: "See Portugal", edit: "Change income", annualGross: "Annual gross in Portugal", annualNet: "Annual net in Portugal",
    declaredNet: "Your stated take-home pay", socialSecurity: "Social security", incomeTax: "Estimated income tax", solidarity: "Solidarity surtax",
    grossSentence: "To take home the same amount in Portugal, you would need to earn approximately", resultIntro: "The same take-home pay, in Portugal.",
    assumptions: "Calculation assumptions", standard: "Without relief", eligible: "With Article 12-A",
    benefitNote: "Subject to eligibility. This scenario does not confirm your entitlement to relief.",
    benefitTitle: "If you qualify for Regressar", benefitCondition: "Conditions and duration", compare: "Compare scenarios",
    tastes: "What matters nearby?", tastesNote: "Choose what matters to you.", reveal: "Show my place", revealing: "Finding your place", another: "See another option", openMap: "View on map",
    housingBudget: "Housing budget", rent: "Rent", buy: "Buy", monthly: "per month", annual: "per year",
    noMatch: "The available data contains no place matching these choices and this budget.", noMatchAction: "Adjust choices", matchReason: "Why this place",
    housingAssumptions: "Housing assumptions", afterHousing: "After housing", availableBeforeLivingCosts: "Before other living costs",
    source: "Sources", updated: "Updated", method: "How we calculate",
    disclaimer: "Informational estimate for mainland Portugal. Not tax advice, confirmation of eligibility, or mortgage approval.",
    error: "Enter a valid take-home salary greater than zero.", fxNeeded: "Converting this currency requires an exchange rate with a source and date. We do not invent rates.",
    exchangeRate: "Exchange rate", exchangeDate: "Rate date", currency: "Currency", loading: "Calculating", back: "Back",
    countries: { lu: "Luxembourg", ch: "Switzerland", fr: "France", pt: "Portugal", de: "Germany", be: "Belgium", es: "Spain", ie: "Ireland", nl: "Netherlands", at: "Austria", it: "Italy", gb: "United Kingdom", us: "United States", br: "Brazil", il: "Israel", other: "Other country" },
    preferences: { beach: "Beach", surf: "Surf", golf: "Golf", art: "Art", food: "Food", schools: "Schools", airport: "Airport", business: "Business", quiet: "Quiet" },
  },
  fr: {
    title: "Et si c’était au Portugal ?", lede: "De votre salaire net à votre prochaine adresse.",
    country: "Pays de résidence", netSalary: "Salaire net", month: "Mois", year: "Année", period: "Période",
    payments: "Versements par an", paymentsNote: "Le montant mensuel est multiplié par le nombre de versements reçus. Le résultat portugais est annuel.",
    calculate: "Voir au Portugal", edit: "Modifier le revenu", annualGross: "Brut annuel au Portugal", annualNet: "Net annuel au Portugal",
    declaredNet: "Votre net déclaré", socialSecurity: "Sécurité sociale", incomeTax: "Impôt estimé", solidarity: "Contribution de solidarité",
    grossSentence: "Pour recevoir le même net au Portugal, il faudrait gagner environ", resultIntro: "Le même net, au Portugal.",
    assumptions: "Hypothèses du calcul", standard: "Sans avantage", eligible: "Avec l’article 12-A",
    benefitNote: "Scénario soumis aux conditions d’éligibilité. Il ne confirme pas votre droit à cet avantage.",
    benefitTitle: "Si vous bénéficiez de Regressar", benefitCondition: "Conditions et durée", compare: "Comparer les scénarios",
    tastes: "Que souhaitez-vous à proximité ?", tastesNote: "Choisissez ce qui compte pour vous.", reveal: "Voir mon lieu", revealing: "À la recherche de votre lieu", another: "Voir une autre option", openMap: "Voir sur la carte",
    housingBudget: "Budget logement", rent: "Louer", buy: "Acheter", monthly: "par mois", annual: "par an",
    noMatch: "Les données disponibles ne proposent aucun lieu compatible avec ces choix et ce budget.", noMatchAction: "Modifier les choix", matchReason: "Pourquoi ce lieu",
    housingAssumptions: "Hypothèses de logement", afterHousing: "Après le logement", availableBeforeLivingCosts: "Avant les autres dépenses courantes",
    source: "Sources", updated: "Mis à jour le", method: "Notre calcul",
    disclaimer: "Estimation indicative pour le Portugal continental. Elle ne remplace pas un conseil fiscal et ne confirme ni l’éligibilité ni l’accord d’un crédit.",
    error: "Saisissez un salaire net valide supérieur à zéro.", fxNeeded: "La conversion nécessite un taux de change avec une source et une date. Aucun taux n’est inventé.",
    exchangeRate: "Taux de change", exchangeDate: "Date du taux", currency: "Devise", loading: "Calcul en cours", back: "Retour",
    countries: { lu: "Luxembourg", ch: "Suisse", fr: "France", pt: "Portugal", de: "Allemagne", be: "Belgique", es: "Espagne", ie: "Irlande", nl: "Pays-Bas", at: "Autriche", it: "Italie", gb: "Royaume-Uni", us: "États-Unis", br: "Brésil", il: "Israël", other: "Autre pays" },
    preferences: { beach: "Plage", surf: "Surf", golf: "Golf", art: "Art", food: "Gastronomie", schools: "Écoles", airport: "Aéroport", business: "Affaires", quiet: "Calme" },
  },
};

export const regressarCopy = (lang: Lang): RegressarCopy => REGRESSAR_COPY[lang];
