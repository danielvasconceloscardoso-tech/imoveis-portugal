"""Prompt 33 §4.1: the golf layer of the map, from OpenStreetMap (leisure=golf_course; ODbL, "© OpenStreetMap contributors").

1. Finds every leisure=golf_course in Portugal (mainland, Madeira, the Azores). Overpass first (overpass-api.de, then
   overpass.kumi.systems); when both are unreachable (the case on 27 Oct 2026: the agent proxy resets overpass-api.de and
   refuses kumi), Nominatim's category search ("golf course" = leisure=golf_course) over a 0.5° grid, paged with
   exclude_place_ids, 1 request per second as Nominatim's policy asks.
2. Reads each course's outline with Nominatim's lookup (polygon_geojson, 50 ways or relations per call).
3. Writes the raw outlines to content/facts/map/raw/osm-golf.geojson.gz (manifest updated) and the map file
   site/public/data/map/golf.geojson: outlines simplified (~15 m) and rounded to 5 decimals, the islands moved into the
   same insets as munis.topo.json (build.py), properties {n: name, m: concelho slug, p: INE parish code
   when the label point falls in a parish INE publishes (the map lifts the course onto that parish from zoom 8.2), x, y: label point}.
   Unnamed ways inside or touching a named course are parts of it and are dropped, outlines under 0.5 ha (putting
   greens, mini golf) are left out, and outlines of one course sharing a name are merged; an unnamed course on its own keeps
   n = "" and the map labels it with the generic wording and its concelho (COPY_DECK "map.golf.unnamed").

Usage (repo root): python3 scripts/map-data/golf.py           needs shapely; ~2 minutes (cached in $MAPDATA_CACHE or /tmp)
         python3 scripts/map-data/golf.py --offline  rebuilds golf.geojson from the raw file without the network
"""
import gzip, json, math, os, sys, tempfile, time, urllib.parse, urllib.request
import shapely
from datetime import date
from shapely.geometry import shape, mapping, Polygon, MultiPolygon, Point
from shapely.ops import unary_union, polylabel
from shapely.validation import make_valid
from shapely import affinity

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
RAW = os.path.join(ROOT, "content", "facts", "map", "raw")
PUB = os.path.join(ROOT, "site", "public", "data", "map")
CACHE = os.path.join(os.environ.get("MAPDATA_CACHE") or os.path.join(tempfile.gettempdir(), "ip-mapdata-cache"), "golf"); os.makedirs(CACHE, exist_ok=True)
UA = {"User-Agent": "ImoveisPortugal-mapbuild/1.0 (ops@imoveisportugal.lu)"}
NOM = "https://nominatim.openstreetmap.org"
OVERPASS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"]
RAWFILE = "osm-golf.geojson.gz"
# Search boxes (lon0, lat0, lon1, lat1): the mainland, Madeira with Porto Santo, the Azores.
BOXES = [(-9.6, 36.9, -6.1, 42.2), (-17.4, 32.3, -16.2, 33.2), (-31.4, 36.8, -24.9, 39.8)]
last = [0.0]

def get(url, data=None, cache=True):
    key = os.path.join(CACHE, urllib.parse.quote(url + (data or ""), safe="")[:240])
    if cache and os.path.exists(key): return json.load(open(key))
    for i in range(4):
        wait = 1.1 - (time.time() - last[0])
        if wait > 0: time.sleep(wait)
        last[0] = time.time()
        try:
            req = urllib.request.Request(url, data=data.encode() if data else None, headers=UA)
            d = json.loads(urllib.request.urlopen(req, timeout=120).read())
            if cache: json.dump(d, open(key, "w"))
            return d
        except Exception as e:
            print("retry", url[:90], e, file=sys.stderr)
            if data: raise  # Overpass: fall through to the next endpoint
            time.sleep(20 * (i + 1))
    raise SystemExit(f"failed: {url}")

def overpass_ids():
    q = ('[out:json][timeout:180];area["ISO3166-1"="PT"][admin_level=2]->.pt;'
         '(way["leisure"="golf_course"](area.pt);relation["leisure"="golf_course"](area.pt););out ids tags;')
    for ep in OVERPASS:
        try:
            d = get(ep, "data=" + urllib.parse.quote(q), cache=False)
            print("overpass:", ep, len(d.get("elements", [])), "elements")
            return {f"{e['type'][0].upper()}{e['id']}" for e in d["elements"]}, ep
        except Exception as e: print("overpass unavailable:", ep, str(e)[:80], file=sys.stderr)
    return None, None

def nominatim_ids():
    found = {}
    for x0, y0, x1, y1 in BOXES:
        lon = x0
        while lon < x1:
            lat = y0
            while lat < y1:
                excl = []
                while True:
                    p = {"q": "golf course", "countrycodes": "pt", "format": "jsonv2", "limit": 40, "bounded": 1,
                         "viewbox": f"{lon},{min(lat + 0.5, y1)},{min(lon + 0.5, x1)},{lat}"}
                    if excl: p["exclude_place_ids"] = ",".join(map(str, excl))
                    res = get(f"{NOM}/search?{urllib.parse.urlencode(p)}")
                    for r in res:
                        excl.append(r["place_id"])
                        if r.get("category") == "leisure" and r.get("type") == "golf_course" and r["osm_type"] in ("way", "relation"):
                            found[f"{r['osm_type'][0].upper()}{r['osm_id']}"] = r.get("name") or ""
                    if len(res) < 40: break
                lat += 0.5
            lon += 0.5
    print("nominatim:", len(found), "courses")
    return set(found)

def lookup(ids):
    out = []
    ids = sorted(ids)
    for i in range(0, len(ids), 50):
        p = {"osm_ids": ",".join(ids[i:i + 50]), "polygon_geojson": 1, "polygon_threshold": 0.00002, "extratags": 1, "namedetails": 1, "format": "json"}
        out += get(f"{NOM}/lookup?{urllib.parse.urlencode(p)}")
    return out

def fetch():
    ids, ep = overpass_ids()
    via = f"Overpass ({ep})" if ids else "Nominatim category search (Overpass unreachable)"
    if not ids: ids = nominatim_ids()
    feats = []
    for x in lookup(ids):
        g = x.get("geojson") or {}
        if g.get("type") not in ("Polygon", "MultiPolygon"): continue
        nd = x.get("namedetails") or {}
        feats.append({"type": "Feature", "properties": {"id": f"{x['osm_type'][0]}{x['osm_id']}", "name": nd.get("name") or x.get("name") or "",
                                                         "tags": {k: v for k, v in (x.get("extratags") or {}).items() if k in ("holes", "golf:course", "website", "operator", "access")}}, "geometry": g})
    with gzip.open(os.path.join(RAW, RAWFILE), "wt", encoding="utf8") as f:
        json.dump({"type": "FeatureCollection", "features": feats}, f, ensure_ascii=False, separators=(",", ":"))
    mf = os.path.join(RAW, "manifest.json"); manifest = json.load(open(mf))
    manifest["files"][RAWFILE] = {"url": f"{NOM}/lookup (OpenStreetMap ways and relations, leisure=golf_course)", "downloaded": date.today().isoformat(),
                                  "licence": "ODbL (© OpenStreetMap contributors)", "note": f"found via {via}; {len(feats)} outlines"}
    json.dump(manifest, open(mf, "w"), indent=1, ensure_ascii=False, sort_keys=True)
    print("raw:", len(feats), "outlines via", via)

# ---------------------------------------------------------------- map file
INSET = {"madeira": dict(c=(-16.95, 32.75), to=(-10.75, 37.55), s=0.5), "azores": dict(c=(-28.0, 38.6), to=(-11.35, 39.95), s=0.28)}  # as build.py
def move(g):
    x = g.representative_point().x
    reg = "azores" if x < -24 else "madeira" if x < -15 else None
    if not reg: return g
    t = INSET[reg]; cx, cy = t["c"]; tx, ty = t["to"]
    return affinity.translate(affinity.scale(g, t["s"], t["s"], origin=(cx, cy)), tx - cx, ty - cy)

def topo_features(path, obj):
    """Minimal TopoJSON decoder (quantized, delta-encoded arcs) for munis.topo.json."""
    t = json.load(open(path)); sx, sy = t["transform"]["scale"]; tx, ty = t["transform"]["translate"]
    arcs = []
    for a in t["arcs"]:
        x = y = 0; pts = []
        for dx, dy in a: x += dx; y += dy; pts.append((x * sx + tx, y * sy + ty))
        arcs.append(pts)
    def ring(ix):
        pts = []
        for i in ix:
            a = arcs[i] if i >= 0 else arcs[~i][::-1]
            pts += a if not pts else a[1:]
        return pts
    out = []
    for o in t["objects"][obj]["geometries"]:
        if o["type"] == "Polygon": g = Polygon(ring(o["arcs"][0]), [ring(r) for r in o["arcs"][1:]])
        elif o["type"] == "MultiPolygon": g = MultiPolygon([Polygon(ring(p[0]), [ring(r) for r in p[1:]]) for p in o["arcs"]])
        else: continue
        out.append((o["properties"], make_valid(g)))
    return out

def clean(g):
    g = make_valid(g)
    if g.geom_type == "GeometryCollection": g = unary_union([p for p in g.geoms if p.geom_type in ("Polygon", "MultiPolygon")])
    return g

def rnd(geo, nd=5):
    def r(c): return [round(c[0], nd), round(c[1], nd)] if isinstance(c[0], (int, float)) else [r(x) for x in c]
    return {"type": geo["type"], "coordinates": r(geo["coordinates"])}

def courses():
    """The deduplicated courses, true coordinates: [(properties {id, name, tags}, shapely geometry)], plus the raw count."""
    raw = json.load(gzip.open(os.path.join(RAW, RAWFILE), "rt", encoding="utf8"))["features"]
    items = [(f["properties"], clean(shape(f["geometry"]))) for f in raw]
    items = [(p, g) for p, g in items if not g.is_empty]
    # Same course twice (a relation and one of its member ways, both tagged): keep the larger outline.
    items.sort(key=lambda it: -it[1].area)
    keep = []
    for p, g in items:
        dup = next((k for k in keep if k[1].intersection(g).area > 0.8 * g.area and (not p["name"] or not k[0]["name"] or p["name"] == k[0]["name"])), None)
        if dup: continue
        if not p["name"] and any(k[0]["name"] and k[1].buffer(0.0005).intersects(g) for k in keep): continue  # an unnamed part of a named course
        keep.append((p, g))
    # Outlines under half a hectare are putting greens or mini golf tagged as courses: left out.
    keep = [(p, g) for p, g in keep if ha(g) >= 0.5]
    # One course drawn as several outlines with the same name (Quinta da Barca, Lisbon Sports Club): merged.
    merged = []
    for p, g in keep:
        twin = next((i for i, (q, h) in enumerate(merged) if p["name"] and q["name"] == p["name"] and h.distance(g) < 0.03), None)
        if twin is None: merged.append((p, g))
        else: q, h = merged[twin]; merged[twin] = (q, unary_union([h, g]))
    return merged, len(items)

def ha(g):
    """Area in hectares (equirectangular at the outline's latitude; close enough at Portugal's scale)."""
    k = math.cos(math.radians(g.representative_point().y))
    return shapely.transform(g, lambda c: c * [111.32 * k, 110.57]).area * 100

def build():
    munis = topo_features(os.path.join(PUB, "munis.topo.json"), "m")
    pars = topo_features(os.path.join(PUB, "parishes.topo.json"), "p")  # the parishes INE publishes; their height takes over from zoom 8.2
    keep, nraw = courses()
    feats, named = [], 0
    for p, g in keep:
        g2 = move(g)
        lp = polylabel(max(g2.geoms, key=lambda q: q.area) if g2.geom_type == "MultiPolygon" else g2, tolerance=0.0002)
        m = next((mp["s"] for mp, mg in munis if mg.contains(lp)), None) or min(munis, key=lambda it: it[1].distance(lp))[0]["s"]
        par = next((pp["id"] for pp, pg in pars if pg.contains(lp)), None)
        s = g2.simplify(0.00012 * (0.5 if g2 is not g else 1), preserve_topology=True)
        if s.is_empty: s = g2
        named += bool(p["name"])
        feats.append({"type": "Feature", "properties": {"n": p["name"], "m": m, **({"p": par} if par else {}), "x": round(lp.x, 4), "y": round(lp.y, 4)}, "geometry": rnd(mapping(s))})
    feats.sort(key=lambda f: (f["properties"]["m"], f["properties"]["n"]))
    out = os.path.join(PUB, "golf.geojson")
    json.dump({"type": "FeatureCollection", "attribution": "© OpenStreetMap contributors (ODbL)", "features": feats}, open(out, "w"), ensure_ascii=False, separators=(",", ":"))
    print(f"golf.geojson: {len(feats)} courses ({named} named, {len(feats) - named} unnamed), {os.path.getsize(out) // 1024} KB; dropped {nraw - len(keep)} duplicates or unnamed parts")

if __name__ == "__main__":
    if "--offline" not in sys.argv: fetch()
    build()
