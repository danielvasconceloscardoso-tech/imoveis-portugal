// Prompt 81: builds site/public/data/match.json, the 308-place table the matching engine reads in the browser.
//   node --import tsx scripts/build-match-table.mjs            write the table
//   node --import tsx scripts/build-match-table.mjs --check    exit 1 when the committed table is out of date
//   --summary <file>  another services file (the test fixture)      --out <file>  another output path
// Inputs, all already in the repository; nothing is fetched and nothing is estimated:
//   content/facts/map/services/summary.json            services per place (the data engineer); may not exist yet
//   site/src/data/prices.json                          INE medians: sale EUR/m2 (m2) and new-lease rent EUR/m2 (rq), latest quarter
//   site/public/data/map/tiles.json                    name, region, NUTS III
//   site/public/data/map/munis.topo.json               area in km2 (for residents per km2, once `pop` is in summary.json)
//   content/facts/map/tiles/viver_aqui/viver_aqui_municipality.csv  the map point of each place (the town hall where
//                                                      OpenStreetMap has one), used only to place it on the small map
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildMatchTable } from '../src/lib/match-table.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const read = p => JSON.parse(readFileSync(resolve(root, p), 'utf8'));

export function loadInputs(summaryPath = resolve(root, 'content/facts/map/services/summary.json')) {
  const tiles = read('site/public/data/map/tiles.json').m;
  const topo = read('site/public/data/map/munis.topo.json').objects.m.geometries;
  const area = Object.fromEntries(topo.map(g => [g.properties.s, g.properties.a]));
  const csv = readFileSync(resolve(root, 'content/facts/map/tiles/viver_aqui/viver_aqui_municipality.csv'), 'utf8').trim().split('\n');
  const head = csv[0].split(','), at = k => head.indexOf(k);
  const geo = csv.slice(1).map(line => {
    const c = line.split(','), id = c[at('muni_slug')], t = tiles[id];
    if (!t) throw new Error(`viver_aqui_municipality.csv: ${id} is not a map place`);
    return { id, name: t.n, n3: t.n3, region: t.r, lat: Number(c[at('point_lat')]), lon: Number(c[at('point_lon')]), areaKm2: typeof area[id] === 'number' ? area[id] : null };
  });
  if (geo.some(g => !Number.isFinite(g.lat) || !Number.isFinite(g.lon))) throw new Error('geography: a place has no point');
  if (geo.length !== Object.keys(tiles).length) throw new Error(`geography: ${geo.length} points for ${Object.keys(tiles).length} map places`);
  const src = read('site/src/data/prices.json');
  const prices = { period: src.quarters.at(-1), munis: Object.fromEntries(Object.entries(src.munis).map(([id, m]) => [id, { priceM2: m.m2?.at(-1) ?? null, rentM2: m.rq?.at(-1) ?? null }])) };
  const summary = existsSync(summaryPath) ? JSON.parse(readFileSync(summaryPath, 'utf8')) : null;
  if (summary) for (const id of Object.keys(summary.places ?? {})) if (!tiles[id]) throw new Error(`summary.json: ${id} is not a map place`);
  return { geo, prices, summary };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const out = resolve(arg('--out') ?? resolve(root, 'site/public/data/match.json'));
  const { geo, prices, summary } = loadInputs(arg('--summary') ? resolve(arg('--summary')) : undefined);
  const table = buildMatchTable(geo, prices, summary);
  const text = JSON.stringify(table) + '\n';
  if (process.argv.includes('--check')) {
    const same = existsSync(out) && readFileSync(out, 'utf8') === text;
    console.log(same ? 'match.json is up to date' : 'match.json is OUT OF DATE: run npm run build:match');
    process.exit(same ? 0 : 1);
  }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, text);
  const withRent = table.rows.filter(r => r[7] !== null).length, withPrice = table.rows.filter(r => r[6] !== null).length;
  console.log(`${out}: ${table.rows.length} places, ${withPrice} with a sale median, ${withRent} with a rent median, ${text.length} bytes`);
  console.log(`services: ${summary ? `${Object.keys(summary.places ?? {}).length} places in summary.json${summary.fixture ? ' (FIXTURE)' : ''}` : 'summary.json not there yet: every taste is "no data"'}`);
  console.log(`covered: ${Object.entries(table.covered).map(([k, v]) => `${k} ${v}`).join(', ')}`);
}
