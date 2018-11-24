
$(function(){
    //根据地址栏参数,获取产品id
    var id  = getSearch('productId');
    render(id)
function render(id){
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getmoneyctrlproduct',
        data: {
            productid : id,
        },
        dataType: 'json',
        success: function( info ){
            console.log(info);
            var htmlStr = template('detailTmp', info);
            $('.content').html( htmlStr);
        }

    })
}
  
})