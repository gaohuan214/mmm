
//一进入分类页,渲染商品分类标题
$(function(){
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getcategorytitle',
        dataType: 'json',
        success: function(info){
            console.log(info);
            var  htmlStr = template( 'cateTitleTmp',info);
            $('.cate_main').html( htmlStr );
            list();
        }
    });

    // 点击分类标题 下箭头,显示对应分类列表
    function list(){
        $('.cate_main').on('click','.item>a',function(){
            var id= $(this).data('id');
    
            $.ajax({
                type: 'get',
                url: 'http://127.0.0.1:9090/api/getcategory',
                data:{
                    titleid: id,
                },
                dataType: 'json',
                success: function(info){
                    console.log(info);
                    var htmlStr = template('listTmp',info);
                    $('.cate_main .item ul').html(htmlStr);
                }
            }) 
          $(this).siblings().stop().slideToggle();
        })
    }

  
})