// Run: node --import tsx scripts/test-regressar-tax.mjs (from site/).
import assert from 'node:assert/strict';
import { TAX_2026, IRS_2026, generalIrs, solidarityTax, annualSalary, annualizeNet, grossForNet, TaxInputError } from '../src/lib/regressar-tax.ts';

let checks = 0;
function test(name, fn) { fn(); checks++; console.log(`PASS ${name}`); }
const near = (actual, expected, tolerance = .01) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
test('statutory first bracket is taxed from first euro, not as a tax-free allowance', () => {
  assert.equal(generalIrs(0), 0); assert.equal(generalIrs(8342), 1042.75); assert.equal(generalIrs(10000), 1303.06);
});
test('every statutory average/marginal boundary remains within its published precision', () => {
  for (let i = 0; i < IRS_2026.length - 1; i++) {
    const [top, , avg] = IRS_2026[i];
    near(generalIrs(top + .01), top * avg / 100 + .01 * IRS_2026[i + 1][1] / 100);
    assert.ok(Math.abs(generalIrs(top + .01) - generalIrs(top)) < 1, 'published rounding edge unexpectedly large');
  }
});
test('solidarity is charged only on portions above 80k and 250k', () => {
  assert.equal(solidarityTax(80000), 0); assert.equal(solidarityTax(100000), 500);
  assert.equal(solidarityTax(250000), 4250); assert.equal(solidarityTax(300000), 6750);
});
test('independently calculated EUR50k standard employee fixture', () => {
  const r = annualSalary(50000);
  assert.equal(r.socialSecurity, 5500); assert.equal(r.specificDeduction, 5500);
  assert.equal(r.taxableIncome, 44500); assert.equal(r.irs, 11436.23); assert.equal(r.netAnnual, 33063.77);
});
test('conditional article12A allocates deduction proportionally and leaves SS unchanged', () => {
  const r = annualSalary(50000, { regressar: true });
  assert.equal(r.excludedIncome, 25000); assert.equal(r.socialSecurity, 5500);
  assert.equal(r.specificDeduction, 2750); assert.equal(r.taxableIncome, 22250); assert.equal(r.netAnnual, 40614.20);
});
test('article12A caps qualifying gross at EUR250k, never EUR250k of exemption', () => {
  assert.equal(annualSalary(250000, { regressar: true }).excludedIncome, 125000);
  const r = annualSalary(400000, { regressar: true });
  assert.equal(r.excludedIncome, 125000); assert.equal(r.specificDeduction, 30250); assert.equal(r.taxableIncome, 244750);
});
test('EUR2.5k, 4.5k and 7k declared monthly net invert in both scenarios', () => {
  for (const monthly of [2500, 4500, 7000]) for (const regressar of [false, true]) {
    const target = annualizeNet(monthly, 'month'); const r = grossForNet(target, { regressar });
    near(r.netAnnual, target, .05); assert.ok(r.grossAnnual > target); assert.ok(r.socialSecurity > 0);
    near(r.grossAnnual - r.socialSecurity - r.irs - r.solidarity, r.netAnnual);
    assert.ok(grossForNet(target, { regressar: true }).grossAnnual < grossForNet(target).grossAnnual);
  }
});
test('inverse bounds and a broad deterministic sweep hit annual targets to cents', () => {
  for (const regressar of [false, true]) for (const target of [20000, 20000.01, 30000, 54321.98, 150000, 300000, 500000]) near(grossForNet(target, { regressar }).netAnnual, target, .05);
  for (let target = 20000; target <= 500000; target += 9973.29) for (const regressar of [false, true]) near(grossForNet(Math.round(target * 100) / 100, { regressar }).netAnnual, target, .05);
});
test('12/13/14 declared foreign payments are annualised explicitly; annual input is unchanged', () => {
  assert.equal(annualizeNet(2500, 'month', 12), 30000); assert.equal(annualizeNet(2500, 'month', 13), 32500);
  assert.equal(annualizeNet(2500, 'month', 14), 35000); assert.equal(annualizeNet(30000, 'year', 14), 30000);
});
test('reject NaN, infinities, negatives, impossible periods/payments and unsupported low income', () => {
  for (const value of [NaN, Infinity, -1, 5_000_001]) assert.throws(() => annualSalary(value), TaxInputError);
  for (const value of [0, 19999.99, 500000.01]) assert.throws(() => grossForNet(value), e => e.code === 'UNSUPPORTED_NET_RANGE');
  assert.throws(() => annualizeNet(2500, 'week'), TaxInputError);
  assert.throws(() => annualizeNet(2500, 'month', 15), e => e.code === 'INVALID_PAYMENTS');
});
test('model version and statutory-source limitations stay explicit', () => {
  assert.match(TAX_2026.version, /2026/); assert.equal(TAX_2026.year, 2026);
  assert.match(TAX_2026.verification, /require fiscal review/); assert.ok(TAX_2026.sources.length >= 6);
  assert.match(TAX_2026.assumptions.join(' '), /not monthly withholding/);
});
console.log(`${checks}/${checks} fiscal model contracts passed.`);
