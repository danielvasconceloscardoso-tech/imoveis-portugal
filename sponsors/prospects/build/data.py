# Partner Prospect Book data (CEO, 26 Oct 2026). Prices from D40.
# Each entry: name, where, why, evidence (url), slot, price, route, flag (optional), pid (pipeline id or NEW)

AREA = [
 # Prime
 dict(name="Vanguard Properties", where="Comporta · Lisboa", tier="Prime",
      why="Reinforced its Comporta investment to around 500 M€; design-led projects for international buyers in Lisbon and Comporta.",
      ev="https://www.idealista.pt/news/node/68654", slot="Área Comporta + Lisboa centro", price="24 000 € por área · lançamento 15 000 €",
      route="Direção comercial e marketing", pid="NEW"),
 dict(name="Herdade da Comporta", where="Comporta", tier="Prime",
      why="The estate bought by the Amorim family and partners; selling land for luxury tourism and residential projects.",
      ev="https://www.idealista.pt/en/news/node/61843", slot="Área Comporta", price="24 000 €",
      route="Administração / desenvolvimento", pid="NEW"),
 dict(name="Ando Living", where="Comporta", tier="Prime",
      why="First Comporta project: 16 luxury villas for international buyers.",
      ev="https://www.idealista.pt/en/news/node/71011", slot="Área Comporta · lançamento", price="24 000 € · lançamento 15 000 €",
      route="Fundadores / vendas", pid="NEW"),
 dict(name="Six Senses Residences Comporta", where="Comporta", tier="Prime",
      why="Branded residences announced in Comporta (July 2026). Developer to confirm before approach.",
      ev="https://globetrender.com/2026/07/16/six-senses-teases-branded-residences-in-portugals-comporta/", slot="Área Comporta · lançamento", price="24 000 € · lançamento 15 000 €",
      route="Promotor do projeto (a confirmar)", pid="NEW", flag="Confirm developer"),
 dict(name="Vale do Lobo", where="Algarve · Triângulo Dourado", tier="Prime",
      why="Investing over 200 M€ in new luxury homes; The Residences at Vale do Lobo 40% reserved at groundbreaking.",
      ev="https://www.idealista.pt/en/news/luxury-real-estate-in-portugal/2025/02/06/67912-vale-do-lobo-in-the-algarve-invests-over-eu200-million-in-luxury-homes",
      slot="Área Loulé (Vale do Lobo / Quinta do Lago)", price="24 000 € · lançamento 15 000 €", route="Direção de vendas internacionais", pid="NEW"),
 dict(name="Avenue", where="Lisboa · Porto · Cascais", tier="Prime",
      why="Investing 400 M€ in new residential projects in Lisbon and Porto, plus Cascais.",
      ev="https://www.idealista.pt/news/node/60152", slot="Lisboa centro + Porto Foz", price="24 000 € por área",
      route="Direção comercial", pid="NEW"),
 dict(name="CascaisVilla redevelopment", where="Cascais", tier="Prime",
      why="100 M€ luxury residential project on the CascaisVilla site. Developer to confirm.",
      ev="https://iberian.property/news/residential/cascaisvilla-site-to-be-redeveloped-into-eur100m-luxury-residential-project/",
      slot="Área Cascais · lançamento", price="24 000 € · lançamento 15 000 €", route="Promotor (a confirmar)", pid="NEW", flag="Confirm developer"),
 # Strong
 dict(name="VIC Properties", where="Lisboa (Prata, Matinha)", tier="Strong",
      why="Around 3,000 new homes planned between Matinha and Prata Riverside Village.",
      ev="https://www.essential-business.pt/2025/03/27/vic-properties-to-build-around-3000-new-homes-in-lisbon-between-matinha-and-prata/",
      slot="Lisboa oriental", price="12 000 €", route="Marketing e vendas", pid="NEW"),
 dict(name="Krest", where="Lisboa (Marvila)", tier="Strong",
      why="Formoso Marvila residential development unveiled in late 2025.",
      ev="https://www.essential-business.pt/2025/11/21/krest-unveils-formoso-marvila-residential-development-in-lisbon/",
      slot="Lisboa oriental", price="12 000 €", route="Marketing e vendas", pid="NEW"),
 dict(name="Vilamoura World", where="Algarve · Vilamoura", tier="Strong",
      why="Two new residential projects with 214 villas and apartments in Vilamoura.",
      ev="https://luxuriousmagazine.com/vilamoura-world-new-residential-projects", slot="Área Vilamoura", price="12 000 € · lançamento 7 500 €",
      route="Direção comercial", pid="NEW"),
 dict(name="Taga Urbanic", where="Porto · Gaia", tier="Strong",
      why="Israeli group in Portugal since 2018: 19 developments and about 2,000 homes in Porto and Gaia.",
      ev="https://www.essential-business.pt/?p=21799", slot="Porto + Gaia · Israel edition", price="12 000 € por área",
      route="CEO Portugal / vendas internacionais", pid="S152"),
 dict(name="Shalu Investments", where="Porto (Douro)", tier="Strong",
      why="100 M€ O'rizon Living on the Douro, about 200 apartments.", ev="https://www.essential-business.pt/2025/10/03/shalu-invests-e100-million",
      slot="Porto · lançamento", price="12 000 € · lançamento 7 500 €", route="Direção comercial", pid="S151"),
 dict(name="Youropa", where="Porto", tier="Strong",
      why="Israeli group that opened a Porto office in May 2026; five own developments.", ev="https://econews.pt/?p=47234",
      slot="Porto · Israel edition", price="12 000 €", route="Fundadores", pid="S153"),
 dict(name="Ferreiros Residences", where="Madeira · Funchal", tier="Strong",
      why="Luxury Funchal project marketed to investors. Developer to confirm (possibly Yard Properties).",
      ev="https://www.idealista.pt/en/news/node/66688", slot="Área Funchal", price="12 000 €", route="Promotor (a confirmar)", pid="NEW", flag="Confirm developer"),
 dict(name="Yard Properties", where="Madeira · Funchal", tier="Strong",
      why="Investing in a luxury residential project in Funchal.", ev="https://www.dnoticias.pt/2024/11/13/427070-yard-properties-investe-no-funchal-com-projecto-residencial-de-luxo/",
      slot="Área Funchal", price="12 000 €", route="Administração", pid="NEW"),
 # Standard
 dict(name="Vision Supra Partners", where="Sesimbra", tier="Standard",
      why="Launched a Sesimbra project with Brazilian influencers to reach Brazilian buyers.", ev="https://investnews.com.br/financas/entre-estrangeiros-brasileiros-lide",
      slot="Área Sesimbra · Brazil edition", price="6 000 €", route="Marketing", pid="S028"),
 dict(name="Quinta de Faro", where="Norte", tier="Standard",
      why="Runs display ads in LusoJornal for French-resident Portuguese buyers.", ev="https://lusojornal.com/",
      slot="Área do projeto · France edition", price="6 000 €", route="Direção", pid="S026"),
]

CHECKPOINTS = {
 "Luxemburgo": [
  dict(name="Caixa Geral de Depósitos", step="Financiamento", why="Opened a Luxembourg office to help the community buy property in Portugal.", ev="https://www.essential-business.pt/2021/10/06/cgd-opens-office-in-luxembourg/", price="12 000 €", route="Escritório do Luxemburgo / marketing", pid="S024"),
  dict(name="Santander Totta", step="Financiamento", why="Dedicated offer and home loans for Portuguese living abroad.", ev="https://www.santander.pt/portugueses-residentes-exterior", price="12 000 €", route="Direção de residentes no exterior", pid="S008"),
  dict(name="Millennium bcp", step="Financiamento", why="Section for Portuguese residents abroad; private banking ranked by Chambers.", ev="https://ind.millenniumbcp.pt/pt/Particulares/suamedida/", price="12 000 €", route="Residentes no exterior", pid="S030"),
  dict(name="Wise", step="Transferir o dinheiro", why="Pays affiliates on Portuguese property guides; large-transfer product.", ev="https://www.eurodicas.com.br/comprar-casa-em-portugal/", price="12 000 €", route="Partnerships", pid="S067"),
  dict(name="Bordr", step="Documentos (NIF)", why="Pays referral codes on diaspora property guides.", ev="https://www.eurodicas.com.br/comprar-casa-em-portugal/", price="12 000 €", route="Marketing", pid="S033"),
  dict(name="Luxembourg tax adviser", step="Impostos no Luxemburgo", why="Slot to fill: cross-border PT/LU tax for individuals. Shortlist after conflict check.", ev="", price="12 000 €", route="—", pid="", flag="Conflict check before approach"),
 ],
 "Suíça": [
  dict(name="ABANCA", step="Financiamento", why="Geneva branch with a dedicated contact for Portuguese residents; mortgages for homes in Portugal.", ev="https://www.abanca.pt/pt/residentes-suica/", price="12 000 €", route="Sucursal de Genebra", pid="S001"),
  dict(name="ibani", step="2.º pilar e câmbio", why="Portuguese guide on using the Swiss 2nd pillar to buy abroad; earns on FX.", ev="https://www.ibani.com/pt/guias/levantar-2-pilar-imovel-estrangeiro", price="12 000 €", route="Marketing", pid="S022"),
  dict(name="Julius Baer", step="Estruturação (×1.5)", why="Opened a Lisbon office in 2025 for Portugal-linked wealth clients.", ev="https://www.essential-business.pt/2025/03/27/swiss-wealth-management-and-investment-bank-julius-baer-to-open-lisbon-office/", price="18 000 €", route="Head of Portugal desk", pid="NEW", flag="Check outside-activity rules"),
 ],
 "França": [
  dict(name="Banque BCP", step="Financiamento", why="Display ads in LusoJornal; sponsors community events.", ev="https://lusojornal.com/", price="8 000 €", route="Marketing", pid="S002"),
  dict(name="Novo Banco", step="Financiamento", why="Now owned by France's BPCE: natural angle for French buyers.", ev="https://lusopress.tv/wp-content/uploads/2025/12/Revista-142.pdf", price="8 000 €", route="Residentes no exterior", pid="S031"),
  dict(name="MC Avocats", step="Advogado (França)", why="Banner advertiser in LusoJornal.", ev="https://lusojornal.com/", price="8 000 €", route="Sócios", pid="S005"),
  dict(name="Silva Avocat & Partners", step="Advogado (Paris–Lisboa)", why="Founder admitted in Paris and Lisbon (Jan 2026).", ev="https://www.lemondedudroit.fr/", price="8 000 €", route="Fundadora", pid="S021"),
  dict(name="Euodia", step="Herança", why="Guide on Portuguese successions for French families.", ev="https://www.euodia.fr/succession/portugal/", price="8 000 €", route="Direção", pid="S018"),
  dict(name="Solutis (patrimoine)", step="Estruturação (×1.5)", why="'Investir au Portugal' guide for French investors.", ev="https://www.solutis.fr/investir-au-portugal.html", price="12 000 €", route="Gestão de património", pid="S130"),
 ],
 "Brasil": [
  dict(name="Remessa Online", step="Transferir o dinheiro", why="Affiliate links and reader discounts on Brazilian Portugal guides.", ev="https://www.eurodicas.com.br/comprar-casa-em-portugal/", price="5 000 €", route="Parcerias", pid="S023"),
  dict(name="Ebury", step="Transferir o dinheiro", why="Guide on paying for Portuguese property from Brazil.", ev="https://br.ebury.com/blog/vou-comprar-um-imovel-em-portugal-e-agora-como-faco-o-pagamento", price="5 000 €", route="Marketing Brasil", pid="S009"),
  dict(name="Banco Rendimento", step="Câmbio / banco", why="Partner of a Rio buyer event for Portuguese property.", ev="https://monitormercantil.com.br/", price="5 000 €", route="Marketing", pid="S032"),
  dict(name="BTG Pactual", step="Estruturação (×1.5)", why="Entered Portuguese banking; expanding European real estate.", ev="https://www.essential-business.pt/2019/12/08/btg-pactual-enters-portuguese-banking-market/", price="7 500 €", route="Wealth / Europa", pid="NEW"),
  dict(name="Campara", step="Advogado", why="Promoted with referral links on Eurodicas.", ev="https://www.eurodicas.com.br/conexao-europa-imoveis/", price="5 000 €", route="Sócios", pid="S004"),
  dict(name="Martinez Echevarria & Ferreira", step="Advogado", why="Partner of the Rio buyer event.", ev="https://monitormercantil.com.br/", price="5 000 €", route="Sócios", pid="S037"),
 ],
 "EUA": [
  dict(name="BrightTax", step="Impostos nos EUA", why="Guide for Americans buying in Portugal; sells US expat tax filing.", ev="https://brighttax.com/blog/can-americans-buy-property-in-portugal/", price="12 000 €", route="Marketing", pid="S127"),
  dict(name="Taxes for Expats", step="Impostos nos EUA", why="Country guide on buying property in Portugal.", ev="https://www.taxesforexpats.com/country-guides/portugal/buying-property", price="12 000 €", route="Marketing", pid="S128"),
  dict(name="Golding & Golding", step="Impostos nos EUA (FBAR, FATCA)", why="Tax tips for Portugal-based Americans.", ev="https://www.goldinglawyers.com/", price="12 000 €", route="Sócios", pid="S129"),
  dict(name="Remitly", step="Transferir o dinheiro", why="Guide on buying property in Portugal as an American.", ev="https://www.remitly.com/blog/immigration/buying-property-in-portugal/", price="12 000 €", route="Partnerships", pid="S126"),
  dict(name="Currencies Direct", step="Transferir o dinheiro", why="Large-transfer and property-abroad pages, Portugal routes.", ev="https://www.currenciesdirect.com/en-gb/buy-property-abroad/best-way-to-transfer-money-when-buying-property-abroad", price="12 000 €", route="Partnerships", pid="NEW"),
 ],
 "Israel": [
  dict(name="Taga Urbanic · Shalu · Youropa", step="Promotores (ver Áreas)", why="Israeli developers in Porto: area placements plus the Israel edition.", ev="https://www.essential-business.pt/?p=21799", price="ver Áreas", route="—", pid="S151-153"),
  dict(name="Israeli tax adviser and FX", step="Impostos em Israel · câmbio", why="Slots to fill: Israel tax on Portuguese income, shekel transfers.", ev="", price="8 000 €", route="—", pid=""),
 ],
 "Todos os países · advogados em Portugal": [
  dict(name="Abreu Advogados", step="Escritura · herança", why="Band 1 for private clients (Chambers High Net Worth).", ev="https://abreuadvogados.com/en/news/abreu/abreu-advogados-ranked-band-1-for-private-clients-in-chambers-and-partners-high-net-worth-guide-2025/", price="por país (5–12 000 €)", route="Private client", pid="S050"),
  dict(name="Deloitte Legal | Telles", step="Estruturação", why="Band 1 in private wealth law.", ev="https://www.deloitte.com/pt/pt/services/legal/blogs/news/deloitte-legal-telles-band-1-private-wealth-law.html", price="por país ×1.5", route="Private wealth", pid="NEW"),
  dict(name="CMS Portugal", step="Estruturação", why="Highlighted in Chambers High Net Worth.", ev="https://cms.law/en/prt/news-information/cms-portugal-and-nuno-figueiroa-santos-highlighted-in-the-chambers-and-partners-high-net-worth-guide", price="por país ×1.5", route="Private client", pid="NEW"),
  dict(name="Antas da Cunha Ecija", step="Escritura · Brasil", why="Ranked in private wealth; strong with Brazilian clients.", ev="https://chambers.com/department/antas-da-cunha-ecija-private-wealth-law-high-net-worth-21:2633:174:1:88058", price="por país", route="Private client", pid="NEW"),
  dict(name="Andersen Portugal", step="Estruturação", why="Ranked in private wealth law.", ev="https://chambers.com/department/andersen-private-wealth-law-high-net-worth-21:2633:174:1:22620317", price="por país ×1.5", route="Private client", pid="NEW"),
  dict(name="PLMJ", step="Escritura", why="Exhibited at the Paris Portuguese property fair.", ev="https://www.idealista.pt/news/node/26913", price="por país", route="Imobiliário", pid="S052"),
  dict(name="LVP Advogados", step="Escritura", why="Serves clients from 150+ countries investing in Portugal.", ev="https://www.lvpadvogados.com/pt", price="por país", route="Sócios", pid="S045"),
 ],
}

PRIVATE = [
 dict(name="Julius Baer", why="Lisbon office opened 2025; Swiss private bank for Portugal-linked wealth.", ev="https://www.essential-business.pt/2025/03/27/swiss-wealth-management-and-investment-bank-julius-baer-to-open-lisbon-office/", flag="Check outside-activity rules", pid="NEW"),
 dict(name="Millennium bcp Private Banking", why="Ranked by Chambers in private banking (High Net Worth).", ev="https://chambers.com/department/millennium-bcp-private-banks-high-net-worth-21:2699:174:1:249515", flag="", pid="NEW"),
 dict(name="BTG Pactual Europe", why="Brazilian investment bank with a Portuguese bank; Brazilian high-net-worth clients moving assets to Europe.", ev="https://www.bloomberglinea.com.br/negocios/btg-pactual-quer-triplicar-investimento-em-imoveis-na-europa-para-1-bi/", flag="", pid="NEW"),
 dict(name="Deloitte Legal | Telles", why="Band 1 private wealth law: structuring for 1 M€+ buyers.", ev="https://www.deloitte.com/pt/pt/services/legal/blogs/news/deloitte-legal-telles-band-1-private-wealth-law.html", flag="", pid="NEW"),
 dict(name="Abreu Advogados", why="Band 1 private clients (Chambers).", ev="https://abreuadvogados.com/en/news/abreu/abreu-advogados-ranked-band-1-for-private-clients-in-chambers-and-partners-high-net-worth-guide-2025/", flag="", pid="S050"),
 dict(name="Itaú / Bradesco wealth (watch)", why="Reported to be evaluating wealth-management units in Portugal; approach when confirmed.", ev="https://moneytimes.com.br/itau-e-bradesco-avaliam-abrir-gestora-de-fortunas-em-portugal/", flag="Not confirmed", pid="NEW"),
]

PARKED = "Credit brokers (Rio Credits, Cafimo, Cafpi, Solutis crédit, Meilleurtaux, ComparaJá, Doutor Finanças) and insurers or insurance brokers (Fidelidade, Império/Ageas, Verspieren and others) compete with the partner group's credit and insurance businesses (D32). Parked until you decide."

# ---- Revision 26 Oct: confirmed only, websites, wealth managers and tax boutiques ----
_DROP = {"Six Senses Residences Comporta", "CascaisVilla redevelopment", "Ferreiros Residences", "Itaú / Bradesco wealth (watch)",
         "Luxembourg tax adviser", "Israeli tax adviser and FX"}
AREA = [e for e in AREA if e["name"] not in _DROP]
for k in list(CHECKPOINTS):
    CHECKPOINTS[k] = [e for e in CHECKPOINTS[k] if e["name"] not in _DROP]
PRIVATE = [e for e in PRIVATE if e["name"] not in _DROP]
for e in AREA:
    if e["name"] == "Yard Properties":
        e["why"] = "Developing Ferreiros Residences, a luxury residential project in central Funchal."

CHECKPOINTS["Suíça"].insert(2, dict(name="Compassurance", step="2.º pilar ao sair da Suíça", why="Free expert audit of the 2nd pillar before leaving Switzerland: amount, net tax, canton strategy.", ev="https://compassurance.ch/retirer-2eme-pilier-quitter-suisse/", price="12 000 €", route="Expert team", pid="NEW"))
CHECKPOINTS["França"].insert(5, dict(name="Hagnéré Patrimoine", step="Estruturação (×1.5)", why="Wealth adviser for French expatriates in Portugal: Franco-Portuguese tax, works with licensed Portuguese professionals.", ev="https://www.hagnere-patrimoine.fr/gestion-de-patrimoine-expatrie-portugal", price="12 000 €", route="Founding partner", pid="NEW"))
CHECKPOINTS["França"].insert(6, dict(name="Cleerly", step="Reforma em Portugal", why="Wealth-management firm publishing guides on retiring to Portugal.", ev="https://cleerly.fr/retraite/portugal", price="8 000 €", route="Marketing", pid="NEW"))
CHECKPOINTS["EUA"].insert(3, dict(name="FRESH Legal", step="Impostos nos EUA e em Portugal", why="Cross-border US tax planning and filing; Lisbon office and Portuguese legal practice.", ev="https://fresh-legal.com/us", price="12 000 €", route="Partners", pid="NEW"))
CHECKPOINTS["EUA"].insert(4, dict(name="Creative Planning International", step="Estruturação (×1.5)", why="US expat wealth services covering Portugal (households with US$500k+ in US assets).", ev="https://creativeplanning.com/international/insights/financial-planning/9-critical-financial-planning-considerations-for-american-expats-living-in-portugal/", price="18 000 €", route="International team", pid="NEW"))
CHECKPOINTS["Todos os países · advogados em Portugal"].insert(0, dict(name="Taxbordr", step="Impostos em Portugal (IFICI, não residentes)", why="Portuguese tax advisers for international clients, rated on Trustpilot.", ev="https://uk.trustpilot.com/review/taxbordr.com", price="por país", route="Founders", pid="NEW"))
CHECKPOINTS["Todos os países · advogados em Portugal"].insert(1, dict(name="The Spectrum IFA Group", step="Património e impostos", why="Expat financial advice in Portugal: pensions, investments and tax planning.", ev="https://spectrum-ifa.com/expat-financial-advice-in-portugal/", price="por país ×1.5", route="Portugal office", pid="NEW"))
PRIVATE.insert(2, dict(name="Hagnéré Patrimoine", why="Franco-Portuguese wealth planning for French expatriates in Portugal.", ev="https://www.hagnere-patrimoine.fr/gestion-de-patrimoine-expatrie-portugal", flag="", pid="NEW"))
PRIVATE.insert(3, dict(name="Creative Planning International", why="US expat wealth planning, Portugal covered; minimum US$500k in US assets.", ev="https://creativeplanning.com/international/insights/financial-planning/9-critical-financial-planning-considerations-for-american-expats-living-in-portugal/", flag="", pid="NEW"))
PRIVATE.insert(4, dict(name="The Spectrum IFA Group", why="Expat wealth and tax planning with a Portugal office.", ev="https://spectrum-ifa.com/expat-financial-advice-in-portugal/", flag="", pid="NEW"))

SITES = {
 "Vanguard Properties": "vangproperties.com", "Herdade da Comporta": "herdadedacomporta.pt", "VIC Properties": "vic-properties.com",
 "Caixa Geral de Depósitos": "cgd.pt", "Santander Totta": "santander.pt", "Millennium bcp": "millenniumbcp.pt", "Wise": "wise.com", "Bordr": "bordr.com",
 "ABANCA": "abanca.pt", "ibani": "ibani.com", "Compassurance": "compassurance.ch", "Julius Baer": "juliusbaer.com", "Banque BCP": "banquebcp.fr",
 "Novo Banco": "novobanco.pt", "Euodia": "euodia.fr", "Solutis (patrimoine)": "solutis.fr", "Hagnéré Patrimoine": "hagnere-patrimoine.fr", "Cleerly": "cleerly.fr",
 "Remessa Online": "remessaonline.com.br", "Ebury": "ebury.com", "BTG Pactual": "btgpactual.com", "BrightTax": "brighttax.com", "Taxes for Expats": "taxesforexpats.com",
 "Golding & Golding": "goldinglawyers.com", "Remitly": "remitly.com", "Currencies Direct": "currenciesdirect.com", "FRESH Legal": "fresh-legal.com",
 "Creative Planning International": "creativeplanning.com", "Taxbordr": "taxbordr.com", "The Spectrum IFA Group": "spectrum-ifa.com", "Abreu Advogados": "abreuadvogados.com",
 "Deloitte Legal | Telles": "deloitte.com/pt", "CMS Portugal": "cms.law", "Andersen Portugal": "pt.andersen.com", "PLMJ": "plmj.com", "LVP Advogados": "lvpadvogados.com",
 "Millennium bcp Private Banking": "millenniumbcp.pt", "Martinez Echevarria & Ferreira": "martinezechevarria.com", "Antas da Cunha Ecija": "ecija.com",
 "Silva Avocat & Partners": "", "MC Avocats": "", "Campara": "", "Banco Rendimento": "", "Avenue": "", "Krest": "", "Vilamoura World": "", "Taga Urbanic": "",
 "Shalu Investments": "", "Youropa": "", "Yard Properties": "", "Ando Living": "", "Vale do Lobo": "valedolobo.com", "Vision Supra Partners": "", "Quinta de Faro": "",
 "Taga Urbanic · Shalu · Youropa": "",
}
NOTES = {"Taga Urbanic": "Vet first: post-sale complaints on Portal da Queixa"}
SITES["BTG Pactual Europe"]="btgpactual.com"
