/**
 * @fileOverview File to handle breakout game actions
 * @author Perez, Alejandro
 * @version 1.0.0
 */

var canvas = document.getElementById("breakoutCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var speedx = 2;
var speedy = -2;
var ballRadius = 8;
//paddle declaration
var paddleHeight = 10;
var paddleWidth = 65;
var paddleX = (canvas.width - paddleWidth) / 2;
//Flags to save keys status (pressed or not)
var rightPressed = false;
var leftPressed = false;
//Bricks declarations
var brickRowCount = 4;
var brickColumnCount = 9;
var brickWidth = 60;
var brickHeight = 15;
var brickPadding = 10;
var brickOffsetTop = 70;
var brickOffsetLeft = 30;
//Loop brincks to print them
var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
//Score counter
var score = 0;
//Total lives
var lives = 3;
//Bricks colors to pick randomly
var bricksColors = ["#ae4c86", "#8a4cae", "#594cae", "#4c76ae", "#4ca8ae", "#4cae8a", "#4cae50", "#d07137", "#d04337", "#008071", "#004080", "#00801d", "#008dd9"]


/**
 * Function to print the ball on screen
 */
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle="#0033FF";
    ctx.lineWidth=10
    ctx.fill();
    ctx.closePath();
}

/**
 * Function to print the paddle on screen
 */
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#24b4b6";
    ctx.fill();
    ctx.closePath();
}

/**
 * Print bricks on screen
 */
function drawBricks() {
    var randomColor;
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status == 1) {
            var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);            
            randomColor = bricksColors[getRandomInt(bricksColors.length)]            
            ctx.fillStyle = randomColor;
            ctx.fill();
            ctx.closePath();
        }
        }
    }
}

/**
 * Function to detect collisions against walls and bricks
 */
function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
        var b = bricks[c][r];
        if (b.status == 1) {
            if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
            ) {
            speedy = -speedy;
            b.status = 0;
            score++;
            if (score == brickRowCount * brickColumnCount) {
                alert("Has ganado, felicidades!");
                document.location.reload();
            }
            }
        }
        }
    }
}

/**
 * Function to calculate and show score counter
 */
function drawScore() {
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + score + "/" + (brickRowCount*brickColumnCount), 8, 20);
}

/**
 * Function to show total user lives
 */
function drawLives() {
    ctx.font = "bold 16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

//Generates random number within a range
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Main function to draw the canvas and start the game
 */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
    drawBricks();         
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    if(x + speedx > canvas.width-ballRadius || x + speedx < ballRadius) {
        speedx = -speedx;
    }
    if(y + speedy < ballRadius) {
        speedy = -speedy;
    }
    else if(y + speedy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            if(y = y - paddleHeight){
            speedy = -speedy;
            }
        }
        else {
            lives--;
            if (!lives) {
                alert("Has perdido tus 3 vidas");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                speedx = 2;
                speedy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    } 
    x += speedx;
    y += speedy;
    requestAnimationFrame(draw);                       
}

/**
 * Listeners to monitor keys and mouse events
 */
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);


/**
 * Function to handle pressed key to move paddle
 * 37 = left arrow, 39 = right arrow
 * @param {Object} e event of keyboard 
 */
function keyDownHandler(e) {
    //Change flags for rightPressed or leftPressed
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

/**
 * Function to handle released key to move paddle
 * 37 = left arrow, 39 = right arrow 
 * @param {Object} e event of keyboard
 */
function keyUpHandler(e) {
    //Change flags for rightPressed or leftPressed
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

/**
 * Function to handle mouse movement to move paddle
 * @param {*} e 
 */
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}