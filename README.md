# OGCx Subventions

Explorateur libre des **subventions et contributions** publiées par le
gouvernement du Canada (jeu *Proactive Disclosure — Grants and Contributions*
sur [open.canada.ca](https://open.canada.ca/)).

Open-source explorer for the Government of Canada proactive disclosure dataset
**Grants and Contributions**.

> Projet communautaire. **Pas** un produit officiel du gouvernement du Canada.  
> Community project. **Not** a Government of Canada product.

Version UI courante / current UI version : **v0.0.4**

Branche d’[OGCxVoyage](https://github.com/) (même coquille, autre jeu).

---

## À quoi ça sert / What it does

OGCx Subventions charge les ententes via l’API CKAN DataStore (live) ou via
une capture CSV / CSV.GZ locale, puis laisse naviguer le jeu dans le
navigateur :

- grille triable, recherche, facettes (organisation, année, type d’entente,
  type de bénéficiaire)
- mode **simple** (cartes, fiche bas d’écran, gestes tactiles) avec détection
  d’appareil
- favoris (`F`) et copie de fiche (`C`)
- **AMEND** : met en évidence les ententes avec `amendment_number > 0`
- **STATS** : mix subvention / contribution / autre et tops
- **DIFF** entre deux captures temporelles
- thèmes **DarkBlue** (écran) et **LightRed** (Canada / impression)
- FR / EN
- lien vers la fiche officielle
  (`…/record/{owner_org},{ref_number},current`)

It is a client for one dataset:

- Portail : [432527ab-7aac-45b5-81d6-7597107a7013](https://open.canada.ca/data/dataset/432527ab-7aac-45b5-81d6-7597107a7013)
- Resource DataStore / CSV : `1d15a62f-5656-49ad-8c88-f40ce689d831` (~1,3 M d’ententes)
- Recherche officielle : [rechercher.ouvert.canada.ca/subventions](https://rechercher.ouvert.canada.ca/subventions/)

---

## v0.0.4 — quota API

Le DataStore d’open.canada.ca refuse le plein texte (`q` chaîne → HTTP 409) et
détecte les salves trop denses (blocage IP ~1 h). Depuis v0.0.3, une requête
booléenne `A OR B OR C` avec le bouton **E** pouvait lancer jusqu’à **12
appels en parallèle**, en plus de **56 sondages** de compteurs d’organisations
au démarrage (×2 si l’appel direct CORS échoue).

v0.0.4 :

- file d’attente globale : **2 requêtes max**, écart **≥ 450 ms**
- un seul endpoint retenu après le premier succès (plus de double essai systématique)
- cache court (45 s) des réponses identiques
- backoff si **429 / 403 / 503** (`Retry-After` ou 12–48 s)
- annulation des jobs périmés quand la recherche change
- booléen : au plus **3 jobs** (branches OR limitées à 3, AND filtré en local)
- compteurs d’orgs : graines officielles immédiates, sondage DataStore
  séquentiel en différé, cache `localStorage` 12 h
- debounce recherche **480 ms**

La recherche live reste une **approximation** du moteur officiel (Solr). Pour
un dépouillement exhaustif : filtre + **Tout charger**, ou une capture CSV.

---

## Lancer en local / Run locally

Ouvrir `index.html` dans un navigateur.

Si le DataStore live est bloqué par CORS (`file://` ou hôte sans proxy),
utiliser une capture :

1. Télécharger le CSV officiel depuis la page du jeu (ou le bouton
   « Télécharger officiel »).
2. Optionnel : `gzip grants.csv`.
3. **Choisir une capture** / glisser-déposer le fichier.

---

## Déployer / Deploy (Cloudflare Worker)

Le Worker sert la SPA et proxifie CKAN pour que la grille live fonctionne en
HTTPS.

```bash
npx wrangler deploy
```

| Chemin | Rôle |
|--------|------|
| `/` | `index.html` statique |
| `/ckan/<action>?…` | proxy `https://open.canada.ca/data/api/3/action/<action>` |

Voir `wrangler.toml` et `worker.js`.

---

## Fichiers / Layout

```
index.html          # application (UI + logique) — point d’entrée
worker.js           # proxy CKAN + assets
wrangler.toml       # déploiement Workers
LICENSE             # MIT
NOTICE.md           # données, polices, non-affiliation
CONTRIBUTING.md
SECURITY.md
.gitignore
README.md
ogcxs_v0.0.*.html   # instantanés historiques, pas le runtime
```

Ne commitez **pas** de captures CSV (plusieurs Go).

---

## Recherche

| Saisie | Effet |
|--------|--------|
| mot | champ choisi (« Chercher dans ») |
| `AND` `OR` `NOT` | opérateurs (majuscules, comme le site officiel) |
| `"phrase exacte"` | phrase |
| `clim*` | préfixe |
| bouton **E** | élargit au texte de fiche + 1 champ description côté API |
| `quebec` / `ontario` | alias vers `recipient_province` QC / ON |

Le DataStore ne fait pas de vrai plein texte. Les opérateurs AND / NOT sont
appliqués **sur la page reçue** (et sur tout le jeu une fois « Tout charger »
ou une capture locale).

---

## Données / Data licence

Logiciel : MIT (`LICENSE`).

Jeu : [Licence du gouvernement ouvert — Canada](https://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada)
/ [Open Government Licence — Canada](https://open.canada.ca/en/open-government-licence-canada).

Notices tierces : `NOTICE.md`.

---

## Raccourcis / Shortcuts

| Touche | Action |
|--------|--------|
| `F` | favori sur la ligne sélectionnée |
| `C` | copier la fiche |

Préférences (`ogcxs_lang`, `ogcxs_theme`, `ogcxs_pageSize`, `ogcxs_tfavs`,
`ogcxs_extend`, `ogcxs_orgCounts_v1`, …) dans `localStorage`.

---

## Contribuer / Contributing

Voir `CONTRIBUTING.md`. Issues et PR en français ou en anglais.
