# Keyboard-accessible arrival, menus and search with automated PR checks

The arrival page could display Portuguese or French while declaring English to assistive technology. The menu and search also allowed focus to leave the active surface and did not consistently restore it after dismissal.

This change aligns document language with the selected language, gives arrival language buttons 44px targets, and adds focus containment, Escape dismissal, background isolation and reliable opener restoration to navigation and search. Ctrl/Cmd+K can reopen search during its closing animation. Existing redirect HTML is moved into a TypeScript helper so the standard development dependency scan succeeds.

Playwright now covers desktop and mobile flows. A read-only pull-request workflow runs content/worker checks, the production-mode build, E2E and local Lighthouse budgets, then uploads reports. Existing analytics, images and MapLibre infrastructure are retained. No deployment step, production credentials or paid service is added.

Validation: 7,309-page build, content/parity checks, all 18 request tests and all 28 desktop/mobile E2E tests passed locally. Lighthouse route budgets passed: mobile arrival/home performance 90/87, accessibility100; map performance 65/64 remains diagnostic, with separate LCP/CLS/accessibility gates. Independent QA verified focus handoffs and dismissal.

The approved visual-baseline comparison still fails: the untouched backup reproduces the same glyph-rendering mismatch (US mobile 1.6398% for both backup control and development). Desktop differences beyond that control are confined to live-map rendering. The approved baseline is unchanged; see docs/DEVELOPMENT-BASELINE.md for evidence and limitations. Hosted CI has not yet run.

The immutable backup branch/tag point to 77552be5a5a5bdfbbf6517e4f5525408af5d03db. Restore instructions are in docs/RESTORE-POINT.md. This PR is for review only; no production merge or deployment is requested.
