class Player extends Drawable{
    constructor(name, _input){
      const speed = 5;

      var img = new Image();
      img.src = "img/player.png";

      var input = _input;
      var shots = new Array();

      var canFire = true;

      var pos = new Array();
      pos[0] = 0;
      pos[1] = 0;

      var size = new Array();
      size[0] = 60;
      size[1] = 60;

      var collider = new Array();
      super(img, pos, size); //Конструктор базового класса

      var _name = name;   //Присвоить игроку имя
      var score = 0;     //Делаем количество очков нулевым

      this.update = function(){
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

      this.getPlayerName = function(){    //Получить имя игрока
        return _name;
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
    }

		this.getPos = function(){
			return pos;
		}

    this.getSize = function(){
      return size;
    }

    this.getCollider = function(){
      return collider;
    }

		this.getShots = function(){
			return shots;
		}

		function shoot(){

			var shootOrigin = new Array();

			shootOrigin[0] = collider[0];
			shootOrigin[1] = collider[1] - size[1] / 2;

			var shot = new Laser(shootOrigin);

			shots.push(shot);
		}
  }
}

class Laser extends Drawable{
    constructor(pos){
    const speed = 10;

		var img = new Image();
		img.src = "img/laser.png";

		var size = new Array();
		size[0] = 20;
		size[1] = 5;

    super(img, pos, size);

    var collider = new Array();

    this.update = function(){
      collider[0] = pos[0] + size[0];
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
