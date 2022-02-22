function formatarAudio(buffer) {
    var array8 = new Uint8Array(buffer);
    var buffer = array8.buffer;
    var array16 = new Int16Array(buffer, buffer.byteOffset, buffer.byteLength / 2).slice(22);
    var wavHeader = array8.slice(0, 44);
    //console.log(wavHeader);

    var tamanhoBloco = Math.floor(array16.length / 100);
    var quantidade = Math.floor(array16.length / tamanhoBloco);
    var novoArray = [];

    for (var i = 0; i <= quantidade; i++) {
        var somaPos = 0;
        var somaNeg = 0;
        for (var j = 0; j < tamanhoBloco; j++) {
            var m = (i * tamanhoBloco) + j;
            if ((m+1) <= array16.length) {
                if (array16[m] > 0) {
                    somaPos += array16[m];
                }
                else {
                    somaNeg += array16[m];
                }
            }
        }
        novoArray
        .push({ 
            somaPos: Math.floor(
            (100 / 32767) * (somaPos / tamanhoBloco)),
            somaNeg: Math.floor(
            (100 / 32768) * (somaNeg / tamanhoBloco)),
        });
    }

    //console.log(array16);
    console.log(novoArray);
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

        // start position
        context.moveTo(2.5+((k * 2) * 5), 
            51 - array[k].somaPos
        ); 
        context.lineTo(2.5+((k *2) * 5), 
            48 - array[k].somaNeg
        );

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
        input = audioContext
            .createMediaStreamSource(stream);
        recorder = new Recorder(input, {
            numChannels: 1
        }) ;
    recorder.record();
    }).catch(e=>console.log(e));
}

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
        }
        else {
            recording = false;
            $("#mic").removeClass("active");
            $("#mic i").removeClass("bi-mic-fill");

            $("#mic i").addClass("bi-mic-mute-fill");
            saveRecording();
        }
    });

    $("#file").click(function() { $("#file-selector").click(); });
    $("#file-selector").on("change", function (e) {
        var reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]); 
        reader.onloadend = function() {
            var buffer = reader.result;
            desenharWave(
                formatarAudio(buffer));
        };
    });
});

function saveRecording() {
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
                //recordAudio();
                window.location.href =
                    base64;
            };
        };
    });
}