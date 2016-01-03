/**
 * Created by consoles on 16-1-3.
 */

var width = 500,
    height = 250,
    margin = {left:50,top:30,right:20,bottom:20};

var g_width = width - margin.left - margin.right,
    g_height = height - margin.top - margin.bottom;

// append a svg element to a container and set attrs
var svg = d3.select('#container')
            .append('svg:svg')
            .attr('width',width)
            .attr('height',height);

// append a g element to svg element and set attrs
var g = d3.select('svg')
            .append('g')
            .attr('transform','translate('+margin.left+','+margin.top+')');

var data = [1,3,5,7,8,4,3,7];
var scale_x = d3.scale.linear()
                .domain([0,data.length - 1]) // 输入范围
                .range([0,g_width]);         // 输出范围
var scale_y = d3.scale.linear()
    .domain([0,d3.max(data)])
    .range([g_height,0]);

var area_generator = d3.svg.area()
    .x(function(d,i){return scale_x(i);})
    .y0(g_height)
    .y1(function(d){return scale_y(d);})
    .interpolate('cardinal');

d3.select('g')
    .append('path')
    .attr('d',area_generator(data))
    .style('fill','green');

// coordinate system 坐标系
var x_axis = d3.svg.axis().scale(scale_x),
    y_axis = d3.svg.axis().scale(scale_y).orient('left');

g.append('g')
    .call(x_axis)
    .attr('transform','translate(0,' + g_height + ')');
g.append('g')
    .call(y_axis)
    .append('text')
    .text('Price($)')
    .attr('transform','rotate(-90)')
    .attr('text-anchor','end')
    .attr('dy','1em');