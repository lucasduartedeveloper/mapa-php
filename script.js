console.log("script.js");

// Set the date we're counting down to
var countDownDate = new Date("Jan 18, 2022 14:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  //days = days.toString().padStart(2, "0");
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  // Display the resul
  document.getElementById("horas").innerHTML = seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("horas").innerHTML = "EXPIRED";
  }
}, 1000);

var pagina = 4;
$( "#menu" ).click(function() {
    
    pagina = pagina -1;
    pagina = pagina < 0 ? 4 : pagina;

    console.log(pagina);

    switch (pagina) {
         case 0:
           $("#box1").hide();
           $("#box2").hide();
           $("#box3").hide();
           $("#box4").hide();
         break;
         case 1:
           $("#box1").show();
           $("#box2").hide();
           $("#box3").hide();
           $("#box4").hide();
         break;
         case 2:
           $("#box1").show();
           $("#box2").show();
           $("#box3").hide();
           $("#box4").hide();
         break;
        case 3:
           $("#box1").show();
           $("#box2").show();
           $("#box3").show();
           $("#box4").hide();
         break;
         case 4:
           $("#box1").show();
           $("#box2").show();
           $("#box3").show();
           $("#box4").show();
         break;
    }

    $(this).addClass ("rotating-out");
    setTimeout(function() {  $("#menu").removeClass("rotating-out"); }, 1000);
});

$('#front').click(function() {
   location.reload();
});

function saveImage() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {

        var filesToUpload = document.getElementById('camera').files;
        var file = filesToUpload[0];
        if (file) {

            var reader = new FileReader();
            // Set the image once loaded into file reader
            reader.onload = function(e) {
                var img = document.createElement("img");
                img.onload = function () {
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);

                    var MAX_WIDTH = 200;
                    var MAX_HEIGHT = 200;
                    var width = img.width;
                    var height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                    if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    var nome = prompt("NOME DA FOTO", "TESTE");
                    var dataurl = canvas.toDataURL(file.type);
                    //console.log(dataurl);
                    document.getElementById('output').src = dataurl;

                    $.post("/ajax/localizacao_teste_photo.php",
                    { nome: nome, png: dataurl })
                    .done(function(data) {
                       console.log(data);
                       reload();
                    });
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
}