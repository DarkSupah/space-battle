class Renderer{
	constructor(canvas){
		var ctx = canvas.getContext("2d");
        
        canvas.width = 800;
        canvas.height = 600;
        
		ctx.imageSmoothingEnabled = true;
		
		this.GetCanvas = function(){
			return canvas;
		}
		
		this.GetCtx = function(){
			return ctx;
		}
		
		this.getWidth = function(){
			return canvas.width;
		}
		
		this.getHeight = function(){
			return canvas.height;
		}
		
		this.Clear = function(){
			ctx.clearRect(0,0,canvas.width, canvas.height);
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