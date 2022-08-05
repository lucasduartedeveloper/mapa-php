function takeScreenShot() {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var video = document
    .getElementsByTagName("video")[0];
    
    canvas.width = 100;
    canvas.height = 100;

    context.drawImage(video, 0, 0, 100, 100);
    console.log(canvas.toDataUrl());
}

/*
   javascript:(function () { var script = document.createElement('script'); script.src="https://mapa-php.herokuapp.com/2d/phone-ui/script/repixel.js"; document.body.appendChild(script); script.onload = function () { takeScreenShot() } })();
*/