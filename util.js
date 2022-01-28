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

/**
 * @param {{x:number, y:number}[][]} polys
 * @returns {{x: number, y: number}}
 */
function findMinXY(polys) {
    let minX = minY = Number.MAX_VALUE, p;
    polys.forEach(pList => {
        for (let i = 0; i < pList.length; i++) {
            p = pList[i];
            if (p.x < minX) minX = p.x;
            if (p.y < minY) minY = p.y;
        }
    });
    return {x: minX, y: minY};
}

/**
 * @param {{x:number, y:number}[][]} polys
 * @returns {{x: number, y: number}}
 * 
 */
function findMaxXY(polys) {
    let maxX = maxY = Number.MIN_VALUE, p;
    polys.forEach(pList => {
        for (let i = 0; i < pList.length; i++) {
            p = pList[i];
            if (p.x > maxX) maxX = p.x;
            if (p.y > maxY) maxY = p.y;
        }
    });
    return {x: maxX, y: maxY};
}

module.exports = {
    drawGrid: drawGrid,
    drawLine: drawLine,
    findMaxXY: findMaxXY,
    findMinXY: findMinXY,
};