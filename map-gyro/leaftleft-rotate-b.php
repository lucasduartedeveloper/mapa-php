<!DOCTYPE html>
<html>

	<head>
		<title>leaflet-rotate.js</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />

		<!-- Leaflet JS / CSS
		<script src="https://unpkg.com/leaflet@1.7/dist/leaflet-src.js"></script>
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7/dist/leaflet.css">  -->
              
              <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
              <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

		<!-- Leaflet-Rotate -->
		<script src="https://unpkg.com/leaflet-rotate@0.1.4/dist/leaflet-rotate-src.js"></script>

		<!-- include some miscellaneous -->
		<!-- <script src="https://unpkg.com/leaflet-rotate@0.1.4/misc/route.js"></script>
		<script src="https://unpkg.com/leaflet-rotate@0.1.4/misc/places.js"></script>
		<script src="https://unpkg.com/leaflet-rotate@0.1.4/misc/loremIpsum.js"></script>
		<script src="https://unpkg.com/leaflet-rotate@0.1.4/lib/debug.js"></script> -->

		<style>
			#map {
				width: 100%;
				height: 600px;
				border: 1px solid #ccc;
				max-height: 50vh;
			}
		</style>
	</head>

	<body>

		<div id="map"></div>

		<hr>

		<div>
			<p>
				<strong>Fly to bounds: </strong>
				<button onclick="map.flyToBounds(circle.getBounds());">CIRCLE</button>
				<button onclick="map.flyToBounds(polygon.getBounds());"> POLYGON</button>
				<button onclick="map.flyToBounds(path.getBounds());">PATH</button>
			</p>
			<p>
				<strong>Fly to: </strong>
				<button onclick="map.flyTo(places['Kyiv'], 10);">Kyiv</button>
				<button onclick="map.flyTo(places['London'], 10);">London</button>
				<button onclick="map.flyTo(places['San Francisco'], 10);">San Francisco</button>
				<button onclick="map.flyTo(places['Washington'], 10);">Washington</button>
				<button onclick="map.flyTo(places['Trondheim'], 10);">Trondheim</button>
			</p>
		</div>

		<script>
			var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
				id: 'mapbox.streets',
				maxZoom: 24,
				maxNativeZoom: 18,
				attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
			});

			var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 24,
				maxNativeZoom: 19,
				attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			});

                     var tileLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://www.mapbox.com/">Mapbox</a>',
			    maxZoom: 20,
			    id: 'mapbox/streets-v11',
			    tileSize: 512,
			    zoomOffset: -1,
			    accessToken: 'pk.eyJ1IjoibHVjYXNkdWFydGUxOTkyIiwiYSI6ImNreGZieWE3ODFwNTQyb3N0cW4zNHMxMG8ifQ.HXS54wWrm6wPz-29LVVRbg'
			});

			var map = L.map('map', {
				layers: [esri],
				// worldCopyJump: true,
				rotate: true,
				touchRotate: true,
				rotateControl: {
					closeOnZeroBearing: false
				},
				bearing: 30
			}).setView([-23.37062642645644,  -51.15587314318577], 18);

			// map.setBearing(30);
			// map.touchRotate.enable();

/*
			var layers = L.control.layers({
				'Empty': L.tileLayer(''),
				'Streets': tileLayer,
				'Satellite': esri,
			}, null, {
				collapsed: false
			}).addTo(map);*/

			var markers = [];
			for (var i in places) {
				markers.push(L.marker(places[i], {
						draggable: true
					})
					.bindPopup('<b>' + i + '</b><br>' + loremIpsum)
					.bindTooltip('<b>' + i + '</b>',
						markers.length ? {} : {
							direction: 'right',
							permanent: true
						}
					)
					.addTo(map));
			}

                     var markerIcon = L.icon({
			       iconUrl: "/map-gyro/img/marker.png",
			       iconSize:     [30, 30], 
			       iconAnchor:   [15, 30]
			});
			
			var marker = L.marker([-23.37062642645644,  -51.15587314318577],  {icon: markerIcon}).addTo(map);
			
			var markerShadow = L.circle([-23.37062642645644,  -51.15587314318577], {
			        color: "#2E2E2E",
			        fillOpacity: 0.5,
			        radius: 2.25,
			        weight: 0,
			        stroke: true
			}).addTo(map);

			var path = L.polyline(route, {
				renderer: L.canvas()
			}).addTo(map);

			var circle = L.circle([53, 4], 111111)
				.addTo(map);

			var polygon = L.polygon([
				[48, -3],
				[50, -4],
				[52, 4]
			]).addTo(map);

			// Display some debug info
			//L.Rotate.debug(map);
		</script>

		<a href="https://github.com/Raruto/leaflet-rotate" class="view-on-github" style="position: fixed;bottom: 10px;left: calc(50% - 60px);z-index: 9999;"> <img alt="View on Github" src="https://raruto.github.io/img/view-on-github.png" title="View on Github"
			  width="163"> </a>

	</body>

</html>