import type { Lang } from '../i18n';
/** Screening for the 2024–2026 CIRS 12-A cohort, not a tax entitlement or IEFP grant decision. */
export const PROGRAMME_RULES = Object.freeze({
  version: 'CIRS-12A-2024-2026-screening-1', updated: '2026-11-06', taxYear: 2026,
  returnWindow: [2024, 2025, 2026] as readonly number[], benefitTaxYears: 5, sourceVerified: false,
  sourceStatus: 'Inherited statutory assumptions; current primary-source verification is pending.',
  sources: [
    { name: 'CIRS · artigo 12.º-A', url: 'https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs12a.aspx' },
    { name: 'Programa Regressar · apoio fiscal', url: 'https://www.programaregressar.gov.pt/pt/medida-de-apoio-fiscal/' },
  ],
});
export const RETURN_YEARS = PROGRAMME_RULES.returnWindow;
export type EligibilityAnswer = 'yes' | 'no' | 'unknown';
export type EligibilityQuestionId = 'priorResidence' | 'outsidePreviousFiveYears' | 'taxRegular' | 'noNhrRegistration';
export type EligibilityAnswers = Partial<Record<EligibilityQuestionId, EligibilityAnswer>> & { returnYear?: number | null };
export type EligibilityStatus = 'incomplete' | 'potentially-eligible' | 'not-eligible';
export type EligibilityReason = EligibilityQuestionId | 'returnYear' | 'invalid-return-year' | 'legacy-rules-required' | 'outside-return-window';
export type EligibilityResult = {
  status: EligibilityStatus; reasons: EligibilityReason[]; missing: ('returnYear' | EligibilityQuestionId)[];
  /** Conditional comparison only, never a confirmation of entitlement. */
  benefitMayBeCompared: boolean; sourceVerified: false; lookbackYears: number[]; benefitYears: number[]; version: string;
};
type Localized = Record<Lang, string>;
export type EligibilityQuestion = { id: EligibilityQuestionId; label: Localized; hint: Localized; source: string };
const article = PROGRAMME_RULES.sources[0].url;
export const ELIGIBILITY_QUESTIONS: readonly EligibilityQuestion[] = [
  { id: 'priorResidence', source: article,
    label: { pt: 'Já foi residente fiscal em Portugal?', en: 'Have you previously been a tax resident in Portugal?', fr: 'Avez-vous déjà été résident fiscal au Portugal ?' },
    hint: { pt: 'Residência fiscal anterior, não apenas nacionalidade portuguesa.', en: 'Previous tax residence, not Portuguese nationality alone.', fr: 'Une résidence fiscale antérieure, pas seulement la nationalité portugaise.' } },
  { id: 'outsidePreviousFiveYears', source: article,
    label: { pt: 'Esteve sem residência fiscal em Portugal nos cinco anos anteriores ao regresso?', en: 'Were you not tax resident in Portugal in any of the five years before returning?', fr: 'Étiez-vous non-résident fiscal au Portugal durant chacune des cinq années précédant le retour ?' },
    hint: { pt: 'A condição aplica-se a cada um dos cinco anos anteriores ao ano do regresso.', en: 'This must hold for each of the five years preceding the return year.', fr: 'La condition doit être remplie pour chacune des cinq années précédant l’année du retour.' } },
  { id: 'taxRegular', source: article,
    label: { pt: 'Tem a situação tributária regularizada?', en: 'Are your Portuguese tax affairs regularised?', fr: 'Votre situation fiscale portugaise est-elle régularisée ?' },
    hint: { pt: 'Confirme a situação na Autoridade Tributária.', en: 'Confirm this with the Portuguese Tax Authority.', fr: 'Confirmez ce point auprès de l’administration fiscale portugaise.' } },
  { id: 'noNhrRegistration', source: article,
    label: { pt: 'Confirma que não pediu inscrição como residente não habitual (RNH)?', en: 'Can you confirm you have not applied for non-habitual resident (NHR) registration?', fr: 'Confirmez-vous ne pas avoir demandé l’inscription comme résident non habituel (RNH) ?' },
    hint: { pt: 'O pedido de inscrição no RNH é incompatível com este regime. Outros regimes especiais exigem análise própria.', en: 'An NHR registration application is incompatible with this regime. Other special regimes require a separate review.', fr: 'Une demande d’inscription au RNH est incompatible avec ce régime. Les autres régimes particuliers exigent une analyse distincte.' } },
];
export const ELIGIBILITY_COPY = {
  pt: { title: 'O Programa Regressar aplica-se ao seu caso?', returnYear: 'Ano do regresso fiscal', yes: 'Sim', no: 'Não', unknown: 'Não sei ainda',
    incomplete: 'Falta confirmar as condições.', 'potentially-eligible': 'As respostas são compatíveis com este cenário.', 'not-eligible': 'As respostas não cumprem todas as condições deste cenário.',
    disclaimer: 'Triagem informativa, sem confirmação de elegibilidade. Confirme as condições atuais na Autoridade Tributária. O apoio financeiro do IEFP tem regras próprias.',
    legacy: 'Um regresso anterior a 2024 exige verificar as regras aplicáveis nesse ano. Pode ainda existir um benefício anterior; este modelo não o avalia.',
    window: 'Este modelo cobre regressos fiscais em 2024, 2025 ou 2026. Não confirma prorrogações posteriores.', programme: 'Condições oficiais', review: 'Condições legais por rever na fonte oficial.' },
  en: { title: 'Could Programa Regressar apply to you?', returnYear: 'Year you resume Portuguese tax residence', yes: 'Yes', no: 'No', unknown: 'Not sure yet',
    incomplete: 'Some conditions still need confirmation.', 'potentially-eligible': 'Your answers are compatible with this scenario.', 'not-eligible': 'Your answers do not meet all conditions of this scenario.',
    disclaimer: 'Informational screening, not confirmation of entitlement. Check current conditions with the Portuguese Tax Authority. IEFP financial support has separate rules.',
    legacy: 'A return before 2024 requires the rules for that year to be checked. Earlier relief may still apply; this model does not assess it.',
    window: 'This model covers tax residence resumed in 2024, 2025 or 2026. It does not confirm later extensions.', programme: 'Official conditions', review: 'Legal conditions awaiting verification against the official source.' },
  fr: { title: 'Le Programa Regressar peut-il vous concerner ?', returnYear: 'Année du retour fiscal', yes: 'Oui', no: 'Non', unknown: 'Je ne sais pas encore',
    incomplete: 'Certaines conditions restent à confirmer.', 'potentially-eligible': 'Vos réponses sont compatibles avec ce scénario.', 'not-eligible': 'Vos réponses ne remplissent pas toutes les conditions de ce scénario.',
    disclaimer: 'Vérification indicative, sans confirmation de droit. Consultez les conditions actuelles auprès de l’administration fiscale portugaise. L’aide financière de l’IEFP suit des règles distinctes.',
    legacy: 'Un retour antérieur à 2024 exige une vérification des règles de cette année. Un avantage antérieur peut encore s’appliquer ; ce modèle ne l’évalue pas.',
    window: 'Ce modèle couvre les retours fiscaux en 2024, 2025 ou 2026. Il ne confirme aucune prolongation ultérieure.', programme: 'Conditions officielles', review: 'Conditions légales à vérifier auprès de la source officielle.' },
} satisfies Record<Lang, Record<string, string>>;

/** Unknowns fail closed. Known failures precede missing answers. Legacy cohorts are not denied under newer rules. */
export function assessEligibility(answers: EligibilityAnswers = {}): EligibilityResult {
  const result: EligibilityResult = { status: 'incomplete', reasons: [], missing: [], benefitMayBeCompared: false,
    sourceVerified: false, lookbackYears: [], benefitYears: [], version: PROGRAMME_RULES.version };
  const year = answers.returnYear;
  if (year == null) result.missing.push('returnYear');
  else if (typeof year !== 'number' || !Number.isFinite(year) || !Number.isInteger(year) || year < 1) {
    result.reasons.push('invalid-return-year'); result.missing.push('returnYear');
  } else if (year < RETURN_YEARS[0]) { result.reasons.push('legacy-rules-required'); return result; }
  else if (!RETURN_YEARS.includes(year)) { result.status = 'not-eligible'; result.reasons.push('outside-return-window'); return result; }
  else {
    result.lookbackYears = Array.from({ length: 5 }, (_, i) => year - 5 + i);
    result.benefitYears = Array.from({ length: PROGRAMME_RULES.benefitTaxYears }, (_, i) => year + i);
  }
  for (const { id } of ELIGIBILITY_QUESTIONS) {
    if (answers[id] === 'no') result.reasons.push(id);
    else if (answers[id] !== 'yes') result.missing.push(id);
  }
  if (result.reasons.some(reason => ELIGIBILITY_QUESTIONS.some(question => question.id === reason))) result.status = 'not-eligible';
  else if (!result.missing.length && !result.reasons.length) { result.status = 'potentially-eligible'; result.benefitMayBeCompared = true; }
  return result;
}
