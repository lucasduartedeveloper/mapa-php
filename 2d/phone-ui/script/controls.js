$("#hang-phone").click(function() {
    audio.pause();
    $("#video-stream")[0].pause();
    window.player.pause();
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
    if (video) {
        $("#video-stream").hide(); 
        $("#video-js").hide();
    }
    else {
        //$("#video-stream").show();      
        $("#video-js").show();
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

var ballRadius = sw * 0.2;
var ballX = 0;
var ballY = 0;
$("#ball, #video-stream").on("touchstart", function(e) {
    ballX = 
    e.originalEvent.touches[0].pageX;
    ballY = 
    e.originalEvent.touches[0].pageY;

    $("#ball").appendTo("#video-layer");
    $("#ball").css("position", "fixed");
    $("#ball").css("left", (ballX-(ballRadius))+"px");
    $("#ball").css("top", (ballY-(ballRadius))+"px");
});

$("#ball").on("touchmove", function(e) {
    ballX = 
    e.originalEvent.touches[0].pageX;
    ballY = 
    e.originalEvent.touches[0].pageY;

    $("#ball").css("position", "fixed");
    $("#ball").css("left", (ballX-(ballRadius))+"px");
    $("#ball").css("top", (ballY-(ballRadius))+"px");
});

$("#ball").on("touchend", function(e) {
    ballX = 0;
    ballY = 0;

    $("#ball").appendTo("#numbers");
    $("#ball").css("position", "initial");
    $("#ball").css("left", ballX+"px");
    $("#ball").css("top", ballY+"px");
});