// Create the map
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
var cor = "#2f2e40";

function play() {
   //return;
   var audio = new Audio('/audio/coin.mp3');
   audio.play(); 
   //$("#coin").addClass("animate");
   //setTimeout(function() {
   //$("#coin").removeClass("animate");
  //}, 2000);
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
         
         var pointList = [];
         for (var k in data) {
               /*
	var circle = L.circle([data[k].latitude, data[k].longitude], {
		fillOpacity: 0,
        		radius: 2.5,
        		weight: 1,
        		stroke: false
	}).addTo(map);*/

	//data[k].rectangle = L.rectangle(circle.getBounds(), {color: data[k].cor, weight: 1}).addTo(map);

               pointList.push(new L.LatLng([data[k].latitude, data[k].longitude]));
        }

        reguas = data;
        onMapClick({ latlng: {
             lat: reguas[0].latitude,
             lng: reguas[0].longitude
        }});

        var firstpolyline = new L.Polyline(pointList, {
            color: 'black',
            weight: 5,
            opacity: 1,
            smoothFactor: 1
        });
        firstpolyline.addTo(map);
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

     var novaArea = true;
     for (var k in reguas) {
          if (reguas[k].latitude == pos.lat &&
               reguas[k].longitude == pos.lng) {
               novaArea = false;
          }
     }
     if (novaArea) {
         type("Marcando nova área");
         say("Marcando nova área");
         play();
     }

    marker.setLatLng(new L.LatLng(pos.lat, pos.lng));
    map.setView([pos.lat, pos.lng], 18);
}

map.on('click', onMapClick);

// ATUALIZAR 
var intervalo = 15000;
var foo = function() {
        reload();
        
        var numberOfMlSeconds = new Date().getTime();
        var newDateObj = new Date(numberOfMlSeconds + intervalo);

        countDownDate = newDateObj;
};

$(document).ready(function() {
    foo();
    setInterval(foo, intervalo);
});

$(document).on('change', ':radio[name="cor"]', function() {
    $('label').removeClass('active');
    $(this).filter(':checked').parent().addClass('active');
    var expr = $(this).filter(':checked').attr('id');
    cor = expr;
});

$("#box4").click(function() {
      $.getJSON("https://nominatim.openstreetmap.org/reverse?lat="+reguas[0].latitude+"&lon="+reguas[0].longitude+"&format=json", function(data) {
          type("Informando localização");
          say("Estamos próximos à " + data.display_name);
      });
});

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
    //console.log("lightValue: " + lightValue);
    //console.log("motionValue: " + motionValue);

    if(lightValue == 0 && motionValue == 0) {
        //$("#front").attr("src", "/img/v1/blinking.gif");
        var text = "Oi";
        type(text);
        //say(text);
    }
    else if (lightValue > 0 && motionValue == 0) {
        //$("#front").attr("src", "/img/v1/blinking.gif");
        var text = "Uma luz está acesa " + lightValue;
        type(text);
        //say(text);
    }
    else {
       // $("#front").attr("src", "/img/v1/blinking.gif");
       var text = " " + motionValue;
       type(text);
       //say(text);
    }
}

var last_text = "";
var running = 0;
function type(text) {
     if (running == 0 && text != last_text) {
         $(".typing-wrapper").html("");
         var html = "<div class=\"typing-demo\" style=\"width: " + (text.length+2) + "ch; animation: typing 2s steps(" + (text.length+2) +"), blink .5s step-end infinite alternate;\">" + text + "</div>";
         $(".typing-wrapper").html(html);

         running = 1;
         last_text = text;
         setTimeout(function() { running = 0; }, 5000);
     }
}

var last_text2 = "";
function say(text) {
         if (text != last_text2) {
              // Teste SpeechSynthesisUtterance
              last_text2 = text;

              var msg = new SpeechSynthesisUtterance();
              msg.text = text;
              msg.onend = function(event) {
                  console.log("onend");
                  last_text2 = "";
              }
              window.speechSynthesis.speak(msg);
        }
}

// Localização melhor
function success(position) {
   $("#local-info").html("geolocation: <i class=\"bi bi-check-square-fill\"></i>");

   var pos = posicaoNoGrid({
        lat : position.coords.latitude,
        lng : position.coords.longitude
    });
    onMapClick({ latlng: pos });

   $.post("/ajax/localizacao_gps.php", {
        lat: pos.lat, 
        lng: pos.lng,
        cor: cor,
        })
        .done(function(data) {
               type("Atualizando localização");
               say("Atualizando localização");
               play();
        });
}

function error(error) {
   $("#local-info").html("geolocation: <i class=\"bi bi-check-square\"></i>");
   
  switch(error.code)  {
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

const options = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 5000
};

const watchID = navigator.geolocation.watchPosition(success, error, options);
