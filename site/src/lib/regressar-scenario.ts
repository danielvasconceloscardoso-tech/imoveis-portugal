import type { Lang } from '../i18n';
import type { EligibilityResult, EligibilityReason } from './regressar-eligibility';
export type ProgrammeScenarioMode = 'hypothetical' | 'compatible' | 'standard';
export type ProgrammeScenarioReason = EligibilityReason | 'conditions-assumed' | 'answers-compatible' | 'user-choice' | 'unsupported-assessment';
export type ProgrammeScenario = {
 useBenefit:boolean; mode:ProgrammeScenarioMode;
 /** Availability of a labelled scenario, not confirmation of legal entitlement. */
 benefitAvailable:boolean; reason:ProgrammeScenarioReason; eligibilityConfirmed:false;
};
/** Presentation only: missing answers permit a disclosed assumption. Known failed
 * conditions and unsupported cohorts never inherit that optimistic assumption.
 * Does not change the screening flags, statutory source status or tax arithmetic. */
export function decideProgrammeScenario(assessment:EligibilityResult,preferBenefit=true):ProgrammeScenario {
 const standard=(benefitAvailable:boolean,reason:ProgrammeScenarioReason):ProgrammeScenario=>({useBenefit:false,mode:'standard',benefitAvailable,reason,eligibilityConfirmed:false});
 if(assessment.reasons.length)return standard(false,assessment.reasons[0]);
 if(assessment.status==='not-eligible')return standard(false,'unsupported-assessment');
 const compatible=assessment.status==='potentially-eligible'&&assessment.benefitMayBeCompared===true&&assessment.missing.length===0;
 const hypothetical=assessment.status==='incomplete'&&assessment.benefitMayBeCompared===false&&assessment.missing.length>0;
 if(!compatible&&!hypothetical)return standard(false,'unsupported-assessment');
 if(!preferBenefit)return standard(true,'user-choice');
 return {useBenefit:true,mode:compatible?'compatible':'hypothetical',benefitAvailable:true,reason:compatible?'answers-compatible':'conditions-assumed',eligibilityConfirmed:false};
}
export interface ProgrammeScenarioCopy {
 title:string;standardTitle:string;assumedNote:string;compatibleNote:string;standardNote:string;
 monthlyNet:string;annualGross:string;standardComparison:string;checkConditions:string;programmeName:string;
 annualBasisNote:string;benefitLabel:string;assumedLabel:string;compatibleLabel:string;standardLabel:string;
}
const COPY:Readonly<Record<Lang,ProgrammeScenarioCopy>>={
 pt:{title:'O seu regresso, com Programa Regressar.',standardTitle:'O seu rendimento em Portugal.',
 assumedNote:'Simulação com o benefício do artigo 12.º-A, assumindo que cumpre as condições. Confirme-as na lista abaixo.',
 compatibleNote:'As suas respostas são compatíveis com este cenário. Confirme o enquadramento com a Autoridade Tributária.',
 standardNote:'Este resultado não aplica o benefício. Consulte as condições ou procure apoio oficial para o seu caso.',
 monthlyNet:'Líquido mensal médio',annualGross:'Bruto anual necessário',standardComparison:'Comparar sem benefício',checkConditions:'Confirmar as condições',programmeName:'Programa Regressar',
 annualBasisNote:'Média do líquido anual dividida por 12; não é o valor de um recibo mensal.',benefitLabel:'Simular com Programa Regressar',
 assumedLabel:'Cenário com benefício · condições por confirmar',compatibleLabel:'Cenário com benefício · respostas compatíveis',standardLabel:'Cenário sem benefício'},
 en:{title:'Your return, with Programa Regressar.',standardTitle:'Your income in Portugal.',
 assumedNote:'A scenario with Article 12-A relief, assuming you meet its conditions. Check them in the list below.',
 compatibleNote:'Your answers are compatible with this scenario. Confirm your tax position with the Portuguese Tax Authority.',
 standardNote:'This result does not apply the relief. Check the conditions or seek official support for your circumstances.',
 monthlyNet:'Average monthly take-home pay',annualGross:'Required annual gross',standardComparison:'Compare without relief',checkConditions:'Check the conditions',programmeName:'Programa Regressar',
 annualBasisNote:'Annual take-home pay divided by 12; this is not the amount on a monthly payslip.',benefitLabel:'Simulate with Programa Regressar',
 assumedLabel:'Relief scenario · conditions still to check',compatibleLabel:'Relief scenario · compatible answers',standardLabel:'Scenario without relief'},
 fr:{title:'Votre retour, avec le Programa Regressar.',standardTitle:'Votre revenu au Portugal.',
 assumedNote:'Simulation avec l’avantage de l’article 12-A, en supposant que vous remplissez les conditions. Vérifiez-les dans la liste ci-dessous.',
 compatibleNote:'Vos réponses sont compatibles avec ce scénario. Confirmez votre situation auprès de l’administration fiscale portugaise.',
 standardNote:'Ce résultat n’applique pas l’avantage. Vérifiez les conditions ou demandez un accompagnement officiel pour votre situation.',
 monthlyNet:'Salaire net mensuel moyen',annualGross:'Brut annuel nécessaire',standardComparison:'Comparer sans avantage',checkConditions:'Vérifier les conditions',programmeName:'Programa Regressar',
 annualBasisNote:'Le net annuel divisé par 12 ; ce n’est pas le montant d’une fiche de paie mensuelle.',benefitLabel:'Simuler avec le Programa Regressar',
 assumedLabel:'Scénario avec avantage · conditions à vérifier',compatibleLabel:'Scénario avec avantage · réponses compatibles',standardLabel:'Scénario sans avantage'},
};
export const scenarioCopy=(lang:Lang):ProgrammeScenarioCopy=>COPY[lang];
