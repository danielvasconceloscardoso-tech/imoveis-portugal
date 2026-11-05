import { redirectPage } from '../../src/lib/redirect';
import vm from 'node:vm';
import { test as base, expect } from '@playwright/test';

const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', route => {
      const url = new URL(route.request().url());
      return url.origin === new URL(baseURL!).origin || !/^https?:$/.test(url.protocol)
        ? route.continue() : route.abort();
    });
    await use(page);
    expect(errors, 'uncaught browser errors').toEqual([]);
  },
});

for (const path of ['/pt/lu/', '/fr/fr/', '/fr/ch/', '/pt/br/', '/en/us/', '/en/il/']) {
  test(`edition loads: ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1').first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}

test('arrival language follows selection and persists after reload', async ({ page }) => {
  await page.goto('/');
  for (const lang of ['pt', 'fr', 'en']) {
    const control = page.locator(`[data-set="${lang}"]`);
    await control.click();
    await expect(page.locator('html')).toHaveAttribute('lang', new RegExp(`^${lang}($|-)`));
    await expect(control).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator(`.op-pick[data-for="${lang}"]`)).toBeVisible();
  }
  await page.locator('[data-set="fr"]').click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', /^fr($|-)/);
  await expect(page.locator('[data-set="fr"]')).toHaveAttribute('aria-pressed', 'true');
});

test('arrival edition choice reaches the selected edition', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-set="pt"]').click();
  await page.locator('.op-pick[data-for="pt"] [data-ed="lu"]').click();
  await expect(page).toHaveURL(/\/pt\/lu\/$/);
  await expect(page.locator('h1').first()).toBeVisible();
});

test('menu contains keyboard focus, closes on Escape and restores focus', async ({ page }) => {
  await page.goto('/pt/lu/');
  const menu = page.locator('details.concierge');
  const opener = menu.locator(':scope > summary');
  await opener.click();
  await expect(menu).toHaveAttribute('open', '');
  await expect(page.locator('html')).toHaveClass(/nav-lock/);
  expect(await page.locator('main').evaluate(el => (el as HTMLElement).inert)).toBe(true);
  const links = menu.locator('a:visible, button:visible, summary:visible');
  await links.last().focus();
  await page.keyboard.press('Tab');
  expect(await menu.evaluate(el => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Shift+Tab');
  expect(await menu.evaluate(el => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveAttribute('open');
  await expect(opener).toBeFocused();
  await expect(page.locator('html')).not.toHaveClass(/nav-lock/);
  expect(await page.locator('main').evaluate(el => (el as HTMLElement).inert)).toBe(false);
});

test('country picker and menu are mutually exclusive', async ({ page }) => {
  await page.goto('/pt/lu/');
  const country = page.locator('details.cpick');
  const menu = page.locator('details.concierge');
  // Some mobile layouts hide the country picker; mutual exclusion is checked where it is offered.
  if (await country.locator('summary').isVisible()) {
    await country.locator('summary').click();
    await expect(country).toHaveAttribute('open', '');
    await menu.locator(':scope > summary').click();
    await expect(menu).toHaveAttribute('open', '');
    await expect(country).not.toHaveAttribute('open');
  } else {
    await menu.locator(':scope > summary').click();
    await expect(menu).toHaveAttribute('open', '');
    await expect(country).not.toHaveAttribute('open');
  }
});

test('search traps focus and Escape from a result restores its opener', async ({ page }) => {
  await page.goto('/en/us/');
  const opener = page.locator('[data-find-open]').first();
  await opener.click();
  const dialog = page.locator('[data-find]');
  const input = dialog.locator('[data-find-in]');
  await expect(input).toBeFocused();
  await input.fill('Portugal');
  const results = dialog.locator('[data-find-res] a');
  await expect(results.first()).toBeVisible();
  await results.last().focus();
  await page.keyboard.press('Tab');
  expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
  await results.first().focus();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
  await opener.click();
  await expect(input).toBeFocused();
  await page.waitForTimeout(250); // exceed the old close-animation timer
  await expect(dialog).toBeVisible();
  // Both key events run in one browser task, within the 200ms closing animation.
  await input.evaluate(el => {
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
  });
  await expect(input).toBeFocused();
  await page.waitForTimeout(250);
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(page.locator('html')).not.toHaveClass(/find-lock/);
  expect(await page.locator('main').evaluate(el => (el as HTMLElement).inert)).toBe(false);
});

test('map loads its canvas and local data', async ({ page }) => {
  const response = await page.goto('/en/us/map/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('canvas').first()).toBeAttached({ timeout: 30_000 });
  await page.locator('[data-m3][data-mode="page"] [data-spot-open]').click();
  const search = page.locator('[data-m3][data-mode="page"] [data-spot-in]');
  await expect(search).toBeFocused();
  await search.fill('Porto');
  await expect(page.locator('[data-m3][data-mode="page"] [data-spot-res]')).toContainText('Porto');
  const data = await page.request.get('/search/en-us.json');
  expect(data.ok()).toBe(true);
  expect((await data.json()).length).toBeGreaterThan(0);
});

test('arrival initial language follows the browser before a saved preference', async ({ browser, baseURL, viewport, isMobile, hasTouch, deviceScaleFactor }) => {
  const context = await browser.newContext({ locale: 'fr-FR', viewport, isMobile, hasTouch, deviceScaleFactor });
  try {
    const page = await context.newPage();
    await page.route('**/*', route => new URL(route.request().url()).origin === new URL(baseURL!).origin ? route.continue() : route.abort());
    await page.goto(baseURL!);
    await expect(page.locator('html')).toHaveAttribute('lang', /^fr($|-)/);
    await expect(page.locator('[data-set="fr"]')).toHaveAttribute('aria-pressed', 'true');
    const box = await page.locator('[data-set="fr"]').boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);
  } finally { await context.close(); }
});

test('hidden partner redirect preserves the map target and URL fragment', async () => {
  const to = '/en/us/map/?place=gondomar';
  const response = redirectPage(to, 'en');
  expect(response.headers.get('content-type')).toBe('text/html; charset=utf-8');
  const html = await response.text();
  expect(html).toContain(`http-equiv="refresh" content="0; url=${to}"`);
  const script = html.match(/<script>([\s\S]*?)<\/script>/)![1];
  let destination = '';
  vm.runInNewContext(script, { location: { hash: '#saved', replace: (url: string) => { destination = url; } } });
  expect(destination).toBe(`${to}#saved`);
});
