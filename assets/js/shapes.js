class Shape {
    constructor(position, direction, speed, color) {
        this.position = position;
        this.direction = direction;
        this.speed = speed;
        this.color = color;
        this.friction = 0.003;
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
    }

    update() {
        this.position.x = this.position.x + this.speed * Math.cos(this.direction);
        this.position.y = this.position.y + this.speed * Math.sin(this.direction);
        this.speed -= this.friction;
        if (this.speed < 0) this.speed = 0;
    }

    checkCollision(boundX, boundY) {
        if (this.position.x >= boundX.max || this.position.x <= boundX.min || this.position.y >= boundY.max || this.position.y <= boundY.min) {
            this.direction = this.direction + Math.PI;
            
        }
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