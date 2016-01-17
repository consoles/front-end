/**
 * Created by consoles on 16-1-17.
 *
 * 使用SVG生成正弦字体
 *
 * y = Asin(wx + t)
 */
'use strict';

(function(){

    const NS = 'http://www.w3.org/2000/svg';
    const TEXT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let n = TEXT.length;
    let x = [];
    let y = null;
    let i = n;

    let t = 0;
    const A = 25;
    let w = 0.02;

    while (i--){
        x.push(10);
        let tspan = document.createElementNS(NS,'tspan');
        tspan.textContent = TEXT[n - i - 1];
        sintext.appendChild(tspan);
        let h = Math.round(360 / 26 * i);
        tspan.setAttribute('fill',`hsl(${h},100%,80%)`);
    }

    let arrange = function(t){
        y = [];
        let ly = 0,cy;
        for (let i = 0;i < n;i++){
            cy = A * Math.sin(i * 20 * w + t);
            y.push(cy - ly);
        }
        console.table(y);
    };

    let render = function(){
        sintext.setAttribute('dx', x.join(' '));
        sintext.setAttribute('dy', y.join(' '));
    };

    let frame = function(){
        t += 0.03;
        arrange(t);
        render();
        requestAnimationFrame(frame);
    };
    frame();
}());