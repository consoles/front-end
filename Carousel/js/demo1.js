/**
 * Created by gaopengfei on 2016/5/2.
 */

var container = document.querySelector('.container'),
    list = document.querySelector('.list'),
    imgs = document.querySelectorAll('.img'),
    buttons = document.querySelectorAll('.buttons span'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next');

var index = 0;

var animated = false;

var timer;

const IMAGE_WIDTH = 600;

const COUNT_OF_IMAGE = imgs.length;

next.addEventListener('click', function () {
    goNext();
});
prev.addEventListener('click', function () {
    goPrev();
});
Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener('click', function (ev) {
        if (this.className === 'on') {
            return;
        }
        var currentIndex = parseInt(this.getAttribute('data-index'));
        var offset = currentIndex - index;
        goTo(offset);
    });
});

/**
 * 根据第几章图点亮小圆点
 */
var showButton = function () {
    // 注意：我们无法终止`Array.prototype.forEach`,除非抛出一个异常。而这样总是错误的！
    // 参见：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    // 如果仅仅是想要进行某项检测，可以使用
    // [Array.prototype.some](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
    Array.prototype.some.call(buttons, function (button) {
        if (button.classList.contains('on')) {
            return button.classList.remove('on');
        }
    });
    buttons[index].classList.add('on');
};

var goNext = function () {
    goTo(1);
};

var goPrev = function () {
    goTo(-1);
};

var goTo = function (offset) {
    if (!animated) {
        _animate(offset);
    }
};

/**
 * 根据传入的offset改变容器的left
 * @param offset 位移单位数，实际的位移宽度应该用该数目乘以每个图片的宽度
 */
var _animate = function (offset) {

    console.log('offset:', offset);

    if (Math.abs(offset) > COUNT_OF_IMAGE) {
        throw Error('切换数量不合法！');
    }

    var _offset = -offset * IMAGE_WIDTH;

    animated = true;

    var time = 300, // 位移总时间
        interval = 10, // 位移间隔时间
        speed = _offset / (time / interval); // 每次位移量

    var newLeft = parseInt(list.style.left) + _offset; // 目标left值

    var go = function () {
        if (speed < 0 && parseInt(list.style.left) > newLeft || speed > 0 && parseInt(list.style.left) < newLeft) {
            list.style.left = parseInt(list.style.left) + speed + 'px';
            setTimeout(go, interval);
        } else {
            animated = false;

            list.style.left = newLeft + 'px';
            if (newLeft > -IMAGE_WIDTH) {
                list.style.left = -IMAGE_WIDTH * COUNT_OF_IMAGE + 'px';
            }
            if (newLeft < -IMAGE_WIDTH * COUNT_OF_IMAGE) {
                list.style.left = -IMAGE_WIDTH + 'px';
            }
        }
    };
    go();

    index += offset;
    if (index === COUNT_OF_IMAGE) {
        index = 0;
    } else if (index === -1) {
        index = COUNT_OF_IMAGE - 1;
    }
    console.log('index:', index);

    showButton();
};

var play = function () {
    timer = setInterval(function () {
        goNext();
    }, 3000);
};

var stop = function () {
    clearInterval(timer);
};

container.addEventListener('mouseover', function () {
    stop();
});
container.addEventListener('mouseout', function () {
    play();
});

play();