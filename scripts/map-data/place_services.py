"""Prompt 81: the compact services block of a place card ("sv" in site/public/data/map/place/<slug>.json).

What the free card shows, and only this (ops/prompts/81_map_ux_cards_and_matching.md, agent 5): the nearest public
hospital with an emergency department, the nearest centro de saúde, the nearest international school, the public
secondary schools within 20 minutes, the beach, the airport, and one food line. The full lists stay in the paid analysis.

Read: content/facts/map/services/summary.json (all 308, the data engineer's table), access/schools.csv and access/food.csv
with facilities/*.csv (the nearest public secondary school and the nearest market by name: they are not in the summary),
origins.csv (the origin's display name), and, where a place has a hand-checked folder, content/facts/map/places/<slug>/.

ROLLOUT  the places whose file carries the block. Gondomar only until the operator's yes (CLAUDE.md rule 17); the roll-out
         widens this one list to every slug (ROLLOUT = None means all 308). Nothing else changes.
HAND_FIRST  the one override. True: where a hand-checked value exists for a line (the place's own folder: health.csv,
         schools.csv, routes.csv with place.json), the card shows that minute and that name, and the line is marked "h".
         False: every line comes from summary.json. The operator has not chosen between the two sources yet.
FOOD     "mich" (the Michelin count leads, the nearest market is the fallback) or "mkt" (markets only). The Michelin source
         still needs the operator's yes; the switch is this one word.

Unknown stays unknown: a null in the summary is left out of the block, never written as 0.
"""
import csv, json, os, re, unicodedata

ROLLOUT = None
HAND_FIRST = True
# The lines the override may replace. Not "er": the hand-checked health.csv files list every public hospital near a place
# and do not say which has an emergency department (Coimbra's nearest is a maternity, Valongo's and Vila do Conde's have
# none), so the emergency line always comes from the table's list of general public hospitals with one.
HAND_LINES = ("cs", "isch", "beach", "air")
FOOD = "mich"
CS_GAP = 8  # minutes: see block()
FAR = 45  # minutes: past this the sea gives way to a nearer river or lake beach (the card writer's rule, copy.md §9.5)

_cache = {}


def _rows(p):
    if not os.path.exists(p): return []
    with open(p, encoding="utf8") as f: return list(csv.DictReader(f))


def _load(root):
    if root in _cache: return _cache[root]
    base = os.path.join(root, "content", "facts", "map", "services")
    path = os.path.join(base, "summary.json")
    if not os.path.exists(path):
        _cache[root] = None
        return None
    summary = json.load(open(path, encoding="utf8"))
    names = {}
    for layer in ("schools", "food"):
        for r in _rows(os.path.join(base, "facilities", f"{layer}.csv")): names[r["id"]] = r["name"]
    near = {}  # (slug, kind) -> (minutes, facility id): the nearest by the unrounded time
    for layer, kinds in (("schools", ("sec",)), ("food", ("mkt",))):
        for r in _rows(os.path.join(base, "access", f"{layer}.csv")):
            if r["kind"] not in kinds or not r["drive_min"]: continue
            k, m = (r["slug"], r["kind"]), float(r["drive_min"])
            if k not in near or m < near[k][0]: near[k] = (m, r["facility_id"])
    origins = {r["slug"]: r for r in _rows(os.path.join(base, "origins.csv"))}
    _cache[root] = {"summary": summary, "names": names, "near": near, "origins": origins}
    return _cache[root]


def _plain(s):
    s = unicodedata.normalize("NFD", s or "")
    return re.sub(r"[^a-z0-9 ]+", " ", "".join(c for c in s if unicodedata.category(c) != "Mn").lower())


def _same(a, b):
    """The same facility under two spellings ("Deutsche Schule Porto" and "Deutsche Schule zu Porto", "Praia de Lavadores"
    and "Lavadores"): the words of one name are all in the other."""
    x, y = set(_plain(a).split()), set(_plain(b).split())
    return bool(x and y) and (x <= y or y <= x)


def _near(v, **more):
    if not v or v.get("min") is None: return None
    out = {"min": v["min"], "n": v.get("name") or ""}
    out.update({k: w for k, w in more.items() if w not in (None, "", [], False)})
    return out


def _hand(root, slug):
    """The hand-checked values of a place, per line: {line: {"min", "n"}}. Minutes rounded as place_cards.py rounds them."""
    d = os.path.join(root, "content", "facts", "map", "places", slug)
    p = os.path.join(d, "place.json")
    if not os.path.exists(p): return {}, None
    pl = json.load(open(p, encoding="utf8"))
    if "origin" not in pl: return {}, None
    mins = lambda r: round(float(r["drive_min"]))
    first = lambda rows: min(rows, key=lambda r: float(r["drive_min"])) if rows else None
    hsp, sch = _rows(os.path.join(d, "health.csv")), _rows(os.path.join(d, "schools.csv"))
    routes = {r["id"]: r for r in _rows(os.path.join(d, "routes.csv"))}
    out = {}
    er = first([r for r in hsp if r["kind"].startswith("public") and "hospital" in r["kind"]])
    cs = first([r for r in hsp if r["kind"].startswith("centro de saúde")])
    isch = first([r for r in sch if r["kind"] == "international"])
    for key, r in (("er", er), ("cs", cs), ("isch", isch)):
        if r: out[key] = {"min": mins(r), "n": r["name"]}
    for key, kind in (("beach", "beach"), ("air", "airport")):
        r = routes.get(pl.get("life", {}).get(kind, ""))
        if not r: continue
        n = pl.get("names", {}).get(r["id"], r["name"])
        out[key] = {"min": mins(r), "n": n if isinstance(n, str) else n.get("pt", r["name"])}
    dates = [r["checked_on"] for r in hsp + sch if r.get("checked_on")]
    within = lambda rows: sum(1 for r in rows if float(r["drive_min"]) <= 20)
    return out, {"d": max(dates) if dates else "", "o": pl["origin"]["name"], "ns": within(sch), "nh": within(hsp)}


def block(root, slug, force=False):
    """The services block of one place, or None (not in the roll-out, or no table). `force` is for a scratch build only."""
    if not force and ROLLOUT is not None and slug not in ROLLOUT: return None
    T = _load(root)
    s = T and T["summary"]["places"].get(slug)
    if not s: return None
    sv = {"d": T["summary"].get("checked", "")}
    o = T["origins"].get(slug)
    if o:
        # "Câmara Municipal de Gondomar, Praça Manuel Guedes" and "Vila do Corvo (centre of the seat town)": the name alone.
        sv["o"] = re.sub(r"\s*\(.*\)$", "", o["point_name"]).split(",")[0].strip()
        sv["ok"] = "hall" if o["point_kind"] == "town hall" else "center"
    if s.get("island"): sv["isl"] = s["island"]
    eea = re.search(r"EEA bathing-water status (\d{4})", (T["summary"].get("layers", {}).get("beach") or {}).get("source", ""))
    if eea: sv["eea"] = eea.group(1)  # the season of the beach categories, for the source line
    er, cs = _near(s.get("er")), _near(s.get("cs"))
    # Every seat town has a public health centre. A "nearest" one CS_GAP minutes or more from the town hall is the next
    # municipality's (Melgaço got Monção's, Oleiros got Sertã's): the seat's own is missing from OpenStreetMap. A gap
    # stays a gap: the line then reads "no figure yet" (20 places on 10 Nov 2026).
    if cs and cs.get("min") is not None and cs["min"] >= CS_GAP: cs = None
    isch = _near(s.get("isch"), cur=(s.get("isch") or {}).get("cur"))
    b = s.get("beach") or {}
    beach = _near(b, cat=b.get("cat"), flag=b.get("flag"))
    bi = s.get("beach_inland") or {}
    inland = _near(bi, cat=bi.get("cat"), flag=bi.get("flag"))
    a = s.get("air") or {}
    air = _near(a, iata=a.get("iata"))
    for key, v in (("er", er), ("cs", cs), ("isch", isch), ("beach", beach), ("bin", inland), ("air", air)):
        if v: sv[key] = v
    if s.get("isch_n30") is not None and isch: isch["n30"] = s["isch_n30"]
    # A beach with a Blue Flag within reach, when the beach shown has none (copy: services.beach.flag.other).
    bf = s.get("beach_flag") or {}
    if beach and not beach.get("flag") and bf.get("min") is not None and bf["min"] <= FAR and bf.get("id") != b.get("id"):
        sv["bflag"] = {"min": bf["min"], "n": bf.get("name") or ""}
    # Public secondary schools: the count within 20 minutes, and the nearest one by name.
    if s.get("sec_n20") is not None:
        sec = {"n20": s["sec_n20"]}
        nearest = T["near"].get((slug, "sec"))
        if nearest: sec.update({"min": round(nearest[0]), "n": T["names"].get(nearest[1], "")})
        sv["sec"] = sec
    # Food: the Michelin count within 30 minutes (FOOD = "mich"), and the nearest market within 20 minutes.
    food = s.get("food") or {}
    if FOOD == "mich" and food.get("mich_n30"):
        sv["mich"] = {"n30": food["mich_n30"], **({"star": food["mich_star_n30"]} if food.get("mich_star_n30") else {})}
    mkt = T["near"].get((slug, "mkt"))
    if mkt and mkt[0] <= 20: sv["mkt"] = {"min": round(mkt[0]), "n": T["names"].get(mkt[1], "")}
    # The one override: hand-checked minutes and names where the place has them. What the hand-checked files do not hold
    # (the curriculum, the Blue Flag, the IATA code) is kept from the table only when both name the same facility.
    hand, meta = _hand(root, slug)
    if HAND_FIRST and hand:
        for key, h in hand.items():
            if key not in HAND_LINES: continue
            old = sv.get(key) or {}
            keep = {k: v for k, v in old.items() if k not in ("min", "n")} if (key == "air" or _same(h["n"], old.get("n", ""))) else {}
            sv[key] = {**keep, **h, "h": 1}
        sv["hd"] = meta["d"]
    if meta: sv["paid"] = {"ns": meta["ns"], "nh": meta["nh"]}
    return sv
