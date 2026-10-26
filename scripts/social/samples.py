# Prompt 30 §5.4: the eight sample posts for week 4 (launch week), one per format 1–8, in PT, EN and FR.
# Every figure comes from content/facts/facts.csv or site/public/data/prices.json (INE). Writes
# social/instagram/posts/week-04/{date}_{NN}_{slug}/post.md and spec.json; scripts/social/render.mjs draws the cards.
# Usage (repo root): python3 scripts/social/samples.py
import json, os

P = json.load(open("site/public/data/prices.json")); Q = P["quarters"]; L = len(Q) - 1
m2 = lambda k, i=L: P["munis"][k]["m2"][i]
USD = 1.1193                                  # ecb-eur-usd, 23 Oct 2026
LUX = 10269                                   # lu-m2-2026q2, Luxembourg-Ville, mean, existing apartments
BASE = "https://imoveisportugal.lu"
LANGS = ["pt", "en", "fr"]


def num(v, lang, d=0):
    s = f"{v:,.{d}f}"
    return s if lang == "en" else s.replace(",", " ").replace(".", ",")


def eur(v, lang): return f"€{num(v, 'en')}" if lang == "en" else f"{num(v, lang)} €"
def usd(v, lang): return f"${num(v, 'en')}" if lang == "en" else f"{num(v, lang)} $" if lang == "fr" else f"{num(v, lang)} USD"
def m2s(v, lang, d=1): return f"{num(v, lang, d)} m²"


SRC_INE = {"pt": "Fonte: INE, mediana dos preços das casas vendidas, 2.º trimestre de 2026", "en": "Source: INE, median price of homes sold, 2nd quarter 2026", "fr": "Source : INE, prix médian des logements vendus, 2e trimestre 2026"}
TAGS = "#ImoveisPortugal"
posts = []

# 1. Here vs there (Luxembourg edition)
items = [("Luxembourg-Ville", 1, LUX), ("Lisboa", LUX / m2("lisboa"), m2("lisboa")), ("Porto", LUX / m2("porto"), m2("porto")), ("Gondomar", LUX / m2("gondomar"), m2("gondomar"))]
posts.append(dict(date="2026-12-01", order=1, slug="here-vs-there", format="here-vs-there", keyword={"pt": "comprar casa em portugal emigrante luxemburgo", "en": "buying a house in portugal from luxembourg", "fr": "acheter au portugal depuis le luxembourg"},
  link=f"{BASE}/pt/lu/mapa/?budget={LUX}&utm_source=instagram&utm_medium=social&utm_campaign=w04-here-vs-there", sources=["lu-m2-2026q2", "ine-m2-2026q2"],
  spec={l: dict(kicker={"pt": "Aqui e lá", "en": "Here and there", "fr": "Ici et là-bas"}[l],
    h={"pt": "Um metro quadrado na cidade do Luxemburgo. Quatro em Gondomar.", "en": "One square metre in Luxembourg City. Four in Gondomar.", "fr": "Un mètre carré à Luxembourg-Ville. Quatre à Gondomar."}[l],
    items=[{"place": p if i else {"pt": "Luxemburgo (cidade)", "en": "Luxembourg City", "fr": "Luxembourg-Ville"}[l], "m2": a, "v": m2s(a, l) if i else "1 m²"} for i, (p, a, _) in enumerate(items)],
    note={"pt": f"O preço de 1 m² na cidade do Luxemburgo ({eur(LUX, 'pt')}, média, apartamentos existentes, julho de 2025 a junho de 2026) compra esta área em Portugal, à mediana do INE.",
          "en": f"The price of 1 m² in Luxembourg City ({eur(LUX, 'en')}, average, existing apartments, July 2025 to June 2026) buys this much in Portugal at the INE median.",
          "fr": f"Le prix d'1 m² à Luxembourg-Ville ({eur(LUX, 'fr')}, moyenne, appartements existants, juillet 2025 à juin 2026) achète cette surface au Portugal, au prix médian de l'INE."}[l],
    source={"pt": "Fontes: Observatoire de l'Habitat (LU), 2026 T2; INE, 2.º trimestre de 2026", "en": "Sources: Observatoire de l'Habitat (LU), Q2 2026; INE, 2nd quarter 2026", "fr": "Sources : Observatoire de l'Habitat (LU), T2 2026 ; INE, 2e trimestre 2026"}[l]) for l in LANGS},
  caption={"pt": "Um metro quadrado na cidade do Luxemburgo. Quatro em Gondomar.\nCom o preço de 1 m² na capital compra 2 m² em Lisboa, quase 3 no Porto e mais de 4 em Gondomar, à mediana do INE.\nVeja a sua zona no mapa: link na bio, página Mapa.",
           "en": "One square metre in Luxembourg City. Four in Gondomar.\nThe price of 1 m² in the capital buys 2 m² in Lisbon, almost 3 in Porto and over 4 in Gondomar, at the INE median.\nSee your area on the map: link in bio, Map page.",
           "fr": "Un mètre carré à Luxembourg-Ville. Quatre à Gondomar.\nLe prix d'1 m² dans la capitale achète 2 m² à Lisbonne, presque 3 à Porto et plus de 4 à Gondomar, au prix médian de l'INE.\nVoyez votre région sur la carte : lien dans la bio, page Carte."},
  alt="Squares to scale: one square metre in Luxembourg City against 2.0 m² in Lisbon, 2.8 m² in Porto and 4.4 m² in Gondomar, buying a house in Portugal from Luxembourg.",
  tags=[TAGS, "#CasaEmPortugal", "#PortuguesesNoLuxemburgo", "#Porto", "#Lisboa"]))

# 2. What your budget buys (US edition)
B = 500000; Be = B / USD
places = [("Lisboa", "lisboa"), ("Cascais", "cascais"), ("Loulé", "loule"), ("Porto", "porto"), ("Gondomar", "gondomar")]
posts.append(dict(date="2026-12-03", order=2, slug="budget-buys", format="budget-buys", keyword={"pt": "quanto custa uma casa em portugal", "en": "how much is a house in portugal", "fr": "prix immobilier portugal"},
  link=f"{BASE}/en/us/map/?budget={round(Be)}&cur=USD&utm_source=instagram&utm_medium=social&utm_campaign=w04-budget-buys", sources=["ine-m2-2026q2", "ecb-eur-usd"],
  spec={l: dict(kicker={"pt": "O que o orçamento compra", "en": "What a budget buys", "fr": "Ce qu'un budget achète"}[l],
    h={"pt": "500 000 dólares, cinco lugares.", "en": "$500,000, five places.", "fr": "500 000 dollars, cinq lieux."}[l],
    items=[{"place": n, "m2": Be / m2(k), "v": m2s(Be / m2(k), l, 0)} for n, k in places],
    note={"pt": f"{usd(B, 'pt')} = {eur(Be, 'pt')} à taxa do BCE de 23 de outubro de 2026, dividido pela mediana do INE de cada concelho. Plantas à escala.",
          "en": f"{usd(B, 'en')} = {eur(Be, 'en')} at the ECB rate of 23 October 2026, divided by each municipality's INE median. Floor plans to scale.",
          "fr": f"{usd(B, 'fr')} = {eur(Be, 'fr')} au taux BCE du 23 octobre 2026, divisé par le prix médian INE de chaque commune. Plans à l'échelle."}[l],
    source=SRC_INE[l] + {"pt": "; BCE", "en": "; ECB", "fr": " ; BCE"}[l]) for l in LANGS},
  caption={"pt": "500 000 dólares, cinco lugares.\n86 m² em Lisboa, 91 em Cascais, 108 em Loulé, 123 no Porto e 190 em Gondomar, à mediana do INE.\nFaça as suas contas no mapa: link na bio.",
           "en": "$500,000, five places.\n86 m² in Lisbon, 91 in Cascais, 108 in Loulé, 123 in Porto and 190 in Gondomar, at the INE median.\nRun your numbers on the map: link in bio.",
           "fr": "500 000 dollars, cinq lieux.\n86 m² à Lisbonne, 91 à Cascais, 108 à Loulé, 123 à Porto et 190 à Gondomar, au prix médian de l'INE.\nFaites vos calculs sur la carte : lien dans la bio."},
  alt="Floor plans to scale of what 500,000 dollars buys in Lisbon, Cascais, Loulé, Porto and Gondomar at the median price, how much is a house in Portugal.",
  tags=[TAGS, "#BuyingInPortugal", "#AmericansInPortugal", "#Cascais", "#Algarve"]))

# 3. Then and now (Lisbon)
a16, a26 = 100000 / m2("lisboa", 0), 100000 / m2("lisboa")
posts.append(dict(date="2026-12-04", order=1, slug="then-and-now", format="then-and-now", keyword={"pt": "preço casas lisboa", "en": "lisbon house prices", "fr": "prix immobilier lisbonne"},
  link=f"{BASE}/en/us/house-prices/?utm_source=instagram&utm_medium=social&utm_campaign=w04-then-and-now", sources=["ine-m2-history", "ine-m2-2026q2"],
  spec={l: dict(kicker={"pt": "Antes e agora", "en": "Then and now", "fr": "Avant et maintenant"}[l],
    h={"pt": "Os mesmos 100 mil euros, dez anos depois.", "en": "Your 2016 budget would like a word.", "fr": "Les mêmes 100 000 €, dix ans plus tard."}[l],
    items=[{"place": {"pt": "Lisboa, 1.º trimestre de 2016", "en": "Lisbon, Q1 2016", "fr": "Lisbonne, T1 2016"}[l], "m2": a16, "v": m2s(a16, l, 0)},
           {"place": {"pt": "Lisboa, 2.º trimestre de 2026", "en": "Lisbon, Q2 2026", "fr": "Lisbonne, T2 2026"}[l], "m2": a26, "v": m2s(a26, l, 0)}],
    note={"pt": f"{eur(100000, 'pt')} a dividir pela mediana do INE em Lisboa: {eur(m2('lisboa', 0), 'pt')} por m² em 2016, {eur(m2('lisboa'), 'pt')} em 2026.",
          "en": f"{eur(100000, 'en')} divided by the INE median in Lisbon: {eur(m2('lisboa', 0), 'en')} per m² in 2016, {eur(m2('lisboa'), 'en')} in 2026.",
          "fr": f"{eur(100000, 'fr')} divisés par le prix médian INE à Lisbonne : {eur(m2('lisboa', 0), 'fr')} le m² en 2016, {eur(m2('lisboa'), 'fr')} en 2026."}[l],
    source={"pt": "Fonte: INE, preços medianos por m², 2016 a 2026", "en": "Source: INE, median prices per m², 2016 to 2026", "fr": "Source : INE, prix médians au m², 2016 à 2026"}[l]) for l in LANGS},
  caption={"pt": "Os mesmos 100 mil euros, dez anos depois.\nEm 2016 compravam 53 m² em Lisboa. Hoje, 19.\nVeja dez anos de preços do seu concelho: link na bio.",
           "en": "Your 2016 budget would like a word.\nIn 2016, 100,000 € bought 53 m² in Lisbon. Today it buys 19.\nSee ten years of prices for your area: link in bio.",
           "fr": "Les mêmes 100 000 €, dix ans plus tard.\nEn 2016, ils achetaient 53 m² à Lisbonne. Aujourd'hui, 19.\nVoyez dix ans de prix dans votre commune : lien dans la bio."},
  alt="Two squares to scale: 100,000 euros bought 53 square metres in Lisbon in 2016 and 19 in 2026, Lisbon house prices over ten years.",
  tags=[TAGS, "#PortugalRealEstate", "#Lisboa", "#ExpatsPortugal"]))

# 4. Ten years in one line (Porto)
pr = P["munis"]["porto"]
posts.append(dict(date="2026-12-04", order=2, slug="ten-years-porto", format="ten-years", keyword={"pt": "preço casas porto", "en": "porto house prices", "fr": "prix immobilier porto"},
  link=f"{BASE}/en/us/map/?place=porto&utm_source=instagram&utm_medium=social&utm_campaign=w04-ten-years", sources=["ine-m2-history"],
  spec={l: dict(kicker={"pt": "Dez anos", "en": "Ten years", "fr": "Dix ans"}[l], h={"pt": "O Porto, dez anos numa linha.", "en": "Porto, ten years in one line.", "fr": "Porto, dix ans en une ligne."}[l],
    big=f"+{pr['g10']}%", series=pr["m2"], **{"from": f"2016 · {eur(pr['m2'][0], l)}", "to": f"2026 · {eur(pr['m2'][L], l)}"},
    note={"pt": "Mediana do preço por m² das casas vendidas no concelho do Porto, a cada trimestre.", "en": "Median price per m² of homes sold in the municipality of Porto, every quarter.", "fr": "Prix médian au m² des logements vendus dans la commune de Porto, chaque trimestre."}[l],
    source={"pt": "Fonte: INE, 1.º trimestre de 2016 ao 2.º de 2026", "en": "Source: INE, Q1 2016 to Q2 2026", "fr": "Source : INE, T1 2016 au T2 2026"}[l]) for l in LANGS},
  caption={"pt": "O Porto, dez anos numa linha.\nO metro quadrado vendido passou de 1 088 € para 3 631 €: mais 234%.\nVeja a linha do seu concelho no mapa: link na bio.",
           "en": "Porto, ten years in one line.\nThe square metre sold went from €1,088 to €3,631: up 234%.\nSee your area's line on the map: link in bio.",
           "fr": "Porto, dix ans en une ligne.\nLe mètre carré vendu est passé de 1 088 € à 3 631 € : plus 234 %.\nVoyez la ligne de votre commune sur la carte : lien dans la bio."},
  alt="Line chart of the median price per square metre in Porto from 2016 to 2026, up 234 percent, Porto house prices.",
  tags=[TAGS, "#Porto", "#PortugalRealEstate", "#ImobiliarioPortugal"]))

# 5. The cost sheet (non-resident, 500,000 €)
price = 500000; imt = price * .075; isd = price * .008; deed = 375; tot = price + imt + isd + deed
posts.append(dict(date="2026-12-02", order=1, slug="cost-sheet", format="cost-sheet", keyword={"pt": "imt não residente", "en": "buying a house in portugal costs", "fr": "frais de notaire portugal"},
  link=f"{BASE}/en/us/calculators/total-cost/?price={price}&resident=0&utm_source=instagram&utm_medium=social&utm_campaign=w04-cost-sheet", sources=["pt-imt-nonresident-flat", "pt-is-purchase", "pt-casa-pronta-fees", "ecb-eur-usd"],
  spec={l: dict(kicker={"pt": "A conta completa", "en": "The full bill", "fr": "Le compte complet"}[l], h={"pt": "Uma casa de 500 000 €, com tudo.", "en": "A €500,000 home, all in.", "fr": "Un bien à 500 000 €, tout compris."}[l],
    tag={"pt": "Cálculo ilustrativo · comprador não residente", "en": "Illustrative calculation · non-resident buyer", "fr": "Calcul illustratif · acheteur non résident"}[l],
    rows=[{"k": {"pt": "Preço", "en": "Price", "fr": "Prix"}[l], "v": eur(price, l)},
          {"k": "IMT", "sub": {"pt": "7,5%, taxa única para não residentes", "en": "7.5%, flat rate for non-residents", "fr": "7,5 %, taux unique pour non-résidents"}[l], "v": eur(imt, l)},
          {"k": {"pt": "Imposto do selo", "en": "Stamp duty", "fr": "Droit de timbre"}[l], "sub": "0,8%" if l != "en" else "0.8%", "v": eur(isd, l)},
          {"k": {"pt": "Escritura e registo", "en": "Deed and registration", "fr": "Acte et enregistrement"}[l], "sub": "Casa Pronta", "v": eur(deed, l)}],
    total={"k": "Total", "v": eur(tot, l), "sub": f"≈ {usd(tot * USD, l)}"},
    source={"pt": "Fontes: Código do IMT, art. 17.º, n.º 10; Imposto do Selo, verba 1.1; Casa Pronta; BCE, 23/10/2026", "en": "Sources: IMT Code, art. 17(10); Stamp Duty, item 1.1; Casa Pronta; ECB, 23 Oct 2026", "fr": "Sources : Code de l'IMT, art. 17, n.º 10 ; droit de timbre, poste 1.1 ; Casa Pronta ; BCE, 23/10/2026"}[l]) for l in LANGS},
  caption={"pt": "Uma casa de 500 000 €, com tudo.\nPara quem não é residente: 37 500 € de IMT, 4 000 € de selo e 375 € de escritura. Total: 541 875 €.\nFaça as suas contas no simulador: link na bio.",
           "en": "A €500,000 home, all in.\nFor a non-resident: €37,500 IMT, €4,000 stamp duty and €375 for the deed. Total: €541,875, about $606,500.\nRun your numbers: link in bio, Calculators.",
           "fr": "Un bien à 500 000 €, tout compris.\nPour un non-résident : 37 500 € d'IMT, 4 000 € de droit de timbre et 375 € d'acte. Total : 541 875 €.\nFaites vos calculs : lien dans la bio, Simulateurs."},
  alt="Illustrative cost of buying a 500,000 euro home in Portugal as a non-resident: IMT, stamp duty, deed and registration, total 541,875 euros.",
  tags=[TAGS, "#BuyingInPortugal", "#CasaEmPortugal", "#MovingToPortugal"]))

# 6. Myth vs the law (power of attorney)
posts.append(dict(date="2026-12-03", order=1, slug="myth-vs-law-poa", format="myth-vs-law", keyword={"pt": "procuração portugal", "en": "power of attorney portugal", "fr": "procuration portugal"},
  link=f"{BASE}/en/us/faq/?utm_source=instagram&utm_medium=social&utm_campaign=w04-myth-vs-law#en-sign", sources=["pt-poa-apostille"],
  spec={l: dict(kicker={"pt": "Mito e lei", "en": "Myth and law", "fr": "Mythe et loi"}[l], h={"pt": "Não precisa de vir a Portugal para assinar.", "en": "You don't need to fly in to sign.", "fr": "Pas besoin de venir au Portugal pour signer."}[l],
    myth={"pt": "Quem compra tem de assinar a escritura em Portugal.", "en": "The buyer has to sign the deed in Portugal.", "fr": "L'acheteur doit signer l'acte au Portugal."}[l],
    law={"pt": "Uma procuração resolve: assinada num notário com a Apostila de Haia, ou num consulado português.", "en": "A power of attorney does it: signed before a notary with the Hague Apostille, or at a Portuguese consulate.", "fr": "Une procuration suffit : signée chez un notaire avec l'apostille de La Haye, ou dans un consulat portugais."}[l],
    source={"pt": "Fonte: Consulado-Geral de Portugal em Newark, Procuração", "en": "Source: Consulate General of Portugal in Newark, power of attorney", "fr": "Source : Consulat général du Portugal à Newark, procuration"}[l]) for l in LANGS},
  caption={"pt": "Não precisa de vir a Portugal para assinar.\nUma procuração com a Apostila de Haia, ou feita no consulado, chega para a escritura. As visitas podem ser por vídeo.\nLeia a resposta completa: link na bio, Perguntas.",
           "en": "You don't need to fly in to sign.\nA power of attorney with the Hague Apostille, or signed at the consulate, covers the deed. Viewings can be done by video.\nRead the answer: link in bio, FAQ.",
           "fr": "Pas besoin de venir au Portugal pour signer.\nUne procuration avec l'apostille de La Haye, ou faite au consulat, suffit pour l'acte. Les visites peuvent se faire en vidéo.\nLisez la réponse : lien dans la bio, Questions."},
  alt="Myth and law: you do not need to be in Portugal to sign the deed, a power of attorney with the Hague Apostille or signed at a Portuguese consulate is enough.",
  tags=[TAGS, "#BuyingInPortugal", "#PortuguesesEmFranca", "#AmericansInPortugal"]))

# 7. One number (IMT 7.5%)
posts.append(dict(date="2026-12-01", order=2, slug="one-number-imt", format="one-number", keyword={"pt": "imt não residentes", "en": "imt portugal", "fr": "imt portugal"},
  link=f"{BASE}/en/us/calculators/total-cost/?utm_source=instagram&utm_medium=social&utm_campaign=w04-one-number", sources=["pt-imt-nonresident-flat", "pt-imt-nonresident-exceptions"],
  spec={l: dict(kicker={"pt": "Um número", "en": "One number", "fr": "Un chiffre"}[l], big="7,5%" if l == "pt" else "7.5%" if l == "en" else "7,5 %",
    h={"pt": "Os 7,5% que ninguém põe na folha de cálculo.", "en": "The 7.5% nobody puts in the spreadsheet.", "fr": "Les 7,5 % que personne ne met dans le tableur."}[l],
    note={"pt": "IMT de quem compra casa sem ser residente em Portugal, a taxa única, salvo exceções (por exemplo, tornar-se residente em dois anos).",
          "en": "IMT on a home bought by a non-resident, at a flat rate, unless an exception applies (becoming resident within two years, for example).",
          "fr": "IMT sur un logement acheté par un non-résident, à taux unique, sauf exception (devenir résident dans les deux ans, par exemple)."}[l],
    source={"pt": "Fonte: Código do IMT, art. 17.º, n.º 10 (DL 97/2026)", "en": "Source: IMT Code, art. 17(10), Decree-Law 97/2026", "fr": "Source : Code de l'IMT, art. 17, n.º 10 (DL 97/2026)"}[l]) for l in LANGS},
  caption={"pt": "Os 7,5% que ninguém põe na folha de cálculo.\nÉ o IMT de quem compra casa sem ser residente. Há exceções, e uma delas é tornar-se residente em dois anos.\nFaça as suas contas: link na bio, Simuladores.",
           "en": "The 7.5% nobody puts in the spreadsheet.\nIt's the IMT on a home bought by a non-resident. There are exceptions, such as becoming resident within two years.\nRun your numbers: link in bio, Calculators.",
           "fr": "Les 7,5 % que personne ne met dans le tableur.\nC'est l'IMT d'un non-résident qui achète un logement. Il y a des exceptions, comme devenir résident dans les deux ans.\nFaites vos calculs : lien dans la bio, Simulateurs."},
  alt="7.5 percent: the IMT transfer tax rate for non-resident buyers of a home in Portugal, IMT Portugal.",
  tags=[TAGS, "#ImobiliarioPortugal", "#BuyingInPortugal", "#ImmobilierPortugal"]))

# 8. Place postcard (Porto)
posts.append(dict(date="2026-12-02", order=2, slug="postcard-porto", format="postcard", keyword={"pt": "comprar casa no porto", "en": "buying property in porto", "fr": "acheter à porto"},
  link=f"{BASE}/en/us/map/?place=porto&utm_source=instagram&utm_medium=social&utm_campaign=w04-postcard", sources=["ine-m2-2026q2", "ine-m2-history", "ine-rent-2026q2"],
  spec={l: dict(h="Porto.", photo="/design/directions/photos/porto-ribeira-rabelo.jpg",
    items=[{"v": eur(m2("porto"), l), "k": {"pt": "por m², mediana", "en": "per m², median", "fr": "le m², médiane"}[l]},
           {"v": f"+{pr['g10']}%" if l != "fr" else f"+{pr['g10']} %", "k": {"pt": "desde 2016", "en": "since 2016", "fr": "depuis 2016"}[l]},
           {"v": (f"{pr['yield']}%" if l == "en" else f"{str(pr['yield']).replace('.', ',')}%" if l == "pt" else f"{str(pr['yield']).replace('.', ',')} %"), "k": {"pt": "rendimento bruto", "en": "gross yield", "fr": "rendement brut"}[l]}],
    source={"pt": "Fonte: INE, preços e rendas, 2.º trimestre de 2026", "en": "Source: INE, prices and rents, 2nd quarter 2026", "fr": "Source : INE, prix et loyers, 2e trimestre 2026"}[l]) for l in LANGS},
  caption={"pt": "Porto.\n3 631 € por m², mais 234% desde 2016 e 4,8% de rendimento bruto, segundo o INE.\nVeja o Porto no mapa: link na bio.",
           "en": "Porto.\n€3,631 per m², up 234% since 2016, and a 4.8% gross yield, from INE figures.\nSee Porto on the map: link in bio.",
           "fr": "Porto.\n3 631 € le m², plus 234 % depuis 2016 et 4,8 % de rendement brut, selon l'INE.\nVoyez Porto sur la carte : lien dans la bio."},
  alt="The Ribeira in Porto with rabelo boats on the Douro, with three figures: median price per square metre, ten-year change and gross yield, buying property in Porto.",
  tags=[TAGS, "#Porto", "#ImobiliarioPortugal", "#CasaEmPortugal"]))

os.makedirs("social/instagram/posts/week-04", exist_ok=True)
for p in posts:
    d = f"social/instagram/posts/week-04/{p['date']}_{p['order']:02d}_{p['slug']}"; os.makedirs(d, exist_ok=True)
    json.dump({l: {"format": p["format"], **p["spec"][l]} for l in LANGS}, open(f"{d}/spec.json", "w"), ensure_ascii=False, indent=1)
    src_line = p["spec"]["pt"]["source"].split(":", 1)[1].strip()
    md = ["---", "platform: instagram", f"format: {p['format']}", "week: 4", f"date: {p['date']}", f"order: {p['order']}",
          f"keyword: \"{p['keyword']['en']}\"", f"keyword_pt: \"{p['keyword']['pt']}\"", f"keyword_fr: \"{p['keyword']['fr']}\"", f"link: {p['link']}",
          f"utm: {p['link'].split('utm_campaign=')[1].split('#')[0]}", f"sources: [{', '.join(p['sources'])}]", "sponsored: false", "status: draft", "---", "",
          "Images: card-pt.png, card-en.png, card-fr.png (one per language; the feed posts one, the others go to Facebook or stories).", "",
          f"PT · {p['caption']['pt']}", "", f"EN · {p['caption']['en']}", "", f"FR · {p['caption']['fr']}", "",
          f"Fonte / Source / Source: {src_line}", "", " ".join(p["tags"]), "", f"Alt text: {p['alt']}", ""]
    open(f"{d}/post.md", "w").write("\n".join(md))
    print(d)
