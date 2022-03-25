// global display var
let display = document.querySelector('.screen');
// display function to update display each time a button is pressed
function updateDisplay() {
  if (result) {
    display.textContent = result;
  } else if (secondNumber) {
    display.textContent = secondNumber;
  } else {
    display.textContent = firstNumber;
  }
}

// global vars for input 1, operator and second number
let firstNumber = '';
let secondNumber = '';
let result = '';
let operator = '';

// add event listeners to all buttons that return the button's ID
const buttons = document.querySelectorAll('.buttons button');
for (const button of buttons) {
  button.addEventListener('click', input);
}

// input function thats called when a button is pressed
function input(button) {
  if (this.className == 'operator') {
    operate(this.id);
    return;
  }
  if (secondNumber) {
    secondNumber = `${secondNumber}${this.id}`;
    updateDisplay();
  } else {
    firstNumber = `${firstNumber}${this.id}`;
    console.log(firstNumber);
    updateDisplay();
  }
}

// calculation functions for each operator

// operate function that calculates result upon calling an operator
// if = then resets input vars
// else move result to input 1 and continue operation
function operate(operator) {
  alert(operator);
}




