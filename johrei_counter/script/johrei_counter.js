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
var counter = 0;

var id = 0;
var johrei = [
    "29/03/2022, Ter",
    "30/03/2022, Qua",
    "31/03/2022, Qui",
    "02/04/2022, Sáb",
    "04/04/2022, Seg",
    "09/04/2022, Sáb",
    "11/04/2022, Seg",
    "12/04/2022, Ter",
    "18/04/2022, Seg"
];

var id_nome = 0;
/*var nomes = [
    "Evelyn",
    "Carol",
    "Cida",
    "Jubeci",
    "Afonso",
    "Luciano",
    "Stefany",
    "Judith",
    "AfonsoLuciano SSJ3",
    "Escada",
    "Léo",
    "Cantora dos papel",
    "EXIT"
];*/
var nomes = [
    "JOHREI",
    "JOHREI+",
    "FATALITY"
];

$(document).ready(function() {
    get_datas();
    get_nomes();
    $("#plus").click(function() {
        counter += 1;
        $("#counter").text(counter);
        add_johrei();
    });
    $("#minus").click(function() {
        counter -= 1;
        $("#counter").text(counter);
        delete_johrei();
    });
    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "JOHREI" &&
            playerId != msg[1]) {
            get_johrei();
        }
    };
   $("#timer").click(function() {
        start_timer();
   });
});

var timer = 20;
var interval = null;

function start_timer() {
    timer = 20;
    interval = setInterval(function() {
        timer -= 1;
        $("#timer").text(timer);
        if (timer == 0) {
            $("#timer").text("PRONTO");
            notification.play();
            clearInterval(interval);
        }
    }, 3141.59265359);    
}

function get_johrei() {
    $.getJSON("ajax/johrei.php?data="+johrei[id].substring(0, 10)+"&id_nome="+id_nome, function(data) { 
        //johrei = data;
        console.log(data);
        counter = data[0] ? data[0].count : 0;
        $("#counter").text(counter);
    });
}

function get_datas() {
     var html ="";
     for (var k in johrei) {
             html += "<a class=\"dropdown-item\" href=\"#\" onclick='set_data("+k+")'>"+johrei[k]+"</a>";
     }
     $("#johrei-menu").html(html);
     set_data(id);
}

function get_nomes() {
    var html ="";
    for (var k in nomes) {
             html += "<a class=\"dropdown-item\" href=\"#\" onclick='set_nome("+k+")'>"+nomes[k]+"</a>";
    }
    $("#nome-menu").html(html);
    set_nome(id_nome);
}

function set_data(novo_id) {
    console.log(johrei[novo_id]);
    id = novo_id;
    $("#johrei-data").text(johrei[id]);
    get_johrei();
}

function set_nome(novo_id) {
    console.log(nomes[novo_id]);
    id_nome = novo_id;
    $("#nome").text(nomes[novo_id]);
    get_johrei();
}

function add_johrei() {
    console.log("ADD " + johrei[id] + " " + nomes[id_nome]);
    $.post("ajax/johrei.php", {
          data: johrei[id].substring(0, 10),
          id_nome: id_nome
          }).done(function(data) {
               console.log(data);
               ws.send("JOHREI|"+playerId+"|UPDATE");
    });
}

function delete_johrei() {
    console.log("DEL " + johrei[id] + " " +nomes[id_nome]);
    $.getJSON("ajax/johrei.php?data="+johrei[id].substring(10)+"&id_nome="+id_nome+"&delete=true", {
          data: johrei[id].substring(0, 10),
          id_nome: id_nome
          }).done(function(data) {
               console.log(data);
               ws.send("JOHREI|"+playerId+"|UPDATE");
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