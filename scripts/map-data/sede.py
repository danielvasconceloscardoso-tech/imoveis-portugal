"""p70 round 3 (J72-01, M72-06): the card's straight-line distances (the sea, the airport) are measured from the town, the
sede de concelho (the town hall, OpenStreetMap amenity=townhall), not from the middle of the municipality (Loulé's middle is
in the hills, 17 km from the sea; Lagos and Albufeira are on it).

Reads  content/facts/map/tiles/viver_aqui/sede_points.csv        one town hall per municipality (sede_fetch below)
       content/facts/map/tiles/viver_aqui/apa_bathing_waters_2026.csv  APA bathing waters ("coastal" = sea, see SOURCES.md)
       content/facts/map/tiles/viver_aqui/airports.csv            the airports (LIS, OPO, FAO, FNC, PDL)
Writes content/facts/map/tiles/viver_aqui/viver_aqui_municipality.csv: point_lat/point_lon become the town hall, and the
       nearest sea bathing water and airport with their km are measured again from it. A municipality without a checked
       town hall keeps its row but loses both distances (the card then leaves those lines out; the old figures stay in git).
Then run scripts/map-data/tiles.py to rebuild the map's files.

Usage (repo root): python3 scripts/map-data/sede.py
       python3 scripts/map-data/sede.py --fetch nominatim.jsonl   build sede_points.csv from saved Nominatim answers (comma-separated
       files, one JSON line per municipality: {slug, dico, name, res: [Nominatim jsonv2 results for "Câmara Municipal de <name>"]})
"""
import csv, json, math, os, re, sys, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
VA = os.path.join(ROOT, "content", "facts", "map", "tiles", "viver_aqui")
MUNI = os.path.join(VA, "viver_aqui_municipality.csv")
SEDE = os.path.join(VA, "sede_points.csv")
plain = lambda s: unicodedata.normalize("NFD", s).encode("ascii", "ignore").decode().lower()

def km(a, b, c, d):
    p1, p2, dl, dn = math.radians(a), math.radians(c), math.radians(c - a), math.radians(d - b)
    h = math.sin(dl / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dn / 2) ** 2
    return 6371.0088 * 2 * math.asin(math.sqrt(h))

rows = list(csv.DictReader(open(MUNI, encoding="utf8")))

if "--fetch" in sys.argv:
    # A town hall counts when OSM tags it amenity=townhall, its name or address names the municipality, it is not a parish
    # council (junta de freguesia), and it lies within 40 km of the municipality's point (a check against same-name towns).
    got = {}
    for fn in sys.argv[sys.argv.index("--fetch") + 1].split(","):  # several passes: each later file adds its answers
        for l in open(fn, encoding="utf8"): d = json.loads(l); got.setdefault(d["slug"], {"res": []})["res"] += d["res"]
    out = []
    for r in rows:
        g = got.get(r["muni_slug"]); best = None
        for x in (g or {}).get("res", []):
            nm, base = plain(x.get("name") or ""), plain(re.sub(r"\s*\(.*\)", "", r["muni_name"]))
            ad = x.get("address") or {}; town = plain(ad.get("municipality") or ad.get("city") or ad.get("town") or "")
            if x.get("type") != "townhall" or "junta" in nm or "freguesia" in nm or not (base in nm or town == base): continue
            d = km(float(r["point_lat"]), float(r["point_lon"]), float(x["lat"]), float(x["lon"]))
            if d > 40: continue
            score = (0 if ("camara municipal" in nm or "pacos do concelho" in nm or "municipio" in nm) else 1, d)
            if not best or score < best[0]: best = (score, x)
        if best:
            x = best[1]
            out.append({"muni_dico": r["muni_dico"], "muni_slug": r["muni_slug"], "muni_name": r["muni_name"], "lat": round(float(x["lat"]), 5), "lon": round(float(x["lon"]), 5),
                        "osm_name": x.get("name") or "", "osm_object": f"{x.get('osm_type')}/{x.get('osm_id')}", "source": "OpenStreetMap (Nominatim), amenity=townhall, 2026-11-04"})
    with open(SEDE, "w", encoding="utf8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(out[0])); w.writeheader(); w.writerows(out)
    print(f"sede_points.csv: {len(out)} of {len(rows)} municipalities; without a checked town hall: {sorted(r['muni_name'] for r in rows if r['muni_slug'] not in {o['muni_slug'] for o in out})}")
    sys.exit()

sede = {r["muni_slug"]: r for r in csv.DictReader(open(SEDE, encoding="utf8"))}
bw = [r for r in csv.DictReader(open(os.path.join(VA, "apa_bathing_waters_2026.csv"), encoding="utf8")) if r["coastal"] == "True"]
used = {r["nearest_pt_airport"] for r in rows if r["nearest_pt_airport"]}
ap = [a for a in csv.DictReader(open(os.path.join(VA, "airports.csv"), encoding="utf8")) if a["iata"] in used]
REG_AP = {"madeira": {"FNC"}, "azores": {"PDL"}}
moved = []
for r in rows:
    s = sede.get(r["muni_slug"])
    if not s:
        for k in ("nearest_sea_bathing_water", "km_straight_line_to_sea_bathing_water", "nearest_pt_airport", "km_straight_line_to_airport"): r[k] = ""
        continue
    la, lo = float(s["lat"]), float(s["lon"])
    b = min((x for x in bw if x["region"] == r["region"]), key=lambda x: km(la, lo, float(x["lat"]), float(x["lon"])))
    a = min((x for x in ap if x["iata"] in REG_AP.get(r["region"], used - {"FNC", "PDL"})), key=lambda x: km(la, lo, float(x["lat"]), float(x["lon"])))
    old = r["km_straight_line_to_sea_bathing_water"]
    r["point_lat"], r["point_lon"] = f"{la:.5f}", f"{lo:.5f}"
    r["nearest_sea_bathing_water"], r["km_straight_line_to_sea_bathing_water"] = b["name"], f"{km(la, lo, float(b['lat']), float(b['lon'])):.1f}"
    r["nearest_pt_airport"], r["km_straight_line_to_airport"] = a["iata"], f"{km(la, lo, float(a['lat']), float(a['lon'])):.1f}"
    moved.append((r["muni_name"], old, r["km_straight_line_to_sea_bathing_water"]))
with open(MUNI, "w", encoding="utf8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
print(f"viver_aqui_municipality.csv: {len(moved)} measured from the town hall, {len(rows) - len(moved)} without distances")
