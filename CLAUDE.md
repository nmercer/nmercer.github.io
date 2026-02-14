# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static GitHub Pages site — a personal dashboard aggregating avalanche forecasts, weather data, webcam feeds, and ski resort info for northwest Montana and surrounding regions. No build system, no frameworks, no local dependencies.

## Serving Locally

```
python -m http.server
```

Open http://localhost:8000. There is no build step — edits to HTML/CSS/JS are immediate.

## Deployment

Push to `main` triggers automatic GitHub Pages deployment at nmercer.github.io.

## Architecture

- **Pure static site**: HTML + CSS + JS, no templating or static site generator
- **CDN dependencies**: Bootstrap 5.0.0-beta2, jQuery 3.6.0 (no local node_modules)
- **Layout**: 4-column CSS Grid (`css.css`) with named areas: left, left-mid, right-mid, right
- **Theming**: Bootstrap dark theme utilities (`.bg-dark`, `.text-light`)

### Pages

| Path | Content |
|------|---------|
| `index.html` | Main page — Flathead avalanche, weather, webcams, sunrise/sunset |
| `panhandle/index.html` | Idaho Panhandle avalanche resources |
| `canada/index.html` | Avalanche Canada resources (Nelson, Golden, Fernie) |

Each page is self-contained HTML with inline Bootstrap styling. Navigation between pages uses simple button links.

### JavaScript (`main.js`)

Only used on the main `index.html`. Makes a single AJAX call to `api.sunrise-sunset.org` for sunrise/sunset times at coordinates 48.407141, -114.334622 (Flathead area) and renders results into the `.right-top` element.

## Conventions

- Links use inline SVG icons with colored circles (Bootstrap Icons style)
- Webcam images use `.top` class for consistent sizing (200px height, centered)
- New regional pages go in their own subdirectory with an `index.html`

## Research & Internet Tasks

When asked to research, find new resources, check/replace webcam URLs, or explore the internet for content relevant to this site, **read `claude.model.md` first**. It contains a detailed model of each page's goals, the regions and data types covered, known webcam URL patterns, and search terms to use when looking for replacements or new content.
