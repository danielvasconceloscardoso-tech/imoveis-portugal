// Partner lawyers for the Concierge card (prompt 37 §4, D64), from content/partners/lawyers.yaml.
// Sample entries (`sample: true`) are fictional and render only when the build is not on main (Cloudflare sets
// WORKERS_CI_BRANCH on its builds). Wording: informative only (EOA art. 94), no superlatives, no promises.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";
import type { Lang } from "../i18n";

type ByLang = Record<Lang, string>;
export interface Lawyer { id: string; sample?: boolean; name: string; firm: string; cedula: string; photo?: string; linkedin?: string; city: string; video?: boolean; langs: string[]; areas: string[]; response: ByLang; fees: ByLang; }

const file = join(process.cwd(), "..", "content", "partners", "lawyers.yaml");
const all = (existsSync(file) ? (yaml.load(readFileSync(file, "utf8")) || []) : []) as Lawyer[];
const preview = process.env.WORKERS_CI_BRANCH !== "main";
export const LAWYERS = all.filter((l) => !l.sample || preview);

export const OA_SEARCH = "https://portal.oa.pt/advogados/pesquisa-de-advogados/";
const LANG_NAMES: Record<string, ByLang> = {
  pt: { pt: "Português", en: "Portuguese", fr: "Portugais" }, en: { pt: "Inglês", en: "English", fr: "Anglais" },
  fr: { pt: "Francês", en: "French", fr: "Français" }, es: { pt: "Espanhol", en: "Spanish", fr: "Espagnol" }, de: { pt: "Alemão", en: "German", fr: "Allemand" },
};
const AREAS: Record<string, ByLang> = {
  purchase: { pt: "Compra de casa", en: "Buying a home", fr: "Achat immobilier" },
  inheritance: { pt: "Heranças", en: "Inheritance", fr: "Successions" },
  "tax-residence": { pt: "Residência fiscal", en: "Tax residence", fr: "Résidence fiscale" },
  "power-of-attorney": { pt: "Procurações", en: "Power of attorney", fr: "Procurations" },
};
const L: Record<string, ByLang> = {
  ask: { pt: "Tenho uma pergunta", en: "I have a question", fr: "J'ai une question" },
  legal: { pt: "Uma dúvida jurídica? Falar com um advogado parceiro", en: "A legal question? Talk to a partner lawyer", fr: "Une question juridique ? Parler à un avocat partenaire" },
  h: { pt: "Um advogado para a sua pergunta", en: "A lawyer for your question", fr: "Un avocat pour votre question" },
  lede: { pt: "Para questões jurídicas (compra, herança, residência fiscal, procurações), pode falar diretamente com um advogado parceiro.", en: "For legal questions (buying, inheritance, tax residence, power of attorney), you can talk directly to a partner lawyer.", fr: "Pour les questions juridiques (achat, succession, résidence fiscale, procuration), vous pouvez parler directement à un avocat partenaire." },
  partner: { pt: "Parceiro", en: "Partner", fr: "Partenaire" },
  sample: { pt: "Exemplo", en: "Sample", fr: "Exemple" },
  sampleNote: { pt: "Perfil fictício, só para pré-visualização: não é uma pessoa real e não aparece no site publicado.", en: "Fictional profile, for preview only: not a real person, and it does not appear on the published site.", fr: "Profil fictif, pour l'aperçu uniquement : ce n'est pas une personne réelle et il n'apparaît pas sur le site publié." },
  cedula: { pt: "Cédula profissional", en: "Bar number (Ordem dos Advogados)", fr: "Numéro d'inscription (Ordem dos Advogados)" },
  verify: { pt: "Verificar na Ordem dos Advogados", en: "Check on the Ordem dos Advogados register", fr: "Vérifier auprès de l'Ordem dos Advogados" },
  areas: { pt: "Áreas", en: "Practice areas", fr: "Domaines" },
  langs: { pt: "Línguas", en: "Languages", fr: "Langues" },
  where: { pt: "Onde", en: "Where", fr: "Où" },
  video: { pt: "por vídeo", en: "by video", fr: "en visio" },
  response: { pt: "Resposta", en: "Response", fr: "Réponse" },
  fees: { pt: "Honorários", en: "Fees", fr: "Honoraires" },
  feesNote: { pt: "Indicados pelo próprio advogado.", en: "As stated by the lawyer.", fr: "Indiqués par l'avocat." },
  book: { pt: "Marcar chamada", en: "Book a call", fr: "Réserver un appel" },
  disclosure: { pt: "O advogado é parceiro do Imóveis Portugal através de um patrocínio fixo. Não recebemos comissões nem qualquer parte dos honorários; a relação é entre si e o advogado.", en: "The lawyer is an Imóveis Portugal partner through a flat sponsorship. We receive no commission and no share of fees; the relationship is between you and the lawyer.", fr: "L'avocat est partenaire d'Imóveis Portugal par un parrainage forfaitaire. Nous ne recevons ni commission ni part des honoraires ; la relation est entre vous et l'avocat." },
  bookH: { pt: "Marcar uma chamada com {name}", en: "Book a call with {name}", fr: "Réserver un appel avec {name}" },
  question: { pt: "A sua pergunta (opcional)", en: "Your question (optional)", fr: "Votre question (facultatif)" },
  consent: { pt: "Aceito que o meu nome, email e pergunta sejam enviados a {name} ({firm}) para marcar esta chamada.", en: "I agree that my name, email and question are sent to {name} ({firm}) to book this call.", fr: "J'accepte que mon nom, mon e-mail et ma question soient transmis à {name} ({firm}) pour réserver cet appel." },
  previewSent: { pt: "Pré-visualização com um perfil de exemplo: nada foi enviado.", en: "Preview with a sample profile: nothing was sent.", fr: "Aperçu avec un profil d'exemple : rien n'a été envoyé." },
  doneH: { pt: "Pedido enviado", en: "Request sent", fr: "Demande envoyée" },
  doneP: { pt: "{name} responde-lhe diretamente por email.", en: "{name} will reply to you directly by email.", fr: "{name} vous répondra directement par e-mail." },
};

/** What the Concierge needs for one language: the lawyers, already worded, and the card labels. */
export function lawyerCard(lang: Lang) {
  if (!LAWYERS.length) return null;
  return {
    oa: OA_SEARCH,
    labels: Object.fromEntries(Object.entries(L).map(([k, v]) => [k, v[lang]])) as Record<string, string>,
    lawyers: LAWYERS.map((l) => ({
      id: l.id, sample: !!l.sample, name: l.name, firm: l.firm, cedula: l.cedula, photo: l.photo || "", linkedin: l.linkedin || "",
      initials: l.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join(""),
      where: [l.city, l.video ? L.video[lang] : ""].filter(Boolean).join(" · "),
      langs: l.langs.map((x) => LANG_NAMES[x]?.[lang] ?? x), areas: l.areas.map((x) => AREAS[x]?.[lang] ?? x),
      response: l.response[lang], fees: l.fees[lang],
    })),
  };
}
export type LawyerCard = NonNullable<ReturnType<typeof lawyerCard>>;
