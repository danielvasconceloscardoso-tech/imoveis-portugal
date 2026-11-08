import { test, expect } from '@playwright/test';

test('Approved Portuguese simulator calculates locally and prepares a demo summary', async ({ page, baseURL }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => route.request().method() === 'GET' && new URL(route.request().url()).origin === new URL(baseURL!).origin ? route.continue() : route.abort());
  await page.goto('/pt/lu/regressar/');
  await expect(page.getByRole('heading', {level:1})).toHaveText('Quanto precisa de ganhar em Portugal?');
  await expect(page.locator('.tile.reg .l')).toHaveText('Com Programa Regressar');
  await expect(page.locator('.tile.reg .v')).toHaveText(/\d.*€/);
  const original = await page.locator('.tile.reg .v').textContent();
  await page.locator('#net').fill('6000');
  await expect(page.locator('.tile.reg .v')).not.toHaveText(original!);
  await page.locator('#cty button').filter({hasText:'Luxemburgo'}).click();
  await expect(page.locator('#cur')).toHaveText('EUR');
  await page.locator('#mode [data-m="buy"]').click();
  await expect(page.locator('#psub')).toContainText('Prestação');
  await page.locator('#send').click();
  await expect(page.locator('#ho')).toBeVisible();
  await expect(page.locator('#ho')).toContainText('nada é enviado');
  await page.locator('.tabs [data-v="dash"]').click();
  await expect(page.locator('#dash')).toBeVisible();
  await expect(page.locator('#dash')).toContainText('números são fictícios');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
