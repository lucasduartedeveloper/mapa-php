console.log("script.js");

// Set the date we're counting down to
var countDownDate = new Date("Jan 7, 2022 16:00:00").getTime();

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
           else {
               label2 += "<label class=\"btn btn-outline-dark btn-sm\"><input type=\"radio\" name=\"monster\" id=\"monster"+k+"\" autocomplete=\"off\"><img class=\"icone\" src=\""+data[k].png+"\"/></label>";
           }
       }

       for(var k in monsters) {
           map.removeControl(monsters[k].marker);
       }

       monsters = data;
       $('#teste1').html(label1);
       $('#teste2').html(label2);
    });
}