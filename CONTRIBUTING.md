# Contributing to OGCx Subventions

Merci. OGCx Subventions is a small single-page explorer for the Government of
Canada grants and contributions dataset. Keep changes focused and reviewable.

---

## Langues / Languages

- Interface : français et anglais (`I18N` in `index.html`). Every user-visible
  string must exist in **both** locales.
- Issues / PRs : FR or EN is fine. Write the PR title in one language and
  repeat the summary in the other if the change is user-facing.

---

## Avant de coder / Before you start

1. Open an issue describing the bug or feature (or comment on an existing one).
2. Work from the latest `index.html` (current app). Do not revive old
   `ogcxs_v0.0.*.html` snapshots unless the issue is a historical bisect.
3. Keep the app usable as a **single file** (`index.html`) opened from disk.
   The Worker is only a CORS proxy + static host.

---

## Setup

```bash
git clone https://github.com/<org>/OGCxSubventions.git
cd OGCxSubventions
```

Open `index.html` in a browser.

Optional Worker (CORS proxy for the live DataStore):

```bash
npx wrangler dev
```

Deploy:

```bash
npx wrangler deploy
```

---

## Règles de contribution

### Do

- Match the existing style: one HTML file, vanilla JS, CSS variables for
  themes (`data-theme="darkblue"` / `data-theme="lightred"`).
- Persist user prefs in `localStorage` with the `ogcxs_` prefix.
- Prefer official CKAN `datastore_search` first, then local CSV / CSV.GZ
  snapshots for offline use and diffs.
- Keep the API scheduler polite: max 2 in-flight DataStore calls, ≥ 450 ms
  between starts, backoff on 429/403/503. Do not reintroduce `Promise.all`
  fan-out against CKAN.
- Keep keyboard shortcuts: `F` favourite, `C` copy fiche.
- Bump the visible version string in `<title>` and `header h1 .ver` together.
- Add a short note in the PR: what changed, how to test (live / capture /
  simple mode / boolean search / both themes).

### Don’t

- Do not vendor the full grants CSV in git (~2 GiB).
- Do not add a bundler, framework, or npm UI runtime unless there is a
  discussed issue for it.
- Do not scrape `search.open.canada.ca` / `rechercher.ouvert.canada.ca` HTML.
  Use the documented CKAN API and the official CSV download URL.
- Do not send CKAN `q` as a free-text string (`full_text` / plain `q` returns
  HTTP 409 on this resource). Use JSON field queries + client-side operators.
- Do not claim Government of Canada affiliation in UI copy or docs.
- Do not commit secrets, Wrangler API tokens, or personal captures.

---

## Data notes

`agreement_value` is the published award amount. **AMEND** flags rows with
`amendment_number > 0`. Treat that as a navigation hint, not a legal finding.

Organization slugs and labels should stay aligned with the official search
facet list (56 `owner_org` values, including `pacifican`, `prairiescan`,
`polar-polaire`, `org231`, …). Counts shown in the dropdown are DataStore
totals when probed, otherwise the bundled seed.

---

## Commits & pull requests

- Commits: short imperative subject (`Throttle DataStore client to 2 rps`).
- One concern per PR when possible (search, Worker, docs).
- Include before/after notes for UI changes. Screenshots help.
- Maintainers may ask you to rebase on `main`.

---

## Code of conduct (short)

Be decent. No harassment, no hate speech, no dumping of personal information
found in the public dataset into issues or social posts beyond what the
interface already shows. The dataset names funding recipients; do not use
this project to target individuals.

By contributing you agree that your contribution is licensed under the MIT
License (`LICENSE`) and that you have the right to submit it.
