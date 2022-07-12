var authenticated = false;
var maxBrightness = 0;

function authenticate(data) {
    for (var i = (data.length/2); i <= (data.length/2); i += 4) {
        var brightness = 0.34 * data[i] + 
        0.5 * data[i + 1] + 0.16 * data[i + 2];

        $("#auth-footer").text(
        "rgb("+
        data[i] + "," + 
        data[i + 1]  + "," +
        data[i + 2] + 
         ")");        

        if (brightness > maxBrightness) {
            maxBrightness = brightness;
        }
    }

    authenticated = maxBrightness > 125;
    if (authenticated) {
        //notification.play();
        $("#authentication").hide();
        $("#cube-container").show();
        $("#dropdown").show();
        $("#video").width = 128;
        $("#video").height = 128;

        getXYZ();
        listCubes();
    }
}
