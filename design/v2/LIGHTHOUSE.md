# Lighthouse, mobile (prompt 10, section 4)

Run on 25 Oct 2026 with Lighthouse 12.3.0 (default mobile emulation: Moto G Power, slow 4G) against the built site served locally.

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| /pt/lu/ (home) | 96 | 100 | 100 | 69 |
| /pt/lu/perguntas-frequentes/ (FAQ) | 98 | 100 | 100 | 66 |
| /en/us/free-guide/ | 98 | 100 | 100 | 69 |
| /pt/br/parceiros/ (media kit) | 98 | 100 | 100 | 66 |
| /fr/fr/acheter/ (find a home) | 98 | 100 | 100 | 66 |
| /pt/ch/falar-com-um-parceiro/ | 98 | 100 | 100 | 66 |
| /en/il/how-we-work/ | 99 | 100 | 100 | 66 |

SEO fails one audit only, "page is blocked from indexing": the beta carries `noindex` on purpose until launch (site/src/config.ts, `launchReady: false`). Every other SEO audit passes.

Re-run: `npm run build` in site/, serve site/dist on a local port, then
`CHROME_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome npx lighthouse@12.3.0 <url> --only-categories=performance,accessibility,best-practices,seo`.
