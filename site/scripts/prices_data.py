"""Ten years of official prices and rents (prompt 20 §3) → public/data/prices.json.

Sources (INE, Estatísticas de preços da habitação ao nível local; Estatísticas de rendas da habitação ao nível local):
- 0009490: median value per m² of family dwellings sold in the last 12 months, Metodologia 2018, 2016-Q1 to 2021-Q3
- 0012234: the same, Metodologia 2022 (total of new and existing), 2019-Q4 to 2026-Q2
- 0014696: median rent per m² of new lease contracts of family dwellings in the last 12 months, Metodologia 2026,
  2020-Q1 to 2026-Q2 (2nd quarter of each year kept)
The two sale series are not the same method: we use 2018 up to 2019-Q3 and 2022 from 2019-Q4 and mark the break.
Municipalities are matched on the last four characters of the INE code (= the CAOP DTMN code), which survive the
NUTS 2013 → 2024 recoding. Regions (NUTS II 2024) exist only in the 2022 series, so their history starts in 2019-Q4.

Usage (from site/): python3 scripts/prices_data.py /path/to/ine-json-dir   (files {varcd}_S5A{year}{quarter}.json,
fetched with https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd=...&Dim1=S5A...&lang=PT)
"""
import json, sys, os, re

src = sys.argv[1]
def rows(varcd, y, q):
    f = os.path.join(src, f"{varcd}_S5A{y}{q}.json")
    if not os.path.exists(f): return None
    j = json.load(open(f)); j = j[0] if isinstance(j, list) else j
    return list(j["Dados"].values())[0]

Q = [(y, q) for y in range(2016, 2027) for q in range(1, 5) if (y, q) <= (2026, 2)]
labels = [f"{y}-Q{q}" for y, q in Q]
geo = json.load(open("public/data/pt-map.geojson"))
munis = {f["properties"]["c"][-4:]: {"n": f["properties"]["n"], "s": f["properties"]["s"], "r": f["properties"]["r"], "m2": [None] * len(Q)} for f in geo["features"]}
REG = {"PT": "Portugal", "11": "Norte", "19": "Centro", "1D": "Oeste e Vale do Tejo", "1A": "Grande Lisboa", "1B": "Península de Setúbal", "1C": "Alentejo", "15": "Algarve", "20": "Região Autónoma dos Açores", "30": "Região Autónoma da Madeira"}
regions = {k: {"n": v, "m2": [None] * len(Q)} for k, v in REG.items()}
missing = []
for i, (y, q) in enumerate(Q):
    new = (y, q) >= (2019, 4)
    data = rows("0012234" if new else "0009490", y, q)
    if data is None: missing.append(labels[i]); continue
    for r in data:
        if new and r.get("dim_3_t") != "Total": continue
        if r.get("valor") in (None, "", "x"): continue
        v = float(r["valor"]); code = r["geocod"]
        if len(code) == 7 and code[-4:] in munis: munis[code[-4:]]["m2"][i] = round(v)
        elif code in regions and (new or code == "PT"): regions[code]["m2"][i] = round(v)
rent_years = list(range(2020, 2027))
for k in list(munis) : munis[k]["rent"] = {}
for k in regions: regions[k]["rent"] = {}
for y in rent_years:
    data = rows("0014696", y, 2) or []
    for r in data:
        if r.get("valor") in (None, "", "x"): continue
        v = float(r["valor"]); code = r["geocod"]
        if len(code) == 7 and code[-4:] in munis: munis[code[-4:]]["rent"][str(y)] = v
        elif code in regions: regions[code]["rent"][str(y)] = v
# Gross yield = median rent per m² x 12 / median sale price per m², both last 12 months to Q2 2026.
for d in list(munis.values()) + list(regions.values()):
    p, r = d["m2"][-1], d["rent"].get("2026")
    d["yield"] = round(r * 12 / p * 100, 1) if p and r else None
out = {"quarters": labels, "break": "2019-Q4", "rentYears": rent_years, "released": {"sales": "2026-10-23", "rents": "2026"},
       "regions": regions, "munis": {d["s"]: {k: v for k, v in d.items() if k != "s"} for d in munis.values()}}
json.dump(out, open("public/data/prices.json", "w"), separators=(",", ":"), ensure_ascii=False)
withy = sum(1 for d in munis.values() if d["yield"])
print(len(munis), "municipalities;", withy, "with a yield; missing quarters:", missing)
print("Porto", munis["1312"]["m2"][0], "→", munis["1312"]["m2"][-1], "rent", munis["1312"]["rent"].get("2026"), "yield", munis["1312"]["yield"])
print("PT", regions["PT"]["m2"][0], regions["PT"]["m2"][-1], regions["PT"]["rent"], regions["PT"]["yield"])
