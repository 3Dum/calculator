// global display var
let display = document.querySelector('.screen');
// display function to update display each time a button is pressed
function updateDisplay() {
  if (secondNumber) {
    display.textContent = secondNumber;
  } else {
    display.textContent = firstNumber;
  }
}

// keyboard support
document.addEventListener('keydown', keyPress)

function keyPress(e) {
  const key = e.key;
  if (Number.isInteger(+key)) {
    handleNumber(key);
    return;
  }
}

// global vars for input 1, operator and second number
let firstNumber = '';
let secondNumber = '';
let operator = '';
let equated = false;

// add event listeners to all buttons that return the button's ID
const buttons = document.querySelectorAll('.buttons button');
for (const button of buttons) {
  button.addEventListener('click', input);
}

// input function thats called when a button is pressed
function input() {
  if (this.className == 'operator') {
    handleOperator(this.id);
    return;
  }
  if (this.className == 'number') {
    handleNumber(this.id);
    return;
  }
  if (this.className == 'function') {
    handleFunction(this.id);
    return;
  }
}

function handleOperator(op) {
  if (op == 'equals') {
    if (!firstNumber || !operator || !secondNumber) return;
    operate();
    if (equated) operator = '';
  } else if (operator && secondNumber) {
    operate();
  } else {
    operator = op;
  }
}

function handleNumber(num) {
  if (operator) {
    secondNumber = secondNumber === '0' ? num : `${secondNumber}${num}`;
  } else {
    if (equated || firstNumber === '0') {
      firstNumber = num;
    } else {
      firstNumber = `${firstNumber}${num}`;
    }
  }
  equated = false;
  updateDisplay();
}

function handleFunction(func) {
  if (func == 'clear') {
    clear();
    updateDisplay();
    return;
  }
  if (func == 'backspace') {
    if (operator) {
      secondNumber = [...secondNumber].slice(0, -1).join('');
    } else {
      if (equated || firstNumber === '0') {
        firstNumber = '';
      } else {
        firstNumber = [...firstNumber].slice(0, -1).join('');
      }
    }
    updateDisplay();
    return;
  }
  if (func == 'decimal') {
    if (operator) {
      if (!secondNumber || secondNumber == 0) {
        secondNumber = '0.';
      } else {
        if (secondNumber % 1) return;
        secondNumber =  `${secondNumber}.`;
      }
      updateDisplay();
      return; 
    }
    if (!firstNumber || equated || firstNumber == 0) {
      firstNumber = '0.';
    } else {
      if (firstNumber.includes('.')) return;
      firstNumber =  `${firstNumber}.`;
    }
  }
  updateDisplay();
  equated = false;
}

function clear() {
  firstNumber = '';
  secondNumber = '';
  operator = '';
  equated = false;
}

// calculation functions for each operator
function add(a, b) {
  return +a + +b;
};

function subtract(a, b) {
  return +a - +b;
};

function divide (a, b) {
  return +a / +b;
};

function multiply (a, b) {
  return +a * +b;
};


// operate function that calculates result upon calling an operator
// if = then resets input vars
// else move result to input 1 and continue operation
function operate() {
  switch (operator) {
    case 'multiply':
      firstNumber = multiply(firstNumber, secondNumber);
      break;
    case 'add':
      firstNumber = add(firstNumber, secondNumber);
      break;
    case 'subtract':
      firstNumber = subtract(firstNumber, secondNumber);
      break;
    case 'divide':
      if (secondNumber == 0) {
        alert('None of that, please');
        return;
      }
      firstNumber = divide(firstNumber, secondNumber);
      break;
  }
  firstNumber = Math.round((firstNumber + Number.EPSILON) * 10e5) / 10e5;
  secondNumber = '';
  equated = true;
  updateDisplay();
}
