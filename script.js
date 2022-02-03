console.log("script.js");

// Set the date we're counting down to
var countDownDate = new Date("Feb 3, 2022 18:00:00").getTime();

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

  // Display the result
  document.getElementById("horas").innerHTML = seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("horas").innerHTML = "EXPIRED";
  }
}, 1000);

var pagina = 5;
$( "#menu" ).click(function() {
    
    pagina = pagina -1;
    pagina = pagina < 0 ? 5 : pagina;

    //console.log(pagina);

    switch (pagina) {
         case 0:
           $("#box1").hide();
           $("#box2").hide();
           $("#box3").hide();
           $("#box4").hide();
           $("#box5").hide();
         break;
         case 1:
           $("#box1").show();
           $("#box2").hide();
           $("#box3").hide();
           $("#box4").hide();
           $("#box5").hide();
         break;
         case 2:
           $("#box1").show();
           $("#box2").show();
           $("#box3").hide();
           $("#box4").hide();
           $("#box5").hide();
         break;
        case 3:
           $("#box1").show();
           $("#box2").show();
           $("#box3").show();
           $("#box4").hide();
           $("#box5").hide();
         break;
         case 4:
           $("#box1").show();
           $("#box2").show();
           $("#box3").show();
           $("#box4").show();
           $("#box5").hide();
         break;
         case 5:
           $("#box1").show();
           $("#box2").show();
           $("#box3").show();
           $("#box4").show();
           $("#box5").show();
         break;
    }

    $(this).addClass ("rotating-out");
    setTimeout(function() {  $("#menu").removeClass("rotating-out"); }, 1000);
});

$('#front').click(function() {
   location.reload();
});