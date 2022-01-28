const {graphical, Rectangle, Polygon, Line} = require("graphical");

/**
 * 
 * @param {{x:number, y: number}} start 
 * @param {{x:number, y: number}} end 
 * @param {string} color
 */
function drawGrid(start, end, color) {
    console.log(start);
    console.log(end);
    let startX = start.x;
    let endX = end.x;

    let startY = start.y;
    let endY = end.y;

    for (let x = startX; x < endX; x += 20) {
        drawLine({x: x, y: 0}, {x: x, y: endY}, color, 1)
    }
    for (let y = startY; y < endY; y+=20) {
        drawLine({x: 0, y: y}, {x: endX, y: y}, color, 1);
    }
}

/**
 * 用多边形的边描绘多边形
 * @param {{x:number, y: number}[]} poly 多边形
 * @param {string} color 边的颜色
 * @param {number} 边的宽度
 */
function drawPolyLine(poly, color, width) {
    for(let i = 0; i < poly.length; i++) {
        let p1 = poly[i];
        let p2 = poly[(i+1)%poly.length];
        drawLine(p1, p2, color, width)
    }
}

/**
 * @description 描绘多边形
 * @param {{x:number, y:number}[]} poly 多边形
 * @param {string} color 填充颜色
 */
function drawPolySolid(poly, color) {
    let polygon = new Polygon();
    polygon.setPosList(poly);
    polygon.setColor(color );
}

/**
 * 
 * @param {{x:number, y: number}} from 
 * @param {{x:number, y: number}} to 
 * @param {string} color 
 * @param {number} width 
 */
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
    drawPolyLine: drawPolyLine,
    drawPolySolid: drawPolySolid,
    drawLine: drawLine,
    findMaxXY: findMaxXY,
    findMinXY: findMinXY,
};