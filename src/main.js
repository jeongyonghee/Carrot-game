'use strict'
import PopUp from './popup.js';
import * as sound from './sound.js';
import {GameBuilder, Reason} from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .withGameDuration(10)
    .withCarrotCount(15)
    .withBugCount(15)
    .build();

game.setGameStopListener((reason)=>{
    console.log(reason);
    let message;
    switch(reason){
        case Reason.cancel:
            message = '다시 하쉴?'; 
            sound.playAlert(); 
            break;
        case Reason.win:
            message = '피지컬✌';
            sound.playWin();
            break;
        case Reason.lose:
            message = '좀 더 배워와🤣';
            sound.playBug();
            break;
        default:
            throw new Error('에러 발생')
    }
    gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(()=>{
    game.start();
})
