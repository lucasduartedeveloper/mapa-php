/*

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

var x = 0;
var y = 0;
var z = 0;

var mapLock = false;
var northLock = false;

var fixedX = 0;
var fixedY = 0;
var fixedZ = 0;

var northAngle = 0;
var mapAngle = 0;

function accHandler(acc) {
    accX = acc.x && acc.x.toFixed(3);
    accY = acc.y && acc.y.toFixed(3);
    accZ = acc.z && acc.z.toFixed(3);

    var speedUp = acc.x + acc.y + acc.z;
    x = ((95 / 9.8) * accX)* -1;
    y = (95 / 9.8) * accY;
    z = (95 / 9.8) * accZ;

    if (!mapLock  &&  !northLock) {
         rotateX = 
         Math.round((180 / 9.8) * acc.x);
         rotateY = 
         Math.round((180 / 9.8) * acc.y);
         northAngle = 
         Math.round((180 / 9.8) * acc.z);
         mapAngle = 
         Math.round((180 / 9.8) * acc.z);
    }
    else if (!mapLock) {
         mapAngle = 
         Math.round((180 / 9.8) * acc.z);
    }
    else if (!northLock) {
         northAngle = 
         Math.round((180 / 9.8) * acc.z);
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

*/