// Interface helpers. All wording lives in content/copy/COPY_DECK.md (src/lib/copy.ts).
import type { EdCode } from "../i18n";

export type Cat = "lawyer" | "bank" | "tax" | "fx" | "developer";
export type Stage = "before" | "buying" | "after";

// Hero photo per edition (site/public/img; sources in site/public/photos/CREDITS.md, not linked from the site). Place names are in the deck.
export const PHOTO: Record<EdCode, string> = {
  lu: "lisboa-alfama-telhados",
  fr: "porto-ribeira-rabelo",
  ch: "lisboa-anoitecer-castelo",
  br: "lisboa-praca-do-comercio",
  us: "porto-douro-entardecer",
  il: "lisboa-alfama-sao-vicente",
};
