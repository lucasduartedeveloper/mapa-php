var coin = new Audio("audio/coin.wav");
var notification = new Audio("audio/game-notification.wav");
var confirmationBeep = new Audio("audio/confirmation-beep.wav");
var gameOver = new Audio("audio/game-over.wav");

// Saldo
var playerId = localStorage.getItem("playerId") ? 
    parseInt(localStorage.getItem("playerId")) : new Date().getTime();
var counterCw = 0;
var counterCcw = 0;
var height = 0;

$(document).ready(function() {
    matterJs();
    $("#north").click(function(e) {
         if (!northLock) {
              northLock = true;
              northAngle = mapAngle;
              $("#north").addClass("active");
              confirmationBeep.play();
         }
         else if {
              northLock = false;
              northAngle = mapAngle;
              $("#north").removeClass("active");
         }
    });

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "MAP-GYRO" &&
            playerId != msg[1]) {
        }
    };
});

if ('DeviceMotionEvent' in window) {
    var onDeviceMotion = function (e) {
        accHandler(e.accelerationIncludingGravity);
    }
    window
    .addEventListener('devicemotion',
    onDeviceMotion, false);
}

var accX = 0;
var accY = 0;
var accZ = 0;
var sumOnMotion = true;

var checkPoints = [
    { x1: -1, y1: -100, x2: 1, y2: -3, 
      left: 3, right: 1, done: false }, // 3
    { x1: -100, y1: -1, x2: -3, y2: 1, 
      left: 0, right: 2, done: false }, // 4
    { x1: -1, y1: 3, x2: 1, y2: 100, 
      left: 1, right: 3, done: false }, // 1
    { x1: 3, y1: -1, x2: 100, y2: 1, 
      left: 2, right: 0, done: false } // 2
];

var x = 0;
var y = 0;
var firstCp = -1;
var lastCp = -1;

var northLock = false;
var mapAngle = 0;

var northAngle = 0;

function accHandler(acc) {
    accX = acc.x && acc.x.toFixed(3);
    accY = acc.y && acc.y.toFixed(3);
    accZ = acc.z && acc.z.toFixed(3);

    var speedUp = acc.x + acc.y + acc.z;
    x = ((95 / 9.8) * accX)* -1;
    y = (95 / 9.8) * accY;

    engine.world.gravity.x = ((1 / 9.8) * accX)*-1;
    engine.world.gravity.y = (1 / 9.8) * accY;

    var h = 
          Math.sqrt(
          Math.pow(x, 2) +
          Math.pow(y, 2));
    mapAngle = calcularAngulo(x, y, h);
    map.setBearing(mapAngle);
    
    if ( !northLock) {
          northAngle = mapAngle;
    }

    height = speedUp;
    $("#north-indicator")
    .css("transform", "rotate3d(1,1,1,"+northAngle+"deg)");

    $("#map-angle-indicator").text(mapAngle.toFixed(2)+"°");
    $("#height-indicator").text(speedUp.toFixed(3));

    $("#pointer").css("margin-left", x.toString() + "px");
    $("#pointer").css("margin-top", y.toString() + "px");

    for(var k in checkPoints) {
         if ((accX >= checkPoints[k].x1 && 
              accX <= checkPoints[k].x2) &&
              (accY >= checkPoints[k].y1 && 
              accY <= checkPoints[k].y2)) {

              checkPoints[k].done = true;
              $("#cp"+k).addClass("done");
              if (foo2()) {
                   firstCp = k;
              }

              if (foo() && firstCp == k) {
                   if (lastCp == checkPoints[k].right) {
                       counterCw += 1;
                       bar();
                   }

                  if (lastCp == checkPoints[k].left) {
                      counterCcw += 1;
                      bar();
                  }
             }
             lastCp = k;
         }
    }
}

function calcularAngulo(co, ca, h) {
    var senA = co/h;
    var a = Math.asin(senA);
    a = co == 0 && ca > 0 ? 1.5707963267948966 * 2 : a;
    a = co > 0 && ca > 0 ? 1.5707963267948966 * 2 - a : a;
    a = co < 0 && ca > 0 ? 1.5707963267948966 * 2 - a : a;
    return a * (180/Math.PI);
}

function foo() {
    for(var k in checkPoints) {
        if (!checkPoints[k].done) {
             return false;
        }
    }
    return true;
}

function foo2() {
    var foo2 = 0;
    for(var k in checkPoints) {
        if (checkPoints[k].done) {
             foo2 += 1; 
        }
    }
    return foo2 == 1;
}

function bar() {
    for(var k in checkPoints) {
        checkPoints[k].done = false;
        $("#cp"+k).removeClass("done");
        notification.play();
    }
}

var sh = window.innerHeight;
var sw = window.innerWidth;
var canvas = document.getElementById("matter-js");
canvas.width = sw;
canvas.height = sh/3;

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
         height: sh/3,
         wireframes: false
    }
});

// create two boxes and a ground
var head = 
Bodies.circle((sw/2), (sh/5)-95, 10, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});

function matterJs() {
    // add all of the bodies to the world
    Composite.add(engine.world, [head]);

    let mouse = Matter.Mouse.create(render.canvas);
    let mouseConstraint = 
    Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            render: {visible: true}
        }
    });
    render.mouse = mouse;

    // add soft global constraint
    var constraints = [
    mouseConstraint];
    Composite.add(engine.world, constraints);

    // run the renderer
    Render.run(render);
    
    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}