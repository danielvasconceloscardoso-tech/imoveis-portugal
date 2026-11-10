"""Golf mode on map v3 (prompt 78 §3 to §5): the data file the browser reads, built offline (never OSRM from the browser).

Reads
  content/facts/golf/details_courses.csv  Details' courses, verified one by one (name, holes, architect, first tee, OSM outline
                                          name, the course's own site, sources); only rows with verified=yes get a flag
  content/facts/golf/courses.csv          every course (the nearest course from a development's door)
  content/facts/golf/golf_mode_places.csv the marinas and captions golf mode may name, each with its facts.csv id
  site/public/data/map/golf.geojson       OpenStreetMap golf outlines (golf.py)
  site/public/data/map/beaches.json       the beaches already on the map
  content/facts/map/tiles/viver_aqui/sede_points.csv  town halls (the towns golf mode names on the Algarve coast)
  content/developers/projects.json        the developments on the map (partner: true)
Writes
  site/public/data/map/golf-mode.json     { courses, door, towns, caps }
  content/facts/golf/door_routes.csv      every drive time used, with its OSRM source and date (as routes.csv)

Drive times: OSRM (router.project-osrm.org, car profile, table service, OpenStreetMap data, no traffic), the router the
place cards' routes.csv uses. A destination appears in "From your door" only within MAX_MIN minutes.
Usage (repo root): python3 scripts/map-data/golf_mode.py
"""
import csv, json, math, re, sys, time, urllib.request, datetime

DET = "content/facts/golf/details_courses.csv"
ALL = "content/facts/golf/courses.csv"
PLACES = "content/facts/golf/golf_mode_places.csv"
OSM = "site/public/data/map/golf.geojson"
BEACHES = "site/public/data/map/beaches.json"
SEDE = "content/facts/map/tiles/viver_aqui/sede_points.csv"
PROJ = "content/developers/projects.json"
FACTS = "content/facts/facts.csv"
OUT = "site/public/data/map/golf-mode.json"
LOG = "content/facts/golf/door_routes.csv"
OSRM = "https://router.project-osrm.org/table/v1/driving/"
SRC = "OSRM (router.project-osrm.org, car profile), OpenStreetMap data, table service; no traffic"
MAX_MIN = 30
NEAR_MAX = 90  # a hole card names its nearest development only within an hour and a half by car
ALGARVE_TOWNS = ["lagos", "portimao", "lagoa", "albufeira", "loule", "faro", "tavira", "olhao", "vila-real-de-santo-antonio", "vila-do-bispo", "silves", "monchique"]
TODAY = datetime.date.today().isoformat()


def km(a, b): return math.hypot((a[0] - b[0]) * 111.32 * math.cos(math.radians((a[1] + b[1]) / 2)), (a[1] - b[1]) * 110.57)


def table(src, dst):
    """Minutes and km from each source to each destination ([lon, lat] lists), one OSRM table call."""
    pts = src + dst
    url = OSRM + ";".join(f"{x:.6f},{y:.6f}" for x, y in pts) + "?sources=" + ";".join(map(str, range(len(src)))) + \
        "&destinations=" + ";".join(map(str, range(len(src), len(pts)))) + "&annotations=duration,distance"
    for i in range(5):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "ImoveisPortugal-map/1.0 (ops@imoveisportugal.lu)"})
            d = json.load(urllib.request.urlopen(req, timeout=60))
            if d.get("code") == "Ok":
                time.sleep(1.1)  # the public demo server: one request a second
                return [[(None if t is None else t / 60, None if m is None else m / 1000) for t, m in zip(dr, mr)] for dr, mr in zip(d["durations"], d["distances"])]
        except Exception as e:  # noqa: BLE001
            print("  OSRM retry", i + 1, e, file=sys.stderr)
        time.sleep(3 * (i + 1))
    raise SystemExit("OSRM unreachable")


def mins(m): return max(1, round(m))


def dedupe(src):
    """One line per source title (two releases from the same publisher are one source line, its first link)."""
    seen, out = set(), []
    for x in src:
        if x["t"] in seen: continue
        seen.add(x["t"]); out.append(x)
    return out


facts = {r["id"]: r for r in csv.DictReader(open(FACTS, encoding="utf-8"))}
det = [r for r in csv.DictReader(open(DET, encoding="utf-8")) if r.get("verified", "").strip().lower() == "yes"]
allc = [r for r in csv.DictReader(open(ALL, encoding="utf-8")) if r["status"] == "open"]
places = list(csv.DictReader(open(PLACES, encoding="utf-8")))
osm = json.load(open(OSM))["features"]
beaches = json.load(open(BEACHES))
projects = [p for p in json.load(open(PROJ))["projects"] if p.get("partner") is True and not p.get("pending")]  # a pending partner is off the site
sede = {r["muni_slug"]: r for r in csv.DictReader(open(SEDE, encoding="utf-8"))}
for p in places:
    if p.get("fact") and p["fact"] not in facts: raise SystemExit(f"{PLACES}: {p['id']} cites {p['fact']}, not in facts.csv")

log = []
# 1. Details' courses: the outline (OpenStreetMap, by its name there), the minutes from the nearest development.
courses = []
dev_pts = [[p["lon"], p["lat"]] for p in projects]
tees = [[float(r["tee_lon"]), float(r["tee_lat"])] for r in det]
tt = table(tees, dev_pts) if tees else []
for i, r in enumerate(det):
    names = [n.strip() for n in r["osm_name"].split("|") if n.strip()]
    geo = [f["geometry"] for f in osm if f["properties"].get("n") in names]
    if names and not geo: raise SystemExit(f"{DET}: no OpenStreetMap outline named {names} in {OSM}")
    best = min(((t[0], j) for j, t in enumerate(tt[i]) if t[0] is not None), default=None)
    near = None
    if best and best[0] <= NEAR_MAX:
        p = projects[best[1]]
        near = {"id": p["id"], "name": p["name"], "min": mins(best[0])}
    # Every development within an hour by car, nearest first: the hole card and the homes' "From your door" share them.
    devs = sorted(({"id": projects[j]["id"], "name": projects[j]["name"], "min": mins(t[0])} for j, t in enumerate(tt[i]) if t[0] is not None and t[0] <= 60), key=lambda d: d["min"])
    for d in devs:
        j = next(k for k, pp in enumerate(projects) if pp["id"] == d["id"])
        log.append([r["id"], "course→development", d["id"], d["name"], r["tee_lat"], r["tee_lon"], projects[j]["lat"], projects[j]["lon"], f"{tt[i][j][0]:.1f}", f"{tt[i][j][1]:.1f}", SRC, TODAY])
    polys = []
    for g in geo: polys += g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    rnd = lambda ring: [[round(x, 5), round(y, 5)] for x, y in ring]
    courses.append({"id": r["id"], "n": re.sub(r"\s*\(.*\)$", "", r["name"]), "short": r.get("short") or r["name"], "resort": r.get("resort", ""), "grp": r.get("group", ""),
        "holes": int(r["holes"]) if r["holes"].strip() else None, "arch": r["architect"], "x": float(r["tee_lon"]), "y": float(r["tee_lat"]),
        "tee": r.get("tee_kind", "tee"), "url": r["url"], "photo": r.get("photo", ""), "credit": r.get("photo_credit", ""),
        "fact": r.get("fact", ""), "note": r.get("note", ""), "src": dedupe([{"t": t.strip(), "u": u.strip()} for t, u in zip(r["source_titles"].split("|"), r["source_urls"].split("|")) if u.strip()]),
        "near": near, "devs": devs, "outline": {"type": "MultiPolygon", "coordinates": [[rnd(ring) for ring in poly] for poly in polys]} if polys else None})

# 2. "From your door": the nearest course, beach and marina from each development, by car.
door = {}
marinas = [p for p in places if p["kind"] == "marina"]
for p in projects:
    o = [p["lon"], p["lat"]]
    cand = []
    # Details' courses by their first tee; every other open course by its point in courses.csv.
    dn = {c["n"] for c in courses}
    for c in courses: cand.append(("course", c["n"], c["short"], [c["x"], c["y"]], c["id"]))
    for c in allc:
        if c["name"] in dn or any(c["name"].startswith(x) for x in dn): continue
        if c["latitude"] and c["longitude"]: cand.append(("course", c["name"], c["name"], [float(c["longitude"]), float(c["latitude"])], ""))
    for x, y, n in beaches: cand.append(("beach", n, n, [x, y], ""))
    for m in marinas: cand.append(("marina", m["name"], m["short"], [float(m["lon"]), float(m["lat"])], m["id"]))
    rows = []
    for kind in ("course", "beach", "marina"):
        k = sorted((c for c in cand if c[0] == kind), key=lambda c: km(o, c[3]))[:5]
        k = [c for c in k if km(o, c[3]) < 40]
        if not k: continue
        t = table([o], [c[3] for c in k])[0]
        best = min(((v[0], j) for j, v in enumerate(t) if v[0] is not None), default=None)
        if not best or best[0] > MAX_MIN: continue
        c = k[best[1]]
        log.append([p["id"], f"development→{kind}", c[4] or c[1], c[1], p["lat"], p["lon"], c[3][1], c[3][0], f"{best[0]:.1f}", f"{t[best[1]][1]:.1f}", SRC, TODAY])
        rows.append({"k": kind, "n": c[2], "id": c[4], "min": mins(best[0]), "tee": kind == "course" and any(cc["id"] == c[4] and cc["tee"] == "tee" for cc in courses)})
    door[p["id"]] = rows

# 3. The towns golf mode names (their town halls) and the captions (each with its facts.csv source).
towns = [[sede[s]["muni_name"], float(sede[s]["lon"]), float(sede[s]["lat"])] for s in ALGARVE_TOWNS if s in sede]
towns += [[p["name"], float(p["lon"]), float(p["lat"])] for p in places if p["kind"] == "town"]
caps = []
for p in places:
    if p["kind"] in ("beach", "marina") and p.get("caption_en"):
        f = facts[p["fact"]]
        caps.append({"id": p["id"], "n": p["short"], "x": float(p["lon"]), "y": float(p["lat"]), "cap": {l: p[f"caption_{l}"] for l in ("pt", "en", "fr")},
            "src": {"t": f["source_title"], "u": f["source_url"]}})

# 4. The golf list's ids of Details' courses (map-v3's own golf layer leaves them to golf mode), and the glints: light on
#    the water just off the south coast's beaches (decoration, not geography: nothing is named or counted from them).
glist = json.load(open("site/public/data/map/golf.json"))["courses"]
names = {r["golf_list"] for r in det if r.get("golf_list")}
gids = sorted(g["id"] for g in glist if g["n"] in names)
if len(gids) != len(names): raise SystemExit(f"{DET}: golf_list names not all in golf.json: {names - {g['n'] for g in glist}}")
import random
rnd = random.Random(78)
glints = []
for x, y, n in beaches:
    if -8.95 < x < -7.42 and 36.9 < y < 37.13:
        for _ in range(2): glints.append([round(x + rnd.uniform(-0.012, 0.012), 5), round(y - rnd.uniform(0.004, 0.05), 5), round(rnd.uniform(0.5, 1.0), 2)])

json.dump({"_how": "scripts/map-data/golf_mode.py (prompt 78); drive times: content/facts/golf/door_routes.csv", "checked": TODAY,
    "courses": courses, "gids": gids, "glints": glints, "door": door, "towns": towns, "caps": caps}, open(OUT, "w"), ensure_ascii=False, separators=(",", ":"))
with open(LOG, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f); w.writerow(["from_id", "kind", "to_id", "to_name", "from_lat", "from_lon", "to_lat", "to_lon", "drive_min", "drive_km", "source", "checked_on"]); w.writerows(log)
print(f"{OUT}: {len(courses)} courses (golf list ids {gids}), {len(glints)} glints, door for {len(door)} developments, {len(towns)} towns, {len(caps)} captions")
for p, rows in door.items(): print(" ", p, " · ".join(f"{r['n']} {r['min']} min" for r in rows))
for c in courses: print(" ", c["n"], "←", c["near"])
