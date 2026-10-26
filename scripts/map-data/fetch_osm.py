"""Prompt 25 §1.4 (D49): current OpenStreetMap boundaries for the 308 concelhos and the parishes INE publishes.

Replaces the 2016 GitHub export used before openstreetmap.org was on the network allowlist (ops/NETWORK_ALLOWLIST.txt).
Overpass is still blocked, so relations are found through Nominatim (search, 1 request per second as its policy asks)
and read with Nominatim's lookup (polygon_geojson, up to 50 relations per call). Every relation is checked against
INE: admin_level 7 with ref:ine = DICO for concelhos, admin_level 8 with ref:ine = DICOFRE for parishes.
Licence: ODbL, "© OpenStreetMap contributors". Note: OSM's Portuguese boundaries carry "source = DGT - CAOP 2022".

Writes content/facts/map/raw/osm-concelhos.geojson.gz and osm-freguesias.geojson.gz (same format as before:
features with properties {id, tags}) and updates raw/manifest.json. Usage (repo root): python3 scripts/map-data/fetch_osm.py
"""
import gzip, json, os, sys, time, urllib.parse, urllib.request
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
RAW = os.path.join(ROOT, "content", "facts", "map", "raw")
CACHE = os.path.join(RAW, ".cache", "nominatim"); os.makedirs(CACHE, exist_ok=True)
UA = {"User-Agent": "ImoveisPortugal-mapbuild/1.0 (ops@imoveisportugal.lu)"}
NOM = "https://nominatim.openstreetmap.org"
last = [0.0]

def get(url):
    key = os.path.join(CACHE, urllib.parse.quote(url, safe="")[:240])
    if os.path.exists(key): return json.load(open(key))
    for i in range(5):
        wait = 2.0 - (time.time() - last[0])
        if wait > 0: time.sleep(wait)
        last[0] = time.time()
        try:
            d = json.loads(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=90).read())
            json.dump(d, open(key, "w")); return d
        except Exception as e: print("retry", url[:100], e, file=sys.stderr); time.sleep(60 * (i + 1))
    return []

load = lambda n: json.load(gzip.open(os.path.join(RAW, n), "rt", encoding="utf8"))
def ine_rows(v, p):
    j = load(f"ine/{v}_{p}.json.gz"); return list(j["Dados"].values())[0]
MUNI = {r["geocod"][-4:]: r["geodsg"] for r in ine_rows("0009490", "S5A20161") if len(r["geocod"]) == 7}
PAR = {}
for v in ("0012234", "0014696"):
    for r in ine_rows(v, "S5A20262"):
        if len(r["geocod"]) == 9: PAR.setdefault(r["geocod"][-6:], r["geodsg"])
REGION = lambda d: "Madeira" if 31 <= int(d[:2]) <= 32 else "Açores" if int(d[:2]) >= 41 else "Portugal"

def search(q, level, code):
    url = f"{NOM}/search?{urllib.parse.urlencode({'q': q, 'countrycodes': 'pt', 'format': 'jsonv2', 'limit': 10, 'extratags': 1})}"
    for x in get(url):
        t = x.get("extratags") or {}
        if x.get("osm_type") == "relation" and t.get("admin_level") == level and t.get("ref:ine") == code: return x["osm_id"]
    return None

def lookup(ids):
    out = {}
    for i in range(0, len(ids), 50):
        chunk = ids[i:i + 50]
        url = f"{NOM}/lookup?{urllib.parse.urlencode({'osm_ids': ','.join(f'R{x}' for x in chunk), 'polygon_geojson': 1, 'extratags': 1, 'format': 'json'})}"
        for x in get(url): out[x["osm_id"]] = x
    return out

# Concelhos: start from the relation IDs already known (2016 export), then search for the rest.
known = {}
old = os.path.join(RAW, "osm-concelhos.geojson.gz")
if os.path.exists(old):
    for f in load("osm-concelhos.geojson.gz")["features"]:
        t = f["properties"].get("tags", {}); c = t.get("ref:ine") or t.get("ine:code")
        if c in MUNI and c not in known: known[c] = f["properties"]["id"]
got = lookup(list(known.values()))
muni = {}
for d, rid in known.items():
    x = got.get(rid); t = (x or {}).get("extratags") or {}
    if x and t.get("ref:ine") == d and t.get("admin_level") == "7": muni[d] = x
for d, n in sorted(MUNI.items()):
    if d in muni: continue
    rid = search(f"{n.replace(' (R.A.M.)', '').replace(' (R.A.A.)', '')}, {REGION(d)}", "7", d)
    if rid: muni.update({d: x for x in lookup([rid]).values()})
print("concelhos", len(muni), "of", len(MUNI), "missing:", [MUNI[d] for d in MUNI if d not in muni])

# Parishes: search each INE parish by name and concelho, keep the relation whose ref:ine is its DICOFRE.
par = {}
for code, n in sorted(PAR.items()):
    rid = search(f"{n}, {MUNI.get(code[:4], '')}", "8", code)
    if rid: par[code] = rid
pgot = lookup(list(par.values()))
pars = {c: pgot[r] for c, r in par.items() if r in pgot}
print("parishes", len(pars), "of", len(PAR))

def fc(items):
    return {"type": "FeatureCollection", "features": [{"type": "Feature", "properties": {"id": x["osm_id"], "tags": {**(x.get("extratags") or {}), "name": x.get("name") or x["display_name"].split(",")[0]}}, "geometry": x["geojson"]} for x in items if x.get("geojson", {}).get("type") in ("Polygon", "MultiPolygon")]}
manifest = json.load(open(os.path.join(RAW, "manifest.json")))
for name, items, note in (("osm-concelhos.geojson.gz", muni.values(), "admin_level 7, ref:ine = DICO"), ("osm-freguesias.geojson.gz", pars.values(), "admin_level 8, ref:ine = DICOFRE")):
    with gzip.open(os.path.join(RAW, name), "wt", encoding="utf8") as f: json.dump(fc(items), f, ensure_ascii=False, separators=(",", ":"))
    manifest["files"][name] = {"url": f"{NOM}/lookup (OpenStreetMap relations)", "downloaded": date.today().isoformat(), "licence": "ODbL (© OpenStreetMap contributors)", "note": f"{note}; current OSM, found via Nominatim search; OSM source tag: DGT - CAOP 2022"}
json.dump(manifest, open(os.path.join(RAW, "manifest.json"), "w"), indent=1, ensure_ascii=False, sort_keys=True)
