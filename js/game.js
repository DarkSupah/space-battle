//Привязка
var _menuController = new MenuController(); //Контроллер менюшек
var _player = null;
var _renderer = new Renderer(document.getElementById("canvas"));
var _input = new Input();
var enemies = new Array();

window.addEventListener("keydown", _input.checkKeys, false);
window.addEventListener("keypress", _input.checkKeys, false);
window.addEventListener("keyup", _input.checkKeys, false);

document.querySelectorAll(".menu").forEach(function(element){
    var _menu = new Menu(element);
    _menuController.addMenu(_menu);
});
//Привязываем кнопки
document.getElementById("start").addEventListener("click", function(){
    _menuController.showMenu("playername");
}, false);  //Начать игру
document.getElementById("top-score").addEventListener("click", function(){
    _menuController.showMenu("top-score");
}, false);  //Рекорды
document.getElementById("exit").addEventListener("click", function(){
    close();
}, false);  //Закрыть
document.querySelectorAll(".to-menu").forEach(function(btn){
    btn.addEventListener("click", function(){
    _menuController.showMenu("main");
}, false);  //Вернуться в главное меню
});

var x = 0;
var y = 0;

var test = new Array();

test[0] = 400;
test[1] = 200;

function spawnEnemies(){
	var test = new Array();
	
	test[0] = 860;
	test[1] = 540 * Math.random();
	
	var enemy = new Enemy(test);
	enemies.push(enemy);
}

document.getElementById("start-game").addEventListener("click", function(){
    _player = new Player(document.getElementById("iPlName").value);

	enemy = new Enemy(test);
    
    _menuController.showMenu("game-menu");
    
	setInterval(draw, 10);
	setInterval(move, 10);
	setInterval(spawnEnemies, 3000);
}, false);      //Перейти в игровое окно

function move(){
    _player.addY(_input.getMV() * 2);
	
	if(_input.getFire())
		_player.shoot();
	
	enemies.forEach(
		function(en){
			if(en.getPos()[0] < -60){
				delete en;
			}
			else
				en.move(1);
		}
	);
	
	_player.getShots().forEach(
		function(sh){
			sh.move(1);
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