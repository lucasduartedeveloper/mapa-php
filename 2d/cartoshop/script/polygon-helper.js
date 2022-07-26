function polygonCenter(p) {
    var minX = p[0].x;
    var minY = p[0].y;
    var maxX = p[0].x;
    var maxY = p[0].y;
    for (var k in p) {
        minX = p[k].x < minX ? p[k].x : minX;
        minY = p[k].y < minY ? p[k].y : minY;
        maxX = p[k].x > maxX ? p[k].x : maxX;
        maxY = p[k].y > maxY ? p[k].y : maxY;
    }
    return { x: (maxX-minX)/2, y: (maxY-minY)/2 };
}

function rotate(cx, cy, x, y, angle) {
    var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
    ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return { x: 2450+nx, y: (sh/2)-500+ny };
}

// ???????????????
function polygonFixPosition(body, pos) {
    log("min-before", body.bounds.min.x);
    var width = body.bounds.max.x - body.bounds.min.x;
    var height = body.bounds.max.y - body.bounds.min.y;
    var xOffset = (pos.x - (width/2)) - body.bounds.min.x;
    var yOffset = (pos.y - (height/2)) - body.bounds.min.y;
    pos.x += xOffset;
    pos.y += yOffset;
    Matter.Body.setPosition(body, pos);
    log("min-after", body.bounds.min.x);
    return body;
}