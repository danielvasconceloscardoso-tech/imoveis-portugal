# Local and pull-request validation

Use the existing checkout and development branch. Each cloud task is isolated; do not create a worktree unless explicitly requested. Never move the permanent backup references or deploy from these instructions.

## Existing tools inspected

| Area | Existing implementation | Treatment |
| --- | --- | --- |
| Request endpoint | `scripts/test-worker.mjs`, mocked Cloudflare bindings | Keep all 18 tests; no real email |
| Content and translation parity | `scripts/check-content.mjs`, `scripts/check-parity.mjs` | Run before a PR; parity regenerates a local report |
| Visual regression | `scripts/visual-check.mjs`, approved `ops/snapshots/baseline` images | Preserve baseline; never use `--update` without approval |
| Performance/accessibility | `scripts/scorecard.mjs`, `scripts/audit/bench.mjs`, axe-core | Add local Lighthouse runner; old scorecard expects extra paths/network and writes a tracked report |
| Analytics | Cloudflare Beacon and `site/src/lib/track.ts` | Keep existing cookie-free provider/event schema; no new service |
| Images | AVIF/WebP variants, `scripts/design/images.py`, story/project helpers | Keep existing pipeline; poster preload mismatch is a follow-up |
| Mapping | MapLibre, self-hosted data, lazy import, adaptive resolution/terrain/cache and GPU cleanup | Preserve these optimizations; test map search and canvas |
| Monitoring | Existing metrics workflow, browser error checks | PR tests capture uncaught browser errors; no new production error-monitoring vendor |

## Install and start

Node 24 and npm are used locally and in PR validation. From `site/`:

```sh
npm ci --no-audit --no-fund
ASTRO_TELEMETRY_DISABLED=1 WORKERS_CI_BRANCH=main npm run dev -- --host 127.0.0.1 --port 4321
```

`WORKERS_CI_BRANCH=main` enables production content filtering locally; it does not alter Git branches or deploy anything. Omit it only to inspect pending content deliberately. The source-level redirect helper fixes the original Vite dependency-scan failure. Generated builds/reports are excluded from the dev watcher to avoid exhausting file watchers.

## Test

```sh
npm run test:content
npm run test:worker
ASTRO_TELEMETRY_DISABLED=1 WORKERS_CI_BRANCH=main npm run build:test
npx playwright install --with-deps chromium
npm run test:e2e
```

The cloud image already has `/usr/bin/chromium`; use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e` there instead of downloading another browser. Playwright starts a static preview automatically unless `E2E_BASE_URL` explicitly selects an existing preview. Run tests only against a completed current build. The desktop project uses 1440×900; mobile uses an iPhone-sized Chromium context, 390×844. These are browser emulations, not physical-device testing.

E2E blocks third-party requests, so no form submission, analytics event or email is sent remotely. Tests cover all six edition homes, arrival language/persistence/browser locale/touch targets, menu/search focus and dismissal, map search and the hidden-partner redirect. Screenshots and traces are retained on failure.

For Lighthouse, start a static preview in one terminal:

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run preview -- --host 127.0.0.1 --port 4323 --outDir ./artifacts/dist
```

Then in another, from `site/`:

```sh
node scripts/wait-for-preview.mjs
CHROME_PATH=/usr/bin/chromium npm run test:lighthouse
```

Omit `CHROME_PATH` when using the Playwright-installed browser, as CI does. Reports are local JSON/HTML in `site/artifacts/lighthouse/`; no hosted audit service is used. The runner accepts only a loopback origin. `LIGHTHOUSE_PAGES=map-us` limits a rerun to a changed target.

## Budgets and known limitations

Arrival and US/Luxembourg homes require performance ≥70 and accessibility ≥90 on both mobile and desktop. The map requires accessibility ≥90, LCP ≤4 seconds and CLS ≤0.1. Software WebGL produced baseline map performance scores around 61–65 and high total blocking time; that score and TBT remain explicit diagnostics rather than a passing performance score. SEO is reported but ungated because the prelaunch site intentionally uses `noindex` and local previews use a loopback origin. Full production services, physical devices and production deployment identity are outside these local checks.

The read-only PR workflow runs content/worker checks, a production-mode build, the four Playwright viewport projects and ten Lighthouse audits. It uploads reports for 14 days. It contains no deployment step or production credentials. GitHub-hosted workflow execution must be checked after the PR is created; local success does not prove hosted CI passed.

## Issue 4 main-map checks

Run `npm run test:config` before the browser suite: Playwright context motion preferences belong in `use.contextOptions`, and the type check catches unsupported configuration. `npm run test:marker` runs six contracts against the actual production marker-scheduling adapter.

The map matrix uses explicit content viewports: 1440×900, 390×844, 430×932 and 844×390. The iPhone device preset alone uses a shorter browser viewport; an additional 390×664 case checks the compact layout. Main-map engine, card navigation and controls are separate contracts. Keep browser suites, screenshot capture, profiling and Lighthouse serial in this software-WebGL cloud environment; the suite uses one worker. Per-action expectations and map Lighthouse budgets remain unchanged.

For original browser captures against an existing local preview:

```sh
EVIDENCE_BASE_URL=http://127.0.0.1:4332 EVIDENCE_PHASE=after-final EVIDENCE_ALL_SIZES=1 node scripts/main-map-evidence.mjs
EVIDENCE_PHASE=after-final node scripts/main-map-gallery.mjs
```

Run from `site/`; use the installed Playwright browser or set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. The gallery needs the retained `artifacts/issue4/before/screenshots/manifest.json`. Captures preserve original pixels. Intro captures use its normal pointer-hover pause, with a rendered map underneath.

For interaction profiling, run `MAP_PROFILE_BASE_URL=http://127.0.0.1:4332 MAP_PROFILE_PHASE=after-final node scripts/issue4-map-profile.mjs` from `site/`, serially. The report records source-loading diagnostics, renderer errors, terrain/resolution, camera and quality before/after the benchmark. A timeout, MapLibre error or quality change invalidates a row for performance comparison. The synthetic 100-pick/300-hover measurements are not INP. Different camera frames or graphics quality also limit before/after timing comparisons.
