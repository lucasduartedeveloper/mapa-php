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

var secondWheel =
Bodies.circle(
    0, - (car.wheels.size/2), 
    car.wheels.size/2, {
    isStatic: false,
    collisionFilter: {
        category: objectPartCategory,
        mask: scenarioCategory | objectPartCategory
    },
    render: {
        sprite: {
            texture: car.textures.wheel,
            xScale: 0.5, //0.476,
            yScale: 0.5 //0.476
        },
        fillStyle: "#fff",
        lineWidth: 2,
        strokeStyle: "#000" 
    }
});

var rearWheelPivot = 
Matter.Constraint.create({
     bodyA: bodywork,
     pointA: {
         x: -car.centre.x + car.wheels.rear.x, 
         y: -car.centre.y + car.wheels.rear.y
     },
     bodyB: rearWheel,
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