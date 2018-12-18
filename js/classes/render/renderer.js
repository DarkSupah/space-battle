class Renderer{
	constructor(canvas){
		var _canvas = canvas;
		var ctx = canvas.getContext("2d");
        
        _canvas.width = 800;
        _canvas.height = 600;
        
		ctx.imageSmoothingEnabled = true;	//Отключаем Anti-Aliasing
		
		this.GetCanvas = function(){
			return _canvas;
		}
		
		this.GetCtx = function(){
			return ctx;
		}
		
		this.Clear = function(){
			ctx.clearRect(0,0,_canvas.width, _canvas.height);
		}
		
		this.Draw = function(element){
			
			var posX = element.getPos()[0];
			var posY = element.getPos()[1];
			
			var sizeX = element.getSize()[0];		
			var sizeY = element.getSize()[1];
			
			ctx.drawImage(element.getImg(), posX, posY, sizeX, sizeY);
		}
	}	
}