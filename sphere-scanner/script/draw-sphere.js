var matrix = new Array(10);

// Criar um anel vertical
// Duplicar várias vezes
// Girar os anéis até fechar a esfera

function drawSphere() {
      for (var n = 0; n < 10; n++) {
           matrix[n] = new Array(10);
           for (var o = 0; o < 10; o++) {
                matrix[n][o] = [0,0,64];
                rotateNode3DonX(matrix[n][o], (n*18)*-1);
                rotateNode3DonY(matrix[n][o], (o*18)*-1);
           }
       }
      
      for (var k = 0; k < 10; k++) {
          for (var n = 0; n < 10; n++) {
                var img = new Image();
                img.width = ((128*Math.PI)/2) / 10;
                img.height = ((128*Math.PI)/2) / 10;

                var tx = matrix[k][n][0];
                var ty = matrix[k][n][1];
                var tz = matrix[k][n][2];

                $("#sphere-container")
                .append(img);
                $(img)
                .css({ 
                "position" :
                "absolute",
                "background" :
                "rgb("+(n*20)+","+(n*20)+","+(n*20)+")",
                "border" :
                "2px solid #fff",
                "-webkit-transform-style" :
                "preserve-3d",
                "transform" :
                "translateX("+tx+"px) "+
                "translateY("+ty+"px) "+
                "translateZ("+tz+"px) "+
                "rotateX("+((k*18)*-1)+"deg) "+
                "rotateY("+(n*18)+"deg)"
                });
          }
     }

    
}