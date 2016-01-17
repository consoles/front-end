/**
 * Created by consoles on 16-1-17.
 */
'use strict';
(function(){
   let update = function (){
       let viewBox = [vx.value,vy.value,vw.value,vh.value].join(',');
       let preserveAspectRatio = [align.value,meetOrSlice.value].join(' ');
       svg.setAttribute('viewBox',viewBox);
       svg.setAttribute('preserveAspectRatio',preserveAspectRatio);

       let rect = viewBoxIndicator;
       rect.setAttribute('x',vx.value);
       rect.setAttribute('y',vy.value);
       rect.setAttribute('width',vw.value);
       rect.setAttribute('height',vh.value);
   };
   form.addEventListener('input',update);
   update();
}());