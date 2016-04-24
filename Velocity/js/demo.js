(function ($) {

    var $container = $('.container');
    var $box = $('.box');
    var $buddy = $('.buddy');
    var $pop = $('.pop');
    var $open = $('.btn');
    var $close = $('.close');
    var $imgs = $pop.find('img');

    // 入场动画
    $.Velocity.RegisterUI('lixin.slideUpIn', {
        defaultDuration: 500,
        // 结束位置，开始位置
        calls: [
            [{opacity: [1, 0], translateY: [0, 100]}]
        ]
    });
    // 出场动画
    $.Velocity.RegisterUI('lixin.slideDownOut', {
        defaultDuration: 300,
        calls: [
            [{opacity: [0, 1], translateY: [100, 0]}]
        ]
    });
    // 卡片弹出式入场效果
    $.Velocity.RegisterUI('lixin.scaleIn', {
        defaultDuration: 300,
        calls: [
            [{opacity: [1, 0], scale: [1, 0.3]}]
        ]
    });
    // 关闭按钮出场动画
    $.Velocity.RegisterUI('lixin.scaleOut', {
        defaultDuration: 300,
        calls: [
            [{opacity: [0, 1], scale: [.3, 1]}]
        ]
    });

    var seqInit = [{
        elements: $container,
        properties: 'lixin.slideUpIn',
        options: {
            delay: 300
        }
    }, {
        elements: $box,
        properties: 'lixin.slideUpIn',
        options: {
            sequenceQueue: false
        }
    }, {
        elements: $buddy,
        properties: 'lixin.slideUpIn',
        options: {
            sequenceQueue: false,
            delay: 60
        }
    }];
    var seqClick = [{
        elements: $container,
        properties: 'lixin.slideDownOut'
    }, {
        elements: $box,
        properties: 'lixin.slideDownOut',
        options: {
            sequenceQueue: false
        }
    }, {
        elements: $container,
        properties: 'lixin.slideUpIn'
    }, {
        elements: $pop,
        properties: 'lixin.slideUpIn',
        options: {
            sequenceQueue: false
        }
    }, {
        elements: $imgs,
        properties: 'lixin.scaleIn'
    }];
    var seqClose = [{
        elements: $imgs,
        properties: 'lixin.scaleOut'
    }, {
        elements: $container,
        properties: 'lixin.slideDownOut'
    }, {
        elements: $pop,
        properties: 'lixin.slideDownOut',
        options: {
            sequenceQueue: false
        }
    }, {
        elements: $container,
        properties: 'lixin.slideUpIn'
    }, {
        elements: $box,
        properties: 'lixin.slideUpIn',
        options: {
            sequenceQueue: false
        }
    }];
    $.Velocity.RunSequence(seqInit);
    // 点击按钮动画
    $open.click(function () {
        $.Velocity.RunSequence(seqClick);
    });
    $close.click(function () {
        $.Velocity.RunSequence(seqClose);
    });
})(jQuery);