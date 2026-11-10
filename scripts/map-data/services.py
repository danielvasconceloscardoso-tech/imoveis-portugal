"""Prompt 81: the services table behind every municipality card (schools, hospitals, beach, airport, train, food, golf, culture).

Steps (repo root; SCRATCH is a folder outside the repo with about 3 GB free, see content/facts/map/services/README.md):
  1. download the Portugal OpenStreetMap extract to SCRATCH/osm/portugal.osm.pbf
  2. python3 -I scripts/map-data/services/osm_extract.py SCRATCH/osm/portugal.osm.pbf SCRATCH/work     (OSM objects the layers need)
  3. scripts/map-data/services/osrm_prepare.sh SCRATCH                                                  (local routing graph)
  4. python3 scripts/map-data/services.py facilities --scratch SCRATCH    origins.csv, facilities/*.csv, SCRATCH/work/route_in.json
  5. LD_LIBRARY_PATH=SCRATCH/tools/tbb/tbb-2022.1.0.data/data/lib node scripts/map-data/services/route.cjs SCRATCH
  6. python3 scripts/map-data/services.py summary --scratch SCRATCH [--only slug,slug]    access/*.csv, summary.json

Inputs kept in the repo (content/facts/map/services/inputs/, each with its source in the README): the hospital lists, the
international-school list, the Blue Flag 2026 list, the Michelin Guide selection, the EEA bathing-water categories, the 2021 census.
Nothing is estimated: a time is an OSRM road time or it is null.
"""
import csv, json, math, os, re, sys, unicodedata, collections

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SV = os.path.join(ROOT, "content", "facts", "map", "services")
INP = os.path.join(SV, "inputs")
VA = os.path.join(ROOT, "content", "facts", "map", "tiles", "viver_aqui")
CHECKED = "2026-11-10"
OSM_SRC = "OpenStreetMap (Portugal extract of 2026-11-08, download.openstreetmap.fr)"
ODBL = "ODbL 1.0, © OpenStreetMap contributors"
arg = lambda k, d=None: sys.argv[sys.argv.index(k) + 1] if k in sys.argv else d
SCRATCH = arg("--scratch")
plain = lambda s: re.sub(r"[^a-z0-9]+", " ", unicodedata.normalize("NFD", s or "").encode("ascii", "ignore").decode().lower()).strip()
slugify = lambda s: plain(s).replace(" ", "-")
rd = lambda p: list(csv.DictReader(open(p, encoding="utf8")))

def km(a, b, c, d):
    p1, p2, dl, dn = math.radians(a), math.radians(c), math.radians(c - a), math.radians(d - b)
    return 6371.0088 * 2 * math.asin(math.sqrt(math.sin(dl / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dn / 2) ** 2))

def in_portugal(la, lo):
    return (36.8 < la < 42.2 and -9.6 < lo < -6.1) or (32.3 < la < 33.2 and -17.4 < lo < -16.2) or (36.8 < la < 39.8 and -31.4 < lo < -24.9)

# ---------------------------------------------------------------- the 308 municipalities and their OpenStreetMap boundaries
MUNI = rd(os.path.join(VA, "viver_aqui_municipality.csv"))
SLUGS = sorted(f[:-5] for f in os.listdir(os.path.join(ROOT, "site", "public", "data", "map", "place")))
assert len(SLUGS) == 308 and {r["muni_slug"] for r in MUNI} == set(SLUGS)
NAME = {r["muni_slug"]: r["muni_name"] for r in MUNI}
ISLAND = {"vila-do-porto": "Santa Maria", "ponta-delgada": "São Miguel", "ribeira-grande": "São Miguel", "lagoa-r-a-a": "São Miguel", "vila-franca-do-campo": "São Miguel", "povoacao": "São Miguel",
          "nordeste": "São Miguel", "angra-do-heroismo": "Terceira", "vila-da-praia-da-vitoria": "Terceira", "santa-cruz-da-graciosa": "Graciosa", "velas": "São Jorge", "calheta-r-a-a": "São Jorge",
          "madalena": "Pico", "sao-roque-do-pico": "Pico", "lajes-do-pico": "Pico", "horta": "Faial", "santa-cruz-das-flores": "Flores", "lajes-das-flores": "Flores", "corvo": "Corvo", "porto-santo": "Porto Santo"}

# sede_points.csv holds, for Lisboa, the municipal services building at Campo Grande (OSM way/243539796, also named "Câmara Municipal de Lisboa").
# The town hall is the Paços do Concelho at Praça do Município.
ORIGIN_OVERRIDE = {"lisboa": (38.70819, -9.13861, "Câmara Municipal de Lisboa (Paços do Concelho, Praça do Município)",
                              "OpenStreetMap way/95417254 (amenity=townhall, extract of 2026-11-08); replaces the Campo Grande services building held in sede_points.csv")}

def load_boundaries():
    from shapely import wkb, STRtree
    from shapely.geometry import Point
    polys = [json.loads(l) for l in open(os.path.join(SCRATCH, "work", "munis.jsonl"), encoding="utf8")]
    geoms = [wkb.loads(p["wkb"], hex=True) for p in polys]
    tree = STRtree(geoms)
    idx2slug = {}
    for r in MUNI:  # the boundary that holds the municipality's own point and carries its name
        hit = [i for i in tree.query(Point(float(r["point_lon"]), float(r["point_lat"])), predicate="intersects")]
        base = plain(re.sub(r"\s*\(.*\)", "", r["muni_name"]))
        same = lambda i: plain(polys[i]["name"]) == base or base.endswith(plain(polys[i]["name"])) or plain(polys[i]["name"]).endswith(base)
        hit = [i for i in hit if same(i)] or [i for i, p in enumerate(polys) if same(i) and i not in idx2slug and
                                                 km(float(r["point_lat"]), float(r["point_lon"]), geoms[i].centroid.y, geoms[i].centroid.x) < 40]
        assert len(hit) == 1, (r["muni_slug"], hit)
        idx2slug[hit[0]] = r["muni_slug"]
    assert len(idx2slug) == 308
    def muni_of(la, lo):
        for i in tree.query(Point(lo, la), predicate="intersects"):
            return idx2slug[int(i)]
        return None
    return muni_of

def island_of(slug):
    r = next(x for x in MUNI if x["muni_slug"] == slug)
    return ISLAND.get(slug) or ("Madeira" if r["region"] == "madeira" else "mainland")

def dedupe(items, metres, same_name=True):
    """One row per place: OSM often has a node and a building outline for the same facility. Ways and relations win over nodes."""
    items = sorted(items, key=lambda x: (x.get("_rank", 0), {"r": 0, "w": 1, "n": 2}.get(x.get("_t"), 3), -len(x.get("_tags", {}))))
    cell, kept = collections.defaultdict(list), []
    g = metres / 111000 * 1.5
    for x in items:
        cx, cy = int(x["lon"] / g), int(x["lat"] / g); dup = False
        for dx in (-1, 0, 1):
            for dy in (-1, 0, 1):
                for y in cell[(cx + dx, cy + dy)]:
                    if km(x["lat"], x["lon"], y["lat"], y["lon"]) * 1000 <= metres and (not same_name or plain(x["name"]) == plain(y["name"]) or plain(x["name"]) in plain(y["name"]) or plain(y["name"]) in plain(x["name"])):
                        dup = True
        if not dup: cell[(cx, cy)].append(x); kept.append(x)
    return kept

def title_pt(s):
    out = []
    for i, w in enumerate(s.lower().split()):
        out.append(w if i and w in ("de", "da", "do", "das", "dos", "e", "a", "o", "em", "na", "no") else re.sub(r"(^|[-(/])(\w)", lambda m: m[1] + m[2].upper(), w))
    return re.sub(r"\bD'(\w)", lambda m: "d'" + m[1].upper(), " ".join(out)).replace("S. ", "S. ")

COLS = ["id", "layer", "kind", "name", "lat", "lon", "municipality", "attributes", "source", "source_url", "licence", "checked_on"]
def osm_row(p, layer, kind, attrs=""):
    t = p["tags"]; typ = {"n": "node", "w": "way", "r": "relation"}[p["t"]]
    return {"id": f"{kind}-{p['t']}{p['id']}", "layer": layer, "kind": kind, "name": (t.get("name") or "").strip(), "lat": p["lat"], "lon": p["lon"], "attributes": attrs, "source": OSM_SRC,
            "source_url": f"https://www.openstreetmap.org/{typ}/{p['id']}", "licence": ODBL, "checked_on": CHECKED, "_t": p["t"], "_tags": t}

# ================================================================= step: facilities
def facilities():
    muni_of = load_boundaries()
    P = [json.loads(l) for l in open(os.path.join(SCRATCH, "work", "pois.jsonl"), encoding="utf8")]
    P = [p for p in P if in_portugal(p["lat"], p["lon"])]
    T = lambda p: p["tags"]
    nm = lambda p: plain(T(p).get("name"))
    report = {}

    # ---- origins: the town hall of each municipality (sede.py's points, completed from the extract)
    sede = {r["muni_slug"]: r for r in rd(os.path.join(VA, "sede_points.csv"))}
    SEATS = json.load(open(os.path.join(SCRATCH, "work", "seats.json"), encoding="utf8"))
    halls = collections.defaultdict(list)
    for p in P:
        if T(p).get("amenity") == "townhall" and T(p).get("name"):
            n = nm(p)
            if "junta" in n or "freguesia" in n: continue
            m = muni_of(p["lat"], p["lon"])
            if m: halls[m].append(p)
    origins = []
    for r in MUNI:
        s, slug = sede.get(r["muni_slug"]), r["muni_slug"]
        pj = os.path.join(ROOT, "content", "facts", "map", "places", slug, "place.json")
        hand = json.load(open(pj, encoding="utf8")).get("origin") if os.path.exists(pj) else None
        if hand:  # the hand-checked origin of a place card that is already built (the same point as the card's own drive times)
            o = {"slug": slug, "name": r["muni_name"], "lat": round(hand["lat"], 5), "lon": round(hand["lon"], 5), "point_name": hand["name"], "point_kind": "town hall", "point_source": hand["source"] + f"; content/facts/map/places/{slug}/place.json"}
        elif slug in ORIGIN_OVERRIDE:
            la, lo, pn, ps = ORIGIN_OVERRIDE[slug]
            o = {"slug": slug, "name": r["muni_name"], "lat": la, "lon": lo, "point_name": pn, "point_kind": "town hall", "point_source": ps}
        elif s:
            o = {"slug": slug, "name": r["muni_name"], "lat": float(s["lat"]), "lon": float(s["lon"]), "point_name": s["osm_name"], "point_kind": "town hall", "point_source": f"OpenStreetMap {s['osm_object']} (amenity=townhall, Nominatim, 2026-11-04; scripts/map-data/sede.py)"}
        else:
            base = plain(re.sub(r"\s*\(.*\)", "", r["muni_name"]))
            c = [p for p in halls[slug] if re.search(r"camara municipal|pacos do concelho|^municipio|pacos do municipio", nm(p))]
            c = sorted(c, key=lambda p: (0 if base in nm(p) else 1, 0 if "camara municipal" in nm(p) else 1, {"w": 0, "r": 0, "n": 1}[p["t"]]))
            c2 = [h for h in SEATS["named_halls"] if muni_of(h["lat"], h["lon"]) == slug and base in plain(h["tags"]["name"])]
            ac = [a for a in SEATS["admin_centres"] if "lat" in a and muni_of(a["lat"], a["lon"]) == slug and plain(a.get("muni")) in (base, plain(r["muni_name"])) or ("lat" in a and plain(a.get("muni") or "") and base.endswith(plain(a["muni"])) and muni_of(a["lat"], a["lon"]) == slug)]
            if c:
                p = c[0]; typ = {"n": "node", "w": "way", "r": "relation"}[p["t"]]
                o = {"slug": slug, "name": r["muni_name"], "lat": round(p["lat"], 5), "lon": round(p["lon"], 5), "point_name": T(p)["name"], "point_kind": "town hall", "point_source": f"OpenStreetMap {typ}/{p['id']} (amenity=townhall inside the municipality's boundary, extract of 2026-11-08)"}
            elif c2:
                p = sorted(c2, key=lambda h: h["t"] != "w")[0]; typ = {"n": "node", "w": "way"}[p["t"]]
                o = {"slug": slug, "name": r["muni_name"], "lat": round(p["lat"], 5), "lon": round(p["lon"], 5), "point_name": p["tags"]["name"], "point_kind": "town hall", "point_source": f"OpenStreetMap {typ}/{p['id']} (named as the town hall, without the amenity=townhall tag; extract of 2026-11-08)"}
            elif ac:
                a = ac[0]
                o = {"slug": slug, "name": r["muni_name"], "lat": round(a["lat"], 5), "lon": round(a["lon"], 5), "point_name": f"{a.get('name')} (centre of the seat town)", "point_kind": "town centre",
                     "point_source": f"OpenStreetMap node/{a['id']} (admin_centre of the municipality's boundary relation {a['relation']}; no town hall is mapped in OSM; extract of 2026-11-08)"}
            else: report.setdefault("origins_missing", []).append(slug); continue
        o["inside_boundary"] = "yes" if muni_of(o["lat"], o["lon"]) == slug else "NO"
        o["island"] = island_of(slug)
        origins.append(o)
    with open(os.path.join(SV, "origins.csv"), "w", encoding="utf8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["slug", "name", "lat", "lon", "point_name", "point_kind", "point_source", "inside_boundary", "island"]); w.writeheader(); w.writerows(origins)
    report["origins"] = len(origins); report["origins_town_centre"] = [o["slug"] for o in origins if o["point_kind"] == "town centre"]; report["origins_outside_boundary"] = [o["slug"] for o in origins if o["inside_boundary"] == "NO"]

    L = collections.defaultdict(list)  # layer file -> rows

    # ---- health
    hosp = [p for p in P if T(p).get("amenity") == "hospital" or T(p).get("healthcare") == "hospital"]
    def near_osm(la, lo, cands, metres):
        b = min(cands, key=lambda p: km(la, lo, p["lat"], p["lon"]), default=None)
        return b if b and km(la, lo, b["lat"], b["lon"]) * 1000 <= metres else None
    HL = rd(os.path.join(INP, "hospitals_list.csv"))
    sns = rd(os.path.join(INP, "sns_urgencia_institutions_2026.csv"))
    def sns_match(group):
        g = plain(group.replace("ULS", "").replace("(PPP, SNS)", ""))
        g = {"gaia espinho": "vila nova de gaia espinho", "viseu dao lafoes": "dao lafoes", "nordeste": "do nordeste", "guarda": "da guarda"}.get(g, g)
        c = [s for s in sns if g and g in plain(s["institution"])]
        return c[0]["institution"] if c else ""
    for r in HL:
        if r["sector"] != "public" or not r["lat"]: continue
        la, lo = float(r["lat"]), float(r["lon"]); o = near_osm(la, lo, hosp, 400)
        ev = [f"list={r['group']}"]
        s = sns_match(r["group"])
        if s: ev.append(f"SNS open data 2026: {s} reports general emergency attendances")
        elif "SESARAM" in r["group"] or "SRS" in r["group"]: ev.append("regional health service (not in the SNS mainland file)")
        else: ev.append("no institution match in the SNS file")
        if o: ev.append(f"OSM {o['t']}{o['id']} emergency={T(o).get('emergency', 'not tagged')}")
        special = re.search(r"pediatr|materno|maternidade|estefania", plain(r["name"]))  # children's and maternity hospitals: an emergency department, but not for everyone
        if special: ev.append("scope=children or maternity only; not used for the 'er' figure")
        L["health"].append({"id": "er-" + slugify(r["name"]), "layer": "health", "kind": "er_special" if special else "er", "name": r["name"], "lat": la, "lon": lo, "attributes": "; ".join(ev),
                            "source": "List of public hospitals with an emergency department compiled per ULS (sponsors/decks/v6/data, 2026-11-02) against the SNS list; point: OpenStreetMap", "source_url": r["source_url"],
                            "licence": "list: facts; point: " + ODBL, "checked_on": CHECKED})
    er_pts = [x for x in L["health"]]
    SOCIAL = re.compile(r"miseric|santa casa|ordem |cruz vermelha|irmas|irmandade|confraria|funda[cç]ao|s joao de deus|scm\b")
    NOTHOSP = re.compile(r"veterin|cuidados continuados|\blar\b|termal|laborat|analises|fisio|osteopat|dador|dialis|kids|centro de saude|extensao de saude|usf\b|unidade de saude|unidade de cuidados|posto medico|consulta|ambulatorio|psiqui")
    PRIVG = re.compile(r"\bcuf\b|lusiadas|hospital da luz|trofa saude|hospital particular|hospital privado|\bhpa\b|\bsams\b|hospital escola|sao camilo|sanfil|unisana|terra quente|hospital de jesus|sao mateus hospital|soerad")
    for p in hosp:  # public hospitals that OSM tags emergency=yes and the list does not hold: candidates for the operator, never used for "er"
        n = nm(p)
        if T(p).get("emergency") != "yes" or not n or T(p).get("amenity") != "hospital" or SOCIAL.search(n + " " + plain(T(p).get("operator"))) or NOTHOSP.search(n) or PRIVG.search(n) or T(p).get("operator:type") in ("private", "military", "religious", "private_non_profit", "community"): continue
        if "badajoz" in n or "forcas armadas" in n or "militar" in n: continue
        if near_osm(p["lat"], p["lon"], [{"lat": x["lat"], "lon": x["lon"]} for x in er_pts], 500): continue
        L["health"].append({**osm_row(p, "health", "er_candidate", "OSM emergency=yes; not in the list of public emergency hospitals; not used for the 'er' figure"), "_rank": 0})
    cand = dedupe([x for x in L["health"] if x["kind"] == "er_candidate"], 400, same_name=False)
    L["health"] = [x for x in L["health"] if x["kind"] != "er_candidate"] + cand

    CS = re.compile(r"^(centro de saude|unidade de saude familiar|usf|ucsp|unidade de cuidados de saude personalizados|extensao de saude|extensao do centro de saude|unidade de saude|polo de saude|posto de saude|unidade basica de urgencia)\b")
    cs = [osm_row(p, "health", "cs", "healthcare=" + (T(p).get("healthcare") or T(p).get("amenity") or "")) for p in P
          if (T(p).get("amenity") in ("clinic", "doctors", "hospital") or T(p).get("healthcare") in ("centre", "clinic", "doctor", "hospital", "yes")) and CS.search(nm(p)) and not re.search(r"veterin|\bcuf\b|lusiadas|trofa|\bluz\b|privad", nm(p)) and T(p).get("operator:type") != "private"]
    for x in cs: x["_rank"] = 0 if plain(x["name"]).startswith("centro de saude") else 1
    L["health"] += dedupe(dedupe(cs, 120, same_name=False), 350, same_name=True)

    ph = []
    for r in HL:
        if r["sector"] != "private": continue
        if r["lat"]: la, lo, src = float(r["lat"]), float(r["lon"]), "point: OpenStreetMap (" + r["coord_source"] + ")"
        else:
            key = [w for w in plain(r["name"]).split() if w not in ("hospital", "trofa", "saude", "lusiadas", "da", "de", "do", "luz", "clinica")]
            c = [p for p in hosp if key and all(k in nm(p) for k in key) and (plain(r["group"]).split()[0] in nm(p) or "hospital" in nm(p)) and plain(NAME.get(muni_of(p["lat"], p["lon"]) or "", "")) == plain(r["municipality"])]
            if not c: report.setdefault("private_list_without_point", []).append(r["name"]); continue
            la, lo, src = c[0]["lat"], c[0]["lon"], f"point: OpenStreetMap {c[0]['t']}{c[0]['id']} (matched by name and municipality)"
        ph.append({"id": "ph-" + slugify(r["name"]), "layer": "health", "kind": "ph", "name": r["name"], "lat": la, "lon": lo, "attributes": f"group={r['group']}; in the group's own list of units", "_rank": 0,
                   "source": "The hospital group's own list of units (sponsors/decks/v6/data, 2026-11-02); " + src, "source_url": r["source_url"], "licence": "list: facts; point: " + ODBL, "checked_on": CHECKED})
    for p in hosp:
        n = nm(p)
        if not n or T(p).get("amenity") != "hospital" or SOCIAL.search(n + " " + plain(T(p).get("operator"))) or NOTHOSP.search(n): continue
        if re.search(r"centro clinico|clinica|instituto|consult", n): continue
        if (PRIVG.search(n) and ("hospital" in n or re.match(r"(cuf|trofa saude|lusiadas)\b", n))) or (T(p).get("operator:type") == "private" and "hospital" in n):
            ph.append({**osm_row(p, "health", "ph", "OSM only (not in a group list); operator=" + (T(p).get("operator") or "not tagged")), "_rank": 1})
    L["health"] += dedupe(ph, 300, same_name=False)

    pharm = dedupe([{**osm_row(p, "pharmacies", "pharmacy"), "name": T(p).get("name") or "Farmácia"} for p in P if T(p).get("amenity") == "pharmacy"], 40, same_name=False)
    L["pharmacies"] = pharm

    # ---- schools
    schools = [p for p in P if T(p).get("amenity") == "school" and T(p).get("name")]
    CUR = {"British": (["British"], ["en"]), "American": (["American"], ["en"]), "IB": (["IB"], ["en"]), "German": (["German"], ["de"]), "French": (["French"], ["fr"])}
    def cur_of(name, cur=""):
        if cur in CUR: return CUR[cur]
        n = plain(name)
        for k, v in (("svenska", (["Swedish"], ["sv"])), ("nederlands", (["Dutch"], ["nl"])), ("british", CUR["British"]), ("lycee", CUR["French"]), ("deutsche", CUR["German"]), ("alemao", CUR["German"]), ("american", CUR["American"])):
            if k in n: return v
        return ([], [])
    isch = []
    for r in rd(os.path.join(INP, "intl_schools_list.csv")):
        if r["lat"]: la, lo, src = float(r["lat"]), float(r["lon"]), "point: OpenStreetMap (" + r["coord_source"] + ")"
        else:
            key = [w for w in plain(r["name"]).split() if w not in ("international", "school", "escola", "internacional", "the", "of", "lisboa")][:2]
            c = [p for p in schools if key and all(k in nm(p) for k in key) and plain(NAME.get(muni_of(p["lat"], p["lon"]) or "", "")) == plain(r["municipality"])]
            if not c: report.setdefault("intl_list_without_point", []).append(r["name"]); continue
            la, lo, src = c[0]["lat"], c[0]["lon"], f"point: OpenStreetMap {c[0]['t']}{c[0]['id']} (matched by name and municipality)"
        cu, lg = cur_of(r["name"], r["curriculum"])
        isch.append({"id": "isch-" + slugify(r["name"]), "layer": "schools", "kind": "isch", "name": r["name"], "lat": la, "lon": lo, "_rank": 0, "_cur": cu, "_lang": lg,
                     "attributes": f"curriculum={'/'.join(cu) or 'not stated'}; language={'/'.join(lg) or 'not stated'}; in the 2026-11-02 list (school sites and a third-party directory)",
                     "source": "List of international schools (sponsors/decks/v6/data, 2026-11-02); " + src, "source_url": r["source_url"], "licence": "list: facts; point: " + ODBL, "checked_on": CHECKED})
    INTL = re.compile(r"international school|escola internacional|colegio internacional|luso internacional|british school|british international|lycee francais|deutsche schule|colegio alemao|american school|american international|international sharing|international christian|school international")
    for p in schools:
        if INTL.search(nm(p)):
            cu, lg = cur_of(T(p)["name"])
            isch.append({**osm_row(p, "schools", "isch", f"curriculum={'/'.join(cu) or 'not stated'}; language={'/'.join(lg) or 'not stated'}; OSM only: the name says international, curriculum not checked on the school's site" +
                                   (f"; website={T(p).get('website') or T(p).get('contact:website')}" if (T(p).get('website') or T(p).get('contact:website')) else "")), "_rank": 1, "_cur": cu, "_lang": lg})
    isch = dedupe(isch, 300, same_name=False)
    L["schools"] += isch
    NOTGEN = re.compile(r"jardim de infancia|jardim infantil|infantario|creche|pre escolar|bercario|\batl\b|centro de estudo|explica|linguas|language|surf|kite|danca|musica|conservat|profissional|formacao|conducao|academia|academy|ballet|yoga|natacao|futebol|equita|mergulho|diving|tenis|golf|hotelaria|artes|tutorial|english|alliance|instituto de|universidade|seminario"
                        r"|associacao|reabilitacao|deficien|autismo|^centro |comercio|moda\b|jardim escola|^palacete|^lar\b|catequese|paroquial|apoio escolar|^sala de estudo")
    psch = []
    for p in schools:
        n, ot = nm(p), T(p).get("operator:type")
        if NOTGEN.search(n) or ot in ("public", "government") or re.search(r"^(escola basica|escola secundaria|eb\b|eb1|eb 1|agrupamento)", n): continue
        if ot in ("private", "religious", "private_non_profit", "cooperative", "charitable", "association") or re.search(r"^(colegio|externato|salesianos)\b", n):
            if near_osm(p["lat"], p["lon"], isch, 300): continue
            psch.append(osm_row(p, "schools", "psch", f"operator:type={ot or 'not tagged'}" + (f"; isced:level={T(p)['isced:level']}" if T(p).get("isced:level") else "")))
    L["schools"] += dedupe(psch, 400, same_name=True)
    sec = [osm_row(p, "schools", "sec", f"operator:type={T(p).get('operator:type') or 'not tagged'}") for p in schools
           if re.search(r"\bsecundaria\b", nm(p)) and T(p).get("operator:type") not in ("private", "religious") and not re.search(r"^(colegio|externato)\b", nm(p))]
    L["schools"] += dedupe(sec, 200, same_name=False)

    # ---- beach: official bathing waters (APA list, EEA category), Blue Flag 2026
    eea = {r["bathingWaterIdentifier"]: r for r in rd(os.path.join(INP, "eea_bathing_water_2024.csv"))}
    CAT = {"coastalBathingWater": "coastal", "transitionalBathingWater": "transitional", "riverBathingWater": "river", "lakeBathingWater": "lake"}
    bw = []
    for r in rd(os.path.join(VA, "apa_bathing_waters_2026.csv")):
        e = eea.get(r["code"])
        cat = CAT[e["specialisedZoneType"]] if e else ("coastal" if r["coastal"] == "True" else "inland")
        bw.append({"id": "bw-" + r["code"], "layer": "beach", "kind": "beach_" + ("sea" if cat in ("coastal", "transitional") else "inland"), "name": title_pt(r["name"]), "lat": float(r["lat"]), "lon": float(r["lon"]), "_cat": cat, "_flag": False, "_code": r["code"],
                   "_catsrc": "EEA 2024" if e else "not in the EEA 2024 file (new bathing water): sea or inland by the distance-to-ocean rule of content/facts/map/tiles/SOURCES.md", "_q": e["quality"] if e else ""})
    bf = [r for r in rd(os.path.join(INP, "blueflag_2026.csv")) if r["award_type"] == "beach"]
    unmatched = []
    for b in bw: b["_m"] = muni_of(b["lat"], b["lon"]) or min(MUNI, key=lambda r: km(b["lat"], b["lon"], float(r["point_lat"]), float(r["point_lon"])))["muni_slug"]
    def key(n):
        n = plain(re.sub(r"\(.*?\)", "", n).replace("S. ", "São ").replace("Sto. ", "Santo ").replace("Sta. ", "Santa "))
        return " ".join(w for w in n.split() if w not in ("praia", "fluvial", "zona", "balnear", "de", "da", "do", "das", "dos", "d"))
    has_pt = lambda r: bool(r["lat"]) and float(r["lat"]) != int(float(r["lat"])) and float(r["lon"]) != int(float(r["lon"]))
    dist = lambda r, b: km(float(r["lat"]), float(r["lon"]), b["lat"], b["lon"])
    def take(b, r, how): b["_flag"] = True; b["_bf"] = r; b["_how"] = how
    todo = []
    for r in bf:  # pass 1: the same name in the municipality the list gives (the list's own point is sometimes the town, so it is not required to agree)
        con, k = plain(re.sub(r"\(.*\)", "", r["concelho_as_listed"])), key(r["name"])
        cc = [b for b in bw if not b["_flag"] and plain(NAME[b["_m"]]).startswith(con) and key(b["name"]) == k]
        if len(cc) > 1 and has_pt(r): cc = sorted(cc, key=lambda b: dist(r, b))[:1]
        if len(cc) == 1: take(cc[0], r, "name and municipality")
        else: todo.append(r)
    todo2 = []
    for r in todo:  # pass 2: the same name within 3 km of the list's point (a beach on a municipal border), or a partial name in the municipality
        con, k = plain(re.sub(r"\(.*\)", "", r["concelho_as_listed"])), key(r["name"])
        cc = [b for b in bw if not b["_flag"] and has_pt(r) and key(b["name"]) == k and dist(r, b) < 3]
        cc = cc or [b for b in bw if not b["_flag"] and plain(NAME[b["_m"]]).startswith(con) and len(k) > 4 and (k in key(b["name"]) or key(b["name"]) in k)]
        if len(cc) == 1: take(cc[0], r, "name")
        else: todo2.append(r)
    for r in todo2:  # pass 3: the nearest bathing water not yet flagged, within 500 m of the list's point
        cc = sorted((dist(r, b), i) for i, b in enumerate(bw) if not b["_flag"]) if has_pt(r) else []
        if cc and cc[0][0] <= 0.5: take(bw[cc[0][1]], r, f"nearest bathing water, {int(cc[0][0] * 1000)} m from the list's point")
        else: unmatched.append(f"{r['name']} ({r['concelho_as_listed']})")
    report["blueflag_beaches_listed"] = len(bf); report["blueflag_matched_bathing_waters"] = sum(b["_flag"] for b in bw); report["blueflag_unmatched"] = unmatched
    for b in bw:
        if b["_flag"]: b["name"] = b["_bf"]["name"]
        b["attributes"] = f"category={b['_cat']} ({b['_catsrc']}); blue_flag_2026={'yes' if b['_flag'] else 'no'}{' (matched by ' + b['_how'] + ')' if b['_flag'] else ''}; bathing_water_code={b['_code']}" + (f"; eea_quality_2024={b['_q']}" if b["_q"] else "")
        b["source"] = "APA, identified bathing waters 2026 (point, name); EEA bathing-water status 2024 (category); Associação Bandeira Azul, awarded sites 2026 (Blue Flag and the name it uses)"
        b["source_url"] = b["_bf"]["url"] if b["_flag"] else "https://discodata.eea.europa.eu/ (WISE_BWD, assessment_BathingWaterStatus)"
        b["licence"] = "APA WFS: no restrictions stated; EEA: reuse with attribution; Blue Flag list: facts"; b["checked_on"] = CHECKED
    L["beach"] = bw

    # ---- airports with scheduled passenger flights; the point is the passenger terminal
    SCHED = {"LIS": "Lisboa", "OPO": "Porto", "FAO": "Faro", "FNC": "Madeira", "PXO": "Porto Santo", "PDL": "Ponta Delgada (São Miguel)", "TER": "Lajes (Terceira)", "HOR": "Horta (Faial)", "PIX": "Pico", "SMA": "Santa Maria",
             "SJZ": "São Jorge", "GRW": "Graciosa", "FLW": "Flores", "CVU": "Corvo"}
    terms = [p for p in P if T(p).get("aeroway") == "terminal" and not re.search(r"carga|hangar|velho|pier|terminal 2|brigada", nm(p))]
    for p in P:
        if T(p).get("aeroway") == "aerodrome" and T(p).get("iata"):
            i = T(p)["iata"]
            if i not in SCHED:
                L["airport"].append({**osm_row(p, "airport", "airfield_not_counted", f"iata={i}; not counted: no scheduled passenger flights confirmed (see README)"), "id": "air-" + i}); continue
            c = sorted([t for t in terms if km(p["lat"], p["lon"], t["lat"], t["lon"]) < 2.5], key=lambda t: (0 if T(t).get("name") else 1, km(p["lat"], p["lon"], t["lat"], t["lon"])))
            pt = c[0] if c else p
            L["airport"].append({**osm_row(pt, "airport", "air", f"iata={i}; point={'passenger terminal (aeroway=terminal)' if c else 'aerodrome centre'}; aerodrome=OSM {p['t']}{p['id']}"), "id": "air-" + i, "name": T(p)["name"], "_iata": i})
    report["airports"] = sorted(x["_iata"] for x in L["airport"] if x["kind"] == "air")

    # ---- long-distance train stations: where OSM's Alfa Pendular, Intercidades and international route relations stop
    ts = json.load(open(os.path.join(SCRATCH, "work", "train_stops.json"), encoding="utf8"))
    rname = {r["id"]: r for r in ts["routes"]}
    stations = [p for p in P if T(p).get("railway") in ("station", "halt") and T(p).get("name") and T(p).get("station") != "subway" and T(p).get("subway") != "yes"]
    by = collections.defaultdict(list)
    for s in ts["stops"]:
        if s["tags"].get("name") and in_portugal(s["lat"], s["lon"]): by[s["tags"]["name"]].append(s)
    for name, ss in sorted(by.items()):
        la, lo = sum(s["lat"] for s in ss) / len(ss), sum(s["lon"] for s in ss) / len(ss)
        st = [p for p in stations if km(la, lo, p["lat"], p["lon"]) < 0.6]
        st = sorted(st, key=lambda p: (0 if plain(name) in nm(p) or nm(p) in plain(name) else 1, km(la, lo, p["lat"], p["lon"])))
        serv = sorted({("Alfa Pendular" if "Alfa" in rname[r]["name"] else "Intercidades" if "Intercidades" in rname[r]["name"] else "Internacional (Celta)") for s in ss for r in s["routes"] if rname[r]["operator"] != "Renfe"})
        if not serv: continue
        if st: row = osm_row(st[0], "rail", "rail", "services=" + "/".join(serv) + "; point=station (railway=station)")
        else: row = {"id": "rail-n" + str(ss[0]["id"]), "layer": "rail", "kind": "rail", "name": name, "lat": round(la, 6), "lon": round(lo, 6), "attributes": "services=" + "/".join(serv) + "; point=stop position on the track",
                     "source": OSM_SRC, "source_url": f"https://www.openstreetmap.org/node/{ss[0]['id']}", "licence": ODBL, "checked_on": CHECKED}
        row["name"] = name; L["rail"].append(row)

    # ---- food: Michelin Guide selection, markets, restaurant count
    for r in rd(os.path.join(INP, "michelin_2026.csv")):
        la, lo = float(r["lat"]), float(r["lon"])
        if not in_portugal(la, lo) or not muni_of(la, lo): report.setdefault("michelin_outside_portugal", []).append(r["name"]); continue
        L["food"].append({"id": "mich-" + r["michelin_id"], "layer": "food", "kind": "mich", "name": r["name"], "lat": la, "lon": lo, "attributes": f"distinction={r['distinction']}; city_as_listed={r['city']}", "_dist": r["distinction"],
                          "source": "MICHELIN Guide, Portugal selection, as listed on 2026-11-10", "source_url": r["url"], "licence": "facts from a public listing (name, distinction, point); © Michelin for the guide's texts, none copied", "checked_on": CHECKED})
    mk = [osm_row(p, "food", "mkt", "amenity=marketplace") for p in P if T(p).get("amenity") == "marketplace" and re.search(r"^mercado|mercado municipal|praca do peixe|^praca municipal|mercado d", nm(p)) and not re.search(r"abastecedor|feira|gado|supermercado|mini", nm(p))]
    L["food"] += dedupe(mk, 150, same_name=False)
    rest = dedupe([{**osm_row(p, "food", "rest"), "name": T(p).get("name") or "?"} for p in P if T(p).get("amenity") == "restaurant"], 25, same_name=True)

    # ---- golf: the repo's golf data (prompt 33, content/facts/golf/courses.csv), open courses
    for i, c in enumerate(rd(os.path.join(ROOT, "content", "facts", "golf", "courses.csv"))):
        if c["status"] != "open" or not c["latitude"]: continue
        L["golf"].append({"id": "golf-" + slugify(c["name"]), "layer": "golf", "kind": "golf", "name": c["name"], "lat": float(c["latitude"]), "lon": float(c["longitude"]), "attributes": f"holes={c['holes']}" + (f"; resort={c['resort']}" if c["resort"] else ""),
                          "source": "content/facts/golf/courses.csv (prompt 33: Visit Portugal course pages; point: OpenStreetMap)", "source_url": c["source_url"], "licence": "facts; point: " + ODBL, "checked_on": c["date_checked"]})

    # ---- culture
    mu = [osm_row(p, "culture", "museum", "tourism=museum") for p in P if T(p).get("tourism") == "museum" and T(p).get("name")]
    th = [osm_row(p, "culture", "theatre", "amenity=theatre") for p in P if T(p).get("amenity") == "theatre" and T(p).get("name")]
    L["culture"] = dedupe(mu, 300, same_name=True) + dedupe(th, 300, same_name=True)

    # ---- municipality of every row, checks, files
    os.makedirs(os.path.join(SV, "facilities"), exist_ok=True)
    counts, route = {}, collections.defaultdict(list)
    for layer, rows in L.items():
        seen = set(); out = []
        for x in rows:
            if not in_portugal(x["lat"], x["lon"]): report.setdefault("outside_portugal", []).append(x["id"]); continue
            x["municipality"] = muni_of(x["lat"], x["lon"]) or (x.get("_m", "") if layer == "beach" else "")
            if not x["municipality"]: report["dropped_outside_every_boundary"] = report.get("dropped_outside_every_boundary", 0) + 1; continue
            while x["id"] in seen: x["id"] += "-b"
            seen.add(x["id"]); out.append(x); counts[x["kind"]] = counts.get(x["kind"], 0) + 1
            if x["kind"] in ("er", "er_candidate", "cs", "ph", "isch", "psch", "sec", "beach_sea", "beach_inland", "air", "rail", "mich", "mkt", "golf", "museum", "theatre"):
                route[x["kind"]].append({"id": x["id"], "lat": x["lat"], "lon": x["lon"]})
        with open(os.path.join(SV, "facilities", layer + ".csv"), "w", encoding="utf8", newline="") as f:
            w = csv.DictWriter(f, fieldnames=COLS, extrasaction="ignore"); w.writeheader(); w.writerows(sorted(out, key=lambda x: (x["kind"], x["municipality"], x["name"])))
        L[layer] = out
    # restaurants: counted, not listed (19 000 rows would not earn their place in the repo)
    rc, pc = collections.Counter(muni_of(x["lat"], x["lon"]) for x in rest), collections.Counter(x["municipality"] for x in L["pharmacies"])
    pop = {r["muni_slug"]: int(r["resident_population"]) for r in rd(os.path.join(INP, "population_census_2021.csv"))}
    area = {r["muni_slug"]: r["area_km2"] for r in rd(os.path.join(INP, "area_km2_2022.csv"))}
    with open(os.path.join(SV, "facilities", "counts_by_municipality.csv"), "w", encoding="utf8", newline="") as f:
        w = csv.writer(f); w.writerow(["slug", "resident_population_2021", "area_km2_2022", "osm_restaurants", "osm_pharmacies", "source", "licence", "checked_on"])
        for s in SLUGS: w.writerow([s, pop[s], area[s], rc.get(s, 0), pc.get(s, 0), "INE 0011609 (Census 2021); INE 0008350 (area, DGT, 2022); " + OSM_SRC + ": amenity=restaurant and amenity=pharmacy inside the municipality's boundary", "CC BY 4.0 (INE); " + ODBL, CHECKED])
    counts["rest"] = len(rest); report["counts"] = counts
    json.dump({"origins": [{"slug": o["slug"], "lat": o["lat"], "lon": o["lon"]} for o in origins], "layers": route}, open(os.path.join(SCRATCH, "work", "route_in.json"), "w"))
    json.dump(report, open(os.path.join(SCRATCH, "work", "facilities_report.json"), "w"), ensure_ascii=False, indent=1)
    print(json.dumps(report, ensure_ascii=False, indent=1))

# ================================================================= step: summary
KEEP = {"er": (3, 0), "er_candidate": (1, 0), "cs": (3, 10), "ph": (3, 20), "isch": (3, 30), "psch": (3, 20), "sec": (3, 20), "beach_sea": (3, 20), "beach_inland": (2, 20), "air": (2, 0), "rail": (2, 0),
        "mich": (1, 30), "mkt": (1, 20), "golf": (2, 30), "museum": (1, 20), "theatre": (1, 20)}  # kind -> (the nearest N always kept, plus everything within R minutes)
FILE = {"er": "health", "er_candidate": "health", "cs": "health", "ph": "health", "isch": "schools", "psch": "schools", "sec": "schools", "beach_sea": "beach", "beach_inland": "beach", "air": "airport", "rail": "rail",
        "mich": "food", "mkt": "food", "golf": "golf", "museum": "culture", "theatre": "culture"}
SNAP_MAX = 1000  # a facility whose point is more than 1 km from any road a car can use is not given a drive time
rint = lambda x: int(math.floor(x + 0.5))

def summary():
    only = set(arg("--only").split(",")) if arg("--only") else None
    origins = rd(os.path.join(SV, "origins.csv")); oslug = [o["slug"] for o in origins]
    fac = {}
    for fn in sorted(os.listdir(os.path.join(SV, "facilities"))):
        if fn == "counts_by_municipality.csv": continue
        for r in rd(os.path.join(SV, "facilities", fn)): fac[r["id"]] = r
    cnt = {r["slug"]: r for r in rd(os.path.join(SV, "facilities", "counts_by_municipality.csv"))}
    R, access = {}, collections.defaultdict(list)
    for kind in KEEP:
        p = os.path.join(SCRATCH, "work", "route_out", kind + ".json")
        if not os.path.exists(p): continue
        o = json.load(open(p)); R[kind] = {}
        for a, slug in enumerate(oslug):
            rows = [(o["min"][a][b], o["km"][a][b], fid) for b, fid in enumerate(o["ids"]) if o["min"][a][b] is not None and o["dsnap"][b] <= SNAP_MAX]
            rows.sort(); R[kind][slug] = rows
            n, rad = KEEP[kind]
            for i, (m, k, fid) in enumerate(rows):
                if i < n or m <= rad: access[FILE[kind]].append((slug, kind, fid, m, k))
        R[kind]["_nosnap"] = [fid for b, fid in enumerate(o["ids"]) if o["dsnap"][b] > SNAP_MAX]
        R[kind]["_osnap"] = dict(zip(oslug, o["osnap"]))
    os.makedirs(os.path.join(SV, "access"), exist_ok=True)
    for layer, rows in access.items():
        with open(os.path.join(SV, "access", layer + ".csv"), "w", encoding="utf8", newline="") as f:
            w = csv.writer(f); w.writerow(["slug", "kind", "facility_id", "drive_min", "drive_km"])
            for r in sorted(rows, key=lambda r: (r[0], r[1], r[3])):
                if not only or r[0] in only: w.writerow(r)
    def nearest(kind, slug, extra=None, pick=None):
        rows = R.get(kind, {}).get(slug) or []
        if pick: rows = [r for r in rows if pick(fac[r[2]])]
        if not rows: return None
        m, k, fid = rows[0]; d = {"min": rint(m), "km": k, "name": fac[fid]["name"], "id": fid}
        if extra: d.update(extra(fac[fid]))
        return d
    within = lambda kind, slug, rad, pick=None: (sum(1 for m, k, fid in R[kind][slug] if m <= rad and (not pick or pick(fac[fid]))) if kind in R and slug in R[kind] else None)
    attr = lambda f, k: (re.search(k + r"=([^;]*)", f["attributes"]) or [None, ""])[1]
    lst = lambda s: [x for x in s.split("/") if x and x != "not stated"] or None
    places = {}
    for slug in SLUGS:
        if only and slug not in only: continue
        if slug not in oslug: places[slug] = None; continue
        c = cnt[slug]; pop = int(c["resident_population_2021"]); rest = int(c["osm_restaurants"]) or None; ph_n = int(c["osm_pharmacies"]) or None
        p = {"pop": pop, "area_km2": float(c["area_km2_2022"]),
             "er": nearest("er", slug), "cs": nearest("cs", slug), "ph": nearest("ph", slug), "ph_n20": within("ph", slug, 20), "pharm_n": ph_n,
             "isch": nearest("isch", slug, lambda f: {"cur": lst(attr(f, "curriculum")), "lang": lst(attr(f, "language"))}), "isch_n30": within("isch", slug, 30),
             "psch_n20": within("psch", slug, 20), "sec_n20": within("sec", slug, 20),
             "beach": nearest("beach_sea", slug, lambda f: {"flag": attr(f, "blue_flag_2026").startswith("yes"), "cat": attr(f, "category").split(" ")[0]}),
             "air": nearest("air", slug, lambda f: {"iata": attr(f, "iata")}), "rail": nearest("rail", slug),
             "food": {"mich_n30": within("mich", slug, 30), "mich_star_n30": within("mich", slug, 30, lambda f: "star" in f["attributes"]), "mkt_n20": within("mkt", slug, 20), "rest_n": rest,
                      "rest_per_1k": round(rest / pop * 1000, 1) if rest else None},
             "golf": nearest("golf", slug), "golf_n30": within("golf", slug, 30), "museum": nearest("museum", slug),
             "cult_n20": (within("museum", slug, 20) + within("theatre", slug, 20)) if "museum" in R and "theatre" in R else None,
             # additions to the contract (optional fields)
             "beach_flag": nearest("beach_sea", slug, pick=lambda f: "blue_flag_2026=yes" in f["attributes"]), "beach_n20": within("beach_sea", slug, 20),
             "beach_inland": nearest("beach_inland", slug, lambda f: {"cat": attr(f, "category").split(" ")[0], "flag": attr(f, "blue_flag_2026").startswith("yes")}),
             "er_cand": nearest("er_candidate", slug), "island": next(o["island"] for o in origins if o["slug"] == slug)}
        if p["er_cand"] and p["er"] and p["er_cand"]["min"] >= p["er"]["min"]: p["er_cand"] = None
        if p["island"] == "mainland": del p["island"]
        places[slug] = p
    cov = lambda f: sum(1 for p in places.values() if p and f(p) is not None)
    isl = "Islands: no road route crosses the sea (the routing has no ferries), so a place on an island with none of these gets null."
    rep = json.load(open(os.path.join(SCRATCH, "work", "facilities_report.json"), encoding="utf8"))["counts"]
    layers = {
        "pop": {"source": "INE, Census 2021, indicator 0011609 (resident population)", "licence": "CC BY 4.0", "year": 2021, "covered": cov(lambda p: p["pop"]), "note": "Census day, 19 April 2021."},
        "area": {"source": "INE indicator 0008350, area of the territorial units (km²), from the Direção-Geral do Território (CAOP)", "licence": "CC BY 4.0", "year": 2022, "covered": cov(lambda p: p["area_km2"]), "note": "Field area_km2. Official area of the municipality."},
        "er": {"source": "List of 56 general public hospitals with an emergency department (4 more, children's and maternity hospitals, are listed but not used) (SNS/ULS, SESARAM, the Azores hospitals), compiled per ULS on 2026-11-02; points from OpenStreetMap; each ULS checked against the SNS open-data file of emergency attendances 2026", "licence": "facts; points ODbL",
               "covered": cov(lambda p: p["er"]), "note": "The building-level SNS list of emergency departments could not be downloaded; basic emergency services in health centres are missing. er_cand = a nearer OSM hospital tagged emergency=yes that the list does not hold (unverified, operator's decision). " + isl},
        "cs": {"source": OSM_SRC + ": health centres by name (Centro de Saúde, USF, UCSP, Extensão de Saúde, Unidade de Saúde)", "licence": ODBL, "covered": cov(lambda p: p["cs"]), "note": f"{rep.get('cs')} units. The name is OSM's (often the building), not the ERS register's unit name. " + isl},
        "ph": {"source": "The hospital groups' own lists of units (CUF, Luz, Lusíadas, Trofa Saúde, HPA; 2026-11-02) plus OSM private hospitals", "licence": "facts; points ODbL", "covered": cov(lambda p: p["ph"]), "note": f"{rep.get('ph')} units; some are small units, not full hospitals; not every one has an emergency service. ph_n20 = within 20 minutes. " + isl},
        "pharm": {"source": OSM_SRC + ": amenity=pharmacy inside the municipality's boundary", "licence": ODBL, "covered": cov(lambda p: p["pharm_n"]), "note": f"{rep.get('pharmacy')} pharmacies in OSM (Portugal has about 2 900): a floor, not a census. 0 in OSM is shown as null."},
        "isch": {"source": "List of international schools (school sites and a third-party directory, 2026-11-02) plus OSM schools whose name says international", "licence": "facts; points ODbL", "covered": cov(lambda p: p["isch"]),
                 "note": f"{rep.get('isch')} schools; cur and lang are null where the curriculum was not checked. isch_n30 = within 30 minutes. " + isl},
        "psch": {"source": OSM_SRC + ": amenity=school, private by tag or by name (Colégio, Externato)", "licence": ODBL, "covered": cov(lambda p: p["psch_n20"]),
                 "note": f"{rep.get('psch')} schools. OSM does not say which cycles a school teaches, so this count includes primary-only private schools and misses unmapped ones; the official register (DGEEC) needs the operator. International schools are not in this count."},
        "sec": {"source": OSM_SRC + ": amenity=school whose name says Secundária, not private", "licence": ODBL, "covered": cov(lambda p: p["sec_n20"]), "note": f"{rep.get('sec')} schools."},
        "beach": {"source": "APA identified bathing waters 2026 (points), EEA bathing-water status 2024 (category), Associação Bandeira Azul awarded sites 2026 (flag)", "licence": "APA: no restrictions stated; EEA: reuse with attribution", "covered": cov(lambda p: p["beach"]),
                  "note": "Nearest sea bathing water by road: EEA category coastal, or transitional (river mouths and lagoons open to the sea, 26 of them; cat says which). beach_flag = nearest with a 2026 Blue Flag; beach_n20 = how many within 20 minutes; beach_inland = nearest river or lake bathing water. A bathing water more than 1 km from a road gets no drive time. " + isl},
        "air": {"source": OSM_SRC + ": passenger terminal of the 14 airports with scheduled passenger flights (LIS, OPO, FAO, FNC, PXO and nine in the Azores)", "licence": ODBL, "covered": cov(lambda p: p["air"]),
                "note": "Regional airfields (Bragança, Vila Real, Viseu, Cascais, Portimão) and Beja are not counted. " + isl},
        "rail": {"source": OSM_SRC + ": stations where the route relations of CP Alfa Pendular, Intercidades and the Porto–Vigo international train stop", "licence": ODBL, "covered": cov(lambda p: p["rail"]), "note": f"{rep.get('rail')} stations. No railway on the islands: null."},
        "food": {"source": "MICHELIN Guide Portugal selection as listed on 2026-11-10 (mich_n30, mich_star_n30); OSM marketplaces named Mercado (mkt_n20); OSM amenity=restaurant in the municipality (rest_n) over the 2021 census population (rest_per_1k)", "licence": "facts; ODbL; CC BY 4.0",
                 "covered": cov(lambda p: p["food"]["rest_n"]), "note": f"{rep.get('mich')} Michelin-listed restaurants, {rep.get('mkt')} markets, {rep.get('rest')} restaurants in OSM. Counts describe what is listed and mapped, not quality. OSM restaurant mapping is uneven between municipalities."},
        "golf": {"source": "The map's golf data (prompt 33): open courses", "licence": "facts; points ODbL", "covered": cov(lambda p: p["golf"]), "note": f"{rep.get('golf')} courses. golf_n30 = within 30 minutes. " + isl},
        "museum": {"source": OSM_SRC + ": tourism=museum and amenity=theatre, named", "licence": ODBL, "covered": cov(lambda p: p["museum"]), "note": f"{rep.get('museum')} museums and {rep.get('theatre')} theatres. cult_n20 = both within 20 minutes."},
    }
    out = {"v": 1, "checked": CHECKED, "routing": {"engine": "OSRM 26.4.0 run locally (MLD, table service)", "data": OSM_SRC, "profile": "car, no traffic", "ferries": "none: a drive time never includes a boat",
                                                  "origin": "the municipality's town hall (origins.csv)", "rounding": "minutes to the nearest whole minute; counts use the unrounded time"},
           "layers": layers, "places": places}
    json.dump(out, open(os.path.join(SV, "summary.json"), "w", encoding="utf8"), ensure_ascii=False, indent=None, separators=(",", ":"))
    print("summary.json:", len([p for p in places.values() if p]), "places;", {k: v["covered"] for k, v in layers.items()})
    print("not given a drive time (more than 1 km from a road):", {k: len(v["_nosnap"]) for k, v in R.items() if v["_nosnap"]})
    print("origins more than 150 m from a road:", {s: d for s, d in R["er"]["_osnap"].items() if d > 150})

if __name__ == "__main__":
    {"facilities": facilities, "summary": summary}[sys.argv[1]]()
