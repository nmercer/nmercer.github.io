import type { SunriseSunsetResult } from '../types';

function formatAMPM(date: Date): string {
  let hours = date.getHours();
  let minutes: number | string = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

export async function fetchSunriseSunset(lat: number, lng: number): Promise<SunriseSunsetResult | null> {
  try {
    const r = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`
    );
    if (!r.ok) return null;
    const json = await r.json() as { results: Record<string, string> };
    const result = json.results;
    return {
      sunrise: formatAMPM(new Date(result['sunrise'])),
      sunset: formatAMPM(new Date(result['sunset'])),
      dawn: formatAMPM(new Date(result['civil_twilight_begin'])),
      dusk: formatAMPM(new Date(result['civil_twilight_end'])),
    };
  } catch {
    return null;
  }
}
