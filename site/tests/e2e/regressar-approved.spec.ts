import { test, expect } from '@playwright/test';

test('Approved Portuguese simulator calculates locally and prepares a demo summary', async ({ page, baseURL }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => route.request().method() === 'GET' && new URL(route.request().url()).origin === new URL(baseURL!).origin ? route.continue() : route.abort());
  await page.goto('/pt/lu/regressar/');
  await expect(page.getByRole('heading', {level:1})).toHaveText('Quanto precisa de ganhar em Portugal?');
  expect(await page.locator('#regressar-support').evaluate(el => !!(el.compareDocumentPosition(document.getElementById('places')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
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
  await expect(page.locator('#ho')).toContainText(/nada é enviado/i);
  await page.locator('.tabs [data-v="dash"]').click();
  await expect(page.locator('#dash')).toBeVisible();
  await expect(page.locator('#dash')).toContainText('números são fictícios');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('Main website bookmark opens the programme panel directly', async ({page, isMobile}) => {
  await page.route('**/*', route => ['127.0.0.1','localhost'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await page.goto('/pt/lu/');
  if(isMobile) await page.locator('.concierge > summary').click();
  const bookmark=page.locator(isMobile ? '.cmain [data-nav-k="regressar"]' : '.hd .nav [data-nav-k="regressar"]');
  await expect(bookmark).toBeVisible();
  await expect(bookmark.locator('[data-r-signature=bookmark]')).toBeVisible();
  await expect(bookmark).toHaveAccessibleName('Programa Regressar — Painel do programa');
  await expect(bookmark).toHaveAttribute('href','/pt/lu/regressar/#painel');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await bookmark.click();
  await expect(page.locator('#dash')).toBeVisible();
  await expect(page.locator('#sim')).toBeHidden();
  await page.reload();
  await expect(page.locator('#dash')).toBeVisible();
  await page.locator('.tabs [data-v="sim"]').click();
  await expect(page.locator('#sim')).toBeVisible();
  await expect(page).toHaveURL(/#simulador$/);
});
