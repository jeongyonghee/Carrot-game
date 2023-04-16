'use strict';

// 팝업 

export default class PopUp{   
    constructor(){
        
        this.popUp = document.querySelector('.pop-up')
        this.popUpText = document.querySelector('.pop-up__message')
        this.popUpRestart = document.querySelector('.pop-up__refresh')
        this.popUpRestart.addEventListener('click',()=>{
            this.onClick && this.onClick();
            this.hide();
           
        })
    }
    setClickListener(startGame){
        this.onClick = startGame;
    }

    showWithText(text){
        this.popUpText.innerText = text;
        this.popUp.classList.remove('pop-up--hide')
    }
    
    hide(){
        this.popUp.classList.add('pop-up--hide')
    }

}

