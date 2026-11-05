import { test as base, expect, type Page } from '@playwright/test';

// These are interaction regressions, separate from the cold-entry and first-fold
// checks. Each case owns one navigation and a bounded real-map startup.
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

const editions = [
  { name: 'US', path: '/en/us/map/' },
  { name: 'Luxembourg', path: '/pt/lu/mapa/' },
];

async function openMap(page: Page, path: string, state = '?dim=2d') {
  await test.step('load the real map', async () => {
    await page.goto(`${path}${state}`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => {
      const root = document.querySelector<HTMLElement>('[data-m3]');
      const map = (root as any)?.__mapx?.map();
      return root?.dataset.mapPainted === 'true' && map?.loaded() && !map.isMoving();
    }, null, { timeout: 30000 });
    await expect(page.locator('[data-map-arrival]')).toBeHidden();
    await expect(page.locator('[data-canvas] canvas')).toBeVisible();
  });
}

async function fillColor(page: Page) {
  return page.evaluate(() => JSON.stringify((document.querySelector('[data-m3]') as any).__mapx.map().getPaintProperty('muni-fill', 'fill-color')));
}

for (const edition of editions) {
  test(`${edition.name}: layers change real price paint and 2D/3D terrain`, async ({ page }) => {
    test.setTimeout(65000);
    await openMap(page, edition.path);
    const root = page.locator('[data-m3]');
    const naturalPaint = await fillColor(page);
    await page.locator('[data-panel-open]').click();
    await expect(page.locator('[data-panel-close]')).toBeFocused();
    await page.locator('[data-layer="price"]').click();
    await expect(page.locator('[data-layer="price"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page).toHaveURL(/[?&]layer=price(?:&|$)/);
    await expect.poll(() => fillColor(page)).not.toBe(naturalPaint);
    await expect(page.locator('[data-time]')).not.toHaveClass(/is-off/);
    // The mobile Layers sheet deliberately covers the legend while open.
    await expect(page.locator('[data-legend]')).not.toHaveAttribute('hidden', '');
    await page.locator('[data-dim="3d"]').click();
    await expect(page.locator('[data-dim="3d"]')).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => page.evaluate(() => {
      const map = (document.querySelector('[data-m3]') as any).__mapx.map();
      return { source: map.getTerrain()?.source, tilted: map.getPitch() > 0 };
    })).toEqual({ source: 'dem', tilted: true });
    await page.locator('[data-dim="2d"]').click();
    await expect(root).toHaveClass(/is-2d/);
    await expect.poll(() => page.evaluate(() => {
      const map = (document.querySelector('[data-m3]') as any).__mapx.map();
      return { terrain: !!map.getTerrain(), pitch: map.getPitch() };
    })).toEqual({ terrain: false, pitch: 0 });
    await page.locator('[data-layer="none"]').click();
    await expect.poll(() => fillColor(page)).toBe(naturalPaint);
    await expect(page.locator('[data-legend]')).toBeHidden();
    await expect(page.locator('[data-time]')).toHaveClass(/is-off/);
    await expect(page).not.toHaveURL(/[?&]layer=price(?:&|$)/);
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-panel]')).toBeHidden();
    await expect(page.locator('[data-panel-open]')).toBeFocused();
  });

  test(`${edition.name}: a tour starts from Layers and canvas input stops it`, async ({ page }) => {
    test.setTimeout(65000);
    await openMap(page, edition.path);
    // Exercise an actual moving tour; the reduced-motion entry is already covered.
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.locator('[data-panel-open]').click();
    await page.locator('[data-tour="coast"]').click();
    await expect(page.locator('[data-m3]')).toHaveClass(/is-touring/);
    await expect(page.locator('[data-caption]')).toBeVisible();
    await page.locator('[data-panel-close]').click();
    await expect(page.locator('[data-panel]')).toBeHidden();
    // A real keyboard event bubbles through the map canvas and cancels the tour.
    await page.locator('[data-canvas] canvas').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('[data-m3]')).not.toHaveClass(/is-touring/);
    await expect(page.locator('[data-caption]')).toBeHidden();
    await expect.poll(() => page.evaluate(() => (document.querySelector('[data-m3]') as any).__mapx.map().isMoving())).toBe(false);
  });

  test(`${edition.name}: Golf exit preserves an accessible close on a scrolled project`, async ({ page }) => {
    test.setTimeout(65000);
    await openMap(page, edition.path, '?place=gondomar&dim=2d');
    const root = page.locator('[data-m3]');
    const sheet = page.locator('[data-sheet]');
    await expect(sheet.locator('h2')).toHaveText('Gondomar');
    await page.locator('[data-golf]').click();
    await expect(root).toHaveClass(/is-golf/);
    await expect(root).toHaveClass(/gm-ready/);
    await expect(page.locator('[data-golf]')).toHaveAttribute('aria-pressed', 'true');
    // Open a development while Golf owns the card header, then leave that mode.
    await sheet.locator('[data-dev]').first().click();
    await expect(sheet.locator('.gm-head')).toBeVisible();
    await page.locator('[data-golf]').click();
    await expect(root).not.toHaveClass(/is-golf/);
    await expect(page.locator('[data-golf]')).toHaveAttribute('aria-pressed', 'false');
    await expect(sheet.locator('.gm-head')).toHaveCount(0);
    const body = sheet.locator('[data-sheet-in]');
    // Position the independently scrolling body without letting locator.click()
    // rescue a broken close button by scrolling it back into view.
    await body.evaluate(element => { element.scrollTop = element.scrollHeight; });
    expect(await body.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
    const close = sheet.locator('.m3-x');
    await expect(close).toHaveAccessibleName(/\S/);
    await expect(close).toBeInViewport({ ratio: 1 });
    await close.click();
    await expect(sheet).toBeHidden();
    await expect(page).not.toHaveURL(/[?&](?:place|project|mode)=/);
  });

  test(`${edition.name}: place questions expand by keyboard and sources return to the card`, async ({ page }) => {
    test.setTimeout(65000);
    await openMap(page, edition.path, '?place=gondomar&dim=2d');
    const sheet = page.locator('[data-sheet]');
    const question = sheet.locator('[data-q="life"] .m3-qb');
    await question.focus();
    await page.keyboard.press('Enter');
    await expect(question).toHaveAttribute('aria-expanded', 'true');
    await expect(sheet.locator('[data-q="life"] .m3-qp')).not.toHaveAttribute('inert', '');
    await expect(sheet.locator('[data-q="life"] .m3-qi')).toContainText('Porto');
    await page.keyboard.press('Enter');
    await expect(question).toHaveAttribute('aria-expanded', 'false');
    await sheet.locator('[data-sources]').click();
    await expect(sheet.locator('.m3-srcl')).toContainText('INE');
    await expect(sheet.locator('[data-back]')).toBeVisible();
    await sheet.locator('[data-back]').click();
    await expect(sheet.locator('h2')).toHaveText('Gondomar');
    await expect(sheet.locator('[data-sources]')).toBeVisible();
    await expect(page).toHaveURL(/[?&]place=gondomar(?:&|$)/);
  });

  test(`${edition.name}: purchase costs work and paid analysis remains a locked preview`, async ({ page }) => {
    test.setTimeout(65000);
    await openMap(page, edition.path, '?place=cascais&dim=2d');
    const sheet = page.locator('[data-sheet]');
    const costs = sheet.locator('[data-place-detail="costs"]');
    await costs.locator('summary').focus();
    await page.keyboard.press('Enter');
    await expect(costs).toHaveAttribute('open', '');
    await costs.locator('[data-imt]').click();
    const imt = page.locator('[data-imt-sheet]');
    await expect(imt).toBeVisible();
    const initialTax = await imt.locator('[data-imt-o="nr"]').textContent();
    await imt.locator('[data-imt-in]').fill('500000');
    await expect(imt.locator('[data-imt-o="nr"]')).not.toHaveText(initialTax!);
    await expect(page).toHaveURL(/[?&]imt=500000(?:&|$)/);
    await imt.locator('[data-imt-x]').click();
    await expect(imt).toBeHidden();
    await expect(sheet).toBeVisible();
    await sheet.locator('[data-unlock-open]').click();
    const paid = page.locator('[data-unlock]');
    await expect(paid).toBeVisible();
    await expect(paid.locator('[data-unlock-p]')).toContainText('Cascais');
    expect(await paid.locator('[data-unlock-pv] .m3-ghost').count()).toBeGreaterThan(0);
    await expect(paid.locator('.m3-btn-off')).toBeDisabled();
    await expect(paid.locator('[data-unlock-region], a[href*="stripe"]')).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(paid).toBeHidden();
    await expect(sheet).toBeVisible();
  });
}
