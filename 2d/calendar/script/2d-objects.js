var sw = window.innerWidth;
var sh = window.innerHeight;
var ar = sw/sh;
var vw = 0;
var vh = 0;
var vr = 0;

var canvas = document.getElementById("matter-js");
canvas.width = sw;
canvas.height = sh;

// module aliases
var 
    Common = Matter.Common,
    Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    
Common.setDecomp(decomp);

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

var p2m = 1/100;

// Collision categories
var secondCategory = 0x0001,
       minuteCategory = 0x0002,
       hourCategory = 0x0004,
       dayCategory = 0x0008,
       weekCategory = 0x0016;

/*
scenarioCategory
scenarioCategory | objectCategory
scenarioCategory | objectPartCategory
*/

var secondCircle =
Bodies.circle(
    0, 0, sw/4, {
    isStatic: false,
    collisionFilter: {
        category: secondCategory
    },
    render: {
        sprite: {
            texture: "",
            xScale: 0.5, //0.476,
            yScale: 0.5 //0.476
        },
        fillStyle: "#fff",
        lineWidth: 2,
        strokeStyle: "#000" 
    }
});

var minuteCircle =
Bodies.circle(
    0, 0, sw/3, {
    isStatic: false,
    collisionFilter: {
        category: minuteCategory
    },
    render: {
        sprite: {
            texture: "",
            xScale: 0.5, //0.476,
            yScale: 0.5 //0.476
        },
        fillStyle: "#fff",
        lineWidth: 2,
        strokeStyle: "#000" 
    }
});

var secondPivot = 
Matter.Constraint.create({
     pointA: {
         x: 0, 
         y: 0
     },
     bodyB: secondCircle,
     pointB: { x: 0, y: 0 },
     stiffness: 0.5,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});


var mouse = Matter.Mouse.create(render.canvas);
var mouseConstraint = 
Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {visible: true}
    }
});