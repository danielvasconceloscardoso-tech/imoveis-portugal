// Everything the operator needs to fill in lives here. See ops/SETUP.md.

export const config = {
  // false = pages carry "noindex" and robots.txt blocks crawlers. Switch to true
  // only once the billing entity (D4) is set and the legal pages are complete.
  launchReady: false,

  // How country domains behave (decision D1 / D8):
  // "own-domain": imoveisportugal.fr serves the /fr/ section on its own domain.
  // "primary":    every country domain redirects to primaryDomain + its section.
  domainMode: "own-domain" as "own-domain" | "primary",
  primaryDomain: "imoveisportugal.lu",

  // Public contact address of the brand (no personal names).
  contactEmail: "geralportugalimoveis@gmail.com", // brand Gmail until the domain mailbox exists

  // Cal.com booking link for 15-minute sponsor calls.
  bookingUrl: "",

  // Calls with the partner agency (D19), Cal.com event links once the operator creates them (task 8r).
  // Empty = the button opens an email to the brand mailbox instead; never a broken link (prompt 11).
  calls: { intro: "", plan: "" },

  // A real listing from the partner agency, with its permission (prompt 11, home "Esta semana").
  // null = the home shows a worked example with real tax figures instead.
  listing: null as null | { title: Record<string, string>; place: string; price: number; url: string; photo: string },

  // Default financing partner on the calculators (D21): the partner agency's credit-intermediary business.
  // Name and Banco de Portugal registration number exactly as registered; both are shown wherever it appears.
  // Empty = no sponsored label and no consent box: the financing button opens "Talk to a partner" (bank).
  creditPartner: { name: "", bdp: "" },
  // Insurance partner (life and home cover) once signed, with its ASF registration (prompt 13). Empty = none yet.
  insurancePartner: { name: "", asf: "" },

  // The residence, tax and inheritance page (prompt 18, D33; D52: no "Private" label, reached through the path and map).
  privateLive: true,
  // Wealth Partners as they sign (name and licence, e.g. Banco de Portugal or CMVM registration). Public data only.
  privatePartners: [] as { name: string; licence: string }[],
  // Founding partners as they sign (prompt 18, "Our partners" page): category, name, licence. Public data only.
  foundingPartners: [] as { category: string; name: string; licence: string }[],

  // Paid "Plano de compra" report, 5,99 € (D22). Stays off until the billing entity (D4), OSS VAT and the
  // Stripe Payment Link exist: while false, no page links to the checkout and its button is disabled.
  // Paid dossiers (prompt 21 §3, D39). Buy buttons stay off until the billing entity (D4), OSS VAT and invoicing
  // exist; then live: true and one Stripe Payment Link per dossier. Prices in euros, VAT included.
  dossiers: { live: false, prices: { compra: 190, zona: 90, private: 950 }, stripe: { compra: "", zona: "", private: "" } },

  // Form embeds per language (D18): Tally form IDs (e.g. "w4Xyz1") or a full embed URL (beehiiv
  // newsletter embeds are full URLs). Every form gets a hidden "edition" field from the page.
  forms: {
    newsletter: { pt: "", en: "", fr: "" } as Record<string, string>,
    // Public form IDs from ops/ACCOUNTS.md (task 8u). Tally forms are PT only for now; EN and FR copies to create.
    sponsor: { pt: "KppYG8", en: "KppYG8", fr: "KppYG8" } as Record<string, string>,
    buyer: { pt: "BEEzgN", en: "BEEzgN", fr: "BEEzgN" } as Record<string, string>,
    // "Talk to a partner" requests (category, country, question, consent) to the brand mailbox. See ops/SETUP.md.
    partnerRequest: { pt: "", en: "", fr: "" } as Record<string, string>,
    // Calculator "analyse my case" requests to the credit partner, with the simulation in hidden fields.
    // Tally settings: unticked consent naming the partner, confirmation email (double opt-in). ops/SETUP.md.
    credit: { pt: "", en: "", fr: "" } as Record<string, string>,
  },

  // true once the free e-books are approved and their download pages exist (prompt 04).
  // Until then, FAQ "guide" links point to the newsletter signup.
  ebooksLive: false,

  // Billing / publishing entity (D4). Required for the legal notice and privacy policy.
  entity: {
    name: "",
    address: "",
    register: "",
    vat: "",
  },

  // Partner agency that receives buyer requests (licensed real-estate mediator).
  // D17: Habinedita Gondomar, the only real-estate agency on the platform, shown as a sponsored partner.
  // Public business details only (ops/prompts/08_partner_agency_habinedita.md).
  agency: {
    name: "Habinedita Gondomar",
    ami: "13250",
    website: "https://habineditagondomar.pt/",
    phone: "+351 221 458 069",
  },

  // Sponsor per partner category, once signed (prompt 09). Empty = no sponsor yet: the FAQ button then
  // says "Talk to a partner" and opens the enquiry form for that category.
  partners: { lawyer: "", bank: "", tax: "", fx: "", developer: "" } as Record<"lawyer" | "bank" | "tax" | "fx" | "developer", string>,

  launchDate: "2026-12-01",
  foundingSlotsTotal: 10,
  foundingSlotsLeft: 10,

  // Developer area placements (prompt 20 §4, D38): up to three per municipality slug, plus one launch. Shown as empty
  // slots until a partner signs. Public data only: name, logo path under /public, one project with its published price.
  // Prompt 26 §1: where "Pedir informação" on a developer project goes, until task 8z is decided:
  // "agency" (the partner agency, D14), "developer" (the developer's sales team) or "choice" (the reader picks).
  enquiryRouting: "agency" as "agency" | "developer" | "choice",
  developers: {} as Record<string, { name: string; logo: string; project: { name: string; from: number; typology: string; url: string } }[]>,
  launches: {} as Record<string, { name: string; developer: string; url: string }>,

  // Founding Partner deadline (the offer's terms live only in the private brochure, D38 and D40).
  foundingDeadline: "2026-12-01",
};
