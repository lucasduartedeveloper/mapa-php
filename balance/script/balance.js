var coin = new Audio("audio/coin.wav");

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
        context.strokeStyle = "#000";
        context.lineWidth = 5;

        // start position
        context.moveTo(2.5+((k * 2) * 5), 
            50 - ((array[k].somaPos*2) + 1)
        ); 
        context.lineTo(2.5+((k *2) * 5), 
            50 - ((array[k].somaNeg*2) - 2)
        );

        context.stroke(); // actually draw the line
    }

    $("#wave").removeClass("animated left-in");
    $("#wave").addClass("animated left-in");
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
        recorder =  new Recorder(input, {
            numChannels: 1
        });
    recorder.record();
    }).catch(e=>console.log(e));
}

var recording = false;
var recordInterval = false;

// Saldo
var balance = "0,00";
$(document).ready(function() {
    $("#deposit").click(function() {
         var value = prompt("Valor do depósito R$:", "0,00");
         value = parseFloat(value);
         balance = parseFloat(balance) + value;
         $("#balance").text("R$ " + 
         balance
         .toFixed(2)
         .replace(".",","));
         updateBalance(balance);
    });
    $("#withdrawal").click(function() {
         var value = prompt("Valor do saque R$:", "0,00");
         value = parseFloat(value);
         balance = value;
         $("#balance").text("R$ " + 
         balance
         .toFixed(2)
         .replace(".",","));
         updateBalance(balance);
    });
});

function updateBalance(balance) {
    
}

if ('DeviceMotionEvent' in window) {
    var onDeviceMotion = function (e) {
        //$("#acc").html("");
        accHandler(e.accelerationIncludingGravity);
    }
    window
    .addEventListener('devicemotion',
    onDeviceMotion, false);
}

function accHandler(acc) {
    var info, xyz = "[X, Y, Z]<br>";
    info = xyz.replace("X", acc.x && acc.x.toFixed(3));
    info = info.replace("Y", acc.y && acc.y.toFixed(3));
    info = info.replace("Z", acc.z && acc.z.toFixed(3));
    //$("#acc").html(info + $("#acc").html());

    accX = acc.x && acc.x.toFixed(3);
    accY = acc.y && acc.y.toFixed(3);
    accZ = acc.z && acc.z.toFixed(3);

    if (accZ < -1) {
        coin.play();
    }
}

var question = 1;
var questions = [
   { question: "", 
     option_a: "",
     option_c: "",
     option_d: "",
     option_d: ""}
];
});

function saveRecording() {
    recorder.stop();
    gumStream.getAudioTracks()[0]
    .stop();
    recorder.exportWAV(function(blob) { 
    var audio = 
        new Audio(URL
        .createObjectURL(blob));
        //audio.play();
        var reader = new FileReader();
        reader.readAsArrayBuffer(blob); 
        reader.onloadend = function() {
            var buffer = reader.result;
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                var base64 = reader.result;
                var audio = formatarAudio(buffer)

                desenharWave(audio);
                alarme(audio);
                recordAudio();
            };
        };
    });
}

var accX = 0;
var accY = 0;
var accZ = 0;

function alarme(audio) {
    var play = false;
    for (var k in audio) {
        if (audio[k].somaPos > 5 ||
             audio[k].somaNeg < -5) {
             play = true;
        }
    }
    play = 
        ((Math.abs(accX) + 
         Math.abs(accY) + 
         Math.abs(accZ)) > 12) ||
        play;
    if (play) {
        //$("#mic").click();
        //alarm.play();
    }
}

// Texto para audio
var speaking = false;
function say(text) {
    if (!speaking) {
         speaking = true;
         var msg = new SpeechSynthesisUtterance();
         //msg.lang = "pt-BR";
         msg.lang = "en-US";
         //msg.lang = "ja-JP";
         msg.text = text;
         msg.onend = function(event) {
              speaking = false;
         };
         window.speechSynthesis.speak(msg);
    }
}