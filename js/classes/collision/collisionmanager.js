class CollisionManager{
  constructor(){

    this.update = function(gameObjects){
      for(var i in gameObjects){
        for(var j in gameObjects){
          var obj1 = i;
          var obj2 = j;

          if(obj1 == obj2)
            continue;

          console.log("obj1 " + obj1);
          console.log("obj2 " + obj2);

          if(
            ( ( obj1.getCollider()[0] >= obj2.getCollider()[0] - obj2.getSize()[0] ) && ( obj1.getCollider()[0] - obj1.getSize()[0] <= obj2.getCollider()[0] ) )   //Ось X
            &&
            ( ( obj1.getCollider()[1] >= obj2.getCollider()[1] - obj2.getSize()[1] ) && ( obj1.getCollider()[1] - obj1.getSize()[1] <= obj2.getCollider()[1]) )    //Ось Y
          )
          {
            obj1.destroy();
            obj2.destroy();
          }
        }
      }
    }
  }
}
