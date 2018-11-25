
//渲染白菜价页面
;$(function(){

    // 1.取白菜价页面的tab栏标题数据并渲染到标题
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
        dataType: 'json',
        success: function( info ){
            // console.log( info);
            var htmlStr = template('navBarTmp',info);
            $('.navbar ul').html( htmlStr );
            //声明变量存储所有li的width
            var widthTotal = 0;
            //动态计算ul的宽度
            $('.navbar ul li').each(function(index,ele){                      
             widthTotal += $(ele).innerWidth();              
            })
            $('.navbar ul').width( widthTotal +'px' );
            // ;区域滚动
            var myScroll = new IScroll('#wrapper', {
                scrollX: true,
                scrollY:false,
            });
            //渲染默认项
            render(0)
        }
    });

    //点击标题,给点击的li添加current的类
    $('.navbar ul').on('click','a',function(){
    //排他
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
    //获取id
    var id = $(this).data('id');
    render(id);
  
        
    })
    //封装根据标题id获取白菜页面商品列表方法
    function render( id ){
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getbaicaijiaproduct',
            data: {
                titleid: id,
            },
            dataType: 'json',
            success: function( info ){
                console.log(info);
                var htmlStr = template('goodsTmp',info);
                $('.container .info').html( htmlStr)
            }
        })
    }
})

