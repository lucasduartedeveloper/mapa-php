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

// Video/Camera zoom
var pinchStartAX = 0;
var pinchStartAY = 0;
var pinchStartBX = 0;
var pinchStartBY = 0;

var pinchAX = 0;
var pinchAY = 0;
var pinchBX = 0;
var pinchBY = 0;

var pinchStartDistance = 0;
var pinchDistance = 0;
var pinchRotation = 0;

$(window).on("touchstart", function(e) {
    log("pich-zoom-start", e.originalEvent.touches);
    if (e.originalEvent.touches.length < 2) { 
        return;
    }

    pinchStartAX = 
    e.originalEvent.touches[0].clientX;
    pinchStartAY = 
    e.originalEvent.touches[0].clientY;

    pinchStartBX = 
    e.originalEvent.touches[1].clientX;
    pinchStartBX = 
    e.originalEvent.touches[1].clientY;

    pinchStartDistance =
    Math.sqrt(
    Math.pow(pinchStartAX, 2)+
    Math.pow(pinchStartBY, 2));

    log("pich-zoom-start-distance", pinchStartDistance);
});
$(window).on("touchmove", function(e) {
    log("pich-zoom-move", e.originalEvent.touches);
    if (e.originalEvent.touches.length < 2) { 
        return;
    }

    pinchAX = 
    e.originalEvent.touches[0].clientX;
    pinchAY = 
    e.originalEvent.touches[0].clientY;

    pinchBX = 
    e.originalEvent.touches[1].clientX;
    pinchBX = 
    e.originalEvent.touches[1].clientY;

    pinchDistance =
    Math.sqrt(
    Math.pow(pinchAX, 2)+
    Math.pow(pinchBY, 2));

    log("pich-zoom-distance", pinchDistance);
});
$(window).on("touchend", function(e) {
    log("pich-zoom-move", e.originalEvent.touches);
    if (e.originalEvent.touches.length < 2) { 
        return;
    }

    pinchAX = 
    e.originalEvent.touches[0].clientX;
    pinchAY = 
    e.originalEvent.touches[0].clientY;

    pinchBX = 
    e.originalEvent.touches[0].clientX;
    pinchBX = 
    e.originalEvent.touches[0].clientY;

    pinchDistance =
    Math.sqrt(
    Math.pow(pinchAX, 2)+
    Math.pow(pinchBY, 2));

    log("pich-zoom-distance", pinchDistance);
});

var listFilter = "all";
function filterList(type) {
    log("filter-list: ", type);
    listFilter = type;

    $("ul li").each(function(i) {
        $(this).css("display", 
        type == "all" ? "list-item" :
        ((type) == this.type ? "list-item" : "none"));
    });

    $(".modal-body button").removeClass(
    "btn-secondary");
    $(".modal-body button").removeClass(
    "btn-light");
    $("#"+type+"-filter").addClass(
    "btn-secondary");
    //$("ul li").
}

$("#pointer").on("touchstart", function(e) {
    bookmarkHoldTime = new Date().getTime();
    bookmarkTimeout = setTimeout(function () {
        notification.play();
        $("#pointer").css("filter",
        "invert(18%) sepia(86%) saturate(7242%) hue-rotate(4deg) brightness(94%) contrast(120%)");

        if (window.sidebar) { // Mozilla Firefox Bookmark
           window.sidebar
           .addPanel(bookmarkUrl, "PHONE-UI","");
        } else if(window.external) { // IE Favorite
           window.external
           .AddFavorite(bookmarkUrl, "PHONE-UI"); 
        } else if(window.opera && window.print) { // Opera Hotlist
           this.title="PHONE-UI";
       }
 
       if (browser)
       browser.bookmarks.create({
           title: "PHONE-UI",
           url: bookmarkUrl
       }).then(function() {
           //bookmarkDblClick = 0;
       });
       bookmarkDblClick = 0;
    }, 5000);
});
$("#pointer").on("touchend", function(e) {
    if (new Date().getTime() - bookmarkHoldTime < 5000) {
        clearTimeout(bookmarkTimeout);
        setTimeout(function() {
            $("#pointer").css("filter","initial");
        }, 1000);
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

/* Disable right click
document.getElementById("pointer")
.addEventListener("contextmenu", e => e.preventDefault());

document.getElementById("pointer")
.oncontextmenu = function() { return false; };

$("#pointer").bind("contextmenu", function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
});

$("#pointer").mousedown(function(e) {
   switch (e.which) {
      case 1:
      // Left mouse
      break;

      case 2:
      // Middle mouse
      break;

      case 3:
      // Right mouse.
      log("right-click");
      e.preventDefault();
      e.stopPropagation();
      break;
   }
});

// Bookmark
var bookmarkDblClick = 0;
var bookmarkHoldTime = 0;
var bookmarkTimeout = 0;
var bookmarkUrl = "javascript:(function () { var script = document.createElement('script'); script.src=\"https://mapa-php.herokuapp.com/2d/phone-ui/script/plugin/repixel.js\"; document.body.appendChild(script); script.onload = function () { diamondPlugin() } })();";

$("#pointer").on("dblclick", function(e) {
    bookmarkDblClick++;
    if (bookmarkDblClick >= 2) {
       $("#pointer").trigger("touchend");
    }
});*/