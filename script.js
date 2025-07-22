let a = 0;
let b = 0;
let operator = "";

const buttons = document.querySelector("#buttons");
const result = document.querySelector("#result");
const note = document.querySelector("#note");

window.addEventListener("DOMContentLoaded", () => {
  result.innerText = "0";
  note.innerText = "\xa0"; // non-breaking space
});

// TODO add note on calculator display
let hasPoint = false;
let justCalculated = false;
buttons.addEventListener("click", (e) => {
  let btn = e.target;
  let type = btn.className;
  let btnVal = btn.innerText;
  switch (type) {
    case "number":
      if (justCalculated) {
        clear();
        hasPoint = false;
        justCalculated = false;
        result.innerText = "0";
      }
      if (btnVal === "±") {
        result.innerText *= -1;
      } else {
        if (result.innerText === "0") result.innerText = btnVal;
        else result.innerText += btnVal;
      }
      break;
    case "operator":
      justCalculated = false; // this fixes the entire operation flow issues
      hasPoint = false;
      a = +result.innerText;
      operator = btnVal;
      result.innerText = "0";
      break;
    case "decimal":
      if (!hasPoint) {
        result.innerText += btnVal;
        hasPoint = true;
      }
      break;
    case "equal":
      if (!justCalculated) {
        b = +result.innerText;
      } else {
        a = +result.innerText; // as b should stay the same
      }
      result.innerText = calculate(a, b, operator);
      hasPoint = result.innerText.includes(".");
      justCalculated = true;
      break;
    case "clear-all":
      hasPoint = false;
      result.innerText = "0";
      clear();
      break;
    case "backspace":
      result.innerText = result.innerText.slice(0, -1);
      if (result.innerText === "") result.innerText = "0";
      if (!result.innerText.includes(".")) hasPoint = false; // reset to false when . got deleted
      break;
  }
});

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "–":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      return a;
  }
}

function clear() {
  a = 0;
  b = 0;
  operator = "";
}
