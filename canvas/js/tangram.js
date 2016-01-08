/**
 * Created by consoles on 16-1-1.
 */
'use strict';
(function(){
    let context = document.getElementById('canvas').getContext('2d');
    // the data structure of the tangram,
    // Each slide of the tangram hava 2 parts:
    // the vertexes and the background-color,
    // Each vertex can be expressed using two-dimensional matrix
    let tangram = [
        {vertexes:[{x:0,y:0},{x:600,y:0},{x:300,y:300}],bgColor:'red'},
        {vertexes:[{x:0,y:0},{x:0,y:600},{x:300,y:300}],bgColor:'orange'},
        {vertexes:[{x:0,y:600},{x:300,y:600},{x:150,y:450}],bgColor:'yellow'},
        {vertexes:[{x:150,y:450},{x:300,y:600},{x:450,y:450},{x:300,y:300}],bgColor:'green'},
        {vertexes:[{x:300,y:300},{x:450,y:450},{x:450,y:150}],bgColor:'cyan'},
        {vertexes:[{x:450,y:150},{x:450,y:450},{x:600,y:300},{x:600,y:0}],bgColor:'blue'},
        {vertexes:[{x:300,y:600},{x:600,y:600},{x:600,y:300}],bgColor:'purple'}
    ];

    (function drawTangram(tangram){
        for (let slide in tangram)
            drawSlide(context,tangram[slide]);
    }(tangram));

    function  drawSlide(ctx,slide) {
        const DEFAULT_STROKE_COLOR = 'margin',
              DEFAULT_LINE_WIDTH = 2;

        ctx.beginPath();
        let vertexes = slide.vertexes;
        let startPointX = vertexes[0].x,
            startPointY = vertexes[0].y;
        ctx.moveTo(startPointX,startPointY);
        for(let i = 1;i < vertexes.length;i++)
            ctx.lineTo(vertexes[i].x,vertexes[i].y);
        ctx.closePath();

        ctx.fillStyle = slide.bgColor;
        ctx.fill();

        ctx.fillStyle = DEFAULT_STROKE_COLOR;
        ctx.lineWidth = DEFAULT_LINE_WIDTH;
        ctx.stroke();
    }

}());