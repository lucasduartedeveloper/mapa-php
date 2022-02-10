// Create the map
var map = L.map('map').setView([-23.373144526961156, -51.159208612927344], 19);

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
              var msg = new SpeechSynthesisUtterance();
              msg.text = text;
              msg.onend = function(event) {
                  speaking = false;
              };
              speaking = true;
              window.speechSynthesis.speak(msg);
        }
}
var markerIcon0 = L.icon({
       iconUrl: "../img/marker.png",
       iconSize:     [35, 40], // size of the icon
       iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
       popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var marker0 = L.marker([-23.373144526961156, -51.159208612927344],  {icon: markerIcon0}).addTo(map);

var markerShadow0 = L.circle([-23.373144526961156, -51.159208612927344], {
        color: "#2E2E2E",
        fillOpacity: 0.5,
        radius: 2.25,
        weight: 0,
        stroke: true
}).addTo(map);

// Teste
var markerIcon1= L.icon({
       iconUrl: "../img/marker-b.png",
       iconSize:     [35, 40], // size of the icon
       iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
       popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var marker1 = L.marker([-23.373054594800273, -51.159806010493],  {icon: markerIcon1}).addTo(map);

var markerShadow1 = L.circle([-23.373054594800273, -51.159806010493], {
        color: "#2E2E2E",
        fillOpacity: 0.5,
        radius: 2.25,
        weight: 0,
        stroke: true
}).addTo(map);

// Teste
var markerIcon2 = L.icon({
       iconUrl: "../img/marker-unlocked.png",
       iconSize:     [35, 40], // size of the icon
       iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
       popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var marker2 = L.marker([ -23.373009628719835, -51.159756227362536],  {icon: markerIcon2}).addTo(map);

var markerShadow2 = L.circle([ -23.373009628719835, -51.159756227362536], {
        color: "#2E2E2E",
        fillOpacity: 0.5,
        radius: 2.25,
        weight: 0,
        stroke: true
}).addTo(map);

//Teste
var markerIcon3 = L.icon({
       iconUrl: "../img/marker-z.png",
       iconSize:     [35, 40], // size of the icon
       iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
       popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var marker3 = L.marker([-23.373009628719835, -51.15985579362348],  {icon: markerIcon3}).addTo(map);

var markerShadow3 = L.circle([-23.373009628719835, -51.15985579362348], {
        color: "#2E2E2E",
        fillOpacity: 0.5,
        radius: 2.25,
        weight: 0,
        stroke: true
}).addTo(map);

// Teste
var playerId = localStorage.getItem("playerId") ? 
    parseInt(localStorage.getItem("playerId")) : 0;
var players = [ 
    { marker: marker0, markerShadow: markerShadow0 },
    { marker: marker1, markerShadow: markerShadow1 },
    { marker: marker2, markerShadow: markerShadow2 },
    { marker: marker3, markerShadow: markerShadow3 }
];
trajetos = [];

// Posição no mapa
var posicao = { lat: -23.373144526961156, lng: -51.1591090466664 };
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
function success(position) {
    posicao = posicaoNoGrid({
        lat : position.coords.latitude,
        lng : position.coords.longitude
    });
    mapClick({ latlng: posicao });     
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
function reload() {
   $.getJSON("/extra/ajax/audio.php", function(data) {
          for (var k in audios) {
               map.removeControl(audios[k].marker);
               map.removeControl(audios[k].markerShadow);
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
               iconSize:     [35, 40], // size of the icon
               iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
               popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
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
              .addTo(map);

              audios[k].markerShadow = L.circle(
              [audios[k].latitude, audios[k].longitude], {
              color: "#581845",
              fillOpacity: 0.5,
        	radius: 2.5,
        	weight: 1,
        	stroke: false
	}).addTo(map);

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
      });

     // Atualizar marcadores
     $.getJSON("/extra/ajax/trajeto.php", function(data) {
            //console.log(data);

             trajetos = [
                 data.filter(d => parseInt(d.playerid) == 0), 
                 data.filter(d => parseInt(d.playerid) == 1), 
                 data.filter(d => parseInt(d.playerid) == 2), 
                 data.filter(d => parseInt(d.playerid) == 3)
             ];

             for (var m = 0; m < 4; m++) {
                  if (trajetos[m,0].length > 0) {
                      var latlng = [
                           trajetos[m,0].latitude,
                           trajetos[m,0].longitude
                      ];
                      players[m,0].marker.setLatLng(latlng);
                      players[m,0].markerShadow.setLatLng(latlng);
                  }
             }
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

    var pointList = [];
    map.removeControl(wire);
              
    for (var k = m; k < audios.length; k++) {
          $.get("/extra/ajax/audio.php?deleteId="+audios[k].id, function(data) {
          });

          map.removeControl(audios[k].marker);
          map.removeControl(audios[k].markerShadow);
    }

    console.log(audios);
    audios = audios.slice(0, m);
    console.log(audios);

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
    console.log(pointList);

    audio.pause();
    audio = new Audio("../audio/creature_dying.wav");
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

    var pointList = [];
    map.removeControl(wire);
 
    pointList.push(
                   new L.LatLng(
                   pos.lat,
                   pos.lng));

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

    $.post("/extra/ajax/trajeto.php", {
             playerId: playerId,
             latitude: pos.lat, 
             longitude: pos.lng,
             }).done(function(data) { 
                   //console.log(data);
                   audio.pause();
                   audio = new Audio("../audio/game_notification.wav");
                   audio.play();
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
             reload();
             $.getJSON("https://nominatim.openstreetmap.org/reverse?lat="+posicao.lat+"&lon="+posicao.lng+"&format=json", function(data) {
                   say("Estamos próximos à " + data.display_name);
             });
     });

     $("#player").click(function (e) {
             playerId = playerId < 3 ? playerId += 1 : 0;
             map.setView([-23.373144526961156, -51.159208612927344], 15);
             setTimeout(function() {
                 posicao = players[playerId].marker.getLatLng();
                 mapClick({ latlng: posicao });
                 localStorage.setItem("playerId", playerId);
                 map.setView([
                       posicao.lat,
                       posicao.lng
                 ], 19);
             }, 1000);
     });

     $("#update").click(function (e) {
             location.reload();
     });
});

// COMO JOGAR
// ...

// PROBLEMAS
// Botão gravar [resolvido]
// Botão passar a vez [resolvido]
// Excluir está sem áudio [resolvido]
// Efeito visual do áudio [resolvido]
// Adicionar última linha [resolvido]
// Criar uma função para redesenhar a linha
// Salvar o trajeto de cada marcador