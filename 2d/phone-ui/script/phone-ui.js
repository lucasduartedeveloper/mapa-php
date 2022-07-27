var playerId = new Date().getTime();

$(document).ready(function() {
    
});

var number = "";
$("#numbers button").click(function(e) {
    //log("click", e);
    //say(e.target.innerText);
    number += e.target.innerText;
    playDialSound(parseInt(e.target.innerText));
    $("#number").text(number);

    if (number.lengtht >= 11) {
        calling.play();
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