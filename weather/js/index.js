var celsius;

function getTemperature() {
  var latitude;
  var longitude; 
  $.ajax({
    url: "https://ipinfo.io/json",
    type: "GET",
    dataType: "JSON",
    success: function(result) {
      coords = result.loc.split(',');
      latitude = coords[0];
      longitude = coords[1];
      fillTemperatureDetails(latitude, longitude);
    }
  });
}

function fillTemperatureDetails(latitude, longitude) {
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather",
    type: "GET",
    dataType: "JSON",
    data: {
        lat: latitude,
        lon: longitude,
        units: "metric",
        APPID: "c659eb709194683af915fba5e270c580"
    },
    success: function(data) {
        $('#location').html(data.name + ", " + data.sys.country);
        celsius = Math.round(data.main.temp);
        $('#temperature').html($('<div>').html(celsius));
        $('#temperature').append($('<i>').attr('class', 'wi wi-celsius'));
        $('#summary').html(" " + data.weather[0].main);
        $('#summary').prepend($('<i>').attr('class','wi wi-owm-' + data.weather[0].id));
        $('#sunrise').find('p').html(new Date(data.sys.sunrise * 1000).toLocaleTimeString());
        $('#sunset').find('p').html(new Date(data.sys.sunset * 1000).toLocaleTimeString());
        $('#min-temp').find('p').html(data.main.temp_min);
        $('#max-temp').find('p').html(data.main.temp_max);
        $('#humidity').find('p').html(data.main.humidity);
        $('#pressure').find('p').html(data.main.pressure);
    },
    error: function(xhr) {
        //Do Something to handle error
        alert("error");
    }
  });
}

$('#metric-switch').on('click', 'span', function() {
  var temperatureType = $(this).attr('id');
  var temp = celsius;
  if(temperatureType == "fahrenheit") {
    temp = Math.round((celsius * 9 / 5) + 32);
  }
  $('#temperature').html($('<div>').html(temp));
  $('#temperature').append($('<i>').attr('class', 'wi wi-' + temperatureType));
});

getTemperature();
// if(navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(fillTemperatureDetails);
// } else {
//   alert("Geolocation not supported in this browser.");
// }