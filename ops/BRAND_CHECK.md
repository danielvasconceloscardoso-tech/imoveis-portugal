# Brand check (prompt 47 §1), 1 Nov 2026

21 names: the control, the CEO's twelve and eight of ours (coined, not descriptive in PT, FR, EN, DE or HE). Scored 0–3 on seven criteria (21 max). **No purchase, no filing.** Checked from the build environment on 1 Nov 2026, 22:00–22:40 Lisbon; script `scripts/brand/check.mjs`, raw results in `ops/brand/check-2026-11-01.json`.

## What was verified, and what the operator checks by hand

| Check | Source | Result here |
| --- | --- | --- |
| .com, .net | Verisign RDAP | verified (registered or free) |
| .fr | AFNIC RDAP (rdap.nic.fr) | verified |
| .com.br | Registro.br RDAP | verified (a few answered 403: marked "check") |
| .pt | DNS.pt public WHOIS search (no RDAP for .pt) | verified |
| .lu, .ch, .us, .co.il | no public RDAP reachable (not in the IANA bootstrap) | **operator: Cloudflare Registrar or the registry's WHOIS** |
| Premium price / for sale | Cloudflare Registrar, Dan, Sedo | **operator, minutes per name** |
| YouTube, LinkedIn, TikTok | HTTP request | verified where the platform answered; TikTok read "taken" for almost every word, treat as a warning |
| Instagram, X | login walls for scripts | **unverified for all: operator checks on the phone** |
| Trademarks (INPI PT, EUIPO, INPI BR, USPTO, Israel) | TMview, EUIPO eSearch, INPI online search | **not verifiable from here**: TMview fails at TLS, EUIPO eSearch returns an empty reply, INPI's search is behind a bot firewall. Operator runs the searches below in TMview (classes 35, 36, 41, 42, identical and similar) |
| Company name (firma) | IRN, certificate of admissibility | **operator**, at Empresa na Hora or online (the firma can differ from the brand) |
| Collisions | web search | done for the finalists and the closest names |
| Descriptiveness | EUIPO Guidelines, Part B, Section 4 (a sign descriptive in any EU language is refused) | assessed by us, below |

## Scored table

Criteria: **D** distinctive and protectable as a word mark · **P** pronounceable and spellable in PT, FR, EN, DE, HE · **Dom** domains (.pt and .com weigh most) · **H** handles · **T** no known conflicting mark (provisional: TMview not run) · **G** no dominant Google collision · **C** concept fit (a number on every place, Portugal seen from abroad, the letter).

| Name | D | P | Dom | H | T | G | C | Total | Domains: free (verified) | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Lusoma** | 3 | 3 | 3 | 1 | 2 | 3 | 2 | **17** | .pt .net .fr .com.br | coined ("luso" + soma, the sum); .com registered; no collision found |
| **Latitude 39** | 2 | 3 | 2 | 1 | 2 | 2 | 3 | **15** | .pt .fr .com.br | mainland Portugal sits around 39°N; same word in PT, FR, EN; .com and .net registered |
| **Miralto** | 3 | 3 | 1 | 1 | 2 | 1 | 3 | **14** | .pt .net | "mira alto", the view from above; Immobiliare Miralto Srl (Milan) in real estate: a class 36 risk in Italy |
| Oravia | 3 | 3 | 1 | 0 | 2 | 3 | 1 | 13 | .pt | coined, no meaning to anchor it |
| Corvela | 3 | 2 | 1 | 1 | 2 | 3 | 1 | 13 | .pt | |
| Portugal 100 | 1 | 2 | 2 | 1 | 1 | 2 | 3 | 12 | .net .fr .com.br | strong as the **name of the index**, weak as the company brand ("Portugal" descriptive) |
| Alvora | 3 | 3 | 0 | 1 | 2 | 2 | 1 | 12 | none | every TLD taken |
| Casa Cem | 1 | 1 | 2 | 1 | 1 | 3 | 2 | 11 | .pt .net .fr | "casa" descriptive; "cem" hard outside PT |
| Navira | 3 | 3 | 0 | 0 | 2 | 2 | 1 | 11 | none | |
| Aurelo | 3 | 3 | 1 | 0 | 1 | 2 | 1 | 11 | .pt | a 2024 trademark filing for "Aurelo" (bicycle goods, China) |
| Mirante | 1 | 2 | 1 | 1 | 1 | 1 | 3 | 10 | .fr | dictionary word (lookout), many prior uses |
| Atlas Portugal | 1 | 3 | 2 | 2 | 0 | 0 | 2 | 10 | .net .fr .com.br | **collision**: Atlas Property Portugal (agency, class 36) and ATLAS (property platform) |
| Velaro | 2 | 3 | 1 | 0 | 1 | 1 | 1 | 9 | .pt | Siemens' Velaro trains: a reputed mark |
| Farol | 1 | 2 | 0 | 1 | 1 | 1 | 2 | 8 | none | common word, many existing marks and media titles |
| Raiz | 1 | 2 | 0 | 1 | 1 | 1 | 2 | 8 | none | |
| Miradouro | 1 | 1 | 0 | 0 | 1 | 1 | 3 | 7 | none | hard for EN, DE, HE speakers |
| Imóveis Portugal (control) | 0 | 1 | 2 | 1 | 0 | 1 | 2 | 7 | .net .fr | descriptive: word mark refused; figurative mark only, weak |
| Varanda | 1 | 2 | 0 | 0 | 1 | 1 | 1 | 6 | none | |
| Lugar | 0 | 2 | 0 | 0 | 0 | 1 | 2 | 5 | none | "place": descriptive |
| Morada | 0 | 2 | 0 | 0 | 0 | 1 | 1 | 4 | none | "address": descriptive for property |
| Solar | 0 | 2 | 0 | 0 | 0 | 0 | 1 | 3 | none | manor house in PT, solar energy in EN: descriptive and crowded |

.com is registered for every name; whether a holder sells is the operator's aftermarket check.

## The three finalists

1. **Lusoma** — the most protectable: coined, easy in five languages, no collision, four of five checkable domains free; reads as "the Portuguese sum", which fits a platform built on numbers.
   - Buy: lusoma.pt, lusoma.net, lusoma.fr, lusoma.com.br; check lusoma.lu, lusoma.ch, lusoma.us, lusoma.co.il; ask the holder of lusoma.com.
   - Handles: YouTube @lusoma (free); check Instagram, X, TikTok, LinkedIn by hand (LinkedIn and TikTok answered "taken").
2. **Latitude 39** — the clearest story (Portugal on the map, seen from abroad), the same word in PT, FR and EN; a number pairs with the index.
   - Buy: latitude39.pt, latitude39.fr, latitude39.com.br; check .lu, .ch, .us, .co.il; latitude39.com and .net are registered.
   - Handles: all to check by hand (LinkedIn "taken").
3. **Miralto** — coined from Portuguese ("look from above"), distinctive in our classes outside Italy; the Milan real-estate company is the one risk to clear in TMview.
   - Buy: miralto.pt, miralto.net; check .lu, .ch, .us, .co.il; .com, .fr and .com.br registered.
   - Handles: YouTube @miralto (free); the rest by hand.

**For all three:** file a word mark at INPI (Portugal) and the EUIPO in classes 35 (advertising, online advertising space), 36 (real-estate information, financial information), 41 (publication of guides and online information, not news) and 42 (data platforms, software as a service); then INPI Brazil and the USPTO. Run TMview first: identical and similar signs, the four classes, all offices it covers.

## Registration conditions noted (from the registries' published rules; re-check at purchase)

- **.com.br**: a Brazilian taxpayer number (CPF or CNPJ) is required; a foreign company registers through a representative with a Brazilian CNPJ.
- **.co.il**: ISOC-IL accredited registrars; check the current local-presence rule with the registrar at purchase.
- **.us**: the US Nexus requirement (a US person or a bona fide presence in the US).
- **.fr**: registrant in the EU, EEA or Switzerland (a Portuguese Lda qualifies).
- **.lu, .ch, .pt**: open; no local presence needed for a Portuguese company.

## Search terms for the operator (TMview, 15 minutes)

Lusoma, Luzoma, Lusona · Latitude 39, Latitude · Miralto, Mirallo, Mirlato · classes 35, 36, 41, 42 · offices: EUIPO, PT, BR, US, IL, FR, LU, CH (WIPO for international registrations).
