# nmercer.github.io

Personal dashboard aggregating avalanche forecasts, weather data, webcam feeds, and ski resort info for northwest Montana and surrounding regions.

No build step. Plain HTML + vanilla JS.

## Dev

```bash
cd /path/to/nmercer.github.io
python3 -m http.server 8000
```

Open http://localhost:8000/flathead/

## Deploy

Push to `main` → GitHub Actions copies root to `gh-pages` branch → live at nmercer.github.io.

In repo Settings → Pages: source branch must be `gh-pages`.
