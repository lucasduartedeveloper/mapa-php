var word = "";

$(document).ready(function() {
    word = prompt("","");

    var html = "";
    for (var k = 0; k < word.length; k++) {
         html += '<div class="letter">'+
         word.charAt(k)+
         '</div>';
    }
    $("#board").html(html);
});