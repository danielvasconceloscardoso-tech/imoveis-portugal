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

  prices: {
    gold: { founding: 4800, list: 8000 },
    silver: { founding: 1800, list: 3000 },
    bronze: { founding: 540, list: 900 },
    campaignFrom: 1500,
    listingMin: 49,
    listingMax: 99,
  },
};
