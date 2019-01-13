class Planet extends Drawable{
  constructor(pos, size, img, speed){
    super(img, pos, size);

    this.update = function(){
      move();
    }

    this.getPos = function(){
      return pos;
    }

    this.getSize = function(){
      return size;
    }

    this.destroy = function(){
      pos[0] = -1000;
    }

    function move(){
      pos[0] -= speed;
    }
  }
}

class Barren extends Planet{
  constructor(){

    var img = new Image();
    img.src = "img/planets/barren.png";

    var scaleFactor = Math.random();

    var size = Array(120 + 60 * scaleFactor, 120 + 60 * scaleFactor);

    const speed =  (size[0] * 2) / 100;

    var vertFactor = Math.random();

    var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);

    super(pos, size, img, speed);
  }
}

class Earth extends Planet{
  constructor(){

    var img = new Image();
    img.src = "img/planets/earth.png";

    var scaleFactor = Math.random();

    var size = Array(170 + 30 * scaleFactor, 170 + 30 * scaleFactor);

    const speed = (size[0] * 2) / 100;

    var vertFactor = Math.random();

    var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);

    super(pos, size, img, speed);
  }
}

class Lava extends Planet{
  constructor(){

    var img = new Image();
    img.src = "img/planets/lava.png";

    var scaleFactor = Math.random();

    var size = Array(130 + 20 * scaleFactor, 130 + 20 * scaleFactor);

    const speed = (size[0] * 2) / 100;

    var vertFactor = Math.random();

    var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);

    super(pos, size, img, speed);
  }
}

class Orange extends Planet{
  constructor(){

    var img = new Image();
    img.src = "img/planets/orange.png";

    var scaleFactor = Math.random();

    var size = Array(220 + 50 * scaleFactor, 220 + 50 * scaleFactor);

    const speed = (size[0] * 2) / 100;

    var vertFactor = Math.random();

    var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);

    super(pos, size, img, speed);
  }
}

class Red extends Planet{
  constructor(){

    var img = new Image();
    img.src = "img/planets/red.png";

    var scaleFactor = Math.random();

    var size = Array(280 + 60 * scaleFactor, 280 + 60 * scaleFactor);

    const speed = (size[0] * 2) / 100;

    var vertFactor = Math.random();

    var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);

    super(pos, size, img, speed);
  }
}

class Rock extends Planet{
  constructor(){

    var img = new Image();
    img.src = "img/planets/rock.png";

    var scaleFactor = Math.random();

    var size = Array(180 + 30 * scaleFactor, 180 + 30 * scaleFactor);

    const speed = (size[0] * 2) / 100;

    var vertFactor = Math.random();

    var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);

    super(pos, size, img, speed);
  }
}
