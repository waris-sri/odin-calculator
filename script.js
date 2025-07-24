let a = 0
let b = 0
let operator = ''

const buttons = document.querySelector('#buttons')
const result = document.querySelector('#result')
const note = document.querySelector('#note')
const nbsp = '\xa0'

window.addEventListener('DOMContentLoaded', () => {
  result.innerText = '0'
  note.innerText = nbsp // non-breaking space
})

let hasPoint = false
let shouldClearOnNextInput = false
function handleInput(type, btnVal) {
  switch (type) {
    case 'number':
      if (shouldClearOnNextInput) {
        clear()
        hasPoint = false
        shouldClearOnNextInput = false
        result.innerText = '0'
        note.innerText = nbsp
      }
      if (result.innerText === '0') result.innerText = btnVal
      else result.innerText += btnVal
      break
    case 'operator':
      shouldClearOnNextInput = false // this fixes the entire operation flow bugs
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
      result.innerText = '0'
      break
    case 'decimal':
      if (!hasPoint) {
        result.innerText += btnVal
        hasPoint = true
      }
      break
    case 'equal':
      if (!shouldClearOnNextInput) {
        b = +result.innerText
        if (operator !== '') {
          note.innerText = `${a}${operator}${b}`
        } else {
          note.innerText = `${b}`
        }
      } else {
        a = +result.innerText // as `b` should stay the same
        if (operator !== '') {
          note.innerText = `${a}${operator}${b}`
        } else {
          note.innerText = `${a}`
        }
      }
      result.innerText = calculate(a, b, operator)
      hasPoint = result.innerText.includes('.')
      shouldClearOnNextInput = true
      break
    case 'clear-all':
      clear()
      result.innerText = '0'
      hasPoint = false
      shouldClearOnNextInput = false
      break
    case 'backspace':
      result.innerText = result.innerText.slice(0, -1)
      if (result.innerText === '') result.innerText = '0'
      if (!result.innerText.includes('.')) hasPoint = false
      break
    case 'sign':
      if (!shouldClearOnNextInput) {
        result.innerText *= -1
        b = +result.innerText
        result.innerText = b
      } else {
        result.innerText *= -1
        a = +result.innerText
        result.innerText = a
        if (operator !== '') {
          note.innerText = `${a}${operator}${b}`
        } else {
          note.innerText = `${a}`
        }
      }
      break
  }
}

buttons.addEventListener('click', (e) => {
  let btn = e.target
  let type = btn.className
  let btnVal = btn.innerText
  handleInput(type, btnVal)
})

document.addEventListener('keydown', (e) => {
  const key = e.key
  let type
  let btnVal
  const isDigit = /[0-9]/
  const operators = ['+', '-', '*', '/']
  if (isDigit.test(key)) {
    type = 'number'
    btnVal = key
  } else if (operators.includes(key)) {
    type = 'operator'
    btnVal = key === '+' ? '+' : key === '-' ? '−' : key === '*' ? '×' : '÷'
  } else if (key === '.') {
    type = 'decimal'
    btnVal = key
  } else if (key === 'Enter' || key === '=') {
    type = 'equal'
    btnVal = '='
  } else if (key === 'Escape' || key.toLowerCase() === 'c') {
    type = 'clear-all'
    btnVal = 'AC'
  } else if (key === 'Backspace') {
    type = 'backspace'
    btnVal = '⌫'
  } else {
    return
  }
  e.preventDefault()
  handleInput(type, btnVal)
})

function calculate(a, b, operator) {
  let res
  switch (operator) {
    case '+':
      res = a + b
      break
    case '−':
      res = a - b
      break
    case '×':
      res = a * b
      break
    case '÷':
      res = a / b
      break
    default:
      return +result.innerText
  }
  return Math.round(res * 1000000000) / 1000000000 // to fix floating point precision
}

function clear() {
  a = 0
  b = 0
  operator = ''
  note.innerText = nbsp
}
