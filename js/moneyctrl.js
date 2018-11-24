
// 渲染页面


var pageid = 0;


 renderByPage( 0 );
//封装渲染信息部分
 function renderByPage( pageid ){
    //列表信息部分
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        data: {
            pageid : pageid,
        },
        dataType: 'json',
        success: function(info){ 
            console.log(info);
                  
            var htmlStr = template('infoTmp' ,info);
            $('.mm_content .info').html( htmlStr ); 

            /* -----分页部分------*/
            //获取总页数
            var total = Math.ceil( info.totalCount/info.pagesize);
            console.log(total);
            
            // 动态添加下拉数据,判断total部分,为NaN,页面显示器
            var str = ""
            if(total){   
                for(i=1; i <= total;i++){
                    if(i==1){
                        str += ' <li class="current"><a href="#">'+i+'/'+total+'</a></li>';
                       
                    }else{
                        str +=' <li><a href="#">'+i+'/'+total+'</a></li>';
                    }                  
                }
            // 将总页码动态设置给显示的页面区域
             $('.pagination .page').text('1/'+total);

            }else{              
                $('.pagination .page').text(' ');
                // console.log(1);             
            }  
            //渲染下拉列表数据     
           $('.pagination ul').html( str );

            // 点击下一页,重新渲染下一页
            $('.btn-next').click(function(){
                if(pageid>=total-1){
                    return;
                }
                pageid ++;                 
                    renderByPage(pageid);          
            })

            // 点击上一页,重新渲染上一页
            $('.btn-prev').click(function(){
                if(pageid <= 0 ){
                    return;
                }
                pageid --;                  
                renderByPage(pageid);                                    
            })

             // 动态设置页码
             if(total){   
                             
                 $('.pagination .page').text( (pageid+1)+'/'+total);    
             }else{
                $('.pagination .page').text(" "); 
             }                
        }
    })
}
//点击页码显示区域切换显示下拉列表
$('.pagination .page').click(function(){
    $('.pagination .dropdown ul').slideToggle();
    //点击下拉列表中每一项,动态赋值给页面显示区域,隐藏下拉框
    $('.pagination .dropdown ul').on('click','li',function(){
        var txt = $('this').text();
        var index = $(this).index();
        //同步页码
        pageid = index;
        renderByPage( index );
        // console.log(index);
        $('.pagination .page').text(txt);
        $('.pagination .dropdown ul').hide(); 
    })
    })



