/**
 * Created by gaopengfei on 2016/5/27.
 *
 * 视图相关代码
 */

APP.templates = (function () {
    'use strict'

    function application() {
        return '<div id="window"><div id="header"><h1>FT Tech Blog</h1></div><div id="body"></div></div>';
    }

    function home() {
        return '<button id="referenshButton">刷新新闻</button><div id="headlines"></div>';
    }

    function articleList(articles) {

        let output = ''
        if (!articles.length) {
            return '<p><i>No articles have been found, maybe you haven\'t <b>refreshed the news</b>?</i></p>';
        }

        for (let article of articles) {
            output +=
                `<li>
                    <h2><a href="#${article.id}">${article.headline}</a></h2>
                    <p class="byline">
                        作者：<strong>${article.author}</strong> ，发表日期:${article.date}
                    </p>
                </li>`;
        }
        return `<ul>${output}</ul>`;
    }

    function article(articles) {

        // If the data is not in the right form, redirect to an error
        if (!articles[0]) {
            window.location.hash = '#error';
        }
        return `<a href="#">回到首页</a>
        <h2>${articles[0].headline}</h2>
        <h3>作者：${articles[0].author},发表日期：${articles[0].date}</h3>${articles[0].body}`;
    }

    function articleLoading() {
        return '<a href="#">回到首页</a><br /><br />Please wait&hellip;';
    }

    return {
        application: application,
        home: home,
        articleList: articleList,
        article: article,
        articleLoading: articleLoading
    };

})();
