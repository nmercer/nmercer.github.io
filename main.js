console.log("start");


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