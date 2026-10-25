"""Map data (prompts 16 and 19): one GeoJSON for the interactive map, from the official boundaries and the INE table.

Sources
- Boundaries: Carta Administrativa Oficial de Portugal CAOP2025, Direção-Geral do Território (open data).
  Mainland: OGC API https://ogcapi.dgterritorio.gov.pt/collections/municipios/items?f=json&limit=400 (WGS84).
  Madeira and Azores: https://geo2.dgterritorio.gov.pt/caop/CAOP_RAM_2025-gpkg.zip and CAOP_RAA_2025-gpkg.zip,
  converted to WGS84, then all 308 simplified with mapshaper (0.8%, weighted, keep shapes):
    npx mapshaper -i mun.json islands.json combine-files -merge-layers force -filter-fields dtmn,municipio \
      -simplify 0.8% weighted keep-shapes -clean -o format=geojson precision=0.0005 pt-municipios.json
- Prices: INE, median value per m2 of family dwellings sold, last 12 months (site/src/data/ine-m2.json, fact ine-m2-2026q2).
  The INE municipality code ends with the CAOP DTMN code (e.g. Porto 11A1312 / 1312).

Usage (from site/):  python3 scripts/map_data.py /path/to/pt-municipios.json
Writes public/data/pt-map.geojson (properties: n name, s slug, c INE code, v euro per m2 or null, r region,
coast, city, air). Madeira and the Azores are moved next to the mainland at a smaller scale.
"""
import json, math, sys, unicodedata, re

src = sys.argv[1]
ine = json.load(open("src/data/ine-m2.json"))
last = ine["quarters"][-1]
by_dtmn = {code[-4:]: (code, m) for code, m in ine["municipalities"].items() if len(code) == 7}

# Regions (NUTS II 2024) from the first characters of the INE code; islands by DTMN district (31-32 Madeira, 41-49 Azores).
def region(code, dtmn):
    d = int(dtmn[:2])
    if 31 <= d <= 32: return "madeira"
    if d >= 41: return "azores"
    p = code[:2]
    return {"11": "north", "19": "centre", "1A": "lisbon", "1B": "lisbon", "1C": "alentejo", "1D": "centre", "15": "algarve"}.get(p, "centre")

CITY_NUTS3 = ("11A", "1A0", "1B0")  # Porto and Lisbon metropolitan areas
CAPITALS = {"Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora", "Faro", "Guarda", "Leiria", "Portalegre",
            "Santarém", "Viana do Castelo", "Vila Real", "Viseu", "Funchal", "Ponta Delgada", "Angra do Heroísmo", "Horta"}
AIRPORTS = [(41.248, -8.681), (38.774, -9.134), (37.014, -7.966), (32.697, -16.778), (37.742, -25.698), (38.762, -27.091)]

def km(a, b):
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(h))

def rings(g):
    return [p[0] for p in g["coordinates"]] if g["type"] == "MultiPolygon" else [g["coordinates"][0]]

def centroid(g):
    pts = [pt for r in rings(g) for pt in r]
    return (sum(p[1] for p in pts) / len(pts), sum(p[0] for p in pts) / len(pts))

slug = lambda s: re.sub(r"[^a-z0-9]+", "-", unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode().lower()).strip("-")
fc = json.load(open(src))

# Coast: boundary edges that belong to no other municipality are the country's outline; on the mainland, those on the
# Atlantic side (west of 8.65°W below the Minho, or the Algarve south coast) count as coast. Every island is coastal.
from collections import Counter
edges = Counter()
key = lambda a, b: tuple(sorted([(round(a[0], 4), round(a[1], 4)), (round(b[0], 4), round(b[1], 4))]))
for f in fc["features"]:
    for r in rings(f["geometry"]):
        for a, b in zip(r, r[1:]): edges[key(a, b)] += 1

def coastal(f, reg):
    if reg in ("madeira", "azores"): return True
    n = 0
    for r in rings(f["geometry"]):
        for a, b in zip(r, r[1:]):
            if edges[key(a, b)] == 1:
                lo, la = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2
                if (lo < -8.65 and la < 41.87) or (la < 37.2 and lo < -7.4): n += 1
    return n >= 1

# Insets: Madeira and the Azores moved next to the mainland at a smaller scale, framed (prompt 16: "as insets").
INSET = {"madeira": dict(c=(-16.95, 32.75), to=(-10.75, 37.55), s=0.5), "azores": dict(c=(-28.0, 38.6), to=(-11.35, 39.95), s=0.28)}
def move(g, reg):
    if reg not in INSET: return g
    if reg == "madeira" and g["type"] == "MultiPolygon":  # leave out the Selvagens (about 30°N), far south of Madeira
        g = {"type": g["type"], "coordinates": [poly for poly in g["coordinates"] if min(p[1] for p in poly[0]) > 31.5]}
    t = INSET[reg]; cx, cy = t["c"]; tx, ty = t["to"]; s = t["s"]
    mv = lambda p: [round(tx + (p[0] - cx) * s, 5), round(ty + (p[1] - cy) * s, 5)]
    if g["type"] == "MultiPolygon": return {"type": g["type"], "coordinates": [[[mv(p) for p in r] for r in poly] for poly in g["coordinates"]]}
    return {"type": g["type"], "coordinates": [[mv(p) for p in r] for r in g["coordinates"]]}

out, missing = [], []
for f in fc["features"]:
    d = f["properties"]["dtmn"]; code, m = by_dtmn.get(d, (None, None))
    if not code: missing.append(f["properties"]["municipio"]); continue
    reg = region(code, d)
    c = centroid(f["geometry"])
    v = m["q"].get(last)
    g2 = move(f["geometry"], reg); cy2, cx2 = centroid(g2)
    out.append({"type": "Feature", "id": int(d), "properties": {
        "x": round(cx2, 4), "y": round(cy2, 4),
        "n": m["name"], "s": slug(m["name"]), "c": code, "v": v, "r": reg,
        "coast": coastal(f, reg), "city": code.startswith(CITY_NUTS3) or m["name"] in CAPITALS,
        "air": min(km(c, a) for a in AIRPORTS) <= 45,
    }, "geometry": g2})

json.dump({"type": "FeatureCollection", "quarter": last, "released": ine["released"], "features": out}, open("public/data/pt-map.geojson", "w"), separators=(",", ":"), ensure_ascii=False)
print(len(out), "municipalities;", sum(1 for f in out if f["properties"]["v"] is None), "without INE figure;", "missing:", missing)
print("coast", sum(f["properties"]["coast"] for f in out), "city", sum(f["properties"]["city"] for f in out), "air", sum(f["properties"]["air"] for f in out))
