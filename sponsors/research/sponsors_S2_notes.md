# Sponsor list S2: notes

Group S2 of prompt 54 §4. Checked 2026-11-02. File: `sponsors_S2.csv` (124 companies). Nobody was contacted and no form was submitted.

## Counts

| Category | Companies | A | B | C |
| --- | ---: | ---: | ---: | ---: |
| Developers and golf-resort developers | 17 | 8 | 8 | 1 |
| Hotels and hotel groups | 18 | 8 | 10 | 0 |
| Restaurant groups | 9 | 2 | 5 | 2 |
| Wine estates and port houses | 15 | 8 | 7 | 0 |
| Spirits | 6 | 0 | 1 | 5 |
| Golf courses and academies | 12 | 4 | 6 | 2 |
| Yachting and marinas | 15 | 3 | 6 | 6 |
| Art galleries, auction houses and art fairs | 15 | 2 | 7 | 6 |
| Events and festivals | 17 | 2 | 4 | 11 |
| **Total** | **124** | **37** | **54** | **33** |

Contact status: 123 loaded with HTTP 200 after redirects, 1 bot-blocked (Tivoli Hotels & Resorts: 403), so under 1% blocked. Every row has a size signal with a source URL, and each source page was fetched and checked for the quoted figure or phrase.

## Method

1. Each contact URL was checked with `curl -sSL -A "Mozilla/5.0"` and a 25 s timeout through the proxy, retrying up to 4 times. `contact_url` holds the final URL after redirects. Some pages sometimes return a "One moment, please" or "Checking your request" challenge (Salgados Golf, Pedro Cera, Vilamoura Sailing, Marina de Cascais). All of them returned 200 with their real page on a retry.
2. Each page title was read to make sure the domain belongs to the company. That check caught five parked or wrong domains, which were dropped or replaced:
   - vicproperties.com is for sale; the right domain is vic-properties.com.
   - vanguardproperties.com is a San Francisco agency; the Portuguese developer is reached through comporta.com.
   - onyria.com, sharishgin.com, costaterragolf.com, mapre.com and blackpiggin.com are parked lander pages.
   - plano-b.pt is a beauty school in Coimbra, not the Porto venue.
3. Size signals come from the company's own site wherever possible: rooms, hectares, berths, holes, employees, turnover, awards. Wikipedia is used only for festivals and listed facts (NOS Alive, Web Summit, Paredes de Coura, Volta ao Algarve, Super Bock Super Rock, Diageo, the Algarve circuit, Pastéis de Belém, Belcanto, Estoril Open, Tivoli, Kalorama).
4. The gallery size signal is "exhibitor at ARCOlisboa 2026", taken from IFEMA's gallery list (https://www.ifema.es/arco/lisboa/galerias).

## Caveats for the CEO

1. **Weak or qualitative size signals.** These rows have no hard figure:
   - Vidago Palace: its own history text.
   - Dom Pedro: its hotel and golf portfolio.
   - Savoy Signature: its hotel collection page.
   - JNcQUOI: its venues.
   - SUD Lisboa: its venues.
   - Esporão: its estates in three regions.
   - Quinta do Noval: "since the early 18th century".
   - Adamus Gin: webshop only, no public volume.
   - Galeria Bruno Múrias: fairs page only.
   - Click&Boat: "leading", self-described.
   - Habitat Invest, Stone Capital and EastBanc: founding year or years active.
2. **Contact URL that is not a dedicated contact page.**
   - Kubikgallery: homepage with the contact block, because its /contact paths returned 503.
   - Maratona Clube de Portugal: homepage, as it has no contact page.
   - Fortera and Essência do Vinho: homepage `#contactos` anchor.
   - Troia Resort: events page; /contactos returned 404.
   - Time Out Market and Cervejaria Trindade: private-events pages.
   - Penha Longa: Ritz-Carlton events page.
3. **Same group, separate brands.** Each pair stays as two rows, but they should be pitched once:
   - Vilamoura World and Marina de Vilamoura.
   - Pestana Hotel Group and Pestana Golf.
   - The Fladgate Partnership and The Yeatman.
   - JNcQUOI and the Amorim Luxury share in Comporta.
4. **Christie's and Sotheby's** are the auction houses only. Their real-estate brands (Christie's International Real Estate, Sotheby's International Realty) are agencies and are excluded under D9. I found no Portugal desk page on either site, so both rows point to the global locations page and are priority C.
5. **No other real-estate agencies are listed** (D9). Every developer row is a developer or a resort owner. Krest, Fortera, EastBanc and Avenue sell through their own sales teams.
6. **Galeria Madragoa** now trades as Consonni Radziszewski (from March 2026), so the row uses the new name. The old domain still serves its contacts page.

## Could not verify (left out)

1. **No working site, or the domain did not resolve from here:**
   - Kronos Homes (TLS certificate error).
   - Krest's .pt domain (krestinvestments.com used instead).
   - MAP Real Estate (bot challenge on mapgroup.pt, and the idealista source returned 403).
   - Bom Sucesso, Pelicano, Bondstone, Vila Sol.
   - Galeria Duarte Sequeira, though it does exhibit at ARCOlisboa 2026.
   - Palácio do Correio Velho (403).
   - Veritas Leilões (522).
   - Leiria e Nascimento, São Domingos Leilões.
   - Peixe em Lisboa, Mercantina, Sea Me / Multifood (522).
   - Engenhos do Norte, Macieira (403), Licor Beirão (age gate, no contact page), Amarguinha (no contact page), William Hinton rum (no contact page), Sharish (parked).
   - Boavista Golf, Royal Óbidos (no size figure), West Cliffs (no contact page), Praia d'El Rey (no size figure), Quinta da Marinha golf (its domain redirects to Kimpton Cascais, which is listed instead).
2. **Bot-blocked, so left out to keep the blocked share low:**
   - Six Senses Douro Valley (403).
   - Vila Vita Parc (403).
   - Four Seasons Ritz Lisbon (403).
   - Conrad Algarve (403).
3. **Prompt items not verified as current:**
   - EVOOLUTION: no matching site found.
   - Portugal Masters: portugalmasters.pt and portugal-masters.com do not resolve, so it is not listed as a current event.
   - "Volvo Ocean Race" is now The Ocean Race: not listed, no Portuguese stopover confirmed.
   - "Grupo Multifood": not confirmed.
   - "Plano B" Porto: the domain found belongs to a different business.
4. **Rows dropped for lack of a size signal or a contact page:**
   - Óbidos Vila Natal, Festival de Sintra, Visit Madeira (Madeira Wine Festival).
   - Lisbon Art Weekend, Octant Hotels, Memmo Hotels, Areias do Seixo.
   - Belas Clube de Campo, Quinta da Comporta, Lux Frágil, Cervejaria Ramiro, Manteigaria, Grupo Sushi Café.
   - Quinta do Crasto, José Maria da Fonseca, Cartuxa, Lusovini.
   - Marina Parque das Nações, Clube Naval de Cascais, Douro Marina, Lisbon Charters.
   - Quadrado Azul, Galeria Fernando Santos.

   Douro Marina and Lisbon Charters were dropped for the same reason. Quadrado Azul and Galeria Fernando Santos both exhibit at ARCOlisboa but have no working contact page.
