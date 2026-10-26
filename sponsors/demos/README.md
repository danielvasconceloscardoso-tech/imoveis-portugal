# Private developer demos (prompt 26 §2) · English only (D51) · not published

Unlisted pages on the branch preview, noindex (meta and X-Robots-Tag), out of the sitemap and every menu. Send a link only after the operator's go.

| Developer | Demo page | Video (68 s, English subtitles) | One-page PDF |
|---|---|---|---|
| Shalu Investments · O'rizon Living (Gondomar) | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/f658bd1eef/ | demo-f658bd1eef.mp4 | ImoveisPortugal_Demo_Shalu_ORizon-Living.pdf |
| Vanguard Properties · Muda, Comporta | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/34c86306cf/ | demo-34c86306cf.mp4 | ImoveisPortugal_Demo_Vanguard_Comporta.pdf |
| Vale do Lobo · The Residences (Loulé) | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/65bf930b11/ | demo-65bf930b11.mp4 | ImoveisPortugal_Demo_ValeDoLobo_The-Residences.pdf |
| OneMark Properties · pre-launch | https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/259206fcf0/ | demo-259206fcf0.mp4 | ImoveisPortugal_Demo_OneMark.pdf |

How they are built: site/src/lib/demos.ts (facts and sources), site/src/pages/d/[token]/ (page, one-pager, project pins), site/scripts/demo-video.mjs and demo-pdf.mjs (run with the built site served on port 4326).

Rules followed: only what each developer published (name, location, typologies, dates, one render with its credit); no "price from" is published by any of them, so the cards say "Price on request"; all market figures are INE's with their period; the monthly report is marked "Illustrative example · not real data".

To confirm (task 26a): Muda's municipality (placed in Alcácer do Sal, the Comporta parish; Vanguard says "Comporta region"); an official O'rizon Living page, if one exists; OneMark has no public project yet (empty pins in Lisbon, Grândola and Sines). The idealista article for Vale do Lobo is cited by its headline and link; idealista pages could not be opened from the build environment.
