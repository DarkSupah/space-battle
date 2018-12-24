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
