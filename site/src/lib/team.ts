// "Your team for this purchase" (prompt 28 §2b, D54): who stands behind each role on the path. A role shows a name
// only once that partner has signed (config.ts); every named partner is labelled as sponsored and needs its own
// unticked consent box before it receives anything (GDPR arts. 6(1)(a), 7). Roles without a partner show no name.
import { config } from "../config";
import type { Role } from "./journeys";

export function partnerFor(role: Role): { name: string; reg?: string } | null {
  const n = (name: string, reg?: string) => (name ? { name, reg } : null);
  switch (role) {
    case "agency": return n(config.agency.name, `AMI ${config.agency.ami}`);
    case "bank": return n(config.creditPartner.name, config.creditPartner.bdp ? `Banco de Portugal ${config.creditPartner.bdp}` : undefined);
    case "insurance": return n(config.insurancePartner.name, config.insurancePartner.asf ? `ASF ${config.insurancePartner.asf}` : undefined);
    case "wealth": return n(config.privatePartners[0]?.name ?? "", config.privatePartners[0]?.licence);
    case "lawyer": case "tax": case "fx": case "developer": return n(config.partners[role]);
    default: return null;
  }
}

/** For each station of a route, the team so far: each role once, with the stations that bring it in up to here. */
export function teamSoFar<T extends { k: string; roles: Role[] }>(route: T[]) {
  return route.map((s, i) => {
    const rows = new Map<Role, string[]>();
    route.slice(0, i + 1).forEach((x) => x.roles.forEach((r) => rows.set(r, [...(rows.get(r) ?? []), x.k])));
    return [...rows].map(([role, sts]) => ({ role, sts, now: s.roles.includes(role), partner: partnerFor(role) }));
  });
}
