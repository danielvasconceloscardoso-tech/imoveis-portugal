# Prompt 30 §1: the keyword map's top 10 per edition, from the autocomplete files (content/seo/autocomplete-*.csv).
# Keeps searches about buying, selling, inheriting, renting out and moving to Portugal; drops the rest (IMT is also
# the driving-licence office). Each phrase is mapped to its cluster, the site page that answers it, the map or
# simulator, the path station and the partner category. Writes content/SEO_ENGINE.md.
# Usage (repo root): python3 scripts/seo/engine.py
import csv, glob, re

KEEP = re.compile(r"casa|im[óo]ve|apartament|comprar|vender|venda|imt|imi\b|nif|heran|partilh|escritur|cr[ée]dit|financiamento|procura[çc]|mais.valias|aluguel|arrendar|morar|"
                  r"maison|appartement|acheter|achat|vendre|immobili|succession|notaire|taxe fonci|imp[oô]t|vivre|retraite|investir|"
                  r"property|house|home|real estate|mortgage|buy|sell|inherit|tax|moving|golden visa|visa|power of attorney|prices?", re.I)
DROP = re.compile(r"^imt$|imt online|imigra|imigrant|carta de condu|permis|condução|driving|imile|brazil$|jobs?|emprego|voos?|flight|weather|clima", re.I)
# Cluster → page, map or simulator, path station, partner (prompt 30 §1.2). Page keys follow site/src/i18n.ts.
CLUSTERS = [
    ("imt|transfer tax|frais de notaire|imp[oô]t.*achat|imposto.*compra", "Taxes on buying", "calculators/total-cost", "cost simulator", "buy · 05 cost", "lawyer"),
    ("nif|tax number|num[ée]ro fiscal", "NIF and tax representative", "faq#nif", "", "buy · 02 NIF", "lawyer"),
    ("procura|power of attorney|procuration", "Signing from abroad", "faq#sign", "", "buy · 07 deed", "lawyer"),
    ("heran|partilh|inherit|succession", "Inheritance", "faq#inherit", "", "inherit · 01", "lawyer"),
    ("cr[ée]dit|financiamento|mortgage", "Mortgage as a non-resident", "calculators/monthly-payment", "mortgage simulator", "buy · 04 finance", "bank"),
    ("escritura|acte (de vente|notari)|deed", "The deed", "faq#deed", "", "buy · 07 deed", "lawyer"),
    ("imi|taxe fonci|property tax|imp[oô]ts? maison|imposto.*im[óo]ve", "Owning: yearly taxes", "faq#imi", "", "buy · 09 after", "tax"),
    ("mais.valias|capital gains|plus.value|vender|venda|vendre|sell", "Selling from abroad", "your-path?door=sell", "", "sell · 01", "tax"),
    ("aluguel|arrendar|renting out|louer|rental", "Renting out", "map (gross yield)", "yield on the map", "buy · 09 after", "tax"),
    ("pre[çc]o|prices?|prix|quanto custa|how much|valor", "Prices", "house-prices", "the map", "buy · 01 where", ""),
    ("morar|moving|vivre|retraite|visa|golden", "Moving to Portugal", "faq#live", "", "buy · 01 where", "lawyer"),
    (".", "Buying from abroad", "buying-from-abroad", "the map", "buy · 01 where", "lawyer"),
]
EDS = {"lu": "Luxembourg", "fr": "France", "ch": "Switzerland", "br": "Brazil", "us": "USA", "il": "Israel"}
out = ["# SEO engine: the keyword map (prompt 30 §1)", "",
       "Top 10 searches per edition and language, collected on 26 Oct 2026 from Google's public autocomplete with the edition's country and language (scripts/seo/autocomplete.py; the 40 per edition and language are in content/seo/). "
       "Demand signal: the fewest letters that still bring the phrase up as a suggestion (\"prefix\", fewer = searched more), then how many seed searches suggested it. "
       "Only searches about buying, selling, inheriting, renting out and moving to Portugal are kept. Trends, AlsoAsked, AnswerThePublic and community questions are added after the go.", "",
       "Each phrase is mapped to the page that answers it, the map or simulator, the path station and the partner category.", ""]
for ed, name in EDS.items():
    for f in sorted(glob.glob(f"content/seo/autocomplete-{ed}-*.csv")):
        lang = f.split(f"autocomplete-{ed}-")[1][:-4]
        rows = [r for r in csv.DictReader(open(f)) if KEEP.search(r["phrase"]) and not DROP.search(r["phrase"])][:10]
        out += [f"## {name} · {lang}", "", "| # | Search | Prefix | Seeds | Cluster | Page | Map or simulator | Station | Partner |", "| --- | --- | --- | --- | --- | --- | --- | --- | --- |"]
        for i, r in enumerate(rows, 1):
            c = next(x for x in CLUSTERS if re.search(x[0], r["phrase"], re.I))
            out.append(f"| {i} | {r['phrase']} | {r.get('prefix') or '–'} | {len(r['seed#position'].split())} | {c[1]} | {c[2]} | {c[3] or '–'} | {c[4]} | {c[5] or '–'} |")
        out.append("")
open("content/SEO_ENGINE.md", "w").write("\n".join(out) + "\n")
print("ok")
