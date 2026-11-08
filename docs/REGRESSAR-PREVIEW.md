# Regressar — prototype refinement for review

Preview: `site/public/previews/regressar-beta/index.html` (self-contained; open directly in a browser).

Based on the user-supplied `Simulador_Regresso_beta.html`, SHA256
`0c3b65e9ffe7be95c677a68309b4c07ec6c3c0af6f0a7b6c3526c49ca58c524d`.
Original attachment remains unchanged. Approved for production by the operator on 8 November 2026, with the result label “Com Programa Regressar”. The Portuguese simulator routes render this exact HTML; existing French and English routes are unchanged.

Preserves the original layout, breakpoints, controls, tax calculations, exchange-rate snapshots, housing assumptions, city selection, embedded photographs and embedded fonts. Refines Portuguese copy, colours, typography, spacing and the existing Imóveis Portugal × Programa Regressar signature. The summary button remains a local demonstration. The dashboard is explicitly fictional and no simulations are collected. The signature represents a design proposal, not an official partnership.

Tax calculations and source claims are inherited from the supplied prototype, not independently revalidated by this visual refinement. In particular, the 2027 scenario is conditional and snapshot exchange rates are not live. Behavioural parity is not certification of fiscal accuracy.

Verification (from repository root):

```sh
node site/scripts/test-regressar-preview.mjs /path/to/Simulador_Regresso_beta.html
```

46 desktop/mobile scenarios compare numeric results, city choices, bar proportions, prepared summaries and tab visibility against the original. Covers countries, currencies, payment counts, years, preferences, rent/buy, summary reveal and input limits. Embedded images/fonts are compared by hash (unique assets; initial city photos also appear in pre-rendered cards). The initial state is included in the HTML to prevent content moving while JavaScript starts. Production serves the same image/font bytes as content-hashed static files, keeping the HTML small; the downloadable preview remains self-contained. No horizontal overflow at 1440px or 390px. All external requests are blocked during testing. No screenshots are produced.

Protected rollback references remain at `77552be5a5a5bdfbbf6517e4f5525408af5d03db`:
`backup/pre-codex-2026-11-05` and `pre-codex-2026-11-05`.

Release validation: production build generated 7,411 pages; content/parity checks and test configuration type-check passed. All 66 simulator browser cases passed across the main run and corrected language assertion reruns; the two approved-page cases were rerun after production asset extraction. The final built HTML passed 46 original/refined parity scenarios. Lighthouse: desktop and mobile performance 100, accessibility 95; both route budgets passed. Public deployment verification is blocked by this environment's domain allowlist (CONNECT 403); a source push alone is not evidence of a completed Cloudflare deployment.
