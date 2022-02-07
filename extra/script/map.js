// Create the map
var map = L.map('map').setView([0, 0], 13);

var tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVjYXNkdWFydGUxOTkyIiwiYSI6ImNreGZieWE3ODFwNTQyb3N0cW4zNHMxMG8ifQ.HXS54wWrm6wPz-29LVVRbg'
}).addTo(map);

// Enviar o áudio para o banco de dados
var audioAnterior = "xxx";
function postAudio(nome, buffer) {
      console.log("nome: " + nome);
      console.log("audio: " + formatarAudio(buffer));
      console.log("similaridade: 0%");
      audioAnterior = formatarAudio(buffer);
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

var array8 = [];
var array16 = [];
function formatarAudio(buffer) {
       array8 = new Uint8Array(buffer);
       array16 = new Uint16Array(buffer, buffer.byteOffset, buffer.byteLength / 2).slice(22);
       var wavHeader = array8.slice(0, 44);

       //console.log(buffer);
       //console.log(array);
       //console.log(array8);

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

            novoArray.push(Math.floor(bloco / tamanhoBloco));
       }

       desenharWave(novoArray);
       return novoArray;
}

function desenharWave(array) {
     var canvas = document.getElementById("wave");
     var context = canvas.getContext( '2d' );

     canvas.width = 100;
     canvas.height = 50;

     for (var k = 0; k < array.length; k++) {
            context.beginPath(); // always start a new line with beginPath
            context.strokeStyle = "#FFFFFF";
            context.lineWidth = 10;
            context.moveTo( 5+(k * 10), 50 ); // start position
            context.lineTo( 5+(k * 10), 49 - array[k] );
            context.stroke(); // actually draw the line
     }
     /*
     context.beginPath(); // always start a new line with beginPath
     context.strokeStyle = "#000000";
     context.lineWidth = 2;
     context.moveTo( 1, 1 ); // start position
     context.lineTo( 39, 1 );
     context.lineTo( 39, 10 );
     context.lineTo( 1, 10 );
     context.lineTo( 1, 1 );
     context.stroke(); // actually draw the line */

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

var recording = false;
$("#mic").on("click", function(e) {
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
                    /* Download teste
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
        
                    url = window.URL.createObjectURL(blob);
                    a.href = url;
                    a.download = "teste.wav";
                    a.click();
                    window.URL.revokeObjectURL(url);*/

                    var nome = prompt("Nome:","");
                    var buffer = reader.result;
                    postAudio(nome, buffer);
               };
          });
     }
});
