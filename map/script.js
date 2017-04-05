var x = document.getElementById("demo");
var lat;
var long;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    x.innerHTML = "Geolocation is not supported by this browser.";
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    lat = position.coords.latitude;
    long = position.coords.longitude;
}

var bg;
var y = 0;

function setup() {
    // The background image must be the same size as the parameters
    // into the createCanvas() method. In this program, the size of
    // the image is 720x400 pixels.
    bg = loadImage("map.png");
    createCanvas(1366, 768);
}

function draw() {
    background(bg);
    var c = color(255, 0, 0); // Define color 'c'
    fill(c); // Use color variable 'c' as fill color
    noStroke(); // Don't draw a stroke around shapes
    var coordX = ((long - (-82.470921)) / 0.232796) * 1366;
    var coordY = 768 - (((lat - 29.599735) / 0.114327) * 768);
    console.log(coordY);
    ellipse(coordX, coordY, 10, 10); // (x, y, size)
}
