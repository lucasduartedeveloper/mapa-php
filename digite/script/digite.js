var words = [
   "CACHORRO",
   "GATO",
   "JACARÉ",
   "FLAMINGO",
   "DINOSSAURO",
   "MISERICÓRDIA"
];

$(document).ready(function() {
    var word = getRandomWord();
    var html = "";
    for (var k = 0; k < word.length; k++) {
         html += '<div class="letter">'+
         word.charAt(k)+
         '</div>';
    }
    $("#board").html(html);
});

function getRandomWord() {
    var n = Math.floor(Math.random() * words.length);
    return words[n];
}