import { buildReturnBrief, supportCopy } from '../lib/regressar-support';
import { regressarCopy } from '../lib/regressar-copy';
import type { Lang } from '../i18n';

/** A user-controlled preparation aid, not a messaging or booking integration. */
export function initRegressarSupport(root:HTMLElement,lang:Lang) {
 const area=root.querySelector<HTMLTextAreaElement>('[data-r-return-brief]');
 const copy=root.querySelector<HTMLButtonElement>('[data-r-copy-brief]');
 const status=root.querySelector<HTMLElement>('[data-r-brief-status]');
 const country=root.querySelector<HTMLSelectElement>('[data-r-country]');
 const year=root.querySelector<HTMLSelectElement>('[data-r-return-year]');
 if(!area||!copy||!status||!country||!year)return;
 const c=supportCopy(lang);let declaredCountry=false;
 const refresh=()=>{
  area.value=buildReturnBrief({lang,countryName:declaredCountry?regressarCopy(lang).countries[country.value]:undefined,returnYear:year.value?Number(year.value):undefined});
  status.textContent='';
 };
 country.addEventListener('change',()=>{declaredCountry=true;refresh();});
 year.addEventListener('change',refresh);
 copy.addEventListener('click',async()=>{
  try {
   if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
   await navigator.clipboard.writeText(area.value);
   status.textContent=c.copyDone;
  }catch{
   area.focus();area.select();area.setSelectionRange(0,area.value.length);
   status.textContent=c.copyFallback;
  }
 });
 root.querySelectorAll<HTMLAnchorElement>('[data-r-start-programme], [data-r-journey-step="conditions"]').forEach(link=>link.addEventListener('click',()=>{
  const panel=root.querySelector<HTMLDetailsElement>('[data-r-eligibility-panel]');if(panel)panel.open=true;
  requestAnimationFrame(()=>year.focus({preventScroll:true}));
 }));
 refresh();
}
