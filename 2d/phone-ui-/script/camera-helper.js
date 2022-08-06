var videoDevices = [];
if (navigator.mediaDevices) {
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
         if (device.kind == "videoinput")
         videoDevices.push({
             kind: device.kind,
             label: device.label,
             deviceId: device.deviceId
         });
      });
    })
    .catch(function(err) {
      console.log(err.name + ": " + err.message);
    });
}

var deviceNo = 1;
function startCamera(no = 1) {
    deviceNo = no;
    timeStarted = new Date().getTime();

     if (navigator.mediaDevices) {
          navigator.mediaDevices
          .getUserMedia({ 
          video: {
          deviceId: { 
               exact: videoDevices[deviceNo].deviceId
          } }, 
          audio: false })
          .then((stream) => {
               loadVideoStream({
                   title: "CAMERA",
                   url: stream,
                   type: "camera"
               });
               var track = stream.getVideoTracks()[0];
               var settings = track.getSettings();

               vw = settings.width;
               vh = settings.height;
               vr = vh/vw;
          });
     }
}
function stopCamera() {
     for (var k in streams) {
        if (streams[k].type == "camera")
           streams[k].srcObject
           .getTracks()
           .forEach(t => t.stop());
     };
}

function getZoom() {
    for (var k in streams) {
        if (streams[k].type == "camera")
           log("stream", streams[k].srcObject
           .getVideoTracks()[0]);
           var track = streams[k].srcObject.getVideoTracks()[0];
           var capabilities = track.getCapabilities();

           // Map zoom to a slider element.
           window.minZoom = capabilities.zoom.min;
           window.maxZoom = capabilities.zoom.max;
           window.zoomStep = capabilities.zoom.step;
           window.zoomValue = settings.zoom;
    };
}
function setZoom(value) {
    for (var k in streams) {
        if (streams[k].type == "camera")
           streams[k].srcObject
           .applyConstraints(
           {advanced: [ {zoom: event.target.value} ]});
    };
}