var matrix = [];

function drawSphere() {
     for (var k = 0; k < 10; k++) {
          for (var n = -5; n < 5; n++) {
                var img = new Image();
                img.width = 128 / 10;
                img.height = 128 / 10;

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
                "translateZ(64px) "+
                "translateY("+(n*13)+"px) "+
                "rotateX("+(k * 36)+"deg)"
                });
          }
     }
}