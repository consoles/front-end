/**
 * Created by consoles on 16-1-3.
 */

var data = [1,4,7,2,9,13,5,8,2,9];

var bar_width = 50,
    bar_padding = 10;

var svg_width = (bar_width + bar_padding) * data.length,
    svg_height = 500;

var svg = d3.select('#container')
            .append('svg')
            .attr('width',svg_width)
            .attr('height',svg_width)

var bar = svg.selectAll('g')
             .data(data)
             .enter()
             .append('g')
             .attr('transform',function(d,i){return 'translate(' + i * (bar_width + bar_padding) + ',0)';});

var scale = d3.scale.linear()
                    .domain([0,d3.max(data)])
                    .range([svg_height,0]);

// generate rectangle
bar.append('rect')
    .attr({
        y:function(d){
            return scale(d);
        },
        width:bar_width,
        height:function(d){
            return svg_height - scale(d);
        }
    })
    .style('fill','blue');

bar.append('text')
    .text(function(d){return d;})
    .attr({
        y:function(d){
            return scale(d)
        },
        x:bar_width / 2,
        'text-anchor':'middle',
        dy:15
    });