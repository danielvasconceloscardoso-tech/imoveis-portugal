# Prompt 41: Concierge, show what's available as they type, and real time slots

CEO, 29 Oct 2026, 10:45. Operator's request after testing the Concierge live. **Change only the Concierge; the rest stays as it is.** Ship per D67 as soon as it works.

## 1. "Where in Portugal?": show the buildings right there

1. As the reader types a place (with or without accents or capitals, and including nearby names: "Gondomar", "Porto", "perto do Porto", "Norte"), show the matching listed buildings **under the field, in the same step**, before "Continue". The data comes from `content/developers/projects.json`, the same source as the map.
2. **Each building is a compact card:**
   - photo;
   - name;
   - place;
   - typologies;
   - what's available now (counts from the availability table);
   - "Preço sob consulta".

   Each card has two actions, "Ver no mapa" and "Pedir visita privada"; the visit request opens the request flow of prompt 38 §1b (D66).
3. One line above the cards: "Disponível agora em Gondomar" (in the reader's language), or "Perto de Gondomar" when the match is nearby.
4. If nothing matches, show nothing and keep the step as it is. "Continue" and "Skip" stay, so the reader can carry on with the Concierge.

## 2. "When suits you best?": real slots, like the request flow

Replace the three vague choices (weekdays early evening, weekdays during the day, Saturday morning) with the slot picker from the request flow (prompt 38 §1b, step 3):

1. The next 14 days, as a horizontal row of days. Tap a day to see its times in 30-minute steps within the advisor's hours.
2. The reader picks up to three preferred slots.
3. Every time shows in Portugal time and in the reader's own time zone, side by side (for example "10:00 Lisboa · 11:00 Luxembourg"). Detect the time zone from the browser, and let the reader change it in one tap.
4. One shared component for the Concierge and the request flow, so both always look and behave the same.
5. Until the operator confirms the advisor's real hours, use weekdays 09:00–19:00 and Saturday 10:00–13:00, Portugal time, kept in one config value.

## Rules

- Apple-grade (prompt 35 §3): one question per screen, no form look, everything works with one tap on an iPhone.
- PT, EN and FR parity.
- Nothing is sent: the Concierge still ends in the demonstration confirmation.
- Test in Playwright, WebKit at 390×844 and Chromium at 1440×900, with zero console errors.

## Ship it (D67)

1. On `design-v2`, run `git fetch && git merge origin/main`, then commit as "Imoveis Portugal" <ops@imoveisportugal.lu>.
2. Run the checks and the build.
3. Merge into `main` and push both branches. Watch the Cloudflare build until it is green.
4. Open https://imoveisportugal.pt, type Gondomar in the Concierge, and confirm Marble Terrace appears.
5. If anything breaks, revert on `main` at once.

**Report:** the commit hash and "live", plus one line on anything not done.
