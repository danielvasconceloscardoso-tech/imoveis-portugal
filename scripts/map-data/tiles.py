"""D83 part 2: the data behind the map's tiles, in one compact file, site/public/data/map/tiles.json (public statistics only).

Reads what the site already publishes (site/public/data/prices.json: INE median €/m² per quarter; data/map/layers.json;
data/map/parishes.json; data/map/munis.topo.json) and the partner developments' published prices
(content/developers/projects.json, partners only), plus, when given, the folder of official figures gathered for the tiles
(content/facts/map/tiles/ by default, or --src DIR: INE finest cuts, Copernicus, APA, airports, schools, hospitals; the files it
understands are listed in tiles_src.py).
A tile whose figures are missing is simply left out of the JSON: the map then shows "Em breve", never a made-up number.

Usage (repo root): python3 scripts/map-data/tiles.py [--src DIR]
Writes (operator's step 1, 3 Nov 2026: free versus paid):
  site/public/data/map/tiles.json        the free tiles (below); the paid figures are removed from it
  site/public/data/map/place/<slug>.json one small file per municipality for the card, with the golden sample card ("c5")
                                         where content/facts/map/places/<slug>/ exists (scripts/map-data/place_cards.py)
  site/public/data/map/price5.json       the free price layer: market median per quarter, last five years (munis, regions)
  site/public/data/map/parishes5.json    the same for the parishes
  site/src/data/mapanalysis.json         the paid analysis (build time only): ten years, one year, typology ranges, new and
                                         existing, doctors per 1000, sea temperature, region ranges, full school and health lists
Output keys of tiles.json (before the paid fields are moved out):
  q        latest INE quarter, e.g. "2026-Q2"
  of       NUTS II code -> name
  r2       NUTS II code -> {m2, p1, p5, p10} (and medians of the tile figures, for the plain bands)
  rg       map region (north, centre, ...) -> {c2, k, cities, lo, hi, m2, p5}
  m        municipality slug -> {n, r, c2, n3, m2, p1, p5, p10, [rng (typology low-high), ne [new, existing], nb, nbq, sea, bch, ap, fl, sch, hsp, doc]}
  p        parish code -> {n, m, m2, p1, p5, [rng, ne, bch, ap, sch, hsp]}
  src      tile -> {t: source title, u: url, d: period}
"""
import csv, json, os, sys
from statistics import median

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PUB = os.path.join(ROOT, "site", "public", "data")
J = lambda *p: json.load(open(os.path.join(*p), encoding="utf8"))

prices = J(PUB, "prices.json")
layers = J(PUB, "map", "layers.json")
pars = J(PUB, "map", "parishes.json")
topo = J(PUB, "map", "munis.topo.json")
projects = J(ROOT, "content", "developers", "projects.json")["projects"]
Q = prices["quarters"]; LAST = len(Q) - 1

def chg(series, k):
    if not series or LAST - k < 0: return None
    a, b = series[LAST - k], series[LAST]
    return round((b / a - 1) * 100, 1) if a and b else None

props = {g["properties"]["s"]: g["properties"] for g in topo["objects"]["m"]["geometries"]}
out = {"v": 1, "q": Q[LAST], "of": {k: v["n"] for k, v in prices["regions"].items()}, "r2": {}, "rg": {}, "m": {}, "p": {}, "src": {}}

for code, reg in prices["regions"].items():
    s = reg.get("m2") or []
    out["r2"][code] = {k: v for k, v in {"m2": s[LAST] if s else None, "p1": chg(s, 4), "p5": chg(s, 20), "p10": chg(s, 40)}.items() if v is not None}

# NUTS III from the first characters of the INE code (NUTS 2024; the same table as site/src/lib/places.ts): the card's one line.
NUTS3 = [("11A", "Área Metropolitana do Porto"), ("111", "Alto Minho"), ("112", "Cávado"), ("119", "Ave"), ("11B", "Alto Tâmega e Barroso"),
  ("11C", "Tâmega e Sousa"), ("11D", "Douro"), ("11E", "Terras de Trás-os-Montes"), ("191", "Região de Aveiro"), ("192", "Região de Coimbra"),
  ("193", "Região de Leiria"), ("194", "Viseu Dão Lafões"), ("195", "Beira Baixa"), ("196", "Beiras e Serra da Estrela"), ("1A0", "Grande Lisboa"),
  ("1B0", "Península de Setúbal"), ("1C1", "Alentejo Litoral"), ("1C2", "Baixo Alentejo"), ("1C3", "Alto Alentejo"), ("1C4", "Alentejo Central"),
  ("1D1", "Oeste"), ("1D2", "Médio Tejo"), ("1D3", "Lezíria do Tejo"), ("150", "Algarve"), ("200", "Região Autónoma dos Açores"), ("300", "Região Autónoma da Madeira")]
n3 = lambda code: next((n for k, n in NUTS3 if code.startswith(k)), "")
for slug, p in props.items():
    s = prices["munis"].get(slug, {}).get("m2") or []
    row = {"n": p["n"], "r": p["r"], "c2": p["c"][:2], "n3": n3(p["c"]), "m2": s[LAST] if s else None, "p1": chg(s, 4), "p5": chg(s, 20), "p10": chg(s, 40)}
    out["m"][slug] = {k: v for k, v in row.items() if v is not None}

for code, p in pars["parishes"].items():
    s = p.get("m2") or []
    if not s or s[LAST] is None: continue
    row = {"n": p["n"], "m": p["m"], "m2": s[LAST], "p1": chg(s, 4), "p5": chg(s, 20)}
    out["p"][code] = {k: v for k, v in row.items() if v is not None}

# The map's seven regions: the postcards. "c2" is the NUTS II whose median the region card and its chart use.
REGIONS = {"north": ("11", ["porto", "braga", "guimaraes"]), "centre": ("19", ["coimbra", "aveiro", "leiria"]),
           "lisbon": ("1A", ["lisboa", "cascais", "setubal"]), "alentejo": ("1C", ["evora", "grandola", "beja"]),
           "algarve": ("15", ["faro", "lagos", "loule"]), "madeira": ("30", ["funchal", "porto-moniz", "machico"]),
           "azores": ("20", ["ponta-delgada", "angra-do-heroismo", "horta"])}
for key, (c2, cities) in REGIONS.items():
    vals = sorted(m["m2"] for m in out["m"].values() if m["r"] == key and m.get("m2"))
    r2 = out["r2"].get(c2, {})
    pick = lambda f: vals[min(len(vals) - 1, max(0, round(f * (len(vals) - 1))))] if vals else None
    out["rg"][key] = {k: v for k, v in {"c2": c2, "k": sum(1 for m in out["m"].values() if m["r"] == key),
        "cities": [out["m"][c]["n"] for c in cities if c in out["m"]], "lo": pick(0.1), "hi": pick(0.9), "m2": r2.get("m2"), "p5": r2.get("p5"), "p1": r2.get("p1")}.items() if v is not None}

# New build: the partner developments' published asking prices (€/m² of the dwelling), never an estimate, never a
# non-partner (demo) project. A partner whose prices are on request marks its municipality "nbq" (the tile reads "preços sob
# consulta (promotor)"); elsewhere the new-build line is left out.
for pr in projects:
    if not pr.get("partner") or pr.get("pending"): continue
    m = out["m"].get(pr["muni"]);
    if not m: continue
    per = []
    for u in pr.get("units") or []:
        if u.get("price") and u.get("area"): per.append(u["price"] / u["area"])
    for u in pr.get("unitTable") or []:
        if u.get("price") and u.get("dwelling") and u.get("status") == "available": per.append(u["price"] / u["dwelling"])
    if per:
        lo, hi = round(min(per) / 10) * 10, round(max(per) / 10) * 10
        old = m.get("nb"); m["nb"] = [min(lo, old[0]), max(hi, old[1])] if old else [lo, hi]
        m.setdefault("nbp", []).append(pr["id"])
    else:
        m["nbq"] = 1
out["src"]["mkt"] = {"t": "INE, valor mediano das vendas por m² de alojamentos familiares", "u": "https://www.ine.pt", "d": Q[LAST]}
out["src"]["nb"] = {"t": "Preços pedidos publicados pelos promotores parceiros", "u": "", "d": ""}

# ------------------------------------------------------------------ the official figures gathered for the tiles (optional)
def read_src(d):
    """Merges the gathered figures into out. Each reader is tolerant: a file that is absent leaves its tile on "Em breve"."""
    if not d or not os.path.isdir(d): return
    import tiles_src  # scripts/map-data/tiles_src.py: one reader per file of the gathered folder
    tiles_src.merge(d, out, props)

# Default: the processed copies kept in the repo (content/facts/map/tiles/, SOURCES.md there says what is published and why).
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
read_src(sys.argv[sys.argv.index("--src") + 1] if "--src" in sys.argv else os.path.join(ROOT, "content", "facts", "map", "tiles"))

# Medians per NUTS II of the life figures, for the plain bands ("acima da mediana do Norte").
for key in ("sea", "bch", "doc"):
    by = {}
    for m in out["m"].values():
        if isinstance(m.get(key), (int, float)): by.setdefault(m["c2"], []).append(m[key])
    for c2, vals in by.items(): out["r2"].setdefault(c2, {})[key] = round(median(vals), 1)

# ------------------------------------------------------------------ free versus paid (operator, step 1, 3 Nov 2026)
# The free surfaces (the map card, the layers, the comparison page) read tiles.json and the per-place files; the paid analysis
# reads site/src/data/mapanalysis.json at build time. Everything on the operator's paid list (ten years, one year, typology
# ranges, new versus existing, doctors per inhabitant, distributions and medians for bands, sea temperature: not on the free
# list, so paid by CLAUDE.md rule 17) leaves the public file and goes to the analysis.
import place_cards  # scripts/map-data/place_cards.py: the golden sample cards (content/facts/map/places/<slug>/)
PAID_M = ("p1", "p10", "doc", "rng", "ne", "sea")
PAID_P = ("p1", "rng", "ne")
ana_path = os.path.join(ROOT, "site", "src", "data", "mapanalysis.json")
ana = json.load(open(ana_path, encoding="utf8")) if os.path.exists(ana_path) else {"q": out["q"], "m": {}, "p": {}}
ana["q"] = out["q"]
for key, PAID, src in (("m", PAID_M, out["m"]), ("p", PAID_P, out["p"])):
    for slug, row in src.items():
        moved = {k: row.pop(k) for k in PAID if k in row}
        for k, v in moved.items(): ana.setdefault(key, {}).setdefault(slug, {}).setdefault(k, v)  # tiles_src's richer "ne" wins
ana["r2"] = {c2: dict(v) for c2, v in out["r2"].items()}
ana["rg"] = {k: dict(v) for k, v in out["rg"].items()}
for v in out["r2"].values():
    for k in ("p1", "p10", "sea", "bch", "doc"): v.pop(k, None)
for v in out["rg"].values():
    for k in ("lo", "hi", "p1"): v.pop(k, None)
for k in ("sea", "doc"): out["src"].pop(k, None)
cards = place_cards.build(ROOT, out)
ana["card"] = {slug: c["paid"] for slug, c in cards.items()}
json.dump(ana, open(ana_path, "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
# One small file per municipality for the card (the map opens a place before the whole map has loaded).
pdir = os.path.join(PUB, "map", "place"); os.makedirs(pdir, exist_ok=True)
for slug, row in out["m"].items():
    one = {"q": out["q"], **row}
    if slug in cards: one["c5"] = cards[slug]["free"]
    json.dump(one, open(os.path.join(pdir, f"{slug}.json"), "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))

# The map's free price layer: the market median quarter by quarter over five years (21 quarters, the same span as the card's
# five-year direction). Ten years, rents and yields stay in prices.json for the build and the paid analysis.
K5 = 21
cut = lambda s: (s or [])[-K5:]
free5 = {"quarters": Q[-K5:], "regions": {k: {"n": v["n"], "m2": cut(v.get("m2"))} for k, v in prices["regions"].items()},
         "munis": {k: {"n": v["n"], "r": v.get("r"), "m2": cut(v.get("m2"))} for k, v in prices["munis"].items()}}
json.dump(free5, open(os.path.join(PUB, "map", "price5.json"), "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
pars5 = {"quarters": pars["quarters"][-K5:], "parishes": {k: {"n": v["n"], "m": v["m"], "m2": cut(v.get("m2"))} for k, v in pars["parishes"].items()}}
json.dump(pars5, open(os.path.join(PUB, "map", "parishes5.json"), "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))

path = os.path.join(PUB, "map", "tiles.json")
json.dump(out, open(path, "w", encoding="utf8"), ensure_ascii=False, separators=(",", ":"))
cov = {k: sum(1 for m in out["m"].values() if k in m) for k in ("m2", "p5", "nb", "nbq", "bch", "ap", "fl", "sch", "hsp")}
covp = {k: sum(1 for m in out["p"].values() if k in m) for k in ("m2", "p5", "bch", "ap", "sch", "hsp")}
print(f"tiles.json: {os.path.getsize(path) // 1024} KB · {len(out['m'])} concelhos, {len(out['p'])} freguesias\n  concelhos {cov}\n  freguesias {covp}\n  golden sample cards: {sorted(cards)}")
