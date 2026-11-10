import { test as base, expect, type Page } from '@playwright/test';

// These are interaction regressions, separate from the cold-entry and first-fold
// checks. Each case owns one navigation and a bounded real-map startup.
const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const errors: string[] = [];
    const readiness: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      const text = message.text();
      if (text.startsWith('MAP_CONTROLS_RENDER ')) readiness.push(text.slice('MAP_CONTROLS_RENDER '.length));
    });
    await page.route('**/*', route => {
      const request = route.request();
      return new URL(request.url()).origin === new URL(baseURL!).origin && request.method() === 'GET'
        ? route.continue() : route.abort();
    });
    await use(page);
    if (readiness.length) await test.info().attach('map-render-readiness', {
      body: readiness.join('\n'), contentType: 'application/x-ndjson',
    });
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

type RenderState = { golf: boolean; project: string | null; title: string; heads: number };
type RenderPhase = { phase: string; expected: RenderState };
type MapSnapshot = RenderState & { ready: boolean; pressed: string | null; palette: Record<string, Record<string, any>> };
type RenderResult = {
  phase: string; ok: boolean; snapshot: MapSnapshot;
  entryUI: { introHidden: boolean; canvasVisible: boolean };
  golfButton: { x: number; y: number; width: number; height: number; visible: boolean; enabled: boolean; fullViewport: boolean; hit: boolean };
  closeButton: RenderResult['golfButton'] & { label: string | null; labelledBy: string | null; nativeButton: boolean; ariaHidden: boolean };
};

// Arm the complete state sequence before navigation. The Node collector keeps
// proofs that arrive while a trusted input/CDP call is still returning.
async function collectRenderedPhases(page: Page, phases: RenderPhase[]) {
  const cached = new Map<string, RenderResult>();
  const pending = new Map<string, (result: RenderResult) => void>();
  page.on('console', message => {
    const text = message.text();
    if (!text.startsWith('MAP_CONTROLS_RENDER ')) return;
    const result = JSON.parse(text.slice('MAP_CONTROLS_RENDER '.length));
    if (result.ok !== true || !phases.some(phase => phase.phase === result.phase)) return;
    cached.set(result.phase, result);
    pending.get(result.phase)?.(result);
  });
  await page.addInitScript(phases => {
    let poll = 0, map: any = null, index = 0, frames = 0;
    const started = performance.now();
    const properties: Record<string, string[]> = {
      bg: ['background-color'], land: ['fill-color'],
      hill: ['hillshade-highlight-color', 'hillshade-shadow-color', 'hillshade-accent-color', 'hillshade-exaggeration', 'hillshade-illumination-direction'],
      'muni-line': ['line-color', 'line-opacity', 'line-width'],
      'region-line': ['line-color', 'line-opacity', 'line-width'],
      coast: ['line-color', 'line-opacity', 'line-width'],
      'coast-glow': ['line-color', 'line-opacity', 'line-width', 'line-blur'],
      rivers: ['line-color'], sel: ['line-color', 'line-width'],
      sea: ['raster-hue-rotate', 'raster-saturation', 'raster-contrast', 'raster-brightness-min', 'raster-brightness-max'],
      seafar: ['raster-hue-rotate', 'raster-saturation', 'raster-contrast', 'raster-brightness-min', 'raster-brightness-max'],
      'muni-fill': ['fill-color', 'fill-opacity'],
    };
    const cleanup = () => { clearTimeout(poll); map?.off('render', rendered); };
    const rendered = () => {
      const root = document.querySelector<HTMLElement>('[data-m3]')!;
      const { phase, expected } = phases[index];
      frames++;
      const source = map.getSource('gm-c'), data = source?.serialize?.().data;
      const courseFeatures = data?.type === 'FeatureCollection' && Array.isArray(data.features) ? data.features.length : 0;
      // GeoJSONSource.loaded() is worker-data completion; the source cache's
      // pending raster/vector tiles are separately recorded, never hidden.
      const golfDataLoaded = source?.loaded?.() === true;
      const state = {
        golf: root.classList.contains('is-golf'), ready: root.classList.contains('gm-ready'),
        pressed: root.querySelector('[data-golf]')?.getAttribute('aria-pressed') ?? null,
        heads: root.querySelectorAll('[data-sheet] .gm-head').length,
        title: root.querySelector('[data-sheet] h2')?.textContent?.trim(),
        project: new URLSearchParams(location.search).get('project'),
      };
      const diagnostics = {
        land: map.getPaintProperty('land', 'fill-color'), moving: map.isMoving(),
        golfTop: !!map.getLayer('gm-top'), golfDataLoaded, courseFeatures,
        globalLoaded: map.loaded(), golfCacheLoaded: source ? map.isSourceLoaded('gm-c') : null,
        quality: (root as any).__mapx.quality(), terrain: !!map.getTerrain(), pixelRatio: map.getPixelRatio(),
      };
      const ok = state.golf === expected.golf && state.ready === expected.golf
        && state.pressed === String(expected.golf) && state.heads === expected.heads
        && state.project === expected.project && state.title === expected.title
        && diagnostics.land === (expected.golf ? '#f4ead4' : '#dce3d2') && !diagnostics.moving
        && (expected.golf ? diagnostics.golfTop && golfDataLoaded && courseFeatures > 0 : !diagnostics.golfTop);
      if (!ok) {
        console.log('MAP_CONTROLS_RENDER ' + JSON.stringify({ phase, ok: false, frames, elapsedMs: performance.now() - started, ...state, ...diagnostics }));
        return;
      }
      const palette = Object.fromEntries(Object.entries(properties).map(([id, keys]) => [id,
        Object.fromEntries(keys.map(key => [key, map.getPaintProperty(id, key) ?? null])),
      ]));
      const button = root.querySelector<HTMLButtonElement>('[data-golf]')!;
      const rect = button.getBoundingClientRect(), x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
      const hit = document.elementFromPoint(x, y);
      const golfButton = {
        x, y, width: rect.width, height: rect.height,
        visible: button.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }),
        enabled: !button.matches(':disabled') && button.getAttribute('aria-disabled') !== 'true' && !button.closest('[inert]'),
        fullViewport: rect.left >= -1 && rect.top >= -1 && rect.right <= innerWidth + 1 && rect.bottom <= innerHeight + 1,
        hit: !!hit && (hit === button || button.contains(hit)),
      };
      const close = root.querySelector<HTMLButtonElement>('[data-sheet] .m3-x');
      const closeRect = close?.getBoundingClientRect();
      const cx = closeRect ? closeRect.left + closeRect.width / 2 : 0, cy = closeRect ? closeRect.top + closeRect.height / 2 : 0;
      const closeHit = close ? document.elementFromPoint(cx, cy) : null;
      const closeButton = {
        x: cx, y: cy, width: closeRect?.width ?? 0, height: closeRect?.height ?? 0,
        visible: close?.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) ?? false,
        enabled: !!close && !close.matches(':disabled') && close.getAttribute('aria-disabled') !== 'true' && !close.closest('[inert]'),
        fullViewport: !!closeRect && closeRect.left >= -1 && closeRect.top >= -1 && closeRect.right <= innerWidth + 1 && closeRect.bottom <= innerHeight + 1,
        hit: !!close && !!closeHit && (close === closeHit || close.contains(closeHit)),
        label: close?.getAttribute('aria-label') ?? null, labelledBy: close?.getAttribute('aria-labelledby') ?? null,
        nativeButton: close?.tagName === 'BUTTON', ariaHidden: !!close?.closest('[aria-hidden="true"]'),
      };
      const intro = document.querySelector<HTMLElement>('[data-map-arrival]');
      const canvas = map.getCanvas() as HTMLCanvasElement, canvasRect = canvas.getBoundingClientRect();
      const entryUI = {
        introHidden: !intro || !intro.checkVisibility(),
        canvasVisible: canvas.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) && canvasRect.width > 0 && canvasRect.height > 0,
      };
      if (!entryUI.canvasVisible || !entryUI.introHidden) {
        // Visibility can change in a later render listener on this same frame.
        // Request a normal follow-up frame; no source, camera or quality changes.
        requestAnimationFrame(() => map.triggerRepaint());
        return;
      }
      console.log('MAP_CONTROLS_RENDER ' + JSON.stringify({
        phase, ok: true, frames, elapsedMs: performance.now() - started,
        snapshot: { ...state, palette }, golfButton, closeButton, entryUI, diagnostics,
      }));
      index++;
      if (index === phases.length) cleanup();
    };
    const attach = () => {
      const root = document.querySelector('[data-m3]');
      map = (root as any)?.__mapx?.map();
      if (!map?.getLayer('land')) { poll = window.setTimeout(attach, 25); return; }
      map.on('render', rendered);
      // A direct link may have completed a frame before the hook became
      // observable. A normal repaint changes neither data nor rendering quality.
      map.triggerRepaint();
    };
    addEventListener('pagehide', cleanup, { once: true });
    attach();
  }, phases);
  return async (phase: string, action?: () => Promise<unknown>) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const result = cached.has(phase) ? Promise.resolve(cached.get(phase)!) : new Promise<RenderResult>(resolve => {
      pending.set(phase, resolve);
      timer = setTimeout(() => resolve({ phase, ok: false } as RenderResult), 45000);
    });
    try {
      // The 45s proof timer is already running before trusted input. A late
      // protocol acknowledgement must not invalidate a proof received on time;
      // the complete real-input journey remains bounded by the 120s test.
      if (action) await test.step(`trusted input ${phase}`, action);
      return await test.step(`prove completed map render ${phase}`, async () => {
        const proof = await result;
        expect(proof, `${phase}: completed render with expected state`).toMatchObject({ ok: true });
        return proof;
      }, { timeout: 45000 });
    } finally { clearTimeout(timer); pending.delete(phase); }
  };
}

function assertGolfButton(proof: RenderResult) {
  expect(proof.golfButton).toMatchObject({ visible: true, enabled: true, fullViewport: true, hit: true });
  expect(proof.golfButton.width).toBeGreaterThanOrEqual(44);
  expect(proof.golfButton.height).toBeGreaterThanOrEqual(44);
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
    // Read the active tour and its visible caption in one task while the
    // real camera is moving; keep the actual canvas cancellation below.
    await expect.poll(() => page.evaluate(() => {
      const root = document.querySelector('[data-m3]')!, caption = root.querySelector<HTMLElement>('[data-caption]')!;
      const rect = caption.getBoundingClientRect(), style = getComputedStyle(caption);
      return { touring: root.classList.contains('is-touring'), captionVisible: !caption.hidden && rect.width > 0 && rect.height > 0 && style.visibility === 'visible' && style.display !== 'none' };
    })).toEqual({ touring: true, captionVisible: true });
    await page.locator('[data-panel-close]').click();
    await expect(page.locator('[data-panel]')).toBeHidden();
    // A real keyboard event bubbles through the map canvas and cancels the tour.
    await page.locator('[data-canvas] canvas').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('[data-m3]')).not.toHaveClass(/is-touring/);
    await expect(page.locator('[data-caption]')).toBeHidden();
    await expect.poll(() => page.evaluate(() => (document.querySelector('[data-m3]') as any).__mapx.map().isMoving())).toBe(false);
  });

  test(`${edition.name}: Golf restores the premium palette and a scrolled project's close`, async ({ page }) => {
    // Native Golf on this software GPU returned correct state after about 28s.
    // Budget its real rendering separately; UI/palette expectations stay at 10s.
    test.setTimeout(120000);
    const proof = await collectRenderedPhases(page, [
      { phase: 'before entry', expected: { golf: false, project: 'marble-terrace', title: 'Marble Terrace', heads: 0 } },
      { phase: 'after entry', expected: { golf: true, project: 'marble-terrace', title: 'Marble Terrace', heads: 1 } },
      { phase: 'after exit', expected: { golf: false, project: 'marble-terrace', title: 'Marble Terrace', heads: 0 } },
    ]);
    await openMap(page, edition.path, '?project=marble-terrace&dim=2d&layer=price');
    const sheet = page.locator('[data-sheet]');
    const before = (await proof('before entry')).snapshot;
    expect(before).toMatchObject({ golf: false, pressed: 'false', heads: 0, project: 'marble-terrace', title: 'Marble Terrace' });
    expect(before.palette.land['fill-color']).toBe('#dce3d2');
    expect(before.palette.bg['background-color']).toBe('#e1e5da');
    expect(Array.isArray(before.palette['muni-fill']['fill-color']), 'the real price ramp is enabled').toBe(true);
    const entered = await proof('after entry', () => page.locator('[data-golf]').click());
    const golfSea = {
      'raster-hue-rotate': 9, 'raster-saturation': 0.97, 'raster-contrast': -0.8,
      'raster-brightness-min': 0.11, 'raster-brightness-max': 0.63,
    };
    expect(entered.snapshot).toMatchObject({
      golf: true, ready: true, pressed: 'true', heads: 1, project: 'marble-terrace', title: 'Marble Terrace',
      palette: {
        land: { 'fill-color': '#f4ead4' }, bg: { 'background-color': '#f4ead4' },
        hill: {
          'hillshade-highlight-color': 'rgba(255,248,234,0.55)',
          'hillshade-shadow-color': 'rgba(217,195,160,0.6)',
          'hillshade-accent-color': 'rgba(0,0,0,0)',
          'hillshade-exaggeration': 0.3, 'hillshade-illumination-direction': 225,
        },
        'muni-line': { 'line-color': 'rgba(40,50,48,0.16)', 'line-opacity': 0 },
        'region-line': { 'line-color': 'rgba(255,253,246,0.95)', 'line-opacity': 0 },
        coast: { 'line-color': '#e2a95a', 'line-opacity': 0.7 },
        'coast-glow': { 'line-color': '#f7e7c0', 'line-opacity': 1 },
        sea: golfSea, seafar: golfSea,
        'muni-fill': before.palette['muni-fill'],
      },
    });
    // Use the actual visible, enabled, fully framed and unobstructed button
    // from the completed render, with trusted mouse input and no forced click.
    assertGolfButton(entered);
    const exited = await proof('after exit', () => page.mouse.click(entered.golfButton.x, entered.golfButton.y));
    // Golf restores its saved paint before the main map's class observer runs.
    expect(exited.snapshot).toEqual(before);
    // The complete project fits at 900px. A real shorter viewport makes its
    // existing content overflow without adding filler or changing map quality.
    const viewport = page.viewportSize()!;
    await page.setViewportSize({ width: viewport.width, height: Math.min(viewport.height, 600) });
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

  test(`${edition.name}: a development opened inside Golf gets its own usable header`, async ({ page }) => {
    // The measured ~28s native-Golf render is a bounded integration setup phase,
    // not a reason to relax any 10s UI expectation or change rendering quality.
    test.setTimeout(120000);
    const proof = await collectRenderedPhases(page, [
      { phase: 'after direct entry', expected: { golf: true, project: null, title: 'Gondomar', heads: 0 } },
      { phase: 'after project navigation', expected: { golf: true, project: 'marble-terrace', title: 'Marble Terrace', heads: 1 } },
    ]);
    const direct = await proof('after direct entry',
      () => page.goto(`${edition.path}?place=gondomar&mode=golf&dim=2d`, { waitUntil: 'domcontentloaded' }));
    expect(direct.entryUI).toEqual({ introHidden: true, canvasVisible: true });
    expect(direct.snapshot).toMatchObject({
      golf: true, ready: true, pressed: 'true', title: 'Gondomar', project: null,
    });
    const sheet = page.locator('[data-sheet]');
    // This exercises openSheet() while Golf is already active. The transition
    // case above covers the different path where the project predates Golf.
    const project = await proof('after project navigation', () => sheet.locator('[data-dev="marble-terrace"]').click());
    expect(project.snapshot).toMatchObject({
      golf: true, ready: true, pressed: 'true', heads: 1, title: 'Marble Terrace', project: 'marble-terrace',
    });
    // The real completed frame supplies the explicitly labelled native button
    // and unobstructed full target; avoid three redundant GPU-blocked reads.
    expect(project.closeButton).toMatchObject({ visible: true, enabled: true, fullViewport: true, hit: true, nativeButton: true, ariaHidden: false, labelledBy: null });
    expect(project.closeButton.label).toMatch(/\S/);
    expect(project.closeButton.width).toBeGreaterThanOrEqual(44);
    expect(project.closeButton.height).toBeGreaterThanOrEqual(44);
    await page.mouse.click(project.closeButton.x, project.closeButton.y);
    await expect(sheet).toBeHidden();
  });

  // Prompt 81: the card's questions gave way to the seven service lines. Each line is a button: Enter and Space open
  // and close its one sentence, one line open at a time. "Fontes" and the way back are as before.
  test(`${edition.name}: service lines open and close by keyboard and sources return to the card`, async ({ page }) => {
    test.setTimeout(65000);
    await openMap(page, edition.path, '?place=gondomar&dim=2d');
    const sheet = page.locator('[data-sheet]');
    await expect(sheet.locator('[data-sv]')).toHaveCount(7);
    const line = sheet.locator('[data-sv="air"]'), button = line.locator('.m3-svb'), detail = line.locator('.m3-svd');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(detail).toHaveAttribute('inert', '');
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(detail).not.toHaveAttribute('inert', '');
    await expect(detail).toContainText('Porto');
    await expect(detail).toContainText(/\d+ min/);
    await expect(detail).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(detail).toHaveAttribute('inert', '');
    await page.keyboard.press('Space');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    // One line open at a time: the next one opened closes this one.
    const other = sheet.locator('[data-sv="er"] .m3-svb');
    await other.focus();
    await page.keyboard.press('Space');
    await expect(other).toHaveAttribute('aria-expanded', 'true');
    await expect(sheet.locator('[data-sv="er"] .m3-svd')).toContainText(/Hospital/);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(sheet.locator('[data-sv] .m3-svb[aria-expanded="true"]')).toHaveCount(1);
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
    // Prompt 81: every place has the new card. Its purchase-cost line (IMT at the reader's budget) stands open under
    // the price, no longer inside a folded "costs" block; the keyboard reaches it directly.
    await expect(sheet.locator('[data-place-detail]')).toHaveCount(0);
    const costs = sheet.locator('[data-imt]');
    await expect(costs).toContainText(/IMT/);
    await expect(costs).toContainText(/\d/);
    await costs.focus();
    await page.keyboard.press('Enter');
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
