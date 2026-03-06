# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal dashboard aggregating avalanche forecasts, weather data, webcam feeds, and ski resort info for northwest Montana, Idaho, and BC/Alberta Canada. Plain HTML + vanilla JS, no build step, deployed to GitHub Pages at nmercer.github.io.

## Dev

```bash
python3 -m http.server 8000
# open http://localhost:8000/flathead/
```

No npm, no build step. Edit HTML/JS/CSS and refresh.

## Deployment

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) → `peaceiris/actions-gh-pages@v3` → copies root to `gh-pages` branch → live at nmercer.github.io.

## File Structure

```
index.html              ← meta-refresh redirect → /flathead/
flathead/index.html     ← Flathead/GNP dashboard (main page)
canada/index.html       ← BC/Alberta Canada dashboard
idaho/index.html        ← Idaho dashboard
css/site.css            ← custom styles; Bootstrap loaded via CDN
js/fac.js               ← FAC forecast fetch + render; exposes initFacWidget()
js/sunrise.js           ← sunrise/sunset fetch + render; exposes initSunrise()
icons/sprite.svg        ← SVG icon sprite
fav.png                 ← favicon
```

## Architecture

- **CSS**: Bootstrap 5.3.3 via CDN in each `<head>`, custom styles in `css/site.css`
- **Icons**: SVG sprite at `icons/sprite.svg`, referenced via `<use href="/icons/sprite.svg#NAME">`
- **JS**: `js/fac.js` and `js/sunrise.js` loaded as plain scripts; call `initFacWidget()` and `initSunrise()` after load

### Pages

| Route | File | Content |
|-------|------|---------|
| `/` | `index.html` | meta-refresh redirect → `/flathead/` |
| `/flathead/` | `flathead/index.html` | Flathead/GNP dashboard (main page) |
| `/canada/` | `canada/index.html` | BC/Alberta Canada dashboard |
| `/idaho/` | `idaho/index.html` | Idaho dashboard |

## Layout (4 columns, Bootstrap grid)

Each dashboard page uses `<div class="row g-0">` with four `col-12 col-md-6 col-xl-3` columns:

| Col | Flathead | Canada | Idaho |
|-----|---------|--------|-------|
| 1 | Overviews, Whitefish Range, Forums, Sled, Contact | Avalanche Canada, Nelson, Golden | Avalanche Centers, North Idaho, Forums, Sled |
| 2 | Swan Range, Flathead & GNP, XC | Fernie, Kimberley, Revelstoke | McCall, Sun Valley |
| 3 | Live webcams (dead cams dimmed at bottom) | Live webcams | Live webcams |
| 4 | FAC widget, sunrise/sunset, sidebar cams | Teleport player, sidebar cams | (empty) |

## Webcam Conventions

- **sidebar cams** — rendered in col 4, not col 3
- **dead cams** — shown at bottom of col 3 at 40% opacity under "Offline / may return" label; keep them, they sometimes come back

When checking for dead webcam links, use `curl -o /dev/null -s -w "%{http_code}"` — treat 403/404/000 as dead.

## Link Color Conventions

| type | class | color |
|------|-------|-------|
| forecast | `link-forecast` | `#8142f5` |
| weather-station / weather / map / contact | `link-station` | `#149414` |
| snotel | `link-warning` | `#f5db42` |
| info | `link-info` | `#3d9ef5` |
| wunderground | `link-wunderground` | `#f5830a` |
| webcam-link | `link-cam` | `#e03c3c` |
| forum | (none) | default |

## Nav

Each page hard-codes the active nav link with `class="bottom-nav-link active"`. No JS needed.

## Git

Do not add `Co-Authored-By` trailers to commit messages.

## Research & Internet Tasks

When asked to research, find new resources, check/replace webcam URLs, or explore the internet for content relevant to this site, **read `claude.model.md` first**. It contains a detailed model of each page's goals, the regions and data types covered, known webcam URL patterns, and search terms to use when looking for replacements or new content.
