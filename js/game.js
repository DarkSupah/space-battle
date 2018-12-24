class Game{
	constructor(){
		const fps = 60;

		var renderer = new Renderer(document.getElementById("canvas"));
		var input = new Input();

		var player = new Player("test", input);
		var enemies = new Array();
		var barrels = new Array();

		var ui = new UI(renderer, player);	//UI

		var collisionManager = new CollisionManager();	//Коллизия

		var collideableGO = new Array();	//Объекты с коллизией

		this.getInput = function(){
			return input;
		}

		function spawnFuel(){
			//Рандомим позицию спавна
			var spawnPos = Array(830, 540 * Math.random());

			//Создаём бочку
			var barrel = new Fuel(spawnPos);
			barrels.push(barrel);		//Добавляем её в массив
		}

		this.getFPS = function(){
			return fps;
		}

		function move(){
			//Управление коллизией
			collideableGO.length = 0;

			collideableGO.push(player);

			enemies.forEach(						//Добавить всех врагов в массив
				function(en){
					collideableGO.push(en);
				}
			);

			barrels.forEach(						//Добавить все бочки в массив
				function(ba){
					collideableGO.push(ba);
				}
			);

			player.getShots().forEach(	//Добавить все выстрелы игрока в массив
				function(sh){
					collideableGO.push(sh);
				}
			);

		  collisionManager.update(collideableGO);		//Обработать коллизию в игре

		  player.update();													//"Обновить" информацию о игроке

			//Движение и уничтожение врагов
			for(var en in enemies){
				if(enemies[en].getPos()[0] < -60){
					enemies.splice(en, 1);
				}
				else{
					enemies[en].update();
				}
			}

			//Движение и уничтожение выстрелов игрока
			for(var sh in player.getShots()){
				if(player.getShots()[sh].getPos()[0] > 800){
					player.getShots().splice(sh, 1);
				}
				else{
					player.getShots()[sh].update();
				}
			}

			//Движение и уничтожение бочек
			for(var ba in barrels){
				if(barrels[ba].getPos()[0] < -60){
					barrels.splice(ba, 1);
				}
				else{
					barrels[ba].update();
				}
			}
		}

		function draw(){
			renderer.Clear();		//Очищаем канвас для отрисовки кадра
		  renderer.Draw(player);		//Отрисовка игрока

			player.getShots().forEach(		//Отрисовка выстрелов игрока
				function(sh){
					renderer.Draw(sh);
				}
			);

			enemies.forEach(							//Отрисовка врагов
				function(en){
					renderer.Draw(en);
				}
			);

			barrels.forEach(						//Отрисовка бочек
				function(ba){
					renderer.Draw(ba);
				}
			);

			ui.update();								//Обновление данных в UI
		}

		function gameCycle(){
			if(!player.getLifestate())
				endGame();
				else{
					move();
					draw();
				}
		}

		function spawnEnemies(){
			var spawnPos = new Array();

			spawnPos[0] = 860;
			spawnPos[1] = 540 * Math.random();

			var enemy = new Enemy(spawnPos);
			enemies.push(enemy);
		}

		function wasteFuel(){
			player.wasteFuel();
		}

		this.getPlayer = function(){
			return player;
		}

		this.getPlayerLifestate = function(){
			return player.getLifestate();
		}

		function endGame(){
			clearInterval(gameCycle);
			clearInterval(spawnEnemies);
			clearInterval(spawnFuel);
			clearInterval(wasteFuel);

			renderer.Clear();

			var gameOverImg = new Image();
			gameOverImg.src = "img/gameover.jpg";

			var pos = Array(0,0);
			var size = Array(800,600);

			renderer.DrawImage(gameOverImg, pos, size);
		}

		setInterval(gameCycle, 1000 / this.getFPS());		//Игровой цикл
		setInterval(spawnEnemies, 1500);		//Спавн врагов
		setInterval(spawnFuel, 500);				//Спавн топлива
		setInterval(wasteFuel, 1000);				//Трата топлива
	}
}

var game = new Game();

// setInterval(game.gameCycle, 1000 / game.getFPS());		//Игровой цикл
// setInterval(game.spawnEnemies, 3000);		//Спавн врагов
// setInterval(game.spawnFuel, 1000);				//Спавн топлива
// setInterval(game.wasteFuel, 1000);				//Трата топлива

//Event listeners for keys
$(document).keypress(game.getInput().checkKeys);
$(document).keyup(game.getInput().checkKeys);
$(document).keydown(game.getInput().checkKeys);
