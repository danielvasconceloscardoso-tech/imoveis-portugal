// Run from site/: node --import tsx scripts/test-regressar-scenario.mjs
import assert from 'node:assert/strict';
import { assessEligibility, ELIGIBILITY_QUESTIONS } from '../src/lib/regressar-eligibility.ts';
import { decideProgrammeScenario, scenarioCopy } from '../src/lib/regressar-scenario.ts';
let count=0;const test=(name,fn)=>{fn();count++;console.log(`PASS ${name}`);};
const yes={returnYear:2026,priorResidence:'yes',outsidePreviousFiveYears:'yes',taxRegular:'yes',noNhrRegistration:'yes'};
test('no answers preview a labelled assumption without granting eligibility',()=>{
 const a=assessEligibility();assert.equal(a.benefitMayBeCompared,false);
 assert.deepEqual(decideProgrammeScenario(a),{useBenefit:true,mode:'hypothetical',benefitAvailable:true,reason:'conditions-assumed',eligibilityConfirmed:false});
 assert.equal(a.benefitMayBeCompared,false);assert.equal(a.sourceVerified,false);
});
test('partial answers or a missing year remain hypothetical',()=>{
 for(const missing of [undefined,'unknown'])for(const {id} of ELIGIBILITY_QUESTIONS){
  const r=decideProgrammeScenario(assessEligibility({...yes,[id]:missing}));assert.equal(r.useBenefit,true);assert.equal(r.mode,'hypothetical');
 }
 assert.equal(decideProgrammeScenario(assessEligibility({...yes,returnYear:null})).mode,'hypothetical');
});
test('compatible self-reports never become confirmed entitlement',()=>{
 for(const returnYear of [2024,2025,2026]){const a=assessEligibility({...yes,returnYear}),r=decideProgrammeScenario(a);
  assert.equal(r.useBenefit,true);assert.equal(r.mode,'compatible');assert.equal(r.eligibilityConfirmed,false);assert.equal(a.sourceVerified,false);
 }
});
test('each known failed condition overrides the optimistic preview',()=>{
 for(const {id} of ELIGIBILITY_QUESTIONS)for(const answers of [{...yes,[id]:'no'},{[id]:'no'}]){
  const r=decideProgrammeScenario(assessEligibility(answers));assert.equal(r.useBenefit,false);assert.equal(r.mode,'standard');assert.equal(r.benefitAvailable,false);assert.equal(r.reason,id);
 }
});
test('legacy future and malformed years do not receive current-cohort assumptions',()=>{
 for(const returnYear of [2022,2023,2027,NaN,Infinity,2026.5,-1]){
  const r=decideProgrammeScenario(assessEligibility({...yes,returnYear}));assert.equal(r.useBenefit,false);assert.equal(r.mode,'standard');assert.equal(r.benefitAvailable,false);
 }
});
test('explicit standard comparison respects choice and retains available preview',()=>{
 for(const a of [assessEligibility(),assessEligibility(yes)])assert.deepEqual(decideProgrammeScenario(a,false),{useBenefit:false,mode:'standard',benefitAvailable:true,reason:'user-choice',eligibilityConfirmed:false});
 assert.equal(decideProgrammeScenario(assessEligibility({...yes,taxRegular:'no'}),false).benefitAvailable,false);
});
test('contradictory assessment flags fail closed',()=>{
 const a=assessEligibility(yes);
 for(const bad of [{...a,benefitMayBeCompared:false},{...a,missing:['taxRegular']},{...a,reasons:['taxRegular']},{...assessEligibility(),benefitMayBeCompared:true},{...assessEligibility(),missing:[]}])assert.equal(decideProgrammeScenario(bad).useBenefit,false);
});
test('all 81 answer combinations distinguish assumptions from known failures',()=>{
 const values=['yes','no','unknown'];for(const a of values)for(const b of values)for(const c of values)for(const d of values){
  const r=decideProgrammeScenario(assessEligibility({returnYear:2026,priorResidence:a,outsidePreviousFiveYears:b,taxRegular:c,noNhrRegistration:d}));
  assert.equal(r.useBenefit,![a,b,c,d].includes('no'));assert.equal(r.mode,[a,b,c,d].includes('no')?'standard':[a,b,c,d].every(v=>v==='yes')?'compatible':'hypothetical');
 }
});
test('input screening flags remain immutable',()=>{
 const a=assessEligibility(),original=structuredClone(a);Object.freeze(a.reasons);Object.freeze(a.missing);Object.freeze(a);
 decideProgrammeScenario(a);decideProgrammeScenario(a,false);assert.deepEqual(a,original);
});
test('PT EN FR copy names assumptions and annual divided by 12',()=>{
 const keys=Object.keys(scenarioCopy('pt')).sort();for(const lang of ['pt','en','fr']){const c=scenarioCopy(lang);
  assert.deepEqual(Object.keys(c).sort(),keys);assert.ok(Object.values(c).every(v=>typeof v==='string'&&v.length));assert.match(c.assumedNote,/assum|suppos/i);assert.match(c.annualBasisNote,/12/);assert.match(c.programmeName,/Programa Regressar/);
 }
});
console.log(`${count}/${count} programme-preview contracts passed.`);
