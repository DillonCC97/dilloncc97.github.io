function Particle(x,y,r) {
    var options = {
        restitution: 1
    }
    this.body = Bodies.circle(x,y,r,options);
    this.r = r;
    //this.x = x;
    //this.y = y;
    World.add(world, this.body);
}

Particle.prototype.show = function() {
    fill(255);
    stroke(255);
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0,0, this.r *2);
    pop();
}

Particle.prototype.offScreen = function() {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return (x < -50 || x > width + 50 || (y > height - 15 && this.body.speed < 0.3 && this.body.angularVelocity < (1 * (10^90)))) // || y > height - 20)
}
