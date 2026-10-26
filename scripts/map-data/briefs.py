"""Prompt 25 §2.4: a short quarterly brief per concelho, generated from the INE data (site/public/data/prices.json).

Writes content/map/briefs/{quarter}.json with every brief marked "reviewed": false. A person reads each one, edits it if
needed and sets "reviewed": true; only reviewed briefs reach the site (site/src/lib/mapdata.ts). Editorial responsibility
sits with that person, so no AI label applies (AI Act, art. 50(4)); the text is a template filled with figures anyway.
Re-running keeps reviewed briefs and any edited text untouched.

Usage (from the repo root): python3 scripts/map-data/briefs.py
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
P = json.load(open(os.path.join(ROOT, "site", "public", "data", "prices.json")))
q = P["quarters"][-1]; y, n = q.split("-Q")
QL = {"pt": f"{n}.º trimestre de {y}", "en": f"Q{n} {y}", "fr": f"{n}e trimestre {y}"}

def num(v, lang, d=0):
    s = f"{v:,.{d}f}"
    return s.replace(",", " ").replace(".", ",") if lang in ("pt", "fr") else s
def eur(v, lang, d=0): return f"€{num(v, lang, d)}" if lang == "en" else f"{num(v, lang, d)} €"
def pct(v, lang, d=1): return ("+" if v > 0 else "−" if v < 0 else "") + num(abs(v), lang, d) + "%"

def brief(s, lang):
    name, p, r = s["n"], s["m2"][-1], s["rq"][-1]
    if not p: return None
    c4 = s["mo"]["c4"] if s.get("mo") else None
    parts = {
        "pt": [f"{name}: o preço mediano das casas vendidas nos 12 meses até ao {QL['pt']} foi de {eur(p, 'pt')} por m²"
               + (f", {pct(c4, 'pt')} num ano." if c4 is not None else "."),
               f"A renda mediana dos novos contratos foi de {eur(r, 'pt', 2)} por m² por mês, uma rentabilidade bruta de {num(s['yield'], 'pt', 1)}%." if r and s.get("yield") else "",
               f"Desde o 1.º trimestre de 2016, o preço variou {pct(s["g10"], "pt", 0)}." if s.get("g10") is not None else ""],
        "en": [f"{name}: homes sold in the 12 months to {QL['en']} had a median price of {eur(p, 'en')} per m²"
               + (f", {pct(c4, 'en')} on a year earlier." if c4 is not None else "."),
               f"New leases had a median rent of {eur(r, 'en', 2)} per m² a month, a gross yield of {num(s['yield'], 'en', 1)}%." if r and s.get("yield") else "",
               f"Since Q1 2016, the price has changed {pct(s["g10"], "en", 0)}." if s.get("g10") is not None else ""],
        "fr": [f"{name} : le prix médian des logements vendus sur les 12 mois jusqu'au {QL['fr']} était de {eur(p, 'fr')} le m²"
               + (f", {pct(c4, 'fr')} sur un an." if c4 is not None else "."),
               f"Le loyer médian des nouveaux baux était de {eur(r, 'fr', 2)} le m² par mois, soit un rendement brut de {num(s['yield'], 'fr', 1)} %." if r and s.get("yield") else "",
               f"Depuis le 1er trimestre 2016, le prix a varié de {pct(s["g10"], "fr", 0)}." if s.get("g10") is not None else ""],
    }[lang]
    return " ".join(x for x in parts if x) + {"pt": " Fonte: INE.", "en": " Source: INE.", "fr": " Source : INE."}[lang]

path = os.path.join(ROOT, "content", "map", "briefs", f"{q}.json")
os.makedirs(os.path.dirname(path), exist_ok=True)
old = json.load(open(path))["briefs"] if os.path.exists(path) else {}
out = {}
for slug, s in sorted(P["munis"].items()):
    b = {lang: brief(s, lang) for lang in ("pt", "en", "fr")}
    if not b["pt"]: continue
    prev = old.get(slug)
    out[slug] = prev if prev and (prev.get("reviewed") or prev.get("edited")) else {"reviewed": False, **b}
json.dump({"quarter": q, "how": "Set \"reviewed\": true after reading a brief (edit the text first if needed, and add \"edited\": true). Only reviewed briefs appear on the map.",
           "briefs": out}, open(path, "w"), ensure_ascii=False, indent=1)
print(len(out), "briefs;", sum(1 for b in out.values() if b["reviewed"]), "reviewed →", os.path.relpath(path, ROOT))
print(out["porto"]["pt"]); print(out["porto"]["en"]); print(out["porto"]["fr"])
