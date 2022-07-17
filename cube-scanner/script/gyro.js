if ('DeviceMotionEvent' in window) {
    var onDeviceMotion = function (e) {
        accHandler(e.accelerationIncludingGravity);
    }
    window
    .addEventListener('devicemotion',
    onDeviceMotion, false);
}

var motion = false;

var accX = 0;
var accY = 0;
var accZ = 0;

var speedX = 0;
var speedY = 0;
var speedZ = 0;

var gripX = Math.round((5 / 9.8) * 0.5);
var gripY = Math.round((5 / 9.8) * 0.5);
var gripZ = Math.round((5 / 9.8) * 0.5);

function accHandler(acc) {
    if(!motion) return;

    accX = acc.x && acc.x.toFixed(3);
    accY = acc.y && acc.y.toFixed(3);
    accZ = acc.z && acc.z.toFixed(3);

    //speedX = Math.round((5 / 9.8) * acc.x);
    speedY = Math.round((5 / 9.8) * acc.y);
    //speedZ = Math.round((5 / 9.8) * acc.z);
}

setInterval(function() {
    if(motion) return;
    if (speedY > 0) {
        speedY -= gripY;
        speedY = speedY < 0 ? 0 speedY;
    }
    else if (speedY < 0) {
        speedY += gripY;
        speedY = speedY > 0 ? 0 speedY;
    }
    //speedX -= gripX;
    //speedY -= gripY;
    //speedZ -= gripZ;
}, 100);