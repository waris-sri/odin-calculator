let a = 0
let b = 0
let operator = ""

const buttons = document.querySelector("#buttons")
const result = document.querySelector("#result")
const note = document.querySelector("#note")
const nsbp = "\xa0"

window.addEventListener("DOMContentLoaded", () => {
  result.innerText = "0"
  note.innerText = nsbp // non-breaking space
})

// TODO add keyboard support (AC is ESC)

let hasPoint = false
let isFirstCalculation = false
buttons.addEventListener("click", (e) => {
  let btn = e.target
  let type = btn.className
  let btnVal = btn.innerText
  switch (type) {
    case "number":
      if (isFirstCalculation) {
        clear()
        hasPoint = false
        isFirstCalculation = false
        result.innerText = "0"
        note.innerText = nsbp
      }
      if (btnVal === "±") {
        result.innerText *= -1
      } else {
        if (result.innerText === "0") result.innerText = btnVal
        else result.innerText += btnVal
      }
      break
    case "operator":
      isFirstCalculation = false // this fixes the entire operation flow bugs
      hasPoint = false
      // continuous operations without pressing equal button
      if (a !== 0 && operator) {
        b = +result.innerText
        result.innerText = calculate(a, b, operator)
        a = +result.innerText
      } else {
        a = +result.innerText
      }
      operator = btnVal
      note.innerText = `${a}${btnVal}`
      result.innerText = "0"
      break
    case "decimal":
      if (!hasPoint) {
        result.innerText += btnVal
        hasPoint = true
      }
      break
    case "equal":
      if (!isFirstCalculation) {
        b = +result.innerText
        if (operator !== "") {
          note.innerText = `${a}${operator}${b}`
        } else {
          note.innerText = `${b}`
        }
      } else {
        a = +result.innerText // as `b` should stay the same
        if (operator !== "") {
          note.innerText = `${a}${operator}${b}`
        } else {
          note.innerText = `${a}`
        }
      }
      result.innerText = calculate(a, b, operator)
      hasPoint = result.innerText.includes(".")
      isFirstCalculation = true
      break
    case "clear-all":
      clear()
      result.innerText = "0"
      hasPoint = false
      isFirstCalculation = false
      break
    case "backspace":
      result.innerText = result.innerText.slice(0, -1)
      if (result.innerText === "") result.innerText = "0"
      if (!result.innerText.includes(".")) hasPoint = false
      break
  }
})

function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b
    case "–":
      return a - b
    case "×":
      return a * b
    case "÷":
      return a / b
    default:
      return +result.innerText
  }
}

function clear() {
  a = 0
  b = 0
  operator = ""
  note.innerText = nsbp
}
