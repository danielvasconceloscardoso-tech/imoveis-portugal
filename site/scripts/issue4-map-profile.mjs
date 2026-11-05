// Repeatable interaction microbenchmarks against an actual local WebGL map.
// Run serially with other browser suites: MAP_PROFILE_PHASE=before|after.
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const base = process.env.MAP_PROFILE_BASE_URL || 'http://127.0.0.1:4324';
if (!['127.0.0.1','localhost'].includes(new URL(base).hostname)) throw new Error('Profile only a local preview');
const phase = process.env.MAP_PROFILE_PHASE || 'after';
if (!/^[a-z0-9-]+$/.test(phase)) throw new Error('Invalid profile phase');
const target = fileURLToPath(new URL(`../artifacts/issue4/${phase}/`, import.meta.url));
await mkdir(target,{recursive:true});
const paths = process.env.MAP_PROFILE_PATHS?.split(',') || ['/en/us/map/','/pt/lu/mapa/'];
const rows=[];
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined});
try {
 for (const width of [1440,390]) for (const path of paths) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce',isMobile:width===390,hasTouch:width===390,deviceScaleFactor:1});
  const page=await context.newPage();
  await page.route('**/*',r=>new URL(r.request().url()).origin===new URL(base).origin?r.continue():r.abort());
  const session=await context.newCDPSession(page);
  await session.send('Profiler.enable'); await session.send('Profiler.start');
  await page.goto(new URL(path,base).href,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('[data-m3]')?.__mapx);
  const idle=await page.evaluate(async()=>{
   const h=document.querySelector('[data-m3]').__mapx; await h.load(); const map=h.map();
   if(map.loaded() && !map.isMoving())return true;
   return await new Promise(resolve=>{const timeout=setTimeout(()=>{map.off('idle',done);resolve(false)},20000);function done(){clearTimeout(timeout);resolve(true)}map.once('idle',done)});
  });
  const row=await page.evaluate(async ({width,path,idle})=>{
   const root=document.querySelector('[data-m3]'),h=root.__mapx,map=h.map(),bounds=map.getCanvas().getBoundingClientRect();
   const point={x:bounds.width*0.62,y:bounds.height*0.5};
   let queries=0, municipalQueries=0; const query=map.queryRenderedFeatures.bind(map);
   map.queryRenderedFeatures=(...args)=>{queries++;if(args[1]?.layers?.includes('muni-fill'))municipalQueries++;return query(...args)};
   const picks=[];let start=performance.now();for(let i=0;i<100;i++)picks.push(h.pick(point.x+i%20,point.y+i%10));
   const pick100Ms=performance.now()-start;
   queries=0;municipalQueries=0;start=performance.now();for(let i=0;i<300;i++)map.fire('mousemove',{point:{x:point.x+i%20,y:point.y+i%10}});
   const hoverDispatchMs=performance.now()-start;
   await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
   const hoverFlushMs=performance.now()-start,hoverQueries=queries;
   map.queryRenderedFeatures=query;
   return {width,path,idle,valid:idle,pick100Ms,pickFingerprint:JSON.stringify(picks),hoverDispatchMs,hoverFlushMs,hoverQueries,municipalQueries,center:map.getCenter().toArray(),bearing:map.getBearing(),municipalities:h.slugs().length,quality:h.quality(),terrain:!!map.getTerrain(),zoom:map.getZoom(),pitch:map.getPitch(),pixelRatio:map.getPixelRatio(),labels:root.querySelectorAll('[data-labels] span').length,photoMarkers:root.querySelectorAll('.m3-pin-ph').length,renderedFeatures:map.queryRenderedFeatures().length};
  },{width,path,idle});
  const {profile}=await session.send('Profiler.stop');
  const samples=new Map();for(const id of profile.samples||[])samples.set(id,(samples.get(id)||0)+1);
  row.cpuSamples=profile.nodes.map(n=>({fn:n.callFrame.functionName,url:n.callFrame.url,line:n.callFrame.lineNumber,samples:samples.get(n.id)||0})).sort((a,b)=>b.samples-a.samples).slice(0,25);
  rows.push(row);console.log(JSON.stringify(row));await context.close();
 }
} finally {await browser.close();await writeFile(`${target}map-profile.json`,JSON.stringify(rows,null,2)+'\n')}
