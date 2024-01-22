class Shape {
    constructor(position, direction, speed, color) {
        this.position = position;
        this.direction = direction;
        this.speed = speed;
        this.startSpeed = speed;
        this.color = color;
        this.friction = 0.003;
        //this.audio = document.createElement('audio');
        //this.audio.src = './assets/audio/mixkit-small-hit-in-a-game-2072.wav' 
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
    }

    update() {
        this.position.x = this.position.x + this.speed * Math.cos(this.direction);
        this.position.y = this.position.y + this.speed * Math.sin(this.direction);
        this.speed -= this.friction;
        if (this.speed < 0) {
            this.speed = 0;
            //setTimeout( this.#restartSpeed(), 10000);
        }    

    }

    checkCollision(boundX, boundY) {
        let collide = false;
        if (this.position.y >= boundY.max) {this.direction = 2*Math.PI - this.direction; collide = true}
        if (this.position.y <= boundY.min) {this.direction = 2*Math.PI - this.direction; collide = true}
        if (this.position.x <= boundX.min) {this.direction = Math.PI - this.direction; collide = true}
        if (this.position.x >= boundX.max) {this.direction = Math.PI - this.direction; collide = true}
        if (collide) {
            this.friction += 0.02;
            //const audio = document.createElement('audio');
            //audio.src = './assets/audio/mixkit-small-hit-in-a-game-2072.wav';
            //audio.play();
        }    
    }

    #restartSpeed() {
        console.log(this.startSpeed);
        this.speed = 10;
        console.log(`Speed restarted to ${this.speed}`);
    }
}

class Circle extends Shape {
    constructor(position, direction, speed, color, radius) {
        super(position, direction, speed, color);
        this.radius = radius;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        super.update();
    }

    checkCollision(boundX, boundY) {
        super.checkCollision(boundX, boundY);
    }
}

class Rectangle extends Shape {
    constructor(position, direction, speed, color, w, h) {
        super(position, direction, speed, color);
        this.w = w;
        this.h = h;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.fillRect(this.position.x - this.w/2, this.position.y - this.h/2, this.w, this.h);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        super.update();
    }

    checkCollision(boundX, boundY) {
        super.checkCollision(boundX, boundY);
    }
}

class Triangle extends Shape {
    constructor(position, direction, speed, color, side) {
        super(position, direction, speed, color);
        this.side = side;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.moveTo(this.position.x + this.side * Math.cos(30 * Math.PI/180), this.position.y + this.side * Math.sin(30 * Math.PI/180));
        ctx.lineTo(this.position.x + this.side * Math.cos(150 * Math.PI/180), this.position.y + this.side * Math.sin(150 * Math.PI/180));
        ctx.lineTo(this.position.x + this.side * Math.cos(270 * Math.PI/180), this.position.y + this.side * Math.sin(270 * Math.PI/180));
        ctx.lineTo(this.position.x + this.side * Math.cos(30 * Math.PI/180), this.position.y + this.side * Math.sin(30 * Math.PI/180));
        ctx.closePath();
        ctx.fill();
    }

    update() {
        super.update();
    }

    checkCollision(boundX, boundY) {
        super.checkCollision(boundX, boundY);
    }
}

class Star extends Shape {
    constructor(position, direction, speed, color, side) {
        super(position, direction, speed, color);
        this.side = side;
    }

    draw(ctx) {
        const angle = 2*Math.PI/10;
        super.draw(ctx);
        ctx.beginPath();
        ctx.moveTo(this.position.x + this.side * Math.cos(3 * Math.PI/2), this.position.y + this.side * Math.sin(3 * Math.PI/2));
        ctx.lineTo(this.position.x + this.side/2 * Math.cos(3 * Math.PI/2 + angle), this.position.y + this.side/2 * Math.sin(3 * Math.PI/2 + angle));
        ctx.lineTo(this.position.x + this.side * Math.cos(3 * Math.PI/2 + 2*angle), this.position.y + this.side * Math.sin(3 * Math.PI/2 + 2*angle));
        ctx.lineTo(this.position.x + this.side/2 * Math.cos(3 * Math.PI/2 + 3*angle), this.position.y + this.side/2 * Math.sin(3 * Math.PI/2 + 3*angle));
        ctx.lineTo(this.position.x + this.side * Math.cos(3 * Math.PI/2 + 4*angle), this.position.y + this.side * Math.sin(3 * Math.PI/2 + 4*angle));
        ctx.lineTo(this.position.x + this.side/2 * Math.cos(3 * Math.PI/2 + 5*angle), this.position.y + this.side/2 * Math.sin(3 * Math.PI/2 + 5*angle));
        ctx.lineTo(this.position.x + this.side * Math.cos(3 * Math.PI/2 + 6*angle), this.position.y + this.side * Math.sin(3 * Math.PI/2 + 6*angle));
        ctx.lineTo(this.position.x + this.side/2 * Math.cos(3 * Math.PI/2 + 7*angle), this.position.y + this.side/2 * Math.sin(3 * Math.PI/2 + 7*angle));
        ctx.lineTo(this.position.x + this.side * Math.cos(3 * Math.PI/2 + 8*angle), this.position.y + this.side * Math.sin(3 * Math.PI/2 + 8*angle));
        ctx.lineTo(this.position.x + this.side/2 * Math.cos(3 * Math.PI/2 + 9*angle), this.position.y + this.side/2 * Math.sin(3 * Math.PI/2 + 9*angle));
        ctx.lineTo(this.position.x + this.side * Math.cos(3 * Math.PI/2), this.position.y + this.side * Math.sin(3 * Math.PI/2));
        ctx.closePath();
        ctx.fill();
    }

    update() {
        super.update();
    }

    checkCollision(boundX, boundY) {
        super.checkCollision(boundX, boundY);
    }
}

class Polygon extends Shape {
    constructor(position, direction, speed, color, radius, sides) {
        super(position, direction, speed, color);
        this.radius = radius;
        this.sides = sides;
    }

    draw(ctx) {
        const angle = 2*Math.PI/this.sides;
        super.draw(ctx);
        ctx.beginPath();
        ctx.moveTo(this.position.x + this.radius * Math.cos(3 * Math.PI/2), this.position.y + this.radius * Math.sin(3 * Math.PI/2));
        for (let i=1; i<this.sides; i++) {
            ctx.lineTo(this.position.x + this.radius * Math.cos(3 * Math.PI/2 + i*angle), this.position.y + this.radius * Math.sin(3 * Math.PI/2 + i*angle));
        }
        ctx.lineTo(this.position.x + this.radius * Math.cos(3 * Math.PI/2), this.position.y + this.radius * Math.sin(3 * Math.PI/2));
        ctx.closePath();
        ctx.fill();
    }

    update() {
        super.update();
    }

    checkCollision(boundX, boundY) {
        super.checkCollision(boundX, boundY);
    }
}

