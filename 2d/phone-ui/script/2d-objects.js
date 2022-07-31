var sw = window.innerWidth;
var sh = window.innerHeight;
var ar = sw/sh;
var vw = 0;
var vh = 0;
var vr = 0;

var p2m = 1/100;

// Collision categories
var scenarioCategory = 0x0001,
       objectCategory = 0x0002,
       objectPartCategory = 0x0004;

/*
scenarioCategory
scenarioCategory | objectCategory
scenarioCategory | objectPartCategory
*/

var canvas = document.getElementById("mini-skate");
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

var testWheel =
Bodies.circle(
    0, 0, 50, {
    isStatic: false,
    collisionFilter: {
        category: objectPartCategory,
        mask: scenarioCategory | objectPartCategory
    },
    render: {
        /*
        sprite: {
            texture: car.textures.wheel,
            xScale: 0.5, //0.476,
            yScale: 0.5 //0.476
        },*/
        fillStyle: "#fff",
        lineWidth: 2,
        strokeStyle: "#000" 
    }
});

// Half
var planetPolygon = [
    [-1, -0.1], 
    [-1, +0.1], 
    [-0.5, +0.2], 
    [+0.5, +0.2], 
    [+1, +0.1], 
    [+1, -0.1],
    [+0.5, +0.1], 
    [-0.5, +0.1], 
];
var planetPolygon = [];
for (var k in rawPolygon) {
    signPolygon.push({
        x: rawPolygon[k][0] * sw,
        y: rawPolygon[k][1] * sw
    });
}
var planet = 
polygonFixPosition(
Matter.Bodies.fromVertices(
    0, 0,
    planetPolygon, {
    isStatic: true,
    collisionFilter: {
        category: scenarioCategory
    },
    render: {
        fillStyle: "rgba(255,255,255,0)",
        strokeStyle: "#fff",
        lineWidth: 2,
    }
}), { x: 0, y: 0 });
for (var k in planet.parts) {
    planet.parts[k].render.fillStyle = 
    gradientColor(k, planet.parts.length);
}

var mouse = Matter.Mouse.create(render.canvas);
var mouseConstraint = 
Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {visible: true}
    }
});