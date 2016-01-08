/**
 * Created by consoles on 15-12-31.
 *
 * 碰撞检测:
 */
'use strict';

function momFruitsCollision(){

    if (data.gameOver) return;
    //console.log(fruit.num)
    for(let i = 0;i < fruit.num;i++){
        if(fruit.alive[i]){
            // calc distance
            var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
            // fruit eaten
            if(l < 900) {
                fruit.dead(i);
                data.fruitNum++;
                mom.momBodyCount++;
                if (mom.momBodyCount > 7)
                    mom.momBodyCount = 7;
                if (fruit.fruitType[i] === 'blue')
                    data.double = 2;
                wave.born(fruit.x[i],fruit.y[i]);
            }
        }
    }
}

function momBabyCollision(){
    if (data.gameOver) return;
    // 大鱼吃到果实的时候才可以喂小鱼
    if (data.fruitNum > 0){
        let l = calLength2(mom.x,mom.y,baby.x,baby.y);
        if (l < 900){
            // 当大鱼碰到小鱼的时候满血复活
            baby.babyBodyCount = 0;
            mom.momBodyCount = 0;
            // update score
            data.addScore();
            // draw halo
            halo.born(baby.x,baby.y);
        }
    }
}