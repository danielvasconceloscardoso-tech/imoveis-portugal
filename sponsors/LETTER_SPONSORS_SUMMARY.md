# Letter sponsors (prompt 54 §4), 2 Nov 2026

The full list is `sponsors/letter_sponsors.csv`: **344 real companies and public bodies**, **companies only**. Each row has:
- category and country;
- why the letter fits them;
- the calendar slot;
- the product to pitch;
- a public contact, press or partnerships page on their own site;
- a size signal with its source;
- priority (A/B/C);
- whether the company is already in `sponsors/pipeline.csv`.

The list contains no personal names, no personal emails and no phone numbers. **No real-estate agency other than the partner is included (D9).** Nothing was sent and no one was contacted. Every company was checked on 2 Nov 2026. Research notes per group, with what was dropped and why, are in `sponsors/research/sponsors_S1_notes.md` (money and services), `sponsors_S2_notes.md` (developers, hotels, tables, wine, golf, sea, art, events) and `sponsors_S3_notes.md` (travel, cars, luxury, home, architects, property services, tourism boards). The merge and its checks are `sponsors/build/letter_sponsors.py`.

**The numbers:**
- **344 companies:** 88 priority A, 136 B, 120 C.
- **Contact pages:** 325 load (HTTP 200, final URL after redirects recorded); 18 block scripts, so open them in a browser before use; 1 needs a check.
- **A spot re-check of 40 random contact pages:** 39 loaded and 1 redirected to an error page (marked "check").
- **Already in the pipeline:** 51 companies. pipeline.csv stays the source of truth for those (CLAUDE.md rule 13).
- **Products pitched:** partner block 180, series 66, Friday weekend item 38, event 35, "Apresentado por" 25.

## By category

| Category | Companies | A | B | C | Already in pipeline | Priority A (names) |
| --- | --- | --- | --- | --- | --- | --- |
| Law and tax firm | 22 | 6 | 8 | 8 | 11 | Abreu Advogados, Blevins Franks, Global Citizen Solutions, Morais Leitão, PLMJ, VdA Vieira de Almeida |
| Airlines and airports | 19 | 3 | 7 | 9 | 1 | Azul Brazilian Airlines, Luxair, TAP Air Portugal |
| Regional tourism boards and municipalities | 19 | 0 | 0 | 19 | 0 | — |
| Hotels and hotel groups | 18 | 8 | 10 | 0 | 0 | Belmond Reid's Palace, Martinhal, Pestana Hotel Group, Pine Cliffs Resort, Sublime Comporta, The Yeatman, Torel Boutiques, Vila Galé |
| Architects and interior studios | 17 | 3 | 6 | 8 | 0 | Openbook, Promontório, Saraiva + Associados |
| Developers and golf-resort developers | 17 | 8 | 8 | 1 | 5 | CostaTerra Golf & Ocean Club, Ombria Algarve, Palmares Ocean Living & Golf, Quinta do Lago, Vale do Lobo, Vanguard Properties (Terras da Comporta), VIC Properties, Vilamoura World |
| Events and festivals | 17 | 2 | 4 | 11 | 0 | Essência do Vinho, ViniPortugal (Vinhos de Portugal events) |
| Furniture, kitchens and interiors | 17 | 3 | 9 | 5 | 0 | Boca do Lobo, bulthaup, De La Espada |
| Insurer | 17 | 4 | 7 | 6 | 6 | Ageas Portugal (incl. Médis), Allianz Care, Cigna Healthcare (Cigna Global), Fidelidade |
| Portuguese bank (non-resident / private banking) | 16 | 6 | 6 | 4 | 10 | ABANCA Portugal, Banco BPI, Caixa Geral de Depósitos, Millennium bcp, Novobanco, Santander Portugal (Santander Totta) |
| Art galleries, auction houses and art fairs | 15 | 2 | 7 | 6 | 0 | ARCOlisboa (IFEMA), Cabral Moncada Leilões |
| Wine estates and port houses | 15 | 8 | 7 | 0 | 0 | Bacalhôa Vinhos de Portugal, Esporão, Kopke Group, Madeira Wine Company (Blandy's), Niepoort, Sogrape, Symington Family Estates, The Fladgate Partnership (Taylor's) |
| Yachting and marinas | 15 | 3 | 6 | 6 | 0 | Douro Azul, Marina de Cascais, Marina de Vilamoura |
| International private bank with Portugal desk | 14 | 5 | 6 | 3 | 7 | Banque BCP (France), BTG Pactual, Indosuez Wealth Management, Julius Baer, Union Bancaire Privée (UBP) |
| Luxury goods (Portuguese stores) | 14 | 4 | 6 | 4 | 0 | Boutique dos Relógios (Grupo Tempus), Leitão & Irmão, Torres Joalheiros, Vista Alegre |
| Currency transfer and payments | 13 | 3 | 3 | 7 | 7 | Currencies Direct, Ebury, Wise |
| Property services (non-agency) | 13 | 2 | 7 | 4 | 0 | EDP (EDP Solar), Verisure Portugal |
| Golf courses and academies | 12 | 4 | 6 | 2 | 1 | Monte Rei Golf & Country Club, Oitavos Dunes, Penha Longa Resort, Vilamoura Golf (Old Course) |
| Relocation, schools, healthcare: international school | 12 | 5 | 5 | 2 | 0 | Carlucci American International School of Lisbon (CAISL), Lycée français Charles Lepierre, Nobel International School Algarve, Oporto British School, St. Julian's School |
| Car brands and dealers | 10 | 2 | 6 | 2 | 0 | Grupo Salvador Caetano, Porsche |
| Restaurant groups | 9 | 2 | 5 | 2 | 0 | Grupo José Avillez, JNcQUOI |
| Mortgage / credit intermediary | 8 | 2 | 4 | 2 | 3 | ComparaJá, Doutor Finanças |
| Spirits | 6 | 0 | 1 | 5 | 0 | — |
| Relocation, schools, healthcare: private healthcare | 5 | 3 | 1 | 1 | 0 | CUF, Lusíadas Saúde, Luz Saúde (Hospital da Luz) |
| Relocation, schools, healthcare: relocation services | 4 | 0 | 1 | 3 | 0 | — |

## Who to call first, by the calendar (December 2026 to May 2027)

1. **December–January, the year-end decision season:** the Portuguese banks' non-resident units and the international private banks with Portugal desks, for "Apresentado por" in January. Currency transfer firms and insurers fill the blocks.
2. **New Year:** Madeira hotels and the Funchal events, as Friday items in the last December letters.
3. **February–April, the golf weeks:** Algarve golf resorts, golf courses and academies, as a six-letter series. The golf day event goes in October.
4. **March–May:**
   - developers, for their launches (series or blocks);
   - airlines, for summer routes;
   - interiors and kitchens, for the renovation season;
   - ARCOlisboa (May) for the galleries.
5. **All year:** law and tax firms, insurers, relocation, schools (September intake, so pitch them from May) and private hospitals.
6. **Later, by procurement:** tourism boards, municipalities and AICEP. All are priority C and need the Lda and public-procurement rules (CCP) first.

## Before anyone uses the list

- **Pitch each group once:**
  - Boca do Lobo, Essential Home and Brabbu are all Covet Group;
  - Vilamoura World and Marina de Vilamoura;
  - Pestana Hotel Group and Pestana Golf;
  - the Fladgate Partnership and The Yeatman;
  - Ageas and Médis.
- **Christie's and Sotheby's** are listed as auction houses only. Their real-estate arms are agencies and stay out (D9).
- **Decisões e Soluções** was removed because it also runs a real-estate arm (D9).
- **Property managers and concierges** were left out because no agent licence (AMI) status could be confirmed for any of them. GuestReady was removed for the same reason.
- **Some size signals are weak:** group-level revenue for car brands and airlines, ArchDaily project counts for architects, qualitative signals for about 25 rows. Treat priority as a starting point.
- **"Why it fits" and the calendar slot are our judgement,** not checked facts. Check airline routes against current schedules before a pitch.
- **Adding a company to `sponsors/pipeline.csv`** is the CEO's decision (task 54b), then the sponsor builder (`python3 sponsors/build/build_v2.py`).

## Could not verify

- **Sites that refuse scripts (18 rows, "blocked"):** they include Banco Carregosa, Bankinter, Julius Baer, EFG, Edmond de Rothschild, Revolut, Currencies Direct, PwC, Blevins Franks, SWISS, Air France, Transavia, Tesla, Salvador Caetano, El Corte Inglés and Tivoli.
- **Unreachable sites or no contact page,** so the company was dropped: Kronos Homes, MAP Real Estate, Palácio do Correio Velho, Veritas, Licor Beirão and others (listed in the notes).
- **Events whose current edition could not be confirmed:** EVOOLUTION, the Portugal Masters, an Ocean Race stopover.
- **Portugal desks not confirmed** for Lombard Odier, Quintet and Andbank (the "why it fits" says so).
- **Out of reach from this session:** portugalresident.com (not allowed by the network).
