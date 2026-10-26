"""Prompt 25 §1: download the raw inputs of the 3D map into content/facts/map/raw/, with the source URL and date of
every file in content/facts/map/raw/manifest.json. scripts/map-data/build.py turns them into the site's data.

Sources
- INE, Estatísticas de preços da habitação ao nível local (CC BY 4.0, https://dados.gov.pt): median value per m² of
  family dwellings sold in the last 12 months, quarterly. 0009490 (Metodologia 2018, 2016-Q1 to 2019-Q3) and
  0012234 (Metodologia 2022, 2019-Q4 onwards; municipalities and the parishes INE publishes).
- INE, Estatísticas de rendas da habitação ao nível local (CC BY 4.0): median rent per m² of new lease contracts in the
  last 12 months. 0014696 (Metodologia 2026, quarterly, first period 2020-Q1) and 0009817 (Metodologia 2021,
  semi-annual, the earlier series; kept for the record, not mixed into the chart).
  API: https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd={code}&Dim1={period}&lang=PT
- Boundaries (D49): OpenStreetMap administrative relations (ODbL, "© OpenStreetMap contributors"): concelhos are
  admin_level 7 with the tag ine:code = DICO, freguesias admin_level 8. The OSM servers and Overpass are not
  reachable from the build environment, so the relations come from the GitHub export of OSM boundaries
  github.com/missinglink/osm-boundaries (planet of December 2016). Concelho borders have not changed since 1998.
  Units missing from that export (the Madeira and Azores concelhos and three mainland ones) come from
  geoBoundaries PRT ADM2 (CC0, github.com/wmgeolab/geoBoundaries). DGT's CAOP is not used until DGT confirms
  commercial use in writing (task 8x). With Overpass reachable, replace this step with an admin_level 7/8 query.

Usage (from the repo root): python3 scripts/map-data/fetch.py [--cache DIR]
Requests run one at a time with retries: INE resets parallel connections.
"""
import gzip, json, os, sys, time, urllib.request, unicodedata, re
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
RAW = os.path.join(ROOT, "content", "facts", "map", "raw")
CACHE = sys.argv[sys.argv.index("--cache") + 1] if "--cache" in sys.argv else os.path.join(RAW, ".cache")
INE = "https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd={v}&Dim1={p}&lang=PT"
OSMB = "https://raw.githubusercontent.com/missinglink/osm-boundaries/master/"
GB = "https://media.githubusercontent.com/media/wmgeolab/geoBoundaries/main/releaseData/gbOpen/PRT/ADM2/"
TODAY = date.today().isoformat()
manifest = json.load(open(os.path.join(RAW, "manifest.json"))) if os.path.exists(os.path.join(RAW, "manifest.json")) else {"files": {}}

def get(url, cache_name, valid=lambda b: True):
    path = os.path.join(CACHE, cache_name)
    if os.path.exists(path) and os.path.getsize(path) > 0: return open(path, "rb").read()
    for i in range(6):
        try:
            b = urllib.request.urlopen(url, timeout=120).read()
            if valid(b):
                os.makedirs(os.path.dirname(path), exist_ok=True); open(path, "wb").write(b); return b
        except Exception as e: print("retry", url, e, file=sys.stderr)
        time.sleep(2 * (i + 1))
    raise SystemExit(f"failed: {url}")

def is_json(b):
    try: json.loads(b); return True
    except Exception: return False

def save(name, obj, url, licence, note=""):
    p = os.path.join(RAW, name); os.makedirs(os.path.dirname(p), exist_ok=True)
    with gzip.open(p, "wt", encoding="utf8") as f: json.dump(obj, f, ensure_ascii=False, separators=(",", ":"))
    manifest["files"][name] = {"url": url, "downloaded": TODAY, "licence": licence, **({"note": note} if note else {})}

# 1. INE series, one file per indicator and period (as the API returns them).
def quarters(a, b): return [f"S5A{y}{q}" for y in range(2016, 2030) for q in range(1, 5) if a <= (y, q) <= b]
LAST = (2026, 2)  # latest quarter released (prices 23 Oct 2026, rents 29 Sep 2026)
SERIES = {"0009490": quarters((2016, 1), (2019, 3)), "0012234": quarters((2019, 4), LAST), "0014696": quarters((2020, 1), LAST),
          "0009817": [f"S6A{y}{s}" for y in range(2017, 2024) for s in (1, 2)]}
for v, periods in SERIES.items():
    for p in periods:
        b = get(INE.format(v=v, p=p), f"ine/{v}_{p}.json", is_json)
        j = json.loads(b); j = j[0] if isinstance(j, list) else j
        if "Verdadeiro" not in j.get("Sucesso", {}): continue  # period not published for this series
        save(f"ine/{v}_{p}.json.gz", j, INE.format(v=v, p=p), "CC BY 4.0 (INE)")

# 2. OSM relations: every admin_level 7 (concelho) and 8 (freguesia) relation whose name is an INE municipality or parish.
def rows(v, p):
    j = json.load(gzip.open(os.path.join(RAW, f"ine/{v}_{p}.json.gz"), "rt", encoding="utf8"))
    return list(j["Dados"].values())[0]
norm = lambda s: re.sub(r"\s*\(r\.a\.[am]\.\)", "", unicodedata.normalize("NFC", s or "").strip().lower())
muni_names = {norm(r["geodsg"]) for r in rows("0012234", "S5A20262") if len(r["geocod"]) == 7}
par_names = {norm(r["geodsg"]) for v in ("0012234", "0014696") for r in rows(v, "S5A20262") if len(r["geocod"]) == 9}
meta = get(OSMB + "meta.tsv", "osm/meta.tsv").decode("utf8").splitlines()
want = {"7": [], "8": []}
for line in meta[1:]:
    p = line.split("\t")
    if len(p) < 6: continue
    lvl = p[4] if p[4].isdigit() else p[5]
    if lvl == "7" and norm(p[0]) in muni_names or lvl == "8" and norm(p[0]) in par_names: want[lvl].append(p[3])
inside = lambda f: any(-31.5 < x < -6 and 32.3 < y < 42.2 for x, y in [pt for ring in coords(f["geometry"]) for pt in ring][:1])
def coords(g):
    if not g: return []
    return [r for poly in g["coordinates"] for r in poly] if g["type"] == "MultiPolygon" else g["coordinates"] if g["type"] == "Polygon" else []
for lvl, name in (("7", "osm-concelhos.geojson.gz"), ("8", "osm-freguesias.geojson.gz")):
    feats = []
    for path in want[lvl]:
        b = get(OSMB + "data/" + path, "osm/" + os.path.basename(path), is_json)
        f = json.loads(b)
        if f.get("geometry") and inside(f): feats.append(f)
    save(name, {"type": "FeatureCollection", "features": feats}, OSMB + "data/", "ODbL (© OpenStreetMap contributors)",
         f"admin_level {lvl} relations named like an INE unit, inside Portugal; OSM planet of December 2016 (osm-boundaries export)")
    print(name, len(feats), "relations")

# 3. geoBoundaries PRT ADM2 for the units the OSM export lacks.
gb = json.loads(get(GB + "geoBoundaries-PRT-ADM2.geojson", "gb/geoBoundaries-PRT-ADM2.geojson", is_json))
save("geoBoundaries-PRT-ADM2.geojson.gz", gb, GB + "geoBoundaries-PRT-ADM2.geojson", "CC0 1.0 (geoBoundaries; source: Wikipedia)")

json.dump(manifest, open(os.path.join(RAW, "manifest.json"), "w"), indent=1, ensure_ascii=False, sort_keys=True)
print("manifest:", len(manifest["files"]), "files")
