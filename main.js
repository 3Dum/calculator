let firstNumber = '';
let secondNumber = '';
let operator = '';
let equated = false;

let display = document.querySelector('.screen');

function updateDisplay() {
  if (secondNumber) {
    display.textContent = secondNumber;
  } else {
    display.textContent = firstNumber;
  }
}

const buttons = document.querySelectorAll('.buttons button');
for (const button of buttons) {
  button.addEventListener('click', buttonClick);
}

function buttonClick() {
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

document.addEventListener('keydown', keyPress)

function keyPress(e) {
  const key = e.key;
  if (Number.isInteger(+key)) {
    handleNumber(key);
    return;
  }
  switch (key) {
    case 'c': case 'C':
      handleFunction('clear');
      break;
    case 'Backspace':
      handleFunction('backspace');
      break;
    case '.':
      handleFunction('decimal');
      break;
    case '+':
      handleOperator('add');
      break;
    case '-':
      handleOperator('subtract');
      break;
    case '*':
      handleOperator('multiply');
      break;
    case '/':
      handleOperator('divide');
      break;
    case '=': case 'Enter':
      handleOperator('equals');
      break;
    default:
      return;
  }
}

function oldhandleOperator(op) {
  if (op == 'equals') {
    if (!secondNumber) return;
    operate();
    operator = '';
  } else if (operator && secondNumber) {
    operate();
  } else {
    operator = op;
  }
}

function handleOperator(op) {
  if (op != 'equals') {
    if (operator && secondNumber) operate();
    operator = op;
    return;
  }
  if (!secondNumber) return;
  operate();
  operator = '';
}

function handleNumber(num) {
  if (!operator) {
    if (equated || firstNumber === '0') {
      firstNumber = num;
    } else {
      firstNumber += num;
    }
  } else {
    if (secondNumber === '0') {
      secondNumber = num;
    } else {
      secondNumber += num;
    }
  }
  equated = false;
  updateDisplay();
}

function handleFunction(func) {
  if (func == 'clear') {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    equated = false;
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
  }
  if (func == 'decimal') {
    if (operator) {
      if (secondNumber.includes('.')) return;
      if (!secondNumber || secondNumber === '0') {
        secondNumber = '0.';
      } else {
        secondNumber += '.';
      }
    } else if (!firstNumber || firstNumber === '0' || equated) {
      firstNumber = '0.';
    } else {
      if (firstNumber.includes('.')) return;
      firstNumber += '.';
    }
  }
  updateDisplay();
  equated = false;
}

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
    default:
      alert('ERROR: INVALID OPERATOR');
  }
  firstNumber = Math.round((firstNumber + Number.EPSILON) * 10e5) / 10e5;
  secondNumber = '';
  equated = true;
  updateDisplay();
}

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