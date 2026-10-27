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
];
