# Sponsor research data, v2 (2026-10-24). Every tier A/B row carries an evidence URL.
# Fields: company, sector, edition, tier, evidence_url, evidence_note, evidence_year, evidence_status, size, offer

LUSOJ = "https://lusojornal.com/salao-do-imobiliario-e-do-investimento-portugues-muda-se-para-a-porte-de-champeret/"
LUSOP125 = "https://lusopress.tv/wp-content/uploads/2023/07/lusopress_125.pdf"
EURO_CASA = "https://www.eurodicas.com.br/comprar-casa-em-portugal/"
EURO_CONEX = "https://www.eurodicas.com.br/conexao-europa-imoveis/"
EURO_FIN = "https://www.eurodicas.com.br/como-financiar-imovel-em-portugal/"
RIO = "https://monitormercantil.com.br/mercado-imobili-rio-de-portugal-op-o-para-a-investidores-brasileiros/"
INVN = "https://investnews.com.br/financas/entre-estrangeiros-brasileiros-lideram-busca-por-imoveis-de-luxo-em-pontos-nobres-de-portugal/amp/"
SALON15 = "https://www.idealista.pt/news/node/26913"
DECISAO = "https://en.paperjam.lu/club/event/paperjam-10x6-decisao-the-portuguese-business-community-in-action"
F, S_ = "Fetched", "Search result"

ROWS = [
# ---------------- Tier A: proven spend on our audience ----------------
("Caixa Geral de Depósitos", "Bank", "LU, FR, CH", "A", "https://hrportugal.sapo.pt/?p=230644", "Opened a Luxembourg rep office (Oct 2021) offering help buying property in Portugal; sponsors community events in France", 2021, F, "L", "Gold"),
("Banque BCP", "Bank", "FR", "A", LUSOJ, "Runs display ads on LusoJornal; sponsors community events (Lusopress 2023)", 2024, F, "M", "Gold"),
("Santander Totta", "Bank", "FR, LU, CH", "A", "https://www.santander.pt/portugueses-residentes-exterior", "Dedicated offer for Portuguese living abroad incl. home loans for main or second home; sponsored a community festival in Lyon", 2026, F, "L", "Gold"),
("Serip Group", "Developer / builder", "FR", "A", LUSOJ, "Display ads on LusoJornal; promotional profile in Lusopress nº125 (Saint-Tropez builder with projects in Portugal)", 2024, F, "M", "Campaign"),
("Quinta de Faro", "Developer", "FR", "A", LUSOJ, "Display ads on LusoJornal; project profile in Lusopress nº125", 2024, F, "M", "Campaign"),
("MC Avocats", "Law firm (France)", "FR", "A", LUSOJ, "Banner ad on LusoJornal", 2024, F, "S", "Silver"),
("Libertas / Maison au Portugal", "Agency / developer", "FR", "A", "https://libertas.pt/fr/decouvrez-limmobilier-portugais-au-salon-de-linvestissement-de-paris/", "Official partner and stand A01 at the Paris Portuguese property fair (Sept 2023)", 2023, F, "M", "Campaign"),
("Fábio Neves Imobiliária", "Agency", "LU, FR", "A", "https://www.theportugalnews.com/pt/noticias/2026-05-08/fabio-neves-imobiliaria-ajuda-compradores-internacionais-a-mudarem-se-e-a-investirem-em-portugal/1017957", "Offices in Luxembourg and France; client-supplied promotional article (May 2026). Check overlap with partner agency", 2026, F, "M", "Silver"),
("Cabinet d'Architecture Marcelo Moledo", "Architecture", "FR", "A", LUSOP125, "Cover profile in Lusopress nº125; offices in Saint-Tropez and Viana do Castelo", 2023, F, "S", "Silver"),
("SEGURAJA", "Building materials / security", "FR", "A", LUSOP125, "Promotional profile in Lusopress nº125; Ponte de Lima and Antony (FR)", 2023, F, "S", "Bronze"),
("Pedro Emanuel de Oliveira (law office)", "Law firm", "FR", "A", LUSOP125, "Profile in Lusopress nº125; Bordeaux and Porto", 2023, F, "S", "Silver"),
("Fidelidade", "Insurance", "FR, LU, CH", "A", LUSOP125, "Named supporter of Academia do Bacalhau de Paris (Lusopress nº125)", 2023, F, "L", "Silver"),
("Império (Ageas Portugal)", "Insurance", "FR", "A", LUSOP125, "Supporter; covered gala costs for a Paris community event (Lusopress nº125)", 2023, F, "L", "Silver"),
("Rio Credits", "Credit broker (France)", "FR", "A", "https://lusopress.tv/wp-content/uploads/2018/12/10nomes10historias_3.pdf", "Featured in a Lusopress book; mortgages mainly for Portuguese clients in France. Check still active", 2018, F, "S", "Silver"),
("ABANCA", "Bank", "CH", "A", "https://www.abanca.pt/pt/residentes-suica/", "Geneva branch with a dedicated contact for Portuguese residents; mortgages for homes in Portugal; CHF-to-Portugal transfers", 2026, F, "M", "Gold"),
("Oliveira Imóveis", "Buying consultancy (Brazilian buyers)", "BR", "A", EURO_CASA, "Promoted as 'nossa parceira' on Eurodicas; sells a €2,497 buying service", 2026, F, "S", "Silver"),
("Conexão Europa Imóveis", "Buying advice / property management", "BR", "A", EURO_CONEX, "Promoted article with calls to action on Eurodicas", 2026, F, "S", "Silver"),
("Remessa Online", "FX / remittances", "BR", "A", EURO_CASA, "Affiliate links and reader discount on Eurodicas", 2026, F, "M", "Affiliate + sponsor"),
("Wise", "FX / transfers", "LU, FR, CH, BR", "A", EURO_CASA, "Affiliate links on Eurodicas", 2026, F, "L", "Affiliate"),
("e-residence", "NIF / tax representative", "BR, FR", "A", EURO_CASA, "Referral link 'via=euro-dicas' on Eurodicas", 2026, F, "S", "Affiliate"),
("Bordr", "NIF / tax representative", "LU, FR, CH, BR", "A", EURO_CASA, "Referral code on Eurodicas", 2026, F, "S", "Affiliate"),
("Campara (law firm)", "Law firm (Brazilian clients)", "BR", "A", EURO_CONEX, "Promoted with referral-style links on Eurodicas", 2026, F, "S", "Silver"),
("Porta da Frente | Christie's", "Agency (Lisbon)", "BR", "A", RIO, "Co-hosted buyer events in Rio de Janeiro for Brazilian investors", 2018, F, "M", "Campaign"),
("Judice & Araújo | Christie's", "Agency (Rio de Janeiro)", "BR", "A", RIO, "Co-hosted Rio events selling Portuguese property", 2018, F, "M", "Campaign"),
("Banco Rendimento", "Bank / FX (Brazil)", "BR", "A", RIO, "Partner of the Rio buyer event for Portuguese property", 2018, F, "M", "Silver"),
("Martinez Echevarria & Ferreira", "Law firm", "BR", "A", RIO, "Partner of the Rio buyer event", 2018, F, "M", "Silver"),
("Vision Supra Partners", "Developer", "BR", "A", INVN, "Launched a Sesimbra project with Brazilian influencers to reach Brazilian buyers", 2024, F, "M", "Campaign"),
("RE/MAX Alcateia", "Agency", "BR", "A", INVN, "Co-launched the influencer campaign for Brazilian buyers", 2024, F, "S", "Featured listings"),
("Maia International Properties", "Agency (Brazilian buyers)", "BR", "A", "https://diariodocomercio.com.br/negocios/imobiliaria-boutique-portugal-luiz-felipe-maia/", "PR feature in Diário do Comércio (Oct 2025); Lisbon branch of a Belo Horizonte group", 2025, F, "S", "Silver"),
("Madeira Estate", "Relocation / residency", "BR, FR", "A", "https://www.dnoticias.pt/2022/12/21/340949-o-processo-de-abertura-de-uma-conta-bancaria-em-portugal/", "Buys sponsored articles ('Patrocinado') in DNoticias", 2022, F, "S", "Silver"),
("Montepio", "Bank", "FR, LU, CH", "A", SALON15, "Exhibited on the Lisbon stand at the Paris Portuguese property fair (2015). Old evidence: re-check", 2015, F, "L", "Gold"),
("Engel & Völkers Portugal", "Agency", "FR, CH", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "L", "Featured listings"),
("PLMJ", "Law firm", "FR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "L", "Silver"),
("Abreu Advogados", "Law firm", "FR, BR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "L", "Silver"),
("Homelovers", "Agency", "FR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "S", "Featured listings"),
("Infante & Riu", "Agency", "FR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "S", "Featured listings"),
("Vallespir Advogados", "Law firm", "FR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "S", "Silver"),
("CCA Law Firm", "Law firm", "FR, BR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "M", "Silver"),
("Quintela & Penalva", "Agency", "FR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "M", "Featured listings"),
("ERA Avenidas Novas", "Agency", "FR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "S", "Featured listings"),
("Quantico", "Real estate (to confirm)", "FR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015). Confirm what the company does", 2015, F, "S", "Bronze"),
("Stay Properties", "Agency / rentals", "FR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "S", "Featured listings"),
("7 Adresses", "Agency", "FR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "S", "Featured listings"),
("Artys Interiores", "Interior design", "FR", "A", SALON15, "Exhibitor, Paris Portuguese property fair (2015)", 2015, F, "S", "Bronze"),

# ---------------- Tier B: serves our audience, no proof of spend yet ----------------
("Millennium bcp", "Bank", "FR, LU, CH", "B", "https://ind.millenniumbcp.pt/pt/Particulares/suamedida/utilisateurs-francais/Pages/REX_escolherMbcp.aspx", "French-language page for French users plus a section for Portuguese residents abroad", 2026, F, "L", "Gold"),
("Novo Banco", "Bank", "FR, LU, CH", "B", "https://lusopress.tv/wp-content/uploads/2025/12/Revista-142.pdf", "Now owned by France's BPCE (Lusopress, Dec 2025): natural angle for the French edition", 2025, F, "L", "Gold"),
("Crédito Agrícola", "Bank", "FR, LU, CH", "B", "https://ca-ql.creditoagricola.pt/institucional/international-v2", "International page; strong in the regions emigrants come from", 2026, S_, "L", "Silver"),
("Banco BPI", "Bank", "BR", "B", EURO_FIN, "Listed (unpaid) in Eurodicas mortgage guide for Brazilians", 2026, F, "L", "Silver"),
("UCI", "Mortgage lender", "BR, FR", "B", EURO_FIN, "Listed (unpaid) in Eurodicas mortgage guide for Brazilians", 2026, F, "M", "Silver"),
("ActivoBank", "Bank", "BR", "B", EURO_FIN, "Listed (unpaid) in Eurodicas mortgage guide for Brazilians", 2026, F, "M", "Silver"),
("Banco CTT", "Bank", "BR", "B", EURO_FIN, "Listed (unpaid) in Eurodicas mortgage guide for Brazilians", 2026, F, "M", "Silver"),
("Doutor Finanças", "Credit intermediary", "LU, FR, CH, BR", "B", "https://www.doutorfinancas.pt/creditos/credito-habitacao/credito-habitacao-e-emigracao-o-que-deve-saber/", "Content aimed at emigrants seeking mortgages", 2026, S_, "M", "Silver"),
("ComparaJá", "Credit comparator / intermediary", "LU, FR, CH, BR", "B", "https://www.comparaja.pt/credito-habitacao/emigrantes", "Dedicated emigrant mortgage page; registered credit intermediary paid by partner banks", 2026, F, "M", "Silver"),
("Cofidis Portugal", "Credit", "LU, FR, CH", "B", "https://contasconnosco.cofidis.pt/credito/e-emigrante-e-quer-fazer-um-credito-habitacao-em-portugal", "Content for emigrants about mortgages", 2026, S_, "L", "Silver"),
("Cafpi", "Credit broker (France)", "FR", "B", "https://www.mysweetimmo.com/2019/12/19/le-courtier-cafpi-simplante-au-portugal/", "French broker that opened in Portugal to finance French buyers", 2019, S_, "L", "Gold"),
("Cafimo", "Credit broker", "FR", "B", "https://anchorless.io/fr/partenaires/cafimo", "Financing in Portugal; partner of AnchorLess", 2026, S_, "S", "Silver"),
("Solutis", "Credit broker (France)", "FR", "B", "https://www.solutis.fr/investir-au-portugal.html", "Finances purchases in Portugal against French property; free eligibility study", 2026, F, "M", "Silver"),
("Meilleurtaux", "Credit broker (France)", "FR", "B", "https://www.meilleurtaux.com/credit-immobilier/actualites/2020-juillet/portugal-terre-accueil-ideale-expatries-francais.html", "Content on Portugal for French buyers", 2020, S_, "L", "Silver"),
("Ebury", "FX (Brazil)", "BR", "B", "https://br.ebury.com/blog/vou-comprar-um-imovel-em-portugal-e-agora-como-faco-o-pagamento", "Blog on paying for Portuguese property from Brazil", 2026, S_, "M", "Gold"),
("Bleap", "FX / fintech", "BR", "B", "https://www.bleap.finance/pt-br/blog/como-enviar-dinheiro-do-brasil-para-portugal", "Guide on sending money from Brazil to Portugal", 2026, S_, "S", "Silver"),
("ibani", "FX / Swiss pension guides", "CH", "B", "https://www.ibani.com/pt/guias/levantar-2-pilar-imovel-estrangeiro", "Portuguese-language guide on using the Swiss 2nd pillar to buy a home abroad; earns on FX margin", 2026, F, "S", "Silver"),
("Portugal Homes", "Agency / relocation", "BR, FR", "B", "https://www.portugalhomes.com/pt/move-to-portugal/services/property-management", "Relocation and property management for foreign buyers", 2026, S_, "M", "Featured listings"),
("Portugal Residency Advisors", "Residency / legal", "BR", "B", "https://www.portugalresidencyadvisors.com/pt-br/advogado-imobiliario-portugal/", "Brazilian-Portuguese pages on property lawyers", 2026, S_, "S", "Silver"),
("Cidadania e Visto", "Visa advisory", "BR", "B", "https://www.cidadaniaevisto.com.br/blog/quanto-custa-mudanca-brasil-para-portugal", "Content for Brazilians moving to Portugal", 2026, S_, "S", "Silver"),
("LVP Advogados", "Law firm", "LU, FR, CH, BR", "B", "https://www.lvpadvogados.com/pt", "Says it serves clients from 150+ countries investing in Portugal", 2026, S_, "M", "Silver"),
("Fieldfisher Portugal", "Law firm", "FR", "B", "https://www.fieldfisher.com/pt-pt/people/franck-mattos", "French-speaking real-estate lawyers in Portugal", 2026, S_, "L", "Silver"),
("Silva Avocat & Partners", "Law firm (Paris/Lisbon)", "FR", "B", "https://www.lemondedudroit.fr/vie-des-cabinets/102561-emilie-silva-fonde-silva-avocat-partners.html", "Founder admitted in Paris and Lisbon (Jan 2026)", 2026, F, "S", "Silver"),
("Verspieren Portugal", "Insurance broker", "FR", "B", "https://www.verspieren.com/sites/default/files/2019-11/Communique_Presse_Lancement_Verspieren%20Portugal.pdf", "French broker launched in Portugal", 2019, S_, "M", "Silver"),
("Miranda & Associados", "Law firm", "FR", "B", "https://mirandalawfirm.com/download/2729/aad470f4cb89c159ff1db5542b48660f/Guia%20Investir%20au%20Portugal%2025_9_Compress.pdf", "French-language 'Investir au Portugal' guide", 2025, S_, "L", "Silver"),
("BDO Portugal", "Tax / accounting", "FR", "B", "https://www.bdo.pt/getattachment/976e2ae4-5f6d-4174-b76e-23bf21d7c475/Guia-Investir-au-Portugal-25_9_Compress.pdf", "French-language 'Investir au Portugal' guide", 2025, S_, "L", "Silver"),
("Euodia", "Succession services (France)", "FR", "B", "https://www.euodia.fr/succession/portugal/", "Guide on Portuguese successions for French families", 2026, S_, "S", "Silver"),
("AnchorLess", "Relocation / legal platform", "FR, BR", "B", "https://anchorless.io/fr/partenaires/cafimo", "Relocation platform with a partner network", 2026, S_, "S", "Silver"),
("GuestReady", "Rental management", "FR", "B", "https://www.guestready.com/fr/conciergerie-airbnb/portugal/", "French page for Portugal rental management", 2026, S_, "M", "Silver"),
("Eurosender", "Moving / shipping", "CH, LU", "B", "https://www.eurosender.com/pt/rr/mudancas/suica", "Portuguese pages for moves to Switzerland and Luxembourg", 2026, S_, "M", "Bronze"),
("Just Arrived", "Relocation (Luxembourg)", "LU", "B", "https://www.justarrived.lu/pt/services-partenaires/demenager", "Portuguese-language relocation services in Luxembourg", 2026, F, "S", "Bronze"),
("Europackers", "Moving Brazil–Portugal", "BR", "B", "https://www.cidadaniaevisto.com.br/blog/container-brasil-para-portugal-como-funciona", "Mover on the Brazil–Portugal route. Public complaints exist: vet before accepting", 2026, S_, "S", "Bronze"),
("Flávia Motta", "Broker (Brazilian clients)", "BR", "B", "https://dnbrasil.dn.pt/flávia-motta-a-carioca-que-virou-referência-para-brasileiros-no-mercado-imobiliário-português", "Profiled as reference broker for Brazilians in Portugal", 2026, S_, "S", "Featured listings"),
("Dils", "Agency", "BR", "B", "https://dnbrasil.dn.pt/o-brasileiro-o-nosso-principal-cliente-afirma-gestora-de-imobiliria-de-alto-padro-em-portugal", "Partner says Brazilians are its main clients (DN Brasil, Oct 2025)", 2025, F, "M", "Campaign"),
("Faccin Investments", "Property consultancy", "BR", "B", INVN, "Quoted on Brazilian luxury buyers in Portugal", 2024, F, "S", "Silver"),
("CV Assessoria Internacional", "Immigration advisory", "BR", "B", INVN, "Quoted on Brazilian migrants to Portugal", 2024, F, "S", "Silver"),
("immoabroad", "Portal / agency", "FR, CH", "B", "https://www.immoabroad.com/portugal/buying-a-house-in-portugal-full-guide-for-foreigners-2025", "Guide for foreign buyers in Portugal", 2025, S_, "S", "Featured listings"),
("Caixiave", "Windows / building", "FR", "B", "https://www.caixiave.pt/fr/nouvelle/caixiave-salon-de-limmobilier-au-portugal-sil-2024", "French-language news page; exhibitor at SIL 2024", 2024, S_, "M", "Bronze"),
("Cyril Jarnias", "Consultant (France→Portugal)", "FR", "B", "https://www.cyriljarnias.fr/?p=22969", "Consultant for French buyers in Portugal", 2026, S_, "S", "Bronze"),
("CRN Contabilidade", "Fiscal representative / accounting", "LU, FR, CH, BR", "B", "https://crncontabilidade.pt/?p=21253", "Fiscal representative service for non-residents", 2026, S_, "S", "Silver"),
("Juramentei", "Sworn translation", "BR", "B", EURO_CASA, "Listed as Eurodicas partner site (document translation for buyers)", 2026, F, "S", "Bronze"),
("Smargiassi", "Law firm (Brazil)", "BR", "B", "https://smargiassi.com.br/lp/portugal/", "Portugal landing page suggests paid campaigns: verify in Meta Ad Library", 2026, S_, "M", "Silver"),
("Uniplaces", "Rentals", "BR", "B", "https://www.uniplaces.com/city-explorer/aluguel-para-expatriados-em-portugal/", "Brazilian-Portuguese guide for expats renting", 2026, S_, "M", "Bronze"),
("Zen Architecture", "Architecture (Luxembourg)", "LU", "B", DECISAO, "Portuguese-founded; speaker at the Decisão/Paperjam Portuguese business event (10 Nov 2026)", 2026, F, "S", "Bronze"),
("Groupe Sopinor", "Construction (Luxembourg)", "LU", "B", DECISAO, "Portuguese-led group; speaker at the Decisão/Paperjam event (10 Nov 2026)", 2026, F, "S", "Silver"),
("OnBoard Advisory", "Advisory (Luxembourg)", "LU", "B", DECISAO, "Speaker at the Decisão/Paperjam Portuguese business event", 2026, F, "S", "Bronze"),

# ---------------- Tier C: large or generic, long cycle (later) ----------------
]

C_ROWS = [
("TAP Air Portugal", "Airline"), ("IKEA Portugal", "Home furnishing"), ("Leroy Merlin Portugal", "DIY / renovation"),
("NOS", "Telecom"), ("MEO", "Telecom"), ("EDP Comercial", "Energy / solar"), ("Galp Solar", "Solar"),
("Allianz Portugal", "Insurance"), ("Generali Tranquilidade", "Insurance"), ("Foyer", "Insurance (Luxembourg)"),
("Lalux", "Insurance (Luxembourg)"), ("Spuerkeess", "Bank (Luxembourg)"), ("BGL BNP Paribas", "Bank (Luxembourg)"),
("ING Luxembourg", "Bank (Luxembourg)"), ("Banque Raiffeisen", "Bank (Luxembourg)"), ("PostFinance", "Bank (Switzerland)"),
("Raiffeisen Suisse", "Bank (Switzerland)"), ("Swiss Life", "Pensions (Switzerland)"), ("VZ VermögensZentrum", "Pension advice (Switzerland)"),
("Empruntis", "Credit broker (France)"), ("Revolut", "Fintech"), ("C6 Bank", "Bank (Brazil)"), ("Banco Inter", "Bank (Brazil)"),
("XP Investimentos", "Investments (Brazil)"), ("Nomad", "Fintech (Brazil)"), ("Currencies Direct", "FX"), ("Moneycorp", "FX"),
("Caiado Guerreiro", "Law firm"), ("Antas da Cunha Ecija", "Law firm"), ("RFF Lawyers", "Law / tax"), ("Martins Castro", "Law firm"),
("Lexidy", "Law firm"), ("Telles", "Law firm"), ("SRS Legal", "Law firm"), ("Global Citizen Solutions", "Residency advisory"),
("Atlantic Bridge", "Relocation (Brazil)"), ("Cidadania4u", "Citizenship services"), ("Feels Like Home", "Rental management"),
("Altido", "Rental management"), ("Internorte", "Coach travel"), ("AGS Four Winds", "Moving"), ("Allied Pickfords", "Moving"),
("Bankinter Portugal", "Bank"), ("Banco do Brasil (Portugal)", "Bank"), ("Decisões e Soluções", "Credit / real estate network"),
("Taxx", "Tax returns (Luxembourg)"), ("Zaask", "Services marketplace"), ("Fixando", "Services marketplace"),
("RE/MAX Portugal (central)", "Agency network"), ("Century 21 Portugal", "Agency network"), ("KW Portugal", "Agency network"),
("Zome", "Agency network"), ("Portugal Sotheby's International Realty", "Agency"), ("VIC Properties", "Developer"),
("Vanguard Properties", "Developer"), ("Kronos Homes", "Developer"), ("Avenue", "Developer"), ("JPS Group", "Developer"),
("Pestana Residences", "Developer / hospitality"), ("JLL Portugal", "Real estate services"),
]

PARTNERS = [
("CCIFP (Franco-Portuguese Chamber)", "FR", "Created the Paris Portuguese property fair; members are our FR sponsors", "https://www.idealista.pt/news/node/59586", "Ask for member directory and a joint webinar"),
("Salon de l'immobilier et de l'investissement portugais (Paris)", "FR", "~150 exhibitors and ~10,000 visitors per edition: the exhibitor list is a ready-made sponsor list", "https://lusojornal.com/salao-do-imobiliario-e-do-investimento-portugues-muda-se-para-a-porte-de-champeret/", "Get the latest exhibitor list; visit next edition"),
("CCISSP (Swiss–Portuguese Chamber, Geneva)", "CH", "Organised a Portuguese property fair in Geneva (2020)", "https://www.idealista.pt/news/node/43936", "Ask for member directory and event partnership"),
("Chambre de Commerce Luxembourg", "LU", "Runs the Luxembourg–Portugal Business Forum", "https://cc.lu/agenda/detail/luxembourg-portugal-business-forum", "Attend the next forum"),
("Decisão magazine / Paperjam 10x6", "LU", "Portuguese business community in Luxembourg; event on 10 Nov 2026, Kinepolis Kirchberg", DECISAO, "Partner attends and collects contacts"),
("LusoJornal", "FR", "Weekly Franco-Portuguese paper; its advertisers are proven sponsors", LUSOJ, "Content swap; monitor advertisers monthly"),
("Lusopress", "FR, PT", "Diaspora magazine; ad concession Boomerang – Multimédia e Comunicação", "https://lusopress.tv/wp-content/uploads/2025/12/Revista-142.pdf", "Ask the ad concessionaire who buys diaspora ads"),
("Academia do Bacalhau de Paris", "FR", "Network of Portuguese business owners in Paris; sponsors include BCP, CGD, Fidelidade", LUSOP125, "Introduction to members"),
("Rádio Alfa", "FR", "Portuguese radio in Paris; media supporter of community events", LUSOP125, "Content swap / joint segment"),
("Rádio Latina", "LU", "Portuguese radio in Luxembourg", "https://en.paperjam.lu/guide/organisation/01276932145/radio-latina", "Content swap / joint segment"),
("Contacto", "LU", "Portuguese newspaper in Luxembourg", "https://en.wikipedia.org/wiki/Contacto_(Luxembourg)", "Monitor advertisers; content swap"),
("Eurodicas", "BR", "Large Brazilian site on living in Portugal; its partners and affiliates are proven BR sponsors (competitor and channel)", EURO_CASA, "Monitor partners monthly"),
]

EXIT_BUYERS = [
("idealista", "Portal", "Announced purchase of Kyero (international buyers) in 2024; deal abandoned in 2025 after CNMC conditions", "https://www.onlinemarketplaces.com/articles/idealistas-kyero-acquisition-cancelled-as-competition-authority-steps-in/"),
("Kyero", "Portal for international buyers", "Plans to reinvest in growth after the failed idealista deal", "https://www.onlinemarketplaces.com/articles/idealistas-kyero-acquisition-cancelled-as-competition-authority-steps-in/"),
("Green-Acres", "Second-home portal", "56 countries, 20 languages; agency subscriptions", "https://www.luxinmo.com/portals/green-acres"),
("A Place in the Sun", "Overseas property media", "Same media + fairs model, UK audience", "https://www.aplaceinthesun.com/advertise/magazine"),
("Portugal Homes", "Agency for international buyers", "Would buy a ready audience of foreign buyers", "https://www.portugalhomes.com/pt/move-to-portugal/services/property-management"),
("Imovirtual", "Portal", "Portuguese portal; diaspora audience is a gap", ""),
("Casa Sapo", "Portal", "Portuguese portal; diaspora audience is a gap", ""),
("RE/MAX Portugal / ERA / Zome", "Agency networks", "Lead source for emigrant sellers and buyers", ""),
("LusoJornal / Lusopress", "Diaspora media", "Consolidation of diaspora media", LUSOJ),
]


# Decision D9 (24 Oct 2026): no outreach to other real-estate agencies or agency networks.
# They compete with the partner agency. Kept here for the record, excluded from the pipeline.
EXCLUDED_AGENCIES = {
    "Libertas / Maison au Portugal", "Fábio Neves Imobiliária", "Porta da Frente | Christie's",
    "Judice & Araújo | Christie's", "RE/MAX Alcateia", "Maia International Properties", "Oliveira Imóveis",
    "Conexão Europa Imóveis", "Engel & Völkers Portugal", "Homelovers", "Infante & Riu",
    "Quintela & Penalva", "ERA Avenidas Novas", "Stay Properties", "7 Adresses",
    "Portugal Homes", "Flávia Motta", "Dils", "Faccin Investments", "immoabroad",
    "RE/MAX Portugal (central)", "Century 21 Portugal", "KW Portugal", "Zome",
    "Portugal Sotheby's International Realty",
}
