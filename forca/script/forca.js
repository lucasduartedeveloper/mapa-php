var word = "";

$(document).ready(function() {
    word = prompt("","");

    var html = "";
    for (var k = 0; k < word.length; k++) {
         html = '<span class="letter">'+
         word.charAt(k)+
         '</span>';
    }
    $("#board").html(html);
});