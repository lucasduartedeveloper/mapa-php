var dial = [
    //new Audio("audio/phone-dial-0.wav"),
    new Audio("audio/phone-dial-1.mp3"),
    new Audio("audio/phone-dial-2.mp3"),
    new Audio("audio/phone-dial-3.mp3"),
    new Audio("audio/phone-dial-4.mp3"),
    new Audio("audio/phone-dial-5.mp3"),
    new Audio("audio/phone-dial-6.mp3"),
    new Audio("audio/phone-dial-7.mp3")
];

var ringing = new Audio("audio/phone-ringing.wav");
ringing.loop = true;

var calling = new Audio("audio/phone-dial-calling.mp3");
calling.loop = true;

var alarm = new Audio("audio/alarm.mp3");
alarm.loop = true;

function playRandomDialSound() {
    var n = Math.floor(Math.random() * 8);
    dial[n].play();
}

function playDialSound(n) {
    n = n > 6 ? 6 : n;
    dial[n].play();
}

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