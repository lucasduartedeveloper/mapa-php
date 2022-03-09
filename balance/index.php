<!DOCTYPE html>
<html>
<head>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">

<link rel="apple-touch-icon" sizes="76x76" href="webapp/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="webapp/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="webapp/favicon-16x16.png">
<link rel="manifest" href="webapp/site.webmanifest?v=0">
<link rel="mask-icon" href="webapp/safari-pinned-tab.svg" color="#2f2e40">
<meta name="msapplication-TileColor" content="#2f2e40">
<meta name="theme-color" content="#2f2e40">

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<!-- <link rel="stylesheet" href="css/normalizee.css"> -->
<link rel="stylesheet" href="css/style.css?v=19">

<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />

 <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>

<title></title>
</head>
<body>

<p id="title">
  CAIXA 84
</p>
<p id="cpf">
   078.402.969-55
</p>
<p id="balance">
   R$ ----
</p>
<div>
<button id="withdrawal" class="btn btn-danger">
Saque
</button>
<button id="deposit" class="btn btn-success">
Depósito
</button>
<button id="speak" class="btn btn-dark">
<i class="fa-solid fa-volume-high"></i>
</button>
</div>

<div id="product-list">
     <table>
     <tr>
     <td>Qtd.</td>
     <td>Produto</td>
     <td>Valor</td>
     </tr>
     <tr id="0">
     <td>
     <i class="fa-solid fa-circle-plus"></i>
     <span>
     0
     </span>
     <i class="fa-solid fa-circle-minus"></i>
     </td>
     <td>CIGARRO</td>
     <td>R$ 10,00</td>
     </tr>
     <tr id="1">
     <td>
     <i class="fa-solid fa-circle-plus"></i>
     <span>
     0
     </span>
     <i class="fa-solid fa-circle-minus"></i>
     </td>
     <td>CAFÉ</td>
     <td>R$ 5,00</td>
     </tr>
     <tr id="2">
     <td>
     <i class="fa-solid fa-circle-plus"></i>
     <span>
     0
     </span>
     <i class="fa-solid fa-circle-minus"></i>
     </td>
     <td>ÁGUA</td>
     <td>R$ 2,00</td>
     </tr>
     <tr id="3">
     <td>
     <i class="fa-solid fa-circle-plus"></i>
     <span>
     0
     </span>
     <i class="fa-solid fa-circle-minus"></i>
     </td>
     <td>MÁSCARA</td>
     <td>R$ 15,00</td>
     </tr>
     <tr id="4">
     <td>
     <i class="fa-solid fa-circle-plus"></i>
     <span>
     0
     </span>
     <i class="fa-solid fa-circle-minus"></i>
     </td>
     <td>GATO</td>
     <td>R$ 20,00</td>
     </tr>
     <tr id="5">
     <td>
     <i class="fa-solid fa-circle-plus"></i>
     <span>
     0
     </span>
     <i class="fa-solid fa-circle-minus"></i>
     </td>
     <td>CADEADO</td>
     <td>R$ 7,00</td>
     </tr>
     <tr id="6">
     <td>
     <i class="fa-solid fa-circle-plus"></i>
     <span>
     0
     </span>
     <i class="fa-solid fa-circle-minus"></i>
     </td>
     <td>CAMISINHA</td>
     <td>R$ 5,00</td>
     </tr>
     <tr id="7">
     <td>
     <i class="fa-solid fa-circle-plus"></i>
     <span>
     0
     </span>
     <i class="fa-solid fa-circle-minus"></i>
     </td>
     <td>BICICLETA</td>
     <td>R$ 500.000,00</td>
     </tr>
     </table>
</div>

<div id="total">
<span>Valor da compra: R$ 0,00</span>
<button id="cancel" class="btn btn-dark">
<i class="bi bi-x"></i>
</button>
<button id="confirm" class="btn btn-dark">
<i class="bi bi-check"></i>
</button>
</div>

<p id="version-info">
     v19.0.74
     <br>
     <span id="server-info">
     CONNECTING...
     </span>
</p>

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.min.js"></script>

<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

<script type="text/javascript"
        src="https://cdn.jsdelivr.net/gh/hosuaby/Leaflet.SmoothMarkerBouncing@v2.0.0/dist/bundle.js"
        crossorigin="anonymous"></script>

<script src="https://momentjs.com/downloads/moment.min.js"></script>

<script src="https://kit.fontawesome.com/147bb12bad.js" crossorigin="anonymous"></script>

<script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>

<script src="script/websocket.js?v=0"></script>
<script src="script/balance.js?v=74"></script>

<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>eruda.init();</script>

</body>
</html> 