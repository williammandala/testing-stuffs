// Get all the keys from the document
const keys = document.querySelector('.calculator-keys');
const screen = document.querySelector('.calculator-screen');

let currentInput = '0';
let previousInput = '';
let operator = null;
let waitingForSecondOperand = false;

// Add event listener to the keys
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;

  // If the clicked element is not a button, exit function
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
      handleOperator(value);
      break;
    case '=':
      calculate();
      break;
    case 'all-clear':
      resetCalculator();
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'backspace':
      backspace();
      break;
    case '%':
      inputPercent();
      break;
    case '()':
      inputParentheses();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputNumber(value);
      }
  }

  updateScreen();
});

// Functions to handle inputs and calculations
function updateScreen() {
  screen.value = currentInput;
}

function inputNumber(number) {
  if (waitingForSecondOperand) {
    currentInput = number;
    waitingForSecondOperand = false;
  } else {
    currentInput = currentInput === '0' ? number : currentInput + number;
  }
}

function inputDecimal(dot) {
  if (waitingForSecondOperand) {
    currentInput = '0.';
    waitingForSecondOperand = false;
    return;
  }

  if (!currentInput.includes(dot)) {
    currentInput += dot;
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (previousInput === '') {
    previousInput = inputValue;
  } else if (operator) {
    const result = performCalculation[operator](previousInput, inputValue);

    currentInput = String(result);
    previousInput = result;
  }

  operator = nextOperator;
  waitingForSecondOperand = true;
}

const performCalculation = {
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
};

function calculate() {
  const inputValue = parseFloat(currentInput);

  if (operator && !waitingForSecondOperand) {
    const result = performCalculation[operator](previousInput, inputValue);
    currentInput = String(result);
    previousInput = '';
    operator = null;
    waitingForSecondOperand = false;
  }
}

function resetCalculator() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  waitingForSecondOperand = false;
}

function backspace() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
}

function inputPercent() {
  const value = parseFloat(currentInput);
  currentInput = String(value / 100);
}

function inputParentheses() {
  // Implementing parentheses requires an expression parser.
  // This functionality is complex and beyond simple calculator logic.
  // Here, we'll simulate a simple toggle between adding '(' or ')'.
  if (currentInput === '0') {
    currentInput = '(';
  } else {
    currentInput += ')';
  }
}
