var cameraKey = false;
$("#key").click(function() {
    if (cameraKey) {
        stopCamera();
        cameraKey = false;
    }
    else {
        startCamera();
        cameraKey = true;
    }
});

$("#rocket").click(function() {
    Matter.Body.applyForce(bodywork, 
    { x: -100, y: 0 },
    { x: 10, y: 0 });
})

var borders = true;
var wireframes = false;
$("#borders").click(function() {
    borders = !wireframes ?
    !borders : borders;
    wireframes = !borders ?
    !wireframes : wireframes;
    render.options.wireframes = wireframes;

   // X
   // A B C D
   // borders = false; wireframes = true;
   // borders = true; wireframes = false;
   // borders = false; wireframes = false;
   // borders = true; wireframes = true;

    bodywork
    .render.lineWidth =  borders ? 2 : 0;
    for (var k in bodywork.parts) {
        bodywork.parts[k]
        .render.lineWidth =  borders ? 2 : 0;
    }

    paintingConstraintA
    .render.anchors =  borders;
    paintingConstraintB
    .render.anchors =  borders;
    paintingConstraintZ
    .render.anchors =  borders;
    crankshaft
    .render.anchors =  borders;
    rearWheelShockAbsorberA
    .render.anchors =  borders;
    rearWheelShockAbsorberB
    .render.anchors =  borders;
    frontWheelShockAbsorberA
    .render.anchors =  borders;
    frontWheelShockAbsorberB
    .render.anchors =  borders;

    paintingConstraintA
    .render.lineWidth =  borders ? 2 : 0;
    paintingConstraintB
    .render.lineWidth =  borders ? 2 : 0;
    paintingConstraintZ
    .render.lineWidth =  borders ? 2 : 0;
    crankshaft
    .render.lineWidth =  borders ? 2 : 0;
    rearWheelShockAbsorberA
    .render.lineWidth =  borders ? 2 : 0;
    rearWheelShockAbsorberB
    .render.lineWidth =  borders ? 2 : 0;
    frontWheelShockAbsorberA
    .render.lineWidth =  borders ? 2 : 0;
    frontWheelShockAbsorberB
    .render.lineWidth =  borders ? 2 : 0;
});

var accelerating = false;
$("#power").on("touchstart", function() {
    accelerating = true;
});
$("#power").on("touchend", function() {
    accelerating = false;
});

$("#cut").click(function() {
    var canvas = document
    .getElementById("camera-canvas");
    var context = canvas.getContext("2d");

    context
    .globalCompositeOperation='destination-in';
    context.beginPath();
    context.arc(128/2,128/2,128/2,0,Math.PI*2);
    context.closePath();
    context.fill();
 
    rearWheel.render.sprite.texture =
    canvas.toDataURL();
    rearWheel.render.sprite.xScale = 0.39;
    rearWheel.render.sprite.yScale = 0.39;

    frontWheel.render.sprite.texture =
    canvas.toDataURL();
    frontWheel.render.sprite.xScale = 0.39;
    frontWheel.render.sprite.yScale = 0.39;
});

$("#run-test").click(function() {
    test();
});

var lockCamera = false;
Matter.Events.on(mouseConstraint, "mousedown", function() {
    lockCamera = true;
});
Matter.Events.on(mouseConstraint, "mouseup", function() {
    lockCamera = false;
});