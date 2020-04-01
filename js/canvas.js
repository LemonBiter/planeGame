import {GAME} from "./app.js";
import {plane} from './plane.js'

const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');


function horizontalScroll(direction, dirFun) {               //朝着参数direction持续移动，直到方向键松开
    k++;
    switch (direction) {
        case 'left':
            if (plane.pressLeft === false) {
                k = 0;
                return;
            }
            break;
        case 'right':
            if (plane.pressRight === false) {
                k = 0;
                return;
            }
            break;
    }

    dirFun.call(plane);

    requestAnimationFrame(() => horizontalScroll(direction, dirFun));
}


var k = 0;
const KeyBoard = function () {
    document.addEventListener('keydown', function (event) {
        event.preventDefault();
        let key = event.code;
        switch (key) {
            case 'ArrowLeft':                                                    //定义方向键监听
                plane.pressLeft = true;
                plane.pressRight = false;
                if (k === 0) {
                    horizontalScroll('left', plane.moveLeft);           //监听成功，开始移动
                }
                break;
            case 'ArrowRight':
                plane.pressRight = true;
                plane.pressLeft = false;
                if (k === 0) {
                    horizontalScroll('right', plane.moveRight);
                }
                break;
            case 'ArrowUp':
                if (GAME.status === 'playing') {                //当状态为playing时，空格及上方向键生成子弹
                    plane.shotting();
                }
                break;
            case 'Space':
                if (GAME.status === 'playing') {                //当状态为playing时，空格及上方向键生成子弹
                    plane.shotting();
                }

                break;
        }
    }, false);

    document.addEventListener('keyup', function (event) {   //当监听到keyup事件，停止移动
        event.preventDefault();
        let key = event.code;
        switch (key) {
            case 'ArrowLeft':
                plane.pressLeft = false;
                break;
            case 'ArrowRight':
                plane.pressRight = false;
                break;
        }
    }, false);
};

export {canvas, context, KeyBoard};