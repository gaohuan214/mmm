// 根据地址栏获取参数
function getSearch( k ){
    var jsonStr = location.search;
    var str = decodeURI(jsonStr);
     str = str.slice(1);
     var arr = str.split('&');
     var obj = {};
     arr.forEach(function(v,i){
       var key = v.split('=')[0];
       var vaule = v.split('=')[1];
       obj[key] = vaule;
     })
     
    return obj[k]; 
    
}
