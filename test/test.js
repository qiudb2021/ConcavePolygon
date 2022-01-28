const {graphical, Rectangle, Polygon} = require("graphical");
const util = require("../util");

graphical(8001);

let polys = [ 
    [  
        { x: 360, y: 240 },
        { x: 436, y: 240 },
        { x: 440, y: 262 },
        { x: 436, y: 280 },
        { x: 400, y: 280 },
        { x: 400, y: 400 },
        { x: 436, y: 400 },
        { x: 440, y: 420 },
        { x: 436, y: 440 },
        { x: 400, y: 440 },
        { x: 400, y: 560 },
        { x: 516, y: 560 },
        { x: 520, y: 580 },
        { x: 516, y: 600 },
        { x: 164, y: 600 },
        { x: 160, y: 582 },
        { x: 164, y: 560 },
        { x: 360, y: 560 } 
    ],
]

polys.forEach(plist => {
    let polygon = new Polygon();
    polygon.setPosList(plist);
    polygon.setColor("gray");
})

util.drawGrid({x:0, y:0}, {x:1000, y:1000})