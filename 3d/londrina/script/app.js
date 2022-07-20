var sh = window.innerHeight;
var sw = window.innerWidth;
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
Bodies.rectangle(sw/2, (sh/5)-82.5, 15, 5, {
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

function matterJs() {
    // add all of the bodies to the world
    Composite.add(engine.world,
    [square]);

    var mouse = Matter.Mouse.create(render.canvas);
    var mouseConstraint = 
    Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            render: {visible: true}
        }
    });
    render.mouse = mouse;

    // run the renderer
    Render.run(render);
    
    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}

$(document).ready(function() {
    matterJs();
});