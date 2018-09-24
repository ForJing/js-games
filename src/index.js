import "./style.css";

const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

const fps = 60;

const ballRadius = 10;

var x = canvas.width / 2;
var y = canvas.height - 30;

const paddleHeight = 10;
const paddleWidth = 75;

let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let dx = 2;
let dy = -2;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

var bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0 };
  }
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r].x = 0;
      bricks[c][r].y = 0;
      ctx.beginPath();
      ctx.rect(0, 0, brickWidth, brickHeight);
      ctx.fillStyle = "#0095dd";
      ctx.fill();
      ctx.closePath();
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  if (x + ballRadius + dx > canvas.width || x - ballRadius + dx < 0) {
    dx = -dx;
  }
  if (y - ballRadius + dy < 0) {
    dy = -dy;
  }
  if (y + dy + ballRadius > canvas.height) {
    // alert('game over')
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      document.location.reload();
    }
  }
  x += dx;
  y += dy;

  if (rightPressed && paddleX + paddleWidth < canvas.width) {
    paddleX += 7;
  }
  if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
}

setInterval(draw, 1000 / fps);

function keyDownHandler(e) {
  // console.log(e);
  if (e.key === "ArrowRight") {
    rightPressed = true;
  }
  if (e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "ArrowRight") {
    rightPressed = false;
  }
  if (e.key === "ArrowLeft") {
    leftPressed = false;
  }
}
