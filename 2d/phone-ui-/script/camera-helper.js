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
               var track = getVideoTracks()[0];
               var capabilities = track.getCapabilities();
               var settings = track.getSettings();

               vw = settings.width;
               vh = settings.height;
               vr = vh/vw;

               // Map zoom to a slider element.
               input.min = capabilities.zoom.min;
               input.max = capabilities.zoom.max;
               input.step = capabilities.zoom.step;
               input.value = settings.zoom;
               input.oninput = function(event) {
                   track.applyConstraints({advanced: [ {zoom: event.target.value} ]});
               }
               
               // Check whether zoom is supported or not.
               if (!('zoom' in settings)) {
                   log('Zoom is not supported by ' + track.label);
                   return;
               }
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