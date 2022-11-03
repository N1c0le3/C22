var skyImg, sky;
var floorImg, floor, floorsGroup ;
var bonnie, bonnieImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var gameover = false


function preload(){
  skyImg = loadImage("sky.png");
  floorImg = loadImage("floor.png");
  bonnieImg = loadImage("bonnie.png");
  happySound = loadSound("happy.wav");
  jumpSound = loadSound("bonniehop.mp3")
  gameoverSound = loadSound("gameover.mp3")
  
  
  
}

function setup() {
  createCanvas(600,600);
  happySound.loop();
  sky = createSprite(300,300);
  sky.addImage("sky",skyImg);
  sky.velocityY = 1;
  
  floorsGroup = new Group();
  invisibleBlockGroup = new Group();
  
  bonnie = createSprite(200,200,50,50);
  bonnie.scale = 0.5;
  bonnie.addImage("bonnie", bonnieImg);
}


function draw() {
  background(255);
 if(sky.y > 400){
      sky.y = 300
    } 
  
  if (gameState === "play") {
    
    if(keyDown("left")){
        bonnie.x = bonnie.x - 3;

      
    }
    if(keyDown("right")){
  
          bonnie.x = bonnie.x + 3;

      
      
    }
    if(keyDown("space")){
  
         bonnie.velocityY = -10;
         jumpSound.play()

      
      
    }
  
  bonnie.velocityY = bonnie.velocityY + 0.8;
  
   
      
    
      spawnFloors();

  

     if(floorsGroup.isTouching(bonnie)){
      bonnie.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(bonnie) || bonnie.y > 600){
      bonnie.destroy()
      gameState = "end"
    
    }
    
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("black");
    fill("black");
    textSize(30);
    text("Game Over", 230,250)
    happySound.stop()
    if (!gameoverSound.isPlaying){
        gameoverSound.play()
    }
    
  }
}

function spawnFloors()
 {
 
  if (frameCount % 240 === 0) {
    var floor = createSprite(Math.round(random(200,400)), -50);
    var invisibleBlock = createSprite(floor.x,floor.y);
    invisibleBlock.width = floor.width;
    invisibleBlock.height = 2;
   
  
    floor.addImage(floorImg);
    
    
    floor.velocityY = 1;
    invisibleBlock.velocityY = 1;

    
    floor.setCollider("rectangle",0,0,50,10)
    
    
    


    floor.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    
    invisibleBlock.debug = false;
    floorsGroup.add(floor);
    invisibleBlockGroup.add(invisibleBlock);
  }
} 

