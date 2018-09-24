import "./style.css";

const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");

const fps = 60;

const ballRadius = 10;

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

  if (x + ballRadius + dx > canvas.width || x - ballRadius + dx < 0) {
    dx = -dx;
  }
  if (y + dy + ballRadius > canvas.height || y - ballRadius + dy < 0) {
    dy = -dy;
  }
  x += dx;
  y += dy;
}

setInterval(draw, 1000 / fps);
