class Player extends Drawable{
    constructor(_name, _input){

    const speed = 5;    //Скорость передвижения игрока
    const maxFuel = 15; //Максимальный уровень топлива

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
    var input = _input;
    var shots = new Array();

    var canFire = true;
	  var tag = "player";

	  this.getTag = function(){
		  return tag;
	  }
	  /////////////////////////////////////////////

	  ////Геймплей///////////////////////////
    var name = _name;   //Присвоить игроку имя
    var score = 0;     //Делаем количество очков нулевым
	  var fuel = 15;	//Уровень топлива

	  var alive = true;	//Жив ли игрок?

	  var collider = new Array();

    this.wasteFuel = function(){
      if(fuel > 0){
        fuel--;
      }
      else{
        this.destroy();
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

    this.getScore = function(){
      return score;
    }

    this.getMaxFuel = function(){
      return maxFuel;
    }

	  this.addFuel = function(){
      if(fuel < maxFuel)
		    fuel++;
	  }

    this.addScore = function(){
      score++;
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

    this.getPlayerName = function(){    //Получить имя игрока
		    return name;
    }

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

			var shot = new Laser(shootOrigin, "player", function(){
        player.addScore();
      });

			shots.push(shot);
		}
  }
}

class Laser extends Drawable{
    constructor(pos, owner, scoreInc){
		const speed = 10;

    console.log("Laser owner: "+ owner);

		var img = new Image();
		img.src = "img/laser.png";

		var tag = "laser";

		var size = new Array();
		size[0] = 20;
		size[1] = 5;

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

    this.addScore = function(player){
      scoreInc();
    }

		function move(amt){
		  pos[0] += amt;
		}

		this.getPos = function(){
		  return pos;
		}
	}
}
