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

  // Form embeds per language (D18): Tally form IDs (e.g. "w4Xyz1") or a full embed URL (beehiiv
  // newsletter embeds are full URLs). Every form gets a hidden "edition" field from the page.
  forms: {
    newsletter: { pt: "", en: "", fr: "" } as Record<string, string>,
    sponsor: { pt: "", en: "", fr: "" } as Record<string, string>,
    buyer: { pt: "", en: "", fr: "" } as Record<string, string>,
    // "Talk to a partner" requests (category, country, question, consent) to the brand mailbox. See ops/SETUP.md.
    partnerRequest: { pt: "", en: "", fr: "" } as Record<string, string>,
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
  agency: {
    name: "",
    ami: "",
  },

  launchDate: "2026-12-01",
  foundingSlotsTotal: 10,
  foundingSlotsLeft: 10,

  prices: {
    gold: { founding: 4800, list: 8000 },
    silver: { founding: 1800, list: 3000 },
    bronze: { founding: 540, list: 900 },
    campaignFrom: 1500,
    listingMin: 49,
    listingMax: 99,
  },
};
