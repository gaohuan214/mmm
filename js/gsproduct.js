
;$(function(){

    //请求凑单店铺栏数据
    function renderShop(){
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getgsshop',
            dataType: 'json',
            success: function( info ){
                // console.log(info);
                var htmlStr = template('selectTmp',info);
                $('.dropdown').html( htmlStr );

            }
        })
    }

    //请求区域数据
    function renderArea(){
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getgsshoparea',
            dataType: 'json',
            success: function( info){
                // console.log(info);
                var htmlStr = template('selectTmp',info);
                $('.dropdown').html( htmlStr );
            }
        })
    };


    //点击京东,显示隐藏区域
    $('.select li.shop').click(function(){
        $('.dropdown').slideToggle();
        renderShop();
    });

    //点击区域(华山),显示区域数据
    $('.select li.area').click(function(){
        $('.dropdown').slideToggle();
        renderArea();
    })

    //给下拉列表添加点击事件
    var shopid =0;
    var areaid =0;
    $('.dropdown').on('click','li',function(){
        if(this.hasAttribute('data-shopid')){
            shopid= $(this).data('shopid');

            $('.shop span').text($(this).text());

        }else if(this.hasAttribute('data-areaid')){
            areaid = $(this).data('areaid');
            $('.area span').text($(this).text());
        }
        $('.dropdown').hide();
        render(shopid,areaid);
    });

    // 默认渲染
    render(shopid,areaid);
    //请求商品数据
    function render(shopid,areaid){
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getgsproduct',
            data: {
                shopid: shopid,
                areaid: areaid,
            },
            dataType: 'json',
            success: function( info ){
                // console.log(info);
                var htmlStr = template('listsTmp',info);
                $('.lists ul').html( htmlStr);
            }
        })
    }

})