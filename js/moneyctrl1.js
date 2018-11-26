
// 渲染页面


var currentPage = 0;
//声明一个变量存储总页数
var total

 renderByPage( 0 );
//封装渲染信息部分
 function renderByPage( currentPage ){
    //列表信息部分
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        data: {
            pageid : currentPage,
        },
        dataType: 'json',
        success: function(info){ 
            // console.log(info);
            var htmlStr = template('infoTmp' ,info);
            $('.mm_content .info').html( htmlStr ); 

            /* -----分页部分------*/
            //获取总页数
            total = Math.ceil( info.totalCount/info.pagesize);
            // console.log(total);
            
            // 动态添加下拉数据,判断total部分,为NaN,页面显示器
            var str = "";
            //判断是否有数据,对应处理页面显示区域
            if(total){
                //给当前页设置高亮效果.默认第一页
                for(i=1; i <= total;i++){
                    if(i==currentPage+1){
                        str += ' <li class="current"><a href="#">'+i+'/'+total+'</a></li>';
                       
                    }else{
                        str +=' <li><a href="#">'+i+'/'+total+'</a></li>';
                    }                  
                }
            // 将总页码动态设置给显示的页面区域
             $('.pagination .page').text('1/'+total);

            }else{              
                $('.pagination .page').text(' ');
            }
            //渲染下拉列表数据     
           $('.pagination ul').html( str );

            // // 点击下一页,重新渲染下一页
            // $('.btn-prev').click(function(){
            //     if(currentPage <= 0 ){
            //         return;
            //     }
            //     currentPage --;
            //     renderByPage(currentPage);
            // })
            // // 点击上一页,重新渲染上一页
            // $('.btn-next').click(function(){
            //     // console.log(currentPage);
            //     if(currentPage>=total-1){
            //         return;
            //     }
            //     currentPage ++;
            //     renderByPage(currentPage);
            // });

             // 动态设置页码
             if(total){
                 $('.pagination .page').text( (currentPage+1)+'/'+total);
             }else{
                $('.pagination .page').text(" "); 
             }                
        }
    })
}

//点击页码显示区域切换显示下拉列表
$('.pagination .page').click(function(){
    $('.pagination .dropdown ul').stop().slideToggle();

});
//点击下拉列表中每一项,动态赋值给页面显示区域,隐藏下拉框
$('.pagination .dropdown ul').on('click','li',function(){
    var txt = $('this').text();
    var index = $(this).index();
    renderByPage( index );
    $('.pagination .page').text(txt);
    $('.pagination .dropdown ul').hide();

    //同步页码
    currentPage = index;
});

//下一页
// function next(){
    $('.btn-prev').click(function(){
        if(currentPage <= 0 ){
            return;
        }
        currentPage --;
        renderByPage(currentPage);
    })
// }
//上一页
// function prev(){
    $('.btn-next').click(function(){
        console.log(currentPage);
        if(currentPage>=total-1){
            return;
        }
        currentPage ++;
        renderByPage(currentPage);
    });
// }



