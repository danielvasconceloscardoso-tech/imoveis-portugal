# Prompt 30 §1: the questions people actually search, per edition and language, from Google's public autocomplete
# (suggestqueries.google.com, country gl and language hl set per edition). Each seed's suggestions are recorded with
# their rank; a phrase's demand signal is the sum over seeds of (11 − rank), so phrases suggested early and for
# several seeds come first. Writes content/seo/autocomplete-{edition}-{lang}.csv (top 40, with source and date).
# Usage (repo root): python3 scripts/seo/autocomplete.py
import csv, json, os, time, urllib.parse, urllib.request
from collections import defaultdict

DATE = time.strftime("%Y-%m-%d")
SEEDS = {
    "en": ["buying a house in portugal", "buy property in portugal", "how to buy a house in portugal", "can americans buy property in portugal",
           "portugal real estate", "moving to portugal", "portugal golden visa", "nif portugal", "imt portugal", "property tax portugal",
           "inheritance tax portugal", "selling property in portugal", "renting out property in portugal", "mortgage in portugal non resident",
           "is it worth buying property in portugal", "where to buy property in portugal", "portugal house prices", "power of attorney portugal"],
    "pt": ["comprar casa em portugal", "comprar casa em portugal emigrante", "imt", "imt não residente", "herança casa portugal", "vender casa em portugal",
           "crédito habitação não residente", "imi", "procuração portugal", "nif portugal", "casa em portugal", "comprar casa na terra",
           "partilhas herança", "mais valias venda casa", "preço casas portugal", "escritura casa", "comprar casa no luxemburgo ou em portugal", "casa de férias portugal"],
    "pt-BR": ["comprar imóvel em portugal", "comprar casa em portugal", "comprar apartamento em portugal", "financiamento imóvel portugal",
              "morar em portugal", "visto portugal", "imposto imóvel portugal", "nif portugal", "investir em imóvel em portugal", "aluguel em portugal",
              "brasileiro pode comprar imóvel em portugal", "quanto custa uma casa em portugal", "melhores cidades portugal", "imt portugal"],
    "fr": ["acheter maison au portugal", "acheter appartement portugal", "acheter au portugal", "impot maison portugal", "succession portugal",
           "vendre maison au portugal", "credit immobilier portugal", "vivre au portugal", "frais de notaire portugal", "nif portugal",
           "imt portugal", "taxe fonciere portugal", "procuration portugal", "prix immobilier portugal", "investir au portugal", "retraite au portugal"],
}
EDITIONS = {"lu": [("pt", "lu", "pt-PT"), ("fr", "lu", "fr")], "fr": [("pt", "fr", "pt-PT"), ("fr", "fr", "fr")], "ch": [("pt", "ch", "pt-PT"), ("fr", "ch", "fr")],
            "br": [("pt-BR", "br", "pt-BR")], "us": [("en", "us", "en")], "il": [("en", "il", "en")]}
os.makedirs("content/seo", exist_ok=True)


def suggest(q, hl, gl):
    u = "https://suggestqueries.google.com/complete/search?" + urllib.parse.urlencode({"client": "firefox", "hl": hl, "gl": gl, "q": q})
    for i in range(3):
        try:
            return json.loads(urllib.request.urlopen(u, timeout=20).read().decode("utf-8", "replace"))[1]
        except Exception:
            time.sleep(2 + 3 * i)
    return []


for ed, runs in EDITIONS.items():
    for seeds_key, gl, lang in runs:
        score, seen = defaultdict(int), defaultdict(list)
        for s in SEEDS[seeds_key]:
            for r, phrase in enumerate(suggest(s, lang if lang != "pt-PT" else "pt", gl)[:10], 1):
                score[phrase] += 11 - r; seen[phrase].append(f"{s}#{r}")
            time.sleep(.6)
        top = sorted(score, key=lambda p: (-score[p], p))[:40]
        f = f"content/seo/autocomplete-{ed}-{lang}.csv"
        with open(f, "w", newline="") as fh:
            w = csv.writer(fh); w.writerow(["rank", "phrase", "signal", "seed#position", "source", "date"])
            for i, p in enumerate(top, 1): w.writerow([i, p, score[p], " ".join(seen[p]), f"Google autocomplete gl={gl} hl={lang}", DATE])
        print(ed, lang, len(top), "|", " · ".join(top[:5]))


# Second pass, the demand signal: the shortest prefix that still brings a phrase up (fewer letters typed = searched
# more). Tested at each word boundary and one letter into the next word; recorded as "prefix" (characters).
def depth(phrase, hl, gl):
    words = phrase.split()
    for k in range(1, len(words) + 1):
        for pre in ([" ".join(words[:k])] + ([" ".join(words[:k]) + " " + words[k][0]] if k < len(words) else [])):
            if phrase in suggest(pre, hl, gl)[:10]: return len(pre)
            time.sleep(.5)
    return len(phrase)


if os.environ.get("DEPTH"):
    for ed, runs in EDITIONS.items():
        for seeds_key, gl, lang in runs:
            f = f"content/seo/autocomplete-{ed}-{lang}.csv"; rows = list(csv.DictReader(open(f)))
            for r in rows[:30]: r["prefix"] = depth(r["phrase"], lang if lang != "pt-PT" else "pt", gl)
            for r in rows[30:]: r["prefix"] = ""
            rows.sort(key=lambda r: (r["prefix"] == "", int(r["prefix"] or 999), -int(r["signal"])))
            with open(f, "w", newline="") as fh:
                w = csv.DictWriter(fh, ["rank", "phrase", "signal", "prefix", "seed#position", "source", "date"]); w.writeheader()
                for i, r in enumerate(rows, 1): r["rank"] = i; w.writerow(r)
            print(ed, lang, " · ".join(f'{r["phrase"]} ({r["prefix"]})' for r in rows[:10]), flush=True)
