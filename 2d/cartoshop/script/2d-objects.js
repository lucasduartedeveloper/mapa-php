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

var car = {
  name: "Camaro",
  polygon: [
      [-0.5, -0.5], 
      [-1, -0], // min x
      [-1, +0.4], 
      [+1, +0.4], 
      [+1, -0], // max x
      [+0.2, -0.5]
  ],
  textures: { 
     chassis: "img/camaro.png",
     wheel: "img/wheel_18.png"
  },
  width: 250,
  height: 200,
  bottom: 65,
  wheelSize: 50,
  rearWheel: { x: 50, y: 150 },
  frontWheel: { x: 200, y: 150 }
};

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

// Create car
// create two boxes and a ground
var bodyworkPolygon = [];
for (var k in car.polygon) {
    bodyworkPolygon.push({
        x: (sw/2) + car.polygon[k][0] * (car.width/2),
        y: (sh/2) + car.polygon[k][1] * (car.height/2)
    });
}
var center = polygonCenter(bodyworkPolygon);
var bodywork = 
Bodies.fromVertices(
    (sw/2), (sh/2) - car.bottom,
    bodyworkPolygon, {
    isStatic: false,
    mass: 20,
    collisionFilter: {
        category: objectCategory,
        mask: scenarioCategory | objectCategory
    },
    render: {
        fillStyle: "rgba(255,255,255,0)",
        strokeStyle: "#fff",
        lineWidth: 2,
    }
});
polygonFixPosition(bodywork,
{ x: (sw/2), y: (sh/2)-65 });

var painting = 
Bodies.rectangle(
    (sw/2), (sh/2) - car.bottom,
    car.width, car.height, {
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

var testWheel =
Bodies.circle(
    (sw/2), 
    (sh/2) - (car.wheelSize/2), 
    car.wheelSize/2, {
    isStatic: false,
    friction: 1,
    collisionFilter: {
        category: objectPartCategory,
        mask: scenarioCategory | objectPartCategory
    },
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

var rearWheel =
Bodies.circle(
    (sw/2) - car.width + car.rearWheel.x, 
    (sh/2) - car.height + car.rearWheel.y, 
    car.wheelSize/2, {
    isStatic: false,
    friction: 1,
    collisionFilter: {
        category: objectPartCategory,
        mask: scenarioCategory | objectPartCategory
    },
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
Bodies.circle(
    (sw/2) - car.width + car.fronWheel.x, 
    (sh/2) - car.height + car.fronWheel.y - car.bottom, 
    car.wheelSize/2, {
    isStatic: false,
    friction: 1,
    collisionFilter: {
        category: objectPartCategory,
        mask: scenarioCategory | objectPartCategory
    },
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

var rearWheelPivot = 
Matter.Constraint.create({
     bodyA: bodywork,
     pointA: { x: car.rearWheel.x, y: car.rearWheel.y },
     bodyB: rearWheel,
     pointB: { x: 0, y: 0 },
     stiffness: 0.5,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

var frontWheelPivot = 
Matter.Constraint.create({
     bodyA: bodywork,
     pointA: { x: car.frontWheel.x, y: car.frontWheel.y },
     bodyB: frontWheel,
     pointB: { x: 0, y: 0 },
     stiffness: 0.5,
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
    collisionFilter: {
        category: scenarioCategory
    },
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
    collisionFilter: {
        category: scenarioCategory
    },
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
    collisionFilter: {
        category: scenarioCategory
    },
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
    collisionFilter: {
        category: scenarioCategory
    },
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