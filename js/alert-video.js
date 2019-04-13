/* 
点击缩略图弹出视频
缩略图和视频的名字一致
视频为mp4格式
*/
;$.fn.alertVideo = function(){
    $('.mask').hide();
    $(this).click(function(){
        $('.mask').show();
        var imgSrc = $(this).siblings().attr('src');
        imgSrc =  imgSrc.match(/\/([0-9a-zA-Z_])*\./)[0];
        var html = `
            <div class="video-close">
                <img src="./static/images/closeBtn.png">
            </div>
            <video id="video_play" autoplay style="object-fit: fill; width:760px; height:400px; vertical-align: middle;" loop controls="true"  x5-video-orientation="landscape">
                <source src="./static/video${imgSrc}mp4" type="video/mp4" >
            </video>`;
        $('.maskVideoWrap').append(html);
        $('.video-close').click(function(){
            $('.mask').hide()
            $('.maskVideoWrap video').remove();
        })
    })
    // 阻止遮罩层滚轮事件冒泡
    $('.mask').on('mousewheel',(function(){
        if(window.event){//IE下阻止默认事件
            event.returnValue = false;
        }else{
            event.preventDefault();
        }
    }));
} 
