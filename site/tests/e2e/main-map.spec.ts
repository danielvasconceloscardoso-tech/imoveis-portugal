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

// The budget fact and the price line of the new card are in the first fold only if the fixed Concierge bar does not
// lie over them (toBeInViewport cannot see a bar drawn on top). The bar begins with a fade as tall as its top padding:
// a line may touch the fade with its lower half, never the solid bar or its button.
async function firstFoldClear(page: Page) {
  return page.evaluate(() => {
    const sheet = document.querySelector('[data-sheet]')!, bar = sheet.querySelector<HTMLElement>('[data-cta-bar]')!;
    const edge = bar.getBoundingClientRect(), solid = edge.top + parseFloat(getComputedStyle(bar).paddingTop);
    return ['[data-buy-line]', '.m3-c6-px'].every(selector => {
      const box = sheet.querySelector(selector)!.getBoundingClientRect();
      return box.height > 0 && box.bottom <= solid + 1 && (box.top + box.bottom) / 2 <= edge.top;
    });
  });
}

test.describe('cinematic entry', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });
  for (const edition of editions) {
    test(`${edition.name}: cold entry opens usable search and returning visits bypass arrival`, async ({ page }) => {
      await page.bringToFront();
      await page.goto(edition.path, { waitUntil: 'domcontentloaded' });
      const intro = page.locator('[data-map-arrival]');
      await expect(intro).toHaveAttribute('data-initialized', 'true');
      // Prompt 81: the welcome stays until the reader acts, however slow the GPU. Its one action is the finder,
      // "View the map" is the quiet way past it, and there is no Skip.
      await expect(intro).toBeVisible();
      await expect(intro.locator('[data-map-arrival-find]')).toBeVisible();
      await expect(intro.locator('[data-map-arrival-explore]')).toBeVisible();
      await expect(intro.locator('[data-map-arrival-skip]')).toHaveCount(0);
      // Genuine keyboard dismissal, then the map action.
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
  // Each case owns a fresh browser context and one native-engine load.
  // Prompt 81: there is no Skip and the welcome no longer leaves by itself. The keyboard paths are its two buttons
  // ("View the map", and the finder); left alone it stays, and a touch on the map puts it away.
  // The held request also holds the map's own script, which imports a small file of the engine's: the welcome is
  // then the only thing on the page that answers, as on a slow connection.
  for (const dismissal of ['keyboard View-map', 'View-map click', 'keyboard finder', 'map touch after staying'] as const) {
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
      // Keep the pointer away from the welcome while it is left alone.
      if (dismissal === 'map touch after staying') await page.mouse.move(0, 0);
      try {
        await page.goto('/en/us/map/', { waitUntil: 'domcontentloaded' });
        const intro = page.locator('[data-map-arrival]');
        if (dismissal === 'keyboard View-map') {
          await page.locator('[data-map-arrival-explore]').focus();
          await page.keyboard.press('Enter');
          await expect(intro).toBeHidden();
          await expect(page.locator('[data-spot-open]')).toBeFocused();
        } else if (dismissal === 'View-map click') {
          await page.locator('[data-map-arrival-explore]').click();
          await expect(intro).toBeHidden();
        } else if (dismissal === 'keyboard finder') {
          // The welcome's one action: the finder opens in its place, with the keyboard inside it. A press made
          // before the map's script has arrived must not be lost.
          await page.locator('[data-map-arrival-find]').focus();
          await page.keyboard.press('Enter');
          await expect(intro).toBeHidden();
          // The finder is built by the map's script, which waits on the engine's file. The press is kept, and the
          // finder opens as soon as that script arrives.
          await expect.poll(() => pending.length).toBeGreaterThan(0);
          releaseEngine();
          const finder = page.locator('[data-finder]');
          await expect(finder).toBeVisible();
          await expect(page.locator('[data-finder-open]')).toHaveAttribute('aria-expanded', 'true');
          await expect(finder.locator('h2')).toBeFocused();
          expect(await finder.locator('[data-taste]').count()).toBeGreaterThan(1);
        } else {
          await expect(intro).toBeVisible();
          // It used to leave by itself within three seconds. It is still there after them, and still usable.
          await page.waitForTimeout(3000);
          await expect(intro).toBeVisible();
          await page.locator('[data-map-arrival-find]').click({ trial: true });
          // A touch on the map itself (clear of the welcome and of every control) puts it away at once.
          const point = await page.evaluate(() => {
            const root = document.querySelector('[data-m3]')!, box = root.getBoundingClientRect();
            for (const fy of [.5, .35, .65, .25]) for (const fx of [.75, .5, .25, .9]) {
              const x = Math.round(box.left + box.width * fx), y = Math.round(box.top + box.height * fy);
              const hit = document.elementFromPoint(x, y);
              if (hit && root.contains(hit) && !hit.closest('button, a, input, [role="dialog"], [data-map-arrival], nav')) return { x, y };
            }
            return null;
          });
          expect(point, 'a free point on the map beside the welcome').not.toBeNull();
          await page.mouse.click(point!.x, point!.y);
          await expect(intro).toBeHidden();
        }
        // The route has held every engine request throughout the interaction.
        if (delayEngine) await expect.poll(() => pending.length).toBeGreaterThan(0);
      } finally {
        releaseEngine();
      }
      await ready(page);
    });
  }
});

for (const edition of editions) {
  // Prompt 81: every reader gets the welcome, reduced motion included. What reduced motion changes is how it leaves:
  // at once, with no fade.
  test(`${edition.name}: reduced motion keeps the welcome and it leaves without an animation`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(edition.path, { waitUntil: 'domcontentloaded' });
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);
    const intro = page.locator('[data-map-arrival]');
    await expect(intro).toHaveAttribute('data-initialized', 'true');
    await expect(intro).toBeVisible();
    await page.evaluate(() => {
      const element = document.querySelector('[data-map-arrival]')!;
      (window as any).__introLeaving = 0;
      new MutationObserver(() => { if (element.classList.contains('is-leaving')) (window as any).__introLeaving++; })
        .observe(element, { attributes: true, attributeFilter: ['class'] });
    });
    await page.locator('[data-map-arrival-explore]').click();
    await expect(intro).toBeHidden();
    expect(await page.evaluate(() => (window as any).__introLeaving)).toBe(0);
    await expect(page.locator('[data-spot-open]')).toBeFocused();
    // Shown once: the next visit goes straight to the map.
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(intro).toHaveAttribute('data-initialized', 'true');
    await expect(intro).toBeHidden();
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
    // Prompt 81: the first fold carries the price as one line under the budget fact (the median, its source and its
    // quarter); the price in full, with its period, now sits under the services, one scroll down.
    await page.waitForFunction(() => {
      const element = document.querySelector('[data-sheet]');
      const first = element?.querySelector('.m3-c6-px')?.textContent || '';
      const services = element?.querySelector('[data-services]'), full = element?.querySelector('.m3-pp > span');
      return element?.querySelector('h2')?.textContent?.trim() === 'Gondomar'
        && /2[\s,.]?348/.test(first) && /INE.*2026/.test(first)
        && /128\s?m²/.test(element.querySelector('[data-buy-line]')?.textContent || '')
        && /2[\s,.]?348/.test(full?.textContent || '')
        && /INE.*2026/.test(element.querySelector('.m3-price-period')?.textContent || '')
        && !!services && !!full && !!(services.compareDocumentPosition(full) & Node.DOCUMENT_POSITION_FOLLOWING)
        && element.textContent?.includes('Vitor Oliveira');
    }, null, { timeout: 10000 });
    await expect(sheet.locator('[data-buy-line]')).toBeInViewport({ ratio: .95 });
    await expect(sheet.locator('.m3-c6-px')).toBeInViewport({ ratio: .95 });
    // The Concierge is fixed at the foot of the card at every size, and it never covers the price line.
    await expect(sheet.locator('[data-cta-consult]').first()).toBeInViewport({ ratio: .95 });
    expect(await firstFoldClear(page), 'budget fact and price line clear of the Concierge bar').toBe(true);
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
  // Prompt 81: in the first fold the price is the line under the budget fact (median, INE, quarter); the place's one
  // line sits under its name; the Concierge stays at the foot. The price in full is further down the same card.
  await expect(sheet.locator('.m3-c6-px')).toContainText(/2[\s,.]?348/);
  await expect(sheet.locator('.m3-c6-px')).toContainText(/INE.*2026/);
  await expect(sheet.locator('.m3-c6-px')).toBeInViewport({ ratio: .95 });
  await expect(sheet.locator('[data-buy-line]')).toBeInViewport({ ratio: .95 });
  await expect(sheet.locator('.m3-place-story').first()).toBeInViewport({ ratio: .95 });
  await expect(sheet.locator('[data-cta-consult]').first()).toBeInViewport({ ratio: .95 });
  expect(await firstFoldClear(page), 'budget fact and price line clear of the Concierge bar').toBe(true);
  await expect(sheet.locator('.m3-pp > span').first()).toContainText(/2[\s,.]?348/);
  await expect(sheet.locator('.m3-price-period')).toContainText(/INE.*2026/);
  await expect(sheet.locator('.m3-x')).toBeInViewport();
});
