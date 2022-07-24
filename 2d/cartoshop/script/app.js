var music = new Audio("audio/sou-vitorioso.mp3");

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

var arrayOfColorFunctions = 
"0123456789abcdef".split('');
function randomColor() {
    var randomColorString = "#";
    for (var x = 0; x < 6; x++) {
        var index = Math.floor(Math.random() * 16);
        var value = arrayOfColorFunctions[index];
        randomColorString += value;
    }
    return randomColorString;
}

var kitePolygon = [
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

function polygonCenter(p) {
    var minX = p[0].x;
    var minY = p[0].y;
    var maxX = p[0].x;
    var maxY = p[0].y;
    for (var k in p) {
        minX = p[k].x < minX ? p[k].x : minX;
        minY = p[k].y < minY ? p[k].y : minY;
        maxX = p[k].x > maxX ? p[k].x : maxX;
        maxY = p[k].y > maxY ? p[k].y : maxY;
    }
    return { x: (maxX-minX)/2, y: (maxY-minY)/2 };
}

// create two boxes and a ground
var polygon = [];
for (var k in kitePolygon) {
    polygon.push({
        x: (sw/2) + kitePolygon[k][0] * 125,
        y: (sh/2) + kitePolygon[k][1] * 100
    });
}
var center = polygonCenter(polygon);
var bodywork = 
Bodies.fromVertices(
    (sw/2), (sh/2)-65, 
    polygon, {
    isStatic: false,
    mass: 20,
    render: {
        fillStyle: "rgba(255,255,255,0)",
        /*randomColor(),*/
        strokeStyle: "#fff",
        lineWidth: 2,
    }
});

var painting = 
Bodies.rectangle(
    (sw/2), (sh/2)-65, 
    250, 100, {
    isSensor: true,
    isStatic: false,
    render: {
        sprite: {
            texture: "img/newbeetle.png",
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
    friction: 0.8,
    render: {
        sprite: {
            texture: "img/wheel.png",
            xScale: 0.476,
            yScale: 0.476
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
    friction: 0.8,
    render: {
        sprite: {
            texture: "img/wheel.png",
            xScale: 0.476,
            yScale: 0.476
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
     stiffness: 0.3,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

var rearWheelShockAbsorber = 
Matter.Constraint.create({
     bodyA: bodywork,
     pointA: { x: -(0.55*125)-28, y: 0 },
     bodyB: rearWheel,
     pointB: { x: 0, y: 0 },
     stiffness: 0.5,
     render: {
          strokeStyle: '#fff',
          lineWidth: 2,
          type: 'line'
     }
});

var frontWheelShockAbsorber = 
Matter.Constraint.create({
     bodyA: bodywork,
     pointA: { x: (0.38*125)+28, y: 0 },
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
Bodies.rectangle(sw/2, (sh/4)*3,
(sh/2)*2.55, sh/2, {
    isStatic: true,
    render: {
       sprite: {
            texture: "img/map2.jpg",
            xScale: 1.22,
            yScale: 1.22
        },
       fillStyle: "#fff",
       strokeStyle: "#000" 
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

function matterJs() {
    // add all of the bodies to the world
    Composite.add(engine.world, [
        painting, 
        paintingConstraintA,
        paintingConstraintB, 
        paintingConstraintZ, 
        bodywork,
        crankshaft, 
        rearWheel,
        rearWheelShockAbsorber,
        frontWheel,
        frontWheelShockAbsorber,
        planet
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
    startCamera("environment");
    music.play();

    setInterval(function() {
        if (accelerating) {
           Matter.Body.set(
           rearWheel, "angularVelocity", 1);
        }

        var vol = Math.abs(gyro.accX/4.9);
        vol = vol > 1 ? 1 : vol;
        //vol < 0 ? 0 : vol;
        music.volume = vol;

        if (motion) {
            engine.gravity.x = (gyro.accX / 9.8)*-1;
            engine.gravity.y = (gyro.accY / 9.8);
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
        }
    }, 100);
});

var borders = true;
var wireframes = false;
$("#borders").click(function() {
    borders = !wireframes ?
    !borders : borders;
    wireframes = !borders ?
    !wireframes : wireframes;
    render.options.wireframes = wireframes;

   // X
   // A B C D
   // borders = false; wireframes = true;
   // borders = true; wireframes = false;
   // borders = false; wireframes = false;
   // borders = true; wireframes = true;

    bodywork
    .render.lineWidth =  borders ? 2 : 0;
    for (var k in bodywork.parts) {
        bodywork.parts[k]
        .render.lineWidth =  borders ? 2 : 0;
    }

    paintingConstraintA
    .render.anchors =  borders;
    paintingConstraintB
    .render.anchors =  borders;
    paintingConstraintZ
    .render.anchors =  borders;
    crankshaft
    .render.anchors =  borders;
    rearWheelShockAbsorber
    .render.anchors =  borders;
    frontWheelShockAbsorber
    .render.anchors =  borders;

    paintingConstraintA
    .render.lineWidth =  borders ? 2 : 0;
    paintingConstraintB
    .render.lineWidth =  borders ? 2 : 0;
    paintingConstraintZ
    .render.lineWidth =  borders ? 2 : 0;
    crankshaft
    .render.lineWidth =  borders ? 2 : 0;
    rearWheelShockAbsorber
    .render.lineWidth =  borders ? 2 : 0;
    frontWheelShockAbsorber
    .render.lineWidth =  borders ? 2 : 0;
});

var accelerating = false;
$("#power").on("touchstart", function() {
    accelerating = true;
});
$("#power").on("touchend", function() {
    accelerating = false;
});

$("#cut").click(function() {
    var canvas = document
    .getElementById("camera-canvas");
    var context = canvas.getContext("2d");

    context
    .globalCompositeOperation='destination-in';
    context.beginPath();
    context.arc(128/2,128/2,128/2,0,Math.PI*2);
    context.closePath();
    context.fill();
 
    rearWheel.render.sprite.texture =
    canvas.toDataURL();
    rearWheel.render.sprite.xScale = 0.39;
    rearWheel.render.sprite.yScale = 0.39;

    frontWheel.render.sprite.texture =
    canvas.toDataURL();
    frontWheel.render.sprite.xScale = 0.39;
    frontWheel.render.sprite.yScale = 0.39;
});

var lockCamera = false;
Matter.Events.on(mouseConstraint, "mousedown", function() {
    lockCamera = true;
});
Matter.Events.on(mouseConstraint, "mouseup", function() {
    lockCamera = false;
});

Matter.Events.on(engine, "beforeUpdate", function() {
    if (lockCamera) return;
    Render.lookAt(render, bodywork,
    { x: (sw/2) - 125, y: (sh/2) - 87.5 });
});