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

var gripX = 9.8;
var gripY = 9.8;
var gripZ = 9.8;

function accHandler(acc) {
    if(!motion) return;

    accX = acc.x && acc.x.toFixed(3);
    accY = acc.y && acc.y.toFixed(3);
    accZ = acc.z && acc.z.toFixed(3);

    speedX = Math.round((5 / 9.8) * acc.x);
    speedY = Math.round((5 / 9.8) * acc.y);
    speedZ = Math.round((5 / 9.8) * acc.z);
}

setInterval(function() {
    /*
    speedX -= gripX;
    speedY -= gripY;
    speedZ -= gripZ;*/
}, 100);