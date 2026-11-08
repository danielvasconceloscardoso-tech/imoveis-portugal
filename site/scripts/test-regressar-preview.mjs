import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { strict as assert } from 'node:assert';
import { createHash } from 'node:crypto';
let refined=readFileSync(process.argv[3] || new URL('../public/previews/regressar-beta/index.html',import.meta.url),'utf8');
// Production uses byte-identical external assets; restore inline URIs for parity.
refined=refined.replace(/\/assets\/regressar\/([a-f0-9]{64})\.(woff2|webp)/g, (_url, hash, ext) => {
 const bytes=readFileSync(new URL(`../public/assets/regressar/${hash}.${ext}`,import.meta.url));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),hash);
 return `data:${ext==='woff2'?'font/woff2':'image/webp'};base64,${bytes.toString('base64')}`;
});
const originalPath=process.argv[2];
assert(originalPath,'Pass the original uploaded HTML path for behavioural parity checks');
const original=readFileSync(originalPath,'utf8');
const assets=s=>[...s.matchAll(/data:(?:image|font)\/[^\s"')]+/g)].map(x=>createHash('sha256').update(x[0]).digest('hex'));
// Pre-rendering repeats three existing photos in the initial city cards.
assert.deepEqual([...new Set(assets(refined))].sort(),[...new Set(assets(original))].sort(),'All embedded photos and fonts must remain unchanged');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
let scenarios=0;
try {
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  const pages=[];
  for(const source of [original,refined]){
   const page=await browser.newPage({viewport});
   page.on('pageerror',error=>{throw error});
   await page.route('**/*',route=>route.request().url()==='http://preview.test/'?route.fulfill({contentType:'text/html',body:source}):route.abort());
   await page.goto('http://preview.test/');pages.push(page);
  }
  const compare=async()=>{
   const results=await Promise.all(pages.map(p=>p.evaluate(()=>({
    tiles:[...document.querySelectorAll('.tile .v,.gain .v,.pl .row b')].map(x=>x.textContent),
    cities:[...document.querySelectorAll('.pl h4')].map(x=>x.textContent),
    bars:[...document.querySelectorAll('.bar .t i')].map(x=>x.style.width),
    summary:document.querySelector('#hot').textContent,
    display:['sim','dash','ho'].map(id=>getComputedStyle(document.getElementById(id)).display)
   }))));assert.deepEqual(results[1],results[0]);scenarios++;
   assert(await pages[1].evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow');
  };
  await compare();
  for(const country of ['França','Reino Unido','Luxemburgo','Alemanha','Bélgica','Outro país','Suíça']){
   for(const p of pages)await p.locator('#cty button').filter({hasText:country}).click();await compare();
  }
  for(const selector of ['#pay button:nth-child(1)','#pay button:nth-child(3)','#yr button:nth-child(2)','#yr button:nth-child(3)','#pref button:nth-child(1)','#pref button:nth-child(2)','#mode button[data-m="buy"]','#mode button[data-m="rent"]','#send','.tabs button[data-v="dash"]','.tabs button[data-v="sim"]']){
   for(const p of pages)await p.locator(selector).click();await compare();
  }
  for(const value of ['2900','8.500,50','100','999999']){
   for(const p of pages)await p.locator('#net').fill(value);await compare();
  }
  for(const p of pages)await p.close();
 }
 console.log(`PASS: ${scenarios} desktop/mobile parity scenarios; embedded assets unchanged; no horizontal overflow.`);
} finally {await browser.close()}
