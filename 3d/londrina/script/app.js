// create two boxes and a ground
var tile = 
Bodies.rectangle(sw/2, (sh/5)-82.5, 15, 5, {
    render: {
         fillStyle: '#cacab5',
         strokeStyle: '#cacab5' }});

function matterJs() {
    // add all of the bodies to the world
    Composite.add(engine.world,
    [head, torso, armLA, armLB, armRA, armRB,
    hips, legLA, legLB, legRA, legRB]);

    var mouse = Matter.Mouse.create(render.canvas);
    var mouseConstraint = 
    Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            render: {visible: true}
        }
    });
    render.mouse = mouse;

    // run the renderer
    Render.run(render);
    
    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}

$(document).ready(function() {
    matterJs();
});