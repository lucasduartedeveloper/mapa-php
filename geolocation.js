// Create the map
var geolocation = { latitude: 0, longitude: 0 };
//var map = L.map('map').setView([51.505, -0.09], 13);
var map = L.map('map').setView([0, 0], 13);

var marker = L.marker([51.505, -0.09]).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVjYXNkdWFydGUxOTkyIiwiYSI6ImNreGZieWE3ODFwNTQyb3N0cW4zNHMxMG8ifQ.HXS54wWrm6wPz-29LVVRbg'
}).addTo(map);

var monsters = [];
var monster = {};

function play() {
  var audio = new Audio('/audio/alarm.mp3');
  audio.play();
}

function posicaoNoGrid(pos) {
  var inicio = { lat: -23.36026174491471, lng: -51.15455389022828 };

  var a = 0.000008993216088271083 * 5;
  var b = (inicio.lat - (pos.lat)) / a;
  var c = Math.floor(b) + 0.5;

  var d = 0.000009956626094265175 * 5;
  var e = (inicio.lng - (pos.lng)) / d;
  var f = Math.floor(e) + 0.5;

  console.log("- - -");

  console.log(inicio);
  console.log(pos);

  console.log("- - -");

  console.log(a);
  console.log(b);
  console.log(c);

  console.log("- - -");

  pos.lat = inicio.lat + ((a * c) * -1);
  pos.lng = inicio.lng + ((d * f) * -1);

  console.log(pos);
  return pos;
}

function reload() {
      $.getJSON( "/ajax/localizacao_gps.php", function(data) {
          console.log(data);
      });
}

function onMapClick(e) {
    var pos = posicaoNoGrid(e.latlng);

    var circle = L.circle([pos.lat, pos.lng], {
        color: 'blue',
        fillColor: '#0066cc',
        fillOpacity: 0,
        radius: 2.5,
        weight: 1,
        stroke: false
    }).addTo(map);

    console.log(circle.getBounds());

    var rectangle = L.rectangle(circle.getBounds(), {color: "#0066cc", weight: 1}).addTo(map);

    marker.setLatLng(new L.LatLng(pos.lat, pos.lng));
    map.setView([pos.lat, pos.lng], 20);
}

map.on('click', onMapClick);

$(document).ready(function() {
    setInterval(function() {
        getLocation();
        var pos = { 
        latlng: {
            lat : geolocation.latitude,
            lng : geolocation.longitude
        }};
        onMapClick(pos);
    }, 15000);
});

// Consultar localização
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
  else{
      console.log("Seu browser não suporta Geolocalização.");
    }
  }

function showPosition(position)
  {
  console.log("Latitude: " + position.coords.latitude +
  " / Longitude: " + position.coords.longitude); 
   geolocation.latitude = position.coords.latitude;
   geolocation.longitude = position.coords.longitude;
  }
function showError(error)
  {
  switch(error.code)
    {
    case error.PERMISSION_DENIED:
      console.log("Usuário rejeitou a solicitação de Geolocalização.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Localização indisponível.");
      break;
    case error.TIMEOUT:
      console.log("A requisição expirou.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("Algum erro desconhecido aconteceu.");
      break;
    }
  }

getLocation();