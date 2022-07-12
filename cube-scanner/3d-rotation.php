<!DOCTYPE html>
<html>
	<head>
		<title>3d Rotation On XYZ-Axis Example</title>
		<style>
			body {
				margin:		0px;
				padding:	0px;
			}
		</style>
	</head>
	<body onload="doTimer()">
		<canvas id='mainCanvas' width="800" height="600" style="border:1px solid #000000;" />
		<script>
			<!-- Written by Levent Divilioglu on 16/01/2017 -->
			<!-- 3d knowledge and math based on this tutorial; -->
			<!-- http://petercollingridge.appspot.com/3D-tutorial -->
			
			// canvas setup
			var canvas	= document.getElementById('mainCanvas');
			var ctx		= canvas.getContext('2d');
			
			// nodes of cube
			var node0 = [ -100, -100, -100  ];
			var node1 = [ -100, -100,  100  ];
			var node2 = [ -100,  100, -100  ];
			var node3 = [ -100,  100,  100  ];
			var node4 = [  100, -100, -100  ];
			var node5 = [  100, -100,  100  ];
			var node6 = [  100,  100, -100  ];
			var node7 = [  100,  100,  100  ];
			
			// nodes array
			var nodes = [ node0, node1, node2, node3, node4, node5, node6, node7 ];
			
			// edges of cube (wireframe, lines)
			var edge0  = [0, 1];
			var edge1  = [1, 3];
			var edge2  = [3, 2];
			var edge3  = [2, 0];
			var edge4  = [4, 5];
			var edge5  = [5, 7];
			var edge6  = [7, 6];
			var edge7  = [6, 4];
			var edge8  = [0, 4];
			var edge9  = [1, 5];
			var edge10 = [2, 6];
			var edge11 = [3, 7];
			
			// edges array
			var edges = [
				edge0  , edge1  , edge2  , edge3  ,
				edge4  , edge5  , edge6  , edge7  ,
				edge8  , edge9  , edge10 , edge11
			];
			
			// setup
			var backgroundColor		= color(255, 255, 255);
			var nodeColor			= color(40 , 168, 107);
			var edgeColor			= color(34 ,  68, 204);
			var nodeSize = 8;
			
			// rotation degree
			var rotDegree = 0.1;
			var transformQuotient = Math.PI/180;
			
			// functions
			
			// rgb color string helper function
			function color(x, y, z) {
				var c = 'rgba(' + x + ',' + y + ',' + z + ',1' + ')';
				
				return c;
			}
			
			// draw function
			function clearScreen() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
			
			function fillScreen(color) {
				ctx.beginPath();
				ctx.rect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = color;
				ctx.fill();
			}
			
			function refreshScreen() {
				clearScreen();
				fillScreen(backgroundColor);
			}
			
			function point(x, y, color) {
				ctx.beginPath();
				ctx.rect(x, y, 1, 1);
				ctx.fillStyle = color;
				ctx.fill();
			}
			
			function circle(x, y, r, color) {
				ctx.beginPath();
				ctx.fillStyle = color;
				ctx.arc(x, y, r,0,2*Math.PI);
				ctx.fill();
			};
			
			function line(x1, y1, x2, y2, color) {
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.strokeStyle = color;
				ctx.stroke();
			}
			
			function drawNodes(nodes) {
				for(var n = 0; n < nodes.length; n++) {
					var node = nodes[n];
					
					var x = node[0];
					var y = node[1];
					// var z = node[2];		// we dont care z axis, we will use z parameter for rotation calculations
					circle(x, y, nodeSize, nodeColor);
				}
			}
			
			function drawEdges(edges) {
				for(var e = 0; e < edges.length; e++) {
					var edge = edges[e];
					
					var e1 = edge[0];
					var e2 = edge[1];
					
					var n1 = nodes[e1];
					var n2 = nodes[e2];
					
					var x1 = n1[0];
					var y1 = n1[1];
					
					var x2 = n2[0];
					var y2 = n2[1];
					
					line(x1, y1, x2, y2, edgeColor);
				}
			}
			
			// rotates node by theta around z-axis
			function rotateNode3DonZ(node, theta) {
				var x = node[0];
				var y = node[1];
				
				theta *= transformQuotient;
				
				var cosTheta = Math.cos(theta);
				var sinTheta = Math.sin(theta);
				
				var x = node[0];
				var y = node[1];
				
				node[0] = x * cosTheta - y * sinTheta;
				node[1] = x * sinTheta + y * cosTheta;
			}
			
			// rotates nodes by theta around z-axis
			function rotateNodes3DonZ(nodes, theta) {
				for(var n = 0; n < nodes.length; n++) {
					rotateNode3DonZ(nodes[n], theta);
				}
			}
			
			// rotates node by theta around x-axis
			function rotateNode3DonX(node, theta) {
				var y = node[1];
				var z = node[2];
				
				theta *= transformQuotient;
				
				var cosTheta = Math.cos(theta);
				var sinTheta = Math.sin(theta);
				
				var y = node[1];
				var z = node[2];
				
				node[1] = y * cosTheta - z * sinTheta;
				node[2] = y * sinTheta + z * cosTheta;
			}
			
			// rotates nodes by theta around x-axis
			function rotateNodes3DonX(nodes, theta) {
				for(var n = 0; n < nodes.length; n++) {
					rotateNode3DonX(nodes[n], theta);
				}
			}
			
			// rotates node by theta around y-axis
			function rotateNode3DonY(node, theta) {
				var x = node[0];
				var z = node[2];
				
				theta *= transformQuotient;
				
				var cosTheta = Math.cos(theta);
				var sinTheta = Math.sin(theta);
				
				var x = node[0];
				var z = node[2];
				
				node[0] = x * cosTheta - z * sinTheta;
				node[2] = x * sinTheta + z * cosTheta;
			}
			
			// rotates nodes by theta around y-axis
			function rotateNodes3DonY(nodes, theta) {
				for(var n = 0; n < nodes.length; n++) {
					rotateNode3DonY(nodes[n], theta);
				}
			}
			
			function handleAnimation() {
				refreshScreen();
				ctx.save();
				ctx.translate(200, 200);
				
				drawNodes(nodes);
				drawEdges(edges);
				rotateNodes3DonX(nodes, rotDegree);
				rotateNodes3DonZ(nodes, rotDegree);
				rotateNodes3DonY(nodes, rotDegree);
				
				ctx.restore();
			}
			
			function log() {
				console.log("hit");
			}
			
			function doTimer() {
				//window.requestAnimationFrame(handleAnimation);
				timerID = setInterval( "handleAnimation()", 20 );
			}
		</script>
	</body>
</html>