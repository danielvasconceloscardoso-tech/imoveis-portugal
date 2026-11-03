// Prompt 33 §1.4 and prompt 34 §4: photographs under CC BY or CC BY-SA are credited here, on /credits/, never in a caption.
// Everything else on the site is Pixabay, Mixkit, Unsplash or public domain (no credit required). The full list is content/media/SOURCES.md.
export type Credit = { file: string; place: string; title: string; author: string; url: string; licence: string; licenceUrl: string };
const BY = "https://creativecommons.org/licenses/by/2.0/", BYSA = "https://creativecommons.org/licenses/by-sa/2.0/";
export const CREDITS: Credit[] = [
  { file: "img/v2/comporta-praia-dunas-*", place: "Comporta, Grândola", title: "Comporta", author: "Šarūnas Burdulis", url: "https://www.flickr.com/photos/sarunas_b/52660132908/", licence: "CC BY-SA 2.0", licenceUrl: BYSA },
  { file: "img/v2/comporta-mar-turquesa-*", place: "Comporta, Grândola", title: "Comporta", author: "Šarūnas Burdulis", url: "https://www.flickr.com/photos/sarunas_b/52659924874/", licence: "CC BY-SA 2.0", licenceUrl: BYSA },
  { file: "img/v2/comporta-mar-arrabida-*", place: "Comporta, Grândola", title: "Comporta", author: "Šarūnas Burdulis", url: "https://www.flickr.com/photos/sarunas_b/52659924749/", licence: "CC BY-SA 2.0", licenceUrl: BYSA },
  { file: "img/v2/lisboa-castelo-por-do-sol-*", place: "Lisboa", title: "The view from St George's Castle, Lisbon", author: "Steve Gardner", url: "https://www.flickr.com/photos/stephendgardner/8634512892/", licence: "CC BY 2.0", licenceUrl: BY },
  { file: "img/v2/algarve-porto-de-mos-*", place: "Porto de Mós, Lagos", title: "Sunny beach with coastal cliffs and calm ocean near Porto de Mós", author: "Sergei Gussev", url: "https://www.flickr.com/photos/sergeigussev/54459216417/", licence: "CC BY 2.0", licenceUrl: BY },
  { file: "img/v2/algarve-falesias-por-do-sol-*", place: "Lagos, Algarve", title: "Golden sunset over coastal cliffs and Atlantic Ocean near Porto de Mós", author: "Sergei Gussev", url: "https://www.flickr.com/photos/sergeigussev/54460328213/", licence: "CC BY 2.0", licenceUrl: BY },
  // D83 lifestyle articles (3 Nov 2026), found through Openverse; Flickr originals at 1024 px, graded, no crop.
  { file: "img/v2/matosinhos-she-changes-*", place: "Matosinhos", title: "Escultura 'She Changes' ou 'Anémona' - Matosinhos - Portugal", author: "Vitor Oliveira (Portuguese_eyes)", url: "https://www.flickr.com/photos/21446942@N00/29604509272", licence: "CC BY-SA 2.0", licenceUrl: BYSA },
  { file: "img/v2/leca-piscina-das-mares-*", place: "Leça da Palmeira, Matosinhos", title: "Piscina das Marés - Leça da Palmeira - Portugal", author: "Vitor Oliveira (Portuguese_eyes)", url: "https://www.flickr.com/photos/21446942@N00/27747007423", licence: "CC BY-SA 2.0", licenceUrl: BYSA },
  { file: "img/v2/porto-douro-palacio-de-cristal-*", place: "Porto", title: "Douro River and city view from Jardins do Palácio de Cristal", author: "mattk1979", url: "https://www.flickr.com/photos/24879135@N04/38195462106", licence: "CC BY-SA 2.0", licenceUrl: BYSA },
  { file: "img/v2/porto-foz-farolim-felgueiras-*", place: "Foz do Douro, Porto", title: "Porto, Foz do Douro", author: "Jocelyn777 Love Europe", url: "https://www.flickr.com/photos/42201095@N03/52667959121", licence: "CC BY-SA 2.0", licenceUrl: BYSA },
  { file: "img/v2/vila-do-conde-aqueduto-*", place: "Vila do Conde", title: "Vila do Conde", author: "Sergei Gussev", url: "https://www.flickr.com/photos/133200397@N03/46637546551", licence: "CC BY 2.0", licenceUrl: BY },
];
