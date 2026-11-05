// Offline review of original browser captures. No image transformations.
import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../artifacts/issue4/', import.meta.url);
const after = process.env.EVIDENCE_PHASE || 'after-final';
if (!/^[a-z0-9-]+$/.test(after)) throw Error('Invalid evidence phase');
const manifest = JSON.parse(await readFile(new URL(`${after}/screenshots/manifest.json`, root), 'utf8'));
const before = JSON.parse(await readFile(new URL('before/screenshots/manifest.json', root), 'utf8'));
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sections = manifest.map(row => {
 const prior = before.find(x => x.width === row.width && x.edition === row.edition);
 const image = (phase, state, title) => `<figure><figcaption>${title}</figcaption><a href="${phase}/screenshots/${row.width}-${row.edition}-${state}.png"><img loading="lazy" src="${phase}/screenshots/${row.width}-${row.edition}-${state}.png" alt="${title} — ${row.width} × ${row.height}"></a></figure>`;
 return `<section><h2>${row.edition.toUpperCase()} · ${row.width} × ${row.height}</h2><p>Real local production-mode build. Errors: ${row.errors.length}. Overflow: ${row.overflow}. Initial idle reached within 20s: ${row.nationalIdleWithin20s ?? row.ready}.</p>${row.introCaptured ? `<details><summary>Optional arrival — normal pointer-hover pause</summary>${image(after,'intro','Arrival over the live map')}</details>` : ''}<div class="pair">${prior ? image('before','map','Before — national map') : ''}${image(after,'map','After — national map')}</div><div class="pair">${prior ? image('before','gondomar','Before — Gondomar') : ''}${image(after,'gondomar','After — Gondomar')}</div></section>`;
}).join('');
await writeFile(new URL('review.html', root), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Issue 4 — Main map review</title><style>body{margin:0 auto;max-width:1500px;padding:32px;background:#f7f4ed;color:#243b35;font:16px/1.5 system-ui}h1,h2{font-family:Georgia,serif;font-weight:400}section{border-top:1px solid #abb5aa;margin-top:40px;padding-top:24px}.pair{display:flex;gap:24px;align-items:flex-start}figure{margin:16px 0;flex:1;min-width:0}figcaption{margin-bottom:10px;font-weight:600}img{display:block;width:100%;height:auto;border:1px solid #abb5aa}details img{max-width:900px}@media(max-width:700px){body{padding:16px}.pair{display:block}}</style><h1>Portugal, as a place to live</h1><p>Issue #4 · Main map · US and Luxembourg. Original, unedited browser screenshots; no production deployment. Intro captures use the application's supported hover pause, rather than modified timers.</p>${sections}</html>`);
console.log(new URL('review.html', root).pathname);
