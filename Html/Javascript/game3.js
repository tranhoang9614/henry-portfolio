/////////////////////////////////////////////////////////////////////
var stopButton = document.getElementById("stopSnake");
var lengthButton = document.getElementById("snakeLength");
var edgeButton = document.getElementById("fieldEdge");
var speedButton = document.getElementById("snakeSpeed");
var foodButton = document.getElementById("snakeFood");

var SnakeField = document.getElementById("snakeGame");
var ctx = SnakeField.getContext("2d");
var width = SnakeField.width;
var height = SnakeField.height;

var snake;
const snakeSize = 5;
var Frame, Speed;
var food;

var Grow = false;
var consoleLog = false;

function ButtonFunctions() {
    edgeButton.addEventListener("click", () => {});

    foodButton.addEventListener("click", () => {});
}

function setup() {
    if (Speed === undefined) {
        updateSpeed(5);
    }
    snake = new Snake();
    food = new Food();
    draw();
    keypress();

    speedButton.addEventListener("click", () => {
        var newSpeed;
        var currentSpeed = speedButton.textContent;
        console.log(currentSpeed);
        switch (true) {
            case currentSpeed.indexOf("3") !== -1:
                newSpeed = 5;
                break;
            case currentSpeed.indexOf("5") !== -1:
                newSpeed = 7;
                break;
            case currentSpeed.indexOf("7") !== -1:
                newSpeed = 10;
                break;
            case currentSpeed.indexOf("10") !== -1:
                newSpeed = 3;
                break;

            default:
                break;
        }
        updateSpeed(newSpeed);
    });

    stopButton.addEventListener("click", () => {
        consoleLog = !consoleLog;

        stopButton.textContent =
            stopButton.textContent.indexOf("Stop") === -1
                ? "Stop logging"
                : "Start logging";
    });
}

function draw() {
    if (SnakeField.getContext) {
        setInterval(async () => {
            if (
                snake.body[0].x === food.place.x &&
                snake.body[0].y === food.place.y
            ) {
                food = new Food();
                snake.eat();
            }

            await snake.clear();
            await snake.update();

            ctx.fillStyle = "black";
            snake.show();

            ctx.fillStyle = "blue";
            food.show();

            console.log(Speed);
        }, Speed);
    }
}

class Food {
    constructor() {
        this.place = createVector(
            Math.floor((Math.random() * width) / snakeSize) * snakeSize,
            Math.floor((Math.random() * height) / snakeSize) * snakeSize
        );
    }
    show() {
        ctx.fillRect(this.place.x, this.place.y, snakeSize, snakeSize);
    }
}

class Snake {
    constructor() {
        this.body = [];
        this.body[0] = createVector(0, 0);
        this.xDir = snakeSize;
        this.yDir = 0;
    }

    eat() {
        Grow = !Grow;
    }

    updateLength() {
        lengthButton.textContent = this.body.length;
    }

    changeDir(X, Y) {
        if ((this.xDir * X < 0 || this.yDir * Y < 0) && this.body.length > 1) {
        } else {
            this.xDir = X * snakeSize;
            this.yDir = Y * snakeSize;
        }
    }

    clear() {
        var SnakeBody = this.body;
        for (let i = SnakeBody.length - 1; i >= 0; i--) {
            ctx.clearRect(SnakeBody[i].x, SnakeBody[i].y, snakeSize, snakeSize);
        }
    }

    update() {
        var SnakeBody = this.body;
        var newCell = createVector(
            SnakeBody[0].x + this.xDir,
            SnakeBody[0].y + this.yDir
        );

        SnakeBody.unshift(newCell);

        if (!Grow) {
            SnakeBody.pop();
        } else {
            Grow = !Grow;
        }

        switch (true) {
            case SnakeBody[0].x > width:
                SnakeBody[0].x = 0;
                break;
            case SnakeBody[0].x < 0:
                SnakeBody[0].x = width;
                break;
            case SnakeBody[0].y > height:
                SnakeBody[0].y = 0;
                break;
            case SnakeBody[0].y < 0:
                SnakeBody[0].y = height;
                break;
            default:
                break;
        }

        snake.updateLength();
    }

    show() {
        var SnakeBody = this.body;
        for (let i = SnakeBody.length - 1; i >= 0; i--) {
            if (i === 0) {
                ctx.fillStyle = "rgb(255, 177, 76)";
            } else {
                ctx.fillStyle = "rgb(" + i + ", " + i + ", " + i + ")";
            }
            ctx.fillRect(SnakeBody[i].x, SnakeBody[i].y, snakeSize, snakeSize);
        }
    }
}

function updateSpeed(newFrame) {
    Frame = newFrame;
    Speed = 1000 / Frame;
    speedButton.textContent = Frame + "/s";
    // setInterval( () => {}, Speed)
}

function createVector(X, Y) {
    return { x: X, y: Y };
}

function keypress() {
    document.addEventListener(
        "keydown",
        function (event) {
            switch (event.key) {
                case "ArrowUp":
                    snake.changeDir(0, -1);
                    break;
                case "ArrowDown":
                    snake.changeDir(0, 1);
                    break;
                case "ArrowRight":
                    snake.changeDir(1, 0);
                    break;
                case "ArrowLeft":
                    snake.changeDir(-1, 0);
                    break;
                default:
                    break;
            }
        },
        true
    );
}

function LogHelper(content) {
    if (consoleLog) {
        console.table(content);
    }
}

setup();
