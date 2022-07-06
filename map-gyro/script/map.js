// Create the map
var map = L.map('map', {
     rotate: true,
     touchRotate: true,
     rotateControl: {
          closeOnZeroBearing: false
     },
     bearing: 30
}).setView([-23.37062642645644,  -51.15587314318577], 18);

var tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'/* | <a href="https://www.mapbox.com/">Mapbox</a>'*/,
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVjYXNkdWFydGUxOTkyIiwiYSI6ImNreGZieWE3ODFwNTQyb3N0cW4zNHMxMG8ifQ.HXS54wWrm6wPz-29LVVRbg'
}).addTo(map);

var compassIcon = L.icon({
       iconUrl: "/map-gyro/img/compass.png",
       iconSize:     [40, 40], 
       iconAnchor:   [20, 20]
});

var markerIcon = L.icon({
       iconUrl: "/map-gyro/img/marker.png",
       iconSize:     [30, 30], 
       iconAnchor:   [15, 30]
});

var compassMarker = L.marker([-23.37062642645644,  -51.15587314318577],  {icon: compassIcon}).addTo(map);

var markerShadow = L.circle([-23.37062642645644,  -51.15587314318577], {
        color: "#2E2E2E",
        fillOpacity: 0.5,
        radius: 2.25,
        weight: 0,
        stroke: true
}).addTo(map);

var marker = L.marker([-23.37062642645644,  -51.15587314318577],  {icon: markerIcon}).addTo(map);

// Teste
var GPS = true;

// Click no mapa
var posAnterior = false;
var dhPosAnterior = new Date().getTime();

map.on("click", mapClick);
function mapClick(e) {
     var pos ={
         lat: e.latlng.lat,
         lng: e.latlng.lng
     };
     posicao = pos;

     var velocidadeReal = 0;
     var now = new Date().getTime();
     var tempo = now - dhPosAnterior;
     ws.tempo += tempo;

     if (posAnterior && tempo > 500) {
           var distancia = posAnterior
           .distanceTo(new L.LatLng(
                e.latlng.lat, 
                e.latlng.lng));

           velocidadeReal = 
           Math.floor((distancia / (tempo / 1000)) * 3.6);

           posAnterior = new L.LatLng(pos.lat, pos.lng);
           dhPosAnterior = now;

           console.log(velocidadeReal + " km/h");
    }
    else if (tempo > 500) {
       posAnterior = new L.LatLng(
              e.latlng.lat,
              e.latlng.lng);
       dhPosAnterior = now;
    }
    // -- Final do cálculo de velocidade

    marker.setLatLng(new L.LatLng(pos.lat, pos.lng));
    markerShadow.setLatLng(new L.LatLng(pos.lat, pos.lng));
    compassMarker.setLatLng(new L.LatLng(pos.lat, pos.lng));
}

function rotateCompass(angle) {
    var img = new Image();
    img.width = 64;
    img.height = 64;
    img.id = playerId;
    img.onload = function() {
        var icon = rotateImage(this, angle);
        compassMarker.setIcon(
            L.icon({
                 iconUrl: icon,
                 iconSize:     [40, 40],
                 iconAnchor:   [20, 20]
            }));
    }
    img.src = "/map-gyro/img/compass.png";
}

function rotateImage(img, angle) {
     var canvas = document.createElement("canvas");
     var context = canvas.getContext( '2d' );

     canvas.width = 64;
     canvas.height = 64;
;
     var width = img.id == 4 ? img.width / 2 : img.width;
     var height = img.height;

     context.save();
     context.translate(canvas.width / 2, canvas.height / 2);
     context.rotate(-angle);
     context.drawImage(img, -(width / 2), -(height / 2),
         width, height);
     context.restore();

     return canvas.toDataURL();
}

// Posição no mapa
var posicao = { lat: -23.37062642645644, lng: -51.15587314318577 };
function posicaoNoGrid(pos) {
  var inicio = { lat: -23.36026174491471, lng: -51.15455389022828 };

  var a = 0.000008993216088271083 * 5;
  var b = (inicio.lat - (pos.lat)) / a;
  var c = Math.floor(b) + 0.5;

  var d = 0.000009956626094265175 * 5;
  var e = (inicio.lng - (pos.lng)) / d;
  var f = Math.floor(e) + 0.5;

  pos.lat = inicio.lat + ((a * c) * -1);
  pos.lng = inicio.lng + ((d * f) * -1);

  return pos;
}

// Localização melhor
var lastPosition = false;
var newPosition = false;
function success(position) {
   
   lastPosition = newPosition;
   newPosition = position;

   if (GPS) {
        posicao = posicaoNoGrid({
             lat : position.coords.latitude,
             lng : position.coords.longitude
        });
        mapClick({ latlng: posicao });
        map.setView([ posicao.lat, posicao.lng ], 18);
    }
}

function error(error) {
  switch(error.code)  {
    case error.PERMISSION_DENIED:
      console.log("Usuário rejeitou a solicitação de Geolocalização.");
      //setInterval(reload, 5000);
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

const options = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 5000
};

const watchID = navigator.geolocation.watchPosition(success, error, options); 

// Atualizar 
$(document).ready(function() {
});