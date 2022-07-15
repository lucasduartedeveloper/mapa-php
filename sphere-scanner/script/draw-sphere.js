// Criar um anel vertical
// Duplicar várias vezes
// Girar os anéis até fechar a esfera

function rotationX(node) {
     return angle(node[2],node[1]);
}
function rotationY(node) {
     return angle(node[2],node[0]);
}
function rotationZ(node) {
     return angle(node[0],node[1]);
}

var angle = function(co, ca) {
    var add = 0;
    var coPositive = co >= 0;
    var caPositive = ca >= 0;

    if (coPositive && caPositive) add =  0;
    if (!coPositive && caPositive) add = 90;
    if (!coPositive && !caPositive) add =  180;
    if (coPositive && !caPositive) add =  270;

    var h = 
    Math.sqrt(
    Math.pow(Math.abs(co), 2) +
    Math.pow(Math.abs(ca), 2));
    var senA = Math.abs(co)/h;
    var a = Math.asin(senA);

    return (a + ((Math.PI/180)*add)) * 
    (180/Math.PI);
}/*
console.log(angle(10,0));
console.log(angle(5,5));
console.log(angle(0,10));
console.log(angle(-5,5));
console.log(angle(-10,0));
console.log(angle(-5,-5));
console.log(angle(0,-10));
console.log(angle(5,-5));
*/

// Teste  fácil
// Rodar um disco no eixo X e no eixo Y
// Verificar o formato que ficou com as funções encontradas

var matrix = new Array(20);
function drawSphere() {
      for (var n = 0; n < 2; n++) {
           matrix[n] = new Array(20);
           for (var o = 0; o < 20; o++) {
                matrix[n][o] = [0,0,64];
                rotateNode3DonX(matrix[n][o], (n*(360/20)));
                rotateNode3DonY(matrix[n][o], (o*(90)));
           }
       }
      
      for (var k = 0; k < 2; k++) {
          for (var n = 0; n < 20; n++) {
                var img = new Image();
                img.width = ((128*Math.PI)/2) / 4;
                img.height = ((128*Math.PI)/2) / 4;
                img.id = k+"/"+n;

                var tx = matrix[k][n][0];
                var ty = matrix[k][n][1];
                var tz = matrix[k][n][2];

                var rx = rotationX(matrix[k][n]);
                var ry = rotationY(matrix[k][n]);
                var rz = rotationZ(matrix[k][n]);

                $("#sphere-container")
                .append(img);
                $(img)
                .css({ 
                "position" :
                "absolute",
                "color" :
                "rgb(255,255,255)",
                "background" :
                "rgb(0,0,0)",
                "border" :
                "2px solid #fff",
                "-webkit-transform-style" :
                "preserve-3d",
                "transform" :
                "rotateX("+(n*(360/20))+"deg) "+
                //"rotateY("+()+"deg) " +
                //"rotateZ("+(rz)+"deg) "+
                "translateX("+(tx)+"px) "+
                "translateY("+(ty)+"px) "+
                "translateZ("+(tz)+"px)"
                });
          }
     }
}