var audio = new Audio(
"https:\/\/ice.fabricahost.com.br\/jovempanlondrina");

$(document).ready(function() {
    audio.play();
    
    setInterval(function() {
       audio.volume = gyro.accY/9.8;
       $("#volume").text("VOLUME: "+
       gyro.accY/9.8);
    }, 100);
});