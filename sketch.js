const Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var engine, world;
  
var plinkos = [];
var divisions = [];

var width = 400;
var height = 100;
var divisionHeight=300;
var score = 0;
var particle;
var turn = 0; 
var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50) 
  {    
      plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) 
  {
      plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50) 
  {
      plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50) 
  {    
      plinkos.push(new Plinko(j,375));
  }
}

function mouseClicked() {
   if (gameState !== "end") {
      turn++;
      particle = new Particle(mouseX, 10, 10);
   }
}

function draw() {
  Engine.update(engine);
  background("black");
  textSize(20);
  text("Score : "+score,20,30);
  textSize(20);
  text("500",25,520);
  text("500",105,520);
  text("500",185,520);
  text("500",265,520);
  text("100",345,520);
  text("100",425,520);
  text("100",505,520);
  text("200",585,520);
  text("200",665,520);
  text("200",745,520);

   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
   }

   for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }

   if (particle != null) {
     particle.display();
     if (particle.body.position.y > 760) {
        if (particle.body.position.x < 300) {
          score = score + 500;
        }
        if (particle.body.position.x > 301 && 
           particle.body.position.x < 600) {
          score = score + 100;
        }
        if (particle.body.position.x > 601 && 
            particle.body.position.x < 900) {
          score = score + 200;
        }
        particle = null;
      }
   }
    
        if (turn > 4){      
          gameState = "end";
          textSize(50);
          fill("white");
          text("GAME OVER", 250, 320);
        }
}