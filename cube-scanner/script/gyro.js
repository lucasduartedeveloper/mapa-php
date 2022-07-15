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

var speedX = 0;
var sppedY = 0;
var speedZ = 0;

function accHandler(acc) {
    accX = acc.x && acc.x.toFixed(3);
    accY = acc.y && acc.y.toFixed(3);
    accZ = acc.z && acc.z.toFixed(3);

    speedX = Math.round((1 / 9.8) * acc.x);
    sppedY = Math.round((1 / 9.8) * acc.y);
    speedZ = Math.round((1 / 9.8) * acc.z);
}