let display = document.getElementById('display');
let memory = 0;
let isCalculatorOn = true;

function appendValue(val) {
  if (!isCalculatorOn) return;
  if (display.innerText === '0') {
    display.innerText = val;
  } else {
    display.innerText += val;
  }
}

function clearDisplay() {
  if (!isCalculatorOn) return;
  display.innerText = '0';
  display.classList.remove('error');
}

function deleteLast() {
  if (!isCalculatorOn) return;
  if (display.innerText.length === 1) {
    display.innerText = '0';
  } else {
    display.innerText = display.innerText.slice(0, -1);
  }
}

function calculate() {
  if (!isCalculatorOn) return;
  try {
    display.innerText = eval(
      display.innerText
        .replace('%', '/100')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/log/g, 'Math.log')
    );
  } catch (e) {
    display.innerText = 'Error';
    display.classList.add('error');
    setTimeout(() => display.classList.remove('error'), 500);
  }
}

function memoryAdd() {
  if (!isCalculatorOn) return;
  memory += parseFloat(display.innerText) || 0;
}

function memorySubtract() {
  if (!isCalculatorOn) return;
  memory -= parseFloat(display.innerText) || 0;
}

function memoryRecall() {
  if (!isCalculatorOn) return;
  display.innerText = memory;
}

function memoryClear() {
  if (!isCalculatorOn) return;
  memory = 0;
}

function toggleCalculator() {
  isCalculatorOn = !isCalculatorOn;
  const btn = document.getElementById('toggle-btn');

  btn.innerText = isCalculatorOn ? 'Close' : 'Open';

  if (isCalculatorOn) {
    display.classList.remove('disabled');
    display.innerText = '0';
  } else {
    display.classList.add('disabled');
    display.innerText = '';
  }
}

document.addEventListener('keydown', (e) => {
  if (!isCalculatorOn) return;

  const key = e.key;
  if (!isNaN(key) || ['+', '-', '*', '/', '.', '(', ')'].includes(key)) {
    appendValue(key);
  }
   else if (key === 'Enter') {
    e.preventDefault();
    calculate();
  } 
  else if (key === 'Backspace') {
    deleteLast();
  } 
  else if (key === 'Escape') {
    clearDisplay();
  }
});
