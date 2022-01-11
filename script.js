console.log("script.js");

// Set the date we're counting down to
var countDownDate = new Date("Jan 9, 2022 15:00:00").getTime();

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

  // Display the resultghp
  document.getElementById("dias").innerHTML = days + "dias " + hours + "h "
  + minutes + "m " + seconds + "s ";

  document.getElementById("horas").innerHTML = (days * 24) + hours + "h "
  + minutes + "m " + seconds + "s ";

  document.getElementById("minutos").innerHTML = (((days * 24) + hours) * 60)
 + minutes + "m " + seconds + "s ";

  document.getElementById("segundos").innerHTML = (((((days * 24) + hours) * 60) + minutes) * 60) + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("dias").innerHTML = "EXPIRED";
    document.getElementById("horas").innerHTML = "EXPIRED";
    document.getElementById("minutos").innerHTML = "EXPIRED";
    document.getElementById("segundos").innerHTML = "EXPIRED";
    
    for(var k in monsters) {
         map.removeControl(monsters[k].marker);
     }
  }
}, 1000);

function play() {
  var audio = new Audio('/audio/thebusiness.mp3');
  audio.play();
}

$(document).ready(function() {
   console.log("document.ready");
   reload();
   //play();
  //document.body.requestFullscreen();
  $.getJSON( "/ajax/localizacao.php?lat=0&long=0", function(data) {
       map.setView([data.latitude, data.longitude], 17);
       marker.setLatLng(new L.LatLng(data.latitude, data.longitude));
       circle.setLatLng(new L.LatLng(data.latitude, data.longitude));
       rectangle.setBounds(circle.getBounds());
       console.log(JSON.stringify(data));
   });

$( "#target" ).click(function() {
    $.getJSON( "/ajax/localizacao.php?lat="+geolocation.latitude+"&long="+geolocation.longitude, function(data) {
       map.setView([data.latitude, data.longitude], 17);
       marker.setLatLng(new L.LatLng(data.latitude, data.longitude));
       circle.setLatLng(new L.LatLng(data.latitude, data.longitude));
       rectangle.setBounds(circle.getBounds());
       rectangle.redraw();
       console.log(JSON.stringify(data));
      //document.body.requestFullscreen();
    });
  });
});

$( "#menu" ).click(function() {
    $(".box2").toggle();
    console.log("toggle");
    reload();
});

$(document).on('change', ':radio[name="monster"]', function() {
    $('label').removeClass('active');
    $(this).filter(':checked').parent().addClass('active');
    var expr = $(this).filter(':checked').attr('id');
    var k = parseInt(expr.replace('monster', ''));
    monster = monsters[k];
});

function reload() {
      $.getJSON( "/ajax/localizacao_teste.php", function(data) {
      console.log(data);
      console.log("reload");
      var label1 = "";
      var label2 = "";
      var label3 = "";
      var label4 = "";
      var label5 = "";
      for(var k in data) {
           var icon = L.icon({
               iconUrl: data[k].png,
               shadowUrl: '/img/monster-shadow.png',
               iconSize:     [35, 40], // size of the icon
               shadowSize:   [50, 25], // size of the shadow
               iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
               shadowAnchor: [25, 10],  // the same for the shadow
               popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
          });
          data[k].marker = L.marker([data[k].latitude, data[k].longitude], {icon: icon}).addTo(map).bindPopup(data[k].nome);

           if (k <= 3) {
               label1 += "<label class=\"btn btn-outline-dark btn-sm\"><input type=\"radio\" name=\"monster\" id=\"monster"+k+"\" autocomplete=\"off\"><img class=\"icone\" src=\""+data[k].png+"\"/></label>";
           }
           else if (k <= 7) {
               label2 += "<label class=\"btn btn-outline-dark btn-sm\"><input type=\"radio\" name=\"monster\" id=\"monster"+k+"\" autocomplete=\"off\"><img class=\"icone\" src=\""+data[k].png+"\"/></label>";
           }
           else if (k <= 11) {
               label3 += "<label class=\"btn btn-outline-dasm\"><input type=\"radio\" name=\"monster\" id=\"monster"+k+"\" autocomplete=\"off\"><img class=\"icone\" src=\""+data[k].png+"\"/></label>";
           }
           else if(k <= 15) {
               label4 += "<label class=\"btn btn-outline-dark btn-sm\"><input type=\"radio\" name=\"monster\" id=\"monster"+k+"\" autocomplete=\"off\"><img class=\"icone\" src=\""+data[k].png+"\"/></label>";
           }
          else {
               label5 += "<label class=\"btn btn-outline-dark btn-sm\"><input type=\"radio\" name=\"monster\" id=\"monster"+k+"\" autocomplete=\"off\"><img class=\"icone\" src=\""+data[k].png+"\"/></label>";
           }
       }

       for(var k in monsters) {
           map.removeControl(monsters[k].marker);
       }

       monsters = data;
       $('#teste1').html(label1);
       $('#teste2').html(label2);
       $('#teste3').html(label3);
       $('#teste4').html(label4);
    });
}

$('#camera').click(function() {
   $('#camera').click();
   return;
  // get a reference to the file input
  const fileInput = document.querySelector("input");

  // get a reference to the output canvas
  const canvas = document.querySelector("canvas");

  // listen for the change event so we can capture the file
  fileInput.addEventListener("change", (e) => {
    // get a reference to the file
    const file = e.target.files[0];

    // let's load the image data
    cons14:06:1514:06:17t image = new Image();
    image.onload = () => {
      // use min size so we get a square
      const size = Math.min(image.naturalWidth, image.naturalHeight);

      // let's update the canvas size
      canvas.width = size;
      canvas.height = size;

      // draw image to canvas
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);

      // only draw image where mask is
      ctx.globalCompositeOperation = "destination-in";

      tá// draw our circle mask
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(
        size * 0.5, // x
        size * 0.5, // y
        size * 0.5, // radius
        0, // start angle
        2 * Math.PI // end angle
      );
      ctx.fill();

      // restore to default composite operation (is draw over current image)
      ctx.globalCompositeOperation = "source-over";

      // show canvas
      canvas.hidden = false;
    };
    image.src = URL.createObjectURL(file);
  });
});