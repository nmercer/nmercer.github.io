# nmercer.github.io

Personal dashboard aggregating avalanche forecasts, weather data, webcam feeds, and ski resort info for northwest Montana and surrounding regions.

## Prerequisites

- Node.js ≥ 18

## Install

```bash
npm install
```

## Dev

```bash
npm run dev
```

Opens at http://localhost:4321 with hot reload.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Preview

```bash
npm run preview
```

Serves the `dist/` output locally.

## Deploy

Push to `main` triggers GitHub Actions → builds → deploys `dist/` to the `gh-pages` branch → served at nmercer.github.io.

In repo Settings → Pages: set source branch to `gh-pages`.

## Env vars

Copy `.env.example` to `.env` and adjust if needed (defaults work for the Flathead area).
