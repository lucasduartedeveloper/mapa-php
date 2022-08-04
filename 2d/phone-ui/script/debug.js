var debug = true;
var logTypesDisabled = [];

function disableLogs(type) {
     logTypesDisabled.push(type);
}

function log(type, info = false) {
    if (debug) {
        for (var k in logTypesDisabled) {
             if (type == logTypesDisabled[k]) {
                  return;
             }
        }
        console.log(type + " --------------");
        if (info) console.log(info);
    }
}