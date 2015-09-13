/**
 * Created by wwtliu on 14-7-31.
 */

function Rect(n, color, Rectcolor) {
    createjs.Shape.call(this);
    this.setRectType = function (type) {
        this._RectType = type;
        switch (type) {
            case 1:
                this.setColor(color);
                break;
            case 2:
                this.setColor(Rectcolor);
                break;
        }
    }
    this.setColor = function (colorString) {
        this.graphics.beginFill(colorString);
        this.graphics.drawRect(0, 0, getSize() / n - 2, getSize() / n - 2);
        this.graphics.endFill();
    }
    this.getRectType = function () {
        return this._RectType;
    }
    this.setRectType(1);
}
Rect.prototype = new createjs.Shape();