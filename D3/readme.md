## 使用D3进行数据可视化

[D3](https://d3js.org/)支持比较modern的浏览器,使用svg技术,详细的浏览器支持情况可以到[can i use](http://caniuse.com/#search=svg "svg")查看.

## 项目目录

- `line_chart`.折线图.
- `area_chart`.面积图.
- `histogram`.水平柱状图.
- `histogram2`.垂直柱状图.
- `pie_chart`.饼图.

## D3相对于hichart的优势

D3可以做任何事,*不仅仅*是图表.两者均是用 svg 绘制的矢量图，D3更多变灵活，highchart文档更详细，使用更便捷，提供的接口也很丰富.

## 跨域问题的解决

由于跨域问题,可以使用python启动一个http server(注意路径是front-end)

```shell
$ python -m SimpleHTTPServer 8888
```

## 几个常用的图表库

由于D3对新手不友好,以下的几个图表库可以很快入门:

- [xcharts](http://tenxer.github.io/xcharts/)
- [nvd3](http://nvd3.org/)