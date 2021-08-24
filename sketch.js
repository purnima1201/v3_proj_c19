var PLAY = 1;
var END = 0;
var START = 2;
var gameState = START;

var playLevel = true;
var level = 1;

var coin, coinImage, coinGroup;
var ground,ground_image,invisible_ground;
var girl,girl_running,girl_collided,girlImage,zombie,zombie_running,zombie_attack;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
ground_image=loadImage("Background.png");
  girl_running = loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png","Run (11).png","Run (12).png","Run (14).png","Run (15).png","Run (16).png","Run (17).png","Run (18).png","Run (19).png","Run (20).png");
  obstacle1=loadImage("obstacle1.png");
  coin1 = loadImage("coin.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  coinSound = loadSound("CoinCollect.mp3");
  
  checkPointSound = loadSound("checkPoint.mp3")
  gameOverImage=loadImage("gameOver1.png");
  restartImage=loadImage("restart1.png");
  girl_collided=loadImage("Dead (30).png");
  girlImage=loadImage("Idle (1).png");
}

function setup() {
  createCanvas(600,500);
  
  ground=createSprite(500,185,0,0);
  ground.shapeColor="white";
  ground.addImage("ground_image",ground_image);
  ground.scale=2;
  ground.velocityX=-1
 
  
  girl=createSprite(300,420,600,10);
  girl.addAnimation("girl_running",girl_running);
  girl.addImage("girl_collided",girl_collided);
  girl.addImage("girlImage",girlImage);
  girl.scale=0.2;
  girl.setCollider("rectangle",0,0,girl.width,girl.height)
  
  
  invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=false;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  obstaclesGroup=new Group();
  coinsGroup=new Group();
  
  score=0;
  level = 1;
}

function draw() {
 background("black");
   //Gravity
  girl.velocityY = girl.velocityY + 0.8;
  girl.collide(invisible_ground);  
  
  
   if (gameState===PLAY)
   {
      gameOver.visible=false;
      restart.visible=false;
    //  zombie.y=girl.y;
   //score = score + Math.round(getFrameRate()/60);
 
      spawnObstacles();
      spawnCoins();
     
      ground.velocityX = -(4 + 3* score/100);
     
      if (ground.x < 50){
      ground.x = ground.width/2;
      }
   } 
 
     
     
  
    if(score>0 && score%500 === 0 && playLevel){
       checkPointSound.play() 
       playLevel = false;
       level = level + 1;
    }
    
     if((keyDown("space")&& girl.y >= 410 && gameState === PLAY)) {
       girl.velocityY = -12;
        jumpSound.play();
      }  
  
      if (girl.isTouching(coinsGroup)){
        score = score + 10;
        playLevel = true;
        coinSound.play();
        coinsGroup.destroyEach();
      }
     
    if (girl.isTouching(obstaclesGroup)){
      gameState=END;
       dieSound.play();
    }
 
    else if ( gameState===END) {
      gameOver.visible=true;
      restart.visible=true;
      ground.velocityX = 0;
      girl.velocityY = 0
      girl.changeImage("girlImage",girlImage);
    
   
      //set lifetime of the game objects so that they are never           destroyed
      obstaclesGroup.setLifetimeEach(-1);
      obstaclesGroup.setVelocityXEach(0);
       
      coinsGroup.setLifetimeEach(-1);
      coinsGroup.setVelocityXEach(0);
    }
    if(mousePressedOver(restart)) {
      reset();
    }

  
 
  drawSprites();
  fill("lightpink");
  textSize(20);
  text("Score: "+ score, 500,50);
  
  fill("lightpink");
  textSize(20);
  text("Level: "+ level, 500,85);
  
    if (gameState=== START)
   {
     gameOver.visible=false;
     restart.visible=false;
     
     ground.velocityX = 0
     girl.velocityY = 0
     girl.changeImage("girlImage",girlImage);

     fill("blue");
     textSize(25);
     text("Objective:", 10,100);
     text("Collect coins without hitting the obstacles", 10,125);
     text("Press space to jump the obstacles",10,150);
     text("After every 500 score the level will increase",10,175);
     text("Press 's' key to start the game",10,200);
     
     if (ground.x < 50){
      ground.x = ground.width/2;
      }

     //if(gameState === START && keyTyped === 's'){
       // gameState = PLAY;
        //}
     
    }
  
  
}
function keyTyped(){
  if(key == 's' || key == 'S'){
   
    if(gameState === START ){
        gameState = PLAY;
      girl.changeAnimation("girl_running",girl_running);
      }
  }
}
function reset(){
  gameState=START;
gameOver.visible=false;
restart.visible=false;
girl.changeAnimation("girl_running",girl_running);
  obstaclesGroup.destroyEach();
  coinsGroup.destroyEach();
  score=0;
  level = 1;
}

function spawnObstacles() {
 
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,450,10,40);
   obstacle.velocityX = -6; //-(4 + 3* score/100);
   
    //generate random obstacles
   //var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
   obstacle.scale=0.1;
      obstaclesGroup.add(obstacle);
obstacle.setCollider("circle",0,0,1);

     
   }
}
  function spawnCoins() {
   if (frameCount % 60 === 0){
     var coin = createSprite(600,350,10,40);
     coin.velocityX = -6; //-(4 + 3* score/100);
     coin.addImage(coin1);
     coin.scale=0.2;
     coinsGroup.add(coin);
     coin.setCollider("circle",0,0,1);
    }
     
  }


