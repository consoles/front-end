/**
 * Created by consoles on 16-1-9.
 */

'use strict';
(function(){
   const SVG_NS = 'http://www.w3.org/2000/svg';

   // graphy and the default attrs
   let shapeInfo = {
       rect:'x:10,y:10,width:200,height:100,rx:0,ry:0',
       circle:'cx:200,cy:200,r:50',
       ellipse:'cx:200,cy:200,rx:80,ry:30',
       line:'x1:10,y1:10,x2:100,y2:100'
   };

   // default common attrs
   let defaultAttrs = {
       fill:'#ffffff',
       stroke:'#ff0000'
   };

   let createForm = document.getElementById('create-shape'),
       attrForm = document.getElementById('shape-attrs'),
       lookForm = document.getElementById('look-and-transform');

   let svg = createSVG();
   let selected = null;

   createForm.addEventListener('click',function(e){
       if (e.target.tagName.toLowerCase() === 'button')
           create(e.target.getAttribute('create'));
   });

   attrForm.addEventListener('input',function(e){
       if (e.target.tagName.toLowerCase() != 'input')
           return;
       let handle = e.target;
       selected.setAttribute(handle.name,handle.value);
   });

   lookForm.addEventListener('input',function(e){
       if (e.target.tagName.toLowerCase() != 'input' || !selected)
           return;
       selected.setAttribute('fill',fill.value);
       selected.setAttribute('stroke',stroke.value);
       selected.setAttribute('stroke-width',strokeWidth.value);
       selected.setAttribute('transform',encodeTransform({
           tx:translateX.value,
           ty:translateY.value,
           scale:scale.value,
           rotate:rotate.value
       }));
   });

   svg.addEventListener('click',function(e){
        if (e.target.tagName.toLowerCase() in shapeInfo)
            select(e.target);
    });

   function createSVG(){
       let svg = document.createElementNS(SVG_NS,'svg');
       svg.setAttribute('width','100%');
       svg.setAttribute('height','100%');
       canvas.appendChild(svg);
       return svg;
   }

   function create(name){
       let shape = document.createElementNS(SVG_NS,name);
       svg.appendChild(shape);
       select(shape);
   }

   function select(shape){
       let attrs = shapeInfo[shape.tagName].split(',');
       console.log(attrs);
       let attr,name,value;

       attrForm.innerHTML = '';

       while (attrs.length){
           attr = attrs.shift().split(':');
           name = attr[0];
           value = shape.getAttribute(name) || attr[1];
           createHandle(shape,name,value);
           shape.setAttribute(name,value);
       }

       for (name in defaultAttrs){
           value = shape.getAttribute(name) || defaultAttrs[name];
           shape.setAttribute(name,value);
       }
       selected = shape;

       updateLookHandle();
   }

   function createHandle(shape,name,value){

       let label = document.createElement('label');
       label.textContent = name;

       let handle = document.createElement('input');
       handle.setAttribute('name',name);
       handle.setAttribute('type','range');
       handle.setAttribute('value',value);
       handle.setAttribute('min',0);
       handle.setAttribute('max',800);

       attrForm.appendChild(label);
       attrForm.appendChild(handle);
   }

   function updateLookHandle(){
       fill.value =  selected.getAttribute('fill');
       console.log(fill.value);
       stroke.value = selected.getAttribute('stroke');
       let t = decodeTransform(selected.getAttribute('transform'));
       translateX.value = t ? t.tx : 0;
       translateY.value = t ? t.ty : 0;
       rotate.value = t ? t.rotate : 0;
       scale.value = t ? t.scale : 1;
   }

   function decodeTransform(transString){
       let match = /translate\((\d+),(\d+)\)\sroatte\((\d+)\)\sscale\((\d+)\)/.exec(transString);
       return match ? {
           tx: +match[1],
           ty: +match[2],
           rotate: +match[3],
           scale: +match[4]
       } : null;
   }

   function encodeTransform(transObject){
       return ['translate(',transObject.tx,',',transObject.ty,')',
           'rotate(',transObject.rotate,')',
           'scale(',transObject.scale,')'].join('');
   }
}());