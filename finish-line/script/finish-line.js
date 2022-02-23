// Botão de gravação
$(document).ready(function() {
    var html = 
         "<div class=\"black\"></div>" +
         "<div class=\"white\"></div>";
    for (var k = 0; k < 20; k++) {
         $(".finish-line").html(
         $(".finish-line").html() + html);
    }
});