const {graphical, Rectangle, Polygon} = require("graphical");
const util = require("../util");
const polygon2Convex = require("../polygon2Convex");
const polygon2Convex2 = require("../polygon2Convex2")

graphical(8001);

let polys = [ 

    [
        {x:100, y:100},
        {x:260, y:180},
        {x:400, y:100},
        {x:400, y:340},
        {x:100, y:340}
    ], 

]

polys.forEach(poly => {
        
    console.log("%o 是否是凹多边形: %j", poly, polygon2Convex.isConcavePolygon(poly))
    
    // polygon2Convex.divideConcavePolygon(JSON.parse(JSON.stringify(poly)));
    polygon2Convex2.divideConcavePoly(poly)
    util.drawPolyLine(poly, "gray", 2);
    poly.forEach((p, index) => {
        util.drawText(p, "p"+index+"("+p.x+","+p.y+")")
    })
})

util.drawGrid(util.findMinXY(polys), util.findMaxXY(polys), "gray")