var audioChunks;
function  recordAudio() {
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

function stopRecording() {
  rec.stop();
}