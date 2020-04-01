import {context,canvas} from './canvas.js';
import {Monsters} from "./monsters.js";


function Ship(options) {
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.pressLeft = options.pressLeft;                                  //定义飞机左右移动情况
    this.pressRight = options.pressRight;
    this.image = new Image();
    this.image.src = options.src;
}

// 定义飞机对象细节，画出飞机的函数
Ship.prototype.draw = function () {
    if (arguments.length !== 0)
        context.drawImage(this.image, arguments[0], arguments[1], this.width, this.height);
    else
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
};
Ship.prototype.moveLeft = function(){
    if(this.x>10)
    this.x = this.x-5;
};
Ship.prototype.moveRight = function(){
    if (this.x < 630)                              //限制飞机移动范围
        this.x = this.x + 5;
};
Ship.prototype.shotting = function(){
    let newBullets = new Bullets();                 //生成新子弹
    let currentXAxis = this.x+this.width/2;         //定义子弹出发位置
    /**
     * 立即执行子弹飞行函数
     * @param  {object} 当前炮孔位置，新生成的子弹对象
     */
    (function planeFight() {
        newBullets.drawBullets(currentXAxis, newBullets.bulletTop, newBullets.bulletBottom);          //初始的子弹位置
        newBullets.bulletTop = newBullets.bulletTop - 10;                                             //每一帧Y轴变化
        newBullets.bulletBottom = newBullets.bulletBottom - 10;
        //如果子弹射入怪兽数组范围里
        if ((Monsters.length !== 0 && Monsters[0].x < newBullets.gunAsix && Monsters[Monsters.length - 1].x + 50 > newBullets.gunAsix) &&
            newBullets.bulletBottom <= Monsters[0].y + 30) {
            for (let i in Monsters) {
                if (Monsters[i].x + Monsters[i].size >= newBullets.gunAsix &&                    //如果子弹射入单个怪兽范围里，死亡生成
                    (Monsters[i].x + Monsters[i].size - newBullets.gunAsix) <= 60) {
                    Monsters[i].dead = true;
                    return;
                }
            }
        }
        if (newBullets.bulletTop === 0 || Monsters.length === 0) {                              //否则子弹直接穿过画布消失
            if (Monsters.length === 0) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
            newBullets = null;
            return;
        }
        requestAnimationFrame(() => {
            planeFight(currentXAxis, newBullets)
        });
    })();
};

//子弹构造函数
function Bullets() {
    this.bulletTop = 470;
    this.bulletBottom = 460;
    this.gunAsix = plane.x + plane.width / 2;
}
//子弹的draw方法
Bullets.prototype.drawBullets = function (xAxis, top, bottom) {
    context.beginPath();
    context.moveTo(xAxis, top);
    context.lineTo(xAxis, bottom);
    context.stroke();
    context.strokeStyle = "white";
};


const plane = new Ship({                           //生成新的飞机对象，载入画布
    x: 320,
    y: 475,
    width: 60,
    height: 100,
    pressLeft: false,
    pressRight: false,
    src: '../planeGame/img/plane.png'
});

export {plane,Bullets};