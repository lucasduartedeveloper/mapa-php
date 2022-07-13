var matrix = new Array(10);

// Criar um anel vertical
// Duplicar várias vezes
// Girar os anéis até fechar a esfera

function drawSphere() {
      for (var n = 0; n < 10; n++) {
           matrix[n] = new Array(10);
           for (var o = 0; o < 10; o++) {
                matrix[n][o] = [0,0,64];
                rotateNode3DonX(matrix[n][o], n*36);
                rotateNode3DonY(matrix[n][o], o*36);
           }
       }
      
      for (var k = 0; k < 10; k++) {
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
                "translateZ("+matrix[k][n][2]+"px) "
                /*"rotateX("+(k * 36)+"deg)"*/
                });
          }
     }

    
}