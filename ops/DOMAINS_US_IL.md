# USA and Israel domains: options (D13, task 8l)

Prepared 24 Oct 2026 for the operator. Nothing has been bought or claimed.

**Availability not checked.** The registry lookups (rdap.org, about.us, isoc.org.il) are blocked in this environment. To check, use any registrar's search, or allow `rdap.org`, `www.about.us` and `www.isoc.org.il` so Claude Code can check them. The rules below come from search results that quote the registries' policies. Confirm them on the registry pages linked before buying.

## USA

| Option | Eligibility | Anonymity (hard rule 1) | Note |
| --- | --- | --- | --- |
| `imoveisportugal.us` | **US nexus required:** US citizen or resident, a US-organised entity, or a foreign entity with a "bona fide presence" in the US (real and substantial lawful activity there). The registry checks this, also after registration. | **No WHOIS privacy:** .us bans privacy and proxy registrations, so the registrant's name and address are public. | Only workable once the billing entity (D4) exists and has a real US presence. Otherwise it breaks hard rule 1. |
| `imoveisportugal.com/us/` | Open to anyone | Privacy available at most registrars | Same brand, one domain for the English editions. Check availability. |
| An English domain matching the social name, e.g. `portugalhomeguides.com/us/` | Open to anyone | Privacy available | Matches the social account name (D13). Check availability. |

Sources: [usTLD privacy services policy](https://www.about.us/policies/us-privacy-services-policy), [usTLD privacy/proxy policy PDF](https://www.about.us/doc/policies/ustld-privacy-proxy-services.pdf), [GoDaddy: about .us domains](https://www.godaddy.com/help/about-us-domains-5856).

## Israel

| Option | Eligibility | Note |
| --- | --- | --- |
| `imoveisportugal.co.il` | **Unclear.** Some registrars say no local presence is needed; others say a connection to Israel (local address or representative) is required. Every application is approved by hand under ISOC-IL's "Rules for the Allocation of Domain Names", and since 2022 ISOC-IL randomly validates registrants (a company certificate or a photo ID). | Confirm with ISOC-IL's current rules. Ask whether a foreign brand entity can register without an Israeli representative, and what the validation would make public. |
| `imoveisportugal.com/il/` or `portugalhomeguides.com/il/` | Open to anyone | Works now. Same model as the four country domains pointing to their section (D1). |

Sources: [Openprovider: .co.il](https://support.openprovider.eu/hc/en-us/articles/360000736747--co-il), [Safenames: .il regulations](https://www.safenames.net/domain-names/domain-name-regulations/il), [Domgate: .il rules](https://portal.domgate.com/knowledgebase/18/il-rules).

## Recommendation (for the CEO and Daniel to decide)

1. For the 1 Dec launch, put the US and Israel editions under one generic domain the brand can register privately (`imoveisportugal.com/us/` and `/il/`). The site already supports sections per edition, so this changes only `config.ts`.
2. Add `.us` and `.co.il` later, only once the billing entity exists, it can meet the US nexus and ISOC-IL rules, and the public registrant data shows the brand entity only.
