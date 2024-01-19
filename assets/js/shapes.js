class Shape {
    constructor(position, color) {
        this.position = position;
        this.color = color;
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
    }
}

class Circle extends Shape {
    constructor(position, color, radius) {
        console.log(position);
        super(position, color);
        this.radius = radius;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

class Rectangle extends Shape {
    constructor(position, color, w, h) {
        super(position, color);
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
}

class Triangle extends Shape {
    constructor(position, color, side) {
        super(position, color);
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
}