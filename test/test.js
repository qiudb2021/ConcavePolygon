const {graphical, Rectangle, Polygon} = require("graphical");
const util = require("../util");
const polygon2Convex = require("../polygon2Convex");
const polygon2Convex2 = require("../polygon2Convex2")

graphical(8001);

let polys = [ 

    // [
    //     {x:100, y:100},
    //     {x:260, y:180},
    //     {x:400, y:100},
    //     {x:400, y:340},
    //     {x:100, y:340}
    // ], 

    [
        {x: 200, y: 100},
        {x: 240, y: 100},
        {x: 240, y: 400},
        {x: 380, y: 400},
        {x: 380, y: 440},
        {x: 100, y: 440},
        {x: 100, y: 400},
        {x: 200, y: 400}
    ],

    // [ 
    //     { x: 200, y: 100 },
    //     { x: 240, y: 100 },
    //     { x: 240, y: 400 },
    //     { x: 100, y: 440 },
    //     { x: 100, y: 400 },
    //     { x: 200, y: 400 } 
    // ],
    // [ 
    //     { x: 200, y: 400 },
    //     { x: 200, y: 100 },
    //     { x: 240, y: 100 },
    //     { x: 240, y: 400 },
    //     { x: 100, y: 440 } 
    // ]
]

let results = [];
polys.forEach(poly => {
        
    console.log("%o 是否是凹多边形: %j", poly, polygon2Convex.isConcavePolygon(poly))
    
    // polygon2Convex.divideConcavePolygon(JSON.parse(JSON.stringify(poly)));
    
    polygon2Convex2.divideConcavePoly(poly, results)
    util.drawPolyLine(poly, "gray", 2);
    poly.forEach((p, index) => {
        util.drawText(p, "p"+index,"black")
    })

    console.log("最终切割结果：%o", results)
})

util.drawGrid(util.findMinXY(polys), util.findMaxXY(polys), "gray")