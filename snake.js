var snake = [];
snake.player = 1;

var snake2 = [];
snake2.player = 2;

var target = null;
var canvas = border;
var context = canvas.getContext("2d")
var gridSize = [20, 20]

snake.push([0, 1]);
snake.push([0, 0]);

snake2.push([gridSize[0] - 1, gridSize[1] - 2]);
snake2.push([gridSize[0] - 1, gridSize[1] - 1]);

var cellWidth = Math.floor(canvas.width / gridSize[0]);
var cellHeight = Math.floor(canvas.height / gridSize[1]);
var up = 0;
var right = 1;
var down = 2;
var left = 3;

var downPressed = false;
var upPressed = false;
var leftPressed = false;
var rightPressed = false;

var down2Pressed = false;
var up2Pressed = false;
var left2Pressed = false;
var right2Pressed = false;

var direction = down;
var direction2 = up;
var lost = false;
var score = 0;

function drawCell([x, y], fillColor, strokeColor) {

    if (fillColor)
        context.fillStyle = fillColor;
    
    if (strokeColor)
        context.strokeStyle = strokeColor;

    context.fillRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight);
    context.strokeRect(cellWidth * x, cellHeight * y, cellWidth, cellHeight);
}

function makeTarget() {
    var randomX = Math.floor(Math.random() * gridSize[0]);
    var randomY = Math.floor(Math.random() * gridSize[1]);

    target = [];
    target[0] = randomX;
    target[1] = randomY;
}

function drawSnake(snake) {
    for (var i = 0; i < snake.length; i++) {
        var color = 'black';
        if (i == 0) {
            if (snake.player == 1)
                color = 'blue'
            else if (snake.player == 2)
                color = 'orange'
        }

        drawCell(snake[i], color, 'green');
    }
}

function moveSnake(snake, dir) {
    var first = snake[0];
    var second = snake[1];
    var shouldGetLonger = false;
    var maxX = gridSize[0] - 1;
    var maxY = gridSize[1] - 1;
    var minX = 0;
    var minY = 0;

    var x = first[0];
    var y = first[1];

    if (dir == up) {
        y--;
        if (y < minY)
            y = maxY;
    }
    if (dir == down) {
        y++;
        if (y > maxY)
            y = minY;
    }
    if (dir == left) {
        x--;
        if (x < minX)
            x = maxX;
    }
    if (dir == right) {
        x++;
        if (x > maxX)
            x = minX;
    }

    if (isInsideSnake(snake, x, y)) {
        if (x == second[0] && y == second[1])
            return;
        else
            lost = true;
    }

    if (target && isInsideSnake(snake, target[0], target[1])) {
        target = null;
        score ++;
        shouldGetLonger = true;
    }

    snake.unshift([x, y]);

    if (!shouldGetLonger)
        snake.pop();
}

function isInsideSnake(snake, x, y) {
    for (var i = 0; i < snake.length; i++) {
        var cell = snake[i];
        if (x == cell[0] && y == cell[1]) {
            return true;
        }
    }

    return false;
}


window.onkeydown = function (e) {
    console.log(e);

    if (e.key === 'w')
        direction = up;
    if (e.key === 'd')
        direction = right;
    if (e.key === 's')
        direction = down;
    if (e.key === 'a')
        direction = left;

    if (e.key === 'ArrowUp')
        direction2 = up;
    if (e.key === 'ArrowRight')
        direction2 = right;
    if (e.key === 'ArrowDown')
        direction2 = down;
    if (e.key === 'ArrowLeft')
        direction2 = left;

}

function handleLoss() {
    alert("The snake died in a high-speed collision")
}


function main() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    moveSnake(snake, direction);
    drawSnake(snake);

    moveSnake(snake2, direction2);
    drawSnake(snake2);

    scoreBoard.innerText = score;
    
    if (!target)
        makeTarget();
    else
        drawCell(target, 'red');


    if (lost) {
        handleLoss();
    } else {
        setTimeout(main, 1000 / (snake.length + snake2.length))
    }
}

main();
