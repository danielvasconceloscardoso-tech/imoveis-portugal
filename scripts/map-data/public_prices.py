"""The free price files the browser may download (operator, 3 Nov 2026: acceptance line 2, "No 10-year data, yield or chart
free anywhere"). The full INE series (ten years, rents, gross yields, momentum, comparable places) stay at build time in
site/src/data/ (build.py), read by the paid analysis and the build; nothing under site/public/ carries them.

Reads  site/src/data/prices.json, site/src/data/parishes.json (build.py)
Writes site/public/data/prices.json        per municipality and region: the latest market median per m² ("m2") and the
                                           five-year change in % ("p5"), the latest quarter ("q"), the municipalities
                                           with parish figures ("parishMunis")
       site/public/data/map/parishes.json  the same two fields per parish
Both URLs stay as they were (the embeddable map reads them); only the paid fields left them.

Usage (repo root): python3 scripts/map-data/public_prices.py     (after build.py; tiles.py uses the same five-year rule)
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(ROOT, "site", "src", "data")
PUB = os.path.join(ROOT, "site", "public", "data")
J = lambda *p: json.load(open(os.path.join(*p), encoding="utf8"))

prices, pars = J(SRC, "prices.json"), J(SRC, "parishes.json")
Q = prices["quarters"]; LAST = len(Q) - 1
FREE = {"n", "r", "m", "m2", "p5"}  # anything else is paid (CLAUDE.md rule 17: when in doubt, paid)

def p5(series, k=20):  # the same rule as tiles.py chg(): five years = 20 quarters, one decimal
    if not series or LAST - k < 0: return None
    a, b = series[LAST - k], series[LAST]
    return round((b / a - 1) * 100, 1) if a and b else None

def slim(s):
    m2 = s.get("m2") or []
    assert len(m2) in (0, len(Q)), s.get("n")
    out = {k: s[k] for k in ("n", "r", "m") if s.get(k)}
    out["m2"] = m2[LAST] if m2 else None
    ch = p5(m2)
    if ch is not None: out["p5"] = ch
    assert set(out) <= FREE, out
    return out

assert pars["quarters"] == Q, "parishes.json and prices.json must share their quarters"
pub = {"v": 2, "q": Q[LAST], "released": prices.get("released", {}), "parishMunis": prices["parishMunis"],
       "regions": {k: slim(v) for k, v in prices["regions"].items()}, "munis": {k: slim(v) for k, v in prices["munis"].items()}}
json.dump(pub, open(os.path.join(PUB, "prices.json"), "w", encoding="utf8"), separators=(",", ":"), ensure_ascii=False)
json.dump({"v": 2, "q": Q[LAST], "parishes": {k: slim(v) for k, v in pars["parishes"].items()}},
          open(os.path.join(PUB, "map", "parishes.json"), "w", encoding="utf8"), separators=(",", ":"), ensure_ascii=False)
print("public prices.json:", os.path.getsize(os.path.join(PUB, "prices.json")), "bytes; parishes.json:", os.path.getsize(os.path.join(PUB, "map", "parishes.json")), "bytes")
