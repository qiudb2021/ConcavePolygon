const util = require("./util");

/**
 * @description 判断是否是凹多边形
 * @param {{x:number, y:number}[]} poly 顶点按顺时针排列的多边形
 * @returns {boolean} true-是; false-否;
 */
function isConcavePolygon(poly) {
    if (poly.length <= 3) return false;

    // 多边形相邻的两个顶点构成向量
    let vectors = [];
    for(let i = 0; i < poly.length; i++) {
        let p1 = poly[i];
        let p2 = poly[(i+1)%poly.length];
        vectors.push([p1, p2]);
    }

    // 计算相邻两个向量的叉积
    let preValue = crossProduct(vectors[0], vectors[1]);
    for(let i = 1; i < vectors.length; i++) {
        let curValue = crossProduct(vectors[i], vectors[(i+1)%vectors.length]);
        // 如果叉积异号（不相等）则为凹多边形
        if (preValue != curValue) {
            return true;
        }
        preValue = curValue;
    }

    return false;
}

/**
 * 
 * @param {{x:number, y:number}[]} poly 多边形顶点列表（按顺时针排序）
 * @param {{x:number, y:number}[][]} results 分割后的凸多边形顶点列表
 */
function divideConcavePolygon(poly, results) {
    if (poly.length <= 3) return results;

    let breakFlag = false;

    for (let index = 0; index < poly.length; index++) {
        let index1 = (index+1)%poly.length;
        let index2 = (index+2)%poly.length;

        let p0 = poly[index];
        let p1 = poly[index1];
        let p2 = poly[index2];

        let v1 = [p0, p1], v2 = [p1, p2];
        let cp = crossProduct(v1, v2);
        // 相邻向量v1, v2叉积大于0，则说明向量v2在向量v1的逆时针方向
        // 即边p0,p1为异号边
        if (cp > 0) {
            // 与多边形的其它边进行计算，找出交点位置
            for (let i = 0; i < poly.length; i++) {
                let current = poly[i];
                let next = poly[(i+1)%poly.length];

                // 跳过当前边（延长线的边p0p1, p1p2）
                if (index == i || index == (i+1)%poly.length) continue;

                
                let cp1 = crossProduct([p0, p1], [p0, current]);
                let cp2 = crossProduct([p0, p1], [p0, next]);
                
                // 找到交点所在的边，即current和next组成的边
                if (cp1 * cp2 < 0) {
                    let p = intersectPoint(p0, p1, current, next);


                    util.drawLine(p0, p1, "black", 5);
                    util.drawLine(current, next, "black", 10);
                    util.drawLine(p, p1, "red", 2)
                    util.drawCircle(p, 5, "red")
                    util.drawText(p, "p","black")
                    console.log("%j,%j边与%j, %j边相交于点", p0, p1, current, next, p);
                    console.log("%d, %d, %d, %d", i, i+1, index, index1)

                    if (i > index) {
                        let poly1 = poly.splice(index1, i-index1+1);
                        poly1.unshift(p);
                        util.drawPolySolid(poly1, "red")
                        console.log("poly1: ", poly1)
                        let poly2 = poly;
                        poly2.splice(index+1, 0, p)
                        console.log("poly2: ", poly2)
                        util.drawPolySolid(poly2, "yellow")
                    } else {
                        let poly1 = poly.splice(i+1, index-i);
                        poly1.unshift(p);
                        util.drawPolySolid(poly1, "blue");
                        console.log(poly1)

                        poly.splice(i+1, 0, p);
                        let poly2 = poly;
                        console.log(poly2);
                        util.drawPolySolid(poly2, "green")
                    }
                    breakFlag = true;
                    break;
                }
            }
        }
        if (breakFlag) break;
    }
}


/**
 * 计算向量叉积
 * @param {{x:number,y:number}[]} v1 向量v1的两个点列表
 * @param {{x:number,y:number}[]} v2 向量v2的两个点列表 
 * @returns 若向量v1、v2叉积大于等于0；则返回1；否则返回-1
 */
function crossProduct(v1, v2) {
    let p1 = v1[0], p2 = v1[1];
    let q1 = v2[0], q2 = v2[1];

    let result = (p2.x - p1.x) * (q2.y - q1.y) - (q2.x - q1.x) * (p2.y - p1.y);
    return result >= 0 ? 1 : -1;
}

/**
 * 求线段ab和线段cd的交点
 * @param {{x: number, y: number}} a 
 * @param {{x: number, y: number}} b 
 * @param {{x: number, y: number}} c 
 * @param {{x: number, y: number}} d 
 */
function intersectPoint(a, b, c, d) {
    let denominator = (b.y - a.y)*(d.x - c.x) - (a.x - b.x)*(c.y - d.y);  
    if (denominator==0) {  
        return null;  
    }  
   
    // 线段所在直线的交点坐标 (x , y)      
    var x = ( (b.x - a.x) * (d.x - c.x) * (c.y - a.y)   
                + (b.y - a.y) * (d.x - c.x) * a.x   
                - (d.y - c.y) * (b.x - a.x) * c.x ) / denominator ;  
    var y = -( (b.y - a.y) * (d.y - c.y) * (c.x - a.x)   
                + (b.x - a.x) * (d.y - c.y) * a.y   
                - (d.x - c.x) * (b.y - a.y) * c.y ) / denominator;
    return {x: x, y: y}
}

module.exports = {
    isConcavePolygon: isConcavePolygon,
    divideConcavePolygon: divideConcavePolygon,
}