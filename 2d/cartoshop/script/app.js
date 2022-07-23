var scissorsSFX = new Audio("audio/scissors.wav");
var stringBreak = new Audio("audio/string-break.wav");

var sw = window.innerWidth;
var sh = window.innerHeight;
var ar = sh/sw;
var vw = 0;
var vh = 0;
var vr = 0;

var canvas = document.getElementById("matter-js");
canvas.width = sw;
canvas.height = sh;

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
         height: sh,
         wireframes: false
         //showPerformance: true
    }
});

// create two boxes and a ground
var squares = [];


var rearWheel =
Bodies.circle(sw/2-100, sh/2-25,
    25, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var frontWheel =
Bodies.circle(sw/2+100, sh/2-25,
    25, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var planet =
Bodies.rectangle(sw/2, sh/2,
    sw, sh/2, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

function matterJs() {
    // add all of the bodies to the world
    //Composite.add(engine.world,
    //[floor0, floor1, left, right, ceiling]);
    Composite.add(engine.world,
    [rearWheel, frontWheel, planet]);

    var mouse = Matter.Mouse.create(render.canvas);
    var mouseConstraint = 
    Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            render: {visible: true}
        }
    });
    render.mouse = mouse;
    Composite.add(engine.world, mouseConstraint);

    // run the renderer
    Render.run(render);
    
    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}

var cameraKey = false;
$("#key").click(function() {
    if (cameraKey) {
        stopCamera();
        cameraKey = false;
    }
    else {
        startCamera("environment");
        cameraKey = true;
    }
});

var cameraMode = "environment";
function startCamera(mode) {
     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ 
          video: {
          facingMode: { exact: mode } }, 
          audio: false })
          .then((stream) => {
               video.srcObject = stream;
               var display = stream.
               getVideoTracks()[0].getSettings();
               vw = display.width;
               vh = display.height;
               vr = vh/vw;
          });
     }
}
function stopCamera() {
     video.srcObject
    .getTracks()
    .forEach(t => t.stop());
}

$(document).ready(function() {
    matterJs();
    getSquares();
    startCamera("environment");

    setInterval(function() {
        if (motion) {
            engine.gravity.x = (gyro.accX / 9.8);
            engine.gravity.y = (gyro.accY / 9.8) *-1;
        }
        else {
            engine.gravity.x = 0;
            engine.gravity.y = -1;
        }

        var canvas = 
        document.getElementById("camera-canvas");
        var context = canvas.getContext("2d");

        canvas.width = 128;
        canvas.height = 128;
        if (cameraKey) {
            context
            .drawImage(video, 
            ((vh-128)/2)*-1, 
            ((vw-128)/2)*-1, 
            vh, vw);

            /*
            context
            .globalCompositeOperation='destination-in';
            context.beginPath();
            context.arc(128/2,128/2,128/2,0,Math.PI*2);
            context.closePath();
            context.fill();
 
            planet.render.sprite.texture =
            canvas.toDataURL();
            planet.render.sprite.xScale = 0.78;
            planet.render.sprite.yScale = 0.78;
            */
        }
    }, 100);
});