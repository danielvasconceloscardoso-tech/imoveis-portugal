import { readFileSync } from 'node:fs';
import { test as base, expect, type Page } from '@playwright/test';
import { matchPlaces, type Taste, type Importance } from '../../src/lib/match';
import { decodeMatchTable } from '../../src/lib/match-table';
import { housingPayment, HOUSING_DEFAULTS } from '../../src/lib/housing';
import { matchWords } from '../../src/lib/match-copy';

// Prompt 81: what the map gained and no older spec describes. The services block of the municipality card (seven
// lines, open; a missing value in words), the finder on the one matching engine, the search's foreign names and the
// way back to the whole country. Each case owns one navigation; only the cases that need the real map wait for it.
const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => {
      const request = route.request();
      return new URL(request.url()).origin === new URL(baseURL!).origin && request.method() === 'GET'
        ? route.continue() : route.abort();
    });
    await use(page);
    expect(errors, 'uncaught browser errors').toEqual([]);
  },
});

const isPhone = (page: Page) => page.viewportSize()!.width < 820;
// The map's own script has started (its buttons answer); the engine may still be loading.
const scriptReady = (page: Page) => page.waitForFunction(() => !!(document.querySelector('[data-m3]') as any)?.__mapx);
async function mapReady(page: Page) {
  await page.waitForFunction(() => {
    const root = document.querySelector<HTMLElement>('[data-m3]');
    const map = (root as any)?.__mapx?.map();
    return root?.dataset.mapPainted === 'true' && map?.loaded() && !map.isMoving();
  }, null, { timeout: 30000 });
}
const longDate = (day: string, locale: string) => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${day}T12:00:00`));
// How many service lines, from the first, stand whole in the card's own view: inside the screen, under the top of
// the card's scroll and above the solid part of the Concierge bar.
const linesInView = (page: Page) => page.evaluate(() => {
  const sheet = document.querySelector('[data-sheet]')!, body = sheet.querySelector('[data-sheet-in]')!.getBoundingClientRect();
  const bar = sheet.querySelector<HTMLElement>('[data-cta-bar]')!;
  const floor = Math.min(innerHeight, bar.getBoundingClientRect().top + parseFloat(getComputedStyle(bar).paddingTop));
  let count = 0;
  for (const line of sheet.querySelectorAll('[data-sv]')) {
    const box = line.getBoundingClientRect();
    if (box.height > 0 && box.top >= body.top - 1 && box.bottom <= floor + 1) count++; else break;
  }
  return count;
});

test('Gondomar: seven service lines stand open, with no tap on a desktop and after one swipe on a phone', async ({ page }) => {
  const place = await (await page.request.get('/data/map/place/gondomar.json')).json();
  await page.goto('/en/us/map/?place=gondomar', { waitUntil: 'domcontentloaded' });
  const sheet = page.locator('[data-sheet]'), lines = sheet.locator('[data-sv]');
  await expect(lines).toHaveCount(7);
  // The order of a life: hospital, health centre, international school, schools, beach, airport, table.
  expect(await lines.evaluateAll(items => items.map(item => (item as HTMLElement).dataset.sv))).toEqual(['er', 'cs', 'isch', 'sec', 'beach', 'air', 'food']);
  // The figures are the place file's own, and each stands beside its label with its detail still closed.
  const figure = (key: string) => sheet.locator(`[data-sv="${key}"] .m3-svv`);
  for (const key of ['er', 'cs', 'isch', 'beach', 'air']) await expect(figure(key)).toHaveText(`${place.sv[key].min} min`);
  await expect(figure('sec')).toHaveText(String(place.sv.sec.n20));
  await expect(figure('food')).toHaveText(String(place.sv.mich.n30));
  for (const line of await lines.all()) {
    await expect(line.locator('.m3-svk')).toHaveText(/\p{L}/u);
    await expect(line.locator('.m3-svb')).toHaveAttribute('aria-expanded', 'false');
    await expect(line.locator('.m3-svd')).toHaveAttribute('inert', '');
  }
  // A hand-checked card says so at its foot: the day of the hand check and the day of the table.
  expect(place.sv.hd, 'Gondomar is a hand-checked place').toBeTruthy();
  expect(place.sv.hd).not.toBe(place.sv.d);
  await expect(sheet.locator('.m3-sv-foot')).toContainText(longDate(place.sv.hd, 'en-US'));
  await expect(sheet.locator('.m3-sv-foot')).toContainText(longDate(place.sv.d, 'en-US'));

  const body = sheet.locator('[data-sheet-in]'), concierge = sheet.locator('[data-cta-consult]').first();
  if (!isPhone(page)) {
    // A desktop: the first lines are in the first view, and a scroll (never a tap) brings the last one.
    expect(await linesInView(page)).toBeGreaterThanOrEqual(4);
    await body.hover();
    await page.mouse.wheel(0, 420);
    await expect(lines.last()).toBeInViewport({ ratio: 1 });
    expect(await page.evaluate(() => {
      const sheet = document.querySelector('[data-sheet]')!, last = [...sheet.querySelectorAll('[data-sv]')].pop()!.getBoundingClientRect();
      return last.bottom <= sheet.querySelector('[data-cta-consult]')!.getBoundingClientRect().top;
    }), 'the seventh line above the Concierge button').toBe(true);
  } else {
    // A phone: the card opens half-height with the Concierge in view; one upward swipe anywhere on it opens it to
    // full height without scrolling its text, and the first lines are there.
    await expect(sheet).toHaveAttribute('data-detent', '1');
    await expect(concierge).toBeInViewport({ ratio: .95 });
    const box = (await sheet.boundingBox())!;
    const x = Math.round(box.x + box.width / 2), from = Math.round(box.y + box.height * .6);
    const touch = await page.context().newCDPSession(page);
    await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y: from }] });
    for (let step = 1; step <= 10; step++) await touch.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: from - step * 26 }] });
    await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await expect(sheet).toHaveAttribute('data-detent', '2');
    expect(await body.evaluate(element => element.scrollTop)).toBe(0);
    await expect.poll(() => linesInView(page)).toBeGreaterThanOrEqual(3);
    await expect(concierge).toBeInViewport({ ratio: .95 });
  }
  for (const line of await lines.all()) await expect(line.locator('.m3-svb')).toHaveAttribute('aria-expanded', 'false');
});

// Corvo has no hospital, no international school and no secondary school to give minutes for; Melgaço is one of the
// places whose health centre has no figure yet. A line without a value says so in words: never "0", never a blank.
for (const { slug, path, words } of [
  { slug: 'corvo', path: '/pt/lu/mapa/', words: ['er', 'isch', 'sec'] },
  { slug: 'melgaco', path: '/en/us/map/', words: ['cs'] },
]) test(`${slug}: a missing value is written in words, never as a zero`, async ({ page }) => {
  const place = await (await page.request.get(`/data/map/place/${slug}.json`)).json();
  for (const key of words) expect(place.sv[key]?.min, `${slug} has no minutes for ${key}`).toBeUndefined();
  await page.goto(`${path}?place=${slug}`, { waitUntil: 'domcontentloaded' });
  const services = page.locator('[data-sheet] [data-services]');
  await expect(services.locator('[data-sv]').first()).toBeVisible();
  const lines = await services.locator('[data-sv]').evaluateAll(items => items.map(item => ({
    key: (item as HTMLElement).dataset.sv!, label: item.querySelector('.m3-svk')!.textContent!.trim(),
    value: item.querySelector('.m3-svv')!.textContent!.trim(), words: item.querySelector('.m3-svv')!.classList.contains('is-words'),
    detail: item.querySelector('.m3-svd')!.textContent!.trim(),
  })));
  expect(lines.map(line => line.key)).toEqual(expect.arrayContaining(['er', 'cs', 'isch', 'sec', 'beach', 'air']));
  for (const line of lines) {
    expect(line.label, `${line.key} label`).toMatch(/\p{L}/u);
    expect(line.value, `${line.key} value`).toMatch(/[\p{L}\d]/u);
    expect(line.value, `${line.key} value is not a zero`).not.toMatch(/^0(?!\d)/);
    expect(`${line.value} ${line.detail}`, `${line.key} has no zero minutes`).not.toMatch(/(^|\D)0\s?(min|h)\b/);
    expect(line.detail, `${line.key} detail`).toMatch(/\p{L}{3}/u);
  }
  for (const key of words) {
    const line = lines.find(item => item.key === key)!;
    expect(line.words, `${key} is set as words`).toBe(true);
    expect(line.value, `${key} value`).toMatch(/\p{L}{2}/u);
    expect(`${line.value} ${line.detail}`, `${key} carries no figure`).not.toMatch(/\d/);
  }
  // A line with a figure still has one (the card is not all words).
  expect(lines.filter(line => !line.words && /\d/.test(line.value)).length).toBeGreaterThan(0);
  await expect(services).not.toContainText(/undefined|null|NaN|\{|em breve|coming soon|bientôt/i);
});

test('search finds Lisboa under the names foreign readers type', async ({ page }) => {
  await page.goto('/en/us/map/?dim=2d', { waitUntil: 'domcontentloaded' });
  await scriptReady(page);
  const input = page.locator('[data-spot-in]'), first = page.locator('[data-spot-res] [role="option"]').first();
  for (const typed of ['Lisbon', 'Lisbonne']) {
    await page.locator('[data-spot-open]').click();
    await expect(input).toBeFocused();
    await input.fill(typed);
    await expect(first).toHaveText(/^Lisboa/);
    await expect(first).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-spot]')).toBeHidden();
    await expect(page).toHaveURL(/[?&]place=lisboa(?:&|$)/);
    await expect(page.locator('[data-sheet] h2')).toHaveText('Lisboa');
    await page.locator('[data-sheet] .m3-x').click();
    await expect(page.locator('[data-sheet]')).toBeHidden();
    await expect(page).not.toHaveURL(/[?&]place=/);
  }
});

test('"Portugal" closes the card and returns the map to the national view', async ({ page }) => {
  test.setTimeout(65000);
  await page.goto('/en/us/map/?place=gondomar&dim=2d', { waitUntil: 'domcontentloaded' });
  await mapReady(page);
  const home = page.locator('[data-home]'), sheet = page.locator('[data-sheet]');
  await expect(sheet.locator('h2')).toHaveText('Gondomar');
  await expect(home).toBeVisible();
  await expect(home).toHaveAccessibleName(/\S/);
  const near = await page.evaluate(() => (document.querySelector('[data-m3]') as any).__mapx.map().getZoom());
  await home.click();
  await expect(sheet).toBeHidden();
  await expect(page).not.toHaveURL(/[?&]place=/);
  // The whole country: the camera is the map's own national frame, with the far north and the Algarve both in it.
  await expect.poll(() => page.evaluate(() => {
    const root = document.querySelector('[data-m3]') as any, map = root.__mapx.map(), frame = root.__home;
    const centre = map.getCenter(), target = Array.isArray(frame.center) ? { lng: frame.center[0], lat: frame.center[1] } : frame.center;
    const bounds = map.getBounds();
    return {
      moving: map.isMoving(), zoom: Math.abs(map.getZoom() - frame.zoom) < .01,
      centre: Math.hypot(centre.lng - target.lng, centre.lat - target.lat) < .01,
      north: bounds.contains([-8.2, 42.0]), south: bounds.contains([-7.93, 37.02]),
    };
  })).toEqual({ moving: false, zoom: true, centre: true, north: true, south: true });
  expect(await page.evaluate(() => (document.querySelector('[data-m3]') as any).__mapx.map().getZoom())).toBeLessThan(near - 2);
  // At the national view there is nowhere to go back to.
  await expect(home).toBeHidden();
});

test('the finder opens from the welcome, two tastes give five places, numerals stay under the panel and a result opens its place', async ({ page }) => {
  test.setTimeout(65000);
  await page.goto('/en/us/map/', { waitUntil: 'domcontentloaded' });
  const intro = page.locator('[data-map-arrival]'), finder = page.locator('[data-finder]');
  await expect(intro).toBeVisible();
  await expect(finder).toBeHidden();
  await scriptReady(page);
  await intro.locator('[data-map-arrival-find]').click();
  await expect(intro).toBeHidden();
  await expect(finder).toBeVisible();
  await expect(page.locator('[data-finder-open]')).toHaveAttribute('aria-expanded', 'true');
  const rows = finder.locator('[data-fd-res] [data-go]');
  await expect(rows).toHaveCount(0);
  for (const taste of ['beach', 'isch']) {
    await finder.locator(`[data-taste="${taste}"]`).click();
    await expect(finder.locator(`[data-taste="${taste}"]`)).toHaveAttribute('aria-pressed', 'true');
    // A chosen taste shows its two weights with the numbers they count.
    await expect(finder.locator(`[data-w="${taste}:nice"]`)).toHaveAttribute('aria-pressed', 'true');
    await expect(finder.locator(`[data-w="${taste}:nice"]`)).toContainText('1');
    await expect(finder.locator(`[data-w="${taste}:essential"]`)).toContainText('3');
  }
  await expect(rows).toHaveCount(5);
  await expect(finder.locator('[data-fd-more]')).toBeVisible();
  const list = await rows.evaluateAll(items => items.map(item => ({
    id: (item as HTMLElement).dataset.go!, rank: item.querySelector('.m3-fd-top > i')!.textContent!.trim(),
    name: item.querySelector('.m3-fd-n')!.textContent!.trim(), why: item.querySelector('.m3-fd-why')!.textContent!.trim(),
  })));
  expect(list.map(row => row.rank)).toEqual(['1', '2', '3', '4', '5']);
  expect(new Set(list.map(row => row.id)).size).toBe(5);
  for (const row of list) {
    expect(row.name).toMatch(/\p{L}/u);
    expect(row.why, `${row.name}: reasons in numbers`).toMatch(/\d/);
    expect(row.why, `${row.name}: never "0 min"`).not.toMatch(/(^|\D)0 min/);
  }
  // The same five stand on the map as numerals.
  const marks = page.locator('[data-m3] .m3-fmark');
  await expect(marks).toHaveCount(5, { timeout: 30000 });
  expect((await marks.allTextContents()).map(text => text.trim()).sort()).toEqual(['1', '2', '3', '4', '5']);
  // No numeral is drawn over the finder: wherever a numeral's box meets the panel's, the panel is what is on top.
  const overlap = await page.evaluate(() => {
    const panelElement = document.querySelector('[data-finder]')!, panel = panelElement.getBoundingClientRect();
    let under = 0; const over: string[] = [];
    for (const mark of document.querySelectorAll('.m3-fmark')) {
      const box = mark.getBoundingClientRect();
      const points = [[box.left + box.width / 2, box.top + box.height / 2], [box.left + 2, box.top + 2], [box.right - 2, box.top + 2], [box.left + 2, box.bottom - 2], [box.right - 2, box.bottom - 2]]
        .filter(([x, y]) => x >= Math.max(0, panel.left) && x < Math.min(innerWidth, panel.right) && y >= Math.max(0, panel.top) && y < Math.min(innerHeight, panel.bottom));
      if (!points.length) continue;
      under++;
      if (points.some(([x, y]) => !panelElement.contains(document.elementFromPoint(x, y)))) over.push(mark.textContent!.trim());
    }
    return { under, over };
  });
  expect(overlap.over, 'numerals drawn over the finder panel').toEqual([]);
  // On a phone the panel covers the map, so the numerals are there to be covered.
  if (isPhone(page)) expect(overlap.under).toBeGreaterThan(0);
  // A result opens its place: its card, its address. A desktop keeps the list beside it; a phone puts it away.
  const chosen = list[1];
  await rows.nth(1).click();
  await expect(page).toHaveURL(new RegExp(`[?&]place=${chosen.id}(?:&|$)`));
  await expect(page.locator('[data-sheet] h2')).toHaveText(chosen.name);
  if (isPhone(page)) await expect(finder).toBeHidden(); else await expect(finder).toBeVisible();
});

// A numeral is a button a keyboard reaches. map-v3.ts names it after its place ("2. Matosinhos").
test('each numeral of the finder is named after its place', async ({ page }) => {
  test.setTimeout(65000);
  await page.route('**/data/match.json', route => route.fulfill({ path: 'tests/e2e/fixtures/match.fixture.json', contentType: 'application/json' }));
  await page.goto('/en/us/map/?dim=2d', { waitUntil: 'domcontentloaded' });
  await scriptReady(page);
  await page.locator('[data-finder-open]').click();
  const finder = page.locator('[data-finder]'), rows = finder.locator('[data-fd-res] [data-go]');
  await finder.locator('[data-taste="beach"]').click();
  await finder.locator('[data-taste="golf"]').click();
  await expect(rows).toHaveCount(5);
  const names = await rows.evaluateAll(items => items.map(item => `${item.querySelector('.m3-fd-top > i')!.textContent!.trim()}. ${item.querySelector('.m3-fd-n')!.textContent!.trim()}`));
  const marks = page.locator('[data-m3] .m3-fmark');
  await expect(marks).toHaveCount(5, { timeout: 30000 });
  // The engine's marker gives every element it is handed a label of its own; the place's name has to survive that.
  expect((await marks.evaluateAll(items => items.map(item => item.getAttribute('aria-label')))).sort()).toEqual([...names].sort());
});

test('the finder says "moved down" only of a place that stands lower than its points put it', async ({ page }) => {
  // The hand-made table of the /regressar scenarios (made-up services, real INE medians): with an international school
  // essential and the beach nice to have, the "two per region" rule moves some places up and others down.
  const fixture = JSON.parse(readFileSync('tests/e2e/fixtures/match.fixture.json', 'utf8'));
  await page.route('**/data/match.json', route => route.fulfill({ json: fixture }));
  await page.goto('/pt/lu/mapa/?dim=2d', { waitUntil: 'domcontentloaded' });
  await scriptReady(page);
  await page.locator('[data-finder-open]').click();
  const finder = page.locator('[data-finder]'), rows = finder.locator('[data-fd-res] [data-go]');
  await finder.locator('[data-taste="isch"]').click();
  await finder.locator('[data-taste="beach"]').click();
  await finder.locator('[data-w="isch:essential"]').click();
  await expect(finder.locator('[data-w="isch:essential"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(rows).toHaveCount(5);
  await finder.locator('[data-fd-more]').click();
  await expect(rows).toHaveCount(10);
  // The same engine, run here on the same table with the panel's own budget.
  const budget = Number(await finder.locator('[data-fd-slider]').getAttribute('aria-valuenow'));
  const tastes: { taste: Taste; importance: Importance }[] = [{ taste: 'isch', importance: 'essential' }, { taste: 'beach', importance: 'nice' }];
  const engine = matchPlaces({
    netMonthly: housingPayment(budget * (1 - HOUSING_DEFAULTS.depositPercent / 100), HOUSING_DEFAULTS.annualRate, HOUSING_DEFAULTS.termYears),
    budgetShare: 1, housingMode: 'buy', places: decodeMatchTable(fixture).places, tastes,
  }).matches.slice(0, 10);
  const down = engine.filter(place => place.rank > place.scoreRank).map(place => place.id);
  const up = engine.filter(place => place.rank < place.scoreRank).map(place => place.id);
  expect(down.length, 'the scenario moves a place down').toBeGreaterThan(0);
  expect(up.length, 'the scenario moves a place up').toBeGreaterThan(0);
  const note = matchWords('pt').spread;
  const shown = await rows.evaluateAll((items, text) => items.map(item => ({ id: (item as HTMLElement).dataset.go!, noted: item.textContent!.includes(text) })), note);
  expect(shown.map(row => row.id)).toEqual(engine.map(place => place.id));
  expect(shown.filter(row => row.noted).map(row => row.id)).toEqual(down);
});

test('a drive that rounds to nothing reads "under 1 min" in the finder, never "0 min"', async ({ page }) => {
  const table = { v: 1, period: '2026-Q2', services: null, covered: {}, n3: ['Ave'],
    cols: ['id', 'name', 'n3', 'region', 'lat', 'lon', 'priceM2', 'rentM2', 'rail_min'],
    rows: [['vizela', 'Vizela', 0, 'north', 41.38, -8.31, 1200, 6, 0], ['fafe', 'Fafe', 0, 'north', 41.45, -8.17, 1100, 5, 12]] };
  await page.route('**/data/match.json', route => route.fulfill({ json: table }));
  await page.goto('/en/us/map/?dim=2d', { waitUntil: 'domcontentloaded' });
  await scriptReady(page);
  await page.locator('[data-finder-open]').click();
  const finder = page.locator('[data-finder]');
  await finder.locator('[data-taste="train"]').click();
  await expect(finder.locator('[data-go]')).toHaveCount(2);
  await expect(finder.locator('[data-go="vizela"] .m3-fd-why')).toContainText('under 1 min');
  await expect(finder.locator('[data-go="fafe"] .m3-fd-why')).toContainText('12 min');
  await expect(finder.locator('[data-fd-res]')).not.toContainText(/(^|\D)0 min/);
});
