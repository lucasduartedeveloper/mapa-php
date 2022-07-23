var sw = window.innerWidth;
var sh = window.innerHeight;

$(document).ready(function() {
    setInterval(function() {
        $(iframe)
        .css("transform",
        "rotateX("+((180/9.8)*gyro.accX)+"deg) " +
        "rotateY("+((180/9.8)*gyro.accY)+"deg) " +
        "rotateZ("+((180/9.8)*gyro.accZ)+"deg)");
    }, 100);
});