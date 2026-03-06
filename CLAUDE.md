# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal dashboard aggregating avalanche forecasts, weather data, webcam feeds, and ski resort info for northwest Montana, Idaho, and BC/Alberta Canada. Built with Astro 5 (static output), deployed to GitHub Pages at nmercer.github.io.

## Dev Commands

```bash
npm run dev      # localhost:4321 with hot reload
npm run build    # output to dist/
npm run preview  # serve dist/ locally
```

Always run `npm run build` after making changes to verify no errors before committing.

## Deployment

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) → `peaceiris/actions-gh-pages@v3` → deploys `dist/` to `gh-pages` branch → live at nmercer.github.io.

## Architecture

- **Framework**: Astro 5, `output: 'static'`, `site: 'https://nmercer.github.io'`
- **CSS**: Bootstrap 5.3.x via `npm install bootstrap`, imported in `src/styles/global.css`
- **Icons**: SVG sprite at `public/icons/sprite.svg`, referenced via `<use href="/icons/sprite.svg#NAME">`

### Pages

| Route | File | Content |
|-------|------|---------|
| `/` | `src/pages/index.astro` | 301 redirect → `/flathead/` |
| `/flathead/` | `src/pages/flathead/index.astro` | Flathead/GNP dashboard (main page) |
| `/canada/` | `src/pages/canada/index.astro` | BC/Alberta Canada dashboard |
| `/idaho/` | `src/pages/idaho/index.astro` | Idaho dashboard |

### Components (`src/components/`)

| Component | Purpose |
|-----------|---------|
| `Layout.astro` | Wraps all pages — nav, global styles, slot |
| `Nav.astro` | Bottom nav bar linking all three dashboards |
| `LinkList.astro` | Renders a titled list of `LinkEntry` items with icons |
| `WebcamGrid.astro` | Renders webcam images in a single-column grid; filters out `sidebar` cams, shows `dead` cams dimmed at the bottom |
| `FacWidget.astro` | Fetches and displays Flathead Avalanche Center forecast |
| `SunriseSunset.astro` | Fetches sunrise/sunset for Flathead area (48.41, -114.33) |

### Data Files (`src/data/`)

Each page has a corresponding JSON file driving all links and webcam images:

- `flathead.json` — sections: `overviews`, `whitefish_range`, `swan_range`, `flathead_gnp`, `forums`, `sled`, `xc`, `contact`, `webcams`
- `canada.json` — sections: `overviews`, `nelson`, `golden`, `fernie`, `kimberley`, `revelstoke`, `webcams`
- `idaho.json` — sections: `overviews`, `north_idaho`, `mccall`, `sun_valley`, `forums`, `sled`, `webcams`

### Types (`src/types.ts`)

```ts
LinkEntry  { label, url, icon, type }
WebcamEntry { label, src, group, dead?, sidebar? }
```

### Services (`src/services/`)

- `fac.ts` — fetches FAC forecast with localStorage cache
- `sunrise.ts` — fetches sunrise/sunset from api.sunrise-sunset.org

## Layout (4 columns, Bootstrap grid)

Each dashboard page uses `<div class="row g-0">` with four `col-12 col-md-6 col-xl-3` columns:

| Col | Flathead | Canada | Idaho |
|-----|---------|--------|-------|
| 1 | Overviews, Whitefish Range, Forums, Sled, Contact | Avalanche Canada, Nelson, Golden | Avalanche Centers, North Idaho, Forums, Sled |
| 2 | Swan Range, Flathead & GNP, XC | Fernie, Kimberley, Revelstoke | McCall, Sun Valley |
| 3 | `WebcamGrid` (non-sidebar live cams, dead cams at bottom) | `WebcamGrid` | `WebcamGrid` |
| 4 | FacWidget, SunriseSunset, sidebar cams | Teleport player, sidebar cams | (empty) |

## Webcam Conventions

`WebcamEntry` supports two optional flags in the JSON:

- **`"sidebar": true`** — cam is excluded from `WebcamGrid` (col 3) and instead rendered inline in col 4 of the page
- **`"dead": true`** — cam is shown at the bottom of `WebcamGrid` at 40% opacity under an "Offline / may return" label; keep these entries — they sometimes come back

When checking for dead webcam links, use `curl -o /dev/null -s -w "%{http_code}"` — treat 403/404/000 as dead.

## Link Color Conventions

- Forecast links: `#8142f5` (`link-forecast`)
- Weather station / SNOTEL: `#149414` (`link-station`)

## Research & Internet Tasks

When asked to research, find new resources, check/replace webcam URLs, or explore the internet for content relevant to this site, **read `claude.model.md` first**. It contains a detailed model of each page's goals, the regions and data types covered, known webcam URL patterns, and search terms to use when looking for replacements or new content.
