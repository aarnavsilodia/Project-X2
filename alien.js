class Alien{
    constructor(x,y,num){
        this.x = x;
        this.y = y;
        this.amount = num;
    }

    spawn(){
        for(var i = 0; i < this.amount; i++){
            var alien = createSprite(this.x,this.y);

            alien.addImage("alien", alienShipImg)
            aliensGroup.add(alien)
        }
    }

    collide(){
        for(var i = 0; i < this.amount; i++){
            if(aliensGroup[i].collide(myShip)){
                gameState = END;
                reason = "alien"
            }
        }
        
    }

    
}