/**
 * Created by gaopengfei on 2016/8/20.
 */

var g = function (id) {
    return document.getElementById(id);
};
//时间类函数
var Timeline = function () {
    this.order = [];//动画序列
    this.add = function (timeout, func, log) {
        this.order.push({
            timeout: timeout,
            func: func,
            log: log
        });
        //支持快进
        this.start = function (ff) {
            for (var i in this.order) {
                (function (me) {
                    var fn = me.func,
                        timeout = me.timeout,
                        log = me.log;
                    timeout = Math.max(timeout - (ff || 0), 0);

                    setTimeout(fn, timeout);
                    setTimeout(function () {
                        console.log('time:', timeout, 'log:', log);
                    }, timeout);
                })(this.order[i]);
            }
        };
    };
};

//操作行为
var s = new Timeline();
var s2 = new Timeline();
var s3 = new Timeline();
var s4 = new Timeline();

//入场动画
s.add(0, function () {
    g('c_zongzi_box').className = 'c_zongzi_box c_rock';
    g('c_shengzi_1').onclick = function () {
        s2.start();
    };
}, '抖动了');
//点击后
s2.add(0, function () {
    g('c_zongzi_box').className = 'c_zongzi_box';
    g('text').className = 'text text_in';
}, '动画开始了，我也不抖了');
s2.add(100, function () {
    g('c_shengzi_1').className = 'c_shengzi_2';
}, '绳子2了');
s2.add(600, function () {
    g('c_shengzi_1').className = 'c_shengzi_3';
}, '绳子3了');
s2.add(1100, function () {
    g('c_shengzi_1').className = 'c_shengzi_4';
    g('caption').className = 'caption caption_rock';
}, '绳子4了');
s2.add(2100, function () {
    g('c_zongzi').className = 'c_zongzi_out';
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_ins';
    g('c_zuoye').className = 'c_zuoye c_zuoye_in';
    g('c_youye').className = 'c_youye c_youye_in';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_ins';
}, '皮换肉了,叶子和字出来');
s2.add(3600, function () {
    g('c_zuoye').className = 'c_zuoye c_zuoye_in c_zuoye_out';
    g('c_youye').className = 'c_youye c_youye_in c_youye_out';
    g('c_diye').className = 'c_diye c_diye_in';
    g('c_t_1').onclick = function () {
        g('c_t_1').setAttribute('s4start', 'on');
        s4.start();
        g('c_t_1').onclick = null;
    };
    if (g('c_t_1').getAttribute('s4start') != 'on') {
        s3.start(1200);
        g('c_t_1').onclick = null;
    }
}, '叶子换大叶子');
//旋转
s3.add(1200, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_view2';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_v2 ';
    g('c_t_2').className = 'c_t_2 c_t_in c_t_m2';
});
s3.add(1600, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_view3';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_v3';
    g('c_t_2').className = 'c_t_2 c_t_in c_t_m3';
});
s3.add(2000, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_view4';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_v4';
    g('c_t_2').className = 'c_t_2 c_t_in c_t_m4';
});
s3.add(2400, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_m0';
    g('c_t_2').className = 'c_t_2 c_t_in c_t_v0';
});
s3.add(4400, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_view4';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_v4';
    g('c_t_2').className = 'c_t_2 c_t_in c_t_m4';
});
s3.add(4800, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_view3';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_v3';
    g('c_t_2').className = 'c_t_2 c_t_in c_t_m3';
});
s3.add(5200, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_view2';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_v2';
    g('c_t_2').className = 'c_t_2 c_t_in c_t_m2';
});
s3.add(5600, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_v0';
    g('c_t_2').className = 'c_t_2 c_t_in c_t_m0';
    g('c_t_1').onclick = function () {
        g('c_t_1').setAttribute('s4start', 'on');
        s4.start();
        g('c_t_1').onclick = null;
    };
});
s3.add(8000, function () {
    if (g('c_t_1').getAttribute('s4start') != 'on') {
        s3.start(1200);
    }
});

s4.add(100, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_v1';
    g('c_zongzirou2').className = 'c_zongzirou2 c_zongzirou2_v1';
    g('c_t_3').className = 'c_t_3 c_t_in c_t_t1';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_tx1';
});
s4.add(600, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_v2';
    g('c_zongzirou2').className = 'c_zongzirou2 c_zongzirou2_v2';
    g('c_t_3').className = 'c_t_3 c_t_in c_t_t2';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_tx2';
});
s4.add(1100, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_v3';
    g('c_zongzirou2').className = 'c_zongzirou2 c_zongzirou2_v3';
    g('c_t_3').className = 'c_t_3 c_t_in c_t_t3';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_tx3';
});
s4.add(1600, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_v4';
    g('c_zongzirou2').className = 'c_zongzirou2 c_zongzirou2_v4';
    g('c_t_3').className = 'c_t_3 c_t_in c_t_t4';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_tx4';
});
s4.add(2600, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_v3';
    g('c_zongzirou2').className = 'c_zongzirou2 c_zongzirou2_v3';
    g('c_t_3').className = 'c_t_3 c_t_in c_t_t3';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_tx3';
});
s4.add(3100, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_v2';
    g('c_zongzirou2').className = 'c_zongzirou2 c_zongzirou2_v2';
    g('c_t_3').className = 'c_t_3 c_t_in c_t_t2';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_tx2';
});
s4.add(3600, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in c_zongzirou_v1';
    g('c_zongzirou2').className = 'c_zongzirou2 c_zongzirou2_v1';
    g('c_t_3').className = 'c_t_3 c_t_in c_t_t1';
    g('c_t_1').className = 'c_t_1 c_t_in c_t_tx1';
});
s4.add(4100, function () {
    g('c_zongzirou').className = 'c_zongzirou c_zongzirou_in';
    g('c_zongzirou2').className = 'c_zongzirou2';
    g('c_t_3').className = 'c_t_3';
    g('c_t_1').className = 'c_t_1 c_t_in';
});
s4.add(4500, function () {
    g('c_t_1').setAttribute('s4start', 'off');
    s3.start();
});

//图片加载器
var imgs = ['images/zzr_2.png', 'images/zzr_3.png', 'images/zzr_4.png'];
var imgs_onload = function () {
    imgs.pop();
    if (imgs.length === 0) {
        s.start();
    }
};
for (var j in imgs) {
    var img = new Image();
    img.onload = imgs_onload;
    img.src = imgs[j];
}