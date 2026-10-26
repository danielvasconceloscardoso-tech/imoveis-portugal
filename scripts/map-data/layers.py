"""Prompt 25 §4: phase 2 layers, INE only for now (licence CC BY 4.0, checked on dados.gov.pt for every indicator).

Fetches the raw files into content/facts/map/raw/ine/ (manifest updated) and writes site/public/data/map/layers.json:
per concelho slug, the figures the map can show as layers and the place card lists as facts.
- dom:  median €/m² by the buyer's tax domicile (Portugal / abroad), quarter, 0012239 (INE publishes ~58 concelhos)
- sea, vac: share of seasonal-use (second homes) and vacant dwellings, Census 2021, 0012516 and 0012517
- area: average useful floor area of main homes, m², Census 2021, 0012518
- lic:  buildings licensed, all works, 2025, 0013242
- new:  new buildings completed for family housing, 2025, 0013247
- fr, br: foreign residents with legal status and Brazilian residents, 2023, 0013219
Sources and periods are listed in content/facts/map/SOURCES.md. Usage (repo root): python3 scripts/map-data/layers.py
"""
import gzip, json, os, sys, time, urllib.request
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
RAW = os.path.join(ROOT, "content", "facts", "map", "raw")
INE = "https://www.ine.pt/ine/json_indicador/pindica.jsp?op=2&varcd={v}&Dim1={p}&lang=PT"
manifest = json.load(open(os.path.join(RAW, "manifest.json")))
LAYERS = {"0012239": "S5A20262", "0012516": "S7A2021", "0012517": "S7A2021", "0012518": "S7A2021", "0013242": "S7A2025", "0013247": "S7A2025", "0013219": "S7A2023"}

def fetch(v, p):
    name = f"ine/{v}_{p}.json.gz"; path = os.path.join(RAW, name)
    if os.path.exists(path): return json.load(gzip.open(path, "rt", encoding="utf8"))
    for i in range(6):
        try:
            j = json.loads(urllib.request.urlopen(INE.format(v=v, p=p), timeout=120).read()); j = j[0] if isinstance(j, list) else j
            if "Verdadeiro" in j.get("Sucesso", {}):
                with gzip.open(path, "wt", encoding="utf8") as f: json.dump(j, f, ensure_ascii=False, separators=(",", ":"))
                manifest["files"][name] = {"url": INE.format(v=v, p=p), "downloaded": date.today().isoformat(), "licence": "CC BY 4.0 (INE)"}
                return j
        except Exception as e: print("retry", v, p, e, file=sys.stderr)
        time.sleep(3 * (i + 1))
    raise SystemExit(f"failed {v} {p}")

rows = {v: list(fetch(v, p)["Dados"].values())[0] for v, p in LAYERS.items()}
json.dump(manifest, open(os.path.join(RAW, "manifest.json"), "w"), indent=1, ensure_ascii=False, sort_keys=True)
prices = json.load(open(os.path.join(ROOT, "site", "public", "data", "prices.json")))
topo = json.load(open(os.path.join(ROOT, "site", "public", "data", "map", "munis.topo.json")))
slug_of = {g["properties"]["c"][-4:]: g["properties"]["s"] for g in topo["objects"]["m"]["geometries"]}
num = lambda r: float(r["valor"]) if r.get("valor") not in (None, "", "x", "-") else None
out = {s: {} for s in slug_of.values()}
def put(d, key, val):
    if d in slug_of and val is not None: out[slug_of[d]][key] = val
for r in rows["0012239"]:
    if len(r["geocod"]) == 7 and r.get("dim_3_t") in ("Território nacional", "Estrangeiro"):
        v = num(r); d = r["geocod"][-4:]
        if v is not None: out.get(slug_of.get(d, ""), {}).setdefault("dom", {})["pt" if r["dim_3_t"] == "Território nacional" else "abroad"] = round(v)
for v, key in (("0012516", "sea"), ("0012517", "vac"), ("0012518", "area")):
    for r in rows[v]:
        if len(r["geocod"]) == 4: put(r["geocod"], key, num(r))
for r in rows["0013242"]:
    if len(r["geocod"]) == 7 and r.get("dim_3_t") == "Total": put(r["geocod"][-4:], "lic", int(num(r) or 0))
for r in rows["0013247"]:
    if len(r["geocod"]) == 7 and r.get("dim_3_t") == "Construções novas" and r.get("dim_4_t") == "Habitação familiar": put(r["geocod"][-4:], "new", int(num(r) or 0))
for r in rows["0013219"]:
    if len(r["geocod"]) == 7 and r.get("dim_3_t") in ("Total", "Brasil"): put(r["geocod"][-4:], "fr" if r["dim_3_t"] == "Total" else "br", int(num(r) or 0))
periods = {"dom": "2026-Q2", "sea": "2021", "vac": "2021", "area": "2021", "lic": "2025", "new": "2025", "fr": "2023", "br": "2023"}
json.dump({"periods": periods, "munis": out}, open(os.path.join(ROOT, "site", "public", "data", "map", "layers.json"), "w"), separators=(",", ":"), ensure_ascii=False)
cov = {k: sum(1 for m in out.values() if k in m) for k in periods}
print("coverage", cov); print("porto", out.get("porto"))
