// Run from site/: node --import tsx scripts/test-regressar-eligibility.mjs
import assert from 'node:assert/strict';
import { assessEligibility, ELIGIBILITY_QUESTIONS, ELIGIBILITY_COPY, PROGRAMME_RULES } from '../src/lib/regressar-eligibility.ts';
let count = 0;
const test = (name, fn) => { fn(); count++; console.log(`PASS ${name}`); };
const yes = { returnYear: 2026, priorResidence: 'yes', outsidePreviousFiveYears: 'yes', taxRegular: 'yes', noNhrRegistration: 'yes' };
test('missing or nonliteral answers cannot grant the comparison', () => {
  assert.equal(assessEligibility().status, 'incomplete'); assert.equal(assessEligibility().missing.length, 5);
  for (const { id } of ELIGIBILITY_QUESTIONS) for (const unknown of [undefined, 'unknown', true, 'true', '', null]) {
    const result = assessEligibility({ ...yes, [id]: unknown });
    assert.equal(result.status, 'incomplete'); assert.equal(result.benefitMayBeCompared, false); assert.ok(result.missing.includes(id));
  }
});
test('all declared conditions permit only a hypothetical comparison, never verified entitlement', () => {
  const result = assessEligibility(yes);
  assert.equal(result.status, 'potentially-eligible'); assert.equal(result.benefitMayBeCompared, true);
  assert.equal(result.sourceVerified, false); assert.deepEqual(result.reasons, []);
  assert.deepEqual(result.lookbackYears, [2021, 2022, 2023, 2024, 2025]);
  assert.deepEqual(result.benefitYears, [2026, 2027, 2028, 2029, 2030]);
});
test('each known failed condition blocks the comparison, even with other unknowns', () => {
  for (const { id } of ELIGIBILITY_QUESTIONS) for (const answers of [{ ...yes, [id]: 'no' }, { returnYear: 2026, [id]: 'no' }]) {
    const result = assessEligibility(answers);
    assert.equal(result.status, 'not-eligible'); assert.equal(result.benefitMayBeCompared, false); assert.ok(result.reasons.includes(id));
  }
});
test('2024–2026 cohorts receive exact lookback and benefit tax years', () => {
  for (const returnYear of [2024, 2025, 2026]) {
    const result = assessEligibility({ ...yes, returnYear });
    assert.equal(result.status, 'potentially-eligible'); assert.equal(result.lookbackYears[0], returnYear - 5);
    assert.equal(result.lookbackYears.at(-1), returnYear - 1); assert.equal(result.benefitYears[0], returnYear);
    assert.equal(result.benefitYears.at(-1), returnYear + 4);
  }
});
test('legacy cohorts require their historical rules rather than a false denial', () => {
  for (const returnYear of [2019, 2022, 2023]) {
    const result = assessEligibility({ ...yes, returnYear, outsidePreviousFiveYears: 'no' });
    assert.equal(result.status, 'incomplete'); assert.equal(result.benefitMayBeCompared, false);
    assert.deepEqual(result.reasons, ['legacy-rules-required']); assert.deepEqual(result.lookbackYears, []);
  }
});
test('future extensions and malformed or missing years never activate the comparison', () => {
  assert.equal(assessEligibility({ ...yes, returnYear: 2027 }).status, 'not-eligible');
  assert.deepEqual(assessEligibility({ ...yes, returnYear: 2027 }).reasons, ['outside-return-window']);
  for (const returnYear of [NaN, Infinity, 2026.5, -1, 0, undefined, null, '2026']) {
    const result = assessEligibility({ ...yes, returnYear });
    assert.equal(result.status, 'incomplete'); assert.equal(result.benefitMayBeCompared, false); assert.ok(result.missing.includes('returnYear'));
  }
});
test('all 81 answer combinations remain closed unless every condition is yes', () => {
  const ids = ELIGIBILITY_QUESTIONS.map(q => q.id), values = ['yes', 'no', 'unknown'];
  for (let n = 0; n < 81; n++) {
    let v = n; const answers = { returnYear: 2026 };
    for (const id of ids) { answers[id] = values[v % 3]; v = Math.floor(v / 3); }
    const result = assessEligibility(answers);
    assert.equal(result.benefitMayBeCompared, ids.every(id => answers[id] === 'yes'));
    assert.equal(result.status, ids.some(id => answers[id] === 'no') ? 'not-eligible' : ids.every(id => answers[id] === 'yes') ? 'potentially-eligible' : 'incomplete');
  }
});
test('source uncertainty, source URLs and three-language copy remain explicit; input stays immutable', () => {
  assert.equal(PROGRAMME_RULES.sourceVerified, false); assert.ok(PROGRAMME_RULES.sources.every(s => s.url.startsWith('https://')));
  for (const lang of ['pt', 'en', 'fr']) {
    assert.ok(ELIGIBILITY_QUESTIONS.every(q => q.label[lang] && q.hint[lang]));
    assert.ok(ELIGIBILITY_COPY[lang].disclaimer && ELIGIBILITY_COPY[lang].legacy);
  }
  const frozen = Object.freeze({ ...yes }); assessEligibility(frozen); assert.deepEqual(frozen, yes);
});
console.log(`${count}/${count} programme screening contracts passed.`);
