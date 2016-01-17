/**
 * Created by consoles on 16-1-17.
 *
 * 通过脚本控制路径文本
 */
'use strict';

(function(){
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const XLINK_NS = 'http://www.w3.org/1999/xlink';

    let text = document.getElementById('text');
    let select = document.getElementsByTagName('select')[0];
    let tspan = document.getElementsByTagName('tspan')[0];

    let addTextPath = () => {
        let textPath = document.createElementNS(SVG_NS,'textPath');
        while (text.firstChild){
            textPath.appendChild(text.firstChild);
        }
        text.appendChild(textPath);
    }

    let setTextPath = (path) => {
        let textPath = text.firstChild;
        textPath.setAttributeNS(XLINK_NS,'xlink:href',path);

        let pathElement = document.querySelector(path);
        tspan.setAttribute('fill',pathElement.getAttribute('stroke'));
    }

    let removeTextPath = () => {
        let textPath = text.firstChild;
        while (textPath.firstChild){
            text.appendChild(textPath.firstChild);
        }
        text.removeChild(textPath);
        tspan.removeAttribute('fill');
    }

    select.addEventListener('input',function(){
        let value = select.value;
        if (text.firstChild.tagName && text.firstChild.tagName.toLowerCase() == 'textpath'){
            removeTextPath();
            if (value != 'none'){
                addTextPath();
                setTextPath(value);
            }
        } else {
            if (value != 'none'){
                addTextPath();
                setTextPath(value);
            }
        }
    });
}());
