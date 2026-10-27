"""Map v3 overlays (prompt 36): rivers and beaches.

- Rivers: Natural Earth 1:10m rivers and lake centrelines (public domain), the Tejo, Douro, Guadiana, Mondego, Minho, Sado
  and Zêzere clipped to mainland Portugal -> site/public/data/map/rivers.json
- Beaches: OpenStreetMap natural=beach (ODbL), named beaches only, as points, through Nominatim (Overpass is blocked from the
  build environment), one request a second as its usage policy asks; Madeira and the Azores moved into the insets as build.py
  draws them -> site/public/data/map/beaches.json  [[lon, lat, name], ...]
Usage (repo root): python3 scripts/map-data/v3_extras.py
"""
import json, os, time, urllib.parse, urllib.request
UA = {"User-Agent": "ImoveisPortugalMap/1.0 (ops@imoveisportugal.lu)"}
OUT = "site/public/data/map"
def get(u):
    for t in range(5):
        try: return json.loads(urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=90).read())
        except Exception as e: print("retry", e); time.sleep(5 * (t + 1))
    return []
# Rivers
ne = get("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_rivers_lake_centerlines.geojson")
want = {"Tagus", "Tejo", "Douro", "Duero", "Guadiana", "Mondego", "Minho", "Miño", "Sado", "Zêzere", "Zezere"}
def inpt(c): return -9.6 < c[0] < -6.15 and 36.95 < c[1] < 42.2
feats = []
for f in ne.get("features", []):
    n = f["properties"].get("name") or f["properties"].get("name_en") or ""
    if n not in want: continue
    g = f["geometry"]; lines = g["coordinates"] if g["type"] == "MultiLineString" else [g["coordinates"]]
    for ln in lines:
        seg = []
        for c in ln:
            if inpt(c): seg.append([round(c[0], 4), round(c[1], 4)])
            elif len(seg) > 1: feats.append({"type": "Feature", "properties": {"n": n}, "geometry": {"type": "LineString", "coordinates": seg}}); seg = []
            else: seg = []
        if len(seg) > 1: feats.append({"type": "Feature", "properties": {"n": n}, "geometry": {"type": "LineString", "coordinates": seg}})
json.dump({"type": "FeatureCollection", "features": feats}, open(f"{OUT}/rivers.json", "w"), separators=(",", ":"))
print("rivers", len(feats))
# Beaches
INSET = {"madeira": dict(c=(-16.95, 32.75), to=(-10.75, 37.55), s=0.5), "azores": dict(c=(-28.0, 38.6), to=(-11.35, 39.95), s=0.28)}
def mv(lon, lat):
    reg = "madeira" if lon < -15.5 and lat < 34 else "azores" if lon < -24 else None
    if not reg: return lon, lat
    t = INSET[reg]; cx, cy = t["c"]; tx, ty = t["to"]; return (lon - cx) * t["s"] + tx, (lat - cy) * t["s"] + ty
BOXES = [(-9.6, 36.9, -7.3, 42.2), (-8.9, 36.9, -7.35, 37.25), (-17.3, 32.35, -16.2, 33.15), (-31.4, 36.9, -24.9, 39.8)]
found = {}
for x0, y0, x1, y1 in BOXES:
    step = 0.25 if x1 - x0 < 3 else 0.4
    lon = x0
    while lon < x1:
        lat = y0
        while lat < y1:
            excl = []
            for _ in range(4):
                p = {"q": "praia", "countrycodes": "pt", "format": "jsonv2", "limit": 40, "bounded": 1, "viewbox": f"{lon},{min(lat + step, y1)},{min(lon + step, x1)},{lat}"}
                if excl: p["exclude_place_ids"] = ",".join(map(str, excl))
                res = get("https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(p)); time.sleep(1.05)
                for r in res:
                    excl.append(r["place_id"])
                    if r.get("category") == "natural" and r.get("type") == "beach" and r.get("name"):
                        found[r["name"] + f"@{round(float(r['lat']), 2)}"] = (float(r["lon"]), float(r["lat"]), r["name"])
                if len(res) < 40: break
            lat += step
        lon += step
out = [[round(a, 5), round(b, 5), n] for lo, la, n in found.values() for a, b in [mv(lo, la)]]
json.dump(out, open(f"{OUT}/beaches.json", "w"), ensure_ascii=False, separators=(",", ":"))
print("beaches", len(out))
