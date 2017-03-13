// TODO: add free ball bucket
var Engine = Matter.Engine
    , World = Matter.World
    , Bodies = Matter.Bodies
    , Events = Matter.Events;
var engine;
var world;
var particles = [];
var plinkos = [];
var bounds = [];
var buckets = [];
var freeArr = [];
var cols = 10;
var rows = 7;
var score = 0;
var balls = 20;
var ballsThrown = 0;
var freePos = 0;
var leaderboard = JSON.parse("[{\"score\":21000,\"balls\":35,\"ratio\":600},{\"score\":12000,\"balls\":20,\"ratio\":600},{\"score\":9000,\"balls\":15,\"ratio\":600},{\"score\":6000,\"balls\":10,\"ratio\":600},{\"score\":3000,\"balls\":5,\"ratio\":600}]");

//TODO Play ding.mp3 when free ball collision happens
//var ding;
//function preload() {
//}

function leaderObj(score_arg, balls_arg) {
    this.score = score_arg;
    this.balls = balls_arg;
    this.ratio = this.score / this.balls;
}

for (var i = 0; i < 5; i++){
    var p = new leaderObj(0,0);
    leaderboard.push(p);
}

function collision(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
        var labelA = pairs[i].bodyA.label;
        var labelB = pairs[i].bodyB.label;
        if ((labelA == 'ball' && labelB == 'free') || (labelB == 'ball' && labelA == 'free')) {
            balls+=1;
//            ding.play();
        }
    }
}

function setup() {
    dispLeader();
//    ding = loadSound('ding.mp3');
    var canvas = createCanvas(600, 650);
    engine = Engine.create();
    world = engine.world;
    canvas.parent('canvas-holder');
    var spacing = width / cols;
    for (var j = 0; j < rows; j++) {
        if (j % 2 == 0) {
            cols++;
        }
        for (var i = 0; i < cols; i++) {
            var x = i * spacing;
            if (j % 2 == 0) {
                x += spacing / 2;
            }
            var y = spacing + j * spacing + 50;
            var p = new Plinko(x, y, 7);
            plinkos.push(p);
        }
    }
        
    Events.on(engine, 'collisionStart', collision);
    
    var b = new Boundary(width / 2, height + 50, width, 100, 0);
    bounds.push(b);
    b = new Boundary(0, height / 2, 1, height, 1);
    bounds.push(b);
    b = new Boundary(width, height / 2, 1, height, 1);
    bounds.push(b);
    for (var i = 0; i < 11 + 1; i++) {
        var x = (width / 11) * i;
        var h = 50;
        var w = 8;
        var y = height - h / 2;
        var bucket = new Boundary(x, y, w, h);
        buckets.push(bucket);
    }
}

function newParticle() {
    var p = new Particle(mouseX, 50, 10); // mousey to 50
    particles.push(p);
}

//TODO Make platform faster in center and slower at edges
function newFree() {
    freePos = (Math.sin(frameCount/25) * 285) + 300 ;
    if (freeArr[0] != undefined){
        World.remove(world, freeArr[0].body);
        freeArr.splice(0, 1);
    }
    var f = new FreeBall(freePos, height - 110, 30, 4);
    freeArr.push(f);
}

function sortNumber(a,b) {
    return a.score - b.score;
}


function dispLeader() {
    for (var i = 0; i < 5; i++) {
            document.getElementById("lead-" + i).innerHTML = "Score: " + leaderboard[i].score + 
                " | Balls Dropped: " + leaderboard[i].balls + " | Score/Ball: " + round(leaderboard[i].score / leaderboard[i].balls);
        }
}

//TODO add scores to a hosted database
function keyPressed() {
    if (keyCode == 82) {
        for (var i = 0; i < particles.length; i++) {
            World.remove(world, particles[i].body);
        }
        var s = new leaderObj(score, ballsThrown);
        leaderboard.push(s);
        leaderboard.sort(sortNumber)
        leaderboard.reverse();
        leaderboard.splice(4,1);
        score = 0;
        particles = [];
        balls = 20;
        ballsThrown = 0;
        dispLeader();
    }
}

//TODO free ball cooldown?
//TODO ball disappears when getting free ball? Increase ball+=2
//TODO change shape of free ball platform, hole w/ no collision? Cup?
function draw() {
    background(51);
    Engine.update(engine);
    fill(0, 0, 255);
    stroke(0, 0, 255);
    ellipse(mouseX, 50, 20);
    for (var i = 0; i < particles.length; i++) {
        particles[i].show();
        if (particles[i].offScreen()) {
            if (particles[i].body.position.x > 0 && particles[i].body.position.x < 600) {
                score += 1000 - (Math.abs(ceil(particles[i].body.position.x / width * 11) - 6) * 150);
            }
            World.remove(world, particles[i].body);
            particles.splice(i, 1);
            i--;
        }
    }
        
    for (var i = 0; i < plinkos.length; i++) {
        plinkos[i].show();
    }
    for (var i = 0; i < buckets.length; i++) {
        buckets[i].show();
    }
    for (var i = 0; i < freeArr.length; i++) {
        freeArr[i].show();
    }
    
    newFree();
    
    textSize(15);
    text("Score: " + score, 20, 25);
    text("Balls: " + balls, 19, 50);
    text("Dropped: " + ballsThrown, 20, 75);
    textSize(12);
    text("Press 'r' to reset.", width - 110, 20);
    textSize(15);
    scores = ["250", "400", "550", "700", "850"]
    for (var i = 0; i < scores.length; i++) {
        text(scores[i], (i * 55) + 13, height - 5);
    }
    for (var i = 0; i < scores.length; i++) {
        text(scores[i], (width - 39) - (i * 55), height - 5);
    }
    text("1000", width / 2 - 19, height - 5);
}

function mousePressed() {
    if (balls > 0 && mouseX < 600 && mouseX > 0) {
        newParticle();
        balls--;
        ballsThrown++;
    }
}
