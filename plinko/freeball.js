function FreeBall(x, y, w, h) {
    var options = {
        restitution: 1
        , isStatic: false
        , density: 0
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    this.body.velocity.x = 10;
    World.add(world, this.body);
}
FreeBall.prototype.show = function () {
    fill(255);
    stroke(255);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
}
