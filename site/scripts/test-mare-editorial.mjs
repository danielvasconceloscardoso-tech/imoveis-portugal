// Maré editorial review preflight. Run from site/: node scripts/test-mare-editorial.mjs
// Does not replace actual Gmail/Apple Mail/Outlook visual QA or owner approval.
import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { join } from 'node:path';

const root = join(process.cwd(), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const issues = ['2026-12-01', '2026-12-04'];
const work = { '2026-12-01': 'the-brief', '2026-12-04': 'the-escape' };
let checks = 0;
function ok(condition, message) { assert.ok(condition, message); checks++; }

for(const date of issues) {
  for(const lang of ['pt', 'en', 'fr']) {
    const draft = read(`docs/editorial/mare/${date}-${work[date]}.${lang}.md`);
    ok(/status: editorial-review/.test(draft), `Draft must stay review-only: ${date}/${lang}`);
    ok(draft.includes('quiz_correct:') && draft.includes('sources:'), `Source and quiz metadata missing: ${date}/${lang}`);
    ok(draft.split(/\s+/).length > 300, `Story is too short: ${date}/${lang}`);
    const preview = read(`site/public/mare/revisao/${date}${lang === 'pt' ? '' : '-'+lang}.html`);
    ok(/<meta name="robots" content="noindex,nofollow">/.test(preview), `Review-only previews must not index: ${date}/${lang}`);
    ok(/https:\/\/www\.imoveisportugal\.pt\/img\/v2\//.test(preview), `First-party absolute image URL missing: ${date}/${lang}`);
    ok(/<img[^>]+alt=/.test(preview), `Image alt missing: ${date}/${lang}`);
    ok(!/<script\b/i.test(preview), `Email HTML must not execute JavaScript: ${date}/${lang}`);
    ok(!/Espaço de parceiro|This week's home|A casa da semana/.test(preview), `Obsolete sponsor block: ${date}/${lang}`);
    ok((preview.match(/<p style=/g)||[]).length >= 6, `Newsletter story absent: ${date}/${lang}`);
    for(const choice of ['A','B','C']) ok(preview.includes(`resposta=${choice}`), `Missing quiz CTA ${choice}: ${date}/${lang}`);
    const quiz = read(`site/public/mare/jogar/${date}${lang === 'pt' ? '' : '/'+lang}/index.html`);
    ok(quiz.includes('URLSearchParams') && quiz.includes('aria-live'), `Quiz must provide an immediate accessible reveal: ${date}/${lang}`);
    ok(quiz.includes('noindex,nofollow'), `Quiz preview must remain unindexed: ${date}/${lang}`);
  }
}
const library = read('site/src/lib/mare.ts');
ok(library.includes('o.origin || "https://www.imoveisportugal.pt"'), 'Maré iframe/email assets must have an absolute public origin');
ok(!library.includes('Espaço de parceiro'), 'Unsigned sponsor placeholder must be removed');
const policy = read('docs/editorial/MARE-EDITORIAL-CONSTITUTION.md');
ok(policy.includes('The owner chooses the story BEFORE research'), 'Subject approval gate must be authoritative');
ok(policy.includes('send approved'), 'Separate owner send-approval gate missing');
console.log(`Maré review preflight: ${checks} checks passed. Actual email client tests and final owner approval remain REQUIRED.`);
