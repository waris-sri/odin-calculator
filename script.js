let a = 0;
let b = 0;
let operator = "";

const buttons = document.querySelector("#buttons");
const result = document.querySelector("#result");
const note = document.querySelector("#note");

let hasPoint = false;
buttons.addEventListener("click", (e) => {
  let btn = e.target;
  let type = btn.className;
  let btnVal = btn.innerText;
  // TODO assign to variables and operators
  if (result.innerText === "") {
    result.innerText = "0";
  }
  switch (type) {
    case "number":
      result.innerText += btnVal;
      // handle the plus/minus case
      break;
    case "operator":
      // store the operator
      // reset text to 0 and prepare to receive next variable
      break;
    case "decimal":
      if (!hasPoint) {
        result.innerText += btnVal;
        hasPoint = true;
      }
      break;
    case "equal":
      // if number is pressed, reset all variables and operators; start anew
      // if operator is pressed, the last answer be the new first variable of the current operation
      break;
    case "clear-all":
      result.innerText = "0";
      // when the user enters a number, i.e. not 0 anymore, replace it with those numbers
      break;
    case "backspace":
      result.innerText = result.innerText.slice(0, -1);
      if (result.innerText === "") result.innerText = "0";
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

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "–":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
  }
}

function clear() {
  a = 0;
  b = 0;
  operator = "";
}
