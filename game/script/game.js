var audio = new Audio("audio/heart-beat.wav");
audio.loop = true;

var music = false;
var musicStream = new Audio();
var musicStreamId = 0;
var musicStreamList = [];

var gears = [
    { id: "gear-0", pageX: 0, pageY: 0 },
    { id: "gear-1",pageX: 0, pageY: 0 },
    { id: "gear-2",pageX: 0, pageY: 0 }
];

var playerId = new Date().getTime();
var selected = gears[0];
var playing = false;

$(document).ready(function() {
   var jqxhr = $.getJSON("ajax/jpfm.json", function(data) {
        musicStreamList =data;
   });

   $("#music-info").on("dblclick", function() {
        music = !music;
        if (music) {
            $("#music-info").trigger("click");
        }
        else {
            $("#music-info").text("MUSIC: OFF");
            musicStream.pause();
        }
   });

   $("#music-info").on("click", function() {
        if (music) {
            musicStreamId += 1;
            musicStreamId = 
                musicStreamId < musicStreamList.length ?
                musicStreamId : 0; 

            musicStream.pause();
            musicStream = new Audio(
                musicStreamList[musicStreamId].streamingUrl);
            musicStream.play();

            $("#music-info").text("MUSIC: " +
                musicStreamList[musicStreamId].dial + " - " +
                musicStreamList[musicStreamId].name);
        }
   });

    audio.play();
    $(".gear").on("mousedown", function(e) {
         playing = true;
         selected = gears.filter((g) => g.id == e.target.id)[0];;

         $("#"+selected.id).removeClass("placed");
         selected.pageX = 
               e.originalEvent.touches[0].pageX;
         selected.pageY = 
               e.originalEvent.touches[0].pageY;
    });
    
    $(document.body).on("mousemove", function(e) {
         if (!playing) return false;

         selected.pageX = 
               e.originalEvent.touches[0].pageX;
         selected.pageY = 
               e.originalEvent.touches[0].pageY;
         
         $("#"+selected.id)
               .css("left", (selected.pageX-25)+"px");
         $("#"+selected.id)
               .css("top", (selected.pageY-25)+"px");
    });

   $(".gear").on("mouseup", function(e) {
         playing = false;
         ws.send("HEART|"+playerId+"|SET_GEARS|"+
                      JSON.stringify(gears));
         setGears();
    });

    ws.onmessage = function(e) {
        var msg = e.data.split("|");
        if (msg[0] == "HEART" &&
            playerId != msg[1]) {
            if (msg[2] == "GET_GEARS") {
                 ws.send("HEART|"+playerId+"|SET_GEARS|"+
                      JSON.stringify(gears));
            }
            else if (msg[2] == "SET_GEARS") {
                 gears = JSON.parse(msg[3]);
                 setGears();
            }
        }
    };

    ws.send("HEART|"+playerId+"|GET_GEARS");
});

function setGears() {
     var offset = $(".gears").offset();
     var x1 = offset.left;
     var x2 = offset.left + 150;
     var y1 = offset.top;
     var y2 = offset.top + 50;
     for (var k in gears) {
          if (!(gears[k].pageX >= x1 &&
                gears[k].pageX <= x2 &&
                gears[k].pageY >= y1 &&
                gears[k].pageY <= y2) &&
                gears[k].pageX > 0) {
                   
                audio.pause();
                $(".heart").removeClass("beat");
                $("#"+gears[k].id).removeClass("placed");
                $("#"+gears[k].id)
               .css("left", (gears[k].pageX-25)+"px");
               $("#"+gears[k].id)
               .css("top", (gears[k].pageY-25)+"px");
          }
          else { 
                $("#"+gears[k].id).addClass("placed");
                $("#"+gears[k].id).css("left","");
                $("#"+gears[k].id).css("top","");
         }
    }
    if ($(".placed").length == 3) {
         audio.play();
         $(".heart").addClass("beat");
    }
}
