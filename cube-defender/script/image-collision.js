var key = [
    { match: false, url: "img/key/front.png" },
    { match: false, url: "img/key/back.png" },
    { match: false, url: "img/key/left.png" },
    { match: false, url: "img/key/top.png" },
    { match: false, url: "img/key/right.png" },
    { match: false, url: "img/key/bottom.png" },
];

function collideImage(faceId, data) {
    var cnv = document.createElement('canvas');
    var ctx = cnv.getContext('2d');
    var img = new Image();
    var matchPercentage = 0;

    img.onload = function (e) {
         ctx.drawImage(img, 0, 0, 10, 10);
         var keyData = ctx.getImageData(0, 0, 10, 10).data;
         for (var i = 0; i < data.length; i += 4) {
            // red
            var red = (keydata[i] / 100) * data[i];
            // green
            var red = (keydata[i+1] / 100) * data[i+1];
            // blue
            var red = (keydata[i+2] / 100) * data[i+2];

            matchPercentage += (red + green + blue) / 3;
        }
        matchPercentage = 
        matchPercentage / (data.length / 4);
    }
    img.src = key[faceId].url;
}

function verifyKey() {
    for (var k in key) {
         if (!key[k].match)
             return false;
    }
    return true;
}