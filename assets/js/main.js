let CANVAS_WIDTH;
let CANVAS_HEIGHT;

let mouse = {
    x: null,
    y: null,
    radius: null
}

// let x = document.getElementsByClassName('x');
// let y = document.getElementsByClassName('y');

const canvas1 = document.getElementById('canvas1');
const ctx = canvas1.getContext('2d');

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

setCanvasSize();

function setCanvasSize() {
    CANVAS_WIDTH = canvas2.width = canvas1.width = window.innerWidth * 0.45;
    CANVAS_HEIGHT = canvas2.height = canvas1.height = window.innerHeight * 0.75;
    mouse.radius = CANVAS_HEIGHT/80 * CANVAS_WIDTH/80;
}


window.onresize = function() {
    setCanvasSize();
}   

// window.onmousemove = function(e) {
//     const canvas1Rect = canvas1.getBoundingClientRect(); console.log(canvas1Rect);

//     mouse.x = e.x - (window.innerWidth - CANVAS_WIDTH)/2; 
//     mouse.y = e.y - (window.innerHeight - CANVAS_HEIGHT)/2;
    
//     ctx.beginPath();
//     ctx.fillStyle = 'red';
//     ctx.arc(mouse.x, mouse.y, 3, 0, 2*Math.PI);
//     ctx.closePath();
//     ctx.fill();

//     ctx.beginPath();
//     ctx.strokeStyle = 'rgba(100, 100, 100, 0.18)';
//     ctx.arc(mouse.x, mouse.y, mouse.radius, 0, 2*Math.PI);
//     ctx.closePath();
//     ctx.stroke();
// }

const color = new randomColor();
const position = new randomPosition({min: 0, max: CANVAS_WIDTH}, {min: 0, max: CANVAS_HEIGHT})
const shapeTypes = ['circle'];//, 'rectangle', 'triangle', 'star', 'penthagon', 'hexagon', 'octagon', '10'];
const shapesCount = CANVAS_HEIGHT * CANVAS_WIDTH / 9000;

let shapes = [];

for (let i = 0; i < shapesCount; i++) {
    let shapeOption = randomPickFromArray(shapeTypes); 
    switch (shapeOption) {
        case 'circle': shapes.push(new Circle(position.getPosition(), randomFromRange(0, 2*Math.PI), randomFromRange(2, 5), color.getColor(), randomFromRange(5, 10)));
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
    connect();
    
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

function connect() {
    let opacity = 1;
    for (let i=0; i<shapes.length; i++) {
        for (j=i; j<shapes.length; j++) {
            let distance = (shapes[i].position.x - shapes[j].position.x)*(shapes[i].position.x - shapes[j].position.x) + (shapes[i].position.y - shapes[j].position.y)*(shapes[i].position.y - shapes[j].position.y);
            if (distance < (CANVAS_WIDTH/7)*(CANVAS_HEIGHT/7)) {
                opacity = 1 - (distance/20000);
                ctx.strokeStyle = `rgba(208,230,19,${opacity})`; //`rgba(140,85,31,${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(shapes[i].position.x, shapes[i].position.y);
                ctx.lineTo(shapes[j].position.x, shapes[j].position.y);
                ctx.stroke();
            }
        }
    }
}

const effect = new Effect(canvas2.width, canvas2.height);


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


        ctx2.fillStyle = `rgba(0, 0, 0, 0.05)`;
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
        ctx2.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx2));
    }

}

animate();







