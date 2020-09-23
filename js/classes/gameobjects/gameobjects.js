class Enemy extends Drawable{
	constructor(pos){
		const speed = 6;	//Enemy movement speed
		////Render stuff/////////////////////////////
		var img = new Image();
		img.src = "img/enemy.png";

		var size = new Array();
		size[0] = 60;
		size[1] = 60;

		super(img, pos, size);
		/////////////////////////////////////////////

		////Game logic stuff/////////////////////
		var tag = "enemy";
		var collider = new Array();

		this.getTag = function(){
			return tag;
		}
		this.getCollider = function(){
			return collider;
		}
		/////////////////////////////////////////////

		////Gameplay stuff///////////////////////////
		this.destroy = function(){
			pos[0] = -10000;
		}

		this.update =  function(){
			collider[0] = pos[0] + size[0];
			collider[1] = pos[1] + size[1];

			move(speed);
		}

		function move(speed){
			pos[0] -= speed;
		}

		this.getPos = function(){
			return pos;
		}
		/////////////////////////////////////////////
	}
}

class Meteorite extends Drawable{
  constructor(pos, size){
    const speed = 6000 / (size[0] * size[1]);

    var img = new Image();
    img.src = "img/meteorite.png";

    super(img, pos, size);

    var tag = "meteorite";
    var collider = new Array();

    var hp = 2;

    this.takeDamage = function(){
			hp--;
		}

		this.getHP = function(){
			return hp;
		}

    this.getTag = function(){
      return tag;
    }

    this.getCollider = function(){
      return collider;
    }

    this.destroy = function(){
      pos[0] = -10000;
    }

    this.update = function(){
      collider[0] = pos[0] + size[0];
      collider[1] = pos[1] + size[1];

      move(speed);
    }

    function move(speed){
      pos[0] -= speed;
    }

    this.getPos = function(){
      return pos;
    }
  }
}

class Player extends Drawable{
    constructor(input){
    const FUEL_WASTE = 1000;

    const speed = 7;    //Скорость передвижения игрока
    const maxFuel = 30; //Максимальный уровень топлива

	  ////Рендер////////////////////////////
      var img = new Image();
      img.src = "img/player.png";

	  var size = new Array();
      size[0] = 60;
      size[1] = 60;

	  var pos = new Array();
      pos[0] = 0;
      pos[1] = 0;

	  super(img, pos, size); //Конструктор базового класса
	  /////////////////////////////////////////////

	  ////Игровая логика/////////////////////////
    var shots = new Array();

    var canFire = true;
	  var tag = "player";

	  this.getTag = function(){
		  return tag;
	  }
	  /////////////////////////////////////////////

	  ////Геймплей///////////////////////////
	  var fuel = 15;	//Уровень топлива

	  var alive = true;	//Жив ли игрок?

	  var collider = new Array();

    this.removeFuel = function(amt){
      if(fuel > (maxFuel - amt)){
        fuel -= amt;
      }
      else{
        this.destroy();
        alive = false;
      }
    }

    function wasteFuel(){
      if(fuel > 0){
        fuel--;
      }
      else{
        this.destroy();
        alive = false;
      }
    }

	  this.getCollider = function(){
		  return collider;
    }

	  this.getLifestate = function(){
		  return alive;
	  }

	  this.getFuel = function(){
		  return fuel;
	  }

    this.getMaxFuel = function(){
      return maxFuel;
    }

	  this.addFuel = function(amt){
      if(fuel + amt <= maxFuel){
        fuel += amt;
      }
      else {
        fuel = maxFuel
      }
	  }

	  /////////////////////////////////////////////

	  ////Основные методы/////////////////////////////
      this.update = function(){
        if(!alive)
          return;

        addY(input.getMV() * speed);

        if(input.getFire()){
          if(canFire){
            shoot();
            canFire = false;
          }
          else{
            return;
          }
        }
        else{
          canFire = true;
        }
      }

	  /////////////////////////////////////////////

    function addY(amt){
      collider[0] = pos[0] + size[0];
      collider[1] = pos[1] + size[1];

      if(pos[1] < 0){          //Чтобы не вылезать за верхний предел окна
        pos[1] = 0;
      }
      else
      if(pos[1] > 600 - size[1]){    //Чтобы не вылезать за нижний предел окна
        pos[1] = 600 - size[1];
      }

      pos[1] += amt;
    }

    function setX(amt){
		pos[0] = amt;
    }

    this.destroy = function(){
      setX(-1000);
      clearInterval(waste_timer);
      alive = false;
    }

	this.getPos = function(){
		return pos;
	}

    this.getSize = function(){
      return size;
    }

		this.getShots = function(){
			return shots;
		}

		function shoot(){
			var shootOrigin = new Array();

			shootOrigin[0] = collider[0];
			shootOrigin[1] = collider[1] - size[1] / 2;

			var shot = new Laser(shootOrigin, "player");

			shots.push(shot);
		}

    var waste_timer = setInterval(wasteFuel, FUEL_WASTE);
  }
}

class Laser extends Drawable{
    constructor(pos, owner){
		const speed = 10;

		var img = new Image();
		img.src = "img/laser.png";

		var tag = "laser";

		var size = new Array();
		size[0] = 10;
		size[1] = 3;

		super(img, pos, size);

		var collider = new Array();

		this.getTag = function(){
			return tag;
		}

		this.getOwner = function(){
			return owner;
		}

		this.update = function(){
		  collider[0] = 5 + pos[0] + size[0];
				collider[1] = pos[1] + size[1];

		  move(speed);
		}

		this.destroy = function(){
		  pos[0] = 10000;
		}

		this.getCollider = function(){
				return collider;
		}

		function move(amt){
		  pos[0] += amt;
		}

		this.getPos = function(){
		  return pos;
		}
	}
}

class Fuel extends Drawable{
	constructor(pos){
		const speed = 5;	//Скорость движения бочки

		////Render stuff/////////////////////////////
		var img = new Image();
		img.src = "img/fuel.png";

		var size = new Array();
		size[0] = 30;
		size[1] = 30;

		super(img, pos, size);
		/////////////////////////////////////////////

		////Game logic stuff/////////////////////
		var tag = "fuel";
		var collider = new Array();

		this.getTag = function(){
			return tag;
		}

		this.getCollider = function(){
			return collider;
		}
		/////////////////////////////////////////////

		////Gameplay stuff///////////////////////////
		function move(amt){
			pos[0] -= speed;
		}

		this.getPos = function(){
			return pos;
		}
		/////////////////////////////////////////////

		////Main methods/////////////////////////////
		this.update = function(){
			collider[0] = pos[0] + size[0];
			collider[1] = pos[1] + size[1];

			move(speed);
		}

		this.destroy = function(){
			pos[0] = -1000;
		}
		/////////////////////////////////////////////
	}
}
