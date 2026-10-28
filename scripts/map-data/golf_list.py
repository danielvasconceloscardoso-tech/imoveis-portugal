"""Golf on map v3 from our own list (prompt 36 §9, D62).

content/facts/golf/courses.csv is the source of truth (Federação Portuguesa de Golfe, official course and resort sites,
Visit Algarve, developers' releases; coordinates from Nominatim or the resort, never Google). OpenStreetMap only adds
the outline where it has one: an OSM leisure=golf_course polygon (site/public/data/map/golf.geojson, golf.py) is kept
when it lies at a course's point or shares a word of its name nearby. Courses without an outline appear as a pin.
Madeira and the Azores are moved and scaled like the rest of the map (build.py INSET).

Output: site/public/data/map/golf.json = { courses: [...], outlines: FeatureCollection } and a short report.
Usage (repo root): python3 scripts/map-data/golf_list.py
"""
import csv, json, math, re, unicodedata

CSV = "content/facts/golf/courses.csv"
OSM = "site/public/data/map/golf.geojson"
TOPO = "site/public/data/map/munis.topo.json"
OUT = "site/public/data/map/golf.json"
INSET = {"madeira": dict(c=(-16.95, 32.75), to=(-10.75, 37.55), s=0.5, bb=(-17.4, 32.3, -16.1, 33.2)),
         "azores": dict(c=(-28.0, 38.6), to=(-11.35, 39.95), s=0.28, bb=(-31.5, 36.8, -24.8, 39.9))}
STOP = {"golf", "club", "course", "campo", "de", "do", "da", "dos", "das", "the", "and", "e", "resort", "country", "championship", "links"}

def plain(s): return unicodedata.normalize("NFD", s or "").encode("ascii", "ignore").decode().lower()
def words(s): return {w for w in re.findall(r"[a-z0-9]+", plain(s)) if w not in STOP and len(w) > 2}
def moved(lon, lat):
    for t in INSET.values():
        b = t["bb"]
        if b[0] <= lon <= b[2] and b[1] <= lat <= b[3]:
            (cx, cy), (tx, ty), s = t["c"], t["to"], t["s"]
            return round((lon - cx) * s + tx, 5), round((lat - cy) * s + ty, 5)
    return lon, lat
def km(a, b): return math.hypot((a[0] - b[0]) * 111.32 * math.cos(math.radians(a[1])), (a[1] - b[1]) * 110.57)

topo = json.load(open(TOPO))
slug = {plain(g["properties"]["n"]): g["properties"]["s"] for g in topo["objects"]["m"]["geometries"]}
# Names shared by the islands (Calheta, Lagoa): "Calheta (R.A.M.)" and "Calheta (R.A.A.)"; take the one nearest the course.
base = {}
for g in topo["objects"]["m"]["geometries"]:
    base.setdefault(plain(g["properties"]["n"]).split(" (")[0], []).append(g["properties"])
osm = json.load(open(OSM))["features"]
rows = list(csv.DictReader(open(CSV, encoding="utf-8")))
courses, outlines, used, report = [], [], set(), []
for i, r in enumerate(rows):
    lat, lon = float(r["latitude"]), float(r["longitude"])
    x, y = moved(lon, lat)
    m = slug.get(plain(r["municipality"]))
    if not m and base.get(plain(r["municipality"])):
        m = min(base[plain(r["municipality"])], key=lambda q: km((q["x"], q["y"]), (x, y)))["s"]
    if not m: report.append(f"no municipality match: {r['name']} ({r['municipality']})")
    cw = words(r["name"]) | words(r["resort"])
    hits = []
    for j, f in enumerate(osm):
        if j in used: continue
        p = f["properties"]; d = km((p["x"], p["y"]), (x, y))
        if d < 1.2 or (d < 3 and cw & words(p.get("n", ""))): hits.append((d, j))
    hits.sort()
    keep = [j for d, j in hits[:2]] if r.get("status", "open") == "open" else []
    for j in keep:
        used.add(j); f = osm[j]; outlines.append({"type": "Feature", "properties": {"c": i}, "geometry": f["geometry"]})
    holes = r["holes"].strip()
    courses.append({"id": i, "n": r["name"].strip(), "resort": r["resort"].strip(), "m": m or "", "holes": int(holes) if holes.isdigit() else None,
                    "designer": r["designer"].strip(), "year": r["opening_year"].strip(), "status": (r.get("status") or "open").strip(),
                    "url": r["official_website"].strip(), "x": x, "y": y, "outline": bool(keep)})
json.dump({"courses": courses, "outlines": {"type": "FeatureCollection", "features": outlines}}, open(OUT, "w"), ensure_ascii=False, separators=(",", ":"))
print(f"{len(courses)} courses, {sum(c['outline'] for c in courses)} with an OSM outline, {len(courses) - sum(c['outline'] for c in courses)} as pins, "
      f"{sum(c['status'] != 'open' for c in courses)} under construction; {len(osm) - len(used)} OSM shapes not in the list (dropped)")
for line in report: print(" ", line)
