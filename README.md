# moreco.ma — full site archive

Complete capture of **https://moreco.ma/** (WordPress + WPML, trilingual FR / EN / AR),
taken on **2026-08-30**, so the site can be rebuilt on a new host after the
original hosting was lost.

## What is in here

| Folder | What it is | Use it for |
|---|---|---|
| `site/` | **Browsable offline copy.** All links rewritten to local paths. | Open `site/index.html` in a browser — the old site works offline. Show the client, keep as reference. |
| `content/` | **Clean text per page**, `<lang>/pages/` and `<lang>/listings/`, each as `.md` (Markdown) + `.html` (formatted HTML). | Copy-paste / import into the new site. This is the rebuild material. |
| `raw/` | Untouched original HTML exactly as served. | Archive of record — go here if anything looks wrong elsewhere. |
| `content-index.csv` | One row per page: language, type, URL, title, meta description, size. Opens in Excel. | Plan the new site's page list and the **301 redirect map**. |
| `content-index.json` | Same as the CSV plus image lists and translation links. | Scripted import into the new CMS. |
| `screenshots/` | **A picture of every page.** Open `screenshots/index.html` for the gallery. | Show the client what the old site looked like, page by page — no browser or hosting needed. |
| `screenshots-index.csv` | One row per snapshot: language, title, original URL, image path. | Match each old URL to its picture while rebuilding. |
| `_crawl/` | The scripts used (`mirror.py`, `extract.py`, `rewrite.py`, `retry.py`, `shots.py`, `gallery.py`) + logs. | Re-run or extend the capture while moreco.ma is still up. |

## What was captured

- **425 pages** fetched; **221 unique pages** after removing duplicates
  (≈ 63–65 real content pages in each of FR, EN, AR).
- **~80 000 words** of real page content.
- **502 assets — 76.8 MB**: 283 images, **30 PDFs** (product datasheets,
  safety data sheets, brochures, scientific studies), CSS, JS and fonts.
- All product lines: **Orthagrow, Mavita, Huwa-San, Clearox**, plus the full
  `/research/` results section (60 pages) and the news articles.
- **256 full-page screenshots** — one for every page of the mirror
  (FR 103 · EN 75 · AR 78), 46 MB.
- **Verified: 100 % of internal links in `site/` resolve locally** (0 broken),
  every one of the 226 images referenced by page content was downloaded, and
  every page has a snapshot (256/256, none missing).

## The screenshot gallery

Open **`screenshots/index.html`** — a grid of every page with its title and
original URL. Filter by language (FR / EN / AR) or by section (Accueil, Pages,
Résultats / Research, Archives & listes), search by title or URL, and click any
thumbnail for the full-page image. Full images are in `screenshots/pages/`,
thumbnails in `screenshots/thumbs/`, both mirroring the `site/` folder layout.

Pop-ups that open on page load (the Orthagrow promo) are hidden in the captures
so the actual page content is visible. Two byte-identical duplicates of the
homepage, produced by a malformed on-site link (`?lang=en%2F`), were left out.

## Two things to know

1. **The homepage was already broken on the live server** — `https://moreco.ma/`
   returned HTTP 500 on every attempt during this capture, while every interior
   page returned 200. The crawler's retry logic did eventually get a good copy,
   and it is in `site/index.html` and `raw/index.html`. As a safety net, the
   Internet Archive versions are also saved in `_crawl/wayback/`
   (`home-fr.html` 2026-06-12, `home-en.html` 2026-05-20, `home-ar.html` 2022-02-17).

2. **Tag / category / author archive pages could not be captured** (~129 URLs) —
   they return HTTP 500 on the server itself. This costs nothing: WordPress
   regenerates those listings automatically on the new site. No real content
   page was lost.

## Known gaps (deliberate)

- `wp-content/uploads/` directory listing is blocked (403) on the server, so
  only media **referenced by a page** could be retrieved. Any file never linked
  from a page is not recoverable without hosting access.
- The database, theme PHP and plugin code are **not** included — that needs
  hosting/FTP access, not a public crawl.
- YouTube embeds and social widgets need an internet connection to display.
- Meta tags in `site/` intentionally keep their original `https://moreco.ma/...`
  URLs, so the old URL structure stays documented for redirects.

## Rebuilding

Use `content-index.csv` as the page inventory and the redirect map: the `url`
column is the old URL that must 301 to its new equivalent, and `title` /
`description` are the existing SEO metadata worth carrying over. Page bodies
are in `content/<lang>/pages/`, media in `site/wp-content/uploads/`.
