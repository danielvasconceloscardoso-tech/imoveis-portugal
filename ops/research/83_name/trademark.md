# Prompt 83, agent 3: trademark and handle check of the 15 shortlisted "Maré" names

Date: 12 Nov 2026. Requests ran between 13:13 and 13:19 UTC. Research only: nothing was bought, registered or created; no account was made, no login was used, no form was filled and no bot check was bypassed.

**This is a first screen from public sources. It is not a legal clearance. The register searches in section 1 decide.**

## What was requested, and what was not

1. **No government, trademark office or register site was requested, not even a home page.** That covers EUIPO, TMview, WIPO, the INPI offices of Portugal, France and Brazil, USPTO, UKIPO, the Swiss office and BOIP. Their addresses appear below for the operator only.
2. **No trademark aggregator was opened either** (the sites that copy the registers). Web searches sometimes listed such pages, and pages of a UK official journal; none was opened. Where a search snippet said something about a mark, it is quoted as "search snippet, not verified in the register".
3. **Web search:** 39 queries through a normal web search engine.
4. **Pages opened: 54 HTTPS GET requests in all**, logged out, with redirects followed.

| Host | Requests | Purpose |
|---|---|---|
| tiktok.com | 11 | 2 method tests, 9 handles |
| x.com | 11 | 2 method tests, 9 handles |
| instagram.com | 2 | 2 method tests, then stopped (login wall) |
| linkedin.com | 2 | 2 method tests, then stopped (bot check) |
| redesdamare.org.br | 2 | two different pages |
| marejournal.com | 2 | one test, one read |
| One request each: mare.de, marecheia.com, ilmare.com, maree.info, joseavillez.pt, hotelmare.pt, portomare.portobay.com, mutuapescadores.pt, mare-centre.pt, echoboomer.pt, economicnewsbrasil.com.br, entremares.es, restaurantonline.co.uk, marereport.namma.org, mareonline.it, maredicarta.com, maremagnum.com, archive.org | 18 | brand pages; archive.org was one call to the Wayback "is there a snapshot" address |
| One request each, no usable answer: amare.com (bot check), amarehotels.com (bot check), guide.michelin.com (empty answer), grandesnomesdapropaganda.com.br (bot check), mareonline.com.br (gateway error), museudamare.org.br (certificate error) | 6 | left alone, not retried |

Five earlier attempts through a page-reading helper failed before reaching any site (name resolution, or refused for the Wayback Machine). mare-centre.pt is the public site of a university research centre, not a register.

---

## 1. Searches for the operator to run by hand

Time needed: about 20 minutes if the order below is followed. The bare word comes first because it decides most of the list.

### 1.1 Procedure in TMview (once)

Address: https://www.tmdn.org/tmview/ (free, no account needed). Field names below are from memory and may differ slightly; pick the nearest.

1. Open "Advanced search".
2. **Territories or offices:** tick EUIPO (EM), Portugal (PT), France (FR), Benelux (BX), Switzerland (CH), United Kingdom (GB), Brazil (BR), United States (US). Also tick WIPO (WO): international marks that name these countries are listed there.
3. **Trade mark name:** type one term from the tables below. Type it once without the accent and once with it (MARE, then MARÉ): some offices store the accent.
4. **Nice class:** 16, 35, 36, 41 (why these: see 1.2).
5. **Status:** keep "Filed" and "Registered". Untick "Expired", "Ended", "Refused", "Withdrawn".
6. Run the search. Sort by trade mark name. Read the first two pages.
7. For each hit that worries you (see 1.4), note: name, office, number, classes, status, owner. Use the export button if there is one.
8. Change the term and run again. Keep the territories, classes and status as they are.
9. If one of the eight territories is not in TMview's list, use that office's own search (addresses in 1.5).

### 1.2 Classes, and why

| Class | What it covers for us | Use it for |
|---|---|---|
| 41 | Publishing, newsletters, online publications, events | Every search |
| 35 | Advertising, sponsor packages, business services | Every search |
| 36 | Real estate affairs (the property map, the concierge that passes buyers to the agency) | Every search |
| 16 | Printed matter. Added because of the printed anthology "Maré, Volume I", and because an existing magazine called "mare" would sit here | Every search |
| 9 | Downloadable publications (paid guides as files) | Bare word only (round 1) |
| 39 | Travel arrangement and tourism information | Bare word, and names 1, 2, 5 |
| 43 | Hotels and restaurants. A hotel mark does not block a newsletter, but several hotels and restaurants already use the word; the search shows how crowded it is | Bare word, and names 2, 5, 7 |

### 1.3 The searches, in four rounds

**Round 1: the bare word (5 minutes). Do this first.**

| Term | Match option | Classes | What to look for |
|---|---|---|---|
| `MARE` | exact ("is") | 16, 35, 36, 41, then 9, 39, 43 | A live word mark that is only MARE |
| `MARÉ` | exact | same | Same, in Portugal, Brazil and at EUIPO |
| `MAREE`, `MARÉE` | exact | 16, 35, 41 | French "tide"; sounds the same as Maré in French |
| `MARES`, `MARÉS` | exact | 16, 35, 41 | The plural; a festival and a magazine in Portugal use it |
| `MAREA` | exact | 16, 35, 41 | Spanish and Italian neighbour, one letter away |

**Round 2: one wide search that covers ten names (5 minutes).**

Ten of the 15 names start with "mare". Search `MARE*` (the star means "anything after"; or choose "begins with" and type MARE) in class 41, then 16, then 35, then 36. Sort by name and scan for the ten names in the table and for any mark made of MARE plus a press word (journal, letter, news, magazine, media, post, gazette, notes, brief). If a class returns more than about 300 hits, skip the wide search for that class and use the exact terms in the table.

**Round 3: the 15 names (8 minutes).** Territories: all eight plus WIPO, every time. Classes: 16, 35, 36, 41 unless the row adds one.

| # | Name | Exact terms to type (one search each) | "Contains" or wildcard term | Similar names to look for in the results | Extra classes |
|---|---|---|---|---|---|
| 1 | maredeportugal | `MARE DE PORTUGAL`, `MAREDEPORTUGAL`, `MARÉ DE PORTUGAL` | covered by round 2 | MAR DE PORTUGAL, MARES DE PORTUGAL, MAREA PORTUGAL | 39 |
| 2 | portugalmare | `PORTUGAL MARE`, `PORTUGALMARE`, `PORTUGAL MARÉ` | `PORTUGAL MAR*` | PORTO MARE, PORTUGAL MAR, PORTUGAL MARES | 39, 43 |
| 3 | readmare | `READMARE`, `READ MARE` | `*MARE` in 16 and 41 only | REDMARE, RED MARE | 9 |
| 4 | mareletter | `MARELETTER`, `MARE LETTER` | covered by round 2 | MARE LETTRE, MARE NEWSLETTER, MARE JOURNAL | 9 |
| 5 | entremare | `ENTREMARE`, `ENTRE MARE`, `ENTREMARES`, `ENTRE MARÉS` | `ENTREMAR*` | ENTREMARES, ENTRE MARES, ENTREMAR, ENTRE MERS | 39, 43 |
| 6 | marevolume | `MAREVOLUME`, `MARE VOLUME` | covered by round 2 | MARE VOL, MARE BOOKS, MARE EDITIONS | none |
| 7 | amareportugal | `AMAREPORTUGAL`, `AMARE PORTUGAL`, `AMARE`, `AMARÉ` | `AMARE*` | AMARE, AMARÉ, AMÀRE, AMAR PORTUGAL, AMARE GLOBAL | 43 |
| 8 | sigamare | `SIGAMARE`, `SIGA MARE`, `SIGA A MARÉ` | `SIGA MAR*` | SIGAMAR, SIGA O MAR | 25 (one look: a beachwear shop uses the name) |
| 9 | marebrief | `MAREBRIEF`, `MARE BRIEF` | covered by round 2 | MARE BRIEFING, MARE NEWS | none |
| 10 | marenotes | `MARENOTES`, `MARE NOTES` | covered by round 2 | MARENOTE, MARE NOTAS | none |
| 11 | mareportuguesa | `MARE PORTUGUESA`, `MAREPORTUGUESA`, `MARÉ PORTUGUESA` | covered by round 2 | MAR PORTUGUÊS, MAR PORTUGUESA | none |
| 12 | mareoeste | `MAREOESTE`, `MARE OESTE`, `MARÉ OESTE` | covered by round 2 | MAR OESTE, MAR DO OESTE | none |
| 13 | marelitoral | `MARELITORAL`, `MARE LITORAL`, `MARÉ LITORAL` | covered by round 2 | MAR LITORAL, LITORAL MAR | none |
| 14 | maregazette | `MAREGAZETTE`, `MARE GAZETTE` | covered by round 2 | MARE GAZETA, GAZETA DA MARÉ, MARE JOURNAL | none |
| 15 | marecarta | `MARECARTA`, `MARE CARTA` | covered by round 2 | MARE DI CARTA, CARTA DE MARÉS | none |

If TMview offers a "fuzzy" or "similar" option, tick it for the exact terms of names 3, 4, 5 and 7 only; on the bare word it returns too much.

**Round 4: INPI Portugal (2 minutes).**

Address as I know it: https://servicosonline.inpi.pt/pesquisas/main/marcas.jsp?lang=PT. I did not open it, so I cannot say it is current. If it fails, start from https://inpi.justica.gov.pt/ and follow "Pesquisas", then "Marcas".

1. In the text-of-the-mark field type `MARÉ`, choose "contains" if offered, and search. Repeat with `MARE` and `MARÉS`.
2. If a class filter exists, use 16, 35, 36, 41. If not, read the class column in the results.
3. Then the exact terms of the names still in the running after rounds 1 to 3.
4. Portuguese status words: "Concedido" or "Registado" (granted) and "Em exame" or "Publicado" (pending) count. "Recusado", "Caducado", "Desistência" and "Anulado" do not.

### 1.4 How to read the results

**Should worry you.** All four together:
1. The mark is the same word or nearly the same (MARE, MARÉ, MARÉE, MARES alone; or one of the 15 names; or MARE plus a plain word such as magazine, media, journal, news).
2. It is a word mark, or a logo in which that word is the main thing you read.
3. It is live: filed or registered.
4. It sits in class 16, 35, 36 or 41, and in a territory we publish in. An EUIPO mark counts for Portugal, France and Luxembourg at once.

Four owners to look for by name, because section 2 found them in our sectors: the German publisher of the magazine "mare"; the promoter or sponsor of the festival "MEO Marés" (earlier "Marés Vivas"); a Brazilian developer with "Maré" in class 36 or 37; "MAREJ" or "Mid Atlantic Real Estate Journal" in the US.

**Should not worry you.**
1. Dead marks: expired, refused, withdrawn, cancelled.
2. Logos where "mare" only describes the sea, mostly Italian owners (seafood, beachwear, boats, hotels by the sea).
3. Unrelated classes: 3 (cosmetics), 5 (supplements), 12 (boats), 25 (clothing), 29 to 33 (food and drink), 44 (medical).
4. Long names where MARE is a small part (MARE NOSTRUM, COSTA DEL MARE, FRUTTI DI MARE).
5. National marks in a country we do not publish in (Italy, Spain, Germany), unless the same owner also holds an EUIPO mark.

A long list of small MARE marks is not bad news in itself. It shows the word is weak: nobody can stop everyone else, and we could not either.

### 1.5 Other official search pages (backup only; addresses from memory, none opened)

| Territory | Address |
|---|---|
| EU | https://euipo.europa.eu/eSearch/ |
| World (international marks) | https://branddb.wipo.int/ |
| France | https://data.inpi.fr/ |
| Benelux (Luxembourg) | https://www.boip.int/en/trademarks-register |
| Switzerland | https://www.swissreg.ch/ |
| United Kingdom | https://www.gov.uk/search-for-trademark |
| Brazil | https://busca.inpi.gov.br/pePI/ |
| United States | https://tmsearch.uspto.gov/ |

### 1.6 What search snippets said about the registers

Search snippets, not verified in the register: a web search for MARE marks listed only records in other fields (a US application for wines in class 33, a US application for medical services in class 44, an EU registration "FIART MARE" of 2019). No snippet showed a MARE or MARÉ mark in class 16, 35, 36 or 41, and none showed a mark of the German magazine. That proves nothing either way.

---

## 2. Existing brands called Maré or close to it

"Opened" means the page was read once. "Search result" means only the address and snippet in a web search were seen. Closeness: **close** = same sector and one of our markets; **middle** = same sector in another market, or a neighbouring sector in our market; **far** = same word, unrelated sector.

| # | Brand | Country | Sector | Address seen | What it is | How close |
|---|---|---|---|---|---|---|
| 1 | mare (mareverlag) | Germany | Magazine, books, TV and podcast | https://www.mare.de/ (opened) | Publisher of the sea magazine "mare", with books, calendars and a shop. A search result (monocle.com) says the magazine dates from 1997 and is in German only | **Middle to close.** The bare word, used for a magazine and books. Germany is not our market, but an EU mark would cover Portugal, France and Luxembourg. Check first |
| 2 | MEO Marés (until 2026 "MEO Marés Vivas") | Portugal | Events | https://echoboomer.pt/meo-mares-vivas-muda-para-matosinhos/ (opened); new name in a search result on the same site | Large summer music festival, moved from Gaia to Matosinhos in 2026; a search result gives about 120,000 visitors in 2025 | **Middle.** Class 41, Portugal, a telecom sponsor behind it; the new short name is one letter from ours |
| 3 | Maré Viva (newspaper) | Portugal (Espinho) | Press | Search result only (issues hosted by the town library; not opened) | Regional weekly owned by a cultural cooperative; issues listed up to May 2026 | **Middle.** Press in Portugal, but a two-word title and local |
| 4 | Marés (magazine of Mútua dos Pescadores) | Portugal | Member magazine | https://www.mutuapescadores.pt/ (opened; menu link "revista-mares") | Free magazine of a fishermen's insurance cooperative, on the sea and the social economy (search result) | Middle to far |
| 5 | MARE, Marine and Environmental Sciences Centre | Portugal | Research | https://mare-centre.pt/en/ (opened; maintenance page with the name) | University research centre | Far. Shows the acronym is known in Portugal |
| 6 | Maré (restaurant, José Avillez group) | Portugal (Cascais) | Restaurant | https://www.joseavillez.pt/en/restaurants/mare-cascais/ (opened) | Seafood restaurant at Guincho | Far in class; but it is what Portuguese lifestyle readers and search engines already call "Maré" |
| 7 | Hotel Maré | Portugal (Nazaré) | Hotel | https://hotelmare.pt/ (opened) | Hotel in the centre of Nazaré | Far to middle (hospitality) |
| 8 | Vila Porto Mare (PortoBay) | Portugal (Madeira) | Resort | https://portomare.portobay.com/en/ (opened) | Resort in Funchal | Far. Matters only for "portugalmare" (sounds like "Porto Mare") |
| 9 | Maré de Notícias | Brazil (Rio) | Press | https://www.redesdamare.org.br/br/info/66/mare-de-noticias (opened) | Community newspaper founded in 2009 by Redes da Maré | **Middle.** Press in Brazil; here "Maré" is the place name |
| 10 | Redes da Maré | Brazil (Rio) | Civil society, culture | https://www.redesdamare.org.br/en/quemsomos/sobre (opened) | Large organisation of the Maré favela complex, with publications and campaigns | Far in sector. In Brazil it owns the first meaning of "Maré". The Museu da Maré site did not answer, so it is not confirmed here |
| 11 | Maré (beach line of Grupo Marquise) | Brazil (Ceará) | Real estate | https://economicnewsbrasil.com.br/2025/12/19/grupo-marquise-lanca-linha-mare/ (opened) | A developer's new product line called "Maré"; first project "Maré Porto das Dunas", launched December 2025 | **Close.** Real estate in Brazil under the bare word |
| 12 | Other "Maré" developments | Brazil | Real estate | Search results only (myside.com.br, apto.vc) | "Maré" in Penha (Santa Catarina); "Maré Mansa" in Tamandaré (Pernambuco) | Middle. Shows the word is common for Brazilian seaside property |
| 13 | Maré Cheia, Consultoria & Marketing | Brazil (probable: Brazilian wording, no address on the page) | Marketing consultancy | https://www.marecheia.com/ (opened) | Small consultancy for branding and communication | Middle to far. Class 35, two-word name |
| 14 | Maré Comunicação | Brazil | Advertising agency | Search result only (page behind a bot check) | Agency named on a Brazilian advertising news site | Middle. Not confirmed beyond the snippet |
| 15 | Mid Atlantic Real Estate Journal ("MAREJ", marejournal.com) | United States | Real-estate trade press | https://www.marejournal.com/ (opened) | Commercial real-estate newspaper with a digital edition, a media kit and conferences | **Close for names 4, 9, 10, 14** (mare plus a press word): real estate, media and advertising in the US. It trades as "MAREJ", not as "Mare" |
| 16 | The MARE Report | North America | Trade magazine | https://marereport.namma.org/ (opened) | Magazine and blog for seafarers' welfare workers | Far to middle |
| 17 | Amare Global | United States, many countries | Wellness products, direct selling | amare.com answered with a bot check; identity from search results (utahbusiness.com, biospace.com) | Supplements company that says it works in over 50 countries | Far. Matters only for "amareportugal" |
| 18 | Amàre Beach Hotels | Spain | Hotels | amarehotels.com answered with a bot check; identity from a search result (fuerte-group.com) | Adults-only beach hotels in Marbella, Ibiza and Sancti Petri | Far. Matters only for "amareportugal" |
| 19 | Hotel & Spa Entremares | Spain (La Manga) | Hotel | https://www.entremares.es/ (opened) | Four-star beach hotel | Middle for "entremare" only. Confirms the namer's "unsure" note |
| 20 | Maré by Rafael Cagali | United Kingdom (Hove) | Restaurant | https://www.restaurantonline.co.uk/Article/2025/09/26/da-terra-chef-rafael-cagali-on-his-new-hove-restaurant-mare (opened) | Restaurant opened in 2025 as "Marea", renamed "Maré" "to avoid confusion with another business" | Far. Useful warning: names in this family already collide |
| 21 | maree.info (maree.com redirects to it) | France | Tide tables | https://maree.info/ (opened) | Tide times for French ports | Far. Owns the French word in search |
| 22 | Il Mare (bookshop) and "Il Mare Magazine" | Italy (Rome) | Books, charts | https://www.ilmare.com/ (opened) | Nautical bookshop since 1975; maremagazine.com shows this site | Far |
| 23 | Mareonline | Italy | Online magazine | https://www.mareonline.it/ (opened) | Sea, boating and travel magazine | Far |
| 24 | Mare di Carta | Italy (Venice) | Bookshop and publisher | https://maredicarta.com/ (opened) | Nautical bookshop and publishing house | Middle for "marecarta" only |
| 25 | Maremagnum | Italy | Rare-book marketplace | https://www.maremagnum.com/ (opened: security page; name and description read from the page header) | Online marketplace for old and rare books | Far |

Leads that gave nothing:
1. **mareportugal.com** (the lapsed site): no trace in web search, and the Wayback Machine answered that it holds no snapshot. What it was is not known.
2. **A newsletter called "Maré"**: none found on Substack or beehiiv in search results. Search results list only other titles ("maré mansa", "Mare Ignis", "mare novum", a "MARE" at another address). None was opened.
3. **France, Switzerland, Luxembourg:** no media, property or travel brand called Maré or Marée came up in search, apart from maree.info.
4. **"La Marée", "Mare Nostrum":** searches returned no media or travel brand to confirm. "Mare Nostrum" is a common phrase with many users.
5. **Lusa (news agency) and Portugália:** they concern names that are not on the shortlist (marelusa, lusamare, mareportugalia). Not checked.
6. **Other uses seen in search results only, all far:** a digital culture magazine "Maré Alta" in Fortaleza; an ocean podcast "MARÉ" in Portugal; a book and record "Maré" from Nazaré; an online shop "Maré Atelier" in Barcelos; tide apps called "Marés".
7. The namer's "Amaré brand" was not identified. The two Amare brands found are rows 17 and 18.

---

## 3. Handles

Checked at 13:15 to 13:17 UTC, logged out, one request per handle and network, at least 3 seconds apart per network.

**Method test first** (one profile that surely exists, one random string):

| Network | Test result | Decision |
|---|---|---|
| X | Existing profile: page with the account name, HTTP 200. Random string: "This account doesn't exist", HTTP 404 | Reliable. Checked |
| TikTok | Existing profile: page data holds the user record. Random string: page data holds an error code and no user | Reliable. Checked |
| Instagram | Both answers redirect to the same login page | **To check by hand.** No further request made |
| LinkedIn | Both answers are the same bot-check page (HTTP 403) | **To check by hand.** No further request made |

**Results:**

| Handle | Instagram | TikTok | LinkedIn company | X |
|---|---|---|---|---|
| mare | to check by hand | **taken** (account with no bio and no videos, about 25,500 followers) | to check by hand | **taken** (a personal account) |
| maredeportugal | to check by hand | not found | to check by hand | not found |
| portugalmare | to check by hand | not found | to check by hand | not found |
| readmare | to check by hand | not found | to check by hand | not found |
| mareletter | to check by hand | not found | to check by hand | not found |
| entremare | to check by hand | **taken** ("EntreMarés", bio "Pesca & Lazer", 170 followers, 12 videos) | to check by hand | **taken** (protected account, joined June 2024, 3 posts) |
| marevolume | to check by hand | not found | to check by hand | not found |
| amareportugal | to check by hand | not found | to check by hand | not found |
| sigamare | to check by hand; probably taken (see TikTok) | **taken** (online beachwear shop, no followers, no videos; its bio sends people to its Instagram) | to check by hand | not found |

Limits:
1. "Not found" is not "free". A banned, deleted or reserved handle can look the same. Only the network's own sign-up screen on the day decides. No sign-up form was tried.
2. The bare handle `mare` is gone on the two networks that could be read, and is almost certainly gone on the other two. The brand will need a longer handle whatever domain is chosen, so the handle should match the domain.

**To check by hand (18 addresses):** for each of the nine handles above, open `https://www.instagram.com/<handle>/` and `https://www.linkedin.com/company/<handle>/` in a normal browser. On Instagram a missing profile says "Sorry, this page isn't available". On LinkedIn a missing page says the page does not exist or sends you to a search.

---

## 4. Risk rating of the 15 names

**The point that applies to every name.** "Maré" and "mare" are common words with many users: a German magazine and book publisher, a Portuguese festival, a Portuguese newspaper and a magazine, a Brazilian newspaper, a Brazilian property line, hotels and restaurants in Portugal and the UK, a US real-estate paper that uses the letters. So:
1. Nobody found owns the word across our sectors and markets.
2. The word alone will be hard to protect, and weak if registered.
3. Used alone as a masthead ("Maré"), the brand carries a **medium** risk until round 1 of section 1 is done. The two results that would change this are a live EU or Portuguese word mark MARE or MARÉ in class 16 or 41 (the German publisher, the festival). The Brazilian property line matters for class 36 in Brazil.
4. A plain format word (letter, brief, notes, gazette, volume, read) adds nothing in trademark terms. Such a name is judged as "MARE" for publications. Those six names therefore share the bare word's rating and move together after round 1.
5. A name that forms a Portuguese phrase is judged more as a whole, and no user of any of those phrases was found.

| # | Name | Risk | Reason in one line |
|---|---|---|---|
| 1 | maredeportugal | **Low** | No user found anywhere; reads as a whole phrase; handles not found on TikTok and X |
| 2 | portugalmare | **Low** | No user found; only neighbour is the resort "Porto Mare" in Madeira (hotel class) |
| 3 | readmare | **Medium** | "Read" is descriptive, so this is the bare word for a publication; depends on round 1 (German magazine "mare") |
| 4 | mareletter | **Medium** | Bare word plus a descriptive word; also the same build as "MARE Journal", a US real-estate paper |
| 5 | entremare | **Medium** | One letter from "Entremares", a Spanish hotel; TikTok and X handles already taken by others |
| 6 | marevolume | **Medium** | Bare word plus a descriptive word for a book; no user of the full name found |
| 7 | amareportugal | **Medium** | Reads "Amare Portugal", like the local branch of Amare Global (US, 50+ countries) or of the Amàre hotels (Spain) |
| 8 | sigamare | **Low** | Only user found is a small beachwear shop (unrelated sector); but the TikTok handle is taken and Instagram probably is |
| 9 | marebrief | **Medium** | Bare word plus a descriptive press word; same build as "MARE Journal" in the US |
| 10 | marenotes | **Medium** | Same as 9 |
| 11 | mareportuguesa | **Low** | No user found; whole Portuguese phrase |
| 12 | mareoeste | **Low** | No user found; whole Portuguese phrase |
| 13 | marelitoral | **Low** | No user found; whole Portuguese phrase |
| 14 | maregazette | **Medium** | "Gazette" and "journal" mean the same; closest of all to "MARE Journal" (US real-estate press), and bare word plus press word |
| 15 | marecarta | **Medium** | Close to "Mare di Carta", a Venice bookshop and publisher (same sector, EU) |

No name is rated high: no identical or near-identical name was found in use in media, real estate or travel in one of our markets. That is a statement about public web sources only. One live register entry can move any row to high.

Reading the table with the namer's order: the two best-ranked free names (maredeportugal, portugalmare) are also the two with the least found against them.

---

## What I could not check

1. **Every trademark register.** None was opened, by rule. Section 4 is therefore a screen of names in use, not of names registered. A mark can be registered and unused, and invisible to a web search.
2. **Whether the German magazine, the Portuguese festival or the Brazilian developer hold marks**, in which classes and territories. This is the main open question; round 1 answers it.
3. **Instagram and LinkedIn**, for all nine handles (login wall and bot check).
4. **Whether a "not found" handle can really be registered** on TikTok and X.
5. **What mareportugal.com was.** No search trace and no archive snapshot.
6. **Six pages that did not give a usable answer** (listed at the top). For Amare Global, the Amàre hotels and Maré Comunicação the row rests on search results; the Museu da Maré and the Maré de Notícias site are not confirmed from their own pages.
7. **Company registers and unregistered rights** (trade names, titles of periodicals registered with a press regulator). In Portugal a periodical title is registered with the media regulator; a title search there is worth one question to whoever files the publication.
8. **Facebook, YouTube, Threads, Bluesky and Substack or beehiiv addresses.** Not in the brief; not requested.
9. **Countries outside the brief** (Spain, Italy and Germany were looked at through web search only; Israel not at all).
10. **Exact field names in TMview and at INPI Portugal.** Written from memory, since neither site was opened.
