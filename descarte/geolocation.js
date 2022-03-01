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
var powerUps = 0;
var pontuacaoMinima = [1,4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 196, 225, 256];

var audio = new Audio();
function play(file_path) {

   file_path = file_path ? file_path : "audio/game_notification.wav";
    audio.pause();
    audio = new Audio(file_path);
    audio.play(); 

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

         $.getJSON("ajax/localizacao_gps_item.php", function(data) {

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
       item.hp_atual = data[k].hp_atual;

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
        // ---- Teste HP
        desenharHP();

        if (reguas.length > 0) {
               onMapClick({latlng: {
                      lat: reguas[0].latitude,
                      lng: reguas[0].longitude
               }});
        }
        });

         $.getJSON("ajax/localizacao_gps.php", function(data) {

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

        firstpolyline = new L.Polyline(pointList, {
            color: cor,
            weight: 3,
            opacity: 0.8,
            smoothFactor: 1
        });
        firstpolyline.addTo(map);

        $(".distancia").text(Math.floor(distancia * 100) + " cm");
      });

      $.getJSON("ajax/localizacao_gps.php?select=true", function(data) {

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
       iconUrl: "img/marker-v3.png",
       /*shadowUrl: '/img/icon-shadow.png',*/
       iconSize:     [35, 40], // size of the icon
       shadowSize:   [50, 25], // size of the shadow
       iconAnchor:   [17.5, 40], // point of the icon which will correspond to marker's location
       shadowAnchor: [25, 10],  // the same for the shadow
       popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
});

var markerIconUnlocked= L.icon({
       iconUrl: "img/marker-v3-unlocked.png",
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
      //ws.send("UPDATE"); // TESTE WEBSOCKET
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

        $.post("ajax/localizacao_gps_item.php", {
        lat: pos.lat, 
        lng: pos.lng,
        id: itens[id].id,
        anotacao: anotacao,
        hp_atual: 100,
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

               $.post("ajax/localizacao_gps_item.php", {
                    lat: 0, 
                    lng: 0,
                    id: itens[k].id,
                    hp_atual: 0,
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
        $.post("ajax/localizacao_gps.php", {
        lat: pos.lat, 
        lng: pos.lng,
        cor: cor })
       .done(function(data) {
             //reload();
        });
     }

     // PONTUAÇÃO MÍNIMA
     var de99 = itens.filter(x => x.id == 111)[0].lat != 0;
     if (reguas.length >= pontuacaoMinima[faseAtual + powerUps] && !de99) {
           if (!validarGrid()) {
                 faseAtual = 1;
                 desenharGrid();
                 $("#reset").click();
                 say("Você perdeu!"); 
           }
           else {;
                faseAtual += 1;
                say("Você passou para a fase " + (faseAtual + powerUps));
           }
     }
     else if (reguas.length >= 1)  {
          // Power UP: Chave
          var deChave = itens.filter(x => x.id == 113)[0].lat != 0;
          var soma = 0;
          soma = deChave ? soma + 2 : soma;

          // Power UP: Skol
          var deSkol = itens.filter(x => x.id == 118)[0].lat != 0;
          soma = deSkol ? soma + 2 : soma;

          // Power UP: Academia
          var deAcademia = itens.filter(x => x.id == 102)[0].lat != 0;
          soma = deAcademia ? soma + 2 : soma;

          // Power UP: Moeda
          var deMoeda = itens.filter(x => x.id == 115)[0].lat != 0;
          soma = deMoeda ? soma + 1 : soma;

          // Power UP: Dinheiro
          var deDinheiro = itens.filter(x => x.id == 114)[0].lat != 0;
          soma = deDinheiro ? soma + 2 : soma;

          // Power UP: Microfone
          var deMicrofone = itens.filter(x => x.id == 120)[0].lat != 0;
          soma = deMicrofone ? soma + 2 : soma;

          powerUps = soma;
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
      $.getJSON("ajax/localizacao_gps.php?delete=true", function(data) {
          //say("");
      });

      for (var k in itens) {
           $.post("ajax/localizacao_gps_item.php", {
                 lat: 0, 
                 lng: 0,
                 id: itens[k].id,
                 hp_atual: 0,
                 data_hora: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            }).done(function(data) {
                 if (k == itens.length -1) {
                      reload();
                      play("audio/game_over.mp3");
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
   $.post("ajax/localizacao_gps.php", {
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

                   $.post("ajax/localizacao_gps.php", {
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

        $.post("ajax/localizacao_gps_item.php", {
        lat: 0, 
        lng: 0,
        id: 98,
        hp_atual: 0,
        data_hora: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        });

        play("audio/explosion.mp3");
}

// Voldemort;
var voldemort = false;
var hpMarker = false;
var hp = 0;
//wsCallback = reload;
function desenharHP() {
     voldemort = itens.filter(x => x.id == 109)[0];
     hp = voldemort.hp_atual;

     if (hpMarker) {
            map.removeControl(hpMarker);
     }
     if (voldemort.lat != 0  && hp > 0) {

            hpMarker = L.marker([voldemort.lat, voldemort.lng],  { 
            icon: L.icon({
            iconUrl: createHP(),
            iconSize:     [40, 60], // size of the icon
            iconAnchor:   [20, 60], // point of the icon which will correspond to marker's location
            })
            })
            .on("click", function(e) {
                 hp -= 10;

                 $.post("ajax/localizacao_gps_item.php", {
                      lat: voldemort.lat, 
                      lng: voldemort.lng,
                      id: 109,
                      hp_atual: hp,
                      data_hora: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                 }).done(function(data) { 
                      play("audio/getting_hit.wav");
                      reload();
                 });
            })
            .addTo(map);
     }
     else if (voldemort.lat != 0  && hp <= 0) {
            onMapClick({ type: "dblclick",
                    latlng: {
                            lat: voldemort.lat,
                            lng: voldemort.lng }
                    });
            play("audio/creature_dying.wav");
     }
}

// Grid
function par(num) {
     return Math.ceil((num + 1) % 2);
}
var gridIcon = false;
var gridMarker = false;

function desenharGrid() {
     var a = 0.000008993216088271083 * 5;
     var d = 0.000009956626094265175 * 5;
     var corGrid = "#000000";

      var raiz = Math.sqrt(pontuacaoMinima[faseAtual + powerUps]);
      var v = Math.floor(raiz / 2);
      var w = v - par(pontuacaoMinima[faseAtual + powerUps]);

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
               inicio = (k == 0) && (j == w) ? obj : inicio;
             }
    }

    //console.log(v);
    //console.log(w);

    gridIcon = L.icon({
            iconUrl: createLabel("Fase " + (faseAtual + powerUps).toString().padStart(2, "0")),
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

// NOME DA FASE
function createLabel(text) {
     var canvas = document.createElement("canvas");
     var context = canvas.getContext( '2d' );

     canvas.width = 40;
     canvas.height = 100;

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

// HP 
function createHP() {
     var canvas = document.createElement("canvas");
     var context = canvas.getContext( '2d' );

     canvas.width = 40;
     canvas.height = 60;
	
     //draw a box around the canvas
     context.beginPath(); // always start a new line with beginPath
     context.strokeStyle = "#FF0000";
     context.lineWidth = 10;
     context.moveTo( 0, 5 ); // start position
     context.lineTo(((40 / 100) * hp) , 5 );
     context.stroke(); // actually draw the line

     context.beginPath(); // always start a new line with beginPath
     context.strokeStyle = "#000000";
     context.lineWidth = 2;
     context.moveTo( 1, 1 ); // start position
     context.lineTo( 39, 1 );
     context.lineTo( 39, 10 );
     context.lineTo( 1, 10 );
     context.lineTo( 1, 1 );
     context.stroke(); // actually draw the line

    return canvas.toDataURL();
}

// TESTE COM MICROFONE
navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
if (navigator.getUserMedia) {
  navigator.getUserMedia({
      audio: true
    },
    function(stream) {
      audioContext = new AudioContext();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);

      javascriptNode.onaudioprocess = function() {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;

          var length = array.length;
          for (var i = 0; i < length; i++) {
            values += (array[i]);
          }

          var average = values / length;
          //console.log("Volume: " + average);

          if (average > 999) {
                var m = Math.floor((Math.random() * grid.length));
                var d = Math.floor((Math.random() * itens.length));
                itemId = itens[d].m;

                //console.log(m);
                onMapClick({ latlng: {
                            lat: grid[m].lat,
                            lng: grid[m].lng
                      }
                });
          }

        } // end fn stream
    },
    function(err) {
      console.log("The following error occured: " + err.name)
    });
} else {
  console.log("getUserMedia not supported");
}