var matrix = [];

function drawSphere() {
     for (var k = 0; k < 10; k++) {
          for (var n = 0; n < 10; n++) {
                matrix[k] = [];
                matrix[k][n] = [0,0,64];
                rotateNode3DonX(matrix[k][n], k*36);
                for (var o = 0; o < 10; o++) {
                     matrix[n][o] = matrix[k][n];
                     rotateNode3DonY(matrix[n][o], k*36);
                }
          }
          
          for (var n = 0; n < 10; n++) {
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
                "translateX("+matrix[k][n][0]+"px) "+
                "translateY("+matrix[k][n][1]+"px) "+
                "translateZ("+matrix[k][n][2]+"px) "+
                "rotateX("+(k * 36)+"deg)"
                });
          }
     }

    
}