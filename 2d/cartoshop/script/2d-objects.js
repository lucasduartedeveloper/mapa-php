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

//Create car
var rawPolygon = [
    [-0.5, -0.5], 
    [-1, -0], 
    [-1, +0.4], 
    [-0.98, +0.4], 
    [-0.98, +0.1], 
    [-0.55, +0.1], 
    [-0.55, +0.4], 
    [+0.38, +0.4],  
    [+0.38, +0.1], 
    [+0.81, +0.1], 
    [+0.81, +0.4], 
    [+1, +0.4], 
    [+1, -0],
    [+0.2, -0.5]
];
// create two boxes and a ground
var bodyworkPolygon = [];
for (var k in rawPolygon) {
    bodyworkPolygon.push({
        x: (sw/2) + rawPolygon[k][0] * 125,
        y: (sh/2) + rawPolygon[k][1] * 100
    });
}
var center = polygonCenter(bodyworkPolygon);
var bodywork = 
Bodies.fromVertices(
    (sw/2), (sh/2)-65, //
    bodyworkPolygon, {
    isStatic: false,
    mass: 20,
    render: {
        fillStyle: "rgba(255,255,255,0)",
        strokeStyle: "#fff",
        lineWidth: 2,
    }
});

var painting = 
Bodies.rectangle(
    (sw/2), (sh/2)-65, //
    250, 100, {
    isSensor: true,
    isStatic: false,
    render: {
        sprite: {
            texture: "img/camaro.png",
            xScale: 0.347,
            yScale: 0.366 
        },
        fillStyle: "#fff",
        lineWidth: 2,
        strokeStyle: "#ccc",
    }
});

var paintingConstraintA = 
Matter.Constraint.create({
    bodyA: painting,
    pointA: { x: -25, y: -25 },
    bodyB: bodywork,
    pointB: { x: 25, y: 25 },
    stiffness: 0,
    render: {
        strokeStyle: '#fff',
        lineWidth: 2,
        type: 'line'
    }
});

var paintingConstraintB = 
Matter.Constraint.create({
    bodyA: painting,
    pointA: { x: 25, y: -25 },
    bodyB: bodywork,
    pointB: { x: -25, y: 25 },
    stiffness: 0,
    render: {
        strokeStyle: '#fff',
        lineWidth: 2,
        type: 'line'
    }
});

var paintingConstraintZ = 
Matter.Constraint.create({
    bodyA: painting,
    pointA: { x: -25, y: 25 },
    bodyB: bodywork,
    pointB: { x: 25, y: 25 },
    stiffness: 0,
    render: {
        strokeStyle: '#fff',
        lineWidth: 2,
        type: 'line'
    }
});

var rearWheel =
Bodies.circle(((sw/2)-(0.55*125))-28, 
    sh/2-25, 25, {
    isStatic: false,
    friction: 1,
    render: {
        sprite: {
            texture: "img/wheel_18.png",
            xScale: 0.069, //0.476,
            yScale: 0.069 //0.476
        },
        fillStyle: "#fff",
        lineWidth: 2,
        strokeStyle: "#000" 
    }
});

var frontWheel =
Bodies.circle(((sw/2)+(0.38*125))+28, 
    sh/2-25, 25, {
    isStatic: false,
    friction: 1,
    render: {
        sprite: {
            texture: "img/wheel_18.png",
            xScale: 0.069, //0.476,
            yScale: 0.069 //0.476
        },
        fillStyle: "#fff",
        strokeStyle: "#000" 
    }
});

var crankshaft = 
Matter.Constraint.create({
     bodyA: rearWheel,
     pointA: { x: 0, y: 0 },
     bodyB: frontWheel,
     pointB: { x: 0, y: 0 },
     stiffness: 1,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

var rearWheelShockAbsorberA = 
Matter.Constraint.create({
     bodyA: bodywork,
     pointA: { x: -(0.55*125)-30, y: 0 },
     bodyB: rearWheel,
     pointB: { x: 0, y: 0 },
     stiffness: 0.5,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

var rearWheelShockAbsorberB = 
Matter.Constraint.create({
     bodyA: bodywork,
     pointA: { x: -(0.55*125)-15, y: 0 },
     bodyB: rearWheel,
     pointB: { x: 0, y: 0 },
     stiffness: 0.5,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

var frontWheelShockAbsorberA = 
Matter.Constraint.create({
     bodyA: bodywork,
     pointA: { x: (0.38*125)+15, y: 0 },
     bodyB: frontWheel,
     pointB: { x: 0, y: 0 },
     stiffness: 0.5,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

var frontWheelShockAbsorberB = 
Matter.Constraint.create({
     bodyA: bodywork,
     pointA: { x: (0.38*125)+30, y: 0 },
     bodyB: frontWheel,
     pointB: { x: 0, y: 0 },
     stiffness: 0.5,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

var planet = 
Bodies.rectangle(sw/2, (sh/2)+274,
1400, 548, {
    isStatic: true,
    render: {
       sprite: {
            texture: "img/map2.jpg",
            xScale: 2,
            yScale: 2
        },
       fillStyle: "#fff",
       strokeStyle: "#000" 
    }
});

var line = 
Bodies.rectangle(sw/2+1200, (sh/2)+25,
1000, 50, {
    isStatic: true,
    render: {
       fillStyle: "#fff",
       strokeStyle: "#000" 
    }
});

// Sign
var rawPolygon = [
    [-1, -0.9], 
    [-1, +0.1], 
    [-0.1, +0.1], 
    [-0.1, +1], 
    [+0.1, +1], 
    [+0.1, +0.1], 
    [+1, +0.1], 
    [+1, -0.9],  
    [+0.1, -0.9], 
    [+0.1, -1], 
    [-0.1, -1], 
    [-0.1, -0.9]
];
var signPolygon = [];
for (var k in rawPolygon) {
    signPolygon.push({
        x: (sw/2) + rawPolygon[k][0] * 50,
        y: (sh/2) + rawPolygon[k][1] * 100
    });
}
var sign = 
Matter.Bodies.fromVertices(
    (-350+50), (sh/2)-100,
    signPolygon, {
    isStatic: true,
    render: {
        fillStyle: "rgba(255,255,255,0)",
        strokeStyle: "#fff",
        lineWidth: 2,
    }
});
for (var k in sign.parts) {
    sign.parts[k].render.fillStyle = 
    gradientColor(k, sign.parts.length);
}

// Géssica
var signConstraint = 
Matter.Constraint.create({
     bodyA: sign,
     pointA: { x: 0, y: 90 },
     bodyB: planet,
     pointB: { x: (-350+50), y: -264 },
     stiffness: 0.3,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

// Loop
var rawPolygon = [
    [-0, +0.9], 
    [-0, +1]
];
var loopPolygon = [];
var oddVertices = [];
for (var a = 0; a < 270; a+=5) {
    for (var k in rawPolygon) {
        if (k % 2 == 0) {
            loopPolygon.push(
                rotate(0, 0,
                rawPolygon[k][0]*500, 
                rawPolygon[k][1]*500, a)
            );
        }
        else {
            oddVertices.push(
                rotate(0, 0,
                rawPolygon[k][0]*500,
                rawPolygon[k][1]*500, a)
            );
        }
    }
}
loopPolygon =
loopPolygon.concat(oddVertices.reverse());
var loop = 
Matter.Bodies.fromVertices(
    2450, (sh/2)-450,
    loopPolygon, {
    isStatic: true,
    render: {
        fillStyle: "rgba(255,255,255,0)",
        strokeStyle: "#fff",
        lineWidth: 2,
    }
});
for (var k in loop.parts) {
   loop.parts[k].render.fillStyle = 
   randomColor();
}

var mouse = Matter.Mouse.create(render.canvas);
var mouseConstraint = 
Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {visible: true}
    }
});

// Grid
var grid = [];
for (var n = -150; n < 150; n++) {
    return;
    grid.push(
       Bodies.rectangle(
       (sw/2), 
       (sh/2)+(n*10),
       3000, 1, {
       isSensor: true,
       isStatic: true,
       render: {
           fillStyle: "#ccc",
           strokeStyle: "#000" 
       }
    }));

    grid.push(
       Bodies.rectangle(
       (sw/2)+(n*10), 
       (sh/2),
       1, 3000, {
       isSensor: true,
       isStatic: true,
       render: {
           fillStyle: "#ccc",
           strokeStyle: "#000" 
       }
    }));
}

function matterJs() {
    // add all of the bodies to the world
    //Composite.add(engine.world, grid);

    Composite.add(engine.world, [
        painting, 
        paintingConstraintA,
        paintingConstraintB, 
        paintingConstraintZ, 
        bodywork,
        crankshaft, 
        rearWheel,
        rearWheelShockAbsorberA,
        rearWheelShockAbsorberB,
        frontWheel,
        frontWheelShockAbsorberA,
        frontWheelShockAbsorberB,
        sign,
        signConstraint,
        planet,
        line, loop
    ]);

    render.mouse = mouse;
    Composite.add(engine.world, mouseConstraint);

    // run the renderer
    Render.run(render);
    
    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}