function Boundary(x,y,w,h,rest) {
    var options = {
        isStatic: true,
        restitution: rest,
        friction: 0
    }
    this.body = Bodies.rectangle(x,y,w,h,options);
    this.w = w;
    this.h = h;
    //this.x = x;
    //this.y = y;
    World.add(world, this.body);
}

Boundary.prototype.show = function() {
    fill(255, 192, 203);
    stroke(255, 192, 203);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect(0,0, this.w, this.h);
    pop();
}
