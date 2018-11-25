
$(function(){

    var id = getSearch( 'couponid');
    renderById( id );
    //根据productid获取对应数据
    function renderById( id ){
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getcouponproduct',
            data: {
                couponid: id
            },
            dataType: 'json',
            success: function( info ){
                console.log(info);
                var htmlStr = template('couponproductTmp',info);
                $('.mm_main ul').html(htmlStr);

            }
        })
    };


    //点击列表中数据,弹出对应商品的图片,模态框
    $('.mm_main ul').on('click','a',function(e){
       var imgs = $(this).find('.left img');
       var str="";
        imgs.each(function(index,ele){
            var src = $(this).attr('src');
             str += index==0?'<div class="item active">':'<div class="item">';
             str += ' <img src="'+src+'" alt="...">';
             str += ' </div>'
        });
        console.log(str)
       $('.imgmodal').removeClass('hide');
       $('.imgmodal .content .carousel-inner').html(str);
    })
    //模态框隐藏
    $('.imgmodal .close1').click(function(){
        $('.imgmodal').addClass('hide');
    })
})