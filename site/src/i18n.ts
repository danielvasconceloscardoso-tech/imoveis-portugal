// D18: the whole site is in three languages; editions keep only country content and sponsors.
export type Lang = "pt" | "en" | "fr";
export const LANGS: Lang[] = ["pt", "en", "fr"];
export const HTML_LANG: Record<Lang, string> = { pt: "pt-PT", en: "en", fr: "fr" };
export const LANG_NAME: Record<Lang, string> = { pt: "Português", en: "English", fr: "Français" };

export type EdCode = "lu" | "fr" | "ch" | "br" | "us" | "il";
export type PageKey = "partners" | "buy" | "privacy" | "legal" | "faq" | "talk" | "guide" | "how" | "compare" | "sims" | "casa" | "data" | "map" | "blog";

// URL slugs follow the language, not the edition: /{lang}/{edition}/{slug}/
export const SLUGS: Record<Lang, Record<PageKey, string>> = {
  pt: { partners: "parceiros", buy: "comprar", privacy: "privacidade", legal: "aviso-legal", faq: "perguntas-frequentes", talk: "falar-com-um-parceiro", guide: "guia-gratuito", how: "como-trabalhamos", compare: "o-que-compra", sims: "simuladores", casa: "casa-tratada-de-fora", data: "precos-das-casas", blog: "blog", map: "mapa" },
  en: { partners: "partners", buy: "buy", privacy: "privacy", legal: "legal-notice", faq: "faq", talk: "talk-to-a-partner", guide: "free-guide", how: "how-we-work", compare: "what-it-buys", sims: "calculators", casa: "your-home-from-abroad", data: "house-prices", blog: "blog", map: "map" },
  fr: { partners: "partenaires", buy: "acheter", privacy: "confidentialite", legal: "mentions-legales", faq: "questions-frequentes", talk: "parler-a-un-partenaire", guide: "guide-gratuit", how: "notre-methode", compare: "ce-que-vous-achetez", sims: "simulateurs", casa: "votre-maison-depuis-l-etranger", data: "prix-des-logements", blog: "blog", map: "carte" },
};
export const pathFor = (lang: Lang, ed: EdCode, page: PageKey | "home") =>
  page === "home" ? `/${lang}/${ed}/` : `/${lang}/${ed}/${SLUGS[lang][page]}/`;

type L3<T> = Record<Lang, T>;

const SRC = {
  lu: "https://www.theportugalnews.com/br/noticias/2024-11-14/onde-estao-as-maiores-comunidades-portuguesas-fora-de-portugal/93543",
  emig: "https://www.rtp.pt/noticias/economia/cerca-de-60000-portugueses-emigraram-em-2022-suica-volta-a-ser-principal-destino_n1546782",
  ine_nat: "https://www.idealista.pt/news/node/74594",
  // From content/facts/facts.csv (us-fbar, pt-imt-nonresident-flat).
  irs_fbar: "https://www.irs.gov/businesses/comparison-of-form-8938-and-fbar-requirements",
  cimt17: "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cimt/Pages/cimt17.aspx",
};

// Edition data. Every word shown to readers (names, headlines, topics, the figure's sentence) is in
// content/copy/COPY_DECK.md; here only the domain, the default language and each edition's figure.
// USA and Israel (prompt 05, D13): domains not chosen yet (ops/DOMAINS_US_IL.md), so those two are placeholders.
type EdFigure = { big: L3<string>; source: L3<string>; url: string };
export const EDITIONS: Record<EdCode, { code: EdCode; domain: string; defaultLang: Lang; fact: EdFigure }> = {
  lu: { code: "lu", domain: "imoveisportugal.lu", defaultLang: "pt", fact: { big: { pt: "92 000", en: "92,000", fr: "92 000" }, source: { pt: "OCDE, via The Portugal News, 2024", en: "OECD, via The Portugal News, 2024", fr: "OCDE, via The Portugal News, 2024" }, url: SRC.lu } },
  fr: { code: "fr", domain: "imoveisportugal.fr", defaultLang: "fr", fact: { big: { pt: "573 000", en: "573,000", fr: "573 000" }, source: { pt: "Observatório da Emigração, relatório 2022, via RTP", en: "Observatório da Emigração, 2022 report, via RTP", fr: "Observatório da Emigração, rapport 2022, via RTP" }, url: SRC.emig } },
  ch: { code: "ch", domain: "imoveisportugal.ch", defaultLang: "pt", fact: { big: { pt: "204 000", en: "204,000", fr: "204 000" }, source: { pt: "Observatório da Emigração, relatório 2022, via RTP", en: "Observatório da Emigração, 2022 report, via RTP", fr: "Observatório da Emigração, rapport 2022, via RTP" }, url: SRC.emig } },
  br: { code: "br", domain: "imoveisportugal.com.br", defaultLang: "pt", fact: { big: { pt: "9 808", en: "9,808", fr: "9 808" }, source: { pt: "INE, via idealista/news, 2026", en: "INE, via idealista/news, 2026", fr: "INE, via idealista/news, 2026" }, url: SRC.ine_nat } },
  us: { code: "us", domain: "imoveisportugal.us", defaultLang: "en", fact: { big: { pt: "10 000 USD", en: "$10,000", fr: "10 000 USD" }, source: { pt: "IRS, Comparison of Form 8938 and FBAR requirements", en: "IRS, Comparison of Form 8938 and FBAR requirements", fr: "IRS, Comparison of Form 8938 and FBAR requirements" }, url: SRC.irs_fbar } },
  il: { code: "il", domain: "imoveisportugal.co.il", defaultLang: "en", fact: { big: { pt: "7,5%", en: "7.5%", fr: "7,5 %" }, source: { pt: "Código do IMT, art. 17.º, n.º 10 (Decreto-Lei 97/2026)", en: "IMT Code, art. 17(10) (Decree-Law 97/2026)", fr: "Code de l'IMT, art. 17, n° 10 (décret-loi 97/2026)" }, url: SRC.cimt17 } },
};

export const ED_ORDER: EdCode[] = ["lu", "fr", "ch", "br", "us", "il"];

// Thousands: space in PT and FR, comma in EN.
export const eur = (n: number, lang: Lang) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "en" ? "," : " ") + " €";
