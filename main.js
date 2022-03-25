// global display var
let display = document.querySelector('.screen');
// display function to update display each time a button is pressed
function updateDisplay(num, isResult=false) {
  if (isResult) {
    display.textContent = num;
  } else {
    display.textContent = `${display.textContent}${num}`;
  }
}

// global vars for input 1, operator and second number
let firstNumber = 0;
let secondNumber = 0;
let operator = '';

// add event listeners to all buttons that return the button's ID
const buttons = document.querySelectorAll('.buttons button');
for (const button of buttons) {
  button.addEventListener('click', input);
}

// input function thats called when a button is pressed
function input(button) {
  console.log(this.id);
}

// calculation functions for each operator

// operate function that calculates result upon calling an operator
// if = then resets input vars
// else move result to input 1 and continue operation




