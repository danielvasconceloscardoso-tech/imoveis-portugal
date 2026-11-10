// Prompt 81: builds site/public/data/match.json, the 308-place table the matching engine reads in the browser,
// and site/public/data/match-photos.json, the photograph the map already holds for a place (stem and alt text).
//   node --import tsx scripts/build-match-table.mjs            write the table
//   node --import tsx scripts/build-match-table.mjs --check    exit 1 when the committed table is out of date
//   --summary <file>  another services file (the test fixture)      --out <file>  another output path
// Inputs, all already in the repository; nothing is fetched and nothing is estimated:
//   content/facts/map/services/summary.json            services per place (the data engineer); may not exist yet
//   site/src/data/prices.json                          INE medians: sale EUR/m2 (m2) and new-lease rent EUR/m2 (rq), latest quarter
//   site/public/data/map/tiles.json                    name, region, NUTS III
//   site/public/data/map/munis.topo.json               mainland land area in km2, measured on the boundaries (see loadAreas)
//   content/facts/map/tiles/viver_aqui/viver_aqui_municipality.csv  the map point of each place (the town hall where
//                                                      OpenStreetMap has one), used only to place it on the small map
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { feature } from 'topojson-client';
import { buildMatchTable } from '../src/lib/match-table.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const arg = name => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const read = p => JSON.parse(readFileSync(resolve(root, p), 'utf8'));

// ---- land area, for residents per km2 (the "quiet" taste). No official area table is in the repository, so the area
// is measured on the boundaries the map itself is drawn from (munis.topo.json, OpenStreetMap): within about 1% of the
// official figure where checked (Gondomar 131.7 against 131.86 km2; Lisboa is 13% under because the Tagus is left out).
// The islands are drawn as scaled insets in that file and the raw geoBoundaries outlines are too coarse (Funchal 41%
// under), so an island has no area here and "quiet" reads "no data" there, unless summary.json brings `area_km2`.
// Area on the sphere, mean Earth radius 6371.0088 km.
const RAD = Math.PI / 180, EARTH = 6371.0088;
const ringArea = r => { let s = 0; for (let i = 0; i < r.length - 1; i++) s += (r[i + 1][0] - r[i][0]) * RAD * (2 + Math.sin(r[i][1] * RAD) + Math.sin(r[i + 1][1] * RAD)); return Math.abs(s * EARTH * EARTH / 2); };
const polyArea = p => ringArea(p[0]) - p.slice(1).reduce((s, h) => s + ringArea(h), 0);
const geomArea = g => (g.type === 'Polygon' ? polyArea(g.coordinates) : g.type === 'MultiPolygon' ? g.coordinates.reduce((s, p) => s + polyArea(p), 0) : 0);
function loadAreas(tiles) {
  const topo = read('site/public/data/map/munis.topo.json');
  return Object.fromEntries(feature(topo, topo.objects.m).features.map(f => [f.properties.s, ['azores', 'madeira'].includes(tiles[f.properties.s].r) ? null : Math.round(geomArea(f.geometry) * 10) / 10]));
}

export function loadInputs(summaryPath = resolve(root, 'content/facts/map/services/summary.json')) {
  const tiles = read('site/public/data/map/tiles.json').m;
  const area = loadAreas(tiles);
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

/** The photographs the map already holds for a municipality (src/data/place-photos.json: stem and alt text), for the
 * discovery card of a place outside the 13 hand-picked ones. Only stems whose 1024 px file exists. Nothing new is licensed. */
export function loadPhotos() {
  const { _how, ...all } = read('site/src/data/place-photos.json');
  return Object.fromEntries(Object.entries(all).filter(([, p]) => p?.f && existsSync(resolve(root, `site/public/img/v2/${p.f}-1024.webp`))).map(([id, p]) => [id, { f: p.f, alt: p.alt }]));
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const out = resolve(arg('--out') ?? resolve(root, 'site/public/data/match.json'));
  const { geo, prices, summary } = loadInputs(arg('--summary') ? resolve(arg('--summary')) : undefined);
  const table = buildMatchTable(geo, prices, summary);
  const custom = !!arg('--out');
  const text = JSON.stringify(table) + '\n', photosOut = resolve(dirname(out), 'match-photos.json'), photos = JSON.stringify(loadPhotos()) + '\n';
  if (process.argv.includes('--check')) {
    const same = existsSync(out) && readFileSync(out, 'utf8') === text && (custom || (existsSync(photosOut) && readFileSync(photosOut, 'utf8') === photos));
    console.log(same ? 'match.json is up to date' : 'match.json is OUT OF DATE: run npm run build:match');
    process.exit(same ? 0 : 1);
  }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, text);
  if (!custom) writeFileSync(photosOut, photos);   // the photograph list belongs to the published table only
  const withRent = table.rows.filter(r => r[7] !== null).length, withPrice = table.rows.filter(r => r[6] !== null).length;
  console.log(`${out}: ${table.rows.length} places, ${withPrice} with a sale median, ${withRent} with a rent median, ${text.length} bytes`);
  console.log(`services: ${summary ? `${Object.keys(summary.places ?? {}).length} places in summary.json${summary.fixture ? ' (FIXTURE)' : ''}` : 'summary.json not there yet: every taste is "no data"'}`);
  console.log(`covered: ${Object.entries(table.covered).map(([k, v]) => `${k} ${v}`).join(', ')}`);
}
