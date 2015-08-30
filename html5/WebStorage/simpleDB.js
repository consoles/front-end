/**
 * Created by gaopengfei on 2015/8/30.
 */

function save() {

    var data = new Object();
    data.uname = document.getElementById('uname').value;
    data.email = document.getElementById('email').value;
    data.tel = document.getElementById('tel').value;
    data.birthday = document.getElementById('birthday').value;

    var str = JSON.stringify(data); // 将各个属性构造成json对象
    localStorage.setItem(data.uname, str)

    alert('数据已保存到本地数据库！');
}

function search(id) {

    var key = document.getElementById(id).value;
    var str = localStorage.getItem(key);

    // 将json字符串构造成js对象
    //var obj = JSON.parse(str);
    //console.info(obj.birthday);

    document.getElementById('profile').innerHTML = str;
}