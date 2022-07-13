var html = "<img id=\"{id}\" />";
var matrix = [];

function drawSphere() {
     var sphere = "";
     for (var k = 0; k < 10; k++) {
          for (var n = 0; n < 10; n++) {
                sphere += html.replace("{id}", k+"-"+n);
          }
     }
     $("#sphere-container").html(sphere);
}