"""Prompt 33 §4.2: "The golf premium", parish median vs municipality median, from official data only.

Which parishes have golf: the OpenStreetMap golf outlines (golf.py, raw/osm-golf.geojson.gz) intersected with the
OpenStreetMap parish boundaries matched to INE codes (raw/osm-freguesias.geojson.gz, as build.py). A parish counts as a
golf parish when it holds at least 10 ha of a course or a quarter of one. Prices: INE median value per m² of family
dwellings sold in the last 12 months (indicator 0012234, all dwellings), as built into site/public/data/prices.json
(concelhos, 2016-Q1 to the latest quarter, Metodologia 2018 to 2019-Q3) and site/public/data/map/parishes.json
(parishes, from 2019-Q4: INE publishes parish medians only under Metodologia 2022, and only where enough sales).

Writes content/data/golf-premium.json. The method and the reading rules are in content/data/GOLF_PREMIUM.md.
Usage (repo root, after build.py and golf.py): python3 scripts/map-data/golf_premium.py
"""
import gzip, json, os, re, sys, unicodedata
from collections import defaultdict
from shapely.geometry import shape

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from golf import courses, clean, ha, RAW, PUB, ROOT  # noqa: E402

prices = json.load(open(os.path.join(PUB, "..", "prices.json")))
pdata = json.load(open(os.path.join(PUB, "parishes.json")))
Q = prices["quarters"]; assert pdata["quarters"] == Q
LAST = len(Q) - 1
Q19, Q10 = Q.index("2019-Q4"), Q.index(f"{int(Q[LAST][:4]) - 10}-{Q[LAST][5:]}")
plain = lambda s: unicodedata.normalize("NFD", s or "").encode("ascii", "ignore").decode().lower().strip()
slug_of = {v["n"]: k for k, v in prices["munis"].items()}

# Parish boundaries (true coordinates), for the parishes INE publishes.
osm = json.load(gzip.open(os.path.join(RAW, "osm-freguesias.geojson.gz"), "rt", encoding="utf8"))["features"]
pgeom = {}
for f in osm:
    code = f["properties"]["tags"].get("ref:ine")
    if code in pdata["parishes"] and code not in pgeom: pgeom[code] = clean(shape(f["geometry"]))
PRACTICE = re.compile(r"driving range|pitch|academ|pr[aá]ticas|putting", re.I)

def chg(a, i, j):
    return round((a[j] / a[i] - 1) * 100, 1) if a[i] and a[j] else None

keep, _ = courses()
by_par, placed = defaultdict(list), set()
for p, g in keep:
    total = ha(g)
    for code, pg in pgeom.items():
        if not pg.intersects(g): continue
        part = ha(pg.intersection(g))
        if part >= 10 or part >= 0.25 * total:
            by_par[code].append({"course": p["name"] or None, "osm": p["id"], "ha_in_parish": round(part, 1), "share": round(part / total, 2)}); placed.add(p["id"])

rows = []
for code, cs in sorted(by_par.items()):
    s = pdata["parishes"][code]; m = prices["munis"][s["m"]]
    pv, mv = s["m2"][LAST], m["m2"][LAST]
    rows.append({
        "parish": s["n"], "parish_code": code, "municipality": m["n"], "municipality_slug": s["m"], "region": m["r"],
        "quarter": Q[LAST],
        "parish_median_eur_m2": pv, "municipality_median_eur_m2": mv,
        "ratio": round(pv / mv, 2) if pv and mv else None,
        **({} if pv else {"note": f"INE publishes no parish figure for {Q[LAST]} (too few sales); not compared"}),
        "parish_change_since_2019q4_pct": chg(s["m2"], Q19, LAST), "municipality_change_since_2019q4_pct": chg(m["m2"], Q19, LAST),
        "parish_change_10y_pct": None, "municipality_change_10y_pct": chg(m["m2"], Q10, LAST),
        "courses": sorted(cs, key=lambda c: -c["ha_in_parish"]),
        # A parish whose only golf is a driving range, an academy or a pitch & putt is kept but flagged.
        "full_course": any(not PRACTICE.search(c["course"] or "") for c in cs),
        "source_ids": ["ine-m2-2026q2", "ine-m2-history", "osm-boundaries"],
    })
rows.sort(key=lambda r: (r["region"] != "algarve", r["municipality"], -(r["ratio"] or 0)))

# Concelhos with golf where INE publishes no parish figures: listed, not compared.
golf_map = json.load(open(os.path.join(PUB, "golf.geojson")))["features"]
count = defaultdict(int)
for f in golf_map: count[f["properties"]["m"]] += 1
has_par = set(prices["parishMunis"])
nopar = [{"municipality": prices["munis"][k]["n"], "municipality_slug": k, "courses": n, "municipality_median_eur_m2": prices["munis"][k]["m2"][LAST],
          "municipality_change_10y_pct": chg(prices["munis"][k]["m2"], Q10, LAST)} for k, n in sorted(count.items()) if k not in has_par]

# Concelhos INE publishes some parishes for, but not the parish of these courses (e.g. Sintra's, Silves' Alcantarilha e Pêra).
gm = {f["properties"]["n"]: f["properties"]["m"] for f in golf_map}
unpub = sorted(({"course": p["name"] or None, "osm": p["id"], "municipality": prices["munis"][gm.get(p["name"], "")]["n"] if gm.get(p["name"]) in prices["munis"] else None}
                for p, g in keep if p["id"] not in placed and gm.get(p["name"]) in has_par and p["name"]), key=lambda x: (x["municipality"] or "", x["course"]))

out = {
    "title": "The golf premium: parish median vs municipality median",
    "label": "parish median vs municipality median",
    "measure": "INE median value per m² of family dwellings sold in the last 12 months (all dwellings, €/m²)",
    "quarter": Q[LAST], "ten_years_from": Q[Q10], "parish_series_from": "2019-Q4",
    "notes": [
        "Comparison only, never causation: a parish with golf courses can differ from its municipality for many reasons (coast, housing type, size of homes, who buys).",
        "INE publishes parish medians only from 2019-Q4 (Metodologia 2022) and only for parishes with enough sales; there is no 10-year parish figure, so parish_change_10y_pct is null and both changes are also given from 2019-Q4 on the same method.",
        "The municipality's 10-year change joins Metodologia 2018 (indicator 0009490, to 2019-Q3) and Metodologia 2022 (0012234, from 2019-Q4), as on the map's charts.",
        "full_course = false marks a parish whose only golf facility is a driving range, an academy or a pitch & putt (by its OSM name).",
        "Golf parishes: OpenStreetMap leisure=golf_course outlines intersecting the parish boundary by at least 10 ha or a quarter of the course.",
    ],
    "sources": {"ine-m2-2026q2": "INE 0012234, latest quarter", "ine-m2-history": "INE 0009490 and 0012234, 2016 to 2026",
                "osm-boundaries": "parish boundaries, © OpenStreetMap contributors (ODbL)",
                "osm-golf": "golf courses, OpenStreetMap leisure=golf_course, © OpenStreetMap contributors (ODbL), https://www.openstreetmap.org/copyright (fact id proposed, not yet in facts.csv)"},
    "parishes": rows,
    "municipalities_without_parish_data": nopar,
    "courses_in_unpublished_parishes": unpub,
}
os.makedirs(os.path.join(ROOT, "content", "data"), exist_ok=True)
json.dump(out, open(os.path.join(ROOT, "content", "data", "golf-premium.json"), "w"), ensure_ascii=False, indent=1)
for r in rows: print(f"{r['parish'][:42]:42} {r['municipality']:12} {r['parish_median_eur_m2']!s:>6} {r['municipality_median_eur_m2']!s:>6} {r['ratio']!s:>5}  {r['parish_change_since_2019q4_pct']!s:>6} {r['municipality_change_since_2019q4_pct']!s:>6} {r['municipality_change_10y_pct']!s:>6}  {len(r['courses'])}")
print("no parish data:", ", ".join(f"{x['municipality']} ({x['courses']})" for x in nopar))
