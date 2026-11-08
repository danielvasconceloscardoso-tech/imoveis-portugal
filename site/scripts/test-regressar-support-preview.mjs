import {chromium} from '@playwright/test';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const html=readFileSync(new URL('../public/previews/regressar-clear/index.html',import.meta.url),'utf8');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
let checks=0;
try{
 for(const width of [390,1440]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copiedEnquiry=text}}}));
  await page.route('**/*',route=>route.request().url()==='http://preview.test/'&&route.request().method()==='GET'?route.fulfill({body:html,contentType:'text/html'}):route.abort());
  await page.goto('http://preview.test/');
  const sizes=await page.evaluate(()=>['.tile.reg .v','.tile:not(.reg) .v'].map(s=>parseFloat(getComputedStyle(document.querySelector(s)).fontSize)));
  assert(sizes[0]>sizes[1],'Negotiation salary must lead visually');
  assert.equal((await page.locator('.tile.reg .v').textContent()).replace(/\D/g,''),'90154');
  await page.locator('.result-support').click();
  await page.waitForTimeout(50);
  assert(page.url().endsWith('#regressar-support'));
  assert(await page.locator('#regressar-support').evaluate(el=>!!(el.compareDocumentPosition(document.getElementById('places')) & Node.DOCUMENT_POSITION_FOLLOWING)));
  assert(await page.evaluate(()=>scrollY>0));
  const links=await page.locator('#regressar-support .support-door a, #regressar-support .support-secondary a').evaluateAll(links=>links.map(a=>({href:a.href,target:a.target,rel:a.rel})));
  assert.equal(await page.locator('.support-door .btn').count(),1);
  assert.equal(await page.locator('.support-secondary a').count(),2);
  assert.deepEqual(links.map(l=>l.href),['https://www.programaregressar.gov.pt/','https://www.iefp.pt/','https://www.portaldasfinancas.gov.pt/']);
  assert(links.every(l=>l.target==='_blank'&&l.rel.includes('noopener')&&l.rel.includes('noreferrer')));
  await page.locator('#send').click();assert.equal(await page.locator('#send').getAttribute('aria-expanded'),'true');
  const messages=[];
  for(const topic of ['benefits','jobs','tax']){
   await page.locator(`[data-topic=${topic}]`).click();assert.equal(await page.locator(`[data-topic=${topic}]`).getAttribute('aria-pressed'),'true');
   const text=await page.locator('#hot').textContent();messages.push(text);
   await page.locator('#copy-support').click();assert.equal(await page.evaluate(()=>window.copiedEnquiry),text);checks++;
  }
  assert.equal(new Set(messages).size,3);
  await page.locator('#cty button').filter({hasText:'Luxemburgo'}).click();
  await page.locator('#net').fill('9876');assert(!(await page.locator('#hot').textContent()).includes('9876'));
  await page.locator('#net').fill('100');assert((await page.locator('#hot').textContent()).includes('Luxemburgo'));
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('Denied')}}}));
  await page.locator('#copy-support').click();
  assert.equal(await page.evaluate(()=>getSelection().toString()),await page.locator('#hot').textContent());
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.deepEqual(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length})),{local:0,session:0});
  assert.deepEqual(errors,[]);await page.close();
 }
 console.log(`PASS: ${checks} topic/copy cases across mobile and desktop; salary hierarchy, official routes, anchor navigation, denied clipboard fallback, financial privacy and no browser errors.`);
}finally{await browser.close()}
