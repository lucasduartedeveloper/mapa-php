// Create the map
var geolocation = { latitude: 0, longitude: 0 };
//var map = L.map('map').setView([51.505, -0.09], 13);
var map = L.map('map').setView([0, 0], 13);

var circle = L.circle([51.505, -0.09], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0,
    radius: 15,
    weight: 1,
    stroke: false
}).addTo(map);

var rectangle = L.rectangle(circle.getBounds(), {color: "#ff7800", weight: 1}).addTo(map);

var marker = L.marker([51.505, -0.09]).addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVjYXNkdWFydGUxOTkyIiwiYSI6ImNreGZieWE3ODFwNTQyb3N0cW4zNHMxMG8ifQ.HXS54wWrm6wPz-29LVVRbg'
}).addTo(map);

var icon1 = L.icon({
    iconUrl: '/img/monster1.png',
    shadowUrl: '/img/monster-shadow.png',
    iconSize:     [35, 40], // size of the icon
    shadowSize:   [50, 25], // size of the shadow
    iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [25, 10],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var icon2 = L.icon({
    iconUrl: '/img/monster2.png',
    shadowUrl: '/img/monster-shadow.png',
    iconSize:     [35, 40], // size of the icon
    shadowSize:   [50, 25], // size of the shadow
    iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [25, 10],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var icon3 = L.icon({
    iconUrl: '/img/monster3.png',
    shadowUrl: '/img/monster-shadow.png',
    iconSize:     [35, 40], // size of the icon
    shadowSize:   [50, 25], // size of the shadow
    iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [25, 10],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var icon4 = L.icon({
    iconUrl: '/img/monster4.png',
    shadowUrl: '/img/monster-shadow.png',
    iconSize:     [35, 40], // size of the icon
    shadowSize:   [50, 25], // size of the shadow
    iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [25, 10],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var monster1 = L.marker([-23.372831435519085, -51.15950524806976], {icon: icon1}).addTo(map).bindPopup("GRRR");

var monster2 = L.marker([-23.372964389639055, -51.15923166275025], {icon: icon2}).addTo(map).bindPopup("GRRR");

var monster3 = L.marker([-23.3739541550077, -51.15929067134858], {icon: icon3}).addTo(map).bindPopup("GRRR");

var monster4 = L.marker([-23.373048101423944, -51.15858256816865], {icon: icon4}).addTo(map).bindPopup("GRRR");

var monster = monster2;

function onMapClick(e) {
    monster.setLatLng(e.latlng);
    console.log(e.latlng);

    $.getJSON( "/ajax/localizacao_teste.php", function(data) {
    }
}

map.on('click', onMapClick);

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

getLocation ();