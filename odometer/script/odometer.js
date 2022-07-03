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
    matterJs();
    getOdometer();
    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "ODOMETER" &&
            playerId != msg[1]) {
            var value = parseInt(msg[2]);
            if (msg[3] == "CW") {
                counterCw = value;
                      $("#counter-cw").text(counterCw
                      .toString()
                      .padStart(6,"0"));
            }
            else {
                counterCcw = value;
                      $("#counter-ccw").text(counterCcw
                      .toString()
                      .padStart(6,"0"));
            }
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
    { x1: -1, y1: -100, x2: 1, y2: -3, 
      left: 3, right: 1, done: false }, // 3
    { x1: -100, y1: -1, x2: -3, y2: 1, 
      left: 0, right: 2, done: false }, // 4
    { x1: -1, y1: 3, x2: 1, y2: 100, 
      left: 1, right: 3, done: false }, // 1
    { x1: 3, y1: -1, x2: 100, y2: 1, 
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

    /*
    $("#circle").css("margin-left", x.toString() + "px");
    $("#circle").css("margin-left", y.toString() + "px");
    */

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
                   if (lastCp == checkPoints[k].right) {
                       counterCw += 1;

                       // Animation
                       var html = "<span>x</span>";

                       $("#counter-cw").text(counterCw
                       .toString()
                       .padStart(6,"0"));

                       bar();
                       ws.send("ODOMETER|"+
                       playerId+"|"+counterCw+"|CW");
                   }

                  if (lastCp == checkPoints[k].left) {
                      counterCcw += 1;
                      $("#counter-ccw").text(counterCcw
                      .toString()
                      .padStart(6,"0"));
                      bar();
                      ws.send("ODOMETER|"+
                      playerId+"|"+counterCcw+"|CCW");
                  }
                  updateOdometer();
             }
             lastCp = k;
             //wow();
         }
    }
}

function matterJs() {
    var sh = window.innerHeight;
    var sw = window.innerWidth;
    var canvas = document.getElementById("matter-js");
    canvas.width = sw;
    canvas.height = sh/5;

    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;
    
    // create an engine
    var engine = Engine.create();
    
    // create a renderer
    var render = Render.create({
        engine: engine,
        canvas: canvas,
        options: {
             width: sw,
             height: sh/5,
             wireframes: false
             //showPerformance: true
        }
    });
    
    // create two boxes and a ground
    var head = Bodies.circle((sw/2), (sh/5)-92.5, 10, 10);
    var torso = Bodies.rectangle(sw/2, (sh/5)-62.5, 5, 40);
    var armLA = Bodies.rectangle(sw/2-5, (sh/5)-62.5, 5, 20);
    var armLB = Bodies.rectangle(sw/2-5, (sh/5)-52.5, 5, 20);
    var armRA = Bodies.rectangle(sw/2+5, (sh/5)-62.5, 5, 20);
    var armRB = Bodies.rectangle(sw/2+5, (sh/5)-52.5, 5, 20);
    var hips = Bodies.rectangle(sw/2, (sh/5)-42.5, 15, 5);
    var legLA = Bodies.rectangle(sw/2-5, (sh/5)-20, 5, 20);
    var legLB = Bodies.rectangle(sw/2-5, (sh/5)-10, 5, 20);
    var legRA = Bodies.rectangle(sw/2+5, (sh/5)-20, 5, 20);
    var legRB = Bodies.rectangle(sw/2+5, (sh/5)-10, 5, 20);
    
    var ground = Bodies.rectangle(sw/2, (sh/5)-20, sw/3, 40, { isStatic: true });
    
    // add all of the bodies to the world
    Composite.add(engine.world, 
    [head, torso, armLA, armLB, armRA, armRB,
     hips, legLA, legLB, legRA, legRB, ground]);

    let mouse = Matter.Mouse.create(render.canvas);
    let mouseConstraint = 
    Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            render: {visible: true}
        }
    });
    render.mouse = mouse;

    // add soft global constraint
    var constraints = [
    Matter.Constraint.create({
        bodyA: head,
        pointA: { x: 0, y: 0 },
        bodyB: torso,
        pointB: { x: 0, y: -17.5 },
        stiffness: 0.1
    }),
    Matter.Constraint.create({
        bodyA: torso,
        pointA: { x: 0, y: -17.5 },
        bodyB: armLA,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.1
    }),
    Matter.Constraint.create({
        bodyA: armLA,
        pointA: { x: 0, y: 7.5 },
        bodyB: armLB,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.1
    }),
    Matter.Constraint.create({
        bodyA: torso,
        pointA: { x: 0, y: -17.5 },
        bodyB: armRA,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.1
    }),
    Matter.Constraint.create({
        bodyA: armRA,
        pointA: { x: 0, y: 7.5 },
        bodyB: armRB,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.1
    }),
    Matter.Constraint.create({
        bodyA: torso,
        pointA: { x: 0, y: 17.5 },
        bodyB: hips,
        pointB: { x: 0, y: 0 },
        stiffness: 0.1
    }),
    Matter.Constraint.create({
        bodyA: hips,
        pointA: { x: 0, y: -5 },
        bodyB: legLA,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.1
    }),
    Matter.Constraint.create({
        bodyA: hips,
        pointA: { x: 0, y: 5 },
        bodyB: legRA,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.1
    }),
    mouseConstraint];

    Composite.add(engine.world, constraints);

    // add stiff multi-body constraint
    var bodyA = Bodies.polygon(100, 400, 6, 20);
    
    // run the renderer
    Render.run(render);
    
    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}

function getOdometer() {
     $.getJSON("ajax/odometer.php", function(data) {
          counterCw = parseInt(data[0].valor);
          counterCcw = parseInt(data[1].valor);
          
          $("#counter-cw").text(counterCw
          .toString()
          .padStart(6,"0"));
          $("#counter-ccw").text(counterCcw
          .toString()
          .padStart(6,"0"));
     });
}

function updateOdometer() {
     $.post("ajax/odometer.php", {
          cw: counterCw,
          ccw: counterCcw,
          }).done(function(data) {
              console.log(data);
     });
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

var url_prefix = "https://m.chaturbate.com/";
var urls = [
   { seq: [ -5, 1 ] , chn: "artoftease" },
   { seq: [ -4, 2, -1 ], chn: "_mito_69" },
   { seq: [ -3, 1 ], chn: "seon_mi" }
];

function wow() {
    for (var k in urls) {
         var zero = 0;
         for (var j in urls[k].seq) {
               if (urls[k].seq[j] == counterCw ||
                    urls[k].seq[j] == (counterCcw *-1)) {
                     urls[k].seq[j] = 0;
               }
               zero += Math.abs(urls[k].seq[j]);
         }
         if (zero == 0) {
              window.location.href = url_prefix + urls[k].chn;
              return false;
         }
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