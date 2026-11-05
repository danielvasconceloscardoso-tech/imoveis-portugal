import { experienceCopy } from '../lib/regressar-experience-copy';
import type { RankedCity } from '../lib/regressar-places';
import type { Lang } from '../i18n';

/** Loaded only after a place is selected. Abort guards prevent stale place facts. */
export async function renderRegressarLife(root:HTMLElement,place:RankedCity,netMonthly:number,lang:Lang,signal:AbortSignal) {
 const c=experienceCopy(lang), locale=lang==='pt'?'pt-PT':lang==='en'?'en-US':'fr-FR';
 const q=(name:string)=>root.querySelector<HTMLElement>(`[data-r-${name}]`);
 const money=(n:number)=>new Intl.NumberFormat(locale,{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n);
 const words={pt:{drive:'de carro',straight:'em linha reta',from:'Origem',international:'Nesta seleção: apenas a escola internacional mais próxima registada; não representa todas as escolas locais.',rent:'para arrendar',buy:'para comprar',loan:'Crédito ilustrativo: 30 anos, 3% nominal, entrada de 20%. Impostos, seguros, manutenção e despesas excluídos. Sem garantia de financiamento ou imóveis disponíveis.',reference:'Mediana INE',month:'mês'},en:{drive:'by car',straight:'straight line',from:'Origin',international:'This selection records only the nearest international school, not all local schools.',rent:'to rent',buy:'to buy',loan:'Illustrative mortgage: 30 years, 3% nominal interest, 20% deposit. Taxes, insurance, maintenance and fees excluded. No financing or available-property guarantee.',reference:'INE median',month:'month'},fr:{drive:'en voiture',straight:'à vol d’oiseau',from:'Origine',international:'Cette sélection indique uniquement l’école internationale la plus proche enregistrée, pas toutes les écoles locales.',rent:'à louer',buy:'à acheter',loan:'Prêt indicatif : 30 ans, taux nominal de 3 %, apport de 20 %. Impôts, assurances, entretien et frais exclus. Aucune garantie de financement ou de bien disponible.',reference:'Médiane INE',month:'mois'}}[lang];
 const put=(parent:HTMLElement,tag:string,value:string)=>{const el=document.createElement(tag);el.textContent=value;parent.append(el);return el;};
 for(const name of ['schools','hospitals','buying-power']){const el=q(name);el?.replaceChildren();el?.setAttribute('aria-busy','true');}
 try {
  const {getPlaceLife,purchasingPower}=await import('../lib/regressar-life');
  if(signal.aborted)return;
  const data=getPlaceLife(place.id), power=purchasingPower(netMonthly,place);
  for(const name of ['schools','hospitals'] as const){
   const list=q(name);if(!list)continue;list.replaceChildren();
   for(const item of data[name]){
    const li=put(list,'li','');put(li,'strong',item.name);
    put(li,'span',`${item.minutes!==null?`${item.minutes} min ${words.drive} · `:''}${item.km} km${item.distanceMode==='straight-line'?` · ${words.straight}`:''}`);
    if(item.curriculum)put(li,'small',item.curriculum);
    put(li,'small',item.kind);
    const link=put(li,'a',`${c.source} · ${item.checkedOn}`) as HTMLAnchorElement;link.href=item.sourceUrl;link.target='_blank';link.rel='noopener';
   }
   if(!data[name].length)put(list,'li',c.noData);
   list.removeAttribute('aria-busy');
  }
  const target=q('buying-power');if(target){target.replaceChildren();if(power){
   put(target,'p',`${c.rentArea}: ≈ ${Math.floor(power.maxRentAreaM2)} m² · ${money(power.housingBudget)} / ${words.month}`);
   put(target,'p',`${c.buyArea}: ≈ ${Math.floor(power.maxBuyAreaM2)} m² · ${money(power.maxPurchasePrice)}`);
   put(target,'p',`${c.deposit}: ${money(power.deposit)} + ${{pt:'impostos e despesas',en:'taxes and fees',fr:'impôts et frais'}[lang]}`);
   put(target,'small',`${words.reference} · ${place.period} · ${money(place.priceM2)}/m² · ${words.loan}`);
  }else put(target,'p',c.noData);target.removeAttribute('aria-busy');}
  const note=q('life-note');if(note)note.textContent=`${c.coverageNote} ${{pt:'As escolas apresentadas são uma seleção de escolas privadas e internacionais. Os tempos de carro são estimativas OSRM em trânsito livre a partir da origem registada, não de uma casa escolhida.',en:'Schools shown are a selection of private and international schools. Driving times are free-flow OSRM estimates from the recorded origin, not a selected home.',fr:'Les écoles présentées sont une sélection d’établissements privés et internationaux. Les temps de route sont des estimations OSRM en circulation fluide depuis l’origine enregistrée, pas depuis un logement choisi.'}[lang]} ${data.schoolCoverage==='nearest-international-only'?words.international+' ':''}${c.medicalNote} ${c.distanceNote} ${data.origin?`${words.from}: ${data.origin.name}.`:''}`;
 }catch{
  if(signal.aborted)return;
  for(const name of ['schools','hospitals','buying-power']){const el=q(name);if(el){el.replaceChildren();put(el,name==='buying-power'?'p':'li',c.noData);el.removeAttribute('aria-busy');}}
 }
}
