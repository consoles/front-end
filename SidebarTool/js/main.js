/**
 * Created by yiihua-013 on 16/6/19.
 */

requirejs.config({
    paths: {
        jquery: '../node_modules/jquery/dist/jquery.min'
    }
});

requirejs(['jquery', 'backtop'], function ($, backtop) {

    // new backtop.BackTop($('#backTop'),{
    //     mode:'move',
    //     pos:100,
    //     speed:2000
    // });

    $('#backTop').backtop({
        mode: 'move'
    });

    // 测试jquery已经被成功引入了
    // $('body').css('background','red');

    //  var scroll = new scrollto.ScrollTo({});
    //  // 改变this指向为scroll实例对象
    //  // $('#backTop').on('click',$.proxy(scroll.go,scroll));
    // $('#backTop').on('click',$.proxy(scroll.move,scroll));
    //  $(window).on('scroll',function () {
    //      checkPosition($(window).height());
    //  });
    //  checkPosition($(window).height());
    //  function move() {
    //      // 滚动条大部分是位于html上的，而对于像chrome这样的浏览器，它是位于body上的
    //      $('html,body').animate({
    //          scrollTop:0
    //      },800);
    //  }
    //  function go(){
    //      $('html,body').scrollTop(0);
    //  }
    //  function checkPosition(pos) {
    //      if($(window).scrollTop() > pos){
    //          $('#backTop').fadeIn();
    //      } else {
    //          $('#backTop').fadeOut();
    //      }
    //  }
});