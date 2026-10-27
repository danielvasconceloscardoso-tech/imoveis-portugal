// Prompt 33 §1.4: photographs under CC BY or CC BY-SA are credited here, on /credits/, never in a caption.
// Everything else on the site is Pixabay or Mixkit (no credit required). The full list is content/media/SOURCES.md.
export type Credit = { file: string; place: string; title: string; author: string; url: string; licence: string; licenceUrl: string };
export const CREDITS: Credit[] = [
  { file: "img/v2/comporta-dunas-*", place: "Comporta, Grândola", title: "Litoral entre a Praia da Comporta e a Praia da Torre - Portugal", author: "Vitor Oliveira",
    url: "https://commons.wikimedia.org/wiki/File:Litotal_entre_a_Praia_da_Comporta_e_a_Praia_da_Torre_-_Portugal_(48800641008).jpg", licence: "CC BY-SA 2.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
];
