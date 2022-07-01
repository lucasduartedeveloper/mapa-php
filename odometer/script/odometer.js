var coin = new Audio("audio/coin.wav");
var notification = new Audio("audio/game-notification.wav");
var gameOver = new Audio("audio/game-over.wav");

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
var playerId = new Date().getTime();

var counterCw = 0;
var counterCcw = 0;

$(document).ready(function() {
    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "ODOMETER" &&
            playerId != msg[1]) {
        }
    };
});

if ('DeviceMotionEvent' in window) {
    var onDeviceMotion = function (e) {
        accHandler(e.accelerationIncludingGravity);
    }
    window
    .addEventListener('devicemotion',
    onDeviceMotion, false);
}

var accX = 0;
var accY = 0;
var accZ = 0;
var sumOnMotion = true;

var checkPoints = [
    { x1: -1, y1: -100, x2: 1, y2: -7, 
      left: 3, right: 1, done: false }, // 3
    { x1: -100, y1: -1, x2: -7, y2: 1, 
      left: 0, right: 2, done: false }, // 4
    { x1: -1, y1: 7, x2: 1, y2: 100, 
      left: 1, right: 3, done: false }, // 1
    { x1: 7, y1: -1, x2: 100, y2: 1, 
      left: 2, right: 0, done: false } // 2
];

var x = 0;
var y = 0;
var firstCp = -1;
var lastCp = -1;

function accHandler(acc) {
    accX = acc.x && acc.x.toFixed(3);
    accY = acc.y && acc.y.toFixed(3);
    accZ = acc.z && acc.z.toFixed(3);

    var motionStrength = accX + accY + accZ;
    x = ((95 / 9.8) * accX)* -1;
    y = (95 / 9.8) * accY;

    $("#pointer").css("margin-left", x.toString() + "px");
    $("#pointer").css("margin-top", y.toString() + "px");

    for(var k in checkPoints) {
         if ((accX >= checkPoints[k].x1 && 
              accX <= checkPoints[k].x2) &&
              (accY >= checkPoints[k].y1 && 
              accY <= checkPoints[k].y2)) {

              checkPoints[k].done = true;
              $("#cp"+k).addClass("done");
              if (foo2()) {
                   firstCp = k;
              }

              if (foo() && firstCp == k) {
                   if (lastCp == checkPoints[k].left) {
                       counterCw += 1;
                       $("#counter-cw").text(counterCw
                       .toString()
                       .padStart(6,"0"));
                       bar();
                   }

                  if (lastCp == checkPoints[k].right) {
                      counterCcw += 1;
                      $("#counter-ccw").text(counterCcw
                      .toString()
                      .padStart(6,"0"));
                      bar();
                  }
             }
             lastCp = k;
         }
    }
}

function foo() {
    for(var k in checkPoints) {
        if (!checkPoints[k].done) {
             return false;
        }
    }
    return true;
}

function foo2() {
    var foo2 = 0;
    for(var k in checkPoints) {
        if (checkPoints[k].done) {
             foo2 += 1; 
        }
    }
    return foo2 == 1;
}

function bar() {
    for(var k in checkPoints) {
        checkPoints[k].done = false;
        $("#cp"+k).removeClass("done");
        notification.play();
    }
}

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

// Texto para audio
var speaking = false;
function say(text) {
    if (!speaking) {
         speaking = true;
         var msg = new SpeechSynthesisUtterance();
         msg.lang = "pt-BR";
         //msg.lang = "en-US";
         //msg.lang = "ja-JP";
         msg.text = text;
         msg.onend = function(event) {
              speaking = false;
         };
         window.speechSynthesis.speak(msg);
    }
}