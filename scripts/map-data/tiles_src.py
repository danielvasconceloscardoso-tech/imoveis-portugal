"""D83 part 2: reads the folder of official figures gathered for the map's tiles (see its SOURCES.md) into tiles.json.
Called by tiles.py with --src DIR. Every reader skips a missing file or an empty cell: no figure is ever estimated.

Files understood (relative to DIR):
  preco/sales_m2_by_category_{municipality,parish}.csv   INE 0014763 / 0012234: median €/m², total, new, existing, 5-year change
  preco/sales_m2_by_typology_{municipality,parish}.csv   INE 0014759 / 0012241: median €/m² by typology (T0-T1, T2, T3, T4+)
  viver_aqui/viver_aqui_municipality.csv                 Copernicus OSTIA August sea temperature 1991-2020, straight-line km to the
                                                         nearest APA sea bathing water and to the nearest airport (LIS, OPO, FAO, FNC, PDL)
                                                         (IPMA sunshine 1971-2000 is private use only and is never read)
  viver_aqui/beach_distance_parish.csv                   the same distance per parish
  viver_aqui/flights_editions_to_portugal.csv            scheduled block times per edition (only rows with a time are used)
  escolas_saude/escolas_saude_{municipality,parish}.csv  nearest international school and public emergency hospital (straight line)
  escolas_saude/doctors_per_1000_municipality_2025.csv   INE 0012837, doctors per 1 000 residents (by place of residence)
The typology and new-versus-existing detail (paid analysis only) goes to site/src/data/mapanalysis.json, read at build time.
"""
import csv, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TYP = [("t0_t1", "T0–T1"), ("t2", "T2"), ("t3", "T3"), ("t4plus", "T4+")]

def rows(d, rel):
    p = os.path.join(d, rel)
    if not os.path.exists(p): return []
    with open(p, encoding="utf8") as f: return list(csv.DictReader(f))

def num(v):
    try: return float(v) if v not in (None, "") else None
    except ValueError: return None

def merge(d, out, props):
    M, P = out["m"], out["p"]
    code_slug = {p["c"][3:]: s for s, p in props.items()}
    extra = {"m": {}, "p": {}}
    def target(level, r):
        if level == "municipality":
            s = r.get("muni_slug") if r.get("muni_slug") in M else code_slug.get(r.get("place_code") or r.get("muni_dico") or "")
            return ("m", s) if s in M else (None, None)
        code = r.get("place_code") or r.get("dicofre")
        return ("p", code) if code in P else (None, None)

    # Price: the market as a range from the finest INE cut (typology, else new and existing), the 5-year change.
    for level in ("municipality", "parish"):
        for r in rows(d, f"preco/sales_m2_by_category_{level}.csv"):
            k, key = target(level, r)
            if not k: continue
            n, e, t = num(r["new_eur_m2"]), num(r["existing_eur_m2"]), num(r["total_eur_m2"])
            row = (M if k == "m" else P)[key]
            ne = {x: v for x, v in {"n": n and round(n), "e": e and round(e), "n5": num(r["new_change_5y_pct"]), "e5": num(r["existing_change_5y_pct"])}.items() if v is not None}
            if n or e: extra[k].setdefault(key, {})["ne"] = ne
            # The free tile shows new and existing next to the median, when INE publishes both.
            if n and e: row["ne"] = [round(n), round(e)]
            if k == "p" and row.get("p5") is None and num(r["total_change_5y_pct"]) is not None: row["p5"] = num(r["total_change_5y_pct"])
        for r in rows(d, f"preco/sales_m2_by_typology_{level}.csv"):
            k, key = target(level, r)
            if not k: continue
            ty = {lab: round(num(r[f"{c}_eur_m2"])) for c, lab in TYP if num(r[f"{c}_eur_m2"])}
            if not ty: continue
            extra[k].setdefault(key, {})["ty"] = ty
            # INE publishes no quartiles: the range is the lowest to highest typology median, labelled "entre tipologias".
            if len(ty) >= 2: (M if k == "m" else P)[key]["rng"] = [min(ty.values()), max(ty.values())]
    out["src"]["mkt"] = {"t": "INE, valor mediano das vendas por m² (0014763, por categoria; 0014759, por tipologia)", "u": "https://www.ine.pt", "d": out["q"]}

    # Living here.
    for r in rows(d, "viver_aqui/viver_aqui_municipality.csv"):
        k, s = target("municipality", r)
        if not k: continue
        m = M[s]
        # Sunshine: IPMA 1971-2000 sheets are "private use only": never published (the tile says "Em breve").
        if num(r.get("sst_aug_1991_2020")): m["sea"] = round(num(r["sst_aug_1991_2020"]), 1)
        if num(r.get("km_straight_line_to_sea_bathing_water")) is not None: m["bch"] = round(num(r["km_straight_line_to_sea_bathing_water"]), 1)
    for r in rows(d, "viver_aqui/beach_distance_parish.csv"):
        k, c = target("parish", r)
        if k and num(r.get("km_straight_line_to_sea_bathing_water")) is not None: P[c]["bch"] = round(num(r["km_straight_line_to_sea_bathing_water"]), 1)
    # The nearest airport (straight line); the flight time is only ever a published timetable (below), never a guess.
    for r in rows(d, "viver_aqui/viver_aqui_municipality.csv"):
        k, s = target("municipality", r)
        if k and r.get("nearest_pt_airport") and num(r.get("km_straight_line_to_airport")) is not None: M[s]["ap"] = [r["nearest_pt_airport"], round(num(r["km_straight_line_to_airport"]))]
    for r in rows(d, "viver_aqui/nearest_airport_parish.csv"):
        k, c = target("parish", r)
        if k and r.get("nearest_pt_airport") and num(r.get("km_straight_line_to_airport")) is not None: P[c]["ap"] = [r["nearest_pt_airport"], round(num(r["km_straight_line_to_airport"]))]
    # Flights: only a published scheduled block time; the shortest per edition and Portuguese airport. Never a guess from distance.
    ED = {"Luxembourg": "lu", "France": "fr", "Switzerland": "ch", "Brazil": "br", "USA": "us", "United States": "us", "Israel": "il", "United Kingdom": "uk", "UK": "uk"}
    best = {}
    for r in rows(d, "viver_aqui/flights_editions_to_portugal.csv"):
        t, ed = num(r.get("scheduled_block_time_min")), ED.get(r.get("edition", ""))
        if t and ed: best[(ed, r["destination"])] = min(t, best.get((ed, r["destination"]), 1e9))
    if best:
        for r in rows(d, "viver_aqui/viver_aqui_municipality.csv"):
            k, s = target("municipality", r)
            if not k: continue
            fl = {ed: round(t) for (ed, ap), t in best.items() if ap == r.get("nearest_pt_airport")}
            if fl: M[s]["fl"] = fl
    out["src"]["sea"] = {"t": "Copernicus Marine Service (OSTIA), temperatura média do mar em agosto", "u": "https://marine.copernicus.eu", "d": "1991–2020"}
    out["src"]["ap"] = {"t": "Aeroportos: OpenStreetMap; distância em linha reta, calculada por nós", "u": "https://www.openstreetmap.org", "d": "2026"}
    out["src"]["bch"] = {"t": "APA, águas balneares costeiras 2026; distância em linha reta, calculada por nós", "u": "https://apambiente.pt", "d": "2026"}
    if best: out["src"]["fl"] = {"t": "Horários publicados pelas companhias aéreas", "u": "", "d": ""}

    # Schools and health.
    for level in ("municipality", "parish"):
        for r in rows(d, f"escolas_saude/escolas_saude_{level}.csv"):
            k, key = target(level, r)
            if not k: continue
            row = (M if k == "m" else P)[key]
            if (r.get("nearest_intl_school") or "").startswith("none"): row["sch"] = {"none": 1}
            elif r.get("nearest_intl_school") and num(r.get("km_straight_line_to_school")) is not None: row["sch"] = {"n": r["nearest_intl_school"], "km": round(num(r["km_straight_line_to_school"]), 1)}
            if r.get("nearest_public_emergency_hospital") and num(r.get("km_straight_line_to_public_emergency")) is not None: row["hsp"] = {"n": r["nearest_public_emergency_hospital"], "km": round(num(r["km_straight_line_to_public_emergency"]), 1)}
            if level == "municipality" and num(r.get("doctors_per_1000_2025")) is not None: row["doc"] = num(r["doctors_per_1000_2025"])
    for r in rows(d, "escolas_saude/doctors_per_1000_municipality_2025.csv"):
        k, s = target("municipality", r)
        if k and num(r.get("doctors_per_1000")) is not None: M[s]["doc"] = num(r["doctors_per_1000"])
    out["src"]["sch"] = {"t": "Escolas internacionais (lista própria, sites das escolas; OpenStreetMap); distância em linha reta", "u": "", "d": "2026"}
    out["src"]["hsp"] = {"t": "Hospitais públicos com urgência (SNS, SESARAM, SRS Açores); distância em linha reta", "u": "https://www.sns.gov.pt", "d": "2026"}
    out["src"]["doc"] = {"t": "INE 0012837, médicos por 1000 habitantes, por local de residência (PORDATA publica a mesma série)", "u": "https://www.ine.pt", "d": "2025"}

    path = os.path.join(ROOT, "site", "src", "data", "mapanalysis.json")
    json.dump({"q": out["q"], **extra}, open(path, "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
