var arrayOfColorFunctions = 
"0123456789abcdef".split('');
function randomColor() {
    var randomColorString = "#";
    for (var x = 0; x < 6; x++) {
        var index = Math.floor(Math.random() * 16);
        var value = arrayOfColorFunctions[index];
        randomColorString += value;
    }
    return randomColorString;
}
function gradientColor(n, total) {
    var colorString = "rgb(";
    for (var x = 0; x < 3; x++) {
        var value = Math.floor((255/total)*n);
        colorString += value;
        colorString += x < 2 ? "," : "";
    }
    return colorString+")";
}