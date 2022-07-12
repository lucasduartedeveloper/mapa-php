// nodes of cube
var node0 = [ 0, 0, 1 ];
var node1 = [ 0, 0, -1 ];
var node2 = [ -1, 0, 0 ];
var node3 = [ 0, -1, 0 ];
var node4 = [ 1, 0, 0 ];
var node5 = [ 0, 1, 0 ];

var light = [ 0, 0, 2 ];

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
var end = lightDistance(node3);
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

    rotateNodes3DonX(tempNodes, rotateX);
    rotateNodes3DonY(tempNodes, rotateY);
    rotateNodes3DonZ(tempNodes, rotateZ);

    var faces = $("#cube-container img");
    for (var k = 0; k < 6; k++) {
        var cnv = document.createElement('canvas');
        cnv.width = 128;
        cnv.height = 128;
        var ctx = cnv.getContext('2d');

        var img = new Image();
        img.width = 128;
        img.height = 128;
        img.k = k;
        img.ctx = ctx;

        img.onload = function (e) {
            var ld = (0.5 / lightDistance(
            tempNodes[img.k])) * end;
            img.ctx.fillStyle = "rgba(0,0,0,"+(ld)+")";

            ctx.drawImage(this, 0, 0, 128, 128);
            ctx
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