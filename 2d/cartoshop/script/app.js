var music = new Audio("audio/sou-vitorioso.mp3");

var sw = window.innerWidth;
var sh = window.innerHeight;
var ar = sw/sh;
var vw = 0;
var vh = 0;
var vr = 0;

$(document).ready(function() {
    matterJs();
    log("log", "$(document).ready(...");

    setInterval(function() {
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
    }, 100);
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
accelerating = true;
motion = false;
Matter.Body.set(bodywork,"mass",500);
Matter.Body.set(rearWheel,"mass",200);
Matter.Body.set(rearWheel,"friction",1);
Matter.Body.set(frontWheel,"mass",200);
Matter.Body.set(frontWheel,"friction",200);
Matter.Body.set(rearWheelShockAbsorberA,
"stiffness",0.5);
Matter.Body.set(rearWheelShockAbsorberB,
"stiffness",0.5);
Matter.Body.set(frontWheelShockAbsorberA,
"stiffness",0.5);
Matter.Body.set(frontWheelShockAbsorberB,
"stiffness",0.5);
}