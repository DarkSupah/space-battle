class Planet extends Drawable{
  constructor(img, size){
    var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * Math.random());

    var imgObj = new Image();
    imgObj.src = img;

    super(imgObj, pos, size);

    var speed = (size[0] * 2) / 100;

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

planetsObj = {
  barren: {
    img: "img/planets/barren.png",
    size: Array(120 + 60 * Math.random(), 120 + 60 * Math.random()),
  },
  earth: {
    img: "img/planets/earth.png",
    size: Array(170 + 30 * Math.random(), 170 + 30 * Math.random())
  },
  lava: {
    img: "img/planets/lava.png",
    size: Array(130 + 20 * Math.random(), 130 + 20 * Math.random())
  },
  orange: {
    img: "img/planets/orange.png",
    size: Array(220 + 50 * Math.random(), 220 + 50 * Math.random())
  },
  red: {
    img: "img/planets/red.png",
    size: Array(280 + 60 * Math.random(), 280 + 60 * Math.random())
  },
  rock: {
    img: "img/planets/rock.png",
    size: Array(180 + 30 * Math.random(), 180 + 30 * Math.random())
  }
}


// class Barren extends Planet{
//   constructor(){
//
//     var img = new Image();
//     img.src = "img/planets/barren.png";
//
//     var scaleFactor = Math.random();
//
//     var size = Array(120 + 60 * scaleFactor, 120 + 60 * scaleFactor);
//
//     const speed =  (size[0] * 2) / 100;
//
//     var vertFactor = Math.random();
//
//     var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);
//
//     super(pos, size, img, speed);
//   }
// }
//
// class Earth extends Planet{
//   constructor(){
//
//     var img = new Image();
//     img.src = "img/planets/earth.png";
//
//     var scaleFactor = Math.random();
//
//     var size = Array(170 + 30 * scaleFactor, 170 + 30 * scaleFactor);
//
//     const speed = (size[0] * 2) / 100;
//
//     var vertFactor = Math.random();
//
//     var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);
//
//     super(pos, size, img, speed);
//   }
// }
//
// class Lava extends Planet{
//   constructor(){
//
//     var img = new Image();
//     img.src = "img/planets/lava.png";
//
//     var scaleFactor = Math.random();
//
//     var size = Array(130 + 20 * scaleFactor, 130 + 20 * scaleFactor);
//
//     const speed = (size[0] * 2) / 100;
//
//     var vertFactor = Math.random();
//
//     var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);
//
//     super(pos, size, img, speed);
//   }
// }
//
// class Orange extends Planet{
//   constructor(){
//
//     var img = new Image();
//     img.src = "img/planets/orange.png";
//
//     var scaleFactor = Math.random();
//
//     var size = Array(220 + 50 * scaleFactor, 220 + 50 * scaleFactor);
//
//     const speed = (size[0] * 2) / 100;
//
//     var vertFactor = Math.random();
//
//     var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);
//
//     super(pos, size, img, speed);
//   }
// }
//
// class Red extends Planet{
//   constructor(){
//
//     var img = new Image();
//     img.src = "img/planets/red.png";
//
//     var scaleFactor = Math.random();
//
//     var size = Array(280 + 60 * scaleFactor, 280 + 60 * scaleFactor);
//
//     const speed = (size[0] * 2) / 100;
//
//     var vertFactor = Math.random();
//
//     var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);
//
//     super(pos, size, img, speed);
//   }
// }
//
// class Rock extends Planet{
//   constructor(){
//
//     var img = new Image();
//     img.src = "img/planets/rock.png";
//
//     var scaleFactor = Math.random();
//
//     var size = Array(180 + 30 * scaleFactor, 180 + 30 * scaleFactor);
//
//     const speed = (size[0] * 2) / 100;
//
//     var vertFactor = Math.random();
//
//     var pos = Array(800 + size[0], size[1] + (600 - size[1] * 2) * vertFactor);
//
//     super(pos, size, img, speed);
//   }
// }
