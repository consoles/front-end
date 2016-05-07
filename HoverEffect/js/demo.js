/**
 * Created by gaopengfei on 2016/5/3.
 */

;
(function (window, undefined) {

    function Hotspot() {
        this.init();
    }

    Hotspot.prototype = {
        init: function () {
            this.onHotspotHover();
        },
        onHotspotHover: function () {
            var hotSpots = this.$$('hotSpot'),
                len = hotSpots.length,
                i,
                that = this,
                currentDetailImg;

            for (i = 0; i < len; i++) {
                currentDetailImg = that.$$('detailImg', hotSpots[i])[0];
                currentDetailImg.timer = null;
                currentDetailImg.alpha = 0;
                hotSpots[i].onmouseover = function () {
                    that.doTransform(that.$$('detailImg', this)[0], 100);
                    that.$$('hotSpotSpan', this)[0].style.display = 'none';
                };
                hotSpots[i].onmouseout = function () {
                    that.doTransform(that.$$('detailImg', this)[0], 0);
                    that.$$('hotSpotSpan', this)[0].style.display = 'block';
                };
            }
        },
        doTransform: function (me, alpha) {
            var times = 0;
            if (alpha === 100) {
                times = 5;
            } else {
                times = -5;
            }
            me.style.display = 'block';
            clearInterval(me.timer);
            me.timer = setInterval(function () {
                if (me.alpha === alpha) {
                    clearInterval(me.timer);
                    if (alpha === 0) {
                        me.style.display = 'none';
                    }
                } else {
                    me.alpha += times;
                    me.style.opacity = me.alpha / 100;
                    me.style.filter = 'alpha(opacity:' + me.alpha + ')';
                }
            }, 30);
        },
        $$: function (className, element) {
            if (document.getElementsByClassName) {
                return (element || document).getElementsByClassName(className);
            }
            var nodes = (element || document).getElementsByTagName('*'),
                elements = [],
                len = nodes.length,
                i,
                j,
                currentNode,
                classNames,
                classLength;

            for (i = 0; i < len; i++) {
                currentNode = nodes[i];
                classNames = currentNode.className.split(' ');
                classLength = classNames.length;

                for (j = 0; j < classLength; j++) {
                    if (classNames[j] === className) {
                        elements.push(currentNode);
                        break;
                    }
                }
            }
            return elements;
        }
    };

    new Hotspot();
})(window);