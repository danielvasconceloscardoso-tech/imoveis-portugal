# Prompt 42: "Começar" opens the Concierge, and a calm closing line

CEO, 29 Oct 2026, 12:05. Operator's test on iPhone. **Change only what's below; the rest stays as it is.** Ship per D67 as soon as it works.

## 1. The home form opens the Concierge

**Today:** on the home hero (Vivo · Quero · Orçamento · Começar), "Começar" sends the reader to "Passo a passo". On a phone, too.

**Wanted:** on every device and in every language and edition, "Começar" opens the Concierge sheet on the same page, already filled in with what the reader chose:
1. the country they live in (the edition);
2. what they want (buy, sell, inherit);
3. the budget, if they typed one.

The Concierge skips those questions and starts at the next one. The progress line counts only the remaining steps. "Back" returns to the answers they gave, editable. With JavaScript off, the button still works as a link to the Concierge.

## 2. The closing line of the Concierge

On the confirmation screen, under the next steps, add one quiet paragraph and two text links, in the reader's language:

- **PT:** "Até lá, se lhe for útil, o Passo a passo e os nossos artigos explicam cada etapa. Na conversa, esclarecemos o resto, com calma." Links: **Passo a passo** · **Artigos**
- **EN:** "Until then, should it help, our Step by step and articles walk through each stage. Everything else, we'll go through together, at your pace." Links: **Step by step** · **Articles**
- **FR:** "D'ici là, si cela vous est utile, notre Pas à pas et nos articles présentent chaque étape. Nous verrons le reste ensemble, à votre rythme." Links: **Pas à pas** · **Articles**

**Style:** calm and spacious, the same type as the rest of the sheet. No icons, no buttons, no exclamation marks. The links open the reader's edition pages in the same tab, and the Concierge state is saved so "Back" returns to it.

## Rules

- Use only the copy given above; PT, EN and FR parity.
- Nothing is sent: the Concierge still ends in the demonstration confirmation.
- **Test in Playwright:**
  - WebKit at 390×844 and Chromium at 1440×900, with zero console errors;
  - "Começar" opens the Concierge with the three answers filled in, on /pt/lu/, /en/us/ and /fr/fr/.

## Ship it (D67)

1. On `design-v2`, run `git fetch && git merge origin/main`, then commit as "Imoveis Portugal" <ops@imoveisportugal.lu>.
2. Run `check-content`, `check-parity` and the build.
3. Merge into `main` and push both branches. Watch the Cloudflare build until it is green.
4. On https://imoveisportugal.pt on a phone viewport, tap "Começar" and confirm the Concierge opens.
5. If anything breaks, revert on `main` at once.

**Report:** the commit hash and "live", plus one line on anything not done.
