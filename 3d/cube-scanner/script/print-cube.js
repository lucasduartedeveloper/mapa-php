var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var cubeId = urlParams.get("cubeId");

$(document).ready(function() {
    loadCubeToPrint(cubeId);
});

function loadCubeToPrint(id) {
    $.getJSON("ajax/cube-face.php?cubeId="+id, 
    function(data) {

         var faces = $("#cube-container img");
         for (var k = 0; k < 6; k++) {
              var c = data.filter(o => o.face_id == k);

              faces[k].src = c.length == 0 ? 
              faces[k].src : 
              ( c[0].base64 ? c[0].base64 : 
              faces[k].src); // *
         }
         //setCubeInfo();

        log("get", data);
    });
}