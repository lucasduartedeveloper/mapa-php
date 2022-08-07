var audio = new Audio("audio/heart-beat.wav");
var radio = new Audio();

var timeStarted = 0;

var sw = window.innerWidth;
var sh = window.innerHeight;
var playerId = new Date().getTime();

var lastContact = "";
var contacts = [
    { no: "000", type: "cb",
     url: "https://m.chaturbate.com/ronny_ponny/" },
    { no: "001", type: "cb", avatar: "littlee33.jpg",
     url: "https://m.chaturbate.com/littlee33/" },
    /*{ no: "002", type: "cb", avatar: "jennycutey.jpg",
     url: "https://m.chaturbate.com/jennycutey/" },*/
    { no: "003", type: "cb",
     url: "https://m.chaturbate.com/melnextd/" },
    { no: "004", type: "cb",
     url: "https://m.chaturbate.com/w0wgirls/" },
    { no: "005", type: "cb",
     url: "https://m.chaturbate.com/artoftease/" },
    { no: "006", type: "cb", avatar: "_blackbee_.jpg",
     url: "https://m.chaturbate.com/_blackbee_/" },
    { no: "007", type: "cb",
     url: "https://m.chaturbate.com/emyii/" },
    { no: "008", type: "cb", avatar: "anabel054.jpg", 
     url: "https://m.chaturbate.com/anabel054/" },
    { no: "009", type: "cb",
     url: "https://m.chaturbate.com/iren_wagner/" },
    { no: "010", type: "cb", avatar: "lillypixel.jpg",
      url: "https://m.chaturbate.com/lilypixel/" },
    { no: "011", type: "cb", avatar: "sasha_ursx.jpg",
     url: "https://m.chaturbate.com/sasha_ursx/" },
    { no: "012", type: "cb", avatar: "girl_of_yourdreams.jpg",
     url: "https://m.chaturbate.com/girl_of_yourdreams/" },
    { no: "013", type: "cb",
     url: "https://m.chaturbate.com/mynameisnikki/" },
    { no: "014", type: "cb", avatar: "emma_lu1.jpg",
     url: "https://m.chaturbate.com/emma_lu1/" },
    { no: "015", type: "cb",
     url: "https://m.chaturbate.com/vany_love/" },
    { no: "016", type: "cb",
     url: "https://m.chaturbate.com/chroniclove/" },
    { no: "017", type: "cb",
     url: "https://m.chaturbate.com/uindi/" },
    { no: "018", type: "cb", avatar: "emilygrey_.jpg",
     url: "https://m.chaturbate.com/emilygrey_/" },
    { no: "019", type: "cb",
     url: "https://m.chaturbate.com/princess_sofiaa/" },
    { no: "020", type: "cb",
     url: "https://m.chaturbate.com/_feli_/" },
    { no: "021", type: "cb",
     url: "https://m.chaturbate.com/milawolfy/" },
    { no: "022", type: "cb",
     url: "https://m.chaturbate.com/vanandjuani/" },
    { no: "023", type: "cb",
     url: "https://m.chaturbate.com/kimilee22/" },
    { no: "025", type: "cb",
     url: "https://m.chaturbate.com/kittycaitlin/" },
    { no: "026", type: "cb",
     url: "https://m.chaturbate.com/gia_baker/" },
    { no: "027", type: "cb",
     url: "https://m.chaturbate.com/pussy__money__weed/" },
    { no: "028", type: "cb",
     url: "https://m.chaturbate.com/eleonora_linn/" },
    { no: "300", type: "tw",
     url: "https://m.twitch.tv/rafaelariggs/home" },
    { no: "301", type: "tw",
     url: "https://m.twitch.tv/kjanecaron/home" },
    { no: "302", type: "tw",
     url: "https://m.twitch.tv/kandyland/home" },
    { no: "303", type: "tw",
     url: "https://m.twitch.tv/lydia_violet/home" },
    { no: "305", type: "tw",
     url: "https://m.twitch.tv/jinnytty/home" },
    { no: "306", type: "tw",
     url: "https://m.twitch.tv/paulanobre/home" },
    { no: "307", type: "tw",
     url: "https://m.twitch.tv/jinjinn00/home" },
    { no: "308", type: "tw",
     url: "https://m.twitch.tv/stpeach/home" },
    { no: "309", type: "tw",
     url: "https://m.twitch.tv/lorylives/home" }, 
    { no: "310", type: "tw",
     url: "https://m.twitch.tv/littlebunny_x/home" },
    { no: "500", type: "tv", title: "SBT", 
     url: "https://cdn.jmvstream.com/w/LVW-10801/LVW10801_Xvg4R0u57n/playlist.m3u8" },
    { no: "501", type: "tv", title: "TEST STREAM", 
     url: "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8" },
    { no: "550", type: "tv-iframe", title: "CARTOON",
     url: "https://megacanais.com/cartoon-network-ao-vivo/" },
    { no: "551", type: "tv-iframe", title: "DEAPOOL",
     url: "https://moviesjoy.best/deadpool/" },
    { no: "552", type: "tv-iframe", title: "VENOM",
     url: "https://moviesjoy.best/venom/" },
    { no: "553", type: "tv-iframe", title: "GLOBO",
     url: "https://megacanais.com/globo-sp-ao-vivo_/" },
    { no: "800", type: "audio-stream", 
     url: "https://ice.fabricahost.com.br/jovempanlondrina" },
    { no: "900", type: "uploaded-video", 
      url: "video/upload-test-0.abc" },
    { no: "901", type: "uploaded-video", 
      url: "video/upload-test-1.abc" },
    { no: "902", type: "uploaded-video", 
      url: "video/upload-test-2.abc" },
    { no: "903", type: "uploaded-video", 
      url: "video/upload-test-7.abc" },
    { no: "904", type: "uploaded-video", 
      url: "video/upload-test-8.abc" },
    /*{ no: "910", type: "uploaded-video", 
      url: "video/upload-test-3.abc" },*/
    { no: "911", type: "uploaded-video",
      url: "video/upload-test-4.abc" },
    { no: "912", type: "uploaded-video", 
      url: "video/upload-test-5.abc" },
    { no: "913", type: "uploaded-video", 
      url: "video/upload-test-6.abc" },
    { no: "950", type: "uploaded-video", 
      url: "video/iron-man-1-ending.abc" },
    { no: "951", type: "uploaded-video", 
      url: "video/pitty.mp4" },
    { no: "952", type: "uploaded-video", 
      url: "video/avril.mp4" },
    { no: "953", type: "uploaded-video", 
      url: "video/0-9.a-z" },
    { no: "990", type: "command", 
      command: sendList },
    { no: "991", type: "command", 
      command: function() { startCamera(0); } },
    { no: "992", type: "command", 
      command: function() { startCamera(1); } },
    { no: "993", type: "command", 
      command: function() { startCamera(2); } },
    { no: "994", type: "command", 
      command: function() { startCamera(3); } },
    { no: "995", type: "command", 
      command: function() { startCamera(4); } },
    { no: "999", type: "command",
      command: function() { alert("AVAILABLE"); } },
];

var screens = "";
$(document).ready(function() {
    log("screen size", sw +"x"+ sh);

    $("#video-stream, #video-js").attr("width", sw);
    $("#video-stream, #video-js").attr("height", sw*0.8);
    $("#temporary-workaround").css("width", sw+"px");
    $("#temporary-workaround").css("height", sw+"px");
    
    radio.oncanplay = 
    function() {
        radio.pause();
        radio.currentTime = 0;
    };

    var tv = 3.500;
    if (sw>=sh) {
        $("#app").css("width", (sw/tv)+"px");
        $("#app").css("height", (sh)+"px");
        $("#numbers, #number")
        .css("width", (sw/tv)+"px");
        $("#numbers button, #pointer")
        .css("width", ((sw/tv)*0.2)+"px");
        $("#numbers button, #pointer")
        .css("height", ((sw/tv)*0.2)+"px");
        $("#numbers button, #pointer")
        .css("margin", 
        ((sw/tv)*0.03)+"px "+((sw/tv)*0.05)+"px");
        ballRadius = ((sw/tv)*0.2);
        //$("#online-count").hide();
    }
    else {
        checkStatus();
    }
    $("#app").css("display", "flex");

    ws.send("PHONE-UI|" +
         playerId + "|" + 
         ((sh>sw) ? "CONTROLLER" : "SCREEN"));

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PHONE-UI" &&
            playerId != msg[1]) {
            //log("ws", msg);
            if (msg[2] == "DIAL") {
                 handleDial(msg[3], false);
            }
            if (msg[2] == "HANG-PHONE") {
                 $("#hang-phone").trigger("click", false);
            }
            if (msg[2] == "CRYSTAL-REMOVED" ||
                 msg[2] == "CRYSTAL-MOVED") {
                 moveCrystal(
                     parseInt(msg[3]), 
                     parseInt(msg[4]), false, 
                     parseInt(msg[5]), 
                     parseInt(msg[6]),
                 );
                 //alarm.play();
            }           
            if (msg[2] == "CRYSTAL-RETURNED") {
                 returnCrystal();
                 //alarm.pause();
                 //alarm.currentTime = 0;
            }
            if (msg[2] == "CHANNEL-LIST" && sw > sh) {
                 contacts = JSON.parse(msg[3]);
                 $("#online-count").text(
                 moment(new Date())
                 .format("DD/MM/YYYY HH:mm:ss"));
            }
            if (msg[2] == "REFRESH") {
                 location.reload();
            }
        }
    };
});

var number = "";
$("#numbers button").click(function(e) {
    if (!e.target.value) {
       $(e.target).parent().trigger("click");
       return;
    }
    var value = e.target.value;
    handleDial(value, true);
});

function handleDial(value, typed=false) {
    $("#contact-list-modal").modal("hide");
    if (typed) {
         ws.send("PHONE-UI|" +
              playerId + "|DIAL|" + value);
    }

    number += value;
    playDialSound(parseInt(value));
    $("#number").text(number);

    if (number.length >= 3) {
        lastContact = number;
        var search = contacts.filter(c => c.no == number);
        number = "";

        if (search.length == 0) return;
        calling.play();

        if (search[0].url &&
            (search[0].url.includes("audio/") ||
            search[0].type == "audio-stream")) {
            loadAudio(search[0].url);
            return;
        }
        if (search[0].type == "uploaded-video") {
            loadUploadedVideo(search[0].url);
            return;
        }
        if (search[0].type == "cb" && search[0].json) {
            loadCbStream(search[0].json);
            return;
        }
        if (search[0].type == "tw") {
            loadTwitchStream(search[0]);
            return;
        }
        if (search[0].type == "tv") {
            $("#broadcaster-msg").html("");
            loadVideoStream({
                title: search[0].title,
                url: search[0].url, 
                type: "'application/x-mpegURL"
            });
            return;
        }
        if (search[0].type == "tv-iframe") {
            $("#broadcaster-msg").html("");
            $("#broadcaster-username").text(search[0].title);
            loadVideoOnIframe(search[0].url);
            return;
        }
        if (search[0].type == "command" && typed) {
            calling.pause();
            calling.currentTime = 0;
            search[0].command();
            return;
        }
    }
}

var angle = 0;
motion = false;
setInterval(function() {
    angle++;
    $("#video-stream")
    .css("transform", "translateX("+
    (((gyro.accX/-18.6)*sw))
    +"px)");

    var timeWaiting = 
    new Date().getTime() - previousTimeStamp;

    var timeStreaming = 
    new Date().getTime() - timeStarted;

   $("#time-waiting").text(convertTime(timeWaiting));
   $("#time-streaming").text(convertTime(timeStreaming));
}, 1000);

function convertTime(time) {
    var hours = 
    Math.floor(time / 3600000)
    .toString().padStart(2,"0");
    var minutes = 
    Math.floor((time % 3600000) / 60000)
    .toString().padStart(2,"0");
    var seconds = 
    Math.floor((time % 60000) / 1000)
    .toString().padStart(2,"0");

    return hours+":"+minutes+":"+seconds;
}

var counter = 0;
var lastLightValue = 0;
window.addEventListener('devicelight', function(event) {
    //log("'devicelight'",event.value)
    // ------------ x --------
    counter++;
    $("#counter").text(event.value +":" + counter);

    if (value > 1000 && contactWaiting) {
       $("#answer-phone").trigger("click");
    }

    return;
    var value = event.value;
    if (value > 1000 && lastContact.length > 0) {
       handleDial(lastContact);
       lastContact = "";
    }
    else if (value > 1000) {
       $("#hang-phone").trigger("click");
    }
});

var autoNo = "ANY";
function setAuto(no) {
    $("#contact-list-modal").modal("hide");
    autoNo = no;
    checkStatus();
    log("auto", no);
    $("#auto").trigger("click");
}

var autoInterval = 0;
var autoAnswer = false;
var contactWaiting = false;
$("#auto").click(function() {
    autoAnswer = !autoAnswer;
    $("#auto")
    .text("AUTO"+
    (autoNo!="ANY"?" "+autoNo:"")+": "+
    (autoAnswer?"ON":"OFF"));
    if (autoAnswer) {
        autoInterval = setInterval(function() {
           var elapsed = 
           new Date().getTime() - previousTimeStamp;
           window.requestAnimationFrame(step);
           log("elapsed", elapsed);
           checkStatus();
           if (!contactWaiting) {
               handleBrowserState(false);
           }
       }, 10000);
    }
    else { 
       clearInterval(autoInterval); 
       autoNo = "ANY";
       checkStatus();
    }
});

var previousTimeStamp;
var screenActive = false;

function step(timestamp) {
   if (contactWaiting) {
      //handleBrowserState(true);

     var avatarImg = 
     contactWaiting.avatar ? 
     "img/avatar/"+contactWaiting.avatar : 
     "img/placeholder.png";

     $("#broadcaster-avatar").attr("src",
     avatarImg);

      $("#broadcaster-waiting-username").text(
      contactWaiting.json.broadcaster_username);
      $("#call-layer").show();
   }
   else { previousTimeStamp = new Date().getTime(); }
}

function handleBrowserState(isActive) {
   if (isActive && contactWaiting) {
      $("#auto").trigger("click");
      ringing.pause();
      ringing.currentTime = 0;
      log("answered", 
      contactWaiting.json.broadcaster_username);
      loadCbStream(contactWaiting.json);
      contactWaiting = false;
   }
   else {
      log("screen","off");
      for (var k in contacts) {
          if ((autoNo == "ANY" || contacts[k].no == autoNo) && 
              contacts[k].type == "cb" && 
              contacts[k].json &&
              contacts[k].json.room_status == "public") {
              contactWaiting = contacts[k];
              previousTimeStamp = new Date().getTime();
              //log("contactWaiting", contactWaiting);
              ringing.play();
              return;
          }
      }
   }
}

/* 
autoAnswer = true;
autoNo = "025";
checkStatus();

autoAnswer &&
autoNo != "ANY" &&
autoNo != contacts[24].no

var msg = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
$("#broadcaster-msg").html(
    "<i class=\"fa-solid fa-comment-dots\"></i>"+
    "&nbsp;"+msg
);

previousTimeStamp = new Date().getTime();
setAuto("010");
contactWaiting = contacts[10];

document.getElementsByTagName("video");

loadVideoOnIframe("https://moviesjoy.best/deadpool/");
loadVideoOnIframe("https://moviesjoy.best/venom/");

https://cbjpeg.stream.highwebmedia.com/stream?room=phoenix_taylor&f=0.013238023879617034
*/