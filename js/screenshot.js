/*
点击缩略图弹出大图；类似alert-video插件
直接把原图片放大了
*/
;$.fn.screenshot = function (mask) {
    var box = $(mask).find('div');
    $(this).find('li').hover(function(){
        $(this).find('p').hide()
    },function(){
        $(this).find('p').show()
    })
    // // 点击截图
    $(this).find('li').click(function(){
        $(mask).stop().fadeIn().find('img').attr('src',$(this).find('img').attr('src'));
        $(document).bind('mousewheel', function(event, delta) {return false;});
        // 遮罩体图片的大小
        var liH = $(this).find('img').eq(0).height()*2.5+'px';
        var liW = $(this).find('img').eq(0).width()*2.5+'px';
        $(mask).find('div').css({'height':liH,'width':liW})
        // // 图片位置
        var w = $(window).width()/2;
        var imgW = $(mask).find('div').width()/2;
        var h = $(window).height()/2;
        var imgH = $(mask).find('div').height()/2;
        var l = w - imgW + 'px';
        var t = h - imgH + 'px';
        $(mask).find('div').css({'top':t,'left':l})
    })
    // // 关闭大图
    $(mask).click(function(){
        $(this).stop().fadeOut();
        $(document).unbind('mousewheel');
    })
}
