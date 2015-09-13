/**
 * Created by wwtliu on 14-7-31.
 */
var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", stage);
var gameView = new createjs.Container();
stage.addChild(gameView);


function startGame() {
    getCanvasSize();
    n = 2;
    addRect();
}
function addRect() {
    var x = parseInt(Math.random() * n);
    var y = parseInt(Math.random() * n);
    for (var indexX = 0; indexX < n; indexX++) {
        for (var indexY = 0; indexY < n; indexY++) {
            color = "#ff00ff";
            Rectcolor = "#ccff00";
            var r = new Rect(n, color, Rectcolor);
            gameView.addChild(r);
            r.x = indexX;
            r.y = indexY;
            if (r.x == x && r.y == y) {
                r.setRectType(2);
            }
            r.x = indexX * (getSize() / n);
            r.y = indexY * (getSize() / n);
            if (r.getRectType() == 2) {
                r.addEventListener("click", clickRect)
            }
        }
    }
}
function clickRect() {
    if (n < 7) {
        ++n;
    }
    gameView.removeAllChildren();
    addRect();
}

function getCanvasSize() {
    var gView = document.getElementById("gameView");
    gView.height = window.innerHeight - 4;
    gView.width = window.innerWidth - 4;
}
function getSize() {
    if (window.innerHeight >= window.innerWidth) {
        return window.innerWidth;
    } else {
        return window.innerHeight;
    }
}
startGame();