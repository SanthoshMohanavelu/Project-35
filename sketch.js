var balloon,balloonImage1,balloonImage2;
var database;
var position;
var height

// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPosition = database.ref('balloon/height')
  balloonPosition.on("value", readHeight, showError)

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(UP_ARROW)) {
    updateHeight(0, -10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.scale=balloon.scale -0.01
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0, 10)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //balloon.scale=balloon.scale -0.01
  }
  else if(keyDown(LEFT_ARROW)){
    updateHeight(-10, 0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   // balloon.scale=balloon.scale -0.01
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10, 0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
   // balloon.scale=balloon.scale -0.01
    
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function showError() {
  console.log("Error in writing to the database")
}

function changePosition(a, b) {

  balloon.x = balloon.x + a
  balloon.y = balloon.y + b   

}

function readHeight(data) {
  height = data.val()

  balloon.x = height.x
  balloon.y = height.y

}

function updateHeight(c, d) {

  database.ref('balloon/height').update({
    'x': height.x + c,
    'y': height.y + d

  }) 

}