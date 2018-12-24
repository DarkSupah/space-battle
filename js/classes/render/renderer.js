class Renderer{
	constructor(canvas){
		const font = "18px Century Gothic";

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

		this.DrawText = function(text, pos, color){
			ctx.font = font;
			ctx.fillStyle = color;

			ctx.fillText(text, pos[0], pos[1]);
		}

		this.DrawRect = function(pos, size, color){
			ctx.fillStyle = color;

			ctx.fillRect(pos[0], pos[1], size[0], size[1]);
		}

		this.DrawTextShadow = function(text, pos, color){
			ctx.font = font;

			ctx.fillStyle = "#555";
			ctx.fillText(text, pos[0], pos[1]);

			ctx.fillStyle = color;
			ctx.fillText(text, pos[0] + 1, pos[1] + 1);
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
