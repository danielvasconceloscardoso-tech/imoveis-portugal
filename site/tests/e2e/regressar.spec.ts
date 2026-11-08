import { test as base, expect, type Page } from '@playwright/test';

// Every calculation remains local. Reject non-GET or cross-origin requests;
// these scenarios never submit a lead, send mail or call a currency service.
const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => {
      const request = route.request();
      const url = new URL(request.url());
      return request.method() === 'GET' && url.origin === new URL(baseURL!).origin
        ? route.continue() : route.abort();
    });
    await use(page);
    expect(errors, 'uncaught browser errors').toEqual([]);
  },
});
const root = (page: Page) => page.locator('[data-regressar]');
async function open(page: Page, route = '/en/us/regressar/') {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await expect(root(page)).toBeVisible();
  await page.locator('[data-r-country]').selectOption('lu');
}
async function calculate(page: Page, amount = '4500') {
  await page.locator('[data-r-net]').fill(amount);
  await page.locator('[data-r-calculate]').click();
  await expect(page.locator('[data-r-result]')).toBeVisible();
}
const digits = (value: string | null) => Number((value || '').replace(/\D/g, ''));
async function revealControl(page: Page, selector: string) {
  const control = page.locator(selector);
  for (let count = 0; count < 4 && !(await control.isVisible()); count++) {
    const disclosure = control.locator('xpath=ancestor::details[not(@open)]').first();
    await expect(disclosure).toHaveCount(1);
    await disclosure.locator(':scope > summary').click();
  }
  await expect(control).toBeVisible();
}


for (const [language, route] of [
  ['English', '/en/us/regressar/'],
  ['French', '/fr/fr/regressar/'],
] as const) {
  test(`${language}: two-input arrival and complete local result`, async ({ page }) => {
    await open(page, route);
    await expect(page.locator('[data-r-result]')).toBeHidden();
    await expect(page.locator('[data-r-country]')).toHaveAccessibleName(/.+/);
    await expect(page.locator('[data-r-net]')).toHaveAccessibleName(/.+/);
    await calculate(page);
    for (const selector of ['[data-r-negotiation-gross]', '[data-r-gross]', '[data-r-net-result]', '[data-r-irs]', '[data-r-ss]']) {
      await expect(page.locator(selector)).toBeVisible();
      expect(digits(await page.locator(selector).textContent())).toBeGreaterThan(0);
    }
    await expect(page.locator('[data-r-result]')).toHaveAttribute('data-scenario', 'hypothetical');
    await expect(page.locator('[data-r-hero-net]')).toBeVisible();
    expect(digits(await page.locator('[data-r-hero-net]').textContent())).toBe(4500);
    await expect(page.locator('[data-r-hero-net-label]')).toContainText(/médio|average|moyen/i);
    await expect(page.locator('[data-r-scenario-note]')).toBeVisible();
    await expect(page.locator('[data-r-scenario-note]')).toContainText(/eligib|elegib|éligib|hypoth|hipot|assum|suppos/i);
    await expect(page.locator('[data-r-scenario-note]')).not.toContainText(/eligibility confirmed|elegibilidade confirmada|éligibilité confirmée|benefit approved/i);
    expect(digits(await page.locator('[data-r-negotiation-gross]').textContent())).toBe(4841);
    await expect(page.locator('[data-r-pt-payments]')).toHaveValue('14');
    await expect(page.locator('[data-r-negotiation-label]')).toContainText(/14/);
    await expect(page.locator('[data-r-negotiation-label]')).toContainText(/brut|gross/i);
    const hierarchy = await page.evaluate(() => ({
      negotiation: parseFloat(getComputedStyle(document.querySelector('[data-r-negotiation-gross]')!).fontSize),
      annualGross: parseFloat(getComputedStyle(document.querySelector('[data-r-gross]')!).fontSize),
      net: parseFloat(getComputedStyle(document.querySelector('[data-r-hero-net]')!).fontSize),
    }));
    expect(hierarchy.negotiation, 'the employer negotiation figure leads, with annual gross still visible').toBeGreaterThan(hierarchy.annualGross);
    expect(hierarchy.negotiation, 'known current net income is supporting information').toBeGreaterThan(hierarchy.net);
    await expect(page.locator('[data-r-power-place]')).toBeVisible();
    await expect(page.locator('[data-r-power-preview]')).toBeVisible();
    await expect(page.locator('[data-r-power-preview]')).toContainText(/m²/);
    await expect(page.locator('[data-r-city]')).toBeHidden();
    await expect(root(page)).toContainText('2026');
    await expect(page.locator('[data-r-result]')).toHaveAttribute('aria-live', /polite|assertive/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test('annualization: 4500 × 12 is the same target as 54000 per year', async ({ page }) => {
  await open(page);
  await page.locator('[data-r-period]').selectOption('month');
  await revealControl(page, '[data-r-payments]');
  await page.locator('[data-r-payments]').selectOption('12');
  await calculate(page);
  const monthly = await page.locator('[data-r-gross]').textContent();
  await page.locator('[data-r-period]').selectOption('year');
  await calculate(page, '54000');
  await expect(page.locator('[data-r-gross]')).toHaveText(monthly!);
});

test('annualization: 14 payments increase the target instead of dividing the annual salary twice', async ({ page }) => {
  await open(page);
  await page.locator('[data-r-period]').selectOption('month');
  await revealControl(page, '[data-r-payments]');
  await page.locator('[data-r-payments]').selectOption('12');
  await calculate(page);
  const twelve = digits(await page.locator('[data-r-gross]').textContent());
  await page.locator('[data-r-payments]').selectOption('14');
  await calculate(page);
  expect(digits(await page.locator('[data-r-gross]').textContent())).toBeGreaterThan(twelve);
  expect(digits(await page.locator('[data-r-hero-net]').textContent())).toBe(5250);
  await expect(page.locator('[data-r-hero-net-label]')).toContainText(/médio|average|moyen/i);
  const fourteen = await page.locator('[data-r-gross]').textContent();
  await page.locator('[data-r-period]').selectOption('year');
  await calculate(page, '63000');
  await expect(page.locator('[data-r-gross]')).toHaveText(fourteen!);
  expect(digits(await page.locator('[data-r-hero-net]').textContent())).toBe(5250);
});

test('Programme relief leads as a hypothetical estimate and the visitor can compare the standard scenario', async ({ page }) => {
  await open(page);
  const benefit = page.locator('[data-r-benefit]');
  await expect(benefit).toBeChecked();
  await calculate(page);
  await expect(page.locator('[data-r-result]')).toHaveAttribute('data-scenario', 'hypothetical');
  expect(digits(await page.locator('[data-r-gross]').textContent())).toBe(67770);
  await revealControl(page, '[data-r-benefit]');
  await benefit.uncheck();
  await expect(page.locator('[data-r-result]')).toHaveAttribute('data-scenario', 'standard');
  expect(digits(await page.locator('[data-r-gross]').textContent())).toBe(92518);
  await benefit.check();
  await expect(page.locator('[data-r-result]')).toHaveAttribute('data-scenario', 'hypothetical');
  expect(digits(await page.locator('[data-r-gross]').textContent())).toBe(67770);
  await expect(root(page)).toContainText(/12[.º\s-]*A|12\.º-A/i);
});

for (const amount of ['', '0', '-1']) {
  test(`invalid income ${JSON.stringify(amount)} never generates a salary result`, async ({ page }) => {
    await open(page);
    await page.locator('[data-r-net]').fill(amount);
    await page.locator('[data-r-calculate]').click();
    await expect(page.locator('[data-r-result]')).toBeHidden();
    const rejected = await page.locator('[data-r-net]').evaluate((input: HTMLInputElement) =>
      !input.checkValidity() || input.getAttribute('aria-invalid') === 'true');
    expect(rejected).toBe(true);
  });
}

test('net income is absent from URLs, requests and browser storage', async ({ page }) => {
  await open(page);
  const requests: string[] = [];
  page.on('request', request => requests.push(`${request.method()} ${request.url()} ${request.postData() || ''}`));
  await calculate(page, '4321.67');
  expect(page.url()).not.toMatch(/4321|salary|salario|income|net=/i);
  expect(requests.join('\n')).not.toMatch(/4321(?:\.|%2E|,|%2C)?67/);
  const stored = await page.evaluate(() => JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage } }));
  expect(stored).not.toMatch(/4321(?:\.|,)?67/);
  expect(requests.every(request => request.startsWith('GET '))).toBe(true);
});

test('denied storage does not prevent calculation or reduced-motion city discovery', async ({ page }) => {
  await page.addInitScript(() => {
    for (const property of ['localStorage', 'sessionStorage']) {
      Object.defineProperty(window, property, { configurable: true, get() { throw new DOMException('Denied', 'SecurityError'); } });
    }
  });
  await open(page);
  await calculate(page, '7000');
  await page.locator('[data-r-reveal]').click();
  await expect(page.locator('[data-r-city]')).toBeVisible();
  const map = page.locator('[data-r-map]');
  await expect(map).toHaveAttribute('href', /[?&]place=[a-z-]+/);
  await expect(map).not.toHaveAttribute('href', /4321|salary|income|net=/);
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
});

test('preference controls expose selection and city reveal stays within the available budget', async ({ page }) => {
  await open(page);
  await calculate(page, '7000');
  const preference = page.locator('[data-r-preference]').first();
  await preference.click();
  await expect(preference).toHaveAttribute('aria-pressed', 'true');
  await preference.click();
  await expect(preference).toHaveAttribute('aria-pressed', 'false');
  await page.locator('[data-r-reveal]').click();
  await expect(page.locator('[data-r-city]')).toBeVisible();
  await expect(page.locator('[data-r-map]')).toHaveAttribute('href', /[?&]place=[a-z-]+/);
  expect(digits(await page.locator('[data-r-city-housing]').textContent())).toBeLessThanOrEqual(
    digits(await page.locator('[data-r-budget]').textContent()));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('keyboard can calculate without exposing a conventional fiscal questionnaire', async ({ page }) => {
  await open(page);
  await page.locator('[data-r-net]').focus();
  await page.locator('[data-r-net]').fill('2500');
  await page.locator('[data-r-calculate]').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-r-result]')).toBeVisible();
  await expect(page.locator('[data-r-calculate]')).toHaveAccessibleName(/.+/);
  expect(await page.locator('[data-r-calculate]').evaluate(element => {
    const rectangle = element.getBoundingClientRect();
    return rectangle.width >= 44 && rectangle.height >= 44;
  })).toBe(true);
});


test('foreign net uses a dated CHF conversion rather than a silent EUR identity rate', async ({ page }) => {
  await open(page);
  await calculate(page, '4500');
  const euroGross = digits(await page.locator('[data-r-gross]').textContent());
  await page.locator('[data-r-country]').selectOption('ch');
  await expect(page.locator('[data-r-currency]')).toHaveText('CHF');
  await calculate(page, '4500');
  // Repository snapshot: 1 EUR = 0.9227 CHF, so CHF4500 exceeds EUR4500.
  expect(digits(await page.locator('[data-r-gross]').textContent())).toBeGreaterThan(euroGross);
  await expect(page.locator('[data-r-fx]')).toContainText('2026-10-23');
  await expect(page.locator('[data-r-fx]')).toHaveAttribute('href', /ecb\.europa\.eu/);
});

test('an unaffordable beach preference produces an honest no-match rather than a random city', async ({ page }) => {
  await open(page);
  await calculate(page, '1700');
  await page.locator('[data-r-preference=beach]').click();
  await page.locator('[data-r-housing]').selectOption('rent');
  await page.locator('[data-r-reveal]').click();
  await expect(page.locator('[data-r-no-match]')).toBeVisible();
  await expect(page.locator('[data-r-city]')).toBeHidden();
});

test('unsupported low-income fiscal range shows an explanation instead of an inaccurate tax result', async ({ page }) => {
  await open(page);
  await page.locator('[data-r-net]').fill('1000');
  await page.locator('[data-r-calculate]').click();
  await expect(page.locator('[data-r-result]')).toBeHidden();
  await expect(page.locator('[data-r-error]')).toBeVisible();
  await expect(page.locator('[data-r-error]')).toContainText(/20[ ,]000/);
});


test('successive city reveals reuse one real MapLibre canvas', async ({ page }) => {
  await open(page);
  await calculate(page, '7000');
  await page.locator('[data-r-reveal]').click();
  const map = page.locator('[data-r-mini-map]');
  await expect(map).toHaveAttribute('data-regressar-map-ready', 'true', { timeout: 25000 });
  await expect(map.locator('canvas.maplibregl-canvas')).toHaveCount(1);
  await expect(map).toHaveAttribute('role', 'region');
  for (const marker of await map.locator('button.maplibregl-marker').all()) {
    await expect(marker).toHaveAttribute('aria-label', (await marker.textContent())!);
  }
  await expect(page.locator('[data-r-reveal]')).toBeEnabled();
  const first = await page.locator('[data-r-city]').getAttribute('data-place');
  await page.locator('[data-r-reveal]').click();
  await expect(page.locator('[data-r-city]')).not.toHaveAttribute('data-place', first!);
  await expect(map.locator('canvas.maplibregl-canvas')).toHaveCount(1);
  await expect(page.locator('[data-r-reveal]')).toBeEnabled();
  await page.locator('[data-r-preference=beach]').click();
  await expect(page.locator('[data-r-city]')).toBeHidden();
  await expect(map).toBeHidden();
  await page.locator('[data-r-reveal]').click();
  await expect(map).toBeVisible();
  await expect(map.locator('canvas.maplibregl-canvas')).toHaveCount(1);
});


test('Portuguese decimal comma gives the same result as a decimal point', async ({ page }) => {
  await open(page);
  await calculate(page, '4500.50');
  const point = await page.locator('[data-r-gross]').textContent();
  await calculate(page, '4500,50');
  await expect(page.locator('[data-r-gross]')).toHaveText(point!);
});


test('The simulator is immediately usable and its source currency is independent of country', async ({ page }) => {
  await open(page);
  await page.evaluate(() => document.fonts.ready);
  for (const selector of ['[data-r-country]', '[data-r-currency-select]', '[data-r-net]', '[data-r-calculate]']) {
    const control = page.locator(selector);
    await expect(control).toBeVisible();
    await expect(control).toHaveAccessibleName(/.+/);
    expect(await control.evaluate(element => {
      const bounds = element.getBoundingClientRect();
      return bounds.top >= 0 && bounds.left >= 0 && bounds.bottom <= innerHeight && bounds.right <= innerWidth;
    }), `${selector} is available in the first viewport without an introductory click`).toBe(true);
  }
  await page.locator('[data-r-currency-select]').selectOption('USD');
  await expect(page.locator('[data-r-country]')).toHaveValue('lu');
  await calculate(page);
  expect(digits(await page.locator('[data-r-net-result]').textContent())).toBe(Math.round(54000 / 1.1193));
  await expect(page.locator('[data-r-fx]')).toContainText(/USD/);
  await expect(page.locator('[data-r-fx]')).toContainText('2026-10-23');
  await page.locator('[data-r-currency-select]').selectOption('CHF');
  await expect(page.locator('[data-r-country]')).toHaveValue('lu');
  await calculate(page);
  expect(digits(await page.locator('[data-r-net-result]').textContent())).toBe(Math.round(54000 / 0.9227));
  await expect(page.locator('[data-r-fx]')).toContainText(/CHF/);
});

test('Portuguese payment count changes the negotiation amount without changing annual tax or source income', async ({ page }) => {
  await open(page);
  await calculate(page);
  const annual = await page.locator('[data-r-gross]').textContent();
  const net = await page.locator('[data-r-net-result]').textContent();
  const ss = await page.locator('[data-r-ss]').textContent();
  const irs = await page.locator('[data-r-irs]').textContent();
  const sourcePayments = await page.locator('[data-r-payments]').inputValue();
  await expect(page.locator('[data-r-power-preview]')).toContainText(/m²/);
  const firstPower = await page.locator('[data-r-power-preview]').textContent();
  await page.locator('[data-r-power-place]').selectOption('braga');
  await expect(page.locator('[data-r-power-preview]')).not.toHaveText(firstPower!);
  await expect(page.locator('[data-r-power-preview]')).toContainText(/m²/);
  await expect(page.locator('[data-r-gross]')).toHaveText(annual!);
  await expect(page.locator('[data-r-net-result]')).toHaveText(net!);
  await expect(page.locator('[data-r-pt-payments]')).toHaveValue('14');
  expect(digits(await page.locator('[data-r-negotiation-gross]').textContent())).toBe(4841);
  await page.locator('[data-r-pt-payments]').selectOption('12');
  expect(digits(await page.locator('[data-r-negotiation-gross]').textContent())).toBe(5647);
  await expect(page.locator('[data-r-negotiation-label]')).toContainText('12');
  await expect(page.locator('[data-r-gross]')).toHaveText(annual!);
  await expect(page.locator('[data-r-net-result]')).toHaveText(net!);
  await expect(page.locator('[data-r-ss]')).toHaveText(ss!);
  await expect(page.locator('[data-r-irs]')).toHaveText(irs!);
  await expect(page.locator('[data-r-payments]')).toHaveValue(sourcePayments);
  await page.locator('[data-r-pt-payments]').selectOption('14');
  expect(digits(await page.locator('[data-r-negotiation-gross]').textContent())).toBe(4841);
  await expect(page.locator('[data-r-gross]')).toHaveText(annual!);
});
