class Enemy extends Drawable{
	constructor(pos){
		var img = new Image();
		img.src = "img/enemy.png";
		
		var size = new Array();
		
		size[0] = 60;
		size[1] = 60;
		
		super(img, pos, size);
		
		this.move = function(speed){
			pos[0] -= speed;
		}
		
		this.getPos = function(){
			return pos;
		}
	}
}