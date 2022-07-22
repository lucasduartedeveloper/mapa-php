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

var planets = [
    Bodies.circle(sw/2, sh/2,
    50, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }}),
    Bodies.circle((sw/4)*3, (sh/4),
    25, {
    isStatic: true,
    render: {
         fillStyle: "#ccc",
         strokeStyle: "#000" }})
];

function matterJs() {
    // add all of the bodies to the world
    //Composite.add(engine.world,
    //[floor0, floor1, left, right, ceiling]);
    Composite.add(engine.world, planets);

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

$(document).ready(function() {
    matterJs();

    setInterval(function() {
        if (motion) {
            engine.gravity.x = (gyro.accX / 9.8);
            engine.gravity.y = (gyro.accY / 9.8) *-1;
        }
        else {
            engine.gravity.x = 0;
            engine.gravity.y = -1;
        }
    }, 100);
});

function distanceToPlanet(square) {
    var co = square.position.x - planet.position.x;
    var ca = square.position.y - planet.position.y;
    var h = Math.abs(Math.sqrt(
    Math.pow(co,2)+
    Math.pow(ca,2)));
    return h;
}