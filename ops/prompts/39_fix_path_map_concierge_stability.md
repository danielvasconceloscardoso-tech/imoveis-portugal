# Prompt 39: fix "Passo a passo", show the buildings, Concierge listings, a site that never crashes

CEO, 28 Oct 2026, 22:25. Branch `design-v2`. The operator's father shows the site to the Marble Terrace developer tomorrow (29 Oct). **Start now. Hard deadlines tonight, Luxembourg time, each pushed and built on the preview:** §0 immediately; §2 and §3 by 23:00; §1 by 23:30; §4 by 00:00.

## 0. First: push what you have

The site was updated from your workspace, but nothing new is on GitHub since 11:55. Before anything else:
1. Commit as "Imoveis Portugal" <ops@imoveisportugal.lu>.
2. Run `git fetch && git merge origin/main` on `design-v2`.
3. Push to `origin design-v2`.

From now on, the preview is built only from GitHub, so it can never fall behind or be lost. Never commit the Marble Terrace PDFs.

## 1. "Passo a passo" is confusing (operator: "text goes down / to the wrong section when I click OK")

1. **The bug:** after an answer or "OK", the page jumps and the next text appears lower down or in the wrong section. After each answer, the next step must appear in the same place, at the top of the viewport. Reserve its space so nothing shifts, keep focus on it, and never scroll the reader past it.
2. **Make it simple, Apple-grade:**
   - one question per screen, one action;
   - a small progress line showing where you are (for example step 3 of 7), with "Back" always available;
   - no paragraph longer than two sentences; anything longer goes into an article link.
3. **Test** every path (buy, sell, inherit) in PT, EN and FR, at 390×844 (WebKit) and 1440×900 (Chromium). The test fails if the step's top moves after an answer.

## 2. The map: Gondomar and the listed buildings must be visible without searching

1. The "Novos empreendimentos" layer is on by default.
2. Every listed building has a pin visible from the opening view of Portugal. Cluster the pins when zoomed out, with a count, and expand them on zoom.
3. Marble Terrace shows its name at city zoom.
4. Gondomar has a label at the same zooms as the other municipality seats.
5. The pins and the Gondomar card read from `content/developers/projects.json`, so the next building appears with no code change.
6. Opening `/mapa/?place=gondomar` flies to Gondomar with the Marble Terrace card open.

## 3. The Concierge must offer the listed buildings

1. When a reader is buying, the Concierge shows the matching listed buildings as cards: the photo, the name, the place, the typologies and "Preço sob consulta", plus two actions, "Ver no mapa" and "Pedir visita privada".
2. The match uses the place, region or budget the reader gave. "Porto", "Norte", "Gondomar" and "perto do Porto" all bring up Marble Terrace.
3. Add "Ver novos empreendimentos" as a first-screen choice, so a reader can reach the buildings in one tap.
4. The data comes from `content/developers/projects.json`: one source for the map, the Concierge and the showcase pages.
5. A visit request from the Concierge follows D66: it goes only to the qualified advisor, with one unticked consent box naming him.

## 4. Stability: no crash, anywhere (operator: "the site crashes a bit, especially the map")

**Find the causes and fix them. Likely suspects:**
1. **WebGL context loss on iPhone:** listen for `webglcontextlost`, restore automatically, and fall back to 2D if restoring fails. The reader never sees a blank map.
2. **Memory:**
   - only one MapLibre instance per page, removed when the reader leaves;
   - no re-initialising on navigation;
   - `pixelRatio` capped at 2 on phones;
   - a limited tile cache;
   - terrain and 3D sources loaded only in 3D mode.
3. **The tour and the time slider:** cancel running animations before starting new ones, so they never stack, and pause everything when the tab is hidden.
4. **The home page:** the hero film and the map never run heavy work at the same time. The map wakes only when it is in view and sleeps when it leaves.

**Then prove it by 00:00:**
1. **Soak test, 10 minutes each,** in Playwright Chromium at 1440×900 and in WebKit at 390×844. The script pans, zooms, runs the tours, switches 2D and 3D, opens cards, runs the Concierge and the request flow, and moves back and forth between pages.
   - **Pass:** zero page errors and zero console errors; memory flat (no steady growth); no blank map.
2. **Crawl every built page** (about 1,300) for console errors and broken links; fix them all.
3. **Keep:**
   - the 308/308 click test;
   - Lighthouse mobile at least 95 on the home page and 90 on the map page;
   - the hero film exactly as it is;
   - the "Lisboa" label at every zoom.

## 5. Report

**Push after each section** that works; every push must leave the preview working.

At each deadline, reply with:
1. the commit hash;
2. the preview link to Gondomar on the map;
3. the soak-test result in one line (errors, memory at the start and end);
4. one line on anything not fixed.

Don't publish, send or merge into `main`.
