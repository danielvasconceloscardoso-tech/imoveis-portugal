// Prompt 81: the matching engine's contracts. Run: npm run test:match (node --import tsx scripts/test-match.mjs).
// Part A runs on a hand-made fixture in the data contract's shape (scripts/fixtures/match-summary.fixture.json) and on
// seeded random tables. Part B runs on the real 308 table (public/data/match.json) and WAITS, loudly, for each layer
// the data engineer has not delivered yet: a waiting test is printed as WAIT, never counted as a pass.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { matchPlaces, tasteScore, partScore, spreadByRegion, availableTastes, TASTES, TASTE_RULES, WEIGHTS, TOP_N, MAX_PER_REGION, MEASURES } from '../src/lib/match.ts';
import { buildMatchTable, decodeMatchTable } from '../src/lib/match-table.ts';
import { formatReasons, formatReason, formatTradeoff, formatPoints, formatCoverage, methodLines, measurePhrase } from '../src/lib/match-copy.ts';
import { housingPayment, HOUSING_DEFAULTS } from '../src/lib/housing.ts';
import { loadInputs } from './build-match-table.mjs';

let count = 0, waiting = 0;
const test = (name, fn) => { fn(); count++; console.log(`PASS ${name}`); };
const wait = (name, why) => { waiting++; console.log(`WAIT ${name}: ${why}`); };
const here = p => fileURLToPath(new URL(p, import.meta.url));
const json = p => JSON.parse(readFileSync(here(p), 'utf8'));

// ---------------------------------------------------------------- the fixture table (contract shape, made-up numbers)
const fx = loadInputs(here('./fixtures/match-summary.fixture.json'));
const FIX = decodeMatchTable(buildMatchTable(fx.geo, fx.prices, fx.summary));
const fixPlace = id => FIX.places.find(p => p.id === id);
const ids = o => o.matches.map(m => m.id);
const byScore = o => [...o.matches].sort((a, b) => a.scoreRank - b.scoreRank).map(m => m.id);
const nice = (...t) => t.map(taste => ({ taste, importance: 'nice' }));
const must = (...t) => t.map(taste => ({ taste, importance: 'essential' }));
const RICH = 1e7;   // a net income no median can exceed: budget out of the way

// An independent copy of the curves, written from docs/MATCHING.md, not imported from the engine.
const near = (v, full, zero) => v <= full ? 1 : v >= zero ? 0 : (zero - v) / (zero - full);
const cnt = (v, full) => Math.min(v, full) / full;
const sparse = (v, full, zero) => v <= full ? 1 : v >= zero ? 0 : (Math.log10(zero) - Math.log10(v)) / (Math.log10(zero) - Math.log10(full));
const r2 = x => Math.round((x + 1e-9) * 100) / 100;
const known = (...v) => v.every(x => typeof x === 'number' && Number.isFinite(x) && x >= 0);
const HAND = {
  beach: m => known(m.beach_min) ? r2(near(m.beach_min, 10, 45)) : null,
  isch: m => known(m.isch_min, m.isch_n30) ? r2(0.7 * near(m.isch_min, 10, 45) + 0.3 * cnt(m.isch_n30, 4)) : null,
  schools: m => known(m.schools_n20) ? r2(cnt(m.schools_n20, 10)) : null,
  health: m => known(m.er_min) ? r2(near(m.er_min, 10, 45)) : null,
  airport: m => known(m.air_min) ? r2(near(m.air_min, 20, 90)) : null,
  train: m => known(m.rail_min) ? r2(near(m.rail_min, 10, 45)) : null,
  food: m => known(m.mich_n30, m.rest_per_1k) ? r2(0.5 * cnt(m.mich_n30, 5) + 0.5 * cnt(m.rest_per_1k, 5)) : null,
  golf: m => known(m.golf_min, m.golf_n30) ? r2(0.6 * near(m.golf_min, 10, 45) + 0.4 * cnt(m.golf_n30, 5)) : null,
  culture: m => known(m.cult_n20) ? r2(cnt(m.cult_n20, 20)) : null,
  quiet: m => known(m.dens) ? r2(sparse(m.dens, 30, 3000)) : null,
};
const handPoints = (place, tastes) => Math.round(tastes.reduce((s, c) => s + WEIGHTS[c.importance] * Math.round((HAND[c.taste](place.m) ?? 0) * 100), 0)) / 100;

// ---------------------------------------------------------------- seeded generator
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const RANGE = { beach_min: 130, isch_min: 150, isch_n30: 9, schools_n20: 40, er_min: 70, air_min: 160, rail_min: 80, mich_n30: 12, rest_per_1k: 12, golf_min: 90, golf_n30: 9, cult_n20: 60, dens: 7000 };
function randomTable(seed, n = 40, holes = 0.08) {
  const R = rng(seed), places = [];
  for (let i = 0; i < n; i++) {
    const m = {};
    for (const k of MEASURES) m[k] = R() < holes ? null : k === 'rest_per_1k' || k === 'dens' ? Math.round(R() * RANGE[k] * 10) / 10 : Math.floor(R() * RANGE[k]);
    places.push({ id: `p${String(i).padStart(3, '0')}`, name: `Place ${i}`, n3: `Region ${Math.floor(R() * 7)}`, region: 'x', lat: 40, lon: -8,
      priceM2: R() < 0.03 ? null : Math.round(600 + R() * 5000), rentM2: R() < 0.15 ? null : Math.round((4 + R() * 16) * 100) / 100, period: '2026-Q2', m, names: {} });
  }
  return places;
}
function randomTastes(R, max = 5) {
  const pool = [...TASTES], out = [], k = Math.floor(R() * (max + 1));
  for (let i = 0; i < k; i++) out.push({ taste: pool.splice(Math.floor(R() * pool.length), 1)[0], importance: R() < 0.3 ? 'essential' : 'nice' });
  return out;
}
const SEEDS = Array.from({ length: 60 }, (_, i) => 811 + i * 7919);

// ================================================================ A. the engine
test('curves: every breakpoint, by hand', () => {
  const b = TASTE_RULES.beach[0], a = TASTE_RULES.airport[0], c = TASTE_RULES.isch[1], q = TASTE_RULES.quiet[0];
  assert.deepEqual([0, 10, 17, 27.5, 44, 45, 300].map(v => partScore(b, v)), [1, 1, 0.8, 0.5, 1 / 35, 0, 0]);
  assert.deepEqual([20, 55, 90].map(v => partScore(a, v)), [1, 0.5, 0]);
  assert.deepEqual([0, 1, 2, 4, 40].map(v => partScore(c, v)), [0, 0.25, 0.5, 1, 1]);
  assert.equal(partScore(q, 30), 1); assert.equal(partScore(q, 3000), 0); assert.ok(Math.abs(partScore(q, 300) - 0.5) < 1e-12);
  for (const bad of [null, undefined, NaN, Infinity, -1, '12', {}]) for (const t of TASTES) for (const r of TASTE_RULES[t]) assert.equal(partScore(r, bad), null);
  for (const t of TASTES) { assert.ok(Math.abs(TASTE_RULES[t].reduce((s, r) => s + r.share, 0) - 1) < 1e-12, `${t}: shares add to 1`); }
  assert.deepEqual(WEIGHTS, { essential: 3, nice: 1 });
});

test('5. Gondomar fixture: exact measures, scores, cost, points and lines', () => {
  const g = fixPlace('gondomar');
  assert.deepEqual(g.m, { beach_min: 17, isch_min: 12, isch_n30: 4, schools_n20: 41, er_min: 13, air_min: 21, rail_min: 9, mich_n30: 6, rest_per_1k: 1.9, golf_min: 25, golf_n30: 2, cult_n20: 18, dens: null });
  assert.equal(g.n3, 'Área Metropolitana do Porto'); assert.equal(g.priceM2, 2348); assert.equal(g.rentM2, 9.03);
  const want = { beach: 0.8, isch: 0.96, schools: 1, health: 0.91, airport: 0.99, train: 1, food: 0.69, golf: 0.5, culture: 0.9, quiet: null };
  for (const t of TASTES) { const s = tasteScore(t, g); assert.equal(s ? s.s100 / 100 : null, want[t], t); assert.equal(HAND[t](g.m), want[t], `${t} by hand`); }
  // Rent, 80 m2, 4,500 EUR net a month: budget 1,575; cost 9.03 x 80 = 722.40; 852.60 under.
  const all = matchPlaces({ netMonthly: 4500, places: FIX.places, tastes: nice(...TASTES) }).matches.find(m => m.id === 'gondomar');
  assert.equal(all.monthlyHousing, 9.03 * 80); assert.ok(Math.abs(all.underBudget - 852.6) < 1e-9);
  assert.equal(all.points, 7.75); assert.equal(all.maxPoints, 10); assert.deepEqual(all.unknown, ['quiet']);
  const r = matchPlaces({ netMonthly: 4500, places: FIX.places, tastes: [...must('isch'), ...nice('beach')] }).matches.find(m => m.id === 'gondomar');
  assert.equal(r.points, 3.68); assert.equal(r.maxPoints, 4); assert.equal(r.total, 0.92);
  assert.equal(formatReasons(r, 'en'), 'International school 12 min · beach 17 min · 852 € a month under your budget');
  assert.equal(formatReasons(r, 'pt'), 'Escola internacional a 12 min · praia a 17 min · 852 € por mês abaixo do seu orçamento');
  assert.equal(formatReasons(r, 'fr'), 'École internationale à 12 min · plage à 17 min · 852 € par mois sous votre budget');
  assert.equal(formatPoints(r, 'en'), '3.68 of 4 points');
  // Buy: 2,348 x 80 = 187,840; 20% deposit 37,568; loan 150,272; 3%, 30 years.
  const buy = matchPlaces({ netMonthly: 4500, housingMode: 'buy', places: FIX.places }).matches.find(m => m.id === 'gondomar');
  assert.equal(buy.purchasePrice, 187840); assert.equal(buy.deposit, 37568); assert.equal(buy.loan, 150272);
  const i = 0.03 / 12, pay = 150272 * i / (1 - (1 + i) ** -360);
  assert.ok(Math.abs(buy.monthlyHousing - pay) < 1e-9); assert.ok(Math.abs(pay - 633.55) < 0.01);
  assert.equal(formatReasons(buy, 'en'), '941 € a month under your budget · median price 2,348 €/m² (INE, 2026-Q2)');
});

test('points are a plain weighted sum anyone can redo by hand (60 seeded tables)', () => {
  for (const seed of SEEDS) {
    const R = rng(seed), places = randomTable(seed), tastes = randomTastes(R);
    const o = matchPlaces({ netMonthly: RICH, housingMode: R() < 0.5 ? 'rent' : 'buy', places, tastes });
    const max = tastes.reduce((s, c) => s + WEIGHTS[c.importance], 0);
    for (const m of o.matches) {
      assert.equal(m.points, handPoints(m, tastes)); assert.equal(m.maxPoints, max);
      assert.equal(m.total, max ? m.points / max : 0);
      assert.equal(Math.round(m.tastes.reduce((s, t) => s + t.points, 0) * 100) / 100, m.points);
      for (const t of m.tastes) { assert.equal(t.score, HAND[t.taste](m.m)); assert.equal(t.weight, WEIGHTS[t.importance]); assert.equal(t.points, t.score === null ? 0 : Math.round(t.weight * t.score * 100) / 100); }
    }
    const sorted = [...o.matches].sort((a, b) => b.points - a.points || a.monthlyHousing - b.monthlyHousing || (a.id < b.id ? -1 : 1));
    assert.deepEqual(byScore(o), sorted.map(m => m.id));
  }
});

test('1. changing any taste changes the order whenever the data differ (property, seeded)', () => {
  let changes = 0, trials = 0, single = 0;
  for (const seed of SEEDS) {
    const R = rng(seed + 1), places = randomTable(seed, 40, 0.05);
    const base = randomTastes(R, 4), free = TASTES.filter(t => !base.some(c => c.taste === t));
    const run = tastes => matchPlaces({ netMonthly: RICH, places, tastes });
    const before = run(base), pos = new Map(byScore(before).map((id, i) => [id, i]));
    for (const taste of free) {
      for (const importance of ['nice', 'essential']) {
        const after = run([...base, { taste, importance }]), w = WEIGHTS[importance];
        const kept = after.matches.filter(m => pos.has(m.id)), newPos = new Map(byScore(after).map((id, i) => [id, i]));
        const s = new Map(kept.map(m => [m.id, Math.round((HAND[taste](m.m) ?? 0) * 100)]));
        const old = new Map(before.matches.map(m => [m.id, m]));
        // Every pair: its new order is decided by the old gap plus weight x the new taste's score gap, nothing else.
        let mustFlip = false;
        for (const a of kept) for (const b of kept) {
          if (pos.get(a.id) >= pos.get(b.id)) continue;                       // a was above b
          const gap = Math.round(old.get(a.id).points * 100) - Math.round(old.get(b.id).points * 100) + w * (s.get(a.id) - s.get(b.id));
          if (gap > 0) assert.ok(newPos.get(a.id) < newPos.get(b.id), `${taste}: ${a.id} stays above ${b.id}`);
          if (gap < 0) { mustFlip = true; assert.ok(newPos.get(a.id) > newPos.get(b.id), `${taste}: ${b.id} overtakes ${a.id}`); }
        }
        const keptBefore = byScore(before).filter(id => newPos.has(id)), keptAfter = byScore(after).filter(id => pos.has(id));
        // The order changes exactly when some pair's data outweigh its old gap.
        assert.equal(keptBefore.join() !== keptAfter.join(), mustFlip);
        trials++; if (mustFlip) changes++;
      }
    }
    // One taste alone: the order is that taste's score; two tastes whose scores order the places differently give two orders.
    for (let i = 0; i + 1 < TASTES.length; i++) {
      const [t1, t2] = [TASTES[i], TASTES[i + 1]], o1 = run(nice(t1)), o2 = run(nice(t2));
      for (const o of [[o1, t1], [o2, t2]]) { const l = [...o[0].matches].sort((a, b) => a.scoreRank - b.scoreRank); for (let k = 1; k < l.length; k++) assert.ok((HAND[o[1]](l[k - 1].m) ?? 0) >= (HAND[o[1]](l[k].m) ?? 0)); }
      const differ = places.some(a => places.some(b => (HAND[t1](a.m) ?? 0) > (HAND[t1](b.m) ?? 0) && (HAND[t2](a.m) ?? 0) < (HAND[t2](b.m) ?? 0)));
      if (differ) { assert.notEqual(byScore(o1).join(), byScore(o2).join()); single++; }
    }
  }
  // On tables where the data differ, a taste change moves the order nearly every time (before prompt 81: never).
  assert.ok(changes / trials > 0.95, `${changes} of ${trials} taste changes moved the order`);
  assert.ok(single > 400);
  console.log(`     ${changes} of ${trials} added tastes changed the order; ${single} single-taste swaps changed it`);
});

test('a weight change (nice to have <-> essential) follows the same sum', () => {
  for (const seed of SEEDS.slice(0, 30)) {
    const R = rng(seed + 2), places = randomTable(seed), tastes = randomTastes(R, 4).map(c => ({ ...c, importance: 'nice' }));
    if (tastes.length < 2) continue;
    const up = tastes.map((c, i) => (i === 0 ? { ...c, importance: 'essential' } : c));
    const a = matchPlaces({ netMonthly: RICH, places, tastes }), b = matchPlaces({ netMonthly: RICH, places, tastes: up });
    for (const m of b.matches) {
      const was = a.matches.find(x => x.id === m.id), s = HAND[tastes[0].taste](m.m);
      assert.equal(Math.round((m.points - was.points) * 100), Math.round((WEIGHTS.essential - WEIGHTS.nice) * s * 100));
      assert.ok(s > 0);                                   // an essential at zero or without data is never in the list
    }
    for (const m of a.matches) if (!b.matches.some(x => x.id === m.id)) {
      const e = b.excluded.find(x => x.id === m.id), s = HAND[tastes[0].taste](m.m);
      assert.equal(e.why, s === null ? 'essential-no-data' : 'essential-zero'); assert.equal(e.taste, tastes[0].taste);
    }
  }
});

test('budget is a hard limit, unrounded, in both modes; every place is either ranked or left out with a reason', () => {
  for (const seed of SEEDS.slice(0, 30)) for (const housingMode of ['rent', 'buy']) for (const netMonthly of [900, 2500, 4500, 9000, RICH]) {
    const R = rng(seed + 3), places = randomTable(seed), o = matchPlaces({ netMonthly, housingMode, places, tastes: randomTastes(R) });
    const budget = netMonthly * HOUSING_DEFAULTS.budgetShare;
    assert.equal(o.budget, budget);
    for (const m of o.matches) {
      const cost = housingMode === 'rent' ? m.rentM2 * 80 : housingPayment(m.priceM2 * 80 * 0.8, 3, 30);
      assert.equal(m.monthlyHousing, cost); assert.ok(m.monthlyHousing <= budget);
      assert.equal(m.remainingMonthly, netMonthly - cost); assert.equal(m.underBudget, budget - cost); assert.equal(m.housingShare, cost / netMonthly);
    }
    for (const e of o.excluded) {
      const p = places.find(x => x.id === e.id);
      if (e.why === 'over-budget') assert.ok(e.monthlyHousing > budget);
      if (e.why === 'no-rent-median') { assert.equal(housingMode, 'rent'); assert.equal(p.rentM2, null); }
      if (e.why === 'no-sale-median') { assert.equal(housingMode, 'buy'); assert.equal(p.priceM2, null); }
    }
    assert.deepEqual([...ids(o), ...o.excluded.map(e => e.id)].sort(), places.map(p => p.id).sort());
  }
  // The exact boundary on the fixture: Porto's rent median x 80 m2 is the budget at this income.
  const porto = fixPlace('porto'), n = porto.rentM2 * 80 / 0.35;
  assert.ok(ids(matchPlaces({ netMonthly: n + 1e-6, places: FIX.places })).includes('porto'));
  assert.ok(!ids(matchPlaces({ netMonthly: n - 1e-6, places: FIX.places })).includes('porto'));
});

test('no data is never a silent zero', () => {
  const g = fixPlace('gondomar');
  assert.equal(tasteScore('quiet', g), null);                                  // the contract example carries no population
  const o = matchPlaces({ netMonthly: RICH, places: FIX.places, tastes: nice('quiet', 'beach') });
  const gm = o.matches.find(m => m.id === 'gondomar'), q = gm.tastes.find(t => t.taste === 'quiet');
  assert.equal(q.score, null); assert.equal(q.points, 0); assert.deepEqual(gm.unknown, ['quiet']);
  for (const lang of ['pt', 'en', 'fr']) assert.match(formatReasons(gm, lang), { pt: /tranquilidade: sem dados$/, en: /quiet: no data$/, fr: /calme : pas de données$/ }[lang]);
  // Unknown and a true zero are told apart: Corvo has no international school by road (null); Beja's is 95 minutes away (zero).
  const e = matchPlaces({ netMonthly: RICH, housingMode: 'buy', places: FIX.places, tastes: must('isch') }).excluded;
  assert.deepEqual(e.find(x => x.id === 'ponta-delgada'), { id: 'ponta-delgada', why: 'essential-no-data', taste: 'isch' });
  assert.deepEqual(e.find(x => x.id === 'beja'), { id: 'beja', why: 'essential-zero', taste: 'isch', key: 'isch_min', value: 95 });
  // A place the summary does not cover at all (277 of the 308 in the fixture table) is "no data" on every taste.
  const blank = FIX.places.find(p => p.id === 'abrantes');
  for (const t of TASTES) assert.equal(tasteScore(t, blank), null);
  for (const seed of SEEDS.slice(0, 20)) {
    const places = randomTable(seed, 40, 0.3), tastes = randomTastes(rng(seed + 4));
    for (const m of matchPlaces({ netMonthly: RICH, places, tastes }).matches) {
      assert.deepEqual(m.unknown, tastes.map(c => c.taste).filter(t => HAND[t](m.m) === null));
      for (const t of m.tastes) if (t.score === null) assert.ok(m.unknown.includes(t.taste));
    }
  }
  assert.deepEqual(availableTastes([blank]), []);
  assert.deepEqual(availableTastes(FIX.places), [...TASTES]);
});

test(`regional spread: at most ${MAX_PER_REGION} per NUTS III region in the first ${TOP_N}`, () => {
  const check = list => {
    const top = list.slice(0, TOP_N), n = {};
    for (const m of top) n[m.n3] = (n[m.n3] ?? 0) + 1;
    const over = Object.values(n).some(v => v > MAX_PER_REGION);
    // The rule only gives way when no other region has a place left to offer.
    if (over) assert.ok(list.slice(TOP_N).every(m => (n[m.n3] ?? 0) >= MAX_PER_REGION) && top.length <= list.length);
    return over;
  };
  for (const seed of SEEDS) {
    const places = randomTable(seed), o = matchPlaces({ netMonthly: RICH, places, tastes: randomTastes(rng(seed + 5)) });
    check(o.matches);
    o.matches.forEach((m, i) => assert.equal(m.rank, i + 1));
    assert.deepEqual(o.matches.map(m => m.scoreRank).sort((a, b) => a - b), o.matches.map((_, i) => i + 1));
    // Past the first five, and inside each region, nobody jumps the points order.
    const tail = o.matches.slice(TOP_N).filter(m => !o.matches.slice(0, TOP_N).some(t => t.n3 === m.n3 && t.scoreRank > m.scoreRank));
    for (const n3 of new Set(o.matches.map(m => m.n3))) { const r = o.matches.filter(m => m.n3 === n3).map(m => m.scoreRank); assert.deepEqual(r, [...r].sort((a, b) => a - b)); }
    assert.ok(tail.length >= 0);
  }
  // The fixture's airport ranking: six Porto-metro places score in the top; only two stay in the first five.
  const o = matchPlaces({ netMonthly: RICH, places: FIX.places, tastes: nice('airport', 'isch') });
  const top = o.matches.slice(0, TOP_N), amp = top.filter(m => m.n3 === 'Área Metropolitana do Porto');
  assert.ok(byScore(o).slice(0, TOP_N).filter(id => fixPlace(id).n3 === 'Área Metropolitana do Porto').length > MAX_PER_REGION);
  assert.equal(amp.length, MAX_PER_REGION); assert.ok(new Set(top.map(m => m.n3)).size >= 3);
  assert.ok(o.matches.some(m => m.rank > m.scoreRank));
  // One region only: nothing to spread, the points order stands.
  const one = [1, 2, 3, 4, 5, 6, 7].map(i => ({ id: `x${i}`, n3: 'A' }));
  assert.deepEqual(spreadByRegion(one), one);
  assert.deepEqual(spreadByRegion([{ n3: 'A', i: 1 }, { n3: 'A', i: 2 }, { n3: 'A', i: 3 }, { n3: 'B', i: 4 }, { n3: 'A', i: 5 }, { n3: 'C', i: 6 }, { n3: 'C', i: 7 }, { n3: 'D', i: 8 }]).map(x => x.i), [1, 2, 4, 6, 7, 3, 5, 8]);
});

test('deterministic: same input, same order; the order of places and of tastes does not matter; ties break by cost, then slug', () => {
  for (const seed of SEEDS.slice(0, 20)) {
    const R = rng(seed + 6), places = randomTable(seed), tastes = randomTastes(R);
    const input = { netMonthly: 5200, places, tastes }, a = matchPlaces(input);
    assert.deepEqual(matchPlaces(input), a);
    const shuffled = [...places].sort(() => R() - 0.5), reversed = [...tastes].reverse();
    assert.deepEqual(ids(matchPlaces({ ...input, places: shuffled })), ids(a));
    assert.deepEqual(ids(matchPlaces({ ...input, tastes: reversed })), ids(a));
    assert.deepEqual(ids(matchPlaces({ ...input, tastes: [...tastes, ...tastes] })), ids(a));     // a taste twice counts once
  }
  const twin = (id, rentM2) => ({ id, name: id, n3: id, region: 'x', lat: 0, lon: 0, priceM2: 1000, rentM2, period: 'q', m: { beach_min: 20 } });
  assert.deepEqual(ids(matchPlaces({ netMonthly: RICH, places: [twin('b', 9), twin('c', 8), twin('a', 9)], tastes: nice('beach') })), ['c', 'a', 'b']);
  // Essential beats nice to have when the same taste is given both ways.
  assert.deepEqual(matchPlaces({ netMonthly: RICH, places: FIX.places, tastes: [...nice('golf'), ...must('golf')] }).tastes, [{ taste: 'golf', importance: 'essential' }]);
});

test('odd inputs give a clear reason and never throw', () => {
  const P = FIX.places;
  for (const n of [NaN, Infinity, -Infinity, -1, 0, undefined, null, '4500']) assert.equal(matchPlaces({ netMonthly: n, places: P }).reason, 'invalid-input');
  for (const patch of [{ areaM2: 0 }, { areaM2: NaN }, { areaM2: 501 }, { budgetShare: 1.1 }, { budgetShare: 0 }, { depositPercent: -1 }, { depositPercent: 101 }, { annualRate: -1 }, { annualRate: 31 }, { termYears: 0 }, { termYears: 51 }, { housingMode: 'invented' }])
    assert.equal(matchPlaces({ netMonthly: 7000, places: P, ...patch }).reason, 'invalid-input');
  assert.equal(matchPlaces({ netMonthly: 7000, places: P, tastes: [{ taste: 'beach', importance: 'vital' }] }).reason, 'invalid-input');
  assert.equal(matchPlaces({ netMonthly: 7000, places: P, tastes: 'beach' }).reason, 'invalid-input');
  for (const bad of ['surf', 'business', 'invented', '', null, 42]) {
    const o = matchPlaces({ netMonthly: 7000, places: P, tastes: [{ taste: 'beach' }, { taste: bad }] });
    assert.equal(o.reason, 'unsupported-taste'); assert.deepEqual(o.matches, []); assert.deepEqual(o.unsupported, [String(bad)]);
  }
  assert.equal(matchPlaces({ netMonthly: 7000, places: [] }).reason, 'no-places');
  assert.equal(matchPlaces({ netMonthly: 7000 }).reason, 'no-places');
  assert.equal(matchPlaces({ netMonthly: 7000, places: [null, {}, { id: '' }] }).reason, 'no-places');
  assert.equal(matchPlaces(undefined).reason, 'invalid-input'); assert.equal(matchPlaces(null).reason, 'invalid-input'); assert.equal(matchPlaces({}).reason, 'invalid-input');
  assert.equal(matchPlaces({ netMonthly: 1, places: P }).reason, 'no-affordable-match');
  // No tastes: the affordable places, lowest cost first, spread by region. The old "art" still means culture.
  const none = matchPlaces({ netMonthly: 4500, places: P });
  assert.equal(none.reason, 'matched'); assert.ok(none.matches.every(m => m.points === 0 && m.maxPoints === 0 && m.total === 0));
  assert.deepEqual(byScore(none), [...none.matches].sort((a, b) => a.monthlyHousing - b.monthlyHousing || (a.id < b.id ? -1 : 1)).map(m => m.id));
  assert.deepEqual(matchPlaces({ netMonthly: 4500, places: P, tastes: [{ taste: 'art' }] }).tastes, [{ taste: 'culture', importance: 'nice' }]);
  // Every taste essential: only places with data and a score above zero on all ten.
  const all = matchPlaces({ netMonthly: RICH, places: P, tastes: must(...TASTES) });
  assert.equal(all.reason, 'matched');
  for (const m of all.matches) for (const t of m.tastes) assert.ok(t.score > 0);
  assert.ok(all.excluded.filter(e => e.why.startsWith('essential')).length > 200);
  const poor = matchPlaces({ netMonthly: 1500, places: P, tastes: must('golf', 'isch', 'beach', 'food') });
  assert.equal(poor.reason, 'no-essential-match'); assert.ok(poor.excluded.some(e => e.why === 'essential-zero' || e.why === 'essential-no-data'));
  // A huge budget ranks every place that has the median the mode needs: 251 to rent, 304 to buy.
  assert.equal(matchPlaces({ netMonthly: 1e15, places: P }).matches.length, 251);
  assert.equal(matchPlaces({ netMonthly: 1e15, housingMode: 'buy', places: P }).matches.length, 304);
  // Garbage in the table: unknown, never a throw, never NaN in a score.
  const junk = [{ id: 'a', name: 'A', n3: 'r', region: 'x', lat: 0, lon: 0, priceM2: NaN, rentM2: 9, period: 'q', m: { beach_min: 'near', isch_min: -5, isch_n30: NaN, golf_min: Infinity } }, { id: 'b', rentM2: 5 }, { id: 'c', rentM2: '7', m: null }];
  const j = matchPlaces({ netMonthly: 5000, places: junk, tastes: nice(...TASTES) });
  assert.deepEqual(ids(j), ['b', 'a']); assert.deepEqual(j.excluded, [{ id: 'c', why: 'no-rent-median' }]);
  for (const m of j.matches) { assert.equal(m.points, 0); assert.equal(m.unknown.length, TASTES.length); }
  const R = rng(99), pick = a => a[Math.floor(R() * a.length)], weird = [undefined, null, NaN, -1, 0, 1e308, 'x', [], {}, true];
  for (let i = 0; i < 400; i++) {
    const o = matchPlaces({ netMonthly: pick([...weird, 3000]), housingMode: pick(['rent', 'buy', ...weird]), areaM2: pick([80, ...weird]), tastes: pick([undefined, [], [{ taste: pick([...TASTES, ...weird]), importance: pick(['nice', 'essential', ...weird]) }]]), places: pick([P, junk, ...weird]) });
    assert.ok(['matched', 'invalid-input', 'unsupported-taste', 'no-places', 'no-affordable-match', 'no-essential-match'].includes(o.reason));
    assert.ok(Array.isArray(o.matches) && Array.isArray(o.excluded));
  }
});

test('every result explains itself: two or three reasons in numbers, and the trade-off against the next', () => {
  for (const seed of SEEDS.slice(0, 30)) {
    const R = rng(seed + 7), places = randomTable(seed), tastes = randomTastes(R), o = matchPlaces({ netMonthly: 6000, housingMode: R() < 0.5 ? 'rent' : 'buy', places, tastes });
    o.matches.forEach((m, i) => {
      assert.ok(m.reasons.length >= 2 && m.reasons.length <= 3);
      assert.equal(m.reasons.filter(r => r.kind === 'budget').length, 1);
      const tr = m.reasons.filter(r => r.kind === 'taste');
      assert.ok(tr.length <= 2);
      // The tastes named are the ones that bring the most points, and each number is the place's own.
      const best = m.tastes.filter(t => t.points > 0).map(t => t.points).sort((a, b) => b - a).slice(0, 2);
      assert.deepEqual(tr.map(r => r.points), best);
      for (const r of tr) { assert.equal(r.value, m.m[r.key]); assert.ok(TASTE_RULES[r.taste].some(x => x.key === r.key)); }
      const next = o.matches[i + 1];
      if (!next) { assert.equal(m.tradeoff, null); return; }
      assert.equal(m.tradeoff.nextId, next.id);
      const pts = (x, t) => x.tastes.find(y => y.taste === t).points;
      if (m.tradeoff.better?.kind === 'taste') { const b = m.tradeoff.better; assert.ok(pts(next, b.taste) > pts(m, b.taste)); assert.equal(b.next, next.m[b.key]); assert.equal(b.here, m.m[b.key]); }
      if (m.tradeoff.worse?.kind === 'taste') { const w = m.tradeoff.worse; assert.ok(pts(next, w.taste) < pts(m, w.taste)); }
      if (m.tradeoff.better?.kind === 'cost') assert.ok(next.monthlyHousing <= m.monthlyHousing - 1);
      if (m.tradeoff.worse?.kind === 'cost') assert.ok(next.monthlyHousing >= m.monthlyHousing + 1);
      for (const lang of ['pt', 'en', 'fr']) {
        const lines = [formatReasons(m, lang), formatTradeoff(m.tradeoff, lang), ...m.reasons.map(r => formatReason(r, lang))];
        for (const l of lines) { assert.ok(l.length > 3); assert.doesNotMatch(l, /undefined|NaN|null|\[object/); }
        assert.match(formatReasons(m, lang), /\d/);
      }
    });
    for (const lang of ['pt', 'en', 'fr']) assert.doesNotMatch(formatCoverage(o, lang), /undefined|NaN/);
  }
  const o = matchPlaces({ netMonthly: 9000, places: FIX.places, tastes: [...must('isch'), ...nice('beach')] });
  assert.deepEqual(ids(o).slice(0, 6), ['matosinhos', 'oeiras', 'cascais', 'porto', 'almada', 'lisboa']);
  // Three places tie on 4 of 4 points: the lower monthly cost comes first, and the line says so.
  assert.equal(formatTradeoff(o.matches[0].tradeoff, 'en'), 'Next, Oeiras: worse on cost, 261 € a month more.');
  assert.equal(formatTradeoff(o.matches[2].tradeoff, 'en'), 'Next, Porto: better on cost, 188 € a month less; worse on beach 12 min (here 6).');
  const almada = o.matches[4];
  assert.equal(formatReasons(almada, 'en'), 'International school 14 min · beach 9 min · 2,053 € a month under your budget');
  assert.equal(formatTradeoff(almada.tradeoff, 'en'), 'Next, Lisboa: better on international school 9 min (here 14); worse on beach 21 min (here 9).');
  assert.equal(formatTradeoff(almada.tradeoff, 'pt'), 'A seguir, Lisboa: melhor em escola internacional a 9 min (aqui 14); pior em praia a 21 min (aqui 9).');
  assert.equal(formatTradeoff(almada.tradeoff, 'fr'), 'Ensuite, Lisboa : mieux pour école internationale à 9 min (ici 14); moins bien pour plage à 21 min (ici 9).');
  assert.equal(formatTradeoff(o.matches.at(-1).tradeoff, 'en'), '');
  assert.equal(measurePhrase('isch_n30', 1, 'en'), '1 international school within 30 min');
  for (const lang of ['pt', 'en', 'fr']) { const l = methodLines(lang); assert.equal(l.length, TASTES.length); for (const x of l) assert.match(x, /\d/); }
});

test('nothing commercial can reach the order', () => {
  const src = readFileSync(here('../src/lib/match.ts'), 'utf8');
  assert.deepEqual([...src.matchAll(/from "([^"]+)"/g)].map(m => m[1]), ['./housing']);
  assert.doesNotMatch(src, /Math\.random|Date\.now|new Date|fetch\(|document\.|window\./);
  // A sponsor field on a place changes nothing.
  const base = matchPlaces({ netMonthly: 6000, places: FIX.places, tastes: nice('beach', 'food') });
  const paid = matchPlaces({ netMonthly: 6000, places: FIX.places.map(p => ({ ...p, sponsor: true, sponsored: 9, boost: 100, partner: 'x', projects: ['orizon'] })), tastes: nice('beach', 'food') });
  assert.deepEqual(ids(paid), ids(base)); assert.deepEqual(paid.matches.map(m => m.points), base.matches.map(m => m.points));
});

// ================================================================ B. the real table
const table = json('../public/data/match.json'), REAL = decodeMatchTable(table), prices = json('../src/data/prices.json');
const topo = Object.fromEntries(json('../public/data/map/munis.topo.json').objects.m.geometries.map(g => [g.properties.s, g.properties]));
const realPlace = id => REAL.places.find(p => p.id === id);

test('the published table: all 308 places, INE medians untouched, built from the repository, small', () => {
  const now = loadInputs();
  assert.deepEqual(table, JSON.parse(JSON.stringify(buildMatchTable(now.geo, now.prices, now.summary))), 'public/data/match.json is out of date: npm run build:match');
  assert.equal(REAL.places.length, 308); assert.equal(new Set(REAL.places.map(p => p.id)).size, 308);
  assert.equal(REAL.period, prices.quarters.at(-1));
  for (const p of REAL.places) {
    const src = prices.munis[p.id];
    assert.equal(p.priceM2, src.m2.at(-1) ?? null, `${p.id} sale median`); assert.equal(p.rentM2, src.rq.at(-1) ?? null, `${p.id} rent median`);
    assert.equal(p.name, src.n); assert.ok(p.n3.length > 2); assert.ok(Number.isFinite(p.lat) && Number.isFinite(p.lon));
  }
  assert.equal(new Set(REAL.places.map(p => p.n3)).size, 26);
  assert.ok(readFileSync(here('../public/data/match.json')).length < 120_000, 'the table stays under 120 kB before compression');
  assert.notEqual(table.services?.fixture, true, 'the published table never carries fixture data');
});

test('rent mode leaves out the places with no INE rent median, with the reason; nothing is estimated', () => {
  const rent = matchPlaces({ netMonthly: 1e9, places: REAL.places }), buy = matchPlaces({ netMonthly: 1e9, housingMode: 'buy', places: REAL.places });
  const noRent = Object.keys(prices.munis).filter(id => !(prices.munis[id].rq.at(-1) > 0)).sort(), noSale = Object.keys(prices.munis).filter(id => !(prices.munis[id].m2.at(-1) > 0)).sort();
  assert.deepEqual(rent.excluded.map(e => e.id).sort(), noRent); assert.ok(rent.excluded.every(e => e.why === 'no-rent-median'));
  assert.deepEqual(buy.excluded.map(e => e.id).sort(), noSale); assert.ok(buy.excluded.every(e => e.why === 'no-sale-median'));
  assert.equal(rent.matches.length + noRent.length, 308); assert.equal(buy.matches.length + noSale.length, 308);
  console.log(`     rent: ${rent.matches.length} places, ${noRent.length} left out (no INE rent median); buy: ${buy.matches.length}, ${noSale.length} left out (no INE sale median: ${noSale.join(', ')})`);
});

// A layer is ready when summary.json is real and the measure covers most of the country (the mainland has 278 places).
const ready = (...keys) => table.services && !table.services.fixture && keys.every(k => table.covered[k] >= 250);
const lacks = (...keys) => !table.services ? 'summary.json is not in this branch yet' : `covered so far: ${keys.map(k => `${k} ${table.covered[k]}/308`).join(', ')}`;
const realRun = tastes => matchPlaces({ netMonthly: 1e9, housingMode: 'buy', places: REAL.places, tastes });
const rankOf = (o, id) => o.matches.find(m => m.id === id)?.scoreRank ?? Infinity;
const mean = a => a.reduce((s, x) => s + x, 0) / a.length;
const plain = realRun([]);

if (ready('beach_min')) test('2. "beach" moves coastal places up (real table)', () => {
  const o = realRun(nice('beach')), coast = REAL.places.filter(p => topo[p.id].coast && Number.isFinite(rankOf(o, p.id))).map(p => p.id), inland = REAL.places.filter(p => !topo[p.id].coast && Number.isFinite(rankOf(o, p.id))).map(p => p.id);
  assert.ok(coast.length > 40 && inland.length > 150);
  assert.ok(mean(coast.map(id => rankOf(o, id))) < mean(coast.map(id => rankOf(plain, id))), 'coastal places move up on average');
  assert.ok(mean(coast.map(id => rankOf(o, id))) < mean(inland.map(id => rankOf(o, id))) / 2, 'coastal places sit well above inland ones');
  assert.ok(byScore(o).slice(0, 20).every(id => realPlace(id).m.beach_min <= 15), 'the first twenty are a short drive from a beach');
  assert.ok(byScore(o).slice(0, 20).filter(id => topo[id].coast).length >= 15);
  assert.notDeepEqual(byScore(o), byScore(plain));
}); else wait('2. "beach" moves coastal places up', lacks('beach_min'));

if (ready('isch_min', 'isch_n30')) test('3. "international school" moves Cascais, Oeiras and the Porto metro up (real table)', () => {
  const o = realRun(nice('isch')), n = o.matches.length;
  for (const id of ['cascais', 'oeiras', 'porto', 'matosinhos', 'maia', 'vila-nova-de-gaia', 'gondomar']) {
    assert.ok(rankOf(o, id) < rankOf(plain, id), `${id} moves up (${rankOf(plain, id)} -> ${rankOf(o, id)})`);
    assert.ok(rankOf(o, id) <= n / 4, `${id} is in the first quarter (${rankOf(o, id)} of ${n})`);
  }
  assert.ok(rankOf(o, 'cascais') <= 20 && rankOf(o, 'oeiras') <= 20);
}); else wait('3. "international school" moves Cascais, Oeiras and the Porto metro up', lacks('isch_min', 'isch_n30'));

if (ready('golf_min', 'golf_n30')) test('4. "golf" moves Loulé and Albufeira up (real table)', () => {
  const o = realRun(nice('golf'));
  for (const id of ['loule', 'albufeira']) { assert.ok(rankOf(o, id) < rankOf(plain, id), `${id} moves up`); assert.ok(rankOf(o, id) <= 15, `${id} is in the first fifteen (${rankOf(o, id)})`); }
}); else wait('4. "golf" moves Loulé and Albufeira up', lacks('golf_min', 'golf_n30'));

if (ready('beach_min', 'air_min', 'er_min')) test('5b. Gondomar in the real table repeats the hand-checked golden sample', () => {
  const g = realPlace('gondomar');
  // content/facts/map/places/gondomar: Praia de Lavadores 17 min, Porto airport 21 min, Hospital de São João 13 min.
  assert.deepEqual({ beach: g.m.beach_min, air: g.m.air_min, er: g.m.er_min }, { beach: 17, air: 21, er: 13 });
  assert.equal(tasteScore('beach', g).s100, 80); assert.equal(tasteScore('airport', g).s100, 99); assert.equal(tasteScore('health', g).s100, 91);
}); else wait('5b. Gondomar in the real table repeats the golden sample', lacks('beach_min', 'air_min', 'er_min'));

for (const t of TASTES) if (!ready(...TASTE_RULES[t].map(r => r.key))) wait(`taste "${t}" on the real table`, lacks(...TASTE_RULES[t].map(r => r.key)));

console.log(`Matching: ${count} contracts passed, ${waiting} waiting for data; fixture ${Object.keys(fx.summary.places).length} places, real table ${REAL.places.length}.`);
