var connectJson = {
   method: "connect",
   data: { 
       user: "__anonymous__tt0QRJ",
       password: { 
       username: "__anonymous__tt0QRJ",
       room: "anabel054",
       expire :1659295385,
       org: "A",
       sig:"e5f8e146f8bcabce6ebd67a1b90e839b14fd9fcf49ca0f993760ee74562c5571" }, 
       room: "anabel054",
       room_password:"3305f779c7ab67ade91baf16a5f21fd13e9938ec5aa4412f50d72934ba34dd11" }
};

var joinJson = {
   method: "joinRoom",
   data: { 
   room: "anabel054",
   exploringHashTag: "",
   source_name: "un" }
};

var msgJson = {
   method: "messageRoom",
   data: { 
   room: "emma_lu1",
   msg: "{\\\"m\\\":\\\"hi\\\",\\\"f\\\":\\\"\\\",\\\"c\\\":\\\"\\\",\\\"tid\\\":\\\"16593014434:38054\\\",\\\"sig\\\":\\\"eyJfX3Jvb21fdXNlcm5hbWUiOiJlbW1hX2x1MSIsIl9fdXNlcm5hbWUiOiJjYWRpbGxhYzE5NTgiLCJtIjoiaGkiLCJmIjoiZGVmYXVsdCIsImMiOiIiLCJpIjoiUVpaNFM2NUJOSEcyTkwiLCJ0aWQiOiIiLCJtZWRpYSI6W10sInVzZXIiOiJjYWRpbGxhYzE5NTgiLCJnZW5kZXIiOiJtIiwiaXNfbW9kIjpmYWxzZSwiaW5fZmFuY2x1YiI6ZmFsc2UsImlzX2ZvbGxvd2luZyI6ZmFsc2UsInRpcHBlZF90b25zX3JlY2VudGx5IjpmYWxzZSwidGlwcGVkX2Fsb3RfcmVjZW50bHkiOmZhbHNlLCJ0aXBwZWRfcmVjZW50bHkiOmZhbHNlLCJoYXNfdG9rZW5zIjpmYWxzZSwiWC1TcGFtIjp0cnVlLCJYLURlbmllZCI6IkR1cGxpY2F0ZSBtZXNzYWdlIG5vdCBzZW50LiIsIlgtU3VjY2Vzc2Z1bCI6dHJ1ZX0:1oIG6V:fLPvqrcaqSzFuWc6Y6prTQy5HRk\\\"}\"}}"
}};

function cbLogin() {
     $.ajax({
        url: "ajax/http-post.php",
        method: "POST",
        datatype: "json",
        data: { 
            url: "https://m.chaturbate.com",
            token: ""
        },
        beforeSend: function(xhr) {
        }})
        .done(function(data, status, xhr) {
        log("data", data);
        log("status", status);
    });
}

function checkStatus() {
    log("checkStatus", "");
    var cbList = contacts.filter(c => c.type == "cb");

    var total = 0;
    var onlineCount = 0;

    var cbCount = 0;
    var twCount = 0;
    var tvCount = 0;

    var html = "<ul>";
    for (var k = 0; k < cbList.length; k++) {

            if (autoAnswer &&
                autoNo != "ANY" &&
                autoNo != cbList[k].no) {
                continue;
            }

        setTimeout(function() {
        //log("this", this);
        $.ajax({
        url: "ajax/http-get.php",
        method: "POST",
        datatype: "json",
        data: { url : cbList[this].url },
        beforeSend: function(xhr) {
            xhr.k = this;
        }.bind(this)})
        .done(function(data, status, xhr) {
            cbList[xhr.k].data = data;
            //log("k", xhr.k);

            var n = data
            .indexOf("window.initialRoomDossier = \"{");

            var avatarImg = 
            cbList[xhr.k].avatar ? 
            "img/avatar/"+cbList[xhr.k].avatar : 
            "img/placeholder.png";

            if (n > 0) {
                var x = data
                .indexOf("}\";");
                var json = data.substring(n+29, x+1);

                var regex = /\\u([\d\w]{4})/gi;
                json = json.replace(regex, function (match, grp) {
                    return String.fromCharCode(parseInt(grp, 16)); 
                });

                json = JSON &&
               JSON.parse(json) || $.parseJSON(json);

               cbList[xhr.k].json = json;
               if (json.room_status == "public" &&
                  json.hls_source.length > 0) {
                  html += 
                  "<li type=\"cb\" onclick=\"handleDial('"+
                  cbList[xhr.k].no+"')\">"+
                 "<img src=\""+avatarImg+"\"/>"+
                 "<span class=\"live-indicator\">LIVE</span>"+
                  cbList[xhr.k].no+": "+
                  json.broadcaster_username+
                  " ("+json.num_viewers+")</li>";
                  onlineCount++;
                  $("#all-count").text(onlineCount);

                  cbCount++;
                  $("#cb-count").text(cbCount);
               }
               else { n = 1; }
           }
           if (n < 0 || n == 1) {
               var n = cbList[xhr.k].url.indexOf(".com/");
               var x = cbList[xhr.k].url.indexOf("/", n+5);

               html += 
               "<li type=\"cb\" "+
               "class=\"low-opacity\" onclick=\"setAuto('"+
               cbList[xhr.k].no+"')\">"+
               "<img src=\""+avatarImg+"\"/>"+
               cbList[xhr.k].no+": "+
               cbList[xhr.k].url.substring(n+5, x)+"</li>";
           }

           total++;
           //log("total",total);
           $("#online-count").text(
           onlineCount + "/" +total+ " online");
           $("#contact-list").html(html+"</ul>");

           filterList(listFilter);
        });}.bind(k),500*k);
    }

    var twList = contacts.filter(c => c.type == "tw");
    for (var k = 0; k < twList.length; k++) {
        setTimeout(function() {
        //log("this", this);
        $.ajax({
        url: "ajax/http-get.php",
        method: "POST",
        datatype: "json",
        data: { url : twList[this].url },
        beforeSend: function(xhr) {
            xhr.k = this;
        }.bind(this)})
        .done(function(data, status, xhr) {
            twList[xhr.k].data = data;

            var n = twList[xhr.k].url
            .indexOf(".tv/");
            var x = twList[xhr.k].url
            .indexOf("/", n+4);

            var channelName = 
            twList[xhr.k].url.substring(n+4, x);

            n = data.indexOf("</h3>");
            x = data.indexOf("</h3>");
            //channelName = data.substring(n+38, x+4);

            n = data.indexOf("tw-image-avatar");
            x = data.indexOf(".png", n);

            var avatarImg = "img/placeholder.png";
            avatarImg = data.substring(n+37, x+4);
            //log("avt-img", data.substring(n+33, x+4));

            n = data
            .indexOf("class=\"ScChannelStatusTextIndicator");
            x = data.indexOf("</p>", n);

            var online = n > 0 && 
            data.substring(n, x).toLowerCase().includes("live");
            //log("status-text", data.substring(n, x));

            n = data
            .indexOf("</span> with <span");
            n = data
            .indexOf(">", n+17);
            x = data.indexOf("viewers", n);

            var viewers = n > 0  && (x-n)<10 ? 
            data.substring(n+1, x-1).replace(",","") : -1;
            //log("viewers", data.substring(n, x));

            if (online && viewers >= 0) {
                html += 
                "<li type=\"tw\" "+
                "onclick=\"handleDial('"+
                twList[xhr.k].no+"')\">"+
                "<img src=\""+avatarImg+"\"/>"+  
                "<span class=\"live-indicator\">LIVE</span>"+
                twList[xhr.k].no+": "+
                channelName+" ("+viewers+")</li>";
                onlineCount++; 
                $("#all-count").text(onlineCount);

                twCount++;
                $("#tw-count").text(twCount);
            }
            else {
                html += 
                "<li type=\"tw\" "+
                "class=\"low-opacity\" onclick=\"handleDial('"+
                twList[xhr.k].no+"')\">"+
                "<img src=\""+avatarImg+"\"/>"+
                twList[xhr.k].no+": "+
                channelName+"</li>";
                onlineCount++;
            }
            total++;
            //log("total",total);
            $("#contact-list").html(html+"</ul>");
            $("#online-count").text(
            onlineCount + "/" +total+ " online");

            filterList(listFilter);
        });}.bind(k),500*k);
    }

   var tvList = contacts.filter(c => c.type == "tv");
    for (var k = 0; k < tvList.length; k++) {
        setTimeout(function() {
        //log("this", this);
        $.ajax({
        url: "ajax/http-get.php",
        method: "POST",
        datatype: "json",
        data: { url : tvList[this].url },
        beforeSend: function(xhr) {
            xhr.k = this;
        }.bind(this)})
        .done(function(data, status, xhr) {
            tvList[xhr.k].data = data;

            html += 
            "<li type=\"tv\"  onclick=\"handleDial('"+
            tvList[xhr.k].no+"')\">"+
            "<img src=\"img/placeholder.png\"/>"+
            tvList[xhr.k].no+": "+
            tvList[xhr.k].title+"</li>";
            onlineCount++;
            $("#all-count").text(onlineCount);

            tvCount++;
            $("#tv-count").text(tvCount);

            total++;
            //log("total",total);
            $("#online-count").text(
            onlineCount + "/" +total+ " online");
            $("#contact-list").html(html+"</ul>");

            filterList(listFilter);
        });}.bind(k),500*k);
    }
}

function sendList() {
    var list = contacts.filter(c => c.type != "command");
    for (var k in list) {
        list[k].data = "removed";
    }
    ws.send("PHONE-UI|" +
            playerId + "|CHANNEL-LIST|" +
            JSON.stringify(list));
}

function herokuGET(url, callback) {
    $.ajax({
        url: "ajax/http-get.php?url="+url,
        method: "GET"
    }).done(function(data, status, xhr) {
        callback(data);
    });
}

function download(filename, text) {
    /*text = text.replace("</body>", 
    "<script src=\"//cdn.jsdelivr.net/npm/eruda\"></script>"+
    "<script>eruda.init();</script></body>")*/
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.click();
}
