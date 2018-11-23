
$(function(){
    //1.获取导航栏数据
    $.ajax({
        type: 'get',
        url:'http://127.0.0.1:9090/api/getindexmenu',
        dataType: 'json',
        success: function(info){
            console.log(info);
            var htmlStr = template('navTmp',info);
            $('.mm_nav ul').html(htmlStr);

        }
    })
    //点击更多(事件委托),隐藏的nav li显示
                                // 属性选择器
      $('.mm_nav').on('click','img[alt="更多"]',function(e){
        e.preventDefault();
        // 第九个li后加缓动效果
        $('.mm_nav li:nth-child(n+9)').slideToggle();
   });


    //2.获取折扣界面数据
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        dataType: 'json',
        success: function(info){
            console.log( info );
            var htmlStr = template('infoTmp',info);
            $('.mm_content .info').html( htmlStr );      
        }  
    })

    // 点击折扣区域单个商品,跳转到商品详情页

    
});