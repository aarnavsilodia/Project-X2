class Bomb{
    constructor(x,y,num){
        this.x = x;
        this.y = y;
        this.amount = num;
    }

    spawn(){
        for(var i = 0; i < this.amount; i++){
            var bomb = createSprite(this.x,this.y);

            bomb.addImage("bomb", bombImg)
            bombsGroup.add(bomb)
        }
    }

    collide(){
        for(var i = 0; i < this.amount; i++){
            if(aliensGroup[i].collide(myShip)){
                gameState = END;
                reason = "bomb"
            }
        }
        
    }
}