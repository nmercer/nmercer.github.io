console.log("start");

// Sunrise Formatter
function formatAMPM(date) {
    console.log(date);

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

// Sunrise Jquery
$.ajax({
    type: "GET",
    url: "https://api.sunrise-sunset.org/json?lat=48.407141&lng=-114.334622&formatted=0",
    dataType: "json",
    success: function (result, status, xhr) {
        console.log(result)
        
        result = result["results"]
        $( ".right-top" ).text( "Sunrise:     " + formatAMPM(new Date(result["sunrise"])) + "\nSunset:      " + formatAMPM(new Date(result["sunset"])) + "\nDawn:       " + formatAMPM(new Date(result["civil_twilight_begin"])) + "\nTwilight:    " + formatAMPM(new Date(result["civil_twilight_end"])) );
    },
    error: function (xhr, status, error) {
        console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
    }
});

console.log("finished");

// FAC Danger Rating Widget
(function () {
    var dangerColors = { 1: '#78c800', 2: '#ffd800', 3: '#ff8400', 4: '#de1c00', 5: '#1a1a1a' };
    var dangerLabels = { 1: 'Low', 2: 'Moderate', 3: 'Considerable', 4: 'High', 5: 'Extreme' };
    var CACHE_KEY = 'fac_forecast';
    var CACHE_TTL = 60 * 60 * 1000;      // 1 hour for good data
    var RETRY_TTL = 5 * 60 * 1000;       // 5 minutes before retrying after failure

    function renderForecast(p) {
        var rating = p.danger_rating;
        var color = dangerColors[rating] || '#666';
        var textColor = rating >= 4 ? '#fff' : '#000';
        var label = dangerLabels[rating] || ('Level ' + rating);
        var zones = (p.forecast_zone || []).map(function (z) {
            return '<a href="' + z.url + '" target="_blank" style="color:#aaa;text-decoration:none">' + z.name + '</a>';
        }).join(' &bull; ');
        var date = p.published_time ? new Date(p.published_time).toLocaleDateString() : '';
        var author = p.author ? ' &mdash; ' + p.author : '';
        var html = '<div style="margin-bottom:6px">'
            + '<span style="background:' + color + ';color:' + textColor + ';padding:3px 10px;border-radius:3px;font-weight:bold;font-size:1.1em">'
            + label + '</span>'
            + '<small style="color:#aaa;margin-left:8px">' + date + author + '</small>'
            + '</div>'
            + '<div style="font-size:0.8em;margin-bottom:8px">' + zones + '</div>'
            + '<div style="font-size:0.85em;line-height:1.4">' + (p.bottom_line || '') + '</div>';
        document.getElementById('fac-forecast').innerHTML = html;
    }

    function showFallback() {
        document.getElementById('fac-forecast').innerHTML =
            '<a href="https://www.flatheadavalanche.org/forecasts" target="_blank" style="color:#aaa">FAC Forecast &rarr;</a>';
    }

    // Check cache — show stale data while retrying is blocked, skip fetch if fresh
    var cached = null;
    try { cached = JSON.parse(localStorage.getItem(CACHE_KEY)); } catch (e) {}

    if (cached && cached.data && (Date.now() - cached.ts) < CACHE_TTL) {
        renderForecast(cached.data);
        return;
    }
    if (cached && cached.failed && (Date.now() - cached.ts) < RETRY_TTL) {
        // Rate limited recently — show stale data if we have it, else fallback
        if (cached.data) { renderForecast(cached.data); } else { showFallback(); }
        return;
    }

    // Use a 3-day window so timezone edge cases and late publishes don't miss
    var end = new Date();
    var start = new Date(); start.setDate(start.getDate() - 2);
    var fmt = function (d) { return d.toISOString().split('T')[0]; };
    var url = 'https://api.avalanche.org/v2/public/products?avalanche_center_id=FAC&date_start=' + fmt(start) + '&date_end=' + fmt(end);

    fetch(url)
        .then(function (r) {
            if (r.status === 429) {
                // Cache the failure so we don't keep hammering
                try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), failed: true, data: cached && cached.data || null })); } catch (e) {}
                if (cached && cached.data) { renderForecast(cached.data); } else { showFallback(); }
                return null;
            }
            if (!r.ok) { showFallback(); return null; }
            return r.json();
        })
        .then(function (data) {
            if (!data || !data.length) { showFallback(); return; }
            // Sort by published_time desc, take most recent
            var p = data.sort(function (a, b) {
                return (b.published_time || '').localeCompare(a.published_time || '');
            })[0];
            try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: p })); } catch (e) {}
            renderForecast(p);
        })
        .catch(showFallback);
})();