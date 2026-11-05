Visitors arrive on a natural, live map of Portugal, with an optional photographic welcome and a horizontal region rail. Sourced place cards bring photography, local context and budget information together, with responsive layouts and accessible controls.

This change applies to the US English and Luxembourg Portuguese main maps. Issue #3’s Golf roster and modules are untouched; shared enter/exit behavior receives compatibility coverage. Photo credits, project identification and the unavailable paid-analysis preview are preserved.

Validation completed:

- Production build: 7,351 pages; content/parity checks; 18 worker tests; 6 marker tests; TypeScript checks.
- 24 screenshots across eight viewport/locale combinations: all ready, zero recorded errors or horizontal overflow.
- Independent visual and editorial reviews approved.

- Browser regression: 128/128 current cases, checked by identity across serial batches, including 8 native Golf compatibility cases.
- Lighthouse: 10/10 route budgets passed, zero gatherer errors. Lighthouse 13.6 supports Chromium 155; production dependencies unchanged. Retained 4-second map LCP, 0.1 CLS, accessibility 90 and home performance 70 thresholds. Map performance scores remain diagnostic (61–68), not a claimed 70+ result.

A MapLibre 4.7 instance hook uses a private method and needs review on upgrades. Browser evidence uses a software GPU; physical-device validation remains a limitation. No deployment was performed.

Branch: `codex/issue-4-main-map`; base: `2eadc1932b770db1862c5016cb3e1515a47a606f`; permanent backup: `77552be5a5a5bdfbbf6517e4f5525408af5d03db`.

See [before/after screenshots](https://github.com/danielvasconceloscardoso-tech/imoveis-portugal/blob/codex/issue-4-main-map/docs/ISSUE-4-VISUALS.md), [release notes](https://github.com/danielvasconceloscardoso-tech/imoveis-portugal/blob/codex/issue-4-main-map/docs/ISSUE-4-RELEASE.md), [design](https://github.com/danielvasconceloscardoso-tech/imoveis-portugal/blob/codex/issue-4-main-map/docs/ISSUE-4-DESIGN.md), and [testing](https://github.com/danielvasconceloscardoso-tech/imoveis-portugal/blob/codex/issue-4-main-map/docs/TESTING.md) for evidence and implementation details.

Closes #4.
