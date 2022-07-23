var audio = new Audio(
"https:\/\/ice.fabricahost.com.br\/jovempanlondrina");

$(document).ready(function() {
    $("#power").click(function() {
       if (audio.paused) {
          audio.play();
       }
       else {
          audio.pause();
       }
    });
    
    setInterval(function() {
       var vol = gyro.accY/9.8;
       vol = vol > 1 ? 1 :
       vol < 0 ? 0 : vol;

       audio.volume = vol;
       $("#volume").text("VOLUME: "+vol);
    }, 100);
});