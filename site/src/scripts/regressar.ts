import { regressarCopy } from '../lib/regressar-copy';
import { COUNTRIES, getCountry, getSalaryCurrency, convertCurrencyNetToEuro } from '../lib/regressar-fx';
import { annualizeNet, grossForNet, TAX_2026 } from '../lib/regressar-tax';
import { rankCities, regressarMapHref, REGRESSAR_PLACES, type Preference, type RankedCity, type HousingMode } from '../lib/regressar-places';
import { assessEligibility, ELIGIBILITY_QUESTIONS, ELIGIBILITY_COPY, type EligibilityAnswers, type EligibilityAnswer } from '../lib/regressar-eligibility';
import { decideProgrammeScenario, scenarioCopy } from '../lib/regressar-scenario';
import { initRegressarSupport } from './regressar-support';
import type { Lang, EdCode } from '../i18n';

/** Salary values remain in this closure: no storage, URL serialization or analytics payload. */
export function initRegressar() {
 const root=document.querySelector<HTMLElement>('[data-regressar]');
 if(!root || root.dataset.initialized) return;
 root.dataset.initialized='true';
 const lang=(root.dataset.lang||'pt') as Lang, ed=(root.dataset.ed||'lu') as EdCode;
 const c=regressarCopy(lang), locale=lang==='pt'?'pt-PT':lang==='en'?'en-US':'fr-FR';
 const q=<T extends HTMLElement=HTMLElement>(key:string)=>root.querySelector<T>(`[data-r-${key}]`)!;
 const text=(key:string,value:string)=>{const e=q(key);if(e)e.textContent=value;};
 const euro=(value:number)=>new Intl.NumberFormat(locale,{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value);
 const country=q<HTMLSelectElement>('country'), net=q<HTMLInputElement>('net'), period=q<HTMLSelectElement>('period'), payments=q<HTMLSelectElement>('payments');
 const sourceCurrency=q<HTMLSelectElement>('currency-select'),ptPayments=q<HTMLSelectElement>('pt-payments');
 const result=q('result'), error=q('error'), discovery=q('discovery'), benefit=q<HTMLInputElement>('benefit'), reveal=q<HTMLButtonElement>('reveal');
 let targetAnnual=0, revealIndex=0, generation=0;
 let preferBenefit=true, displayedGross=0,powerRevision=0;
 let lifeAbort:AbortController|undefined;
 let mapTask:Promise<import("./regressar-map").RegressarMapHandle>|undefined;
 let mapMatches:RankedCity[]=[], mapSelected="";
 const preferences=new Set<Preference>();
 const signal=(step:string)=>root.dispatchEvent(new CustomEvent('regressar:step',{bubbles:true,detail:{step}}));
 const range={pt:'Este modelo cobre líquidos anuais equivalentes entre 20 000 € e 500 000 €. Abaixo desse intervalo, o mínimo de existência exige outro cálculo.',en:'This model covers equivalent annual net income from €20,000 to €500,000. Below this range, minimum-income protection requires a different calculation.',fr:'Ce modèle couvre un revenu net annuel équivalent de 20 000 € à 500 000 €. En dessous, la protection du minimum de revenu exige un autre calcul.'}[lang];
 const resetCity=()=>{generation++;lifeAbort?.abort();mapMatches=[];mapSelected='';q('mini-map').hidden=true;q('local-life').hidden=true;const preview=q('reveal-preview');if(preview)preview.hidden=true;q('city').hidden=true;q('no-match').hidden=true;reveal.disabled=false;reveal.textContent=c.reveal;reveal.removeAttribute('aria-busy');revealIndex=0;};
 function syncCurrency(){const quote=getSalaryCurrency(sourceCurrency.value);text('currency',quote.currency);net.setAttribute('aria-label',`${c.netSalary} (${quote.currency})`);}
 function syncCountry(){sourceCurrency.value=getCountry(country.value).currency;syncCurrency();}
 function syncPeriod(){payments.disabled=period.value==='year';payments.closest<HTMLElement>('[data-r-payment-wrap]')?.toggleAttribute('hidden',period.value==='year');}
 function eligibility(){
  const answers:EligibilityAnswers={returnYear:q<HTMLSelectElement>('return-year').value?Number(q<HTMLSelectElement>('return-year').value):null};
  for(const {id} of ELIGIBILITY_QUESTIONS)answers[id]=root.querySelector<HTMLSelectElement>(`[data-r-eligibility="${id}"]`)?.value as EligibilityAnswer;
  return assessEligibility(answers);
 }
 function refreshEligibility(){
  const assessment=eligibility(), copy=ELIGIBILITY_COPY[lang], status=q('eligibility-status');
  status.dataset.status=assessment.status;
  status.textContent=assessment.reasons.includes('legacy-rules-required')?copy.legacy:assessment.reasons.includes('outside-return-window')?copy.window:copy[assessment.status];
  const preview=decideProgrammeScenario(assessment,preferBenefit);
  benefit.disabled=!preview.benefitAvailable;benefit.checked=preview.useBenefit;
  if(targetAnnual)calculate(false);
 }
 function updateNegotiation(){
  const payments=Number(ptPayments.value);
  if(payments!==12&&payments!==14)return;
  text('negotiation-gross',euro(displayedGross/payments));
  text('negotiation-label',({pt:`Brutos por pagamento · ${payments} pagamentos/ano`,en:`Gross per payment · ${payments} payments/year`,fr:`Brut par versement · ${payments} versements/an`})[lang]);
 }
 async function updatePower(){
  const ticket=++powerRevision, amount=targetAnnual/12,place=REGRESSAR_PLACES.find(p=>p.id===q<HTMLSelectElement>('power-place').value),panel=q('power-preview');
  if(!place||!amount)return;
  panel.setAttribute('aria-busy','true');
  try{
   const {purchasingPower}=await import('../lib/regressar-life');
   if(ticket!==powerRevision||targetAnnual/12!==amount)return;
   const power=purchasingPower(amount,place);if(!power)return;
   panel.replaceChildren();
   const rows={pt:[`≈ ${Math.floor(power.maxRentAreaM2)} m² para arrendar · ${euro(power.housingBudget)}/mês`,`≈ ${Math.floor(power.maxBuyAreaM2)} m² para comprar · ${euro(power.maxPurchasePrice)}`,`Entrada necessária: ${euro(power.deposit)} + impostos e despesas`],en:[`≈ ${Math.floor(power.maxRentAreaM2)} m² to rent · ${euro(power.housingBudget)}/month`,`≈ ${Math.floor(power.maxBuyAreaM2)} m² to buy · ${euro(power.maxPurchasePrice)}`,`Deposit required: ${euro(power.deposit)} + taxes and fees`],fr:[`≈ ${Math.floor(power.maxRentAreaM2)} m² à louer · ${euro(power.housingBudget)}/mois`,`≈ ${Math.floor(power.maxBuyAreaM2)} m² à acheter · ${euro(power.maxPurchasePrice)}`,`Apport nécessaire : ${euro(power.deposit)} + impôts et frais`]}[lang];
   for(const row of rows){const p=document.createElement('p');p.textContent=row;panel.append(p);}
   const source=document.createElement('small');source.textContent=`${place.name} · INE · ${place.period}`;panel.append(source);
  }catch{if(ticket===powerRevision)panel.textContent={pt:'Não foi possível carregar este cenário.',en:'This housing scenario could not be loaded.',fr:'Ce scénario logement ne peut pas être chargé.'}[lang];}
  finally{if(ticket===powerRevision)panel.removeAttribute('aria-busy');}
 }
 function calculate(scroll=true){
  error.hidden=true;net.removeAttribute('aria-invalid');
  try {
   let raw=net.value.trim().replace(/[\s\u00a0\u202f']/g,'');
   if(!/^[0-9.,]+$/.test(raw))throw new Error(c.error);
   if(raw.includes(',')&&raw.includes('.')){const decimal=raw.lastIndexOf(',')>raw.lastIndexOf('.')?',':'.';raw=raw.split(decimal==='.'?',':'.').join('').replace(decimal,'.');}
   else if(raw.includes(',')){raw=lang==='en'&&/^\d{1,3}(,\d{3})+$/.test(raw)?raw.replace(/,/g,''):raw.replace(',','.');}
   else if(lang!=='en'&&/^\d{1,3}(\.\d{3})+$/.test(raw)){raw=raw.replace(/\./g,'');}
   const amount=Number(raw);
   if(!net.value.trim()||!Number.isFinite(amount)||amount<=0)throw new Error(c.error);
   const annualLocal=annualizeNet(amount,period.value as 'month'|'year',Number(payments.value));
   targetAnnual=convertCurrencyNetToEuro(annualLocal,sourceCurrency.value);
   if(targetAnnual<20000||targetAnnual>500000)throw new Error(range);
   const preview=decideProgrammeScenario(eligibility(),preferBenefit), wording=scenarioCopy(lang);
   benefit.disabled=!preview.benefitAvailable;benefit.checked=preview.useBenefit;
   result.dataset.scenario=preview.mode;
   text('scenario-note',preview.mode==='hypothetical'?wording.assumedNote:preview.mode==='compatible'?wording.compatibleNote:wording.standardNote);
   text('result-title',preview.useBenefit?({pt:'O bruto para negociar em Portugal.',en:'Your gross salary to negotiate in Portugal.',fr:'Le brut à négocier au Portugal.'})[lang]:wording.standardTitle);
   text('hero-net-label',wording.monthlyNet);text('annual-basis',wording.annualBasisNote);text('gross-label',wording.annualGross);
   const standard=grossForNet(targetAnnual,{regressar:false});
   const conditional=preview.benefitAvailable?grossForNet(targetAnnual,{regressar:true}):null;
   text('standard-gross',euro(standard.grossAnnual));text('benefit-gross',conditional?euro(conditional.grossAnnual):'—');
   text('programme-difference',conditional?`${{pt:'Menos bruto necessário',en:'Less gross required',fr:'Brut nécessaire en moins'}[lang]}: ${euro(standard.grossAnnual-conditional.grossAnnual)} / ${c.year.toLowerCase()}`:'');
   const projected=preview.useBenefit?conditional!:standard;
   displayedGross=projected.grossAnnual;updateNegotiation();
   text('hero-net',euro(projected.netAnnual/12));
   text('gross',euro(projected.grossAnnual));text('net-result',euro(projected.netAnnual));
   text('declared',euro(targetAnnual));text('irs',euro(projected.irs));text('ss',euro(projected.socialSecurity));text('solidarity',euro(projected.solidarity));
   text('source-amount',new Intl.NumberFormat(locale,{style:'currency',currency:getSalaryCurrency(sourceCurrency.value).currency,maximumFractionDigits:0}).format(annualLocal));
   text('alternative',`${c.standard}: ${euro(standard.grossAnnual)} / ${c.year.toLowerCase()}`);
   text('effective',`${Math.round((projected.irs+projected.solidarity+projected.socialSecurity)/projected.grossAnnual*100)}%`);
   const current=getSalaryCurrency(sourceCurrency.value);
   text('fx',current.rateDate?`${c.exchangeRate}: 1 EUR = ${current.perEuro} ${current.currency} · ${current.rateDate} · BCE / ECB`:'EUR → EUR');
   const fx=q<HTMLAnchorElement>('fx');if(fx?.tagName==='A'){fx.href=current.source||'https://www.ecb.europa.eu/';}
   text('budget',`${euro(targetAnnual/12*.35)} / ${c.month.toLowerCase()}`);
   result.hidden=false;discovery.hidden=false;resetCity();void updatePower();signal('result');
   if(scroll)result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }catch(e){targetAnnual=0;powerRevision++;result.hidden=true;discovery.hidden=true;resetCity();error.textContent=e instanceof Error?e.message:c.error;error.hidden=false;net.setAttribute('aria-invalid','true');if(scroll)net.focus();}
 }
 root.querySelector('form')?.addEventListener('submit',e=>{e.preventDefault();calculate();});
 benefit.addEventListener('change',()=>{preferBenefit=benefit.checked;if(targetAnnual)calculate(false);});
 q('return-year').addEventListener('change',refreshEligibility);
 root.querySelectorAll<HTMLSelectElement>('[data-r-eligibility]').forEach(el=>el.addEventListener('change',refreshEligibility));
 for(const e of [country,sourceCurrency,net,period,payments])e.addEventListener('input',()=>{targetAnnual=0;powerRevision++;result.hidden=true;discovery.hidden=true;resetCity();error.hidden=true;});
 country.addEventListener('change',syncCountry);sourceCurrency.addEventListener('change',syncCurrency);
 ptPayments.addEventListener('change',updateNegotiation);q('power-place').addEventListener('change',()=>void updatePower());period.addEventListener('change',syncPeriod);
 root.querySelectorAll<HTMLButtonElement>('[data-r-preference]').forEach(button=>button.addEventListener('click',()=>{const value=button.dataset.rPreference as Preference;preferences.has(value)?preferences.delete(value):preferences.add(value);button.setAttribute('aria-pressed',String(preferences.has(value)));resetCity();signal('preference');}));
 q<HTMLSelectElement>('housing').addEventListener('change',resetCity);
 async function showPlace(place:RankedCity,matches:RankedCity[]){
  const city=q('city');text('city-name',place.name);text('city-story',place.line[lang]);
  const photo=q<HTMLImageElement>('city-photo');photo.src=place.photo;photo.alt=place.alt[lang];
  text('city-housing',`${q<HTMLSelectElement>('housing').value==='rent'?c.rent:c.buy} · 80 m²`);text('city-cost',`${euro(place.monthlyHousing)} / ${c.month.toLowerCase()}`);
  text('city-price',`${euro(place.priceM2)} / m²`);text('city-period',`INE · ${place.period}`);
  text('city-credit',place.photoCredit||'');text('city-deposit',q<HTMLSelectElement>('housing').value==='buy'?`${{pt:'Entrada necessária',en:'Deposit required',fr:'Apport nécessaire'}[lang]}: ${euro(place.deposit)} + ${{pt:'impostos e despesas',en:'taxes and fees',fr:'impôts et frais'}[lang]}`:'');text('after-housing',euro(targetAnnual/12-place.monthlyHousing));
  text('city-budget',`${euro(targetAnnual/12*.35)} / ${c.month.toLowerCase()}`);
  const link=q<HTMLAnchorElement>('map');link.href=regressarMapHref(place.id,lang,ed);
  const evidence=q('city-evidence');evidence.replaceChildren();
  for(const preference of preferences){const fact=place.evidence[preference];if(!fact)continue;const li=document.createElement('li'),a=document.createElement('a');a.href=fact.source;a.target='_blank';a.rel='noopener';a.textContent=`${c.preferences[preference]} · ${fact.detail}${fact.value!==null&&fact.unit==='km-straight-line'?` · ${fact.value} km ${{pt:'em linha reta',en:'straight line',fr:'à vol d’oiseau'}[lang]}`:''}`;li.append(a);evidence.append(li);}
  if(!preferences.size){const li=document.createElement('li');li.textContent=`80 m² · ${Math.round(place.monthlyHousing/(targetAnnual/12)*100)}% ${c.netSalary.toLowerCase()} / ${c.month.toLowerCase()}`;evidence.append(li);}
  city.hidden=false;q('local-life').hidden=false;city.dataset.place=place.id;reveal.textContent=c.another;
  lifeAbort?.abort();lifeAbort=new AbortController();const lifeSignal=lifeAbort.signal, monthly=targetAnnual/12;
  for(const name of ['schools','hospitals','buying-power']){const el=q(name);if(el){el.replaceChildren();el.setAttribute('aria-busy','true');}}
  text('life-note','');
  void import('./regressar-life-view').then(({renderRegressarLife})=>{if(!lifeSignal.aborted)return renderRegressarLife(root,place,monthly,lang,lifeSignal);}).catch(()=>{if(!lifeSignal.aborted)text('life-note',{pt:'Não foi possível carregar estes dados. A ligação ao mapa continua disponível.',en:'These details could not be loaded. The map link remains available.',fr:'Ces données ne sont pas disponibles. Le lien vers la carte reste accessible.'}[lang]);});

  q('city-name').focus({preventScroll:true});city.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  signal('place');
  const container=q('mini-map');
  if(container){
   container.hidden=false;
   mapMatches=matches;mapSelected=place.id;
   mapTask??=import('./regressar-map').then(({showRegressarMap})=>showRegressarMap(container,mapMatches,mapSelected,(id:string)=>{const chosen=mapMatches.find(p=>p.id===id);if(chosen&&targetAnnual>0)void showPlace(chosen,mapMatches);}));
   void mapTask.then(handle=>handle.update(mapMatches,mapSelected)).catch(()=>{container.dataset.unavailable='true';mapTask=undefined;});
  }
 }
 reveal.addEventListener('click',async()=>{
  if(!targetAnnual)return;
  const ranked=rankCities({netMonthly:targetAnnual/12,preferences:[...preferences],housingMode:q<HTMLSelectElement>('housing').value as HousingMode});
  const matches=ranked.matches;
  if(!matches.length){q('city').hidden=true;q('no-match').hidden=false;signal('no-match');return;}
  const ticket=++generation;reveal.disabled=true;reveal.setAttribute('aria-busy','true');reveal.textContent=c.revealing;
  const selected=matches[revealIndex++%matches.length];
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
   const preview=q('reveal-preview');if(preview){preview.hidden=false;for(const item of matches.slice(0,3)){if(ticket!==generation)return;preview.textContent=item.name;await new Promise(resolve=>setTimeout(resolve,160));}preview.hidden=true;}
  }
  if(ticket!==generation)return;
  await showPlace(selected,matches);reveal.disabled=false;reveal.removeAttribute('aria-busy');
 });
 const method=q('method-detail');
 if(method){
  const explanation={pt:'Bruto − 11% Segurança Social − IRS progressivo − solidariedade = líquido anual. Dedução específica: maior de 4 587,09 € e contribuições obrigatórias; proporcional no cenário 12.º-A. Sem deduções pessoais à coleta. Bruto encontrado por pesquisa em cêntimos; apresentação arredondada ao euro.',en:'Gross − 11% social security − progressive income tax − solidarity = annual net. Specific deduction: greater of €4,587.09 and mandatory contributions, proportionally allocated for Article 12-A. No personal tax credits. Gross solved in cents; displayed amounts rounded to euros.',fr:'Brut − 11 % de cotisations − impôt progressif − solidarité = net annuel. Déduction spécifique : maximum de 4 587,09 € et des cotisations obligatoires, réparti proportionnellement pour l’article 12-A. Aucun crédit d’impôt personnel. Calcul en centimes ; affichage arrondi à l’euro.'}[lang];
  method.textContent=`${explanation} ${c.updated}: ${TAX_2026.updated} · ${TAX_2026.version}.`;
 }
 const sources=q('sources');
 if(sources){const ul=document.createElement('ul');for(const source of TAX_2026.sources){const li=document.createElement('li'),a=document.createElement('a');a.href=source.url;a.textContent=source.name;a.rel='noopener';a.target='_blank';li.append(a);ul.append(li);}sources.append(ul);}
 syncCountry();syncPeriod();refreshEligibility();initRegressarSupport(root,lang);signal('arrival');
}
