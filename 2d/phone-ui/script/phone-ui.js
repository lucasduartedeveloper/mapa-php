var playerId = new Date().getTime();

var contacts = [
    { no: "11999999999",
     url: "https://m.chaturbate.com/ronny_ponny/" },
    { no: "11999999999",
     url: "https://m.chaturbate.com/littlee33/" }
];

$(document).ready(function() {
    
});

var number = "";
$("#numbers button").click(function(e) {
    //log("click", e);
    //say(e.target.innerText);
    number += e.target.innerText;
    playDialSound(parseInt(e.target.innerText));
    $("#number").text(number);

    if (number.length >= 11) {
        calling.play();
        $.post("ajax/http-get.php", {
        url : contacts[1].url }, function(data) {
            var unescapedData = unescape(data);
            log("php", unescapedData);
            var n = unescapedData.indexOf("hls_source");
            log("n", n);
            //var x = unescapedData.indexOf("hls_source");
            //var hlsSource = unescapedData.substring(n, 
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