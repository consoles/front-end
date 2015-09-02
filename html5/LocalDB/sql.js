/**
 * Created by gaopengfei on 2015/9/2.
 */
/**
 * 初始化数据库
 * @returns {*}
 */
function initDatabase() {
    var db_note = openDatabase('db_note', '', '留言数据库', 100 * 1024, function () {
        console.info('成功创建数据库！');
    });
    if (!db_note) {
        console.error('本地SQLLite数据库创建失败！');
        return;
    }
    return db_note;
}

/**
 * 初始化表
 */
function initTable() {

    var db = initDatabase();
    db.transaction(function (trans) {
        trans.executeSql('CREATE TABLE IF NOT EXISTS tb_note(time TEXT, content TEXT)', [], function (trans, result) {
            alert('留言表建立成功！' + result);
        }, function (trans, error) {
            alert('留言表建立失败！' + error.message);
        });
    }, function () {
        console.error('初始化表失败！');
    }, function () {
        console.log('初始化表成功！');
    })
}

/**
 * 添加数据
 */
function insert() {

    var db = initDatabase();
    db.transaction(function (trans) {
        var time = new Date().toISOString();
        var content = $('#content').val();
        trans.executeSql('INSERT INTO tb_note(time,content) VALUES(?,?)', [time, content]);
    }, function (trans, error) {
        console.error('插入数据失败！' + error);
    });
    showAllTheData();
}

/**
 * 删除数据
 */
function deleteData() {

    var db = initDatabase();
    db.transaction(function (trans) {
        trans.executeSql('DELETE FROM tb_note WHERE id = ?', [id]);
    });
    loadData();
}

/**
 * 加载所有数据
 */
function loadData(data) {

    var msg = $('#msg');

    var time = data.time || null;
    var content = data.content || null;

    var strHtml = "";
    strHtml += "time:" + time + ",content:" + content + "<br />";
    msg.append(strHtml);
}

/**
 * 清空所有数据
 */
function clearData() {

    var db = initDatabase();
    db.transaction(function (trans) {
        trans.executeSql('DELETE FROM tb_note', []);
    });
    showAllTheData();
}

/**
 * 修改数据
 */
function update() {

    var db = initDatabase();
    db.transaction(function (trans) {
        trans.executeSql('UPDATE tb_note SET content = ? WHERE id = ?', [content, id]);
    });
    loadData();
}

/**
 * 根据id查询
 */
function queryById() {

    var db = initDatabase();
    db.transaction(function (trans) {
        trans.executeSql('SELECT * FROM tb_note WHERE id = ?', [id]);
    });
    loadData();
}

/**
 * 查询所有
 */
function showAllTheData() {

    $('#msg').empty();
    var db = initDatabase();
    db.transaction(function (trans) {
        trans.executeSql('SELECT * FROM tb_note', [], function (ts, data) {
            if (data) {
                for (var i = 0; i < data.rows.length; i++) {
                    loadData(data.rows.item(i));
                }
            }
        });
    });
    $('#content').select();
}

$(function () {

    initDatabase();
    initTable();
    showAllTheData();
    $('#add').click(function () {
            insert();
        }
    );
    $('#removeAll').click(function () {
            clearData();
        }
    );
});