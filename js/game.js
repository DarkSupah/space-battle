class Game{
	constructor(menu_controller){
		const fps = 60;

		//Интервалы для генерации
		const ENEMY_SPAWN = 1500;
		const FUEL_SPAWN = 5000;
		const FUEL_WASTE = 1000;
		const PLANET_SPAWN = 2000;
		const METEORITE_SPAWN = 5000;

		var score = 0;

		var canvas = document.getElementById("canvas");
		canvas.classList.remove("hidden");

		var renderer = new Renderer(canvas);
		var input = new Input();

		var timer = new Timer();

		var player = new Player(input);	//Игрок
		var enemies = new Array();	//Враги
		var barrels = new Array();	//Бочки
		var planets = new Array();	//Планеты
		var meteorites = new Array();	//Метеориты

		var ui = new UI(renderer, player);	//UI

		var collisionManager = new CollisionManager(this);	//Коллизия

		var collideableGO = new Array();	//Объекты с коллизией

		this.getInput = function(){
			return input;
		}

		function spawnMeteorites(){
			var sizeFactor = 30 * Math.random();
			var size = Array(20 + sizeFactor, 20 + sizeFactor);

			var spawnPos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * Math.random());
			var meteorite = new Meteorite(spawnPos, size);
			meteorites.push(meteorite);
		}

		function spawnFuel(){
			//Рандомим позицию спавна
			var spawnPos = Array(830, 540 * Math.random());

			//Создаём бочку
			var barrel = new Fuel(spawnPos);
			barrels.push(barrel);		//Добавляем её в массив
		}

		this.addScore = function(amt){
			score += amt;
		}

		this.getFPS = function(){
			return fps;
		}

		this.getTimer = function(){
			return timer;
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

			meteorites.forEach(
				function(met){
					collideableGO.push(met);
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

			//Движение и уничтожение планет
			for(var pl in planets){
				if(planets[pl].getPos()[0] < -planets[pl].getSize()[0]){
					planets.splice(pl, 1);
				}
				else{
					planets[pl].update();
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

			//Движение и уничтожение метеоритов
			for(var met in meteorites){
				if(meteorites[met].getPos()[0] < -100){
					meteorites.splice(met, 1);
				}
				else{
					meteorites[met].update();
					console.log("METEORITE POS: " + meteorites[met].getPos());
				}
			}
		}

		function draw(){
			renderer.Clear();		//Очищаем канвас для отрисовки кадра

			planets.forEach(
				function(pl){
					renderer.Draw(pl);
				}
			);

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

			meteorites.forEach(					//Отрисовка метеоритов
				function(met){
					renderer.Draw(met);
				}
			);

			renderer.Draw(player);		//Отрисовка игрока

			ui.update(score, timer.getTime());								//Обновление данных в UI
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

		//Вызывается, когда игрок проиграл
		function endGame(){
			clearInterval(gameTimer);
			clearInterval(enemiesTimer);
			clearInterval(fuelTimer);
			clearInterval(wasteTimer);
			clearInterval(planetTimer);
			clearInterval(meteoriteTimer);

			timer.stop();

			renderer.Clear();

			menu_controller.showMenu("gameover");
			document.getElementById("score").textContent = score;
			canvas.classList.add("hidden");
		}

		function spawnPlanet(){
			var rand = Math.floor(Math.random() * 6);

			var planet = null;

			switch(rand){
				case 0:
					planet = new Barren();
				break;

				case 1:
					planet = new Earth();
				break;

				case 2:
					planet = new Lava();
				break;

				case 3:
					planet = new Orange();
				break;

				case 4:
					planet = new Red();
				break;

				case 5:
					planet = new Rock();
				break;

			}

			if(planet != null){
				planets.push(planet);
			}
		}

		var gameTimer = setInterval(gameCycle, 1000 / this.getFPS());		//Игровой цикл
		var enemiesTimer = setInterval(spawnEnemies, ENEMY_SPAWN);		//Генерация врагов
		var fuelTimer = setInterval(spawnFuel, FUEL_SPAWN);				//Генерация топлива
		var wasteTimer = setInterval(wasteFuel, FUEL_WASTE);				//Трата топлива
		var planetTimer = setInterval(spawnPlanet, PLANET_SPAWN);		//Генерация планет
		var meteoriteTimer = setInterval(spawnMeteorites, METEORITE_SPAWN);	//Генерация метеоритов
	}
}
var game = undefined;

var menu_controller = new MenuController();

var html_menus = document.querySelectorAll(".menu");

html_menus.forEach(function(m){
	var menu = new Menu(m);
	menu_controller.addMenu(menu);
});

document.getElementById("start").addEventListener("click", function(){
	menu_controller.showMenu("game-menu");
	var game = new Game(menu_controller);
	game.getTimer().start();

	$(document).keypress(game.getInput().checkKeys);
	$(document).keyup(game.getInput().checkKeys);
	$(document).keydown(game.getInput().checkKeys);
}, false);

document.getElementById("exit").addEventListener("click", function(){
	close();
}, false);

document.querySelectorAll(".to-menu").forEach(function(b){
	b.addEventListener("click", function(){
		menu_controller.showMenu("main");
		game = undefined;
	}, false);
});
