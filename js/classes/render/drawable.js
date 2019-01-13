class Drawable{
    constructor(img, pos, size){

		this.move = function(newPos){
			pos = newPos;
		}

		this.getImg = function(){
			return img;
		}

		this.getPos = function(){
			return pos;
		}

		this.getSize = function(){
			return size;
		}
    }
}
