## Fact-check (independent)

Checked 8 Nov 2026 against recommendation.md as written by the strategist. Method: WebSearch only. WebFetch was refused by this session's network for every host tried (compabase.com, eco.sapo.pt, parci.eu: "host not allowed"), so no page was opened directly. "(snippet)" means the figure was seen in a search-result snippet of the linked page, not on the page itself. No browser, no curl, no scripted request to any government server; the TED, INE and dados.gov.pt items were read only through search snippets. Internal references (D-numbers, rules, prompts) were checked against ops/DECISIONS.md and CLAUDE.md in this worktree. Estimates and judgements are listed but not counted.

**Totals (77 rows):** 44 CONFIRMED (8 of them internal references; most others from search snippets, as marked), 16 CORRECTED (text or source changed), 4 REMOVED or reworded as UNCONFIRMED, 6 UNCONFIRMED marks kept as they were, 7 estimates or judgements kept with their labels (not counted).

| # | Claim | Verdict | Source link | Note |
|---|---|---|---|---|
| 1 | Sitescope registered in the KRS on 7 Aug 2025 | CONFIRMED (snippet) | https://compabase.com/companies/krs/0001187643 | Snippet: "entered on 07.08.2025", Warsaw court. Also listed on bizraport.pl |
| 2 | Share capital 6,000 PLN | CONFIRMED (snippet) | https://compabase.com/companies/krs/0001187643 | |
| 3 | Tracxn lists it as unfunded | CONFIRMED (snippet) | https://tracxn.com/d/companies/sitescope/__nlAkx7kcR0c2ZQqdpu0vPqPax3eIDaxz30nE8ICgB8A | "has not raised any funding rounds yet" |
| 4 | About 5 staff | UNCONFIRMED (kept as marked) | same Tracxn link | No snippet shows a headcount |
| 5 | Plot report with 36 sections, in the browser and as a PDF | CONFIRMED (snippet) | https://reports.sitescope.ai/ | Snippet also lists plan ogólny, utilities, road access, hazards |
| 6 | Development capacity "coming soon" | CONFIRMED (snippet) | https://reports.sitescope.ai/ | |
| 7 | Studio and API "announced but not shipped" | CORRECTED | https://sitescope.ai/ | Studio is offered via "Book a Studio demo"; API is "in development". Reworded to "announced, not self-serve" |
| 8 | "The AI part is still 'coming soon'" | CORRECTED | https://reports.sitescope.ai/ | "Coming soon" is the development-capacity section, not "the AI part". Reworded |
| 9 | No public prices | CORRECTED | https://reports.sitescope.ai/ ; https://sitescope.ai/ | No price list found, but Reports has a checkout step (price not seen). Reworded |
| 10 | No named customers or press | CONFIRMED (snippet, negative) | https://sitescope.ai/ | None found in this check either |
| 11 | Pitch: "what can be built" and "return to the source documents" | CONFIRMED (snippet) | https://sitescope.ai/ | |
| 12 | "Book a demo"; API for portals, PropTech, banks, insurers, public administration | CONFIRMED (snippet) | https://sitescope.ai/ | |
| 13 | 200,000+ views, 4,000+ shares, 5,500+ saves in under 24 h | CONFIRMED (snippet, self-reported) | https://www.linkedin.com/in/albert-bigoszewski-332b48106/ | LinkedIn post snippet (also 370+ comments). No independent source; now labelled self-reported |
| 14 | Brand account ~2,300 followers, 3 posts | UNCONFIRMED (reworded) | BRIEF.md | Operator observation only; Instagram not searchable or fetchable |
| 15 | Shares were 0.88 of likes | CONFIRMED (arithmetic) | BRIEF.md | 9.6K / 10.9K = 0.88, on the operator's unverified figures |
| 16 | "Instagram ranks on sends" | CORRECTED | https://searchenginejournal.com/instagram-algorithm-shift-why-sends-matter-more-than-ever/521389 | Mosseri names sends per reach as one of the top three signals (with watch time and likes); "most important" is a secondary attribution. Reworded |
| 17 | LandInsight £2,500–£6,000 per licence per year (G-Cloud) | CONFIRMED (snippet) | https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/595409603965228 | UK public-procurement listing, read through a snippet only |
| 18 | TestFit from $10,000/yr | CORRECTED | https://www.testfit.io/testfit ; https://pricingsaas.com/companies/testfit/diffs/2026W33 | Site Solver now from $15,000/yr (Portfolio $20,000), changed 3–10 Aug 2026 per PricingSaaS; TestFit's own product page shows $15,000 (snippet) |
| 19 | None of the comparables earns from private owners | JUDGEMENT (not counted) | market.md §1c | Research-file pattern, not independently checkable |
| 20 | Parci claims 300 of 308 municipalities | CONFIRMED (snippet) | https://parci.eu/ | The 8 missing are listed publicly per the snippet |
| 21 | Parci plans €29/€149/€499 plus a €49 one-off report | CONFIRMED (snippet, vendor) | https://parci.eu/blog/promotores-ia-analisar-terrenos-parci ; https://parci.eu/ | Blog gives the three tiers, home page the €49 report "sem subscrição". Billing period of the tiers not seen. The UNCONFIRMED tag was dropped; source noted as the vendor's own |
| 22 | No Parci funding found | CONFIRMED (negative) | search, no result | None found in this check either |
| 23 | Litehaus publishes "Índices PDM" pages per municipality, Gondomar included | CONFIRMED (snippet) | https://score.litehaus.co/land/pt/gondomar/indices-pdm | Gondomar page cites Aviso 3337/2018 |
| 24 | Litehaus sells a 29 € report | CORRECTED | https://www.litehaus.co/pt/ | "From 29 € + VAT per parcel" (quick screening report); covers PT, ES, HR, LV |
| 25 | ECO reported a funding round on 29 May 2025; amount not stated | CORRECTED | https://eco.sapo.pt/2025/05/29/litehaus-levanta-15-milhoes-para-acelerar-construcao-de-casas/ ; https://www.idealista.pt/news/node/70017 | ECO headline 1.5 M€; the round is a 1.46 M€ pre-seed (idealista, TechCrunch). Amount added |
| 26 | Litehaus is "about building homes" | CONFIRMED (snippet) | https://www.idealista.pt/news/node/70017 | Home-building platform (3D-printed and modular homes). Added |
| 27 | ATLAS by Segmento Urbano launched at SIL, April 2026 | CONFIRMED (snippet) | https://www.idealista.pt/news/node/75042 | Presented at SIL, 23–25 Apr 2026; app from July 2026. Dates added |
| 28 | "Three Portuguese tools"; "we would be the fourth tool" | CORRECTED | https://foral.ai/terra | foral.ai also claims all 308 municipalities (UNCONFIRMED), and market.md lists IPR Atlas. Reworded to "at least" |
| 29 | None of the three appears to be an estate agency | CONFIRMED (snippet, kept as UNCONFIRMED for licence) | https://parci.eu/ ; https://www.idealista.pt/news/node/70017 ; https://www.idealista.pt/news/node/75042 | Sources describe SaaS, a home-building platform and an architecture practice. No AMI licence register check was made |
| 30 | BUPi: 506,451 citizens registered by Apr 2026 | CONFIRMED (snippet) | https://www.diarioviseu.pt/2026/04/18/bupi-com-42-de-area-identificada/ | Mainland, data as of 16 Apr 2026 (Lusa via Diário de Viseu and idealista). Date added |
| 31 | Registration costs €15 per plot since 30 Sep 2026 | CORRECTED | https://www.idealista.pt/news/imobiliario/habitacao/2026/09/30/77929-registo-gratuito-de-terrenos-no-bupi-termina-e-passa-a-custar-15-euros ; https://www.dnoticias.pt/2026/9/30/507248-madeira-tem-37-dos-terrenos-identificados-no-bupi/ | Free until 30 Sep 2026; from 1 Oct €15 per RGG up to the ninth, €10 from the tenth |
| 32 | About 1.8M Portuguese-born people live abroad | CONFIRMED (snippet) | https://www.jornaldenegocios.pt/economia/mundo/detalhe/numero-de-emigrantes-portugueses-revisto-em-baixa-sao-18-milhoes-e-nao-21-milhoes | UN estimate for 2024 via the Observatório da Emigração; one idealista piece says 1.7M |
| 33 | Fórum da Casa thread asks what can be built on family land | REMOVED (UNCONFIRMED) | https://forumdacasa.com/discussion/6572/predio-rustico/ | Thread not found by search. Kept only as an UNCONFIRMED pointer |
| 34 | expat.com FR thread on inherited land | CONFIRMED (snippet) | https://www.expat.com/fr/forum/europe/portugal/812018-connaitre-la-valeur-dun-terrain-au-portugal-svp.html | The thread asks about value; a reply warns that agricultural land is sold as building land. Wording adjusted to "worth and whether it can be built on" |
| 35 | Number of emigrants holding inherited land is UNCONFIRMED | UNCONFIRMED (kept) | market.md | |
| 36 | Live capture of the 3D map drops to ~4 fps (DECISIONS.md, prompt 28) | CONFIRMED (internal) | ops/DECISIONS.md line 92 | |
| 37 | Reels planned from December (D27) | CONFIRMED (internal) | ops/DECISIONS.md, D27 | "3 reels from December" was the CTO proposal within D27 |
| 38 | Multilingual social accounts (D42) | CONFIRMED (internal) | ops/DECISIONS.md, D42 | |
| 39 | Credit category belongs to the partner group (D21, D45) | CONFIRMED (internal) | ops/DECISIONS.md, D21 and D45 | |
| 40 | D6 flat fee, D9 no agencies, D14 all requests to the partner, D12 editorial policy | CONFIRMED (internal) | ops/DECISIONS.md | |
| 41 | Rule 17: golden sample, default paid | CONFIRMED (internal) | CLAUDE.md rule 17 | |
| 42 | Developer campaigns from 1,500 € | CONFIRMED (internal) | CLAUDE.md | |
| 43 | Regressar meeting 9 Nov (prompt 79) | CONFIRMED (internal) | ops/prompts/79_regressar_ready_for_the_programme.md | Mon 9 Nov 2026, 15:00 |
| 44 | PIP and certidão are the only binding answer of the câmara | CONFIRMED (snippet, secondary) | https://ordemdosarquitectos.org/backend/uploads/Simplex_Urbanistico_78be4f0124.pdf | Snippets (municipal and law-firm pages) confirm a favourable PIP binds for 2 years since the 2024 Simplex; the OA PDF itself was not seen |
| 45 | Collabstr $193 average | CONFIRMED (snippet) | https://collabstr.com/2026-influencer-marketing-report | Average paid per collaboration (creators list ~$214). Wording sharpened |
| 46 | A comparable reel costs 300–1,500 € | ESTIMATE (not counted) | growth.md §2 | Labelled estimate |
| 47 | Catarina Machado ~259K Instagram | CONFIRMED (snippet) | https://www.forbespt.com/?p=190993 | "Mais de 259 mil" |
| 48 | Pedro Andersson ~878K across platforms (link: a personal LinkedIn profile) | CORRECTED (source) | https://inovacaomarketing.com/blog/top10/ | Figure confirmed in the I&M June 2026 ranking (six platforms combined); the original link was someone's LinkedIn profile, replaced |
| 49 | João Zoio runs a credit brokerage | CONFIRMED (snippet) | https://www.joaozoio.com/sobre ; https://www.doutorfinancas.pt/rede-clinicredito/ | Co-founder of Clínica do Crédito (since June 2023 per his site). Name and second source added |
| 50 | CRUS is DGT data under CC BY 4.0 on dados.gov.pt | CONFIRMED (snippet) | https://dados.gov.pt/en/datasets/carta-do-regime-de-uso-do-solo-portugal-continental-1 | |
| 51 | `crus_gondomar` collection UNCONFIRMED | UNCONFIRMED (kept) | data.md | Not checked (no calls to government servers) |
| 52 | Two 2023 preventive-measure areas in Gondomar, Aviso 13612/2023 | CONFIRMED (snippet) | https://www.cm-gondomar.pt/wp-content/uploads/2023/07/2023.07.17-Aviso-DR-Suspensao-Parcial-do-Plano-Diretor-Municipal-de-Gondomar.pdf | DR 2.ª série n.º 137, 17 Jul 2023 (HE-UFP area); the other is April 2023 (LIPOR area) |
| 53 | Regulation in force: Aviso 3337/2018 | CONFIRMED (snippet) | https://diariodarepublica.pt/dr/detalhe/aviso/3337-2018-114859410 | 1st alteration, 13 Mar 2018. No later PDM alteration found in this check (Aviso 10669/2018 concerns the fees regulation, not the PDM); a direct DRE check is still advisable |
| 54 | Gondomar step 1 takes about 6–8 days | ESTIMATE (not counted) | data.md §5 | Labelled estimate |
| 55 | BUPi buys TV, radio and press to reach emigrants through SGMJ procedures (TED) | CORRECTED | https://ted.europa.eu/en/notice/687385-2023/pdf ; https://justica.gov.pt/Noticias/Campanha-BUPi-para-os-emigrantes-chega-a-televisao | The TED award covers the summer and Christmas 2023 campaigns aimed at residents in Portugal. Emigrant campaigns did run on general-interest TV and local press (Easter 2023, Justiça). Text split into the two facts |
| 56 | ~€140k campaign figure | UNCONFIRMED (kept) | market.md | No source |
| 57 | Programa Regressar ~37,000 beneficiaries (link: Santander) | CORRECTED (source) | https://www.idealista.pt/news/node/71353 | Figure confirmed: almost 37,000 people, ~17,000 applicants plus ~20,000 family members. The Santander page did not appear in search; replaced |
| 58 | Architects: 23–25k members | CONFIRMED (snippet) | https://www.idealista.pt/news/node/40356 ; https://rr.pt/noticia/pais/2020/05/14/ha-arquitetos-a-ganhar-menos-de-mil-euros-brutos-ordem-apresenta-plano-para-valorizar-profissao/192890/ | 23k+ (idealista, undated) and 25k (RR, 2020, ~30% not practising) |
| 59 | Manual study costs €875 on average (Parci claim) | CORRECTED (source) | https://parci.eu/ | Figure is on Parci's home page ("875 € em média" vs "Relatório Parci 49 €"), not in the blog post linked. Link fixed |
| 60 | €500 per forum quote | REMOVED (UNCONFIRMED) | https://forumdacasa.com/discussion/42982/duvida-para-os-arquitectos/ | Thread not found; another thread mentions ~600 € for a survey and sketches. Marked UNCONFIRMED |
| 61 | 48,844 dwellings licensed in 2025 (link: idealista) | CONFIRMED (snippet), source added | https://observador.pt/2026/07/17/preco-mediano-de-alojamentos-familiares-aumentou-168-em-2025/ | INE via Lusa, +14.6%, highest since 2011. The idealista link was not seen in search; Observador added |
| 62 | ~400k appraisals a year, extrapolated | CONFIRMED (snippet), labelled estimate | https://www.ine.pt/ngt_server/attachfileu.jsp?look_parentBoui=774042570&att_display=n&att_download=y | INE monthly counts 2025: ~35.3k May, ~32.6k Jun, 36,282 Nov, 34,496 Dec; ×12 ≈ 400k. "Estimate" added |
| 63 | A nationwide engine takes 300–550 person-days | ESTIMATE (not counted) | data.md §2 | Labelled estimate |
| 64 | No national dataset of building indices | CONFIRMED (snippet, negative) | https://score.litehaus.co/land/pt/gondomar/indices-pdm | Litehaus: "no single Ic for the municipality; it depends on the land category"; CRUS carries class and category only |
| 65 | Web Summit Lisbon, 9–12 Nov 2026 | CONFIRMED (snippet) | https://hadea.ec.europa.eu/events/web-summit-2026-2026-11-09_en | |
| 66 | Sitescope is at Web Summit Lisbon | REMOVED → UNCONFIRMED | growth.md G32/G33 (LinkedIn) | No result in this check; rests on LinkedIn snippets in growth.md. Marked "reportedly … UNCONFIRMED" |
| 67 | CRUS last updated 21 Sep 2023 | CONFIRMED (snippet) | https://dados.gov.pt/en/datasets/carta-do-regime-de-uso-do-solo-portugal-continental-1 | Link changed from the Góis listing to the national listing, which shows the date |
| 68 | Urbanisable-land norms lapse where a PDM was not adapted | CONFIRMED (snippet) | https://cnt.dgterritorio.gov.pt/sites/default/files/CNT_%20Recomendacao_Art199_RJIGT.doc_.pdf | RJIGT art. 199.º, deadline 31 Dec 2024, suspension in force from 31 Dec 2024 with exceptions (CNT Recommendation 1/2025) |
| 69 | Gondomar's 2nd PDM revision is in progress | CONFIRMED (snippet) | https://www.cm-gondomar.pt/wp-content/uploads/2026/01/Grandes-Opcoes-do-Plano-e-Orcamento-2026.pdf | Municipal 2026 plan says the revision is under way; no public discussion found |
| 70 | CRUS needs "© DGT" attribution | CORRECTED | https://dados.gov.pt/en/datasets/carta-do-regime-de-uso-do-solo-portugal-continental-1 | CC BY 4.0 requires crediting DGT; the exact "© DGT" wording was not seen. Reworded |
| 71 | Licence terms for ICNF, Património Cultural, APA UNCONFIRMED | UNCONFIRMED (kept) | data.md | |
| 72 | Whether the reel was paid is UNCONFIRMED | UNCONFIRMED (kept) | growth.md | |
| 73 | A zoning layer adds exit value only as a sponsor category (judgement) | JUDGEMENT (not counted) | — | Labelled judgement |
| 74 | Shared 29 € entry "looks like a market price" | JUDGEMENT (not counted) | — | Note: Parci's €29 is a plan tier, Litehaus's is a per-parcel report + VAT |
| 75 | Readers: reports sell at 29 € and €49 | CORRECTED | https://www.litehaus.co/pt/ ; https://parci.eu/ | "From 29 € + VAT (Litehaus) and €49 (Parci)" |
| 76 | Free Gondomar layer because "competitors charge 29 € for more" | CORRECTED | https://www.litehaus.co/pt/ | "From 29 € + VAT" |
| 77 | Statement of the D76 north star in the scoring table | JUDGEMENT (not counted) | ops/DECISIONS.md D76 | D76 confirmed internally; the scoring itself is judgement |

Count check. CONFIRMED: rows 1–3, 5, 6, 10–13, 15, 17, 20–23, 26, 27, 29, 30, 32, 34, 36–45, 47, 49, 50, 52, 53, 58, 61, 62, 64, 65, 67–69. CORRECTED: 7, 8, 9, 16, 18, 24, 25, 28, 31, 48, 55, 57, 59, 70, 75, 76. REMOVED or now UNCONFIRMED: 14, 33, 60, 66. UNCONFIRMED kept: 4, 35, 51, 56, 71, 72. Not counted: 19, 46, 54, 63, 73, 74, 77.
