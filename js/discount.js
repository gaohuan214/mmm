
$(function(){

    var id = getSearch('productid');
    console.log(id);
    
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getdiscountproduct',
        data:{
            productid: id,
        },
        dataType: 'json',
        success: function(info){
            console.log(info);
            var htmlStr = template('detailTmp', info);
            $('.content').html( htmlStr);
            
        }
    })
})