'use strict';
import * as sound from './sound.js';
const CARROT_SIZE = 80;

// 필드는 아이템을 생성하고 클릭까지만 핸들링한다.

export const ItemType = Object.freeze({
    carrot : 'carrot',
    bug : 'bug',
})

export class Field{
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        // this.onClick = this.onClick.bind(this);
        this.field.addEventListener('click', (event)=>{
            this.onClick(event);
        });

    }

    create(){
        this.field.innerHTML = '';
        this.#addItem('carrot', this.carrotCount, 'img/carrot.png');
        this.#addItem('bug', this.bugCount, 'img/bug.png');
    
    }
    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    #addItem(className, count, imgPath){
        const x1 = 0; // 시작 x 축
        const y1 = 0; // 시작 y 축
        const x2 = this.fieldRect.width - CARROT_SIZE;  // 끝나는 x 축
        const y2 = this.fieldRect.height - CARROT_SIZE; // 끝나는 y 축 
        // console.log(x2) 720 
        // console.log(y2) 155
        for(let i = 0; i < count; i++){
            const item = document.createElement('img');
            item.setAttribute('class',className)
            item.setAttribute('src',imgPath)
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            // console.log(x)
            // console.log(y)
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    onClick(event){
        // console.log(event)
        const target = event.target;
        if(target.matches('.carrot')){
            target.remove();
            sound.playCarrot()
            this.onItemClick && this.onItemClick(ItemType.carrot);
        }else if(target.matches('.bug')){
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }
    
}


function randomNumber(min, max){
    // console.log(Math.random() )
    return Math.random() * (max - min) + min;
}