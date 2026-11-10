"""Prompt 81, services table, step 1: read the Portugal OpenStreetMap extract once and keep only what the layers need.

Usage: python3 -I scripts/map-data/services/osm_extract.py <portugal.osm.pbf> <out_dir>
Writes <out_dir>/pois.jsonl      one line per kept object: {t: n|w|r, id, lat, lon, tags}; ways and multipolygons by their centroid
       <out_dir>/munis.jsonl     admin_level=7 boundaries (municipalities): {id, name, tags, wkb (hex)}
       <out_dir>/train_stops.json  stations served by long-distance train route relations (see KEEP_ROUTE)
       <out_dir>/seats.json      for the municipalities whose town hall OSM does not tag amenity=townhall: every object named
                                 "Câmara Municipal…" or "Paços do Concelho…", and each municipality's admin_centre node (the seat town)
With --seats-only as a third argument only seats.json is written.
Needs: pip install osmium shapely. About 3 minutes and 3 GB of memory for the 480 MB extract.
"""
import json, sys, osmium, osmium.geom
from shapely import wkb as swkb

PBF, OUT = sys.argv[1], sys.argv[2]
AMEN = {"hospital", "clinic", "doctors", "pharmacy", "school", "college", "marketplace", "restaurant", "theatre", "townhall"}
def keep(t):
    return (t.get("amenity") in AMEN or "healthcare" in t or t.get("tourism") == "museum" or t.get("aeroway") in ("aerodrome", "terminal")
            or t.get("railway") in ("station", "halt") or t.get("leisure") == "golf_course" or t.get("public_transport") == "station")

SEATS_ONLY = "--seats-only" in sys.argv
import re, unicodedata
_pl = lambda x: unicodedata.normalize("NFD", x or "").encode("ascii", "ignore").decode().lower()
def seats():
    cen, rel = {}, []
    for o in osmium.FileProcessor(PBF, osmium.osm.RELATION).with_filter(osmium.filter.KeyFilter("admin_level")):
        t = dict(o.tags)
        if t.get("boundary") == "administrative" and t.get("admin_level") == "7":
            for m in o.members:
                if m.type == "n" and m.role == "admin_centre": cen[m.ref] = {"relation": o.id, "muni": t.get("name")}
    halls = []
    for o in osmium.FileProcessor(PBF).with_locations().with_filter(osmium.filter.KeyFilter("name")):
        if o.is_relation(): continue
        n = _pl(o.tags.get("name"))
        if not re.match(r"(camara municipal|pacos do concelho|pacos do municipio|edificio dos pacos do concelho)", n): continue
        try:
            if o.is_node(): la, lo = o.location.lat, o.location.lon
            else:
                pts = [(x.lat, x.lon) for x in o.nodes if x.location.valid()]; la, lo = sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts)
        except Exception: continue
        halls.append({"t": "n" if o.is_node() else "w", "id": o.id, "lat": round(la, 6), "lon": round(lo, 6), "tags": dict(o.tags)})
    for o in osmium.FileProcessor(PBF, osmium.osm.NODE).with_filter(osmium.filter.IdFilter(list(cen))):
        cen[o.id].update({"id": o.id, "lat": round(o.location.lat, 6), "lon": round(o.location.lon, 6), "name": o.tags.get("name"), "place": o.tags.get("place")})
    json.dump({"admin_centres": list(cen.values()), "named_halls": halls}, open(f"{OUT}/seats.json", "w", encoding="utf8"), ensure_ascii=False)
    print(f"seats: {len(cen)} admin centres, {len(halls)} objects named as a town hall")
if SEATS_ONLY: seats(); sys.exit()

fab = osmium.geom.WKBFactory()
pois = open(f"{OUT}/pois.jsonl", "w", encoding="utf8"); munis = open(f"{OUT}/munis.jsonl", "w", encoding="utf8")
n = 0
fp = osmium.FileProcessor(PBF).with_locations().with_areas().with_filter(osmium.filter.KeyFilter("amenity", "healthcare", "tourism", "aeroway", "railway", "leisure", "public_transport", "boundary"))
for o in fp:
    t = dict(o.tags)
    if o.is_node():
        if keep(t) and o.location.valid():
            pois.write(json.dumps({"t": "n", "id": o.id, "lat": round(o.location.lat, 6), "lon": round(o.location.lon, 6), "tags": t}, ensure_ascii=False) + "\n"); n += 1
    elif o.is_area():
        adm = t.get("boundary") == "administrative" and t.get("admin_level") == "7"
        if not (adm or keep(t)): continue
        try: g = swkb.loads(fab.create_multipolygon(o), hex=True)
        except Exception: continue
        if adm:
            munis.write(json.dumps({"id": o.orig_id(), "name": t.get("name"), "tags": t, "wkb": g.wkb_hex}, ensure_ascii=False) + "\n")
        if keep(t):
            c = g.representative_point() if not g.contains(g.centroid) else g.centroid
            pois.write(json.dumps({"t": "w" if o.from_way() else "r", "id": o.orig_id(), "lat": round(c.y, 6), "lon": round(c.x, 6), "tags": t}, ensure_ascii=False) + "\n"); n += 1
pois.close(); munis.close()

# Long-distance trains: the stations that OSM's route relations for CP's Alfa Pendular, Intercidades and international services stop at.
KEEP_ROUTE = lambda t: t.get("route") == "train" and (t.get("service") in ("long_distance", "high_speed", "international") or any(
    k in ((t.get("name") or "") + " " + (t.get("ref") or "") + " " + (t.get("network") or "")).lower() for k in ("alfa pendular", "intercidades", "celta", "sud expresso", "lusit")))
stops, routes = {}, []
for o in osmium.FileProcessor(PBF, osmium.osm.RELATION).with_filter(osmium.filter.KeyFilter("route")):
    t = dict(o.tags)
    if not KEEP_ROUTE(t): continue
    routes.append({"id": o.id, "name": t.get("name"), "ref": t.get("ref"), "service": t.get("service"), "operator": t.get("operator")})
    for m in o.members:
        if m.type == "n" and (m.role.startswith("stop") or m.role in ("station", "halt", "")): stops.setdefault(m.ref, []).append(o.id)
nodes = {}
for o in osmium.FileProcessor(PBF, osmium.osm.NODE).with_filter(osmium.filter.IdFilter(list(stops))):
    nodes[o.id] = {"id": o.id, "lat": round(o.location.lat, 6), "lon": round(o.location.lon, 6), "tags": dict(o.tags), "routes": stops[o.id]}
json.dump({"routes": routes, "stops": list(nodes.values())}, open(f"{OUT}/train_stops.json", "w", encoding="utf8"), ensure_ascii=False)
print(f"pois {n}; long-distance route relations {len(routes)}, stop nodes {len(nodes)}")
seats()
