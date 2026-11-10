import { test as base, expect, type Page } from '@playwright/test';

// Programme qualification and life data are local. Never send a salary, lead or form.
const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => {
      const request = route.request();
      return request.method() === 'GET' && new URL(request.url()).origin === new URL(baseURL!).origin
        ? route.continue() : route.abort();
    });
    // Prompt 81: the discovery's 308-place table, pinned to the hand-made fixture (see regressar.spec.ts).
    await page.route('**/data/match.json', route => route.fulfill({ path: 'tests/e2e/fixtures/match.fixture.json', contentType: 'application/json' }));
    await use(page);
    expect(errors, 'uncaught browser errors').toEqual([]);
  },
});
const criteria = ['priorResidence', 'outsidePreviousFiveYears', 'taxRegular', 'noNhrRegistration'] as const;
const criterion = (page: Page, id: typeof criteria[number]) => page.locator(`[data-r-eligibility="${id}"]`);
const money = (value: string | null) => Number((value || '').replace(/\D/g, ''));

async function open(page: Page) {
  await page.goto('/en/us/regressar/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-regressar]')).toBeVisible();
  await page.locator('[data-r-country]').selectOption('lu');
}
async function calculate(page: Page) {
  await page.locator('[data-r-net]').fill('4500');
  await page.locator('[data-r-calculate]').click();
  await expect(page.locator('[data-r-result]')).toBeVisible();
}
async function showControl(page: Page, selector: string) {
  const control = page.locator(selector);
  for (let level = 0; level < 5 && !(await control.isVisible()); level++) {
    const disclosure = control.locator('xpath=ancestor::details[not(@open)]').first();
    await expect(disclosure).toHaveCount(1);
    await disclosure.locator(':scope > summary').click();
  }
  await expect(control).toBeVisible();
}
async function qualify(page: Page) {
  await showControl(page, '[data-r-return-year]');
  await page.locator('[data-r-return-year]').selectOption('2026');
  for (const id of criteria) await criterion(page, id).selectOption('yes');
}

test('Programme is the visible reference and the independent relationship is explicit', async ({ page }) => {
  await open(page);
  await expect(page.locator('[data-r-programme]')).toBeVisible();
  await expect(page.locator('[data-r-programme]')).toContainText(/Programa\s*Regressar/i);
  await expect(page.locator('[data-r-programme-note]')).toBeVisible();
  const signatures = page.locator('[data-r-signature]');
  expect(await signatures.count(), 'discreet identity appears at the key journey touchpoints').toBeGreaterThanOrEqual(3);
  for (const signature of await signatures.all()) {
    await expect(signature).toContainText(/Imóveis Portugal/);
    await expect(signature).toContainText(/Programa\s*Regressar/i);
  }

  await expect(page.locator('[data-r-programme-note]')).toContainText(/independent|no government partnership/i);
  const overlayAlphas = await page.locator('.rx-arrival-photo').evaluate(element => {
    const style = getComputedStyle(element, '::after');
    const paint = style.backgroundImage === 'none' ? style.backgroundColor : style.backgroundImage;
    return [...paint.matchAll(/rgba\([^)]*,\s*([\d.]+)\)/g)].map(match => Number(match[1]));
  });
  expect(overlayAlphas.length, 'photo text needs a real contrast overlay').toBeGreaterThan(0);
  expect(overlayAlphas.every(alpha => alpha >= 0.66), 'small white photo text retains the reviewed contrast floor').toBe(true);
  // Source verification limits remain visible rather than being replaced by a government endorsement.
  await calculate(page);
  await expect(page.locator('[data-r-result]')).toContainText(/assumptions to confirm|tax review|pressupostos por confirmar|revisão fiscal/i);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('Unknown answers permit a labelled hypothetical preview, while unsupported cohorts do not', async ({ page }) => {
  await open(page);
  await calculate(page);
  const benefit = page.locator('[data-r-benefit]');
  await expect(benefit).toBeChecked();
  await expect(benefit).toBeEnabled();
  await expect(page.locator('[data-r-result]')).toHaveAttribute('data-scenario', 'hypothetical');
  expect(money(await page.locator('[data-r-gross]').textContent())).toBe(67770);
  expect(money(await page.locator('[data-r-negotiation-gross]').textContent())).toBe(4841);
  await expect(page.locator('[data-r-scenario-note]')).toContainText(/elegib|hipot|assum/i);
  await showControl(page, '[data-r-return-year]');
  await expect(page.locator('[data-r-eligibility-status]')).toHaveAttribute('data-status', 'incomplete');
  for (const [year, status] of [['2023', 'incomplete'], ['2027', 'not-eligible']] as const) {
    await page.locator('[data-r-return-year]').selectOption(year);
    await expect(page.locator('[data-r-eligibility-status]')).toHaveAttribute('data-status', status);
    await expect(benefit).not.toBeChecked();
    await expect(benefit).toBeDisabled();
    await expect(page.locator('[data-r-result]')).toHaveAttribute('data-scenario', 'standard');
    expect(money(await page.locator('[data-r-gross]').textContent())).toBe(92518);
  expect(money(await page.locator('[data-r-negotiation-gross]').textContent())).toBe(6608);
  }
  await page.locator('[data-r-return-year]').selectOption('2026');
  for (const id of criteria.slice(0, -1)) await criterion(page, id).selectOption('yes');
  await expect(benefit).toBeEnabled();
  await expect(benefit).toBeChecked();
  await expect(page.locator('[data-r-result]')).toHaveAttribute('data-scenario', 'hypothetical');
  await expect(page.locator('[data-r-eligibility-status]')).toHaveAttribute('data-status', 'incomplete');
});

test('A completed compatible checklist labels the existing preview without granting entitlement', async ({ page }) => {
  await open(page);
  await calculate(page);
  const preview = await page.locator('[data-r-gross]').textContent();
  const target = await page.locator('[data-r-net-result]').textContent();
  await qualify(page);
  await expect(page.locator('[data-r-eligibility-status]')).toHaveAttribute('data-status', 'potentially-eligible');
  await expect(page.locator('[data-r-benefit]')).toBeEnabled();
  await expect(page.locator('[data-r-benefit]')).toBeChecked();
  await expect(page.locator('[data-r-result]')).toHaveAttribute('data-scenario', 'compatible');
  await expect(page.locator('[data-r-gross]')).toHaveText(preview!);
  await expect(page.locator('[data-r-net-result]')).toHaveText(target!);
  await expect(page.locator('[data-r-eligibility-status]')).not.toContainText(/elegibilidade confirmada|aprovado/i);
});

test('A disqualifying answer replaces the hypothetical gross and its full tax ledger with standard values', async ({ page }) => {
  await open(page);
  await calculate(page);
  const result = page.locator('[data-r-result]');
  await expect(result).toHaveAttribute('data-scenario', 'hypothetical');
  expect(money(await page.locator('[data-r-gross]').textContent())).toBe(67770);
  expect(money(await page.locator('[data-r-negotiation-gross]').textContent())).toBe(4841);
  expect(money(await page.locator('[data-r-ss]').textContent())).toBe(7455);
  expect(money(await page.locator('[data-r-irs]').textContent())).toBe(6315);
  expect(money(await page.locator('[data-r-solidarity]').textContent())).toBe(0);
  await showControl(page, '[data-r-return-year]');
  await page.locator('[data-r-return-year]').selectOption('2026');
  await criterion(page, 'outsidePreviousFiveYears').selectOption('no');
  await expect(page.locator('[data-r-benefit]')).not.toBeChecked();
  await expect(page.locator('[data-r-benefit]')).toBeDisabled();
  await expect(page.locator('[data-r-eligibility-status]')).toHaveAttribute('data-status', 'not-eligible');
  await expect(result).toHaveAttribute('data-scenario', 'standard');
  expect(money(await page.locator('[data-r-gross]').textContent())).toBe(92518);
  expect(money(await page.locator('[data-r-negotiation-gross]').textContent())).toBe(6608);
  expect(money(await page.locator('[data-r-ss]').textContent())).toBe(10177);
  expect(money(await page.locator('[data-r-irs]').textContent())).toBe(28283);
  expect(money(await page.locator('[data-r-solidarity]').textContent())).toBe(59);
  expect(money(await page.locator('[data-r-net-result]').textContent())).toBe(54000);
  expect(money(await page.locator('[data-r-hero-net]').textContent())).toBe(4500);
  const displayedBalance = 92518 - 10177 - 28283 - 59;
  expect(Math.abs(displayedBalance - 54000), 'rounding alone explains the displayed annual ledger').toBeLessThanOrEqual(2);
});

test('An explicit standard comparison preference survives later compatible checklist answers', async ({ page }) => {
  await open(page);
  await calculate(page);
  await showControl(page, '[data-r-benefit]');
  await page.locator('[data-r-benefit]').uncheck();
  await qualify(page);
  await expect(page.locator('[data-r-benefit]')).not.toBeChecked();
  await expect(page.locator('[data-r-benefit]')).toBeEnabled();
  await expect(page.locator('[data-r-result]')).toHaveAttribute('data-scenario', 'standard');
  expect(money(await page.locator('[data-r-gross]').textContent())).toBe(92518);
  expect(money(await page.locator('[data-r-negotiation-gross]').textContent())).toBe(6608);
});

test('Image choices keep their accessible selection state and reveal a compatible municipality', async ({ page }) => {
  await open(page);
  await calculate(page);
  const choices = page.locator('[data-r-preference]');
  await expect(choices).toHaveCount(6);
  for (const button of await choices.all()) {
    await expect(button).toHaveAccessibleName(/.+/);
    await expect(button.locator('img')).toHaveCount(1);
    await expect(button.locator('img')).toHaveAttribute('loading', 'lazy');
    await button.scrollIntoViewIfNeeded();
    await expect.poll(() => button.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0), { message: 'the image question loads a real local photograph' }).toBe(true);
    await expect(button).toHaveAttribute('aria-pressed', 'false');
  }
  const beach = page.locator('[data-r-preference="beach"]');
  await beach.click();
  await expect(beach).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-r-reveal]').click();
  await expect(page.locator('[data-r-city]')).toBeVisible();
  await expect(page.locator('[data-r-city-evidence]')).toContainText(/Beach/);
});

test('A sourced city reveals housing power, real schools and actual hospitals', async ({ page }) => {
  await open(page);
  await calculate(page);
  // Prompt 81: tastes rank, they no longer filter down to one place. Matosinhos (a place with detailed local data) is
  // opened from the ranked list, wherever the six tastes put it.
  for (const preference of ['beach', 'golf', 'art', 'food', 'schools', 'airport']) {
    await page.locator(`[data-r-preference="${preference}"]`).click();
  }
  await page.locator('[data-r-reveal]').click();
  await expect(page.locator('[data-r-match]').first()).toBeVisible();
  const row = page.locator('[data-r-match="matosinhos"]');
  for (let more = 0; more < 60 && !(await row.count()); more++) await page.locator('[data-r-more-results]').click();
  await row.click();
  await expect(page.locator('[data-r-city-name]')).toHaveText('Matosinhos');
  await expect(page.locator('[data-r-buying-power]')).toBeVisible();
  await expect(page.locator('[data-r-buying-power]')).toContainText(/m²/);
  for (const selector of ['[data-r-schools]', '[data-r-hospitals]']) {
    const list = page.locator(selector);
    await showControl(page, selector);
    await expect(list).toBeVisible();
    expect(await list.locator('li').count()).toBeGreaterThan(0);
    expect(await list.locator('a[href]').count()).toBeGreaterThan(0);
    await expect(list).toContainText(/km|min/i);
    await expect(list).toContainText(/2026-\d{2}-\d{2}/);
  }
  await expect(page.locator('[data-r-hospitals]')).not.toContainText(/USF Oceanos|USF Anémona/);
  await expect(page.locator('[data-r-life-note]')).toContainText(/Origin.*Matosinhos/);
  await expect(page.locator('[data-r-life-note]')).toContainText(/private and international/);
  await expect(page.locator('[data-r-map]')).toHaveAttribute('href', /[?&]place=matosinhos/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
