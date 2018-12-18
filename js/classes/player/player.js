class Player extends Drawable{
    constructor(name){
        var img = new Image();
        img.src = "img/player.png";
		
		var shots = new Array();

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
		
        this.getPlayerName = function(){    //Получить имя игрока
            return _name;
        }
		
		this.addY = function(amt){
			
			collider[0] = pos[0] + size[0];
			collider[1] = pos[1] + size[1];
            
            if(pos[1] <= 0){          //Чтобы не вылезать за верхний предел окна
                pos[1] = 0;
            }
            else
            if(pos[1] >= 600 - size[1]){    //Чтобы не вылезать за нижний предел окна
                pos[1] = 600 - size[1];
            }
            
            pos[1] += amt;
        }
        
		this.getPos = function(){
			return pos;
		}
		
		this.getShots = function(){
			return shots;
		}
		
		this.shoot = function(){
			
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
		console.log("laser created");
		
		var img = new Image();
		img.src = "img/laser.png";
		
		var size = new Array();
		
		size[0] = 20;
		size[1] = 5;
		
		super(img, pos, size);
		
        this.move = function(amt){
			pos[0] += amt;
		}
    }
}