"""Golden sample place cards (operator's step 1, 3 Nov 2026): one folder per place in content/facts/map/places/<slug>/.

Files read (all checked at their sources on the date in each row; SOURCES.md in the folder says how):
  place.json   origin point, one line about life there (PT, EN, FR), photographs (hero first), which beach, city and airport
               the card names, flights per edition (facts.csv ids: published scheduled block times)
  routes.csv   OSRM drive times (router.project-osrm.org, OpenStreetMap data) from the origin to every point
  schools.csv  schools within 20 minutes by car (DGEEC InfoEscolas and each school's own site); card=1 on the free card
  health.csv   hospitals and health centres within 20 minutes by car (ERS public registry); card=1 on the free card,
               card_note: a small line under the name ("@cs" = the deck's "centro de saúde", or the operator's brand)

build(ROOT, out) returns {slug: {"free": ..., "paid": ...}}:
  free  what the free card shows: the line, the photographs, three drive times, the flight, the main schools and health
        services (name and minutes), and the dated sources behind "Fontes"
  paid  the full lists (every school and health service within 20 minutes, every beach checked), for the paid analysis
Minutes are rounded to the nearest minute. Nothing is estimated: a place without a folder keeps its current tiles.
"""
import csv, json, os

MAX_MIN = 20


def _rows(p):
    if not os.path.exists(p): return []
    with open(p, encoding="utf8") as f: return list(csv.DictReader(f))


def _facts(root):
    with open(os.path.join(root, "content", "facts", "facts.csv"), encoding="utf8") as f:
        return {r["id"]: r for r in csv.DictReader(f)}


def build(root, out):
    base = os.path.join(root, "content", "facts", "map", "places")
    if not os.path.isdir(base): return {}
    facts = _facts(root)
    cards = {}
    for slug in sorted(os.listdir(base)):
        d = os.path.join(base, slug)
        if slug not in out["m"] or not os.path.exists(os.path.join(d, "place.json")): continue
        pl = json.load(open(os.path.join(d, "place.json"), encoding="utf8"))
        routes = {r["id"]: r for r in _rows(os.path.join(d, "routes.csv"))}
        mins = lambda r: round(float(r["drive_min"]))
        life = []
        for kind in ("beach", "city", "airport"):
            r = routes.get(pl["life"][kind])
            # A name is a string, or {pt, en, fr} where it reads differently per language (the airport).
            if r: life.append([kind, pl["names"].get(r["id"], r["name"]), mins(r)])
        fl = {}
        for ed, f in pl.get("flights", {}).items():
            fact = facts.get(f["fact"])
            if not fact: continue  # only a published timetable in facts.csv, never a guess
            fl[ed] = {"min": f["min"], "from": f["from"], "to": f["to"], **({"via": f["via"]} if f.get("via") else {}), "d": fact["checked_on"], "u": fact["source_url"]}
        sch = [r for r in _rows(os.path.join(d, "schools.csv")) if float(r["drive_min"]) <= MAX_MIN]
        hsp = [r for r in _rows(os.path.join(d, "health.csv")) if float(r["drive_min"]) <= MAX_MIN]
        sch.sort(key=lambda r: float(r["drive_min"])); hsp.sort(key=lambda r: float(r["drive_min"]))
        checked = max([r["checked_on"] for r in sch + hsp] + [r["checked_on"] for r in routes.values()] or [""])
        free = {
            "line": pl["line"], "ph": pl["photos"], "life": life, "fl": fl,
            "sch": [[r["name"], mins(r)] for r in sch if r["card"] == "1"],
            # A small note under the name: "@cs" is the deck's "centro de saúde" (card5.tag.cs), else the operator (Trofa Saúde).
            "hsp": [[r["name"], mins(r)] + ([r["card_note"]] if r.get("card_note") else []) for r in hsp if r["card"] == "1"],
            "o": pl["origin"]["name"], "d": checked,
        }
        beaches = sorted((r for r in routes.values() if r["kind"] == "beach"), key=lambda r: float(r["drive_min"]))
        paid = {
            "o": pl["origin"], "d": checked,
            "sch": [{"n": r["name"], "k": r["kind"], "c": r["curriculum"], "m": r["municipality"], "min": mins(r), "km": float(r["drive_km"]), "src": r["dgeec_infoescolas"], "u": r["school_site"]} for r in sch],
            "hsp": [{"n": r["name"], "k": r["kind"], "op": r["operator"], "a": r["address"], "min": mins(r), "km": float(r["drive_km"]), "src": r["registry"]} for r in hsp],
            "bch": [{"n": r["name"], "min": mins(r), "km": float(r["drive_km"])} for r in beaches],
        }
        cards[slug] = {"free": free, "paid": paid}
    return cards
