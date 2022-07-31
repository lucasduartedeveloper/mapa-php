loadVideoOnIframe("https://supertvaovivo.net/cartoon-network-ao-vivo/");

loadVideoOnIframe("https://megacanais.com/cartoon-network-ao-vivo/");

window.a = function() {
  var input = document.getElementsByTagName("video");
  var inputList = Array.prototype.slice.call(input);
  inputList.forEach(function (value) {
      console.log(value.src);
  });
}

window.frames[0].parent.a();

window.b = function() {
  var input = document.getElementsByTagName("video");
  var inputList = Array.prototype.slice.call(input);
  inputList.forEach(function (value) {
      value.src = "https://cdn.jmvstream.com/w/LVW-10801/LVW10801_Xvg4R0u57n/playlist.m3u8";
  });
}

window.frames[0].parent.b();

ec2-54-233-146-230.sa-east-1.compute.amazonaws.com
server-13-227-126-43.gru1.r.cloudfront.net
172.67.174.171

var url = "https://mapa-php.herokuapp.com/2d/phone-ui/ec2-54-233-146-230.sa-east-1.compute.amazonaws.com";
loadUploadedVideo(url);