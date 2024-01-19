let CANVAS_WIDTH;
let CANVAS_HEIGHT;

const myCanvas = document.getElementById('my-canvas');
const ctx = myCanvas.getContext('2d');
setCanvasSize();

function setCanvasSize() {
    CANVAS_WIDTH = myCanvas.width = window.innerWidth * 0.75;
    CANVAS_HEIGHT = myCanvas.height = window.innerHeight * 0.75;
}


window.onresize = function() {
    setCanvasSize();
}   

const color = new randomColor();
const position = new randomPosition({min: 0, max: CANVAS_WIDTH}, {min: 0, max: CANVAS_HEIGHT})
const shapeTypes = ['circle', 'rectangle', 'triangle'];
const shapesCount = 200;

let shapes = [];

for (let i = 0; i < shapesCount; i++) {
    let shapeOption = randomPickFromArray(shapeTypes); 
    switch (shapeOption) {
        case 'circle': shapes.push(new Circle(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 10), color.getColor(), randomFromRange(3, 25)));
                       break;
        case 'rectangle': let a = randomFromRange(3,25);
                          shapes.push(new Rectangle(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 10), color.getColor(), a, a));
                          break;  
        case 'triangle': shapes.push(new Triangle(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 10), color.getColor(), randomFromRange(3, 25)));                  
    }
}

function drawShapes(ctx) {
    for (let i=0; i<shapes.length; i++) {
        shapes[i].draw(ctx);
    }
}

function updateShapes(ctx) {
    for (let i=0; i<shapes.length; i++) {
        shapes[i].update(ctx);
    }
}

function checkCollisions(boundX, boundY) {
    for (let i=0; i<shapes.length; i++) {
        shapes[i].checkCollision(boundX, boundY);
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
        checkCollisions({min: 0, max: CANVAS_WIDTH}, {min: 0, max:CANVAS_HEIGHT});
    }

}

animate();







