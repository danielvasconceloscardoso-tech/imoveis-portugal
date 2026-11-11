import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

// Review-only email HTML is a static public draft: never send or auto-publish this content.
// Remote email images are fulfilled from exact first-party local photo files to test actual visual layout
// without relying on external internet in CI. Their live HTTP 200 is checked separately.
const dates = ['2026-12-01', '2026-12-04'] as const;
const routes = {
  '2026-12-01': '/img/v2/leca-piscina-das-mares-1024.webp',
  '2026-12-04': '/img/v2/lisboa-alfama-telhados-1600.webp',
};
test.beforeEach(async ({ page }) => {
  await page.route('https://www.imoveisportugal.pt/img/v2/**', async (route) => {
    const url = new URL(route.request().url());
    await route.fulfill({ path: resolve('public', url.pathname.slice(1)), contentType: 'image/webp' });
  });
});

for (const date of dates) {
  test(`Maré ${date}: responsive email review screenshot and working instant-answer quiz`, async ({ page }, testInfo) => {
    await page.goto(`/mare/revisao/${date}.html`);
    await expect(page.locator('h1')).toBeVisible();
    const img = page.locator('img').first();
    await expect(img).toBeVisible();
    await expect.poll(async () => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    const dims = await page.evaluate(() => ({ body: document.documentElement.scrollWidth, width: window.innerWidth }));
    expect(dims.body).toBeLessThanOrEqual(dims.width + 1);
    await mkdir('test-results/mare-review', {recursive:true});
    await page.screenshot({path:`test-results/mare-review/${date}-${testInfo.project.name}.png`, fullPage:true});
    const href = await page.locator('a[href*="resposta=B"]').first().getAttribute('href');
    expect(href).toBeTruthy();
    const target = new URL(href!);
    await page.goto(target.pathname + target.search);
    await expect(page.locator('#answer')).toBeVisible();
    await expect(page.locator('#title')).not.toBeEmpty();
    await expect(page.locator('#answer a[href^="https://"]')).toBeVisible();
  });
}

for (const date of dates) for (const language of ['en','fr'] as const) {
  test(`Maré ${date}/${language}: native draft and quiz available`, async ({ page }) => {
    await page.goto(`/mare/revisao/${date}-${language}.html`);
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('img')).toBeVisible();
    const link = await page.locator('a[href*="resposta=A"]').first().getAttribute('href');
    const q = new URL(link!);
    expect(q.pathname).toContain(`/${language}/`);
    await page.goto(q.pathname + q.search);
    await expect(page.locator('#answer')).toBeVisible();
    await expect(page.locator('#title')).not.toBeEmpty();
  });
}
