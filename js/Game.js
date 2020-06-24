class Game {
  constructor(){}
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
        gameState = data.val();
    });
  }
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(10,200);
    car1.addImage("car1",car1_img);
    car1.scale = 0.35;
    car1.setCollider("rectangle",0,0);

    car2 = createSprite(10,400);
    car2.addImage("car2",car2_img);
    car2.scale = 0.35;
    car2.setCollider("rectangle",0,0);

    car3 = createSprite(10,600);
    car3.addImage("car3",car3_img);
    car3.scale = 0.35;
    car3.setCollider("rectangle",0,0);

    car4 = createSprite(10,800);
    car4.addImage("car4",car4_img);
    car4.scale = 0.35;
    car4.setCollider("rectangle",0,0);

    cars = [car1, car2, car3, car4];
    
  }
  play(){
    form.hide();
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track,0,360,displayWidth*4, displayHeight+500);
      var index = 0;
      var y = 430 ;
      var x = 0;

      for(var plr in allPlayers){
        index = index + 1 ;
        y = y + 180;

        x = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x, y, 70, 70);
          cars[index - 1].shapeColor = "black";
          camera.position.y = cars[index-1].y;
          camera.position.x = cars[index-1].x;
        }
      }
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=10;
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance <= -4460){
      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();
  }
}
  