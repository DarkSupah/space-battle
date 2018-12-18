class Input{
    constructor(){
        const KEY_UP = 38;      //Стрелка вверх, движение вверх
        const KEY_DOWN = 40;    //Стрелка вниз, движение вниз
        const KEY_SHOOT = 32;       //Space, стрельба
        
        var mv = 0;
        var fire = false;
		var canShoot = true;
        
        this.checkKeys = function(e){
			
			//console.log(e.type);
			
			switch(e.type){
				case "keydown":
					switch(e.keyCode){
						case KEY_UP:
							mv = -1;
						break;
						
						case KEY_DOWN:
							mv = 1;
						break;
						
						case KEY_SHOOT:
							if(canShoot){
								fire = true;
								canShoot = false;
							}
							else
								fire = false;
						break;
					}
					
					console.log("fire: " + fire);
				break;
				
				case "keypress":
					switch(e.keyCode){
						case KEY_SHOOT:

						break;
					}
				break;
				
				case "keyup":
					switch(e.keyCode){
						case KEY_SHOOT:
							fire = false;
							canShoot = true;
						break;
						
						default:
							mv = 0
						break;
					}
				break;
			}
        }
		
		this.getFire = function(){
			return fire;
		}
        
        this.getMV = function(){
            return mv;
        }
    }
}