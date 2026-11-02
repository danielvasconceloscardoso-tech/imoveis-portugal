# B3: schools, higher education and health (2 Nov 2026)

File: `sponsors/research/sponsors_B3.csv`. It has **70 new institutions**, all different from the 12 schools and 5 health groups already in `letter_sponsors.csv`. Names and contact domains were checked against that file and none repeat. The file covers 28 schools, 32 higher-education institutions and 10 health providers.

Every `contact_url` was checked with `curl -sSL -A "Mozilla/5.0" --max-time 25` through the proxy on 2026-11-02. 64 returned 200 and 6 are marked `blocked`:

- Redbridge (403)
- Vale Verde (did not resolve or load)
- Nova SBE (403 on the recheck; 200 on the first try)
- UNL
- Universidade de Coimbra (403)
- Universidade do Minho (proxy 502)

When a contact page returned 404, the verified homepage is used instead. This applies to St Peter's, ISCTE BS, Católica Lisbon, Católica Porto, U.Porto, U.Lisboa, UAlg, Évora, UBI, UFP, Lusíada and ISCAC.

## Schools by region and curriculum

The level is in brackets: O = Official ("Escola parceira") candidate, F = Featured.

| Region | British | American | IB | French | German | Swiss | Other | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Lisboa e Cascais | 7 (1 O: The Lisboan*; 6 F) | 1 F (ICSC) | 7 (2 O: OIS, ULIS; 5 F) | 0 | 0 | 0 | 4 F (SEK/IES, Montessori, 2 Portuguese private) | 19 |
| Porto e Norte | 2 O (CLIP, CLIB) | 0 | 0 | 0 | 0 | 0 | 0 | 2 |
| Centro | 1 F (CLIC) | 0 | 1 O (Leiria IS) | 0 | 0 | 0 | 0 | 2 |
| Algarve | 2 F (Aljezur, Vale Verde) | 0 | 1 O (Vilamoura/CIV) | 0 | 0 | 0 | 0 | 3 |
| Madeira e Açores | 1 F (IS Madeira) | 0 | 1 O (ISS Madeira) | 0 | 0 | 0 | 0 | 2 |

*The Lisboan is listed as British (Cambridge) with the IB Diploma. Its product is "Escola parceira, Lisboa e Cascais, British". The Official candidates added in this batch are OIS, ULIS, The Lisboan, CLIP, CLIB, Leiria IS, CIV and ISS Madeira. The rest are Featured because the existing list already holds the strongest school in that region and curriculum (for example St Julian's, CAISL, TASIS, St Dominic's, Oporto British, Nobel, both Deutsche Schulen, LFCL and LFIP).

Each school's curriculum was confirmed on its own site, as text on the homepage or campus page, except for these four:
- **Redbridge:** the site was blocked, so the curriculum comes from directories only.
- **Vale Verde:** the site did not load, so the curriculum comes from directories only.
- **CLIC:** the homepage is rendered by script and carries no text.
- **CLIP:** the homepage shows no curriculum keyword, so "British" comes from directories.

Colégio Planalto and Colégio Mira Rio show an "IB" secondary track on their sites. Planalto's IB Diploma since 1992 comes from a directory and was not checked on ibo.org.

## Higher education

There are 32 entries:
- **5 Official candidates, all national:** Nova SBE, Católica Lisbon, UCP, U.Porto and U.Lisboa.
- **12 Partner:** PBS, ISCTE BS, ISEG, AESE, Católica Porto, The Lisbon MBA, UNL, Coimbra, Minho, Aveiro, Lusófona and Europeia.
- **15 Featured:** the regional universities and private schools.

`size_signal` is empty for all of them because no figure was verified on their own sites in the time box. Rankings (FT, accreditations) still need adding.

## Health

The 10 entries are 8 independents as Featured (hospital, region) and 2 national clinic chains as Partner (Malo Clinic, Affidea).
- **ERS registration numbers found on the sites:** Hospital da Cruz Vermelha 111537 and Malo Clinic 12920.
- **News source:** Unisana has a dated news item, ECO 2025-09-25.

## What could not be verified, or was left out on purpose

- **Examples in the brief that are already inside listed groups:**
  - Hospital da Arrábida is now Hospital da Luz Arrábida (Luz Saúde).
  - Hospital Privado de Braga is now Lusíadas Braga.
  - Hospital Particular da Madeira was HPA and appears as Hospital CUF Madeira in the v6 data.
  - Trofa Saúde units stay at group level (Trofa Saúde is already L294).

  None of these was added.
- **Swiss curriculum:** no Swiss school in Portugal was found.
- **French and German:** no French or German school beyond the four already listed. Deutsche Schule Algarve and NOAP (Dutch) appear in directories, but no own site could be found or loaded.
- **Not added, because no own site was found or it would not load:**
  - Lisboa e Cascais: Svenska Skolan Lissabon, Instituto Español Giner de los Ríos, Scuola Italiana di Lisbona, St James's Primary (the site has no curriculum text).
  - Algarve: Aspire / Algarve International School, Barlavento International Primary, Colégio Santiago Internacional (Tavira), International School of the Algarve (Porches), Bright and Montalvo.
  - Centro and Madeira: International School of Coimbra, Madeira Multilingual School.
- **Not added because the page did not support the entry:** Colégio Efanor (the domain shows a parked page) and Clínica Santa Luzia and Clínica Europa (location not confirmed on their homepages).
- **Azores:** no international school found.
- **Universidade Autónoma de Lisboa:** the domain did not load, so it was not added.
- No contact was made, no form was submitted, and no personal names, emails or phone numbers are recorded.
