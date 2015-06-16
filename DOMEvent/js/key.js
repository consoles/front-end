/**
 * Created by gaopengfei on 2015/6/16.
 */
var data = ['Ipone6','Ipad','三星笔记本','佳能相机','惠普打印机','谢谢参与','50元充值卡','1000元超时购物卷'],
    timer = null,
    flag = true;

window.onload = function () {
    var play = document.getElementById('play'),
        stop = document.getElementById('stop');

    // 开始抽奖
    play.onclick = playFun;
    // 停止抽奖
    stop.onclick = stopFun;

    // 键盘事件
    document.onkeyup = function(event){
        event = event || window.event;
        console.log(event.keyCode);
        if(event.keyCode == 13){
            if(flag){
                playFun();
                flag = false;
            }else{
                stopFun();
                flag = true;
            }
        }
    }

    function playFun(){

        clearInterval(timer); // 注意：先停止原来的定时器
        timer = setInterval(function () {
            var random = Math.floor(Math.random()*data.length);
            console.log(random);
            title.innerHTML = data[random];
        },50);
        play.style.background = '#999';
        flag = false;
    }

    function stopFun(){
        clearInterval(timer);
        play.style.background = '#036';
        flag = true;
    }
}

