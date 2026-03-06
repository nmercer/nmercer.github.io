export interface LinkEntry {
  label: string;
  url: string;
  icon: string;
  type: 'forecast' | 'weather-station' | 'snotel' | 'webcam-link' | 'weather' | 'wunderground' | 'forum' | 'map' | 'contact' | 'info';
}

export interface WebcamEntry {
  label: string;
  src: string;
  group: string;
  dead?: boolean;
  sidebar?: boolean;
}

export interface FacForecast {
  id: string;
  danger_rating: number;
  published_time: string;
  author: string;
  forecast_zone: { name: string; url: string }[];
  bottom_line: string;
  hazard_discussion?: string;
}

export interface SunriseSunsetResult {
  sunrise: string;
  sunset: string;
  dawn: string;
  dusk: string;
}
