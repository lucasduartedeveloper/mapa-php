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

var  reguas = [];
var  regua = {};
var cor = "";

function play() {
   return;
   var audio = new Audio('/audio/coin.mp3');
   audio.play(); 
  $("#coin").addClass("animate");
  setInterval (function() {
      $("#coin").removeClass("animate");
  }, 2000);
}

function posicaoNoGrid(pos) {
  var inicio = { lat: -23.36026174491471, lng: -51.15455389022828 };

  var a = 0.000008993216088271083 * 5;
  var b = (inicio.lat - (pos.lat)) / a;
  var c = Math.floor(b) + 0.5;

  var d = 0.000009956626094265175 * 5;
  var e = (inicio.lng - (pos.lng)) / d;
  var f = Math.floor(e) + 0.5;

   /*
  console.log("- - -");
  console.log(inicio);
  console.log(pos);
  console.log("- - -");
  console.log(a);
  console.log(b);
  console.log(c);
  console.log("- - -");
  */

  pos.lat = inicio.lat + ((a * c) * -1);
  pos.lng = inicio.lng + ((d * f) * -1);

  //console.log(pos);
  return pos;
}

function reload() {
      $.getJSON("/ajax/localizacao_gps.php", function(data) {

         //console.log(data);
         for (var k in reguas) {
             map.removeControl(reguas[k].rectangle);
         }

         for (var k in data) {
	var circle = L.circle([data[k].latitude, data[k].longitude], {
		fillOpacity: 0,
        		radius: 2.5,
        		weight: 1,
        		stroke: false
	}).addTo(map);

	data[k].rectangle = L.rectangle(circle.getBounds(), {color: data[k].cor, weight: 1}).addTo(map);
        }

        reguas = data;

        });
      
      $.getJSON("/ajax/localizacao_gps.php?select=true", function(data) {

            var label1 = "";
            var label2 = "";
            var label3 = "";

            for (var k in data) {

            var html = "<label class=\"btn btn-outline-dark btn-sm\"><input type=\"radio\" display=\"none\" name=\"cor\" id=\""+data[k].cor+"\" autocomplete=\"off\"><div class=\"icone\" style=\"background-color:"+data[k].cor+";\">"+data[k].quantidade+"</div></label>";

           if (k <= 3) {
               label1 += html;
           }
           else if (k <= 7) {
               label2 += html;
           }
           else if (k <= 11) {
               label3 += html;
           }

           }

           // menu
           $('#teste1').html(label1);
           $('#teste2').html(label2);
           $('#teste3').html(label3);

            //console.log(data);
      });
}

function onMapClick(e) {
    var pos = posicaoNoGrid(e.latlng);

    marker.setLatLng(new L.LatLng(pos.lat, pos.lng));
    map.setView([pos.lat, pos.lng], 19);
}

map.on('click', onMapClick);

var intervalo = 5000;
var foo = function() {
        getLocation();
        var pos = posicaoNoGrid({
            lat : geolocation.latitude,
            lng : geolocation.longitude
        });
        onMapClick({ latlng: pos });

       $.post("/ajax/localizacao_gps.php", {
            lat: pos.lat, 
            lng: pos.lng,
            cor: cor,
            })
           .done(function(data) {
               //console.log("post");
               //console.log(data);
               play();
               reload();
        });

        var numberOfMlSeconds = new Date().getTime();
        var addMlSeconds = intervalo;
        var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

        countDownDate = newDateObj;
};

$(document).ready(function() {
    foo();
    setInterval(foo, intervalo);
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
  //console.log("Latitude: " + position.coords.latitude + " / Longitude: " + position.coords.longitude); 
   geolocation.latitude = position.coords.latitude;
   geolocation.longitude = position.coords.longitude;
  }
function showError(error)
  {
    $("#local-info").html("geolocation: <i class=\"bi bi-check-square\"></i>");

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

$(document).on('change', ':radio[name="cor"]', function() {
    $('label').removeClass('active');
    $(this).filter(':checked').parent().addClass('active');
    var expr = $(this).filter(':checked').attr('id');
    cor = expr;
});

getLocation();

// SENSOR DE MOVIMENTO
var motionValue = 0;
if(window.DeviceMotionEvent){
  window.addEventListener("devicemotion", motion, false);
  $("#motion-info").html("devicemotion: <i class=\"bi bi-check-square-fill\"></i>");
}
function motion(event){
  motionValue = event.accelerationIncludingGravity.x;
  animar();
  /*console.log("Accelerometer: "
    + event.accelerationIncludingGravity.x + ", "
    + event.accelerationIncludingGravity.y + ", "
    + event.accelerationIncludingGravity.z
  );*/
}

// SENSOR DE PROXIMIDADE
window.addEventListener('userproximity', function(event) {
  console.log(event);
});

// SENSOR DE LUZ
var lightValue = 0;
if ("ondevicelight" in window) {
  $("#light-info").html("ambientlight: <i class=\"bi bi-check-square-fill\"></i>");
  window.addEventListener("devicelight", light);
}

function light(event) {
    lightValue = event.value;
    animar();
    //console.log(event.value);
  }

function animar() {
    console.log("lightValue: " + lightValue);
    console.log("motionValue: " + motionValue);

    if(lightValue = 0 & motionValue = 0) {
        $("#front").attr("src", "/img/front-0.png");
    }
    else if (lightValue > 0) {
        $("#front").attr("src", "/img/front-1.png");
    }
    else {
        $("#front").attr("src", "/img/front-2.png");
    }
}