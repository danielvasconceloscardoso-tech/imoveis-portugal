// Run from site/: node --import tsx scripts/test-regressar-life.mjs
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {REGRESSAR_PLACES} from '../src/lib/regressar-places.ts';
import {REGRESSAR_LIFE,getPlaceLife,purchasingPower} from '../src/lib/regressar-life.ts';
const repo=fileURLToPath(new URL('../../',import.meta.url));
const json=path=>JSON.parse(readFileSync(repo+path,'utf8'));
function csv(path){
 const s=readFileSync(repo+path,'utf8'),rows=[];let row=[],cell='',quoted=false;
 for(let i=0;i<s.length;i++){const c=s[i];if(c==='"'){if(quoted&&s[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(!quoted&&(c===','||c==='\n')){row.push(cell.replace(/\r$/,''));cell='';if(c==='\n'){rows.push(row);row=[];}}else cell+=c;}
 if(cell||row.length){row.push(cell.replace(/\r$/,''));rows.push(row);}const [head,...body]=rows;return body.filter(r=>r.length===head.length).map(r=>Object.fromEntries(head.map((k,i)=>[k,r[i]])));
}
const cases=[
 ['thirteen municipalities; unknown place never borrows data',()=>{
  assert.deepEqual(Object.keys(REGRESSAR_LIFE).sort(),REGRESSAR_PLACES.map(p=>p.id).sort());const absent=getPlaceLife('unknown-place');assert.equal(absent.coverage,'unavailable');assert.equal(absent.origin,null);assert.deepEqual(absent.schools,[]);assert.deepEqual(absent.hospitals,[]);assert.equal(absent.checkedOn,null);
 }],
 ['three school records are drawn only from the existing free card and source rows',()=>{
  for(const p of REGRESSAR_PLACES){const life=getPlaceLife(p.id);if(life.coverage!=='detailed-drive')continue;
   const source=csv(`content/facts/map/places/${p.id}/schools.csv`).filter(r=>r.card==='1'&&Number(r.drive_min)<=20).sort((a,b)=>Number(a.drive_min)-Number(b.drive_min)).slice(0,3);assert.deepEqual(life.schools.map(x=>x.name),source.map(x=>x.name));const card=json(`site/public/data/map/place/${p.id}.json`).c5;
   for(const item of life.schools){const r=source.find(x=>x.name===item.name);assert.equal(item.minutes,card.sch.find(x=>x[0]===item.name)[1]);assert.equal(item.km,Number(r.drive_km));assert.equal(item.checkedOn,r.checked_on);assert.equal(item.curriculum,r.curriculum);assert.equal(item.distanceMode,'drive');}
  }
 }],
 ['hospitals exclude primary care and retain exact ERS provenance',()=>{
  for(const p of REGRESSAR_PLACES){const life=getPlaceLife(p.id);if(life.coverage!=='detailed-drive')continue;
   const source=csv(`content/facts/map/places/${p.id}/health.csv`).filter(r=>r.card==='1'&&Number(r.drive_min)<=20&&r.kind.toLowerCase().includes('hospital')&&!r.kind.toLowerCase().includes('centro de saúde')).sort((a,b)=>Number(a.drive_min)-Number(b.drive_min)).slice(0,3);assert.deepEqual(life.hospitals.map(x=>x.name),source.map(x=>x.name));const card=json(`site/public/data/map/place/${p.id}.json`).c5;
   for(const item of life.hospitals){const r=source.find(x=>x.name===item.name);assert.equal(item.kind,r.kind);assert.equal(item.sourceLabel,r.registry);assert.equal(item.km,Number(r.drive_km));assert.equal(item.minutes,card.hsp.find(x=>x[0]===item.name)[1]);assert.match(item.sourceUrl,/www2\.ers\.pt/);assert.doesNotMatch(item.kind,/primary care|centro de saúde/i);}
  }
 }],
 ['fallback straight-line records never become driving times or a precise check date',()=>{
  for(const p of REGRESSAR_PLACES){const life=getPlaceLife(p.id);if(life.coverage!=='nearest-straight-line')continue;const source=json(`site/public/data/map/place/${p.id}.json`);assert.equal(life.schools.length,1);assert.equal(life.hospitals.length,1);assert.equal(life.schools[0].name,source.sch.n);assert.equal(life.schools[0].km,source.sch.km);assert.equal(life.hospitals[0].name,source.hsp.n);assert.equal(life.hospitals[0].km,source.hsp.km);assert.equal(life.checkedOn,'2026');for(const x of [...life.schools,...life.hospitals]){assert.equal(x.minutes,null);assert.equal(x.distanceMode,'straight-line');assert.equal(x.checkedOn,'2026');}}
 }],
 ['source records, dates and origins remain explicit',()=>{
  for(const [id,life] of Object.entries(REGRESSAR_LIFE)){assert.ok(Number.isFinite(life.origin.lat)&&Number.isFinite(life.origin.lon));assert.ok(life.sourceRecord.endsWith(`/${id}.json`));assert.ok(existsSync(repo+'site/public'+life.sourceRecord));for(const x of [...life.schools,...life.hospitals]){assert.ok(x.km>=0);assert.ok(x.sourceLabel);assert.match(x.checkedOn,/^2026(?:-11-0[34])?$/);assert.ok(x.sourceUrl.startsWith('https://')||x.sourceUrl===life.sourceRecord);}}
 }],
 ['independent annuity fixture shares the 35-percent housing ceiling with rent',()=>{
  const p=purchasingPower(4500,{priceM2:2000,rentM2:10});assert.ok(p);assert.equal(p.housingBudget,1575);assert.equal(p.maxRentAreaM2,157.5);assert.ok(Math.abs(p.maxLoan-373573.2758692437)<.01);assert.ok(Math.abs(p.maxPurchasePrice-466966.5948365546)<.01);assert.ok(Math.abs(p.deposit-93393.31896731093)<.01);assert.ok(Math.abs(p.maxBuyAreaM2-233.48329741827732)<.001);
 }],
 ['zero interest and upfront funds stay distinct',()=>{
  const p=purchasingPower(2000,{priceM2:2000,rentM2:8},{annualRate:0});assert.equal(p.maxLoan,252000);assert.equal(p.maxPurchasePrice,315000);assert.equal(p.deposit,63000);assert.equal(p.maxBuyAreaM2,157.5);assert.equal(p.maxRentAreaM2,87.5);
 }],
 ['invalid income, median prices, rate, term and mortgage fractions fail closed',()=>{
  const place={priceM2:2000,rentM2:10};for(const x of [0,-1,NaN,Infinity])assert.equal(purchasingPower(x,place),null);for(const x of [{priceM2:0,rentM2:10},{priceM2:2000,rentM2:0},{priceM2:NaN,rentM2:10}])assert.equal(purchasingPower(4500,x),null);for(const x of [{budgetShare:0},{budgetShare:1.1},{depositPercent:100},{depositPercent:-1},{annualRate:-1},{annualRate:31},{termYears:0},{termYears:51},{termYears:NaN}])assert.equal(purchasingPower(4500,place,x),null);
 }],
 ['income raises purchasing power; a higher median does not raise the price ceiling',()=>{
  const low=purchasingPower(2500,{priceM2:2000,rentM2:10}),high=purchasingPower(4500,{priceM2:2000,rentM2:10}),costly=purchasingPower(4500,{priceM2:4000,rentM2:20});assert.ok(high.maxPurchasePrice>low.maxPurchasePrice);assert.equal(costly.maxPurchasePrice,high.maxPurchasePrice);assert.equal(costly.maxBuyAreaM2,high.maxBuyAreaM2/2);assert.equal(costly.maxRentAreaM2,high.maxRentAreaM2/2);
 }],
];
for(const [name,fn] of cases){fn();console.log('PASS '+name);}console.log(`${cases.length}/${cases.length} Regressar life and purchasing-power contracts passed.`);
