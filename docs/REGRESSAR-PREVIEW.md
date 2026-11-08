# Regressar — prototype refinement for review

Preview: `site/public/previews/regressar-beta/index.html` (self-contained; open directly in a browser).

Based on the user-supplied `Simulador_Regresso_beta.html`, SHA256
`0c3b65e9ffe7be95c677a68309b4c07ec6c3c0af6f0a7b6c3526c49ca58c524d`.
Original attachment remains unchanged. This is an isolated preview, not a replacement for the existing simulator route. Production publication requires a new explicit approval.

Preserves the original layout, breakpoints, controls, tax calculations, exchange-rate snapshots, housing assumptions, city selection, embedded photographs and embedded fonts. Refines Portuguese copy, colours, typography, spacing and the existing Imóveis Portugal × Programa Regressar signature. The summary button remains a local demonstration. The dashboard is explicitly fictional and no simulations are collected. The signature represents a design proposal, not an official partnership.

Tax calculations and source claims are inherited from the supplied prototype, not independently revalidated by this visual refinement. In particular, the 2027 scenario is conditional and snapshot exchange rates are not live. Behavioural parity is not certification of fiscal accuracy.

Verification (from repository root):

```sh
node site/scripts/test-regressar-preview.mjs /path/to/Simulador_Regresso_beta.html
```

46 desktop/mobile scenarios compare numeric results, city choices, bar proportions, prepared summaries and tab visibility against the original. Covers countries, currencies, payment counts, years, preferences, rent/buy, summary reveal and input limits. Embedded images/fonts are compared by hash. No horizontal overflow at 1440px or 390px. All external requests are blocked during testing. No screenshots are produced.

Protected rollback references remain at `77552be5a5a5bdfbbf6517e4f5525408af5d03db`:
`backup/pre-codex-2026-11-05` and `pre-codex-2026-11-05`.
