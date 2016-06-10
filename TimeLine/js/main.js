/**
 * Created by gaopengfei on 2016/5/27.
 */

'use strict'
// 通用函数
let g = id => document.getElementById(id);
let g_tpl = id => g('tpl_' + id).innerHTML;
let g_class = className => document.getElementsByClassName(className);
let get_body_w = () => document.body.offsetWidth;
let get_body_h = () => document.body.offsetHeight;
let get_top = el => el.offsetTop + 170;

// 格式化数据
//{
//    2014:{
//        2:[
//            {date:'2014-02-28',year:2014,month:2,...},
//            ...
//        ],
//        3:[...]
//    }
//}
var list = {};
for (var i = 0; i < data.length; i++) {
    var date = new Date(data[i].date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var lunar = GetLunarDateString(date);

    if (!list[year]) {
        list[year] = {};
    }
    if (!list[year][month]) {
        list[year][month] = [];
    }

    var item = data[i];
    item.lunar = lunar[0] + '<br>&nbsp;' + lunar[1];
    item.year = year;
    item.month = month;
    item.like_format = item.like < 10000 ? item.like : (item.like / 10000).toFixed(1) + '万';
    list[year][month].push(item)
}

// 时序菜单html生成
var html_scrubber_list = [];
var tpl_year = g_tpl('scrubber_year');
var tpl_month = g_tpl('scrubber_month');

for (var y in list) {
    var html_year = tpl_year.replace(/\{year\}/g, y);
    var html_month = [];
    for (var m in list[y]) {
        html_month.unshift(tpl_month.replace(/\{month\}/g, m).replace(/\{year\}/g, y));
    }
    html_year = html_year.replace(/\{list\}/g, html_month.join(''));
    html_scrubber_list.unshift(html_year)
}
g('scrubber').innerHTML = '<a href="javascript:;" onclick="scroll_top(0)">现在</a>' + html_scrubber_list.join('') + '<a href="javascript:;" onclick="scroll_top(get_body_h())">出生</a>';

// 日志列表的html生成
var html_content_list = [];
tpl_year = g_tpl('content_year');
tpl_month = g_tpl('content_month');
var tpl_item = g_tpl('content_item');

for (y in list) {
    html_year = tpl_year.replace(/\{year\}/g, y);

    html_month = [];
    for (m in list[y]) {
        var html_items = [];
        var isFirstAtMonth = true;
        for (i in list[y][m]) {
            var item_data = list[y][m][i];
            var item_html = tpl_item
                .replace(/\{month\}/g, item_data.month)
                .replace(/\{lunar\}/g, item_data.lunar)
                .replace(/\{date\}/g, item_data.date)
                .replace(/\{intro\}/g, item_data.intro)
                .replace(/\{media\}/g, item_data.media)
                .replace(/\{like\}/g, item_data.like)
                .replace(/\{comment\}/g, item_data.comment)
                .replace(/\{like_format\}/g, item_data.like_format)
                .replace(/\{position\}/g, i % 2 === 0 ? 'left' : 'right')
                .replace(/\{isFirst\}/g, isFirstAtMonth ? 'first' : '');
            html_items.push(item_html);
            isFirstAtMonth = false;
        }

        html_month.unshift(tpl_month.replace(/\{year\}/g, y).replace(/\{month\}/g, m).replace(/\{list\}/g, html_items.join('')));
    }
    html_year = html_year.replace(/\{list\}/g, html_month.join(''));
    html_content_list.unshift(html_year);
}
g('content').innerHTML = html_content_list.join('') + '<div class="content_month" id="content_month_0_0">出生</div>';

/**
 * 滚动页面到
 */
var scroll_top = function (to) {
    let start = document.body.scrollTop;
    fx(function (now) {
        window.scroll(0, now);
    }, start, to);
};

// 年份和月份的点击处理
var show_year = function (year) {
    var c_year = g('content_year_' + year);
    var top = get_top(c_year);
    scroll_top(top);
    expand_year(year, g('scrubber_year_' + year));
};

var show_month = function (year, month) {
    var c_month = g('content_month_' + year + '_' + month);
    var top = get_top(c_month);
    scroll_top(top);
    highlight_month(g('scrubber_month_' + year + '_' + month));
};

// 高亮处理-月份
let highlight_month = function (element) {
    let months = g_class('scrubber_month');
    [].forEach.call(months, function (month) {
        month.classList.remove('current');
    });
    element.classList.add('current');
};

// 年份点击展开
let expand_year = function (year, element) {
    var months = g_class('scrubber_month');
    var show_months = g_class('scrubber_month_in_' + year);
    var years = g_class('scrubber_year');
    // 隐藏时光轴上的所有月份
    for (let i = 0; i < months.length; i++) {
        months[i].style.display = 'none';
    }
    // 显示当前年下的所有月份
    for (let i = 0; i < show_months.length; i++) {
        show_months[i].style.display = 'block';
    }
    for (let i = 0; i < years.length; i++) {
        years[i].classList.remove('current');
    }
    element.classList.add('current');
};

let update_scrubber_year = function (top) {
    let years = g('content').getElementsByClassName('content_year');
    let tops = [];
    for (let i = 0; i < years.length; i++) {
        tops.push(years[i].offsetTop);
    }
    for (let i = 1; i < tops.length; i++) {
        if (top > tops[i - 1] && top < tops[i]) {
            let year = years[i - 1].innerHTML;
            let s_year = g('scrubber_year_' + year);
            expand_year(year, s_year);
            return;
        }
    }
};

let update_scrubber_month = function (top) {

    // 日志列表中所有的月份标签
    let months = g('content').getElementsByClassName('content_month');
    let tops = [];
    for (let i = 0; i < months.length; i++) {
        tops.push(months[i].offsetTop);
    }
    // 定位top在窗口的哪个月份区间
    for (let i = 1; i < tops.length; i++) {
        if (top > tops[i - 1] && top < tops[i]) {
            let id = months[i - 1].id;
            console.log(id);
            highlight_month(g(id.replace('content', 'scrubber')));
            return;
        }
    }
};

// 页面滚动处理，固定时序菜单的位置，自动展开时序菜单
window.onscroll = function () {
    let top = document.body.scrollTop;
    let scrubber = g('scrubber');
    if (top > 200) {
        scrubber.style.position = 'fixed';
        scrubber.style.top = '60px';
        scrubber.style.left = (get_body_w() - 960) / 2 + 'px';
    } else {
        // 直接将style清空就会使用默认的样式了
        scrubber.style.position = '';
        scrubber.style.top = '';
        scrubber.style.left = '';
    }

    update_scrubber_year(top);
    update_scrubber_month(top);
};

window.onresize = function () {
    window.onscroll();
};