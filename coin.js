class Coin{
    constructor(x,y,num){
        this.x = x;
        this.y = y;
        this.amount = num;
    }

    spawn(){
        for(var i = 0; i < this.amount; i++){
            var coin = createSprite(this.x,this.y);

            coin.addImage("alien", alienShipImg)
            coinsGroup.add(coin)
        }
    }

    collide(){
        for(var i = 0; i < this.amount; i++){
            if(coinsGroup[i].collide(myShip)){
                score += 100;
            }
        }
        
    }
}