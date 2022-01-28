const {graphical, Rectangle, Polygon, Line} = require("graphical");

/**
 * 
 * @param {point} start 
 * @param {point} end 
 */
function drawGrid(start, end) {
    console.log(start);
    console.log(end);
    let startX = start.x;
    let endX = end.x;

    let startY = start.y;
    let endY = end.y;

    for (let x = startX; x < endX; x += 20) {
        drawLine({x: x, y: 0}, {x: x, y: endY})
    }
    for (let y = startY; y < endY; y+=20) {
        drawLine({x: 0, y: y}, {x: endX, y: y});
    }
}

/** */
function drawLine(from, to, color, width) {
    let line = new Line();
    line.setPos(from.x, from.y);
    line.setPos2(to.x, to.y);
    line.setColor(color);
    line.setWidth(width);
}

module.exports = {
    drawGrid: drawGrid,
    drawLine: drawLine,
};