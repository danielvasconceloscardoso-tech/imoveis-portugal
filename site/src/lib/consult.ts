// Confirmation pages of the Consulta privada (prompt 21 §2): URL slugs under the consultation page. Tally redirects
// to one of them after the form (rule in ops/TALLY_CONSULTA.md).
import type { Lang } from "../i18n";
export const CONSULT_SUB: Record<"ok" | "private" | "later", Record<Lang, string>> = {
  ok: { pt: "recebido", en: "received", fr: "recu" },
  private: { pt: "consultor-dedicado", en: "dedicated-adviser", fr: "conseiller-dedie" },  // D52: no "Private" in any URL
  later: { pt: "obrigado", en: "thank-you", fr: "merci" },
};
