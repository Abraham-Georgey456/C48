var bg, bg_img, lander, lander_img, ground;
var vX = 0;
var vY = 0;
var g= 0.05;
var fuel = 100;
var thrust,crash,land,rcs_left,rcs_right,normal;
var obs, obstacle_img, lz, lzimg;


function preload(){
  bg_img = loadImage("bg.png");
  lander_img = loadImage("normal.png");
  thrust = loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png");
  crash = loadAnimation("crash1.png","crash2.png","crash3.png");
  land = loadAnimation("landing1.png","landing2.png","landing_3.png");
  rcs_left = loadAnimation("left_thruster_1.png","left_thruster_2.png");
  rcs_right = loadAnimation("right_thruster_1.png","right_thruster_2.png");
  normal = loadImage("normal.png");
  obstacle_img = loadImage("obstacle.png");
  lzimg = loadImage("lz.png");

  thrust.playing = true;
  thrust.looping = false;
  rcs_left.looping = false;
  rcs_right.looping = false;
  crash.looping = false;
  lander.looping = false;
}
 
function setup() {
  createCanvas(1000,700); 
  frameRate(80);
  timer = 1500;

  thrust.frameDelay = 5;
  rcs_left.frameDelay = 5;
  rcs_right.frameDelay = 5;
  crash.frameDelay = 10;


  lander = createSprite(100,50,50,50);
  lander.addImage(lander_img)
  lander.scale = 0.1
  lander.setCollider("rectangle",0,0,200,200)

  // changing all animations
  lander.addAnimation('thrusting', thrust);
  lander.addAnimation('left', rcs_left);
  lander.addAnimation('normal',normal);
  lander.addAnimation('right', rcs_right);
  lander.addAnimation('crashing', crash);
  lander.addAnimation('landing', land);

  ground = createSprite(500,690,1000,20);

  obs = createSprite(320,530,50,100);
  obs.addImage(obstacle_img);
  obs.scale = 0.5
  obs.setCollider("rectangle",0,100,300,300)


  lz = createSprite(880,610,50,30);
  lz.addImage(lzimg);
  lz.scale = 0.3
  lz.setCollider("rectangle",0,180,400,100);
  lz.debug = true

  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background("blue");
  image(bg_img,0,0); 

  push();
  fill(255);
  text("Horizontal Velocity: "+ round(vX),800,50);
  text("Vertical Velocity: "+ round(vY),800,75);
  text("Fuel: "+ fuel, 800,100)
  pop();
   
  vY += g;
  lander.position.y += vY;
  lander.position.x += vX;

 
  //lander.collide(ground);

  if(lander.collide(obs) == true){
    lander.changeAnimation('crashing');
    stop();
  }


  //landing detection
  var d = dist(lander.position.x,lander.position.y,lz.position.x,lz.position.y);
  console.log(d);
  if(d <= 35 && (vY < 2 && vY >- 2) && (vX < 2 && vX >- 2)){
    console.log("landed");
    stop()
    lander.changeAnimation('landing');

  }

  if(lander.collide(ground) == true){
    //console.log(collided)
    lander.changeAnimation('crashing');
    vX = 0;
    vY = 0;
    g = 0;
  } 

 drawSprites();
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    upward_Thrust();
    lander.changeAnimation('thrusting');
    thrust.nextFrame();
  }
  if(keyCode == RIGHT_ARROW && fuel > 0 ){
    lander.changeAnimation('right');
    right_thrust();
  }
  if(keyCode == LEFT_ARROW && fuel > 0){
    lander.changeAnimation('left')
    left_thrust();
  }
}

function upward_Thrust(){
   vY -=1
}

function right_thrust(){
    vX += 0.2;
    fuel -= 1;
}

function left_thrust(){
  vX -= 0.2;
  fuel -= 1;
}

function stop(){
  vX = 0;
  vY = 0;
  g = 0;
  fuel = 0;
}