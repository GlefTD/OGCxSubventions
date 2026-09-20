# Security policy

## Reporting

This project has no privileged backend and no user accounts. The live path
only reads the public CKAN DataStore on open.canada.ca.

If you find a vulnerability in `index.html` or `worker.js` (for example XSS
via a dataset field, or an open-proxy issue in the Worker), please open a
**private** advisory on the GitHub repository if available, or email the
maintainer listed on the repo. Do not file a public issue with a working
exploit against third-party visitors.

## Scope

In scope:

- Stored / reflected XSS from dataset fields rendered into the fiche or grid
- Worker proxy that forwards unexpected methods or hosts
- Secrets accidentally added to the repo

Out of scope:

- Availability of open.canada.ca / CKAN rate limits
- Accuracy of published grant records
- Client-side memory exhaustion from « Tout charger » on ~1.3M rows (documented)

## Worker

`worker.js` must only proxy `https://open.canada.ca/data/api/3/action/*`.
Do not turn it into an open forward proxy.
