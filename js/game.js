//Привязка
var _renderer = new Renderer(document.getElementById("canvas"));
var _input = new Input();
var _player = new Player("test", _input);
var enemies = new Array();
var collisionManager = new CollisionManager();

var collideableGO = new Array();

$(document).keypress(_input.checkKeys);
$(document).keyup(_input.checkKeys);
$(document).keydown(_input.checkKeys);

var x = 0;
var y = 0;

var test = new Array();

test[0] = 400;
test[1] = 200;

setInterval(draw, 1000 / 60);
setInterval(move, 1000 / 60);
setInterval(spawnEnemies, 3000);

function spawnEnemies(){
	var test = new Array();

	test[0] = 860;
	test[1] = 540 * Math.random();

	var enemy = new Enemy(test);
	enemies.push(enemy);
}

function move(){
	collideableGO.length = 0;

  collideableGO.push(_player);

	enemies.forEach(
		function(en){
			collideableGO.push(en);
		}
	);

	_player.getShots().forEach(
		function(sh){
			collideableGO.push(sh);
		}
	);

  //collideableGO.push(enemies);
  //collideableGO.push(_player.getShots());

  collisionManager.update(collideableGO);

	console.log(collideableGO);

  _player.update();

	console.log("Enemies count: " + enemies.length);

	enemies.forEach(
		function(en){
			if(en.getPos()[0] < -60){
				delete en;
			}
      else{
        en.update();
      }
		}
	);

	_player.getShots().forEach(
		function(sh){
			if(sh.getPos()[0] > 800){
				console.log("laser removed");
        delete sh;
      }
      else{
        sh.update();
      }
		}
	);
}

function draw(){
	_renderer.Clear();
    _renderer.Draw(_player);

	_player.getShots().forEach(
		function(sh){
			_renderer.Draw(sh);
		}
	);

	enemies.forEach(
		function(en){
			_renderer.Draw(en);
		}
	);
}
