/**
 * Created by gaopengfei on 2016/5/27.
 */

APP.article = (function () {
    'use strict';

    function deleteArticles(successCallback) {
        APP.database.runQuery("DELETE FROM articles", [], successCallback);
    }

    function insertArticles(articles, successCallback) {
        // Convert article array of objects to array of arrays
        let data = articles.map(article => [article.id, article.date, article.headline, article.author, article.body])

        APP.database.runQuery("INSERT INTO articles (id, date, headline, author, body) VALUES (?, ?, ?, ?, ?);", data, successCallback);
    }

    function selectBasicArticles(successCallback) {
        APP.database.runQuery("SELECT id, headline, date, author FROM articles", [], successCallback);
    }

    function selectFullArticle(id, successCallback) {
        APP.database.runQuery("SELECT id, headline, date, author, body FROM articles WHERE id = ?", [id], successCallback);
    }

    return {
        insertArticles: insertArticles,
        selectBasicArticles: selectBasicArticles,
        selectFullArticle: selectFullArticle,
        deleteArticles: deleteArticles
    };
}());