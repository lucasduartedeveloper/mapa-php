if ('DeviceMotionEvent' in window) {
    var onDeviceMotion = function (e) {
        accHandler(e.accelerationIncludingGravity);
    }
    window
    .addEventListener('devicemotion',
    onDeviceMotion, false);
}

var motion = true;

var accX = 0;
var accY = 0;
var accZ = 0;

var rotationXspeed = 0;
var rotationYspeed = 0;
var rotationZspeed = 0;

var gyro = {
    timestamp:  new Date().getTime(),
    accX: 0,
    accY: 0,
    accZ: 0
}
function accHandler(acc) {
    if(!motion) return;

    if ((new Date().getTime() -
         gyro.timestamp) > 50) {

         var distX = 
         (acc.x - gyro.accX);
         var distY = 
         (acc.y - gyro.accY);
         var distZ = 
         (acc.z - gyro.accZ);

         rotationXspeed += distX ;
         rotationYspeed += distY;
         rotationZspeed += distZ;

         console.clear();
         log("motion-x", rotationXspeed);
         log("motion-y", rotationYspeed);
         log("motion-z", rotationZspeed);
    }

    gyro = {
        timestamp:  new Date().getTime(),
        accX: acc.x,
        accY: acc.y,
        accZ: acc.z
    };
}