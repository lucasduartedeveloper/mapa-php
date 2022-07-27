var playerId = new Date().getTime();
var fuel = 100;

var canvas = document.getElementById("matter-js");
canvas.width = sw;
canvas.height = sh;

// module aliases
var 
    Common = Matter.Common,
    Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    
Common.setDecomp(decomp);

// create an engine
var engine = Engine.create();
    
// create a renderer
var render = Render.create({
    engine: engine,
    canvas: canvas,
    options: {
         width: sw,
         height: sh,
         wireframes: false
         //showPerformance: true
    }
});

function matterJs() {
    // add all of the bodies to the world
    Composite.add(engine.world, [
        minuteCircle,
        sencondCircle
    ]);
    
    // run the renderer
    Render.run(render);

    // add mouse
    //render.mouse = mouse;
    //Composite.add(engine.world, mouseConstraint)

    // create runner
    //var runner = Runner.create();

    // run the engine
    //Runner.run(runner, engine);
}

$(document).ready(function() {
    log("log", "$(document).ready(...");
    matterJs();

    setInterval(function() {
    }, 1000);
});

var zoomLevel = 2;
Matter.Events.on(engine, "beforeUpdate", function() {
    if (lockCamera) return;
    Render.lookAt(render, minuteCircle,
    { x: (sw/zoomLevel) - minuteCircle.min.x, 
      y: (sh/zoomLevel) - minuteCircle.min.y });
});

// Test
// create runner
var started = false;
var runner = Runner.create();

window.test = function() {
    if (started) return;
    // add mouse
    render.mouse = mouse;
    Composite.add(engine.world, mouseConstraint);

    // run the renderer
    Runner.run(runner, engine);

    $("#test-run").removeClass("fa-play");
    $("#test-run").addClass("fa-pause");
    started = true;
    return;
    //-- Annotations
    motion = false;
}