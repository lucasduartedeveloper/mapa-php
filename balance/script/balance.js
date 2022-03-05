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
var balance = 0.00;
var playerId = new Date().getTime();

$(document).ready(function() {
    getBalance();
    setInterval(function() {
        if (accX > 5) {
             updateBalance(balance + 0.01);
        }
        else if (accX < -5) {
             updateBalance(balance - 0.01);
        }
    }, 1000);
    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "BALANCE" &&
            playerId != msg[1]) {
            getBalance();
        }
    };

    // ----
    $("#deposit").on("click", function() {
         var value = prompt("Valor do depósito R$:", "0,00");
         value = parseFloat(value.replace(",","."));
         value = balance + value;
         updateBalance(value);
    });
    $("#withdrawal").on("click", function() {
         var value = prompt("Valor do saque R$:", "0,00");
         value = parseFloat(value.replace(",","."));
         value = balance - value;
         updateBalance(value);
    });
});

function getBalance(balance) {
     $.getJSON("ajax/balance.php", function(data) {
          var saldo = data[0].valor.split(",");
          saldo[0] = parseInt(saldo[0]);
          saldo[1] = parseInt(saldo[1]);

          var text = "";
          if (data[0].valor.includes("-")) {
              text += "menos ";
          }
          if (saldo[0] > 0) {
               text += saldo[0] + " reais";
          }
          if (saldo[0] > 0 && saldo[1] > 0) {
               text += " e ";
          }
          if (saldo[1] > 0) {
               text += saldo[1] + " centavos";
          }
          say(text);

          console.log(data);
          balance = parseFloat(data[0].valor.replace(",","."));
          $("#balance").text("R$ " + data[0].valor);
     });
}

function updateBalance(value) {
     balance = value;
     var text = value.toFixed(2).replace(".",",");
     $.post("ajax/balance.php", {
          balance: text
          }).done(function(data) {
                console.log(data);
                coin.play();
                $("#balance").text("R$ " + text);
                ws.send("BALANCE|"+playerId+"|"+text);
     });
}

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

function accHandler(acc) {
    accX = acc.x && acc.x.toFixed(3);
    accY = acc.y && acc.y.toFixed(3);
    accZ = acc.z && acc.z.toFixed(3);
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