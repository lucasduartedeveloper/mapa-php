function saveFrame(cameraId, base64) {
     $.post("ajax/camera.php", {
             cameraId: cameraId,
             base64: base64,
             }).done(function(data) { 
                     //console.log(data);
      });
}