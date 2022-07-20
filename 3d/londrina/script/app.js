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
Bodies.rectangle((sw/2)-25, (sh/2)-25, 50, 50, {
    render: {
         sprite: {
             texture: "img/placeholder.png",
             xScale: 0.12,
             yScale: 0.12
         },
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var floor0 = 
Bodies.rectangle((sw/2), ((sh/3)*2)+50, sw/2, 10, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var floor1 = 
Bodies.rectangle((sw/4), (sh/3)+50, sw/2, 10, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

function matterJs() {
    // add all of the bodies to the world
    Composite.add(engine.world,
    [square, floor0, floor1]);

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

$(document).ready(function() {
    matterJs();
});