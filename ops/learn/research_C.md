# Prompt 51 · Research C: lead and matching engines, and others

Checked 2026-11-01. I read each site in a headless browser at 390x844 (phone) and 1440x900 (desktop) and also pulled the raw HTML with curl. I submitted no forms, created no accounts, sent no messages and typed nothing into any chatbot. On Zome I clicked through the first two answers of the "Procura Assistida" picker to see its questions. I typed nothing and sent nothing.

Every quote is under 15 words, and no individual is named. Registry lines come from two free views:
- Racius company pages. Its "Estado de Atividade" field is behind a paid report, so I only read constitution date, CAE and capital.
- eInforma company labels. These show the age of the company, the years with filed accounts, and a dated list of "últimas alterações". The details of each change are paywalled.

Grant amounts come from `ops/funding/comparables.md` unless a project sheet on the company's own site says otherwise.

What we have, for the "we do better" lines:
- **Concierge** (`site/src/lib/flows.ts`, `site/src/scripts/flow.ts`). One question per screen, in this order:
  - country
  - budget band
  - purpose
  - real slots in the reader's own timezone
  - financing
  - NIF yes or no
  - place
  - language
  - contact window
  - contact
  - consent, one unticked box that names the recipient
- Before sending, the reader sees a review list in which every answer links back to its step.
- **Showcase request** (`site/src/scripts/request.ts`). The steps are intent, unit (block and typology), when, you, more (budget, own funds or mortgage, horizon) and consent. An "advisor view" shows the qualified summary exactly as the partner's advisor receives it, with the consent text and a timestamp.
- No login, six editions, one licensed partner, flat sponsorship (D6).

---

## 1. Hubzome, Lda (Braga): "Hubzome SmartLeads" = Zome

Grant: PRR C05-i14.01 "IA nas empresas", 300,000 € on 407,500 € eligible (2025).

**1. Status today: live. Hubzome is the legal entity behind the Zome brand, a national mediation network.**
- hubzome.pt and hubzome.com both redirect to https://www.zome.pt/pt (curl, 2026-11-01).
- The zome.pt privacy policy names HUBZome, Lda., Braga, as the data controller (https://www.zome.pt/en/privacy-policy, via search 2026-11-01).
- The footer copyright still reads "© Zome 2025" (page payload, https://www.zome.pt/pt, 2026-11-01). The listings are fresh: "NOVIDADE" cards with IDs around ZMPT5946xx.
- Racius: constituted 18/04/2019, CAE 70220. The stated activity is consultancy, franchise and brand management, and real-estate mediation. Capital is 50,000 € (https://www.racius.com/hubzome-lda/).
- eInforma: accounts filed for 2025, 2024 and 2023. The latest change is dated 2026-07-20 (https://www.einforma.pt/servlet/app/portal/ENTP/prod/ETIQUETA_EMPRESA/nif/515332070). No dissolution or insolvency flag is visible in either free view.
- The SmartLeads product itself is not visible on the public site, so it is probably internal, in the consultants' tools (see Zomeit, §6).

**2. Product.**
- First 10 s, desktop: a full-bleed photo of a laughing family under the headline "Olá!", followed by "Onde fica a casa dos teus sonhos?". Below it:
  - a location field;
  - four selects (Comprar, Tipo, Quartos, Intervalo preços) and a search button;
  - two buttons, a white "Procura com ChatGPT" and a pink "Procura Assistida".
- Top bar on desktop: "Trabalhar na Zome", "Abrir uma Zome", ES and EN flags and a menu. Recruiting consultants and franchisees comes before buying.
- First 10 s, phone: the same headline, the location field and four stacked selects. A cookie banner covers the lower half, and both AI buttons sit below the fold.
- Main flows:
  - Classic search, plus "Procurar no mapa". The map page loads maps.googleapis.com, so it is a Google Maps base map. I did not verify the layers.
  - "Procura com ChatGPT": a natural-language search box with the placeholder "Write what you are looking for, in natural language". Not used.
  - "Procura Assistida": a step picker. First "O que procuras?" (Apartamento / Moradia / Prédio / Outros), then "Que tipologia?" (T0–T3+). I did not verify where it ends.
  - "Vender a minha casa", branded "Zome GO!": the seller enters the property and gets a valuation. It claims a comparison against "mais de 2,5 milhões de imóveis" plus sales history, described with "Big Data, Inteligência Artificial" (https://www.zome.pt/pt/quanto-vale-a-minha-casa).
  - "Imóvel Verificado by Zome": a technical inspection report on the condition of a property, which earns a seal. Consultants must be certified by ICS/FEUP to do it (https://www.zome.pt/pt/verificado-by-zome).
  - New developments: a "Construção nova em destaque" block shows live unit counts, for example "17 Disponíveis · 2 Reservados".
- The page payload also holds the wording of a mortgage simulator, with questions such as "Will you use financing?" and "Simulate financing".
- Data claimed: the 2.5 million property comparison base. Its source is not named.

**3. Money.** A classic mediation model. The seller pays commission to the agency, the agency runs as a franchise of hubs ("Abrir uma Zome"), and consultants are recruited onto the network. No prices are public.

**4. Trust.**
- A PRR logo in the footer links to a project sheet on a SharePoint link that needs login (401, not verified).
- The awards line "Prémios do Imobiliário BPI/Expresso" appears in the payload.
- Client testimonials in PT, EN and ES.
- A list of 20+ hubs and an individual page for each consultant (team very visible).
- "Revista NOTES" magazine.
- FEUP/ICS certification behind the Verificado seal.

**5. Analytics they expose.**
- For sellers: the Zome GO! valuation and market positioning, and the Verificado report.
- For buyers: no dashboard.
- Developer pages show available, reserved and sold counts.
- Any lead scores or SmartLeads output are internal (not verified).

**6. Better than us:** one search box offers three ways in (filters, natural language, guided picker), and the Verificado seal gives property-level proof from a named university partner.
**We do better:** our request ends in a structured, consented summary for one named licensed recipient, in the reader's language and timezone. Zome's buyer entry points are search tools, not a qualified hand-off, and the site speaks only to residents.

---

## 2. Omrei, Lda (Braga): "IA Off Market"

Grant: PRR C05-i14.01, 192,375 € (2026).

**1. Status today: live, but the whole product is behind a login.**
- https://www.omrei.com/ serves a WordPress gate. The WP REST page list shows the app was mostly built in May–June 2024. Two pages are newer: "dashboard", modified 2026-06-11, and "conta", modified 2026-03-24 (https://www.omrei.com/wp-json/wp/v2/pages, 2026-11-01).
- Racius: constituted 28/02/2024. CAE 68311 (mediation), plus 68100, 68200 and 68312. Capital 7,500 € (https://www.racius.com/omrei-lda/).
- eInforma: accounts filed for 2025 and 2024. The latest change is dated 2026-07-13 (NIF 518045153). No dissolution or insolvency flag in the free views.
- Third-party profiles on JamesEdition list OMREI as a premium, investment-grade and off-market agency in Braga (search, 2026-11-01).

**2. Product.**
- First 10 s, desktop: a blank split screen, "Sou profissional" on the left and "Sou cliente" on a grey right half. There is a tiny "or." logo bottom left and a PT flag. Nothing explains the product above the fold, and a black cookie modal sits in the middle.
- First 10 s, phone: the same two words stacked, with the cookie modal covering most of the screen.
- Main flow, inferred from page slugs, not seen:
  - professional registration, then admission validation (pending, approved, refused or suspended), then an agreement ("acordo");
  - then "meus imóveis" (new listing), "meus clientes" (new client), "off-market", "guardados", "negócio" with "nova visita" and "nova proposta" (direct or complete), "meus links" and a dashboard.
- Clients register separately with name, email and phone.
- The meta description calls it a network for professionals with "oportunidades exclusivas fora do mercado imobiliário tradicional".
- Map and data: not verified (login wall).

**3. Money.** Professionals pay a subscription. The registration modal shows "Grátis até 31/12/2026", then 12 months at 600 € + IVA, with a discount-code field and no card asked at sign-up (https://www.omrei.com/, 2026-11-01). Omrei is also a mediation company, so commission on deals is likely (CAE 68311). That is not stated on the site.

**4. Trust.** The public page shows no logos, no PRR bar (not visible on the gate), no team, no reviews and no press. Trust is earned through admission: professionals are vetted before they get in.

**5. Analytics they expose.** A "dashboard" page exists behind login. Not verified (login wall).

**6. Better than us:** it vets the professional side (admission, agreement) and keeps the clients and properties of each professional in a private workspace.
**We do better:** a reader understands what we offer in 10 seconds without an account. Omrei's first screen explains nothing to a buyer.

---

## 3. Domínio Urbano, Lda (Leiria): "Homizy"

Grant: PRR Vouchers para Startups, 30,000 €. The project sheet on homizy.pt states 89,482 € eligible cost, approval on 28/07/2025, and a run from 01/04/2025 to 20/12/2025 (https://homizy.pt/wp-content/uploads/2026/05/Ficha-Projeto_Homie.pdf).

**1. Status today: live, early stage, recently rebranded from "Homie".**
- https://homizy.pt/ has a "Homizy © 2026" footer. The blog's last post is dated 2026-08-24 (https://homizy.pt/wp-json/wp/v2/posts).
- The LinkedIn company page (public view) is still titled "Homie", with 42 followers and 1 employee (https://www.linkedin.com/company/homizy-pt, 2026-11-01).
- Racius: constituted 14/11/2023. CAE 62090 (IT), plus 47910, 68312 (property sourcing) and 73110. Capital 1,000 € (https://www.racius.com/dominio-urbano-lda/). The eInforma label timed out.
- homizy.com is an unrelated Milan co-living company.

**2. Product.**
- First 10 s, desktop: a purple bar and the headline "0% Comissões, 100% Confiança. 1000% Simples." beside a stock family photo. One gradient button, "Procurar imóveis".
- First 10 s, phone: the same headline and button, then a cookie card.
- Main flow: "Procurar imóveis" opens /chat. The AI assistant "Izzy" greets the visitor, and a strip of "Imóveis para ti" cards follows (type, typology, price). Not engaged.
- For sellers: "Anunciar imóvel" is a free listing, with paid boosts ("Destaca conforme o teu bolso").
- Three property seals:
  - Check: registered, legal, owner validated;
  - Smart: price checked against the market;
  - Go: documents ready for the CPCV.
- "Sign & Seal": a digital CPCV and signature ("Sign"), and escrow up to the deed ("Seal", marked "Brevemente").
- Partner services: legal, valuation, energy certificate, AI virtual staging, mortgage comparison, escrow (https://homizy.pt/como-funciona/).
- Data claimed: documents collected "através de integrações" with the Autoridade Tributária, and price checks with "ferramentas profissionais de comparação". No map seen.

**3. Money.** Sellers and buyers pay for modules: paid featured listings, seals, legal packs, Sign & Seal, and partner services. No commission. No prices are public on the pages I checked.

**4. Trust.**
- The footer bar carries PRR, República Portuguesa and EU NextGenerationEU logos, plus a link to the project sheet.
- A complaints book, a "Fazer um Elogio" link and a public phone number and service emails.
- No team, no reviews and no partner names.

**5. Analytics they expose.** None public. The seals are the trust signal, and there are no listing statistics.

**6. Better than us:** the property-side proof (seals) is plain to read, and every step to the deed is laid out as a module with a clear name.
**We do better:** a known brand with six country editions and a licensed professional on the other end. Homizy's do-it-yourself, no-agent model leaves the buyer alone, and for a buyer abroad that is the hardest part.

---

## 4. Upgraide Artificial Intelligence, Lda (Porto): "Atlas"

Grant: PRR Vouchers para Startups, 30,000 €. Its own project page states 36,550 € eligible cost, July–December 2025. A second PRR grant of 12,000 € on 24,000 € is for its own internationalisation, November 2025 to June 2026 (https://upgraide.ai/project, 2026-11-01).

**1. Status today: the company is live as a general AI consultancy. "Atlas" is not visible as a product.**
- https://upgraide.ai/ has a "© 2026 Upgraide" footer. Its sitemap lists only home, offers, case-studies, contact, privacy and project. https://upgraide.ai/atlas returns 404.
- The project page describes Atlas as software for developers to manage developments, clients and post-sale communication with owners.
- Racius: constituted 09/05/2024, CAE 70220, plus 62010, 62090 and 71120. Capital 1,000 € (https://www.racius.com/upgraide-artificial-intelligence-lda/).
- eInforma: accounts filed for 2025 and 2024. Latest change dated 2026-10-30 (NIF 518015149).
- Name clash: the "ATLAS" land-intelligence app reported by idealista/news is a different product, built with a different partner (https://www.idealista.pt/news/node/75042).

**2. Product.**
- First 10 s, desktop: a black hero with a glowing teal wave and "Your Partner in Artificial Intelligence". Below it sits a faint client-logo strip ("Trusted by leading companies") and a pill navigation with "Book a Call".
- First 10 s, phone: the same headline, then a counter row: hours saved, ROI, months of payback, processes delivered.
- Main flow: book a call for one of three offers:
  - a 3-week "AI Discovery & Acceleration";
  - a "Tailor-Made AI System" in 3–8 weeks;
  - an embedded "Full Context Engineer", one company at a time, on a monthly fee.
- No real-estate flow, no map and no property data.

**3. Money.** Consultancy and build fees, plus a monthly fee for the embedded engineer. No prices are public.

**4. Trust.** A client-logo strip, and case studies naming companies (industrial and food clients) with ROI and payback figures. The PRR bar links to /project. No team on the homepage.

**5. Analytics they expose.** ROI, payback and hours-saved figures on their own marketing pages. Nothing for property clients.

**6. Better than us:** each case study states results in money (ROI, payback).
**We do better:** we actually ship a property product in public. Atlas was funded as a real-estate SaaS, and no trace of it is public.

---

## 5. Apogeu Forasteiro, Lda (Ovar): "CasaGPT"

Grant: PRR Vouchers para Startups, 30,000 € (2025).

**1. Status today: the service is discontinued (likely; see the caveat below). The company still exists.**
- https://casagpt.com/ returns HTTP 410 Gone with a Portuguese page, "Este serviço foi descontinuado.", marked noindex (curl, 2026-11-01).
- casagpt.pt and casagpt.ai do not resolve. casagpt.io sits behind a Cloudflare bot check, so its content is not verified.
- Racius: constituted 23/10/2024, capital 10,000 €. CAE 62020 (IT consultancy), plus 41100, 47410 and 68100. The stated activity covers app development, property management and promotion, and property trading (https://www.racius.com/apogeu-forasteiro-lda/).
- eInforma: accounts filed for 2025 and 2024. Changes dated 2026-07-06 and 2026-09-24 are risk and credit updates; their content is paywalled (NIF 518400174).
- Caveat: no page I could reach ties casagpt.com to Apogeu Forasteiro by name. The Portuguese wording makes the link likely.

**2. Product.** Not verified: the live domain shows only the discontinuation notice, and the Wayback Machine refused the connection from this session. The grant record describes "an online real-estate platform that integrates AI".

**3. Money.** Not verified.

**4. Trust.** None visible: the domain shows only the notice.

**5. Analytics they expose.** None.

**6. Better than us:** nothing I could verify.
**We do better:** we have distribution (newsletter editions) and a paying side (sponsors). A generic "GPT for houses" with neither seems to have stopped within a year of the voucher.

---

## 6. Zomeit, Lda (Porto): "ZOMEIT2MARKETS"

Grant: PRR e-commerce internationalisation, 42,499.50 € (2024).

**1. Status today: live, and part of the Zome network (now verified).**
- https://zomeit.com/ redirects to /login. It is a Bubble.io app with a Zome-styled "zomeit" logo in the same navy and magenta, and a single Microsoft "Entrar" button.
- zome.pt's own content says Zomeit.com is "o portal agregador de todas as ferramentas" for its consultants, including the entry to the CRM (zome.pt page payload, 2026-11-01).
- eInforma gives zomeit.com as the website of Zomeit, Lda (NIF 515777455). Racius puts its seat at the Centro Empresarial da Circunvalação, Porto. The Zome hub list includes "Zome-Circunvalação".
- So Hubzome (the brand owner in Braga) and Zomeit (a Porto entity that runs the consultants' tool portal and a Zome hub) are both inside the Zome network. I did not verify whether they share shareholders: that view is paywalled.
- Racius: constituted 13/12/2019, CAE 68311 and 70220, capital 10,000 € (https://www.racius.com/zomeit-lda/).
- eInforma: accounts filed for 2024, 2023 and 2022. It lists several "Incidentes" entries dated February to October 2026 (latest 2026-10-28); the details are paywalled (https://www.einforma.pt/servlet/app/portal/ENTP/prod/ETIQUETA_EMPRESA/nif/515777455).

**2. Product.**
- First 10 s on both phone and desktop: the logo and one "Entrar" button with a Microsoft icon. Nothing else.
- Main flow: internal search across the Zome tools for consultants. Not verified (login wall).
- The grant ("new features on its sales platform plus online campaigns") presumably funded this portal and Zome's outreach abroad (Spain).

**3. Money.** It is an internal tool for the network, so no paying user faces it. Commission and franchise revenue flow through the Zome network.

**4. Trust.** None on the login page.

**5. Analytics they expose.** Not verified (login wall).

**6. Better than us:** one search box over every internal tool. The consultant's productivity is the product.
**We do better:** our partner sees a clean qualified summary in a token page, with no tool sprawl and no login.

---

## 7. Mota Imo – Investimentos Imobiliários, Lda (Lisboa): "Portal multilingue e nova marca"

Grant: Lisboa 2020 SI Qualificação PME "vale", 15,000 € on 20,000 € (2015).

**1. Status today: the company exists, but no portal or brand could be found online. Dormant online.**
- motaimo.pt and motaimo.com do not resolve. Searches for "Mota Imo" return only a business-directory line with a Lisboa address (codigopostal.ciberforma.pt, 2026-11-01).
- Racius: CAE 68100 (buying and selling property), seat in Estrada da Luz, Lisboa. Capital shows as not available. Financial info is listed from 2006 to 2022 (https://www.racius.com/mota-imo-investimentos-imobiliarios-lda/).
- eInforma: 22 years old, accounts filed for 2024, 2022 and 2021. "Poderes de decisão" and "Estrutura de Governance" changed on 2026-05-22 (NIF 506834891).
- The contact email shown on eInforma is at the domain of a grant-application consultancy, "Especialistas em Fundos Comunitários desde 1993" (https://inov4you.pt/). This suggests the contact runs through a funds consultant rather than an in-house team.

**2. Product.** Not found. The funded "multilingual portal" has left no live trace I could reach.

**3. Money.** It is a property trading company (CAE 68100), so it earns from buying and selling property. No public offer.

**4. Trust.** Nothing public.

**5. Analytics they expose.** None.

**6. Better than us:** nothing I could verify.
**We do better:** our multilingual site is live in six editions with weekly content. A 2015 grant for a "portal multilingue e nova marca" left nothing public.

---

## 8. Unlockit (Lisboa): Web3 proptech/govtech, Portugal Ventures portfolio

Funding: Portugal Ventures (INNOV-ID, 2023), then co-investor in a 1.4 M € pre-seed (2024) (https://www.portugalglobal.pt/en/news/2024/may/unlockit-closes-14-million-to-strengthen-web3-platform/; https://tech.eu/2024/05/23/web3-proptech-unlockit-raises-eur14m-pre-seed/).

**1. Status today: live but pivoted. Funded in 2024 as transaction management, it now pitches three things:**
- verified agent reputation profiles (waiting list);
- "Veritas", a legal AI for real estate;
- "Íris", a transaction workspace;
- plus a blockchain "Trust Layer" pushed to 2027.

Details:
- The homepage shows "Lançamento previsto: Setembro de 2026" and "Primeiras 1.000 pré-inscrições". On 2026-11-01 it still asks people to join the waiting list, so the stated launch month has passed.
- Footer "© 2026 Unlockit" (https://unlockit.io/).
- Íris redirects to a Keycloak login, with an "AUTENTICAÇÃO.GOV" sign-in option (https://iris.unlockit.io/).
- The Íris login links to a project sheet at https://unlockit.io/projects/, which returns 404.
- Registry: no Racius entry found under five slug guesses, so the legal name and status are not verified.

**2. Product.**
- First 10 s, desktop: a dark navy hero with the headline "A reputação imobiliária precisa de prova." and a yellow "Inscrever na Waiting List" button. A "Ver vídeo de 2 min" button and chips ("Setembro 2026", "Powered by Blockchain") follow. On the right, a carousel shows a mock agent profile with stars, turnover, ranking and annual goals.
- First 10 s, phone: the same headline, the waiting-list button and the chips, with the profile mock below.
- Main flows:
  - **Agent profile:** verified affiliation, "reviews transacionais" (only parties to a validated transaction can review), a ranking, annual targets, and a media showcase.
  - **Veritas:** legal Q&A with cited sources (legislation, case law, opinions), summaries and suggested follow-up questions. Several features are marked "a ser desenvolvido". The banner reads "Grátis até Setembro 2026" (https://unlockit.io/veritas.html).
  - **Íris:** roles and permissions, a "dashboard em tempo real", audit trails, e-signatures, and shared due diligence with GDPR and AML.
  - **Trust Layer (2027):** built on Canton and Daml, with three "rails": verification (including proof of funds), transactional and reputation. It adds "Data Quality Levels" DQL0–4, a "Data Monetization Pool" and a "Unique Property Registry" (https://unlockit.io/trust-layer.html).
- No map.

**3. Money.** Software subscriptions for brokers, agents and legal teams, free until September 2026. A university thesis described a subscription plus transaction-fee model (run.unl.pt, via search). The Trust Layer plans data monetisation. No prices are public.

**4. Trust.**
- Logos: Canton Network ("Powered by"), Agenda PT2030 and the PRR / República Portuguesa / EU co-finance bar.
- A "3.º lugar" at a Canton Network ideathon, among 938 participants.
- The hero mockup shows a sample agent profile with a photo.
- No real customer reviews and no team on the homepage.

**5. Analytics they expose.**
- For agents: their own ranking, turnover, portfolio count and progress against annual goals.
- For brokers: a real-time dashboard in Íris.
- Data quality levels per claim (planned).

**6. Better than us:** they treat proof as a product. Reviews are tied to a real transaction, rankings are auditable, and proof of funds works as a reusable credential.
**We do better:** we ship now, with a live audience and a paying side. Unlockit has pivoted at least twice, and its launch date has slipped past September 2026 with blockchain still at the centre.

---

## Qualification: what they do, how far our Concierge goes, what we could add

**What the others do**
- **Hubzome / Zome (grant record plus public site).**
  - The SmartLeads grant describes AI agents that qualify and nurture leads, then hand them to a human consultant, integrated with the CRM and CMS. The agent itself is not public.
  - On the public site, buyer entry points do light qualification: property type, then typology, in "Procura Assistida", plus a natural-language ChatGPT search.
  - The payload holds the wording of a mortgage simulator ("Will you use financing?").
  - The seller side is qualified harder. Zome GO! takes the property's features into a valuation and drops the record into the "plataforma de gestão de processos", so the seller lead arrives pre-filled.
  - Hand-off timing and the follow-up cadence are not visible (internal).
- **Omrei.** It qualifies the professional, not the buyer: registration, then admission review (approved, refused or suspended), then a signed agreement. Buyers ("clientes") register with name, email and phone and are attached to a professional. Visits and proposals ("direta" or "completa") are structured objects in the app. Off-market matching runs behind login (not verified).
- **Homizy.** The AI assistant "Izzy" does chat-first search. Qualification sits on the property side: the seals Check, Smart and Go tell the buyer how ready the deal is. The buyer is not scored.
- **Unlockit.** It plans qualification through credentials: proof of funds, KYC/AML and licences as reusable verified claims (2027). Veritas suggests follow-up questions. Reviews only come from parties to a validated transaction.
- **CasaGPT, Atlas, Mota Imo.** Nothing verifiable.

**How far we already go.** Our Concierge already collects what a human advisor uses to qualify:
- country of residence;
- budget band;
- purpose;
- financing;
- NIF (a strong readiness signal);
- place;
- language;
- a contact window and real time slots in the reader's timezone.

The showcase request adds the unit (block and typology), own funds or mortgage, and horizon. The advisor gets a structured summary with the consent text and a timestamp. That is a complete hand-off: Zome's public buyer flow goes much less far.

What we lack:
1. a readiness signal the advisor can sort by;
2. nurture for readers who are "not yet";
3. any feedback on what happened after the hand-off;
4. property-side proof on showcases.

**What we could add without per-lead pricing (D6) and with consent per recipient**
1. **A readiness tag inside the summary.** Derive it with a transparent rule ("ready now / within 12 months / exploring") from horizon, financing, NIF and the slot booked. Show it to the reader on the review screen before sending. It is a label, not a price: partners pay the same flat fee whatever the tag.
2. **An optional self-declared proof line**, such as "mortgage pre-approval: yes, in country X" or "own funds: yes". No documents are uploaded. This copies the Unlockit idea without credentials or blockchain.
3. **A natural-language first box.** The reader types a sentence; we fill the fields and the reader confirms them. This is Zome's ChatGPT box without a chatbot giving advice, and it keeps "describe, never advise" (D12).
4. **Nurture that stays with us.** The "later" exit of the Concierge already exists. Add a separate opt-in to a timed sequence from the reader's own newsletter edition (a buying-from-abroad series, beehiiv automation where the plan allows). Nothing goes to the partner until the reader starts a new request with its own consent.
5. **One consent per recipient, asked again.** If a request should also reach the lawyer or a bank partner, ask a new unticked consent that names that recipient. Never forward silently. The lawyer side screen already does this.
6. **Closing the loop.** Give each request a status on a reader token page (sent, seen by the advisor, call booked), plus the advisor's response time. This feeds the sponsor report funnel (§2.4 of prompt 51) without per-lead billing.
7. **A document checklist on developer showcases**, borrowing Homizy's seals and Zome Verificado: licence of use, energy certificate, permanent certificate, technical file, each shown "provided by the developer" with a date. It is a checklist, not a seal we certify.

---

## Patterns in group C

- **A grant is not a product.** Three of the eight funded projects (Atlas, CasaGPT, Mota Imo's portal) have no public product today. All three were small vouchers (15–30 k€) to companies with 1,000–10,000 € of capital. Two were constituted less than a year before they applied, the third (Mota Imo) has existed for over twenty years. One shows a grant consultant as its contact. Lesson: winning the money says nothing about whether the product exists.
- **AI wins when it sits inside existing distribution.** Zome has a national agent network, live listings and a seller-valuation funnel. Its ChatGPT search, assisted search and SmartLeads are a layer on top, and they are live. CasaGPT was a standalone "GPT for houses" with no audience, and it is discontinued.
- **No paying side means no product.** Homizy (sellers pay for modules) and Omrei (professionals pay 600 €/yr) name a payer, though both run "free until" periods. Unlockit is free until September 2026 and has no public price. CasaGPT named no payer and stopped.
- **Blockchain for its own sake.** Unlockit has moved from transaction management (2024) to reputation profiles plus legal AI (2026) to a Canton "Trust Layer" (2027). Its launch date has slipped. The parts that stand on their own (cited legal answers, reviews tied to transactions) need no blockchain.
- **Too broad, too early.** Homizy covers listings, an AI assistant, three seals, a digital CPCV, escrow ("Brevemente"), credit, energy certificates and AI staging, with one listed employee. Each module is thin. Our scope is narrow (Portuguese abroad, one partner, flat sponsorship), and that is a strength.
- **Login walls hide the value.** Omrei's and Zomeit's first screens explain nothing, so a sponsor or a buyer cannot judge them in 10 seconds. The live, legible sites (Zome, Homizy, Unlockit) lead with one sentence and one button.
- **Property-side proof is the trust device that works.** Zome Verificado has a FEUP/ICS training partner, and Homizy has its seals. They prove things about the property, not about the platform. EU-funds bars appear on Homizy, Upgraide and Unlockit, but these are legal disclosures and do not build trust.
- **The qualified hand-off stays human.** Even the 300 k€ AI project (Hubzome SmartLeads) is framed as AI that qualifies and nurtures, then hands over to a human consultant. That matches our Concierge-to-advisor model and supports keeping a person at the end of every request.

---

## Could not verify

- Hubzome SmartLeads as a running product: it does not appear on the public site, and the PRR project sheet link on zome.pt needs a SharePoint login (401).
- Where the Zome "Procura Assistida" picker ends after typology, and the layers of the Zome map.
- The whole Omrei app (login wall): matching logic, map, data sources, dashboard, client counts.
- Zomeit's portal content (Microsoft login), and whether Zomeit and Hubzome share shareholders (paywalled). The "Incidentes" entries on eInforma are paywalled and not interpreted here.
- Homizy prices (seals, featured listings, Sign & Seal) and its listing count. The eInforma label for Domínio Urbano timed out.
- Whether Atlas exists in any private form.
- Who ran casagpt.com, and what it looked like before (Wayback Machine unreachable from this session, casagpt.io behind a bot check).
- Mota Imo's portal and brand name, and whether it trades today.
- Unlockit's legal entity name and registry status, its project sheet (404), and its prices.
- "Estado de Atividade" for every company: Racius sells it as a paid report. I report only the absence of dissolution or insolvency markers in the free views.
- 4gnews.pt (Zome ChatGPT press) does not resolve from this session.
