function randomFromRange(min, max) {
    return Math.random() * (max - min) + min;
}

function randomPickFromArray(array) {
    const index = Math.round(randomFromRange(0, array.length-1));
    return array[index];
}

class randomColor {
    constructor() {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.color = `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    getColor() {
        this.r = Math.round(Math.random() * 255);
        this.g = Math.round(Math.random() * 255);
        this.b = Math.round(Math.random() * 255);
        this.color = `rgb(${this.r}, ${this.g}, ${this.b})`;
        return this.color;
    }
}

class randomPosition {
    constructor(rangeX, rangeY) {
        this.rangeX = rangeX;
        this.rangeY = rangeY;
        this.position = null;
    }

    getPosition() {
        this.position = {
            x: randomFromRange(this.rangeX.min, this.rangeX.max),
            y: randomFromRange(this.rangeY.min, this.rangeY.max),
        }
        return this.position;
    }
}