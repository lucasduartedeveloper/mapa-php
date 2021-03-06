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

var floor0 = 
Bodies.rectangle((sw/4)-15, (sh/3)*2,
    (sw/2)-30, 10, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var floor1 = 
Bodies.rectangle(((sw/4)*3)+15, (sh/3)*2,
    (sw/2)-30, 10, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var left = 
Bodies.rectangle(5, ((sh/3)*2)/2,
    10, (sh/3)*2, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var right = 
Bodies.rectangle(sw-5, ((sh/3)*2)/2,
    10, (sh/3)*2, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var ceiling = 
Bodies.rectangle(sw/2, 5,
    sw, 10, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

var planet =
Bodies.circle(sw/2, sh/2,
    50, {
    isStatic: true,
    render: {
         fillStyle: "#fff",
         strokeStyle: "#000" }});

function matterJs() {
    // add all of the bodies to the world
    //Composite.add(engine.world,
    //[floor0, floor1, left, right, ceiling]);
    Composite.add(engine.world,
    [planet]);

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
    getSquares();
    startCamera("environment");

    setInterval(function() {
        if (motion) {
            engine.gravity.x = (gyro.accX / 9.8);
            engine.gravity.y = (gyro.accY / 9.8) *-1;
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

            /*
            context
            .globalCompositeOperation='destination-in';
            context.beginPath();
            context.arc(128/2,128/2,128/2,0,Math.PI*2);
            context.closePath();
            context.fill();
 
            planet.render.sprite.texture =
            canvas.toDataURL();
            planet.render.sprite.xScale = 0.78;
            planet.render.sprite.yScale = 0.78;
            */
        }

        var deadSquares = [];
        for(var k in squares) {
            if ((squares[k].position.x > sw+25 ||
                 squares[k].position.x < -25) || 
                 (squares[k].position.y > sh+25 ||
                 squares[k].position.y < -25)) {
                 deadSquares.push(squares[k]);
            }
            if (squares[k].connected &&
                 distanceToPlanet(squares[k]) >
                 (squares[k].gravity.length + 25)) {
                 stringBreak.play();
                 squares[k].connected = false;
                 Composite.remove(engine.world,
                 [squares[k].gravity]);
            }
            else if (!squares[k].connected && 
                 distanceToPlanet(squares[k]) <=
                 (squares[k].gravity.length + 25)) {
                 squares[k].connected = true;
                 Composite.add(engine.world,
                 [squares[k].gravity]);
            }
        }
        for(var k in deadSquares) {
            squares = squares.filter((s) => {
            return s.squareId != 
            deadSquares[k].squareId; });
            deleteSquare(deadSquares[k]);
        }
    }, 100);

   $("#cut").click(function(e) {
         scissorsSFX.play();

         var base64 = 
         document.getElementById("camera-canvas").
         toDataURL();

         var newSquare =
         Bodies.rectangle(sw/2, 
         sh/2-(squares.length*75), 50, 50, {
         render: {
         sprite: {
             texture: cameraKey ?
             base64 : "img/placeholder.png",
             xScale: 0.39,
             yScale: 0.39
         },
         fillStyle: "#fff",
         strokeStyle: "#F0EC57",
         lineWidth: 2}});

         newSquare.connected = true;
         newSquare.squareId = new Date().getTime();
         newSquare.gravity =
         Matter.Constraint.create({
            bodyA: planet,
            pointA: { x: 0, y: 0 },
            bodyB: newSquare,
            pointB: { x: 0, y: 0 },
            stiffness: 0.3,
            length: 75*(squares.length),
            render: {
                strokeStyle: '#fff',
                lineWidth: 1,
                type: 'line'
            }
         });

         saveSquares([newSquare]);
         squares.push(newSquare);        
         Composite.add(engine.world,
         [newSquare, newSquare.gravity]);
     });
});

function getSquares() {
     $.getJSON("ajax/square.php", function(data) {
          log("get", data);
          for (var k in data) {
              var square = 
              Bodies.rectangle(data[k].x, 
              data[k].y-(k*75), 50, 50, {
              render: {
              sprite: {
                  texture: data[k].base64,
                  xScale: 0.39,
                  yScale: 0.39
             },
             fillStyle: "#fff",
             strokeStyle: "#F0EC57",
             lineWidth: 2}});

             square.connected = true;
             square.squareId = data[k].square_id;
             square.gravity =
                Matter.Constraint.create({
                bodyA: planet,
                pointA: { x: 0, y: 0 },
                bodyB: square,
                pointB: { x: 0, y: 0 },
                stiffness: 0.3,
                length: 75*k,
                render: {
                    strokeStyle: '#fff',
                    lineWidth: 1,
                    type: 'line'
                }
             });
            squares.push(square);
            Composite.add(engine.world, square.gravity);
        }
        Composite.add(engine.world, squares);
    });
}

function saveSquares(newList, callback=false) {
     var list = [];
     for (var k in newList) {
         list.push({
             squareId: newList[k].squareId,
             base64: newList[k].render.sprite.texture,
             x: newList[k].position.x,
             y: newList[k].position.y
         });
     }

     $.post("ajax/square.php", {
          list: list
          }).done(function(data) { 
              log("post", data);
              if (callback) callback();
     });
}

function deleteSquare(deadSquare) {   
     $.post("ajax/square.php",
         { squareId: deadSquare.squareId },
         function(data) {
         log("post", data);
         Composite.remove(engine.world,
         [deadSquare, deadSquare.gravity]);
     });
}

$("#upload").click(function(e) {
     $("#file-upload").click();
});
$("#file-upload").on("change", function(e) {
     uploadImage();
});
$(document).on("imageResized", function(e) {
    var newSquare =
    Bodies.rectangle(sw/2, 
    sh/2-(squares.length*75), 50, 50, {
    render: {
    sprite: {
        texture: e.url,
        xScale: 0.39,
        yScale: 0.39
    },
    fillStyle: "#fff",
    strokeStyle: "#F0EC57",
    lineWidth: 2}});

    newSquare.connected = true;
    newSquare.squareId = new Date().getTime();
    newSquare.gravity =
                Matter.Constraint.create({
                bodyA: planet,
                pointA: { x: 0, y: 0 },
                bodyB: newSquare,
                pointB: { x: 0, y: 0 },
                stiffness: 0.3,
                length: 75*(squares.length),
                render: {
                    strokeStyle: '#fff',
                    lineWidth: 1,
                    type: 'line'
                }
     });
    Composite.add(engine.world, newSquare.gravity)

    saveSquares([newSquare]);
    squares.push(newSquare);        
    Composite.add(engine.world, [newSquare]);
    log("info", "Image resized.");
});

function distanceToPlanet(square) {
    var co = square.position.x - planet.position.x;
    var ca = square.position.y - planet.position.y;
    var h = Math.abs(Math.sqrt(
    Math.pow(co,2)+
    Math.pow(ca,2)));
    return h;
}