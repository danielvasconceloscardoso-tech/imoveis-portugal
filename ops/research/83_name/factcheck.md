# Prompt 83, agent 4: independent fact-check of the "Maré" name search

Date: 12 Nov 2026. My requests ran between 13:30 and 13:34 UTC. Research only: nothing was bought, registered or created; no account, login or form; no bot check was bypassed.

## Every host I requested, and how many times

| Host | Requests | Time (UTC) | Purpose |
|---|---|---|---|
| rdap.verisign.com (the .com registry's public RDAP service, named in the prompt) | 20 | 13:30:16 to 13:30:56 | Section A; 2 seconds apart; no retry needed |
| cloudflare-dns.com (public DNS over HTTPS) | 6 | 13:31:05 to 13:31:15 | Section D |
| mareportugal.com | 1 | 13:31:36 | Section E |
| www.mare.de | 1 | 13:31:47 | Section F |
| echoboomer.pt | 1 | 13:31:51 | Section F |
| economicnewsbrasil.com.br | 1 | 13:31:54 | Section F |
| www.marejournal.com | 1 | 13:31:56 | Section F |
| www.entremares.es | 1 | 13:32:00 | Section F |
| maredicarta.com | 1 | 13:32:04 | Section F |
| x.com | 3 | 13:33:10, 13:33:21, 13:33:31 | Section G |
| www.tiktok.com | 3 | 13:33:16, 13:33:26, 13:33:35 | Sections G and F |
| A normal web search engine | 3 queries | 13:32 | Section F (festival rename; Amare Global; the German magazine) |

Total: 39 HTTPS GET requests and 3 web searches. All with a plain client name (`name-recheck/1.0`), logged out. No government, trademark office, register, aggregator, registrar or marketplace site was requested. The .pt registry was not requested; the two public resolvers did ordinary DNS resolution. One of my searches listed result links on a German federal agency's library and on university repositories; none was opened.

Sources I read without any request: the three notes, `candidates.txt`, `rdap_results.csv`, every script and saved page of the two checkers, and the session's command record (every command, search and page request the three agents made, with times).

---

## A. Availability, second request

Draw: seed 8304; generator `random.Random(8304)`; first `sample(the 40 "probably free" rows in CSV order, 10)`, then `sample(the 40 "taken" rows in CSV order, 5)`. None of the five names likely to top the report came up in the draw, so all five were added, giving 20 names. One request each, own loop, not the checker's script.

| # | Name | In sample because | CSV says | Second request (UTC) | HTTP | Registrar and creation date at second request | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | vivemare.com | draw, free | probably free | 13:30:16 | 404 | | CONFIRMED |
| 2 | mareoeste.com | draw, free | probably free | 13:30:18 | 404 | | CONFIRMED |
| 3 | marept.com | draw, free | probably free | 13:30:20 | 404 | | CONFIRMED |
| 4 | meetmare.com | draw, free | probably free | 13:30:22 | 404 | | CONFIRMED |
| 5 | marelitoral.com | draw, free | probably free | 13:30:24 | 404 | | CONFIRMED |
| 6 | amareportugal.com | draw, free | probably free | 13:30:26 | 404 | | CONFIRMED |
| 7 | marebrief.com | draw, free | probably free | 13:30:28 | 404 | | CONFIRMED |
| 8 | mareoceano.com | draw, free | probably free | 13:30:31 | 404 | | CONFIRMED |
| 9 | mareweekly.com | draw, free | probably free | 13:30:33 | 404 | | CONFIRMED |
| 10 | marevolume.com | draw, free | probably free | 13:30:35 | 404 | | CONFIRMED |
| 11 | openmare.com | draw, taken | GoDaddy.com, LLC; 2026-03-25 | 13:30:37 | 200 | GoDaddy.com, LLC; 2026-03-25; expires 2027-03-25 | CONFIRMED |
| 12 | maremundo.com | draw, taken | TurnCommerce, Inc. DBA NameBright.com; 2019-04-21 | 13:30:39 | 200 | same; 2019-04-21; expires 2027-04-21 | CONFIRMED |
| 13 | amare.com | draw, taken | GoDaddy.com, LLC; 1997-12-04 | 13:30:41 | 200 | same; 1997-12-04; expires 2026-12-03 | CONFIRMED |
| 14 | marenova.com | draw, taken | GoDaddy.com, LLC; 2012-05-20 | 13:30:43 | 200 | same; 2012-05-20; expires 2027-05-20 | CONFIRMED |
| 15 | voltamare.com | draw, taken | united-domains GmbH; 2025-11-21 | 13:30:45 | 200 | same; 2025-11-21; expires 2026-11-21 | CONFIRMED |
| 16 | maredeportugal.com | likely top 5 | probably free | 13:30:48 | 404 | | CONFIRMED |
| 17 | portugalmare.com | likely top 5 | probably free | 13:30:50 | 404 | | CONFIRMED |
| 18 | readmare.com | likely top 5 | probably free | 13:30:52 | 404 | | CONFIRMED |
| 19 | mareletter.com | likely top 5 | probably free | 13:30:54 | 404 | | CONFIRMED |
| 20 | entremare.com | likely top 5 | probably free | 13:30:56 | 404 | | CONFIRMED |

A 404 still means "probably free" only: a premium or reserved name does not show in RDAP.

---

## B. The names obey the prompt's rules

### B1. Rules checked on all 80

| Rule | What I computed | Verdict |
|---|---|---|
| 80 names, no duplicate, same set in `namer.md`, `candidates.txt` and the CSV | 80 unique; the three sets are equal; ranks 1 to 80 with no tie | CONFIRMED |
| Built on "mare" | All 80 contain "mare" | CONFIRMED |
| 14 characters or fewer; stated length is right | Longest is 14 (7 names); every stated length matches | CONFIRMED |
| No hyphen, no digit | All 80 are a to z only | CONFIRMED |
| Does not resemble Farol | No name contains farol, faro, phare, beacon, light, luz or a lamp word. "marevolume" contains the letters "lume" by accident; it is not a light word | CONFIRMED |
| Easy to say and spell in Portuguese, French and English | CORRECTED. By the namer's own risk notes, 20 of the 80 work in one language only or are an unknown word in another ("English only", "French only", "only parses in Portuguese", "unknown word in French and English"). The namer ranked these lower instead of leaving them out. Four of them are on the shortlist of 15: readmare, mareletter, mareoeste, marecarta. A fifth, sigamare, is Portuguese only by its own "why" | CORRECTED |

### B2. The 15 shortlisted names, read aloud in Portuguese, French and English

The namer's four base risks (horse and "nightmare" in English; pond and "marre" in French; the Maré favela complex and "maré de azar" in Brazil; the lost accent) are stated once for all names. I checked that they are stated; they are. Below, only what the row adds or misses.

| # | Name | Reading | Verdict |
|---|---|---|---|
| 1 | maredeportugal | Portuguese: natural. French: read as "mare de Portugal" (pond), the reading the namer wrote only against mareduportugal; covered by base risk 2. Dictated, "de" slips to "do" or "du", which the row states. No bad meaning | CONFIRMED |
| 2 | portugalmare | Easy to spell in all three. English horse reading is stated. Said aloud it is close to "Porto Mare" and "Portugal Mar" | CONFIRMED |
| 3 | readmare | The row says "English only", so the three-language rule is not met. Missing: in English "read" is said two ways, so by ear it is "red mare" or "reed mare"; and "-mare" after a verb follows the pattern of "nightmare" (a "read-mare" is a bad read). Portuguese and French readers cannot say it as written | CORRECTED |
| 4 | mareletter | The row itself says it is not a Portuguese or French word and has a double "t". Nothing missing; no bad meaning beyond the base risks | CONFIRMED |
| 5 | entremare | The claim rests on "entre marés", which is plural. The singular is not a Portuguese phrase, so a person who hears the line types "entremares", the Spanish hotel's spelling. French reads "entre mare" (between pond). English types "enter". "Easy to say and spell" does not hold in any of the three | CORRECTED |
| 6 | marevolume | Same word in all three languages; easy to spell; no bad meaning | CONFIRMED |
| 7 | amareportugal | The row states the three ways to split it and the Italian meanings. English also reads "a mare Portugal". Nothing wrong in the namer's reasoning | CONFIRMED |
| 8 | sigamare | The phrase is "siga a maré"; the domain drops the "a", so the spoken line gives "sigaamare". It means nothing in French or English, which the row does not say ("works in Portugal and Brazil" only). The "sigma" slip is stated | CORRECTED |
| 9 | marebrief | Sayable in all three ("brief" is used in French and Portuguese business talk); "ie" may be typed "ei". Underwear reading is stated | CONFIRMED |
| 10 | marenotes | Fine in French and English; the row says Portuguese uses "notas" | CONFIRMED |
| 11 | mareportuguesa | Correct Portuguese; the row states the 14 characters and the hard "guesa" | CONFIRMED |
| 12 | mareoeste | The name begins with "mareo". The namer's own list of ruled-out words has "mareo" as a seasick word (Spanish "mareo este" reads "this dizziness"). The row does not carry that. It does say the word is unknown in French and English | CORRECTED |
| 13 | marelitoral | "Close in all three languages" hides a spelling trap: French and English write "littoral" with two "t", so those readers type "marelittoral" | CORRECTED |
| 14 | maregazette | The row states "z", the double "t" and Portuguese "gazeta". Nothing missing | CONFIRMED |
| 15 | marecarta | The row states it is unknown in English and that French says "carte". No bad meaning found | CONFIRMED |

---

## C. The shortlist is the namer's order among the free names

| Claim | Recomputed from `namer.md` ranks and `rdap_results.csv` | Verdict |
|---|---|---|
| The 15 are the first 15 free names in rank order, none skipped, none promoted | Ranks 2, 3, 6, 7, 8, 13, 14, 16, 25, 26, 28, 29, 30, 31, 32: identical to the table in `domains.md`, same order | CONFIRMED |
| "17 of the namer's first 32 names are taken" | 17 | CONFIRMED |
| The namer's "top 20" text matches the rank column | All 20 match | CONFIRMED |

---

## D. The .pt column says only what DNS can prove

Second lookup through a different public resolver than the checker used.

| Name | Checker's label | My lookup (UTC) | Answer | Verdict |
|---|---|---|---|---|
| maredeportugal.pt | no delegation found, to check by hand | 13:31:05 | Name does not exist in DNS (code 3) | CONFIRMED |
| portugalmare.pt | same | 13:31:07 | code 3 | CONFIRMED |
| readmare.pt | same | 13:31:09 | code 3 | CONFIRMED |
| mareletter.pt | same | 13:31:11 | code 3 | CONFIRMED |
| entremare.pt | same | 13:31:13 | code 3 | CONFIRMED |
| sapo.pt (control, surely registered) | taken (4 name servers) | 13:31:15 | code 0, the same 4 name servers | CONFIRMED |
| Wording of the column | All 40 rows read "no delegation found, to check by hand"; the other 40 read "not checked (.com taken)". The word "free" is never used for a .pt name in any of the three notes | CONFIRMED |
| `domains.md` line 10: "the .pt registry publishes no RDAP service (none in the IANA list of 28 Oct 2026, none in the registry's documentation)" | CORRECTED. What the evidence supports: the IANA list of 28 Oct 2026 and the IANA record for .pt name no RDAP service; one third-party site names an RDAP address at the registry; the one test of that address was stopped by our own proxy and never reached the registry (see H1); the registry's documentation was not opened, only a web search limited to the registry's sites was read. True wording: "no .pt RDAP service could be confirmed or reached from here" | CORRECTED |

---

## E. "For sale" and "in use" claims

The checker kept the page and the response headers of every home page it read, so I read that evidence and re-fetched one page only.

| Name | Claim in `domains.md` | Evidence | Verdict |
|---|---|---|---|
| maremedia.com | For sale: Sedo parking page, "This website is for sale!", no price | Saved page of 13:09:11 UTC: parking server, title "maremedia.com - This website is for sale!" | CONFIRMED |
| marenova.com | For sale: redirects to a HugeDomains listing; price not read (bot check) | Saved headers of 13:09:29 UTC: redirect to the marketplace's listing address for marenova.com, then a bot-check page (403). The sale wording itself was not read; "for sale" rests on the redirect. The same holds for the other 5 marketplace redirects (4 HugeDomains, 2 Atom in all) | CONFIRMED |
| marejournal.com | In use: live site | Saved page of 13:09:06 UTC and my own read at 13:31:56 UTC: live commercial real-estate news site | CONFIRMED |
| maree.com | In use: redirects to maree.info (French tide tables) | Saved headers of 13:10:16 UTC: permanent redirect to maree.info; page is a tide-table directory | CONFIRMED |
| mareportugal.com | Lapsed site, no sale notice; registered Apr 2025, runs to Apr 2027 | My one GET at 13:31:36 UTC: redirect to www, then 404 with the host's "Website Expired" page; no sale wording, no marketplace host. CSV: created 2025-04-19, expires 2027-04-19 | CONFIRMED |
| "One HTTPS GET of the home page" per taken name (method, point 3) | CORRECTED. Six test names were fetched twice by the checker: at 13:02 UTC and again at 13:03 UTC after the script was changed to keep copies (mareportugal, getmare, joinmare, amare reached a server both times; mareatlantica was reset both times; maremar was stopped at our proxy both times). The other 34 were fetched once. The prompt allows one request of the home page, no more | CORRECTED |

---

## F. Trademark note, facts of the eight heaviest brand rows

| Row | Claim | What I found (UTC) | Verdict |
|---|---|---|---|
| 1. mare (mareverlag), Germany | Publisher of the sea magazine "mare", with books, calendars, shop, TV and podcast; search result: since 1997, German only | Page read 13:31:47: "mareverlag: Zeitschrift, Bücher, Kalender & mehr"; menu has magazine, books, calendars, shop, TV, radio, podcast; Hamburg phone number. One web search: founded 1997, in German, every two months. The date and language rest on a search result, and the note says so | CONFIRMED |
| 2. MEO Marés (until 2026 "MEO Marés Vivas"), Portugal | Summer music festival; moved from Gaia to Matosinhos in 2026; new name from a search result; "about 120,000 visitors in 2025" from a search result | Page read 13:31:51 (dated 1 Feb 2026): the move is there; the new name is not on that page. One web search: the promoter announced on 4 Feb 2026 that the festival is called "MEO Marés" and moves to Matosinhos; some national press calls it only "Marés". True value for the number: press gives 120,000 as the site's capacity over three days (40,000 a day), not a count of 2025 visitors. Both points rest on search results, and the note says so | CORRECTED |
| 11. Maré (beach line of Grupo Marquise), Brazil | Developer's new line called "Maré"; first project "Maré Porto das Dunas", launched December 2025 | Page read 13:31:54 (dated 19 Dec 2025): the group announced the line "Maré" for beach homes in Ceará; first project "Maré Porto das Dunas", about 300 homes. True value: the line was announced in December 2025; the article says the project "is in development", not launched | CORRECTED |
| 15. Mid Atlantic Real Estate Journal ("MAREJ"), United States | Commercial real-estate newspaper with a digital edition, a media kit and conferences; trades as "MAREJ" | Page read 13:31:56: "The Most Comprehensive Source for Commercial Real Estate News in the Region"; "View our Digital Edition"; menu has Conferences and Media Kit; items signed "MAREJ"; copyright line gives the full name | CONFIRMED |
| 19. Hotel & Spa Entremares, Spain | Four-star beach hotel in La Manga | Page read 13:32:00: "Hotel & Spa Entremares ****", La Manga, Murcia | CONFIRMED |
| 24. Mare di Carta, Italy | Nautical bookshop and publisher in Venice | Page read 13:32:04: "Libreria nautica" and "Casa editrice", address in Venice, own imprint on the books | CONFIRMED |
| 17. Amare Global, United States | Wellness supplements, direct selling, "over 50 countries"; own site behind a bot check; identity from search results | One web search: a "mental wellness" supplements company sold by direct selling, based in the US, which says it reaches over 50 countries after buying another firm in 2022. Rests on search results only; the note says so. I did not request the company's site | CONFIRMED |
| Handle row "sigamare" (beachwear shop) | TikTok account of an online beachwear shop, no followers, no videos, bio points to Instagram | Profile page read 13:33:35: bio says exclusive beachwear, shop 100% online, contact through Instagram; 0 followers, 0 videos. The only evidence that a shop exists is this dormant account's bio; no shop site was found by the checker or by me | CONFIRMED |
| Search-snippet rows are labelled | Rows 3, 12 and 14 say "search result only"; rows 1, 2, 4, 17 and 18 name the part that comes from a search result; section 1.6 says "search snippets, not verified in the register" | CONFIRMED |

Not re-checked: the other 17 brand rows.

---

## G. Handles

| Handle and network | Note says | My request (UTC) | Answer | Verdict |
|---|---|---|---|---|
| x.com/mare | taken (a personal account) | 13:33:10 | 200; a profile page, joined March 2007, 80 followers | CONFIRMED |
| TikTok entremare | taken ("EntreMarés", "Pesca & Lazer", 170 followers, 12 videos) | 13:33:16 | User record present; same name, bio and counts | CONFIRMED |
| TikTok sigamare | taken (beachwear shop, no followers, no videos) | 13:33:35 | User record present; same bio and counts | CONFIRMED |
| x.com/maredeportugal | not found | 13:33:21 | 404, "User Profile Not Found" | CONFIRMED |
| TikTok portugalmare | not found | 13:33:26 | No user record; error code 10221 in the page data | CONFIRMED |
| x.com/readmare | not found | 13:33:31 | 404, "User Profile Not Found" | CONFIRMED |
| The method tells a real profile from a missing one | X: 200 with the profile against 404. TikTok: user record against error code. Both networks gave me the same answers with a plain client name as they gave the checker with a browser-style client name | CONFIRMED |
| Instagram marked "to check by hand" | Command record: 2 test requests at 13:15 UTC, both sent to the same login page; nothing submitted; no further request | CONFIRMED |
| LinkedIn marked "to check by hand" | Command record: 2 test requests at 13:15 UTC, both answered with the same bot-check page (403); no further request | CONFIRMED |
| The handle check covers the shortlist | CORRECTED. Only 9 handles were checked: the bare word and the first 8 shortlisted names. The other 7 (marebrief, marenotes, mareportuguesa, mareoeste, marelitoral, maregazette, marecarta) have no handle result on any network, and `trademark.md` does not say so in plain words | CORRECTED |

"Not found" is not "free"; the note says this.

---

## H. Rules audit

### H1. No government or register site was scripted

Host-name search (euipo, inpi, tmview, tmdn, wipo, uspto, ipo.gov.uk, ige.ch, boip, dns.pt, erc.pt, gov, swissreg) over the three notes, the candidate list, the CSV and every script:

| Where | Hit | What it is | Verdict |
|---|---|---|---|
| `trademark.md` lines 9, 33 to 45, 66, 75, 95, 112, 121, 266 | The offices named in words | Instructions for the operator | CONFIRMED allowed |
| `trademark.md` line 35 | The TMview address | Written for the operator to open by hand | CONFIRMED allowed |
| `trademark.md` line 99 | Two addresses of the Portuguese office | Written for the operator; the note says it did not open them | CONFIRMED allowed |
| `trademark.md` lines 129 to 136 | Eight office search addresses (EU, WIPO, France, Benelux, Switzerland, UK, Brazil, US) | Written for the operator, "from memory, none opened" | CONFIRMED allowed |
| `namer.md`, `domains.md`, `candidates.txt`, `rdap_results.csv` | No hit | | CONFIRMED |
| The four scripts of the domain checker | No hit. The RDAP script calls only the .com registry's RDAP service; the .pt script calls only a public DNS resolver; the home-page script calls only `https://<candidate>/`; the note builder makes no request | CONFIRMED |
| The two small fetch helpers of the trademark checker | No hit. They take an address as argument; the addresses requested are in its request log (53 lines, plus one earlier test in the command record) and match the host table in `trademark.md` | CONFIRMED |
| Command record of the three agents | No request to any trademark office, TMview, WIPO, a trademark aggregator, the media regulator or the .pt registry's search form. The namer made no network request at all | CONFIRMED |

The .pt registry: exactly what I found.

| Item | Evidence | Judgement |
|---|---|---|
| One test request to the registry's supposed RDAP address | Not in any script and not in any note. It is in the domain checker's command record at 13:01:18 UTC: one GET to `https://rdap.dns.pt/domain/sapo.pt`. Result: "CONNECT tunnel failed, response 502", HTTP code 000. Our outbound proxy refused the connection, so nothing reached the registry | Inside the prompt's rule: the prompt asked for the .pt check "if a public RDAP or WHOIS endpoint for .pt answers", and this is a machine endpoint, not the search form. CORRECTED on disclosure: `domains.md` does not mention the attempt |
| A second attempt, not in the checker's summary | Same command, same minute: an attempt to open the registry's WHOIS service on port 43. It failed at name lookup on our own machine ("Name or service not known"); nothing left the machine. `domains.md` line 10 says only "WHOIS on port 43 cannot be reached from here" | Inside the prompt's rule for the same reason. CORRECTED on disclosure: it was an attempt, and the count is two attempts, not one |
| "One read of the registry's public documentation" | It was not a page read. It was one web search at 13:01:05 UTC limited to the registry's two sites; the search engine returned titles and a summary of the WHOIS policy pages. No page of the registry was opened by the checker. Two more requests went to IANA (the bootstrap list and the record for .pt), which is not a government body | Inside the rule. CORRECTED on wording: "none in the registry's documentation" should read "none in search results from the registry's sites" |

Edge cases, all judged inside the rule: two of the trademark checker's 39 web searches used the words "EUIPO", "trademark" and "Unionsmarke" (a normal search engine; no result was opened; the note reports the snippets as unverified); its X method test used the profile of a US government agency as the "surely exists" control (the host was x.com); it sent one GET to the public site of a university research centre (answered 503), which the note states.

### H2 to H5

| Item | Evidence | Verdict |
|---|---|---|
| H2. Nothing bought, registered or created | Command record: every request is a GET; no POST, no form, no cookie jar, no browser session. No registrar site, cart, checkout or sign-up address was requested by anyone. Registrar and marketplace names appear only as RDAP answers and as text to match in the home-page script. Six home pages redirected to a marketplace listing address (4 HugeDomains, 2 Atom) and stopped at its bot check; no "buy" link was followed. Instagram's login page was served twice as a redirect; nothing was sent to it | CONFIRMED |
| H3. At least 1 second between RDAP requests | The script waits 1.3 seconds before each request. CSV times: 80 requests from 13:06:59 to 13:08:58 UTC, 79 gaps of 1 or 2 seconds on a one-second clock, mean 1.51 seconds. One wording point: "one RDAP request per name" is not exact. A test run at 13:00 UTC had already asked for 9 of the 80 names plus 2 controls, so the registry received 91 requests, with the same gap | CONFIRMED (count CORRECTED: 91, not 80) |
| H3b. Handle pacing "at least 3 seconds apart per network" | Request log: smallest gap on one network is 3 seconds | CONFIRMED |
| H4. No TMview or INPI search was run; search-snippet rows are labelled | Command record and request log: no such request. Labels: see the last row of section F | CONFIRMED |
| H5. No person's name other than published brand names, no secret, no personal email | No email address and no secret in any of the five files. Commit author and committer are the brand identity on all three commits. Two rows of `trademark.md` carry a chef's name because it is the published name of the restaurant or of its group (rows 6 and 20 and their addresses); the X account at "mare" is described as "a personal account" without the name. The one-page report does not need the two chef names | CONFIRMED |

---

## I. Arithmetic and consistency

| Claim | Recount | Verdict |
|---|---|---|
| 40 probably free, 40 taken, 0 unknown | CSV: 40 rows with 404, 40 with 200, 80 "retried = no" | CONFIRMED |
| Of the taken: 8 for sale, 10 in use, 7 parked or empty, 15 no answer | Full table recount: 8, 10, 7, 15 (sum 40). For sale: 2 Sedo, 4 HugeDomains, 2 Atom | CONFIRMED |
| Full table of 80 agrees with the CSV (status, registrar, creation date, rank) | 80 rows, no mismatch | CONFIRMED |
| Every shortlisted name has the same spelling in all three notes | The 15 names and their order are identical in `namer.md` (ranks), `domains.md` (shortlist), and `trademark.md` (search table and rating table) | CONFIRMED |
| The risk ratings cover exactly the 15 | 15 rows: 6 low, 9 medium, 0 high; no name missing, none extra | CONFIRMED |
| `trademark.md`: 54 page requests, 39 searches | Request log has 53 lines plus 1 earlier test of marejournal.com = 54; host table adds to 54; command record has 39 searches and 5 failed helper calls | CONFIRMED |

---

## Corrections the report must carry (worst first)

1. **.pt wording.** The report must say ".pt: no delegation found, to check by hand" and nothing stronger. It must not say that the .pt registry has no RDAP service: that was not established. `domains.md` should also state the two attempts on the registry's machine endpoints at 13:01 UTC (RDAP address: stopped by our proxy; WHOIS port 43: failed on our machine). Neither reached the registry.
2. **Three of the five likely top names do not meet the prompt's "easy in Portuguese, French and English" rule.** readmare and mareletter are English-only by the namer's own notes; entremare is easy in none of the three (plural phrase, singular domain, one letter from the Spanish hotel's "entremares"). For readmare add the "red mare / reed mare" and "read-mare" (nightmare pattern) readings. The shortlist is "free names in the namer's order", not "names that pass every rule": 20 of the 80 are one-language names by the namer's own notes.
3. **Handles were checked for 8 of the 15 names only** (plus the bare word). The report may quote handle status for maredeportugal, portugalmare, readmare, mareletter, entremare, marevolume, amareportugal and sigamare, and must write "not checked" for the other seven.
4. **Six home pages were fetched twice, not once** (the six test names). The prompt allowed one. No harm is visible, but `domains.md` says one.
5. **MEO Marés.** 120,000 is the stated capacity over three days, not 2025 attendance. The rename was announced by the promoter on 4 Feb 2026; some press writes only "Marés". The rename rests on search results.
6. **Grupo Marquise "Maré".** Announced on 19 Dec 2025; the first project is in development, not launched.
7. **Small naming points to carry if the name is used:** sigamare drops the "a" of "siga a maré"; mareoeste begins with "mareo" (a seasick word on the namer's own ruled-out list); marelitoral has one "t" where French and English write two.
8. **Counts:** the registry received 91 RDAP requests from the checker (80 plus an 11-name test run), not 80; mine add 20.

Nothing was REMOVED: no row had to be dropped for lack of support.

## What I could not check

1. **Any trademark register, TMview, WIPO or the .pt registry's search.** Not opened, by rule. So the addresses and field names written for the operator in `trademark.md` (and whether TMview lists Brazil and the US) are unverified, and the risk ratings remain a screen of names in use, not of marks registered.
2. **Whether a "probably free" .com can be bought at the normal price.** RDAP does not show premium or reserved names; no registrar page was opened. My second request came about 23 minutes after the first; a name can be registered by someone else at any time.
3. **Whether any .pt name is really free.** DNS cannot show it.
4. **Instagram and LinkedIn**, for every handle; and whether a "not found" handle on X or TikTok can be registered.
5. **entremares.com** (the plural spelling) and the other typo spellings: not looked up.
6. **The 60 names outside my sample** in section A, **35 of the 40 home-page notes** in section E, **17 of the 25 brand rows** in section F, and **12 of the 18 X and TikTok results** in section G.
7. **Amare Global's own site** (bot check, not requested) and **the German magazine's founding date** on its own pages: both rest on search results.
8. **Requests made outside the command record.** The audit of "nothing bought, registered or created" and "no register site" rests on the session's command record, the scripts, the request log and the saved pages. They agree with each other; I have no way to see a request that none of them recorded.
9. **The judgement calls in the ratings** (low or medium). I checked the facts under them, not the ratings.
