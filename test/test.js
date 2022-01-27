const {graphical, Rectangle, Polygon} = require("graphical");

graphical(8001);

var rectangle = new Rectangle();
rectangle.setPos(0, 0);
rectangle.setColor('blue');
rectangle.setSize(20, 20);

let plist = [{x:100, y:100}, {x:200, y:100}, {x:250,y:150}, {x:200, y:200}, {x:100, y:200}]
let polygon = new Polygon();
polygon.setPosList(plist);
polygon.setColor("gray")