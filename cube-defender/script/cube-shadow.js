var shadow = new Image();
shadow.width = 256;
shadow.height = 256;
shadow.src = "img/gradient.png";

function addShadow() {
    var cnv = document.createElement('canvas');
    cnv.width = 128;
    cnv.height = 128;
    var ctx = cnv.getContext('2d');
    
    var faces = $("#cube-container img");
    for (var k = 0; k < 6; k++) {
        var img = new Image();
        img.width = 128;
        img.height = 128;
        img.k = k;
    
        img.onload = function (e) {
             ctx.drawImage(this, 0, 0, 128, 128);
             ctx.drawImage(shadow, -64, 64, 256, 256);

             faces[img.k].src = cnv.toDataURL();
        }
        img.src = (k+1) > cube.length ? 
        baseImages[k] : 
        cube[k].base64;
    }
}