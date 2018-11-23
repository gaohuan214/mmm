
$(function(){

    //获取地址栏参数
var id = getSearch( "productId");
// console.log(id);
//根据id渲染页面
renderByid( id );

// 根据产品id,获取数据渲染产品详情
function renderByid( id ){
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getproduct',
        data:{
            productid : id,
        },
        dataType: 'json',
        success: function( info ){
            console.log(info);
                    
        //    获取产品的名字
            var str = info.result[0].productName;
            // 获取产品的型号
            var txt = str.split(' ')[0];
            // 动态设置路径导航
            $('.main .proName').text( txt);  

            var htmlStr = template('detailTmp',info);
            $('.main .content .desc').html( htmlStr );

            //根据返回信息,渲染去购买区域
           $('.main .content .goshop').html(info.result[0].bjShop);
           $('.goshop td.p_pic').attr('width','50px');

           
        }   
    })
}

//根据商品id获取该商品的评论信息然后渲染到页面上
$.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getproductcom',
    data:{
        productid : id,
    },
    dataType: 'json',
    success: function( info ){
        console.log(info);
        var htmlStr = template( 'commonTmp',info);
        $('.comm ul').html( htmlStr);
        
    }
})
})