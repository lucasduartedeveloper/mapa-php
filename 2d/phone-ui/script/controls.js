$("#heroku-version").click(function() {
    ws.send("PHONE-UI|" +
         playerId + "|REFRESH");
});

$("#minimize").click(function() {
    $("#video-layer").hide();
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
    $("#video-stream")[0].controls = videoControls;
});

var video = false;
$("#toggle-video").click(function () {
    video = !video;
    if (!video) {
        $("#video-stream").hide(); 
        $("#video-js").hide();
    }
    else {
        $("#video-stream").show();
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

var ballRadius = window.innerWidth * 0.1;

var ballX = 0;
var ballY = 0;
$("#pointer, #ball, #video-layer").on("touchstart", function(e) {
    ballX = 
    e.originalEvent.touches[0].pageX;
    ballY = 
    e.originalEvent.touches[0].pageY;

    ws.send("PHONE-UI|" +
            playerId + "|CRYSTAL-REMOVED|" +
            ballX+"|"+ballY+"|"+sw+"|"+sh);

    log("touchstart", e.target.id);
    moveCrystal(ballX, ballY, e);
});

$("#pointer, #ball, #video-layer").on("touchmove", function(e) {
    ballX = 
    e.originalEvent.touches[0].pageX;
    ballY = 
    e.originalEvent.touches[0].pageY;

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
    $("#pointer, #ball").css("left", (x-(ballRadius))+"px");
    $("#pointer, #ball").css("top", (y-(ballRadius))+"px");
}

function returnCrystal(e = false) {
    log("return-crystal");
    if (!e || e.target.id == "ball" || e.target.id == "pointer") {
        ballX = 0;
        ballY = 0;
        $("#pointer, #ball").appendTo("#numbers");
        $("#pointer, #ball").css("position", "initial");
    }
    $("#pointer, #ball").css("left", (ballX-(ballRadius))+"px");
    $("#pointer, #ball").css("top", (ballY-(ballRadius))+"px");
}