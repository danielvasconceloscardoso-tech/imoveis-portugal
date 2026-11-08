# Plot feasibility and land intelligence: market, buyers and the emigrant angle

Prompt 80, market section. Research date: 8 Nov 2026. Method: WebSearch only. WebFetch could not reach any host from this session (DNS blocked for land.tech, testfit.io, archistar.ai, parci.eu, construir.pt and others), so every figure below comes from search-result snippets of the linked page. Treat every number as "reported by the linked source" and re-check it on the page before it goes into anything public. **UNCONFIRMED** marks a claim with a single weak source, conflicting sources or no source at all. Willingness-to-pay notes are the author's judgement, labelled as such. They are not facts.

## 1. Who already does this

### 1a. Portugal

| Player | What it outputs | Price (public) | Funding / backing | Notes |
|---|---|---|---|---|
| **Parci** (parci.eu) | Overlays the PDM and constraint maps on a drawn plot, gives a buildability score, checks RJUE/RGEU/SCE rules, shows a 3D envelope and a pro forma, and writes an AI dossier with every answer citing its source. Claims coverage of 300 of 308 municipalities ("with the plan read"). [S1][S2][S3] | Plans of €29 / €149 / €499 (entry, recurring use, teams), plus a €49 one-off report. Says a manual study costs €875 on average. [S2][S3] Prices come from the vendor's own blog and home page, and the two pages do not match exactly: **UNCONFIRMED** until checked side by side. | None found. **UNCONFIRMED** | The closest Portuguese equivalent of sitescope. It calls itself "AI-native". Its blog targets developers, architects and buyers ("before you buy"). No independent press coverage found. |
| **ATLAS** by Segmento Urbano (architecture practice, "Land Staging") | You draw a plot on a map and get an instant automatic report: urban-planning framework, constraints (PDM, REN, RAN), potential. Built with the IT firm Closer. Presented at SIL, 23–25 Apr 2026. App on iOS/Android from July (2026). Rolled out in phases. [S4][S5][S6] | Not published. **UNCONFIRMED** | Not disclosed | Free-to-try web version reported. Press: Forbes PT, idealista, Construir. |
| **IPR Atlas** (Instituto de Planeamento Regenerativo, Almodôvar) | Plot analysis that combines REN, RAN, Natura 2000, PDMs and fire risk. Reportedly built with AI agents, including Claude. [S7] | Unknown | Unknown | Only one press item (odigital.sapo.pt). **UNCONFIRMED** |
| **Imo Harmonia** (Politécnico da Guarda) | Student project (2025): AI to read PDM rules. [S8] | n/a | Academic | Not a product. |
| **IMOX** (Mutant) | Asset management and urban-analysis tools. Reported presentation at Web Summit, Nov 2026. No link to a primary page was found. | Unknown | Unknown | **UNCONFIRMED** (one search summary, no source link) |
| **Casafari** (Lisbon) | Listings aggregation, CMA/valuation, market analytics and CRM for agents, banks and investors. No plot-feasibility module found. [S9][S10] | Not published (TrustRadius: "no pricing plans listed") [S11] | $15M Series A (2021), extended to $20M with Starwood. A separate $120M "investment mandate" from Stoneweg plus other PE funds is a fund mandate, not equity: the "$135M" headline is $15M + $120M. €5M venture debt from BBVA Spark (Nov 2024). [S9][S10][S12] | Data incumbent. It could add land later. Revenue estimates conflict wildly ($2M vs $52.5M): **UNCONFIRMED** |
| **Confidencial Imobiliário** (SIR) | Price databases: SIR sales/offer, SIR rental, SIR local lodging. Data comes from developers, agents, valuers and banks, mainly Lisbon, Porto and the Algarve. Runs a developer survey with APPII. [S13][S14] | Subscription. Price not public: **UNCONFIRMED** | Private | No land-feasibility product found. |
| **idealista/data** | Data, APIs and studies for banks/servicers, valuers and developers. The developer page names "buying land" and "urban development" as use cases. [S15][S16] | On request | idealista group | Market data, not zoning. |
| **Municipal SIG portals and DGT (SNIT / m@pas)** | The official PDM plans and regulations, often online as WMS/WFS. The formal answer is a *Pedido de Informação Prévia* (PIP) at the câmara. [S17][S18] | Free / PIP fees vary | Public | Every private tool re-packages this free source. |

Other signals: a free tool at larpilot.*.sslip.io ("official registries") shows up in searches about rustic land, so small hobby or solo tools exist: **UNCONFIRMED** [S19]. Listings on Imovirtual commonly advertise "terreno com viabilidade construtiva", so buyers treat buildability as the value driver [S20].

### 1b. Spain

| Player | What it outputs | Price | Funding |
|---|---|---|---|
| **Nestra** (nestra.es) | AI land feasibility: buildability under Spanish planning rules, investment scenarios, a PDF report in under 5 minutes. Has a separate post-sale snagging product. [S21][S22] | Not found. **UNCONFIRMED** | Not found |
| **Nidus Lab** (Valencia/Madrid, founded 2023) | Generative design (claims up to 100,000 proposals a second) that developers use to validate land before buying. Talks with clients in LatAm, Portugal and France. [S23][S24] | Not public | Bootstrapped ("born without external investment") [S24] |
| **urbanData Analytics (uDA)** → **Accumin Intelligence** (Tinsa group) | 190 indicators built from 40+ sources, APIs and AVMs for valuers and investors. Merged with Tinsa Digital and Deyde into Accumin (120 staff). [S25][S26] | Enterprise | Alantra took a majority in 2019. Tinsa bought it (MergerLinks dates this May 2024; Dealroom differs: **UNCONFIRMED**) |
| **idealista/data** (ES) | Uses the Catastro, IGN and INE plus portal data for valuation. [S27] | Enterprise | idealista |
| Catastro / QGIS "Catastro de España" plugin | Free official parcel data [S28] | Free | Public |

No funded Spanish "Archistar-equivalent" was found. Spanish feasibility work is still mostly done by consultancies (Savills urbanismo, ARDE Studio) [S21].

### 1c. Comparables abroad

| Company (country) | What it outputs | Public price | Funding |
|---|---|---|---|
| **LandTech / LandInsight** (UK) | Site sourcing: title and ownership, planning history, constraints, owner contact, LandFund appraisal. | UK G-Cloud listing: £2,500–£6,000 per licence per year. LandFund add-on +£2,000/yr. [S29][S30] | £42M Series A (2021, Updata), £10M growth round later. About $69M in total per CB Insights. [S31][S32] |
| **Searchland** (UK) | Site sourcing, planning potential, owner outreach. | From £195 per licence per month (annual billing), £164 per user at 4–5 users, Pro on request. Its own comparison: £4,800 vs LandInsight £6,000/yr top tier (vendor claim). [S33][S34] | £200k seed (2021) + £2.3M seed (Fuel Ventures, 2022) [S35] |
| **Planda** (via Street.co.uk, UK) | Planning-potential report per property, aimed at estate agents. | £25 per report (non-watermarked) [S36] | n/a |
| "Land Potential Guide" (UK, small) | Site check / planning-potential report | £29 per site check, £99–149 per detailed report, subscriptions from £49/month [S36] | **UNCONFIRMED** (lovable.app site) |
| **"PlotPotential"** | No product under this name found. **UNCONFIRMED** | – | – |
| **Archistar** (AU) | Instant zoning, planning controls, generative massing, feasibility, plus council e-check tools. | AUD 95 / 295–345 / 595–895 per month on 12-month contracts. Sources conflict, and promotional pages show $595 and $695 per month + GST. [S37][S38] | $6M Series A (AirTree, 2020), $6M (2021), $11M round led by NAB Ventures, about $31M in total (AU$) per the report [S39][S40] |
| **TestFit** (US) | Generative site plans and yield/massing feasibility in minutes. | Site Solver from $10,000/yr (earlier $8,000), Site Solver Portfolio $15,000/yr, Parking Solver about $175/month. Flat licence, unlimited users. [S41] | $2M seed (2020) + $20M Series A (Parkway, 2022) = about $22M [S42] |
| **Deepblocks** (US, Miami) | Zoning plus pro forma site selection | Base about $18–22/month. Zoning intelligence for one city about $555/month. [S43][S44] | About $2M (convertible notes). Sources conflict: **UNCONFIRMED** [S45] |
| **Gridics** (US, Miami) | Zoning analysis (Zonar.City), 3D envelope, municipal zoning software sold to cities | Not public | $1.1M + $1.6M seed (2017). $4M Series A (Jan 2020) in one source, $7.65M over 7 rounds in total: **UNCONFIRMED** [S46][S47] |
| **Zoneomics** (US/global) | Zoning data API, zoning reports | Builder API $284/month. Starter/Builder/Growth/Custom tiers (Dec 2025). [S48] | n/a |
| **Regrid** (US) | Parcel data API and bulk files | Usage-based API. Esri listing: $80k/yr nationwide, $12k/yr per state. [S49] | n/a |
| **Prophia** (US) | CRE lease abstraction. **Not a land/feasibility comparable.** | – | $10.2M Series A [S50] |
| **Hectare** (UK) | Agritech grain/livestock marketplace. **Not a land comparable.** | – | £1M+ via Seedrs [S51] |

**Pattern.** Two price bands exist. Professional (developers, land agents): €2.5k–15k per seat per year (LandInsight, Searchland, TestFit). Per report or prosumer: €25–150 per plot (Planda, Parci's one-off report, UK small tools). The VC-scale companies (LandTech about $69M, TestFit $22M, Archistar about $31M) all sell subscriptions to professionals. None found makes its money from private owners.

## 2. Who would pay in Portugal (evidence of spend)

| Buyer | Size evidence | How they buy | Willingness to pay (judgement) |
|---|---|---|---|
| **Developers** | The Informa D&B sector study lists 2,651 real-estate development companies (reference year unclear: **UNCONFIRMED**) [S52]. 48,844 dwellings licensed in 2025 (+14.6%), 42,066 of them in new family housing, the highest since 2011 (INE via idealista) [S53]. APPII says Portugal needs 70k new homes a year, and the CI/APPII survey reports strong demand for land [S54]. Big land deals, e.g. Novo Banco's "Land Bank" portfolio (about €365–400M, 490k m² of GBA), sold with JLL/CBRE [S54][S55]. | Per-seat SaaS, sold by demo and sales. Also buy architect PIPs and studies. | Highest. A €1–5k/yr seat is plausible for the 100–300 active mid-size developers. **Needs a sales team.** |
| **Banks / valuers** | INE: about 32–37k bank appraisals a month in 2025 (e.g. 36,605 in Mar, 36,282 in Nov), so roughly 400k a year (extrapolation) [S56]. CMVM-registered valuers: 1,467 individuals and 210 firms (2019, latest found) [S57]. Valuers report their yearly activity to the CMVM [S58]. | Enterprise data contracts, procurement, APIs (idealista/data, Casafari, Accumin). | High for land and development appraisals (a minority of appraisals, mostly dwellings). Slow procurement. **Needs a sales team.** |
| **Agencies** | 9,762 valid real-estate brokerage licences at the end of 2023 [S59]. "Viabilidade construtiva" is a common listing hook [S20]. | Per-report (Planda-style £25) or per-seat. | Low to medium per agency. Brand rule D9 bars agencies as sponsors or targets anyway, except the one partner agency. |
| **Architects** | Ordem dos Arquitectos: 23–25k members (idealista: "more than 23 thousand", 2.2 per 1,000 people, second only to Italy in the EU; RR 2020: 25k, about 30% not practising) [S60][S61]. Pay is low: 1 in 5 earns near the minimum wage [S62]. A feasibility visit for 3 properties was quoted at €500 incl. VAT on a forum. Fees from €50/h. Projects average €7k (Lisbon) [S63]. Parci claims €875 for an average manual study [S3]. | Individual subscription (€29–149/month band). | Medium as tool users. They are also the *sellers* of the paid study, so a tool can be a lead-in for them, and they fit well as sponsors. |
| **Municipalities (308)** | All PDMs are public. Lisbon had more than 3,100 projects waiting for a licence and has an online licensing platform [S64]. 1.º Direito: 59,000 applications [S66]. | Public tender (CCP), direct award under thresholds. The direct-award ceiling for public-housing works was doubled to €60k by DL 112/2025 [S65]. | Medium. Gridics/Archistar-style e-check tools for councils exist abroad. Long sales cycle. **Needs a sales team and tenders.** |
| **IHRU / housing programmes** | PRR target of 26k homes under 1.º Direito, 100% IHRU funding. IHRU authorised up to €2,011M. Government claims more than 28,000 homes delivered by end of August (2026), while earlier press reported delays [S66][S67][S68]. | Tenders, framework contracts. | Low for a small brand. Procurement-led. |
| **DL 117/2024 (rural land for housing)** | Lets councils reclassify rustic land as urban for housing in a simplified process. Conditions: at least 700/1000 of above-ground GBA for public or "moderate-value" housing, contiguity with urban land, an execution unit, infrastructure, no RAN classes A/A1/B. Later tightened (Lei 53-A/2025 reportedly removed "moderate-value housing": **UNCONFIRMED**). Uptake: **only 27 requests** received by municipalities (idealista, 21 Aug 2026) [S69][S70][S71]. | n/a | Signal: low real uptake but high public interest. That makes it a content topic, not a revenue line. |

## 3. Emigrants who inherited family land

**BUPi emigrant campaign.** It exists and has run several times. Easter TV and local-press campaigns run until 20 April. Leaflets at land borders and the three airports. The "Emigrante Chama" campaign (fire self-protection plus BUPi). An Ottawa embassy notice. A BUPi section on the Portal das Comunidades since 1 Apr 2026 [S72][S73][S74][S75][S76]. Media buying ran through SGMJ procedures (CPI 02/2023/eBUPi/SGMJ for TV/radio/press around Easter 2024; CPI/18/2023 for summer/Christmas) [S77]. **The ~€140k figure is UNCONFIRMED.** No source links €140k to the campaign. The only "140 mil" found is Ourém's 140,000 unregistered rustic plots [S78]. The contract values are probably on base.gov.pt (procedure references above). Search could not read that database, and the brief forbids scraping government sites.

**BUPi numbers.** More than 469,000 citizens had identified properties by 29 Dec 2025 [S79]. 506,451 citizens on the mainland by Apr 2026 [S80]. About 3M+ properties in 158 municipalities [S81]. 46% of the mainland area identified by Sep 2026 [S82]. Free registration ended 30 Sep 2026 (DL 87/2026), and it now costs €15 per georeferenced plot [S83]. BUPi covers 173 municipalities without a cadastre [S79]. **No split of registrations made from abroad was found: UNCONFIRMED.** Proxy: August records were partly attributed to emigrants home on holiday (2023), and 90% of the Proença-a-Nova pilot sessions were holiday arrivals [S84][S85].

**Diaspora size.** About 1.8M Portuguese-born people living abroad (2024, Observatório da Emigração / UN), down from a 2.1M estimate. About 65k emigrated in 2024 [S86][S87]. **No dataset on how many of them hold inherited rustic land: UNCONFIRMED.** The structural reason it is common: rustic land was split among heirs, which leaves many small plots with absent owners [S88].

**Evidence that people ask "what can I build on my family's land?"**
- Fórum da Casa: "Construir em Portugal como emigrante" [S89]. A thread on inherited rustic land where the answer is "only the câmara can tell you" [S90]. Many threads on how to find out the índice de construção (Sintra) [S91].
- expat.com FR: someone who inherited their mother's agricultural land, lives in France, pays IMI and asks what it is worth. A reply says "many emigrants build on their parents' agricultural land" and warns that sellers market agricultural land as building land [S92].
- expat.com EN "Can I build on rustic land?" and britishexpats threads ("needs the footprint of a prior property") [S93][S94].
- Professional content targets the same question: ac-arquitetos "Capacidade construtiva: quanto vale realmente o seu terreno", "Construir casas em terrenos rústicos" [S95][S96]. Parci's blog post "viabilidade construtiva antes de comprar" [S2].

**Programa Regressar.** Targets emigrants or their relatives who start work in mainland Portugal between 1 Jan 2019 and the end of the programme. It offers a cash grant (raised to €3,363.01 per one report) and a special tax regime for former residents who become tax residents in 2024–2026 after five years abroad [S97][S98][S99]. More than 36,000 people returned under the grant by July 2025, and about 37,000 direct and family beneficiaries by June 2026 [S98]. Applications reported open to end Feb 2027, with a proposed extension to end 2027 (not law yet) [S99]. Overlap with land: returners are the people most likely to want to build on family land, but no data links the two: **UNCONFIRMED**.

## 4. Sponsors vs sales team (judgement)

For a Portugal-only media brand with three part-time founders, the buyers that fit **flat-fee sponsorship** are those who want to reach emigrants and foreign buyers and already sell a professional service around the "what can I build?" question: **architecture and engineering practices** (23–25k registered architects, a €500–€875 study is their product), **small topographers / BUPi-qualified technicians and inheritance or property lawyers**, **feasibility tool vendors themselves** (Parci, ATLAS/Segmento Urbano, possibly Casafari or idealista/data for brand reach), **modular / timber-frame builders** and **developers with new-build stock** for the diaspora (a developer campaign from €1,500 fits). A "Can I build on my family's land?" newsletter section or guide, sponsored by one architect firm and one tool, fits D6 (flat fee, never per lead) and D14 (buyer requests still go only to the partner agency). **Banks and valuers, municipalities, IHRU/housing programmes and mid-size developers buying a per-seat feasibility SaaS** all buy through procurement, demos and enterprise contracts, with long cycles. They would need a sales team, so they are out of scope for the D76 low-touch model. Agencies are excluded by D9 except the partner.

## Sources

- S1 Parci home: https://parci.eu/
- S2 Parci blog, viabilidade antes de comprar: https://parci.eu/blog/viabilidade-construtiva-antes-de-comprar
- S3 Parci blog, promotores e IA (plans €29/149/499): https://parci.eu/blog/promotores-ia-analisar-terrenos-parci
- S4 Forbes PT, Atlas: https://www.forbespt.com/atlas-a-ferramenta-que-promete-revolucionar-os-negocios-imobiliarios/
- S5 idealista, "O que posso construir aqui? ATLAS": https://www.idealista.pt/news/node/75042
- S6 Construir, Segmento Urbano apresenta Atlas: https://www.construir.pt/2026/04/20/segmento-urbano-apresenta-atlas
- S7 odigital, Almodôvar platform: https://odigital.sapo.pt/empresa-almodovar-plataforma-analisar-terrenos-riscos-incendio/
- S8 Observador, Politécnico da Guarda: https://observador.pt/2025/06/23/politecnico-da-guarda-desenvolve-plataforma-com-recurso-a-ia-que-simplifica-planos-diretores-municipais/
- S9 ECO News, Casafari $135M: https://econews.pt/?p=29181
- S10 Casafari, Series A extended to $20M (Starwood): https://www.casafari.com/insights/casafari-extends-its-series-a-round-to-20-million-and-receives-strategic-investment-from-starwood-capital-group-to-support-its-european-expansion-plans/
- S11 TrustRadius, Casafari pricing: https://www.trustradius.com/products/casafari/pricing
- S12 BBVA Spark and Casafari: https://bbva.com/en/innovation/bbva-spark-finances-its-first-operation-in-portugal-alongside-casafari
- S13 NOVA IMS and Confidencial Imobiliário: https://www.novaims.unl.pt/en/here-now/news/nova-ims-and-confidencial-imobiliario-establish-a-protocol-of-technical-and-scientific-cooperation/
- S14 CM Jornal (SIR coverage): https://www.cmjornal.pt/economia/detalhe/tavira_com_o_arrendamento_de_luxo_mais_caro_do_algarve
- S15 idealista/data for developers: https://www.idealista.pt/data/servicos-para-promotoras-imobiliarias/
- S16 idealista/data for banks: https://www.idealista.pt/data/produtos-e-servicos-para-bancos-e-servicers/
- S17 ac-arquitetos, índice de construção: https://www.ac-arquitetos.com/post/indice-de-construcao-o-que-fazer-quando-o-alvara-nao-diz-tudo
- S18 DGT geoportal dataset: https://dataportal.ponderful.eu/nl/dataset/7e9416ac-fe95-4b00-a68b-37214958f1b3
- S19 larpilot check tool: https://larpilot.72-62-233-20.sslip.io/check
- S20 Imovirtual listing example: https://www.imovirtual.com/pt/anuncio/terreno-com-12-616-m2-com-viabilidade-construtiva-ID1fQBw
- S21 Nestra, análisis de solares: https://www.nestra.es/analisis-solares
- S22 startup-seeker, Nestra: https://startup-seeker.com/company/nestra~es
- S23 Alicante Plaza, Nidus Lab: https://alicanteplaza.es/alicanteplaza/plaza-inmobiliaria-alicante/nidus-lab-la-creadora-de-una-ia-valenciana-que-personaliza-la-construccion-industrializada
- S24 idealista ES, Nidus Lab (startup tag): https://www.idealista.com/news/etiquetas/startup
- S25 MergerLinks, Tinsa / urbanData: https://app.mergerlinks.com/transactions/2024-05-14-urbandata-analytics
- S26 iberian.property, Alantra acquires uDA: https://iberian.property/news/archive/alantra-cpa-acquires-urbandata-analytics
- S27 datos.gob.es, idealista: https://datos.gob.es/en/casos-exito/idealista
- S28 QGIS Catastro plugin: https://plugins.qgis.org/plugins/catastroesp/
- S29 G-Cloud LandInsight listing: https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/595409603965228
- S30 LandInsight Pro plan page: https://land.tech/pricing/landinsight/pro
- S31 EU-Startups, LandTech raise: https://www.eu-startups.com/2021/10/liverpool-based-landtech-raises-e49-4-million-for-the-international-expansion-of-its-proptech-platform-for-development-site-sourcing/
- S32 CB Insights, LandTech: https://www.cbinsights.com/company/landtech-3/financials
- S33 Searchland pricing: https://searchland.co.uk/pricing-new
- S34 Searchland vs LandInsight: https://searchland.co.uk/searchland-vs-landinsight
- S35 tech.eu, Searchland £2.3M: https://tech.eu/2022/11/24/searchland-puts-away-ps23-million/
- S36 Planda / Street reports: https://intercom.help/streetcouk/en/articles/11384638-planda-planning-potential-reports and https://land-potential-guide.lovable.app/pricing
- S37 Capterra, Archistar: https://www.capterra.com/p/213621/Archistar/
- S38 Archistar promo ($595/month + GST): https://www.archistar.ai/?p=8109
- S39 Business News Australia, NAB/AirTree $11M: https://direct.businessnewsaustralia.com/articles/nab--airtree-and-more-back--11m-raise-for-proptech-archistar.html
- S40 itWire, Archistar $6M (2021): https://ns2.itwire.com/development/archistar-raises-$6m-in-latest-funding-round.html
- S41 TestFit pricing: https://www.testfit.io/pricing and https://pricingsaas.com/companies/testfit
- S42 FinSMEs, TestFit $20M Series A: https://finsmes.com/2022/07/testfit-raises-20m-in-series-a-funding.html
- S43 The Close, dev software guide (Deepblocks pricing): https://theclose.com/best-real-estate-development-software/
- S44 Refresh Miami, Deepblocks: https://refreshmiami.com/news/deepblocks-is-using-ai-to-make-site-selection-more-efficient-and-effective/
- S45 VCBacked, Deepblocks: https://www.vcbacked.co/company/deepblocks
- S46 The Real Deal, Gridics $1.6M: https://therealdeal.com/miami/2017/11/07/gridics-closes-1-6m-seed-round
- S47 CB Insights, Gridics: https://www.cbinsights.com/company/gridics/financials
- S48 Zoneomics API pricing: https://www.zoneomics.com/pricing/zoning-data-apis and https://www.zoneomics.com/blog/december-2025-release-2
- S49 Regrid on Esri Marketplace: https://www.esri.com/en-us/arcgis-marketplace/listing/products/38b244b66af14159acbe8fe544123429
- S50 GlobeSt, Prophia: https://globest.com/2022/12/02/lease-abstraction-and-cre-data-firm-prophia-targets-institutional-investors
- S51 Crowdfund Insider, Hectare: https://www.crowdfundinsider.com/2019/09/151710-overfunding-agritech-marketplace-hectare-quickly-surpasses-1-million-funding-target-through-latest-seedrs-round/
- S52 Informa D&B, Sociedades Imobiliárias summary: https://www.informadb.pt/media/l3ll0p2d/jun_sociedades-imobiliarias.pdf
- S53 idealista, casas licenciadas máximos de 2011: https://www.idealista.pt/news/node/76633
- S54 idealista, Portugal precisa de 70 mil casas: https://www.idealista.pt/news/etiquetas/investimento-imobiliario-0?page=4
- S55 JLL, Land Bank portfolio €400M: https://www.jll.com/pt-pt/newsroom/portfolio-land-bank-a-venda-por-400-milhoes-com-apoio-da-jll-e-cbre
- S56 idealista / ECO on INE bank appraisals: https://www.idealista.pt/news/node/69897 and https://eco.sapo.pt/2025/10/24/avaliacao-bancaria-das-casas-acelera-para-novo-recorde-e-aproxima-se-dos-2-000-euros-por-metro-quadrado/
- S57 idealista, valuers registered with the CMVM: https://www.idealista.pt/news/node/45199
- S58 CMVM Regulamento 1/2017 (reporting duties): https://diariodarepublica.pt/dr/detalhe/regulamento-cmvm/1-2017-106471251
- S59 idealista, mediação triplica em 10 anos: https://www.idealista.pt/news/node/61173
- S60 idealista, Portugal país de arquitetos: https://www.idealista.pt/news/node/40356
- S61 RR, 25 mil arquitetos: https://rr.pt/noticia/pais/2020/05/14/ha-arquitetos-a-ganhar-menos-de-mil-euros-brutos-ordem-apresenta-plano-para-valorizar-profissao/192890/
- S62 DNoticias, 1 em 5 arquitetos: https://www.dnoticias.pt/2023/3/22/353071-um-em-cada-cinco-arquitetos-recebe-perto-ou-abaixo-do-salario-minimo/
- S63 Fórum da Casa (feasibility €500) and Habitissimo/Zaask fees: https://forumdacasa.com/discussion/42982/duvida-para-os-arquitectos/ , https://www.habitissimo.pt/orcamentos/arquitetos/lisboa/sintra , https://www.zaask.pt/quanto-custa/arquitectos
- S64 idealista, Lisboa 3.100 projetos em espera: https://www.idealista.pt/news/node/50931
- S65 idealista, limiares ajuste direto habitação pública: https://www.idealista.pt/news/node/72329
- S66 idealista, IHRU 2.011 milhões 1.º Direito: https://www.idealista.pt/news/node/65897
- S67 portugal.gov.pt, 28.000 casas PRR: https://portugal.gov.pt/pt/gc25/comunicacao/comunicados/prr-prometemos-cumprimos-mais-de-28000-casas-entregues-ate-final-de-agosto
- S68 DN, concursos desertos 26 mil casas: https://www.dn.pt/1441871849/concursos-publicos-desertos-colocam-em-risco-execucao-das-26-mil-casas-do-prr/
- S69 Diário da República, DL 117/2024: https://diariodarepublica.pt/dr/detalhe/decreto-lei/117-2024-901535572
- S70 idealista, raio-x à lei dos solos: https://www.idealista.pt/news/imobiliario/habitacao/2025/01/23/67855-raio-x-a-lei-dos-solos-guia-para-entender-o-que-esta-em-causa
- S71 idealista, apenas 27 pedidos (Aug 2026): https://www.idealista.pt/news/imobiliario/habitacao/2026/08/21/77255-municipios-receberam-apenas-27-pedidos-ao-abrigo-da-lei-dos-solos
- S72 eBUPi, campanha para emigrantes: https://ebupi.justica.gov.pt/Noticias/BUPi-lanca-campanha-de-sensibilizacao-para-emigrantes
- S73 Justiça, campanha chega à televisão: https://justica.gov.pt/Noticias/Campanha-BUPi-para-os-emigrantes-chega-a-televisao
- S74 Postal, Governo sensibiliza emigrantes: https://postal.pt/nacional/governo-sensibiliza-emigrantes-portugueses-o-registo-acessivel-das-suas-propiredades/
- S75 Embaixada em Otava, campanha BUPi: https://otava.embaixadaportugal.mne.gov.pt/pt/a-embaixada/noticias/campanha-de-divulga%C3%A7%C3%A3o-bupi-junto-das-comunidades-portuguesas-residentes-no-estrangeiro
- S76 idealista, BUPi no Portal das Comunidades: https://www.idealista.pt/news/imobiliario/habitacao/2026/04/10/74887-terrenos-nova-informacao-sobre-o-bupi-disponivel-para-emigrantes
- S77 TED notices, eBUPi media buying: https://ted.europa.eu/en/notice/687385-2023/pdf (and related TED 2023 notices in the same search)
- S78 Região de Leiria, 140 mil prédios Ourém: https://www.regiaodeleiria.pt/2021/07/ha-140-mil-predios-rusticos-sem-registo-no-concelho/
- S79 ECO, 469 mil cidadãos BUPi: https://eco.sapo.pt/2025/12/29/mais-de-469-mil-cidadaos-identificaram-as-suas-propriedades-no-bupi/
- S80 Diário de Viseu, BUPi 42%: https://www.diarioviseu.pt/2026/04/18/bupi-com-42-de-area-identificada/
- S81 idealista, mais de 3 milhões de terrenos: https://www.idealista.pt/news/node/73256
- S82 idealista, BUPi 46% da área: https://www.idealista.pt/news/imobiliario/habitacao/2026/09/22/77776-bupi-identifica-46-da-area-no-continente-antes-do-fim-do-registo-gratuito
- S83 idealista, registo passa a 15 euros: https://www.idealista.pt/news/imobiliario/habitacao/2026/09/30/77929-registo-gratuito-de-terrenos-no-bupi-termina-e-passa-a-custar-15-euros
- S84 BUPi, recorde de agosto: https://bupi.gov.pt/bupi-atinge-novo-recorde-em-agosto-e-ja-conta-com-700-mil-propriedades-identificadas/
- S85 JN, emigrantes dão impulso ao cadastro: https://www.jn.pt/nacional/especial/emigrantes-dao-impulso-a-cadastro-de-terrenos-9715113.html
- S86 Jornal de Negócios, 1,8 milhões: https://www.jornaldenegocios.pt/economia/mundo/detalhe/numero-de-emigrantes-portugueses-revisto-em-baixa-sao-18-milhoes-e-nao-21-milhoes
- S87 ECO, onde estão dois milhões de portugueses: https://eco.sapo.pt/especiais/onde-estao-dois-milhoes-de-portugueses/
- S88 britishexpats, buying land (inheritance subdivision): https://britishexpats.com/forum/portugal-89/buying-land-933387/
- S89 Fórum da Casa, construir como emigrante: https://forumdacasa.com/discussion/59132/construir-em-portugal-como-emigrante/
- S90 Fórum da Casa, prédio rústico: https://forumdacasa.com/discussion/6572/predio-rustico/
- S91 Fórum da Casa, índice de construção em Sintra: https://forumdacasa.com/discussion/9791/como-obter-o-indice-de-construcao-em-sintra/
- S92 expat.com FR, valeur d'un terrain: https://www.expat.com/fr/forum/europe/portugal/812018-connaitre-la-valeur-dun-terrain-au-portugal-svp.html
- S93 expat.com EN, can I build on rustic land: https://www.expat.com/en/forum/europe/portugal/1104142-can-i-build-on-rustic-land.html
- S94 britishexpats, buying land Loulé: https://britishexpats.com/forum/portugal-89/buying-land-algarve-loul%C3%A9-816573/
- S95 ac-arquitetos, capacidade construtiva: https://www.ac-arquitetos.com/post/capacidade-construtiva-quanto-vale-realmente-o-seu-terreno
- S96 ac-arquitetos, terrenos rústicos: https://www.ac-arquitetos.com/post/construir-casas-em-terrenos-rusticos-um-guia-para-proprietarios
- S97 Dinheiro Vivo, apoio sobe para 3 363,01 €: https://dinheirovivo.dn.pt/economia/nacional/apoio-ao-regresso-de-emigrantes-a-portugal-sobe-para-3-36301-euros-16280213.html
- S98 Santander Salto, apoio ao regresso (≈37k): https://www.santander.pt/salto/apoio-ao-regresso-de-emigrantes-a-portugal
- S99 CRN Contabilidade, Programa Regressar 2026: https://crncontabilidade.pt/blog/programa-regressar-2026-apoios-fiscalidade-e-quem-pode-pedir/
