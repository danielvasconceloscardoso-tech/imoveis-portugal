import { test as base, expect, type Page } from '@playwright/test';

// Official support is a visitor-controlled handoff, never a submitted lead.
const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => {
      const request = route.request();
      return request.method() === 'GET' && new URL(request.url()).origin === new URL(baseURL!).origin
        ? route.continue() : route.abort();
    });
    await use(page);
    expect(errors, 'uncaught browser errors').toEqual([]);
  },
});
async function open(page: Page, path = '/pt/lu/regressar/') {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('[data-regressar]')).toBeVisible();
  await expect(page.locator('[data-r-return-brief]')).toHaveValue(/\S/);
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

test('Programme preview leads to income before the optional checklist, with a keyboard path to support', async ({ page }) => {
  await open(page);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Programa Regressar');
  await expect(page.locator('[data-r-journey]')).toBeVisible();
  await expect(page.locator('[data-r-journey] a')).toHaveCount(3);
  await expect(page.locator('[data-r-preview-programme]').first()).toHaveAttribute('href', '#rx-income');
  await expect(page.locator('[data-r-start-programme]').first()).toHaveAttribute('href', '#rx-programme-start');
  await expect(page.locator('[data-r-open-support]').first()).toHaveAttribute('href', '#rx-support');
  await expect(page.locator('[data-r-open-income]').first()).toHaveAttribute('href', '#rx-income');
  expect(await page.evaluate(() => {
    const programme = document.getElementById('rx-programme-start');
    const result = document.querySelector('[data-r-result]');
    return !!programme && !!result && !!(result.compareDocumentPosition(programme) & Node.DOCUMENT_POSITION_FOLLOWING);
  })).toBe(true);
  await page.locator('[data-r-preview-programme]').first().focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#rx-income$/);
  await expect(page.locator('[data-r-net]')).toHaveValue('');
  await page.locator('[data-r-journey-step="conditions"]').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#rx-programme-start$/);
  await showControl(page, '[data-r-return-year]');
  await expect(page.locator('[data-r-net]')).toHaveValue('');
  await expect(page.locator('[data-r-eligibility-status]')).toHaveAttribute('data-status', 'incomplete');
  await page.locator('[data-r-open-support]').first().focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#rx-support$/);
  await expect(page.locator('[data-r-support]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('Official support remains available without a salary or an eligibility claim', async ({ page }) => {
  await open(page);
  await expect(page.locator('[data-r-net]')).toHaveValue('');
  await expect(page.locator('[data-r-result]')).toBeHidden();
  const expected = {
    programme: 'https://www.programaregressar.gov.pt/',
    employment: 'https://www.iefp.pt/',
    tax: 'https://www.portaldasfinancas.gov.pt/',
  };
  for (const [route, url] of Object.entries(expected)) {
    const link = page.locator(`[data-r-support-route="${route}"]`);
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', url);
    await expect(link).toHaveAccessibleName(/.+/);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
    await expect(link).toHaveAttribute('rel', /noreferrer/);
  }
  await expect(page.locator('[data-r-support] a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('[data-r-support] a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('[data-r-programme-note]')).toContainText(/independente|sem parceria|não.*oficial/i);
});

test('The preparation brief uses country and return year, never salary or screening answers', async ({ page }) => {
  await open(page);
  await page.locator('[data-r-country]').selectOption('fr');
  await showControl(page, '[data-r-return-year]');
  await page.locator('[data-r-return-year]').selectOption('2026');
  const brief = page.locator('[data-r-return-brief]');
  await expect(brief).toHaveValue(/França/);
  await expect(brief).toHaveValue(/2026/);
  const before = await brief.inputValue();
  await page.locator('[data-r-net]').fill('9876.54');
  for (const id of ['priorResidence', 'outsidePreviousFiveYears', 'taxRegular', 'noNhrRegistration']) {
    await page.locator(`[data-r-eligibility="${id}"]`).selectOption('yes');
  }
  await expect(brief).toHaveValue(before);
  expect(await brief.inputValue()).not.toMatch(/9876|9[.,\s]876|118[.,\s]?518/);
  await expect(brief).toHaveAttribute('readonly', '');
});

test('Denied clipboard access selects the existing preparation text for manual copying', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true, value: { writeText: async () => { throw new DOMException('Clipboard denied', 'NotAllowedError'); } },
  }));
  await open(page);
  await page.locator('[data-r-copy-brief]').click();
  await expect(page.locator('[data-r-brief-status]')).toBeVisible();
  await expect(page.locator('[data-r-brief-status]')).toContainText(/selecion|copi|manual|Ctrl|⌘/i);
  expect(await page.locator('[data-r-return-brief]').evaluate((element: HTMLTextAreaElement) =>
    document.activeElement === element && element.selectionStart === 0 && element.selectionEnd === element.value.length,
  )).toBe(true);
});

test('A successful copy places only the displayed brief on the clipboard', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true, value: { writeText: async (text: string) => { (window as any).__copiedReturnBrief = text; } },
  }));
  await open(page, '/en/us/regressar/');
  await page.locator('[data-r-net]').fill('9876.54');
  const brief = await page.locator('[data-r-return-brief]').inputValue();
  await page.locator('[data-r-copy-brief]').click();
  await expect.poll(() => page.evaluate(() => (window as any).__copiedReturnBrief)).toBe(brief);
  await expect(page.locator('[data-r-brief-status]')).toContainText(/copied/i);
  expect(brief).not.toContain('9876');
});

test('Preparing support never submits a request or persists the financial value', async ({ page, baseURL }) => {
  const requests: { method: string; url: string; data: string | null }[] = [];
  page.on('request', request => requests.push({ method: request.method(), url: request.url(), data: request.postData() }));
  await open(page);
  const before = await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }));
  await page.locator('[data-r-net]').fill('9876.54');
  await page.locator('[data-r-open-support]').first().click();
  await page.locator('[data-r-copy-brief]').click();
  expect(requests.filter(request => request.method !== 'GET')).toEqual([]);
  expect(requests.filter(request => new URL(request.url).origin !== new URL(baseURL!).origin)).toEqual([]);
  expect(JSON.stringify(requests)).not.toContain('9876');
  expect(page.url()).not.toContain('9876');
  const after = await page.evaluate(() => ({ local: { ...localStorage }, session: { ...sessionStorage } }));
  expect(after).toEqual(before);
  expect(JSON.stringify(after)).not.toContain('9876');
});
