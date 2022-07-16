function desenharWave(array) {
    var canvas = document.getElementById("wave");
    var context = canvas.getContext( '2d' );

    canvas.width = 1000;
    canvas.height = 100;

    for (var k = 0; k < array.length; k++) {
        context.beginPath(); // always start a new line with beginPath
        context.strokeStyle = "#fff";
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

// Botão de gravação
$(document).ready(function() {
    

    $("#mic").click(function(e) {
        if (!recording) {
            recording = true;
            $("#mic").addClass("active");
            $("#mic i").removeClass("bi-mic-mute-fill");
            $("#mic i").addClass("bi-mic-fill");    
            
            alarm.pause();
            audio.onended = function() {
                recordAudio();
                recordInterval =
                setInterval(function () {
                    saveRecording();
                }, 1000);
            };
            audio.play();
        }
        else {
            recording = false;
            $("#mic").removeClass("active");
            $("#mic i").removeClass("bi-mic-fill");
            $("#mic i").addClass("bi-mic-mute-fill");
            
            clearInterval(recordInterval);
            recorder.stop();
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

var frogY = 270;

function frog(audio) {
    var play = false;
    for (var k in audio) {
        if (audio[k].somaPos > 5 ||
             audio[k].somaNeg < -5) {
             play = true;
        }
    }
    if (play) {
        frogY -= 30;
        if (frogY <= 0) {
             frogY = 30;
             victory.play();
             $("#frog-3").show();
        }
        $("#frog").css("top", frogY.toString()+"px");
        frogJump.play();
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
                recordAudio();
                frog(audio);
            };
        };
    });
}