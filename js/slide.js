/* 
    自己封装的一个无缝轮播插件，自动创建分页器
    需要传入被选中的分页器的class和轮播时间间隔
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
    .prev,.next{
        width: 20px;
        height: 20px;
        background: rgba(0,0,0,.3s);
        position: absolute;
        top: 140px;
    }
    .prev{
        left: 0;
        display: none;
    }
    .next{
        right: 0;
        display: none;
    }
    调用方法 $('.autoplay').slide('bg')
 */ 
/* 
   无缝轮播插件(自动创建对应个数的分页器)。
    需要传入被选中的分页器的class和轮播的时间间隔。
    html结构为：
    <div class='autoplay'>
        <ul>
            <li></li>
            <li></li>
        </ul>
        <ol></ol>
        <div class="prev"><</div>
        <div class="next">></div>
    </div>
    调用方法 $('.autoplay').slide('bg',1000)

 */ 
$.fn.slide = function (bg,speed) {
    var uls = $(this).find("ul"); // 图片列表
    var lis  = $(this).find('ul li'); // 图片
    var ols = $(this).find("ol"); // 分页器列表
    var olhtml = ''; // 动态添加分页器
    for(let i = 0; i < lis.length;i++){
        olhtml += '<li></li>'
    }
    ols.append(olhtml);
    ols.find('li').eq(0).addClass(bg)
    // console.log(olhtml)
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
        }, speed);
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
    $(this).hover(function(){
        clearInterval(timer)
        $('.prev').fadeIn()
        $('.next').fadeIn()
    },function(){
        autoPlay()
        $('.prev').fadeOut()
        $('.next').fadeOut()
    })
    $('.prev').click(function(){
        i--;
        moveImg(i);
    })
    $('.next').click(function(){
        i++;
        moveImg(i);
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
