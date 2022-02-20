var gears {
    { id: "gear-0", posX: 0, posY: 0 },
    { id: "gear-1",posX: 0, posY: 0 },
    { id: "gear-2",posX: 0, posY: 0 },
}
var selected = gears[0];

$(document).ready(function() {
    $(".gear").on("touchstart", function(e) {
         console.log(e.target.id);
         selected = gears.filter((e) => e.id == e.target.id);
         console.log(selected);
    });
});