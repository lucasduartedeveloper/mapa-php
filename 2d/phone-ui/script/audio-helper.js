var dial = [
    new Audio("audio/phone-dial-0.wav"),
    new Audio("audio/phone-dial-1.mp3"),
    new Audio("audio/phone-dial-2.mp3"),
    new Audio("audio/phone-dial-3.mp3"),
    new Audio("audio/phone-dial-4.mp3"),
    new Audio("audio/phone-dial-5.mp3"),
    new Audio("audio/phone-dial-6.mp3"),
    new Audio("audio/phone-dial-7.mp3")
];

function playRandomDialSound() {
    var n = Math.floor(Math.random() * 8);
     dial[n].play();
}