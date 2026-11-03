# Prompt 66: O'rizon Living live on the map, Marble Terrace switched off, no agency name on the site

Operator, 3 Nov 2026. Goes live under D67. Record it as the next free D number in ops/DECISIONS.md.

## 0. Before anything
1. Tag the current state: `backup/pre-66-2026-11-03` on main and on design-v2. Push the tags.
2. Read content/DESIGN_AND_DATA.md and CLAUDE.md rules 14 to 17. Gondomar is the golden sample, so this is the sample.

## 1. O'rizon Living (Shalu Investments) live on the real site
1. In content/developers/projects.json, `orizon` becomes a shown project: `partner: true`, `pending: false`.
2. **Shalu has not signed and is not a sponsor**, so the site must never call it "Patrocinado" / "Sponsored". Add a per-project label field `tag` (PT "Seleção", EN "Our pick", FR "Sélection"). Use it everywhere a project label renders:
   - the map pins and cards (map-v3.ts, map-explorer.ts, including the "nearby" line);
   - the home "homes for sale" cards;
   - DevSlots, the Flow building cards, PlacePage;
   - the showcase page and the unit pages.
   
   Projects without `tag` keep "Patrocinado".
3. Add PT and FR `lines` and a `summary` in three languages, from the published facts already in the record (about 200 apartments, five buildings, 35,000 m² on the Douro by the Marina do Freixo, Paulo Merlini / PMA, T1 to T4, the amenities).
4. **Build a showcase at the level of Marble Terrace or better.** Reuse ShowcaseBlocks, ShowcaseUnits and ShowcasePlace, with the homes and published prices already in the record. Then add what the operator's reference shows: O'rizon's own LinkedIn post (https://www.linkedin.com/posts/orizonlivingporto_orizonliving-realestate-home-ugcPost-7447921890016432128-GeBQ). The operator will open it with you and say which features he means. Expect some of:
   - a video or film of the project (H.264, `-preset veryfast`, poster frame, under 8 MB, lazy-loaded);
   - a render gallery;
   - floor plans per typology;
   - the amenities;
   - the river views;
   - the location with straight-line distances (OpenStreetMap, as for Marble Terrace).
5. **Material.** The operator will upload Shalu's brochure, renders, plans and video. Ask him where; suggest content/developers/orizon/ for source files and site/public/img/developers/orizon/ for web sizes. Use only material from Shalu or published by Shalu, credited "Shalu Investments". If a piece of the post cannot be rebuilt from what he gives you, say so; do not ship a weaker version (rule 17).
6. **The short link** `imoveisportugal.pt/orizon` (site/public/_redirects) points today to the private preview /d/f658bd1eef/. Point it instead to the English map with Gondomar open and the O'rizon pin visible. The message to Shalu says "pick Gondomar, play with the map". Keep the private preview page as it is.
7. Do not index, do not promote: no social post, no newsletter mention, no sitemap change beyond what the build does. launchReady stays false.

## 2. Marble Terrace switched off, one flag to bring it back
1. Both `marble-terrace` (Gondomar) and `marble-terrace-vila-do-conde` get `pending: true`. They then disappear from main and stay visible on design-v2. To bring them back: `pending: false`. Write that line in ops/TASKS.md.
2. Check that nothing on main still points at them:
   - the Gondomar and Vila do Conde place cards;
   - the home cards;
   - the Concierge buildings;
   - the RequestSheet blocks;
   - the email images under /img/email/ (they stay; they are used by sent emails);
   - internal links.
   
   No dead link, no empty box.
3. Delete nothing: images, data and components stay in the repo.

## 3. No agency name anywhere on the site
1. Add `config.agency.public` (false). While false, the site names no agency, no AMI licence and no agency website. Requests still go to the same agency (routing, emails and hard rule 6 unchanged). Setting it to true brings every mention back.
2. **What the site says instead**, in each language:
   - In the interface: "um consultor qualificado" / "a qualified advisor" / "un conseiller qualifié".
   - In the privacy policy and legal notice: the recipient category "um consultor qualificado de uma mediadora imobiliária licenciada" (a category of recipients is enough: GDPR art. 13(1)(e)).
3. Cover every place:
   - content/copy/COPY_DECK.md: every block with {agency} or {ami}, and every "agência parceira" / "partner agency" / "agence partenaire". Rewrite each sentence so it reads naturally in PT, EN and FR, with no "a um", "de un" or doubled words.
   - the V2 footers (both), the partners page agency section, the buy page partner box, TalkPage, OursPage, CasaPage, lib/team.ts (the agency role shows no name), the BlogPost CTA and the unit-page request "to" line;
   - content/faq/common-pt, common-en and common-fr.yaml.
4. **Same pass: Maré is one click now (D87).** Remove "dupla confirmação" / "double opt-in" / "double confirmation" from the privacy text and from how.s5.p.
5. **Not yours:** the consent text of the three Tally home-request forms (BEEzgN, dbE4VV, YjPKyv) still names the agency. The CEO changes those through the Tally connector; just list them in the report.

## 4. Acceptance list (check each on main after the push, phone and desktop)
1. /en/lu/map/ and /pt/lu/mapa/: Gondomar shows the O'rizon pin, labelled "Our pick" / "Seleção", never "Sponsored".
2. The O'rizon showcase opens from the pin and from the Gondomar card. It has its homes with published prices and the features agreed with the operator, and it looks at least as good as Marble Terrace did.
3. imoveisportugal.pt/orizon opens the map on Gondomar.
4. Marble Terrace appears nowhere on main, Gondomar or Vila do Conde, and still appears on design-v2.
5. Searching the built main site (dist) for "Habinedita" and "13250" returns nothing.
6. No sentence reads badly where "agência parceira" was replaced (read every changed block in the three languages).
7. `node scripts/check-content.mjs`, `node scripts/check-parity.mjs` and the build pass.

## 5. Report
1. The live links: the map on Gondomar and the O'rizon showcase.
2. One screenshot of each, on a phone.
3. What you could not do from the operator's material.
4. The list of copy blocks you rewrote.
