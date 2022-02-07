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
function revAI() {
$.ajax({
    url: "https://api.rev.ai/speechtotext/v1/jobs",
    method: "POST",
    dataType: "json",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify({
       media_url : "https://www.rev.ai/FTC_Sample_1.mp3",
       metadata : "This is a sample submit jobs option" 
    }),
    cache: false,
    beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader("Authorization", "Bearer 02Bt2V6ID8LqsHOO6HyvGH-SCLbge8CHiLYROtMOjRAydDiv9eox0QqLErOKMSLEW24RTBoUjtjDo25qJnR28R8GUbB6s");
        xhr.setRequestHeader("X-Mobile", "false");
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