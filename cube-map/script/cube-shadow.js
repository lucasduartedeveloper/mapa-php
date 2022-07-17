// nodes of cube
var node0 = [ 0, 0, 64 ];
var node1 = [ 0, 0, -64 ];
var node2 = [ 64, 0, 0 ];
var node3 = [ 0, -64, 0 ];
var node4 = [ -64, 0, 0 ];
var node5 = [ 0, 64, 0 ];

var light = [ 0, 0, 128 ];

var transformQuotient = Math.PI/180;

// nodes array
var nodes = [ node0, node1, node2, node3, node4, node5 ];

// rotates node by theta around x-axis
function rotateNode3DonX(node, theta) {
    var y = node[1];
    var z = node[2];
    
    theta *= transformQuotient;
    
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    
    var y = node[1];
    var z = node[2];
    
    node[1] = y * cosTheta - z * sinTheta;
    node[2] = y * sinTheta + z * cosTheta;
}

// rotates nodes by theta around x-axis
function rotateNodes3DonX(nodes, theta) {
    for(var n = 0; n < nodes.length; n++) {
        rotateNode3DonX(nodes[n], theta);
    }
}

// rotates node by theta around y-axis
function rotateNode3DonY(node, theta) {
    var x = node[0];
    var z = node[2];
    
    theta *= transformQuotient;
    
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    
    var x = node[0];
    var z = node[2];
    
    node[0] = x * cosTheta - z * sinTheta;
    node[2] = x * sinTheta + z * cosTheta;
}
   
// rotates nodes by theta around y-axis
function rotateNodes3DonY(nodes, theta) {
    for(var n = 0; n < nodes.length; n++) {
        rotateNode3DonY(nodes[n], theta);
    }
}

// rotates node by theta around z-axis
function rotateNode3DonZ(node, theta) {
    var x = node[0];
    var y = node[1];
    
    theta *= transformQuotient;
    
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    
    var x = node[0];
    var y = node[1];
    
    node[0] = x * cosTheta - y * sinTheta;
    node[1] = x * sinTheta + y * cosTheta;
}
   
// rotates nodes by theta around z-axis
function rotateNodes3DonZ(nodes, theta) {
    for(var n = 0; n < nodes.length; n++) {
        rotateNode3DonZ(nodes[n], theta);
    }
}

// light distance
// verificar qual poligono mais distante
var end = lightDistance(node1);
function lightDistance(node) {
    var x = Math.pow(light[0] - node[0], 2);
    var y = Math.pow(light[1] - node[1], 2);
    var z = Math.pow(light[2] - node[2], 2);
    return Math.sqrt(x+y+z);
}

function addShadow() {
    var tempNodes = [];
    for (var i = 0; i < nodes.length; i++) {
        tempNodes[i] = nodes[i].slice();
    }

    rotateNodes3DonX(tempNodes, cubeRotateX);
    rotateNodes3DonY(tempNodes, cubeRotateY);
    rotateNodes3DonZ(tempNodes, cubeRotateZ);

    var faces = $("#cube-container img");
    for (var k = 0; k < 6; k++) {
        var img = new Image();
        img.width = 128;
        img.height = 128;
        img.k = k;

        img.onload = function (e) {
            var cnv = document.createElement('canvas');
            cnv.width = 128;
            cnv.height = 128;
            var ctx = cnv.getContext('2d');

            var ld = (0.8 / end) * lightDistance(
            tempNodes[this.k]);
            ctx.fillStyle = "rgba(0,0,0,"+(ld.toFixed(1))+")";

            ctx.drawImage(this, 0, 0, 128, 128);
            ctx.fillRect(0, 0, 128, 128);
            faces[this.k].src = cnv.toDataURL();
        }
        var c = cube.filter(o => o.face_id == k);
        var n = c.length > 0 ? c[0].face_id : k;

        img.src = (k+1) > cube.length ? 
        baseImages[k] : 
        cube[n].base64;
    }
}

var canvas = document.getElementById("cube-container");
var ctx = canvas.getContext( '2d' );
canvas.width = 256;
canvas.height = 256;

function convertToIcon() {
     //nodes of cube
     var node0 = [ -128, -128, -128  ];
     var node1 = [ -128, -128,  128  ];
     var node2 = [ -128,  128, -128  ];
     var node3 = [ -128,  128,  128  ];
     var node4 = [  128, -128, -128  ];
     var node5 = [  128, -128,  128  ];
     var node6 = [  128,  128, -128  ];
     var node7 = [  128,  128,  128  ];

     // nodes array
     var nodes = [ node0, node1, node2, node3, node4,
     node5, node6, node7 ];

     rotateNodes3DonX(nodes, cubeRotateX);
     rotateNodes3DonY(nodes, cubeRotateY);
     rotateNodes3DonZ(nodes, cubeRotateZ);

     clearScreen();
     ctx.save();
     ctx.translate(128, 128);

     drawNodes(nodes);
     drawEdges(edges);
     rotateNodes3DonX(nodes, rotDegree);
     rotateNodes3DonZ(nodes, rotDegree);
     rotateNodes3DonY(nodes, rotDegree);

     ctx.restore();

     dataURL = canvas.toDataURL();
}

// edges of cube (wireframe, lines)
var edge0  = [0, 1];
var edge1  = [1, 3];
var edge2  = [3, 2];
var edge3  = [2, 0];
var edge4  = [4, 5];
var edge5  = [5, 7];
var edge6  = [7, 6];
var edge7  = [6, 4];
var edge8  = [0, 4];
var edge9  = [1, 5];
var edge10 = [2, 6];
var edge11 = [3, 7];

// edges array
var edges = [
    edge0  , edge1  , edge2  , edge3  ,
    edge4  , edge5  , edge6  , edge7  ,
    edge8  , edge9  , edge10 , edge11
];

var nodeColor = color(40 , 168, 107);
var edgeColor = color(34 ,  68, 204);
var nodeSize = 8;

// rgb color string helper function
function color(x, y, z) {
      var c = 'rgba(' + x + ',' + y + ',' + z + ',1)';
      return c;
}

// draw function
function clearScreen() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function point(x, y, color) {
       ctx.beginPath();
       ctx.rect(x, y, 1, 1);
       ctx.fillStyle = color;
       ctx.fill();
}

function circle(x, y, r, color) {
       ctx.beginPath();
       ctx.fillStyle = color;
       ctx.arc(x, y, r,0,2*Math.PI);
       ctx.fill();
};

function line(x1, y1, x2, y2, color) {
       ctx.beginPath();
       ctx.moveTo(x1, y1);
       ctx.lineTo(x2, y2);
       ctx.strokeStyle = color;
       ctx.stroke();
}

function drawNodes(nodes) {
       for(var n = 0; n < nodes.length; n++) {
              var node = nodes[n];

              var x = node[0];
              var y = node[1];
              // var z = node[2];        // we dont care z axis, we will use z parameter for rotation calculations
              circle(x, y, nodeSize, nodeColor);
       }
}

function drawEdges(edges) {
       for(var e = 0; e < edges.length; e++) {
             var edge = edges[e];

             var e1 = edge[0];
             var e2 = edge[1];

             var n1 = nodes[e1];
             var n2 = nodes[e2];

             var x1 = n1[0];
             var y1 = n1[1];

             var x2 = n2[0];
             var y2 = n2[1];

             line(x1, y1, x2, y2, edgeColor);
       }
}