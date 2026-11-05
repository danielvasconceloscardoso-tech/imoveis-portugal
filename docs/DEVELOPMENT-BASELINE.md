# Development validation — 2026-11-05

Branch: `codex/development-2026-11-05`. The permanent Git restore point is documented in [RESTORE-POINT.md](RESTORE-POINT.md). All work remains on the development branch; no merge or deployment was performed.

## Implemented

1. Arrival language follows the browser/saved selection in the document language as well as visible content. Language controls provide 44px touch targets.
2. The full-screen menu contains keyboard focus, closes with Escape, restores the opener, isolates the background and releases scroll locks correctly. The country picker is mutually exclusive.
3. Search contains keyboard focus, handles Escape from results, restores its opener and supports immediate reopening with Ctrl/Cmd+K during the closing animation.

Also extracted existing redirect response markup into a TypeScript helper to fix Vite's dependency scanner; emitted redirect behavior is preserved. Generated validation outputs are excluded from the development watcher to prevent file-watcher exhaustion.

## Verified locally

- Node 24.22.1 and npm 11.9.0; a clean `npm ci` installed 484 packages from the final lockfile.
- Normal Astro dev server returned HTTP 200 and executed interactive language selection.
- Production-mode static build: 7,309 pages, passed.
- Content checks: passed, covering 21 FAQ files, 160 inbox pieces, 27 blog/pillar articles, 31 lifestyle articles and 199 facts.
- Parity checks: passed; two existing blocks remain flagged for human review. The original tracked generated report was preserved.
- Request endpoint: all 18 mocked tests passed; no real email sent.
- Playwright: 28 tests passed across desktop/mobile in an isolated run. Coverage includes six editions, language persistence, menu/search keyboard behavior, immediate reopening, actual map search and redirect fragment preservation. The initial-locale cases were additionally rechecked using each project's device dimensions.
- Independent QA checked menu-to-search transitions, backdrop dismissal, focus restoration and background isolation at widths 1440 and 390.
- Workflow YAML parsed; hosted GitHub Actions has not executed because PR creation is blocked.

A first concurrent run timed out on one map test and scored the mobile home below its performance budget. Those failures were retained in `site/artifacts/prior-validation/`. Running the suites separately resolved both without increasing timeouts or reducing the home budget.

## Lighthouse, final isolated run

| Page | Mobile performance / accessibility | Desktop performance / accessibility |
| --- | --- | --- |
| Arrival | 90 / 100 | 100 / 100 |
| US home | 87 / 100 | 99 / 100 |
| US map | 65 diagnostic / 100 | 64 diagnostic / 96 |

The runner exited 0 against the documented route budgets. Map LCP was 2.36s mobile / 0.57s desktop, with CLS below 0.002. Map performance and high software-WebGL blocking time remain diagnostics, not a passing performance score. The desktop map retains a `.beta` contrast finding. SEO remains intentionally ungated while `noindex` is enabled. Reports are in `site/artifacts/lighthouse/`.

## Visual comparison remains failed against the approved baseline

Two representative homes at two sizes exceeded the existing 0.5% threshold. An untouched backup build reproduced the US-home failure in the same browser:

| US home | Backup control | Development |
| --- | --- | --- |
| Desktop | 0.5419% | 0.5958% |
| Phone | 1.6398% | 1.6398% |

Above the map, the changed-pixel masks match exactly between backup and development at both sizes; the phone's entire mask matches. The small additional desktop difference is confined to the live map. This isolates an existing browser/font rendering mismatch plus map variation. It does not turn the failed approved-baseline check into a pass. The approved baseline was not updated. Evidence: `site/artifacts/control-visual/` and `site/artifacts/prior-validation/visual-diff/`.

## Remaining external prerequisites

Git push works and backup references were verified remotely. `api.github.com` is blocked by the environment proxy (CONNECT 403), preventing creation of the requested draft PR. An injected GitHub token variable exists; no new token or production credential has been requested.

The configuration service rejects updates with `draft_not_editable`. Installation/start instructions and the required API domain are preserved in [CLOUD-SETUP-PROPOSAL.json](CLOUD-SETUP-PROPOSAL.json); they have not been persisted to the environment configuration. Apply through a new editable environment setup draft, preserving any network rules added since this proposal. No publication or fresh-task restoration has been verified.

Production mail delivery, third-party integrations, physical devices and the actual production deployment SHA remain unverified. No paid service was introduced. See [TESTING.md](TESTING.md) for commands and the existing-tool inventory.
