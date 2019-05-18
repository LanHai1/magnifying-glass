/**
 * 根据id获取元素
 * @param {*} id 
 */
let $ = id => document.getElementById(id);

// 鼠标移入移出显示隐藏 mask阴影和大图
$("smallBox").onmouseover = function() {
    $("mask").style.display = $("bigBox").style.display = "block";
};
$("smallBox").onmouseout = function() {
    $("mask").style.display = $("bigBox").style.display = "none";
};

// 为小盒子添加鼠标移动事件
$("smallBox").onmousemove = function(e) {
    // 事件对象e做兼容
    e = e || window.event;
    // 获取鼠标相对于小盒子里面的x和y
    // offsetX和offsetY有bug 自己计算 
    // x = e.clientX - 盒子自身到可视区域的left
    // y = e.clientY - 盒子自身到可视区域的top 
    // 因为想要鼠标在阴影层的中间 所以减去阴影盒子宽高的一半
    let x = e.clientX - $("smallBox").getBoundingClientRect()["left"] - $("mask").offsetWidth / 2;
    let y = e.clientY - $("smallBox").getBoundingClientRect()["top"] - $("mask").offsetHeight / 2;

    // 获取阴影盒子最大和最小区域范围
    // 小盒子宽度 - 阴影盒子的宽度
    let maxX = $("smallBox").offsetWidth - $("mask").offsetWidth;
    let maxY = $("smallBox").offsetHeight - $("mask").offsetHeight;

    // 最小值
    x = x > 0 ? x : 0;
    y = y > 0 ? y : 0;

    // 最大值
    x = x < maxX ? x : maxX;
    y = y < maxY ? y : maxY;

    setXY($("mask"), {
        left: x,
        top: y
    })

    // 大图跟着移动
    // 计算比例 大图片的宽度 / 小图片的宽度
    let xProportion = $("bigImg").offsetWidth / $("smallImg").offsetWidth;
    let yProportion = $("bigImg").offsetHeight / $("smallImg").offsetHeight;

    // 设置对应值 移动的x值乘计算出来的x比例
    setXY($("bigImg"), {
        left: -x * xProportion,
        top: -y * yProportion
    })
};
/**
 * 设置元素的left 和 top
 * @param {element} el 
 * @param {json} attrs 
 */
function setXY(el, attrs) {
    for (const key in attrs) {
        el.style[key] = `${attrs[key]}px`;
    }
}