class Meteorite extends Drawable{
  constructor(pos, size){
    const speed = 6000 / (size[0] * size[1]);

    var img = new Image();
    img.src = "img/meteorite.png";

    super(img, pos, size);

    var tag = "meteorite";
    var collider = new Array();

    this.getTag = function(){
      return tag;
    }

    this.getCollider = function(){
      return collider;
    }

    this.destroy = function(){
      pos[0] = -10000;
    }

    this.update = function(){
      collider[0] = pos[0] + size[0];
      collider[1] = pos[1] + size[1];

      move(speed);
    }

    function move(speed){
      pos[0] -= speed;
    }

    this.getPos = function(){
      return pos;
    }
  }
}
