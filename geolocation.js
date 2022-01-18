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

function onMapClick(e) {
    var circle = L.circle([e.latlng.lat, e.latlng.lng], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0,
    radius: 5,
    weight: 1,
    stroke: false
}).addTo(map);

var rectangle = L.rectangle(circle.getBounds(), {color: "#ff7800", weight: 1}).addTo(map);

    //console.log(circle.getBounds());
    //monster.marker.setLatLng(e.latlng);
    //console.log(e.latlng);

    posicaoNoGrid(e latlng);

    /*$.getJSON( "/ajax/localizacao_teste.php?lat="+e.latlng.lat+"&long="+e.latlng.lng+"&id="+monster.id, function(data) {
        console.log(data);
    });
    reload();*/
    //play();
}

 var y = 0.00008993216057362474;
 var x = { lat: -23.36026174491471, lng: -51.15455389022828 };
 var z =  { lat: -23.37471986394205, lng: -51.155176162719734 };

map.on('click', onMapClick);

function posicaoNoGrid(pos) {
  var inicio = { lat: -23.36026174491471, lng: -51.15455389022828 };
  var dist = 0.00008993216057362474;
  
  console.log(((pos.lat - inicio.lat) / dist));
}

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