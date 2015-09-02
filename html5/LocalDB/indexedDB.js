/**
 * Created by gaopengfei on 2015/9/2.
 */

var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
if (indexedDB)
    alert("支持indexedDB");
else
    alert("不支持indexedDB");

$(function () {

    $('#connect').click(function () {
        connectDB();
    });
    $('#update').click(function () {
        versionUpdate();
    });
    $('#createObjectStore').click(function () {
        createObjectStore();
    });
});

/**
 * 连接数据库
 */
function connectDB() {

    var dbName = 'indexedDB_test';
    var dbVersion = 1;
    var idb;

    var dbConnect = indexedDB.open(dbName, dbVersion);
    dbConnect.onsuccess = function (e) {
        idb = e.target.result;
        console.info('数据库连接成功！');
    };
    dbConnect.onerror = function () {
        console.error('数据库连接失败！');
    };
}

/**
 * 数据库版本更新
 */
function versionUpdate() {

    var dbName = 'indexedDB_test';
    var dbVersion = 2;
    var idb;

    var dbConnect = indexedDB.open(dbName, dbVersion);
    // 成功
    dbConnect.onsuccess = function (e) {
        idb = e.target.result;
        console.info('数据库连接成功！');
    };
    // 失败
    dbConnect.onerror = function () {
        console.error('数据库连接失败！');
    };
    // 版本变化
    dbConnect.onupgradeneeded = function (e) {
        idb = e.target.result;
        var tx = e.target.transation;
        var oldVersion = e.oldVersion;
        var newVersion = e.newVersion;
        console.info('数据库版本更新成功：' + oldVersion + '--->' + newVersion);
    };
}

/**
 * 创建对象仓库
 */
function createObjectStore() {

    var dbName = 'indexedDB_test';
    var dbVersion = 3;
    var idb;

    var dbConnect = indexedDB.open(dbName, dbVersion);
    dbConnect.onsuccess = function (e) {
        idb = e.target.result;
        console.info('数据库连接成功！');
    };
    dbConnect.onerror = function () {
        console.error('数据库连接失败！');
    };
    dbConnect.onupgradeneeded = function (e) {
        idb = e.target.result;
        var name = 'user';
        var optionalParameters = {
            keyPath: 'uid',
            autoIncrement: false
        };
        var store = idb.createObjectStore(name, optionalParameters);
        console.info('对象仓库创建成功！');
    };
}