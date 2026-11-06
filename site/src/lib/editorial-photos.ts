// Reuse existing credited/approved photo-library assets already deployed on the website.
// Contextual imagery is described accurately, without implying it depicts events or people it does not.
export const editorialVisuals: Record<string, { hero: string; detail: string; alt: string; detailAlt: string; caption: string; detailCaption: string }> = {
  "comporta-not-the-hamptons": {
    hero: "/img/v2/comporta-praia-dunas-1600.webp", detail: "/img/v2/comporta-mar-turquesa-1024.webp",
    alt: "Sand dunes and the open beach at Comporta", detailAlt: "The turquoise Atlantic coastline at Comporta",
    caption: "Comporta, Portugal.", detailCaption: "Comporta's Atlantic coast."
  },
  "algarve-closer-than-you-think": {
    hero: "/img/v2/algarve-falesias-por-do-sol-1600.webp", detail: "/img/v2/algarve-ponta-da-piedade-1024.webp",
    alt: "Cliffs on the Algarve coast at sunset", detailAlt: "Cliffs and coves at Ponta da Piedade near Lagos",
    caption: "The Algarve, Portugal.", detailCaption: "Ponta da Piedade, Lagos."
  },
  "portugals-other-great-export": {
    hero: "/img/v2/lisboa-anoitecer-castelo-1600.webp", detail: "/img/v2/lisboa-eletrico-28-1024.webp",
    alt: "Lisbon's historic cityscape at dusk", detailAlt: "A Lisbon tram in the historic streets",
    caption: "Lisbon at dusk. Contextual city photography, not a photograph of an artwork.", detailCaption: "Lisbon. Contextual city photography; the artists' works are not pictured."
  },
  "beyond-the-18th-hole": {
    hero: "/img/v2/algarve-golfe-amanhecer-1600.webp", detail: "/img/v2/algarve-falesia-1024.webp",
    alt: "Golf fairway in the Algarve at dawn", detailAlt: "Praia da Falésia and the Algarve's coastal cliffs",
    caption: "Golf in the Algarve.", detailCaption: "The Algarve coast beyond the fairways."
  },
  "nazare-beyond-the-wave": {
    hero: "/img/v2/porto-foz-farolim-felgueiras-1024.webp", detail: "/img/v2/porto-praia-internacional-por-do-sol-1024.webp",
    alt: "Atlantic coastline at the Porto seafront, thematic image for a story about Nazaré", detailAlt: "Atlantic surf along Porto's coast at sunset",
    caption: "The Atlantic at Porto. Contextual image; Nazaré is not pictured.", detailCaption: "The Atlantic at Porto, not Nazaré. Dedicated Nazaré photography pending."
  },
  "portugal-at-200-mph": {
    hero: "/img/v2/algarve-falesias-por-do-sol-1600.webp", detail: "/img/v2/algarve-golfe-amanhecer-1024.webp",
    alt: "The Algarve's landscape at sunset, contextual photography for Portuguese motorsport",
    detailAlt: "An Algarve golf course at dawn, illustrating the region rather than a motorsport circuit",
    caption: "The Algarve landscape. Contextual image, not the racing circuit.",
    detailCaption: "An Algarve morning. Racing-circuit photography pending."
  }
};
