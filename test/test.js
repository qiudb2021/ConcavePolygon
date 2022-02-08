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

    // [
    //     {x: 200, y: 100},
    //     {x: 240, y: 100},
    //     {x: 240, y: 400},
    //     {x: 380, y: 400},
    //     {x: 380, y: 440},
    //     {x: 100, y: 440},
    //     {x: 100, y: 400},
    //     {x: 200, y: 400}
    // ],

    [  
        { x: 360, y: 240 },
        { x: 440, y: 240 },
        { x: 440, y: 280 },
        { x: 400, y: 280 },
        { x: 400, y: 400 },
        { x: 440, y: 400 },
        { x: 440, y: 440 },
        { x: 400, y: 440 },
        { x: 400, y: 560 },
        { x: 520, y: 560 },
        { x: 520, y: 600 },
        { x: 160, y: 600 },
        { x: 160, y: 560 },
        { x: 360, y: 560 } 
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
        
    console.log("是否是凹多边形: %j", polygon2Convex.isConcavePolygon(poly))
    
    // polygon2Convex.divideConcavePolygon(JSON.parse(JSON.stringify(poly)));
    
    polygon2Convex2.divideConcavePoly(poly, results)
    util.drawPolyLine(poly, "gray", 2);
    poly.forEach((p, index) => {
        util.drawText(p, "p"+index,"black")
    })

    console.log("最终切割结果：", results)
})

if (results.length) {
    for(let i = 0; i < results.length; i++) {
        if (i == 2)
        util.drawPolySolid(results[i], "green")
    }
}

util.drawGrid(util.findMinXY(polys), util.findMaxXY(polys), "gray")