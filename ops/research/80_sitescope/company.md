# Sitescope (sitescope.ai), Warsaw: company profile

Researched 2026-11-08 by the company/product agent. **Method note:** WebFetch could not reach `sitescope.ai` or `reports.sitescope.ai` (hostname not allowed in this session's network), so I did not fetch any page directly. Everything below comes from WebSearch results and snippets. Quotes are as the search index shows them; some may be translations or paraphrases of the Polish page. Anything from one secondary source, or not checked against the site, is marked **UNCONFIRMED**. To check the quotes word for word, add `sitescope.ai` and `reports.sitescope.ai` to the allowed hosts and re-fetch them.

## Summary

- **What it is:** a Polish spółka z o.o. (Sitescope sp. z o.o., KRS 0001187643), registered in the KRS on 7 Aug 2025. It sells "AI for land property analysis" in three forms: **Reports** (live; a plot report you configure, shown in the browser and as a PDF), **Studio** (an AI workspace where you ask questions about a plot and see the answer traced to source planning documents; this is "the bigger vision") and an **API** (in development, for portals, PropTech, banks, insurers and public administration). [S1][S2][S3][S5]
- **Stage:** very early. Share capital is 6,000 PLN. Tracxn lists it as **unfunded**, with ~5 employees (UNCONFIRMED). There is no public price list (the site says "Book a demo"), and no named customers or press coverage were found. [S4][S5][S6][S2]
- **Traction signal:** social reach only. The company itself says one short video went viral in under 24 h (200,000+ views, 4,000+ shares). This is probably the reel the operator saw. [S7]
- **Founders/board:** Albert Bigoszewski (majority shareholder; described as CEO/founder), Konrad Garanty and Michał Kliś, all board members. [S5][S6][S7]
- **Relevance to us:** this is a Poland-only data product (MPZP, EGiB, risk layers). It has no Portugal coverage and no media or newsletter business. The relevant parts are the pattern (a free/cheap plot report as the entry product, with the API sold to portals, banks and insurers) and its viral reach on Instagram.

## Product

| Product | Status | What it does | Source |
|---|---|---|---|
| **Reports** (reports.sitescope.ai, page title "Wygeneruj raport o działce online") | Live; the company calls it "our first product" | "Select one or several plots and explore their potential"; you get "property information in an interactive platform and a PDF report you can share". Multi-step configuration with **36 sections** in groups (site/buildings, planning restrictions, risks, local area). | [S3][S7][S1] |
| **Studio** | Announced; called "the bigger vision" | "Ask AI about a plot": it combines maps and planning documents to show "what can be built and which constraints apply", and the user can "return to the source documents" to see what each answer is based on. It shows how planning rules, infrastructure and environmental protection relate to the same place. | [S1][S2][S7] |
| **API** | "In development" | "Structured property data drawn from official sources" for "larger organisations that want to use data in their own systems". The page shows a sample JSON response marked as illustrative only. | [S2][S1] |
| **Viewer**, **LandAssurance** | UNCONFIRMED | A third-party directory lists "Sitescope Studio, Viewer, API, and LandAssurance for buildability analysis". I found no product page for Viewer or LandAssurance. | [S5] |

**Inputs:** you select a plot or several plots, most likely on a map or by parcel ID. The exact method (address, parcel number or map click) is UNCONFIRMED. [S1]

**Outputs (confirmed):** an interactive web report plus a shareable PDF. Sections include location, parcel geometry, EGiB data, local plans (MPZP) and the provisions that apply, nature, heritage and archaeological protection, flooding, terrain, ground conditions, groundwater depth, asbestos records and nearby transaction prices. [S3][S8]

**Outputs (not yet live):** **development capacity** (chłonność, i.e. buildable area or volume) is marked "coming soon" in Reports. **Buildable height, footprint and 3D massing:** nothing found; UNCONFIRMED and probably not shipped. A **feasibility report** beyond the plot report: nothing found. [S3][S8]

**Demo caveat:** one search summary says the site states that its interactive elements are demonstrations, not analysis of real plots (UNCONFIRMED; seen in a single snippet). [S9]

## Data

| Dataset | Used? | Source |
|---|---|---|
| **MPZP** (local zoning plans) | Yes. "Local development plans (MPZP)" plus the provisions currently applying are a Reports section | [S8][S2] |
| **EGiB** (land and building register) | Yes, an "essential" section: cadastral parcels, land uses, soil quality classes | [S8][S3] |
| **WZ decisions** (building conditions) | **UNCONFIRMED.** No mention found on sitescope.ai pages. A forum post about an "MPZP / WZ analysis program" may be unrelated | [S10] |
| **Plan ogólny** (new general plans, 2023 reform) | UNCONFIRMED; no mention found | — |
| Land and mortgage register (KW) | UNCONFIRMED; no mention found | — |
| Environmental and risk layers: flood, terrain, ground conditions, groundwater, asbestos; nature, heritage and archaeological protection | Yes | [S3][S8] |
| Property transaction prices (land, flats, houses nearby) | Yes ("Property prices" section) | [S8] |
| Coverage | Poland (Polish-language reports). A directory claims "any plot across the EU" (UNCONFIRMED and probably aspirational) | [S5] |

Most of these layers are public and free in Poland, and the state Geoportal offers its own free "Raport o działce" (4–7 sections). Sitescope adds aggregation (36 sections), presentation and, in time, AI reading of plan texts. [S11]

## AI: what it does versus plain GIS

- **Reports today look like GIS aggregation:** layer lookups for a parcel, packaged as a report. The one section that would need plan-text interpretation (development capacity) is "coming soon". [S3][S8]
- **AI claim (Studio):** reading and **standardising zoning texts, maps and planning documents** ("reads and standardizes zoning laws, maps, and planning documents to show what can be built on any plot", per a directory) and answering questions in natural language with **citations back to source documents**. That is LLM/RAG over MPZP resolutions plus GIS joins. [S5][S1][S2]
- The company's own phrase, as summarised in search, is "an AI engine and planning documents" at the heart of Studio. [S2]
- I found no technical detail (model, accuracy, human review or evaluation). The site gives no accuracy claim for capacity calculations. [S9]

## Customers & pricing

- **Named customers:** none found.
- **Target segments:** developers, architects, agents/brokers, investors and PropTech firms (platform). For the API: property portals, PropTech companies, banks, insurers and public administration. [S12][S13]
- **Pricing:** **no public price list.** The main site's call to action is "Book a demo": "We'll show you the direction Sitescope is taking and discuss the available scope for your use case." Sales are run through demos. The price of Reports was not visible in the indexed snippets (UNCONFIRMED; it may appear at the checkout step). [S9][S14]
- Polish comparators for price anchoring: Terenoskop "Raport od 49 zł"; OnGeo, Geomiarka and Działki360 sell paid plot reports; the state Geoportal report is free. [S11][S15]

## Company & founders

- **Legal entity:** Sitescope sp. z o.o.; **KRS 0001187643; NIP 5253056370; REGON 542420225**. Registered office ul. Juliana Smulikowskiego 4A/21, 00-389 Warszawa (company address). Registered in the KRS on **7 Aug 2025**; VAT registration 14 Aug 2025 (one source). Share capital **6,000 PLN**. Activity: computer programming/IT. [S5][S6][S16]
- **Founding year:** 2025 (KRS date). An earlier start of the project is UNCONFIRMED.
- **Management board:** Albert Bigoszewski, Konrad Garanty and Michał Kliś, all "Member of the Management Board"; no prezes is named. [S5][S6]
- **Shareholding:** Bigoszewski 80% (96 shares), Garanty 10%, Kliś 10% per Compabase. Another aggregator reports **93.3%** for Bigoszewski. The figures conflict and may reflect a change over time (UNCONFIRMED). [S5][S17]
- **Albert Bigoszewski:** LinkedIn headline "Sitescope". The profile describes an "independent consultant and entrepreneur with over 10 years of experience in business" and lists Poznań University of Economics and Business. Search summaries call him CEO and founder or co-founder (title UNCONFIRMED). [S7][S18]
- **Konrad Garanty:** board member and 10% shareholder. A LinkedIn profile in Warsaw and a ResearchGate author with Warsaw University of Technology co-authors exist under this name, but I could not confirm they are the same person. Likely technical or GIS background: UNCONFIRMED. [S19][S20]
- **Michał Kliś:** board member and 10% shareholder. A LinkedIn profile of that name shows "Allegro" (likely software engineering); the identity match is UNCONFIRMED because the name is common. [S21]
- The company's viral-video post names "Robert, Albert and Jakub". Robert is probably the creator (@realrobertgutierrez); "Jakub" may be a team member (UNCONFIRMED). [S7]
- **Team size:** ~5 employees as of 31 Jul 2026 per Tracxn (UNCONFIRMED: a second search over the same Tracxn page showed no headcount). [S4]
- **Do not confuse:** "SiteScope" (MIT Orbit, Boston; construction bidding, founder Pavel Tkachyk), sitescopeai.com (SEO tool), sitescopeapp.com (Australia), OpenText SiteScope (IT monitoring) and SITESCOPE LIMITED (UK, dissolved 2016) are all unrelated. [S22][S23]

## Funding & traction

- **Funding:** **unfunded** per Tracxn. No round, investor, PFR, NCBR or EU grant found in searches. The 6,000 PLN capital suggests founder-funded so far. [S4][S6][S24]
- **Traction (self-reported):** a short video "went viral in less than 24 hours: 200,000+ views, 370+ comments, 4,000+ shares, 5,500+ saves" (company post reshared on the founder's LinkedIn). The operator's figures for the creator reel (~10.9K likes, 782 comments, 9.6K shares) are probably later numbers for the same reel; this is UNCONFIRMED and I could not find the Instagram reel in search. [S7]
- Instagram @sitescope.ai with 3 posts and ~2,300 followers: per the operator, not verified by search.
- **Press:** none found (no Polish or English articles). [S24][S12]
- **Partners:** none named.
- **Competitors:** Tracxn lists **Prophetic AI, Buildrz and Gridics**. In Poland the comparable products are Hectares "Land Analytics AI", morga.ai, analizachlonnosci.ai, analizychlonnosci.com, OnGeo, Terenoskop, Działki360, Geomiarka and the free Geoportal report. I found no competitor named by Sitescope itself. [S4][S12][S11]

## Positioning quotes

All quotes come from search snippets of the company's pages, not from fetched pages:
- "Unlocking buildable potential with AI": Instagram bio (per operator) and the sitescope.ai homepage. [S1][S25]
- "#1 AI for land property analysis": sitescope.ai homepage. [S2]
- "Reports, API and Studio – three ways to work with property data": sitescope.ai. [S2]
- "Odkryj potencjał zabudowy dzięki AI" ("Discover building potential with AI"): sitescope.ai/?lang=pl page title. [S1]
- "Wygeneruj raport o działce online" ("Generate a plot report online"): reports.sitescope.ai page title. [S3]
- "Sitescope Reports is our first product: a simple way to get key information about a plot in one place and generate a shareable report … the bigger vision is Sitescope Studio": company post via founder's LinkedIn. [S7]
- "Select one or several plots and explore their potential. Get property information in an interactive platform and a PDF report you can share": sitescope.ai. [S7]
- "Book a demo … We'll show you the direction Sitescope is taking and discuss the available scope for your use case": sitescope.ai. [S9]
- Positioning words: *buildable potential, land property analysis, planning documents, constraints, what can be built, source documents, official sources*.

## Open questions

1. Report price, plans and free tier. This needs a direct fetch of reports.sitescope.ai (host currently blocked in this session).
2. Whether WZ decisions and the new **plan ogólny** are covered, and how many gminas' MPZP texts are digitised or parsed.
3. Delivery date of development capacity, height and footprint, and any 3D massing.
4. Who is technical: the roles of Garanty and Kliś. The CTO is unconfirmed.
5. The correct shareholding (80% vs 93.3%), and whether an investor has joined since registration. This needs a current KRS extract (official KRS portal, not scraped).
6. Any paying B2B customers (portals, banks) or pilots.
7. Whether the "EU" ambition is real: any non-Polish data or a Portugal plan (relevant to us).

## Sources

- [S1] sitescope.ai Polish homepage, "Odkryj potencjał zabudowy dzięki AI": https://sitescope.ai/?lang=pl
- [S2] sitescope.ai homepage: https://sitescope.ai/
- [S3] Sitescope Reports, "Wygeneruj raport o działce online": https://reports.sitescope.ai/
- [S4] Tracxn, Sitescope company profile: https://tracxn.com/d/companies/sitescope/__nlAkx7kcR0c2ZQqdpu0vPqPax3eIDaxz30nE8ICgB8A
- [S5] Compabase, Sitescope sp. z o.o. (KRS 0001187643): https://compabase.com/companies/krs/0001187643
- [S6] BizRaport, SITESCOPE SP. Z O.O.: https://www.bizraport.pl/krs/0001187643/sitescope-spolka-z-ograniczona-odpowiedzialnoscia
- [S7] Albert Bigoszewski, LinkedIn (profile and reshared company post): https://www.linkedin.com/in/albert-bigoszewski-332b48106/
- [S8] reports.sitescope.ai section list (same URL as S3; search snippets on EGiB, MPZP, prices, protection layers): https://reports.sitescope.ai/
- [S9] sitescope.ai demo/CTA snippets (same URL as S2): https://sitescope.ai/
- [S10] BudujemyDom forum, "Program do analizy zapisów MPZP / WZ": https://forum.budujemydom.pl/topic/46752-program-do-analizy-zapis%C3%B3w-mpzp-wz-wsparcie-dla-inwestor%C3%B3w-i-projektant%C3%B3w/
- [S11] Geoportal, "Raport o działce" tool announcement: https://www.geoportal.gov.pl/aktualnosci/nowe-narzedzie-w-geoportalu-raport-o-dzialce/ (search snippet only, not fetched; government site)
- [S12] Search summary of Compabase/sitescope.ai on target segments (developers, architects, agents, investors, PropTech): https://compabase.com/companies/krs/0001187643
- [S13] sitescope.ai API target segments (portals, PropTech, banks, insurers, public administration): https://sitescope.ai/
- [S14] sitescope.ai privacy policy (operator Sitescope sp. z o.o.; no cookies; email-only collection): https://sitescope.ai/privacy-policy
- [S15] Terenoskop, "Sprawdź działkę przed zakupem. Raport od 49 zł": https://terenoskop.pl/ ; OnGeo: https://ongeo.pl/ ; Działki360: https://www.dzialki360.pl/ ; Geomiarka: https://geomiarka.pl/funkcje/raport-o-dzialce/
- [S16] GoWork, Sitescope sp. z o.o. company data (NIP): https://www.gowork.pl/sitescope-sp.-z-o.o.,27133197/dane-kontaktowe-firmy
- [S17] AnalizaFirm, Albert Bigoszewski: companies and beneficial owner (93.3% figure): https://analizafirm.pl/osoba/albert-bigoszewski-ac894cfb/
- [S18] Search summary on Bigoszewski's role (co-founder, Sitescope Poland): https://rocketreach.co/sitescope-email-format_b6a7c4a5c8869159
- [S19] Konrad Garanty, LinkedIn: https://www.linkedin.com/in/konrad-garanty-2141583/
- [S20] Konrad Garanty, ResearchGate (identity match UNCONFIRMED): https://www.researchgate.net/scientific-contributions/Konrad-Garanty-71956674
- [S21] Michał Kliś, LinkedIn (identity match UNCONFIRMED): https://www.linkedin.com/in/micha%C5%82-kli%C5%9B-486ab234/
- [S22] MIT Orbit, unrelated "SiteScope" co-founder posting: https://orbit.mit.edu/jobs/68d04aa2f4619813d9d4142c
- [S23] UK Companies House, SITESCOPE LIMITED (unrelated, dissolved): https://find-and-update.company-information.service.gov.uk:443/company/03527086
- [S24] No funding found: searches of eu-startups.com, dealroom and fundediq returned no Sitescope round, e.g. https://dealroom.co/cities/warsaw/
- [S25] Operator observation (Instagram bio @sitescope.ai); Instagram is not fetchable, so this rests on the BRIEF: /home/user/wt-p80/ops/research/80_sitescope/BRIEF.md
- Competitors in Poland: Hectares Land Analytics AI https://hectares.pl/nowosc-od-hectares-land-analytics-ai-automation/ ; morga.ai https://morga.ai/ ; analizachlonnosci.ai https://analizachlonnosci.ai/ ; analizychlonnosci.com https://analizychlonnosci.com/
