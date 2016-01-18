/**
 * Created by consoles on 16-1-18.
 */

'use strict';

(function (){

    const SVG_NS = 'http://www.w3.org/2000/svg',
          XLINK_NS = 'http://www.w3.org/1999/xlink';

    /**
     * 针对已有元素生成其引用
     */
    let use = (origin) => {
        let _use = document.createElementNS(SVG_NS,'use');
        _use.setAttributeNS(XLINK_NS,'xlink:href',`#${origin.id}`);
        return _use;
    }

    /**
     * 生成2个数之间的随机数
     */
    let random = (min,max) => min + (max - min) * Math.random();

    let paper = document.querySelector('svg');

    /**
     * 渲染星星
     */
    let renderStar = () => {
        let starRef = document.getElementById('star');
        let starGroup = document.getElementById('star-group');
        let starCount = 500;

        let star;
        while (starCount--){
            star = use(starRef);
            star.setAttribute('opacity',random(0.1,0.5));
            star.setAttribute('transform',`translate(${random(-400,400)},${random(-300,50)}) scale(${random(0.1,0.6)})`);
            starGroup.appendChild(star);
        }

    }

    renderStar();
}());