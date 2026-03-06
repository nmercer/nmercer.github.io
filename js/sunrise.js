function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

async function fetchSunriseSunset(lat, lng) {
  try {
    const r = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`
    );
    if (!r.ok) return null;
    const json = await r.json();
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

function initSunrise() {
  fetchSunriseSunset(48.407141, -114.334622)
    .then(result => {
      const el = document.querySelector('.right-top');
      if (!el) return;
      if (result) {
        el.textContent =
          'Sunrise:  ' + result.sunrise +
          '\nSunset:   ' + result.sunset +
          '\nDawn:     ' + result.dawn +
          '\nTwilight: ' + result.dusk;
      } else {
        el.textContent = 'Sunrise data unavailable';
      }
    })
    .catch(() => {
      const el = document.querySelector('.right-top');
      if (el) el.textContent = 'Sunrise data unavailable';
    });
}
