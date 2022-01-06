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

var greenIcon = L.icon({
    iconUrl: '/img/monster.png',
    shadowUrl: '/img/monster-shadow.png',

    iconSize:     [35, 50], // size of the icon
    shadowSize:   [50, 25], // size of the shadow
    iconAnchor:   [17.5, 50], // point of the icon which will correspond to marker's location
    shadowAnchor: [25, 10],  // the same for the shadow
    popupAnchor:  [17.5, 50] // point from which the popup should open relative to the iconAnchor
});

var marker2 = L.marker([-23.3466404, -51.1476256], {icon: greenIcon}).addTo(map);

function onMapClick(e) {
    marker2.setLatLng(e.latlng));
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