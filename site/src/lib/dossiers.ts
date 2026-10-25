// Paid dossiers (prompt 21 §3, D39): URL slugs of the three order pages under the dossiers page, and the samples.
import type { Lang } from "../i18n";
export type DType = "compra" | "zona" | "private";
export const DTYPES: DType[] = ["compra", "zona", "private"];
export const DOSSIER_SUB: Record<DType, Record<Lang, string>> = {
  compra: { pt: "dossie-de-compra", en: "purchase-dossier", fr: "dossier-d-achat" },
  zona: { pt: "relatorio-de-zona", en: "area-report", fr: "rapport-de-secteur" },
  private: { pt: "dossie-private", en: "private-dossier", fr: "dossier-private" },
};
export const SAMPLE = (t: DType) => `/dossiers/exemplo-${t}-lu-pt.pdf`;
