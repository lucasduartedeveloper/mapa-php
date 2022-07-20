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

var gyro= {
    timestamp:  new Date().getTime();
    accX: 0,
    accY: 0,
    accZ: 0
}
function accHandler(acc) {
    if(!motion) return;

    gyro = {
        timestamp:  new Date().getTime();
        accX: acc.x && acc.x.toFixed(3),
        accY: acc.y && acc.y.toFixed(3),
        accZ: acc.z && acc.z.toFixed(3)
    };

    

    //speedX = Math.round((5 / 9.8) * acc.x);
    //speedY = Math.round((5 / 9.8) * acc.y);
    //speedZ = Math.round((5 / 9.8) * acc.z);
}

setInterval(function() {
    if(motion) return;

    //speedX -= gripX;
    //speedY -= gripY;
    //speedZ -= gripZ;
}, 100);

function angle(co, ca) {
    var h = Math.sqrt(
        Math.pow(co, 2) +
        Math.pow(ca, 2)
    );
    var senA = co/h;
    var a = Math.asin(senA);
    return a * (180/Math.PI);
}

function distanceX(y, z) {
    
}
function distanceY(x, z) {

}
function distanceZ(x, y) {

}