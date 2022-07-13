var matrix = [];

function drawSphere() {
     for (var k = 0; k < 10; k++) {
          for (var n = 0; n < 10; n++) {
                matrix[k] = [];
                matrix[k][n] = [0,0,64];
                rotateNode3DonX(matrix[k][n], k*36);

                var img = new Image();
                img.width = 128 / 10;
                img.height = 128 / 10;

                $("#sphere-container")
                .append(img);
                $(img)
                .css({ 
                "position" :
                "absolute",
                "background" :
                "#ccc",
                "-webkit-transform-style" :
                "preserve-3d",
                "transform" :
                "translateZ("+matrix[k][n][2]+"px) "+
                "translateY("+matrix[k][n][1]+"px) "+
                "rotateY("+(k * 36)+"deg)"
                });
          }
     }

    
}