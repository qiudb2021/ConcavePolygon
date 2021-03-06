const util = require("./util");
/**
 * 
 * 旋转法(rotational method)来分割凹多边形。沿多边形的边的逆时针方向，逐一将顶点Vk移到坐标系原点。
 * 然后顺时针旋转多边形，使下一顶点Vk+1落在x轴上。
 * 如果再下一个顶点Vk+2位于x轴下面，则多边形为凹。
 * 然后我们利用x轴将多边形分割成两个新多边形，并对这两个新多边形重复使用凹测试。
 * 上述步骤一直重复到多边形中所有顶点均经过测试
 */
/**
 * 
 * @param {{x: number, y: number}[]} poly 多边形顶点列表
 * @param {{x: number, y: number}[][]} results 分割后的多边形
 */
function divideConcavePoly(poly, results) {
    // if (_divideConcavePoly(poly, results)) return true;
    // for (let i = 0; i < 2; i++) {
    //     poly.unshift(poly.pop());
    //     if (_divideConcavePoly(poly, results)) return true;
    // }
    
    // console.log("切割失败")
    // return false;
    _divideConcavePoly(poly, results)
}


/**
 * @description 判断多边形是否是凹多边形
 * @param {{x: number, y: number}[]} poly 
 * @returns {boolean}
 */
function isConcavePoly(poly) {
    if (!poly.length || poly.length < 4) return false;

    // 遍历所有顶点
    let p0 = poly[0], p1 = poly[1], p2 = poly[2];

    let preValue = crossProduct({x: p1.x-p0.x, y: p1.y-p0.y}, {x: p2.x-p1.x, y: p2.y-p1.y}) >= 0 ? 1 : -1;
    for (let i = 1; i < poly.length; i++) {
        p0 = poly[i];
        p1 = poly[(i+1)%poly.length];
        p2 = poly[(i+2)%poly.length];
        
        let curValue = crossProduct({x: p1.x-p0.x, y: p1.y-p0.y}, {x: p2.x-p1.x, y: p2.y-p1.y}) >= 0 ? 1 : -1
        if (curValue * preValue < 0) {
            return true;
        }
    }
}
/**
 * 
 * @param {{x:number, y: number}[]} poly 多边形顶点列表
 * @param {{x: number, y: number}[][]} results 切割后的多边形
 */
function _divideConcavePoly(poly, results) {
    poly = JSON.parse(JSON.stringify(poly))
    if (!poly.length) return true;
    if (poly.length < 4) {
        results.push(poly);
        return true;
    }

    if (!isConcavePoly(poly)) {
        results.push(poly);
        return true;
    }

    let len = poly.length;
    let breakFlag = false;
    
    // 用poly1和poly2分别保存分割出来的两个多边形; poly1初始化为原多边形的深拷贝, poly2为空
    let poly1 = JSON.parse(JSON.stringify(poly));
    let poly2;
    
    // 遍历所有顶点
    let i, j;
    for (i = 0; i < len - 2; i++) {
        if (i!=2) continue;
        // 当前顶点
        let p0 = poly[i];
        // 下个顶点
        let p1 = poly[i+1];
        // 下下个顶点
        let p2 = poly[i+2];

        console.log(p0, p1, p2)
        // 将当前顶点p0和下个顶点p1的连线向量作为x轴
        let vAxis = {x: p1.x-p0.x, y: p1.y-p0.y};
        // 当前顶点p0和下下个顶点p2的连线向量
        util.drawLine(p0, p1, "red", 5);
        let v = {x: p2.x-p0.x, y: p2.y-p0.y}
        util.drawLine(p0, p2, "yellow")
        console.log(crossProduct(vAxis, v))
        if (crossProduct(vAxis, v) < 0) {
            util.drawLine(p2, p0, "black", 2);
            // console.log("p0p2在p0p1的下方");
            for (j = i + 3; j < len; j++) {
                console.log()
                v = {x: poly[j].x - p0.x, y: poly[j].y - p0.y};
                if (crossProduct(vAxis, v) > 0) {
                    console.log("分割点%j", poly[j]);
                    // util.drawLine(p0, poly[j], "blue", 5)
                    breakFlag = true;
                    break;
                }
            }
        }

        if (breakFlag) break;
    }

    // 没有分割成功 
    if (!breakFlag) return false;

    // 此时分割多边形的两个点分别为poly[i+1], poly[j];
    let dp1 = poly[i+1];
    let dp2 = poly[j];
    // console.log("分割多边形的两个点分别为%j和%j", dp1, dp2)
    util.drawLine(dp1, dp2, "red", 5)

    // util.drawCircle(dp1, 5, "red");
    // util.drawCircle(dp2, 5, "red");


    // 从原来的多边形按照分割点分割出另一个子多边形也保存到poly2
    poly2 = poly.splice(i+2, j-(i+2));
    poly2.unshift(dp1);
    poly2.push(dp2);

    // util.drawPolySolid(poly, "yellow");
    // util.drawPolySolid(poly2, "green")
    // console.log(poly);
    // console.log(poly2);
    // divideConcavePoly(poly, results);
    // divideConcavePoly(poly2, results);
    return true;
}

/**
 * 
 * @param {{x: number, y: number}} p1 
 * @param {{x: number, y: number}} p2
 * @returns {{x:number, y: number}}
 */
function sub(p1, p2) {
    return {x: p2.x - p1.y, y: p2.y - p1.y};
}

function crossProduct(v1, v2) {
    return v1.x*v2.y - v2.x*v1.y
}

module.exports = {
    divideConcavePoly: divideConcavePoly
}