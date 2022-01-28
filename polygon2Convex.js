
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
 * 计算向量叉积
 * @param {{x:number,y:number}[]} v1 向量v1的两个点列表
 * @param {{x:number,y:number}[]} v2 向量v2的两个点列表 
 * @returns 若向量v1、v2叉积大于等于0；则返回1；否则返回-1
 */
function crossProduct(v1, v2) {
    let p1 = v1[0], p2 = v2[1];
    let q1 = v2[0], q2 = v2[1];

    let result = (p2.x - p1.x) * (q2.y - q1.y) - (q2.x - q1.x) * (p2.y - p1.y);
    return result >= 0 ? 1 : -1;
}

module.exports = {
    isConcavePolygon: isConcavePolygon
}