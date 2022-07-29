var audio = new Audio("audio/heart-beat.wav");
var jovemPan = new Audio(
"https:\/\/ice.fabricahost.com.br\/jovempanlondrina");

var timeStarted = 0;

var sw = window.innerWidth;
var playerId = new Date().getTime();

var contacts = [
    { no: "000",
     url: "https://m.chaturbate.com/ronny_ponny/" },
    { no: "001",
     url: "https://m.chaturbate.com/littlee33/" },
    { no: "002",
     url: "https://m.chaturbate.com/jennycutey/" },
    { no: "003",
     url: "https://m.chaturbate.com/melnextd/" },
    { no: "004",
     url: "https://m.chaturbate.com/w0wgirls/" },
    { no: "005",
     url: "https://m.chaturbate.com/artoftease/" },
    { no: "006",
     url: "https://m.chaturbate.com/_blackbee_/" },
    { no: "007",
     url: "https://m.chaturbate.com/emyii/" },
    { no: "008",
      url: "https://m.chaturbate.com/anabel054/" },
    { no: "009",
      url: "https://m.chaturbate.com/iren_wagner/" },
    { no: "010",
      url: "https://m.chaturbate.com/lilypixel/" },
    { no: "011",
      url: "https://m.chaturbate.com/sasha_ursx/" },
    { no: "300",
      url: "https://m.twitch.tv/rafaelariggs/home" },
    { no: "999",
     url: "video/xvideos.mp4" }
];

$(document).ready(function() {
    $("#video-stream").attr("width", sw);
    $("#video-stream").attr("height", sw);
    checkStatus();
});

var json = "";
var number = "";
$("#numbers button").click(function(e) {
    if (!e.target.value) {
       $(e.target).parent().trigger("click");
       return;
    }

    var value = e.target.value;
    number += value;
    playDialSound(parseInt(value));
    $("#number").text(number);

    if (number.length >= 3) {
        var search = contacts.filter(c => c.no == number);
        number = "";
        if (search.length == 0) return;
        if (search[0].url.includes("videos/")) {
            loadUploadedVideo(search[0].url);
            return;
        }
        calling.play();
        $.post("ajax/http-get.php", {
        url : search[0].url }, function(data) {
            if (search[0].url.includes("twitch")) {
                loadTwitchStream(data);
            }
            else {
                loadCbStream(data);
            }
        });
    }
});

setTimeout(function() {
    var timeStreaming = 
    new Date().getTime() - timeStarted;

    var hours = 
    Math.floor(timeStreaming / 3600000)
    .toString().padStart(2,"0");
    var minutes = 
    Math.floor((timeStreaming % 3600000) / 60000)
    .toString().padStart(2,"0");
    var seconds = 
    Math.floor((timeStreaming % 60000) / 1000)
    .toString().padStart(2,"0");
    
    /*
    $("#time-streaming").text(
    hours+":"+
    minutes+":"+
    seconds);*/
}, 1000);

$("#hang-phone").click(function() {
    $("#video-stream")[0].pause();
    $("#video-layer").hide();
});

$("#online-count").click(function() {
    $("#contact-list-modal").modal({
        keyboard: false
    });
});

var speaking = false;
function say(text) {
    if (!speaking) {
         speaking = true;
         var msg = new SpeechSynthesisUtterance();
         //msg.lang = "pt-BR";
         msg.lang = "en-US";
         //msg.lang = "ja-JP";
         //msg.lang = "ko-KR";
         //msg.lang = "cmn-CN";
         msg.text = text;
         msg.onend = function(event) {
              speaking = false;
         };
         window.speechSynthesis.speak(msg);
    }
}

function checkStatus() {
    var onlineCount = 0;
    for (var k = 0; k < (contacts.length-2); k++) {
        $.post("ajax/http-get.php", {
        url : contacts[k].url }, function(data) {
            var n = data
            .indexOf("window.initialRoomDossier = \"{");
            var x = data
            .indexOf("}\";");
            json = data.substring(n+29, x+1);

            var regex = /\\u([\d\w]{4})/gi;
            json = json.replace(regex, function (match, grp) {
                return String.fromCharCode(parseInt(grp, 16)); 
            });

            ///log("json: "+contacts[k].no, json);
            json = JSON &&
           JSON.parse(json) || $.parseJSON(json);

           contacts[k].json = json;
           if (json.hls_source.length > 0) {
               onlineCount++;
           }
           $("#online-count").text(
           onlineCount + "/" + (contacts.length-1)+ " online");
        });
    }
}

function loadCbStream(data) {
     var n = data
     .indexOf("window.initialRoomDossier = \"{");
     var x = data
     .indexOf("}\";");
     json = data.substring(n+29, x+1);

     var regex = /\\u([\d\w]{4})/gi;
     json = json.replace(regex, function (match, grp) {
        return String.fromCharCode(parseInt(grp, 16)); 
     });

     json = JSON &&
    JSON.parse(json) || $.parseJSON(json);

    if (json.hls_source.length > 0) {
        $("#video-layer").show();
        $("#broadcaster-username")
        .text(json.broadcaster_username);
        $("#video-stream").attr("src", 
        json.hls_source);
        $("#video-stream")[0].load();
        $("#video-stream")[0].play();

        timeStarted = new Date().getTime();
    }
    else {
        log("info", 
        json.broadcaster_username + " is Offline");
        say(json.broadcaster_username + " is Offline");
    }
}

function loadTwitchStream(data) {
    log("twitch", data);
}

function loadUploadedVideo(url) {
    $("#video-layer").show();
    $("#broadcaster-username").text(url);
    $("#video-stream").attr("src", url);
    $("#video-stream")[0].load();
    $("#video-stream")[0].play();
}

/* 
https://cbjpeg.stream.highwebmedia.com/stream?room=phoenix_taylor&f=0.013238023879617034
*/