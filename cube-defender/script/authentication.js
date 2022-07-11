var authenticated = false;
var maxBrightness = 0;

function authenticate(data) {
    for (var i = 0; i < data.length; i += 4) {
        var brightness = 0.34 * data[i] + 
        0.5 * data[i + 1] + 0.16 * data[i + 2];
        // red
        data[i] = brightness;
        //lightData[i] = 
        //brightness > 200 ? brightness : 0;
        // green
        data[i + 1] = brightness;
        //lightData[i + 1] = 
        //brightness > 200 ? brightness : 0;
        // blue
        data[i + 2] = brightness;
        //lightData[i + 2] = 
        //brightness > 200 ? brightness : 0;
        
        if (brightness > maxBrightness) {
        maxBrightness = brightness;
        //light.x = Math.floor(i/4) % 100;
        //light.y = Math.floor(i/4) / 100;
    }
    
    authenticated = 
    maxBrightness == 255 ||
    maxBrightness == 0;
    
    if (authenticated) {
        notification.play();
        getXYZ();
        listCubes();
        getCube(0);
    }
}