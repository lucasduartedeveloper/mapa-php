// Create the map
var map = L.map('map').setView([-23.37062642645644,  -51.15587314318577], 18);

var tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVjYXNkdWFydGUxOTkyIiwiYSI6ImNreGZieWE3ODFwNTQyb3N0cW4zNHMxMG8ifQ.HXS54wWrm6wPz-29LVVRbg'
}).addTo(map);

// Texto para audio
var speaking = false;
function say(text) {
         if (!speaking) {
              speaking = true;
              var msg = new SpeechSynthesisUtterance();
              msg.text = text;
              msg.onend = function(event) {
                  speaking = false;
              };
              window.speechSynthesis.speak(msg);
        }
}
var markerIcon0 = L.icon({
       iconUrl: "/extra/img/vehicles/audi.png",
       iconSize:     [20, 20], 
       iconAnchor:   [10, 10]
});

var marker0 = L.marker([-23.37062642645644,  -51.15587314318577],  {icon: markerIcon0}).addTo(map);

var markerShadow0 = L.circle([-23.37062642645644,  -51.15587314318577], {
        color: "#2E2E2E",
        fillOpacity: 0.5,
        radius: 2.25,
        weight: 0,
        stroke: true
}).addTo(map);

// Teste
var markerIcon1= L.icon({
       iconUrl: "/extra/img/vehicles/black_viper.png",
       iconSize:     [20, 20], 
       iconAnchor:   [10, 10]
});

var marker1 = L.marker([-23.370806290778205,  -51.15567401066389],  {icon: markerIcon1}).addTo(map);

var markerShadow1 = L.circle([-23.370806290778205,  -51.15567401066389], {
        color: "#2E2E2E",
        fillOpacity: 0.5,
        radius: 2.25,
        weight: 0,
        stroke: true
}).addTo(map);

// Teste
var markerIcon2 = L.icon({
       iconUrl: "/extra/img/vehicles/police.png",
       iconSize:     [20, 20], 
       iconAnchor:   [10, 10]
});

var marker2 = L.marker([-23.370806290778205,  -51.15607227570766],  {icon: markerIcon2}).addTo(map);

var markerShadow2 = L.circle([-23.370806290778205,  -51.15607227570766], {
        color: "#2E2E2E",
        fillOpacity: 0.5,
        radius: 2.25,
        weight: 0,
        stroke: true
}).addTo(map);

//Teste
var markerIcon3 = L.icon({
       iconUrl: "/extra/img/vehicles/taxi.png",
       iconSize:     [20, 20], 
       iconAnchor:   [10, 10]
});

var marker3 = L.marker([-23.37098615509997,  -51.15587314318577],  {icon: markerIcon3}).addTo(map);

var markerShadow3 = L.circle([ -23.37098615509997,  -51.15587314318577], {
        color: "#2E2E2E",
        fillOpacity: 0.5,
        radius: 2.25,
        weight: 0,
        stroke: true
}).addTo(map);

//Teste nível
var nvIcon = 
      L.icon({
         iconUrl: createLabel("0 km/h"),
         iconSize:     [100, 30], // size of the icon
         iconAnchor:   [50, 70]
 });

// Teste
var GPS = false;
var playerId = localStorage.getItem("playerId") ? 
    parseInt(localStorage.getItem("playerId")) : 0;
var players = [ 
    { marker: marker0, 
      markerShadow: markerShadow0,
      markerNv: L.marker([-23.37062642645644,  -51.15587314318577], { icon: nvIcon }).addTo(map),
      name: "Audi",
      icon: "/extra/img/vehicles/audi.png",
      camera: "/extra/img/vehicles/audi.png",
      color: "#1c1e21",
      pointList: [] },
    { marker: marker1, 
      markerShadow: markerShadow1,
      markerNv: L.marker([-23.370806290778205,  -51.15567401066389], { icon: nvIcon }).addTo(map),
      name: "Black Viper",
      icon: "/extra/img/vehicles/black_viper.png",
      camera: "/extra/img/vehicles/black_viper.png",
      color: "#b39e37",
      pointList: [] },
    { marker: marker2, 
      markerShadow: markerShadow2,
      markerNv: L.marker([-23.370806290778205,  -51.15607227570766], { icon: nvIcon }).addTo(map),
      name: "Police",
      icon: "/extra/img/vehicles/police.png",
      camera: "/extra/img/vehicles/police.png",
      color: "#a83275",
      pointList: [] },
    { marker: marker3,
      markerShadow: markerShadow3,
      markerNv: L.marker([-23.37098615509997,  -51.15587314318577], { icon: nvIcon }).addTo(map),
      name: "Taxi",
      icon: "/extra/img/vehicles/taxi.png",
      camera: "/extra/img/vehicles/taxi.png",
      color: "#3758b3",
      pointList: [] }
];
trajetos = [];

for (var m = 0; m < 4; m++) {
    if(m != playerId) {
         players[m].marker.setOpacity(0.5);
    }
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

// Enviar o áudio para o banco de dados
function postAudio(nome, buffer, base64) {

      $.post("/extra/ajax/audio.php", {
             nome: nome,
             latitude: posicao.lat, 
             longitude: posicao.lng,
             desenho: formatarAudio(buffer).toString(),
             base64: base64,
             }).done(function(data) { 
                   audio.pause();
                   audio = new Audio("../audio/game_notification.wav");
                   audio.play(); 
                   reload();
                   // Websocket
                   ws.send("JUPS|"+playerId);
      });
}

// Comparar dois audios
function compararAudio(a, b) {
       var maior = a.length > b.length ? a : b;
       var menor = a.length > b.length ? b : a;

       var soma = 0;
       for (var i = 0; i < menor.length; i++) {
            if (menor.charAt(i)  == maior.charAt(i)) {
                  soma++;
            }
       }
       return (100 / menor.length) * soma;
}

function formatarAudio(buffer) {
       var array8 = new Uint8Array(buffer);
       var array16 = new Uint16Array(buffer, buffer.byteOffset, buffer.byteLength / 2).slice(22);
       var wavHeader = array8.slice(0, 44);

       var tamanhoBloco = 500;
       var quantidade = Math.floor(array16.length / tamanhoBloco);
       var novoArray = [];

       for (var i = 0; i <= quantidade; i++) {
            var bloco = 0;
            for (var j = 0; j < tamanhoBloco; j++) {
                  var m = (i * tamanhoBloco) + j;
                  if ((m+1) <= array16.length) {
                        bloco += array16[m];
                  }
            }

            novoArray.push(Math.floor((100 / 65535) * (bloco / tamanhoBloco)));
       }

       //console.log(novoArray);
       desenharWave(novoArray);
       return novoArray;
}

function desenharWave(array) {
     var canvas = document.getElementById("wave");
     var context = canvas.getContext( '2d' );

     canvas.width = 1000;
     canvas.height = 100;

     for (var k = 0; k < array.length; k++) {
            context.beginPath(); // always start a new line with beginPath
            context.strokeStyle = "#FFFFFF";
            context.lineWidth = 5;
            context.moveTo( 2.5+(k * 5),  99- ((100 - array[k])/2) ); // start position
            context.lineTo( 2.5+(k * 5), ((100 - array[k])/2) );
            context.stroke(); // actually draw the line
     }

     return canvas.toDataURL();
}

// Audio
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
var recorder;
var gumStream;
var input;

function recordAudio() {
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {

          gumStream = stream;
          input = audioContext.createMediaStreamSource(stream);
          recorder = new Recorder(input, {
               numChannels: 1
          }) ;

          recorder.record();
    }).catch(e=>console.log(e));
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

// Carregar atualizações
var audios = [];
var wire = false;
var cameraView = false;
var dragging = false;
function reload() {
     if (dragging) { return; }
     // Atualizar marcadores
     $.getJSON("/extra/ajax/trajeto.php", function(data) {
             trajetos = [
                 data.filter(d => parseInt(d.playerid) == 0), 
                 data.filter(d => parseInt(d.playerid) == 1), 
                 data.filter(d => parseInt(d.playerid) == 2), 
                 data.filter(d => parseInt(d.playerid) == 3)
             ];

             if (trajetos[playerId].length > 0) {
                 posicao = {
                     lat: parseFloat(trajetos[playerId][0].latitude),
                     lng: parseFloat(trajetos[playerId][0].longitude)
                 };
             }

             for (var m = 0; m < 4; m++) {
                  if (trajetos[m].length > 0) {
                      var latlng = [
                           trajetos[m][0].latitude,
                           trajetos[m][0].longitude
                      ];
                      players[m].marker.setLatLng(latlng);
                      players[m].markerShadow.setLatLng(latlng);
                      players[m].markerNv.setLatLng(latlng);
                      players[m].markerNv.setIcon(
                      L.icon({
                          iconUrl: createLabel(trajetos[m].length + " km"),
                          iconSize:   [100, 30], // size of the icon
                          iconAnchor:   [50, 70]
                      }));
                   }
                   else {
                      //players[m].markerNv.setLatLng(latlng);
                      players[m].markerNv.setIcon(
                      L.icon({
                          iconUrl: createLabel("0 km"),
                          iconSize:     [100, 30], // size of the icon
                          iconAnchor:   [50, 70]
                      }));
                   }

                   if (trajetos[m].length > 1) {
                      var co = 
                      parseFloat(trajetos[m][1].longitude) - 
                      parseFloat(trajetos[m][0].longitude);
                      var ca = 
                      parseFloat(trajetos[m][1].latitude) - 
                      parseFloat(trajetos[m][0].latitude);

                      var h = 
                      Math.sqrt(
                      Math.pow(co, 2) +
                      Math.pow(ca, 2));

                      var a = calcularAngulo(co, ca, h);
                      var img = new Image();
                      img.a = a;
                      img.m = m;
                      img.width = 256;
                      img.height = 256;
                      img.onload = function() {
                           var icon = rotateImage(this, this.a);
                           players[this.m].marker.setIcon(
                           L.icon({
                              iconUrl: icon,
                              iconSize:     [20, 20],
                              iconAnchor:   [10, 10]
                           }));
                      }
                      img.src = players[m].icon;
                  }

                  if (players[m].line) {
                      map.removeControl(players[m].line);
                  }
                  players[m].pointList = [];

                  for (var k in trajetos[m]) {
                  players[m].pointList.push(
                      new L.LatLng(
                      trajetos[m][k].latitude,
                      trajetos[m][k].longitude));
                  }

                  players[m].line = 
                  new L.Polyline(players[m].pointList, {
                      color: players[m].color,
                      weight: 3,
                      opacity: 0.5,
                      smoothFactor: 1,
                      dashArray: '0',
                      dashOffset: '0'
                 });
                 players[m].line.addTo(map);
           }

   // Carregar audios
   $.getJSON("/extra/ajax/audio.php", function(data) {
          for (var k in audios) {
               map.removeControl(audios[k].marker);
               map.removeControl(audios[k].markerShadow);
               map.removeControl(audios[k].markerNv);
          }

          audios = data;
          var pointList = [];
          if (wire) { map.removeControl(wire); };

          pointList.push(
                   new L.LatLng(
                   posicao.lat,
                   posicao.lng));

          for (var k in audios) {
               var icon = L.icon({
                   iconUrl: "/extra/img/ghost.png",
                   iconSize:     [20, 20],
                   iconAnchor:   [10, 20]
               });
               
              audios[k].m = k;
              var click = function (e) {
                   carregarAudio(this.m);
               };
               var audioClick = click.bind(audios[k]);

              var dblClick = function (e) {
                   excluirAudio(this.m);
               };
               var audioDblClick = dblClick.bind(audios[k]);

               var dragStart = function (e) {
                   dragging = true;
               };
               var audioDragStart = dragStart.bind(audios[k]);

               var dragEnd = function (e) {
                   mudarAudio(this.m, e);
               };
               var audioDragEnd = dragEnd.bind(audios[k]);

              audios[k].marker = L.marker(
              [audios[k].latitude, audios[k].longitude],
              {icon: icon, draggable: true})
              .on("click", audioClick)
              .on("dblclick", audioDblClick)
              .on("dragend", audioDragEnd)
              .on("dragstart", audioDragStart)
              .addTo(map);

              audios[k].markerShadow = L.circle(
              [audios[k].latitude, audios[k].longitude], {
                  color: "#581845",
                  fillOpacity: 0.5,
                  radius: 2.5,
        	    weight: 1,
        	    stroke: false
	}).addTo(map);

              audios[k].markerNv = L.marker(
              [audios[k].latitude, audios[k].longitude],
              { icon: 
                   L.icon({
                      iconUrl: createLabel("Nv. " + audios[k].desenho.split(",").length, "#f00"),
                      iconSize:     [100, 30], // size of the icon
                      iconAnchor:   [50, 70]
              })}).addTo(map);

              pointList.push(
                  new L.LatLng(
                       audios[k].latitude,
                       audios[k].longitude));
          }

          wire = new L.Polyline(pointList, {
              color: '#8A0829',
              weight: 3,
              opacity: 0.5,
              smoothFactor: 1,
              dashArray: '5',
              dashOffset: '0'
         });
         wire.addTo(map);
         
              if (innerWidth < innerHeight) {
                   $("#loading").hide();
              }
         });
     });
}

// Carregar áudio
function carregarAudio(m) {
      $("#audio-info").show();
      $("#audio-wave").show();

      var click = function (e) {
           playAudio(this.m);
      };
      var audioClick = click.bind(audios[m]);
      $("#audio-wave").click(audioClick);

      $("#audio-info").html(audios[m].nome + "<br>" + audios[m].data_hora);
      desenharWave(audios[m].desenho.split(","));
}

// Excluir áudio
function excluirAudio(m) {

    // Comparar o Nv
    if(audios[m].desenho.split(",").length > trajetos[playerId].length) {
        audio.pause();
        audio = new Audio("../audio/game_over.mp3");
        audio.play();
        return;
    }

    var pointList = [];
    map.removeControl(wire);

    for (var k = m; k < audios.length; k++) {
          $.get("/extra/ajax/audio.php?deleteId="+audios[k].id, function(data) {
          });

          map.removeControl(audios[k].marker);
          map.removeControl(audios[k].markerShadow);
          map.removeControl(audios[k].markerNv);
    }
    // Websocket
    ws.send("JUPS|"+playerId);

    //console.log(audios);
    audios = audios.slice(0, m);
    //console.log(audios);

    pointList.push(
                   new L.LatLng(
                   posicao.lat,
                   posicao.lng));

    for (var k = 0; k < audios.length; k++) {
           pointList.push(
                  new L.LatLng(
                       audios[k].latitude,
                       audios[k].longitude));
    }
    //console.log(pointList);

    audio.pause();
    audio = new Audio("../audio/sfx_victory.mp3");
    audio.play();

    wire = new L.Polyline(pointList, {
              color: '#8A0829',
              weight: 3,
              opacity: 0.5,
              smoothFactor: 1,
              dashArray: '5',
              dashOffset: '0'
     });
     wire.addTo(map);
}

// Play áudio
var audio = new Audio();
function playAudio(m) {
    $.getJSON("/extra/ajax/audio.php?id="+audios[m].id, function(data) {
         audio.pause();
         audio = new Audio(data[0].base64);
         $("#audio-wave").addClass("playing");
         audio.onended = function() {
              $("#audio-wave").removeClass("playing");
         };
         audio.play();
    });
}

// Mudar de lugar
function mudarAudio(m, e) {
       var pos = posicaoNoGrid(
           e.target.getLatLng()
       );

      $.post("/extra/ajax/audio.php", {
             id: audios[m].id,
             latitude: pos.lat, 
             longitude: pos.lng,
             }).done(function(data) { 
                   audio.pause();
                   audio = new Audio("../audio/game_notification.wav");
                   audio.play();

                   audios[m].marker.setLatLng(
                   new L.LatLng(
                   pos.lat, pos.lng));
                   audios[m].markerShadow.setLatLng(
                   new L.LatLng(
                   pos.lat, pos.lng));
                   audios[m].markerNv.setLatLng(
                   new L.LatLng(
                   pos.lat, pos.lng));

                   // Websocket
                   ws.send("JUPS|"+playerId);

                   dragging = false;
      });

      audios[m].latitude = pos.lat;
      audios[m].longitude = pos.lng;

      var pointList = [];
      map.removeControl(wire);
 
      pointList.push(
                   new L.LatLng(
                   posicao.lat,
                   posicao.lng));

      for (var k in audios) {
            pointList.push(
                   new L.LatLng(
                   audios[k].latitude,
                   audios[k].longitude));
      }

      wire = new L.Polyline(pointList, {
              color: '#8A0829',
              weight: 3,
              opacity: 0.5,
              smoothFactor: 1,
              dashArray: '5',
              dashOffset: '0'
     });
     wire.addTo(map);
}

// Enviar o áudio para o banco de dados
function excluirTrajeto(playerId) {
      $.get("/extra/ajax/trajeto.php?deletePlayerId="+playerId, function(data) {
           //console.log(data)
           audio.pause();
           audio = new Audio("../audio/game_over.mp3");
           audio.play();
           reload();
           // Websocket
           ws.send("JUPS|"+playerId);
      });
}

// Click no mapa
map.on("click", mapClick);
function mapClick(e) {
     $("#audio-info").hide();
     $("#audio-wave").hide();
     $("#audio-wave").removeClass("playing");

    var pos = posicaoNoGrid({
         lat: e.latlng.lat,
         lng: e.latlng.lng
    });
    posicao = pos;
    centralizarNaRota(pos);

    var pointList = [];
    if (wire) { map.removeControl(wire); };

    pointList.push(
        new L.LatLng(
        posicao.lat,
        posicao.lng));

    for (var k in audios) {
        pointList.push(
             new L.LatLng(
             audios[k].latitude,
             audios[k].longitude));
     }

     wire = new L.Polyline(pointList, {
              color: '#8A0829',
              weight: 3,
              opacity: 0.5,
              smoothFactor: 1,
              dashArray: '5',
              dashOffset: '0'
    });
    wire.addTo(map);

    players[playerId].marker.setLatLng(new L.LatLng(pos.lat, pos.lng));
    players[playerId].markerShadow.setLatLng(new L.LatLng(pos.lat, pos.lng));

    if (players[playerId].line) {
            map.removeControl(players[playerId].line);
    }
    players[playerId].pointList.unshift(
    new L.LatLng(
         pos.lat, pos.lng));

    players[playerId].line = 
    new L.Polyline(players[playerId].pointList, {
         color: players[playerId].color,
         weight: 3,
         opacity: 0.5,
         smoothFactor: 1,
         dashArray: '0',
         dashOffset: '0'
    });
    players[playerId].line.addTo(map);
                   
    // ----
    trajetos[playerId].unshift({ 
         latitude: pos.lat,
         longitude: pos.lng
    });

    if (trajetos[playerId].length > 1) {
          var co = 
          parseFloat(trajetos[playerId][1].longitude) - 
          parseFloat(trajetos[playerId][0].longitude);
          var ca = 
          parseFloat(trajetos[playerId][1].latitude) - 
          parseFloat(trajetos[playerId][0].latitude);

          var h = 
          Math.sqrt(
          Math.pow(co, 2) +
          Math.pow(ca, 2));

          var a = calcularAngulo(co, ca, h);
          var img = new Image();
          img.width = 256;
          img.height = 256;
          img.onload = function() {
                 var icon = rotateImage(img, a);
                 players[playerId].marker.setIcon(
                        L.icon({
                               iconUrl: icon,
                               iconSize:     [20, 20],
                               iconAnchor:   [10, 10]
                        }));
                  }
          img.src = players[playerId].icon;
    }

    var nv = trajetos[playerId].length;

    players[playerId].markerNv.setLatLng(new L.LatLng(pos.lat, pos.lng));
    players[playerId].markerNv.setIcon(
    L.icon({
         iconUrl: createLabel(nv + " km/h"),
         iconSize:     [100, 30], // size of the icon
         iconAnchor:   [50, 70]
    }));

    //calcularColisoes();
    $.post("/extra/ajax/trajeto.php", {
             playerId: playerId,
             latitude: pos.lat, 
             longitude: pos.lng,
             }).done(function(data) { 
                   // Websocket
                   ws.send("JUPS|"+playerId);
    });
}

// Atualizar 
// Botão de gravação
var recording = false;
$(document).ready(function() {
     //console.log("ready");
     reload();

     $("#mic").click(function(e) {
         if (!recording) {
              recording = true;
              $("#mic").addClass("active");
              $("#mic i").removeClass("bi-mic-mute-fill");
              $("#mic i").addClass("bi-mic-fill");
              recordAudio();
         }
        else {
              recording = false;
              $("#mic").removeClass("active");
              $("#mic i").removeClass("bi-mic-fill");
              $("#mic i").addClass("bi-mic-mute-fill");

              recorder.stop();
              gumStream.getAudioTracks()[0].stop();
              recorder.exportWAV(function(blob) { 
                   var audio = new Audio(URL.createObjectURL(blob));
                  audio.play();
                   var reader = new FileReader();
                   reader.readAsArrayBuffer(blob); 
                   reader.onloadend = function() {
                        var buffer = reader.result;
                        var nome = prompt("Nome:","Sua anotação");
                        reader.readAsDataURL(blob);
                        reader.onloadend = function() {
                            var base64 = reader.result;
                            postAudio(nome, buffer, base64);
                        };
                  };
             });
         }
     });

     $("#reload").click(function (e) {
             GPS = !GPS;
             if (GPS) {
                  $("#reload").removeClass("active");
                  $("#left,#up,#right,#down").hide();
             }
             else {
                  $("#reload"). addClass("active");
                  $("#left,#up,#right,#down").show();
             }

             reload();
             $.getJSON("https://nominatim.openstreetmap.org/reverse?lat="+posicao.lat+"&lon="+posicao.lng+"&format=json", function(data) {
                   say("Estamos próximos à " + data.display_name);
             });
     });

     $("#player").click(function (e) {
             // Websocket
             ws.send("JUPS|"+playerId+"|"+
             players[playerId].icon);
             players[playerId].camera = 
             players[playerId].icon;

             playerId = playerId < 3 ? playerId += 1 : 0;
             for (var m = 0; m < 4; m++) {
                 if(m != playerId) {
                     players[m].marker.setOpacity(0.5);
                 }
             }
             players[playerId].marker.setOpacity(1);
             //say("Você selecionou " +players[playerId].name);
             audio.pause();
             audio = new Audio("../audio/game_notification.wav");
             audio.play();

             map.setView([-23.373144526961156, -51.159208612927344], 15);
             setTimeout(function() {
                 posicao = players[playerId].marker.getLatLng();
                 mapClick({ latlng: posicao });
                 localStorage.setItem("playerId", playerId);
                 map.setView([
                       posicao.lat,
                       posicao.lng
                 ], 18);
             }, 500);
     });

     $("#update").click(function (e) {
             location.reload();
     });

     $("#delete").click(function (e) {
             excluirTrajeto(playerId);
     });

     ws.onmessage = (event) => {
        var msg = event.data.split("|");
        //console.log(msg);
        if (msg[0] == "JUPS" && parseInt(msg[1]) != playerId) {
            reload();
            players[parseInt(msg[1])].camera = msg[2];
        }
     };

     // VR TESTE
     var video = document.getElementById("video");
     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: false })
          .then((stream) => {
               video.srcObject = stream;
          });
     }

     setInterval(function() {
         if (cameraView) {
         var canvas = document.getElementById("camera-canvas");
         var context = canvas.getContext("2d");
         
         context.beginPath(); // always start a new line with beginPath
         context.strokeStyle = "#000000";
         context.lineWidth = 4;
         context.moveTo(0, 122); // start position
         context.lineTo(244, 122);
         context.moveTo(122, 0); // start position
         context.lineTo(122, 244);
         context.stroke(); // actually draw the line

         // ENVIAR
         var cnv = document.createElement("canvas");
         cnv.width = 120;
         cnv.height = 120;
         var ctx = cnv.getContext("2d");

         ctx.drawImage(video, 0, 0, 120, 120);

         // Websocket
         var dataUrl = cnv.toDataURL("image/png");
         ws.send("JUPS|"+playerId+"|"+dataUrl);
         //console.log(playerId);
         players[playerId].camera = dataUrl;

         // CAMERAS
         for(var k in players) {
              var img = document.createElement("img");
              img.width = 120;
              img.height = 120;
              img.linha = k < 2 ? 0 : 1;
              img.coluna = k == 0 || k== 2 ? 0 : 1;
              img.style.objectFit = "cover";
              img.k = k;

              img.onload = function() {
                  if (this.src.includes("vehicles")) {
                      context.clearRect(
                      this.linha * 120 + (this.linha * 4),
                      this.coluna * 120 + (this.coluna * 4),
                      120, 120);
                  }
                  context.drawImage(
                        this,
                        this.linha * 120 + (this.linha * 4), 
                        this.coluna * 120 + (this.coluna * 4),
                        this.src.includes("vehicles") ?
                        40 : 120, 
                        this.src.includes("vehicles") ?
                        40 : 120);
                  }
              img.src = players[k].camera;
              }
         }
     }, 250);

    $("#cameraModal").on("shown.bs.modal", function () {
        cameraView = true;
    });

    $("#cameraModal").on("hidden.bs.modal", function () {
        cameraView = false;
        // Websocket
        ws.send("JUPS|"+playerId+"|"+
        players[playerId].icon);
        players[playerId].camera = 
        players[playerId].icon;
    });

    // --------
    window.a = 0.000008993216088271083 * 5;
    window.d = 0.000009956626094265175 * 5;
    window.angulo = 0;

    window.intervalA = false;
    window.intervalB = false;

    $("#left,#right").on("mouseup touchend",
       function(e) {
           //console.log("clear: " + $(e.target).parent().attr("id"));
           //velocidade = 0;
           clearInterval(intervalB);
       }
    );

    $("#left,#right").on("mousedown touchstart",
       function(e) {
            //console.log("start: " + $(e.target).parent().attr("id"));
            if (intervalB) clearInterval(intervalB);
            intervalB = setInterval(function() {
                 reposicionarCarro($(e.target).parent().attr("id"));
            }, 100);
       }
    );

    $("#up,#down").on("mousedown touchstart",
       function(e) {
            //console.log("start: " + $(e.target).parent().attr("id"));
            if (intervalA) clearInterval(intervalA);
            intervalA = setInterval(function() {
                 reposicionarCarro($(e.target).attr("id"));
            }, 100);
       }
    );

    $("#rota").click(function() {
        if (audios.length > 0) {
            calcularRota(
                posicao.lng + "," + posicao.lat, 
                audios[0].longitude + "," + audios[0].latitude
            );
        }
    });
});

// Reposicionar o carro
var velocidade = 0;
var velocidadeMaxima = 1;
function reposicionarCarro(dir) {
    var pos;
    switch (dir) {
         case "left":
             angulo += 20 * (Math.PI/180);
             angulo = 
                 angulo <= (360*(Math.PI/180)) ?
                 angulo : 0;
             break;
         case "up":
             velocidade += 0.1;
             velocidade =
                  velocidade <= velocidadeMaxima ?
                  velocidade : velocidadeMaxima;
             pos = calcularPosicao();
             mapClick(pos);
             map.setView([ pos.latlng.lat, pos.latlng.lng ], 18);
             break;
         case "right":;
             angulo -= 20 * (Math.PI/180);
             angulo = 
                 angulo < 0 ?
                 (360*(Math.PI/180)) : angulo;
             break;
         case "down":
             velocidade -= 0.5;
             velocidade = 
                  velocidade >= -(velocidadeMaxima) ?
                  velocidade : -(velocidadeMaxima);
             pos = calcularPosicao();
             mapClick(pos);
             map.setView([ pos.latlng.lat, pos.latlng.lng ], 18);
             break;
    }
    console.log(angulo); 

    //return;
    var img = new Image();
    img.angulo = angulo;
    img.width = 256;
    img.height = 256;
    img.onload = function() {
        var icon = rotateImage(this, this.angulo);
        players[playerId].marker.setIcon(
            L.icon({
                 iconUrl: icon,
                 iconSize:     [20, 20],
                 iconAnchor:   [10, 10]
            }));
    }
    img.src = players[playerId].icon;
}

// Nível
function createLabel(text, color = "#000") {
     var canvas = document.createElement("canvas");
     var context = canvas.getContext( '2d' );

     canvas.width = 100;
     canvas.height = 30;

    context.save();
    context.translate( canvas.width / 2, canvas.height / 2 );
    //context.rotate( -(Math.PI / 2) );
    context.font = "20px 'VT323'";
    context.fillStyle = color; // green
    context.textAlign = "center";
    context.fillText(text, 0, 0);
    context.restore();

    return canvas.toDataURL();
}

// Acelerador
function calcularPosicao() {
    var h = (0.000009956626094265175 * 5) * velocidade;
    var co = Math.sin(angulo*-1) * h;
    var ca = Math.cos(angulo*-1) * h;
    var pos = {
          latlng: {
          lat: posicao.lat + ca,
          lng: posicao.lng + co
    }}
    return pos;
}

// 
function calcularAngulo(co, ca, h) {
    var senA = co/h;
    var a = Math.asin(senA);
    a = co == 0 && ca > 0 ? 1.5707963267948966 * 2 : a;
    a = co > 0 && ca > 0 ? 1.5707963267948966 * 2 - a : a;
    a = co < 0 && ca > 0 ? 1.5707963267948966 * 2 - a : a;
    return a;
}

function rotateImage(img, angle) {
     var canvas = document.createElement("canvas");
     var context = canvas.getContext( '2d' );

     canvas.width = 256;
     canvas.height = 256;
;
     var width = img.width;
     var height = img.height;

     context.save();
     context.translate(width / 2, height / 2);
     context.rotate(-angle);
     context.drawImage(img, -(width / 2), -(height / 2),
         width, height);
     context.restore();

     return canvas.toDataURL();
}

//  colisões
function calcularColisoes() {
    for (var m in trajetos) {
       for (var k in trajetos[m]) {
           /*
           console.log(" --- " + players[playerId].name + " --- ");
           console.log(" --- " + pos.lat + " --- ");
           console.log(" --- " + pos.lng + " --- ");
           console.log(" --- " + players[m].name + " --- ");
           console.log(" --- " + trajetos[m][k].latitude + " --- ");
           console.log(" --- " + trajetos[m][k].longitude + " --- ");
           console.log(" --- " + (
                trajetos[m][k].latitude ==  pos.lat && 
                trajetos[m][k].longitude ==  pos.lng && 
                m != playerId
           ) + " --- ");*/

           if (trajetos[m][k].latitude ==  posicao.lat && 
                trajetos[m][k].longitude ==  posicao.lng && 
                m != playerId) {
                    excluirTrajeto(m);
           }
       }
    }
}

// Download das direções
var routeAPI = "https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62483d56a869468743b6a4abd4af7da6e12a";
var routeLine = false;
var route = [];
var steps = []; 

function calcularRota(start, end) {
    $.getJSON( 
    routeAPI + "&start=" + start + "&end=" +end, 
    function(data) {
        console.log(data);

        if (routeLine) {
            map.removeControl(routeLine);
        }

        route = data.features[0].geometry.coordinates;
        steps = data.features[0].properties.segments[0].steps;
        var routePointList = [];

        for (var k in route) {
            routePointList.push(
            new L.LatLng(route[k][1], route[k][0]));
        }    

        routeLine = 
            new L.Polyline(routePointList, {
              color: players[playerId].color,
              weight: 3,
              opacity: 0.5,
              smoothFactor: 1,
              dashArray: '5',
              dashOffset: '0'
        });
        routeLine.addTo(map);
    });
}

function centralizarNaRota(pos) {
    var wayPoint = 0;
    var a = new L.LatLng(pos.lat, pos.lng);
    var distance = 9999999;
    for (var k in route) {
         var b =  new L.LatLng(route[k][1], route[k][0]);
         if (a.distanceTo(b) < distance) {
              distance = a.distanceTo(b);
              wayPoint = k;
         } }

    console.log(wayPoint);
    for (var k in steps) {
         if ((wayPoint >= steps[k].way_points[0] &&
               wayPoint < steps[k].way_points[1]) ||
              (wayPoint == steps[k].way_points[0] &&
               wayPoint == steps[k].way_points[1])) {
              say(traduzirInstrucao(steps[k].instruction));
              if (speaking)
                  steps[k].instruction = "";
              break;
         }
    }
}

// Tradução 
var traducao = [
    ["Continue straight onto", "Continue reto em" ],
    ["Head west on", "Siga leste em" ],
    ["Head north on", "Siga norte em" ],
    ["Head northwest on", "Siga nordeste em" ],
    ["Head northeast on", "Siga noroeste em" ],
    ["Head east on", "Siga oeste em" ],
    ["Head south on", "Siga sul em" ],
    ["Head southwest on", "Siga sudeste em" ],
    ["Head southeast on", "Siga sudoeste em" ],
    ["Enter the roundabout and take the 1st exit onto",
     "Entre na rotatória e pegue a primeira saída para" ],
    ["Enter the roundabout and take the 2nd exit onto",
     "Entre na rotatória e pegue a segunda saída para" ],
    ["Enter the roundabout and take the 3rd exit onto",
     "Entre na rotatória e pegue a terceira saída para" ],
    ["Turn left onto", "Entre à esquerda em" ],
    ["Turn right onto", "Entre à direita em" ],
    ["Turn sharp left onto", "Entre à esquerda em" ],
    ["Turn sharp right onto", "Entre à direita em" ],
    ["Arrive at", "Chegamos em" ],
    ["on the left", "seu destino fica à esquerda" ],
    ["on the right", "seu destino fica à direita" ]
];
function traduzirInstrucao(texto) {
   for (var k in traducao) {
        if (texto.includes(traducao[k][0]))
            texto = texto.replace(traducao[k][0], 
                 traducao[k][1]);
   }
   return texto;
}