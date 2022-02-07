// Create the map
var map = L.map('map').setView([0, 0], 13);

var tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVjYXNkdWFydGUxOTkyIiwiYSI6ImNreGZieWE3ODFwNTQyb3N0cW4zNHMxMG8ifQ.HXS54wWrm6wPz-29LVVRbg'
}).addTo(map);

// Teste REV.AI
function postRevAI(audio) {
$.ajax({
    url: "https://api.rev.ai/speechtotext/v1/jobs",
    method: "POST",
    dataType: "json",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
       media_url : audio,
       metadata : "Testando a API",
       transcriber: "machine",
       skip_diarization: false,
       skip_punctuation: false,
       remove_disfluencies: false,
       filter_profanity: false,
       speaker_channel_count: 1,
       language: "en"
    }),
    cache: false,
    beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader("Authorization", "Bearer 029FowJO3lbw_js27FMtDQwUmspDdatLDFSJWJCej9sktFwh3-Ik42HJIK9Yk_rDKySiRDzx6j5uYDB9CjwFPh_HwktTg");
    },
    success: function (data) {
         console.log(data); 
    },
    error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR);
         console.log(textStatus);
         console.log(errorThrown);
    }
});
}

var audioChunks;
var rec;
function recordAudio() {
  // This will prompt for permission if not allowed earlier
  navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream => {
      audioChunks = []; 
      rec = new MediaRecorder(stream);
      rec.ondataavailable = e => {
        console.log("recording");
        audioChunks.push(e.data);
        if (rec.state == "inactive"){
          var blob = new Blob(audioChunks,{type:'audio/x-mpeg-3'});
          var audio = new Audio(URL.createObjectURL(blob));
          audio.play();

          var reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onloadend = function() {
                var base64data = reader.result;                
                console.log(base64data);
                postRevAI(base64data);
          }

          //recordedAudio.src = URL.createObjectURL(blob);
          //recordedAudio.controls=true;
          //recordedAudio.autoplay=true;
          //audioDownload.href = recordedAudio.src;
          //audioDownload.download = 'mp3';
          //audioDownload.innerHTML = 'download';
       }
      }
    rec.start();  
    })
    .catch(e=>console.log(e));
}

var recording = false;
$("#mic").on("click", function(e) {
     if (!recording) {
          recording = true;
          $("#mic").addClass("active");
          $("#mic i").removeClass("bi-mic-mute-fill");
          $("#mic i").addClass("bi-mic-fill");
          recordAudio();
     }
     else {
          recording = false;
          $("#mic").removeClass("active");
          $("#mic i").removeClass("bi-mic-fill");
          $("#mic i").addClass("bi-mic-mute-fill");
          rec.stop();
     }
});
