class UI{
  constructor(renderer, player){
    this.update = function(){
      drawFuel();
      drawScore();
    }

    function drawScore(){
      var score = player.getScore();
      var pos = Array(773, 40);

      renderer.DrawTextShadow(score, pos, "red");
    }

    function drawFuel(){
      var fuel = player.getFuel();
      var maxFuel = player.getMaxFuel();

      for(var i = 1; i < fuel + 1; i++){
        var pos = Array(790 - i * 20, 10);
        var size = Array(15,15);

        renderer.DrawRect(pos, size, "red");
      }
    }
  }
}
