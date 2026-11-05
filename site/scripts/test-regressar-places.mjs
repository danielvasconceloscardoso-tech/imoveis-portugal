import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {rankCities,REGRESSAR_PLACES,regressarMapHref,housingPayment,VERIFIED_PREFERENCES} from '../src/lib/regressar-places.ts';
let count=0;
const test=(name,fn)=>{fn();count++;console.log(`PASS ${name}`)};
const json=p=>JSON.parse(readFileSync(new URL(p,import.meta.url),'utf8'));
const prices=json('../src/data/prices.json'), tiles=json('../public/data/map/tiles.json');
test('municipal INE prices, rents and periods match repository source',()=>{
 assert.equal(new Set(REGRESSAR_PLACES.map(p=>p.id)).size,REGRESSAR_PLACES.length);
 for(const p of REGRESSAR_PLACES){assert.equal(p.priceM2,prices.munis[p.id].m2.at(-1));assert.equal(p.rentM2,prices.munis[p.id].rq.at(-1));assert.equal(p.period,prices.quarters.at(-1));assert.ok(p.rentM2>0&&p.priceM2>0)}
});
test('licensed real image files, three-language alt and developer credit',()=>{
 const sources=readFileSync(new URL('../../content/media/SOURCES.md',import.meta.url),'utf8');
 for(const p of REGRESSAR_PLACES){assert.ok(existsSync(fileURLToPath(new URL(`../public${p.photo}`,import.meta.url))),p.photo);assert.ok(sources.includes(p.photo.split('/').at(-1).replace(/-1024\.webp$/,'')),p.photo);for(const lang of ['pt','en','fr'])assert.ok(p.alt[lang]?.length>5);if(p.id==='gondomar')assert.equal(p.photoCredit,'Shalu Investments')}
});
test('all 64 combinations of selected tastes are hard filters',()=>{
 for(let bits=0;bits<2**VERIFIED_PREFERENCES.length;bits++){const preferences=VERIFIED_PREFERENCES.filter((_,i)=>bits&(1<<i));for(const p of rankCities({netMonthly:100000,preferences}).matches){for(const pref of preferences)assert.ok(p.evidence[pref]);assert.deepEqual(p.matchedPreferences,preferences)}}
});
test('unsupported constraints are never silently ignored',()=>{
 for(const pref of ['surf','business','quiet','invented']){const r=rankCities({netMonthly:100000,preferences:['beach',pref]});assert.equal(r.reason,'unsupported-preference');assert.deepEqual(r.matches,[]);assert.deepEqual(r.unsupportedPreferences,[pref])}
});
test('invalid income, assumptions and empty affordable sets',()=>{
 for(const n of [NaN,Infinity,-1,0])assert.equal(rankCities({netMonthly:n}).reason,'invalid-input');
 for(const patch of [{areaM2:0},{areaM2:NaN},{budgetShare:1.1},{depositPercent:-1},{annualRate:-1},{termYears:0},{housingMode:'invented'}])assert.equal(rankCities({netMonthly:7000,...patch}).reason,'invalid-input');
 assert.equal(rankCities({netMonthly:1}).reason,'no-affordable-match');
});
test('exact affordability boundary, unrounded cost',()=>{
 const p=REGRESSAR_PLACES.find(p=>p.id==='porto'), n=p.rentM2*80/.35;
 assert.ok(rankCities({netMonthly:n+.000001}).matches.some(c=>c.id===p.id));assert.ok(!rankCities({netMonthly:n-.000001}).matches.some(c=>c.id===p.id));
});
test('affordable sets grow monotonically and respect budgets in both modes',()=>{
 for(const housingMode of ['rent','buy']){let prev=new Set();for(const netMonthly of [100,500,1000,2500,4500,7000,100000]){const r=rankCities({netMonthly,housingMode}),ids=new Set(r.matches.map(p=>p.id));for(const id of prev)assert.ok(ids.has(id));prev=ids;for(const p of r.matches){assert.ok(p.monthlyHousing<=netMonthly*.35);assert.equal(p.remainingMonthly,netMonthly-p.monthlyHousing);assert.equal(p.purchasePrice,p.priceM2*80);assert.equal(p.deposit,p.purchasePrice*.2);assert.equal(p.loan,p.purchasePrice-p.deposit);if(housingMode==='rent')assert.equal(p.monthlyHousing,p.rentM2*80)}}}
});
test('mortgage zero rate and independent annuity reference',()=>{
 assert.equal(housingPayment(120000,0,10),1000);assert.ok(Math.abs(housingPayment(100000,12,1)-1000/(1-1.01**-12))<1e-8);assert.equal(housingPayment(0,3,30),0);assert.ok(Number.isNaN(housingPayment(-1,3,30)));
});
test('distance evidence is source-backed, comparable and within thresholds',()=>{
 for(const p of REGRESSAR_PLACES){const t=tiles.m[p.id];if(p.evidence.beach){assert.equal(p.evidence.beach.value,t.bch);assert.ok(t.bch<=10)}if(p.evidence.airport){assert.equal(p.evidence.airport.value,t.ap[1]);assert.ok(t.ap[1]<=40)}if(p.evidence.schools){assert.equal(p.evidence.schools.value,t.sch.km);assert.ok(t.sch.km<=15)}for(const e of Object.values(p.evidence)){assert.match(e.source,/^https:\/\//);assert.match(e.checked,/^2026-\d{2}-\d{2}$/)}}
});
test('deterministic sorting, deduplicated tastes and salary-free map handoff',()=>{
 const input={netMonthly:4500,preferences:['beach','airport']};assert.deepEqual(rankCities(input),rankCities(input));assert.deepEqual(rankCities({...input,preferences:['beach','beach','airport']}).matches,rankCities(input).matches);assert.equal(regressarMapHref('gondomar','pt','lu'),'/pt/lu/mapa/?place=gondomar');assert.equal(regressarMapHref('porto','en','us'),'/en/us/map/?place=porto');assert.ok(!regressarMapHref('porto','fr','fr').includes('4500'));
});
console.log(`Places: ${count} contracts passed; ${REGRESSAR_PLACES.length} municipalities.`);
