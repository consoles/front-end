/**
 * Created by consoles on 16-1-18.
 */
'use strict';

(function() {

  const SVG_NS = 'http://www.w3.org/2000/svg';

  const relation = 400; // 当两个质点之间的距离是300的时候没有引力亦无斥力(平衡)
  const K = 0.05; // 弹性系数
  const FRICTION_COEFFICIENT = 0.985; // 摩擦系数

  const POINT_RADIUS = 10;

  let svg = document.querySelector('svg');

  let Vector = window.Vector;

  let random = (min, max) => Math.round(min + Math.random() * (max - min));

  let pointString = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v';
  let points = pointString.split(',').map((name, index, arr) => ({
    name: name,
    color: `hsl(${360 * index / arr.length},100%,60%)`
  }));

  // init points
  points.forEach(point => {
    let circle = document.createElementNS(SVG_NS, 'circle');
    let x = random(-200, 200);
    let y = random(-200, 200);
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', POINT_RADIUS);
    circle.setAttribute('fill', point.color);

    svg.appendChild(circle);

    point.circle = circle;
    point.s = new Vector(x, y); // 位移
    point.v = new Vector(); // 默认速度:0
    point.a = new Vector(); // 加速度:0
  });

  let lastFrameTime = Date.now();
  let currentFrame;

  let update = () => {
    let frameTime = Date.now();
    let t = frameTime - lastFrameTime;

    t = t < 100 ? t / 100 : 0.35;

    /**
     * 点位置更新
     */
    points.forEach(pa => {

      let f = new Vector();

      /**
       * 计算合力
       */
      points.forEach(pb => {
        if (pa == pb) {
          return;
        }
        let x = Vector.fromPoints(pa.s, pb.s);
        let delta = x.distance() - relation;
        // f = k * x;
        f = f.add(x.normalize(delta * K));
      });
      pa.a = f;
      pa.v = pa.v.add(pa.a.multiply(t)).multiply(FRICTION_COEFFICIENT); // 乘以0.985的原因是动量损耗
      pa.s = pa.s.add(pa.v.multiply(t));

      pa.circle.setAttribute('cx', pa.s.x);
      pa.circle.setAttribute('cy', pa.s.y);

    });

    /**
     * 连线更新
     */
    let linkPath = [];
    points.forEach(pa => {
      let sa = pa.s;
      points.forEach(pb => {
        if (pa == pb) {
          return;
        }
        let sb = pb.s;
        linkPath = linkPath.concat([
          'M', sa.x, sa.y,
          'L', sb.x, sb.y
        ]);
      });
    });
    document.getElementById('links').setAttribute('d', linkPath.join(' '));

    lastFrameTime = frameTime;
    currentFrame = requestAnimationFrame(update);
  };

  currentFrame = requestAnimationFrame(update);

  // replay
  document.querySelector('#replay').addEventListener('click',() => {
     location.reload();
  });
  // stop
  document.querySelector('#stop').addEventListener('click',() => {
     cancelAnimationFrame(currentFrame);
  });

}());