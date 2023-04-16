'use strict';
import * as sound from './sound.js';
import { Field,ItemType } from './field.js';

// 빌더 패턴이라고 부른다.
// 오브젝트를 만들 때 빌더 패턴을 이용해서 오브젝트를 간단 명료하고 
// 가독성 좋게 만들 수 있다.

export const Reason = Object.freeze({
    win : 'win',
    lose: 'lose',
    cancel: 'cancel',
});

export class GameBuilder{
    withGameDuration(duration){
        this.gameDuration = duration;
        return this;
    }

    withCarrotCount(num){
        this.carrotCount = num;
        return this;
    }

    withBugCount(num){
        this.bugCount = num;
        return this;
    }

    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        )
    }
}

class Game{
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        
        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn.addEventListener('click',()=>{
            if(this.started){
                this.start();
            }else{
                this.stop(Reason.cancel);
            }
        })

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick)

        this.started = true;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop
    }

    start(){
        this.started = false;
        this.createGame()
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackground();
    }
    
    stop(reason){
        this.started = true;
        this.stopGameTimer();
        this.hideGameButton();
        sound.stopBackground()
        this.onGameStop && this.onGameStop(reason);
    }

    onItemClick = (item) => {
        if(this.started){
            return;
        }
        if( item === ItemType.carrot){
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount){
                this.stop(Reason.win);
            }
        }else if(item === ItemType.bug){
            this.stop(Reason.lose);
        }
    }
    
    showTimerAndScore(){
        this.gameTimer.style.visibility = 'visible'
        this.gameScore.style.visibility = 'visible'
    }
    
    startGameTimer(){
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(()=>{
            
            if(remainingTimeSec <= 0){
                clearInterval(this.timer);
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose)
                
                return;
            }
            this.updateTimerText(--remainingTimeSec)
        },1000);
    }
    
    stopGameTimer(){
        clearInterval(this.timer);
    }
    
    updateTimerText(time){
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;  
        // 5로 60을 나누면 0.08~~~ 이 되는데 여기서 0을 값으로 쳤을 때 나머지 값이 5여서 5다. 
        this.gameTimer.innerText = `${minutes}:${seconds}`
    }
    
    hideGameButton(){
        this.gameBtn.style.visibility = 'hidden'
    }
    
    showStopButton(){
        const icon = this.gameBtn.querySelector('.fas');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-stop');
        this.gameBtn.style.visibility = 'visible'
    }

    updateScoreBoard(){
        this.gameScore.innerText = this.carrotCount - this.score;
    }
    
    createGame(){
        this.score = 0;
        this.gameScore.innerText = this.carrotCount;
        this.gameField.create();
    }

    updateScoreBoard(){
        this.gameScore.innerText = this.carrotCount - this.score;
    }
    
}