let click = false;
let board = document.getElementById("board");
let square = board.querySelectorAll("div");
let eraser = document.getElementById("eraser");
let clear = document.getElementById("clear");
let random = document.getElementById("rainbowMode");
let sizeValue = document.getElementById("sizeValue");
let colorPicker = document.getElementById("colorPicker");
let colorMode = document.getElementById("colorMode");

// Function to manage active button state
function setActiveButton(activeButton) {
  console.log(activeButton);
  [colorMode, eraser, random].forEach((button) =>
    button.classList.remove("active")
  );
  activeButton.classList.add("active");
}

function boardCreation(size) {
  // square.forEach((div) => div.remove(div));
  colorMode.classList.add("active");
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  console.log(board);
  sizeValue.innerHTML = `${size} x ${size}`;

  let totalSize = size * size;
  for (let i = 0; i < totalSize; i++) {
    const div = document.createElement("div");
    div.addEventListener("mouseover", () => colorSquare(div, "black"));
    board.appendChild(div);
  }
}

// Color Picker
colorMode.addEventListener("click", function (e) {
  setActiveButton(colorMode);
  let colorVal = colorPicker.value;
  board.querySelectorAll("div").forEach((div) => {
    div.addEventListener("mouseover", () => colorSquare(div, colorVal));
  });
});

// Eraser Handeler
eraser.addEventListener("click", function () {
  setActiveButton(eraser);
  board.querySelectorAll("div").forEach((div) => {
    div.addEventListener("mouseover", ()=>colorSquare(div, "white"));
  });
});

// Random Color
random.addEventListener("click", function () {
  setActiveButton(random);
  board.querySelectorAll("div").forEach((div) => {
    div.addEventListener("mouseover", () => colorSquare(div, "random"));
  });
});

// Clear All
clear.addEventListener("click", () => {
  board
    .querySelectorAll("div")
    .forEach((div) => (div.style.backgroundColor = "white"));
});

// Add event listener to the range input
document.addEventListener("DOMContentLoaded", () => {
  const sizeRange = document.getElementById("sizeRange");
  boardCreation(sizeRange.value); //  initial value of range
  sizeRange.addEventListener("input", (event) => {
    board.querySelectorAll("div").forEach((div) => {
      div.style.backgroundColor = "white";
    });
    const value = event.target.value;
    console.log("eventttttttttt", event.target.value);
    boardCreation(value);
  });
});

function colorSquare(elem, color) {
  if (click) {
    if (color === "random") {
      const hue = Math.floor(Math.random() * 360);
      elem.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    } else {
      elem.style.backgroundColor = color;
    }
  }
}

document.querySelector("body").addEventListener("click", () => {
  click = !click;
});
