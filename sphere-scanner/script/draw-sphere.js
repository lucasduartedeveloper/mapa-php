var matrix = [];

function drawSphere() {
     var img = new Image();
     img.width = 128 / 10;
     img.height = 128 / 10;

     for (var k = 0; k < 10; k++) {
          for (var n = 0; n < 10; n++) {
                $("#sphere-container")
                .add(img)
                .css("transform",
                "translateZ(64) rotateY("+(-k * 36)+"deg)");
          }
     }
}