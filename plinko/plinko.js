function Plinko(x, y, r) {
    var options = {
        isStatic: true
        , restitution: 1
        , friction: 0
    }
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);
    this.body.label = "peg";
}
Plinko.prototype.show = function () {
    fill(0, 255, 0);
    stroke(0, 255, 0);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
}
