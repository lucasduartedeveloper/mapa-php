$("#answer-phone").click(function() {
    $("#call-layer").hide();

    video = false;
    $("#toggle-video").trigger("click");

    handleBrowserState(true);
});

$("#hang-phone").click(function() {
    audio.pause();
    $("#video-stream")[0].pause();
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

var ballRadius = window.innerWidth * 0.2;

var ballX = 0;
var ballY = 0;
$("#pointer, #ball, #video-stream").on("touchstart", function(e) {
    alarm.play();
    ws.send("PHONE-UI|" +
            playerId + "|CRYSTAL-REMOVED");

    ballX = 
    e.originalEvent.touches[0].pageX;
    ballY = 
    e.originalEvent.touches[0].pageY;

    log("touchstart", e.target.id);
    if (e.target.id == "video-stream")
        $("#pointer, #ball").appendTo("#video-layer");
    $("#pointer, #ball").css("position", "fixed");
    $("#pointer, #ball").css("left", (ballX-(ballRadius))+"px");
    $("#pointer, #ball").css("top", (ballY-(ballRadius))+"px");
});

$("#pointer, #ball, #video-stream").on("touchmove", function(e) {
    ballX = 
    e.originalEvent.touches[0].pageX;
    ballY = 
    e.originalEvent.touches[0].pageY;

    $("#pointer, #ball").css("position", "fixed");
    $("#pointer, #ball").css("left", (ballX-(ballRadius))+"px");
    $("#pointer, #ball").css("top", (ballY-(ballRadius))+"px");
});

$("#pointer, #ball, #video-stream").on("touchend", function(e) {
    alarm.pause();
    alarm.currentTime = 0;
    ws.send("PHONE-UI|" +
            playerId + "|CRYSTAL-RETURNED");

    if (e.target.id == "ball" || e.target.id == "pointer") {
        ballX = 0;
        ballY = 0;
        $("#pointer, #ball").appendTo("#numbers");
        $("#pointer, #ball").css("position", "initial");
    }
    $("#pointer, #ball").css("left", (ballX-(ballRadius))+"px");
    $("#pointer, #ball").css("top", (ballY-(ballRadius))+"px");
});