import { test as base, expect } from '@playwright/test';

const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route('**/*', route => {
      const request = route.request(), url = new URL(request.url());
      return url.origin === new URL(baseURL!).origin && request.method() === 'GET'
        ? route.continue() : route.abort();
    });
    await use(page);
    expect(errors, 'uncaught browser errors').toEqual([]);
  },
});

const editions = [
  { name: 'US', home: '/en/us/', map: '/en/us/map/' },
  { name: 'Luxembourg', home: '/pt/lu/', map: '/pt/lu/mapa/' },
];

for (const edition of editions) {
  test(`${edition.name}: cinematic arrival, real development and Concierge round trip`, async ({ page }) => {
    await page.goto(edition.home);
    const hero = page.locator('[data-cinematic-arrival]');
    await expect(hero).toBeVisible();
    await expect(hero.locator('h1')).toContainText('Portugal');
    await expect(hero.locator('a')).toHaveCount(1);
    await expect(hero.locator('[data-explore]')).toHaveAttribute('href', edition.map);
    await expect(page.locator('[data-cinematic-place]')).toHaveCount(3);
    await expect(page.locator('[data-cinematic-place="algarve"]')).toHaveAttribute('href', `${edition.map}?region=algarve`);
    const project = page.locator('[data-featured-project]');
    const destination = await project.getAttribute('href');
    expect(destination).toMatch(new RegExp(`^${edition.home}`));
    await project.click();
    await expect(page).toHaveURL(new RegExp(destination!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    await expect(page.locator('h1').first()).toBeVisible();
    await page.locator('a[data-concierge]:visible').first().click();
    await expect(page.locator('[data-cg-sheet]')).toBeVisible();
    await page.goBack();
    await expect(page.locator('[data-cg-sheet]')).toBeHidden();
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`${edition.home}$`));
    await expect(page.locator('[data-explore]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });

  test(`${edition.name}: hero downloads the selected AVIF without a duplicate WebP`, async ({ page }) => {
    const posters: string[] = [];
    page.on('request', r => { if (r.url().includes('hero-portugal-poster.')) posters.push(new URL(r.url()).pathname); });
    await page.goto(edition.home);
    await expect(page.locator('link[rel="preload"][as="image"][type="image/avif"]')).toHaveAttribute('href', /hero-portugal-poster\.avif/);
    await expect.poll(() => posters.filter(p => p.endsWith('.avif')).length).toBe(1);
    expect(posters.filter(p => p.endsWith('.webp'))).toHaveLength(0);
    await expect(page.locator('[data-cinematic-arrival] img')).toHaveJSProperty('complete', true);
  });

  test(`${edition.name}: visible film pauses offscreen and preserves the reader's pause choice`, async ({ page }) => {
    await page.addInitScript(() => {
      let visibility = 'visible';
      Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => visibility });
      (window as any).__setTestVisibility = (state: string) => { visibility = state; document.dispatchEvent(new Event('visibilitychange')); };
    });
    await page.goto(edition.home);
    const film = page.locator('[data-cinematic-arrival] video');
    const control = page.locator('.cinema-controls .film-ctl');
    await expect(control).toBeVisible();
    await expect(film).toHaveAttribute('src', /hero-portugal\.mp4/);
    await film.evaluate((video: HTMLVideoElement) => {
      const native = video.play.bind(video);
      video.dataset.playCalls = '0';
      video.play = () => { video.dataset.playCalls = String(Number(video.dataset.playCalls) + 1); return native(); };
    });
    await page.evaluate(() => (window as any).__setTestVisibility('hidden'));
    await expect(film).toHaveJSProperty('paused', true);
    await page.evaluate(() => (window as any).__setTestVisibility('visible'));
    await control.click();
    await expect(control).toHaveAttribute('aria-pressed', 'true');
    const calls = await film.getAttribute('data-play-calls');
    await page.evaluate(() => { (window as any).__setTestVisibility('hidden'); (window as any).__setTestVisibility('visible'); });
    await expect(film).toHaveJSProperty('paused', true);
    expect(await film.getAttribute('data-play-calls')).toBe(calls);
    await control.click();
    await expect(control).toHaveAttribute('aria-pressed', 'false');
    await page.evaluate(() => window.scrollTo(0, innerHeight * 2));
    await expect(film).toHaveJSProperty('paused', true);
  });


}

test('returning readers continue in their chosen language', async ({ page }) => {
  await page.addInitScript(() => { localStorage.setItem('ip-lang', 'en'); localStorage.setItem('ip-ed', 'us'); });
  await page.goto('/');
  await page.locator('[data-set="pt"]').click();
  const continuation = page.locator('.op-pick[data-for="pt"] [data-go] a');
  await expect(continuation).toHaveAttribute('href', '/pt/us/');
  await continuation.click();
  await expect(page).toHaveURL(/\/pt\/us\/$/);
});

test('Save-Data retains authentic posters without requesting film files', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: true } }));
  const films: string[] = [];
  page.on('request', r => { if (/\.mp4(?:\?|$)/.test(r.url())) films.push(r.url()); });
  await page.goto('/en/us/');
  await expect(page.locator('[data-cinematic-arrival] img')).toBeVisible();
  await expect(page.locator('[data-cinematic-arrival] video')).not.toHaveAttribute('src');
  await page.goto('/');
  await expect(page.locator('[data-film]')).not.toHaveAttribute('src');
  expect(films).toEqual([]);
});
