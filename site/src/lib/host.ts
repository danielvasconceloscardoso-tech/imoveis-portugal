// The public host of a page. While one domain serves every edition (config.domainMode "primary"), every canonical
// URL, hreflang link, sitemap and structured-data URL uses it; with "own-domain", each edition uses its own domain.
import { config } from "../config";
import { EDITIONS, type EdCode } from "../i18n";

export const hostFor = (ed: EdCode): string => (config.domainMode === "primary" ? config.primaryDomain : EDITIONS[ed].domain);
