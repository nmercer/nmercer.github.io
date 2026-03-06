import type { FacForecast } from '../types';

const CACHE_KEY = 'fac_forecast_v2';
const CACHE_TTL = 60 * 60 * 1000;   // 1 hour for good data
const RETRY_TTL = 5 * 60 * 1000;    // 5 minutes before retrying after failure

interface CacheEntry {
  ts: number;
  data?: FacForecast;
  failed?: boolean;
}

function getCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as CacheEntry) : null;
  } catch {
    return null;
  }
}

function setCache(entry: CacheEntry): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // ignore storage errors
  }
}

export async function fetchLatestForecast(centerId: string): Promise<FacForecast | null> {
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
  const fmt = (d: Date) => d.toISOString().split('T')[0];
  const url = `https://api.avalanche.org/v2/public/products?avalanche_center_id=${centerId}&date_start=${fmt(start)}&date_end=${fmt(end)}`;

  let r: Response;
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

  const data = (await r.json()) as FacForecast[];
  if (!data.length) return null;

  const p = data.sort((a, b) =>
    (b.published_time || '').localeCompare(a.published_time || '')
  )[0];

  // Fetch full product for hazard_discussion
  try {
    const fullR = await fetch(`https://api.avalanche.org/v2/public/product/${p.id}`);
    if (fullR.ok) {
      const full = (await fullR.json()) as FacForecast;
      p.hazard_discussion = full.hazard_discussion || '';
    }
  } catch {
    // continue without hazard_discussion
  }

  setCache({ ts: Date.now(), data: p });
  return p;
}
