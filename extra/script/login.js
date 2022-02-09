// LOGIN
var myStorage = window.localStorage;
var cor = myStorage.getItem("cor");
$(document).ready(function() {
     if (cor) {
          cor = prompt("1 - Azul, 2 - Preto, 3 -Amarelo, 4 - Roxo","");
          myStorage.setItem("cor", cor);
     }
});

