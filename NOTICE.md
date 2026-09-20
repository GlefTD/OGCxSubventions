# NOTICE — OGCx Subventions

OGCx Subventions
Copyright (c) 2026 OGCx Subventions contributors

This product is licensed under the MIT License. See `LICENSE`.

OGCx Subventions is an independent community project. It is not affiliated
with, endorsed by, or operated by the Government of Canada.

The project is a sibling of OGCxVoyage (same interaction shell, different
dataset). It does not claim Government of Canada affiliation.

---

## Données / Data

Les enregistrements affichés proviennent du jeu **Proactive Disclosure —
Grants and Contributions** publié sur [open.canada.ca](https://open.canada.ca/).

- Dataset : https://open.canada.ca/data/dataset/432527ab-7aac-45b5-81d6-7597107a7013
- Resource (CSV / DataStore) : `1d15a62f-5656-49ad-8c88-f40ce689d831`
- Recherche officielle : https://rechercher.ouvert.canada.ca/subventions/
- Licence des données : [Licence du gouvernement ouvert — Canada](https://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada)
  / [Open Government Licence — Canada](https://open.canada.ca/en/open-government-licence-canada)

Cette licence s’applique aux **données**, pas au code d’OGCx Subventions.
Les totaux, filtres, surlignages et stats affichés sont des dérivés produits
localement dans le navigateur. Ils ne remplacent pas le registre officiel.

Records shown come from the Government of Canada proactive disclosure dataset
for grants and contributions. The Open Government Licence — Canada applies to
that **data**, not to this software. Totals, filters, highlights and stats are
client-side derivatives.

---

## Logiciel tiers / Third-party software

### IBM Plex Sans / IBM Plex Mono

Loaded from Google Fonts at runtime.

- Copyright IBM Corp.
- Licence : SIL Open Font License 1.1
- https://github.com/IBM/plex

### CKAN DataStore API

OGCx Subventions interrogue l’API publique CKAN d’open.canada.ca
(`https://open.canada.ca/data/api/3/action`). CKAN is open source software
(AGPL) maintained by the CKAN project. This application is a **client** of the
public HTTP API and does not include CKAN source code.

Please be gentle with that API. The client rate-limits itself (see README
v0.0.4). Do not add scrapers against `search.open.canada.ca` HTML.

### Cloudflare Workers (optional deploy)

`worker.js` / `wrangler.toml` target the Cloudflare Workers runtime. Using
those files to deploy does not grant any Cloudflare trademark rights.

---

## Inspiration

The desktop / simple-mode interaction is inspired by
[AMCx](https://amcx.gleftd.workers.dev/) and OGCxVoyage, independent explorers
by the same original author. This repository does not redistribute AMCx
source.

---

## Marques / Trademarks

« Canada », the Canada wordmark, and related official marks are property of
the Government of Canada. The LightRed theme uses red and white as a visual
nod only. Do not present OGCx Subventions as an official Government of Canada
product.
