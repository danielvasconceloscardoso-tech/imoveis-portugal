# Prompt 51 §1: group A, "closest to us": product study

Checked 2026-11-01. Method: public pages only, fetched with curl and rendered with Playwright at 390x844 and 1440x900. Screenshots were looked at, not kept in the repo. DNS was checked with dns.google (DoH), and registry entries were read on Racius (free page). Nothing was submitted, no account was created, and no company was contacted. Personal names are left out on purpose.

Note on Racius: the free page shows the legal form, the date the company was set up, its purpose and its CAE codes. The "Estado de Atividade" (activity status) field is paywalled. "No flag" below means the free page shows no dissolution, insolvency or closure notice. It does not mean the status was confirmed.

---

## 1. Economat2Biz, Unip. Lda: "Portugal Concierge" (Oeiras)

**Status: dormant, or the project was never delivered.** No public product found.
- Racius: set up 30-03-2019, capital €100. Main CAE 47910 is online retail. The listed purpose covers office supplies, events and real-estate mediation. No flag. https://www.racius.com/economat2biz-unipessoal-lda/ (2026-11-01)
- economat2biz.pt, economat2biz.com and portugalconcierge.pt return NXDOMAIN, so these domains do not exist (dns.google, 2026-11-01).
- The grant record shows €30,000 approved and €0 paid at 30-10-2026 (comparables.md row 5). This fits a project that was never delivered.
- **The brand name is in use by someone else.** portugalconcierge.com is live (© 2026). It is a US-facing "Portuguese citizenship by descent" service. Nothing on the site links it to Economat2Biz: no NIF, no Lda and no Oeiras address. Its terms-of-service page is still placeholder lorem ipsum. https://portugalconcierge.com/, https://portugalconcierge.com/terms-of-service/ (2026-11-01)

**Product.** No product exists for Economat2Biz. For reference only, portugalconcierge.com looks like this:
- **Phone:** brand logo with a key; a founder video thumbnail; a row of face avatars with "Praised by 300+ delighted families"; the headline "Your Portuguese Citizenship, GUARANTEED"; one CTA, an eligibility quiz said to take "less than 60 seconds"; a sticky "Book a Meeting" button.
- **Desktop:** the same, with a three-item nav.
- **Flow:** a Typeform quiz routes visitors to "congratulations-parent / -grandparent / -marriage" or "not-eligible" pages. Next steps are a Calendly booking and a Stripe payment.
- **Map:** none.

**Money.** The flagship asset has no public pricing. portugalconcierge.com charges the client a flat fee: "$995" due today out of "$5,000", with the remainder due at application submission. https://portugalconcierge.com/ (2026-11-01)

**Trust.** Economat2Biz shows nothing, because nothing is online. portugalconcierge.com shows first-name testimonials with US states, "100% Success Rate" and a founder video. It shows no EU or press logos.

**Analytics exposed.** None.

**They do better.** Nothing is live. The .com namesake proves that a single quiz plus a booking link converts diaspora interest into a paid call.
**We do better.** We exist and ship. Our Concierge already qualifies a request without promising an outcome. "Guaranteed" claims of that kind would break our editorial policy.

---

## 2. H2Experience, Lda: "House Hunting Experience" / H2E (Matosinhos)

**Status: live, rebranded as H2E.**
- https://h2eportugal.com/: the footer reads "H2Experience, LDA – AMI 21578". Site uploads are dated 2025-03 (PRR banner), 2025-12 (logo), 2026-01 (privacy and terms) and 2026-05 (project sheet). (2026-11-01)
- Racius: set up 03-08-2022, capital €5,000. CAE 68311 (mediation), 68100 and 68312. No flag. https://www.racius.com/h2experience-lda/ (2026-11-01)
- The project sheet confirms the PRR grant of €30,000. It says the deliverables were "backoffice", "módulo/aplicação comprador" and a website. https://h2eportugal.com/wp-content/uploads/2026/05/Ficha-do-Projeto.pdf (2026-11-01)

**Product.**
- **Phone (390):** full-bleed night photo of Porto rooftops; serif title "House Hunting Experience"; the tagline "contexto, prioridades e decisões seguras"; two outline buttons, "Quero vender" and "Quero comprar". Above them sit the logo, an "Imóveis" button, UK and PT flags and a hamburger menu. A reCAPTCHA badge shows.
- **Desktop:** the same hero, with a six-item nav (Home, Comprar, Vender, House Hunting, Sobre Nós, Contactos).
- **Flow (Comprar page):**
  1. "Crie a sua conta".
  2. "Receba correspondências" (matches).
  3. "Avance ao seu ritmo".
  4. An ongoing relationship.

  The buyer side is split between "Off-market" (account-gated) and "Mercado tradicional". House Hunting runs: validated brief (lifestyle, criteria, timing), then active search "Dentro e fora dos portais", then visits, offers and closing.
- **Lifestyle product:** "Meet Porto Lifestyle Investment", which combines property visits with local experiences in the same area.
- **Matching claim:** "algoritmos avançados de matching" on location preferences and investment or lifestyle fit. https://h2eportugal.com/sobre-nos/ (2026-11-01)
- **App:** https://app.h2eportugal.com/ redirects to /imoveis/tradicionais. It rendered as a blank shell at both viewports after 4 s. The HTML references an API on a raw IP over plain HTTP, port 3909, which a browser would likely block as mixed content. Listings were therefore **not verified**.
- **Map:** none on the public pages; no map library loaded.
- **Data claimed:** off-market inventory and portal monitoring. No data sources are named.

**Money.**
- Buyer and seller pay the usual mediation commission (AMI licence, CAE 68311). Rates are not public.
- Other offers are "H2E Invest Club" (membership of an investor club) and "Real Estate Portfolio Management".
- A partner form asks agents, owners and developers to refer buyers or properties (shared-commission model).
- No prices are public. https://h2eportugal.com/sobre-nos/ (2026-11-01)

**Trust.** The PRR / NextGenerationEU banner is in the footer and the "Ficha do Projeto" PDF is linked. The AMI number is shown, along with the complaints-book link and Instagram, LinkedIn and Facebook. No reviews, no partner logos and no team page with people were found. The site credits its developer.

**Analytics exposed.** None to users. "Leitura comparada de mercado" is promised but not shown.

**They do better.** They package lifestyle matching as a named product ("House Hunting" plus "Meet Porto Lifestyle" visit-and-experience trips). They run a registered-buyer loop that keeps sending matches over time.
**We do better.** Our map, index and simulators are public and work without an account, and our request flow loads. Their app shell did not render, and their "algorithms" are only claimed in prose.

---

## 3. Biscayne Relocations, Unip. Lda: "Global International Relocation" (Sintra)

**Status: live and established.**
- https://global.pt/en/: the footer reads "© Biscayne Relocations, Unipessoal Lda". Blog posts are dated 2025-10-15, 2026-04-15 and 2026-06-24. (2026-11-01)
- Racius: set up 06-02-2008, capital €2,000,000. Main CAE is removals; the listed purpose also includes real-estate mediation, immigration and relocation. No flag. https://www.racius.com/biscayne-relocations-unipessoal-lda/ (2026-11-01)
- biscaynerelocations.com is NXDOMAIN; the brand lives only on global.pt.

**Product.**
- **Phone:** logo; EN/PT pill and menu; blurred office-photo hero with "Moving abroad has never been easier" and a "Know More" button. A cookie banner covers the lower half until the visitor answers.
- **Desktop:** the same hero, with nav: About Us, Services, Blog, Quality Certifications, Clients, Global Foundation, Proposal Request, Contacts.
- **Main flow:** "Proposal Request" (quote form). A self-serve **volume calculator** lets visitors count furniture item by item (https://vcalculator.globalmobility.pt/, PT/EN). Shipment tracking runs by reference number (https://globalmobility.pt/tracking/searchnumber). An AI chatbot widget (third-party) loads on every page.
- **Relocation service:** orientation visit, home search ("buying or renting… advise you on the market"), short-term accommodation, school search, immigration and 24/7 support. https://global.pt/en/immigration-relocation/ (2026-11-01)
- **Map:** none.
- **Data claimed:** "more than 15000 expatriates" supported, plus animated counters for countries served, dissatisfaction rate, team nationalities (18) and the share of women in management. ISO 9001/14001 and FIDI FAIM Plus are claimed.

**Money.** Clients pay per service: corporate HR for expatriates, diplomats and military, and private families. Quotes are on request; only the premium-line tariff (€0.11–0.16/min) is public. Grants paid for the export push to 19 markets and for e-commerce channels.

**Trust.**
- "Barra 2030" (Lisboa 2030) and "Barra PRR" logos sit in the footer, each linked to its project sheet PDF: Ficha-Projeto-PRR.pdf and Fichas-Projeto-2030-InoInt.pdf.
- "Quality Certifications" and "Clients" (testimonials slider) pages exist. Industry memberships (FIDI, EURA, OMNI) appear in third-party directories.
- Team is not visible by person.

**Analytics exposed.** Headline counters only, plus a client-facing shipment tracker. There are no market reports.

**They do better.**
- Small self-serve tools that answer the first practical question: volume calculator and tracking.
- Funding bars and project sheets linked openly.
- A plain "dissatisfaction rate" stat as social proof.

**We do better.** Housing is our core: map, price index and buyer request. For them, home search is one bullet in a relocation menu with no market data at all.

---

## 4. Big Welcome, Lda (Almada)

**Status: live**, as a local agency.
- https://www.bigwelcome.pt/: footer "Big Welcome, Lda / AMI 18022"; 63 listings in the search on 2026-11-01. https://www.bigwelcome.pt/imoveis
- Racius: set up 14-02-2017, formerly "GUEST RIDE, LDA". Main CAE is 49320 (taxis); the purpose also covers tourist transfers, short-stay accommodation and real-estate mediation. No flag. https://www.racius.com/big-welcome-lda/ (2026-11-01)

**Product.**
- **Desktop:** centred logo with the slogan "Your home like our home"; hamburger; language picker (PT/EN/ES); "Pesquisa Livre" search; compare counter; chat bubble. Below sits a 4-tile mosaic of new developments in the south bank of Lisbon (Caparica Hills, River Living in Barreiro, Moinho Novo in Oeiras, Mata das Praias). A cookie banner covers the bottom.
- **Phone:** an AI-assistant bubble pops up first ("sou o assistente de IA"), then the logo, search and the first development image. The cookie banner covers about half the screen.
- **Flow:** classic portal-template search by district, municipality, parish, type, condition, m² and €, with sort, favourites and compare. "Procuro imóvel" is a long buyer-brief form. "Avaliação do imóvel" offers sellers a free "Estudo de Mercado". There is also a newsletter. https://www.bigwelcome.pt/procuro-imovel (2026-11-01)
- **Map:** the Leaflet library loads on the listings page. The base map and layers were not inspected in detail.
- **Data:** own listings only. The site runs on a vendor CRM/website template (eGO Real Estate).
- **Foreign-investor angle (from the grant):** only EN/ES language versions are visible; there is no dedicated investor content.

**Money.** Commission on sale and rental (mediation). There is no public rate. The 2021 grant was a local hiring subsidy (FSE, CO3SO Emprego).

**Trust.** Three named-client testimonials on the home page. AMI number, complaints book, ADR (alternative dispute resolution) and GDPR data-management page. No EU funds bar on the home page. No team page with people seen.

**Analytics exposed.** A seller valuation ("estimativa de valor") is delivered as a report on request. Nothing is public.

**They do better.**
- New-build developments are the first thing on screen.
- An AI assistant greets the visitor on phone.
- A seller valuation hook captures the other side of the market.

**We do better.** We are diaspora-specific in six editions with market data. They are a generic local-agency template whose "foreign investors" positioning from the grant is invisible on the site.

---

## 5. APR, Associação Portuguesa do Turismo Residencial e Resorts: "Living in Portugal"

**Status: the association is live; the "Living in Portugal" campaign brand is dormant.**
- https://www.portugalresidential.com/: the association site (© "APR – Associação Portuguesa de Resorts"). Its latest home-page items are an event partnership posted 16-09-2025 and a Nova SBE study dated 06-12-2024. (2026-11-01)
- The campaign survives only as the Instagram handle "aprlivinginportugal", linked from the site footer. livinginportugal.eu redirects to a Facebook page, which was not opened (login wall).
- livinginportugal.pt is an unrelated company ("Livingin Investment", Wix, bot check). livinginportugal.com resolves but the connection was reset. apr.pt belongs to an unrelated IT firm. (2026-11-01)

**Product.**
- **Pages:** Sobre nós, Associados, Atividades (influence, promotion, knowledge), News & Blog, a newsletter signup and "Torne-se membro".
- **Members page:** about 24 resort or developer members and 5 institutional members (law firms, architects, a property manager), with a type filter. https://www.portugalresidential.com/associados/ (2026-11-01)
- **Missing:** no search, no listings, no map. B2C traffic is routed to members. The first-screen visuals were not rendered; the check was text-only.

**Money.** Members pay dues, which are not public. Promotion campaigns are co-funded (the COMPETE collective internationalisation grant of €427k, 2016–18).

**Trust.** Member logos and names, and an event partnership. The research partnership (Nova SBE with Confidencial Imobiliário) is cited. No EU bar was seen on the current site.

**Analytics exposed.** A macro-impact study of residential tourism 2014–2023, published as a news item. It is not a live dashboard.

**They do better.** They own the resort-developer relationships (the 24 members are natural sponsors). They lend authority through an academic study with a named data partner.

**We do better.** A buyer-facing product that lasts beyond the campaign. Their campaign site did not outlive the grant, and only a social handle remains.

---

## 6. Fundação AEP: "Rede Global da Diáspora"

**Status: live but login-walled.** The site footer reads "© 2019 - 2026". https://redeglobal.pt/ (2026-11-01)

**Product.**
- **Desktop:** nav (Pessoas & Comunidades, Empresas & Negócios, Rede Global, Parceiros, Eventos, Registar, Entrar); a hero video of a family reunion; the headline "maior rede colaborativa da diáspora portuguesa"; a "REGISTE-SE" button.
- **Phone:** two stacked cookie banners (a CMP plus a second notice) cover most of the first screen. Only "ENTRAR / REGISTE-SE" is visible.
- **Claims:** present in 133 countries, with "milhares" (thousands) of diaspora companies. The flow is register, then a profile, then search people, companies, associations and opportunities.
- **Version 2.0 ("pesquisa e mapeamento empresarial"):** the "Portal de Negócios" and "Diáspora Business Intelligence" launched in Sep 2022. They are free for registered companies and investors; the press cited 10,022 companies in 154 countries. https://www.forbespt.com/rede-global-da-diaspora-lanca-portal-de-negocios-para-acelerar-negocios-a-escala-global (published 2022-09-12; checked 2026-11-01)
- **Map and BI:** behind login, **not verified (login wall)**. Public entity pages show "Faça login para ver o vídeo do evento".

**Money.** Free to users and funded by grants: three COMPETE rounds, €0.7M, €0.5M and €0.77M. There is no visible sponsorship or paid tier.

**Trust.** Logos for Comunidades Portuguesas, AICEP, AEP, the chamber of commerce and Lusa (media partner). Two project-sheet PDFs are linked in the header (the 2018–20 and 2021–22 projects). The 2025 COMPETE 2030 project sheet was not found on the site.

**Analytics exposed.** Only the country count (133). The BI tool is members-only.

**They do better.** Institutional distribution (AICEP, consulates, chambers, Lusa) and a diaspora company map at scale. Event roadshows run in diaspora cities.

**We do better.** Open, useful pages without a login, plus one clear job (buying a home). Their platform's value sits behind registration, and the phone first screen is mostly cookie banners.

---

## 7. NERBE/AEBAL (with CEVAL): "SAVEURS du PORTUGAL" (FR, LU, CH)

**Status: live, mid-campaign.**
- https://saveursduportugal.pt/ (© 2026). It names NERBE/AEBAL and CEVAL as promoters and links its "Ficha de Operação" PDF (uploaded 2026-06).
- The events page lists: Luxembourg City 23–24 Feb 2026, Strasbourg 29–30 Jun 2026, Geneva 23–24 Nov 2026, Paris 26 Nov 2026. https://saveursduportugal.pt/iniciativas/ (2026-11-01)
- The .fr domain is parked for sale (https://saveursduportugal.fr/, 2026-11-01).

**Product.**
- A campaign site with five sections: O Projeto, Iniciativas, Concurso, Mapeamento, Contactos.
- Activities are product shows, chef and sommelier workshops, a gastronomic e-book and a cooking contest.
- "Mapeamento de compradores" promises a map of wholesalers, retailers and restaurants in FR, LU and CH. On 2026-11-01 the page showed only its intro, with no entries, markers or map library loaded. https://saveursduportugal.pt/mapeamento-de-compradores/

**Money.** Grant-funded (€379k); free for participating SMEs. No sponsorship or pricing is shown.

**Trust.** NERBE and CEVAL logos and the project sheet. Diaspora press covered each stop: Bom Dia (LU), LusoJornal (FR), Gazeta Lusófona (CH), Agência Incomparáveis. https://bomdia.lu/saveurs-du-portugal-alto-minho-e-baixo-alentejo-visitaram-estrasburgo/ (2026-11-01)

**Analytics exposed.** None.

**They do better.** Physical events in our exact markets (Geneva and Paris in the week before our 1 Dec launch), plus earned coverage in the diaspora press of LU, FR and CH.

**We do better.** A permanent product. Their "buyer map" is an empty promise today, while our map is populated and works on phone.

---

## 8. Fino Propriedades, Sociedade de Mediação Imobiliária, Lda (Algarve)

**Status: live.**
- It operates **Fine & Country Algarve**. The legal notice on https://www.fineandcountry.pt/en/ reads "Fino Propriedades Sociedade de Mediação Imobiliária, Lda.", with company no. 510733832 and AMI 9767. (2026-11-01)
- Racius: head office in Carvoeiro (Lagoa). CAE 68311, 68200, 68321. No flag. https://www.racius.com/fino-propriedades-sociedade-de-mediacao-imobiliaria-lda/ (2026-11-01)

**Product.**
- **Desktop:** a utility bar (country switcher across 19 countries in the network, PT/EN/FR/DE, site search, "MyF&C" account); a serif headline "Exceptional homes, beautifully presented."; a country plus area/postcode search with BUY and RENT buttons; a "Find yourself in Portugal" video band; a cookie modal in the middle of the screen.
- **Phone:** the same headline, search and "VALUE MY PROPERTY" button.
- **Lifestyle navigation:** Sea view & Coastal, Golf living, Modern, Chateaux & Vineyards, Land & New homes, Rural.
- **Services:** buying agent service, discreet marketing, property management, valuation.
- **Content:** "Insights" with guides, a magazine ("Exclusive Home Worldwide") and a blog.
- **Map:** no map library on the home page. The search results URL tried returned the site's error page, so the results map was **not verified**.

**Money.** Sale and letting commission, property management and buying-agent fees. No rates are public. Sellers are the main payer, judging by the "Value my property" CTA on every page.

**Trust.** An awards page, the international network brand, and the media centre. A June 2026 article in The Portugal News presents the agency as award-winning (likely sponsored). No Algarve 2030 / EU funds bar or project sheet was found on the home page.

**Analytics exposed.** None public. MyF&C accounts are for saved searches.

**They do better.**
- Lifestyle categories as first-level navigation, which is a cheap version of H2E-style matching.
- A 4-language site.
- A global network as proof of trust.

**We do better.** Neutral, data-led and multi-edition for the diaspora, with an index and simulators. They are one brokerage selling its own stock to a mostly non-Portuguese clientele.

---

## 9. Lithium Investments, Lda: "QLIQ – Real Estate" (Óbidos, Centro)

**Status: website gone; the company has no flag on the free registry page.**
- qliq.pt and www.qliq.pt return **NXDOMAIN at the .pt registry**, so the domain no longer exists (dns.google, 2026-11-01).
- Search engines still index it as "QLIQ - Real Estate Solutions", with agency-style listings (an Alentejo village house, a flat in Vila Franca de Xira, land in Peniche) and a FR page. https://www.qliq.pt/fr/info/lit-studio_38/ (index only, not reachable)
- Racius: set up 18-03-2014, seat in the Óbidos Technology Park. Main CAE is real-estate mediation; the purpose is very broad (architecture, tourism, restaurants, transport). No flag. https://www.racius.com/lithium-investments-lda/ (2026-11-01)

**Product.**
- **Funded idea (2019):** a do-it-yourself sell or rent platform without agencies, with all transaction services in one place.
- **Last indexed form:** an ordinary agency listing site. The funded idea appears to have drifted back to plain mediation, then gone offline.
- **First screen, flow and map:** **not verified (site down)**.

**Money.** Per the indexed form, agency commission. The planned FSBO (for-sale-by-owner) service fees were never seen live.

**Trust.** Not verifiable.

**Analytics exposed.** Not verifiable.

**They do better.** Nothing observable today.
**We do better.** We don't fight agencies. We work with one licensed partner (D14), which avoids the cold-start problem that FSBO platforms usually die of. Our brand and domains are kept alive outside any one grant.

---

## Patterns in group A

- **The survivors are service businesses with a website, not platforms.** That covers H2E, Global, Big Welcome and Fine & Country. The "platform" grants (Portugal Concierge, QLIQ, the Living in Portugal campaign) left nothing live: a domain that never existed, a dead domain, a social handle.
- **Grant-built "matching" and "BI" end up behind a login or as prose.** H2E's app shell was blank. Rede Global's map and BI need registration. Saveurs' buyer map is empty. None shows matching or data publicly without sign-up. Public, no-login usefulness is our clearest difference.
- **The paying side is always the transaction (commission) or the grant, never a sponsor.** The association models (APR dues, AEP, NERBE) show that developers and resorts will pay for promotion as a group. APR's ~24 resort and developer members are a ready list of potential sponsors and showcase clients.
- **Small self-serve tools carry the first visit:** Global's volume calculator and tracker, Big Welcome's valuation request, the .com namesake's 60-second eligibility quiz. Each offers one question and one instant answer before any form.
- **AI chat widgets are now standard on agency sites** (Big Welcome, Global). They are generic greeters with no qualified summary. Our Concierge's structured summary is the better form of the same idea.
- **Trust is shown with the EU funds bar plus a linked project sheet** (H2E, Global, Rede Global, Saveurs), the AMI licence number, certifications and counters (Global's "15000 expatriates", Rede Global's "133 países"). Visible people are rare in this group.
- **Lifestyle is the organising idea for foreign buyers:** H2E's lifestyle matching and "visit plus experience" trips, and Fine & Country's Sea view / Golf / Vineyards / Rural categories. This supports lifestyle filters on our map.
- **Diaspora distribution runs through events and diaspora press, not ads.** Saveurs uses Bom Dia, LusoJornal and Gazeta Lusófona, with stops in Luxembourg, Strasbourg, Geneva and Paris. Rede Global uses roadshows plus AICEP and Lusa. Phone first screens in this group are often half-covered by cookie banners (Big Welcome, Global, Rede Global, Fine & Country), which our cookie-free analytics avoids.

## Could not verify

- **Login walls and bot checks:**
  - The LinkedIn company pages of all nine were not opened.
  - Rede Global's business map and BI, and the Facebook page behind livinginportugal.eu, were not opened.
  - livinginportugal.pt is behind a bot check.
- **Did not render or was not reachable:**
  - The H2E app's listings: blank shell, API on plain HTTP.
  - Fine & Country's results map: wrong URL guessed.
  - Any qliq.pt page: NXDOMAIN.
  - livinginportugal.com: connection reset.
- **Ownership and registry:**
  - Whether portugalconcierge.com has any tie to Economat2Biz (no evidence either way).
  - The activity status of all registry entries (the Racius field is paywalled). eInforma search returned no usable result.
- **Data not available:**
  - Big Welcome's map base and layers were not inspected.
  - No commission rates or membership fees are public for any of the nine.
- **Unconfirmed claims:** the 19-market and 133-country figures are the companies' own.
