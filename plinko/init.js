var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var buckets = [];
var cols = 10;
var rows = 7;
var score = 0;

function setup() {
    createCanvas(600,650);
    engine = Engine.create();
    world = engine.world;
    var spacing = width / cols;
    for (var j = 0; j < rows; j++){
        for (var i = 0; i < cols; i++){
            var x = i * spacing;
            if (j % 2 == 0) {
                x += spacing/2;
            }
            var y = spacing + j * spacing + 50;
            var p = new Plinko(x,y,7);
            plinkos.push(p);
        }
    }

    var b = new Boundary(width/2, height + 50, width, 100,0);
    bounds.push(b);
    b = new Boundary(0, height/2, 1, height,1);
    bounds.push(b);
    b = new Boundary(width, height/2, 1, height,1);
    bounds.push(b);

    for (var i = 0; i < 11 + 1; i++) {
        var x = (width / 11) * i;
        var h =  50;
        var w = 8;
        var y = height - h / 2;
        var bucket = new Boundary(x, y, w, h);
        buckets.push(bucket);
    }
}

function newParticle() {
    var p = new Particle(mouseX, 50, 10);
    particles.push(p);
}

function draw() {
    background(51);
    Engine.update(engine);
    fill(0,0,255);
    stroke(0,0,255);
    ellipse(mouseX, 50, 20);
    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
        if (particles[i].offScreen()) {
            if (particles[i].body.position.x > 0 && particles[i].body.position.x < 600){
                score += 1000 - (Math.abs(ceil(particles[i].body.position.x / width * 11) - 6) * 150);
            }
            World.remove(world, particles[i].body);
            particles.splice(i,1);
            i--;
        }
    }
    for (var i = 0; i < plinkos.length; i++) {
        plinkos[i].show();
    }
    for (var i = 0; i < buckets.length; i++) {
        buckets[i].show();
    }
    textSize(20);
    text("Score: " + score, 20,20);
}

function mousePressed() {
    newParticle();
}
