// Canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// refresh speed
let speed = 50;

// Buttons
const addButton = document.getElementById("add");
const startButton = document.getElementById("start");
const restartButton = document.getElementById("restart");
restartButton.disabled = true;

// Variables
const options = [];
const colors = [];
let rotationFactor = 0;
let spinning = false;

restartButton.addEventListener("click", () => {
  restartButton.disabled = true;
  spinning = true;
});

addButton.addEventListener("click", () => {
  const list = document.getElementById("choiceList");
  const optionName = document.getElementById("option");

  if (optionName.value == "") {
    alert("You can't have an empty option!");
    return;
  }

  const myItem = optionName.value;
  const listItem = document.createElement("li");
  const listText = document.createElement("span");
  listItem.appendChild(listText);
  var x = Math.round(0xffffff * Math.random()).toString(16);
  var y = 6 - x.length;
  var z = "000000";
  var z1 = z.substring(0, y);
  var color = "#" + z1 + x;

  listText.style.color = color;
  listText.textContent = myItem;
  list.appendChild(listItem);

  options.push(optionName.value);
  optionName.value = "";
  colors.push(color);
});

startButton.addEventListener("click", () => {
  if (options.length == 1 || options.length == 0) {
    alert("You haven't entered enough options! (2 or more required)");
    return;
  }
  spinning = true;
  drawAndSpinWheel();
  startButton.disabled = true;
});

function clearScreen() {
  ctx.fillStyle = "aquamarine";
  ctx.fillRect(0, 0, canvas.width, canvas.height); //using the inline CSS, we set width and height to 400x400
}

function drawAndSpinWheel() {
  clearScreen();
  setTimeout(drawAndSpinWheel, 1000 / speed); //call function after 1000/speed ms

  x = canvas.width / 2;
  y = canvas.height / 2;
  radius = canvas.width / 2;

  for (var i = 0; i < options.length; i++) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + radius, y);
    ctx.arc(
      x,
      y,
      radius,
      0,
      (options.length - i) * ((2 * Math.PI) / options.length)
    );
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  ctx.moveTo(x, y);
  ctx.lineTo(
    x + Math.cos(rotationFactor) * (radius * 0.9),
    y + Math.sin(rotationFactor) * (radius * 0.9)
  );
  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke();
  if (spinning) {
    rotationFactor += Math.PI / 25;
    let stop = Math.random() * 1000;
    if (stop <= 5) {
      spinning = false;
      restartButton.disabled = false;
    }
  }
}
