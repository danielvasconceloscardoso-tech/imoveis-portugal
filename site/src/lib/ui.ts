// Interface helpers. All wording lives in content/copy/COPY_DECK.md (src/lib/copy.ts).
import type { EdCode } from "../i18n";

export type Cat = "lawyer" | "bank" | "tax" | "fx" | "developer";
export type Stage = "before" | "buying" | "after";

// Hero photo per edition (site/public/img; sources in site/public/photos/CREDITS.md, not linked from the site). Place names are in the deck.
export const PHOTO: Record<EdCode, string> = {
  // North of Portugal only (prompt 11); neighbouring editions get different photos. Agency photos replace these when provided.
  lu: "porto-ribeira-rabelo",
  fr: "porto-douro-entardecer",
  ch: "porto-ponte-luis-i-noite",
  br: "porto-ribeira-rabelo",
  us: "porto-douro-entardecer",
  il: "porto-ponte-luis-i-noite",
};
