var playerId = new Date().getTime();

var contacts = [
    { no: "000",
     url: "https://m.chaturbate.com/ronny_ponny/" },
    { no: "001",
     url: "https://m.chaturbate.com/littlee33/" }
];

$(document).ready(function() {
    
});

var unescapedData = "";
var number = "";
$("#numbers button").click(function(e) {
    //log("click", e);
    //say(e.target.innerText);
    number += e.target.innerText;
    playDialSound(parseInt(e.target.innerText));
    $("#number").text(number);

    if (number.length >= 3) {
        var search = contacts.filter(c => c.no == number);
        if (search.length == 0) return;
        log("search", search);
        number = "";
        calling.play();
        $.post("ajax/http-get.php", {
        url : search[0].url }, function(data) {
            //data = unescape(data);
            log("php", data);
            var n = data
            .indexOf("window.initialRoomDossier = \"{");
            log("n", n);
            var x = data
            .indexOf("}\";");
            var json = unescape(
            data.substring(n+29, x+1));
            log("json", json);
        });
    }
});

var speaking = false;
function say(text) {
    if (!speaking) {
         speaking = true;
         var msg = new SpeechSynthesisUtterance();
         //msg.lang = "pt-BR";
         //msg.lang = "en-US";
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