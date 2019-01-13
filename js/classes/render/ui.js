class UI{
  constructor(renderer, player){
    this.update = function(score, time){
      drawFuel();
      drawScore(score);
      drawTime(time);
    }

    function drawScore(score){
      var str = "Очки: " + score;
      var pos = Array(800 - str.length * 10, 50);
      renderer.DrawTextShadow(str, pos, "red");
    }

    function drawTime(time){
      var str = "Время: " + time;
      var pos = Array(800 - str.length * 10, 70);
      renderer.DrawTextShadow(str, pos, "red");
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
