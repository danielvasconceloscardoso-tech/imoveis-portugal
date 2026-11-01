# Prompt 51 · Research B: data and map players

Checked 2026-11-01. Each site was read in a headless browser at 390x844 (phone) and 1440x900 (desktop), plus raw HTML through curl. No forms submitted, no sign-ups, no trials, no contact. Quotes are under 15 words. No personal names. Registry lines come from the free Racius company page; the "Estado de Atividade" field there sits behind a paid report (7 €), so "no flag" means only that the free view shows no dissolution or insolvency marker. Grant amounts are from `ops/funding/comparables.md`.

What we have, for the "we do better" lines: the MapLibre map (`site/src/scripts/map-v3.ts`) with municipality and parish colours for INE price and rent per m² (`site/src/data/ine-m2.json`), hillshade, rivers, beaches and golf layers; an embeddable map (`/embed/map/[lang]`); simulators; the Concierge request flow to the licensed partner; developer showcase pages down to the unit (`[section]/[dev]/[muni]/[unit]`); and private token pages for partners and developers (`/p/[token]`, `/d/[token]`, `/i/[token]`).

---

## 1. Alfredo Real Estate Analytics (REA.AI valuations; "Alfredo AI" metasearch)

Grant rows: PRR vouchers REA.AI, 30,000 € (2023), and PRR e-commerce internationalisation "Alfredo AI World", 42,500 € (2024).

**1. Status today: live and growing; the product has widened from valuations into a full agent platform.**
- alfredo.app and alfredo.pt both serve the same site. The footer reads "© 2026 Alfredo AI - Real Estate Analytics" (https://alfredo.app/, 2026-11-01).
- The site claims "more than 40,000 professionals" and a proprietary AVM for Portugal, Spain and the UK (https://alfredo.app/). Older press from Instituto Superior Técnico gave about 2,000 customers (https://tecnico.ulisboa.pt/en/news/campus-community/alfredo-ai-the-startup-that-is-revolutionizing-the-portuguese-real-estate-market, undated in search, checked 2026-11-01).
- Racius slug not found (404 on three guesses), so registry not verified.

**2. Product.**
- First 10 s, desktop: a white card layout. The headline reads "The AI platform for Team Leaders", with the last words typed out by an animation. Below it a monospace subline, a "No credit card required (free trial)" note and one black "Get Started" button. The top bar has About, Pricing, Book a demo, a language flag, a theme toggle and Login. There is a giant faint "Alfredo" watermark, and no product screenshot above the fold.
- First 10 s, phone: the same hero stacked, with a hamburger menu. The first screen holds only the headline and "Get Started".
- Main flow: sign up for the free tier (3 market studies), then create a "market study". This is an AVM report with comparables, local trends and points of interest, branded with the agent's logo (https://alfredo.app/valuations). Around it sit metasearch across portals including FSBO, a CRM with pipelines, "Website Pro" for agents, and a "Digital Valuer" widget that agents embed to capture seller leads (https://alfredo.app/digital-valuer).
- Map: none on the public site, and no map library requests on the home or product pages. The valuation pages mention points of interest and local market context, but the actual map is behind login (not verified).
- Data claimed: daily updates; "more than one million unique properties" and about 5 million listings with duplicates filtered (https://alfredo.app/ FAQ). The "Índice de Preços Alfredo" draws on public listing portals and agency sites, processed with AI. It reported a national average of 2,123 €/m² and also tracked time on market (Doutor Finanças, 2022-07-11, https://www.doutorfinancas.pt/vida-e-familia/habitacao/precos-das-casas-aumentam-quase-5-no-primeiro-semestre/). No INE, AT or SNIT source is named on the site.

**3. Money: agents and agencies pay by subscription, institutions pay for the API.**
- Pricing (https://alfredo.app/pricing, 2026-11-01):
  - Standard: free, credit-based.
  - Top Producer: 220 €/yr.
  - Enterprise: 450 €/yr for 3 accounts, with extra accounts at +150 €/yr.
- API is billed on credits: Starter 20 €/30 days (≈20 AVM estimates), Pro 99 €, Business 299 €, then larger tiers up to "10M+".
- Custom AVMs and SLAs for banks, funds and networks.
- A "Data observatory" is offered as a white-label data-visualisation product, "trusted by government institutions" (https://alfredo.app/observatory).

**4. Trust.**
- Footer: "Funded by the PRR and the European Union", with a PRR/EU logo bar image (https://alfredo.app/).
- A long carousel of client agents with photos and names (individual agents, so not reproduced here).
- A team block with photos. A Startup Portugal guest article by a co-founder (https://startupportugal.com/?p=2720).
- No review platform and no accuracy figure. A third-party summary noted that the old features page showed a placeholder accuracy number, and that page now returns 404 (https://alfredo.app/features, 2026-11-01).

**5. Analytics they expose.**
- Branded PDF market studies.
- "Market insights", with a monthly emailed report on chosen indicators and trends (https://alfredo.app/insights).
- An admin dashboard for team plans.
- A media partnership: Doutor Finanças published Alfredo's price index as editorial content.

**6. Better than us / we do better.**
- They do better: a monthly, named, citable price index with time-on-market, syndicated through a consumer finance outlet. Our index has no recurring, quotable release yet.
- We do better: we serve the end buyer abroad in six markets and their language, with a public, free map and a request flow. Alfredo's buyer-facing value sits behind an agent's login.

---

## 2. Pacific Front, Lda, "Pacific Front AI Invest" (Elvas)

Grant row: PRR C05-i14.01 "IA nas empresas", 195,000 € (2026).

**1. Status today: no public product found; company registered and recent.**
- Racius: incorporated 06/09/2022 with registered office in Elvas and share capital 1,000 €. The main CAE is 68311 (real-estate mediation), plus 41200 construction, 55201 furnished lodging and 55204 short-stay lodging (https://www.racius.com/pacific-front-lda/, 2026-11-01). The free view shows no dissolution or insolvency flag.
- No website: pacificfront.pt, pacificfront.com and pacificfront.ai did not resolve or connect through our proxy. Three web searches found no product page, app or press (2026-11-01). No public LinkedIn company page was found at linkedin.com/company/pacific-front (404).

**2. Product.**
- Not verifiable. The grant record describes AI models of price growth, risk and demand, called the first such Portuguese PropTech (comparables.md row 14). The project is from 2026 and probably still in build.
- No map and no data sources to report.

**3. Money.** Not public. The CAE codes suggest a mediation, construction and short-let operator that would use the AI internally or sell it to investors (inference, not verified).

**4. Trust.** Nothing public.

**5. Analytics.** Nothing public.

**6. Better than us / we do better.**
- They do better: on paper, forward-looking price-growth and demand scores, which is a buyer-relevant "where next" signal.
- We do better: we ship something a buyer can open today, with a declared official source (INE).
- Note for us: their main CAE is real-estate mediation, so they count as a real-estate agency under D9 and are not a sponsor or outreach target.

---

## 3. Odynx, Lda (Oeiras)

Grant row: PRR vouchers, 3rd call, 30,000 € (2025).

**1. Status today: pre-product landing page, live, no app visible.**
- Racius: incorporated 18/12/2024 in Oeiras with share capital 1,000 €. CAE 62010 (programming), 62020 and 63110 (https://www.racius.com/odynx-lda/, 2026-11-01). The free view shows no dissolution or insolvency flag.
- Site: https://odynx.com/en, footer "© 2026 ODYNX.COM" (2026-11-01).
- No public LinkedIn company page at /company/odynx (404).

**2. Product.**
- First 10 s: in our headless browser at both viewports the client-side app showed only "Something went wrong. Please refresh the page." A Cloudflare Turnstile script was loading. We did not retry around it.
- The server HTML (curl) shows a single-page landing with these sections:
  - hero "The AI for Real Estate Investors" with "Discover ODYNX" and "Get in touch" buttons;
  - About;
  - Investors (ROI, IRR, ROE explainer blocks);
  - Mission ("renovation over new build", with a claim of ~50% fewer resources than new construction);
  - Team;
  - Contact form.
- Main flow: none self-serve. The only call to action is the contact form ("free consultation"). No login and no app link.
- Map: none.
- Data claimed: "multi-source property data (listings, time-series price movements, user behavior)", enriched by LLMs. Features named: flags inconsistencies in listings, auto-builds investment briefs, "hot-zone forecasts", capex scenarios, multi-path ROI. No named source (no INE, AT or Idealista).

**3. Money.** Who pays is stated as "investors & club deals, developers/asset managers, banks". No price. They promise "exclusive access to the best deals", which implies deal-flow access as the product.

**4. Trust.**
- PRR, República Portuguesa and NextGenerationEU logos, under the line "Este projecto é apoiado…" (https://odynx.com/en HTML, 2026-11-01).
- Founders shown with full bios, past employers and personal emails. Strong team visibility, with big-brand ex-employer credibility.
- No clients, reviews or press.

**5. Analytics.** None exposed. Investment briefs and ROI/IRR outputs are promised, not shown.

**6. Better than us / we do better.**
- They do better: they speak an investor's numbers (ROI, IRR, capex for renovation) and back a clear "renovate vacant stock" thesis, which a funder rewards.
- We do better: a working, public, sourced product, where Odynx's front end fails to render and offers no self-serve path.

---

## 4. RT GEO – Planeamento e Ordenamento do Território, Unip. Lda (Algarve)

Grant row: Algarve 2030, 63,540.88 € EU support on 158,852.20 € eligible (2024).

**1. Status today: live as a planning consultancy; the funded webSIG apps are not public.**
- Racius: incorporated 17/03/2010 with registered office in Silves, CAE 71120 (https://www.racius.com/rt-geo-planeamento-e-ordenamento-do-territorio-unipessoal-lda/, 2026-11-01).
- Site footer "© 2026" (https://www.rtgeo.pt/, 2026-11-01).
- LinkedIn has 162 followers, with the latest post dated 2026-10-28 (https://www.linkedin.com/company/rtgeo-portugal/, public view, 2026-11-01).
- Project sheet: "RT GEO Crescimento", approved 31-10-2024, running 12-03-2024 to 11-03-2026, for "3 aplicações webSIG", new premises and 20% growth (https://rtgeo.pt/pdf/Ficha_Website.pdf). The sheet still carries the template placeholder "[IMAGEM DO BENEFICIÁRIO]".

**2. Product.**
- First 10 s, desktop: a dark top bar with logo and hamburger. A green full-bleed hero with aerial photos of a dense Algarve beach town in leaf-shaped masks and the serif line "Move-nos o território."
- First 10 s, phone: the same hero with the four menu items.
- Main flow: none. It is a brochure: Quem somos, O que nos move, O que fazemos, Contactos.
- Services listed: PDM plans, detail plans, REN delimitation, flood and wildfire risk studies, environmental impact, GIS and thematic mapping (https://www.rtgeo.pt/o-que-fazemos/).
- Map: none public. No map-library requests, and no link to any webSIG viewer.
- Data: none claimed publicly. As planners they work with SNIT, PDM and REN layers, but nothing is exposed.

**3. Money.** Municipalities and private clients pay for B2B consultancy. No prices.

**4. Trust.** An Algarve 2030 / Portugal 2030 / EU bar in the footer, the project sheet PDF, and a client section (logos not itemised). No reviews and no team names on the home page.

**5. Analytics.** None.

**6. Better than us / we do better.**
- They do better: real expertise on the planning layers a buyer actually needs, which is what can be built where (PDM zoning, REN, flood and fire risk).
- We do better: we publish a map to the public. Their funded webSIG apps are invisible eight months after the project end date.

---

## 5. Our Watch Leads – OWL, Lda, "OWLplaces AI"

Grant row: COMPETE 2030 R&D, 228,057.49 € (2026).

**1. Status today: live, pivoted in positioning.** The grant describes sustainability assessment against EU Level(s). The site now leads with climate-risk intelligence for banks, insurers and asset managers.
- Racius: incorporated 17/12/2020 with registered office in Coimbra, main CAE 71110 (architecture) (https://www.racius.com/our-watch-leads-owl-lda/, 2026-11-01).
- ourwatchleads.com redirects to https://owlplaces.com/, footer "© 2026".
- LinkedIn has 2,086 followers, with the latest post dated 2026-10-28 (https://www.linkedin.com/company/owl-places, public view, 2026-11-01).

**2. Product.**
- First 10 s, desktop: a soft blue gradient card. A small pill reads "Report climate risks. Build resilience. Now". The large headline reads "Real-Time Climate Risk Intelligence for Real Estate", with "Book a Demo" (filled) and "Free Trial" (outline) buttons. Below are three greyscale client logos and "Trusted by 90+ clients across industries". Top navigation: About, Features, Testimonials, Impact, Markets, Log In.
- First 10 s, phone: the same order, with Log In and Book a Demo at the top.
- Main flow: book a demo, or a free trial through https://app.owlplaces.com/, which is a login wall ("Sign in / Sign up"). We did not sign up.
- Features: a per-asset "digital passport" kept up to date by agents; a digital twin with "what-if" scenarios; audit-ready reports to CSRD, IFRS S2, ESRS and SFDR; benchmarks against CRREM, Level(s), DGNB, LEED, BREEAM and WELL; API or self-hosted deployment.
- Map: none on the public site. Inside the app not verified (login wall).
- Data claimed: satellite Earth observation, meteorological stations, building systems, utility bills and property documents (https://owlplaces.com/).

**3. Money.** Banks, insurers, asset managers and CSRD-reporting companies pay through a B2B SaaS and API. No public price, and the free trial is gated behind sign-up.

**4. Trust.**
- Client logo strip: Sonae MC, Fidelidade, Fosun, E-Redes, ACA, Fundação da Juventude, Hospital da Luz Learning Health.
- Named testimonials with photos from two client firms.
- An "Awarded Deep Tech" block, and a claim of being featured in a European Commission report.
- A dedicated "EU co-funded projects" page naming Eureka Eurostars and the COMPETE2030 project code (https://owlplaces.com/eu-co-funded-projects, 2026-11-01).

**5. Analytics they expose.**
- Headline impact numbers: "85%" time saved in reporting, "up to 19%" increase in asset value, "up to 26%" lower operating cost. Method not shown.
- Per-asset passport and audit-ready reports for clients.

**6. Better than us / we do better.**
- They do better: they turn per-property risk (flood, heat, fire, energy) into a report a lender or insurer pays for, and show big-name client logos plus a clean EU-funding page.
- We do better: we address the individual buyer, for free and in their language. OWL has no consumer surface at all.

---

## 6. Imagem Urbana, Lda (Norte)

Grant row: Norte 2030 R&D, 308,305.73 € (2026–28), for on-site energy-certificate software.

**1. Status today: live, as an established energy-certification and inspection firm. The funded software is not public yet; the project runs to 2028.**
- Racius: incorporated 17/01/2008 with registered office in Espinho, CAE 71200, 68313 (property valuation) and 71120 (https://www.racius.com/imagem-urbana-lda/, 2026-11-01).
- Site footer "© Copyright 2026" (https://imagemurbana.pt/, 2026-11-01).

**2. Product.**
- First 10 s, phone: a large logo block and a photo of their dark timber-clad office building. A cookie consent panel (CookieScript, with unticked categories) covers most of the screen. Behind it are the headline "empresa de referência" in energy certification and a services button.
- First 10 s, desktop: the same, with links to Quem Somos, Serviços, Contactos and Área Reservada, plus city shortcut buttons (Aveiro, Porto, Braga, Lisboa, Espinho, Santa Maria da Feira, Outras).
- Main flow: choose a city page, then "Peça-nos orçamento gratuito" (quote request by contact). Other services: valuation, electrical and gas inspection, acoustic measurement, HVAC projects.
- Map: none, apart from a Google Maps link to the office.
- Data: explains the A+ to F scale and the legal basis (Decreto-Lei 118/2013). No data products.

**3. Money.** Owners, sellers and landlords pay per certificate and service. No public price on the pages read.

**4. Trust.** Accredited by IPAC (acoustic lab L0543) and qualified by DGEG as an energy-services company. No EU or Norte 2030 bar was seen on the home page (https://imagemurbana.pt/, 2026-11-01), and no reviews or team names.

**5. Analytics.** None exposed.

**6. Better than us / we do better.**
- They do better: they hold the regulated, on-site credential (energy class) that every Portuguese listing must show. That is ground truth for one of the main running-cost signals.
- We do better: a modern, multilingual, data-led reader experience. Their site is a local service brochure.

---

## 7. CPURB – Consultoria e Peritagens, Unip. Lda (Cávado)

Grant row: Norte 2020 vale I&DT, 15,000 € (2015), "Desenvolvimento Aplicação Avaliação de Imóveis".

**1. Status today: dormant on the web.**
- https://www.cpurb.com/ shows only a "coming soon" placeholder page, titled "Page - See You Soon", with a contact email and a phone number. Its only social link points to a Facebook page for "gesaval" (2026-11-01).
- Racius: registered office in Barcelos, share capital 5,000 €, CAE 71120. No incorporation date in the free view, and no dissolution or insolvency flag in the free view (https://www.racius.com/cpurb-consultoria-e-peritagens-unipessoal-lda/, 2026-11-01).
- cpurb.pt did not connect.

**2. Product.** None public. Searches for CPURB and "Gesaval" found no app, store page or press (2026-11-01). Eleven years after a 15,000 € valuation-app voucher, nothing can be seen.

**3. Money.** Presumably fee-based expert valuations (peritagens). Not verified.

**4. Trust.** None online.

**5. Analytics.** None.

**6. Better than us / we do better.**
- They do better: nothing visible. The firm is presumably a working, credentialed valuer offline (not verified).
- We do better: a product exists and is maintained in public.

---

## 8. Certifeito, Lda, peritosqualificados.pt (Porto)

Grant row: PRR vouchers, 2nd call, 30,000 € (2024).

**1. Status today: live and active.**
- Racius: registered office in Porto, share capital 10,000 €, main CAE 63120 (web portals) (https://www.racius.com/certifeito-lda/, 2026-11-01). No dissolution or insolvency flag in the free view.
- The latest blog post is dated 20/07/2026 (https://www.peritosqualificados.pt/pt/, 2026-11-01).

**2. Product: the clearest transactional flow in group B.**
- First 10 s, phone: the hero reads "Peça online o Certificado Energético" over a dark interior photo. Directly under it is a booking widget with property type (T0/T1 to T6, apartment or house), postcode and preferred date. A green price box reads "A partir de 123€", and the button says "Conhecer preço e disponibilidade". A cookie banner covers the bottom third, with only an "accept" button. A ProveSource social-proof toast shows a first name "pediu um Certificado recentemente".
- First 10 s, desktop: the same widget in the hero. The title tag claims "+ de 400 Peritos Qualificados".
- Main flow, three steps (stated on the home page): (1) property type, postcode, date and slot; (2) choose the expert and pay online; (3) download the certificate when notified. The expert-matching sits behind the widget, which we did not submit.
- A professional side: experts log in at https://profissionais.peritosqualificados.pt/, which is a login wall. The "Sobre nós" page describes it as the first platform to search for and book certificate experts online, with an instant final price (https://www.peritosqualificados.pt/pt/sobre-nos/).
- Map: none.
- Data: refers to the ADENE / SCE system and the energy class. No market data.

**3. Money.** The property owner pays online per certificate, from 123 €. The platform's cut from experts is not public.

**4. Trust.**
- A co-funding bar ("Barra de Cofinanciamento") and the "Recuperar Portugal" logo in the footer.
- A partner-logo strip on the home page.
- A blog post announcing a protocol with DECO PROteste Casa, which recommends the platform exclusively to its property advertisers (blog, 20/03/2024).
- Phone numbers for Porto and Lisbon, and a WhatsApp link.
- Authored blog posts.

**5. Analytics.** Public social-proof counters only: the "400+ experts" claim and live "recent request" toasts. No reports.

**6. Better than us / we do better.**
- They do better: a priced, bookable action in the first screen. A user knows the cost (from 123 €) and the next date before giving any personal data. A consumer-association partnership also lends third-party trust.
- We do better: depth of buyer information. Their "recent request" toasts are a pattern we should not copy (GDPR and honesty).

---

## 9. Frontfiles, Lda (Leiria)

Grant row: Centro 2020 FEDER, 226,892.25 € (2020–22), digital internationalisation of a content marketplace into Brazil, Argentina, Canada and Israel.

**1. Status today: live and relaunched, outside real estate.**
- Racius: incorporated 15/03/2018 in Ansião with share capital 150,000 €, main CAE 63910 (news agencies) (https://www.racius.com/frontfiles-lda/, 2026-11-01).
- frontfiles.com redirects to https://frontfiles.news/. Some tools are labelled "COMING SOON".
- LinkedIn has 293 followers, with the latest post dated 2026-03-17. The new tagline reads "verification and financial infrastructure journalism" (https://www.linkedin.com/company/frontfiles, public view, 2026-11-01).

**2. Product.**
- First 10 s, phone and desktop: an uppercase manifesto line about real journalism content and the people who make it. Next come Manifesto, Questions, Join us and Log in, then two columns, "For creators" and "For buyers", over a scrolling ticker of roles (photographers, fixers, drone pilots, translators). Below is a grid of stories, each tagged with place and date; many are from Brazil, plus Portugal, Argentina, Bolivia and Qatar.
- Main flow: creators upload and licence their work, and buyers search for free and licence or commission. A buyer can "negotiate prices before you commit".
- Map: none, only place tags on each story.
- Data: content provenance and transaction records.

**3. Money.** Commission on sales: "Only pay when you sell" for creators and "Pay only when you buy" for buyers. Rate not public.

**4. Trust.** Centro 2020, Portugal 2020 and EU FEDER logos still in the footer in 2026 (https://frontfiles.news/). A manifesto page. No client logos.

**5. Analytics.** Transaction records shown to users ("records you can review"). Nothing public.

**6. Better than us / we do better.**
- They do better: they named their target diaspora markets (Brazil, Israel) in the grant and visibly carried Brazilian supply through. That shows a funder the named markets were real.
- We do better: one clear paying side (sponsors) and a focused vertical. Frontfiles relaunched with parts still "coming soon" after a 504k € project.

---

## Patterns in group B

- **The map is missing everywhere in public.** None of the nine shows an interactive map on its public pages. Alfredo, OWL and probably RT GEO keep spatial views behind login or deliver them inside paid reports. Our free public choropleth is the exception in this group, not the norm. That supports keeping it as the hero asset and making it citable and embeddable.
- **The layers that matter to a buyer, as these players frame them:**
  - Alfredo: €/m² from listings plus time on market, comparables and nearby points of interest.
  - Pacific Front and Odynx: forward price-growth, demand and "hot-zone" scores, and renovation potential of vacant stock.
  - OWL: physical climate risk (flood, heat, wildfire) per address.
  - RT GEO: planning constraints (PDM zoning, REN, flood and fire risk).
  - Imagem Urbana and Certifeito: the energy class.
  - Official, buyer-useful candidates that fit prompt 51 §3.3 from these: flood-risk and wildfire-hazard zones (public national cartography), energy-certificate share by class per municipality (ADENE / SCE statistics), and vacant-dwelling share (INE Census 2021). All three are official data and can be shown at municipality level.
- **What they sell as analytics:**
  - Alfredo sells branded PDF market studies, a monthly emailed insights report and per-credit API calls.
  - OWL sells audit-ready per-asset reports with headline ROI percentages (85%, 19%, 26%).
  - Neither publishes a method or accuracy figure.
  - The renewal driver is a recurring report with the client's brand on it. That matches our planned monthly sponsor report: per-edition reach, showcase views and requests, branded and sent on a fixed date.
- **The index plus a media partner is the cheapest credibility.** Alfredo put its index in a personal-finance outlet as a recurring release. For us that means a monthly, numbered "Imóveis Portugal index" note per edition, with INE as the source, that the press and partners can quote.
- **Price and next step in the first screen convert.** Certifeito shows a price ("from 123 €"), a postcode field and a date in the hero. The others show only "Book a demo" or "Get started". For our Concierge: show what the reader gets, and when, before asking for anything.
- **The trust patterns are uniform.** EU and PRR bars sit in the footer, never in the hero. OWL has a dedicated "EU co-funded projects" page, which is a tidy way to meet publicity rules without clutter. B2B players put client logos right under the hero. Team visibility splits two ways: Odynx and Alfredo show founders, the consultancies show no one. We stay anonymous (hard rule 1), so our proof has to be partners with consent, sources and numbers.
- **Funded and invisible is common.** Of the nine, only Alfredo, OWL and Certifeito have a working product a stranger can see. Pacific Front has no site. Odynx is a landing page that fails to render. RT GEO's webSIG apps and Imagem Urbana's software are not public. CPURB is a placeholder 11 years after its grant. Frontfiles relaunched outside its original pitch. Our counter-position for applications: shipped, public and measurable.
- **Pivots move toward whoever pays:** OWL from sustainability scoring to climate-risk reporting for banks and insurers, and Alfredo from valuations to a full agent CRM. A tool that starts by informing someone ends up paid by an institution or professional. Our sponsor model (D6, flat fee, never per lead) is the guard-rail against drifting into a per-lead agent tool.

## Could not verify

- Pacific Front's website, product, app or LinkedIn page: none found. Its registry activity status is behind the Racius paywall.
- Odynx's rendered front end: the headless browser showed an error and a Cloudflare Turnstile script loaded. Content was read from server HTML only, with no retry around the check.
- Anything behind logins:
  - Alfredo dashboard (maps and report content),
  - app.owlplaces.com,
  - profissionais.peritosqualificados.pt (expert fees and commission),
  - Imagem Urbana "Área Reservada".
- Alfredo's Racius entry (slug not found), app-store pages and LinkedIn page (404 on the guessed slug).
- Activity status ("Estado de Atividade") for every company is a paid Racius field. We only confirmed that the free pages show no dissolution or insolvency marker.
- The transparencia.gov.pt and doutorfinancas.pt hosts were blocked for WebFetch in this session. The Doutor Finanças article was read through curl. The grant records were taken from comparables.md and not re-checked at source.
- CPURB's link to "gesaval" (a Facebook handle on the placeholder page) is unconfirmed.
- OWL's impact percentages and "90+ clients", and Alfredo's "40,000 professionals", are self-declared.
