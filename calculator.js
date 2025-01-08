// Ambil elemen-elemen DOM
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const equalsButton = document.getElementById('equals');

// Variabel untuk menyimpan operasi dan angka
let currentInput = '';
let previousInput = '';
let operator = null;

// Fungsi untuk memperbarui layar
function updateDisplay(value) {
    display.value = value;
}

// Fungsi untuk menangani klik tombol angka dan desimal
function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay(currentInput);
}

// Fungsi untuk menangani operator
function chooseOperator(op) {
    if (currentInput === '' && previousInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Fungsi untuk melakukan perhitungan
function calculate() {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(curr)) return;

    let result;
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case 'x':
            result = prev * curr;
            break;
        case '/':
            result = curr === 0 ? 'Error' : prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay(currentInput);
}

// Fungsi untuk menghapus semua input
function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay('0');
}

// Fungsi untuk menghapus satu karakter
function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
}

// Tambahkan event listener ke tombol-tombol
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.id;

        if (id === 'clear') {
            clearAll();
        } else if (id === 'backspace') {
            backspace();
        } else if (id === 'equals') {
            calculate();
        } else if (id === 'add' || id === 'subtract' || id === 'multiply' || id === 'divide' || id === 'mod') {
            chooseOperator(button.textContent === '*' ? 'x' : button.textContent);
        } else {
            appendNumber(button.textContent);
        }
    });
});

// Fungsi untuk menangani input dari keyboard
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === 'x' || key === '/' || key === '%') {
        chooseOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key.toLowerCase() === 'c') {
        clearAll();
    }
});
