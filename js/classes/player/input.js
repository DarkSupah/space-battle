class Input{
    constructor(){
      const KEY_UP = 38;          //Стрелка вверх, движение вверх
      const KEY_DOWN = 40;        //Стрелка вниз, движение вниз
      const KEY_SHOOT = 32;       //Space, стрельба

      var mv = 0;
      var fire = false;
      var canShoot = true;

      this.checkKeys = function(e){

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
								fire = true;
						break;
					}
				break;

				case "keyup":
					switch(e.keyCode){
						case KEY_SHOOT:
							fire = false;
						break;

						case KEY_UP:
						if(mv == -1)
							mv = 0;
						break;

						case KEY_DOWN:
						if(mv == 1)
							mv = 0;
						break;

						default:
							mv = 0;
              fire = false;
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
