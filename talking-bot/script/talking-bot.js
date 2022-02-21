function formatarAudio(buffer) {
       var array8 = new Uint8Array(buffer);
       var array16 = new Uint16Array(buffer, buffer.byteOffset, buffer.byteLength / 2).slice(22);
       var wavHeader = array8.slice(0, 44);

       var tamanhoBloco = 100;
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
            context.lineTo( 2.5+((k+1) * 5), ((100 - array[k])/2) );
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

var recordingInterval = false;

// Botão de gravação
var recording = false;
$(document).ready(function() {
     $("#mic").click(function(e) {
         if (!recording) {
              recording = true;
              $("#mic").addClass("active");
              $("#mic i").removeClass("bi-mic-mute-fill");
              $("#mic i").addClass("bi-mic-fill");
              recordAudio();

              recordingInterval = 
                 setInterval(function() {
                      recorder.stop();
                      gumStream.getAudioTracks()[0]
                      .stop();
                      recorder.exportWAV(function(blob) { 
                           var audio = 
                                 new Audio(URL
                                 .createObjectURL(blob));
                          audio.play();
                          var reader = new FileReader();
                          reader.readAsArrayBuffer(blob); 
                          reader.onloadend = function() {
                                var buffer = reader.result;
                                reader.readAsDataURL(blob);
                                reader.onloadend = function() {
                                      var base64 = reader.result;
                               
                                     //postAudio(nome, buffer, base64);
                                     desenharWave(
                                           formatarAudio(buffer));
                                     recordAudio();
                               };
                         };
                   });
              }, 1000);
         }
        else {
              recording = false;
              $("#mic").removeClass("active");
              $("#mic i").removeClass("bi-mic-fill");
              $("#mic i").addClass("bi-mic-mute-fill");

              clearInterval(recordingInterval);
         }
     });
});

