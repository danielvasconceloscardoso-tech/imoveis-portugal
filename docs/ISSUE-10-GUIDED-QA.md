# Guided Programa Regressar — independent QA

The experience should explain Programa Regressar before asking for financial information. A visitor can reach official support without entering a salary or claiming eligibility. Imóveis Portugal must not imply that it operates the official programme or has booked an advisor.

## Browser coverage

`site/tests/e2e/regressar-support.spec.ts` adds six scenarios on desktop 1440×900 and mobile 390×844, using the existing Chromium projects:

1. Programme conditions precede income in document order. Native keyboard anchors reach the conditions and support sections without a financial calculation.
2. Official support is available with empty income. The three routes use the established programme, IEFP and Tax Authority HTTPS origins, with independent status and safe external-link relationships. No guessed email, telephone or individual advisor is advertised.
3. The preparation brief responds to country and return year while excluding salary and screening answers.
4. Denied clipboard permission falls back to focused, selected readonly text for manual copying.
5. Successful copying puts only the displayed preparation brief on the clipboard.
6. Preparing support sends no submission or cross-origin request, adds no financial value to a URL, and preserves local/session storage.

The fixture blocks every non-GET and cross-origin request. It collects uncaught browser errors. A test must exercise ordinary pointer or keyboard actions; forced clicks and synthetic submission do not establish an accessible path.

## Boundaries

The official origins are established references, not a claim that their current contact pages or named advisors were freshly verified. Network access to those official destinations remains restricted. The product must label the handoff honestly rather than pretend a homepage link books or contacts a person. A copy action prepares text; it never sends a message.

The brief should contain only generic preparation questions and optional country/year context. Financial figures and eligibility answers remain in the calculator and cannot be copied implicitly into support text.

No screenshots or Playwright traces are part of this review. Existing financial, screening, city-discovery and privacy tests remain required alongside the added support scenarios. Whole-page automated accessibility checks should distinguish confirmed violations from incomplete image/background checks. No automated report is a WCAG certification or a validation of current legislation.

## Execution status

The complete candidate passed **60/60 current desktop/mobile cases** (48 existing and 12 new), with zero skipped, unexpected or flaky cases. Fresh collection was compared by test identity to the actual report; no case is missing or failed. The six added support scenarios pass on both viewports. TypeScript also passed.

Six whole-page axe states passed with zero automatic violations, uncaught browser errors or horizontal overflow: programme/support before income in PT desktop/mobile and EN/FR desktop, plus a conditional Portuguese income result and a Matosinhos local-life result. Automated incomplete image/pseudo-background contrast checks remain manual-review categories; there is no WCAG-certification claim. All browsers were closed before performance measurement.

Evidence: `site/artifacts/guided-return/browser-results.json`, `collected.json`, `final-coverage.json` and `axe-results.json`. Coverage records 19 feature/test SHA-256 hashes. No screenshot or Playwright trace was produced.
