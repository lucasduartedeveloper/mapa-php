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