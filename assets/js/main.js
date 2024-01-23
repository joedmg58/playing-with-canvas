let CANVAS_WIDTH;
let CANVAS_HEIGHT;

let mouse = {
    x: null,
    y: null,
    radius: null
}

let x = document.getElementsByClassName('x');
let y = document.getElementsByClassName('y');

const myCanvas = document.getElementById('my-canvas');
const ctx = myCanvas.getContext('2d');
setCanvasSize();

function setCanvasSize() {
    CANVAS_WIDTH = myCanvas.width = window.innerWidth * 0.75;
    CANVAS_HEIGHT = myCanvas.height = window.innerHeight * 0.75;
    mouse.radius = CANVAS_HEIGHT/80 * CANVAS_WIDTH/80;
}


window.onresize = function() {
    setCanvasSize();
}   

window.onmousemove = function(e) {
    mouse.x = e.x - (window.innerWidth - CANVAS_WIDTH)/2; 
    mouse.y = e.y - (window.innerHeight - CANVAS_HEIGHT)/2;
    
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(mouse.x, mouse.y, 3, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(100, 100, 100, 0.18)';
    ctx.arc(mouse.x, mouse.y, mouse.radius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.stroke();
}

const color = new randomColor();
const position = new randomPosition({min: 0, max: CANVAS_WIDTH}, {min: 0, max: CANVAS_HEIGHT})
const shapeTypes = ['circle', 'rectangle', 'triangle', 'star', 'penthagon', 'hexagon', 'octagon', '10'];
const shapesCount = 500;

let shapes = [];

for (let i = 0; i < shapesCount; i++) {
    let shapeOption = randomPickFromArray(shapeTypes); 
    switch (shapeOption) {
        case 'circle': shapes.push(new Circle(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 5), color.getColor(), randomFromRange(3, 25)));
                       break;
        case 'rectangle': let a = randomFromRange(3,25);
                          shapes.push(new Rectangle(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 5), color.getColor(), a, a));
                          break;  
        case 'triangle': shapes.push(new Triangle(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 5), color.getColor(), randomFromRange(3, 25)));   
                         break;
        case 'star':  shapes.push(new Star(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 5), color.getColor(), randomFromRange(3, 25)));   
                      break;   
        case 'penthagon': shapes.push(new Polygon(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 5), color.getColor(), randomFromRange(3, 25), 5));
                          break;
        case 'hexagon': shapes.push(new Polygon(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 5), color.getColor(), randomFromRange(3, 25), 6));
                          break;                  
        case 'octagon': shapes.push(new Polygon(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 5), color.getColor(), randomFromRange(3, 25), 8));
                          break;   
        case '10': shapes.push(new Polygon(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 5), color.getColor(), randomFromRange(3, 25), 10));
                          break;                                         
    }
}

function drawShapes(ctx) {
    for (let i=0; i<shapes.length; i++) {
        shapes[i].draw(ctx);
    }
}

function updateShapes(ctx) {
    var speed = 0;
    for (let i=0; i<shapes.length; i++) {
        shapes[i].update(ctx);
        speed += shapes[i].speed;
    }
    if (speed === 0) {
        for (let i=0; i<shapes.length; i++) {
            shapes[i].speed = shapes[i].startSpeed;
        }
    }
}

function checkCollisions(boundX, boundY, mouse) {
    for (let i=0; i<shapes.length; i++) {
        shapes[i].checkCollision(boundX, boundY, mouse);
    }
}

var fps = 30;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

function animate() {

    requestAnimationFrame(animate);

    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        drawShapes(ctx);
        updateShapes();
        checkCollisions({min: 0, max: CANVAS_WIDTH}, {min: 0, max:CANVAS_HEIGHT}, mouse);
    }

}

animate();







