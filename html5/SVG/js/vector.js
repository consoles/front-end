/**
 * Created by consoles on 16-1-18.
 */

'use strict';

(function() {
  /**
   * 矢量计算
   */
  class Vector {

    constructor(x, y) {
      const DEFAULT_X = 0,
            DEFAULT_Y = 0;

      this.x = x || DEFAULT_X; // 目前的V8引擎不支持默认参数
      this.y = y || DEFAULT_Y;
    }

    square() {
      return this.x * this.x + this.y * this.y;
    }
    distance() {
      return Math.sqrt(this.square());
    }
    add(q) {
      return new Vector(this.x + q.x, this.y + q.y);
    }
    minus(q) {
      return new Vector(this.x - q.x, this.y - q.y);
    }
    multiply(scale) {
      return new Vector(this.x * scale, this.y * scale);
    }
    normalize(length) {
      if (undefined === length) {
        length = 1;
      }
      return this.multiply(length / this.distance());
    }
    static fromPoints(p1, p2) {
      return new Vector(p2.x - p1.x, p2.y - p1.y);
    }
  }

  window.Vector = Vector;
}());