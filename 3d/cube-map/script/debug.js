var debug = false;
var logTypesDisabled = [];

function disableLogs(type) {
     logTypesDisabled.push(type);
}

function log(type, info) {
    if (debug) {
        for (var k in logTypesDisabled) {
             if (type == logTypesDisabled[k]) {
                  return;
             }
        }
        console.log(type + " --------------");
        console.log(info);
    }
}