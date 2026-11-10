// Prompt 81, services table, step 4: drive times from every town hall to every facility, on the local OSRM graph.
// Usage: LD_LIBRARY_PATH=<scratch>/tools/tbb/tbb-2022.1.0.data/data/lib node scripts/map-data/services/route.cjs <scratch_dir>
// Reads  <scratch>/work/route_in.json   {origins: [{slug, lat, lon}], layers: {<layer>: [{id, lat, lon}]}}
// Writes <scratch>/work/route_out/<layer>.json  {ids, dsnap (metres from each facility to the road it was joined to),
//        osnap (the same for each origin), min[origin][facility] (minutes, 1 decimal, null = no road route), km[origin][facility]}
// No request leaves the machine: the table service runs in-process (MLD, the car profile without ferries).
const path = require("path"), fs = require("fs");
const D = process.argv[2];
const OSRM = require(path.join(D, "tools/v26.4.0/node_modules/@project-osrm/osrm/lib/binding_napi_v8/node_osrm.node")).OSRM;
const osrm = new OSRM({ path: path.join(D, "osrm/portugal.osrm"), algorithm: "MLD" });
const inp = JSON.parse(fs.readFileSync(path.join(D, "work/route_in.json"), "utf8"));
const only = process.argv[3] ? process.argv[3].split(",") : null;
fs.mkdirSync(path.join(D, "work/route_out"), { recursive: true });
const table = (o) => new Promise((res, rej) => osrm.table(o, (e, r) => (e ? rej(e) : res(r))));
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
(async () => {
  const O = inp.origins, oc = O.map((o) => [o.lon, o.lat]);
  for (const [layer, F] of Object.entries(inp.layers)) {
    if (only && !only.includes(layer)) continue;
    const t0 = Date.now(), CH = 1500;
    const min = O.map(() => []), km = O.map(() => []), dsnap = []; let osnap = null;
    for (let i = 0; i < F.length; i += CH) {
      const part = F.slice(i, i + CH);
      const coords = oc.concat(part.map((f) => [f.lon, f.lat]));
      const r = await table({ coordinates: coords, sources: O.map((_, k) => k), destinations: part.map((_, k) => O.length + k), annotations: ["duration", "distance"] });
      osnap = osnap || r.sources.map((s) => Math.round(s.distance));
      r.destinations.forEach((d) => dsnap.push(Math.round(d.distance)));
      r.durations.forEach((row, a) => row.forEach((s, b) => { min[a].push(s == null ? null : r1(s / 60)); km[a].push(s == null ? null : r1(r.distances[a][b] / 1000)); }));
    }
    fs.writeFileSync(path.join(D, `work/route_out/${layer}.json`), JSON.stringify({ ids: F.map((f) => f.id), dsnap, osnap, min, km }));
    console.log(layer, F.length, "facilities", ((Date.now() - t0) / 1000).toFixed(1) + " s");
  }
})().catch((e) => { console.error(e); process.exit(1); });
