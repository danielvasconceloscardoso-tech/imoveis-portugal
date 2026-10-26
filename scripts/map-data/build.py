"""Prompt 25 §1: rebuild the 3D map's data from content/facts/map/raw/ (scripts/map-data/fetch.py).

Writes
- site/public/data/map/munis.topo.json     308 concelhos, simplified TopoJSON (object "m"), Madeira and the Azores as insets
- site/public/data/map/parishes.topo.json  the parishes INE publishes prices or rents for (object "p"), loaded on zoom
- site/public/data/map/parishes.json       their series (price per m² from 2019-Q4, rent per m² from 2020-Q1)
- site/public/data/prices.json             per concelho and region: price per m² by quarter from 2016-Q1, rent per m²
                                           by quarter from 2020-Q1, gross yield, growth, momentum, comparable places
- content/facts/map/MISMATCHES.md          boundary ↔ INE code matching report

Every figure is INE's (CC BY 4.0): "Fonte: INE" with the period wherever it is shown. Boundaries: © OpenStreetMap
contributors (ODbL), geoBoundaries (CC0) for the units the OSM export lacks (see fetch.py and the report).

Usage (from the repo root): python3 scripts/map-data/build.py     needs shapely (pip) and npx (mapshaper 0.6.102)
"""
import gzip, json, math, os, re, subprocess, sys, tempfile, unicodedata
from collections import Counter, defaultdict
from shapely.geometry import shape, mapping, Polygon, MultiPolygon
from shapely.ops import unary_union, polylabel
from shapely.validation import make_valid

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
RAW = os.path.join(ROOT, "content", "facts", "map", "raw")
PUB = os.path.join(ROOT, "site", "public", "data")
load = lambda name: json.load(gzip.open(os.path.join(RAW, name), "rt", encoding="utf8"))
manifest = json.load(open(os.path.join(RAW, "manifest.json")))["files"]

def series(v, p):
    name = f"ine/{v}_{p}.json.gz"
    if name not in manifest: return None
    j = load(name); return list(j["Dados"].values())[0]

# ---------------------------------------------------------------- periods
Q = [(y, q) for y in range(2016, 2027) for q in range(1, 5) if (y, q) <= (2026, 2)]
labels = [f"{y}-Q{q}" for y, q in Q]
BREAK, RENT0 = labels.index("2019-Q4"), labels.index("2020-Q1")

# ---------------------------------------------------------------- INE units
latest = series("0012234", "S5A20262")
MUNI = {r["geocod"][-4:]: (r["geocod"], r["geodsg"]) for r in latest if len(r["geocod"]) == 7 and r.get("dim_3_t") == "Total"}
for r in series("0009490", "S5A20161"):  # INE lists every concelho in the 2018 series, even with no figure in 2026
    if len(r["geocod"]) == 7: MUNI.setdefault(r["geocod"][-4:], (r["geocod"], r["geodsg"]))
PAR = {}
for v in ("0012234", "0014696"):
    for r in series(v, "S5A20262"):
        if len(r["geocod"]) == 9 and (v != "0012234" or r.get("dim_3_t") == "Total"): PAR.setdefault(r["geocod"][-6:], (r["geocod"], r["geodsg"]))
assert len(MUNI) == 308, len(MUNI)

slug = lambda s: re.sub(r"[^a-z0-9]+", "-", unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode().lower()).strip("-")
plain = lambda s: re.sub(r"\s*\(r\.a\.[am]\.\)", "", unicodedata.normalize("NFD", s or "").encode("ascii", "ignore").decode().lower()).strip()
def region(code, dico):
    d = int(dico[:2])
    if 31 <= d <= 32: return "madeira"
    if d >= 41: return "azores"
    return {"11": "north", "19": "centre", "1A": "lisbon", "1B": "lisbon", "1C": "alentejo", "1D": "centre", "15": "algarve"}.get(code[:2], "centre")

# ---------------------------------------------------------------- boundaries: concelhos
report = {"osm": [], "gb": [], "gap": [], "nocode": [], "dropped": []}
def clean(g):
    g = make_valid(g)
    if g.geom_type == "GeometryCollection": g = unary_union([p for p in g.geoms if p.geom_type in ("Polygon", "MultiPolygon")])
    return g

osm = load("osm-concelhos.geojson.gz")["features"]
ALIAS = {"vila da praia da vitoria": "praia da vitoria"}  # INE's name and the name on the map
geom = {}
by_name = {plain(n): d for d, (_, n) in MUNI.items() if int(d[:2]) <= 18}
for f in osm:
    t = f["properties"]["tags"]; code = t.get("ref:ine") or t.get("ine:code")
    nm = plain(t.get("name"))
    if code in MUNI and ALIAS.get(plain(MUNI[code][1]), plain(MUNI[code][1])) != nm:  # the tag must name the same concelho as INE (Almada carries Almeirim's 1403)
        fixed = by_name.get(nm)
        report["nocode"].append(f"{t.get('name')} (relation {f['properties']['id']}) has ine:code {code}, which INE gives to {MUNI[code][1]}; matched by name → {fixed}")
        code = fixed
    elif not code and nm in by_name:  # e.g. Terras de Bouro has no ine:code in the export
        code = by_name[nm]; report["nocode"].append(f"{t['name']} (relation {f['properties']['id']}) has no ine:code; matched by name → {code}")
    if code in MUNI and code not in geom: geom[code] = clean(shape(f["geometry"])); report["osm"].append(code)
    elif code and code not in MUNI: report["dropped"].append(f"{t.get('name')} ine:code {code}")

gb = load("geoBoundaries-PRT-ADM2.geojson.gz")["features"]
mainland = unary_union([g for d, g in geom.items() if int(d[:2]) <= 18])
for d, (code, n) in sorted(MUNI.items()):
    if d in geom: continue
    want, isl = ALIAS.get(plain(n), plain(n)), int(d[:2]) >= 31
    cands = [g for g in gb if plain(g["properties"]["shapeName"]) == want]
    cands = [g for g in cands if (shape(g["geometry"]).centroid.x < -20) == (int(d[:2]) >= 41) and (shape(g["geometry"]).centroid.x < -12) == isl]
    if len(cands) != 1: raise SystemExit(f"no unique geoBoundaries unit for {n} ({d}): {len(cands)}")
    g = clean(shape(cands[0]["geometry"]))
    if isl: geom[d] = g; report["gb"].append(d); continue
    # Mainland: the gap the OSM neighbours leave, guided by the coarse geoBoundaries outline, so shared borders match.
    hole = g.buffer(0.03).difference(mainland)
    parts = list(hole.geoms) if hole.geom_type == "MultiPolygon" else [hole]
    best = max(parts, key=lambda p: p.intersection(g).area)
    geom[d] = best; report["gap"].append(d)

# ---------------------------------------------------------------- flags (as prompt 16): coast, city, airport
CITY_NUTS3 = ("11A", "1A0", "1B0")
CAPITALS = {"Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora", "Faro", "Guarda", "Leiria", "Portalegre",
            "Santarém", "Viana do Castelo", "Vila Real", "Viseu", "Funchal", "Ponta Delgada", "Angra do Heroísmo", "Horta"}
AIRPORTS = [(41.248, -8.681), (38.774, -9.134), (37.014, -7.966), (32.697, -16.778), (37.742, -25.698), (38.762, -27.091)]
def km(a, b):
    la1, lo1, la2, lo2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(h))
# Coast: the mainland outline (edges no other concelho touches) on the Atlantic side; every island is coastal.
outline = mainland.simplify(0.0005).boundary.buffer(0.003)  # built once: buffering per concelho takes minutes
def coastal(d):
    if int(d[:2]) >= 31: return True
    edge = geom[d].boundary.intersection(outline)
    pts = [p for line in getattr(edge, "geoms", [edge]) for p in getattr(line, "coords", [])]
    return any((lo < -8.65 and la < 41.87) or (la < 37.2 and lo < -7.4) for lo, la in pts)

# ---------------------------------------------------------------- insets (Madeira 0.5, Azores 0.28; no Selvagens)
INSET = {"madeira": dict(c=(-16.95, 32.75), to=(-10.75, 37.55), s=0.5), "azores": dict(c=(-28.0, 38.6), to=(-11.35, 39.95), s=0.28)}
from shapely import affinity
def move(g, reg):
    if reg not in INSET: return g
    if reg == "madeira" and g.geom_type == "MultiPolygon": g = MultiPolygon([p for p in g.geoms if p.bounds[1] > 31.5])
    t = INSET[reg]; cx, cy = t["c"]; tx, ty = t["to"]
    return affinity.translate(affinity.scale(g, t["s"], t["s"], origin=(cx, cy)), tx - cx, ty - cy)
def label(g):
    big = max(g.geoms, key=lambda p: p.area) if g.geom_type == "MultiPolygon" else g
    p = polylabel(big, tolerance=0.002); return round(p.x, 4), round(p.y, 4)

feats, props = [], {}
for d, (code, n) in sorted(MUNI.items()):
    reg = region(code, d); g = geom[d]
    c = g.centroid
    g2 = move(g, reg); x, y = label(g2)
    p = {"id": int(d), "n": n, "s": slug(n), "c": code, "r": reg, "coast": coastal(d),
         "city": code.startswith(CITY_NUTS3) or n in CAPITALS, "air": min(km((c.y, c.x), a) for a in AIRPORTS) <= 45,
         "x": x, "y": y, "a": round(g2.area * 1e4, 1)}  # a: drawn area in 1e-4 deg² (insets scaled), for the hit radius of small concelhos
    props[d] = p
    feats.append({"type": "Feature", "properties": p, "geometry": mapping(g2)})

# ---------------------------------------------------------------- parishes
opar = load("osm-freguesias.geojson.gz")["features"]
pgeom, pmatch = {}, {}
byname = defaultdict(list)
for f in opar:
    t = f["properties"]["tags"]; code = t.get("ref:ine") or t.get("ine:code") or t.get("dicofre")
    g = clean(shape(f["geometry"]))
    if code in PAR and code not in pgeom: pgeom[code] = g; pmatch[code] = "code"
    else: byname[plain(t.get("name"))].append(g)
for code, (_, n) in PAR.items():
    if code in pgeom: continue
    muni = geom.get(code[:4])
    for g in byname.get(plain(n), []):
        if muni is not None and muni.contains(g.representative_point()): pgeom[code] = g; pmatch[code] = "name"; break
pfeats = []
for code, g in sorted(pgeom.items()):
    d = code[:4]; reg = props[d]["r"]; g2 = move(g, reg); x, y = label(g2)
    pfeats.append({"type": "Feature", "properties": {"id": code, "n": PAR[code][1], "m": props[d]["s"], "x": x, "y": y}, "geometry": mapping(g2)})

# ---------------------------------------------------------------- simplify to TopoJSON (mapshaper keeps shared borders shared)
os.makedirs(os.path.join(PUB, "map"), exist_ok=True)
def topo(fc, name, pct, out):
    with tempfile.TemporaryDirectory() as tmp:
        src = os.path.join(tmp, f"{name}.json"); json.dump({"type": "FeatureCollection", "features": fc}, open(src, "w"))
        subprocess.run(["npx", "-y", "mapshaper@0.6.102", "-i", src, "name=" + name, "-simplify", pct, "weighted", "keep-shapes",
                        "-clean", "-o", "format=topojson", "quantization=100000", out], check=True, capture_output=True)
topo(feats, "m", "6%", os.path.join(PUB, "map", "munis.topo.json"))
topo(pfeats, "p", "8%", os.path.join(PUB, "map", "parishes.topo.json"))

# ---------------------------------------------------------------- prices and rents
REG = {"PT": "Portugal", "11": "Norte", "19": "Centro", "1D": "Oeste e Vale do Tejo", "1A": "Grande Lisboa", "1B": "Península de Setúbal", "1C": "Alentejo", "15": "Algarve", "20": "Região Autónoma dos Açores", "30": "Região Autónoma da Madeira"}
blank = lambda: [None] * len(Q)
M = {d: {"n": p["n"], "s": p["s"], "r": p["r"], "m2": blank(), "rq": blank()} for d, p in props.items()}
R = {k: {"n": v, "m2": blank(), "rq": blank()} for k, v in REG.items()}
P = {code: {"n": PAR[code][1], "m": props[code[:4]]["s"], "m2": blank(), "rq": blank()} for code in PAR}
num = lambda r: float(r["valor"]) if r.get("valor") not in (None, "", "x") else None
for i, (y, q) in enumerate(Q):
    new = i >= BREAK
    for r in series("0012234" if new else "0009490", f"S5A{y}{q}") or []:
        if new and r.get("dim_3_t") != "Total": continue
        v, code = num(r), r["geocod"]
        if v is None: continue
        if len(code) == 7 and code[-4:] in M: M[code[-4:]]["m2"][i] = round(v)
        elif len(code) == 9 and code[-6:] in P: P[code[-6:]]["m2"][i] = round(v)
        elif code in R and (new or code == "PT"): R[code]["m2"][i] = round(v)
    if i < RENT0: continue
    for r in series("0014696", f"S5A{y}{q}") or []:
        v, code = num(r), r["geocod"]
        if v is None: continue
        if len(code) == 7 and code[-4:] in M: M[code[-4:]]["rq"][i] = v
        elif len(code) == 9 and code[-6:] in P: P[code[-6:]]["rq"][i] = v
        elif code in R: R[code]["rq"][i] = v

def at(a, i): return a[i] if 0 <= i < len(a) else None
def cagr(a, start):
    i0 = next((i for i in range(start, len(a)) if a[i]), None); last = a[-1]
    if i0 is None or not last or i0 >= len(a) - 4: return None
    return round(((last / a[i0]) ** (4 / (len(a) - 1 - i0)) - 1) * 100, 1)
def derive(d):
    p, r = d["m2"], d["rq"]; last = len(p) - 1
    d["yield"] = round(r[last] * 12 / p[last] * 100, 1) if p[last] and r[last] else None
    d["g10"] = round((p[last] / p[0] - 1) * 100) if p[last] and p[0] else None
    d["cagrP"], d["cagrP20"], d["cagrR"] = cagr(p, 0), cagr(p, RENT0), cagr(r, RENT0)
    # Momentum: change over the last 4 and 8 quarters; "accelerating" when the last 4 quarters grew 2+ points faster than the
    # 4 before them, "slowing" when 2+ points slower, else "steady". A description of the record, never a forecast.
    c4 = (p[last] / at(p, last - 4) - 1) * 100 if p[last] and at(p, last - 4) else None
    c8 = (p[last] / at(p, last - 8) - 1) * 100 if p[last] and at(p, last - 8) else None
    prev = (at(p, last - 4) / at(p, last - 8) - 1) * 100 if at(p, last - 4) and at(p, last - 8) else None
    d["mo"] = None if c4 is None else {"c4": round(c4, 1), "c8": None if c8 is None else round(c8, 1),
                                         "w": "steady" if prev is None or abs(c4 - prev) < 2 else ("up" if c4 > prev else "down")}
    # Compatibility with prompt 20's pages: rent of the 2nd quarter of each year.
    d["rent"] = {str(y): r[labels.index(f"{y}-Q2")] for y in range(2020, 2027) if r[labels.index(f"{y}-Q2")] is not None}
for d in list(M.values()) + list(R.values()) + list(P.values()): derive(d)

# Comparable places: nearest by price level (log), yield and setting; three per concelho, other concelhos only.
def dist(a, b):
    pa, pb = M[a]["m2"][-1], M[b]["m2"][-1]
    s = abs(math.log(pa / pb)) / 0.12
    if M[a]["yield"] and M[b]["yield"]: s += abs(M[a]["yield"] - M[b]["yield"]) / 0.8
    else: s += 1.5
    s += (props[a]["coast"] != props[b]["coast"]) * 1.2 + (props[a]["city"] != props[b]["city"]) * 1.2
    return s
priced = [d for d in M if M[d]["m2"][-1]]
for d in M:
    M[d]["cmp"] = [M[b]["s"] for b in sorted((b for b in priced if b != d), key=lambda b: dist(d, b))[:3]] if d in priced else []

out = {"quarters": labels, "break": "2019-Q4", "rentFrom": "2020-Q1", "rentYears": list(range(2020, 2027)),
       "released": {"sales": "2026-10-23", "rents": "2026-09-29"}, "mortgage": {"rate": 3.00, "month": "2026-08", "fact": "bdp-mortgage-rate-2026-08"},
       "parishMunis": sorted({props[c[:4]]["s"] for c in pgeom}), "regions": R, "munis": {d["s"]: {k: v for k, v in d.items() if k != "s"} for d in M.values()}}
json.dump(out, open(os.path.join(PUB, "prices.json"), "w"), separators=(",", ":"), ensure_ascii=False)
pkeep = {c: {k: v for k, v in P[c].items() if k in ("n", "m", "m2", "rq", "yield", "mo", "cagrP20", "cagrR")} for c in pgeom}
json.dump({"quarters": labels, "parishes": pkeep}, open(os.path.join(PUB, "map", "parishes.json"), "w"), separators=(",", ":"), ensure_ascii=False)

# ---------------------------------------------------------------- report
name = lambda d: MUNI[d][1]
nopar = sorted(c for c in PAR if c not in pgeom)
lines = ["# Map boundaries ↔ INE codes (prompt 25 §1)", "",
         "Built by scripts/map-data/build.py from content/facts/map/raw/ (sources and dates in raw/manifest.json).", "",
         f"## Concelhos: {len(geom)} of 308 matched", "",
         f"- {len(report['osm'])} from OpenStreetMap relations (admin_level 7) matched on the tag ine:code = INE DICO.",
         f"- {len(report['gb'])} from geoBoundaries PRT ADM2 (CC0), absent from the OSM export: " + ", ".join(name(d) for d in report["gb"]) + ".",
         *([f"- {len(report['gap'])} mainland concelhos absent from the OSM export, drawn as the gap their OSM neighbours leave (guided by geoBoundaries): " + ", ".join(name(d) for d in report["gap"]) + "."] if report["gap"] else []),
         *(f"- {x}." for x in report["nocode"]),
         *(f"- OSM relation with an ine:code INE does not use (left out): {x}." for x in report["dropped"]), "",
         "Boundaries are current OpenStreetMap relations fetched through Nominatim by fetch_osm.py (date in raw/manifest.json); "
         "until DGT confirms commercial use (task 8x), CAOP is not used.", "",
         f"## Parishes: {len(pgeom)} of the {len(PAR)} INE publishes prices or rents for", "",
         f"- {sum(1 for v in pmatch.values() if v == 'code')} matched on ine:code (DICOFRE), {sum(1 for v in pmatch.values() if v == 'name')} by name inside the right concelho.",
         f"- {len(nopar)} without a boundary: INE still publishes these as the unions of the 2013 map, while OpenStreetMap now draws the parishes "
         "Lei 25-A/2025 restored, so no single boundary carries the union's code. They stay out of the parish layer; their concelho still shows them in the list.", "",
         "| DICOFRE | Parish (INE) | Concelho |", "|---|---|---|",
         *(f"| {c} | {PAR[c][1]} | {name(c[:4])} |" for c in nopar)]
open(os.path.join(ROOT, "content", "facts", "map", "MISMATCHES.md"), "w").write("\n".join(lines) + "\n")
print(len(feats), "concelhos;", len(report["osm"]), "OSM,", len(report["gb"]), "geoBoundaries,", len(report["gap"]), "gap;", len(pfeats), "parishes of", len(PAR))
print("Porto", M["1312"]["m2"][0], "→", M["1312"]["m2"][-1], "rent", M["1312"]["rq"][-1], "yield", M["1312"]["yield"], "mo", M["1312"]["mo"], "cmp", M["1312"]["cmp"])
