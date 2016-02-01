/**
 * Created by gaopengfei on 2016/1/30.
 */

window.onload = function () {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
        // big circle
        ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * 300 + 400, -Math.sin((18 + i * 72) / 180 * Math.PI) * 300 + 400);
        // small circle
        ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * 150 + 400, -Math.sin((54 + i * 72) / 180 * Math.PI) * 150 + 400);

    }
    ctx.closePath();
    ctx.lineWidth = 10;
    ctx.stroke();
};