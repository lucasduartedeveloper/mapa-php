var matrix = [];

function drawSphere() {
     var img = new Image();
     img.width = 128 / 10;
     img.height = 128 / 10;

     for (var k = 0; k < 10; k++) {
          for (var n = 0; n < 10; n++) {
                $("#sphere-container")
                .append(img);
                $(img)
                .css({ 
                "position" :
                "absolute",
                "width" :
                "13px",
                "height" :
                "13px",
                "background" :
                "#ccc",
                "-webkit-transform-style" :
                "preserve-3d",
                "transform" :
                "translateZ(64px) rotateY("+(k * 36)+"deg)"
                });
          }
     }
}