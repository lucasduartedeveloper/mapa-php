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
var square = 
Bodies.rectangle((sw/2)+50, (sh/2), 50, 50, {
    render: {
         sprite: {
             texture: "img/placeholder.png",
             xScale: 0.12,
             yScale: 0.12
         },
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var floor0 = 
Bodies.rectangle((sw/4)-12.5, (sh/3)*2,
    (sw/2)-25, 10, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var floor1 = 
Bodies.rectangle(((sw/4)*3)+12.5, (sh/3)*2,
    (sw/2)-25, 10, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var left = 
Bodies.rectangle(5, (sh/6),
    10, (sh/3)*2, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var right = 
Bodies.rectangle(sw-5, (sh/6),
    10, (sh/3)*2, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var top = 
Bodies.rectangle(sw/2, 5,
    sw, 10, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

function matterJs() {
    // add all of the bodies to the world
    Composite.add(engine.world,
    [square, floor0, floor1, left, right, top]);

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

var cameraKey = true;
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
    startCamera("environment");

    setInterval(function() {
        engine.gravity.x = (gyro.accX / 9.8) *-1;
        engine.gravity.y = gyro.accY / 9.8;

        var canvas = 
        document.getElementById("camera-canvas");
        var context = canvas.getContext("2d");

        canvas.width = 128;
        canvas.height = 128;
        if (cameraKey) {
            context
            .drawImage(video, 
            ((vw-128)/2)*-1, 
            ((vh-128)/2)*-1, 
            vw, vh);
        }
    }, 100);

   $("#cut").click(function(e) {
         var base64 = 
         document.getElementById("camera-canvas").
         toDataURL();

         Composite.add(engine.world,
         [Bodies.rectangle(74, 74, 50, 50, {
         render: {
         sprite: {
             texture: base64,
             xScale: 0.39,
             yScale: 0.39
         },
         fillStyle: "#fff",
         strokeStyle: "#000" }})])
     });
});