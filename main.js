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
    handleOperator(this);
    return;
  }
  if (this.className == 'number') {
    handleNumber(this);
    updateDisplay();
    return;
  }
  if (this.className == 'function') {
    handleFunction(this);
    updateDisplay();
    return;
  }
}

function handleOperator(button) {
  if (button.id == 'equals') {
    operate();
    operator = '';
  } else if (operator && secondNumber) {
    operate();
  } else {
    operator = button.id;
  }
}

function handleNumber(button) {
  if (operator) {
    secondNumber = `${secondNumber}${button.id}`;
  } else {
    if (equated) {
      firstNumber = button.id;
    } else {
      firstNumber = `${firstNumber}${button.id}`;
    }
  }
  equated = false;
}

function handleFunction(button) {
  if (button.id == 'clear') {
    clear();
    return;
  }
  if (button.id == 'decimal') {
    // find which number we're working on
    if (operator) {
      if (!secondNumber || secondNumber == 0) {
        secondNumber = '0.';
      } else {
        if (secondNumber % 1) return;
        secondNumber =  `${secondNumber}.`;
      }
      return; 
    }
    if (!firstNumber || equated || firstNumber == 0) {
      firstNumber = '0.';
    } else {
      if (firstNumber.includes('.')) return;
      firstNumber =  `${firstNumber}.`;
    }
  }
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
      firstNumber = divide(firstNumber, secondNumber);
      break;
  }
  secondNumber = '';
  equated = true;
  updateDisplay();
}
