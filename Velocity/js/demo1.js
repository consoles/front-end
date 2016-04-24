(function ($) {

    // 传统callback实现链式动画
    //$('#div1').velocity({
    //    width:300
    //},{
    //    duration:3000,
    //    complete:function(){
    //        $('#div2').velocity({
    //            width:300
    //        },{
    //            duration:3000,
    //            complete:function(){
    //                $('#div3').velocity({
    //                    width:300
    //                },{
    //                    duration:3000
    //                });
    //            }
    //        });
    //    }
    //});

    // 使用动画序列
    //var seq = [{
    //    elements:$('#div1'),
    //    properties:{width:300},
    //    options:{duration:1000}
    //},{
    //    elements:$('#div2'),
    //    properties:{width:300},
    //    options:{duration:1000}
    //},{
    //    elements:$('#div3'),
    //    properties:{width:300},
    //    options:{duration:1000}
    //}];
    //$.Velocity.RunSequence(seq);

    $('#div1').on('mouseover', function () {
        // velocity预定义动画，参见http://julian.com/research/velocity/，搜索关键字Pre-Registered
        $(this).velocity('callout.shake');
    });

    // 自定义velocity动画
    $.Velocity.RegisterEffect('lixin.pulse', {
        defaultDuration: 300,
        calls: [
            [{scaleX: 1.1}, 0.5],
            [{scaleX: 1.2}, 0.3],
            [{scaleX: 1.0}, 0.2]
        ]
    });
    $('#div2').on('mouseover', function () {
        $(this).velocity('lixin.pulse');
    });
})(jQuery);