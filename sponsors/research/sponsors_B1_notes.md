# sponsors_B1: wine, port, spirits, coffee and the largest advertisers in Portugal

Checked 2026-11-02. Prompt 54 §6 (items 1 and 2), products and levels from PARTNERSHIPS_v6. Companies only. No personal names, emails or phone numbers. Nobody was contacted and no form was submitted.

## Counts

- **89 new companies**, none already in `sponsors/letter_sponsors.csv`. Duplicates were checked by normalised name and by contact domain, then by a token match against letter_sponsors, S1–S3 and B3.
- By category: Wine 60 (33 estates and houses, 12 commissions and institutes, 15 importers), Home setup 15, Spirits and coffee 7, Telecoms 4, Energy 3.
- By country: PT 74, BR 7, US 3, LU 2, CH 2, IL 1. **FR 0** (see below).
- Priority: A 24, B 29, C 36. Level: Official 10, Partner 24, Featured 55.
- contact_status: 84 return 200 and 5 are blocked (5.6%): Nestlé Portugal, Worten, Mercadona Portugal, MEO (Altice Portugal) and Iberdrola Portugal. These sites return 403 or 410 to the scripted check with UA "Mozilla/5.0". All URLs were checked with the curl command from the brief.

## Size signals

- **The MediaMonitor ranking is at rate card, not net spend.** Source: Marketeer, 2026-01-20, https://marketeer.sapo.pt/continente-foi-o-maior-anunciante-de-2025-arena-e-fuel-lideraram-entre-as-agencias/. Figures used: Continente 630.4 M€ (1st), Lidl 452.1 M€ (4th), Nestlé 451.3 M€ (5th), MEO 450.6 M€ (6th), NOS 441.3 M€ (7th) and Vodafone 411.2 M€ (9th). PARTNERSHIPS_v6 says rate card is about 10× real spend, so use these figures to rank, never to price. The same article is cited in `news_source` for those six rows.
- Wikipedia is the source for Pingo Doce (482 stores, 2023), Mercadona (39 stores in Portugal, Jan 2026), Aldi, IKEA, Iberdrola, Repsol, Digi, Super Bock and Central de Cervejas (Sagres).
- For most wine estates the size signal is qualitative: "receives visitors", sourced to the estate's own wine-tourism or visit page. I did not find hectares, bottles or revenue in a citable public source for them.

## Not included, or could not verify

- **Already on the list, so not added again:** EDP, Galp and Endesa are already listed as solar or energy rows (domains edp.com, galp.com, endesa.pt). EDP Comercial was not added because it would duplicate EDP. Also already there: Sogrape, Symington, Fladgate (Taylor's), Esporão, Aveleda, Bacalhôa, Niepoort, Quinta do Vallado, Real Companhia Velha, Madeira Wine Company/Blandy's, Kopke (Cálem), Quinta do Noval, Quinta da Pacheca, El Corte Inglés, Pernod Ricard, Diageo, Adamus Gin, the two ginja brands, ViniPortugal and Herdade do Sobroso. Three entries could look like duplicates but are not: NOS Alive, MEO Kalorama and Vodafone Paredes de Coura are festival rows, and Super Bock Super Rock is the festival, not Super Bock Group.
- **France importers:** I could not find a verifiable French importer that specialises in Portuguese wine. Porto Cruz (Gran Cruz) is the French-market lever: it is French-owned and France is the largest Port market by volume. I did not verify the owner (La Martiniquaise) from a primary source in this run.
- **Sites that did not respond through the proxy (502, reset or DNS):** Nicola (café brand), Altice Portugal corporate site, Murganheira, Quinta dos Roques, Herdade dos Grous (maintenance page), Quinta do Ameal, Gran Cruz corporate, CVR Bairrada (the Rota da Bairrada association is used instead), Kobrand, Broadbent Selections, Olé & Obrigado (US), Hacerem (IL), Engenhos do Norte and Intermarché (403). None of these were added.
- **Generic contact URLs:** these sites are JavaScript-only and showed no contact link, so contact_url is the homepage (200): José Maria da Fonseca, Cartuxa, Casa Relvas, Global Wines, Sharish, Aldi, Radio Popular, Conforama, Grand Cru, Bexeb, Decanter, Licor Beirão (age gate), JOM, Maxmat and Zara Home.
- **Group pages instead of brand pages:** Leroy Merlin uses the ADEO press page and Fnac uses the Fnac Darty contact page. Pingo Doce uses the Jerónimo Martins media page because its partnerships URL failed on recheck.
- **To check before outreach:** that Mistral, Grand Cru, Decanter, Evino and The Wine Route currently carry Portuguese wines. Their sites show this (The Wine Route homepage mentions Portugal), but I did not check their portfolios item by item.
- **ad_rules:** every alcohol row carries the Código da Publicidade art. 17 and Loi Évin note, plus a short local note for each market: CH Alcohol Act, Brazil CONAR, US 21+ codes, Israel 2012 alcohol advertising law. These local notes are summaries; check them with counsel before running alcohol creative outside Portugal and France.
