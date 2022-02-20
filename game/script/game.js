var gears {
    { id: "gear-0", posX: 0, posY: 0 },
    { id: "gear-1",posX: 0, posY: 0 },
    { id: "gear-2",posX: 0, posY: 0 },
}
var gear = gears[0];

$(document).ready(function() {
    $(".gear").on{"touchstart", function(e) {
         console.log(e);
    });
});