import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const base = new URL(process.env.EVIDENCE_BASE_URL || 'http://127.0.0.1:4330');
const phase = process.env.EVIDENCE_PHASE || 'after';
if (!['127.0.0.1','localhost'].includes(base.hostname) || !/^[a-z0-9-]+$/.test(phase)) throw Error('Use a local preview and safe phase');
const output = fileURLToPath(new URL(`../artifacts/issue4/${phase}/screenshots/`, import.meta.url));
await mkdir(output,{recursive:true});
const sizes=process.env.EVIDENCE_ALL_SIZES==='1' ? [[1440,900],[390,844],[430,932],[844,390]] : [[1440,900],[390,844]];
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined});
const rows=[];
try {
 for(const [width,height] of sizes) for(const [edition,path] of [['us','/en/us/map/'],['lu','/pt/lu/mapa/']]) {
  const context=await browser.newContext({viewport:{width,height},isMobile:width<1000,hasTouch:width<1000,reducedMotion:'no-preference',locale:edition==='us'?'en-US':'pt-PT',deviceScaleFactor:1});
  await context.route('**/*',r=>new URL(r.request().url()).origin===base.origin && r.request().method()==='GET'?r.continue():r.abort());
  const page=await context.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.mouse.move(100,height-170);
  const response=await page.goto(new URL(path,base).href,{waitUntil:'domcontentloaded'});
  await page.mouse.move(101,height-170);
  if(response.status()!==200) throw Error(`${path}: ${response.status()}`);
  const intro=page.locator('[data-map-arrival]');
  const introShown=await intro.isVisible();
  await page.waitForFunction(()=>document.querySelector('[data-m3]')?.__mapx);
  const ready=await page.evaluate(async()=>{const h=document.querySelector('[data-m3]').__mapx;await h.load();const m=h.map();if(m.loaded()&&!m.isMoving())return true;return new Promise(resolve=>{const t=setTimeout(()=>{m.off('idle',done);resolve(false)},20000);function done(){clearTimeout(t);resolve(true)}m.once('idle',done)})});
  await page.waitForFunction(()=>document.querySelector('[data-m3]')?.dataset.mapPainted==='true');
  await page.evaluate(()=>document.fonts.ready);
  const introCaptured=introShown && await intro.isVisible();
  if(introCaptured) {
   await page.screenshot({path:`${output}${width}-${edition}-intro.png`});
   await page.locator('[data-map-arrival-skip]').click();
  }
  await intro.waitFor({state:'hidden',timeout:10000});
  await page.mouse.move(0,0);
  await page.waitForTimeout(250);
  await page.screenshot({path:`${output}${width}-${edition}-map.png`});
  await page.locator('[data-mode="page"] [data-spot-open]').click();
  await page.locator('[data-mode="page"] [data-spot-in]').fill('Gondomar');
  await page.locator('[data-mode="page"] [data-spot-res] [role="option"]').filter({hasText:'Gondomar'}).first().click();
  await page.locator('[data-sheet]').waitFor({state:'visible'});
  await page.evaluate(async()=>{const m=document.querySelector('[data-m3]').__mapx.map();if(m.loaded()&&!m.isMoving())return;await new Promise(resolve=>{const t=setTimeout(()=>{m.off('idle',done);resolve()},20000);function done(){clearTimeout(t);resolve()}m.once('idle',done)})});
  await page.waitForFunction(()=>{const image=document.querySelector('[data-sheet-in] img');return image?.complete && image.naturalWidth>0});
  await page.screenshot({path:`${output}${width}-${edition}-gondomar.png`});
  const mapState=await page.evaluate(()=>{const h=document.querySelector('[data-m3]').__mapx,m=h.map();return {terrain:!!m.getTerrain(),quality:h.quality(),pixelRatio:m.getPixelRatio(),zoom:m.getZoom(),pitch:m.getPitch(),center:m.getCenter().toArray(),painted:document.querySelector('[data-m3]').dataset.mapPainted}});
  rows.push({mapState,edition,path,width,height,ready,introCaptured,introMethod:'Normal application pointer-hover pause; rendered live map, no timer or imagery modifications',errors,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),url:page.url()});
  console.log(JSON.stringify(rows.at(-1)));await context.close();
 }
}finally{await browser.close();await writeFile(`${output}manifest.json`,JSON.stringify(rows,null,2)+'\n');}
