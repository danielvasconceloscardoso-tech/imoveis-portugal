// Paid dossiers (prompt 21 §3, D39): URL slugs of the three order pages under the dossiers page, and the samples.
import type { Lang } from "../i18n";
export type DType = "compra" | "zona" | "private";
export const DTYPES: DType[] = ["compra", "zona", "private"];
export const DOSSIER_SUB: Record<DType, Record<Lang, string>> = {
  compra: { pt: "dossie-de-compra", en: "purchase-dossier", fr: "dossier-d-achat" },
  zona: { pt: "relatorio-de-zona", en: "area-report", fr: "rapport-de-secteur" },
  private: { pt: "dossie-de-residencia-e-patrimonio", en: "residence-and-estate-dossier", fr: "dossier-residence-et-patrimoine" },  // D52
};
// Sample files: the third is named "patrimonio" (D52: no "Private" in any URL).
export const SAMPLE = (t: DType) => `/dossiers/exemplo-${t === "private" ? "patrimonio" : t}-lu-pt.pdf`;
