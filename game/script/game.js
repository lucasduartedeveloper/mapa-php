var gears = [
    { id: "gear-0", pageX: 0, pageY: 0 },
    { id: "gear-1",pageX: 0, pageY: 0 },
    { id: "gear-2",pageX: 0, pageY: 0 }
];
var selected = gears[0];
var playing = false;

$(document).ready(function() {
    $(".gear").on("touchstart", function(e) {
         playing = true;
         console.log(e.target.id);
         selected = gears.filter((e) => e.id == e.target.id);
         console.log(selected);

         selected.pageX = 
               e.originalEvent.touches[0].pageX;
         selected.pageY = 
               e.originalEvent.touches[0].pageY;
         console.log(selected);
    });
    
    $(".gear").on("touchmove", function(e) {
         selected.pageX = 
               e.originalEvent.touches[0].pageX;
         selected.pageY = 
               e.originalEvent.touches[0].pageY;
         console.log(selected);
         
         $("#"+selected.id)
               .css("position", "fixed");
         $("#"+selected.id)
               .css("left", selected.pageX+"x");
         $("#"+selected.id)
               .css("top", selected.pageY+"x");
    });
});

