class CollisionManager{
  constructor(){

    this.update = function(gameObjects){
      for(var i in gameObjects){
        for(var j in gameObjects){
          var obj1 = gameObjects[i];
          var obj2 = gameObjects[j];
		  
		  var tag1 = obj1.getTag();
		  var tag2 = obj2.getTag();

          if(obj1 == obj2)
            continue;

          //console.log("obj1 " + obj1);
          //console.log("obj2 " + obj2);
		  
		  //See collision_logic.png for explanation

          if(
            ( ( obj1.getCollider()[0] >= obj2.getCollider()[0] - obj2.getSize()[0] ) && ( obj1.getCollider()[0] - obj1.getSize()[0] <= obj2.getCollider()[0] ) )   //Ось X
            &&
            ( ( obj1.getCollider()[1] >= obj2.getCollider()[1] - obj2.getSize()[1] ) && ( obj1.getCollider()[1] - obj1.getSize()[1] <= obj2.getCollider()[1]) )    //Ось Y
          )
          {  
		    switch(tag1){
				case "player":		//Всё что связано со сталкиванием игрока с чем-либо
					switch(tag2){
						case "fuel":
							obj1.addFuel();
						break;
						
						case "laser":
							if(obj2.getOwner() != "player"){
								obj1.destroy();
								obj2.destroy();
							}
						break;
						
						default:
							obj1.destroy();
							obj2.destroy();
						break;
					}
				break;
			}
            //obj1.destroy();
            //obj2.destroy();
          }
        }
      }
    }
  }
}
