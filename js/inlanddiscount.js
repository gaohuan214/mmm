
;$(function(){

    // 请求折扣页数据
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getinlanddiscount',
        dataType: 'json',
        success: function(info){
            console.log(info);
            var htmlStr = template('discountTmp',info);
            $('.mm_main ul').html( htmlStr);
            
        }
    })
})