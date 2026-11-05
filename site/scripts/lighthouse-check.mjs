// Local, repeatable PR audits. No credentials or remote audit service required.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';

const base = new URL(process.env.LIGHTHOUSE_BASE_URL || 'http://127.0.0.1:4323');
if (!['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname)) {
  throw new Error('LIGHTHOUSE_BASE_URL must target a local build.');
}
const output = fileURLToPath(new URL('../artifacts/lighthouse/', import.meta.url));
const allPages = [{name:'arrival',path:'/'},{name:'home-us',path:'/en/us/'},{name:'map-us',path:'/en/us/map/'},{name:'home-lu',path:'/pt/lu/'},{name:'map-lu',path:'/pt/lu/mapa/'}];
const requested = process.env.LIGHTHOUSE_PAGES?.split(',');
if (requested?.some(name => !allPages.some(page => page.name === name))) throw new Error('Unknown LIGHTHOUSE_PAGES target.');
const pages = requested ? allPages.filter(page => requested.includes(page.name)) : allPages;
// Measured local baseline: mobile arrival 98, home 85, map 65; desktop map 64.
// Headless software WebGL makes map TBT dominate its performance score (~9.88s
// in the first mobile run). Keep that score visible as a diagnostic, and gate
// the map's user-facing LCP and layout stability instead. Never pretend the
// diagnostic map score passed the arrival/home score floor.
const budgets = {
  arrival: { minimum: {performance:0.70,accessibility:0.90} },
  'home-us': { minimum: {performance:0.70,accessibility:0.90} },
  'home-lu': { minimum: {performance:0.70,accessibility:0.90} },
  'map-lu': { minimum: {accessibility:0.90}, maximum: {'largest-contentful-paint':4000,'cumulative-layout-shift':0.1}, diagnostic:['performance','total-blocking-time'] },
  'map-us': { minimum: {accessibility:0.90}, maximum: {'largest-contentful-paint':4000,'cumulative-layout-shift':0.1}, diagnostic:['performance','total-blocking-time'] },
};
console.log('Route budgets: arrival/home performance >=70; all accessibility >=90; map LCP <=4000ms and CLS <=0.1. Map performance/TBT are diagnostic under software WebGL.');
const blockedUrlPatterns = [
  '*://static.cloudflareinsights.com/*', '*://cloudflareinsights.com/*',
  '*://*.beehiiv.com/*', '*://beehiiv.com/*', '*://*.tally.so/*', '*://tally.so/*',
];
await mkdir(output,{recursive:true});
const chrome = await launch({chromePath:process.env.CHROME_PATH || chromium.executablePath(),chromeFlags:['--headless=new','--no-sandbox','--disable-dev-shm-usage']});
const summary=[];
try {
  for (const profile of ['mobile','desktop']) {
    for (const page of pages) {
      const name=`${profile}-${page.name}`;
      const result=await lighthouse(new URL(page.path,base).href,{
        port:chrome.port, output:['json','html'],logLevel:'error',
        onlyCategories:['performance','accessibility','best-practices','seo'],
        blockedUrlPatterns,
      },profile==='desktop'?desktopConfig:undefined);
      if(!result || result.lhr.runtimeError) throw new Error(`${name}: ${result?.lhr.runtimeError?.message || 'no audit result'}`);
      await Promise.all([
        writeFile(join(output,`${name}.json`),result.report[0]),
        writeFile(join(output,`${name}.html`),result.report[1]),
      ]);
      const scores=Object.fromEntries(Object.entries(result.lhr.categories).map(([key,value])=>[key,value.score]));
      const budget=budgets[page.name];
      const metrics=Object.fromEntries(['largest-contentful-paint','cumulative-layout-shift','total-blocking-time'].map(key=>[key,result.lhr.audits[key]?.numericValue ?? null]));
      const failed=[
        ...Object.entries(budget.minimum).filter(([key,floor])=>scores[key] == null || scores[key]<floor).map(([key,floor])=>`${key} ${scores[key]} < ${floor}`),
        ...Object.entries(budget.maximum || {}).filter(([key,ceiling])=>metrics[key] == null || metrics[key]>ceiling).map(([key,ceiling])=>`${key} ${metrics[key]} > ${ceiling}`),
      ];
      const findings=Object.values(result.lhr.audits).filter(a=>a.score !== null && a.score<1 && (a.details?.type==='table' || a.numericValue != null)).map(a=>({id:a.id,title:a.title,score:a.score,displayValue:a.displayValue}));
      const row={name,url:result.lhr.finalDisplayedUrl,scores,metrics,budget,passed:failed.length===0,failed,findings};
      summary.push(row);
      console.log(`${row.passed?'PASS':'FAIL'} ${name}: ${JSON.stringify(scores)}${page.name.startsWith('map-')?` (diagnostic performance; LCP ${Math.round(metrics['largest-contentful-paint'])}ms, CLS ${metrics['cumulative-layout-shift']})`:''}${failed.length?` (${failed.join('; ')})`:''}`);
    }
  }
} finally {
  await writeFile(join(output,'summary.json'),JSON.stringify(summary,null,2)+'\n');
  await chrome.kill();
}
if(summary.length !== pages.length*2 || summary.some(row=>!row.passed)) process.exitCode=1;
