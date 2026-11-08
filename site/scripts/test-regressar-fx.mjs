// Run from site/: node --import tsx scripts/test-regressar-fx.mjs
import assert from 'node:assert/strict';
import { COUNTRIES, FX_SNAPSHOT, getCountry, convertNetToEuro, getSalaryCurrency, convertCurrencyNetToEuro, SALARY_CURRENCIES } from '../src/lib/regressar-fx.ts';

const cases = [
  ['EUR remains unchanged without a fictitious FX observation', () => {
    for (const id of ['lu', 'fr', 'pt']) {
      assert.equal(convertNetToEuro(4500, id), 4500);
      assert.equal(getCountry(id).rateDate, null);
    }
  }],
  ['CHF divides by local units per euro rather than multiplying', () => {
    assert.equal(convertNetToEuro(9227, 'ch'), 10000);
  }],
  ['all four sourced foreign currencies recover one euro from their quote', () => {
    for (const entry of COUNTRIES.filter((x) => x.currency !== 'EUR')) {
      assert.equal(convertNetToEuro(entry.perEuro, entry.id), 1);
      assert.equal(entry.rateDate, '2026-10-23');
      assert.match(entry.source, /^https:\/\/www\.ecb\.europa\.eu\//);
    }
  }],
  ['snapshot is explicitly historical, not a fabricated live quote', () => {
    assert.equal(FX_SNAPSHOT.live, false);
    assert.equal(FX_SNAPSHOT.checkedAt, '2026-10-25');
    assert.ok(Object.isFrozen(COUNTRIES));
    assert.ok(COUNTRIES.every(Object.isFrozen));
  }],
  ['zero is exact and decimals are not prematurely rounded', () => {
    assert.equal(convertNetToEuro(0, 'ch'), 0);
    assert.equal(convertNetToEuro(1, 'ch'), 1 / 0.9227);
  }],
  ['invalid amounts and unsupported countries fail closed', () => {
    for (const x of [-1, Infinity, -Infinity, NaN, '4500', null]) {
      assert.throws(() => convertNetToEuro(x, 'ch'), RangeError);
    }
    assert.throws(() => getCountry('unknown'), RangeError);
    assert.throws(() => convertNetToEuro(4500, 'unknown'), RangeError);
  }],
  ['salary currency is independent of country of residence', () => {
    assert.equal(convertCurrencyNetToEuro(54000,'USD'),54000/1.1193);
    assert.equal(convertCurrencyNetToEuro(54000,'CHF'),54000/.9227);
    assert.equal(getCountry('lu').currency,'EUR');
    assert.equal(getSalaryCurrency('USD').rateDate,'2026-10-23');
    assert.equal(new Set(SALARY_CURRENCIES).size,5);
  }],
  ['unsupported currencies and invalid values never receive invented quotes', () => {
    assert.throws(()=>convertCurrencyNetToEuro(4500,'GBP'),RangeError);
    for(const x of [-1,NaN,Infinity])assert.throws(()=>convertCurrencyNetToEuro(x,'USD'),RangeError);
  }],
];
for (const [name, run] of cases) { run(); console.log(`PASS ${name}`); }
console.log(`${cases.length}/${cases.length} Regressar FX contracts passed`);
