# Prompt 81, agent 5: the service lines of the municipality card (10 Nov 2026)

Where the words are: `content/copy/COPY_DECK.md`, block `## services` (82 keys, PT, EN and FR). `node scripts/check-content.mjs` and `node scripts/check-parity.mjs` pass. Numbers: `content/facts/map/services/summary.json`, checked 2026-11-10 (data branch commit 4663331), against the hand-checked sample in `content/facts/map/places/gondomar/` (3 Nov). Every template was filled for all 308 places in the three languages, with and without the Michelin line: no placeholder is left open and no line prints a zero.

## 1. The five questions (content/METHOD.md)

1. **What should they feel?** "An ordinary Tuesday here is already taken care of: the doctor, the school, the sea and the flight home are minutes away, and someone has checked."
2. **The one hero.** The minutes. Each line is a label and one number, the numbers in a column. The first line is the hospital, the question nobody asks aloud. One action: tap a line to open its detail.
3. **The arrival.** The block comes after the place's name and its one line, under two quiet words, "Por perto", and the small "de carro, sem trânsito". The order follows a life, not a database: health, school, beach, airport, table.
4. **What they ask next.** "Which hospital? Which school? Says who?" The detail answers in one line: the name, the time, what it is. "And the whole list?" The paid teaser says what the analysis holds, with no price and no push.
5. **The one more thing.** The table comes last: "35 restaurantes do Guia Michelin a menos de 30 min", 13 of them with a star. Where a place has none, the last line is its market. Where it has neither, the card ends on the airport and says nothing about food.

Register: the five-second layer is functional (labels of one to three words, a number). The detail is the concierge at his desk: nouns and numbers, no adjective, no advice.

## 2. The Gondomar card as text

Values are the services table's. Where they differ from the hand-checked sample, section 5 shows both.

### Português

**Por perto** · de carro, sem trânsito

| Five seconds | | Detail, on tap |
|---|---|---|
| Hospital com urgência | **14 min** | Hospital de Santo António, hospital geral público com urgência, a 14 min de carro. |
| Centro de saúde | **2 min** | Centro de Saúde de São Cosme, centro de saúde público, a 2 min de carro. |
| Escola internacional | **15 min** | Deutsche Schule zu Porto, currículo alemão, a 15 min de carro. Há 4 a menos de 30 min. |
| Escolas secundárias públicas | **35 a menos de 20 min** | Escola Secundária de Gondomar, a 1 min de carro, é a mais próxima das que contámos. A contagem vem do OpenStreetMap: escolas públicas com «Secundária» no nome. |
| Praia | **17 min · Bandeira Azul** | Lavadores, praia de mar, a 17 min de carro. Bandeira Azul em 2026. |
| Aeroporto | **22 min** | Aeroporto do Porto (OPO), a 22 min de carro até ao terminal de passageiros. |
| Guia Michelin | **35 restaurantes a menos de 30 min** | Os restaurantes que constam do Guia Michelin a 10 de novembro de 2026, a menos de 30 min de carro. 13 têm estrela. |

Paid teaser: A análise completa traz as listas inteiras: 31 escolas e 11 unidades de saúde a menos de 20 minutos, cada uma com os minutos, o tipo e a fonte. Onde o registo oficial os dá, também a morada e o número de registo.

Foot: Tempos de carro a partir da Câmara Municipal de Gondomar, sem trânsito, arredondados ao minuto. Consultado a 10 de novembro de 2026. Fontes: SNS, APA, Agência Europeia do Ambiente, Bandeira Azul, Guia Michelin e os sites das escolas internacionais. Dados do mapa © OpenStreetMap contributors.

### English

**Close by** · by car, no traffic

| Five seconds | | Detail, on tap |
|---|---|---|
| Hospital with ER | **14 min** | Hospital de Santo António, a general public hospital with an emergency department, 14 min by car. |
| Health center | **2 min** | Centro de Saúde de São Cosme, 2 min by car. A centro de saúde is the public clinic where family doctors see patients. |
| International school | **15 min** | Deutsche Schule zu Porto, German curriculum, 15 min by car. There are 4 within 30 min. |
| Public secondary schools | **35 within 20 min** | Escola Secundária de Gondomar, 1 min by car, is the nearest of those we counted. The count comes from OpenStreetMap: public schools with Secundária in their name, which teach grades 10 to 12. |
| Beach | **17 min · Blue Flag** | Lavadores, a sea beach, 17 min by car. Blue Flag in 2026. |
| Airport | **22 min** | Porto Airport (OPO), 22 min by car to the passenger terminal. |
| Michelin Guide | **35 restaurants within 30 min** | The restaurants listed in the Michelin Guide on November 10, 2026, within 30 min by car. 13 hold a star. |

Paid teaser: The full analysis holds the whole lists: 31 schools and 11 health units within 20 minutes, each with its minutes, type and source. Where the official register gives them, the address and the registry number too.

Foot: Drive times from the Câmara Municipal de Gondomar, with no traffic, rounded to the minute. Checked on November 10, 2026. Sources: SNS, APA, the European Environment Agency, Blue Flag, the Michelin Guide and the international schools' own sites. Map data © OpenStreetMap contributors.

### Français

**À proximité** · en voiture, sans trafic

| Five seconds | | Detail, on tap |
|---|---|---|
| Hôpital avec urgences | **14 min** | Hospital de Santo António, hôpital général public doté d'un service d'urgences, à 14 min en voiture. |
| Centre de santé | **2 min** | Centro de Saúde de São Cosme, à 2 min en voiture. Un centro de saúde est le centre de santé public où consultent les médecins de famille. |
| École internationale | **15 min** | Deutsche Schule zu Porto, programme allemand, à 15 min en voiture. On en compte 4 à moins de 30 min. |
| Lycées publics | **35 à moins de 20 min** | Escola Secundária de Gondomar, à 1 min en voiture, est la plus proche de celles que nous avons comptées. Le décompte vient d'OpenStreetMap : les écoles publiques dont le nom contient « Secundária », l'équivalent du lycée. |
| Plage | **17 min · Pavillon Bleu** | Lavadores, plage océane, à 17 min en voiture. Pavillon Bleu 2026. |
| Aéroport | **22 min** | Aéroport de Porto (OPO), à 22 min en voiture jusqu'au terminal passagers. |
| Guide Michelin | **35 restaurants à moins de 30 min** | Les restaurants inscrits au Guide Michelin au 10 novembre 2026, à moins de 30 min en voiture. 13 sont étoilés. |

Paid teaser: L'analyse complète contient les listes entières : 31 écoles et 11 établissements de santé à moins de 20 minutes, chacun avec ses minutes, son type et sa source. Là où le registre officiel les donne, l'adresse et le numéro d'enregistrement aussi.

Foot: Temps en voiture depuis la Câmara Municipal de Gondomar, sans trafic, arrondis à la minute. Consulté le 10 novembre 2026. Sources : SNS, APA, Agence européenne pour l'environnement, Pavillon Bleu, Guide Michelin et les sites des écoles internationales. Données cartographiques © OpenStreetMap contributors.
## 3. The food line: it holds, on one condition

1. **Michelin Guide count within 30 minutes: holds.** It is an exact count of a published list on a named date (201 restaurants, matching the number the guide states), and the line says "listed in the Michelin Guide", never that the food is good. It prints on 192 of 308 cards. The condition is the operator's: the data note says the guide's pages were read with a plain headless browser after curl got an empty answer, and he has to accept that source.
2. **Markets only: also written.** With the Michelin line off, the food line is the nearest market by name and minutes ("Mercado · 2 min", Mercado Municipal de Gondomar). It would print on 259 cards; 49 would have no food line. With Michelin on, the market line is the fallback for 81 places and 35 have no food line.
3. **Left out, because they cannot be defended:**
   - the number of markets within 20 minutes (Gondomar's 17 counts "Mercado Municipal de Gondomar" twice; OpenStreetMap holds some markets as two objects);
   - the OpenStreetMap restaurant count and restaurants per 1,000 residents (Gondomar 0.4, Porto 4.0: it measures mapping, not restaurants);
   - the name of the nearest listed restaurant (naming one business on a card reads as a recommendation).

## 4. "The number of schools within 20 minutes": the wording that stays true

The prompt's free line is a number of schools. The table has three counts and the sample a fourth. They do not measure the same thing.

| Count for Gondomar | What it is | Verdict |
|---|---|---|
| 35 | Public secondary schools within 20 minutes (OpenStreetMap, schools with "Secundária" in the name) | **Used.** The line says "Escolas secundárias públicas · 35 a menos de 20 min" and the detail says where the count comes from. A school that teaches secondary without the word in its name is missed, so the detail says "the nearest of those we counted", not "the nearest" |
| 61 | Private schools within 20 minutes (OpenStreetMap, every cycle, primary-only included) | **Not written.** The hand-checked number for the same thing is 27 |
| 27 + 4 = 31 | Private schools to the 3rd cycle or secondary (DGEEC, hand-checked) plus the 4 international schools | Kept for the paid teaser of the hand-checked places. The existing key `p68.q.schools` ("Escolas: {n} a menos de {m} min") still serves if the lead wants 31 on the free card of the 21 hand-checked places |
| 100 | 35 + 61 + 4 | **Not written.** It adds three kinds of school and one weak count |

Flag for the lead: the free line is therefore narrower than the prompt's words (public secondary only). Where a place has one such school or none within 20 minutes (113 places), the line turns into the nearest one and its time ("Escola secundária pública · 4 min"). In 3 places (Corvo, Lajes das Flores, Santa Cruz das Flores) OpenStreetMap holds none on the island under that name: the line says "ainda sem número", not zero, because a school may exist under another name.

## 5. Where the table and the hand-checked sample differ (for the lead to decide; I did not choose)

Times in brackets are unrounded minutes.

| Line | Services table (10 Nov, local OSRM) | Hand-checked sample (3 Nov, public OSRM) | On the card above |
|---|---|---|---|
| Emergency hospital, time | Hospital de Santo António **14** (14.4) | Hospital de Santo António **13** (13.3) | 14 |
| Emergency hospital, the other one | Hospital de São João 14 (14.4) | Hospital de São João 13 (13.4); the brief quotes this one | not shown (Santo António is nearer by 0.1 min in the sample, level in the table) |
| Centro de saúde, name | **Centro de Saúde de São Cosme** (OpenStreetMap's name for the building), 2 (2.4) | **USF Sete Caminhos** (the unit in the ERS register, no. 130273), 2 (2.4) | the table's name; the data engineer advises the hand-checked name for Gondomar |
| Private hospital, name (not a free line) | **Trofa Saúde Fernando Pessoa** (the group's list), 2 (1.8) | **Hospital-Escola Fernando Pessoa** (ERS no. 119118), 2 (1.8) | not shown |
| Private hospitals within 20 min (not a free line) | 8 | 5 | not shown |
| International school, name | Deutsche Schule **zu** Porto, 15 (15.0) | Deutsche Schule Porto (the school's own name), 15 (14.7) | the table's name |
| CLIP | 19 (18.9), 16.9 km | 18 (18.1), 16.7 km | only in the count of 4 |
| Lycée Français, Oporto British School | 17 (17.3), 19 (19.1) | 17 (16.8), 19 (18.7) | only in the count of 4 |
| International schools, count | 4 within 30 min | 4 within 20 min | "4 a menos de 30 min" |
| Schools within 20 min | 35 public secondary, 61 private, 4 international | 31 (27 private + 4 international); the live card prints "Escolas: 7 a menos de 20 min" (the seven it lists) | 35 public secondary (section 4) |
| Beach, name | **Lavadores** (the official bathing-water name), 17 (17.4), 16.5 km, Blue Flag 2026 | **Praia de Lavadores**, 17 (16.9), 16.6 km; no Blue Flag recorded | the table's name and the flag |
| Airport, time | **22** (22.3), 22.3 km | **21** (20.9), 22.3 km | 22 |
| Airport, name | Aeroporto Francisco Sá Carneiro | Aeroporto do Porto / Porto Airport / Aéroport de Porto | the short name, from the deck (`air.n.OPO`) |
| Date checked | 10 Nov 2026 | 3 Nov 2026 | 10 Nov |

Two things follow whichever way he decides:
1. The live card today opens health with "Um hospital a 2 min". That is the private Hospital-Escola Fernando Pessoa. The prompt's free list leads with the public emergency hospital, so the same card will read 14 min (or 13).
2. If the hand-checked numbers stay on the 21 built cards, the foot of those cards must keep the 3 Nov date and the public OSRM server as the method.

## 6. The templates and when each is used

`{t}` is a drive time formatted by `t.min` (under 60), `t.hm` or `t.hr` (60 and over; 498 of the 1,500 or so times on the 308 cards) or `t.lt1` (under one minute; 5 cases). Minutes are whole numbers. "Of 308" is how many cards use the variant today.

| Line | Key | Used when | Of 308 |
|---|---|---|---|
| Heading, sub-label | `h`, `sub` | always | 308 |
| Hospital | `er.k` + `{t}`, `er.d` | `er` at 45 min or less | 259 |
| | `er.d.far` | `er` over 45 min: same line, plus "a basic emergency service may be nearer: our list doesn't hold those yet" | 38 |
| | `er.v.island`, `er.d.island` | `er` null on an island: "noutra ilha", and why there are no minutes | 11 |
| Centro de saúde | `cs.k` + `{t}`, `cs.d` | always (EN and FR explain the term once) | 308 |
| International school | `isch.k` + `{t}`, `isch.d` + `cur.*` | 45 min or less, curriculum known | 64 |
| | `isch.d.nocur` | 45 min or less, curriculum not checked | 41 |
| | `isch.more` | added when 2 or more are within 30 min | 45 |
| | `isch.d.far` | over 45 min: the time is shown as it is, the detail says "the nearest on our list" | 183 |
| | `isch.v.island`, `isch.d.island` | null on an island: "nenhuma na ilha" | 20 |
| Schools | `sch.k`, `sch.v`, `sch.near`, `sch.how` | 2 or more public secondary schools within 20 min | 192 |
| | `sch.k.1` + `{t}`, `sch.near`, `sch.how` | one or none within 20 min: the nearest and its time | 113 |
| | `sch.k.1`, `none.v`, `none.d` | none found by road | 3 |
| Beach | `beach.k` + `{t}`, `beach.d` | sea beach (coastal) leads | 112 |
| | `beach.d.trans` | the nearest sea beach is on a river mouth or lagoon | 36 |
| | `beach.flag.k`, `beach.flag` | the beach shown has a Blue Flag | 87 sea, 56 inland |
| | `beach.flag.other` | the beach shown has none and one with a flag is within 45 min: "{name}, a {t}, tem Bandeira Azul" | 49 |
| | `beach.k.inland`, `beach.d.inland`, `beach.sea` | the sea is over 45 min away and a river or lake beach is nearer: the inland beach leads, then "O mar fica a {t}: {name}." | 160 |
| Airport | `air.k` + `{t}`, `air.d`, `air.n.<IATA>` | always; 14 airport names in three languages | 308 |
| Food | `food.mich.k`, `food.mich.v`, `food.mich.d`, `food.mich.star` | 2 or more listed restaurants within 30 min | 137 |
| | `food.mich.v.1`, `food.mich.d.1`, `food.mich.star.1`, `food.mich.star.only` | exactly one restaurant, or exactly one star | 55 with one restaurant |
| | `food.mkt.k` + `{t}`, `food.mkt.d` | no listed restaurant, a market within 20 min (or Michelin switched off) | 81 (259 if off) |
| | no line | neither | 35 (49 if off) |
| Any line | `none.v`, `none.d` | the value is null and no variant above applies: "ainda sem número", and one honest sentence | |
| Paid teaser | `paid.full` | hand-checked places: counts of the two lists, and "where the official register gives them, the address and the registry number too" | 21 |
| | `paid.list` | every other place, once its paid page shows the table's lists | 287 |
| Foot | `foot` + `from.hall` or `from.center` | 295 town halls; 13 places measured from the centre of the seat town | 308 |
| | `foot.src.mich` or `foot.src` | with or without a Michelin line on that card | 192 / 116 |
| Behind "Fontes" | `src.drive`, `src.health`, `src.schools`, `src.beach`, `src.air`, `src.mich`, `src.osm` | one line per topic, shown only if the card has that line | |

The same cards in English, five-second layer only, to show the variants at work:

**Cascais**: Hospital with ER 7 min; Health center 2 min; International school 3 min; Public secondary schools 29 within 20 min; Beach 2 min; Airport 29 min; Michelin Guide 52 restaurants within 30 min.

**Tavira**: Hospital with ER 33 min; Health center 5 min; International school 3 min; Public secondary school 3 min; Beach 12 min · Blue Flag; Airport 33 min; Michelin Guide 3 restaurants within 30 min.

**Mértola**: Hospital with ER 49 min; Health center 2 min; International school 1 h 13 min; Public secondary school 4 min; River or lake beach 23 min · Blue Flag; Airport 1 h 33 min; Market 1 min.

**Funchal**: Hospital with ER 5 min; Health center 2 min; International school 2 min; Public secondary schools 7 within 20 min; Beach 3 min · Blue Flag; Airport 20 min; Michelin Guide 12 restaurants within 30 min.

**Corvo**: Hospital with ER on another island; Health center 1 min; International school none on the island; Public secondary school no figure yet; Beach 2 min; Airport 2 min.

**Barrancos**: Hospital with ER 1 h 41 min; Health center 1 min; International school 2 h 55 min; Public secondary school 47 min; River or lake beach 59 min · Blue Flag; Airport 3 h 19 min.
## 7. What I wrote so that a weak number stays true

1. **Hospital.** The label is "Hospital com urgência" (a hospital), not "the nearest emergency service", because basic emergency services in health centres are not in the list. Over 45 minutes the detail says so. The unverified nearer hospital the table calls `er_cand` (Hospital Valongo, 10 min, for Gondomar) is not on the card.
2. **Islands.** "The nearest general hospital with an emergency department is on another island, and no road reaches it. So we give no minutes." True for the 11 places where the value is null; it does not say there is no urgent care on the island.
3. **Centro de saúde.** "Centro de saúde público", not "do SNS": Madeira and the Azores have their own regional health services.
4. **Airport.** The detail says "to the passenger terminal" and nothing about flights: the data note says the 14 airports were not checked against a timetable.
5. **Blue Flag.** Only the positive is stated ("has a Blue Flag"). The card never says a beach has none, and never "the nearest Blue Flag beach": 16 of the 396 awarded beaches are not matched to a bathing water yet.
6. **Beach names.** The table's names are the official bathing-water names ("Lavadores", "Rainha (Cascais)", "Azul", "Jardim de Oudinot"). No template puts "Praia de" in front: it would print "Praia de Praia Verde".
7. **International school.** The detail names the curriculum, so "Escola internacional · 15 min" is not read as an English-language school when it is German.
8. **Paid teaser.** The prompt says "addresses and registry numbers". In the Gondomar sample 7 of the 31 schools have an address and 8 of the 11 health rows an ERS number, so the line says "where the official register gives them". For the other 287 places the table has no address and no registry number: `paid.list` promises minutes, type and source only.

## 8. What I left out and why

1. Private hospitals, pharmacies, the train, golf and culture: not on the prompt's free list. No lines written.
2. The private-school count, the market count, restaurant density, the nearest restaurant's name, `er_cand`: section 3, 4 and 7.
3. A separate "no international school within 45 minutes" value. The exact time ("1 h 13 min") says it, and the policy asks for what is, not what is missing. The detail changes instead.
4. An edition-aware school line (the nearest school teaching in the reader's language: Lycée Français at 17 min for a reader in France, CLIP at 19 min for one in the USA). The table has the language of each school but the summary only carries the nearest overall. Worth doing next; one more template.
5. Any sentence about quality, safety or what to choose.

## 9. What the wiring needs (for the art director and the data engineer)

1. Two values the lines use are in `access/` but not in `summary.json`: the nearest public secondary school (name, minutes) and the nearest market (name, minutes).
2. A display name for the origin: `origins.csv` holds "Câmara Municipal de Gondomar, Praça Manuel Guedes" and "Vila do Corvo (centre of the seat town)"; the foot wants "Câmara Municipal de Gondomar" and "Vila do Corvo".
3. `{date}` in each language's form (10 de novembro de 2026; November 10, 2026; 10 novembre 2026). In French `t.hm` wants two digits ("1 h 05").
4. `cur` is a list: join with "e", "and", "et" if a school ever has two.
5. The proposed rule for the beach line (sea first when it is within 45 minutes, otherwise the nearer inland beach) is mine; 45 is the ranking engine's zero point. Alenquer, Almodôvar and Azambuja have the sea at 46 to 55 minutes and no nearer inland beach: the sea line stays.
6. Signal (DESIGN_AND_DATA): opening a detail is one event, with the line's key and the place. It tells us which service each reader checks first.

## 10. Housekeeping

1. Live card read with headless Playwright (iPhone 13 and 1440 wide), analytics blocked and the request API mocked; screenshots in the scratch folder, not in the repo.
2. `site/node_modules` in this folder was a dead link when I started (it pointed at a folder that no longer exists); I used the machine's global Playwright and changed nothing. It has since been relinked.
3. Commits on p81-look carry no person's and no model's name. Commit a01172f (the UX audit, merged from p81) carries a model name in its trailer, against rule 1 of the brief; it is not mine to rewrite.
