$.fn.slide = function (bg) {
    var uls = $(this).find("ul"); // 图片列表
    var lis  = $(this).find('ul li'); // 图片
    var ols = $(this).find("ol"); // 分页器列表
    var ollis = $(this).find("ol li"); // 分页器
    var imgW = lis.width();
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