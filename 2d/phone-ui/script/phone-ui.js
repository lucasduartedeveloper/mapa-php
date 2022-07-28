var playerId = new Date().getTime();

var contacts = [
    { no: "000",
     url: "https://m.chaturbate.com/ronny_ponny/" },
    { no: "001",
     url: "https://m.chaturbate.com/littlee33/" },
    { no: "002",
     url: "https://m.chaturbate.com/jennycutey/" } 
];

$(document).ready(function() {
    
});

var json = "";
var number = "";
$("#numbers button").click(function(e) {
    //log("click", e);
    //say(e.target.innerText);
    number += e.target.innerText;
    log("clicked",e);
    playDialSound(parseInt(e.target.innerText));
    $("#number").text(number);

    if (number.length >= 3) {
        var search = contacts.filter(c => c.no == number);
        number = "";
        if (search.length == 0) return;
        //log("search", search);
        calling.play();
        $.post("ajax/http-get.php", {
        url : search[0].url }, function(data) {
            //data = unescape(data);
            //log("php", data);
            var n = data
            .indexOf("window.initialRoomDossier = \"{");
            log("n", n);
            var x = data
            .indexOf("}\";");
            json = data.substring(n+29, x+1);

            var regex = /\\u([\d\w]{4})/gi;
            json = json.replace(regex, function (match, grp) {
                return String.fromCharCode(parseInt(grp, 16)); 
            });

            json = JSON &&
           JSON.parse(json) || $.parseJSON(json);

            //log("json", json);
            if (json.hls_source.length > 0) {
                $("#videoStream").attr("src", 
                json.hls_source);
                $("#videoStream").css("z-index","99999");
                $("#videoStream").show();
                $("#videoStream").load();
                $("#videoStream").play();
            }
            else {
               log("info", 
               json.broadcaster_username + " is Offline");
               say(json.broadcaster_username + " is Offline");
            }
        });
    }
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

/* 
https://cbjpeg.stream.highwebmedia.com/stream?room=phoenix_taylor&f=0.013238023879617034
*/