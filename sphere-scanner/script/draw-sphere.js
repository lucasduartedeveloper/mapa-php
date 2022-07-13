// Criar um anel vertical
// Duplicar várias vezes
// Girar os anéis até fechar a esfera

function rotationX(node) {
     return angleX(node[1],node[2]);
}
function rotationY(node) {
     return angleY(node[0],node[2]);
}
function rotationZ(node) {
     return angleZ(node[0],node[1]);
}

function angleX(co, ca) {
    var h = 
    Math.sqrt(
    Math.pow(co, 2) +
    Math.pow(ca, 2));
    var senA = co/h;
    var a = Math.asin(senA);
    a = co == 0 && ca > 0 ?
    1.5707963267948966 * 2 : a;
    a = co < 0 && ca > 0 ?
    1.5707963267948966 * 2 - a : a;
    a = co > 0 && ca > 0 ?
    1.5707963267948966 * 2 - a : a;
    return a * (180/Math.PI);
}

function angleY(co, ca) {
    var h = 
    Math.sqrt(
    Math.pow(co, 2) +
    Math.pow(ca, 2));
    var senA = co/h;
    var a = Math.asin(senA);
    a = co == 0 && ca > 0 ?
    1.5707963267948966 * 2 : a;
    a = co > 0 && ca < 0 ?
    1.5707963267948966 * 2 - a : a;
    a = co < 0 && ca < 0 ?
    1.5707963267948966 * 2 - a : a;
    return a * (180/Math.PI);
}

function angleZ(co, ca) {
    var h = 
    Math.sqrt(
    Math.pow(co, 2) +
    Math.pow(ca, 2));
    var senA = co/h;
    var a = Math.asin(senA);
    a = co == 0 && ca > 0 ?
    1.5707963267948966 * 2 : a;
    a = co > 0 && ca < 0 ?
    1.5707963267948966 * 2 - a : a;
    a = co < 0 && ca < 0 ?
    1.5707963267948966 * 2 - a : a;
    return a * (180/Math.PI);
}

var matrix = new Array(8);
function drawSphere() {
      for (var n = 0; n < 8; n++) {
           matrix[n] = new Array(1);
           for (var o = 0; o < 8; o++) {
                matrix[n][o] = [0,0,64];
                rotateNode3DonX(matrix[n][o], (n*(360/8)));
                rotateNode3DonY(matrix[n][o], (o*(360/8)));
           }
       }
      
      for (var k = 0; k < 8; k++) {
          for (var n = 0; n < 8; n++) {
                var img = new Image();
                img.width = ((128*Math.PI)/2) / 4;
                img.height = ((128*Math.PI)/2) / 4;

                var tx = matrix[k][n][0];
                var ty = matrix[k][n][1];
                var tz = matrix[k][n][2];

                var rx = rotationX(matrix[k][n]);
                var ry = rotationY(matrix[k][n]);
                var rz = rotationZ(matrix[k][n]);

                log("rx", "co: "+ty+", ca: "+tz+", ry: "+rx+"deg");
                //log("ry", "co: "+tx+", ca: "+tz+", rx: "+ry+"deg");

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
                "translateX("+(tx)+"px) "+
                "translateY("+(ty)+"px) "+
                "translateZ("+(tz)+"px) "+
                "rotateX("+(rx)+"deg) "+
                "rotateY("+(ry)+"deg) "
                /*"rotateZ("+(rz)+"deg)"*/
                });
          }
     }
}