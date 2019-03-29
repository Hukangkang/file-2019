/* 
    自己封装的一个无缝轮播插件，自动创建分页器(项目需要，只写了滑动效果，没有左右按钮)。
    需要传入被选中的分页器的class
    html结构为：
    <div class='autoplay'>
        <ul>
            <li></li>
            <li></li>
        </ul>
    </div>
    css:
    .autoplay {
      float: left;
      margin: .21rem 0 0 .02rem;
      width: 4.83rem;
      height: 3.06rem;
      background: #000;
      overflow: hidden;
      position: relative;
    }
    .autoplay .slide {
      position: absolute;
      top: 0;
      left: 0;
      height: 3.06rem;
    }
    .autoplay .slide li {
      height: 3.06rem;
      width: 4.83rem;
      float: left;
    }
    .autoplay .slide li img {
      width: 100%;
      height: 100%;
    }
    .autoplay ol {
      position: absolute;
      bottom: .2rem;
      left: .4rem;
      height: .2rem;
      width: 1.06rem;
      display: flex;
      justify-content: space-between;
    }
    .autoplay ol li {
      width: .18rem;
      height: .18rem;
      border-radius: 50%;
      background: #C39547;
      border: .02rem solid #fff;
      cursor: pointer;
    }
    .autoplay ol .bg {
      background: #EA2110;
    }
    调用方法 $('.autoplay').slide('bg')
 */ 
$.fn.slide = function (bg) {
    var uls = $(this).find("ul"); // 图片列表
    var lis  = $(this).find('ul li'); // 图片
    var imgW = lis.width();
    // 创建分页器
    var imgLen = $(this).find('ul li').length;
    var html = '<ol class="ol">';
    for(var i = 0; i < imgLen; i++){
        html += '<li></li>';
    }
    html += '</ol>';
    $(this).append(html);

    $(this).find('ol li').eq(0).addClass(bg)

    var ols = $(this).find("ol"); // 分页器列表
    var ollis = $(this).find("ol li"); // 分页器

    var firstImg = lis.first().clone();
    uls.append(firstImg);
    var ullis = $(this).find('ul li');
    uls.width(ullis.length*imgW+5+'px');
    var i = 0;
    var timer;
    autoPlay();
    function autoPlay(){
        timer = setInterval(function(){
            i++;
            moveImg(i);
        }, 2000);
    }
    function moveImg(num){
        if(i==ullis.length){
            i = 1;
            uls.css({left:0});
        }
        if(i==-1){
            i=ullis.length-2;
            uls.css({left:(ullis.length-1)*-imgW});
        }
        uls.stop().animate({left:i*-imgW},400);
        if(i==(ullis.length-1)){
            ollis.eq(0).addClass(bg).siblings().removeClass(bg);
        }else{
            ollis.eq(i).addClass(bg).siblings().removeClass(bg);
        }
    }
    $(this).mousedown(function(e){
        e.preventDefault();
        startX=e.pageX;
        // startY=e.pageY;
        clearInterval(timer)
        $(this).mousemove(function(e){
            e.preventDefault();
            moveEndX=e.pageX;
            // moveEndY=e.pageY;
            X=moveEndX-startX;
            // Y=moveEndY-startY;
        })
    }).mouseup(function(){
        $(this).off("mousemove")
        if ( X > 0 ) {
            i--;
            moveImg(i);
        }else if(X < 0){
            i++;
            moveImg(i);
        }
        autoPlay()
    })
    ollis.click(function(){
        i = $(this).index();
        moveImg(i);
    })
    // 阻止所有li点击事件的冒泡
    $(this).find('li').click(function(e){
        e.stopPropagation();
    })
}
