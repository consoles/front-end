/**
 * Created by gaopengfei on 2015/6/27.
 */

$(function () {
   $(window).scroll(function () {
       var top = $(document).scrollTop();
       console.info('滚动条距离浏览器顶部：' + top);
       var menu = $('#menu');
       var items = $('#content').find('.item');

       var currentId = '';    // 当前所在楼层的#id（item）
       items.each(function () {
           var This = $(this);
           var itemTop = This.offset().top;
           console.info('每一个item距离页面顶部' + itemTop);
           if(top > itemTop - 300){
               currentId = '#' + This.attr('id');
           }else{
               return false;
           }
       });

       console.debug(currentId);
       // 给相应的楼层设置current这个类，取消其他链接的current
       var currentLink = menu.find('.current');
       if (currentId && currentLink.attr('href') != currentId){
           currentLink.removeClass('current');
           menu.find('[href='+ currentId +']').addClass('current');
       }
   });
});