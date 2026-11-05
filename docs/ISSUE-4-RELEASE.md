# Issue 4 — Main map release candidate · 5 November 2026

Visitors now enter a real Portugal map with natural terrain colors, an optional photographic arrival and editorial place cards that bring a place's story, dated prices and contextual Concierge into view. A horizontal region rail and responsive camera framing leave more room for geography.

| Identity | Value |
| --- | --- |
| Development branch | `codex/issue-4-main-map` |
| Verified code revision | `343593d2eb07cb642df9bebf001377842d6c48c5` |
| Final application change | `0b62517b87995beb6a336245e815c2c0107f763f` |
| Base main | `2eadc1932b770db1862c5016cb3e1515a47a606f` |
| Primary routes | `/en/us/map/`, `/pt/lu/mapa/` |
| Permanent backup branch / tag | `backup/pre-codex-2026-11-05` / `pre-codex-2026-11-05` |
| Verified backup SHA | `77552be5a5a5bdfbbf6517e4f5525408af5d03db` |
| Production deployment / merge | None |
| Final browser verification | PASS — 128/128 current cases; serial batches verified against final collection |

## Visitor experience

- A captioned, licensed Praia da Marinha photograph introduces Portugal over the map stage. The passive arrival lasts about 2.1 seconds; pointer hover or keyboard focus pauses dismissal. View the map, Skip, Escape and map interaction dismiss immediately. Returning visits, query/hash links and reduced motion bypass it; unavailable storage does not block entry.
- Warm ivory place cards combine existing licensed place and project imagery, their credits, verified narrative and an INE period beside the prices. Purchase costs, living-here answers and the existing final place fact expand on demand. Missing imagery never inherits another place's photograph. Source, save/share, paid-preview and contextual Concierge paths remain available.
- Desktop uses a side card; portrait uses a bottom sheet; short landscape uses a compact side card. Selected geography stays outside the card. Narrow phones show the full primary Concierge button; short viewports keep the median and period before budget detail. Close controls remain accessible when content scrolls and after leaving Golf.
- Sage land, softer green/ivory relief, muted bathymetry and quieter zoom-dependent boundaries preserve the existing DEM, source geometry and price ramps. The national view uses 35° pitch, with existing flat-device behavior and explicit 2D/3D controls. No renderer resolution or terrain quality is reduced to obtain test results.
- MapV3 owns loading: plain maps use its existing idle opportunity, direct places retain card/photo-first priority, and intentional interaction starts loading immediately. The introduction does not override this scheduling or delay loading until it ends. The poster remains until real municipality geography has painted.

Golf Mode remains **Issue #3**: its roster and native modules are unchanged. Premium styles exclude active Golf; its original palette is restored on entry and the premium palette on exit. Shared close-button handling supports both transition directions.

## Validation

| Check | Result |
| --- | --- |
| Production-mode static build | PASS — 7351 pages |
| Content and translations | PASS — 199 fact records; parity checks. Two pre-existing meaning-review flags retained. |
| Request endpoint | PASS — 18 mocked worker cases; no real email |
| Marker adapter | PASS — 6 contracts against production source |
| Browser configuration/spec types | PASS |
| Main/navigation browser batch | PASS — 100 unchanged journeys, 8 sourced-card checks and 12 isolated entry cases |
| Native Golf compatibility batch | PASS — 8/8 cases |
| Lighthouse route budgets | PASS — 10/10; zero audit-gatherer errors |
| Final screenshots | PASS — 24 originals, 8 viewport/locale combinations; zero errors or horizontal overflow |
| Hosted GitHub Actions | Not run: PR creation blocked by GitHub API access |

Lighthouse 13.6 with Chromium 155 replaces 12.3, whose optional trace gatherers failed against this browser. Production dependency versions did not change. Budgets remain: arrival/home performance ≥70; all accessibility ≥90; map LCP ≤4000ms and CLS ≤0.1. Map performance and TBT are explicit software-WebGL diagnostics, not scores claimed to meet the home floor. SEO remains ungated because the existing prelaunch site uses `noindex`.

| Profile/route | Performance | Accessibility | LCP (ms) | CLS |
| --- | ---: | ---: | ---: | ---: |
| mobile-arrival | 99 | 100 | 802 | 0.0000 |
| mobile-home-us | 88 | 100 | 3821 | 0.0000 |
| mobile-map-us | 65 | 100 | 2356 | 0.0012 |
| mobile-home-lu | 91 | 100 | 3420 | 0.0000 |
| mobile-map-lu | 68 | 100 | 2274 | 0.0013 |
| desktop-arrival | 100 | 100 | 225 | 0.0000 |
| desktop-home-us | 100 | 100 | 334 | 0.0000 |
| desktop-map-us | 62 | 96 | 648 | 0.0006 |
| desktop-home-lu | 100 | 100 | 335 | 0.0000 |
| desktop-map-lu | 61 | 96 | 673 | 0.0006 |

Restoring native load priority reduced the Luxembourg mobile Lighthouse LCP from 5088ms to 2274ms in the recorded 13.6 runs. Direct PerformanceObserver measurements identified the poster as LCP and placed engine downloads after first paint; no artificial engine delay was added. These local observations are not field INP or physical-device percentiles. Historical original map diagnostics 65/64 under Lighthouse 12 are preserved, but tool-version changes limit direct score comparisons.

## Rendering checks and limits

Municipal hover selection is coalesced to one query per frame. Coordinate caches invalidate with camera/elevation changes; unchanged label markup and budget feature states avoid repeated writes. Native marker terrain-occlusion checks are coalesced and scheduled across tasks while preserving native forced/non-forced behavior.

The adapter uses guarded private MapLibre 4.7.1 instance hooks. Re-review it on every MapLibre upgrade and run `npm run test:marker`; its six cases cover task boundaries, current position/throttle, forced requests, detached/replaced maps, Golf transition and missing-hook fallback. Real terrain browser checks remain necessary.

Native Golf global tile-idle is a separate diagnostic. The unchanged baseline also stayed stationary and ready while DEM tiles loaded after 52.6 seconds in the software renderer; no failed requests or style-update loop were observed. UI compatibility tests require a real completed render with expected mode/card/palette, loaded course data and real input. Console proofs preserve the actual frame snapshot without a second blocked protocol read. A naturally shorter viewport tests scrolling when the complete project otherwise fits on desktop. They retain 45-second render phases and 120-second aggregate integration bounds; UI expectations stay 10 seconds. Graphics quality is unchanged. A recorded 28-second browser/protocol round trip remains a software-GPU limitation. It does not measure INP or a physical-user input delay.

## Evidence and release handoff

The final collection contains 128 cases. Coverage is checked by test identity against three serial reports: 100 unchanged journeys from the main batch, 20 isolated entry/card checks, and 8 native compatibility checks. Retired combined-test identities and all previous failures/traces remain archived; none are counted as final passes.

Original before captures use the main baseline tree `c7b793930d61eb8b8df924a2c2ca6e59b93c7736` (identical to the prior build at 73f6309). This is a Git baseline, not a verified production deployment identity. After captures use real browser pixels; arrival shots use the application's normal hover pause without modified timers or imagery. See [the visual review](ISSUE-4-VISUALS.md) for committed before/after screenshots. The complete offline gallery is `site/artifacts/issue4/review.html`; the portable evidence archive is `site/artifacts/issue4/release-evidence.zip`. Final browser coverage is recorded in `site/artifacts/issue4/final-coverage.json`; Lighthouse reports are under `site/artifacts/issue4/after-final/lighthouse/`.

Independent creative and editorial review confirmed readable US/PT-PT cards, preserved credits and Partner/Pick identification, complete 390px Concierge controls and usable landscape cards. The landscape national overview remains visually dense and northern project pins can overlap; neither is presented as solved by this sprint.

[ISSUE-4-DESIGN.md](ISSUE-4-DESIGN.md) records the original direction and research boundary. Ten official live references returned proxy 403; their visuals were not inspected. The official MapLibre large-data guide was retrieved from GitHub. [TESTING.md](TESTING.md) supplies reproduction commands; [RESTORE-POINT.md](RESTORE-POINT.md) supplies recovery instructions.

GitHub push succeeds, but `gh pr create --draft` returned `Post https://api.github.com/graphql: Forbidden`; no PR URL was created. The [ready PR body](ISSUE-4-PR.md) and [GitHub comparison](https://github.com/danielvasconceloscardoso-tech/imoveis-portugal/compare/main...codex/issue-4-main-map?expand=1) provide the review handoff. No force-push, backup mutation, production merge or deployment was performed. Production release and any future rollback require explicit operator approval.
