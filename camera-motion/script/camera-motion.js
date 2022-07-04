var coin = new Audio("audio/coin.wav");
var notification = new Audio("audio/game-notification.wav");
var gameOver = new Audio("audio/game-over.wav");

// Saldo
var playerId = new Date().getTime();

var counterCw = 0;
var counterCcw = 0;

$(document).ready(function() {
     matterJs();
     var video = document.getElementById("video");
     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ video: { facingMode: { exact: "environment" } }, audio: false })
          .then((stream) => {
               video.srcObject = stream;
          });
     }

     setInterval(function() {
         var canvas = 
         document.getElementById("camera-canvas");
         var lightCanvas = 
         document.getElementById("light-canvas");

         var context = canvas.getContext("2d");
         var lightContext = lightCanvas.getContext("2d");

         // ENVIAR
         var cnv = document.createElement("canvas");
         cnv.width = 100;
         cnv.height = 100;
         var ctx = cnv.getContext("2d");

         ctx.drawImage(video, 0, 0, 100, 100);
         var light = {
              x: 0, y: 0
         };

         var imgData = ctx.getImageData(0, 0, 100, 100);
         var lightImgData = ctx.getImageData(0, 0, 100, 100);
         var data = imgData.data;
         var lightData = lightImgData.data;

         var maxBrightness = 0;

         for (var i = 0; i < data.length; i += 4) {
              var brightness = 0.34 * data[i] + 
              0.5 * data[i + 1] + 0.16 * data[i + 2];
              // red
              data[i] = brightness;
              lightData[i] = 
              brightness > 200 ? brightness : 0;
              // green
              data[i + 1] = brightness;
              lightData[i + 1] = 
              brightness > 200 ? brightness : 0;
              // blue
              data[i + 2] = brightness;
              lightData[i + 2] = 
              brightness > 200 ? brightness : 0;
              
              if (brightness > maxBrightness) {
                  maxBrightness = brightness;
                  light.x = Math.floor(i/4) % 100;
                  light.y = Math.floor(i/4) / 100;
              }
         }
         $("#xy").text("x: " + light.x + ", y: " + light.y);

         var forceX = (sw / 100) * light.x;
         var forceY = ((sh/3) / 100) * light.y;

         forceX = ((head.position.x - forceX) / sw) * 0.025;
         forceY = ((head.position.y - forceY) / (sh/3)) * 0.0025;

         console.log(forceX);
         console.log(forceY);

	  Matter.Body.
            applyForce(head, {
            x: head.position.x, 
            y: head.position.y }, {
            x: forceX, 
            y: forceY
         });

         // overwrite original image
         context.putImageData(imgData, 0, 0);
         lightContext.putImageData(lightImgData, 0, 0);
     }, 500);

     ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "C-MOTION" &&
            playerId != msg[1]) {
        }
    };
});

var sh = window.innerHeight;
var sw = window.innerWidth;
var canvas = document.getElementById("matter-js");
canvas.width = sw;
canvas.height = sh/3;

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
         height: sh/3,
         wireframes: false
         //showPerformance: true
    }
});

// create two boxes and a ground
var head = 
Bodies.circle((sw/2), (sh/5)-95, 10, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
var shoulders = 
Bodies.rectangle(sw/2, (sh/5)-82.5, 15, 5, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
var torso = 
Bodies.rectangle(sw/2, (sh/5)-60, 5, 40, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
var armLA = 
Bodies.rectangle(sw/2-5, (sh/5)-70, 5, 20, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
var armLB = 
Bodies.rectangle(sw/2-5, (sh/5)-50, 5, 20, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
var armRA = 
Bodies.rectangle(sw/2+5, (sh/5)-70, 5, 20, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
var armRB = 
Bodies.rectangle(sw/2+5, (sh/5)-50, 5, 20, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
var hips = 
Bodies.rectangle(sw/2, (sh/5)-37.5, 15, 5, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
var legLA = 
Bodies.rectangle(sw/2-5, (sh/5)-25, 5, 20, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
var legLB = 
Bodies.rectangle(sw/2-5, (sh/5)-15, 5, 20, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
var legRA = 
Bodies.rectangle(sw/2+5, (sh/5)-25, 5, 20, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
var legRB = 
Bodies.rectangle(sw/2+5, (sh/5)-15, 5, 20, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});
    
var ceiling = Bodies.rectangle(sw/2, 5, sw, 10,
{ isStatic: true,
    render: {
         fillStyle: '#2f2e40',
         strokeStyle: '#2f2e40' }});

var wallA = Bodies.rectangle(5, sh/3, 10, sh,
{ isStatic: true,
    render: {
         fillStyle: '#2f2e40',
         strokeStyle: '#2f2e40' }});
    
var wallB = Bodies.rectangle(sw-5, sh/3, 10, sh, 
{ isStatic: true,
    render: {
         fillStyle: '#2f2e40',
         strokeStyle: '#2f2e40' }});

var stage = Bodies.rectangle(sw/2, (sh/3)-10, sw/2, 20,
{ isStatic: true,
    render: {
         fillStyle: '#2f2e40',
         strokeStyle: '#2f2e40' }});

var ground = Bodies.rectangle(sw/2, (sh/3)-5, sw, 10,
{ isStatic: true,
    render: {
         fillStyle: '#2f2e40',
         strokeStyle: '#2f2e40' }});

function matterJs() {
    // add all of the bodies to the world
    Composite.add(engine.world, 
    [head, torso, armLA, armLB, armRA, armRB,
    hips, legLA, legLB, legRA, legRB]);

    Composite.add(engine.world, 
    [ceiling, wallA, wallB, stage, ground]);

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
    /*Matter.Constraint.create({
        pointA: { x: (sw/2), y: 0 },
        bodyB: head,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),*/
    Matter.Constraint.create({
        bodyA: head,
        pointA: { x: 0, y: 7.5 },
        bodyB: shoulders,
        pointB: { x: 0, y: 0 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),
    Matter.Constraint.create({
        bodyA: shoulders,
        pointA: { x: 0, y: 0 },
        bodyB: torso,
        pointB: { x: 0, y: -17.5 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),
    Matter.Constraint.create({
        bodyA: shoulders,
        pointA: { x: -5, y: 0 },
        bodyB: armLA,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),
    Matter.Constraint.create({
        bodyA: armLA,
        pointA: { x: 0, y: 7.5 },
        bodyB: armLB,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),
    Matter.Constraint.create({
        bodyA: shoulders,
        pointA: { x: 5, y: 0 },
        bodyB: armRA,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),
    Matter.Constraint.create({
        bodyA: armRA,
        pointA: { x: 0, y: 7.5 },
        bodyB: armRB,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),
    Matter.Constraint.create({
        bodyA: torso,
        pointA: { x: 0, y: 17.5 },
        bodyB: hips,
        pointB: { x: 0, y: 0 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),
    Matter.Constraint.create({
        bodyA: hips,
        pointA: { x: -5, y: 0 },
        bodyB: legLA,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),
    Matter.Constraint.create({
        bodyA: legLA,
        pointA: { x: 0, y: 7.5 },
        bodyB: legLB,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),
    Matter.Constraint.create({
        bodyA: hips,
        pointA: { x: 5, y: 0 },
        bodyB: legRA,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),
    Matter.Constraint.create({
        bodyA: legRA,
        pointA: { x: 0, y: 7.5 },
        bodyB: legRB,
        pointB: { x: 0, y: -7.5 },
        stiffness: 0.5,
        render: {
            strokeStyle: '#fff',
            lineWidth: 1,
            type: 'line'
        }
    }),
    mouseConstraint];
    Composite.add(engine.world, constraints);

    // run the renderer
    Render.run(render);
    
    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
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