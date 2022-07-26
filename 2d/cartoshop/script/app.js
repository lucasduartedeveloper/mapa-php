var playerId = new Date().getTime();
var fuel = 100;

function matterJs() {
     Matter.Body.set(bodywork,
    "mass", car.mass);
    Matter.Body.set(rearWheel,
    "mass", car.wheels.mass);
    Matter.Body.set(rearWheel,
    "friction", car.wheels.friction);
    Matter.Body.set(rearWheel,
    "frictionStatic",car.wheels.frictionStatic);
    Matter.Body.set(frontWheel, 
    "mass", car.wheels.mass);
    Matter.Body.set(frontWheel, 
    "friction", car.wheels.friction);
    Matter.Body.set(rearWheel,
    "frictionStatic", car.wheels.frictionStatic);
    Matter.Body.set(rearWheelPivot,
    "stiffness",0.5);
    Matter.Body.set(frontWheelPivot,
    "stiffness",0.5);

    // add all of the bodies to the world
    Composite.add(engine.world, [
        painting,
        paintingConstraintA,
        paintingConstraintB,
        paintingConstraintZ,
        bodywork,
        crankshaft,
        rearWheelPivot,
        frontWheelPivot,
        rearWheel,
        frontWheel,
        //testWheel,
        sign,
        signConstraint,
        planet,
        line, loop
    ]);
    
    // run the renderer
    Render.run(render);

    // add mouse
    //render.mouse = mouse;
    //Composite.add(engine.world, mouseConstraint)

    // create runner
    //var runner = Runner.create();

    // run the engine
    //Runner.run(runner, engine);
}

$(document).ready(function() {
    log("log", "$(document).ready(...");
    matterJs();

    setInterval(function() {
        if (motion) { 
            engine.gravity.x = (gyro.accX / 9.8)*-1;
            engine.gravity.y = (gyro.accY / 9.8);
             
        }
        else {
            engine.gravity.x = 0;
            engine.gravity.y = 1;
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

        if (accelerating) {
            fuel -= 0.1;
            fuel = fuel < 0 ? 0 : fuel;
            $("#fuel-ammount").css("width", (fuel/2)+"vw");
        }

        /*
        ws.send("LONDRINA-2D|"+playerId+"|CAR-UPD|"+
            bodyToJSON({
                 bodywork : bodywork,
                 painting : painting,
                 paintingConstraintA : paintingConstraintA,
                 paintingConstraintB : paintingConstraintB,
                 paintingConstraintZ : paintingConstraintZ,
                 crankshaft : crankshaft,
                 rearWheel : rearWheel,
                 frontWheel : frontWheel,
                 rearWheelShockAbsorberA : 
                 rearWheelShockAbsorberA,
                 rearWheelShockAbsorberB : 
                 rearWheelShockAbsorberB,
                 frontWheelShockAbsorberA : 
                 frontWheelShockAbsorberA,
                 frontWheelShockAbsorberB : 
                 frontWheelShockAbsorberB
            })
        );*/
    }, 100);

    /*
    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "LONDRINA-2D" &&
            playerId != msg[1]) {
            //log("ws", msg);

            if (msg[2] == "CAR-UPD") {
                 var car = JSON.parse(msg[3]);
                 setValue(bodywork, car.bodywork)
                 setValue(painting, car.painting);
                 setValue(paintingConstraintA,
                 car.paintingConstraintA);
                 setValue(paintingConstraintB,
                 car.paintingConstraintB);
                 setValue(paintingConstraintZ,
                 car.paintingConstraintZ);
                 setValue(crankshaft, car.crankshaft);
                 setValue(rearWheel, car.rearWheel);
                 setValue(frontWheel, car.frontWheel);
                 setValue(rearWheelShockAbsorberA,
                 car.rearWheelShockAbsorberA);
                 setValue(rearWheelShockAbsorberB,
                 car.rearWheelShockAbsorberB);
                 setValue(frontWheelShockAbsorberA,
                 car.frontWheelShockAbsorberA);
                 setValue(frontWheelShockAbsorberB,
                 car.frontWheelShockAbsorberB);
            }
        }
    };*/
});

Matter.Events.on(engine, "beforeUpdate", function() {
    if (lockCamera) return;
    Render.lookAt(render, bodywork,
    { x: (sw/2) - 125, y: (sh/2) - 87.5 });

    if (accelerating) {
       Matter.Body.set(
       frontWheel, "angularVelocity", 2);
       Matter.Body.set(
       rearWheel, "angularVelocity", 2);
    }
});

// Test
// create runner
var started = false;
var runner = Runner.create();

window.test = function() {
    if (started) return;

    // add mouse
    render.mouse = mouse;
    Composite.add(engine.world, mouseConstraint);

    // run the renderer
    Runner.run(runner, engine);

    $("#test-run").removeClass("fa-play");
    $("#test-run").addClass("fa-pause");
    started = true;
    return;
    //-- Annotations
    accelerating = true;
    motion = false;
    Matter.Body.set(bodywork,
    "mass", car.mass);
    Matter.Body.set(rearWheel,
    "mass", car.wheels.mass);
    Matter.Body.set(rearWheel,
    "friction", car.wheels.friction);
    Matter.Body.set(rearWheel,
    "frictionStatic",car.wheels.frictionStatic);
    Matter.Body.set(frontWheel, 
    "mass", car.wheels.mass);
    Matter.Body.set(frontWheel, 
    "friction", car.wheels.friction);
    Matter.Body.set(rearWheel,
    "frictionStatic", car.wheels.frictionStatic);
    Matter.Body.set(rearWheelPivot,
    "stiffness",0.5);
    Matter.Body.set(frontWheelPivot,
    "stiffness",0.5);
}