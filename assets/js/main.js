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

const circle = new Circle(position.getPosition(), color.getColor(), randomFromRange(10, 150));
const triangle = new Triangle(position.getPosition(), color.getColor(), randomFromRange(10, 150));

function animate() {
    circle.draw(ctx);
    triangle.draw(ctx);
    

    requestAnimationFrame(animate);
}

animate();







