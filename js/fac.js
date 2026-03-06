const CACHE_KEY = 'fac_forecast_v2';
const CACHE_TTL = 60 * 60 * 1000;   // 1 hour for good data
const RETRY_TTL = 5 * 60 * 1000;    // 5 minutes before retrying after failure

function getCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCache(entry) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // ignore storage errors
  }
}

async function fetchLatestForecast(centerId) {
  const cached = getCache();

  if (cached?.data && (Date.now() - cached.ts) < CACHE_TTL) {
    return cached.data;
  }
  if (cached?.failed && (Date.now() - cached.ts) < RETRY_TTL) {
    return cached.data ?? null;
  }

  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 2);
  const fmt = d => d.toISOString().split('T')[0];
  const url = `https://api.avalanche.org/v2/public/products?avalanche_center_id=${centerId}&date_start=${fmt(start)}&date_end=${fmt(end)}`;

  let r;
  try {
    r = await fetch(url);
  } catch {
    if (cached?.data) return cached.data;
    return null;
  }

  if (r.status === 429) {
    setCache({ ts: Date.now(), failed: true, data: cached?.data });
    return cached?.data ?? null;
  }
  if (!r.ok) return null;

  const data = await r.json();
  if (!data.length) return null;

  const p = data.sort((a, b) =>
    (b.published_time || '').localeCompare(a.published_time || '')
  )[0];

  // Fetch full product for hazard_discussion
  try {
    const fullR = await fetch(`https://api.avalanche.org/v2/public/product/${p.id}`);
    if (fullR.ok) {
      const full = await fullR.json();
      p.hazard_discussion = full.hazard_discussion || '';
    }
  } catch {
    // continue without hazard_discussion
  }

  setCache({ ts: Date.now(), data: p });
  return p;
}

const dangerColors = {
  1: '#78c800',
  2: '#ffd800',
  3: '#ff8400',
  4: '#de1c00',
  5: '#1a1a1a',
};
const dangerLabels = {
  1: 'Low',
  2: 'Moderate',
  3: 'Considerable',
  4: 'High',
  5: 'Extreme',
};

function renderForecast(p) {
  const rating = p.danger_rating;
  const color = dangerColors[rating] || '#666';
  const textColor = rating >= 4 ? '#fff' : '#000';
  const label = dangerLabels[rating] || ('Level ' + rating);
  const zones = (p.forecast_zone || [])
    .map(z => `<a href="${z.url}" target="_blank" style="color:#aaa;text-decoration:none">${z.name}</a>`)
    .join(' &bull; ');
  const date = p.published_time ? new Date(p.published_time).toLocaleDateString() : '';
  const author = p.author ? ' &mdash; ' + p.author : '';

  const html =
    '<div style="margin-bottom:6px">' +
    `<span style="background:${color};color:${textColor};padding:3px 10px;border-radius:3px;font-weight:bold;font-size:1.1em">${label}</span>` +
    `<small style="color:#aaa;margin-left:8px">${date}${author}</small>` +
    '</div>' +
    `<div style="font-size:0.8em;margin-bottom:8px">${zones}</div>` +
    `<div style="font-size:0.85em;line-height:1.4">${p.bottom_line || ''}</div>` +
    (p.hazard_discussion
      ? `<div style="margin-top:8px;font-size:0.82em;line-height:1.4">${p.hazard_discussion}</div>`
      : '');

  const el = document.getElementById('fac-forecast');
  if (el) el.innerHTML = html;
}

function showFallback() {
  const el = document.getElementById('fac-forecast');
  if (el) {
    el.innerHTML =
      '<a href="https://www.flatheadavalanche.org/forecasts" target="_blank" style="color:#aaa">FAC Forecast &rarr;</a>';
  }
}

function initFacWidget() {
  fetchLatestForecast('FAC')
    .then(p => {
      if (p) renderForecast(p);
      else showFallback();
    })
    .catch(showFallback);
}
