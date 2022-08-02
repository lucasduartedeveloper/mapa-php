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
    { no: "001", type: "cb",
     url: "https://m.chaturbate.com/littlee33/" },
    { no: "002", type: "cb",
     url: "https://m.chaturbate.com/jennycutey/" },
    { no: "003", type: "cb",
     url: "https://m.chaturbate.com/melnextd/" },
    { no: "004", type: "cb",
     url: "https://m.chaturbate.com/w0wgirls/" },
    { no: "005", type: "cb",
     url: "https://m.chaturbate.com/artoftease/" },
    { no: "006", type: "cb",
     url: "https://m.chaturbate.com/_blackbee_/" },
    { no: "007", type: "cb",
     url: "https://m.chaturbate.com/emyii/" },
    { no: "008", type: "cb",
     url: "https://m.chaturbate.com/anabel054/" },
    { no: "009", type: "cb",
     url: "https://m.chaturbate.com/iren_wagner/" },
    { no: "010", type: "cb",
      url: "https://m.chaturbate.com/lilypixel/" },
    { no: "011", type: "cb",
     url: "https://m.chaturbate.com/sasha_ursx/" },
    { no: "012", type: "cb",
     url: "https://m.chaturbate.com/girl_of_yourdreams/" },
    { no: "013", type: "cb",
     url: "https://m.chaturbate.com/mynameisnikki/" },
    { no: "014", type: "cb",
     url: "https://m.chaturbate.com/emma_lu1/" },
    { no: "015", type: "cb",
     url: "https://m.chaturbate.com/vany_love/" },
    { no: "016", type: "cb",
     url: "https://m.chaturbate.com/chroniclove/" },
    { no: "017", type: "cb",
     url: "https://m.chaturbate.com/uindi/" },
    { no: "018", type: "cb",
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
    { no: "300", type: "tw",
     url: "https://m.twitch.tv/rafaelariggs/home" },
    /*{ no: "301", type: "tw",
     url: "https://m.twitch.tv/woohankyung/home" },*/
    { no: "302", type: "tw",
     url: "https://m.twitch.tv/kandyland/home" },
    { no: "303", type: "tw",
     url: "https://m.twitch.tv/lydia_violet/home" },
    { no: "304", type: "tw",
     url: "https://m.twitch.tv/melina/home" },
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
    { no: "500", type: "tv", title: "SBT", 
     url: "https://cdn.jmvstream.com/w/LVW-10801/LVW10801_Xvg4R0u57n/playlist.m3u8" },
    { no: "501", type: "tv-iframe", title: "CARTOON",
     url: "https://megacanais.com/cartoon-network-ao-vivo/" },
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
    { no: "910", type: "uploaded-video", 
      url: "video/upload-test-3.abc" },
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
      url: "video/avril.mp4" }
];

var screens = "";
$(document).ready(function() {
    log("screen size", sw +"x"+ sh);

    $("#video-stream").attr("width", sw);
    $("#video-stream").attr("height", sw);
    $("#temporary-workaround").css("width", sw+"px");
    $("#temporary-workaround").css("height", sw+"px");

    $("#video-stream")[0].oncanplay = 
    function() {
        calling.pause();
        calling.currentTime = 0;
    };
    radio.oncanplay = 
    function() {
        radio.pause();
        radio.currentTime = 0;
    };
    
    if (sw>=sh) {
        $("#number, #numbers").hide();
    }
    else {
        checkStatus();
    }

    ws.send("PHONE-UI|" +
         playerId + "|" + 
         ((sw>sh) ? "CONTROLLER" : "SCREEN"));

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "PHONE-UI" &&
            playerId != msg[1]) {
            //log("ws", msg);
            if (msg[2] == "DIAL" && (sw>=sh)) {
                 handleDial(msg[3], false);
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
        var search = contacts.filter(c => c.no == number);
        lastContact = number;
        number = "";
        //log("search", search[0]);
        calling.play();
        if (search.length == 0) return;
        if (search[0].url.includes("audio/") ||
            search[0].type == "audio-stream") {
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
            loadVideoStream(search[0]);
            return;
        }
    }
}

var angle = 0;
setInterval(function() {
    /*angle++;
    $("#video-stream")
    .css("transform", "rotateZ("+angle+"deg)");*/

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
    
    /*log("time", 
    hours+":"+
    minutes+":"+
    seconds);*/

    $("#time-streaming").text(
    hours+":"+
    minutes+":"+
    seconds);
}, 1000);

$("#hang-phone").click(function() {
    audio.pause();
    $("#video-stream")[0].pause();
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
    }
    else {
        $("#video-stream").show();
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
    var cbList = 
    contacts.filter(c => c.type == "cb");

    var total = 0;
    var onlineCount = 0;
    var html = "<ul>";
    for (var k = 0; k < cbList.length; k++) {
        setTimeout(function() {
        //log("this", this);
        $.ajax({
        url: "ajax/http-get.php",
        method: "POST",
        datatype: "json",
        data: { url : cbList[this].url },
        beforeSend: function(xhr) {
            xhr.k = this;
        }.bind(this)})
        .done(function(data, status, xhr) {
            cbList[xhr.k].data = data;
            //log("k", xhr.k);

            var n = data
            .indexOf("window.initialRoomDossier = \"{");

            if (n < 0) return;
            var x = data
            .indexOf("}\";");
            var json = data.substring(n+29, x+1);

            var regex = /\\u([\d\w]{4})/gi;
            json = json.replace(regex, function (match, grp) {
                return String.fromCharCode(parseInt(grp, 16)); 
            });

            //log("json: "+contacts[k].no, json);
            json = JSON &&
           JSON.parse(json) || $.parseJSON(json);
            /*json.chat_password = JSON &&
           JSON.parse(json.chat_password) ||
           $.parseJSON(json.chat_password);*/

           cbList[xhr.k].json = json;
           if (json.hls_source.length > 0) {
               html += 
               "<li onclick=\"handleDial('"+
               cbList[xhr.k].no+"')\">"+
               "<img src=\"img/placeholder.png\"/>"+
               cbList[xhr.k].no+": "+
               json.broadcaster_username+"</li>";
               onlineCount++;
           }

           total++;
           //log("total",total);
           $("#online-count").text(
           onlineCount + "/" +total+ " online");
           $("#contact-list").html(html+"</ul>");
        });}.bind(k),500*k);
    }

    var twList = contacts.filter(c => c.type == "tw-");
    for (var k = 0; k < twList.length; k++) {
        setTimeout(function() {
        //log("this", this);
        $.ajax({
        url: "ajax/http-get.php",
        method: "POST",
        datatype: "json",
        data: { url : twList[this].url },
        beforeSend: function(xhr) {
            xhr.k = this;
        }.bind(this)})
        .done(function(data, status, xhr) {
            twList[xhr.k].data = data;

            var n = twList[xhr.k].url
            .indexOf(".tv/");
            var x = twList[xhr.k].url
            .indexOf("/", n+4);

            var channelName = 
            twList[xhr.k].url.substring(n+4, x);

            n = data.indexOf("</h3>");
            x = data.indexOf("</h3>");
            //channelName = data.substring(n+38, x+4);

            n = data.indexOf("tw-image-avatar");
            x = data.indexOf(".png", n);

            var avatarImg = "img/placeholder.png";
            avatarImg = data.substring(n+38, x+4);
            //log("avt-img", data.substring(n+33, x+4));

            n = data
            .indexOf("class=\"ScChannelStatusTextIndicator");
            x = data.indexOf("</p>", n);

            var online = 
            data.substring(n, x).includes("LIVE");
            //log("status-text", data.substring(n, x));

            if (online) {
                html += 
                "<li onclick=\"handleDial('"+
                twList[xhr.k].no+"')\">"+
                "<img src=\""+avatarImg+"\"/>"+
                twList[xhr.k].no+": "+
                channelName+"</li>";
                onlineCount++;

                total++;
                //log("total",total);
                $("#contact-list").html(html+"</ul>");
            }
            $("#online-count").text(
            onlineCount + "/" +total+ " online");
        });}.bind(k),500*k);
    }

   var tvList = contacts.filter(c => c.type == "tv");
    for (var k = 0; k < tvList.length; k++) {
        setTimeout(function() {
        //log("this", this);
        $.ajax({
        url: "ajax/http-get.php",
        method: "POST",
        datatype: "json",
        data: { url : tvList[this].url },
        beforeSend: function(xhr) {
            xhr.k = this;
        }.bind(this)})
        .done(function(data, status, xhr) {
            tvList[xhr.k].data = data;

            html += 
            "<li onclick=\"handleDial('"+
            tvList[xhr.k].no+"')\">"+
            "<img src=\"img/placeholder.png\"/>"+
            tvList[xhr.k].no+": "+
            tvList[xhr.k].title+"</li>";
            onlineCount++;

            total++;
            //log("total",total);
            $("#online-count").text(
            onlineCount + "/" +total+ " online");
            $("#contact-list").html(html+"</ul>");
        });}.bind(k),500*k);
    }
}

var connectJson = {
   method: "connect",
   data: { 
       user: "__anonymous__tt0QRJ",
       password: { 
       username: "__anonymous__tt0QRJ",
       room: "anabel054",
       expire :1659295385,
       org: "A",
       sig:"e5f8e146f8bcabce6ebd67a1b90e839b14fd9fcf49ca0f993760ee74562c5571" }, 
       room: "anabel054",
       room_password:"3305f779c7ab67ade91baf16a5f21fd13e9938ec5aa4412f50d72934ba34dd11" }
};

var joinJson = {
   method: "joinRoom",
   data: { 
   room: "anabel054",
   exploringHashTag: "",
   source_name: "un" }
};

var msgJson = {
   method: "messageRoom",
   data: { 
   room: "emma_lu1",
   msg: "{\\\"m\\\":\\\"hi\\\",\\\"f\\\":\\\"\\\",\\\"c\\\":\\\"\\\",\\\"tid\\\":\\\"16593014434:38054\\\",\\\"sig\\\":\\\"eyJfX3Jvb21fdXNlcm5hbWUiOiJlbW1hX2x1MSIsIl9fdXNlcm5hbWUiOiJjYWRpbGxhYzE5NTgiLCJtIjoiaGkiLCJmIjoiZGVmYXVsdCIsImMiOiIiLCJpIjoiUVpaNFM2NUJOSEcyTkwiLCJ0aWQiOiIiLCJtZWRpYSI6W10sInVzZXIiOiJjYWRpbGxhYzE5NTgiLCJnZW5kZXIiOiJtIiwiaXNfbW9kIjpmYWxzZSwiaW5fZmFuY2x1YiI6ZmFsc2UsImlzX2ZvbGxvd2luZyI6ZmFsc2UsInRpcHBlZF90b25zX3JlY2VudGx5IjpmYWxzZSwidGlwcGVkX2Fsb3RfcmVjZW50bHkiOmZhbHNlLCJ0aXBwZWRfcmVjZW50bHkiOmZhbHNlLCJoYXNfdG9rZW5zIjpmYWxzZSwiWC1TcGFtIjp0cnVlLCJYLURlbmllZCI6IkR1cGxpY2F0ZSBtZXNzYWdlIG5vdCBzZW50LiIsIlgtU3VjY2Vzc2Z1bCI6dHJ1ZX0:1oIG6V:fLPvqrcaqSzFuWc6Y6prTQy5HRk\\\"}\"}}"
}};

var sock = false;
function loadCbStream(json) {
    if (json && json.hls_source.length > 0) {
        sock = new SockJS(json.wschat_host);
        sock.onopen = function() {
            log("open", json.broadcaster_username);
            /*connectJson.data.user = 
            this.chat_password.username;*/
            connectJson.data.password = 
            this.chat_password;
            connectJson.data.room = 
            json.broadcaster_username;
            connectJson.data.room_password = 
            json.room_password;

            sock.send(JSON.stringify(connectJson));
        }.bind(json);
        sock.onmessage = function(e) {
           var msgJson = JSON.parse(e.data);
           if (msgJson.args[0] == "1") {
               log('message', msgJson); 
               joinJson.room =
               json.broadcaster_username;
               
               sock.send(JSON.stringify(joinJson));
               return;
           }
           if (msgJson.method == "onRoomMsg" &&
               msgJson.args[0] == this.broadcaster_username) {
               log('message', msgJson); 
           }
           //sock.close();
        }.bind(json);
        sock.onclose = function() {
           console.log("close", this.broadcaster_username);
        }.bind(json);

        $("#temporary-workaround").hide();
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

function loadTwitchStream(info) {    
    //log("twitch", info.data);
    download("teste.html", info.data);

    window.open(info.url, "_blank");
    //loadVideoOnIframe(info.url);
    timeStarted = new Date().getTime();
}

function loadVideoStream(info) {    
    //log("video", info.data);  
    //download("teste.html", info.data);
    
    $("#temporary-workaround").hide();
    $("#video-layer").show();
    $("#broadcaster-username").text(info.title);
    $("#video-stream").attr("src", 
    info.url);
    $("#video-stream")[0].load();
    $("#video-stream")[0].play();

    //loadVideoOnIframe(info.url);
    timeStarted = new Date().getTime();
}

function loadUploadedVideo(url) {
    $("#temporary-workaround").hide();
    $("#video-layer").show();
    $("#broadcaster-username").text(url);
    $("#video-stream").attr("src", url);
    $("#video-stream")[0].load();
    $("#video-stream")[0].play();

    timeStarted = new Date().getTime();
}

function loadAudio(url) {
    audio.pause();
    audio.src = url;
    audio.play();
}

function loadVideoOnIframe(url) {  
    $("#temporary-workaround").show();
    var iframe = 
    document.getElementById("temporary-workaround");
    iframe.src = url;
    $("#video-layer").show();
    $("#video-stream").hide();
}

function cropCircle() {
    var canvas = document
    .createElement("canvas");

    canvas.width = sw;
    canvas.height = sw;

    var context = canvas.getContext("2d");
    var video = document.getElementById("video-stream");

    context.drawImage(video, 0, 0);

    /*
    context
    .globalCompositeOperation='destination-in';
    context.beginPath();
    context.arc(128/2,128/2,128/2,0,Math.PI*2);
    context.closePath();
    context.fill();*/
 
    $("li img").attr("src", canvas.toDataURL());
}

function download(filename, text) {
    text = text.replace("</body>", 
    "<script src=\"//cdn.jsdelivr.net/npm/eruda\"></script>"+
    "<script>eruda.init();</script></body>")
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.click();
}

var counter = 0;
var lastLightValue = 0;
window.addEventListener('devicelight', function(event) {
    //log("'devicelight'",event.value)
    // ------------ x --------
    counter++;
    $("#counter").text(event.value +":" + counter);

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

function cbLogin() {
     $.ajax({
        url: "ajax/http-post.php",
        method: "POST",
        datatype: "json",
        data: { 
            url: "https://m.chaturbate.com",
            token: ""
        },
        beforeSend: function(xhr) {
        }})
        .done(function(data, status, xhr) {
        log("data", data);
        log("status", status);
    });
}

/* 
https://cbjpeg.stream.highwebmedia.com/stream?room=phoenix_taylor&f=0.013238023879617034
*/