var playerId = new Date().getTime();

function matterJs() {
    // add all of the bodies to the world
    Composite.add(engine.world, [
        painting, 
        paintingConstraintA,
        paintingConstraintB, 
        paintingConstraintZ, 
        bodywork,
        crankshaft, 
        //testWheel,
        rearWheelPivot,
        rearWheel,
        //rearWheelShockAbsorberA,
        //rearWheelShockAbsorberB,
        frontWheelPivot,
        frontWheel,
        //frontWheelShockAbsorberA,
        //frontWheelShockAbsorberB,
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
    //var runner = Runner.create();

    // run the engine
    //Runner.run(runner, engine);
}

$(document).ready(function() {
    matterJs();
    log("log", "$(document).ready(...");

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
window.test = function() {
    var runner = Runner.create();
    Runner.run(runner, engine);
    return;
    //-- Annotations
    accelerating = true;
    motion = false;
    Matter.Body.set(bodywork,"mass",500);
    Matter.Body.set(rearWheel,"mass",200);
    Matter.Body.set(rearWheel,"friction",1);
    Matter.Body.set(frontWheel,"mass",200);
    Matter.Body.set(frontWheel,"friction",1);
    Matter.Body.set(rearWheelShockAbsorberA,
    "stiffness",0.5);
    Matter.Body.set(rearWheelShockAbsorberB,
    "stiffness",0.5);
    Matter.Body.set(frontWheelShockAbsorberA,
    "stiffness",0.5);
    Matter.Body.set(frontWheelShockAbsorberB,
    "stiffness",0.5);
}