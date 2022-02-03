// Create the map
//var map = L.map('map').setView([51.505, -0.09], 13);
var map = L.map('map').setView([0, 0], 13);

var firstpolyline = new L.Polyline([]);
firstpolyline.addTo(map);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibHVjYXNkdWFydGUxOTkyIiwiYSI6ImNreGZieWE3ODFwNTQyb3N0cW4zNHMxMG8ifQ.HXS54wWrm6wPz-29LVVRbg'
}).addTo(map);

var  reguas = [];
var  itens = [];
var grid = [];
var cor = "#084B8A";

var faseAtual = 1;
var pontuacaoMinima = 4;

var audio = new Audio();
function play(file_path) {
   //return;
   file_path = file_path ? file_path : '/audio/game_notification.wav';
   //file_path = file_path ? file_path : '/audio/missile.mp3';
   audio.pause();
   audio = new Audio(file_path);
   audio.play(); 
   //$("#coin").addClass("animate");
   //setTimeout(function() {
   //$("#coin").removeClass("animate");
  //}, 2000);
}

function posicaoNoGrid(pos) {
  var inicio = { lat: -23.36026174491471, lng: -51.15455389022828 };

  var a = 0.000008993216088271083 * 5;
  var b = (inicio.lat - (pos.lat)) / a;
  var c = Math.floor(b) + 0.5;

  var d = 0.000009956626094265175 * 5;
  var e = (inicio.lng - (pos.lng)) / d;
  var f = Math.floor(e) + 0.5;

   /*
  console.log("- - -");
  console.log(inicio);
  console.log(pos);
  console.log("- - -");
  console.log(a);
  console.log(b);
  console.log(c);
  console.log("- - -");
  */

  pos.lat = inicio.lat + ((a * c) * -1);
  pos.lng = inicio.lng + ((d * f) * -1);

  //console.log(pos);
  return pos;
}

function reload() {
          //console.log("reload: " + moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));

         $.getJSON("/ajax/localizacao_gps_item.php", function(data) {

          var inventario = "";
          itemId = -1; // Someone
          
          for (var k in itens) {
             //map.removeControl(reguas[k].rectangle);
             map.removeControl(itens[k].marker);
             map.removeControl(itens[k].markerShadow);
          }
          itens = [];
          
          for (var k in data) {
             var hidden = data[k].latitude != 0 ? " hidden " : "";
             var html =  "<label "+hidden+" class=\"btn btn-outline-dark\"><input type=\"radio\" name=\"item\" id=\""+k+"\"><img class=\"icone\" src=\""+data[k].png+"\"/></label>";

             // Incluir barra de rolagem
             inventario += html;

             var item = {};

       // Marcador do item
       var itemIcon = L.icon({
            iconUrl: data[k].png,
            iconSize:     [35, 40], // size of the icon
            shadowSize:   [50, 25], // size of the shadow
            iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
            shadowAnchor: [25, 10],  // the same for the shadow
            popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
        });

       item.m = k;
       item.id = data[k].id;
       item.nome = data[k].nome;
       item.lat = data[k].latitude;
       item.lng = data[k].longitude;
       item.audio = data[k].audio;
       item.anotacao = data[k].anotacao;
       item.data_hora = data[k].data_hora;

       var dragend = function (e) {
            //console.log(this);
            itemId = this.m;
            onMapClick({ latlng: e.target.getLatLng(), type: "dragend" }); };
       var itemdragend = dragend.bind(item);

       item.marker = L.marker([data[k].latitude, data[k].longitude], {icon: itemIcon, draggable: true})
       .on("click", onMapClick)
       .on("dblclick", onMapClick)
       .on("dragend", itemdragend)
       .addTo(map)
       .bindPopup(item.anotacao);

       item.markerShadow = L.circle([data[k].latitude, data[k].longitude], {
                              color: "#581845",
		fillOpacity: 0.5,
        		radius: 2.5,
        		weight: 1,
        		stroke: false
	}).addTo(map);

         itens.push(item);
          }

         // INVENTÁRIO
         $("#inventario").html(inventario);

        // ---- Explosivo
        desenharControle();
        });

         $.getJSON("/ajax/localizacao_gps.php", function(data) {

         //console.log(data);
         for (var k in reguas) {
             map.removeControl(reguas[k].circle);
             map.removeControl(reguas[k].rectangle);
         }
         map.removeControl(firstpolyline);

         var pointList = [];
         var distancia = 0;
         var p = 0;
         for (var k in data) {
               data[k].latitude = parseFloat(data[k].latitude);
               data[k].longitude = parseFloat(data[k].longitude);

	data[k].circle = L.circle([data[k].latitude, data[k].longitude], {
                              color: data[k].cor,
		fillOpacity: 0,
        		radius: 2.25,
        		weight: 1,
        		stroke: false
	}).addTo(map);
               
	data[k].rectangle = 
               L.rectangle(data[k].circle.getBounds(), {
               color: data[k].cor, 
               	weight: 0,
               fillOpacity: 0.5
               }).addTo(map);

               if (data[k].cor == cor) {
               pointList.push(new L.LatLng(data[k].latitude, data[k].longitude));

               if (p > 0) {
                    distancia += pointList[p-1].distanceTo(pointList[p]);
               }
               p = p + 1;
               }
        }

        reguas = data;
        if (reguas.length > 0) {
               onMapClick({latlng: {
                      lat: reguas[0].latitude,
                      lng: reguas[0].longitude
               }});
        }

        firstpolyline = new L.Polyline(pointList, {
            color: cor,
            weight: 3,
            opacity: 0.8,
            smoothFactor: 1
        });
        firstpolyline.addTo(map);

        $(".distancia").text(Math.floor(distancia * 100) + " cm");
      });

      $.getJSON("/ajax/localizacao_gps.php?select=true", function(data) {

            var label1 = "";
            var label2 = "";
            var label3 = "";

            for (var k in data) {

            var html = "<label class=\"btn btn-outline-dark btn-sm\"><input type=\"radio\" display=\"none\" name=\"cor\" id=\""+data[k].cor+"\" autocomplete=\"off\"><div class=\"icone\" style=\"background-color:"+data[k].cor+";\">"+data[k].quantidade+"</div></label>";

           if (k <= 3) {
               label1 += html;
           }
           else if (k <= 7) {
               label2 += html;
           }
           else if (k <= 11) {
               label3 += html;
           }

           }

           // menu
           $('#teste1').html(label1);
           $('#teste2').html(label2);
           $('#teste3').html(label3);

            //console.log(data);
      });
}

var markerIcon= L.icon({
       iconUrl: "/img/marker-v3.png",
       /*shadowUrl: '/img/icon-shadow.png',*/
       iconSize:     [35, 40], // size of the icon
       shadowSize:   [50, 25], // size of the shadow
       iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
       shadowAnchor: [25, 10],  // the same for the shadow
       popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var markerIconUnlocked= L.icon({
       iconUrl: "/img/marker-v3-unlocked.png",
       /*shadowUrl: '/img/icon-shadow.png',*/
       iconSize:     [35, 40], // size of the icon
       shadowSize:   [50, 25], // size of the shadow
       iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
       shadowAnchor: [25, 10],  // the same for the shadow
       popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var marker = L.marker([0, 0],  {icon: markerIcon}).addTo(map).bounce();

var markerLight = L.circle([0, 0], {
               color: "#fff",
	fillOpacity: 0.8,
        	radius: 0,
        	weight: 0,
        	stroke: true
        }).addTo(map); 

var markerShadow = L.circle([0, 0], {
               color: "#2E2E2E",
	fillOpacity: 0.5,
        	radius: 2.25,
        	weight: 0,
        	stroke: true
        }).addTo(map);

var itemId = -1;
var h = 0; // 
var a = 0;
var b = 0;

$(document).on('click', ':radio[name="item"]', function() {
    //$('label').removeClass('active');
    //$(this).filter(':checked').parent().addClass('active');
    var expr = $(this).filter(':checked').attr('id');
    $(this).filter(':checked').checked = false;
    itemId = expr;
    say("Você selecionou o marcador " + itens[itemId].nome);
    $("#menu").click();
});

var mapLocked = true;
function onMapClick(e) {
      var pos = posicaoNoGrid(e.latlng);

     var novaArea = true;
     for (var k in reguas) {
          if (reguas[k].latitude == pos.lat &&
               reguas[k].longitude == pos.lng) {
               novaArea = false;
          }
     }
     if (novaArea && (e.type != "dblclick" || e.type == "dragend")) {
         play();

         if (itens.length > 0 && itemId >= 0) {
         // Posição dos itens
         itens[itemId].marker.setLatLng(new L.LatLng(pos.lat, pos.lng));
         itens[itemId].markerShadow.setLatLng(new L.LatLng(pos.lat, pos.lng));

        var id = itemId;
        var anotacao = "後で";

        itemId = -1;

        $.post("/ajax/localizacao_gps_item.php", {
        lat: pos.lat, 
        lng: pos.lng,
        id: itens[id].id,
        anotacao: anotacao,
        data_hora: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        })
        .done(function(data) {
               say("Pronto");
               reload();
        });
        }
     }
     else {
          var kforadofor = 0;
          for (var k in itens) {
               if (itens[k].lat == pos.lat && itens[k].lng == pos.lng) {
               
               kforadofor = k;
               itens[k].lat = 0;
               itens[k].lng = 0;

               $.post("/ajax/localizacao_gps_item.php", {
                    lat: 0, 
                    lng: 0,
                    id: itens[k].id,
                    data_hora: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
               })
               .done(function(data) {
                  if (!itens[kforadofor].anotacao .startsWith("後で")) {
                         say(itens[kforadofor].anotacao);
                   }
                   else  {
                         say("Você recuperou o marcador " + itens[kforadofor].nome);
                   }

                   if (itens[kforadofor].audio) {
                       play(itens[kforadofor].audio);
                   }
                   console.log("Tocando: " + itens[kforadofor].audio);
                   reload();
               });
               }
          }
     }

     marker.setLatLng(new L.LatLng(pos.lat, pos.lng));
     markerLight.setLatLng(new L.LatLng(pos.lat, pos.lng));
     markerShadow.setLatLng(new L.LatLng(pos.lat, pos.lng));
     if (mapLocked) {
         map.setView([pos.lat, pos.lng], 19);
     }
     // MODO SIMULAÇÃO
     else if (itemId < 0)  {
        $.post("/ajax/localizacao_gps.php", {
        lat: pos.lat, 
        lng: pos.lng,
        cor: cor })
       .done(function(data) {
             //reload();
        });
     }

     // PONTUAÇÃO MÍNIMA
     if (reguas.length >= pontuacaoMinima) {
           if (!validarGrid()) {
                 faseAtual = 1;
                 pontuacaoMinima = 4;
                 $("#reset").click();
                 say("Você perdeu!"); 
           }
           else {
                var raiz = Math.sqrt(pontuacaoMinima);
                faseAtual += 1;
                pontuacaoMinima = Math.pow(raiz+1, 2);
                say("Você passou para a fase " + faseAtual);
           }
     }
     else if (reguas.length >= 1)  {
           desenharGrid();
     }
}

map.on('click', onMapClick);

$("#auto").click(function() {
    mapLocked =! mapLocked;
    if (mapLocked) {
        $(this).removeClass("btn-outline-dark");
        $(this).addClass("btn-dark");
        marker.setIcon(markerIcon);
    }
    else {
        $(this).removeClass("btn-dark");
        $(this).addClass("btn-outline-dark");
        marker.setIcon(markerIconUnlocked);
    }
    $("#menu").click();
});

$(document).on('change', ':radio[name="cor"]', function() {
    $('label').removeClass('active');
    $(this).filter(':checked').parent().addClass('active');
    var expr = $(this).filter(':checked').attr('id');
    cor = parseInt(expr);
});

$("#box4").click(function() {
      $.getJSON("https://nominatim.openstreetmap.org/reverse?lat="+reguas[0].latitude+"&lon="+reguas[0].longitude+"&format=json", function(data) {
          say("Estamos próximos à " + data.display_name);
      });
});

$("#reset").click(function() {
      $.getJSON("/ajax/localizacao_gps.php?delete=true", function(data) {
          //say("");
      });

      for (var k in itens) {
           $.post("/ajax/localizacao_gps_item.php", {
                 lat: 0, 
                 lng: 0,
                 id: itens[k].id,
                 data_hora: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }).done(function(data) {
                 if (k == itens.length -1) {
                      reload();
                      play("/audio/game_over.mp3");
                 }
            });
       }
});

// SENSOR DE MOVIMENTO
var motionValue = 0;
if(window.DeviceMotionEvent && true == false){
  window.addEventListener("devicemotion", motion, false);
  $("#motion-info").html("devicemotion: <i class=\"bi bi-check-square-fill\"></i>");
}
function motion(event){
  motionValue = event.accelerationIncludingGravity.x;
  animar();
  console.log("Accelerometer: "
    + event.accelerationIncludingGravity.x + ", "
    + event.accelerationIncludingGravity.y + ", "
    + event.accelerationIncludingGravity.z
  );
}

// SENSOR DE LUZ
var lightValue = 1000;
if ("ondevicelight" in window && true == false) {
  $("#light-info").html("ambientlight: <i class=\"bi bi-check-square-fill\"></i>");
  window.addEventListener("devicelight", light);
}

function light(event) {
    lightValue = event.value;
}

var speaking = false;
function say(text) {
         if (!speaking) {
              // Teste SpeechSynthesisUtterance
              var msg = new SpeechSynthesisUtterance();
              msg.text = text;
              msg.onend = function(event) {
                  speaking = false;
              };
              speaking = true;
              window.speechSynthesis.speak(msg);
        }
}

// Localização melhor
var velocidade = 0;
var posAnterior = false;
var dhPosAnterior = new Date().getTime();
function success(position) {
   $("#local-info").html("geolocation: <i class=\"bi bi-check-square-fill\"></i>");

   var pos = posicaoNoGrid({
        lat : position.coords.latitude,
        lng : position.coords.longitude
    });

    //console.log(pos);
    
   var now = new Date().getTime();
   if (posAnterior) {
       var distancia = posAnterior
       .distanceTo(new L.LatLng(
           position.coords.latitude, 
           position.coords.longitude));
       var tempo = now - dhPosAnterior;
       
       var velocidade = Math.floor((distancia * 100) / (tempo / 1000));
       $(".velocidade").text(velocidade + " cm/s");

       posAnterior = new L.LatLng(pos.lat, pos.lng);
       dhPosAnterior = now;

       if (velocidade > 0) {
           say("Você está à " + (velocidade) + " centímetros por segundo");
      }
   }
   else {
       posAnterior = new L.LatLng(
              position.coords.latitude,
              position.coords.longitude);
       dhPosAnterior = now;
   }

   // Salvar localização
   $.post("/ajax/localizacao_gps.php", {
        lat: pos.lat, 
        lng: pos.lng,
        cor: cor
        })
        .done(function(data) {
               reload();
        });
}

function error(error) {
   $("#local-info").html("geolocation: <i class=\"bi bi-check-square\"></i>");
   reload();
  switch(error.code)  {
    case error.PERMISSION_DENIED:
      console.log("Usuário rejeitou a solicitação de Geolocalização.");
      setInterval(reload, 5000);
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Localização indisponível.");
      break;
    case error.TIMEOUT:
      console.log("A requisição expirou.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("Algum erro desconhecido aconteceu.");
      break;
    }
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 5000
};

const watchID = navigator.geolocation.watchPosition(success, error, options); 

// Controle do explosivo
var bomb_wires = [];
function desenharControle()  {

     for (var k in bomb_wires) {
             map.removeControl(bomb_wires[k]);
      }
      bomb_wires=[];

     var red = itens.filter(x => x.id == 95)[0];
     var tnt = itens.filter(x => x.id == 98)[0];

     if (red.lat != 0 && tnt.lat != 0) {
         var pointList = [ 
            new L.LatLng(red.lat, red.lng),
            new L.LatLng(tnt.lat, tnt.lng)
         ];

         var wire = new L.Polyline(pointList, {
            color: '#8A0829',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1,
            dashArray: '5',
            dashOffset: '0'
        });
        wire.addTo(map);
        bomb_wires.push(wire);
     }

     // Apagar tudo
     if (bomb_wires.length == 0 && tnt.lat != 0) {
          explodirArea(tnt);
     }
}

function explodirArea(pos) {
        var a = 0.000008993216088271083 * 5;
        var d = 0.000009956626094265175 * 5;
        var corExplodida = "#2E2E2E";

        for (let k = -2; k <= 2; k++) {
             for (let j = -2; j <= 2; j++) {
                   //console.log("k " + k);
                   //console.log("j " + j);

                   $.post("/ajax/localizacao_gps.php", {
                   lat: pos.lat - (a * k),
                   lng: pos.lng - (d *  j),
                   cor: corExplodida,
                  data_hora: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                   })
                  .done(function(data) {
                       //console.log(data);
                       if ((k+j) == 4) {
                            reload();
                       }
                   });
              }
        }

        $.post("/ajax/localizacao_gps_item.php", {
        lat: 0, 
        lng: 0,
        id: 98,
        data_hora: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        });

        play("/audio/explosion.mp3");
}

// Voldemort
function desenharVoldemort() {
     var x = 0.000008993216088271083;
     var y = 0.000009956626094265175;

     var luz = (lightValue + 100) / 1000;
     var raio = x * 10;
    
     var voldemort = itens.filter(x => x.id == 109)[0];

     if (voldemort.lat != 0) {

     a = a != 0 ? a : voldemort.lat - reguas[0].latitude;
     b = b != 0 ? b : voldemort.lng - reguas[0].longitude;
     h = h != 0 ? h : Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

     var sen = a/h;
     var cos = b/h;

    // -------------------
     
     var h2 = h * luz;
     var a2 = h2 * sen;
     var b2 = h2 * cos;

     var pos = posicaoNoGrid({
        lat : reguas[0].latitude + a2,
        lng : reguas[0].longitude + b2
     });
     
     markerLight.setRadius((h/((x+y)/2)) * luz);
     
     $.post("/ajax/localizacao_gps_item.php", {
     lat: pos.lat,
     lng: pos.lng,
     id: 109,
     data_hora: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
     });

     // Game over
     if (luz <= 0.1) {
          $("#reset").click();
          h = 0;
          a = 0;
          b = 0;
     }

     voldemort.marker.setLatLng(new L.LatLng(pos.lat, pos.lng));
     voldemort.markerShadow.setLatLng(new L.LatLng(pos.lat, pos.lng));

     }
}

// Grid
function par(num) {
     return Math.ceil((pontuacaoMinima + 1) % 2);
}

var gridIcon = false;
var gridMarker = false;

function desenharGrid() {
     var a = 0.000008993216088271083 * 5;
     var d = 0.000009956626094265175 * 5;
     var corGrid = "#000000";

      var raiz = Math.sqrt(pontuacaoMinima);
      var v = Math.floor(raiz / 2);
      var w = v - par(pontuacaoMinima);

     var pos = {
            lat: reguas[reguas.length -1].latitude,
            lng: reguas[reguas.length -1].longitude
     };

      if (grid.length > 0) {
            map.removeControl(gridMarker);
      }

     for (var k in grid) {
           map.removeControl(grid[k].circle);
           map.removeControl(grid[k].rectangle);
     }
     grid = [];

    var inicio = {};
    for (let k = -v; k <= w; k++) {
             for (let j = -v; j <= w; j++) {
               var obj = posicaoNoGrid({
                      lat: pos.lat - (a * k),
                      lng: pos.lng - (d *  j)
               });

               obj.circle = L.circle([
		obj.lat,
		obj.lng
               		], {
                              color: corGrid,
		fillOpacity: 0,
        		radius: 2.5,
        		weight: 1,
        		stroke: false
	}).addTo(map);

               obj.rectangle = L.rectangle(obj.circle.getBounds(), {
               		color: corGrid, 
               		weight: 3,
               		opacity: (k == 0) && (j == 0) ? 0.7 : 0.3 ,
               		fillOpacity: 0,
               		dashArray: "5"
               }).addTo(map);

               grid.push(obj);
               inicio = (k == w) && (j == -v) ? obj : inicio;
             }
    }

    //console.log(v);
    //console.log(w);

    gridIcon = L.icon({
            iconUrl: createLabel("Fase 0"+faseAtual),
            iconSize:     [40, 100], // size of the icon
            iconAnchor:   [40, 50], // point of the icon which will correspond to marker's location
     });

    gridMarker = L.marker([inicio.lat, inicio.lng],  {icon: gridIcon}).addTo(map);
}

function validarGrid() {
     var pontos = 0;
     for (var k in reguas) {
          var pos = {
                lat: reguas[k].latitude,
                lng: reguas[k].longitude
          };

         for (var m in grid) {
                if (grid[m].lat == pos.lat && grid[m].lng == pos.lng) {
                       pontos += 1;
                }
         }
     } 

     var erros = reguas.length - pontos;
     console.log("Erros: " + erros);
     return erros <= 3;
}

function createLabel(text) {
     var canvas = document.createElement("canvas");
     var context = canvas.getContext( '2d' );

     canvas.width = 40;
     canvas.height = 100;
	
     /*
     //draw a box around the canvas
     context.beginPath(); // always start a new line with beginPath
     context.lineWidth = 3;
     context.moveTo( 0, 0 ); // start position
     context.lineTo( canvas.width - 1, 0 );
     context.lineTo( canvas.width - 1, canvas.height - 1 );
     context.lineTo( 0, canvas.height - 1 );
     context.lineTo( 0, 0 );
     context.stroke(); // actually draw the line
    */

    context.save();
    context.translate( canvas.width / 2, canvas.height / 2 );
    context.rotate( -(Math.PI / 2) );
    context.font = "20px 'VT323'";
    context.fillStyle = "#000"; // green
    context.textAlign = "center";
    context.fillText(text, 0, 0 );
    context.restore();

    return canvas.toDataURL();
}