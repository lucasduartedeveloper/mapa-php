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