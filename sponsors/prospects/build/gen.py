import csv, html, re, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from data import AREA, CHECKPOINTS, PRIVATE, PARKED, SITES, NOTES

HERE = pathlib.Path(__file__).parent
PIPE = {r['id']: r for r in csv.DictReader(open(str(HERE.parents[2] / 'sponsors' / 'pipeline.csv'), encoding='utf-8'))}

TR = [("2.º pilar ao sair da Suíça", "2nd pillar when leaving Switzerland"), ("Reforma em Portugal", "Retiring to Portugal"), ("Impostos nos EUA e em Portugal", "US and Portuguese tax"), ("Impostos em Portugal (IFICI, não residentes)", "Portuguese tax (IFICI, non-residents)"), ("Património e impostos", "Wealth and tax"), ("Área ", "Area "), ("Área", "Area"), ("por área", "per area"), ("lançamento", "launch"), ("Lisboa centro", "central Lisbon"),
      ("Lisboa oriental", "Lisbon east"), ("Direção comercial e marketing", "Sales and marketing director"), ("Direção comercial", "Sales director"),
      ("Direção de vendas internacionais", "International sales director"), ("Administração / desenvolvimento", "Board / development"),
      ("Administração", "Board"), ("Fundadores / vendas", "Founders / sales"), ("Fundadores", "Founders"), ("Fundadora", "Founder"),
      ("Promotor do projeto (a confirmar)", "Project developer (to confirm)"), ("Promotor (a confirmar)", "Developer (to confirm)"),
      ("Marketing e vendas", "Marketing and sales"), ("CEO Portugal / vendas internacionais", "CEO Portugal / international sales"),
      ("Escritório do Luxemburgo / marketing", "Luxembourg office / marketing"),
      ("Direção de residentes no exterior", "Head of non-resident clients"), ("Residentes no exterior", "Non-resident clients"),
      ("Sucursal de Genebra", "Geneva branch"), ("Sócios", "Partners"), ("Gestão de património", "Wealth management"), ("Parcerias", "Partnerships"),
      ("Marketing Brasil", "Marketing Brazil"), ("Imobiliário", "Real estate"), ("Financiamento", "Financing"), ("Transferir o dinheiro", "Moving the money"),
      ("Documentos (NIF)", "Documents (NIF)"), ("Impostos no Luxemburgo", "Tax in Luxembourg"), ("2.º pilar e câmbio", "2nd pillar and FX"),
      ("Estruturação", "Structuring"), ("Advogado (França)", "Lawyer (France)"), ("Advogado (Paris–Lisboa)", "Lawyer (Paris–Lisbon)"),
      ("Herança", "Inheritance"), ("Câmbio / banco", "FX / bank"), ("Advogado", "Lawyer"), ("Impostos nos EUA", "US tax"),
      ("Promotores (ver Áreas)", "Developers (see Areas)"), ("Impostos em Israel · câmbio", "Israel tax · FX"), ("ver Áreas", "see Areas"),
      ("Escritura · herança", "Deed · inheritance"), ("Escritura · Brasil", "Deed · Brazil"), ("Escritura", "Deed"),
      ("por país ×1.5", "per country ×1.5"), ("por país (5–12 000 €)", "per country (5,000–12,000 €)"), ("por país", "per country"),
      ("Luxemburgo", "Luxembourg"), ("Suíça", "Switzerland"), ("França", "France"), ("Brasil", "Brazil"), ("EUA", "USA"),
      ("Todos os países · advogados em Portugal", "All countries · lawyers in Portugal"), ("Norte", "North of Portugal"), ("Área do projeto", "Project area"),
      ("Lisboa", "Lisbon"), ("Direção", "Management"), ("Algarve · Triângulo Dourado", "Algarve · Golden Triangle"), ("Head of Portugal desk", "Head of Portugal desk")]

def tr(s):
    for a, b in TR:
        s = s.replace(a, b)
    s = re.sub(r"(\d) (\d{3}) €", r"\1,\2 €", s)
    return s

def ev_url(e):
    pid = e.get('pid', '')
    if pid in PIPE and PIPE[pid]['evidence_url']:
        return PIPE[pid]['evidence_url']
    return e.get('ev', '')

def dom(u):
    m = re.match(r"https?://(www\.)?([^/]+)", u or "")
    return m.group(2) if m else ""

def esc(s): return html.escape(s or "")

def entry(e, extra_meta):
    u = ev_url(e)
    src = f'<a href="{esc(u)}">{esc(dom(u))}</a>' if u else '<span class="muted">to research</span>'
    fl = e.get('flag') or NOTES.get(e['name'], '')
    flag = f'<span class="flag">{esc(fl)}</span>' if fl else ''
    site = SITES.get(e['name'], '')
    sitehtml = f'<span><em>Website</em> <a href="https://{esc(site)}">{esc(site)}</a></span>' if site else '<span><em>Website</em> <span class="muted">not published in sources · use the evidence link</span></span>'
    return f'''<div class="entry">
  <div class="e-head"><h3>{esc(e["name"])}</h3>{flag}</div>
  <div class="e-meta">{re.sub(r'<span class="dot">·</span><span class="price">.*?</span>|<span class="price">.*?</span>','',extra_meta)}</div>
  <div class="e-price">{''.join(re.findall(r'<span class="price">.*?</span>',extra_meta))}</div>
  <p class="why">{esc(e["why"])}</p>
  <div class="e-foot">{sitehtml}<span><em>Evidence</em> {src}</span>{f'<span><em>Way in</em> {esc(tr(e["route"]))}</span>' if e.get("route") and e["route"]!="—" else ''}</div>
</div>'''

css = (HERE / 'style.css').read_text()

parts = []
parts.append('''<section class="cover">
  <div class="mark">Imóveis Portugal</div>
  <div class="cover-body">
    <p class="eyebrow-line">Private &amp; confidential · October 2026</p>
    <h1>Partner<br>Prospects</h1>
    <p class="lede">The firms we approach before 1 December, grouped by what they buy: a place on the map for developers, a step on each country's journey for advisers, and the Private section for wealth.</p>
  </div>
  <div class="cover-foot">For internal use with the sponsor brochure. Prices: decision D40 · Founding Partners: 40% off year 1, price locked for year 2.</div>
</section>''')

# Overview
n_area = len(AREA); n_ck = sum(len(v) for v in CHECKPOINTS.values()); n_pr = len(PRIVATE)
parts.append(f'''<section class="page">
  <h2>How to read this book</h2>
  <div class="cols3">
    <div><div class="big">{n_area}</div><h4>Developers</h4><p>Area placements on the map, the price trends and the area pages. Up to three per area.</p>
      <table class="rates"><tr><td>Prime</td><td>24,000 €</td></tr><tr><td>Strong</td><td>12,000 €</td></tr><tr><td>Standard</td><td>6,000 €</td></tr><tr><td>Launch · prime</td><td>7,500 / 15,000 €</td></tr></table></div>
    <div><div class="big">{n_ck}</div><h4>Advisers</h4><p>One step on one country's journey: financing, documents, tax at home, the deed, inheritance, structuring. Up to three per step.</p>
      <table class="rates"><tr><td>CH · LU · US</td><td>12,000 €</td></tr><tr><td>FR · IL</td><td>8,000 €</td></tr><tr><td>BR</td><td>5,000 €</td></tr><tr><td>Structuring step</td><td>×1.5</td></tr></table></div>
    <div><div class="big">{n_pr}</div><h4>Wealth</h4><p>The residence, succession and structuring stations of every country path, for high-budget readers.</p>
      <table class="rates"><tr><td>Wealth Partner</td><td>48,000 €</td></tr></table></div>
  </div>
  <div class="rule"></div>
  <h4 class="small-h">Rules for every approach</h4>
  <ol class="rules">
    <li>Evidence first: each firm already spends on this audience. Open the evidence link before writing.</li>
    <li>One ask: a short call. The brochure carries the prices; the email never does.</li>
    <li>Flat annual fee, labelled sponsorship, no exclusivity before launch (D6, D32).</li>
    <li>No real-estate agencies (D9), no Russian capital (D11). Credit and insurance stay with the partner group (D32).</li>
    <li>Flags: "Confirm developer" means identify the promoter first; "Check outside-activity rules" means clear it against your own professional obligations first.</li>
  </ol>
</section>''')

# Areas
order = ["Prime", "Strong", "Standard"]
blocks = []
for t in order:
    items = [e for e in AREA if e['tier'] == t]
    price = {"Prime": "24,000 € per slot per year", "Strong": "12,000 € per slot per year", "Standard": "6,000 € per slot per year"}[t]
    blocks.append(f'<div class="tier"><h3 class="tier-h">{t}<span>{price}</span></h3>' + ''.join(
        entry(e, f'<span>{esc(tr(e["where"]))}</span><span class="dot">·</span><span>{esc(tr(e["slot"]))}</span><span class="dot">·</span><span class="price">{esc(tr(e["price"]))}</span>') for e in items) + '</div>')
parts.append('<section class="page"><p class="section-no">01</p><h2>Developers · area placements</h2><p class="intro">Readers choose a budget on the map, open an area, see ten years of official prices, and meet the developers building there. These are the firms already marketing to international buyers in those areas.</p>' + ''.join(blocks) + '</section>')

# Checkpoints
cb = []
for country, items in CHECKPOINTS.items():
    cb.append(f'<div class="tier"><h3 class="tier-h">{esc(tr(country))}</h3>' + ''.join(
        entry(e, f'<span>{esc(tr(e["step"]))}</span><span class="dot">·</span><span class="price">{esc(tr(e["price"]))}</span>') for e in items) + '</div>')
parts.append('<section class="page"><p class="section-no">02</p><h2>Advisers · journey checkpoints</h2><p class="intro">Each country has its own journey, from budget to keys, renting, selling and inheritance. A partner appears at its step, next to the exact question its clients ask.</p>' + ''.join(cb) + '</section>')

# Private
parts.append('<section class="page"><p class="section-no">03</p><h2>Wealth partners</h2><p class="intro">For buyers from 1 M€ to 10 M€ and above: residence, IFICI, inheritance across two countries, holding structures. One Wealth Partner fee covers the residence, succession and structuring stations in every country: 48,000 € a year, at most five per edition.</p>'
             + ''.join(entry(e, '<span class="price">48,000 €</span>') for e in PRIVATE)
             + '<div class="note"><h4 class="small-h">Next research</h4><p>Three slots are still open and are not in this book until a firm is confirmed from a public source: a Luxembourg cross-border tax adviser (after your outside-activity check), an Israeli tax adviser, and a shekel transfer provider. Swiss and Luxembourg private banks join only once their Portugal activity is confirmed.</p></div>'
             + f'<div class="note"><h4 class="small-h">Parked</h4><p>{esc(PARKED)}</p></div></section>')

doc = f'''<!doctype html><html><head><meta charset="utf-8"><title>Partner Prospects</title><style>{css}</style></head><body>{''.join(parts)}</body></html>'''
(HERE / 'book.html').write_text(doc, encoding='utf-8')
print("ok", n_area, n_ck, n_pr)
