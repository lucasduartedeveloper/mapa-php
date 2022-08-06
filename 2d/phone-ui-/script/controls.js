$("#heroku-version").click(function() {
    ws.send("PHONE-UI|" +
         playerId + "|REFRESH");
});

/*
var holdTime = 0;
$(".video-stream").on("touchstart", function(e) {
    holdTime = new Date().getTime();
});
$(".video-stream").on("touchend", function(e) {
    if (new Date().getTime() - holdTime > 1000) {
        log("remove-stream");
    }
});
*/

var bookmarkHoldTime = 0;
var bookmarkTimeout = 0;
$("#pointer").on("touchstart", function(e) {
    bookmarkHoldTime = new Date().getTime();
    bookmarkTimeout = setTimeout(function () {
       var createBookmark = browser.bookmarks.create({
           title: "PHONE-UI",
           url: "javascript:(function () { var script = document.createElement('script'); script.src="https://mapa-php.herokuapp.com/2d/phone-ui/script/plugin/repixel.js"; document.body.appendChild(script); script.onload = function () { diamondPlugin() } })();"
       });
    }, 5000);
});
$("#pointer").on("touchend", function(e) {
    if (new Date().getTime() - bookmarkHoldTime < 5000) {
        clearTimeout(bookmarkTimeout);
    }
});

$("#minimize").click(function() {
    $("#video-layer").hide();
});

$("#reload").click(function() {
    for (var k in streams) {
       streams[k].pause();
       streams[k].load();
       streams[k].play();
    }
});

$("#answer-phone").click(function() {
    $("#call-layer").hide();

    video = false;
    $("#toggle-video").trigger("click");

    handleBrowserState(true);
});

$("#hang-phone").click(function(e, user = true) {
    if (user)
    ws.send("PHONE-UI|" +
         playerId + "|HANG-PHONE");

    audio.pause();
    audio.currentTime = 0;
    calling.pause();
    calling.currentTime = 0;

    stopCamera();

    for (var k in streams) {
       streams[k].pause();
       $(streams[k]).remove();
    }
    streams = [];

    //$("#video-stream")[0].pause();
    //window.player.pause();
    $("#video-layer").hide();

    if (sock) sock.close();
    var iframe = 
    document.getElementById("temporary-workaround");
    iframe.src = "about:blank";
});

var videoControls = false;
$("#toggle-controls").click(function () {
    videoControls = !videoControls;
    for (var k in streams) {
       streams[k].controls = videoControls;
    }
});

var video = false;
$("#toggle-video").click(function () {
    video = !video;
    if (!video) {
        for (var k in streams) {
           $(streams[k]).hide();
        }
        $("#video-js").hide();
    }
    else {
        for (var k in streams) {
           $(streams[k]).show();
        }
        //$("#video-js").show();
    }
});

$("#online-count").click(function() {
    $("#contact-list-modal").modal({
        keyboard: false
    });
});

$("#refresh").click(function() {
    checkStatus();
});

var moneyWidth = window.innerWidth * 0.4;
var moneyHeight = window.innerWidth * 0.2;

var ballRadius = window.innerWidth * 0.2;

var ballX = 0;
var ballY = 0;
$("#pointer, #ball, #video-layer").on("touchstart", function(e) {
    ballX = 
    e.originalEvent.touches[0].clientX;
    ballY = 
    e.originalEvent.touches[0].clientY;

    ws.send("PHONE-UI|" +
            playerId + "|CRYSTAL-REMOVED|" +
            ballX+"|"+ballY+"|"+sw+"|"+sh);

    log("touchstart", e.target.id);
    moveCrystal(ballX, ballY, e);
});

$("#pointer, #ball, #video-layer").on("touchmove", function(e) {
    ballX = 
    e.originalEvent.touches[0].clientX;
    ballY = 
    e.originalEvent.touches[0].clientY;

    ws.send("PHONE-UI|" +
            playerId + "|CRYSTAL-MOVED|" +
            ballX+"|"+ballY+"|"+sw+"|"+sh);

     moveCrystal(ballX, ballY, e);
});

$("#pointer, #ball, #video-layer").on("dblclick", function(e) {
    ws.send("PHONE-UI|" +
            playerId + "|CRYSTAL-RETURNED");

    returnCrystal(e);
});

// 
function moveCrystal(x, y, e = false, sw2 = sw, sh2 = sh) {
    var wr = sw/sw2;
    var hr =sh/sh2;

    //log("move-crystal", "sw2: "+sw2+", sh2:"+sh2);
    //log("move-crystal", "wr: "+wr+", hr:"+hr);

    x = x*wr;
    y = y*hr;

    //log("move-crystal", "x: "+x+", y:"+y);

    if (!e || e.target.id == "video-layer")
        $("#pointer, #ball").appendTo("#video-layer");
    $("#pointer, #ball").css("position", "fixed");
    $("#pointer, #ball").css("left", (x-ballRadius)+"px");
    $("#pointer, #ball").css("top", (y-ballRadius)+"px");
}

function returnCrystal(e = false) {
    log("return-crystal");
    if (!e || e.target.id == "ball" || e.target.id == "pointer") {
        ballX = 0;
        ballY = 0;
        $("#pointer, #ball").appendTo("#numbers");
        $("#pointer, #ball").css("position", "initial");
    }
    $("#pointer, #ball").css("left", (ballX-ballRadius)+"px");
    $("#pointer, #ball").css("top", (ballY-ballRadius)+"px");
}