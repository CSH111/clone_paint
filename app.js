const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.querySelector("#jsRange");
const colors = document.querySelectorAll(".jsColor");
let painting = false;
const fillPaintBtn = document.querySelector(".jsModes");
let filling = false;
const saveBtn = document.querySelector(".jsSave");

fillPaintBtn.addEventListener("click", (event) => {
  if (filling === false) {
    filling = true;
    event.target.innerText = "faint";
  } else {
    filling = false;
    event.target.innerText = "fill";
  }
});

canvas.width = 700;
canvas.height = 700;
ctx.lineWidth = 2;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);

saveBtn.addEventListener("click", handleSaveClick);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseout", stopPainting);
canvas.addEventListener("click", handleCanvasClick);
canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

colors.forEach((item) => item.addEventListener("click", handleColorClick));

function handleSaveClick(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "mypainting.png";
  link.click();
}

function handleCanvasClick(event) {
  if (filling === true) {
    ctx.fillRect(0, 0, 700, 700);
  }
}
function handleLineWidth(event) {
  ctx.lineWidth = range.value;
}

range.addEventListener("input", handleLineWidth);

function handleColorClick(event) {
  const newColor = event.target.style.backgroundColor;
  ctx.strokeStyle = newColor;
  ctx.fillStyle = newColor;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}
