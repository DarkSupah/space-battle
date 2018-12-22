class Enemy extends Drawable{
	constructor(pos){
		var img = new Image();
		img.src = "img/enemy.png";

		var size = new Array();
		size[0] = 60;
		size[1] = 60;

		var collider = new Array();

		super(img, pos, size);

		this.update =  function(){
			collider[0] = pos[0] + size[0];
			collider[1] = pos[1] + size[1];

			move(3);
		}

		this.getCollider = function(){
			return collider;
		}

		this.destroy = function(){
			pos[0] = -10000;
		}

		function move(speed){
			pos[0] -= speed;
		}

		this.getPos = function(){
			return pos;
		}
	}
}
