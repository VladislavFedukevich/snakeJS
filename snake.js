"use strict";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const box = 25;
const canvasSize = 25;
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;

canvas.width = box * canvasSize;
canvas.height = box * canvasSize;

class Apple {
    generateRandomPos() {
        this.x = Math.floor(1 + (Math.random() * (canvasSize - 1))) * box;
        this.y = Math.floor(1 + (Math.random() * (canvasSize - 1))) * box;
    }
}

class Snake {
    constructor() {
        this.canUse = true;
        this.vx = box;
        this.vy = 0;
        this.size = box;
        this.body = [{x: 25, y: 25}];
        //this.counter = 0;
    }

    createSnake() {
        ctx.fillStyle = 'green';
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, this.size, this.size);
        }
    }

    updateSnakePosition() {
        for (let i = this.body.length - 1; i >= 1; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        this.body[0].x += this.vx;
        this.body[0].y += this.vy;

        if (this.body[0].x + box > canvas.width) {
            this.body[0].x = 0;
        } else if (this.body[0].x < 0) {
            this.body[0].x = canvas.width - box;
        }
        if (this.body[0].y > canvas.height - box) {
            this.body[0].y = 0;
        } else if (this.body[0].y < 0) {
            this.body[0].y = canvas.height - box;
        }
    }

    moveSnake(key) {
        switch (key) {
            case UP_KEY: {
                if (this.canUse) {
                    this.vx = 0;
                    this.vy = -box;
                    this.canUse = false;
                }
                break;
            }
            case DOWN_KEY: {
                if (this.canUse) {
                    this.vx = 0;
                    this.vy = box;
                    this.canUse = false;
                }
                break;
            }
            case RIGHT_KEY: {
                if (!this.canUse) {
                    this.vx = box;
                    this.vy = 0;
                    this.canUse = true;
                }
                break;
            }
            case LEFT_KEY: {
                if (!this.canUse) {
                    this.vx = -box;
                    this.vy = 0;
                    this.canUse = true;
                }
                break;
            }
            default:
                break;
        }
    }
}

let snake = new Snake();
let startingPack = [];

let createTen = (startingPack) => {
    for (let i = 0; i < 10; i++) {
        let apple = new Apple();
        startingPack.push(apple);
        apple.generateRandomPos();
    }
}

let draw = (startingPack) => {
    startingPack.map(elem => {
        ctx.fillStyle = 'red';
        ctx.fillRect(elem.x, elem.y, box, box);
    });
}

let deleteApple = () => {
    startingPack.map(elem => {
        let index = startingPack.indexOf(elem);
        if (elem.x === snake.body[0].x && elem.y === snake.body[0].y) {
            let length = snake.body.length;
            let tailX = (length === 1) ? this.vx : Math.abs(snake.body[length - 1].x - snake.body[length - 2].x);
            let tailY = (length === 1) ? this.vy : Math.abs(snake.body[length - 1].y - snake.body[length - 2].y);
            snake.body.push({x: snake.body[length - 1].x - tailX, y: snake.body[length - 1].y - tailY});
            startingPack.splice(index, 1);
        }
    });

    if (startingPack.length === 0) {
        let apple = new Apple();
        apple.generateRandomPos();
        startingPack.push(apple);
        draw();
    }
}

window.onload = () => {
    createTen(startingPack);
    setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.createSnake();
        draw(startingPack);
        snake.updateSnakePosition();
        deleteApple(startingPack);
    }, 150);

    document.addEventListener('keydown', (event) => {
        snake.moveSnake(event.keyCode);
    })
}