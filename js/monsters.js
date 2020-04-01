import {canvas, context} from "./canvas.js";
import {plane} from "./plane.js";


import {GAME} from "./app.js";

const deadImage = new Image();                                 //定义怪兽死亡图像
deadImage.src = '../planeGame/img/boom.png';

//怪兽的构造函数
function Monster(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.gap = 10;
    this.dead = false;
    this.image = new Image();
    this.image.src = '../planeGame/img/enemy.png';
}

Monster.prototype.draw = function (x, y) {
    this.x = x;
    this.y = y;
};

const Monsters = [];
Monster.prototype.start = function () {
    let inialX = 40;
    for (let i = 0; i < 7; i++) {                                           //排列初始7个怪兽位置
        let monsters = new Monster(inialX, 30);
        Monsters.push(monsters);
        monsters.draw(inialX, 30);
        inialX += monsters.size + monsters.gap;
    }

    let deadMonster = 0;                                         //怪兽死亡的数量，用于记分
    let left = 0;                                                //判定触变返回，为0时怪兽左移，非0时怪兽右移
    let deadDelay = 15;                                          //怪物死亡的动画续时间，每一帧会减1，为0时死亡画面消失


    (function Space() {                                          // 进入太空
        let score = 0;
        if (deadMonster > 0) {
            score = deadMonster;                                //将死亡怪物换成分数
        }
        if (Monsters[0].y > 430) {                                            //Y轴触底死亡判定
            Monsters.length = 0;                                              //怪兽数组清空
            deadMonster = 0;                                                    //死亡数清空
            left = 0;                                                           //触边判定清空
            context.clearRect(0, 0, canvas.width, canvas.height);         //画布清空
            GAME.failed();                                                      //界面跳转

            let finalScore = document.getElementsByClassName('game-info-text')[0];
            finalScore.innerHTML = "最终得分：" + score;              //统计分数
            return;
        }


        if (left === 0) {                                                      //判定怪兽左移
            for (let i in Monsters) {
                Monsters[i].x += 2;                                          //怪兽数组坐标更改
            }

            context.clearRect(0, 0, canvas.width, canvas.height);        //清除画布

            plane.draw();                                                      //重绘飞机
            context.font = "16px arial";
            context.fillStyle = ('white');
            context.fillText('分数：' + score, 25, 25);              //重绘分数

            for (let i in Monsters) {                                        //重绘每一只怪兽
                if (Monsters[i].dead === true) {                             //如怪兽死亡，绘制死亡画面，开始deadDelay倒数
                    if (deadDelay <= 0) {                                      //deadDelay倒数为0时，死亡画面消失，怪兽数组减1，怪兽死亡数+1
                        Monsters.splice(i, 1);
                        deadMonster += 1;
                        deadDelay = 20;
                    } else
                    //不然则持续重绘死亡画面，同时deadDelay倒数减1
                        context.drawImage(deadImage, Monsters[i].x, Monsters[i].y, Monsters[i].size, Monsters[i].size);
                    deadDelay = deadDelay - 1;
                } else
                //没有死亡发生，重绘怪兽
                    context.drawImage(Monsters[i].image, Monsters[i].x, Monsters[i].y, Monsters[i].size, Monsters[i].size);
            }

            if (deadMonster === 7) {                                            //怪兽死亡数为7，清空画布，游戏成功
                context.clearRect(0, 0, canvas.width, canvas.height);
                deadMonster = 0;
                GAME.success();
                return;
            }

            if (Monsters[Monsters.length - 1].x >= 630) {                   //怪兽右边触边，整排下移，left增加，不再为0
                left++;
                for (let i in Monsters) {
                    Monsters[i].y += 50;
                }
            }

        } else {
            for (let i in Monsters) {                                          //left不为0，开始左移，坐标变动，清空画布，重绘，死亡判定如上
                Monsters[i].x = Monsters[i].x - 2;
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            plane.draw();
            context.fillText('分数：' + score, 25, 25);


            for (let i in Monsters) {
                if (Monsters[i].dead === true) {
                    if (deadDelay <= 0) {
                        Monsters.splice(i, 1);
                        deadMonster += 1;
                        deadDelay = 20;
                    } else

                        context.drawImage(deadImage, Monsters[i].x, Monsters[i].y, Monsters[i].size, Monsters[i].size);
                    deadDelay = deadDelay - 1;
                } else

                    context.drawImage(Monsters[i].image, Monsters[i].x, Monsters[i].y, Monsters[i].size, Monsters[i].size);
            }

            if (deadMonster === 7) {
                left = 0;
                context.clearRect(0, 0, canvas.width, canvas.height);
                deadMonster = 0;
                GAME.success();
                return;
            }

            if (Monsters[0].x <= 30) {                                             //左边触边反弹，left置0开始右移
                left = 0;
                for (let i in Monsters) {
                    Monsters[i].y += 50;
                }
            }
        }

        requestAnimationFrame(() => Space(Monsters));                     //带着怪兽数组重复
    })();


};


export {Monster, Monsters};