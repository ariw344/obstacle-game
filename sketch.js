var player, playerImg, stoneImg, treeImg;
var lane = 2;
var time = 0;
var random1 = Math.floor(Math.random() * 26 + 35);
var random2 = Math.floor(Math.random() * 6);
var random3 = 0;
var health = 3;
var time2 = 12;
var gameState = -1;
var seconds = 0;
var speedIncrease = 0;
var highscore = 0;
var obstacle, obstacleGroup, easy, medium, hard, frequency;
var easySprite, mediumSprite, hardSprite;
ynumbers = [80, 175, 270];
function preload() {
  playerImg = loadImage("player.png");
  stoneImg = loadImage("stone.png");
  treeImg = loadImage("tree.png");
}

function setup() {
  createCanvas(800,400);
  player = createSprite(150, 175, 50, 50);
  player.scale = 0.2; 
  player.addImage("player", playerImg);
  player.visible = false;
  obstacleGroup = new Group();
  easy = createButton("Easy Mode")
  easy.position(350, 100);
  medium = createButton("Medium Mode")
  medium.position(350, 160);
  hard = createButton("Hard Mode")
  hard.position(350, 220);
  reset = createButton("Reset");
  reset.hide();
  reset.position(350, 190);
}
function draw() {
  easy.mousePressed(function() {
    frequency = 30;
    easy.hide();
    medium.hide();
    hard.hide();
    gameState = 0;
    health = 3;
    time2 = 12;
    seconds = 0;
    speedIncrease = 0;
  })
  medium.mousePressed(function() {
    frequency = 23;
    easy.hide();
    medium.hide();
    hard.hide();
    gameState = 0;
    health = 3;
    time2 = 12;
    seconds = 0;
    speedIncrease = 0;
  })
  hard.mousePressed(function() {
    frequency = 15;
    easy.hide();
    medium.hide();
    hard.hide();
    gameState = 0;
    health = 3;
    time2 = 12;
    seconds = 0;
    speedIncrease = 0;
  })
  reset.mousePressed(function() {
    easy.show();
    medium.show();
    hard.show();
    reset.hide();
    gameState = -1;
  })
  time++;
  random3++;
  time2++;
  speedIncrease = Math.floor(Math.floor(seconds/30) / 8);
  strokeWeight(5);
  background(200);
  if(gameState !== -1) {
    line(50, 30, 750, 30);   
    line(50, 125, 750, 125);
    line(50, 220, 750, 220);
    line(50, 315, 750, 315);
  }
  if (gameState === 0 ) {
    seconds++;
    obstacles();
    onHit();
    if(keyDown(UP_ARROW) && lane > 1 && time > 6) {
      for(var i = 0; i < 95; i++) {
        player.y -= 1;
      }
      lane -= 1;
      time = 0;
    }
    if(keyDown(DOWN_ARROW) && lane < 3 && time > 6) {
      for(var j = 0; j < 95; j++) {
        player.y += 1;
      }
      lane += 1;
      time = 0;
    }
  }
  if (gameState === 1) {
    textSize(30);
    fill("red");  
    strokeWeight(10);
    text("Game Over", 330, 180)
    text("You survived for " + Math.floor(seconds/30) + " seconds.", 270, 270);
  }
  drawSprites();
  textSize(20);
  fill("black");
  text("Health: " + health, 350, 370);
  if(gameState !== 0) {
    text("Your current high score is " + highscore + " seconds.", 250, 75);
  }
  if (gameState === 0) {
    player.visible = true;
  }
  else {
    player.visible = false;
  }
}
function obstacles() {
  if(random3 % random1 === 0) {
    random1 = Math.floor(Math.random() * frequency + 20);
    random2 = Math.floor(Math.random() * 6);
    random3 = 0;
    switch(random2) {
      case 0: 
      obstacle = createSprite(730, ynumbers[0], 30, 30);
      obstacle.velocityX = -7 - speedIncrease;
      obstacle.addImage("stone", stoneImg);
      obstacle.scale = 0.15;
      obstacleGroup.add(obstacle);
      break;
      case 1: 
      obstacle = createSprite(730, ynumbers[1], 30, 30);
      obstacle.velocityX = -7 - speedIncrease;
      obstacle.addImage("stone", stoneImg);
      obstacle.scale = 0.15;
      obstacleGroup.add(obstacle);
      break;
      case 2: 
      obstacle = createSprite(730, ynumbers[2], 30, 30);
      obstacle.velocityX = -7 - speedIncrease;
      obstacle.addImage("stone", stoneImg);
      obstacle.scale = 0.15;
      obstacleGroup.add(obstacle);
      break;
      case 3: 
      obstacle = createSprite(730, ynumbers[0], 30, 30);
      obstacle.velocityX = -7 - speedIncrease;
      obstacle.addImage("tree", treeImg);
      obstacle.scale = 0.013;
      obstacleGroup.add(obstacle);
      break;
      case 4: 
      obstacle = createSprite(730, ynumbers[1], 30, 30);
      obstacle.velocityX = -7 - speedIncrease;
      obstacle.addImage("tree", treeImg);
      obstacle.scale = 0.013;
      obstacleGroup.add(obstacle);
      break;
      case 5: 
      obstacle = createSprite(730, ynumbers[2], 30, 30);
      obstacle.velocityX = -7 - speedIncrease;
      obstacle.addImage("tree", treeImg);
      obstacle.scale = 0.013;
      obstacleGroup.add(obstacle);
      break;
    }
  } 
}

function onHit() {
  for(var i = 0; i < obstacleGroup.length; i++) {
    if (obstacleGroup.isTouching(player) && gameState === 0) {
      if (time2 > 12) {
        time2 = 0;
        health--;
        if (health === 0) {
          gameState = 1;
          if (Math.floor(seconds/30) > highscore) {
            highscore = Math.floor(seconds/30);
          }
          reset.show();
          obstacleGroup.destroyEach();
        }
      }
      if (obstacleGroup.length >= 1) {
        obstacleGroup.get(i).destroy();
      }
    } 
  }
}

