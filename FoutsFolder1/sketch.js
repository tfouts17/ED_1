var numBalls = 6; //Set Number of balls
var damper = 0.03; //Constant to reduce exit velocity
var gravity = 0.07; //Y acceleration
var friction = -0.9; //Slow the balls over time
var xVelocity = 0; //Temporary variables to set xVel and yVel of balls
var yVelocity = 0; 

let balls = [];

function setup() {
  createCanvas(innerWidth, innerWidth); //innerWidth, innerWidth
  
  for (var i = 0; i < numBalls; i++) { //Create list with new ball objects
    balls[i] = new Ball(random(width), random(0,height/2), random(40, 70), i,balls, random(0,255),random(0,255),random(0,255), xVelocity, yVelocity);
  }
  
  strokeWeight(2);
  stroke(0);
}

function draw() {
  background(191,239,255);
  for (var i = 0; i<numBalls; i++) {
    balls[i].bounce();
    balls[i].move();
    balls[i].display();  
    balls[i].manualControl();
  }
}


class Ball {
  

  constructor(xPos, yPos, diameter, ind, otherBalls, red, green, blue, xVel, yVel) {
    this.xPos = xPos;
    this.yPos = yPos; 
    this.diameter = diameter;
    this.ind = ind;
    this.otherBalls = otherBalls;
    this.red = red;
    this.green = green;
    this.blue = blue; 
    this.xVel = xVel; 
    this.yVel = yVel;
  } 
  
  move() {
    this.yVel += gravity; //Decrease the y Velocity
    this.xPos += this.xVel; //Index x and y coordinates
    this.yPos += this.yVel;
    if (this.xPos > width -this.diameter/2) //Check if ball is on border
    {
      this.xPos = width - this.diameter/2; //Cant use or because of this line
      this.xVel *= friction; 
    }
    else if (this.xPos< this.diameter/2) {
      this.xPos = this.diameter/2;
      this.xVel *= friction;
    }
    if (this.yPos> height- this.diameter/2 ) {
      this.yPos = height - this.diameter/2;
      this.yVel *= friction; 
    } 
    else if (this.yPos < this.diameter/2) {
      this.yPos = this.diameter/2;
      this.yVel *= friction;
    }
  }
  manualControl()  {
   if (mouseIsPressed == true){ //If the mouse is inside the ball, set the ball to the position of the mouse
     if(abs(mouseX-this.xPos)<(this.diameter/2) && abs(mouseY-this.yPos)<(this.diameter/2)){
       this.xPos = mouseX;
       this.yPos = mouseY;
       this.xVel = mouseX - pmouseX; //Calculate the speed of the ball when thrown and set it to the velocity 
       this.yVel = mouseY - pmouseY;
     }
   }
  }
  
  bounce(){
    for(var i = this.ind+1; i<numBalls; i++){ 
      var xDist = this.otherBalls[i].xPos-this.xPos; //Calculate the distance between the x coordinates of the two balls
      var yDist = this.otherBalls[i].yPos-this.yPos;
      var dist = sqrt(xDist*xDist + yDist*yDist); //Calculate the actual distance between centers
      var minDist = this.otherBalls[i].diameter/2 + this.diameter/2+5; //Determine the distance at which the outside of the balls collide
      
      if(dist<=minDist){
        
        var angle = atan2(yDist, xDist); //Angle from origin to point
 
        var xAcc = cos(angle) * minDist*damper; //yDist times constant
        
        var yAcc = sin(angle) * minDist*damper; //xDist times constant
        
        this.xVel -= xAcc; 
        this.yVel -= yAcc;
        this.otherBalls[i].xVel += xAcc;
        this.otherBalls[i].yVel += yAcc;
      }
    }
    
  }
    
 
  display() {
    fill(this.red, this.green, this.blue);
    ellipse(this.xPos, this.yPos, this.diameter, this.diameter);
  }
}
