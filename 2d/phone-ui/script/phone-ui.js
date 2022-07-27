var playerId = new Date().getTime();

var contacts = [
    { no: "11999999999",
     url: "https://m.chaturbate.com/ronny_ponny/" }
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
        var xhr = new XMLHttpRequest();
        xhr.open("GET", 
        contacts[0].url, true);
        xhr.onprogress = function () {
            log("GET", xhr.responseText);
            var n = xhr.responseText.indexOf("Offline");
            if (n > -1) {
                 
            }
        }
        xhr.send();
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