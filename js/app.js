import {KeyBoard} from './canvas.js';
import {Monster} from "./monsters.js";
// 元素
var container = document.getElementById('game');
/**
 * 整个游戏对象
 */
var GAME = {
    /**
     * 初始化函数,这个函数只执行一次
     * @param  {object} opts
     * @return {[type]}      [description]
     */
    init: function (opts) {
        this.status = 'start';
        this.bindEvent();
        //添加键盘监听
        KeyBoard();
    },
    bindEvent: function () {
        var self = this;
        var playBtn = document.querySelector('.js-play');
        // 开始游戏按钮绑定
        playBtn.onclick = function () {
            self.play();
        };
    },
    /**
     * 更新游戏状态，分别有以下几种状态：
     * start  游戏前
     * playing 游戏中
     * failed 游戏失败
     * success 游戏成功
     * all-success 游戏通过
     * stop 游戏暂停（可选）
     */
    setStatus: function (status) {
        this.status = status;
        container.setAttribute("data-status", status);
    },
    play: function () {
        this.setStatus('playing');
        Monster.prototype.start();                                                      //游戏入口，画布开始载入怪兽
    },
    success: function () {

        this.setStatus('all-success');
        this.bindSuccessEvent();
    },
    bindSuccessEvent: function () {
        let success = this;
        let playAgain = document.querySelectorAll('.js-replay');              //绑定replay按键
        playAgain[1].onclick = function () {
            success.play();
        };
    },
    failed: function () {

        this.setStatus('failed');
        this.bindFailedEvent();
    },
    bindFailedEvent: function () {
        let failed = this;
        let playAgain = document.querySelectorAll('.js-replay');             //绑定另一个replay按键
        playAgain[0].onclick = function () {
            failed.play();
        };
    }
};

// 初始化
GAME.init();
export {GAME};


