/**
 * Created by gaopengfei on 2016/1/30.
 *
 * 一些常见canvas api的封装
 */

function drawRect(ctx, x, y, width, height, borderWidth, borderColor, fillColor) {

    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.closePath();

    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = fillColor;

    // 注意顺序
    ctx.fill();
    ctx.stroke();
}

function drawRect2(ctx, x, y, width, height, borderWidth, borderColor, fillColor) {

    ctx.lineWidth = borderWidth;
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = fillColor;

    // 直接调用canvas api进行矩形的填充和描边
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
}

/**
 * 绘制五角星，ref:reaame.md#使用canvas绘制五角星
 * @param ctx
 * @param r
 * @param R
 * @param x
 * @param y
 * @param rotate 旋转角度，顺时针方向为正方向
 */
function drawStar(ctx, r, R, x, y, rotate) {

    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
        // big circle
        ctx.lineTo(Math.cos((18 + i * 72 - rotate) / 180 * Math.PI) * R + x, -Math.sin((18 + i * 72 - rotate) / 180 * Math.PI) * R + y);
        // small circle
        ctx.lineTo(Math.cos((54 + i * 72 - rotate) / 180 * Math.PI) * r + x, -Math.sin((54 + i * 72 - rotate) / 180 * Math.PI) * r + y);

    }
    ctx.closePath();
    ctx.stroke();
}

function drawStar2(ctx, x, y, R, rot) {

    ctx.save();

    // 变换
    ctx.translate(x, y);
    ctx.scale(R, R);
    ctx.rotate(rot / 180 * Math.PI);
    // 获得路径
    starPath(ctx);

    ctx.fillStyle = '#fb3'; // 由于边框会被scale放大，此处去除了边框的效果
    ctx.fill();

    ctx.restore();
}

/**
 * 绘制一个标准五角星的轮廓（也就是canvas中的状态）
 * @param ctx
 */
function starPath(ctx) {
    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
        // big circle
        ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI), -Math.sin((18 + i * 72) / 180 * Math.PI));
        // small circle
        ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * 0.5, -Math.sin((54 + i * 72) / 180 * Math.PI) * 0.5);

    }
    ctx.closePath();
}

/**
 * 绘制圆角矩形
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 * @param radius
 */
function drawRoundRect(ctx, x, y, width, height, radius) {

    ctx.save();
    ctx.translate(x, y);
    pathRoundRect(ctx, width, height, radius);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();
}

/**
 * 填充一个圆角矩形
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 * @param radius
 * @param fillColor optional
 */
function fillRoundRect(ctx, x, y, width, height, radius, fillColor) {

    if (2 * radius > width || 2 * radius > height) {
        return;
    }

    ctx.save();
    ctx.translate(x, y);
    pathRoundRect(ctx, width, height, radius);
    ctx.fillStyle = fillColor || 'black';
    ctx.fill();
    ctx.restore();
}

/**
 * 描边一个圆角矩形
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 * @param radius
 * @param lineWidth optional
 * @param strokeColor optional
 */
function strokeRoundRect(ctx, x, y, width, height, radius, lineWidth, strokeColor) {

    if (2 * radius > width || 2 * radius > height) {
        return;
    }

    ctx.save();
    ctx.translate(x, y);
    pathRoundRect(ctx, width, height, radius);
    ctx.lineWidth = lineWidth || 1;
    ctx.strokeStyle = strokeColor || 'black';
    ctx.stroke();
    ctx.restore();
}

/**
 * 绘制圆角矩形的轮廓
 * @param ctx
 * @param width
 * @param height
 * @param radius
 */
function pathRoundRect(ctx, width, height, radius) {
    ctx.beginPath();
    ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
    ctx.lineTo(radius, height);
    ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
    ctx.lineTo(0, radius);
    ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
    ctx.lineTo(width - radius, 0);
    ctx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
    ctx.closePath();
}

function dis(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

/**
 * 绘制月亮
 * @param cxt
 * @param d
 * @param x
 * @param y
 * @param R
 * @param rot
 * @param fillColor optional
 */
function fillMoon(cxt, d, x, y, R, rot, fillColor) {

    cxt.save();
    cxt.translate(x, y);
    cxt.rotate(rot * Math.PI / 180);
    cxt.scale(R, R);
    pathMoon(cxt, d);
    cxt.fillStyle = fillColor || '#fb5';
    cxt.fill();
    cxt.restore();
}

/**
 * 绘制弯月的轮廓
 * @param cxt
 * @param d
 */
function pathMoon(cxt, d) {
    cxt.beginPath();
    cxt.arc(0, 0, 1, 0.5 * Math.PI, 1.5 * Math.PI, true);
    cxt.moveTo(0, -1);
    cxt.arcTo(d, 0, 0, 1, dis(0, -1, d, 0) / d);
    cxt.closePath();
}

/**
 * 扩充CanvasRenderingContext2D接口
 * @param r
 * @param R
 * @param x
 * @param y
 * @param rotate
 */
CanvasRenderingContext2D.prototype.drawStar = function (r, R, x, y, rotate) {

    this.beginPath();
    for (var i = 0; i < 5; i++) {
        // big circle
        this.lineTo(Math.cos((18 + i * 72 - rotate) / 180 * Math.PI) * R + x, -Math.sin((18 + i * 72 - rotate) / 180 * Math.PI) * R + y);
        // small circle
        this.lineTo(Math.cos((54 + i * 72 - rotate) / 180 * Math.PI) * r + x, -Math.sin((54 + i * 72 - rotate) / 180 * Math.PI) * r + y);

    }
    this.closePath();
    this.stroke();
};