
$(function(){

    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getbrandtitle',
        dataType: 'json',
        success: function( info ){
            console.log(info)
            var  htmlStr = template( 'cateTitleTmp',info);
            $('.cate_main .lists').html( htmlStr );
        }
    })


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
    };


    //点击大的分类,渲染对应数据
    $('.cate_main  ul').on('click','a',function(){

        var id = $(this).data('id');
       $('.cate_hot').removeClass('hide');
       $('.cate_main').addClass('hide');

       //根据品牌的标题id获取该品牌标题下的十大品牌列表 并渲染到十大品牌列表里面
       $.ajax({
           type: 'get',
           url: 'http://127.0.0.1:9090/api/getbrand',
           data: {
               brandtitleid: id,
           },
           dataType: 'json',
           success: function( info ){
               console.log(info);
               var htmlStr = template('top10Tmp',info);
               $('.top10 ul').html( htmlStr)
           }
       });

       //根据品牌的标题id获取该品牌标题下的十大品牌的销量排行列表商品 并渲染到该品牌的销量排行商品列表里面
        $.ajax({
            type: 'get',
            url: 'http://127.0.0.1:9090/api/getbrandproductlist',
            data:{
                brandtitleid: id,
                pagesize: 4,
            },
            dataType: 'json',
            success: function( info ){
                console.log(info);
                var htmlStr = template( 'infoTmp',info);
                $('.cate_hot .info').html(htmlStr);
                var productid=$('.cate_hot .info a').eq(0).data('id');
                var src = $('.info img').eq(0).attr('src');
                var txt = $('.info .desc').eq(0).text();
                // rendeComm( productid );
                console.log(productid);
                //优化,返回品牌大全
                $('.title a.all').text('品牌大全');
                $('.title a.all').attr('href','brandTitle.html');

                //渲染评论
                $.ajax({
                    type: 'get',
                    url: 'http://127.0.0.1:9090/api/getproductcom',
                    data: {
                        productid: productid,
                    },
                    dataType: 'json',
                    success: function( info ){
                        console.log(info);
                        var htmlStr = template( 'commitTmp',info);
                        $('.commit ul').html( htmlStr);
                        $('.commit .top img').attr('src',src);
                        $('.commit .top p').text(txt);

                    }
                })



            }
        });

        //根据商品id获取该商品的评论信息然后渲染到页面上
        function rendeComm( id ){
            $.ajax({
                type: 'get',
                url: 'http://127.0.0.1:9090/api/getproductcom',
                data: {
                    productid: id,
                },
                dataType: 'json',
                success: function( info ){
                    console.log(info);
                    var htmlStr = template( 'commitTmp',info);
                    $('.commit ul').html( htmlStr);
                    $('.commit .top img').attr('src',src);
                    $('.commit .top p').text(txt);

                }
            })
        }


    })

})