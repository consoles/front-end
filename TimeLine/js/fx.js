//  动画函数
var fx = function (fn, begin, end) {

    //  渐出特效
    fx.easeOut = function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    }

    var options = arguments[3] || {};
    var duration = options.duration || 500;
    var ease = options.ease || fx.easeOut;

    startTime = new Date().getTime();

    (function () {
        setTimeout(function () {
            timestamp = new Date().getTime() - startTime;
            fn(ease(timestamp, begin, ( end - begin), duration), 'step');

            if (duration <= timestamp) {
                fn(end, 'end');
            } else {
                setTimeout(arguments.callee, 25);
            }
        }, 25)
    })();
}