class Fuel extends Drawable{
	constructor(pos){
		const speed = 2;	//Скорость движения бочки

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
