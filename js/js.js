// 定义 宽750px的设计图的100px = 浏览器的1rem
function changeSize(){
    let designSize = 750;
    let html = document.documentElement;
    let wW = html.clientWidth;
    let rem = wW * 100 / designSize; 
    document.documentElement.style.fontSize = rem + 'px';
}
changeSize()
// 浏览器窗口改变时再次触发
window.onresize = function (){
    changeSize()
};
// 点击a标签，跳转到a的href
var a = document.getElementsByTagName('a');
a.onclick=function(){
    window.local.href = $(this).attr('href')
}
