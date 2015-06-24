/**
 * Created by gaopengfei on 2015/6/24.
 */

window.onload = function () {

    var Lis = document.getElementsByTagName('li');

    for(var i = 0;i < Lis.length;i++){
        Lis[i].i = i;
        Lis[i].onmouseover = function () {
            this.className = 'lihover';
            var h0 = (this.i - 1) * 30 + 42;
            var y = this.getElementsByTagName('div')[0].offsetHeight;
            var h = this.getElementsByTagName('div')[0].style.top + y;

            if(h < h0){
                this.getElementsByName('div')[0].style.top = h0 + 'px';
            }
            if(y > 550){
                his.getElementsByName('div')[0].style.top = 3 + 'px';
            }
        }
        Lis[i].onmouseout = function () {
            this.className = '';
        }
    }
}