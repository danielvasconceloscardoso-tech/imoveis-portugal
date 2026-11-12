# Prompt 83, agent 2: domain check of the 80 "Maré" candidates

Date: 12 Nov 2026. Checks ran between 13:06 and 13:10 UTC (six home pages were read at 13:03 UTC during the test run and not fetched again). Research only: nothing was bought, registered or created, no form was filled, no login was used and no checkout address was opened. Raw RDAP results: `rdap_results.csv` in this folder.

## Method and limits

1. **.com:** one RDAP request per name to the .com registry (`https://rdap.verisign.com/com/v1/domain/<name>.com`), 1.3 seconds apart, with a generic client name. HTTP 200 means taken; HTTP 404 means probably free. All 80 names answered 200 or 404 at the first try, so no result is "unknown".
2. **"Probably free" is not a promise.** A 404 only says the registry holds no registration today. A registry premium or reserved name, or a name about to come out of redemption, may still not be registrable at the normal price (about 10 € a year). The registrar's search page on the day of purchase is the final check.
3. **Taken names:** one HTTPS GET of the home page, redirects followed, 10 seconds, first 200 kB. "For sale" means a marketplace host or a sale phrase was seen. Plain HTTP could not be opened from here and scripts were not run, so a sale banner on an HTTP-only or script-only page is missed; bot checks on marketplace listings were left alone, so no price was read.
4. **.pt:** the .pt registry publishes no RDAP service (none in the IANA list of 28 Oct 2026, none in the registry's documentation), and WHOIS on port 43 cannot be reached from here. The check is a public DNS lookup of the name-server records (`https://dns.google/resolve?name=<name>.pt&type=NS`). The registry's own search form was not used.
5. **DNS proves "taken" only.** A delegation means the name is registered. No delegation does not mean free: a registered name without name servers, or a reserved name, looks the same. So every .pt answer below is "no delegation found, to check by hand". Method test: sapo.pt and maremar.pt came back taken; amare.pt came back with a server failure (probably registered, broken delegation).

## Counts

| Result | Count |
|---|---|
| Candidates checked (file valid: 80 unique lines, a to z only, 14 characters or fewer) | 80 |
| .com probably free (RDAP 404) | 40 |
| .com taken (RDAP 200) | 40 |
| of which taken and for sale | 8 |
| of which taken and in use | 10 |
| of which taken and parked or empty, no sale notice | 7 |
| of which taken, home page did not answer over HTTPS | 15 |
| .com unknown | 0 |
| .pt of the 40 free .com names: no delegation found, to check by hand | 40 |

## Shortlist: the 15 best free .com names

Order is the namer's rank among the free names; nothing was re-ranked. "Why" and "risk" are the namer's own words from `namer.md`.

| # | Namer rank | Name | Length | .com | .pt | Why (namer) | Risk (namer) |
|---|---|---|---|---|---|---|---|
| 1 | 2 | maredeportugal.com | 14 | probably free | no delegation found, to check by hand | Correct Portuguese phrase "Maré de Portugal"; reads like a title. | At the 14-character limit; "de" is lost on French and English ears. |
| 2 | 3 | portugalmare.com | 12 | probably free | no delegation found, to check by hand | Country first helps search and talks with public bodies; easy to spell. | Reads "Portugal mare" (horse) in English; the brand comes second. |
| 3 | 6 | readmare.com | 8 | probably free | no delegation found, to check by hand | Common newsletter pattern; keeps the brand as bare "Maré". | English only; "read mare"; Portuguese and French speakers may misspell "read". |
| 4 | 7 | mareletter.com | 10 | probably free | no delegation found, to check by hand | Says what the product is. | Double "t"; narrow for a whole brand; not a Portuguese or French word. |
| 5 | 8 | entremare.com | 9 | probably free | no delegation found, to check by hand | "Entre marés" (between tides); "entre" also means "come in" in Portuguese and French. | English speakers type "enter"; a Spanish hotel uses Entremares (unsure). |
| 6 | 13 | marevolume.com | 10 | probably free | no delegation found, to check by hand | "Volume" is the same word in all three languages; matches "Maré, Volume I". | Narrow: it names the anthology, not the letters. |
| 7 | 14 | amareportugal.com | 13 | probably free | no delegation found, to check by hand | Reads "A Maré Portugal" and also "amar é Portugal" (to love is Portugal). | Three ways to split it; "amare" is Italian (to love, also bitter); near the Amaré brand. |
| 8 | 16 | sigamare.com | 8 | probably free | no delegation found, to check by hand | "Siga a maré" (follow the tide); works in Portugal and Brazil. | Can be heard as "sigma"; "seguir a maré" also means going along with the crowd. |
| 9 | 25 | marebrief.com | 9 | probably free | no delegation found, to check by hand | Matches the Tuesday letter "A Brief". | Names one of the two letters only; "briefs" is underwear in English. |
| 10 | 26 | marenotes.com | 9 | probably free | no delegation found, to check by hand | "Notes" works in French and English. | Portuguese says "notas"; light tone, weak in front of sponsors. |
| 11 | 28 | mareportuguesa.com | 14 | probably free | no delegation found, to check by hand | "Portuguese tide"; correct grammar. | 14 characters; "guesa" is hard to spell for French and English speakers. |
| 12 | 29 | mareoeste.com | 9 | probably free | no delegation found, to check by hand | "Western tide"; Portugal as the west edge of Europe. | "Oeste" is also one named region of Portugal; "eoe" is hard to spell; unknown word in French and English. |
| 13 | 30 | marelitoral.com | 11 | probably free | no delegation found, to check by hand | "Litoral" is close in all three languages. | Leaves out inland Portugal; 11 characters. |
| 14 | 31 | maregazette.com | 11 | probably free | no delegation found, to check by hand | Old press word in French and English; fits print. | "z" and double "t" to spell; Portuguese says "gazeta". |
| 15 | 32 | marecarta.com | 9 | probably free | no delegation found, to check by hand | "Carta" is a letter and also a chart ("carta de marés", tide chart). | Unknown word in English; French says "carte" or "lettre". |

The shortlist reaches down to namer rank 32 because 17 of the namer's first 32 names are taken, among them rank 1 (mareportugal.com, a lapsed site, registered until April 2027).

## Full table (namer's rank order)

| Rank | Name | .com status | Registrar | Created | Home page and for-sale note | .pt status | Source |
|---|---|---|---|---|---|---|---|
| 1 | mareportugal.com | taken | Squarespace Domains LLC | 2025-04-19 | Parked: lapsed site ("Squarespace - Website Expired"); no sale notice. Registered Apr 2025, paid to Apr 2027 | not checked (.com taken) | RDAP 200; one home page GET |
| 2 | maredeportugal.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 3 | portugalmare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 4 | marejournal.com | taken | Network Solutions, LLC | 2007-10-24 | In use: live site ("Home, marejournal") | not checked (.com taken) | RDAP 200; one home page GET |
| 5 | mareatlantica.com | taken | Dinahosting s.l. | 2014-07-09 | No answer over HTTPS (connection reset); to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 6 | readmare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 7 | mareletter.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 8 | entremare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 9 | voltamare.com | taken | united-domains GmbH | 2025-11-21 | No answer over HTTPS (certificate name error); to check by hand. Expires 21 Nov 2026 | not checked (.com taken) | RDAP 200; one home page GET |
| 10 | maremedia.com | taken | Megazone Corp., dba HOSTING.KR | 2005-08-07 | FOR SALE: parking page of the Sedo marketplace says "This website is for sale!"; no price printed | not checked (.com taken) | RDAP 200; one home page GET |
| 11 | getmare.com | taken | Dynadot Inc | 2025-10-12 | Parked: advertising redirect page; no sale notice, no price | not checked (.com taken) | RDAP 200; one home page GET |
| 12 | mareatlas.com | taken | GoDaddy.com, LLC | 2021-11-25 | No answer over HTTPS (timeout); to check by hand. Expires 25 Nov 2026 | not checked (.com taken) | RDAP 200; one home page GET |
| 13 | marevolume.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 14 | amareportugal.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 15 | marelusa.com | taken | Gandi SAS | 1996-09-28 | No answer over HTTPS (host not reachable); to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 16 | sigamare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 17 | mareguide.com | taken | Gname.com Pte. Ltd. | 2025-10-02 | No answer over HTTPS. Expired 2 Oct 2026 and in "redemption period": not registrable today, may be released in the coming weeks; to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 18 | mareal.com | taken | GMO Internet Group, Inc. d/b/a Onamae.com | 2002-08-21 | In use: live site of a Japanese company | not checked (.com taken) | RDAP 200; one home page GET |
| 19 | marenova.com | taken | GoDaddy.com, LLC | 2012-05-20 | FOR SALE: redirects to a HugeDomains listing; price not read (the listing shows a bot check, left alone) | not checked (.com taken) | RDAP 200; one home page GET |
| 20 | joinmare.com | taken | Media Revolution Inc | 2026-10-18 | Parked: registrar placeholder ("joinmare.com is registered"); no sale notice. Registered 18 Oct 2026 | not checked (.com taken) | RDAP 200; one home page GET |
| 21 | maremundo.com | taken | TurnCommerce, Inc. DBA NameBright.com | 2019-04-21 | FOR SALE: redirects to a HugeDomains listing; price not read (bot check, left alone) | not checked (.com taken) | RDAP 200; one home page GET |
| 22 | mareviva.com | taken | Spaceship, Inc. | 2022-01-14 | FOR SALE: redirects to an Atom (ex-Squadhelp) listing; price not read (bot check, left alone) | not checked (.com taken) | RDAP 200; one home page GET |
| 23 | lermare.com | taken | GoDaddy.com, LLC | 2025-02-13 | Parked: empty page with a script redirect to "/lander" (not followed); sale status to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 24 | casamare.com | taken | GoDaddy.com, LLC | 1997-12-19 | No answer over HTTPS (timeout); to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 25 | marebrief.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 26 | marenotes.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 27 | vivamare.com | taken | TurnCommerce, Inc. DBA NameBright.com | 2010-03-24 | FOR SALE: redirects to a HugeDomains listing; price not read (bot check, left alone) | not checked (.com taken) | RDAP 200; one home page GET |
| 28 | mareportuguesa.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 29 | mareoeste.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 30 | marelitoral.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 31 | maregazette.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 32 | marecarta.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 33 | maremagazine.com | taken | Tucows Domains Inc. | 2009-06-04 | In use: the page frames another site (www.ilmare.com); no sale notice | not checked (.com taken) | RDAP 200; one home page GET |
| 34 | mareinportugal.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 35 | mareemportugal.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 36 | maresul.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 37 | marealta.com | taken | Annulet LLC | 2012-03-12 | No answer over HTTPS (timeout); to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 38 | marecosta.com | taken | NameCheap, Inc. | 2026-09-01 | No answer over HTTPS (timeout); to check by hand. Registered 1 Sep 2026 | not checked (.com taken) | RDAP 200; one home page GET |
| 39 | maremar.com | taken | Network Solutions, LLC | 1998-06-20 | No answer over HTTPS (host not reachable); to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 40 | marelusitana.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 41 | leiamare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 42 | liremare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 43 | mareedit.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 44 | marepost.com | taken | Network Solutions, LLC | 2025-03-05 | No site: error page of the hosting network ("DNS points to prohibited IP"); no sale notice | not checked (.com taken) | RDAP 200; one home page GET |
| 45 | mareweekly.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 46 | maree.com | taken | OVH sas | 2004-08-18 | In use: redirects to maree.info (French tide tables) | not checked (.com taken) | RDAP 200; one home page GET |
| 47 | amare.com | taken | GoDaddy.com, LLC | 1997-12-04 | In use: live business (Amare Global, wellness products) | not checked (.com taken) | RDAP 200; one home page GET |
| 48 | marerevista.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 49 | maredosul.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 50 | mareazul.com | taken | GoDaddy.com, LLC | 2006-09-06 | No answer over HTTPS (certificate does not match the name); to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 51 | mareoceano.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 52 | marevento.com | taken | TurnCommerce, Inc. DBA NameBright.com | 2015-05-18 | FOR SALE: redirects to a HugeDomains listing; price not read (bot check, left alone) | not checked (.com taken) | RDAP 200; one home page GET |
| 53 | lusamare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 54 | portugalnamare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 55 | marelusofona.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 56 | meetmare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 57 | openmare.com | taken | GoDaddy.com, LLC | 2026-03-25 | Parked: empty page with a script redirect to "/lander" (not followed); sale status to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 58 | abramare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 59 | vivemare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 60 | sobemare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 61 | apanhamare.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 62 | maremare.com | taken | Atom.com Domains LLC | 2003-02-21 | FOR SALE: redirects to an Atom (ex-Squadhelp) listing; price not read (bot check, left alone) | not checked (.com taken) | RDAP 200; one home page GET |
| 63 | maremia.com | taken | DropCatch.com 1168 LLC | 2019-11-12 | Parked: empty page with a script redirect to "/lander" (not followed); held at a drop-catching registrar, expiry date 12 Nov 2026; sale status to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 64 | maremais.com | taken | Cronon GmbH | 2014-12-03 | Redirects to www.maremais.de over plain HTTP, which could not be opened; probably in use; to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 65 | umamare.com | taken | Register SPA | 2021-12-02 | No answer over HTTPS (self-signed certificate); to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 66 | lamaree.com | taken | Gandi SAS | 2002-11-19 | FOR SALE: parking page of the Sedo marketplace says "This website is for sale!"; no price printed | not checked (.com taken) | RDAP 200; one home page GET |
| 67 | marecheia.com | taken | HOSTINGER operations, UAB | 2025-07-24 | In use: live site "Maré Cheia, Consultoria & Marketing" (an existing Maré brand: for the trademark check) | not checked (.com taken) | RDAP 200; one home page GET |
| 68 | maredotejo.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 69 | maredaily.com | taken | GoDaddy.com, LLC | 2026-07-08 | In use: redirects to locea.co (an omega-3 shop). Registered 8 Jul 2026 | not checked (.com taken) | RDAP 200; one home page GET |
| 70 | maret.com | taken | RegistryGate GmbH | 2002-01-07 | No answer over HTTPS (certificate does not match the name); to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 71 | mareh.com | taken | IONOS SE | 2000-05-27 | No answer over HTTPS (TLS error); to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 72 | marees.com | taken | OVH sas | 1998-05-27 | No answer over HTTPS (certificate does not match the name); to check by hand | not checked (.com taken) | RDAP 200; one home page GET |
| 73 | marezita.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 74 | marey.com | taken | GoDaddy.com, LLC | 2001-12-09 | In use: live business (water heaters) | not checked (.com taken) | RDAP 200; one home page GET |
| 75 | mareco.com | taken | Tucows Domains Inc. | 1996-07-25 | In use: live business (branded products) | not checked (.com taken) | RDAP 200; one home page GET |
| 76 | mareta.com | taken | GoDaddy.com, LLC | 2002-12-19 | In use: live site ("Mareta, Experience The Elements") | not checked (.com taken) | RDAP 200; one home page GET |
| 77 | maretuga.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 78 | marept.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 79 | mareportugalia.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |
| 80 | mareduportugal.com | probably free | | | | no delegation found, to check by hand | RDAP 404; .pt by public DNS |

## What I could not check

1. **Every .pt name.** All 40 are "no delegation found, to check by hand": the operator confirms the few he cares about in the .pt registry's public search before buying. The .pt versions of the 40 taken .com names were not looked at.
2. **Registrar price.** Whether a "probably free" name sells at the normal price or as a premium name only shows on a registrar's search page. No registrar page was opened.
3. **15 taken names whose home page did not answer over HTTPS** (mareatlantica, voltamare, mareatlas, marelusa, mareguide, casamare, marealta, marecosta, maremar, mareazul, maremais, umamare, maret, mareh, marees): in use, parked or for sale is not known.
4. **Parked pages with a script redirect** (lermare, openmare, maremia): the redirect was not followed, so a sale offer behind it is not ruled out.
5. **Prices of the 8 names for sale.** None is printed on the first page; the listings sit behind a bot check that was left alone.
6. **Names close to expiry.** mareguide.com is in redemption (expired 2 Oct 2026); voltamare.com (21 Nov), mareatlas.com (25 Nov) and maremia.com (12 Nov) reach their expiry date this month. They are taken today and most registrations renew; only a new check after the date shows otherwise.
7. **Trademarks and social handles:** not part of this check (agent 3). One finding passed on: marecheia.com is a live "Maré Cheia" consultancy and marketing site.
