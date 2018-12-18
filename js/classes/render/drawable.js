class Drawable{
    constructor(img, pos, size){
        var _img = img;
        var _pos = pos;
		var _size = size;
		
		this.move = function(newPos){
			_pos = newPos;
		}
		
		this.getImg = function(){
			return _img;
		}
		
		this.getPos = function(){
			return _pos;
		}
		
		this.getSize = function(){
			return _size;
		}
    }
}