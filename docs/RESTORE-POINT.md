# Restore point — 2026-11-05

- Baseline commit: `77552be5a5a5bdfbbf6517e4f5525408af5d03db`
- Permanent backup branch: `backup/pre-codex-2026-11-05`
- Permanent backup tag: `pre-codex-2026-11-05`
- Development branch: `codex/development-2026-11-05`
- Working tree was clean before setup.

Both backup references were pushed atomically and verified with `git ls-remote`
on 2026-11-05. Both references and remote `main` pointed to the baseline above.
The exact production deployment commit has not been verified. This is a Git
restore point, not a backup of Cloudflare bindings, secrets, subscriber data,
or other external service state.

## Verify and inspect the baseline

```sh
git ls-remote origin refs/heads/backup/pre-codex-2026-11-05 refs/tags/pre-codex-2026-11-05
git fetch origin tag pre-codex-2026-11-05
git show --no-patch --format=fuller pre-codex-2026-11-05
```

Both remote references must resolve to the full baseline SHA above. Never move,
modify, delete, or force-push either backup reference.

## Prepare a recovery branch

Preserve any uncommitted work first. In a clean working tree, create a new branch:

```sh
git switch -c recovery/pre-codex-2026-11-05 pre-codex-2026-11-05
cd site
npm ci --no-audit --no-fund
ASTRO_TELEMETRY_DISABLED=1 WORKERS_CI_BRANCH=main npm run build -- --outDir /tmp/imoveis-portugal-recovery-dist
```

This prepares the old site locally. It does not change production. Any merge,
production rollback or deployment requires explicit operator approval. Do not
reset or force-push `main`. Cloudflare deployment history and external bindings
must be checked separately before an approved production recovery.

## Issue 4 development baseline

`codex/issue-4-main-map` starts from `main` at `2eadc1932b770db1862c5016cb3e1515a47a606f`. The owner had merged the earlier development work before this branch was created. That commit is a verified Git baseline, not a verified production deployment identity. The permanent pre-Codex backup branch/tag above remain unchanged at `77552be5a5a5bdfbbf6517e4f5525408af5d03db`.

See [ISSUE-4-RELEASE.md](ISSUE-4-RELEASE.md) for the release candidate and validation. Inspect the Issue 4 baseline on a separate recovery branch if needed; never force-reset `main`. Any future production rollback also requires explicit operator approval.
