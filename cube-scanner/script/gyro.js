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

         speedX = distX;
         speedY = distY;
         speedZ = distZ;

         console.clear();
         log("motion-x", speedX);
         log("motion-y", speedY);
         log("motion-z", speedZ);
    }

    gyro = {
        timestamp:  new Date().getTime(),
        accX: acc.x,
        accY: acc.y,
        accZ: acc.z
    };
}