var bombImg, bulletImg, coinImg, shipImg, alienShipImg, gameOverImg;
var bg, myShip, alienShip, bomb;

var bombsGroup, coinsGroup, coinClass, bombClass, bulletsGroup;

var gameState, ct, reason, blastImg;

var aliensGroup, alien;
var speed;
var level;
var score;
var d;

function preload(){
    bombImg = loadImage("assets/bomb.png")
    bulletImg = loadImage("assets/bullet.png")
    coinImg = loadImage("assets/coin.png")
    blastImg = loadImage("assets/blast.png")

    shipImg = loadImage("assets/spaceship.png")
    alienShipImg = loadImage("assets/evilShip.png")
}

function setup(){
    createCanvas(900,300)

    d = 100;

    level = 1;
    score = 0;

    bg.createImage('assets/bg.png')
    bg.position(450,150)
    bg.scale = 1

    bombsGroup = new Group()
    coinsGroup = new Group()

    myShip = createSprite(870,150)
    myShip.addImage("ship",shipImg)
    myShip.scale = 0.07;
    myShip.direction = 90;

    aliensGroup = new Group()

    ct = 0;
    speed = -4;

    gameState = PLAY;

    imageMode(CENTER)
}

function draw(){
    if(gameState === PLAY){    
        //constant moving of myShip
        myShip.velocityX = speed;
        alien.collide()
        bombClass.collide()

        //check to advance to next level
        levelTwo()
        levelThree()
        levelFour()
        levelEnd()

        if(!(levelTwo() || levelThree() || levelFour() || levelEnd())){
            constControls(0.001,2,-2);
        }
    }else{
        gameOver(reason)
    }



    drawSprites()
}

function spawnAliens(num){
    var x = -50;
    var y = random(25,275)
    alien = new Alien(x,y,num)

    alien.spawn();
}

function spawnBombs(num){
    var x = -50;
    var y = random(25,275)
    bombClass = new Bomb(x,y,num)

    bombClass.spawn();
}

function spawnCoins(num){
    var x = -50;
    var y = random(25,275)
    coinClass = new Coin(x,y,num)

    coinClass.spawn();
}

function levelTwo(){
    if((speed >= -5.5)&&(speed<= -7.5)){
        level = 2;
        constControls(0.009,4,-4);
        return true
    }else{return false}
}

function levelThree(){
    if((speed >= -7.5)&&(speed<= -10)){
        level = 3;
        constControls(0.09,6,-6);
        return true
    }else{return false}
}

function levelFour(){
    if((speed >= -10)&&(speed<= -11.5)){
        level = 4;
        constControls(0.1,8,8);
        return true
    }else{return false}
}

function levelEnd(){
    if(speed >= -11.5){
        level = 5;
        gameState = END;
        reason = "win"
        return true
    }else{return false}
}


function constControls(speedP,velocity, nVelocity){
            speed -= speedP
            score -= speedP

            scoreRep(d,25)

            //key controls
            if(keyDown("up")){
                myShip.velocityY = nVelocity;
            }
            
            if(keyDown("down")){
                myShip.velocityY = velocity;
            }

            while(keyDown("left")){
                var bullet = createSprite(myShip.x - 67, myShip.y, 700, 350)
                bullet.addImage("bullet", bulletImg)
                bullet.direction = 180
                bullet.scale = 0.01
                bullet.velocityX = nVelocity + 1;
                bulletsGroup.add(bullet)

                for(var i = 0; i < alien.amount; i++){
                    if(bullet.collide(aliensGroup[i])){
                        bullet.destroy()
                        aliensGroup[i].destroy()
                        bulletsGroup.remove(bullet)
                    }
                }
            }
            
            if((speed % 1) === 0){
                if((speed % 2)===0){
                    spawnAliens(speed/2)
                }else{
                    spawnAliens((speed/2)+0.5)
                }
            }

            if((speed % 1) === (0 || 1)){
                if((speed % 2)===0){
                    spawnBombs(speed/2)
                    spawnCoins(speed/2)
                }else{
                    spawnBombs((speed/2)+0.5)
                    spawnCoins((speed/2)+0.5)
                }
            }
}

function scoreRep(x,y) {
    var boxA, boxB;
    boxA = createSprite(x,y,d,25)
    boxA.shapeColor("yellow")
    boxB = createSprite(x,y,100,25)
    boxB.shapeColor("white")

    if(d <= 100){
        boxB.width = 100;
    }else{
        boxB.width = d;
    }
    //formula(e) to determine score representation
    boxA.width = score/2;
}

function gameOver(reason){
    if(reason==="alien"){
        swal({
            title: "Game Over",
            text: "The aliens have defeated you!!",
            imageUrl: "enter here",
            imageSize: "960x504",
            confirmButtonText: "VENGEANCE!"
        })
    }else if(reason==="bomb"){
        myShip.changeImage("blast", blastImg)
        swal({
            title: "Game Over",
            text: "You have been BOMBED!!",
            imageUrl: "enter here",
            imageSize: "960x504",
            confirmButtonText: "The rascals have not heard the last of ME!!"
        })
    }else if(reason==="win"){
        swal({
            title: "You Win!",
            text: "You have defeated the aliens!!",
            imageUrl: "enter here",
            imageSize: "960x504",
            confirmButtonText: "The filthy creatures deserved it!!"
        })
    }else{
        error()
    }

    myShip.destroy()
    boxA.destroy()
    boxB.destroy()
    aliensGroup.destroyEach()
    coinsGroup.destroyEach()
    bombsGroup.destroyEach()
}

function error(){
    swal({
        title: "An error has occured...",
        text: "Please take the following steps: 1. Reload the page, 2. Exit out of this tab and reopen, 3. Contact Github or Visual Studio Code for any mistakes in the code! We are sorry for your incovenience!",
        confirmButtonText: "I understand"
    })
}