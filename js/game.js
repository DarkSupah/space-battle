//Привязка
var renderer = new Renderer(document.getElementById("canvas"));
var input = new Input();

var player = new Player("test", input);
var enemies = new Array();
var barrels = new Array();

var ui = new UI(renderer, player);

var collisionManager = new CollisionManager();

var collideableGO = new Array();

$(document).keypress(input.checkKeys);
$(document).keyup(input.checkKeys);
$(document).keydown(input.checkKeys);

setInterval(draw, 1000 / 60);
setInterval(move, 1000 / 60);
setInterval(spawnEnemies, 3000);
setInterval(spawnFuel, 5000);
setInterval(wasteFuel, 1000);

function spawnFuel(){
	var spawnPos = new Array();

	spawnPos[0] = 860;
	spawnPos[1] = 540 * Math.random();

	var barrel = new Fuel(spawnPos);
	barrels.push(barrel);
}

function spawnEnemies(){
	var spawnPos = new Array();

	spawnPos[0] = 860;
	spawnPos[1] = 540 * Math.random();

	var enemy = new Enemy(spawnPos);
	enemies.push(enemy);
}

function move(){
	collideableGO.length = 0;

	collideableGO.push(player);

	enemies.forEach(
		function(en){
			collideableGO.push(en);
		}
	);

	barrels.forEach(
		function(ba){
			collideableGO.push(ba);
		}
	);

	player.getShots().forEach(
		function(sh){
			collideableGO.push(sh);
		}
	);

  collisionManager.update(collideableGO);

  player.update();

	for(var en in enemies){
		if(enemies[en].getPos()[0] < -60){
			enemies.splice(en, 1);
		}
		else{
			enemies[en].update();
		}
	}

	for(var sh in player.getShots()){
		if(player.getShots()[sh].getPos()[0] > 800){
			player.getShots().splice(sh, 1);
		}
		else{
			player.getShots()[sh].update();
		}
	}

	for(var ba in barrels){
		if(barrels[ba].getPos()[0] < -60){
			barrels.splice(ba, 1);
		}
		else{
			barrels[ba].update();
		}
	}
}

function wasteFuel(){
	player.wasteFuel();
}

function draw(){
	renderer.Clear();
    renderer.Draw(player);

	player.getShots().forEach(
		function(sh){
			renderer.Draw(sh);
		}
	);

	enemies.forEach(
		function(en){
			renderer.Draw(en);
		}
	);

	barrels.forEach(
		function(ba){
			renderer.Draw(ba);
		}
	);

	ui.update();
}
