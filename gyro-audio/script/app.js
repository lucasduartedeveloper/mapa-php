var audio = new Audio(
"https:\/\/ice.fabricahost.com.br\/jovempanlondrina");

$(document).ready(function() {
    $("#power").click(function() {
       if (!audio.paused) {
          audio.play();
       }
       else {
          audio.pause();
       }
    });
    
    setInterval(function() {
       audio.volume = gyro.accY/9.8;
       $("#volume").text("VOLUME: "+
       gyro.accY/9.8);
    }, 100);
});