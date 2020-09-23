class CollisionManager{
  constructor(game){

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
						case "fuel":	//С топливом
							obj1.addFuel(15);
							obj2.destroy();
						break;

            case "enemy":
              obj1.removeFuel(15);
              obj2.destroy();
            break;

            case "meteorite":
              obj1.removeFuel(15);
              obj2.destroy();
            break;

						default:		//С остальными предметами
							obj1.destroy();
							obj2.destroy();
						break;
					}
				break;

				case "enemy":	//Всё что связано со сталкиванием врага с чем-либо
					switch(tag2){
						case "laser":		//С лазером
							if(obj2.getOwner() == "player"){
                game.addScore(5);
								obj1.destroy();
								obj2.destroy();
							}
						break;
					}
				break;

        case "meteorite":
          switch(tag2){
            case "laser":
              if(obj2.getOwner() == "player"){
                obj2.destroy();
                if(obj1.getHP() > 1){
                  obj1.takeDamage();
                }
                else{
                  obj1.destroy();
                  game.addScore(10);
                }
              }
            break;
          }
        break;
			}
          }
        }
      }
    }
  }
}

class Game{
	constructor(menu_controller){
		const fps = 60;

		//Интервалы для генерации
		const ENEMY_SPAWN = 1500;
		const FUEL_SPAWN = 5000;
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
					planet = new Planet(planetsObj.barren.img, planetsObj.barren.size);
				break;

				case 1:
					planet = new Planet(planetsObj.earth.img, planetsObj.earth.size);
				break;

				case 2:
					planet = new Planet(planetsObj.lava.img, planetsObj.lava.size);
				break;

				case 3:
					planet = new Planet(planetsObj.orange.img, planetsObj.orange.size);
				break;

				case 4:
					planet = new Planet(planetsObj.red.img, planetsObj.red.size);
				break;

				case 5:
					planet = new Planet(planetsObj.red.img, planetsObj.red.size);
				break;

			}

			if(planet != null){
				planets.push(planet);
			}
		}

		var gameTimer = setInterval(gameCycle, 1000 / this.getFPS());		//Игровой цикл
		var enemiesTimer = setInterval(spawnEnemies, ENEMY_SPAWN);		//Генерация врагов
		var fuelTimer = setInterval(spawnFuel, FUEL_SPAWN);				//Генерация топлива
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
