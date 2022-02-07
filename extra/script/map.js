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

// Enviar o áudio para o banco de dados
var base64anterior = "";
function postAudio(nome, base64) {
      console.log("nome: " + nome);
      console.log("base64: " + base64);
      console.log("similaridade: " + compararStrings(base64anterior, base64) + "%");
      base64anterior = base64;
}

// Comparar duas strings
function compararStrings(a, b) {
       var maior = a.length > b.length ? a : b;
       var menor = a.length > b.length ? b : a;

       var soma = 0;
       for (var i = 0; i < maior.length; i++) {
            if (maior.charAt(i)  == maior.charAt(i)) {
                  soma++;
            }
       }
       return maior.length / 100 * soma;
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
                var nome = prompt("Nome:","");
                var base64data = reader.result;
                postAudio(nome, base64data);
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
