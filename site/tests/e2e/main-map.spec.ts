import { test as base, expect, type Page } from '@playwright/test';

const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route('**/*', route => {
      const request = route.request(), url = new URL(request.url());
      return url.origin === new URL(baseURL!).origin && request.method() === 'GET' ? route.continue() : route.abort();
    });
    await use(page);
    expect(errors, 'uncaught browser errors').toEqual([]);
  },
});
const editions = [{ name: 'US', path: '/en/us/map/' }, { name: 'Luxembourg', path: '/pt/lu/mapa/' }];
async function ready(page: Page) {
  await page.waitForFunction(() => (document.querySelector('[data-m3]') as any)?.__mapx);
  await page.evaluate(async () => {
    const hook = (document.querySelector('[data-m3]') as any).__mapx;
    await hook.load();
    const map = hook.map();
    if (map.loaded() && !map.isMoving()) return;
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => { map.off('idle', done); reject(Error('Real map did not become idle')); }, 25000);
      function done() { clearTimeout(timer); resolve(); }
      map.once('idle', done);
    });
  });
  await expect(page.locator('[data-m3]')).toHaveAttribute('data-map-painted', 'true');
  expect(await page.evaluate(() => (document.querySelector('[data-m3]') as any).__mapx.map().queryRenderedFeatures(undefined, { layers: ['land', 'muni-fill'] }).length)).toBeGreaterThan(0);
}

test.describe('cinematic entry', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });
  for (const edition of editions) {
    test(`${edition.name}: cold entry opens usable search and returning visits bypass arrival`, async ({ page }) => {
      await page.bringToFront();
      await page.goto(edition.path, { waitUntil: 'domcontentloaded' });
      const intro = page.locator('[data-map-arrival]');
      await expect(intro).toHaveAttribute('data-initialized', 'true');
      // The short optional arrival can already have completed on a slow software GPU.
      // Genuine keyboard dismissal and the map action must work in either state.
      await page.keyboard.press('Escape');
      await expect(intro).toBeHidden();
      await page.locator('[data-spot-open]').click();
      await expect(page.locator('[data-spot-in]')).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(page.locator('[data-spot]')).toBeHidden();
      await page.reload({ waitUntil: 'domcontentloaded' });
      await expect(intro).toBeHidden();
      expect(await page.evaluate(() => localStorage.getItem('ip.map.arrival.v1'))).toBe('1');
    });
  }
  // Each dismissal owns a fresh browser context and one native-engine load.
  // The passive deadline must not inherit renderer work from earlier reloads.
  for (const dismissal of ['keyboard Skip', 'View-map click', 'passive finish'] as const) {
    test(`entry ${dismissal} while the engine download is delayed and storage is denied`, { tag: '@engine-delay' }, async ({ page }) => {
      test.setTimeout(65000);
      const pending: Array<() => void> = [];
      let delayEngine = true;
      const releaseEngine = () => { delayEngine = false; pending.splice(0).forEach(resolve => resolve()); };
      await page.route('**/_astro/maplibre-gl.*.js', async route => {
        if (delayEngine) await new Promise<void>(resolve => pending.push(resolve));
        await route.continue();
      });
      await page.addInitScript(() => {
        for (const key of ['localStorage', 'sessionStorage']) Object.defineProperty(window, key, { configurable: true, get() { throw new DOMException('Denied', 'SecurityError'); } });
      });
      await page.bringToFront();
      // Keep the pointer away from arrival controls before its timer starts.
      if (dismissal === 'passive finish') await page.mouse.move(0, 0);
      try {
        await page.goto('/en/us/map/', { waitUntil: 'domcontentloaded' });
        const intro = page.locator('[data-map-arrival]');
        if (dismissal === 'keyboard Skip') {
          await page.locator('[data-map-arrival-skip]').focus();
          await page.keyboard.press('Enter');
          await expect(intro).toBeHidden();
          await expect(page.locator('[data-spot-open]')).toBeFocused();
        } else if (dismissal === 'View-map click') {
          await page.locator('[data-map-arrival-explore]').click();
          await expect(intro).toBeHidden();
        } else {
          await expect(intro).toBeVisible();
          await expect(intro).toBeHidden({ timeout: 3000 });
        }
        // The route has held every engine request throughout the interaction.
        // Check its presence after dismissal so setup cannot consume the short
        // passive arrival window before the visible/hidden assertions begin.
        await expect.poll(() => pending.length).toBeGreaterThan(0);
      } finally {
        releaseEngine();
      }
      await ready(page);
    });
  }
});

for (const edition of editions) {
  test(`${edition.name}: reduced motion bypasses entry`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(edition.path, { waitUntil: 'domcontentloaded' });
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
    await expect(page.locator('[data-map-arrival]')).toHaveAttribute('data-initialized', 'true');
    await expect(page.locator('[data-map-arrival]')).toBeHidden();
  });

  // Keep real map loading enabled; separate geographic and presentation links
  // so seven navigations do not compete for one aggregate test timeout.
  for (const group of [
    { name: 'place, Golf and region', states: ['?place=cascais', '?mode=golf', '?region=algarve'] },
    { name: 'view, unknown state and fragment', states: ['?view=life', '?future-state=keep', '#sources'] },
  ]) test(`${edition.name}: ${group.name} links bypass entry without losing state`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.addInitScript(() => {
      localStorage.removeItem('ip.map.arrival.v1'); sessionStorage.removeItem('ip.map.arrival.v1');
      (window as any).__introDisplayCount = 0;
      new MutationObserver(records => {
        for (const record of records) {
          if ((record.target as Element).matches?.('[data-map-arrival]') && (record.oldValue === null || !(record.target as HTMLElement).hidden)) (window as any).__introDisplayCount++;
        }
      }).observe(document, { subtree: true, attributes: true, attributeFilter: ['hidden'], attributeOldValue: true });
    });
    for (const state of group.states) {
      await page.goto(`${edition.path}${state}`, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('[data-map-arrival]')).toHaveAttribute('data-initialized', 'true');
      await expect(page.locator('[data-map-arrival]')).toBeHidden();
      expect(await page.evaluate(() => (window as any).__introDisplayCount)).toBe(0);
      expect(new URL(page.url()).search + new URL(page.url()).hash).toBe(state);
    }
  });

  test(`${edition.name}: real geography and frame-coalesced selection preserve terrain`, async ({ page }) => {
    test.setTimeout(65000);
    await page.goto(edition.path);
    await ready(page);
    const result = await page.evaluate(async () => {
      const root = document.querySelector('[data-m3]')!, hook = (root as any).__mapx, map = hook.map();
      const terrain = !!map.getTerrain(), ratio = map.getPixelRatio();
      const original = map.queryRenderedFeatures;
      let picks = 0;
      map.queryRenderedFeatures = function (...args: any[]) {
        if (args[1]?.layers?.includes('muni-fill')) picks++;
        return original.apply(this, args);
      };
      try {
        for (let n = 0; n < 300; n++) map.fire('mousemove', { point: { x: 210 + n % 20, y: 220 + n % 10 } });
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        return { picks, terrainBefore: terrain, terrainAfter: !!map.getTerrain(), ratioBefore: ratio, ratioAfter: map.getPixelRatio(), municipalities: hook.slugs().length, markers: root.querySelectorAll('.m3-pin-ph').length };
      } finally { map.queryRenderedFeatures = original; }
    });
    expect(result.picks).toBe(1);
    expect(result.municipalities).toBe(308);
    expect(result.markers).toBeGreaterThan(0);
    expect(result.terrainAfter).toBe(result.terrainBefore);
    expect(result.ratioAfter).toBe(result.ratioBefore);
  });

  test(`${edition.name}: search opens a sourced first-fold card and Back restores the map`, async ({ page }) => {
    test.setTimeout(65000);
    await page.goto(edition.path);
    await page.locator('[data-spot-open]').click();
    await page.locator('[data-spot-in]').fill('Gondomar');
    await page.locator('[data-spot-res] [role="option"]').filter({ hasText: 'Gondomar' }).first().click();
    await expect(page).toHaveURL(/place=gondomar/);
    const sheet = page.locator('[data-sheet]');
    await expect(sheet).toBeVisible();
    // Batch related read-only facts; keep native viewport expectations below.
    // Poll within the browser so an unrelated GPU/CDP round trip is not
    // mistaken for the card's own 10-second data-readiness deadline.
    await page.waitForFunction(() => {
      const element = document.querySelector('[data-sheet]');
      return element?.querySelector('h2')?.textContent?.trim() === 'Gondomar'
        && /2[\s,.]?348/.test(element.querySelector('.m3-pp > span')?.textContent || '')
        && /INE.*2026/.test(element.querySelector('.m3-price-period')?.textContent || '')
        && element.textContent?.includes('Shalu Investments');
    }, null, { timeout: 10000 });
    await expect(sheet.locator('.m3-pp > span').first()).toBeInViewport({ ratio: .95 });
    await expect(sheet.locator('.m3-price-period')).toBeInViewport({ ratio: .95 });
    const viewport = page.viewportSize()!;
    if (viewport.width <= 430 && viewport.height >= 800) await expect(sheet.locator('[data-cta-consult]').first()).toBeInViewport({ ratio: .95 });
    // Unlike trial clicks this never scrolls a clipped control into view.
    // Actual control activation has its own regression contracts.
    await page.waitForFunction(() => { const controls = Object.fromEntries([
      ['close', '[data-sheet] > .m3-x'], ['golf', '[data-golf]'], ['layers', '[data-panel-open]'],
    ].map(([name, selector]) => {
      const button = document.querySelector<HTMLElement>(selector);
      if (!button) return [name, false];
      const rect = button.getBoundingClientRect(), style = getComputedStyle(button);
      const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
      return [name, style.display !== 'none' && style.visibility === 'visible' && Number(style.opacity) > 0 &&
        !button.matches(':disabled') && button.getAttribute('aria-disabled') !== 'true' && !button.closest('[inert]') &&
        rect.width >= 43.5 && rect.height >= 43.5 && rect.left >= -1 && rect.top >= -1 &&
        rect.right <= innerWidth + 1 && rect.bottom <= innerHeight + 1 && !!hit && (button === hit || button.contains(hit))];
    })); return controls.close && controls.golf && controls.layers; }, null, { timeout: 10000 });
    await page.goBack();
    await expect(sheet).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(false);
  });

  test(`${edition.name}: no-photo place never inherits an unrelated photo and contextual Concierge works`, async ({ page }) => {
    await page.goto(`${edition.path}?place=alcacer-do-sal`);
    const sheet = page.locator('[data-sheet]');
    await expect(sheet.locator('h2').first()).toContainText('Alcácer do Sal');
    await expect(sheet.locator('.m3-pp > span').first()).toContainText(/1[\s,.]?956/);
    await expect(sheet.locator('.m3-photo:not(.m3-skel-ph)')).toHaveCount(0);
    const concierge = sheet.locator('a[data-concierge]').first();
    await concierge.scrollIntoViewIfNeeded();
    await concierge.click();
    await expect(page.locator('[data-cg-sheet]')).toBeVisible();
    await page.goBack();
    await expect(page.locator('[data-cg-sheet]')).toBeHidden();
    await expect(sheet).toBeVisible();
  });
}

test('place context survives portrait-to-landscape rotation and controls stay reachable', async ({ page }) => {
  test.setTimeout(65000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en/us/map/?place=gondomar');
  await ready(page);
  const sheet = page.locator('[data-sheet]');
  await expect(sheet).toBeVisible();
  await page.setViewportSize({ width: 844, height: 390 });
  await expect(sheet.locator('.m3-x')).toBeInViewport();
  await page.locator('[data-golf]').click({ trial: true });
  await page.locator('[data-panel-open]').click({ trial: true });
  expect(new URL(page.url()).searchParams.get('place')).toBe('gondomar');
  const geometry = await page.evaluate(() => {
    const root = document.querySelector('[data-m3]')!, h = (root as any).__mapx, point = h.project('gondomar');
    const canvas = h.map().getCanvas().getBoundingClientRect(), card = root.querySelector('[data-sheet]')!.getBoundingClientRect();
    return { x: canvas.left + point.x, y: canvas.top + point.y, left: card.left, right: card.right, top: card.top, bottom: card.bottom };
  });
  expect(geometry.x < geometry.left || geometry.x > geometry.right || geometry.y < geometry.top || geometry.y > geometry.bottom).toBe(true);
});

// iPhone browser chrome can reduce the usable height below the required full-screen matrix.
test('compact portrait keeps the price and its source visible without scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 664 });
  await page.goto('/pt/lu/mapa/?place=gondomar');
  const sheet = page.locator('[data-sheet]');
  await expect(sheet.locator('.m3-pp > span').first()).toContainText(/2[\s,.]?348/);
  await expect(sheet.locator('.m3-pp > span').first()).toBeInViewport({ ratio: .95 });
  await expect(sheet.locator('.m3-price-period')).toBeInViewport({ ratio: .95 });
  await expect(sheet.locator('.m3-arr-l').first()).toBeInViewport({ ratio: .95 });
  await expect(sheet.locator('.m3-x')).toBeInViewport();
});
